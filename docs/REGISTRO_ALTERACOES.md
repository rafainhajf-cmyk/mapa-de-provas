# Registro de alterações — ChatGPT e Claude

Entradas novas no topo. Formato: data — quem — o que mudou — arquivos — pendências.


## 2026-11-22 — Claude (Direito Tributário Normativo: cinco conferências individuais com fonte verificada)
- Registros conferidos: 3113680 (SV 52, texto no Volume 2 do material, p. 36), 2324328 (Temas 385, 437, 685 e 1140 no portal do STF), 3684862 (tese do RHC 163.334 no portal do STF), 1234918 (CTN, art. 97, V, no Planalto) e 3401182 (CTN, art. 118, I e II, no Planalto e no Volume 4, p. 9). Total: 251 registros.
- Não promovidos nesta etapa: 2231509 e 3764354 (sem fonte doutrinária, conforme a regra já registrada), e 609604, 677586, 3976056, 3822142 e 2163751, que ficam pendentes até confronto com fonte oficial. Ressalvas de cada registro estão em `temporalStatus`.
- Vínculos: os cinco IDs foram ligados aos esquemas existentes (lote-conceito, lote-imunidades, lote-sancoes-politicas, lote-fraude-fiscal). Nenhum esquema novo.
- Arquivos: `data-sources/tributario-normativo/reviewed-bindings.json`, `source-content/normativo-visuals.js`, `normativo.test.mjs` (contagem de 246 para 251).
- Testes: `npm run build` ok; `normativo.test.mjs` 15/15. Na suíte completa, as mesmas 4 falhas já existiam antes desta mudança (apostila: 81 seções; sync; sync-client; test.mjs).
- Pendências: 7 questões em conferência; o texto integral dos acórdãos não foi lido; a conferência visual do site após o deploy não foi feita; o stash `reviewed-bindings` (258 registros, com os 7 não promovidos) permanece como referência e não foi aplicado. `scripts/record-normativo-review.mjs` ainda contém as entradas não promovidas e não deve ser rodado sem revisão.

## 2026-11-22 — Claude (Apostila de Tributário: convênios de ICMS, o que só existe na LC 214 e o que só existe na EC 132, em relação à Lei Kandir)
- Seção 12 (novo): LC 24/1975, LC 160/2017 e LC 192/2022 comparadas por ato, quórum, efeito e condição, com o que cada uma regula e uma ordem de decisão para prova. Seção 13 (novo): o que só existe na LC 214 em relação à Lei Kandir (LC 87/1996). Seção 14 (novo): o que só existe na EC 132 em relação à Lei Kandir.
- Fontes: textos da pasta "Tributário e Reforma" no Drive (LC 24/160, LC 192, LC 87, EC 132, LC 214). Os artigos citados foram conferidos no texto arquivado; a jurisprudência e as questões de prova das anotações não foram usadas como fonte normativa.
- Arquivos: `source-content/apostila-data.json` (versão 2026-11-22).
- Testes: `npm run build` ok; `npm test` com as mesmas 4 falhas pré-existentes.
- Pendências: EC 137/2025 não está incluída na seção 14; conferir a visualização no site após o deploy.

## 2026-11-22 — Claude (Português: link do treino de questões no Dificuldades)
- Pedido do usuário: colocar o link do treino de Português na parte de Dificuldades por matéria. Ao selecionar Português, aparece o cartão "Treino de Português · 20 questões" acima dos materiais.
- Link: página privada do Claude (artefato), visível só ao dono da conta. Quem não for o dono não consegue abrir.
- Arquivos: `source-content/dificuldades.js`, `source-content/dificuldades.html` (import v=114).
- Testes: `npm test` com as mesmas 7 falhas já existentes antes da mudança; nenhuma nova.
- Pendente: conferir no site após o deploy.

## 2026-11-21 — Claude (Contabilidade: cartões repetidos mantidos, teste ajustado)
- Decisão do usuário: manter as três listas (mínima, roteiro e completo). Os cartões repetidos são cópias sincronizadas pelo mesmo `data-curated-id`.
- `accounting-exercises.test.mjs`: o teste passou a verificar a sincronização das cópias, em vez de IDs únicos. 7 de 7 aprovados.
- Pendências: nenhuma nesta mudança.

## 2026-11-21 — Claude (etapas 8 a 10: LTE no Tributário, conferência antes de publicar e painel por matéria)
- Etapa 8: Apostila de Tributário conferida como separada de Direito Tributário Normativo (dados, código e navegação). Achado: assuntos "LTE e Convênios" não apareciam na aba Tributário de Dificuldades, porque o grupo não estava na lista exibida. Corrigido em `source-content/dificuldades.js` (grupo exibido adicionado ao lado de Direito Tributário Normativo).
- Etapa 9: novo `scripts/check-cobertura.mjs` (`npm run check:cobertura`). Lê `study-knowledge.json`, mostra o painel por matéria (aprovados, rascunhos, blocos, ⚠ pendentes) e aponta erros de publicação (campos obrigatórios, id duplicado, mais de 100 blocos, sem blocos). Sem gravar arquivos.
- Etapa 10: a conferência antes de publicar é o mesmo script. Resultado atual: 0 erros; 159 avisos de aprovados sem flashcards e 37 registros com ⚠ pendente (Direito Administrativo, rascunhos admin-rasc).
- Arquivos: `source-content/dificuldades.js`, `scripts/check-cobertura.mjs`, `package.json`, `docs/REGISTRO_ALTERACOES.md`.
- Testes: `npm run build` ok; `npm test` com as mesmas 4 falhas pré-existentes.
- Pendente: a correção da aba LTE ainda não foi conferida no site (só depois de publicar). Branch `claude/etapas-8-10`, sem push e sem publicação. Etapas 4 a 7 e 11 a 13 dependem de material do usuário.

## 2026-11-21 — Claude (Administrativo: correção da questão 2235648 no esquema 23)
- A explicação da alternativa D dizia que a culpa no prejuízo ao erário seria admitida com dano comprovado. Reescrita: a Lei 14.230/2021 exige dolo para o ato do art. 10 e suprimiu a modalidade culposa (rascunho versão 3).
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Testes: `npm run build` ok; `npm test` com as mesmas 4 falhas pré-existentes.
- Pendente: 3975683 (alternativa E sem citar o artigo), por falta do enunciado completo; enunciados truncados e precedentes do esquema 23 a conferir no TEC e na jurisprudência.
- Publicado conforme autorização do usuário; conferir no site após o deploy.

