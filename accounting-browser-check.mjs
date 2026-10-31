import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
// Use PLAYWRIGHT_MODULE apenas se Playwright estiver em um runtime externo.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server=createServer(async(req,res)=>{try{const p=new URL(req.url,'http://localhost').pathname; if(p.includes('..'))throw Error();const body=await readFile('source-content'+p);res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(body)}catch{res.statusCode=404;res.end()}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
 browser=await chromium.launch({headless:true,channel:process.env.CHROME_CHANNEL || 'chrome'});
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const url=`http://127.0.0.1:${server.address().port}/contabilidade-exercicios.html`;
 await page.goto(url);await page.waitForSelector('[data-curated-id="TEC-2013231"]');
 assert.equal(await page.locator('article[data-exercise-kind]').count(),161);
 assert.equal(await page.locator('article details[open]').count(),0);
 const original=page.locator('article').filter({has:page.locator('[data-curated-id="TEC-2013231"]')});
 assert.ok(await original.locator('.tec-statement').isVisible());
 await page.locator('[data-curated-id="TEC-2013231"]').check();
 await page.reload();assert.ok(await page.locator('[data-curated-id="TEC-2013231"]').isChecked());
 await page.selectOption('#filterDone','done');assert.equal(await page.locator('article[data-exercise-kind]:visible').count(),1);
 await page.selectOption('#filterDone','all');await page.selectOption('#filterKind','calculo');
 assert.equal(await page.locator('article[data-exercise-kind="teoria"]:visible').count(),0);
 await page.selectOption('#filterSolved','yes');
 assert.equal(await page.locator('article[data-exercise-solved="no"]:visible').count(),0);
 await page.selectOption('#filterKind','all');await page.selectOption('#filterSolved','all');
 await original.locator('summary').click();assert.ok(await original.locator('details').getAttribute('open')!==null);
 await page.screenshot({path:'/tmp/mapa-contab-desktop.png'});
 await page.locator('article').filter({has:page.locator('[data-curated-id="TEC-3847013"]')}).screenshot({path:'/tmp/mapa-contab-tabela.png'});
 await page.locator('article').filter({has:page.locator('[data-curated-id="IA-11"]')}).screenshot({path:'/tmp/mapa-contab-ia.png'});
 await page.setViewportSize({width:390,height:844});await page.reload();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:'/tmp/mapa-contab-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log('Browser: 161 cartões; enunciados visíveis; respostas recolhidas; filtros; progresso após recarga; mobile sem overflow; zero erros.');
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
