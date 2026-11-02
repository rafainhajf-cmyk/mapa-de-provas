// Blocos visuais compartilhados. O renderer não decide se uma afirmação é verdadeira.
export const REVIEW_BLOCK_TYPES = new Set(['paragraph','table','detail','callout','flowchart','timeline','formula','reference']);
export const escapeReview = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeKind=(kind,allowed,fallback)=>allowed.includes(kind)?kind:fallback;
export function renderReviewBlocks(blocks=[],fallback=()=> ''){
 return blocks.map(b=>{
 const e=escapeReview;
 if(b.type==='callout')return `<aside class="review-callout ${safeKind(b.kind,['rule','danger','warning','note'],'note')}"><strong>${e(b.title||'Observação')}</strong><p>${e(b.text)}</p></aside>`;
 if(b.type==='formula')return `<div class="review-formula" role="note" aria-label="Fórmula">${e(b.text)}</div>`;
 if(b.type==='flowchart'||b.type==='timeline'){
  const timeline=b.type==='timeline';return `<section class="review-${timeline?'timeline':'flow'}" aria-label="${e(b.title||'Sequência')}">${b.title?'<h4>'+e(b.title)+'</h4>':''}<ol>${(b.steps||[]).map((step,i)=>{const x=typeof step==='string'?{label:step}:step;return `<li class="${safeKind(x.kind,['success','danger','warning','neutral'],'neutral')}"><span class="review-step-number">${i+1}</span><div><strong>${e(x.label)}</strong>${x.text?'<p>'+e(x.text)+'</p>':''}</div></li>`}).join('')}</ol></section>`;
 }
 if(b.type==='table'){
  const rows=b.rows||[];if(!rows.length)return '';return `<div class="review-table-wrap" role="region" tabindex="0" aria-label="${e(b.title||'Quadro comparativo')}"><table>${b.title?'<caption>'+e(b.title)+'</caption>':''}<thead><tr>${rows[0].map(c=>'<th scope="col">'+e(c)+'</th>').join('')}</tr></thead><tbody>${rows.slice(1).map(row=>'<tr>'+row.map((c,i)=>i===0?'<th scope="row">'+e(c)+'</th>':'<td data-label="'+e(rows[0][i])+'">'+e(c)+'</td>').join('')+'</tr>').join('')}</tbody></table></div>`;
 }
 if(b.type==='detail')return `<details class="review-detail"><summary>${e(b.title||'Ver explicação detalhada')}</summary><div>${renderReviewBlocks(b.blocks||[],fallback)}</div></details>`;
 if(b.type==='reference'){try{const url=new URL(b.url);if(url.protocol!=='https:')return '';return `<p class="review-source"><a href="${e(url.href)}" target="_blank" rel="noopener noreferrer">${e(b.text||url.hostname)}</a></p>`}catch{return ''}}
 if(b.type==='paragraph'){
  if(b.style==='TITLE')return '<h3>'+e(b.text)+'</h3>';
  if(b.style?.startsWith('HEADING'))return '<h4>'+e(b.text)+'</h4>';
  return '<p'+(b.source?' class="review-source"':'')+'>'+e(b.text)+'</p>';
 }
 return fallback(b);
 }).join('');
}
// Recolhe apenas explicações; mantém texto e ordem interna integrais. Não resume conteúdo por OCR.
export function compactReviewBlocks(blocks=[]){
 const result=[];let detail=[];
 const flush=()=>{if(detail.length){result.push({type:'detail',title:'Ver explicação detalhada',blocks:detail});detail=[];}};
 for(let i=0;i<blocks.length;i++){
  const b=blocks[i];
  if(b.type==='paragraph'&&/^Ver explicação detalhada\s*$/i.test(b.text||'')){
   const tail=[];while(i+1<blocks.length&&!blocks[i+1].style?.startsWith('HEADING'))tail.push(blocks[++i]);
   flush();result.push({type:'detail',title:b.text,blocks:tail});continue;
  }
  if(b.type==='paragraph'&&!b.style?.startsWith('HEADING')&&b.style!=='TITLE'){
   const value=(b.text||'').trim();
   const explicit=/^(PEGADINHA|PROIBIÇÃO|EXCEÇÃO|ATENÇÃO|CUIDADO|PARA GUARDAR|REGRA GERAL|EXEMPLO)(?:\b|\s*[:—])/i.exec(value);
   if(explicit&&value.length<=550&&!b.source){flush();const name=explicit[1].toUpperCase();result.push({type:'callout',kind:/PEGADINHA|PROIBIÇÃO/.test(name)?'danger':/EXCEÇÃO|ATENÇÃO|CUIDADO/.test(name)?'warning':'note',title:explicit[1],text:value});continue;}
   if(b.source||value.length>360){detail.push(b);continue;}
  }
  flush();result.push(b.type==='detail'?{...b,blocks:compactReviewBlocks(b.blocks)}:b);
 }
 flush();return result;
}
