import {parseKnowledgeBundle,knowledgeHTML} from './study-knowledge.js?v=1';
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const selector='#difficultyResults';
let approved=[];
function targetInReader(root,note){
 const chapters=[...root.querySelectorAll('[data-reading-topic]')];
 const id=String(note.targetId||'');
 const section=chapters.find(x=>x.dataset.readingTopic===id||x.dataset.readingTopic.endsWith(':'+id));
 const chapter=section?.querySelector('[data-accounting-topic="'+id+'"]')||root.querySelector('[data-accounting-topic="'+id+'"]');
 if(chapter)return chapter;
 if(section)return section;
 const topicTitle=norm(note.targetTitle);
 if(!topicTitle)return null;
 // Associe pelo título apenas quando houver um único capítulo correspondente.
 const matches=chapters.filter(x=>{
  const text=norm(x.querySelector(':scope > header h3, :scope > h3, .accounting-topic h4')?.textContent);
  return text&&(text===topicTitle||text.includes(topicTitle));
 });
 return matches.length===1?matches[0]:null;
}
function addIncrement(el,note){if(el.querySelector('[data-knowledge-id="'+note.id+'"]'))return;el.insertAdjacentHTML('beforeend',knowledgeHTML([note]));}
function updateIndex(root,notes){
 const page=root.querySelector('.uniform-subjects,.subject-contents');
 if(!page)return;
 const label=norm(page.querySelector('h3')?.textContent||'');
 const subject=notes.filter(x=>label.includes(norm(x.subject)));
 if(!subject.length||page.querySelector('[data-knowledge-overview]'))return;
 const panel=document.createElement('div');panel.setAttribute('data-knowledge-overview','1');panel.className='accounting-panel';panel.style.margin='20px 0';panel.innerHTML='<h4>Esquemas incrementais aprovados no Drive</h4><p>Complementos estruturados associados ao índice da matéria.</p>'+knowledgeHTML(subject);
 page.append(panel);
}
function paint(){
 const root=document.querySelector(selector);if(!root)return;
 // Não inserir outra versão do mesmo ID: a regra vale para navegação e leitura contínua.
 const active=root.querySelector('.uniform-topic');
 if(active){
  for(const note of approved){const target=targetInReader(active,note);if(target)addIncrement(target,note);}
  return;
 }
 updateIndex(root,approved);
}
async function boot(){
 try{
  const r=await fetch('./study-knowledge.json',{cache:'no-store'});if(!r.ok)throw Error('Fonte de esquemas indisponível');
  approved=parseKnowledgeBundle(await r.json());
  const root=document.querySelector(selector);if(!root)return;
  let scheduled=false;
  const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;paint();});});
  observer.observe(root,{childList:true,subtree:true});
  paint();
 }catch(error){console.warn('Esquemas estruturados não foram carregados:',error.message);}
}
boot();
