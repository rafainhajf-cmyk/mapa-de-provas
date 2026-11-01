import { cp, mkdir, readdir, rm, writeFile, readFile, access, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
let source = path.resolve('source-content');
try { await access(path.join(source, 'index.html')); }
catch { source = path.resolve('../dist'); }
await access(path.join(source, 'index.html'));
// Valida a sintaxe dos novos módulos antes de publicar a área de flashcards.
for(const file of ['flashcards.js','flashcards-import.js','apostila.js']) {
  execFileSync(process.execPath,['--check',path.join(source,file)],{stdio:'inherit'});
}
await rm('private-content', { recursive: true, force: true });
await cp(source, 'private-content', { recursive: true });
// Reconcilia apenas Tributário; fontes versionadas permanecem intactas.
const rootData=JSON.parse(await readFile('difficulty-data.json','utf8'));
const liveDataPath=path.join('private-content','difficulty-data.json');
const {reconcileTaxCatalog}=await import('../lib/tax-catalog.mjs');
const reconciled=reconcileTaxCatalog(JSON.parse(await readFile(liveDataPath,'utf8')),rootData);
const liveData=reconciled.data;
const {taxBookReferences}=await import('../source-content/tributario-volumes.js');
const taxBook=JSON.parse(await readFile(path.join(source,'apostila-data.json'),'utf8'));
liveData.taxBookReferences=taxBookReferences(taxBook.sections);
await writeFile('private-content/tax-reconciliation-report.json',JSON.stringify(reconciled.report));
// Atualiza a apostila de Terceiro Setor sem substituir as outras anotações.
const thirdSectorId='1u1MmLJt6Mv2WMLb_PPN5MU_8bOjpQ6_CovatTzF8PFc';
const updatedThirdSector=rootData.analysis?.analyzedFiles?.find(n=>n.id===thirdSectorId);
if(updatedThirdSector){
 const i=liveData.analysis.analyzedFiles.findIndex(n=>n.id===thirdSectorId);
 if(i>=0)liveData.analysis.analyzedFiles[i]={...liveData.analysis.analyzedFiles[i],...updatedThirdSector};
 else liveData.analysis.analyzedFiles.push(updatedThirdSector);
}
// Copia a revisão de consórcios para o catálogo efetivamente publicado.
const consortiumId='nota-consorcio-contrato-programa-2026';
const rootAdmin=rootData.folders.find(f=>f.subject==='Direito Administrativo'&&f.path.length===1);
const liveAdmin=liveData.folders.find(f=>f.id===rootAdmin?.id);
const consortiumFile=rootAdmin?.files.find(f=>f.id===consortiumId);
const consortiumNote=rootData.analysis.analyzedFiles.find(n=>n.id===consortiumId);
if(liveAdmin&&consortiumFile&&!liveAdmin.files.some(f=>f.id===consortiumId))liveAdmin.files.push(consortiumFile);
if(consortiumNote){const i=liveData.analysis.analyzedFiles.findIndex(n=>n.id===consortiumId);if(i<0)liveData.analysis.analyzedFiles.push(consortiumNote);else liveData.analysis.analyzedFiles[i]=consortiumNote;}
// Publica o quadro compacto de AFO preservando o catálogo e o PDF original.
const afoId='1fRQUGhq2tcrpwU3sCJV0wdveCVO04zWw';
const afoNote=rootData.analysis?.analyzedFiles?.find(n=>n.id===afoId);
if(afoNote){const i=liveData.analysis.analyzedFiles.findIndex(n=>n.id===afoId);if(i>=0)liveData.analysis.analyzedFiles[i]={...liveData.analysis.analyzedFiles[i],...afoNote};else liveData.analysis.analyzedFiles.push(afoNote);}
// Sincroniza todas as anotações revisadas de AFO mantendo os PDFs originais.
const afoFileIds=new Set(rootData.folders.filter(f=>f.subject==='AFO e Direito Financeiro').flatMap(f=>f.files.map(x=>x.id)));
for(const afoId2 of afoFileIds){const note=rootData.analysis.analyzedFiles.find(n=>n.id===afoId2);if(!note)continue;const i=liveData.analysis.analyzedFiles.findIndex(n=>n.id===afoId2);if(i<0)liveData.analysis.analyzedFiles.push(note);else liveData.analysis.analyzedFiles[i]={...liveData.analysis.analyzedFiles[i],...note};}
// Sincroniza os índices visuais do conteúdo constitucional enviado, preservando os PDFs.
const constitutionalIds=new Set(rootData.folders.filter(f=>f.subject==='Direito Constitucional').flatMap(f=>(f.files||[]).map(x=>x.id)));
for(const id of constitutionalIds){const note=rootData.analysis.analyzedFiles.find(n=>n.id===id);if(!note?.contentBlocks?.length)continue;const i=liveData.analysis.analyzedFiles.findIndex(n=>n.id===id);if(i>=0)liveData.analysis.analyzedFiles[i]={...liveData.analysis.analyzedFiles[i],...note};}
// Atualiza os blocos visuais de todas as matérias catalogadas, preservando arquivos originais.
for(const originalNote of rootData.analysis.analyzedFiles){if(liveData.folders.filter(f=>f.subject==='Tributário').some(f=>f.files.some(x=>x.id===originalNote.id)))continue;if(!originalNote.contentBlocks?.some(b=>b.type==='callout'||b.type==='flowchart'))continue;const index=liveData.analysis.analyzedFiles.findIndex(n=>n.id===originalNote.id);if(index>=0)liveData.analysis.analyzedFiles[index]={...liveData.analysis.analyzedFiles[index],contentBlocks:originalNote.contentBlocks};}
liveData.source ||= {};
liveData.source.checkedAt=new Date().toISOString();
await writeFile(liveDataPath,JSON.stringify(liveData));
console.log('Tributário conciliado por ID; variantes preservadas no relatório de build.');
const files = [];
async function walk(dir, relative = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) await walk(path.join(dir, entry.name), name);
    else if (entry.isFile() && !entry.name.startsWith('.')) files.push(name);
  }
}
await walk('private-content');

const {selectOfflineFiles}=await import('../lib/offline-files.mjs');
const offlineEntries=await Promise.all(files.map(async name=>({name,bytes:(await stat(path.join('private-content',name))).size})));
const offlineFiles=selectOfflineFiles(offlineEntries);
await writeFile('private-content/offline-files.json',JSON.stringify(offlineFiles));
files.push('offline-files.json');
await writeFile('private-content/_allowlist.json', JSON.stringify(files));

await rm('public', { recursive: true, force: true });
await mkdir('public');
await writeFile('public/.keep', '');
console.log(`Preparados ${files.length} arquivos privados. Nenhum conteúdo no diretório público.`);
