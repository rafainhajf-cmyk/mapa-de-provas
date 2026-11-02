import {readBackupContent,addBackupContent} from './flashcards-import.js?v=5';
import {createBackup,validateBackup,planRestore,restoreBackup,MAX_BACKUP_BYTES} from './flashcards-backup.js?v=1';
const KEY='mapa-anki-reviews-v1';
const readReviews=()=>{const raw=localStorage.getItem(KEY);const r=raw?JSON.parse(raw):{};if(!r||typeof r!=='object'||Array.isArray(r))throw Error('Histórico local inválido; restauração cancelada para preservá-lo.');return r;};
const adapter={read:async()=>({...await readBackupContent(),reviews:readReviews()}),commit:addBackupContent,saveReviews:async added=>{
 const current=readReviews();for(const [id,r] of Object.entries(added))if(!Object.hasOwn(current,id))Object.defineProperty(current,id,{value:r,enumerable:true});
 localStorage.setItem(KEY,JSON.stringify(current));const saved=readReviews();if(Object.keys(added).some(id=>!Object.hasOwn(saved,id)))throw Error('Falha na conferência das revisões.');
}};
const $=s=>document.querySelector(s);let busy=false;
async function download(){
 const data=await createBackup(await adapter.read());const blob=new Blob([JSON.stringify(data)],{type:'application/json'});
 if(blob.size>MAX_BACKUP_BYTES)throw Error('Backup excede o limite de tamanho.');
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='flashcards_completo_'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
 return data;
}
async function run(action){if(busy)return;busy=true;$('#backupFull').disabled=true;$('#restoreFull').disabled=true;
 try{await action();}catch(e){$('#fullBackupStatus').textContent='Operação interrompida: '+e.message;}finally{busy=false;$('#backupFull').disabled=false;$('#restoreFull').disabled=false;$('#restoreFull').value='';}}
$('#backupFull').onclick=()=>run(async()=>{const b=await download();$('#fullBackupStatus').textContent=`Backup preparado para download: ${b.cards.length} cartões, ${b.media.length} mídias e ${Object.keys(b.reviews).length} revisões. Guarde o arquivo em local privado.`;});
$('#restoreFull').onchange=e=>{const file=e.target.files[0];if(!file)return;run(async()=>{
 if(file.size>MAX_BACKUP_BYTES)throw Error('Arquivo excede o limite de 180 MB.');
 $('#fullBackupStatus').textContent='Conferindo integridade e comparando com os dados locais…';
 const incoming=await validateBackup(JSON.parse(await file.text())),plan=await planRestore(await adapter.read(),incoming);
 const count=Object.values(plan.conflicts).reduce((a,b)=>a+b,0);
 const summary=`Arquivo: ${incoming.cards.length} cartões, ${incoming.media.length} mídias, ${Object.keys(incoming.reviews).length} revisões.\nA adicionar: ${plan.cards.length} cartões, ${plan.media.length} mídias, ${Object.keys(plan.reviews).length} revisões.\nConflitos preservados localmente: ${count}. Cartões bloqueados por conflito de mídia: ${plan.blockedCards}.`;
 $('#fullBackupStatus').textContent=summary;
 if(!window.confirm(summary+'\n\nContinuar? Os registros locais existentes serão mantidos.'))return;
 if(window.confirm('Deseja baixar uma cópia completa dos dados atuais antes de restaurar?'))await download();
 const result=await restoreBackup(incoming,adapter);
 document.dispatchEvent(new CustomEvent('study-sync-applied'));
 $('#fullBackupStatus').textContent=`Conteúdo conferido: ${result.savedCards} cartões e ${result.savedMedia} mídias adicionados; ${result.savedReviews} revisões adicionadas. ${result.blockedCards} cartões bloqueados por conflito de mídia. Registros locais mantidos.`+(result.partial?' Atenção: o conteúdo foi salvo, mas as revisões não puderam ser confirmadas. Preserve o arquivo e tente novamente.':'');
});};
