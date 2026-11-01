import {TAX_CATEGORIES} from './tax-classification.js?v=1';
export const TAX_PREFERENCES_KEY='mapa-tax-classification-v1';
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const validId=id=>typeof id==='string'&&id.length<=400&&/^[a-zA-Z0-9_:.-]+$/.test(id)&&!['__proto__','constructor','prototype'].includes(id);
function validate(value){if(!object(value)||!TAX_CATEGORIES.some(c=>c.id===value.categoryId)||!Array.isArray(value.tags)||value.tags.some(t=>typeof t!=='string'||t.length>80)||value.tags.length>20)throw Error('Categoria ou etiquetas inválidas.');return {categoryId:value.categoryId,tags:[...new Set(value.tags.map(s=>s.trim()).filter(Boolean))],updatedAt:value.updatedAt||new Date().toISOString()};}
function load(storage,strict=false){try{const raw=storage.getItem(TAX_PREFERENCES_KEY);const parsed=JSON.parse(raw||'{}');if(!object(parsed))throw Error();return parsed;}catch{if(strict)throw Error('Classificação local inválida. Exporte uma cópia antes de tentar novamente.');return {};}}
export function readTaxPreferences(storage){const result={};for(const [id,value]of Object.entries(load(storage)))if(validId(id))try{result[id]=validate(value)}catch{}return result;}
function commit(storage,next){if(storage.getItem(TAX_PREFERENCES_KEY+'-before-edit')===null)storage.setItem(TAX_PREFERENCES_KEY+'-before-edit',JSON.stringify({savedAt:new Date().toISOString(),data:storage.getItem(TAX_PREFERENCES_KEY)}));storage.setItem(TAX_PREFERENCES_KEY,JSON.stringify(next));}
export function saveTaxPreference(storage,id,value){if(!validId(id))throw Error('Assunto inválido.');const next=load(storage,true);next[id]=validate(value);commit(storage,next);}
export function resetTaxPreference(storage,id){if(!validId(id))throw Error('Assunto inválido.');const next=load(storage,true);delete next[id];commit(storage,next);}
