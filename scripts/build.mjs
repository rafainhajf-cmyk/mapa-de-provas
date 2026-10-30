import { cp, mkdir, readdir, rm, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';
let source = path.resolve('source-content');
try { await access(path.join(source, 'index.html')); }
catch { source = path.resolve('../dist'); }
await access(path.join(source, 'index.html'));
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
liveData.source ||= {};
liveData.source.checkedAt=new Date().toISOString();
await writeFile(liveDataPath,JSON.stringify(liveData));
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
await writeFile('private-content/_allowlist.json', JSON.stringify(files));
await rm('public', { recursive: true, force: true });
await mkdir('public');
await writeFile('public/.keep', '');
console.log(`Preparados ${files.length} arquivos privados. Nenhum conteúdo no diretório público.`);