## 2026-11-21 — Claude (Contabilidade: regras para 11 das 19 questões sem regra)
- Quatro regras novas (R10 a R15) na Teoria das questões de Contabilidade Básica, escritas a partir das explicações já registradas no repositório (`accounting-solutions-01.js`), para 11 questões: 2013231, 2064755, 3662027, 3662029, 2163640, 2771977, 3240910, 2775131, 3584435, 3883229 e 2231001.
- Ficam pendentes 8 questões sem explicação no repositório (2223559, 2949362, 3093142, 3114168, 3149114, 3154666, 3365979, 3975976). Os enunciados estão só no TEC, que pede login.
- Arquivos: `source-content/accounting-question-data.js`, `source-content/accounting-study.js` (import v=3), `source-content/dificuldades.js` (import v=114).

## 2026-11-21 — Claude (Contabilidade: teoria de mais 7 assuntos)
- Sete assuntos ganharam teoria da matéria, pesquisada de novo em fontes oficiais e secundárias citadas em cada ponto (rascunho em `docs/contabilidade/rascunho-teoria-7.md`): conta-f-02 (CPC 06 R2), conta-f-06 (CPC 24), conta-f-05 (CPC 16 R1), conta-f-03 (CPC 05 R1), conta-c-07 (CPC 33 R1), conta-b-01 (Disponibilidades), conta-c-01 (Fornecedores).
- Pendências visíveis no texto: lançamentos do arrendatário; conflito sobre UEPS no CPC 16; regras de verbas rescisórias; prazo de equivalentes de caixa; diferença entre fornecedores e contas a pagar.
- Arquivos: `source-content/accounting-theory-data.js`, `source-content/accounting-study.js` (import v=2), `source-content/dificuldades.js` (import v=113), `docs/contabilidade/rascunho-teoria-7.md`.
- Pendências: conferir os itens das pendências no texto oficial; regras da Teoria das questões para as 8 questões sem explicação no repositório (2223559, 2949362, 3093142, 3114168, 3149114, 3154666, 3365979, 3975976); 20 questões tributárias de LC 116.

## 2026-11-21 — Claude (Contabilidade: teoria da matéria para 10 assuntos)
- Dez assuntos de Contabilidade ganharam teoria da matéria, transcrita do rascunho aprovado (`docs/contabilidade/rascunho-teoria-18.md`), com a fonte citada em cada ponto: conta-a-06, conta-b-02, conta-b-03, conta-b-06, conta-c-02, conta-c-03, conta-c-04, conta-d-08, conta-e-02, conta-e-08.
- Quando o assunto não tem teoria própria, a página usa esse texto. Notas de conflito seguem visíveis (duplicatas descontadas; CPC 36 conferido só pelo sumário).
- Não publicados nesta entrega: Disponibilidades (conta-b-01) e Fornecedores (conta-c-01), sem pesquisa; CPC 06, 24, 16, 05 e 33 (conta-f-02, conta-f-03, conta-f-05, conta-f-06, conta-c-07), cujos textos não estão no rascunho aprovado e precisam de nova pesquisa.
- Arquivos: `source-content/accounting-theory-data.js`, `source-content/accounting-study.js`, `source-content/dificuldades.js` (import v=112).
- Pendências: teoria de Disponibilidades e Fornecedores; teoria dos 5 assuntos acima; regras da Teoria das questões para as 19 questões sem regra; 20 questões tributárias de LC 116.

## 2026-11-21 — Claude (Contabilidade: 19 questões de Contabilidade Geral ligadas ao assunto)
- 601 questões do inventário de Contabilidade estão ligadas a um assunto (eram 582). As 19 novas estão em Contabilidade Básica (`conta-a-01`) e aparecem na coluna de exercícios.
- Essas 19 ainda não têm regra aprovada na Teoria das questões; a seção mostra a lista delas com essa observação, sem regra inventada.
- Ficaram de fora 20 questões de Legislação Tributária (LC 116), que seguem pendentes como já registrado para Tributário.
- Arquivos: `source-content/accounting-question-data.js`, `source-content/accounting-study.js`, `source-content/dificuldades.js`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: regras da Teoria das questões para as 19; teoria da matéria para os 18 assuntos sem texto; 20 questões tributárias de LC 116.
## 2026-11-21 — Claude (Administrativo: revisão do esquema 30, início)
- Revisadas as 35 questões do esquema 30 contra enunciado e explicações. Corrigida a questão 3259100: a explicação agora diz que capacidade financeira, gerencial e técnica é da governança, não da governabilidade (rascunho versão 3).
- Pendente (enunciado truncado, conferir no TEC): 3872457, 2639432, 1071484, 3271428, 3800185, 3023452, 3357984, 3366772, 3441978, 758732, 3259100 (texto "Certo" colado no enunciado). Divergência de gabarito mantida: 3289707.
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Testes: `npm run build` ok; `npm test` com as mesmas 4 falhas pré-existentes.
- Não publicado: branch `claude/revisao-esquema-30`, aguardando autorização.

## 2026-11-21 — Claude (Administrativo: assuntos próprios para os esquemas e rascunhos)
- Direito Administrativo ganhou um assunto por esquema aprovado (34 assuntos, com o título do esquema). Esquemas e rascunhos passam a aparecer dentro do assunto correspondente, e não mais só no painel do índice.
- `scripts/build.mjs` gera o catálogo `Direito Administrativo` a partir de `source-content/study-knowledge.json`; `source-content/dificuldades.js` inclui a matéria na lista de catálogos (sem repetir área).
- Arquivos: `scripts/build.mjs`, `source-content/dificuldades.js`, `docs/REGISTRO_ALTERACOES.md`.
- Testes: `npm run build` ok; `npm test` com as mesmas 5 falhas pré-existentes (30 pass).
- Publicado: merge `5553940` no `main`, deploy `dpl_EJvdj54dYib8B6bze81xArqd5Gjk` READY. Conferido no site: os 34 assuntos aparecem na lista de Direito Administrativo; cada um abre com o esquema e o rascunho dentro (71 blocos, todos no assunto de mesmo título). O painel do índice deixou de repetir esses blocos.
- Pendências: o assunto não tem arquivos do Drive; a leitura vem só dos esquemas. Testes após o merge: 31 pass, 4 fail (no `main` antes da mudança eram 27 pass, 8 fail; as 4 restantes já falhavam).

## 2026-11-21 — Claude (Custos: nova matéria em Dificuldades por matéria)
- Matéria "Custos" criada em `source-content/difficulty-data.json` com 8 estudos: custos de produção (CPP, CPA, CPV), absorção × variável, margem de contribuição, ponto de equilíbrio, GAO, métodos de custeio e unidades de medida, proporcionalidade e taxa-padrão.
- Conteúdo extraído dos 8 PDFs enviados. Fórmulas e quadros seguem as anotações; não conferidos contra fonte oficial.
- Pendente: "Métodos de custeio e unidades de medida" tem só os nomes; falta a definição de cada um.
- Não publicado: commit local, aguardando autorização para push.

