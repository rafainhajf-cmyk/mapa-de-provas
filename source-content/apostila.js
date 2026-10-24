const KEY='mapa-tributario-reader-v1';
const $=id=>document.getElementById(id);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let sections=[],current=null,progress={seen:{},last:null},saveTimer,scrollPending=false;
function loadProgress(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');return {seen:saved.seen&&typeof saved.seen==='object'&&!Array.isArray(saved.seen)?saved.seen:{},last:typeof saved.last==='string'?saved.last:null};}catch{return {seen:{},last:null};}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress));}catch{$('storageNotice').textContent='Seu navegador não permitiu salvar. As marcações valem apenas enquanto esta página estiver aberta.';}}
function text(s){return s.title+' '+s.blocks.map(b=>b.text||b.rows.flat().join(' ')).join(' ');}
function openMenu(open){document.body.classList.toggle('nav-open',open);$('menu').setAttribute('aria-expanded',String(open));$('outline').inert=!open;$('scrim').hidden=!open;}
function updateReadStates(){
 const done=sections.filter(s=>progress.seen[s.id]).length;
 $('progressCount').textContent=done+' de '+sections.length+' assuntos vistos';$('progressPercent').textContent=Math.round(done/sections.length*100)+'%';$('progress').value=done;$('progress').max=sections.length;
 for(const s of sections){const seen=!!progress.seen[s.id];const mark=$('mark-'+s.id);if(mark){mark.setAttribute('aria-pressed',String(seen));mark.textContent=seen?'✓ Já vi · Desmarcar':'✓ Marcar como já vi';}const badge=$('badge-'+s.id);if(badge)badge.textContent=seen?'Já visto':'Leitura pendente';}
 for(const row of $('chapters').querySelectorAll('[data-section]')){const active=row.dataset.section===current?.id;row.classList.toggle('active',active);const button=row.querySelector('button');if(active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');}
}
function setSeen(id,seen){if(seen)progress.seen[id]=new Date().toISOString();else delete progress.seen[id];save();renderOutline();updateReadStates();$('status').textContent=seen?'Assunto marcado como já visto.':'Assunto desmarcado.';}
function renderOutline(){
 const openIds=new Set([...$('chapters').querySelectorAll('details[open]')].map(x=>x.dataset.group));const q=normalize($('search').value.trim()),unread=$('onlyUnread').checked;const groups=[];let group;
 for(const s of sections){if(s.level===1||!group){group={parent:s,items:[]};groups.push(group);}group.items.push(s);}
 const fragment=document.createDocumentFragment();let count=0;
 for(const g of groups){const visible=g.items.filter(s=>(!unread||!progress.seen[s.id])&&(!q||normalize(text(s)).includes(q)));if(!visible.length)continue;count+=visible.length;
  const details=document.createElement('details');details.className='chapter';details.dataset.group=g.parent.id;details.open=!!q||openIds.has(g.parent.id)||g.items.some(s=>s.id===current?.id);
  const summary=document.createElement('summary');summary.append(document.createTextNode(g.parent.title));const stat=document.createElement('span');stat.className='chapter-count';stat.textContent=g.items.filter(s=>progress.seen[s.id]).length+'/'+g.items.length;summary.append(stat);details.append(summary);
  for(const s of visible){const row=document.createElement('div');row.dataset.section=s.id;row.className='section-row level-'+s.level+(progress.seen[s.id]?' done':'');const check=document.createElement('input');check.type='checkbox';check.checked=!!progress.seen[s.id];check.setAttribute('aria-label','Já vi: '+s.title);check.addEventListener('change',()=>setSeen(s.id,check.checked));const button=document.createElement('button');button.className='section-link';button.textContent=s.level===1?'Visão geral do capítulo':s.title;button.addEventListener('click',()=>jump(s.id,true));row.append(check,button);details.append(row);}fragment.append(details);
 }
 if(!count){const empty=document.createElement('p');empty.className='empty';empty.textContent=unread?'Nenhum assunto pendente para este filtro.':'Nenhum assunto encontrado.';fragment.append(empty);}$('chapters').replaceChildren(fragment);updateReadStates();
}
function content(blocks){return blocks.map(b=>b.type==='table'?'<div class="table-wrap" role="region" aria-label="Quadro comparativo" tabindex="0"><table><thead><tr>'+b.rows[0].map(c=>'<th scope="col">'+escapeHTML(c)+'</th>').join('')+'</tr></thead><tbody>'+b.rows.slice(1).map(row=>'<tr>'+row.map(c=>'<td>'+escapeHTML(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'<p'+(b.source?' class="source"':'')+'>'+escapeHTML(b.text)+'</p>').join('');}
function renderBook(){let parent;const parts=sections.map((s,i)=>{if(s.level===1)parent=s;return '<section class="book-section level-'+s.level+'" id="'+s.id+'" aria-labelledby="heading-'+s.id+'"><div class="section-heading"><span class="chapter-label">'+escapeHTML(parent?.title||'Tributário')+'</span><span class="section-number">'+(i+1)+' / '+sections.length+'</span></div><h2 id="heading-'+s.id+'" tabindex="-1">'+escapeHTML(s.title)+'</h2><div class="section-tools"><span id="badge-'+s.id+'" class="read-badge"></span><button class="mark" id="mark-'+s.id+'" data-mark="'+s.id+'" aria-pressed="false" aria-label="Marcar como já vi: '+escapeHTML(s.title)+'"></button></div><div class="article-body">'+content(s.blocks)+'</div></section>';});$('article').innerHTML=parts.join('');updateReadStates();}
function activate(id){const s=sections.find(s=>s.id===id);if(!s||current?.id===id)return;current=s;progress.last=s.id;clearTimeout(saveTimer);saveTimer=setTimeout(save,350);updateReadStates();}
function jump(id,focus=false){const s=sections.find(s=>s.id===id);if(!s)return;activate(id);progress.last=id;save();openMenu(false);history.replaceState(null,'','#'+id);const section=$(id);if(focus)$('heading-'+id).focus({preventScroll:true});section.scrollIntoView({behavior:focus&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant',block:'start'});}
function trackScroll(){if(scrollPending||!sections.length)return;scrollPending=true;requestAnimationFrame(()=>{scrollPending=false;let active=sections[0];for(const s of sections){if($(s.id).getBoundingClientRect().top<=150)active=s;else break;}activate(active.id);});}
$('search').addEventListener('input',renderOutline);$('onlyUnread').addEventListener('change',renderOutline);
$('article').addEventListener('click',e=>{const button=e.target.closest('[data-mark]');if(button)setSeen(button.dataset.mark,!progress.seen[button.dataset.mark]);});
$('menu').addEventListener('click',()=>openMenu(!document.body.classList.contains('nav-open')));$('closeOutline').addEventListener('click',()=>{openMenu(false);$('menu').focus();});$('scrim').addEventListener('click',()=>openMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('nav-open')){openMenu(false);$('menu').focus();}});
window.addEventListener('hashchange',()=>sections.length&&jump(location.hash.slice(1)));window.addEventListener('scroll',trackScroll,{passive:true});window.addEventListener('pagehide',save);
window.addEventListener('storage',e=>{if(e.key===KEY){progress=loadProgress();renderOutline();updateReadStates();}});
async function init(){try{const response=await fetch('apostila-data.json');if(!response.ok)throw Error('load');const data=await response.json();if(!Array.isArray(data.sections)||!data.sections.length)throw Error('empty');sections=data.sections;progress=loadProgress();const initial=sections.find(s=>s.id===location.hash.slice(1))||sections.find(s=>s.id===progress.last)||sections[0];current=initial;renderBook();renderOutline();if(initial!==sections[0])requestAnimationFrame(()=>jump(initial.id));}catch{$('article').replaceChildren();$('loadError').hidden=false;$('progressCount').textContent='Conteúdo indisponível';}}
init();
