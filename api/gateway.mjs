import { getIronSession } from 'iron-session';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { loginPage, logoutControl } from '../lib/login.mjs';
import { handleStudySync } from '../lib/study-sync.mjs';

const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.pdf':'application/pdf', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2' };
const SESSION_DAYS = 30;
const SESSION_TTL_SECONDS = SESSION_DAYS * 24 * 60 * 60;
const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;
const SESSION_RENEW_AFTER_MS = 24 * 60 * 60;
const digest = value => createHash('sha256').update(value).digest();
const same = (a, b) => typeof a === 'string' && typeof b === 'string' && timingSafeEqual(digest(a), digest(b));
const safeDestination = value => typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !/[\\\r\n]/.test(value) && !/^\/(entrar|sair|api)(\/|\?|$)/.test(value) ? value : '/';
let allowlist;
function send(res, status, body, type = 'text/html; charset=utf-8') { res.statusCode = status; res.setHeader('Content-Type', type); res.end(body); }
function redirect(res, location) { res.statusCode = 303; res.setHeader('Location', location); res.end(); }
async function formBody(req) {
  if (req.body && typeof req.body === 'object') return new URLSearchParams(req.body);
  if (typeof req.body === 'string') { if (Buffer.byteLength(req.body) > 4096) throw Error('large'); return new URLSearchParams(req.body); }
  let text = ''; for await (const part of req) { text += part; if (Buffer.byteLength(text) > 4096) throw Error('large'); }
  return new URLSearchParams(text);
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control','private, no-store, max-age=0');
  res.setHeader('CDN-Cache-Control','no-store');
  res.setHeader('Vercel-CDN-Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','same-origin');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  const password = process.env.STUDY_ACCESS_PASSWORD;
  const secret = process.env.STUDY_SESSION_SECRET;
  if (!password || password.length < 6 || !secret || secret.length < 32) return send(res,503,'<h1>Acesso em preparação</h1><p>O responsável precisa concluir a configuração da senha.</p>');
  try {
    const session = await getIronSession(req, res, { cookieName:'study_access', password:createHash('sha256').update(secret+'\0'+password).digest('hex'), ttl:SESSION_TTL_SECONDS, cookieOptions:{ secure:process.env.STUDY_LOCAL_TEST !== '1', httpOnly:true, sameSite:'strict', path:'/' } });
    const url = new URL(req.url, 'https://'+req.headers.host);
    const routed = req.query?.__study_path ?? url.searchParams.get('__study_path');
    const pathname = typeof routed === 'string' ? '/'+routed.replace(/^\/+/, '') : url.pathname;
    url.searchParams.delete('__study_path');
    const target = safeDestination(url.searchParams.get('next'));
    if (!session.csrf) { session.csrf=randomBytes(24).toString('hex'); await session.save(); }
    const now = Date.now();
    const authenticated = session.allowed === true && Number.isFinite(session.until) && session.until > now;
    // Cookie HttpOnly/Secure: renova o prazo em dias de uso, sem armazenar a senha no navegador.
    // Uma sessão antiga de 24 horas também é renovada ao ser usada antes de expirar.
    if (authenticated && session.until - now <= SESSION_TTL_MS - SESSION_RENEW_AFTER_MS) {
      session.until = now + SESSION_TTL_MS;
      await session.save();
    }
    if (pathname === '/api/estudos/sync') return handleStudySync(req,res,{authenticated,csrf:session.csrf,origin:url.origin});
    if (pathname === '/entrar' || pathname === '/sair') {
      if (req.method === 'GET' && pathname === '/entrar') return authenticated ? redirect(res,target) : send(res,200,loginPage(session.csrf,target));
      if (req.method !== 'POST') { res.setHeader('Allow','POST'); return send(res,405,'Método não permitido.'); }
      if (req.headers.origin && req.headers.origin !== url.origin) return send(res,403,'Origem não permitida.');
      let form; try { form=await formBody(req); } catch { return send(res,413,'Solicitação muito grande.'); }
      if (!same(form.get('csrf'),session.csrf)) return send(res,403,'Atualize a página e tente novamente.');
      if (pathname === '/sair') { session.destroy(); return redirect(res,'/entrar'); }
      const next = safeDestination(form.get('next'));
      if (!same(form.get('password'),password)) return send(res,401,loginPage(session.csrf,next,'Senha incorreta. Confira a senha recebida e tente novamente.'));
      session.allowed=true; session.until=Date.now()+SESSION_TTL_MS; session.csrf=randomBytes(24).toString('hex'); await session.save();
      return redirect(res,next);
    }
    if (!authenticated) return redirect(res,'/entrar?next='+encodeURIComponent(safeDestination(pathname+url.search)));
    if (!['GET','HEAD'].includes(req.method)) { res.setHeader('Allow','GET, HEAD'); return send(res,405,'Método não permitido.'); }
    let name; try { name=decodeURIComponent(pathname).replace(/^\//,'') || 'index.html'; } catch { return send(res,400,'Endereço inválido.'); }
    if (name.endsWith('/')) name+='index.html';
    const root=path.resolve('private-content');
    allowlist ??= new Set(JSON.parse(await readFile(path.join(root,'_allowlist.json'),'utf8')));
    if (!allowlist.has(name)) {
      if (!path.extname(name) && allowlist.has(name+'.html')) name+='.html';
      else return send(res,404,'<h1>Conteúdo não encontrado</h1><a href="/">Voltar ao mapa</a>');
    }
    const file=path.resolve(root,name);
    if (!file.startsWith(root+path.sep)) return send(res,404,'Conteúdo não encontrado.');
    const type=mime[path.extname(name).toLowerCase()] || 'application/octet-stream';
    res.setHeader('Content-Type',type);
    if (type.startsWith('text/html')) {
      const html=(await readFile(file,'utf8')).replace(/<head>/i,'<head><meta name="study-csrf" content="'+session.csrf+'">').replace(/<\/body>/i,logoutControl(session.csrf)+'</body>');
      res.statusCode=200; return res.end(req.method==='HEAD' ? undefined : html);
    }
    const info=await stat(file); let start=0,end=info.size-1;
    res.setHeader('Accept-Ranges','bytes');
    if (req.headers.range) {
      const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!range || (!range[1]&&!range[2])) {res.setHeader('Content-Range',`bytes */${info.size}`);res.statusCode=416;return res.end();}
      if (!range[1]) start=Math.max(0,info.size-Number(range[2]));
      else {start=Number(range[1]); if(range[2])end=Math.min(end,Number(range[2]));}
      if(start> end || start>=info.size || !Number.isSafeInteger(start) || !Number.isSafeInteger(end)){res.setHeader('Content-Range',`bytes */${info.size}`);res.statusCode=416;return res.end();}
      res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${info.size}`);
    } else res.statusCode=200;
    res.setHeader('Content-Length',end-start+1);
    if(req.method==='HEAD')return res.end();
    const stream=createReadStream(file,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
  } catch { if(!res.headersSent)send(res,500,'Não foi possível abrir o conteúdo. Tente novamente.'); else res.destroy(); }
}