## 2026-11-21 — Claude (Contabilidade: teoria, exercícios TEC para checar e teoria das questões por assunto)
- Em cada assunto de "Dificuldades por matéria", a teoria da matéria fica à esquerda e a coluna "Exercícios TEC para checar" à direita, com Feito e Resultado (acertei/errei) ligados ao mesmo progresso da página de exercícios.
- A "Teoria das questões" passou a usar as regras aprovadas em `contabilidade-teoria-questoes/*.json` (39 assuntos, 582 questões TEC); antes ficava vazia.
- Arquivos: `source-content/accounting-study.js`, `source-content/accounting-study.css`, `source-content/accounting-question-data.js` (novo, gerado a partir do JSON), `source-content/dificuldades.js`, `source-content/dificuldades.html`, `docs/REGISTRO_ALTERACOES.md`.
- Testes: as mesmas 5 falhas de antes da mudança; `npm run build` concluído.
- Pendências: conferência visual no site não feita (a extensão do navegador falhou ao capturar a tela); branch `claude/contabilidade-teoria-exercicios` não mesclada no `main` até essa conferência.
## 2026-11-21 — Claude (Administrativo: rascunhos das questões publicados nos esquemas)
- Publicados como `approved` os rascunhos por questão de Direito Administrativo (esquemas 01 a 33; 434 questões, com o 3562950 dentro do bloco do 3561311). Esquema 34 não entra: os dois IDs não são de Direito Administrativo (3975639 é Constituição de Goiás, excluída pelo usuário).
- Cada esquema aparece no índice da matéria, em "Esquemas incrementais aprovados", como registros de tipo "rascunho" (37 partes, pois cada registro tem até 99 blocos). Título: "Explicações por alternativa — Esquema NN (não conferido)".
- Não ligados às questões do Dificuldades. Os trechos com ⚠ estão marcados como "Conferir" e não foram conferidos no TEC nem na lei.
- Divergências conhecidas com o gabarito do PDF: 3289707 (teoria da agência) e os demais da lista da planilha. Esquemas 29 a 33 tratam de temas que podem não ser de Direito Administrativo.
- Testes: `npm test` com as mesmas 5 falhas pré-existentes. `npm run build` concluído.
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferência dos ⚠ no TEC e na lei; atualizar a aba "Conteúdos estruturados" da planilha com as linhas dos rascunhos (ainda não feito); decidir se os esquemas 29 a 33 ficam no Administrativo.

## 2026-11-21 — Claude (Administrativo: prescrição do admin-24 conferida e republicada)
- admin-24: conferida a prescrição da improbidade no art. 23 da Lei 8.429/1992 (8 anos; prescrição intercorrente de 4 anos no § 5º). Aviso de pendência trocado por nota de conferência. Versão 2.
- Testes: `npm test` com as mesmas 5 falhas pré-existentes. `npm run build` concluído.
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferência dos demais artigos citados nos esquemas; coluna "Comparativo necessário" da aba Esquemas; conferência visual dos demais cards.

## 2026-11-21 — Claude (Administrativo: 34 esquemas publicados no Mapa)
- Publicados como `approved` os 34 esquemas de Direito Administrativo (admin-01 a admin-34), importados da aba "Conteúdos estruturados" com `scripts/import-study-knowledge.mjs` (34 IDs aprovados; 123 registros preservados).
- admin-34: removido o trecho de Constituição de Goiás; ID renomeado para `admin-34-adm-questoes-pontuais-eventos`. Conteúdo restrito à definição de congresso.
- Conferido na web: PPP com valor mínimo de R$ 10 milhões (art. 2º, § 4º, I, Lei 11.079); sanções do art. 12 da Lei 8.429 após a Lei 14.230/2021 (14, 12 e 4 anos); habilitação antecipada no art. 17, § 1º, da Lei 14.133 (ato motivado e previsão no edital).
- Testes: `npm test` com as mesmas 5 falhas do commit anterior (pacotes `@vercel/blob` e `iron-session` ausentes; duas asserções antigas de contagem e versão). Nenhuma falha nova. `npm run build` concluído.
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferência dos demais artigos citados (Lei 14.133, Lei 13.303, Lei 12.846, Lei 12.527, LGPD, CC e outros); prescrição da improbidade (admin-24); coluna "Comparativo necessário" da aba Esquemas; conferência visual no site após o deploy.

