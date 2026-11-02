import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {MACRO_CARDS} from './source-content/flashcards-macroeconomia.js';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server=createServer(async(req,res)=>{try{const p=new URL(req.url,'http://localhost').pathname;if(p.includes('..'))throw Error();const body=await readFile('private-content'+p);res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(body)}catch{res.statusCode=404;res.end()}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;
try{
 browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const url=`http://127.0.0.1:${server.address().port}/flashcards.html?materia=macroeconomia`;
 await page.goto(url);await page.waitForSelector('[data-subject="macroeconomia"]');
 assert.match(await page.locator('#subjectDetail').textContent(),/10 cartões/);
 await page.evaluate(async()=>{
  const {openDB}=await import('/flashcards-import.js?v=4');const db=await openDB();
  await new Promise((resolve,reject)=>{const tx=db.transaction(['cards','media'],'readwrite');tx.objectStore('cards').add({id:'literalidade:sentinela',sourceId:'sentinela',subjectKey:'lte',type:'Pergunta',deckPath:'LTE::Volume::Tema',sourceFile:'anterior.apkg',fields:{Pergunta:'Pergunta anterior',Resposta:'Resposta anterior'}});tx.objectStore('media').add({name:'anterior.apkg::imagem',blob:new Blob(['bytes anteriores'])});tx.oncomplete=resolve;tx.onerror=reject;});
  localStorage.setItem('mapa-anki-reviews-v1',JSON.stringify({'literalidade:sentinela':{grade:'hard',attempts:7,misses:2,due:123}}));
 });
 await page.reload();await page.waitForSelector('#revealAnswer');
 await page.locator('#showAll').uncheck();
 const seen=new Set();
 for(let i=0;i<10;i++){
  const question=await page.locator('.fc-question').textContent();const card=MACRO_CARDS.find(c=>c.fields.Pergunta===question);assert.ok(card);assert.ok(!seen.has(card.id));seen.add(card.id);
  assert.equal(await page.locator('.fc-answer').count(),0);await page.locator('#revealAnswer').click();
  assert.equal(await page.locator('.fc-answer .fc-original').first().textContent(),card.fields.Resposta);
  await page.locator('[data-grade="good"]').click();
 }
 assert.equal(seen.size,10);
 await page.reload();await page.waitForSelector('#revealAnswer');
 const state=await page.evaluate(async()=>{const {allCards,mediaBlob}=await import('/flashcards-import.js?v=4');return {cards:await allCards(),media:await (await mediaBlob('imagem','anterior.apkg')).text(),reviews:JSON.parse(localStorage.getItem('mapa-anki-reviews-v1'))}});
 assert.equal(state.cards.length,1);assert.equal(state.cards[0].fields.Resposta,'Resposta anterior');assert.equal(state.media,'bytes anteriores');assert.deepEqual(state.reviews['literalidade:sentinela'],{grade:'hard',attempts:7,misses:2,due:123});
 for(const c of MACRO_CARDS)assert.equal(state.reviews[c.id].attempts,1);
 await page.locator('[data-subject="lte"]').click();assert.equal(await page.locator('.fc-question').textContent(),'Pergunta anterior');
 await page.locator('[data-subject="macroeconomia"]').click();
 await page.screenshot({path:'/tmp/macroeconomia-desktop.png'});
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:'/tmp/macroeconomia-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log('Navegador: 10 frentes e versos conferidos, avaliações e progresso após recarga; baralho, mídia e histórico anteriores preservados; sem duplicação; mobile sem overflow; zero erros.');
}finally{await browser?.close();await new Promise(r=>server.close(r));}
