import { favoriteButtonHTML } from './study-favorites.js?v=94';
const KEY='mapa-tributario-reader-v1';
const $=id=>document.getElementById(id);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let sections=[],current=null,progress={seen:{},last:null},saveTimer,scrollPending=false;
const volumes=[
{id:'comparativo',title:'Lei Kandir × Reforma Tributária'},
{id:'lc236',title:'Alterações da LC 236/2026'},
{id:'lc227',title:'Alterações da LC 227/2026'},
{id:'ipva',title:'IPVA'},
{id:'itcmd',title:'ITCMD'},
{id:'rmit',title:'Regra-Matriz (RMIT)'}
];
const VOLKEY='mapa-tributario-volume-v1';
let selectedVolume=localStorage.getItem(VOLKEY)||'comparativo';
if(!volumes.some(v=>v.id===selectedVolume))selectedVolume='comparativo';
function volumeFor(s){const t=normalize(s.title),n=Number(s.originalIndex);
 if(n>=60||n===14)return 'rmit';
 if(n>=19&&n<=22)return 'ipva';
 if(n>=26&&n<=30)return 'itcmd';
 if(n===47||n>=49&&n<=53)return 'lc236';
 if(n>=31&&n<=35||n===46)return 'lc227';
 return 'comparativo';
}
function visibleSections(){return sections.filter(s=>volumeFor(s)===selectedVolume)}
function chooseVolume(id,focusFirst=true){if(!volumes.some(v=>v.id===id))return;selectedVolume=id;localStorage.setItem(VOLKEY,id);const selected=visibleSections();if(focusFirst&&selected.length)current=selected[0];$('bookVolumeTitle').textContent=volumes.find(v=>v.id===id).title;document.querySelectorAll('[data-volume]').forEach(b=>{b.classList.toggle('selected',b.dataset.volume===id);b.setAttribute('aria-pressed',String(b.dataset.volume===id))});renderBook();renderOutline();if(focusFirst&&selected.length){history.replaceState(null,'','#'+selected[0].id);$(selected[0].id)?.scrollIntoView({block:'start'});}}
function renderVolumes(){const nav=$('volumes');nav.replaceChildren(...volumes.map(v=>{const b=document.createElement('button');b.type='button';b.dataset.volume=v.id;b.textContent=v.title;b.addEventListener('click',()=>chooseVolume(v.id));return b;}));}

