import {accountingSetsHTML} from './accounting-curated.js?v=9';
import {examByQuestion} from './accounting-exam-map.js?v=1';
import {tecRefsHTML} from './accounting-tec-refs.js?v=2';
document.querySelector('#exerciseLists').innerHTML=accountingSetsHTML()+tecRefsHTML();
const progressKey='mapa-contab-curated-progress-v1';
let completed={};
const resultKey='mapa-contab-results-v1';
let results={};
try { const value=JSON.parse(localStorage.getItem(resultKey)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))results=value; } catch {}
try { const value=JSON.parse(localStorage.getItem(progressKey)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))completed=value; } catch {}
const boxes=[...document.querySelectorAll('[data-curated-id]')];
const articles=[...document.querySelectorAll('article[data-exercise-kind]')];
const filterIds=['filterList','filterKind','filterSolved','filterDone','filterExam'];
for(const el of articles){const m=/^tec-(\d+)$/.exec(el.id);el.dataset.exam=m?(examByQuestion[m[1]]||''):'';}
const examSelect=document.getElementById('filterExam');
const examNames=[...new Set(Object.values(examByQuestion))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
examSelect.innerHTML='<option value="all">Todas as provas</option>'+examNames.map(n=>'<option value="'+n.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')+'">'+n.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</option>').join('');
function applyFilters(){
 const [list,kind,solved,done,exam]=filterIds.map(id=>document.getElementById(id).value);
 let shown=0;
 for(const el of articles){
  const checked=el.querySelector('input[data-curated-id]')?.checked;
  const inList=list==='all'||(list==='tec'?el.dataset.exerciseOrigin==='tec':list==='minimal'?el.dataset.minimal==='yes':el.dataset.studyRoute===list);
  const visible=inList&&(exam==='all'||el.dataset.exam===exam)&&(kind==='all'||el.dataset.exerciseKind===kind)&&(solved==='all'||el.dataset.exerciseSolved===solved)&&(done==='all'||(done==='done'?checked:!checked));
  el.hidden=!visible;if(visible)shown++;
 }
 for(const section of document.querySelectorAll('.accounting-curated > section'))section.hidden=!section.querySelector('article:not([hidden])');
 let examInfo='';
 if(exam!=='all'){const inExam=articles.filter(el=>el.dataset.exam===exam);const doneExam=inExam.filter(el=>el.querySelector('input[data-curated-id]')?.checked).length;examInfo=' · nesta prova: '+doneExam+' de '+inExam.length+' feitas';}
 document.querySelector('#filterCount').textContent=shown+' exercícios no filtro'+examInfo;
}
function update(){
 applyFilters();
 const marked=new Set(boxes.filter(box=>box.checked).map(box=>box.dataset.curatedId)).size;
 document.querySelector('#curatedProgress').textContent=marked+' de '+new Set(boxes.map(box=>box.dataset.curatedId)).size+' exercícios marcados como feitos neste navegador.';
 const answered=Object.keys(results).length,hits=Object.values(results).filter(v=>v==='acertei').length;
 document.querySelector('#curatedProgress').textContent+=' Respondidas: '+answered+' · acertos: '+hits+'.';
}
for(const id of filterIds)document.getElementById(id).addEventListener('change',applyFilters);
for(const box of boxes){
 box.checked=Boolean(completed[box.dataset.curatedId]);
 box.addEventListener('change',()=>{
  if(box.checked)completed[box.dataset.curatedId]=true;else delete completed[box.dataset.curatedId];
  try {localStorage.setItem(progressKey,JSON.stringify(completed));}catch{}
  for(const other of document.querySelectorAll('[data-curated-id="'+box.dataset.curatedId+'"]'))other.checked=box.checked;
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
const resultSelects=[...document.querySelectorAll('select[data-result-id]')];
for(const sel of resultSelects){
 sel.value=results[sel.dataset.resultId]||'';
 sel.addEventListener('change',()=>{
  if(sel.value)results[sel.dataset.resultId]=sel.value;else delete results[sel.dataset.resultId];
  try {localStorage.setItem(resultKey,JSON.stringify(results));}catch{}
  for(const other of document.querySelectorAll('select[data-result-id="'+sel.dataset.resultId+'"]'))other.value=sel.value;
  update();
 });
}
update();
