# Registro de alterações — ChatGPT e Claude

Entradas novas no topo. Formato: data — quem — o que mudou — arquivos — pendências.

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
