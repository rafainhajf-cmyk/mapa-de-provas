# Registro de alterações — ChatGPT e Claude

Entradas novas no topo. Formato: data — quem — o que mudou — arquivos — pendências.

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
