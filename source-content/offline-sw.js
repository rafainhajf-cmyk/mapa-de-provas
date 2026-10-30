const CACHE='mapa-provas-offline-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
const eligible=url=>url.origin===self.location.origin&&!url.pathname.startsWith('/api/')&&!['/entrar','/sair'].includes(url.pathname);
const valid=response=>response&&response.ok&&response.type!=='opaque'&&!new URL(response.url).pathname.startsWith('/entrar')&&!/text\/html/.test(response.headers.get('content-type')||'')||false;
function canStore(request,response){if(!eligible(new URL(request.url))||!response?.ok||response.redirected)return false;const dest=new URL(response.url);if(!eligible(dest))return false;const type=response.headers.get('content-type')||'';return !type.includes('text/html')||type.includes('text/html')&&request.mode==='navigate';}
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method==='POST'&&url.pathname==='/sair'){event.respondWith((async()=>{const response=await fetch(req);if(response.ok||response.redirected)await caches.delete(CACHE);return response})());return}
 if(req.method!=='GET'||!eligible(url)||req.headers.has('range'))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{const response=await fetch(req);const marker=await cache.match('/offline-enabled-marker');if(marker&&canStore(req,response))await cache.put(req,response.clone());return response}
  catch(error){const cached=await cache.match(req,{ignoreSearch:true});if(cached)return cached;throw error}
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type==='CLEAR_OFFLINE'){event.waitUntil(caches.delete(CACHE).then(()=>event.source?.postMessage({type:'OFFLINE_CLEARED'})));return}
 if(event.data?.type!=='DOWNLOAD_OFFLINE')return;
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  const files=event.data.files||[];
  let done=0,failed=[];
  for(const file of files){
   if(typeof file!=='string'||!file.startsWith('/')||file.startsWith('//'))continue;
   try{const response=await fetch(file,{credentials:'same-origin',cache:'reload'});if(canStore(new Request(new URL(file,self.location.origin)),response)){await cache.put(file,response);done++}else failed.push(file)}catch{failed.push(file)}
   if(done%15===0)event.source?.postMessage({type:'OFFLINE_PROGRESS',done,total:files.length})
  }
  if(done)await cache.put('/offline-enabled-marker',new Response('enabled'));
  event.source?.postMessage({type:'OFFLINE_DONE',done,total:files.length,failed:failed.length});
 })());
});