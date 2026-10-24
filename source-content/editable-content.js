const STORE='mapa-study-text-edits-v1';
const root=document.getElementById('difficultyResults')||document.getElementById('article');
function read(){try{const value=JSON.parse(localStorage.getItem(STORE)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{return {};}}
if(root){
 let editing=false,focused=null,scheduled=false;
 const originals=new WeakMap(),fields=new Set();
 const toolbar=document.createElement('div');toolbar.className='text-edit-toolbar';
 const toggle=document.createElement('button');toggle.type='button';toggle.textContent='✎ Editar textos';toggle.setAttribute('aria-pressed','false');
 const copy=document.createElement('button');copy.type='button';copy.textContent='Copiar alterações';
 const restore=document.createElement('button');restore.type='button';restore.textContent='Restaurar trecho';restore.disabled=true;
 const status=document.createElement('span');status.className='text-edit-status';status.setAttribute('role','status');status.textContent='Alterações salvas neste navegador.';
 toolbar.append(toggle,copy,restore,status);document.body.append(toolbar);toolbar.classList.toggle('has-saved-edits',Object.keys(read()).length>0);
 function announceEdit(el){el.dispatchEvent(new CustomEvent('study-content-edited',{bubbles:true}));}
 function register(el,key,subject,section){
  if(el.dataset.textEditKey)return;
  el.dataset.textEditKey=key;el.classList.add('editable-study-text');originals.set(el,el.textContent);
  const saved=read()[key];if(saved&&typeof saved.text==='string'){el.textContent=saved.text;el.classList.add('has-text-edit');announceEdit(el);}
  fields.add(el);el.contentEditable=editing?'plaintext-only':'false';el.spellcheck=true;
  el.setAttribute('aria-label','Texto editável: '+section);
  el.addEventListener('focus',()=>{focused=el;restore.disabled=!read()[key];});
  el.addEventListener('input',()=>{
   try{const edits=read(),text=el.innerText;if(text===originals.get(el)){delete edits[key];el.classList.remove('has-text-edit');}else{edits[key]={subject,section,original:originals.get(el),text,updatedAt:new Date().toISOString()};el.classList.add('has-text-edit');}localStorage.setItem(STORE,JSON.stringify(edits));toolbar.classList.toggle('has-saved-edits',Object.keys(edits).length>0);restore.disabled=!edits[key];status.textContent='Salvo neste navegador.';announceEdit(el);}catch{status.textContent='Não foi possível salvar. Copie seu texto antes de sair.';}
  });
  el.addEventListener('paste',event=>{if(!editing)return;event.preventDefault();const text=event.clipboardData?.getData('text/plain')||'',selection=window.getSelection();if(!selection?.rangeCount)return;const range=selection.getRangeAt(0);if(!el.contains(range.commonAncestorContainer))return;range.deleteContents();const node=document.createTextNode(text);range.insertNode(node);range.setStartAfter(node);range.collapse(true);selection.removeAllRanges();selection.addRange(range);el.dispatchEvent(new Event('input',{bubbles:true}));});
 }
 function prepare(){
  scheduled=false;for(const el of fields)if(!el.isConnected)fields.delete(el);
  const subject=root.querySelector('.topic-reading')?.dataset.readerTitle||'Apostila de Tributário';
  for(const owner of root.querySelectorAll('[data-reader-file],.book-section')){
   const ownerKey=owner.dataset.readerFile||'tributario:'+owner.id;const occurrences=new Map();
   const section=owner.querySelector('h2,h3,h4')?.textContent||subject;
   let index=0;
   for(const el of owner.querySelectorAll('h2,h3,h4,h5,p,td,th,figcaption')){
    if(el.closest('[data-reader-file],.book-section')!==owner)continue;
    if(el.closest('.study-reader-panel,.study-observation-editor,.study-reader-section-tools,.compact-original-links,.illustration-original')||el.classList.contains('study-reader-feedback')||el.classList.contains('conversion-notice'))continue;
    if(el.querySelector('button,input,textarea,iframe,img,table'))continue;
    let hash=2166136261;for(const char of el.tagName+'|'+el.textContent)hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;const code=hash.toString(36),occurrence=occurrences.get(code)||0;occurrences.set(code,occurrence+1);register(el,ownerKey+':text:'+code+':'+occurrence,subject,section);
   }
  }
 }
 toggle.addEventListener('click',()=>{editing=!editing;document.body.classList.toggle('editing-study-text',editing);toggle.textContent=editing?'✓ Concluir edição':'✎ Editar textos';toggle.setAttribute('aria-pressed',String(editing));for(const el of fields)if(el.isConnected)el.contentEditable=editing?'plaintext-only':'false';status.textContent=editing?'Clique no texto e escreva. O salvamento é automático.':'Alterações salvas neste navegador.';});
 restore.addEventListener('click',()=>{if(!focused?.isConnected)return;try{const key=focused.dataset.textEditKey,edits=read();focused.textContent=originals.get(focused);delete edits[key];localStorage.setItem(STORE,JSON.stringify(edits));toolbar.classList.toggle('has-saved-edits',Object.keys(edits).length>0);focused.classList.remove('has-text-edit');restore.disabled=true;status.textContent='Trecho original restaurado.';announceEdit(focused);}catch{status.textContent='Não foi possível restaurar.';}});
 copy.addEventListener('click',async()=>{const edits=Object.values(read());if(!edits.length){status.textContent='Nenhuma alteração salva.';return;}const text='Aplique estas alterações de texto no meu aplicativo de estudos:\n\n'+edits.map((e,i)=>(i+1)+'. Matéria: '+e.subject+'\nTrecho: '+e.section+'\nAntes: '+e.original+'\nDepois: '+e.text).join('\n\n');try{await navigator.clipboard.writeText(text);status.textContent='Copiado. Cole no chat para aplicar à versão compartilhada.';}catch{let field=toolbar.querySelector('textarea');if(!field){field=document.createElement('textarea');field.readOnly=true;field.setAttribute('aria-label','Alterações para copiar no chat');toolbar.append(field);}field.value=text;field.focus();field.select();status.textContent='Copie o texto e cole no chat.';}});
 new MutationObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{prepare();toolbar.hidden=fields.size===0;});}}).observe(root,{childList:true,subtree:true});prepare();toolbar.hidden=fields.size===0;
 window.addEventListener('storage',event=>{if(event.key!==STORE)return;const edits=read();for(const el of fields){if(!el.isConnected||el===document.activeElement)continue;el.textContent=edits[el.dataset.textEditKey]?.text??originals.get(el);announceEdit(el);}});
}
