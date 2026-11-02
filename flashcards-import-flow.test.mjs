import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('./source-content/flashcards.js',import.meta.url),'utf8');
const handler=source.slice(source.indexOf('async function doImport('),source.indexOf('\nfunction init()',source.indexOf('async function doImport(')));
async function runImport(subjectAtStart,forcedReform){
 const elements={importSubject:{value:subjectAtStart},importButton:{disabled:false},status:{textContent:''},importFile:{value:'baralho.apkg'}};
 const savedSubject=forcedReform?'lei236':subjectAtStart;
 const card={id:'card-original',subjectKey:savedSubject};
 const context={busy:false,subject:subjectAtStart,filter:'old',showAll:true,$:s=>elements[s.slice(1)],importApkg:async()=>({forcedReform,added:1,moved:0,kept:0,media:1,fromFile:1}),refresh:async()=>{context.visible=card.subjectKey===context.subject;},visible:false};
 await vm.runInNewContext(handler+'\ndoImport({name:"baralho.apkg"})',context);
 return {context,elements,card};
}
test('LC236 abre a matéria onde o importador salvou os cartões',async()=>{
 const {context,elements,card}=await runImport('tributario',true);
 assert.equal(context.subject,card.subjectKey);
 assert.equal(context.visible,true);
 assert.equal(card.id,'card-original');
 assert.equal(elements.importButton.disabled,false);
 assert.equal(elements.importFile.value,'');
});
test('importação comum mantém a matéria escolhida e limpa filtros antigos',async()=>{
 for(const subject of ['tributario','reforma','lte','lei236']){
  const {context}=await runImport(subject,false);
  assert.equal(context.subject,subject);assert.equal(context.visible,true);
  assert.equal(context.filter,'');assert.equal(context.showAll,false);
 }
});
