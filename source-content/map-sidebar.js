const drawer=document.getElementById('mapSidebarDrawer');
const toggle=document.getElementById('mapSidebarToggle');
const panel=document.getElementById('mapSidebarPanel');
let pinned=false;
const canHover=()=>matchMedia('(hover:hover) and (pointer:fine)').matches;
function setOpen(open){drawer.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));panel.inert=!open;}
drawer.addEventListener('pointerenter',()=>{if(canHover())setOpen(true);});
drawer.addEventListener('pointerleave',()=>{if(canHover()&&!pinned)setOpen(false);});
toggle.addEventListener('click',()=>{pinned=!drawer.classList.contains('is-open');setOpen(pinned);});
panel.addEventListener('click',e=>{if(e.target.closest('#subjects button,.dashboard-switch a')){pinned=false;setOpen(false);}});
document.addEventListener('pointerdown',e=>{if(!drawer.contains(e.target)){pinned=false;setOpen(false);}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('is-open')){pinned=false;setOpen(false);toggle.focus();}});
