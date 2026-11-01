const volumes=new Set(['comparativo','lc236','lc227','ipva','itcmd','rmit','reserva','judicial']);
// Preserve the reader's existing grouping and section IDs.
export function tributarioVolumeFor(s){
 if(s.volume&&volumes.has(s.volume))return s.volume;
 if(s.volume==='reserva'||s.id.startsWith('reserva-lei-'))return 'reserva';
 const n=Number(s.originalIndex);
 if(n>=60||n===14)return 'rmit';
 if(n>=19&&n<=22)return 'ipva';
 if(n>=26&&n<=30)return 'itcmd';
 if(n===47||n>=49&&n<=53)return 'lc236';
 if(n>=31&&n<=35||n===46)return 'lc227';
 return 'comparativo';
}
export function taxBookReferences(sections){return sections.map((s,originalIndex)=>({...s,originalIndex})).filter(s=>tributarioVolumeFor(s)==='rmit').map(s=>({categoryId:'rmit',title:s.title,sectionId:s.id,href:'apostila.html#'+s.id}));}
