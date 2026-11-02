# Pendências em ordem
1. Tornar esta memória acessível no GitHub: documentos atualmente locais, ainda sem commit/push. Confirmar branch remota e evitar deploy automático antes de sincronizar.
2. Verificar conexões atuais GitHub/Vercel/Drive e armazenamento remoto; não copiar credenciais. Inventário local não substitui checagem remota.
3. Backup consistente de dados pessoais Blob/Drive/navegador e restauração isolada: não feito. Não sobrescrever perfis reais.
4. Auditar campos obrigatórios da planilha e ordenar os pontos por matéria preservando IDs e H:J; pontos de novos lotes foram acrescentados ao final. Não prometer ordenação integral atual.
5. Continuar Normativo após primeira etapa: último readback 175 analisadas =166 resolvidas+9 ressalvas;153 pendentes;301 pontos. Revalidar totais na planilha antes de continuar. 504 IDs no acervo,328 no Normativo,175 específicos e1 escopo em conferência. Não somar duplicações entre cadernos.
6. Diagnosticar e corrigir flashcards Reforma, SQL e AFO com reprodução e testes adequados, um módulo por vez.
7. Evoluir cobertura/revisão/painel somente após inventário e desenho concreto; não usar indicadores fictícios.
8. Teste de recuperação em nova conversa e acesso à documentação remota; só então avaliar independência dos chats. Nunca apagar chats automaticamente.

Verificação remota 2026-11-02: conectores GitHub e Vercel acessíveis; projeto prj_so2BPciTbHWwKExUXm7CI9yhwlii e domínio mapa-de-provas.vercel.app confirmados. Último deployment production READY: dpl_FXJED3SvSEJ86JJvyYoLaGhdytas, commit b699faaaa55746f6a0304fee890921dd0a5d0e9b. Documentação preparada para branch docs/memoria-projeto-2026-11-02, com deploy automático desativado. Backup pessoal continua pendente.

Memória já acessível na branch docs/memoria-projeto-2026-11-02, commit192ab30650bdcbf1c6f542e83eb0a25706df0ab6. Ver DIAGNOSTIC_2026-11-02.md para lacuna de backup de cartões Anki e diagnóstico inicial SQL/AFO. Não houve deploy.

Diagnóstico confirmado: divergência entre lei236 salva e reforma selecionada após importação; proposta de correção limitada apresentada, ainda não implementada.

Correção aprovada e implementada: importação identificada como LC236 seleciona lei236 ao concluir, como o importador salva. Teste de regressão reproduziu falha antes e passou depois;36 testes totais aprovados e build concluído. Mudança não publicada; backup integral e SQL continuam pendentes.

## Atualização: backup completo implementado (estado mais recente)
Desenho FLASHCARDS_BACKUP_DESIGN.md aprovado. Novos controles de exportação e restauração completa incluem cartões/HTML, mídias e revisões. JSON versionado com SHA256, prévia e confirmação; somente IDs ausentes são adicionados; conflitos locais preservados e cartões com mídia conflitante bloqueados. Cards/media em transação única add; revisões separadas, falha parcial explicitada. Exportação de histórico antiga mantida.
Verificação:41 testes Node aprovados; build com288 arquivos privados. Teste em navegador com IndexedDB real e origem isolada: conteúdo e bytes restaurados, segunda execução sem duplicação. Evidência local fora do repo: ../auditoria/backup-flashcards-teste.jpg. Código ainda não publicado em produção. Isto não significa que o acervo pessoal foi efetivamente exportado/restaurado; esse backup permanece pendente, assim como Blob/Drive e SQL/AFO.
