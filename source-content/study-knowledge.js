// Base editorial estruturada: a planilha registra fontes, aprovações e histórico.
// Nenhuma linha pendente, rascunho ou rejeitada deve aparecer no site.
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const allowed=new Set(['paragraph','callout','table','flowchart','formula','reference']);
export function parseKnowledgeBundle(bundle){
 if(!bundle||bundle.schemaVersion!==1||!Array.isArray(bundle.records))throw Error('Pacote de esquemas inválido');
 const ids=new Set(),valid=[];
 for(const record of bundle.records){
  if(!record||!/^[-a-z0-9]{6,110}$/.test(record.id||'')||ids.has(record.id))throw Error('ID de esquema inválido ou duplicado');
  ids.add(record.id);
  if(!['approved','draft','rejected'].includes(record.status))throw Error('Estado de aprovação inválido: '+record.id);
  if(record.status!=='approved')continue;
  if(typeof record.subject!=='string'||!record.subject.trim()||typeof record.title!=='string'||!record.title.trim()||!Array.isArray(record.blocks)||record.blocks.length>100||record.blocks.some(b=>!allowed.has(b?.type)))throw Error('Estrutura não suportada: '+record.id);
  if(!String(record.targetId||'').trim()&&!String(record.targetTitle||'').trim())throw Error('Assunto de destino não informado: '+record.id);
  valid.push(record);
 }
 return valid;
}
export function matchesKnowledgeTopic(note,topic){
 if(note.subject!==topic.subject)return false;
 if(topic.id==='knowledge:'+note.id)return true;
 const id=String(note.targetId||'').trim(),normalizedTitle=norm(note.targetTitle);
 if(id&&(topic.id===id||topic.id.endsWith(':'+id)||topic.id.endsWith(':'+id.replace(/^contab-/,'contab-'))))return true;
 if(!normalizedTitle)return false;
 const target=norm(topic.title),group=norm(topic.studyGroup);
 return target===normalizedTitle||group===normalizedTitle||target.includes(normalizedTitle)&&normalizedTitle.length>=6;
}
const safeLink=u=>{try{const v=new URL(u);return v.protocol==='https:'&&!v.username&&!v.password?v.href:''}catch{return ''}};
function blockHTML(b){
 if(b.type==='paragraph')return '<p>'+esc(b.text)+'</p>';
 if(b.type==='formula')return '<div class="review-formula">'+esc(b.text)+'</div>';
 if(b.type==='callout')return '<aside class="review-callout '+(['rule','danger','warning','note'].includes(b.kind)?b.kind:'note')+'"><strong>'+esc(b.title)+'</strong><p>'+esc(b.text)+'</p></aside>';
 if(b.type==='table')return '<div class="study-note-table"><table><tbody>'+(b.rows||[]).map((row,i)=>'<tr>'+row.map(cell=>i===0?'<th>'+esc(cell)+'</th>':'<td>'+esc(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 if(b.type==='flowchart')return '<section class="review-flow"><h4>'+esc(b.title||'Sequência')+'</h4><ol>'+(b.steps||[]).map(step=>{const x=typeof step==='string'?{label:step}:step;return '<li><strong>'+esc(x.label)+'</strong><p>'+esc(x.text)+'</p></li>'}).join('')+'</ol></section>';
 if(b.type==='reference'){const u=safeLink(b.url);return u?'<p><a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+esc(b.text||'Consultar fonte')+' ↗</a></p>':'';}
 return '';
}
export function knowledgeHTML(notes=[]){
 return notes.map(note=>'<article class="accounting-panel study-knowledge-increment" data-knowledge-id="'+esc(note.id)+'" style="margin:18px 0;padding:18px;border:1px solid #c7dbd4;border-radius:14px"><p style="font-size:.75rem;letter-spacing:.08em;color:#397c68;font-weight:700">ESQUEMA INCREMENTAL · '+esc(note.updateType||'revisão')+'</p><h3>'+esc(note.title)+'</h3>'+(note.blocks||[]).map(blockHTML).join('')+(note.flashcards?.length?'<details><summary>Flashcards ('+note.flashcards.length+')</summary>'+note.flashcards.map(([q,a],i)=>'<details style="padding:10px;border:1px solid #e2e8e5;margin:6px 0"><summary>'+esc((i+1)+'. '+q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</details>':'')+'<p style="font-size:.76rem;color:#58766d">ID: '+esc(note.id)+' · Fonte: '+esc(note.source||'planilha de controle')+'</p></article>').join('');
}
export function knowledgeForTopic(notes,topic){return (notes||[]).filter(note=>matchesKnowledgeTopic(note,topic));}
export function addKnowledgeTopics(entries,notes,subject){
 for(const note of notes||[]){
  if(subject&&note.subject!==subject)continue;
  if(entries.some(t=>matchesKnowledgeTopic(note,t)))continue;
  // Só criar uma entrada suplementar quando ainda não houver vínculo inequívoco.
  entries.push({id:'knowledge:'+note.id,title:note.targetTitle||note.title,subject:note.subject,folderId:'',area:'Revisões incrementais',fileIds:[],order:1000});
 }
 return entries;
}
