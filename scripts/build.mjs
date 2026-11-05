import { cp, mkdir, readdir, rm, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
execFileSync(process.execPath,['--test','study-knowledge.test.mjs'],{stdio:'inherit'});
await import('./import-normativo.mjs').then(async({compileNormativo})=>writeFile('source-content/normativo-data.json',JSON.stringify(await compileNormativo())));
let source = path.resolve('source-content');
try { await access(path.join(source, 'index.html')); }
catch { source = path.resolve('../dist'); }
await access(path.join(source, 'index.html'));
// Valida todos os módulos publicados, incluindo os leitores da apostila.
for(const file of (await readdir(source)).filter(file=>file.endsWith('.js'))) {
  execFileSync(process.execPath,['--check',path.join(source,file)],{stdio:'inherit'});
}
await rm('private-content', { recursive: true, force: true });
await cp(source, 'private-content', { recursive: true });
// Sincroniza o conteúdo da LC 236/2026 com o catálogo realmente publicado.
// O deploy usa source-content/ (não os arquivos JSON/JS da raiz).
// Preserve todos os assuntos já presentes no catálogo completo do site.
const contentId='1xVJ_RhniJjKIGszflLKHTWvgOQTi_coZXoBpXyq5IR8';
const contentFolderId='1BSE-vM28stxZQU4K8rxjiDrZXIEvr5aY';
const rootData=JSON.parse(await readFile('difficulty-data.json','utf8'));
const liveDataPath=path.join('private-content','difficulty-data.json');
const liveData=JSON.parse(await readFile(liveDataPath,'utf8'));
const sourceFolder=rootData.folders.find(f=>f.id===contentFolderId);
const sourceNote=rootData.analysis?.analyzedFiles?.find(n=>n.id===contentId);
if(!sourceFolder||!sourceNote)throw Error('LC 236/2026: pasta ou anotação não encontrada na fonte de atualização.');
if(!Array.isArray(liveData.folders)||!Array.isArray(liveData.analysis?.analyzedFiles))throw Error('Catálogo principal do site inválido.');
const targetFolder=liveData.folders.find(f=>f.id===contentFolderId);
if(targetFolder){
  for(const file of sourceFolder.files) {
    const index=targetFolder.files.findIndex(f=>f.id===file.id);
    if(index<0)targetFolder.files.push(file);
    else targetFolder.files[index]=file;
  }
}else liveData.folders.push(sourceFolder);
const note={...sourceNote,topic:'Reforma — Lei 236/2026',pinnedOrder:0};
const existingNote=liveData.analysis.analyzedFiles.findIndex(n=>n.id===contentId);
if(existingNote<0)liveData.analysis.analyzedFiles.push(note);
else liveData.analysis.analyzedFiles[existingNote]=note;
liveData.subjectCatalogs ||= {};
liveData.subjectCatalogs['Tributário'] ||= {coverage:'partial',source:'Materiais enviados para Tributário',nodes:[]};
const catalog=liveData.subjectCatalogs['Tributário'];
catalog.nodes ||= [];
if(!catalog.nodes.some(n=>n.id==='reforma-lei-236-2026'))
  catalog.nodes.push({id:'reforma-lei-236-2026',title:'Reforma — Lei 236/2026',fileIds:[contentId]});
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
for(const originalNote of rootData.analysis.analyzedFiles){if(!originalNote.contentBlocks?.some(b=>b.type==='callout'||b.type==='flowchart'))continue;const index=liveData.analysis.analyzedFiles.findIndex(n=>n.id===originalNote.id);if(index>=0)liveData.analysis.analyzedFiles[index]={...liveData.analysis.analyzedFiles[index],contentBlocks:originalNote.contentBlocks};}
liveData.source ||= {};
liveData.source.checkedAt=new Date().toISOString();
await writeFile(liveDataPath,JSON.stringify(liveData));
const {writeStudyAudit}=await import('./audit-study.mjs');
await writeStudyAudit();
console.log('Conteúdo destacado: Tributário > Reforma — Lei 236/2026 (1 anotação, página 1).');
const files = [];
async function walk(dir, relative = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) await walk(path.join(dir, entry.name), name);
    else if (entry.isFile() && !entry.name.startsWith('.')) files.push(name);
  }
}
await walk('private-content');

const offlineCore=['normativo.html','normativo.js','normativo.css','normativo-data.json','normativo-visuals.js','normativo-dt-guides.js','review-blocks.js','review-blocks.css','study-sync.js','study-sync-core.js','main-navigation.css','index.html','dificuldades.html','apostila.html','flashcards.html','provas.html','offline.js','offline-sw.js','offline-files.json'];
const offlineFiles=[];let offlineBytes=0;
for(const name of [...offlineCore,...files.filter(name=>/\.(?:html|js|css|json|pdf|svg|png|jpg|jpeg|webp)$/.test(name))]){
 if(name==='offline-files.json'||offlineFiles.includes('/'+name)||!files.includes(name)&&!offlineCore.includes(name))continue;
 const size=(await import('node:fs/promises')).stat(path.join('private-content',name)).then(x=>x.size).catch(()=>0);
 const bytes=await size;
 if(!offlineCore.includes(name)&&(bytes>8*1024*1024||offlineBytes+bytes>45*1024*1024))continue;
 offlineFiles.push('/'+name);offlineBytes+=bytes;
}
await writeFile('private-content/offline-files.json',JSON.stringify(offlineFiles));
files.push('offline-files.json');
await writeFile('private-content/_allowlist.json', JSON.stringify(files));

await rm('public', { recursive: true, force: true });
await mkdir('public');
await writeFile('public/.keep', '');
console.log(`Preparados ${files.length} arquivos privados. Nenhum conteúdo no diretório público.`);
