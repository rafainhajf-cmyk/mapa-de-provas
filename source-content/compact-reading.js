// Trim empty paper margins in the reading preview; original links stay intact.
const root=document.getElementById('difficultyResults');
const urls=new Set();
async function cropPaper(img){
 if(img.dataset.compactPaper)return;img.dataset.compactPaper='pending';
 const apply=async()=>{
  if(!img.isConnected||!img.naturalWidth)return;
  try{
   const w=img.naturalWidth,h=img.naturalHeight;
   const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
   const pixels=ctx.getImageData(0,0,w,h).data;
   let top=h,bottom=-1,left=w,right=-1;
   for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(y*w+x)*4;
    if(pixels[i+3]>32&&Math.min(pixels[i],pixels[i+1],pixels[i+2])<235){
     if(y<top)top=y;if(y>bottom)bottom=y;if(x<left)left=x;if(x>right)right=x;
    }
   }
   if(bottom<top||right-left<20){img.dataset.compactPaper='unchanged';return;}
   const pad=16;top=Math.max(0,top-pad);bottom=Math.min(h-1,bottom+pad);
   left=Math.max(0,left-pad);right=Math.min(w-1,right+pad);
   const cw=right-left+1,ch=bottom-top+1;
   if(cw*ch>w*h*.94){img.dataset.compactPaper='unchanged';return;}
   const out=document.createElement('canvas');out.width=cw;out.height=ch;
   out.getContext('2d').drawImage(canvas,left,top,cw,ch,0,0,cw,ch);
   const blob=await new Promise(resolve=>out.toBlob(resolve,'image/png'));
   if(!blob||!img.isConnected)return;
   const url=URL.createObjectURL(blob);urls.add(url);
   img.dataset.originalWidth=String(w);img.dataset.originalHeight=String(h);
   img.dataset.croppedHeight=String(ch);img.dataset.compactPaper='cropped';
   img.src=url;
  }catch{img.dataset.compactPaper='unchanged';}
 };
 if(img.complete)await apply();else img.addEventListener('load',apply,{once:true});
}
let scheduled=false;
function compact(){
 scheduled=false;
 if(!root)return;
 for(const img of root.querySelectorAll('.study-pdf-page img,.study-note-image img'))cropPaper(img);
 for(const pdf of root.querySelectorAll('.study-original-pdf')){
  if(pdf.dataset.compactSources)continue;pdf.dataset.compactSources='true';
  const intro=pdf.querySelector(':scope>p'),links=[...pdf.querySelectorAll(':scope>a')];
  if(!links.length)continue;
  const details=document.createElement('details');details.className='compact-original-links';
  const summary=document.createElement('summary');summary.textContent='Abrir ou baixar o original';
  details.append(summary);if(intro)details.append(intro);links.forEach(a=>details.append(a));
  pdf.prepend(details);
 }
 for(const url of urls)if(![...root.querySelectorAll('img')].some(img=>img.src===url)){URL.revokeObjectURL(url);urls.delete(url);}
}
if(root){new MutationObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(compact);}}).observe(root,{childList:true,subtree:true});compact();}
window.addEventListener('pagehide',()=>{for(const url of urls)URL.revokeObjectURL(url);});
