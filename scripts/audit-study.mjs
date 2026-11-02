import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {macroConcepts} from '../source-content/macro-concepts.js';
export function flattenBlocks(blocks=[]){return blocks.flatMap(b=>[b,...flattenBlocks(b.blocks||[])]);}
export function auditStudy(data){
 const notes=new Map(data.analysis.analyzedFiles.map(n=>[n.id,n]));
 const macroIds=new Set(data.subjectCatalogs?.Macroeconomia?.nodes?.filter(n=>macroConcepts[n.id]?.length).flatMap(n=>n.fileIds||[])||[]);
 const subjects=new Map(),materials=[];const seen=new Set();
 for(const folder of data.folders){
  if(!subjects.has(folder.subject))subjects.set(folder.subject,{subject:folder.subject,total:0,structured:0,pending:0,empty:0});
  for(const file of folder.files||[]){if(seen.has(file.id))continue;seen.add(file.id);
   const note=notes.get(file.id)||{},blocks=flattenBlocks([...(note.contentBlocks||[]),...(note.visualBlocks||[]),...(note.contentSections||[]).flatMap(s=>s.blocks||[]),...(note.accountingTopics||[]).flatMap(t=>[...(t.theory||[]),...(t.questionTheory||[]).flatMap(q=>q.blocks||[])])]);
   const text=blocks.map(b=>b.text||b.rows?.flat().join(' ')||'').join(' ');
   const placeholder=/ainda não foi preenchido com teoria|aguardando suas anotações/i.test(text)||!!note.accountingTopics?.length&&!note.accountingTopics.some(t=>t.theory?.length);
   const fragment=blocks.some(b=>b.type==='table'&&/Trecho identificado no material/.test(b.rows?.[0]?.join(' ')));
   const visual=blocks.some(b=>['diagram','flowchart','timeline','formula'].includes(b.type)||b.type==='table'&&b.rows?.length>1&&!/Leitura rápida.*Ação/.test(b.rows[0].join(' ')));
   const formula=folder.subject==='Matemática Financeira'&&blocks.some(b=>b.type==='paragraph'&&/^[^=]{1,35}=/.test(b.text||''));
   const status=macroIds.has(file.id)?'structured':placeholder?'empty':fragment?'pending':visual||formula?'structured':'pending';
   const reason=status==='empty'?'Índice cadastrado, sem teoria suficiente.':fragment?'Tabela de trechos/OCR: precisa de esquema conceitual.':status==='pending'?'Falta quadro, fluxo ou fórmula de revisão por conceito.':'Estrutura visual existente; não equivale a validação factual integral.';
   const row={subject:folder.subject,id:file.id,title:note.topic||file.title,status,reason};materials.push(row);const summary=subjects.get(folder.subject);summary.total++;summary[status]++;
  }
 }
 return {version:1,scope:'Conferência estrutural do catálogo efetivamente publicado; não certifica correção jurídica ou cobertura integral.',subjects:[...subjects.values()],materials};
}
export async function writeStudyAudit(input='private-content/difficulty-data.json',output='private-content/study-visual-audit.json'){
 const report=auditStudy(JSON.parse(await readFile(input,'utf8')));await writeFile(output,JSON.stringify(report));return report;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const report=await writeStudyAudit();
 console.log(JSON.stringify(report.subjects));
 if(process.argv.includes('--markdown')){
  const labels={structured:'Estrutura existente',pending:'Requer esquema conceitual',empty:'Aguardando conteúdo'};
  const text='# Conferência do padrão visual — Mapa de Provas\n\n'+report.scope+'\n\n| Matéria | Materiais | Estrutura existente | Requer esquema | Sem teoria |\n|---|---:|---:|---:|---:|\n'+report.subjects.map(s=>`| ${s.subject} | ${s.total} | ${s.structured} | ${s.pending} | ${s.empty} |`).join('\n')+'\n\n## Pendências identificadas\n\n'+report.materials.filter(m=>m.status!=='structured').map(m=>`- **${m.subject} — ${m.title}**: ${labels[m.status]}. ${m.reason}`).join('\n')+'\n\n## Apostila de Tributário\n\n81 seções preservadas. Leitor corrigido; renderer compartilhado com fluxos, linhas do tempo, tabelas, fórmulas, alertas e explicações recolhidas. A mudança visual não substitui conferência de vigência das normas citadas.\n';
  await writeFile('docs/auditoria-padrao-visual.md',text);
 }
}
