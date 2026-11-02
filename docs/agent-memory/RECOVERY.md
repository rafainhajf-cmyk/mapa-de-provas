# Backup e recuperação
Backup de 2026-11-02 está fora do repo em ../auditoria/memoria-projeto-2026-11-02/codigo-versionado.zip, com relatório backup-verificacao.json e pasta restauracao-teste. Foram restaurados419 arquivos e comparados byte a byte. Commit base b699faaaa55746f6a0304fee890921dd0a5d0e9b.
Limites: não contém Blob, Drive, localStorage/IndexedDB, segredos nem documentos desta alteração. Isso não é backup completo de progresso pessoal.
Restaurar somente em pasta isolada; verificar hashes e testes antes de propor substituição. Nunca restaurar snapshot sobre estudo posterior sem reconciliação e autorização.
A coleta e restauração de dados remotos ainda precisam ser desenhadas e verificadas. Não certificar recuperabilidade total.

## Atualização: backup completo implementado (estado mais recente)
Desenho FLASHCARDS_BACKUP_DESIGN.md aprovado. Novos controles de exportação e restauração completa incluem cartões/HTML, mídias e revisões. JSON versionado com SHA256, prévia e confirmação; somente IDs ausentes são adicionados; conflitos locais preservados e cartões com mídia conflitante bloqueados. Cards/media em transação única add; revisões separadas, falha parcial explicitada. Exportação de histórico antiga mantida.
Verificação:41 testes Node aprovados; build com288 arquivos privados. Teste em navegador com IndexedDB real e origem isolada: conteúdo e bytes restaurados, segunda execução sem duplicação. Evidência local fora do repo: ../auditoria/backup-flashcards-teste.jpg. Código ainda não publicado em produção. Isto não significa que o acervo pessoal foi efetivamente exportado/restaurado; esse backup permanece pendente, assim como Blob/Drive e SQL/AFO.
