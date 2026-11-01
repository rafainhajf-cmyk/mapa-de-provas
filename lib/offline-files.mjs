const CORE=['index.html','dificuldades.html','apostila.html','flashcards.html','provas.html','offline.js','offline-sw.js'];
export function selectOfflineFiles(entries,{limit=45*1024*1024,maxAsset=8*1024*1024}={}){
 const eligible=entries.filter(x=>/\.(?:html|js|css|json|pdf|svg|png|jpg|jpeg|webp)$/.test(x.name)&&x.name!=='offline-files.json');
 const rank=x=>CORE.includes(x.name)?0:/\.(?:js|css|json|html)$/.test(x.name)&&!x.name.startsWith('assets/')?1:2;
 const ordered=eligible.map((x,index)=>({...x,index})).sort((a,b)=>rank(a)-rank(b)||a.index-b.index);
 const files=[],used=new Set();let bytes=0;
 for(const x of ordered){if(used.has(x.name))continue;if(!CORE.includes(x.name)&&(x.bytes>maxAsset||bytes+x.bytes>limit))continue;used.add(x.name);files.push('/'+x.name);bytes+=x.bytes;}
 return files;
}