## 2026-11-21 — Claude (Apostila de Tributário: datas de conferência removidas)
- Removidas duas datas de conferência ("24/10/2026") da seção 11.5 e da lista de fontes da seção 9, por não terem comprovação nesta sessão.
- O § 3º do art. 3º da LC 214, citado como acrescido pela LC 227/2026, foi confirmado na Câmara.
- Não confirmado: art. 31-A da Kandir (redução de ICMS de 10% a 40% em 2029 a 2032), citado em vários pontos. Conferir o texto consolidado antes de publicar.
- Arquivos: `source-content/apostila-data.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: art. 31-A da Kandir; PEC 22/2026 (seção 3.8); separador do trecho STJ/REsp (seção 9); RCM e frete (lição de mercadorias).

## 2026-11-20 — Claude (Apostila de Tributário: conferência final da 3.7, 3.8 e pendências)
- Conferido na web: seção 3.7 (LC 232/2026, Copa Feminina 2027: isenção de ISS concedida pelos Municípios e DF, limitada às pessoas jurídicas com incentivo federal, prazo ligado ao incentivo da União); seção 3.8 (ADCT, art. 126, III, "a": alíquota do IPI zero a partir de 2027, ressalva da ZFM).
- Pendente de atenção: PEC 22/2026 propõe nova redação ao art. 126 do ADCT; conferir o andamento antes de publicar a 3.8.
- Não localizado na busca: art. 31-A da Lei Kandir (a busca retornou outras leis); art. 3º, § 3º, da LC 214 (a busca não trouxe o texto). Ambos seguem sem conferência.
- Observação: a data "texto oficial conferido em 24/10/2026", na seção 11.5, não tem comprovação nesta sessão; conferir ou remover.
- Arquivos: `docs/REGISTRO_ALTERACOES.md`.
- Não publicado: commit local, aguardando autorização para push.
- Pendências: art. 31-A da Kandir; art. 3º, § 3º, da LC 214; seção 3.7 (texto da lei a ser conferido em detalhe); seção 11.5 (data de conferência); RCM e frete na lição de mercadorias.

## 2026-11-20 — Claude (Apostila de Tributário: lotes A a G, verificação final)
- Revisão da apostila de Tributário em sete lotes: A (2.1, 2.2, 2.6 a 2.8), B (2.9 a 2.11), C (2.13, 3.1, 3.3, 3.4), D (3.5 a 3.8), E (4.1 a 4.4), F (5, 6.1 a 6.9), G (7, 8, 9 e URLs da seção 9, 11.1 a 11.9).
- Resumos "Antes, Agora, Não confundir, Cuidado com o antigo" acrescentados aos pontos do foco. Textos existentes mantidos.
- Correções: detalhe inventado removido da 6.3; URLs com espaços da seção 9 corrigidas; referência STJ/REsp da seção 9 separada em texto (separador inferido, conferir).
- Conferidos por busca na web: LC 160/2017, arts. 108 e 109 da LC 214, arts. 67 e 76 da LC 214, art. 2º da LC 192 (via LC 227), EC 137/2025, LC 227 (IS na base do ICMS).
- Verificação final: JSON de apostila-data.json válido; árvore de trabalho sem alterações pendentes.
- Arquivos: `source-content/apostila-data.json`, `docs/REGISTRO_ALTERACOES.md`.
- Não publicado: commits locais (lotes A a G), aguardando autorização para push.
- Pendências: conferir na lei seção 3.7 (LC 232/2026 e Copa 2027), 3.8 (ADCT art. 126, III, ressalva ZFM), art. 31-A da Kandir, art. 3º § 3º da LC 214, art. 170 e demais citações dos resumos; conferir o separador do trecho STJ/REsp da seção 9; RCM e frete na lição de mercadorias (sem definição do usuário).

## 2026-11-20 — Claude (Apostila de Tributário: convênios conferidos na LC 160/2017)
- Resumo de convênios ICMS atualizado com o texto da LC 160/2017 (arts. 1º e 2º, quórum da convalidação, benefícios novos com unanimidade, redução de 20% ao ano a partir do 12º ano e revogação pela LC 214/2025, art. 543, com efeitos em 2033).
- Conferência feita por busca na web (Câmara e Planalto). Anexos enviados não contêm as leis tributárias do foco; ver lista de pendências.
- Arquivos: `source-content/apostila-data.json`.
- Não publicado: commit local, aguardando autorização para push.
- Pendências: LC 192/2022 (art. 2º), LC 214 arts. 108 e 109 e revogação do art. 543 ainda não conferidos no texto oficial; os PDFs de origem da apostila não estão anexados.

## 2026-11-20 — Claude (Apostila de Tributário: antes, agora, não confundir — lote 2)
- Resumo "Antes, Agora, Não confundir, Cuidado com o antigo" acrescentado a: seção 11 (contribuinte e responsável), convênios ICMS (LC 24/1975 e LC 160/2017), 2.12 (benefícios e combustíveis) e 3.2 (LC 192/2022).
- Arquivos: `source-content/apostila-data.json`.
- Não publicado: commit local, aguardando autorização para push.
- Pendências: conferir nas fontes oficiais os textos sobre LC 160/2017 (convalidação e revogação) e LC 192/2022; depois, lote das demais seções do foco.

## 2026-11-20 — Claude (Apostila de Tributário: antes, agora, não confundir — lote 1)
- Seções 2.3, 2.4 e 2.5 (crédito na aquisição, nota fiscal e local da operação) ganharam o resumo "Antes, Agora, Não confundir, Cuidado com o antigo" no início. O texto existente foi mantido.
- Arquivos: `source-content/apostila-data.json`.
- Não publicado: commit local, aguardando autorização para push.
- Pendências: aplicar o mesmo formato à seção 11 (contribuinte e responsável), às leis de convênios (LC 24/1975 e LC 160/2017), à LC 192/2022 e às demais seções do foco. Conferir o art. 108 e 109 da LC 214 nas fontes oficiais antes de publicar.

## 2026-11-20 — Claude (Tributário: Dificuldades por matéria só com direito normativo)
- Na aba Dificuldades por matéria, a matéria Tributário passa a mostrar apenas o grupo "Direito Tributário Normativo" (apostilas DT do Literalidade, principalmente o CTN). Os grupos IPVA, ITCMD, ITBI, ISSQN, Reforma, LC 227, RMIT, Comparativo e LTE e Convênios saem dessa aba.
- Arquivos: `source-content/dificuldades.js`.
- Não publicado: commit local, aguardando autorização para push.
- Pendências: revisar a apostila de Tributário com foco em não confundir (Kandir, reforma, LC 236, LC 227, EC 132, LC 214, LC 24/1975, LC 160/2017, LC 192/2022).

## 2026-11-20 — Claude (Contabilidade: teoria, lote 3 — LC 116, CPC 02, CPC 46, goodwill e outros)
- Onze lições novas em `accounting-curated.js`: LC 116 (fato gerador, sujeito passivo e local, alíquota e base), CPC 02 (conversão), CPC 46 (valor justo), goodwill, IRPJ e CSLL, partidas dobradas, plano de contas, conceito e objeto, e princípios contábeis.
- Não coberto nesta rodada: "Operações com Mercadorias (RCM, frete)", porque não tenho a definição de RCM como termo da prova. Preciso que você diga o que é RCM antes de eu escrever essa lição.
- Lições escritas sem conferência das fontes oficiais: LC 116 (artigos citados), CPC 46 e tributos sobre o lucro (valores e faixas).
- Não publicado: commit local, aguardando autorização para push.

## 2026-11-20 — Claude (Contabilidade: teoria, lote 2 — passivos, PL, CPC 12 e consolidação)
- Onze lições novas em `accounting-curated.js`: empréstimos e fornecedores, duplicatas, PCLD, receitas e despesas antecipadas, folha (CPC 33), capital social, reservas de capital, ajuste de avaliação patrimonial, reserva de reavaliação, CPC 12 e CPC 36.
- Cobre lacunas de passivos (empréstimos 17, duplicatas 3, PCLD 2, antecipadas 2, folha 2), PL (capital 5, reservas de capital 1, AVP 1, reavaliação 1), CPC 12 (18) e CPC 36 (4).
- Não publicado: commit local, aguardando autorização para push.
- Pendências: lotes seguintes (LC 116, goodwill complementar, mercadorias com RCM e frete, CPC 46, IRPJ e CSLL, conversão do CPC 02 e demais lacunas).

## 2026-11-20 — Claude (Contabilidade: teoria, lote 1 — demonstrações)
- Sete lições novas em `accounting-curated.js`: DRE em cascata, destinação do lucro, balanço patrimonial, DRA, DLPA, CPC 26 (conjunto completo) e notas explicativas.
- Cobre lacunas de DRE e destinação (24 questões), balanço (18), DRA (12), DLPA (1), CPC 26 (9) e notas (4).
- Não publicado: commit local, aguardando autorização para push.
- Pendências: lotes seguintes (passivos, PL, CPC 12, consolidação, LC 116 e demais lacunas).

## 2026-11-20 — Claude (Contabilidade: roteiro com Feito/Resultado e filtro por prova)
- Roteiro enxuto: cada linha ganhou "Feito" e "Resultado" (Acertei/Errei) para a questão principal e para o complemento, como na Lista mínima. Marcar em um lugar atualiza o cartão correspondente na página de exercícios.
- Página de exercícios: novo filtro "Prova" (226 provas, mapeamento de 621 questões em `accounting-exam-map.js`). Ao escolher uma prova, mostra "nesta prova: X de Y feitas".
- Teoria ainda não ampliada: cobertura dos 621 exercícios depende de confirmar escopo (LC 116).
- Arquivos: `source-content/accounting-curated.js`, `source-content/accounting-exercises-page.js`, `source-content/contabilidade-exercicios.html`, `source-content/accounting-exam-map.js` (novo).
- Pendências: testar no navegador depois do deploy (marcação duplicada roteiro/cartão e contagem por prova); decidir se LC 116 entra na teoria.

## 2026-11-20 — Claude (Contabilidade: explicações das 70 questões TEC, etapa 2)
- Acrescentada explicação curta para cada uma das 70 questões de referência, dentro de "Revelar gabarito do caderno". Texto marcado como escrito por Claude, não pelo professor.
- Cálculos refeitos por Claude; a maioria bate com o gabarito do caderno.
- Pendências de conferência por ID: 3567083 e 3567073 estão sem as tabelas de balanço no texto (não recalculadas). 3683447: item I parece correto, em divergência com o gabarito B. 3257507 e 3816106: gabarito duvidoso. 3231477: enunciado incompleto. Confiança média em 3401258, 2395571, 1790371, 3228153, 3381834, 3228140 e 2792283 (premissas fiscais ou de classificação).
- Arquivos: `source-content/accounting-tec-explicacoes.js` (novo), `source-content/accounting-tec-refs.js` (importa explicações e mostra no cartão).
- Etapa 3 feita: 70 linhas incluídas na aba Questões da planilha (A604:Q673), status `draft`, observação "(Claude)" com gabarito e data. Assuntos cortados em 60 caracteres na origem (28 casos), mantidos como estão para bater com o site.

## 2026-11-20 — Claude (Contabilidade: teoria CPC 47 e 70 questões TEC nas três seções)
- Acrescentada lição "CPC 47 — receita de contrato com cliente" na Teoria das questões, escrita em linguagem própria (único assunto da lista sem lição).
- As 70 questões TEC de referência passaram a aparecer como links (#ID) nas três seções: Lista mínima, Roteiro enxuto e Teoria das questões.
- Unificadas as versões dos módulos (`accounting-tec-refs.js?v=2`, `accounting-curated.js?v=8`, `accounting-exercises-page.js?v=5`).
- Arquivos: `source-content/accounting-curated.js`, `source-content/accounting-tec-refs.js` (função `tecRefsLinksHTML`), `source-content/accounting-exercises-page.js`, `source-content/contabilidade-exercicios.html`.
- Pendências: etapa 2 (explicações curtas para as 70, em lotes, marcadas como de Claude); etapa 3 (conferência no site e linhas na aba Questões da planilha, ainda não feitas).

## 2026-11-20 — Claude (Contabilidade: resultado por questão TEC na página de exercícios)
- Usuário pediu marcar, em cada exercício TEC de Contabilidade, se fez a questão e se acertou. Acrescentado o campo "Resultado: Acertei / Errei" ao lado de "Feito", com contador de respondidas e acertos no topo.
- O clique em "Ver origem no TEC" continua abrindo a questão no TEC (escolha do usuário). Não foi incluído PDF do caderno.
- Marcações guardadas só neste navegador (`localStorage`, chave `mapa-contab-results-v1`), como o checkbox "Feito".
- Arquivos: `source-content/accounting-curated.js` (import v=7 em `accounting-exercises-page.js`), `source-content/accounting-exercises-page.js`, `source-content/contabilidade-exercicios.html` (script v=3).
- Conferência dos gabaritos de 3 questões divergentes (Q63 ID 3601421 = D; Q64 ID 2792283 = B; Q85 ID 3816434 = A) pelos comentários do TEC: o gabarito do caderno confere nas três.
- Pendências: marcações não sincronizam entre aparelhos.

## 2026-11-20 — Claude (Auditoria: quatro esquemas novos e complemento do risco)
- Usuário aprovou a proposta do consolidado de Auditoria (conteúdos 001 a 010). Publicados `aud-08` (testes de controle × detalhes), `aud-09` (AUM), `aud-10` (tamanho da amostra, materialidade e TIED) e `aud-11` (eventos subsequentes X/Y/Z), versão 1.
- `aud-07` (riscos de auditoria) recebeu o complemento de risco de amostragem × não amostragem e a memória; versão 2. A tabela de riscos já publicada foi mantida.
- Bloco 06 (revisão relâmpago) não foi publicado como esquema.
- Conferência legal não concluída: NBC TA 530 (5, A1, A18 a A22), NBC TA 560 (5(e), 6, 10, 14 a 17), NBC TA 320 (materialidade). Pendência registrada no campo `source` de cada esquema.
- Planilha: não alterada nesta etapa; os quatro novos ainda não têm linha em "Conteúdos estruturados".
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.

## 2026-11-20 — Claude (fórmulas: descontos reorganizados no quadro de comparação)
- Quadro "Descontos — por dentro × por fora": bases separadas (racional, taxa i, base A; comercial, taxa d, base N), aviso para não misturar i e d, exemplo com N = 1.100 (por dentro: A = 1.000 e D = 100; por fora: D = 110 e A = 990) e a relação D_c = D_r · (1 + i · n) com a condição d = i.
- Símbolo "D𝚌" trocado por "Dc" nos textos (4 ocorrências).
- Conferido: 1.100 / 1,10 = 1.000; 1.100 · 0,10 · 1 = 110; 110 / 100 = 1,1 = 1 + 0,10 · 1.
- Arquivos: `source-content/formulas.js` (v=99 em `formulas.html`), `source-content/formula-data.json`.
- Pendências: nenhuma.

## 2026-11-20 — Claude (fórmulas: bloco de capitalização contínua reorganizado)
- Bloco "Capitalização contínua" da comparação de fórmulas: título, variáveis em linha própria, colunas renomeadas para "Efetiva → instantânea" e "Instantânea → efetiva", exemplo (10% ⇒ δ ≈ 9,531% ⇒ 10%) e alerta de que δ não é taxa efetiva.
- Conferido: ln(1,10) ≈ 0,09531 e e^0,09531 − 1 ≈ 0,10.
- Arquivos: `source-content/formulas.js`, `source-content/formulas.html` (formulas.js v=97).
- Pendências: nenhuma.

## 2026-11-20 — Claude (site mais leve: JSONs de leitura com cache do navegador)
- Medição: `data.json` tinha 11 MB sem compressão (1,5 MB comprimido), quase tudo banco de questões, e era baixado inteiro a cada abertura da página principal. `difficulty-data.json` (1,4 MB) era baixado de novo pela busca global.
- Causa: as leituras usavam `cache: 'no-store'`, que proíbe o navegador de guardar qualquer cópia.
- Mudança: removido `cache: 'no-store'` nas leituras de `data.json`, `difficulty-data.json`, `study-knowledge.json`, `formula-data.json` e `apostila-data.json`. O navegador agora guarda a cópia e só revalida com o servidor (resposta 304 quando nada mudou). A API de sincronização continua sem cache.
- Versões de script atualizadas: `app.v44.js` (v=95), `dificuldades.js` (v=110), `study-global-search.js` (v=95), `formulas.js` (v=96), `study-knowledge-ui.js` (v=4), `apostila.js` (v=110).
- Causa real: o site passa por `api/gateway.mjs`, que enviava `no-store` também para arquivos estáticos. Mudança: arquivos estáticos autorizados recebem `private, max-age=0, must-revalidate` e `ETag`; o navegador guarda a cópia e revalida (304 sem corpo quando nada mudou). Páginas HTML continuam sem cache, porque levam o token de sessão. Login é verificado a cada pedido.
- Teste automático do gateway (`test.mjs`) não pôde rodar aqui, porque as dependências (`iron-session`) não estão instaladas e o npm está bloqueado. Conferido no navegador após o deploy.
- Não mexido: o banco de questões (9,3 MB dentro de `data.json`) continua em um único arquivo. Separar por matéria seria a próxima melhoria, mas exige refatorar `app.v44.js`.
- Arquivos não usados por nenhuma página (`app.js`, `app.v33.js`, `app.v36.js`) continuam publicados. Podem ser removidos em outra mudança.
- Pendências: medir no navegador depois do deploy (tamanho transferido da segunda abertura).

## 2026-11-20 — Claude (sumários de oito matérias cadastrados)
- Usuário enviou o arquivo "Sumários das 8 matérias". Cadastrados em `subjectCatalogs` de `difficulty-data.json` os sumários de Direito Administrativo (5 assuntos), Direito Civil e Processual Civil (4; Processo Civil pendente de indexação), Direito Empresarial (3) e Tributário (5, com subitens em Direito Tributário).
- Penal e Processual Penal, Estatística, Português e Raciocínio Lógico: estrutura sugerida no arquivo, confirmada pelo usuário em 2026-11-20 e cadastrada no mesmo commit.
- Os assuntos não têm vínculo com as pastas de material; aparecem como lista, sem link para arquivos.
- Arquivos: `source-content/difficulty-data.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: indexar Processo Civil; vincular os assuntos aos materiais quando houver.

