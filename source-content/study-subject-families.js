const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function groupedSubjectsHTML(subjects,families,render,{navigation=false,active=''}={}){
 const membership=new Map(Object.entries(families||{}).flatMap(([family,children])=>children.map(subject=>[subject,family]))),groups=new Map();
 for(const subject of subjects){const family=membership.get(subject);if(family){if(!groups.has(family))groups.set(family,[]);groups.get(family).push(subject);}}
 const entries=subjects.filter(s=>!membership.has(s)).map(s=>({title:s,html:render(s)}));
 for(const [family,children] of groups){const body=children.map(render).join('');entries.push({title:family,html:navigation?`<details class="difficulty-library-family" ${children.includes(active)?'open':''}><summary>${esc(family)}</summary>${body}</details>`:`<section class="study-subject-family"><h4>${esc(family)}</h4><div class="difficulty-content-list">${body}</div></section>`});}
 return entries.sort((a,b)=>a.title.localeCompare(b.title,'pt-BR')).map(e=>e.html).join('');
}
