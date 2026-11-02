import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderReviewBlocks,compactReviewBlocks,escapeReview} from './source-content/review-blocks.js';
import {apostilaVisualBlocks} from './source-content/apostila-visuals.js';
import {auditStudy} from './scripts/audit-study.mjs';

test('blocos de comparação, decisão, tempo, fórmula e cores têm HTML seguro e acessível',()=>{
 const html=renderReviewBlocks([
 {type:'callout',kind:'danger',title:'Pegadinha',text:'<script>alert(1)</script>'},
 {type:'callout',kind:'warning',title:'Exceção',text:'Condição'},
 {type:'callout',kind:'rule',title:'Regra',text:'Permitido'},
 {type:'formula',text:'M = C × (1 + i)ⁿ'},
 {type:'flowchart',title:'Decisão',steps:[{label:'Condição?'},{label:'SIM → exceção',kind:'warning'},{label:'NÃO → regra'}]},
 {type:'timeline',title:'Prazo',steps:[{label:'Dia 1'},{label:'Dia 10'}]},
 {type:'table',rows:[['Conceito A','Conceito B'],['Diferença A','Diferença B']]}
 ]);
 assert.match(html,/scope="col"/);assert.match(html,/review-timeline/);assert.match(html,/review-flow/);assert.match(html,/review-formula/);
 for(const k of ['danger','warning','rule'])assert.match(html,new RegExp('review-callout '+k));
 assert.doesNotMatch(html,/<script>/);assert.match(html,/&lt;script&gt;/);
});
test('81 seções da apostila conservam IDs e todo o conteúdo original após a formatação',async()=>{
 const data=JSON.parse(await readFile('source-content/apostila-data.json','utf8'));
 assert.equal(data.sections.length,81);assert.equal(new Set(data.sections.map(s=>s.id)).size,81);
 const texts=bs=>bs.flatMap(b=>[...(b.text?[b.text]:[]),...(b.rows?.flat()||[]),...texts(b.blocks||[])]);
 for(const section of data.sections){
  const html=renderReviewBlocks(compactReviewBlocks(apostilaVisualBlocks(section)));
  for(const text of texts(section.blocks))assert.ok(html.includes(escapeReview(text)),`${section.id}: texto perdido`);
  assert.doesNotMatch(html,/undefined/);
 }
});
test('explicações longas ficam recolhidas e os quadros permanecem na revisão',()=>{
 const p={type:'paragraph',text:'Explicação completa. '.repeat(30)};
 const blocks=[{type:'table',rows:[['A','B'],['1','2']]},p];
 const snapshot=JSON.stringify(blocks),compact=compactReviewBlocks(blocks);
 assert.equal(compact[0].type,'table');assert.equal(compact[1].type,'detail');assert.equal(compact[1].blocks[0],p);assert.equal(JSON.stringify(blocks),snapshot);
 assert.doesNotMatch(renderReviewBlocks(compact),/<details[^>]*\bopen\b/);
});
test('auditoria não confunde OCR ou índice vazio com material esquematizado',()=>{
 const data={folders:[{subject:'Teste',files:[{id:'ocr'},{id:'vazio'},{id:'quadro'}]}],analysis:{analyzedFiles:[
 {id:'ocr',contentBlocks:[{type:'table',rows:[['Trecho identificado no material','Como revisar'],['página 1','Confira o PDF']]}]},
 {id:'vazio',contentSections:[{blocks:[{type:'paragraph',text:'Aguardando suas anotações. Este trecho ainda não foi preenchido com teoria.'}]}]},
 {id:'quadro',contentBlocks:[{type:'table',rows:[['Conceito','Diferença'],['A','B']]}]}
 ]}};
 assert.deepEqual(auditStudy(data).materials.map(m=>m.status),['pending','empty','structured']);
});
test('enunciado dos exercícios não é recolhido pelo compactador de teoria',async()=>{
 globalThis.document={addEventListener(){}};
 const {accountingStudyHTML}=await import('./source-content/accounting-study.js');delete globalThis.document;
 const statement=[{type:'paragraph',text:'Enunciado completo '.repeat(40)}];let statementOptions;
 const html=accountingStudyHTML([{id:'ex',title:'Exercício',exercises:[{statement,answer:[{type:'paragraph',text:'Resposta'}]}]}],(blocks,options)=>{if(blocks===statement)statementOptions=options;return renderReviewBlocks(options?.compact===false?blocks:compactReviewBlocks(blocks));});
 assert.equal(statementOptions.compact,false);assert.ok(html.indexOf(escapeReview(statement[0].text))<html.indexOf('Revelar resposta'));
 assert.doesNotMatch(html,/<details class="accounting-answer"[^>]*\bopen\b/);
});
