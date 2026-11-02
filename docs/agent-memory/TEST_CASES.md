# Verificação
Código: npm test e npm run build conforme package.json; registrar execução e resultado real. Não atribuir passagem atual a relatórios históricos.
Regressão: autenticação/rotas, filtros e leitura Tributário, IDs e classificações, respostas recolhidas, progresso após recarga e sincronização/conflitos, conteúdo das demais matérias.
Planilha por lote: ler destino antes; atualizar por ID; preservar H:J e Página1; reler respostas/status/contadores; conferir IDs únicos, campos preenchidos e fundamentos. Verificar campos extras do protocolo atualizado.
Documentação: arquivos obrigatórios existem, referências locais resolvem e não há segredos. Backup: extração em pasta isolada e igualdade byte a byte.
Pendentes de validação: produção autenticada, dois aparelhos físicos, restauração de dados pessoais e retomada de novo chat. Offline dispensado como critério pelo usuário.

Execução 2026-11-02:33 testes passaram inicialmente; o teste de sessão foi bloqueado por EPERM ao abrir porta local. Reexecutado com permissão:1/1 passou. Total34/34. Build via runtime Node concluído:286 arquivos privados; nenhum conteúdo no diretório público. Mudanças desta etapa são documentais.

Correção aprovada e implementada: importação identificada como LC236 seleciona lei236 ao concluir, como o importador salva. Teste de regressão reproduziu falha antes e passou depois;36 testes totais aprovados e build concluído. Mudança não publicada; backup integral e SQL continuam pendentes.

## Atualização: backup completo implementado (estado mais recente)
Desenho FLASHCARDS_BACKUP_DESIGN.md aprovado. Novos controles de exportação e restauração completa incluem cartões/HTML, mídias e revisões. JSON versionado com SHA256, prévia e confirmação; somente IDs ausentes são adicionados; conflitos locais preservados e cartões com mídia conflitante bloqueados. Cards/media em transação única add; revisões separadas, falha parcial explicitada. Exportação de histórico antiga mantida.
Verificação:41 testes Node aprovados; build com288 arquivos privados. Teste em navegador com IndexedDB real e origem isolada: conteúdo e bytes restaurados, segunda execução sem duplicação. Evidência local fora do repo: ../auditoria/backup-flashcards-teste.jpg. Código ainda não publicado em produção. Isto não significa que o acervo pessoal foi efetivamente exportado/restaurado; esse backup permanece pendente, assim como Blob/Drive e SQL/AFO.
