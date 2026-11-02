import test from 'node:test';
import assert from 'node:assert/strict';

test('Macroeconomia inclui dez cartões sem alterar os cartões e revisões existentes', async () => {
 const {MACRO_CARDS,withMacroCards}=await import('./source-content/flashcards-macroeconomia.js');
 assert.equal(MACRO_CARDS.length,10);
 assert.equal(new Set(MACRO_CARDS.map(c=>c.id)).size,10);
 const old={id:'literalidade:antigo',subjectKey:'lte',fields:{Pergunta:'Original',Resposta:'Intocada'}};
 const snapshot=JSON.stringify(old);
 const combined=withMacroCards([old]);
 assert.equal(combined.length,11);
 assert.equal(combined[0],old);
 assert.equal(JSON.stringify(old),snapshot);
 assert.equal(withMacroCards(combined).length,11);
 for(const card of MACRO_CARDS){assert.equal(card.subjectKey,'macroeconomia');assert.ok(card.fields.Pergunta);assert.ok(card.fields.Resposta);assert.ok(card.id.startsWith('mapa:macro:'));}
 const customized={...MACRO_CARDS[0],fields:{Pergunta:'Minha pergunta',Resposta:'Minha resposta'}};
 assert.equal(withMacroCards([customized]).find(c=>c.id===customized.id),customized);
});
