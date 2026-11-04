import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {compileNormativo} from './scripts/import-normativo.mjs';
import {visualGuides} from './source-content/normativo-visuals.js';
const d=await compileNormativo();
test('importação idempotente mantém 503 IDs únicos e os 301 pontos integrais',async()=>{assert.deepEqual(await compileNormativo(),d);assert.equal(new Set(d.questions.map(q=>q.id)).size,503);assert.equal(d.questions.filter(q=>q.origin==='Original').length,328);assert.equal(d.questions.filter(q=>q.origin==='Complementar').length,175);const src=JSON.parse(gunzipSync(Buffer.from(await readFile('data-sources/tributario-normativo/snapshot.json.gz.base64','utf8'),'base64')));assert.deepEqual(d.legacyPoints,src[3].values.slice(1));for(const r of d.legacyPoints)assert(d.nuclei.some(n=>n.aliases.includes(r[1])));assert.equal(d.topics.length,18);});
test('núcleos não inventam incidência direta por extração lexical ou distratores',()=>{assert(d.nuclei.every(n=>n.confirmedIds.length===0));assert.deepEqual(visualGuides.flatMap(g=>g.confirmed).sort(),d.reviewedBindings.map(r=>r.questionId).sort());for(const id of ['1015171','3764380'])assert(!visualGuides.some(g=>g.confirmed.includes(id)));assert(d.nuclei.filter(n=>n.area==='ITCMD').every(n=>/ITCMD/i.test(n.title)));});
test('questões completas e fontes preservadas, inclusive ressalvas e dados pessoais da planilha',()=>{for(const q of d.questions){assert(q.statement);assert(q.answer);assert(q.raw.length);assert(q.resolution);}for(const topic of d.topics.slice(7,12))assert(d.nuclei.some(n=>n.topics.includes(topic.id)));});
test('conteúdo e dependências do Normativo estão no manifesto offline prioritário',async()=>{const files=JSON.parse(await readFile('private-content/offline-files.json'));for(const f of ['normativo.html','normativo-data.json','normativo.js','normativo-visuals.js','normativo.css','review-blocks.js','review-blocks.css'])assert(files.indexOf('/'+f)>=0&&files.indexOf('/'+f)<20);});
test('tela reutiliza armazenamento sincronizado sem limpar dados ou expor gabarito antes dos detalhes',async()=>{const s=await readFile('source-content/normativo.js','utf8');assert(s.includes('mapa-study-progress-v1'));assert(s.includes('mapa-study-observations-v1'));assert(!s.includes('localStorage.clear'));assert(s.includes('<details><summary>Ver gabarito e explicação detalhada</summary>'));assert(s.includes('data[map]??={}'));assert(s.includes('data[id]=value'));});

test('cruzamento DT cobre todos os IDs e separa candidatos de conferências individuais',()=>{assert.equal(d.dtCrosswalk.records.length,503);assert.equal(d.dtCrosswalk.volumes.length,8);assert.equal(new Set(d.dtCrosswalk.records.map(r=>r.id)).size,503);assert.equal(d.reviewedBindings.length,131);for(const r of d.reviewedBindings){const q=d.questions.find(q=>q.id===r.questionId);assert.equal(q.answer,r.answer);assert(visualGuides.some(g=>g.id===r.guideId&&g.confirmed.includes(q.id)));}assert(d.dtCrosswalk.records.filter(r=>r.kind==='candidate').length>d.reviewedBindings.length);assert(d.dtCrosswalk.records.find(r=>r.id==='3116125').kind==='not-located');});
test('esquemas têm referências, cores semânticas e decisões; todos os textos legados continuam em visão própria',async()=>{assert.equal(visualGuides.length,77);assert.equal(new Set(visualGuides.map(g=>g.id)).size,77);for(const g of visualGuides){assert(g.law);assert(g.blocks.some(b=>['table','flowchart','timeline'].includes(b.type)));}const html=await readFile('source-content/normativo.html','utf8');assert(html.includes('value="nuclei"'));const files=JSON.parse(await readFile('private-content/offline-files.json'));assert(files.includes('/normativo-dt-guides.js'));});

