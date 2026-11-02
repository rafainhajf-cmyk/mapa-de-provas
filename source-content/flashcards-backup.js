const FORMAT='mapa-flashcards-completo-v1';
export const MAX_BACKUP_BYTES=180*1024*1024;
const record=x=>x&&typeof x==='object'&&!Array.isArray(x);
const safe=s=>typeof s==='string'&&s.length>0&&s.length<2000&&!['__proto__','constructor','prototype'].includes(s);
const hash=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
const digest=x=>hash(new TextEncoder().encode(JSON.stringify(x)));
function check(s){
 if(!record(s)||!Array.isArray(s.cards)||!Array.isArray(s.media)||!record(s.reviews)||s.cards.length>100000||s.media.length>100000)throw Error('Estrutura de backup inválida.');
 const ids=new Set(),names=new Set();
 for(const c of s.cards){if(!record(c)||!safe(c.id)||ids.has(c.id)||!safe(c.sourceFile)||!['lei236','tributario','reforma','lte'].includes(c.subjectKey)||!record(c.fields)||!Array.isArray(c.fieldOrder)||c.fieldOrder.some(f=>!safe(f)||typeof c.fields[f]!=='string')||typeof c.deckPath!=='string'||typeof c.type!=='string')throw Error('Cartão inválido ou ID duplicado.');ids.add(c.id);}
 for(const m of s.media){if(!record(m)||!safe(m.name)||names.has(m.name)||!safe(m.originalName)||!m.name.endsWith('::'+m.originalName))throw Error('Mídia inválida ou duplicada.');names.add(m.name);}
 for(const [id,r] of Object.entries(s.reviews)){if(!safe(id)||!record(r)||Object.entries(r).some(([k,v])=>!safe(k)||!(typeof v==='string'||typeof v==='number'&&Number.isFinite(v))))throw Error('Revisão inválida.');}
}
const encode=bytes=>{let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s);};
export async function createBackup(s){
 check(s);const media=[];let size=0;
 for(const m of s.media){if(!(m.blob instanceof Blob))throw Error('Mídia sem conteúdo.');size+=m.blob.size;if(size>MAX_BACKUP_BYTES/1.4)throw Error('Backup excede o limite de tamanho.');const bytes=new Uint8Array(await m.blob.arrayBuffer());media.push({...m,blob:undefined,mime:m.blob.type,bytes:encode(bytes),sha256:await hash(bytes)});}
 const data={format:FORMAT,exportedAt:new Date().toISOString(),cards:s.cards,media,reviews:s.reviews};
 if(JSON.stringify(data).length>MAX_BACKUP_BYTES)throw Error('Backup excede o limite de tamanho.');return {...data,sha256:await digest(data)};
}
export async function validateBackup(b){
 if(!record(b)||b.format!==FORMAT||typeof b.sha256!=='string'||JSON.stringify(b).length>MAX_BACKUP_BYTES)throw Error('Arquivo de backup inválido ou grande demais.');
 const {sha256,...data}=b;if(await digest(data)!==sha256)throw Error('A integridade do backup não confere.');check(data);
 const media=[];
 for(const m of data.media){if(typeof m.bytes!=='string'||typeof m.mime!=='string'||!/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(m.bytes))throw Error('Conteúdo de mídia inválido.');const bytes=Uint8Array.from(atob(m.bytes),c=>c.charCodeAt(0));if(await hash(bytes)!==m.sha256)throw Error('A integridade da mídia não confere.');const {bytes:_,mime,sha256:__,...meta}=m;media.push({...meta,blob:new Blob([bytes],{type:mime})});}
 return {cards:structuredClone(data.cards),media,reviews:structuredClone(data.reviews)};
}
export async function planRestore(local,incoming){
 check(local);check(incoming);const cards=[],media=[],reviews={},conflicts={cards:0,media:0,reviews:0},blockedSources=new Set();
 const cm=new Map(local.cards.map(x=>[x.id,x])),mm=new Map(local.media.map(x=>[x.name,x]));
 for(const m of incoming.media){const old=mm.get(m.name);if(!old)media.push(m);else if(old.blob.type!==m.blob.type||await hash(await old.blob.arrayBuffer())!==await hash(await m.blob.arrayBuffer())){conflicts.media++;blockedSources.add(m.name.slice(0,-m.originalName.length-2));}}
 let blockedCards=0;
 for(const c of incoming.cards){const old=cm.get(c.id);if(old){if(JSON.stringify(old)!==JSON.stringify(c))conflicts.cards++;}else if(blockedSources.has(c.sourceFile))blockedCards++;else cards.push(c);}
 const blockedIds=new Set(incoming.cards.filter(c=>blockedSources.has(c.sourceFile)&&!cm.has(c.id)).map(c=>c.id));
 for(const [id,r] of Object.entries(incoming.reviews)){if(blockedIds.has(id))continue;if(Object.hasOwn(local.reviews,id)){if(JSON.stringify(local.reviews[id])!==JSON.stringify(r))conflicts.reviews++;}else Object.defineProperty(reviews,id,{value:r,enumerable:true});}
 return {cards,media,reviews,conflicts,blockedCards};
}
export async function restoreBackup(incoming,adapter){
 const local=await adapter.read(),plan=await planRestore(local,incoming);await adapter.commit(plan);
 const after=await adapter.read();const ids=new Set(after.cards.map(c=>c.id)),names=new Set(after.media.map(m=>m.name));
 if(plan.cards.some(c=>!ids.has(c.id))||plan.media.some(m=>!names.has(m.name)))throw Error('Não foi possível conferir a gravação do conteúdo.');
 const result={savedCards:plan.cards.length,savedMedia:plan.media.length,savedReviews:0,conflicts:plan.conflicts,blockedCards:plan.blockedCards,partial:false};
 try{await adapter.saveReviews(plan.reviews);result.savedReviews=Object.keys(plan.reviews).length;}catch{result.partial=true;}
 return result;
}
