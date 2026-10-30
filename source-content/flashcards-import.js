// Importação local dos baralhos originais do Literalidade (.apkg).
// Os campos HTML são guardados integralmente, sem reescrita ou geração de cartões.
const DB_NAME='mapa-literalidade-anki-v1', DB_VERSION=1;
let dbPromise, dependencies;
function waitForScript(url,globalName){
  if(window[globalName])return Promise.resolve(window[globalName]);
  return new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src=url;script.async=true;script.crossOrigin='anonymous';
    script.onload=()=>window[globalName]?resolve(window[globalName]):reject(Error('Biblioteca de importação indisponível.'));
    script.onerror=()=>reject(Error('Não foi possível carregar o leitor de arquivos Anki. Verifique a internet.'));
    document.head.append(script);
  });
}
async function libraries(){
  if(!dependencies)dependencies=(async()=>{
    await waitForScript('https://cdn.jsdelivr.net/npm/fflate@0.8.3/umd/index.js','fflate');
    await waitForScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.min.js','initSqlJs');
    const SQL=await window.initSqlJs({locateFile:name=>'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/'+name});
    return {zip:window.fflate,SQL};
  })().catch(err=>{dependencies=null;throw err});
  return dependencies;
}
export function openDB(){
  if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains('cards')) {
        const s=db.createObjectStore('cards',{keyPath:'id'});
        s.createIndex('subjectKey','subjectKey',{unique:false});
        s.createIndex('deckPath','deckPath',{unique:false});
      }
      if(!db.objectStoreNames.contains('media'))db.createObjectStore('media',{keyPath:'name'});
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
  return dbPromise;
}
function request(req){return new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export async function allCards(){
  const db=await openDB();return request(db.transaction('cards').objectStore('cards').getAll());
}
export async function mediaBlob(name,sourceFile=''){
  const db=await openDB();
  const indexed=await request(db.transaction('media').objectStore('media').get(sourceFile+'::'+name));
  return indexed?.blob||null;
}
function transact(db,stores,callback){
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(stores,'readwrite');
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error||Error('Falha ao salvar os cartões.'));
    tx.onabort=()=>reject(tx.error||Error('Importação interrompida.'));
    callback(tx);
  });
}
const decoder=new TextDecoder();
const toText=b=>decoder.decode(b);
function readJSON(bytes){return JSON.parse(toText(bytes));}
function rows(database,sql){
  const data=database.exec(sql);
  return data.length?data[0].values.map(values=>Object.fromEntries(data[0].columns.map((col,i)=>[col,values[i]]))):[];
}
function fileMime(filename){
  const ext=filename.split('.').pop().toLowerCase();
  return ({png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',svg:'image/svg+xml',mp3:'audio/mpeg',ogg:'audio/ogg',wav:'audio/wav',mp4:'video/mp4'})[ext]||'application/octet-stream';
}
export const LABELS={lte:'LTE',tributario:'Direito Tributário',reforma:'Reforma Tributária'};
export async function importApkg(file,subjectKey,onProgress=()=>{}){
  if(!LABELS[subjectKey])throw Error('Escolha uma das três matérias.');
  if(!/\.apkg$/i.test(file.name))throw Error('Selecione um baralho Anki (.apkg).');
  if(file.size>65*1024*1024)throw Error('O arquivo é grande demais para importação no navegador (limite de 65 MB).');
  onProgress('Abrindo o baralho…');
  const [{zip,SQL},buf]=await Promise.all([libraries(),file.arrayBuffer()]);
  const entries=zip.unzipSync(new Uint8Array(buf));
  const sqlite=entries['collection.anki21']||entries['collection.anki2'];
  if(!sqlite)throw Error('O arquivo não contém uma coleção Anki válida.');
  const dbSql=new SQL.Database(sqlite);
  let decks,models,cards;
  try {
    const cfg=rows(dbSql,'SELECT decks, models FROM col')[0];
    if(!cfg)throw Error('Baralho sem metadados.');
    decks=JSON.parse(cfg.decks);models=JSON.parse(cfg.models);
    cards=rows(dbSql,'SELECT c.id AS cardId, c.did, c.ord, n.id AS noteId, n.guid, n.mid, n.flds, n.tags FROM cards c JOIN notes n ON n.id=c.nid ORDER BY c.id');
  }finally{dbSql.close();}
  if(!cards.length)throw Error('O baralho não contém cartões.');
  if(cards.length>15000)throw Error('Importação excede o limite de 15 mil cartões por arquivo.');
  if(!cards.every(c=>models[String(c.mid)]?.name?.toLowerCase().includes('literalidade')))
    throw Error('Para LTE, Direito Tributário e Reforma, importe somente baralhos do Literalidade.');
  const cardDecks=cards.map(c=>String(decks[String(c.did)]?.name||''));
  if(!cardDecks.every(name=>/literalidade|LC[ _-]*236/i.test(name)))
    throw Error('Este importador aceita apenas baralhos originais do Literalidade ou o recorte da LC 236.');
  if(!cards.every(c=>String(c.flds).split('\x1f').length===models[String(c.mid)].flds.length))
    throw Error('Os campos do baralho não correspondem ao modelo original; importação interrompida.');
  const isReform=/(?:LC[_\s-]*236(?:[_\s-]*2026)?|236[_\s-]*2026)/i.test(file.name)||Object.values(decks).some(d=>/^LC[_\s-]*236(?:[_\s-]*2026)?/i.test(d.name||''));
  const roots=[...new Set(cardDecks.map(x=>x.split('::')[0]))];
  if(subjectKey==='lte'&&roots.some(x=>/direito tribut[aá]rio/i.test(x)))
    throw Error('Este arquivo é de Direito Tributário, não de LTE. Selecione a matéria correspondente.');
  if(subjectKey==='reforma'&&!isReform&&roots.some(x=>/direito tribut[aá]rio/i.test(x)))
    throw Error('Para Reforma, importe o baralho próprio da reforma ou o recorte LC 236; o baralho completo deve ficar em Direito Tributário.');
  if(subjectKey==='tributario'&&roots.some(x=>/\bLTE\b|legisla[cç][aã]o tribut[aá]ria estadual/i.test(x)))
    throw Error('Este baralho é de LTE. Selecione a matéria LTE.');
  const parsed=cards.map(c=>{
    const model=models[String(c.mid)], names=model.flds.map(f=>f.name), values=String(c.flds).split('\x1f');
    const fields=Object.fromEntries(names.map((name,i)=>[name,values[i]??'']));
    const uid=String(fields.IDU||c.guid||c.noteId).trim();
    if(!uid)throw Error('Cartão sem identidade estável.');
    return {
      id:'literalidade:'+uid,
      sourceId:uid,
      type:model.name,fieldOrder:names,fields,
      deckPath:decks[String(c.did)]?.name||file.name,
      sourceFile:file.name,
      originalNoteId:String(c.noteId),originalCardId:String(c.cardId),ord:Number(c.ord)||0,
      tags:String(c.tags||''),
      subjectKey:isReform?'reforma':subjectKey,
      importedAt:new Date().toISOString()
    };
  });
  const unique=new Set(parsed.map(c=>c.id));
  if(unique.size!==parsed.length)throw Error('O baralho contém cartões com IDs repetidos; importação cancelada.');
  const db=await openDB();
  onProgress('Conferindo IDs para evitar duplicações…');
  const old=await allCards(),existing=new Map(old.map(c=>[c.id,c]));
  const next=[],counts={added:0,updated:0,kept:0,moved:0,media:0};
  for(const c of parsed){
    const oldCard=existing.get(c.id);
    if(oldCard){
      // O subconjunto LC 236 prevalece, mesmo quando o baralho geral for importado depois.
      if(oldCard.subjectKey==='reforma'&&c.subjectKey==='tributario')c.subjectKey='reforma';
      if(c.subjectKey!==oldCard.subjectKey)counts.moved++;
      // Preserva SEMPRE os campos da primeira importação (texto original intocado).
      if(c.subjectKey===oldCard.subjectKey){
        counts.kept++;continue;
      }
      counts.updated++;
      next.push({...oldCard,subjectKey:c.subjectKey,deckPath:c.deckPath});
      continue;
    }
    counts.added++;
    next.push(c);
  }
  onProgress('Salvando os cartões originais…');
  for(let i=0;i<next.length;i+=300){
    const chunk=next.slice(i,i+300);
    await transact(db,['cards'],tx=>{const s=tx.objectStore('cards');for(const c of chunk)s.put(c);});
  }
  // Arquivos de mídia usam os nomes originais; os bytes são armazenados localmente.
  if(entries.media) {
    const names=readJSON(entries.media);
    const resources=Object.entries(names).filter(([index,name])=>entries[index]&&typeof name==='string'&&!name.includes('/')&&!name.includes('\\')&&name.length<260);
    for(let i=0;i<resources.length;i+=30){
      const batch=resources.slice(i,i+30);
      await transact(db,['media'],tx=>{
        const s=tx.objectStore('media');
        for(const [index,name] of batch){
          const bytes=entries[index];
          s.put({name:file.name+'::'+name,originalName:name,blob:new Blob([bytes],{type:fileMime(name)}),updatedAt:new Date().toISOString()});
          counts.media++;
        }
      });
    }
  }
  onProgress('Importação concluída.');
  return {...counts,fromFile:parsed.length,forcedReform:isReform};
}
