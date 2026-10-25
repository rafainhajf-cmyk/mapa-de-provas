const MODES={assuntos:'Por assunto',teoria:'Teoria',exercicios:'Exercícios',questoes:'Teoria das questões'};
const PARTS={teoria:'.accounting-theory',exercicios:'.accounting-exercises',questoes:'.accounting-question-theory'};
export function accountingMode(value){return Object.hasOwn(MODES,value)?value:'assuntos'}
export function accountingReadingToolbarHTML(mode='assuntos'){return `<div class="accounting-reading-toolbar" role="group" aria-label="Leitura de Contabilidade"><span>Leitura:</span>${Object.entries(MODES).map(([key,label])=>`<button type="button" data-accounting-reading="${key}" aria-pressed="${mode===key}">${label}</button>`).join('')}<button type="button" data-accounting-pdf>⇩ Gerar PDF</button><span class="accounting-reading-count" role="status"></span></div>`;}
export function prepareAccountingReading(root,mode){
 if(!root?.querySelector('.accounting-topic'))return 0;
 mode=accountingMode(mode);root.dataset.accountingView=mode;
 for(const node of root.querySelectorAll('.continuous-topic,.reader-document,.accounting-topic,.accounting-sections>details,.accounting-sources'))node.hidden=false;
 for(const topic of root.querySelectorAll('.accounting-topic')){
  const parts=[...topic.querySelectorAll(':scope>.accounting-sections>details')];
  for(const part of parts){part.hidden=mode!=='assuntos'&&!part.matches(PARTS[mode]);if(mode!=='assuntos')part.open=!part.hidden;}
  if(mode!=='assuntos'){const part=parts.find(p=>p.matches(PARTS[mode]));topic.hidden=!part||!!part.querySelector('.accounting-empty');topic.querySelector(':scope>.accounting-sources')?.setAttribute('hidden','');}
 }
 for(const owner of root.querySelectorAll('.reader-document'))owner.hidden=![...owner.querySelectorAll('.accounting-topic')].some(t=>!t.hidden);
 for(const chapter of root.querySelectorAll('.continuous-topic'))chapter.hidden=![...chapter.querySelectorAll('.reader-document')].some(f=>!f.hidden);
 const count=[...root.querySelectorAll('.accounting-topic')].filter(t=>!t.hidden).length;
 const wrapper=root.closest('.uniform-topic'),status=wrapper?.querySelector('.accounting-reading-count');if(status)status.textContent=mode==='assuntos'?'':`${count} assunto(s) com conteúdo`;
 const select=wrapper?.querySelector('[data-quick-topic]');if(select)for(const option of select.options){const chapter=[...root.querySelectorAll('[data-reading-topic]')].find(c=>c.dataset.readingTopic===option.value);option.disabled=!!chapter?.hidden;}if(select?.selectedOptions[0]?.disabled){const first=[...select.options].find(o=>!o.disabled);if(first)select.value=first.value;}
 let empty=root.querySelector('.accounting-reading-empty');if(!empty){empty=document.createElement('p');empty.className='accounting-reading-empty';root.prepend(empty);}empty.hidden=count>0;empty.textContent='Ainda não há conteúdo lançado nesta parte. Use “Por assunto” para enviar suas anotações.';
 return count;
}
export function accountingPrintHTML(root,{mode='teoria',answers=false}={}){
 const clone=root.cloneNode(true);prepareAccountingReading(clone,mode);
 for(const el of clone.querySelectorAll('[hidden],.study-reader-section-tools,.study-observation-editor,.study-reader-toggle,.study-reader-panel,.study-reader-feedback,.accounting-send,.accounting-sources,.accounting-original-caption a,button,input,textarea,script,iframe,object,embed'))el.remove();
 for(const part of clone.querySelectorAll('.accounting-sections>details')){if(part.querySelector('.accounting-empty'))part.remove();else part.open=true;}
 for(const topic of clone.querySelectorAll('.accounting-topic'))if(!topic.querySelector('.accounting-sections>details'))topic.remove();
 for(const owner of clone.querySelectorAll('.reader-document'))if(!owner.querySelector('.accounting-topic'))owner.remove();
 for(const answer of clone.querySelectorAll('.accounting-answer')){if(answers){answer.open=true;answer.querySelector(':scope>summary')?.remove();}else answer.remove();}
 for(const support of clone.querySelectorAll('.accounting-editable-support:not([open])'))support.remove();
 for(const el of clone.querySelectorAll('[contenteditable]'))el.removeAttribute('contenteditable');
 for(const image of clone.querySelectorAll('img')){image.src=new URL(image.getAttribute('src'),location.href).href;image.loading='eager';}
 for(const a of clone.querySelectorAll('a'))a.removeAttribute('target');
 const title=`Contabilidade — ${mode==='assuntos'?'Todas as partes':MODES[accountingMode(mode)]}`;
 return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${title}</title><style>
 @page{size:A4;margin:10mm}*{box-sizing:border-box}body{font:12px/1.4 Arial,sans-serif;color:#192f25;margin:0;background:#fff;print-color-adjust:exact;-webkit-print-color-adjust:exact}h1{font-size:20px;margin:0 0 3px}h2{font-size:17px}h3{font-size:15px;margin:12px 0 5px;border-bottom:1px solid #abbfb1;padding-bottom:3px;break-after:avoid}h4{font-size:13px;margin:6px 0 3px}p{margin:3px 0 6px}article,section{margin:0;padding:0}table{border-collapse:collapse;max-width:100%;width:100%;font-size:11px;margin:4px 0 7px}td,th{border:1px solid #cad7ce;padding:4px 5px;text-align:left;vertical-align:top}tr{break-inside:avoid}th{background:#edf3ed}figure{margin:4px 0 8px;break-inside:avoid}.accounting-original-caption{font-size:10px;color:#476451;margin-bottom:3px}img{display:block;max-width:100%!important;height:auto!important;max-height:240mm;object-fit:contain;object-position:left top}details>summary{font-size:11px;font-weight:bold;margin:3px 0}.accounting-exercise{padding:5px 0 8px;border-bottom:1px solid #cdd8d0}.accounting-answer-body{border-left:2px solid #83a28b;padding:4px 7px;margin-top:5px}.accounting-empty,.accounting-group-label{display:none}a{color:inherit;text-decoration:none}.pdf-caption{font-size:11px;color:#526a5b;margin-bottom:9px}.study-note-table-wrap,.study-comparison-scroll{overflow:visible}
 </style></head><body><h1>${title}</h1><p class="pdf-caption">Sequência da matéria · ${answers?'Com respostas e resoluções':'Sem respostas e resoluções'}</p>${clone.innerHTML}</body></html>`;
}
export function openAccountingPDF(root,mode='teoria'){
 if(!root)return;
 const dialog=document.createElement('dialog');dialog.className='accounting-pdf-dialog';dialog.innerHTML=`<form method="dialog"><div class="accounting-pdf-head"><strong>Gerar PDF de Contabilidade</strong><button value="cancel" aria-label="Fechar opções de PDF">×</button></div><label>Conteúdo<select name="mode"><option value="teoria">Teoria</option><option value="exercicios">Exercícios</option><option value="questoes">Teoria das questões</option><option value="assuntos">Todas as partes</option></select></label><label><input type="checkbox" name="answers"> Incluir respostas e resoluções</label><p>Inclui os assuntos com conteúdo nesta parte, na sequência da matéria. Na janela de impressão, escolha <strong>Salvar como PDF</strong>.</p><div role="status" class="accounting-pdf-status"></div><button type="button" data-generate-accounting-pdf>Gerar PDF</button></form>`;
 document.body.append(dialog);dialog.querySelector('[name=mode]').value=mode==='assuntos'?'teoria':accountingMode(mode);dialog.addEventListener('close',()=>dialog.remove(),{once:true});dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 dialog.querySelector('[data-generate-accounting-pdf]').addEventListener('click',async event=>{
  const button=event.currentTarget,status=dialog.querySelector('[role=status]');button.disabled=true;status.textContent='Preparando os quadros e o conteúdo…';let frame;
  try{
   const mode=dialog.querySelector('[name=mode]').value,answers=dialog.querySelector('[name=answers]').checked,html=accountingPrintHTML(root,{mode,answers});
   if(!html.includes('data-accounting-topic=')){status.textContent='Ainda não há lançamentos nesta parte para gerar o PDF.';return;}
   document.querySelector('.accounting-pdf-frame')?.remove();frame=document.createElement('iframe');frame.className='accounting-pdf-frame';frame.title='PDF de Contabilidade';frame.setAttribute('aria-hidden','true');
   const loaded=new Promise((resolve,reject)=>{frame.onload=resolve;frame.onerror=reject});frame.srcdoc=html;document.body.append(frame);await loaded;
   await Promise.all([...frame.contentDocument.images].map(image=>image.decode?image.decode():Promise.resolve()));await frame.contentDocument.fonts?.ready;
   status.textContent='Na janela de impressão, escolha “Salvar como PDF”.';frame.contentWindow.focus();frame.contentWindow.print();
  }catch{frame?.remove();status.textContent='Não foi possível preparar o PDF. Tente novamente após carregar os quadros.';}finally{button.disabled=false;}
 });dialog.showModal();
}
