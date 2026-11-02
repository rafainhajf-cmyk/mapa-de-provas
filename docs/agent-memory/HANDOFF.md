# Retomada
1. Ler AGENTS.md e estes documentos; confirmar repositório/branch e git status.
2. Ler PENDING_TASKS.md e apenas módulos pertinentes. Separar relato histórico de evidência atual.
3. Para questões: reler contadores da planilha; usar auditoria local se acessível, sem reprocessar PDFs já indexados. Caminho local fora do repo: ../auditoria/exercicios-tributario-2026-11-01/. banco-classificado.json preserva504 IDs e origens; resolucoes-*.json contém análises; sheet-state.json mapeia linhas. Não publicar PDFs fornecidos ou dados pessoais no GitHub.
4. Último lote: IDs3542615,3679699,3561389,2163525; readback166 resolvidas,9 ressalvas,153 pendentes,301 pontos. Atualizar por ID e conferir gravação; não sobrescrever campos do usuário.
5. Primeira etapa do documento atualizado: inventário e memória locais iniciados. Integração remota, backup pessoal e correções de funcionalidades permanecem pendentes; não confundir com projeto concluído.
Comando: Continue o Mapa de Provas. Leia AGENTS.md e docs/agent-memory/HANDOFF.md, confira estado e pendências, execute o pedido preservando dados e validando o resultado. Prefira ferramentas desta sessão; Work só por limitação identificada.

Verificação remota 2026-11-02: conectores GitHub e Vercel acessíveis; projeto prj_so2BPciTbHWwKExUXm7CI9yhwlii e domínio mapa-de-provas.vercel.app confirmados. Último deployment production READY: dpl_FXJED3SvSEJ86JJvyYoLaGhdytas, commit b699faaaa55746f6a0304fee890921dd0a5d0e9b. Documentação preparada para branch docs/memoria-projeto-2026-11-02, com deploy automático desativado. Backup pessoal continua pendente.

Memória já acessível na branch docs/memoria-projeto-2026-11-02, commit192ab30650bdcbf1c6f542e83eb0a25706df0ab6. Ver DIAGNOSTIC_2026-11-02.md para lacuna de backup de cartões Anki e diagnóstico inicial SQL/AFO. Não houve deploy.

Correção aprovada e implementada: importação identificada como LC236 seleciona lei236 ao concluir, como o importador salva. Teste de regressão reproduziu falha antes e passou depois;36 testes totais aprovados e build concluído. Mudança não publicada; backup integral e SQL continuam pendentes.

## Atualização: backup completo implementado (estado mais recente)
Desenho FLASHCARDS_BACKUP_DESIGN.md aprovado. Novos controles de exportação e restauração completa incluem cartões/HTML, mídias e revisões. JSON versionado com SHA256, prévia e confirmação; somente IDs ausentes são adicionados; conflitos locais preservados e cartões com mídia conflitante bloqueados. Cards/media em transação única add; revisões separadas, falha parcial explicitada. Exportação de histórico antiga mantida.
Verificação:41 testes Node aprovados; build com288 arquivos privados. Teste em navegador com IndexedDB real e origem isolada: conteúdo e bytes restaurados, segunda execução sem duplicação. Evidência local fora do repo: ../auditoria/backup-flashcards-teste.jpg. Código ainda não publicado em produção. Isto não significa que o acervo pessoal foi efetivamente exportado/restaurado; esse backup permanece pendente, assim como Blob/Drive e SQL/AFO.
