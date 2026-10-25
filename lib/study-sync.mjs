import {createHash,timingSafeEqual} from 'node:crypto';
import {get,put,BlobPreconditionFailedError} from '@vercel/blob';
import {mergeEntries,validEntryId,validRegister} from './study-sync-core.mjs';
const SITE='https://mapa-fiscal-rafael.bonnyelf256.chatgpt.site';
const MAX=1500000;
const sha=x=>createHash('sha256').update(x).digest('hex');
const same=(a,b)=>typeof a==='string'&&typeof b==='string'&&timingSafeEqual(Buffer.from(sha(a)),Buffer.from(sha(b)));
const reply=(res,status,value)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(value));};
export function syncCors(req,res,origin){const incoming=req.headers.origin;if(incoming&&incoming!==origin&&incoming!==SITE)return false;if(incoming)res.setHeader('Access-Control-Allow-Origin',incoming);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type, X-Study-CSRF');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');res.setHeader('Access-Control-Max-Age','600');return true;}
export async function readSyncBody(req){if(req.body&&typeof req.body==='object'&&!Buffer.isBuffer(req.body)){if(Buffer.byteLength(JSON.stringify(req.body))>MAX)throw Error('large');return req.body;}if(typeof req.body==='string'){if(Buffer.byteLength(req.body)>MAX)throw Error('large');return JSON.parse(req.body);}let value='';for await(const part of req){value+=part;if(Buffer.byteLength(value)>MAX)throw Error('large');}return JSON.parse(value||'{}');}
const blobOptions=()=>({access:'private',token:process.env.BLOB_READ_WRITE_TOKEN});
export const blobStorage={
 async read(path){const r=await get(path,{...blobOptions(),useCache:false});if(!r||r.statusCode!==200)return null;return {data:JSON.parse(await new Response(r.stream).text()),etag:r.blob.etag};},
 async write(path,data,etag){return put(path,JSON.stringify(data),{...blobOptions(),contentType:'application/json',addRandomSuffix:false,allowOverwrite:!!etag,...(etag?{ifMatch:etag}:{}),cacheControlMaxAge:60});}
};
export async function updateSyncProfile(storage,path,changes){
 for(let attempt=0;attempt<5;attempt++){const current=await storage.read(path);if(!current)return null;const entries=mergeEntries(current.data.entries,changes);if(Object.keys(entries).length>15000||Buffer.byteLength(JSON.stringify(entries))>MAX)throw Error('large');const data={schema:1,entries,updatedAt:new Date().toISOString()};
  if(JSON.stringify(entries)===JSON.stringify(current.data.entries))return current.data;
  try{await storage.write(path,data,current.etag);return data;}catch(e){if(!(e instanceof BlobPreconditionFailedError)&&e.name!=='BlobPreconditionFailedError')throw e;}
 }throw Error('conflict');
}
export async function handleStudySync(req,res,{authenticated=false,csrf='',origin,storage=blobStorage}={}){
 if(!syncCors(req,res,origin))return reply(res,403,{error:'Origem não permitida.'});if(req.method==='OPTIONS'){res.statusCode=204;return res.end();}
 if(!['GET','POST'].includes(req.method))return reply(res,405,{error:'Método não permitido.'});
 if(storage===blobStorage&&!process.env.BLOB_READ_WRITE_TOKEN)return reply(res,503,{error:'Armazenamento em preparação.'});
 const code=/^Bearer (study1_[a-f0-9]{64})$/.exec(req.headers.authorization||'')?.[1];if(!code)return reply(res,401,{error:'Código de conexão necessário.'});const path='study-sync/v1/'+sha(code)+'.json';
 try{
  if(req.method==='GET'){const current=await storage.read(path);return current?reply(res,200,current.data):reply(res,404,{error:'Perfil não encontrado. Confira o código.'});}
  let body;try{body=await readSyncBody(req);}catch{return reply(res,400,{error:'Conteúdo inválido ou muito grande.'});}
  if(body.create===true){
   if(!authenticated||!same(req.headers['x-study-csrf'],csrf)||req.headers.origin!==origin)return reply(res,403,{error:'Abra a versão com senha para criar seu perfil.'});
   const current=await storage.read(path);if(current)return reply(res,200,current.data);
   const data={schema:1,entries:{},updatedAt:new Date().toISOString()};await storage.write(path,data);return reply(res,201,data);
  }
  if(!body.entries||typeof body.entries!=='object'||Array.isArray(body.entries)||Object.keys(body.entries).length>300)return reply(res,400,{error:'Lote de alterações inválido.'});
  for(const [id,r]of Object.entries(body.entries))if(!validEntryId(id)||!validRegister(r)||Buffer.byteLength(JSON.stringify(r))>80000)return reply(res,400,{error:'Registro inválido.'});
  const data=await updateSyncProfile(storage,path,body.entries);return data?reply(res,200,data):reply(res,404,{error:'Perfil não encontrado. Confira o código.'});
 }catch(e){return reply(res,e.message==='large'?413:e.message==='conflict'?409:503,{error:e.message==='large'?'O perfil atingiu o limite de tamanho. Seus dados locais estão preservados.':e.message==='conflict'?'Outra alteração ocorreu. Tente novamente.':'Não foi possível sincronizar agora.'});}
}
