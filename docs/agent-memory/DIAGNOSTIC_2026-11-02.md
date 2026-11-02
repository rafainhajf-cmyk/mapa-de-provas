# Diagnóstico inicial — 2026-11-02
## Documentação remota
Commit192ab30650bdcbf1c6f542e83eb0a25706df0ab6 criado na branch docs/memoria-projeto-2026-11-02. Busca remota confirma branch. Vercel retorna zero deployments dessa branch; produção permanece no commit anterior. vercel.json da branch desativa seu deploy automático.
## Flashcards
Evidência: source-content/flashcards-import.js usa IndexedDB mapa-literalidade-anki-v1, stores cards/media. flashcards.js exportProgress exporta somente reviews. SYNC_STORES em lib/study-sync-core.mjs inclui mapa-anki-reviews-v1, mas não o banco de cartões/imagens. Portanto exportação de revisões e sincronização atual não são backup integral do baralho. refresh também reclassifica certos arquivos da Reforma para lei236; distinguir filtro/reclassificação de perda real.
Hipóteses a reproduzir: troca de origem/aparelho, limpeza de armazenamento ou reclassificação. Nenhuma causa individual foi confirmada nem houve leitura de dados privados do navegador nesta etapa.
## SQL
Não foi localizado arquivo de rota ou módulo dedicado ao treinamento SQL na listagem local. Há questões SQL no catálogo e sql.js usado para importar Anki; este último não é treinamento. Ainda rastrear todos os links, versões antigas e conteúdo dinâmico antes de afirmar que o treinamento nunca existiu.
## AFO
Materiais e imagens existem no repo (PPA/LDO/LOA e demais temas). Organização pedagógica e navegação ainda precisam ser inventariadas e comparadas ao índice real, sem mover ou apagar dados.
## Backup pessoal
Ainda não realizado: cartões/imagens IndexedDB, perfis Blob e planilha remota. Não chamar backup de código de backup completo. Criar cópia privada, restaurar isoladamente e preservar trabalho posterior. Não publicar dados pessoais nesta branch.
## Próximas ações
Reproduzir flashcards com coleção de teste; desenhar backup integral e recuperação por origem/aparelho; rastrear caminho do treinamento SQL; inventariar AFO. Alterações funcionais exigem desenho concreto e validação; publicação permanece etapa separada.
