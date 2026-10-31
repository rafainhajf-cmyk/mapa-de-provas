import test from 'node:test';
import assert from 'node:assert/strict';
import {accountingSetsHTML} from './source-content/accounting-curated.js';
test('questões TEC exibem enunciados e alternativas antes da resposta recolhida',()=>{
 const html=accountingSetsHTML();
 assert.match(html,/A contabilidade tem por objeto/);
 assert.match(html,/o patrimônio das entidades/);
 assert.match(html,/data-curated-id="TEC-2013231"/);
 const at=html.indexOf('A contabilidade tem por objeto');
 assert.ok(at<html.indexOf('<summary>Revelar gabarito e resolução',at));
 assert.doesNotMatch(html,/<details[^>]*\bopen\b/);
});
test('um único cartão por ID preserva a contagem de progresso',()=>{
 const ids=[...accountingSetsHTML().matchAll(/data-curated-id="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(ids.length,new Set(ids).size);
});
import {resolvedQuestions,tecKinds,iaOriginal} from './source-content/accounting-curated.js';
import {tecOriginals} from './source-content/accounting-originals.js';
import {secondBatch} from './source-content/accounting-solutions-02.js';
test('inventário conta questões únicas analisadas e preserva a origem',()=>{
 assert.equal(secondBatch.length,17);
 assert.equal(resolvedQuestions.length,62);
 assert.equal(new Set(resolvedQuestions.map(q=>q.id)).size,62);
 for(const q of resolvedQuestions){
  assert.ok(tecOriginals[q.id]?.text.length>80,q.id);
  assert.ok(tecOriginals[q.id].page>0,q.id);
  assert.equal(q.kind,tecKinds[q.id],q.id);
 }
 for(const q of Object.values(tecOriginals))assert.doesNotMatch(q.text,/Gabarito\s*:/i,q.id);
 assert.equal(tecKinds['2814660'],'teoria'); // definição de valor residual, apesar do tema imobilizado
 assert.equal(tecKinds['2924798'],'teoria'); // ICMS: natureza da conta, sem cálculo
 assert.equal(tecKinds['1889254'],'calculo');
});
test('IA mantém os 28 IDs e alternativas completas com resolução',()=>{
 assert.deepEqual(iaOriginal.map(q=>q.id),Array.from({length:28},(_,i)=>'IA-'+String(i+1).padStart(2,'0')));
 for(const q of iaOriginal){assert.equal(q.options.length,5,q.id);assert.match(q.key,/^[A-E]$/);assert.ok(q.solution.length>150,q.id)}
});
test('tabelas do lote conservam células e valores separados',()=>{
 const html=accountingSetsHTML();
 assert.match(html,/<th>31\/12\/2023<\/th>/);
 assert.match(html,/<td>1.140.000<\/td>/);
 assert.match(html,/<td>R\$ 3.000.000<\/td>/);
 assert.match(tecOriginals['2266771'].text,/Investimentos \(Cia X\) \| 48.000/);
 assert.match(html,/<th>Patrimônio Líquido<\/th>/);
});
