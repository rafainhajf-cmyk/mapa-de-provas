// Pure reconciliation: source wins conflicts; full incoming variants remain in the report.
export function reconcileTaxCatalog(source,root){
 const data=structuredClone(source),report={schema:1,conflicts:[],addedFiles:[],addedNotes:[]};
 const taxIds=new Set();data.analysis??={};data.analysis.analyzedFiles??=[];
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 for(const folder of root.folders.filter(f=>f.subject==='Tributário')){
  let target=data.folders.find(f=>f.id===folder.id);
  if(!target){target=structuredClone({...folder,files:[]});data.folders.push(target);}
  if(target.subject!=='Tributário')throw Error('ID de pasta compartilhado entre disciplinas: '+folder.id);
  for(const file of folder.files||[]){if(data.folders.some(f=>f.subject!=='Tributário'&&f.files?.some(x=>x.id===file.id)))throw Error('ID de arquivo em outra disciplina: '+file.id);taxIds.add(file.id);const existing=data.folders.flatMap(f=>f.files||[]).find(f=>f.id===file.id);
   if(!existing){target.files.push(structuredClone(file));report.addedFiles.push(file.id);}
   else if(!same(existing,file))report.conflicts.push({type:'file',id:file.id,current:structuredClone(existing),incoming:structuredClone(file)});
  }
 }
 for(const folder of data.folders.filter(f=>f.subject==='Tributário'))for(const file of folder.files||[])taxIds.add(file.id);
 for(const note of root.analysis?.analyzedFiles||[]){if(!taxIds.has(note.id))continue;const current=data.analysis.analyzedFiles.find(n=>n.id===note.id);if(!current){data.analysis.analyzedFiles.push(structuredClone(note));report.addedNotes.push(note.id);}else if(!same(current,note))report.conflicts.push({type:'note',id:note.id,current:structuredClone(current),incoming:structuredClone(note)});}
 // Preserve catalog-only references, merging by stable node IDs.
 const mergeNodes=(left=[],right=[])=>{const result=structuredClone(left);for(const node of right){const old=result.find(n=>n.id===node.id);if(!old)result.push(structuredClone(node));else{if(!same(old,node))report.conflicts.push({type:'catalog-node',id:node.id,current:structuredClone(old),incoming:structuredClone(node)});if(node.fileIds)old.fileIds=[...new Set([...(old.fileIds||[]),...node.fileIds])];if(node.children)old.children=mergeNodes(old.children,node.children);}}return result;};
 if(root.subjectCatalogs?.['Tributário']){data.subjectCatalogs??={};const old=data.subjectCatalogs['Tributário'];data.subjectCatalogs['Tributário']=old?{...old,nodes:mergeNodes(old.nodes,root.subjectCatalogs['Tributário'].nodes)}:structuredClone(root.subjectCatalogs['Tributário']);}
 for(const resource of root.subjectResources||[]){if(resource.subject!=='Tributário')continue;data.subjectResources??=[];const current=data.subjectResources.find(r=>r.subject==='Tributário'&&(resource.id?r.id===resource.id:r.fileId===resource.fileId));if(!current)data.subjectResources.push(structuredClone(resource));else if(!same(current,resource))report.conflicts.push({type:'resource',id:resource.id||resource.fileId,current:structuredClone(current),incoming:structuredClone(resource)});}
 report.fileIds=[...taxIds].sort();data.taxReconciliation={conflictIds:[...new Set(report.conflicts.map(c=>c.id))].sort(),reportURL:'tax-reconciliation-report.json'};return {data,report};
}
