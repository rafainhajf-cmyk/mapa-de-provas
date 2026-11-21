// Teoria da matéria por assunto, transcrita do rascunho aprovado (docs/contabilidade/rascunho-teoria-18.md).
// Cada item traz a fonte citada no rascunho; notas de conflito ficam visíveis no texto.
const P = (text) => ({ type: 'paragraph', style: 'NORMAL_TEXT', text });
const F = (urls) => P('Fonte: ' + urls.join(' ; '));

const CPC47 = 'https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_47_Rev_14.pdf';
const CPC47_SENIOR = 'https://documentacao.senior.com.br/gestaoempresarialerp/5.10.3/manual-processos/definicoes-gerais/financas/gestao-orcamentaria-e-projetos/reconhecimento-de-receita-de-contrato-com-clientes-cpc-47.htm';
const CPC47_CONTABEIS = 'https://www.contabeis.com.br/artigos/76062/alerta-ao-setor-de-loteamento-e-o-cpc-47/';
const CPC01_SLIDES = 'https://edisciplinas.usp.br/pluginfile.php/7666162/mod_resource/content/1/slides_cpc01_.pdf';
const CPC01_ESTRATEGIA = 'https://www.estrategiaconcursos.com.br/blog/teste-impairment/amp/';
const CPC01_CVM = 'https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_01_R1_rev_12.pdf';
const CPC04_CONTABEIS = 'https://www.contabeis.com.br/artigos/6379/parecer-tecnico-da-apropriacao-e-contabilizacao-do-ativo-intangivel/';
const CPC04_CAPITAL = 'https://capitalaberto.com.br/?p=2722';
const CPC04_CVM = 'https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_04_R1_rev_14.pdf';
const CPC08_CVM = 'https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_08_R1_Consolidado.pdf';
const CPC08_LEGISWEB = 'https://www.legisweb.com.br/legislacao/?id=65615';
const DUP_FORUM_14556 = 'https://www.contabeis.com.br/forum/contabilidade/14556/duvidas/';
const DUP_CFC_4159 = 'https://cfc.org.br/?p=4159';
const DUP_CFC_FAQ = 'https://cfc.org.br/vice-presidencia/tecnica/perguntas-frequentes/duplicatas-descontadas/';
const DUP_FORUM_112066 = 'https://www.contabeis.com.br/forum/contabilidade/112066/duplicatas-descontadas-e-titulos-descontados/';
const LEI_ART178 = 'https://www.legjur.com/legislacao/art/lei_00064041976-178';
const LEI_MODELO = 'https://modeloinicial.com.br/lei/L-6404-1976/balanco-patrimonial-grupo-contas-@____XV_III';
const ARLP_ADVBOX = 'https://advbox.com.br/blog/empresarial-lei-6404/';
const BP_JUS = 'https://jus.com.br/artigos/55333/balanco-patrimonial';
const BP_JORNAL = 'https://www.jornalcontabil.com.br/noticia/balanco-patrimonial-saiba-o-que-e-e-como-funciona/';
const CPC36_LEGISWEB = 'https://www.legisweb.com.br/legislacao/?id=431772';
const CPC36_CVM = 'https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_36_R3_rev_08.pdf';

const receita = [
  P('Cinco etapas: identificar o contrato; identificar as obrigações de desempenho; determinar o preço da transação; alocar o preço às obrigações; reconhecer a receita quando a obrigação for cumprida.'),
  F([CPC47, CPC47_SENIOR]),
  P('Pegadinha: a receita não é reconhecida quando o dinheiro é recebido nem quando o contrato é assinado; é quando o valor é transferido ao cliente.'),
  F([CPC47_CONTABEIS]),
];

const recuperavel = [
  P('Valor recuperável é o maior entre o valor justo líquido de despesas de venda e o valor em uso.'),
  F([CPC01_SLIDES]),
  P('A perda só é reconhecida se o valor contábil for superior ao valor recuperável.'),
  F([CPC01_ESTRATEGIA]),
  P('Teste no mínimo anual para ativos de vida útil indefinida, intangível não amortizado e ágio (goodwill).'),
  F([CPC01_CVM]),
];

const intangivel = [
  P('Ativo intangível é ativo identificável, sem substância física.'),
  F([CPC04_CONTABEIS]),
  P('Vida útil indefinida não é amortizada; vida útil definida é amortizada de forma sistemática.'),
  F([CPC04_CAPITAL]),
  P('Continua sujeito ao teste de recuperabilidade do CPC 01.'),
  F([CPC04_CAPITAL, CPC04_CVM]),
];

const emprestimos = [
  P('Os recursos captados são registrados pelo valor justo líquido dos custos de transação diretamente atribuíveis à emissão.'),
  F([CPC08_CVM]),
  P('Os encargos são apropriados ao resultado pelo custo amortizado, pelo método dos juros efetivos.'),
  F([CPC08_LEGISWEB]),
  P('Pegadinha: o encargo reflete o custo efetivo, não só a taxa contratual.'),
  F([CPC08_CVM]),
];

const debentures = [
  ...emprestimos,
  P('Prêmio na emissão de debêntures: já há o esquema contab-20 aprovado no site.'),
];

const duplicatas = [
  P('Na operação, a empresa continua responsável pelo título se o devedor não pagar.'),
  F([DUP_FORUM_14556]),
  P('O valor recebido é passivo (circulante ou não circulante), líquido dos encargos cobrados pelo banco.'),
  F([DUP_CFC_4159]),
  P('Encargos são despesa financeira, pelo prazo, com taxa efetiva.'),
  F([DUP_CFC_FAQ]),
  P('Nota de conflito: fontes antigas registravam a conta como redutora do ativo. Conferir a fonte oficial antes de aprovar.'),
  F([DUP_FORUM_112066]),
];

const lei6404 = [
  P('Ativo: circulante e não circulante; o não circulante inclui realizável a longo prazo, investimentos, imobilizado e intangível.'),
  F([LEI_ART178]),
  P('Passivo: circulante e não circulante.'),
  F([LEI_MODELO]),
];

const arlp = [
  P('São direitos realizáveis após o exercício seguinte.'),
  F([ARLP_ADVBOX]),
];

const balanco = [
  P('Contas dispostas em ordem decrescente de liquidez.'),
  F([BP_JUS]),
  P('Circulante: vencimentos até o exercício seguinte; não circulante: prazo maior.'),
  F([BP_JORNAL]),
];

const consolidadas = [
  P('A controladora que controla outras entidades apresenta demonstrações consolidadas.'),
  F([CPC36_LEGISWEB]),
  P('Receitas e despesas da controlada entram a partir da aquisição e até a perda do controle.'),
  F([CPC36_CVM]),
  P('Ponto a conferir: a fonte consultada foi o sumário; conferir o item 7 no texto oficial.'),
];

export const theoryDataByTopic = {
  'conta-a-06': receita,
  'conta-b-02': arlp,
  'conta-b-03': recuperavel,
  'conta-b-06': intangivel,
  'conta-c-02': emprestimos,
  'conta-c-03': duplicatas,
  'conta-c-04': debentures,
  'conta-d-08': lei6404,
  'conta-e-02': balanco,
  'conta-e-08': consolidadas,
};
