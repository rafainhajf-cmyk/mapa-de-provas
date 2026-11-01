# Contabilidade — lote 02 — 31/10/2026

17 questões novas resolvidas: 2870105, 2924798, 2967112, 1889254, 2369050,
3847013, 3883244, 3822216, 3975988, 3454091, 3681103, 3557740, 2792329,
3079046, 3093570, 2571016 e 2414501.

Total acumulado: 38 questões TEC distintas resolvidas, das 601 contábeis.
Faltam 563. As 20 questões tributárias dos PDFs continuam separadas no inventário.
A seleção de 111 referências não significa 111 resoluções. A página agora reúne
133 questões TEC únicas (38 resolvidas e 95 pendentes), mais 28 exercícios IA.
A classificação teoria/cálculo foi registrada por ID para esses 133 cartões;
os demais IDs do inventário ainda têm classificação nula, sem inferência por assunto.

Os enunciados e alternativas foram extraídos exclusivamente dos cinco PDFs
fornecidos. Conservam-se IDs, banca/prova, arquivo, página e link original.
As páginas 5 a 10 de contabilidade1.pdf foram renderizadas e conferidas no lote 02.
Quatro tabelas foram reestruturadas sem alterar seus valores. Os itens ainda não
resolvidos conservam transcrição extraída, com conferência visual pendente.
Os PDFs não foram adicionados ao repositório; fontes.json registra seus hashes.

Todos os 28 IA foram revisados, com cinco alternativas, gabarito e comentário
sobre distratores. Há casos de balanço, DRE, DFC, DVA, MEP, VRL, tributos diferidos,
arrendamento e patrimônio líquido. IDs IA-01..IA-28 foram mantidos. As marcações
antigas permanecem; a página informa a revisão para quem quiser refazer.

O armazenamento continua em `mapa-contab-curated-progress-v1`, por ID `TEC-…`
ou `IA-…`. A remoção dos cartões duplicados corrige a contagem sem apagar dados.
Gabaritos e comentários aparecem somente em detalhes recolhidos por padrão.
Comentários antigos da seleção que não correspondiam a análise completa não
são mais computados como resolução. Exemplo: o comentário legado de 2777037
falava de reciclagem de VJORA, mas o item fornecido trata da finalidade da DRA;
foi removido e a questão permanece pendente de resolução individual.

Referência técnica para instrumentos financeiros:
[CPC 48](https://www.cpc.org.br/Arquivos/Documentos/530_CPC_48_rev_21.pdf), em especial
itens 4.1, 5.1.3, 5.7 e 6.5.11. Para as questões antigas, foi preservado o contexto
do enunciado e do gabarito do caderno, com ressalvas técnicas quando pertinentes.

Validação reproduzível:

- `npm run build`
- `npm test`: 12 testes, incluindo autenticação, PDFs privados e sincronização.
- `npm run test:accounting:browser`: requer Playwright e Chrome instalado.
  Pode-se apontar `PLAYWRIGHT_MODULE` para um runtime externo e escolher
  `CHROME_CHANNEL`. Verifica 161 cartões, filtros combinados, respostas
  recolhidas, persistência após recarga, ausência de erros e largura móvel.

A branch é `dev/revisoes-mapa-de-provas`. O vercel.json bloqueia deploy automático
somente dessa branch por `git.deploymentEnabled`, conforme a
[documentação oficial](https://vercel.com/docs/project-configuration/git-configuration).
Nenhum comando de deploy foi executado e a main não foi alterada.