function loadProgress(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');return {seen:saved.seen&&typeof saved.seen==='object'&&!Array.isArray(saved.seen)?saved.seen:{},last:typeof saved.last==='string'?saved.last:null};}catch{return {seen:{},last:null};}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress));}catch{$('storageNotice').textContent='Seu navegador não permitiu salvar. As marcações valem apenas enquanto esta página estiver aberta.';}}
function text(s){return s.title+' '+s.blocks.map(b=>b.text||b.rows.flat().join(' ')).join(' ');}
function openMenu(open){document.body.classList.toggle('nav-open',open);$('menu').setAttribute('aria-expanded',String(open));$('outline').inert=!open;$('scrim').hidden=!open;}
function updateReadStates(){
 const shown=visibleSections();const done=shown.filter(s=>progress.seen[s.id]).length;
 $('progressCount').textContent=done+' de '+shown.length+' assuntos vistos';$('progressPercent').textContent=Math.round(done/(shown.length||1)*100)+'%';$('progress').value=done;$('progress').max=shown.length||1;
 for(const s of sections){const seen=!!progress.seen[s.id];const mark=$('mark-'+s.id);if(mark){mark.setAttribute('aria-pressed',String(seen));mark.textContent=seen?'✓ Já vi · Desmarcar':'✓ Marcar como já vi';}const badge=$('badge-'+s.id);if(badge)badge.textContent=seen?'Já visto':'Leitura pendente';}
 for(const row of $('chapters').querySelectorAll('[data-section]')){const active=row.dataset.section===current?.id;row.classList.toggle('active',active);const button=row.querySelector('button');if(active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');}
}
function setSeen(id,seen){if(seen)progress.seen[id]=new Date().toISOString();else delete progress.seen[id];save();renderOutline();updateReadStates();$('status').textContent=seen?'Assunto marcado como já visto.':'Assunto desmarcado.';}
function renderOutline(){
 const q=normalize($('search').value.trim()),unread=$('onlyUnread').checked;
 const fragment=document.createDocumentFragment();let count=0;
 for(const s of visibleSections()){
  if(unread&&progress.seen[s.id]||q&&!normalize(text(s)).includes(q))continue;
  count++;
  const row=document.createElement('div');row.dataset.section=s.id;row.className='section-row level-2'+(progress.seen[s.id]?' done':'');
  const check=document.createElement('input');check.type='checkbox';check.checked=!!progress.seen[s.id];check.setAttribute('aria-label','Já vi: '+s.title);check.addEventListener('change',()=>setSeen(s.id,check.checked));
  const button=document.createElement('button');button.className='section-link';button.textContent=s.title;button.addEventListener('click',()=>jump(s.id,true));
  row.append(check,button);fragment.append(row);
 }
 if(!count){const p=document.createElement('p');p.className='empty';p.textContent='Nenhum assunto encontrado nesta apostila.';fragment.append(p);}
 $('chapters').replaceChildren(fragment);updateReadStates();
}
function content(blocks){return blocks.map(b=>b.type==='table'?'<div class="table-wrap" role="region" aria-label="Quadro comparativo" tabindex="0"><table><thead><tr>'+b.rows[0].map(c=>'<th scope="col">'+escapeHTML(c)+'</th>').join('')+'</tr></thead><tbody>'+b.rows.slice(1).map(row=>'<tr>'+row.map(c=>'<td>'+escapeHTML(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'<p'+(b.source?' class="source"':'')+'>'+escapeHTML(b.text)+'</p>').join('');}
function renderBook(){let parent;const shown=visibleSections();const parts=shown.map((s,i)=>{if(s.level===1)parent=s;return '<section class="book-section level-'+s.level+'" id="'+s.id+'" aria-labelledby="heading-'+s.id+'"><div class="section-heading"><span class="chapter-label">'+escapeHTML(parent?.title||'Tributário')+'</span><span class="section-number">'+(i+1)+' / '+shown.length+'</span></div><h2 id="heading-'+s.id+'" tabindex="-1">'+escapeHTML(s.title)+'</h2><div class="section-tools"><span id="badge-'+s.id+'" class="read-badge"></span><button class="mark" id="mark-'+s.id+'" data-mark="'+s.id+'" aria-pressed="false" aria-label="Marcar como já vi: '+escapeHTML(s.title)+'"></button>'+favoriteButtonHTML({title:s.title,subject:'Apostila de Tributário',href:'apostila.html#'+encodeURIComponent(s.id)})+'</div><div class="article-body">'+content(s.blocks)+'</div></section>';});$('article').innerHTML=parts.join('');updateReadStates();}
function activate(id){const s=sections.find(s=>s.id===id);if(!s||current?.id===id)return;current=s;progress.last=s.id;clearTimeout(saveTimer);saveTimer=setTimeout(save,350);updateReadStates();}
function jump(id,focus=false){const s=sections.find(s=>s.id===id);if(!s)return;if(volumeFor(s)!==selectedVolume)chooseVolume(volumeFor(s),false);activate(id);progress.last=id;save();openMenu(false);history.replaceState(null,'','#'+id);document.dispatchEvent(new CustomEvent('study-location-opened',{detail:{title:s.title,subject:'Apostila de Tributário',href:'apostila.html#'+encodeURIComponent(id)}}));const section=$(id);if(focus)$('heading-'+id).focus({preventScroll:true});section.scrollIntoView({behavior:focus&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant',block:'start'});}
function trackScroll(){if(scrollPending||!sections.length)return;scrollPending=true;requestAnimationFrame(()=>{scrollPending=false;let active=visibleSections()[0];if(!active)return;for(const s of visibleSections()){if($(s.id).getBoundingClientRect().top<=150)active=s;else break;}activate(active.id);});}
$('search').addEventListener('input',renderOutline);$('onlyUnread').addEventListener('change',renderOutline);
$('article').addEventListener('click',e=>{const button=e.target.closest('[data-mark]');if(button)setSeen(button.dataset.mark,!progress.seen[button.dataset.mark]);});
$('menu').addEventListener('click',()=>openMenu(!document.body.classList.contains('nav-open')));$('closeOutline').addEventListener('click',()=>{openMenu(false);$('menu').focus();});$('scrim').addEventListener('click',()=>openMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('nav-open')){openMenu(false);$('menu').focus();}});
window.addEventListener('hashchange',()=>sections.length&&jump(location.hash.slice(1)));window.addEventListener('scroll',trackScroll,{passive:true});window.addEventListener('pagehide',save);
window.addEventListener('storage',e=>{if(e.key===KEY){progress=loadProgress();renderOutline();updateReadStates();}});
async function init(){try{const response=await fetch('apostila-data.json?v=20261030',{cache:'no-store'});if(!response.ok)throw Error('load');const data=await response.json();if(!Array.isArray(data.sections)||!data.sections.length)throw Error('empty');sections=data.sections.map((s,originalIndex)=>({...s,originalIndex}));progress=loadProgress();renderVolumes();const target=sections.find(s=>s.id===location.hash.slice(1));if(target)selectedVolume=volumeFor(target);const initial=target||visibleSections().find(s=>s.id===progress.last)||visibleSections()[0];current=initial;chooseVolume(selectedVolume,false);if(initial!==visibleSections()[0])requestAnimationFrame(()=>jump(initial.id));}catch{$('article').replaceChildren();$('loadError').hidden=false;$('progressCount').textContent='Conteúdo indisponível';}}
$('article').addEventListener('study-content-edited',event=>{const heading=event.target;if(heading.tagName!=='H2')return;const section=sections.find(s=>s.id===heading.closest('.book-section')?.id);if(section){section.title=heading.textContent.trim();renderOutline();}});
init();

