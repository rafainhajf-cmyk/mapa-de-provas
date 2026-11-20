# Registro de alterações — ChatGPT e Claude

Entradas novas no topo. Formato: data — quem — o que mudou — arquivos — pendências.

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
