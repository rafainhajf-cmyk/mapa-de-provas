# Direito Tributário Normativo — integração de 03/11/2026

## Escopo e restauração

Projeto existente rafainhajf-cmyk/mapa-de-provas, pasta efetiva source-content, build scripts/build.mjs. Backup anterior: branch backup/normativo-503-antes-02c7f79. Restaurar o commit 02c7f792e7d1d5f836cbfc86056f04cad960adaf por novo commit de reversão e redeploy permite recuperar a versão anterior. Nenhuma migração de banco foi executada. Login iron-session e armazenamento privado Vercel Blob permanecem existentes.

As 11 abas foram congeladas integralmente em data-sources/tributario-normativo/snapshot.json.gz.base64 (JSON UTF-8, gzip, base64). O importador lê esse snapshot e gera normativo-data.json no build, sem alterar a planilha, data.json, catálogos antigos ou dados pessoais. Identificadores TEC e P- são preservados; agrupamento determinístico por título normalizado mantém aliases e variantes. Esse agrupamento não resolve todas as equivalências semânticas.

## Entrega implementada

Rota normativo.html integrada à navegação e à Análise de Provas; 503 questões únicas (328 originais + 175 complementares), 301 pontos integrais e 18 tópicos. Áreas complementares independentes para IPVA, ITCMD, ITBI, ISSQN e Reforma. Busca por conceito/ID, origem, evidência e frequência documental provisória; paginação; enunciado antes de gabarito recolhido; notas e marcações nos stores sincronizados já existentes, com namespace normativo:. A importação não escreve no localStorage e não remove registros anteriores.

Quatro quadros próprios com comparações, fluxos, cores semânticas e fontes: gênero/espécie; base do IR; solidariedade/art.134; efeitos sobre o crédito. Conferência pontual do CTN compilado no Planalto, Receita Federal e compilação Câmara/Senado. Dois IDs receberam auditoria direta: 3023153 (alternativa E) e 790682 (C). Os demais vínculos não são promovidos automaticamente a cobrança comprovada. A fonte oficial atual registra LC236/2026: redação histórica permanece separada e não é substituída silenciosamente.

## Pendências explícitas

A entrega não conclui a auditoria jurídica integral de 503 questões, nem a transformação visual de todos os núcleos. Os 412 fragmentos REG e vínculos legados exigem exame individual do enunciado/alternativa correta; contagens da planilha são provisórias. Alguns textos possuem falhas de extração. Os textos completos originais permanecem acessíveis. Muitas regras dos tópicos 8–12 só estavam nas resoluções; foram preservadas como núcleos candidatos. Sinônimos não triviais ainda precisam de consolidação humana com preservação de condições e exceções.

Não são certificados todos os gabaritos históricos, todas as alterações posteriores, jurisprudência ou frequências. O frontend identifica esses limites para não apresentar OCR ou fragmentos como esquemas concluídos.

## Validação técnica

Build e 28 testes automatizados aprovados: integridade e idempotência, 301 pontos completos/aliases, referências aos 18 tópicos, áreas independentes, exclusão de inferência automática de incidência, manifesto offline prioritário, preservação dos stores e demais testes de autenticação, sincronização, contabilidade, apostila e Macroeconomia/IS-LM. O manifesto inclui o módulo e dependências antes do limite de PDFs. Testes de dispositivos físicos, sincronização real entre dispositivos e desconexão real não são substituídos por esses testes de código.