## 2026-11-20 — Claude (Direito Civil publicado: 4 comparativos aprovados pelo usuário)
- Usuário autorizou publicar os 4 conteúdos de Direito Civil do arquivo consolidado (`civ-01` a `civ-04`) "como estão". Importados em `study-knowledge.json` com status approved e versão 1. Sem registro existente alterado.
- Conferência legal não concluída: item 1 (art. 189 e 207–211 CC; imprescritibilidade das declaratórias e das constitutivas sem prazo é posição doutrinária); item 2 (prazo de lesão e estado de perigo pelo art. 179 CC); item 3 (Tema 809 do STF, inclusive a parte temporal); item 4 (arts. 1.783-A CC e 6º da Lei 13.146/2015 conferidos de memória, não contra o texto oficial). Cada item traz a pendência no campo `source`.
- Matéria gravada como "Direito Civil e Processual Civil" (nome da biblioteca); com "Direito Civil" os esquemas não apareciam.
- Itens 1, 3 e 4 não tiveram inclusão individual confirmada pelo usuário; a publicação foi autorizada assim mesmo.
- Planilha: linhas 60 a 63 de "Conteúdos estruturados" criadas como `approved`, com o JSON completo dos blocos, a partir do arquivo consolidado (autorizado pelo usuário em 2026-11-20).
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferência legal acima; IDs TEC não informados (nenhuma questão vinculada); conferir no site a matéria Direito Civil após o deploy.

