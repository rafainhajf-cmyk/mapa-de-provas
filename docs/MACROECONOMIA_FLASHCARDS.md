# Macroeconomia — 2 de novembro de 2026

Pedido: integrar os dez cartões aprovados no chat Preparar projeto para Work e publicar no projeto Vercel mapa-de-provas.

Implementado: baralho teórico estático com IDs mapa:macro:*, combinado em memória com os cartões importados; matéria Macroeconomia e link flashcards.html?materia=macroeconomia. Frentes e versos mantêm o texto aprovado. Não há migração nem escrita em IndexedDB para adicionar o baralho. Histórico usa a chave de revisões existente, preservando entradas anteriores. Importador Literalidade permanece intacto.

Base e reversão: main d8ddef6e118ae86586d9a249baec05a0476c90d1; produção anterior dpl_969MtyCRyYXDZ2E4Yns6J9GHzrgR. Reverter somente este commit remove a nova matéria; os dados pessoais não são apagados.

Validação: 14 testes Node aprovados, build com 282 arquivos privados. Navegador isolado: dez frentes e versos, avaliação dos dez, persistência após recarga, baralho/mídia/histórico sentinelas preservados, sem duplicação, tela de 390 px sem rolagem horizontal e zero erros JavaScript.

Publicação: autorizada pelo pedido atual. Confirmar READY e aliases no Vercel após o commit. Backup integral de dados pessoais e correções locais anteriores continuam fora deste escopo.
