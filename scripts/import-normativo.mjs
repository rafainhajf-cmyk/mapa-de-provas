import {readFile,writeFile} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
export async function compileNormativo(){
 const sources=JSON.parse(gunzipSync(Buffer.from(await readFile('data-sources/tributario-normativo/snapshot.json.gz.base64','utf8'),'base64')).toString('utf8'));
 const rows=i=>sources[i].values.slice(1);const ids=s=>[...new Set(String(s||'').match(/\d{5,}/g)||[])];
 const questions=[...rows(2).map(r=>({id:r[1],origin:'Original',topic:r[2],subject:r[3],statement:r[4],alternatives:r[5],answer:r[7]||r[6],resolution:r[8],knowledge:r[9],law:r[10],official:r[11],reference:r[12],file:r[13],url:r[14],status:r[15],temporal:r[16]||'',raw:r})),...rows(5).map(r=>({id:r[0],origin:'Complementar',topic:'Complementares',subject:r[1],exam:r[2],statement:r[3],alternatives:'',answer:r[4],resolution:r[5],knowledge:r[6],law:r[7],file:r[8],url:r[9],status:r[10],temporal:'Auditoria jurídica e contexto temporal pendentes.',raw:r}))];
 if(questions.length!==503||new Set(questions.map(q=>q.id)).size!==503)throw Error('Integridade: esperadas 503 questões únicas.');
 const topics=rows(1).map(r=>({id:r[1],description:r[2],planning:r[7]||'',raw:r}));
 const key=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 const legacy=rows(3);if(legacy.length!==301)throw Error('Integridade: esperados 301 pontos.');
 const nuclei=new Map();
 function add(x){const k=key(x.title);let n=nuclei.get(k);if(!n){n={id:x.id,title:x.title,topics:[],aliases:[],variants:[],candidateIds:[],confirmedIds:[],sourceNotes:[],state:'provisional'};nuclei.set(k,n);}if(!n.aliases.includes(x.id))n.aliases.push(x.id);if(!n.topics.includes(x.topic))n.topics.push(x.topic);if(x.rule&&!n.variants.some(v=>v.rule===x.rule&&v.law===x.law))n.variants.push({rule:x.rule,law:x.law||'',source:x.id});n.candidateIds=[...new Set([...n.candidateIds,...(x.ids||[])])];if(x.note)n.sourceNotes.push({source:x.id,text:x.note});return n;}
 for(const r of legacy)add({id:r[1],topic:r[2],title:r[3],rule:r[4],law:r[5],ids:ids(r[6]),note:[r[7],r[8],r[9]].filter(Boolean).join('\n')});
 for(const r of rows(7).filter(r=>!r[1].startsWith('P-')))add({id:r[1],topic:r[0],title:r[2],rule:r[3],law:r[4],ids:ids(r[8]),note:r[10]});
 // As regras extraídas das resoluções preservam condições completas; o vínculo não é certificado automaticamente.
 for(const q of questions.filter(q=>q.origin==='Original'))for(const line of String(q.knowledge||'').split(/\n(?=\d+\.)/)){const m=line.match(/^\s*\d+\.\s*([^:]+):\s*([\s\S]+)/);if(m)add({id:'Q-'+q.id+'-'+createHash('sha256').update(m[1]).digest('hex').slice(0,10),topic:q.topic,title:m[1],rule:m[2],law:q.law,ids:[q.id]});}
 for(const q of questions.filter(q=>q.origin==='Original'&&/^0[89]|^1[012]/.test(q.topic))){const title=String(q.knowledge||q.subject).split(';')[0].trim();add({id:'Q-'+q.id+'-regra',topic:q.topic,title,rule:q.resolution,law:q.law,ids:[q.id]});}
 const byId=new Map(questions.map(q=>[q.id,q]));
 for(const n of nuclei.values()){
 n.candidateIds=n.candidateIds.filter(id=>byId.has(id));
 // Tributos autônomos são identificados pelo título; a classificação original continua nos dados-fonte.
 const own=n.title.match(/\b(IPVA|ITCMD|ITBI|ISSQN|ISS)\b/i);if(own)n.area=own[1].toUpperCase().replace(/^ISS$/,'ISSQN');else if(/reforma|IBS|CBS/i.test(n.title))n.area='Reforma Tributária';else if(n.topics.some(t=>/^\d{2} /.test(t)))n.area='Índice Normativo';else n.area=/simples|MEI|DAS|LC\s*123|CGSN/i.test(n.title+' '+n.topics.join(' '))?'Simples Nacional':/ICMS/i.test(n.title+' '+n.topics.join(' '))?'ICMS':'Outros complementares';
 if(!n.candidateIds.length)n.state='not-found';
 }
 const dtCrosswalk=JSON.parse(await readFile('data-sources/tributario-normativo/dt-crosswalk.json','utf8'));
 if(dtCrosswalk.records.length!==503||new Set(dtCrosswalk.records.map(r=>r.id)).size!==503)throw Error('Cruzamento DT incompleto');
 const reviewedBindings=JSON.parse(await readFile('data-sources/tributario-normativo/reviewed-bindings.json','utf8')).records;
 for(const review of reviewedBindings){
  const question=byId.get(review.questionId);
  if(!question||question.answer!==review.answer)throw Error('Conferência incompatível: '+review.questionId);
  if(review.displayAlternatives){question.alternatives=review.displayAlternatives;question.temporal=String(question.temporal||'').replace(' | Conferir extração das alternativas com o PDF.','');}
  if(review.displayResolution)question.resolution=review.displayResolution;
  if(review.examYear)question.examYear=review.examYear;
 }
 const data={reviewedBindings,dtCrosswalk,version:2,source:'1cxiYcMQns2qEQwybuPeOcfXuAKzBLoHgOXw5vG3DD5M',thresholds:{veryHigh:8,high:4,medium:2},topics,questions,nuclei:[...nuclei.values()],legacyPoints:legacy,sourceTabs:sources.map(s=>({title:s.title,sheetId:s.sheetId,rows:s.values.length})),audit:{status:'parcial',note:'Vínculos documentais não equivalem a cobrança direta. Frequências provisórias; menções em distratores não são somadas como incidência comprovada. A legislação da data da prova deve ser confrontada com alterações posteriores, inclusive LC 236/2026.',original:328,complementary:175,legacy:301}};
 return data;
}
if(process.argv[1]?.endsWith('import-normativo.mjs')){const d=await compileNormativo();await writeFile('source-content/normativo-data.json',JSON.stringify(d));console.log(`Normativo: ${d.questions.length} questões, ${d.legacyPoints.length} pontos preservados, ${d.nuclei.length} núcleos consolidados.`);}
