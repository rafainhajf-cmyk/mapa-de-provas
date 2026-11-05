// Incremento 03 | CPC 08 e CPC 48 | Origem: material fornecido pelo estudante.
// ID estável: contab-20-premio-debentures-custo-amortizado
export const debenturesIncrementId='contab-20-premio-debentures-custo-amortizado';
export const debenturesIncrement={
 id:debenturesIncrementId, target:'contab-20', title:'Prêmio na emissão de debêntures — CPC 08',
 source:'Incremento 03 enviado pelo estudante',nominal:1000000,premium:100000,received:1100000,
 blocks:[
  {type:'callout',kind:'rule',title:'Regra essencial',text:'O prêmio de emissão compõe o valor contábil inicial do passivo financeiro. Sua apropriação posterior, em regra, segue o custo amortizado pelo método dos juros efetivos (CPC 08 e CPC 48).'},
  {type:'table',rows:[['Etapa','Tratamento contábil'],['Reconhecimento inicial (sem custos de transação)','D Bancos R$ 1.100.000; C Passivo financeiro — debêntures R$ 1.100.000'],['Desdobramento analítico possível','C Debêntures a pagar R$ 1.000.000 + C Prêmio na emissão (subconta do passivo) R$ 100.000'],['Reconhecimento posterior','Custo amortizado, método dos juros efetivos; o prêmio altera os encargos financeiros líquidos'],['Rateio de R$ 1.666,67/mês','É apenas aritmética ilustrativa: não corresponde, por si só, ao critério normativo']]},
  {type:'flowchart',title:'Fluxo de reconhecimento',steps:[{label:'Receber R$ 1.100.000',text:'Reconhecer passivo inicial aplicável'},{label:'Identificar fluxos contratuais e taxa efetiva',text:'Considerar cupons, vencimentos, pagamentos e custos de transação'},{label:'Aplicar a taxa efetiva a cada período',text:'Atualizar o valor contábil e registrar pagamentos'},{label:'Apropriar o efeito do prêmio',text:'Integrado aos encargos financeiros líquidos até a liquidação'}]},
  {type:'callout',kind:'warning',title:'Não é possível calcular a tabela completa',text:'O exemplo não informa cupons, vencimentos, pagamentos e custos de transação. Sem esses dados, não se calcula a tabela de juros efetivos.'},
  {type:'callout',kind:'danger',title:'Pegadinhas de prova',text:'O prêmio não é reserva de capital na disciplina atual; não é receita diferida autônoma; não se confunde valor nominal com valor contábil inicial; rateio linear não é a regra geral.'},
  {type:'reference',text:'CPC 08 (R1), itens 12 e 14',url:'https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_08_R1_Consolidado.pdf'},
  {type:'reference',text:'CPC 48 — instrumentos financeiros',url:'https://www.cpc.org.br/Arquivos/Documentos/530_CPC_48_rev_19.pdf'}
 ],
 flashcards:[
  ['Onde fica o prêmio inicialmente?','No passivo financeiro, integrado ao montante inicialmente reconhecido.'],
  ['Qual método de apropriação em regra?','Custo amortizado pelo método dos juros efetivos.'],
  ['Prêmio de debêntures é reserva de capital?','Não.'],
  ['Posso simplesmente dividir R$ 100.000 por 60 meses?','Não como regra normativa; faltam os fluxos de caixa e a taxa efetiva.']
 ]
};
export function debenturesIncrementHTML(renderBlocks){
 const a=debenturesIncrement;
 return `<section class="accounting-debentures-increment accounting-panel" id="${a.id}" data-increment-id="${a.id}" style="margin:18px 0;padding:18px;border:1px solid #c7dbd4;border-radius:14px;background:var(--surface,#fff)">
 <p style="font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:#397c68">Incremento 03 · Contabilidade</p>
 <h3>${a.title}</h3>
 <p><strong>Exemplo:</strong> nominal R$ 1.000.000 + prêmio de 10% (R$ 100.000) = captação de <strong>R$ 1.100.000</strong>, sem custos de transação nesta hipótese.</p>
 ${renderBlocks(a.blocks)}
 <details class="accounting-question-theory"><summary>Flashcards — 4 perguntas de revisão</summary><div class="accounting-panel">${a.flashcards.map(([q,answer],i)=>`<details style="margin:9px 0;padding:10px;border:1px solid #d8e6df;border-radius:9px"><summary><strong>${i+1}. ${q}</strong></summary><p>${answer}</p></details>`).join('')}</div></details>
 <p style="font-size:.83rem">ID de origem: <code>${a.id}</code>. Conteúdo editável no código, sem substituir capítulos anteriores.</p></section>`;
}
