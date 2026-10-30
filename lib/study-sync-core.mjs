// Per-item registers and tombstones: removing a mark must not resurrect it on another device.
export const SYNC_STORES={
 'mapa-study-progress-v1':{maps:['seen','critical']},
 'mapa-study-observations-v1':{direct:true},
 'mapa-study-text-edits-v1':{direct:true},
 'mapa-study-favorites-v1':{direct:true},
 'mapa-tributario-reader-v1':{maps:['seen'],scalars:['last']},
 'mapa-financial-formula-practice-v1':{direct:true},
 'mapa-anki-reviews-v1':{direct:true},
 'mapadeprovas.v1':{maps:['progress','notes','materialLinks']}
};
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const safe=k=>!['__proto__','prototype','constructor'].includes(k);
export function flattenStore(store,value){const cfg=SYNC_STORES[store],out={};if(!cfg||!object(value))return out;
 if(cfg.direct){for(const [k,v]of Object.entries(value))if(safe(k))out[JSON.stringify([store,'',k])]=v;}
 else{for(const part of cfg.maps||[])if(object(value[part]))for(const [k,v]of Object.entries(value[part]))if(safe(k))out[JSON.stringify([store,part,k])]=v;for(const part of cfg.scalars||[])if(value[part]!==undefined)out[JSON.stringify([store,'$',part])]=value[part];}return out;
}
export function validEntryId(id){try{const parts=JSON.parse(id);if(!Array.isArray(parts)||parts.length!==3)return false;const [store,part,key]=parts,cfg=SYNC_STORES[store];return typeof id==='string'&&id.length<1600&&typeof key==='string'&&safe(key)&&!!cfg&&(cfg.direct?part==='':part==='$'?cfg.scalars?.includes(key):cfg.maps?.includes(part));}catch{return false;}}
export function validRegister(r){return object(r)&&Number.isSafeInteger(r.clock)&&r.clock>0&&typeof r.device==='string'&&/^[a-f0-9]{32}$/.test(r.device)&&typeof r.deleted==='boolean'&&(r.deleted||r.value!==undefined);}
export function compareRegisters(a,b){return (a?.clock||0)-(b?.clock||0)||String(a?.device||'').localeCompare(String(b?.device||''));}
export function mergeEntries(left={},right={}){const out={...left};for(const [id,value]of Object.entries(right))if(validEntryId(id)&&validRegister(value)&&(!out[id]||compareRegisters(value,out[id])>0))out[id]=value;return out;}
export function materialize(entries,current={}){const result=JSON.parse(JSON.stringify(current));
 for(const [id,r]of Object.entries(entries)){if(!validEntryId(id)||!validRegister(r))continue;const [store,part,key]=JSON.parse(id);if(!object(result[store]))result[store]={};let target=result[store];if(part&&part!=='$'){if(!object(target[part]))target[part]={};target=target[part];}if(r.deleted)delete target[key];else target[key]=r.value;}return result;
}
