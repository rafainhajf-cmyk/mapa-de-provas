// Localiza apoio didático. Não certifica gabaritos, vigência ou incidência por similaridade textual.
// O texto licenciado é lido fora do repositório e não é copiado para o site.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const directory=process.argv[2];if(!directory)throw Error('Informe a pasta privada com DT01.txt ... DT08.txt');
const data=JSON.parse(await readFile('source-content/normativo-data.json'));
const ids=['1czkj7YROWLNu5lFhtiErF9w2Ras5m9HX','1p54ZNgPjij22Yd6488koLmgaDqDyysH4','1wmzEU3grnQ3RUOLLfi-3qimEvWtv3APm','1xjFxV3bv88hgtOwVnJA6IGojduSBDj25','1uzgWEbemeW4xke0P0Nxln-KyruMuUUvG','1ytvI7AoRsWT3kq8s1tTtkidQDKLGWm90','15dSDFzZo6zPoNBCDFUAlB_r1JOM80i_R','1YNlYSi7MQMAj1iJKXFIClbdVYeKpOCDq'];
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const stop=new Set('para pela pelo pelas pelos como mais menos entre sobre todos todas quando sendo caso casos artigo artigos seguinte forma termos direito tributario tributo tributos pode podem deve devem regra geral lei leis previsto previstas previstas conforme sera ser sao uma das dos que com por nao aos aos seus suas sem foi tem seu sua'.split(' '));
const tokens=s=>new Set((norm(s).match(/[a-z]{4,}/g)||[]).filter(x=>!stop.has(x)));
const articles=s=>new Set([...String(s).matchAll(/(?:arts?\.?\s*)(\d{1,3})(?!\d)/gi)].map(m=>m[1]));
const sections=[],volumes=[];
for(let i=1;i<=8;i++){
 const name='DT'+String(i).padStart(2,'0'),text=(await readFile(`${directory}/${name}.txt`,'utf8')).replace(/\r/g,'');
 volumes.push({volume:i,title:name+'.pdf',url:`https://drive.google.com/file/d/${ids[i-1]}/view?usp=drivesdk`,edition:'26/09/2026',textHash:createHash('sha256').update(text).digest('hex')});
 const toc=[...text.slice(0,8500).matchAll(/^(\d{2}\.\d+\.)\s*(.+?)\s+(\d{1,2})(?:\r?\n|$)/gm)];
 let bodies=[...text.matchAll(/^(\d{2}\.\d+\.)\s*([^\n]+)$/gm)].filter(m=>!m[2].match(/\s\d{1,2}$/));
 const start=bodies.find(b=>b[1]==='01.1.')?.index||0;bodies=bodies.filter(b=>b.index>=start);
 for(let j=0;j<bodies.length;j++){const b=bodies[j],body=text.slice(b.index,bodies[j+1]?.index||text.length),entry=toc.find(t=>t[1]===b[1]);sections.push({volume:i,section:b[1].slice(0,-1),title:b[2].trim(),page:entry?Number(entry[3]):null,body,words:tokens(body),titleWords:tokens(b[2]),articles:articles(body)});}
}
// Cabeçalhos repetidos em páginas de continuação formam uma só seção didática.
const grouped=new Map();for(const section of sections){const key=section.volume+':'+section.section,old=grouped.get(key);if(old){old.body+='\n'+section.body;old.words=tokens(old.body);old.articles=articles(old.body);if(!old.page)old.page=section.page;}else grouped.set(key,section);}sections.splice(0,sections.length,...grouped.values());
const volumeMap={1:[1],2:[1,2],3:[2],4:[2],5:[3],6:[3],7:[4],8:[4],9:[5],10:[6],11:[5],12:[6,7],13:[7],14:[],15:[4],16:[8],17:[6,7],18:[]};
const freq=new Map();for(const s of sections)for(const w of s.words)freq.set(w,(freq.get(w)||0)+1);
const records=data.questions.map(q=>{
 const n=Number(q.topic.slice(0,2)),allowed=volumeMap[n]||[],w=tokens([q.subject,q.knowledge,q.resolution].join(' ')),a=articles(q.law);
 const ranked=sections.filter(s=>allowed.includes(s.volume)).map(s=>{let total=0,hits=0;for(const t of w)if(s.words.has(t)){hits++;total+=Math.log(1+sections.length/(freq.get(t)||1))*(s.titleWords.has(t)?3:1);}const legal=[...a].filter(x=>s.articles.has(x));return {s,hits,score:total/Math.sqrt(Math.max(20,s.words.size))+legal.length*2,legal};}).filter(x=>x.hits>=4&&x.score>=2.4).sort((a,b)=>b.score-a.score).slice(0,3);
 return {id:q.id,kind:ranked.length?'candidate':'not-located',method:'Busca textual nos campos de resolução e conhecimentos da planilha; nunca contagem de distratores.',review:'Referência didática candidata; validação individual pendente',references:ranked.map(({s,score,legal})=>({volume:s.volume,section:s.section,title:s.title,page:s.page,score:Math.round(score*100)/100,articleOverlap:legal})),reason:!allowed.length?(q.origin==='Complementar'?'Conteúdo complementar: consultar a fonte específica do tributo/LC123/LTE; não forçar vínculo com DT geral.':'Sem volume específico confirmado para este assunto.'):(ranked.length?'Conferir a seção sugerida antes de validar o vínculo.':'Não houve correspondência textual suficientemente específica no volume esperado.')};
});
const out={version:1,method:'Localização assistida; não é auditoria jurídica nem certificação de cobrança.',volumes,sectionIndex:sections.map(({volume,section,title,page})=>({volume,section,title,page})),records};
if(records.length!==503||new Set(records.map(r=>r.id)).size!==503)throw Error('Cruzamento incompleto');
await writeFile('data-sources/tributario-normativo/dt-crosswalk.json',JSON.stringify(out));console.log(JSON.stringify({questions:records.length,candidates:records.filter(r=>r.kind==='candidate').length,notLocated:records.filter(r=>r.kind==='not-located').length,sections:sections.length,volumes:volumes.length}));
