// Importação incremental idempotente de um export JSON da aba "Conteúdos estruturados".
// Uso: node scripts/import-study-knowledge.mjs arquivo-exportado.json
// Entrada: {values:[linha de cabeçalhos, ...linhas]} como a API Google Sheets retorna.
// Importação não remove conteúdo anterior, não aceita IDs duplicados e não aprova rascunhos.
import {readFile,writeFile} from 'node:fs/promises';
import {parseKnowledgeBundle} from '../source-content/study-knowledge.js';
const input=process.argv[2];
if(!input){console.error('Informe o JSON exportado da aba Conteúdos estruturados');process.exit(2)}
const data=JSON.parse(await readFile(input,'utf8'));
const values=Array.isArray(data)?data:data.values;
if(!Array.isArray(values)||!values.length)throw Error('Matriz da planilha ausente');
const headers=['ID','Matéria','ID capítulo','Título capítulo','Título esquema','Status','Tipo','Origem','Versão','Data','Blocos JSON','Flashcards JSON'];
for(let i=0;i<headers.length;i++)if(String(values[0][i]||'').trim()!==headers[i])throw Error('Cabeçalho divergente na coluna '+(i+1));
const approved=new Map(),seen=new Set();for(const line of values.slice(1)){
 if(!String(line?.[0]||'').trim())continue;
 const [id,subject,targetId,targetTitle,title,rawStatus,updateType,source,v,updatedAt,blocks,flashcards]=line;
 if(seen.has(id))throw Error('ID repetido na planilha: '+id);seen.add(id);
 const status=String(rawStatus).trim().toLowerCase();
 if(!['approved','aprovado','draft','rascunho','rejected','rejeitado'].includes(status))throw Error('Estado inválido: '+id);
 if(!['approved','aprovado'].includes(status))continue;
 const record={id:String(id),subject:String(subject||''),targetId:String(targetId||''),targetTitle:String(targetTitle||''),title:String(title||''),status:'approved',updateType:String(updateType||''),source:String(source||''),version:Number(v||1),updatedAt:String(updatedAt||''),blocks:JSON.parse(blocks||'[]'),flashcards:JSON.parse(flashcards||'[]')};
 if(!Number.isInteger(record.version)||record.version<1)throw Error('Versão inválida: '+id);
 approved.set(record.id,record);
}
const target='source-content/study-knowledge.json',stored=JSON.parse(await readFile(target,'utf8'));
const old=new Map(stored.records.map(x=>[x.id,x]));
for(const [id,record] of approved){
 const prev=old.get(id);
 if(prev&&Number(prev.version||1)>record.version)throw Error('Versão inferior à publicada: '+id);
 if(prev&&Number(prev.version||1)===record.version&&JSON.stringify(prev)!==JSON.stringify(record))throw Error('Atualização alterou conteúdo sem aumentar a versão: '+id);
 old.set(id,record);
}
const records=[...old.values()].sort((a,b)=>a.subject.localeCompare(b.subject,'pt-BR')||a.id.localeCompare(b.id));
parseKnowledgeBundle({schemaVersion:1,records});
await writeFile(target,JSON.stringify({...stored,exportedAt:new Date().toISOString(),records},null,2)+'\n');
console.log('IDs aprovados importados:',approved.size,'; publicados e preservados:',records.length);
