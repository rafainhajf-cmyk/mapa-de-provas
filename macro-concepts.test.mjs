import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {macroConcepts} from './source-content/macro-concepts.js';
const readJSON=async p=>JSON.parse(await readFile(p,'utf8'));

test('o build publica a revisão conceitual para todos os 13 grupos existentes',async()=>{
 const raw=await readJSON('private-content/difficulty-data.json');
 for(const node of raw.subjectCatalogs.Macroeconomia.nodes){
  assert.ok(macroConcepts[node.id]?.length,`revisão ausente: ${node.title}`);
  for(const section of macroConcepts[node.id])assert.ok(section.title&&section.blocks.length);
 }
 assert.equal(await readFile('private-content/macro-concepts.js','utf8'),await readFile('source-content/macro-concepts.js','utf8'));
 const html=await readFile('private-content/dificuldades.html','utf8');
 assert.match(html,/dificuldades.js\?v=109/);
 const script=await readFile('private-content/dificuldades.js','utf8');
 assert.match(script,/import .*macroConcepts.*macro-concepts/);
 assert.match(script,/t.subject==='Macroeconomia'\?macroTopicHTML/);
});
test('quatro assuntos prioritários têm comparação, fórmula, exemplo, regra, cuidado e pegadinha',()=>{
 for(const id of ['macro-topico-02','macro-topico-03','macro-topico-04','macro-topico-05']){
  const blocks=macroConcepts[id].flatMap(s=>s.blocks);
  for(const type of ['table','formula'])assert.ok(blocks.some(b=>b.type===type),`${id}: ${type}`);
  for(const kind of ['rule','warning','danger'])assert.ok(blocks.some(b=>b.kind===kind),`${id}: ${kind}`);
  assert.ok(blocks.some(b=>/Exemplo resolvido/.test(b.title)));
 }
});
test('o catálogo, os arquivos e os gráficos IS-LM sobrevivem ao build',async()=>{
 const source=await readJSON('source-content/difficulty-data.json'),built=await readJSON('private-content/difficulty-data.json');
 const sourceFolder=source.folders.find(f=>f.subject==='Macroeconomia');
 assert.deepEqual(built.folders.find(f=>f.id===sourceFolder.id),sourceFolder);
 for(const f of sourceFolder.files){
  const a=source.analysis.analyzedFiles.find(n=>n.id===f.id),b=built.analysis.analyzedFiles.find(n=>n.id===f.id);
  assert.deepEqual(b,a,`anotação modificada: ${f.id}`);
 }
 const diagrams=source.analysis.analyzedFiles.filter(n=>sourceFolder.files.some(f=>f.id===n.id)).flatMap(n=>(n.visualBlocks||[]).filter(b=>b.type==='diagram'));
 assert.ok(diagrams.length>=3);
});
