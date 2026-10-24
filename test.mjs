import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import handler from './api/gateway.mjs';
process.env.STUDY_ACCESS_PASSWORD='483726';
process.env.STUDY_SESSION_SECRET=randomBytes(48).toString('base64url');
process.env.STUDY_LOCAL_TEST='1';
test('entrada, sessão, PDFs, rotas privadas e saída',async()=>{
 const server=createServer(handler);await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;
 let cookie='';
 const request=async(p,options={})=>{const r=await fetch(base+p,{redirect:'manual',...options,headers:{Cookie:cookie,...options.headers}});const set=r.headers.get('set-cookie');if(set)cookie=set.split(';')[0];return r;};
 const post=(body,headers={})=>({method:'POST',body:new URLSearchParams(body),headers:{'Content-Type':'application/x-www-form-urlencoded',...headers}});
 try{
  for(const p of ['/','/dificuldades.html','/difficulty-data.json','/assets/tributario-apostila-comparativa-43p.pdf','/api/gateway?__study_path=assets%2Ftributario-apostila-comparativa-43p.pdf']){
   const r=await request(p);assert.equal(r.status,303,p);assert.match(r.headers.get('location'),/^\/entrar/);assert.match(r.headers.get('cache-control'),/no-store/);
  }
  let r=await request('/entrar?next=//evil.example');let html=await r.text();assert.equal(r.status,200);assert.match(html,/name="next" value="\/"/);
  const csrf=/name="csrf" value="([a-f0-9]+)"/.exec(html)[1];
  r=await request('/entrar',post({csrf,password:process.env.STUDY_ACCESS_PASSWORD},{Origin:'https://evil.example'}));assert.equal(r.status,403);
  r=await request('/entrar',post({csrf:'fake',password:process.env.STUDY_ACCESS_PASSWORD}));assert.equal(r.status,403);
  r=await request('/entrar',post({csrf,password:'incorreta'}));assert.equal(r.status,401);
  r=await request('/api/gateway?__study_path=entrar',post({csrf,password:process.env.STUDY_ACCESS_PASSWORD,next:'/dificuldades.html'}));assert.equal(r.status,303);assert.equal(r.headers.get('location'),'/dificuldades.html');assert.match(r.headers.get('set-cookie'),/HttpOnly/i);assert.match(r.headers.get('set-cookie'),/SameSite=Strict/i);
  const validCookie=cookie;
  r=await request('/');html=await r.text();assert.equal(r.status,200);assert.match(html,/Sair do acesso/);
  const logoutCsrf=/name="csrf" value="([a-f0-9]+)"/.exec(html)[1];
  r=await request('/dificuldades.html');assert.equal(r.status,200);assert.match(await r.text(),/dificuldades\.js/);
  r=await request('/difficulty-data.json');assert.equal(r.status,200);assert.ok((await r.json()).folders.length>0);
  r=await request('/api/gateway?__study_path=assets%2Ftributario-apostila-comparativa-43p.pdf',{headers:{Range:'bytes=0-31'}});assert.equal(r.status,206);assert.equal((await r.arrayBuffer()).byteLength,32);assert.match(r.headers.get('content-type'),/application\/pdf/);
  r=await request('/assets/tributario-apostila-comparativa-43p.pdf',{headers:{Range:'bytes=999999999-'}});assert.equal(r.status,416);
  for(const p of ['/private-content/index.html','/source-content/index.html','/api/gateway.mjs','/package.json','/api/gateway?__study_path=..%2Fpackage.json'])assert.equal((await request(p)).status,404,p);
  cookie=validCookie.slice(0,-15)+'invalid';assert.equal((await request('/difficulty-data.json')).status,303);
  cookie=validCookie;
  r=await request('/sair',post({csrf:logoutCsrf}));assert.equal(r.status,303);assert.equal((await request('/difficulty-data.json')).status,303);
  cookie=validCookie;process.env.STUDY_ACCESS_PASSWORD=randomBytes(24).toString('base64url');assert.equal((await request('/')).status,303,'trocar a senha revoga sessões anteriores');
  delete process.env.STUDY_SESSION_SECRET;assert.equal((await request('/')).status,503,'configuração ausente não libera conteúdo');
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
});
