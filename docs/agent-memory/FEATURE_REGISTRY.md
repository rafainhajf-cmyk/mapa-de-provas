# Recursos e evidências
Existentes no código: navegação, apostila, dificuldades, provas, flashcards, exercícios de Contabilidade e sincronização. Entradas em source-content/*.html; dificuldades.html também na raiz. Não equivale a validação atual em produção.
Tributário: classificação e leitura por categoria documentadas em docs/tributario/resultado-implementacao.md; testes específicos disponíveis.
Contabilidade: catálogos, lotes e cobertura documentados em docs/contabilidade/. Relatórios históricos divergem em contagem; recalcular a partir do banco antes de afirmar total atual.
Pendentes de diagnóstico atual: flashcards da Reforma desaparecendo; acesso ao treinamento SQL; organização AFO. São relatos, não causas comprovadas.
Planejados/não certificados: motor adaptativo completo com cobertura auditável, painel administrativo, backup de dados pessoais e recuperação em conversa nova. Não afirmar implementação só porque a especificação pede.

## Atualização: backup completo implementado (estado mais recente)
Desenho FLASHCARDS_BACKUP_DESIGN.md aprovado. Novos controles de exportação e restauração completa incluem cartões/HTML, mídias e revisões. JSON versionado com SHA256, prévia e confirmação; somente IDs ausentes são adicionados; conflitos locais preservados e cartões com mídia conflitante bloqueados. Cards/media em transação única add; revisões separadas, falha parcial explicitada. Exportação de histórico antiga mantida.
Verificação:41 testes Node aprovados; build com288 arquivos privados. Teste em navegador com IndexedDB real e origem isolada: conteúdo e bytes restaurados, segunda execução sem duplicação. Evidência local fora do repo: ../auditoria/backup-flashcards-teste.jpg. Código ainda não publicado em produção. Isto não significa que o acervo pessoal foi efetivamente exportado/restaurado; esse backup permanece pendente, assim como Blob/Drive e SQL/AFO.
