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

const ARREND = [
  P("O CPC 06 (R2) estabelece princípios para reconhecer, mensurar, apresentar e divulgar arrendamentos."),
  F(["https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_06_R2_rev_18.pdf"]),
  P("No Brasil, o CPC 06 (R2) corresponde à IFRS 16."),
  F(["https://conteudo.cvm.gov.br/export/sites/cvm/legislacao/resolucoes/anexos/001/resol095.pdf"]),
  P("Para o arrendador, o arrendamento é operacional quando não transfere substancialmente todos os riscos e benefícios do ativo subjacente."),
  F(["https://www.pwc.com.br/pt/publicacoes/setores-atividade/financeiro/folder_adocao-cpc-06.pdf"]),
  P("Ponto a conferir: os lançamentos do arrendatário (direito de uso e passivo de arrendamento) não foram conferidos no texto integral."),
];
const EVENTOS = [
  P("Evento subsequente é o evento, favorável ou desfavorável, que ocorre entre a data final do período e a data em que as demonstrações são autorizadas para emissão."),
  F(["https://www.normasbrasil.com.br/norma/pronunciamento-24-2009_306248.html"]),
  P("Se o evento evidencia condição que já existia na data final do período, as demonstrações são ajustadas."),
  F(["https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_24_rev_12.pdf"]),
  P("Se o evento não evidencia condição já existente, ele não gera ajuste; a entidade divulga."),
  F(["https://conteudo.cvm.gov.br/export/sites/cvm/legislacao/resolucoes/anexos/100/resol105.pdf"]),
  P("Se os eventos indicarem que a continuidade não é apropriada, as demonstrações não podem ser elaboradas nesse pressuposto."),
  F(["https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_24_rev_12.pdf"]),
];
const ESTOQUES = [
  P("Os estoques são mensurados pelo menor valor entre o custo e o valor realizável líquido."),
  F(["https://edisciplinas.usp.br/pluginfile.php/5383386/mod_resource/content/1/CPC%2016%20Estoques.pdf"]),
  P("Valor realizável líquido é a quantia líquida que a entidade espera realizar com a venda no curso normal dos negócios."),
  F(["https://www.legisweb.com.br/legislacao/?id=431750"]),
  P("A redução ao valor realizável líquido é despesa do período em que ocorre; a reversão é permitida até o limite da redução inicial."),
  F(["https://blog.grancursosonline.com.br/?p=79792645"]),
  P("Nota de conflito: uma fonte de concursos diz que o CPC 16 não trata do critério UEPS. O texto oficial tem uma seção de critérios de valoração (itens 23 a 27). Conferir esses itens antes de usar em prova."),
  F(["https://www.estrategiaconcursos.com.br/blog/resumo-cpc-16-estoques-veja-os-principais-pontos-deste-pronunciamento/amp/"]),
];
const PARTES = [
  P("O CPC 05 (R1) trata de divulgação sobre partes relacionadas. Não define como mensurar o preço das operações."),
  F(["https://grupocpcon.com/artigos/cpc-05-partes-relacionadas"]),
  P("Consideram-se partes relacionadas quem tem controle pleno ou compartilhado da entidade, quem tem influência significativa sobre ela e o pessoal-chave da administração."),
  F(["https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_05_R1_rev06_Consolidado.pdf"]),
];
const BENEFICIOS = [
  P("Benefícios a empregados são todas as formas de compensação dadas em troca de serviços prestados."),
  F(["https://edisciplinas.usp.br/mod/resource/view.php?id=3262723"]),
  P("Benefícios de curto prazo incluem ordenados, salários e contribuições à seguridade social."),
  F(["https://edisciplinas.usp.br/mod/resource/view.php?id=3262723"]),
  P("Benefícios de longo prazo são todos os que não são de curto prazo, pós-emprego nem rescisórios."),
  F(["https://www.portaldecontabilidade.com.br/legislacao/CPC_33_(R1).pdf"]),
  P("Benefícios rescisórios são uma categoria própria, ao lado de curto prazo, pós-emprego e longo prazo."),
  F(["https://okai.com.br/documento/2cd4acb9-f74a-440c-a970-20e50619b329"]),
  P("Ponto a conferir: as regras de verbas rescisórias não foram conferidas no texto integral do CPC 33 (R1)."),
];
const DISPONIBILIDADES = [
  P("As disponibilidades compreendem caixa e equivalentes de caixa, e no balanço ficam no início do ativo circulante."),
  F(["https://contabilidade.com/blog/glossario-caixa/", "https://okai.com.br/api/artefatos/9bef9e0d-dcbb-4d3d-bb2e-afe0d0ade320/ativos-versoes/9bc4a464-fc50-4c55-a20c-b565c6d1a165"]),
  P("Equivalentes de caixa servem para atender a compromissos de caixa de curto prazo."),
  F(["https://okai.com.br/artigo/disponibilidades-caixa-e-equivalentes-de-caixa"]),
  P("Investimentos em instrumentos patrimoniais (ações e cotas de fundos) não entram em equivalentes de caixa, salvo hipóteses específicas."),
  F(["https://okai.com.br/artigo/disponibilidades-caixa-e-equivalentes-de-caixa", "https://www.legisweb.com.br/legislacao/?id=112540"]),
  P("Saldos bancários a descoberto, quando oscilam entre devedor e credor, entram em caixa e equivalentes."),
  F(["https://www.legisweb.com.br/legislacao/?id=112540"]),
  P("Ponto a conferir: o prazo de até três meses para equivalentes aparece em comentários de questões, não no texto do CPC 03 (R2)."),
  F(["https://conteudo.cvm.gov.br/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_03_R2_rev_10.pdf"]),
];
const FORNECEDORES = [
  P("Fornecedores são obrigações decorrentes de compras a prazo de mercadorias, insumos ou serviços."),
  F(["https://contabilidade.com/blog/passivo/"]),
  P("Na compra a prazo, a contrapartida é o estoque (ou despesa, se não houver estoque) e o crédito vai para fornecedores."),
  F(["https://okai.com.br/artigo/compra-de-mercadorias-a-prazo"]),
  P("O pagamento baixa a obrigação e sai do caixa ou do banco."),
  F(["https://okai.com.br/artigo/compra-de-mercadorias-a-prazo"]),
  P("Fornecedores entram no circulante quando vencem em até 12 meses e no não circulante quando vencem depois."),
  F(["https://jornalcontabil.com.br/noticia/glossario-aplicado-de-contabilidade-obrigacoes-financeiras-passivas-das-empresas/amp/"]),
  P("Conflito de classificação: contas a pagar é o grupo residual de obrigações exigíveis que não se encaixam em fornecedores nem nos demais grupos. Não confundir os dois."),
  F(["https://www.contabeis.com.br/forum/contabilidade/410483/fornecedores-ou-contas-a-pagar/"]),
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
  "conta-f-02": ARREND,
  "conta-f-06": EVENTOS,
  "conta-f-05": ESTOQUES,
  "conta-f-03": PARTES,
  "conta-c-07": BENEFICIOS,
  "conta-b-01": DISPONIBILIDADES,
  "conta-c-01": FORNECEDORES,
};
