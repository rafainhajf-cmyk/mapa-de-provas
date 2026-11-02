# Alterações
2026-11-02: criado conjunto docs/agent-memory e AGENTS.md; backup local de 419 arquivos versionados com restauração em disco e comparação byte a byte. Apenas documentação adicionada ao repositório nesta etapa.
Histórico anterior: consultar git log e relatórios Contabilidade/Tributário; não inferir publicação atual dos relatos antigos.

Verificação desta etapa:34 testes aprovados e build concluído. Nenhuma publicação ou mudança na main realizada.

Verificação remota 2026-11-02: conectores GitHub e Vercel acessíveis; projeto prj_so2BPciTbHWwKExUXm7CI9yhwlii e domínio mapa-de-provas.vercel.app confirmados. Último deployment production READY: dpl_FXJED3SvSEJ86JJvyYoLaGhdytas, commit b699faaaa55746f6a0304fee890921dd0a5d0e9b. Documentação preparada para branch docs/memoria-projeto-2026-11-02, com deploy automático desativado. Backup pessoal continua pendente.

Memória já acessível na branch docs/memoria-projeto-2026-11-02, commit192ab30650bdcbf1c6f542e83eb0a25706df0ab6. Ver DIAGNOSTIC_2026-11-02.md para lacuna de backup de cartões Anki e diagnóstico inicial SQL/AFO. Não houve deploy.

Correção aprovada e implementada: importação identificada como LC236 seleciona lei236 ao concluir, como o importador salva. Teste de regressão reproduziu falha antes e passou depois;36 testes totais aprovados e build concluído. Mudança não publicada; backup integral e SQL continuam pendentes.

## Atualização: backup completo implementado (estado mais recente)
Desenho FLASHCARDS_BACKUP_DESIGN.md aprovado. Novos controles de exportação e restauração completa incluem cartões/HTML, mídias e revisões. JSON versionado com SHA256, prévia e confirmação; somente IDs ausentes são adicionados; conflitos locais preservados e cartões com mídia conflitante bloqueados. Cards/media em transação única add; revisões separadas, falha parcial explicitada. Exportação de histórico antiga mantida.
Verificação:41 testes Node aprovados; build com288 arquivos privados. Teste em navegador com IndexedDB real e origem isolada: conteúdo e bytes restaurados, segunda execução sem duplicação. Evidência local fora do repo: ../auditoria/backup-flashcards-teste.jpg. Código ainda não publicado em produção. Isto não significa que o acervo pessoal foi efetivamente exportado/restaurado; esse backup permanece pendente, assim como Blob/Drive e SQL/AFO.