## 2026-11-20 — Claude (Direito Empresarial e Auditoria publicados; esquemas aparecem na biblioteca)
- Usuário aprovou os 3 conteúdos de Direito Empresarial (`dir-emp-preferencia-creditos`, `dir-emp-investidor-anjo`, `dir-emp-efeitos-falencia`) e os 7 de Auditoria (`aud-01` a `aud-07`). Importados em `study-knowledge.json` pelo script de importação (commits 8ef7707 e f08c981). Sem registro existente alterado.
- Conferência legal: art. 6º (I a III), art. 83 e art. 84 da Lei 11.101/2005 e art. 61-A da LC 123/2006 conferidos contra o texto legal. Não conferidos: CTN art. 186, art. 151, limite de resgate pelo valor corrigido, voto consultivo do investidor-anjo; e todos os 7 conteúdos de Auditoria (NBC TA 620/200, Guia EFD, ECD, NF-e chave natural, LC 105 art. 4º, NBC TP 01). Cada pendência está marcada no próprio bloco como aviso.
- Interface: matérias sem material no Drive (Direito Empresarial, Auditoria) mostravam "Sem materiais enviados" na biblioteca de Dificuldades. `study-knowledge-ui.js` agora lista os esquemas aprovados dessas matérias no lugar do aviso. Cache de `study-knowledge-ui.js` atualizado para v=3 em `dificuldades.html`.
- Planilha: linhas 50 a 59 de "Conteúdos estruturados" como `approved`. A coluna "Blocos JSON" guarda só a referência ao repositório; o texto completo está em `study-knowledge.json`.
- Arquivos: `source-content/study-knowledge.json`, `source-content/study-knowledge-ui.js`, `source-content/dificuldades.html`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferência legal acima; verificar no site (aba Dificuldades, matéria Direito Empresarial e Auditoria) se os esquemas aparecem depois do deploy.

