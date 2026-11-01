import {accountingSetsHTML} from './accounting-curated.js?v=5';
document.querySelector('#exerciseLists').innerHTML=accountingSetsHTML();
const progressKey='mapa-contab-curated-progress-v1';
let completed={};
try { const value=JSON.parse(localStorage.getItem(progressKey)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))completed=value; } catch {}
const boxes=[...document.querySelectorAll('[data-curated-id]')];
const articles=[...document.querySelectorAll('article[data-exercise-kind]')];
const filterIds=['filterList','filterKind','filterSolved','filterDone'];
function applyFilters(){
 const [list,kind,solved,done]=filterIds.map(id=>document.getElementById(id).value);
 let shown=0;
 for(const el of articles){
  const checked=el.querySelector('input[data-curated-id]')?.checked;
  const inList=list==='all'||(list==='tec'?el.dataset.exerciseOrigin==='tec':el.dataset.studyRoute===list);
  const visible=inList&&(kind==='all'||el.dataset.exerciseKind===kind)&&(solved==='all'||el.dataset.exerciseSolved===solved)&&(done==='all'||(done==='done'?checked:!checked));
  el.hidden=!visible;if(visible)shown++;
 }
 for(const section of document.querySelectorAll('.accounting-curated > section'))section.hidden=!section.querySelector('article:not([hidden])');
 document.querySelector('#filterCount').textContent=shown+' exercícios no filtro';
}
function update(){
 applyFilters();
 const marked=new Set(boxes.filter(box=>box.checked).map(box=>box.dataset.curatedId)).size;
 document.querySelector('#curatedProgress').textContent=marked+' de '+new Set(boxes.map(box=>box.dataset.curatedId)).size+' exercícios marcados como feitos neste navegador.';
}
for(const id of filterIds)document.getElementById(id).addEventListener('change',applyFilters);
for(const box of boxes){
 box.checked=Boolean(completed[box.dataset.curatedId]);
 box.addEventListener('change',()=>{
  if(box.checked)completed[box.dataset.curatedId]=true;else delete completed[box.dataset.curatedId];
  try {localStorage.setItem(progressKey,JSON.stringify(completed));}catch{}
  update();
 });
}
document.querySelector('#exerciseLists').addEventListener('click',event=>{
 const link=event.target.closest('a[data-route-jump]');if(!link)return;
 const card=document.getElementById('tec-'+link.dataset.routeJump);if(!card)return;
 event.preventDefault();
 for(const id of filterIds)document.getElementById(id).value='all';
 applyFilters();card.scrollIntoView({block:'start'});
});
update();