test('referência conferida prevalece sobre sugestão textual não decisiva',()=>{const r=d.reviewedBindings.find(x=>x.questionId==='3023554');assert.deepEqual(r.dtReferences.map(x=>[x.volume,x.section]),[[5,'07.5']]);assert.equal(r.dtReferences[0].page,30);});

test('correção de alternativas usa PDF e preserva a extração bruta para auditoria',()=>{
 const q=d.questions.find(q=>q.id==='3112998');
 assert.equal(q.alternatives.split('\n').length,5);
 assert(q.raw[5].includes('denominaçãoc)'));
 assert(!q.alternatives.includes('denominaçãoc)'));
 for(const id of ['734450','3112998','3233108','719764']){
  const r=d.reviewedBindings.find(r=>r.questionId===id);
  assert(r.sourceEvidence.page>0);assert(r.examYear>=2018);
 }
});

test('ressalvas temporais e sobreposição de alternativas permanecem explícitas',()=>{
 for(const id of ['2235806','3670614']){
  const r=d.reviewedBindings.find(r=>r.questionId===id);
  assert.equal(r.reviewStatus,'with-caveat');
 }
 const ambiguity=d.reviewedBindings.find(r=>r.questionId==='2235806');
 assert.match(ambiguity.temporalStatus,/alternativa B/);
 const fire=d.reviewedBindings.find(r=>r.questionId==='3670614');
 assert.equal(fire.sourceEvidence.endPage,6);
 assert.match(fire.temporalStatus,/26\/03\/2025/);
 const law=d.questions.find(q=>q.id==='3113014');
 assert.equal(law.alternatives.match(/^[a-e]\)/gm).length,4);
 assert.equal(new Set(d.reviewedBindings.map(r=>r.questionId)).size,d.reviewedBindings.length);
});

test('precisões do IVVC, matriz e divergência de gabarito preservam originais',()=>{
 const ivvc=d.questions.find(q=>q.id==='1037325');
 assert.match(ivvc.resolution,/01\/01\/1996/);
 assert.match(ivvc.raw[8],/1993/);
 const matrix=d.questions.find(q=>q.id==='2041802');
 assert.equal(matrix.alternatives.split('\n').length,5);
 assert.match(matrix.alternatives,/d\) I: União; II: União; III: Municípios; IV: Estados e DF/);
 const ambiguity=d.reviewedBindings.find(r=>r.questionId==='719259');
 assert.equal(ambiguity.sourceAnswer,'D');
 assert.equal(ambiguity.answer,'C/D');
 assert.equal(d.questions.find(q=>q.id==='719259').answer,'C/D');
 assert.equal(ambiguity.reviewStatus,'with-caveat');
});

test('correção263610 preserva resposta antiga, usa gabarito do PDF e remove comentário de outra questão da exibição',()=>{const q=d.questions.find(q=>q.id==='263610');const r=d.reviewedBindings.find(r=>r.questionId===q.id);assert.equal(q.answer,'B');assert.equal(q.raw[6],'D');assert.equal(q.raw[7],'B');assert.equal(r.sourceAnswer,'D');assert.match(q.raw[8],/homologação se aplica/);assert.match(q.resolution,/junho\/2018/);assert(!q.knowledge.includes('imposto x tributo'));assert.match(q.law,/436/);assert(r.sourceAnswerNote);});

test('ressalvas não transformam garantia em depósito nem negam toda denúncia espontânea',()=>{for(const id of ['300953','1768970','3685885'])assert.equal(d.reviewedBindings.find(r=>r.questionId===id).reviewStatus,'with-caveat');assert.match(d.questions.find(q=>q.id==='300953').resolution,/verdadeiro/);assert.match(d.questions.find(q=>q.id==='1768970').resolution,/Tema237/);const cda=visualGuides.find(g=>g.id==='lote-cda-correcao');assert.deepEqual(cda.confirmed,['87990','282885']);});