## 2026-11-19 — Claude (Contabilidade: rascunhos aprovados, CPC 47 e CPC 08 no índice, Contabilidade Básica conferida)
- Rascunhos `contab-teoria-arlp`, `contab-teoria-fornecedores` e `contab-teoria-lei-6404` com status `approved` a pedido do usuário. Origens atualizadas com o que foi conferido (Lei 6.404, CPC 12 e CPC 16 — desconto e abatimento deduzidos do custo de aquisição).
- Novo registro `contab-teoria-cpc47-receita` (conta-a-06): definição, cinco etapas do CPC 47, tabela de adiantamento de cliente e pegadinha. Base: exercício do quadro Lançamentos contábeis e o CPC 47.
- Índice `contab-20` (CPC 08 — Prêmio na emissão de debêntures) criado em `difficulty-data.json`. Resumos dos assuntos conta-b-02, conta-c-01 e conta-d-08 atualizados de rascunho para aprovado.
- Teoria das questões de Contabilidade Básica (`contabilidade-basica.json`): regras R1 a R9 conferidas contra os gabaritos e comentários das questões ligadas, sem consulta externa. Nada foi alterado nas regras.
- Sequência de exercícios: os 601 IDs da rota têm regra ligada. A pendência anterior de 21 etapas era erro de método (checagem só na lista mínima).
- Arquivos: `source-content/study-knowledge.json`, `source-content/difficulty-data.json`, `source-content/contabilidade-teoria-questoes/contabilidade-basica.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferir no site (deploy do commit) as teorias de ARLP, Fornecedores, Lei 6.404 e CPC 47; CPC 08 segue sem exercícios cadastrados.

## 2026-11-19 — Claude (Contabilidade: conferência factual dos 3 rascunhos de teoria — branch `claude/teoria-tres-assuntos`)
- Lei 6.404 (`contab-teoria-lei-6404`): art. 176 corrigido para a lista atual (balanço, DLPA, DRE, DFC e DVA se companhia aberta); art. 183 ganhou o inciso VIII (AVP de operações de longo prazo, 2007); art. 184 ganhou a ressalva de paridade cambial (II) e o AVP do passivo não circulante (III, 2009); pegadinha reescrita. Art. 178, 179 e 186 conferidos.
- ARLP (`contab-teoria-arlp`): critério reescrito como "após o término do exercício social seguinte", no lugar de "após 12 meses".
- Fornecedores (`contab-teoria-fornecedores`): conferido contra CPC 12 itens 9 e 10 e prática do AVP de fornecedores; sem alteração. Pendente: a linha "desconto incondicional" não foi conferida em fonte primária (CPC 16).
- Status continua `draft`; nada foi publicado.
- Arquivos: `source-content/study-knowledge.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: aprovação do usuário para publicar; conferir o desconto incondicional no CPC 16; art. 176 §4 (notas explicativas) não foi confirmado.

## 2026-11-19 — Claude (Contabilidade: lista mínima na página de exercícios e as 3 pendentes resolvidas)
- Página de exercícios: novo filtro "Lista mínima · 201 questões" e quadro com as questões por assunto (`accounting-minimal-list.js`, `accounting-curated.js`, `accounting-exercises-page.js` v=2, `contabilidade-exercicios.html`). Cartões TEC ganham `data-minimal`.
- 1936754, 3539089 e 3975996: gabarito oficial conferido no comentário do professor no TEC (sem responder as questões). Viraram resoluções em `accounting-solutions-08.js` (D, E, D), com a ressalva técnica de 1936754 e 3539089 registrada; `accounting-issues.js` ficou vazio; IDs incluídos no roteiro (`accounting-study-route.js`). Banco: 601 de 601 com resolução.
- Teoria das questões v2 de MEP, DVA e CPC 28 para trocar "pendente" pelo gabarito oficial; reimportado. Teste `accounting-exercises.test.mjs` atualizado (601 e lista mínima).
- Pendências: nenhuma destas questões; a lista mínima depende do catálogo de regras atual.

## 2026-11-19 — Claude (Contabilidade: Teoria das questões aprovada e publicada)
- Usuário aprovou os 40 quadros. Status `approved` nos arquivos, no export e na planilha; importados em `source-content/study-knowledge.json` (67 registros: 40 de Contabilidade, 26 de Macroeconomia e o de debêntures). Branch `claude/teoria-das-questoes` unida ao `main` com aprovação do usuário.
- Pendências: lista mínima ainda não integrada à página de exercícios (aguarda decisão); 3 questões pendentes aguardam gabarito oficial do TEC.

## 2026-11-19 — Claude (Contabilidade: Teoria das questões e lista mínima — branch `claude/teoria-das-questoes`)
- 40 quadros de "Teoria das questões" (status draft) em `source-content/contabilidade-teoria-questoes/`, um por assunto do TEC agrupado no assunto do site (`conta-*`). Cobrem as 601 questões, cada uma em exatamente um quadro, com 291 regras; cada regra lista as questões que a cobram. O que já estava na teoria da matéria não foi repetido.
- `study-knowledge-ui.js` (v=2): registros com `updateType` `teoria-das-questoes` entram na aba "Teoria das questões" do assunto de Contabilidade e não aparecem no painel geral da matéria.
- Lista mínima (`docs/contabilidade/lista-minima.json`): 201 questões cobrem todas as 291 regras (otimização exata, HiGHS). O mínimo absoluto é 200; a lista evita as questões pendentes, anuladas ou com divergência de gabarito. A minimalidade vale em relação ao catálogo de regras: regras mapeadas a uma só questão (116) forçam 115 questões.
- Arquivos: os citados acima, `source-content/dificuldades.html`, `source-content/contabilidade-teoria-questoes/conteudos-estruturados-export.json`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: aprovação do conteúdo pelo usuário; merge da branch; integrar a lista mínima à página de exercícios (mudança de código, a decidir).

## 2026-11-19 — Claude (Contabilidade: conferência das 3 pendentes no TEC)
- 1936754, 3539089 e 3975996 abertas no TEC (conta do usuário, sem responder): enunciado e alternativas idênticos aos do PDF; nenhuma marcada como anulada. Nota acrescentada em `accounting-issues.js`. O gabarito oficial do TEC não foi visto, porque só aparece após responder.
- As três continuam como pendentes com ressalva até decisão do usuário. Arquivos: `source-content/accounting-issues.js`, `docs/REGISTRO_ALTERACOES.md`.

