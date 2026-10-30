import {allCards,importApkg,mediaBlob,LABELS} from './flashcards-import.js?v=3';

const progressKey='mapa-anki-reviews-v1';
const $=q=>document.querySelector(q);
const cardsById=new Map(),mediaURLs=new Map();
let cards=[],subject='tributario',filter='',current=null,turned=false,showAll=false,busy=false;
const now=()=>Date.now(),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function loadReviews(){try{const obj=JSON.parse(localStorage.getItem(progressKey)||'{}');return obj&&typeof obj==='object'?obj:{}}catch{return {}}}
let reviews=loadReviews();
function noteScore(card){const r=reviews[card.id];return r?.due||0}
function isDue(card){const r=reviews[card.id];return !r||!r.due||r.due<=now()}
function subjectCards(){return cards.filter(c=>c.subjectKey===subject&&(!filter||(filter.startsWith('v:')?medianVolume(c.deckPath)===filter.slice(2):filter.startsWith('d:')?c.deckPath===decodeURIComponent(filter.slice(2)):false)))}
function currentGroup(){return subjectCards().filter(c=>showAll||isDue(c)).sort((a,b)=>noteScore(a)-noteScore(b)||a.id.localeCompare(b.id))}
function medianVolume(path){return String(path||'').split('::')[1]||'Geral'}
function subjStats(key){const chosen=cards.filter(c=>c.subjectKey===key);return {all:chosen.length,due:chosen.filter(isDue).length,studied:chosen.filter(c=>reviews[c.id]).length};}
function renderNav(){
 const nav=$('#flashcardSubjects');
 nav.innerHTML=Object.entries(LABELS).map(([key,label])=>{
  const s=subjStats(key);
  return '<button type="button" class="fc-subject '+(key===subject?'active':'')+'" data-subject="'+key+'"><span>'+label+'</span><small>'+s.all+' cartões · '+s.due+' para revisar</small></button>';
 }).join('');
 const s=subjStats(subject);
 $('#subjectTitle').textContent=LABELS[subject];
 $('#subjectDetail').textContent=s.all+' cartões originais · '+s.due+' disponíveis para revisão · '+s.studied+' já revisados';
 const decks=[...new Set(cards.filter(c=>c.subjectKey===subject).map(c=>c.deckPath))].sort((a,b)=>a.localeCompare(b,'pt-BR',{numeric:true}));
 const volumeMap=new Map();
 for(const d of decks){const parts=String(d).split('::'),volume=parts[1]||'Geral',topic=parts[2]||'Geral';if(!volumeMap.has(volume))volumeMap.set(volume,[]);volumeMap.get(volume).push({path:d,title:topic});}
 const possible=new Set(['']);
 let options='<option value="">Todos os volumes e assuntos</option>';
 for(const [volume,entries] of volumeMap){
  const value='v:'+volume;possible.add(value);
  options+='<option value="'+esc(value)+'">'+esc(volume)+'</option>';
  for(const entry of entries){const dv='d:'+encodeURIComponent(entry.path);possible.add(dv);options+='<option value="'+esc(dv)+'">↳ '+esc(entry.title)+'</option>';}
 }
 $('#filterDeck').innerHTML=options;
 if(!possible.has(filter))filter='';
 $('#filterDeck').value=filter;
 $('#showAll').checked=showAll;
}
function chooseCard(skipId=''){
 const group=currentGroup();current=group.find(c=>c.id!==skipId)||group[0]||null;
 turned=false;renderCard();
}
const safeTags=new Set(['BR','B','STRONG','I','EM','U','P','DIV','SPAN','UL','OL','LI','BLOCKQUOTE','CODE','PRE','SMALL','SUB','SUP','MARK','HR','TABLE','TBODY','THEAD','TR','TD','TH','IMG','A','FONT','DETAILS','SUMMARY']);
function clean(html){
 const doc=new DOMParser().parseFromString('<main>'+String(html||'')+'</main>','text/html');
 const root=doc.body.firstElementChild;
 function walk(node){
  for(const child of [...node.children]){
   if(!safeTags.has(child.tagName)){if(['SCRIPT','STYLE','IFRAME','OBJECT','EMBED','FORM','INPUT','BUTTON','SVG'].includes(child.tagName)){child.remove();continue}
    walk(child);child.replaceWith(...child.childNodes);continue;}
   const image=child.tagName==='IMG',link=child.tagName==='A';
   const src=image?child.getAttribute('src'):null,alt=image?child.getAttribute('alt'):null;
   const href=link?child.getAttribute('href'):null,style=child.getAttribute('style')||'';
   for(const att of [...child.attributes])child.removeAttribute(att.name);
   if(image&&src&&!/^(?:[a-z]+:|\/|\\)/i.test(src))child.dataset.fcMedia=src;
   if(image&&alt)child.setAttribute('alt',alt);
   if(link&&href&&/^https:\/\//i.test(href)){child.setAttribute('href',href);child.setAttribute('target','_blank');child.setAttribute('rel','noopener noreferrer');}
   if(style&&!/url\s*\(|expression\s*\(|@import|[<>]/i.test(style)){
    const allowed=style.split(';').map(k=>k.trim()).filter(v=>/^(color|background-color|font-weight|font-size|font-style|text-align|text-decoration|border|padding|margin)\s*:/i.test(v));
    if(allowed.length)child.setAttribute('style',allowed.join(';'));
   }
   walk(child);
  }
 }
 walk(root);return root.innerHTML;
}
async function attachMedia(element,cardKey){
 for(const img of element.querySelectorAll('[data-fc-media]')){
  if(!document.contains(img))continue;
  const name=img.dataset.fcMedia, card=cardsById.get(cardKey);
  const key=(card?.sourceFile||'')+'::'+name;
  try {
   let uri=mediaURLs.get(key);
   if(!uri){const blob=await mediaBlob(name,card?.sourceFile||'');if(!blob)continue;uri=URL.createObjectURL(blob);mediaURLs.set(key,uri);}
   if(document.contains(img))img.setAttribute('src',uri);
  }catch{}
 }
 // O texto [sound:arquivo.mp3] é conservado no registro e ganha tocador ao renderizar.
 for(const section of element.querySelectorAll('[data-original-html]')){
  const card=cardsById.get(cardKey),field=section.dataset.originalHtml;
  const raw=String(card?.fields?.[field]||'');
  const list=[...raw.matchAll(/\[sound:([^\]]+)\]/g)];
  for(const match of list){
   const audio=await mediaBlob(match[1],card?.sourceFile||'').catch(()=>null);
   if(!audio||!document.contains(section))continue;
   const key=(card?.sourceFile||'')+'::'+match[1];let uri=mediaURLs.get(key);if(!uri){uri=URL.createObjectURL(audio);mediaURLs.set(key,uri);}
   const player=document.createElement('audio');player.controls=true;player.preload='none';player.src=uri;section.append(player);
  }
 }
}
function htmlSection(label,original,field='',id=''){
 if(!String(original||'').trim())return '';
 return '<section class="fc-field"><h4>'+esc(label)+'</h4><div class="fc-original" '+(field?'data-original-html="'+esc(field)+'"':'')+'>'+clean(original)+'</div></section>';
}
function renderCard(){
 const target=$('#studyArea'),s=subjStats(subject);
 $('#counter').textContent=s.due+' para revisar · '+subjectCards().length+' no filtro';
 if(!current){
   target.innerHTML='<div class="fc-empty"><h3>'+(s.all?'Revisões do momento concluídas':'Nenhum cartão importado nesta matéria')+'</h3><p>'+(s.all?'Você pode marcar “Mostrar todos” para estudar novamente ou voltar quando houver revisões.':'Importe seus arquivos .apkg originais do Literalidade pelo formulário acima.')+'</p></div>';
   return;
 }
 const f=current.fields||{},front=f.Sentença||f.Pergunta||'',answer=f.Gabarito||f.Resposta||'';
 const status=reviews[current.id],deck=medianVolume(current.deckPath);
 const details=[['Explicação',f.Explicação],['Literalidade',f.Literalidade],['Jurisprudência',f.Jurisprudência],['Recurso Visual',f['Recurso Visual']],['Observação',f.Observação]];
 target.innerHTML='<article class="fc-card"><div class="fc-card-top"><span>'+esc(deck)+'</span><span>'+esc(f.Assunto||'')+'</span></div>'+
  '<div class="fc-question-label">'+(current.type.includes('C-E')?'CERTO OU ERRADO':'PERGUNTA')+'</div>'+
  '<div class="fc-question fc-original" data-original-html="'+esc(f.Sentença?'Sentença':'Pergunta')+'">'+clean(front)+'</div>'+
  (turned?'<div class="fc-answer"><h3>Resposta</h3><div class="fc-original" data-original-html="'+esc(f.Gabarito?'Gabarito':'Resposta')+'">'+clean(answer)+'</div>'+
    details.map(([label,value])=>htmlSection(label,value,label,current.id)).join('')+'</div>'+
    '<div class="fc-ratings"><button data-grade="again" class="fc-again">Errei</button><button data-grade="hard">Difícil</button><button data-grade="good">Bom</button><button data-grade="easy">Fácil</button></div>':
    '<button class="fc-show" id="revealAnswer">Mostrar resposta</button>')+
  '<footer><span>Origem: '+esc(current.sourceFile)+'</span><span>ID original: '+esc(current.sourceId)+'</span></footer></article>';
 attachMedia(target,current.id);
 if(status?.last)$('#lastReview').textContent='Última revisão: '+new Date(status.last).toLocaleString('pt-BR');
 else $('#lastReview').textContent='Cartão ainda não revisado';
}
function gradeCard(grade){
 if(!current)return;
 const id=current.id,old=reviews[id]||{},prev=Math.max(0,old.interval||0),days={
  again:0, hard:prev?Math.max(1,prev*1.2):1,
  good:prev?Math.max(2,prev*2.2):3,
  easy:prev?Math.max(4,prev*3):7
 }[grade];
 const due=now()+(grade==='again'?60*1000:Math.ceil(days)*86400000);
 reviews={...reviews,[id]:{due,interval:days,last:now(),grade,attempts:(old.attempts||0)+1,misses:(old.misses||0)+(grade==='again'?1:0)}};
 try{localStorage.setItem(progressKey,JSON.stringify(reviews));}catch(e){$('#status').textContent='Falha ao salvar revisão. Verifique o espaço do navegador.';return;}
 renderNav();chooseCard(id);
}
function exportProgress(){
 const data={format:'mapa-literalidade-progresso-v1',exportedAt:new Date().toISOString(),reviews};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='flashcards_literalidade_progresso.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}
async function refresh(keep=false){
 cards=await allCards();cardsById.clear();for(const c of cards)cardsById.set(c.id,c);
 reviews=loadReviews();renderNav();
 if(!keep||!cardsById.has(current?.id)||current?.subjectKey!==subject||!currentGroup().some(c=>c.id===current.id))chooseCard();
 else renderCard();
}
async function doImport(file){
 if(!file||busy)return;
 busy=true;$('#importButton').disabled=true;
 const bar=$('#status'),subjectAtStart=$('#importSubject').value;
 try{
  const report=await importApkg(file,subjectAtStart,msg=>{bar.textContent=msg;});
  subject=report.forcedReform?'reforma':subjectAtStart;
  filter='';showAll=false;
  await refresh();
  bar.textContent='Importação concluída: '+report.added+' novos, '+report.moved+' movidos de matéria, '+report.kept+' já existentes. '+report.media+' mídias preservadas. Total do arquivo: '+report.fromFile+'.';
 }catch(e){bar.textContent='Não foi possível importar: '+e.message;}
 finally{busy=false;$('#importButton').disabled=false;$('#importFile').value='';}
}
function init(){
 $('#flashcardSubjects').addEventListener('click',e=>{const b=e.target.closest('[data-subject]');if(!b)return;subject=b.dataset.subject;filter='';showAll=false;renderNav();chooseCard();});
 $('#filterDeck').addEventListener('change',e=>{filter=e.target.value;chooseCard();});
 $('#showAll').addEventListener('change',e=>{showAll=e.target.checked;chooseCard();});
 $('#studyArea').addEventListener('click',e=>{
  if(e.target.closest('#revealAnswer')){turned=true;renderCard();return;}
  const grade=e.target.closest('[data-grade]');if(grade)gradeCard(grade.dataset.grade);
 });
 $('#importForm').addEventListener('submit',e=>{e.preventDefault();doImport($('#importFile').files[0]);});
 $('#backupProgress').onclick=exportProgress;
 $('#importProgress').addEventListener('change',async e=>{
  const f=e.target.files[0];if(!f)return;
  try{const obj=JSON.parse(await f.text());if(obj.format!=='mapa-literalidade-progresso-v1'||!obj.reviews||typeof obj.reviews!=='object')throw Error('Backup inválido.');
   reviews={...reviews,...obj.reviews};localStorage.setItem(progressKey,JSON.stringify(reviews));await refresh();$('#status').textContent='Histórico de revisões restaurado.';
  }catch(err){$('#status').textContent='Não foi possível restaurar: '+err.message;}
  finally{e.target.value='';}
 });
 window.addEventListener('storage',e=>{if(e.key===progressKey)refresh(true);});
 document.addEventListener('study-sync-applied',()=>refresh(true));
 window.addEventListener('pagehide',()=>{for(const url of mediaURLs.values())URL.revokeObjectURL(url);});
 const params=new URLSearchParams(location.search),requested=params.get('materia');
 if(LABELS[requested])subject=requested;
 refresh().catch(e=>{$('#status').textContent='Falha ao abrir os cartões: '+e.message;});
}
init();
