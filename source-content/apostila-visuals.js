// Adapta os quadros já existentes, sem alterar os textos legais ou o catálogo.
export function apostilaVisualBlocks(section){
 const blocks=section.blocks||[];
 if(section.id==='assunto-11157a14aebc')return [
  {type:'flowchart',title:'Antes de aplicar uma regra tributária',steps:[
   {label:'Qual tributo a questão cobra?'},
   {label:'Qual a data do fato e o corte legislativo do edital?',kind:'warning'},
   {label:'Lei estadual, norma geral nacional ou Constituição?'},
   {label:'A novidade altera esse imposto ou pertence a outro?',kind:'warning'},
   {label:'Aplique a regra de cálculo, crédito ou local.'}
  ]}, {type:'detail',title:'Ver explicação detalhada',blocks}];
 if(section.id==='assunto-d064c8ac3da1'){
  const table=blocks.find(b=>b.type==='table');
  return [{type:'timeline',title:'Calendário de convivência — sequência do material',steps:(table?.rows||[]).slice(1).map(row=>({label:row[0],text:row[1],kind:'neutral'}))},
   {type:'callout',kind:'warning',title:'Exceções e pegadinhas por período',text:'Consulte o quadro comparativo abaixo: as condições e ressalvas de cada etapa são parte da regra.'},...blocks];
 }
 if(section.id==='assunto-e83c3a1b99b6')return [
  {type:'callout',kind:'warning',title:'Não incidência não dispensa procedimentos',text:'O quadro distingue a transferência entre estabelecimentos do mesmo titular das regras de crédito, opção legal e documentação. Compare cada tributo separadamente.'},...blocks];
 if(section.id==='integrado-1xVJRhniJjKIGszflLKHTWvg'){
  const rows=[];let group='Visão geral';
  for(const b of blocks){const text=b.text||'';
   if(/^\d{2} —|VISÃO GERAL|OLHO NO VETO|ROTA EXPRESSA/.test(text)){group=text;continue;}
   if(/^[+R] Art\.|^Arts?\. \d|^\d{2} [A-ZÀ-Ú]/.test(text))rows.push([group,text]);
  }
  return [{type:'callout',kind:'warning',title:'Mapa do material — conferência legislativa pendente',text:'A fonte informa que este mapa não é uma conferência independente da legislação oficial. Os textos abaixo são preservados como conteúdo do material, sem certificar sua vigência.'},
   {type:'table',title:'Temas e dispositivos citados no mapa',rows:[['Tema','Dispositivo e informação da fonte'],...rows]},
   {type:'detail',title:'Ver explicação detalhada',blocks}];
 }
 return blocks;
}
