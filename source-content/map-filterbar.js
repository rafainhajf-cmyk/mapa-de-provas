// Keep the existing filtering behavior, presented as a compact Drive-style toolbar.
const bar=document.querySelector('.map-page .filters');
const areas=document.getElementById('areas');
if(bar&&areas){
 bar.classList.add('drive-filterbar');areas.classList.add('drive-area-source');
 const areaLabel=document.createElement('label');areaLabel.className='select-wrap drive-area-filter';
 const label=document.createElement('span');label.textContent='Conteúdo';
 const select=document.createElement('select');select.setAttribute('aria-label','Filtrar por conteúdo');areaLabel.append(label,select);
 const search=bar.querySelector('.search');search.after(areaLabel);
 const button=document.createElement('button');button.type='button';button.className='drive-more-filters';button.textContent='☷ Mais filtros';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','mapAdvancedFilters');
 const reset=document.getElementById('reset');bar.insertBefore(button,reset);
 const panel=document.createElement('section');panel.id='mapAdvancedFilters';panel.className='drive-advanced-panel';panel.hidden=true;panel.setAttribute('aria-label','Filtros adicionais do mapa');
 const head=document.createElement('div');head.className='drive-panel-heading';const title=document.createElement('strong');title.textContent='Mais filtros';const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Fechar filtros adicionais');head.append(title,close);panel.append(head);
 const view=document.querySelector('.view-toggle');const results=document.querySelector('.result-line');if(view&&results)results.append(view);
 for(const selector of ['.comparison-filters','.analysis-filters','.table-toolbar','#qualityControls','#transferControls','.map-key-details']){const node=document.querySelector(selector);if(node)panel.append(node);}
 const done=document.createElement('button');done.type='button';done.className='drive-filter-done';done.textContent='Concluir';panel.append(done);bar.append(panel);
 function setOpen(open){panel.hidden=!open;button.setAttribute('aria-expanded',String(open));}
 button.addEventListener('click',()=>setOpen(panel.hidden));close.addEventListener('click',()=>{setOpen(false);button.focus();});done.addEventListener('click',()=>{setOpen(false);button.focus();});
 document.addEventListener('pointerdown',event=>{if(!panel.hidden&&!panel.contains(event.target)&&!button.contains(event.target))setOpen(false);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){setOpen(false);button.focus();}});
 function advancedCount(){let count=0;for(const id of ['kandir','difference','qualityStatus','transferStatus','coverageStatus']){const el=document.getElementById(id);if(el?.value&&!el.closest('#qualityControls[hidden],#transferControls[hidden],#coverageFilter[hidden],.comparison-filters[hidden]'))count++;}if(document.getElementById('common')?.checked)count++;if(document.getElementById('includeAnnulled')?.checked)count++;if(document.getElementById('sort')?.value!=='alpha')count++;button.textContent='☷ Mais filtros'+(count?' ('+count+')':'');button.classList.toggle('has-active-filters',count>0);}
 function syncAreas(){const tabs=[...areas.querySelectorAll('[data-area]')];select.replaceChildren();for(const tab of tabs){const option=document.createElement('option');option.value=tab.dataset.area;const count=tab.querySelector('span')?.textContent||'';option.textContent=(tab.dataset.area==='Todas'?'Todos':tab.dataset.area)+(count?' ('+count+')':'');option.selected=tab.classList.contains('active');select.append(option);}areaLabel.hidden=areas.hidden||!tabs.length;advancedCount();}
 select.addEventListener('change',()=>{const tab=[...areas.querySelectorAll('[data-area]')].find(tab=>tab.dataset.area===select.value);tab?.click();});
 new MutationObserver(syncAreas).observe(areas,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});
 document.addEventListener('change',advancedCount);reset?.addEventListener('click',()=>requestAnimationFrame(advancedCount));syncAreas();
}
