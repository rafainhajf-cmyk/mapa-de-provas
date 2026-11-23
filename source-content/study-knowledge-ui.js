import {parseKnowledgeBundle,knowledgeHTML} from './study-knowledge.js?v=2';
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
const QT='teoria-das-questoes';
// Teoria das questões de Contabilidade: entra na aba própria do assunto, separada dos exercícios.
function addQuestionTheory(root,note){
 const panel=root.querySelector('[data-accounting-topic="'+note.targetId+'"] .accounting-question-theory > .accounting-panel');
 if(!panel)return false;
 if(panel.querySelector('[data-knowledge-id="'+note.id+'"]'))return true;
 panel.querySelector(':scope > .accounting-empty')?.remove();
 const send=panel.querySelector(':scope > .accounting-send');
 if(send)send.insertAdjacentHTML('beforebegin',knowledgeHTML([note]));else panel.insertAdjacentHTML('beforeend',knowledgeHTML([note]));
 return true;
}
function addIncrement(el,note){if(el.querySelector('[data-knowledge-id="'+note.id+'"]'))return;el.insertAdjacentHTML('beforeend',knowledgeHTML([note]));}
// Esquema incremental entra no assunto cujo título é igual ao título do esquema (ex.: "Âmbito, definições e agentes da Lei 14.133").
function addToUniformTopic(active,note){
 const h=active.querySelector(':scope > h3');
 if(!h||norm(note.title)!==norm(h.textContent))return false;
 let box=active.querySelector(':scope > [data-knowledge-topic-box]');
 if(!box){box=document.createElement('div');box.setAttribute('data-knowledge-topic-box','1');h.after(box);}
 addIncrement(box,note);
 return true;
}
// "Assuntos relacionados": todos os esquemas da mesma matéria com palavras do título em comum.
// Cada link mostra por qual palavra veio; ao abrir, um botão "Voltar" retorna ao assunto de origem
// na mesma posição de rolagem.
const RELATED_STOP=['tributario','alteracoes','material','complementar','reforma','sobre','pelos','pela','entre','quando'];
function relatedTokens(title){return norm(title).split(/[^a-z0-9]+/).filter(x=>x.length>5&&!RELATED_STOP.includes(x));}
function openTopicByTitle(title){const want=norm(title);const target=[...document.querySelectorAll('[data-library-topic]')].find(t=>norm(t.textContent).startsWith(want));target?.click();}
function addRelatedAside(active){
 const h=active.querySelector(':scope > h3');if(!h||active.querySelector(':scope > .tax-related'))return;
 const cur=approved.find(x=>x.updateType!==QT&&norm(x.title)===norm(h.textContent));
 if(!cur)return;
 const tokens=relatedTokens(cur.title);
 const hay=o=>norm(JSON.stringify(o.blocks||'')+' '+o.title);
 const scored=approved.filter(o=>o.updateType!==QT&&o.subject===cur.subject&&norm(o.title)!==norm(cur.title)).map(o=>{const hit=tokens.filter(t=>hay(o).includes(t));return {o,hit};}).filter(x=>x.hit.length>=1).sort((a,b)=>b.hit.length-a.hit.length);
 if(!scored.length)return;
 const aside=document.createElement('aside');aside.className='tax-related';
 aside.innerHTML='<strong>Assuntos relacionados ('+scored.length+')</strong>'+scored.map(x=>'<button type="button" class="tax-related-link" data-related-title="'+x.o.title.replace(/"/g,'&quot;')+'" data-origin-title="'+cur.title.replace(/"/g,'&quot;')+'">'+x.o.title+' <small>· por: '+x.hit.join(', ')+'</small></button>').join('');
 aside.addEventListener('click',e=>{const b=e.target.closest('[data-related-title]');if(!b)return;window.__relReturn={title:b.dataset.originTitle,target:b.dataset.relatedTitle,y:window.scrollY};openTopicByTitle(b.dataset.relatedTitle);});
 active.appendChild(aside);
}
// Banner "Voltar" no assunto aberto por um link relacionado; restaura a posição de rolagem.
function addReturnBanner(active){
 const ret=window.__relReturn;if(!ret||active.querySelector(':scope > .related-return'))return;
 const h=active.querySelector(':scope > h3');if(!h||norm(h.textContent)!==norm(ret.target))return;
 const bar=document.createElement('div');bar.className='related-return';
 bar.innerHTML='<button type="button" class="tax-related-link">← Voltar para '+ret.title.replace(/</g,'&lt;')+'</button>';
 bar.querySelector('button').addEventListener('click',()=>{const t=ret.title,y=ret.y;window.__relReturn=null;openTopicByTitle(t);setTimeout(()=>window.scrollTo({top:y}),60);});
 h.before(bar);
}
// Esquemas já colocados em um assunto da lista não são repetidos no painel do índice.
function placedInTopicList(page,note){
 const names=[...page.querySelectorAll('[data-library-topic]')].map(b=>norm(b.textContent));
 const title=norm(note.title);
 return !!title&&names.some(n=>n.startsWith(title));
}
function updateIndex(root,notes){
 const page=root.querySelector('.uniform-subjects,.subject-contents');
 if(!page)return;
 const label=norm(page.querySelector('h3')?.textContent||'');
 const subject=notes.filter(x=>x.updateType!==QT&&label.includes(norm(x.subject))&&!placedInTopicList(page,x));
 if(!subject.length||page.querySelector('[data-knowledge-overview]'))return;
 const panel=document.createElement('div');panel.setAttribute('data-knowledge-overview','1');panel.className='accounting-panel';panel.style.margin='20px 0';panel.innerHTML='<h4>Esquemas incrementais aprovados no Drive</h4><p>Complementos estruturados associados ao índice da matéria.</p>'+knowledgeHTML(subject);
 page.append(panel);
}
function paint(){
 const root=document.querySelector(selector);if(!root)return;
 // Não inserir outra versão do mesmo ID: a regra vale para navegação e leitura contínua.
 const active=root.querySelector('.uniform-topic');
 if(active){
  for(const note of approved){if(note.updateType===QT){addQuestionTheory(active,note);continue;}if(addToUniformTopic(active,note))continue;const target=targetInReader(active,note);if(target)addIncrement(target,note);}
  addRelatedAside(active);
  addReturnBanner(active);
  return;
 }
 updateIndex(root,approved);
}
// Matérias sem nenhum material no Drive (ex.: Direito Empresarial, Auditoria) mostram
// os esquemas aprovados na própria lista da biblioteca, no lugar de "Sem materiais enviados".
function paintLibrary(){
 const lib=document.querySelector('#difficultyLibrary');if(!lib)return;
 for(const group of lib.querySelectorAll('details.difficulty-library-group')){
  const subject=group.querySelector('summary')?.dataset.librarySubject;
  const empty=group.querySelector('.library-no-material');
  if(!subject||!empty)continue;
  const notes=approved.filter(x=>x.updateType!==QT&&x.subject===subject);
  if(!notes.length)continue;
  const box=document.createElement('div');box.setAttribute('data-knowledge-library','1');box.innerHTML=knowledgeHTML(notes);
  empty.replaceWith(box);
 }
}
async function boot(){
 try{
  const r=await fetch('./study-knowledge.json');if(!r.ok)throw Error('Fonte de esquemas indisponível');
  approved=parseKnowledgeBundle(await r.json());
  const lib=document.querySelector('#difficultyLibrary');
  if(lib){new MutationObserver(()=>queueMicrotask(paintLibrary)).observe(lib,{childList:true,subtree:true});paintLibrary();}
  const root=document.querySelector(selector);if(!root)return;
  let scheduled=false;
  const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;paint();});});
  observer.observe(root,{childList:true,subtree:true});
  paint();
 }catch(error){console.warn('Esquemas estruturados não foram carregados:',error.message);}
}
boot();