## 2026-11-19 — Claude (Macroeconomia: fechamento das conversões)
- Gráficos de inclinação das curvas IS e LM convertidos em SVG (`inclinacao-is-lm-graficos.svg`), conferidos visualmente contra a imagem original, assim como os SVG de IS-LM e de excesso de moeda.
- Conferência no site publicado (deploy de `8aee46e`, READY): `study-knowledge.json` responde com 27 registros, 26 de Macroeconomia; `macro-meta-selic` está na versão 2, sem o exemplo de 10,75%. Na página de Macroeconomia, o painel de esquemas aprovados mostra os 26 itens, com tabelas e avisos renderizados.
- Ícones de instrumentos de política monetária não convertidos: são ilustrativos e não trazem informação além do texto.
- Arquivos: `source-content/assets/inclinacao-is-lm-graficos.svg`, `source-content/macroeconomia-editavel/` (SVG e pendências de `inclinacao-reta` e `instrumentos-politica-monetaria`), `docs/REGISTRO_ALTERACOES.md`.
- Pendências de Macroeconomia que dependem do usuário: TCR (material original), alternativa D da meta Selic (número da questão no TEC). Os SVG não aparecem nos esquemas publicados, porque o importador não aceita imagem.

## 2026-11-19 — Claude (Macroeconomia: 26 esquemas aprovados e correção da Selic)
- Esquemas de Macroeconomia (26, status `approved`) importados em `source-content/study-knowledge.json` via `scripts/import-study-knowledge.mjs`, a partir da aba Conteúdos estruturados. O sumário `macro-conceitos-basicos` foi retirado por não ser esquema. Contabilidade preservada.
- Correção em `macro-meta-selic` (versão 2): o exemplo numérico de 10,75% a.a. foi retirado do fluxograma, porque a taxa muda a cada reunião e a Selic vigente era 14,25% desde 17/06/2026 (fonte: Agência Brasil). A regra de 45 dias foi mantida.
- Taxa de câmbio real: a fórmula de níveis de preço (E = e·P*/P, usada pelo Banco Central) foi mantida. A versão com inflações não foi alterada e continua como observação no esquema.
- Branch `claude/renderizar-blocos-svg` unida ao `main` com o SVG aceito no bloco `image`. Os testes seguem com 3 falhas anteriores, não relacionadas.
- Arquivos: `source-content/macroeconomia-editavel/meta-selic-blocos.json`, `source-content/macroeconomia-editavel/conteudos-estruturados-export.json`, `source-content/study-knowledge.json`, `dificuldades.js`, `source-content/assets/is-lm-graficos.svg`, `source-content/assets/excesso-moeda-graficos.svg`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: TCR (conferência na fonte original, se o material for enviado); gráficos de inclinação IS/LM e ícones de instrumentos de política monetária não convertidos; publicação no site ainda não conferida visualmente; análise da alternativa D fica para a resolução da questão no TEC.

## 2026-11-18 — Claude (ignorar arquivo gerado pelo build)
- `source-content/normativo-data.json` é gerado por `scripts/build.mjs` (via `import-normativo.mjs`) e o `vercel.json` roda `npm run build` no deploy; por isso foi adicionado ao `.gitignore` e não é mais versionado. Build local conferido.
- Conferência das imagens WebP no site publicado: as 106 imagens distintas respondem com status 200 e `image/webp`; `macroeconomia-is-lm-1.webp` renderiza legível. Não foram abertas visualmente todas as 106, só o status e o tipo de cada uma.
- Arquivos: `.gitignore`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: nenhuma de imagem; conferir o restante do conteúdo de Macroeconomia quando houver mudança de texto.

## 2026-11-18 — Claude (registro de decisão; alterações já estavam em produção)
- Decisão do usuário: manter as duas mudanças de 2026-11-15 já publicadas no `main` (remoção dos 75 PDFs/PNGs duplicados da raiz em `762ae03` e conversão das 70 imagens para WebP em `e0405ae`). A entrada abaixo, de 2026-11-15, descreve a situação antes dessa decisão e não deve ser lida como pendente.
- Conferência visual no site publicado: `assets/poder-policia-original.webp` e `assets/constitucional-competencias-1.webp` respondem com `image/webp` (status 200); o esquema de Poder de Polícia renderiza com texto legível. Não foram conferidas as 108 referências uma a uma nem a matéria de Macroeconomia.
- Build local gerou `source-content/normativo-data.json`, que não está rastreado e não foi commitado; decidir se deve ser ignorado no `.gitignore`.
- Arquivos: `docs/REGISTRO_ALTERACOES.md`.
- Pendências: conferir as demais imagens e a matéria de Macroeconomia; decidir sobre `normativo-data.json`; as 3 falhas de teste continuam por dependências ausentes neste ambiente.

## 2026-11-15 — Claude (branch claude/imagens-webp, aguardando aprovação)
- 70 imagens PNG/JPEG de `source-content/assets/` convertidas para WebP sem perda (lossless): 15,8 MB -> 10,1 MB. Originais removidos.
- Referências atualizadas em `difficulty-data.json` (raiz e `source-content/`); filtro de páginas em `dificuldades.js` (raiz e `source-content/`) agora aceita `.png` e `.webp`.
- Conferido: todas as 235 referências `assets/...` apontam para arquivos existentes; testes iguais antes e depois (27 passam, 7 já falhavam).
- Pendências: conferir visualmente no site depois do deploy (esquemas de AFO, Constitucional e Macroeconomia; imagens originais de Retroatividade e Poder de polícia). Opção de ir além: WebP com perda (qualidade 90) reduziria para ~5,7 MB, com leve perda de nitidez nos textos.

## 2026-11-15 — Claude (branch claude/limpeza-raiz, aguardando aprovação)
- Removidos da raiz 75 PDFs/PNGs duplicados (idênticos byte a byte a `source-content/assets/`, 14 MB); criado `.gitignore`.
- Nada muda no site: só `source-content/` é publicado. Testes iguais antes e depois (27 passam, 7 falham; 3 por falta de `iron-session`/`@vercel/blob` no ambiente do Claude, 4 não verificados).
- Arquivos: 75 PDFs/PNGs da raiz (removidos), `.gitignore`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: duplicatas de código na raiz (`app.v44.js`, `index.html`, `dificuldades.*`, `difficulty-data.json` divergem de `source-content/`; o build lê o `difficulty-data.json` da raiz) exigem decisão antes de mexer.

## 2026-11-15 — Claude
- Criado este registro e acrescentadas as regras de coordenação ao `AGENTS.md`.
- Arquivos: `AGENTS.md`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: nenhuma. Sem mudança no site.
