# Registro de alterações — ChatGPT e Claude

Entradas novas no topo. Formato: data — quem — o que mudou — arquivos — pendências.

## 2026-11-15 — Claude (branch claude/limpeza-raiz, aguardando aprovação)
- Removidos da raiz 75 PDFs/PNGs duplicados (idênticos byte a byte a `source-content/assets/`, 14 MB); criado `.gitignore`.
- Nada muda no site: só `source-content/` é publicado. Testes iguais antes e depois (27 passam, 7 falham; 3 por falta de `iron-session`/`@vercel/blob` no ambiente do Claude, 4 não verificados).
- Arquivos: 75 PDFs/PNGs da raiz (removidos), `.gitignore`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: duplicatas de código na raiz (`app.v44.js`, `index.html`, `dificuldades.*`, `difficulty-data.json` divergem de `source-content/`; o build lê o `difficulty-data.json` da raiz) exigem decisão antes de mexer.

## 2026-11-15 — Claude
- Criado este registro e acrescentadas as regras de coordenação ao `AGENTS.md`.
- Arquivos: `AGENTS.md`, `docs/REGISTRO_ALTERACOES.md`.
- Pendências: nenhuma. Sem mudança no site.
