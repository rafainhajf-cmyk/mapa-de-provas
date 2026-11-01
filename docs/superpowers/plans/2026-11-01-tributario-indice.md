# Plano de implementação do índice tributário

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reorganizar somente Tributário nas dez categorias aprovadas, preservando conteúdo, IDs, vínculos e progresso.

**Architecture:** Conciliar os catálogos tributários no build sem modificar suas fontes originais. Acrescentar classificação explícita compartilhada pelo índice e biblioteca; usar metadados pessoais separados para edição manual. Não regravar dados de estudo existentes.

**Tech Stack:** JavaScript ESM, Node >=22, JSON, localStorage, sincronização por registros existente, HTML/CSS.

**Spec:** `docs/tributario/diagnostico-2026-11-01/diagnostico-e-plano.md`, aprovado pelo usuário, e documento DOCX fornecido.

## Restrições globais

- Não alterar organização ou dados das outras disciplinas.
- Não apagar, resumir, renomear títulos de seções ou duplicar conteúdo original.
- Preservar identificadores, modifiedAt, anexos, vínculos, observações e progresso.
- Exatamente dez categorias na ordem da especificação; ambiguidades sinalizadas, sem movimentação automática silenciosa.
- Nenhum deploy nem escrita em produção; publicação depende de aprovação separada.
- Backup atual cobre arquivos versionados; não declarar backup de Blob, navegador ou Drive remoto.
- Nenhuma dependência nova e nenhuma mudança ampla no mecanismo offline/sync.

## Foco de revisão

1. Divergências no mesmo ID não podem substituir texto silenciosamente; registrar ambas as variantes e política explícita.
2. Arquivos anexos não podem inflar assuntos ou perder o vínculo com a anotação principal.
3. Pasta vazia e ausência de avaliação não equivalem a conteúdo concluído ou revisão vencida.
4. Chaves de seção dependem de ID, título e ocorrência; reorganização não pode alterar esses componentes.
5. Falha de armazenamento, edição offline e conflito entre aparelhos não podem apagar marcações existentes.

## Tarefa 1 — Catálogo reconciliado e classificação

**Arquivos:** criar `lib/tax-catalog.mjs`, `source-content/tax-classification.js`, `tax-catalog.test.mjs`; modificar `scripts/build.mjs`.

**Interfaces:** `reconcileTaxCatalog(source, root)` retorna `{data, report}` sem mutar argumentos; `TAX_CATEGORIES` contém dez objetos `{id,title}` em ordem; `classificationFor(record, overrides)` retorna categoria principal, etiquetas e sinalização de revisão.

- [x] Escrever testes: união tributária contém os 12 IDs conhecidos uma única vez; campos e hashes das outras disciplinas iguais ao source; duas execuções são idempotentes; as duas entradas originais não são mutadas.
- [x] Escrever teste de conflito: mesmo ID com textos divergentes conserva versão publicada e registra a variante da raiz na auditoria; nenhum campo textual desaparece silenciosamente. Novas anotações da raiz entram com conteúdo completo.
- [x] Rodar os testes e confirmar falha por módulos ausentes.
- [x] Implementar conciliação tributária exclusiva. Preservar metadados globais e anexos. Registrar relatório de build com fontes, contagens, variantes e hashes. Substituir apenas o trecho ad hoc tributário atual do build; demais etapas permanecem.
- [x] Implementar classificação aprovada por ID de arquivo/pasta; pastas agregadoras não viram assuntos duplicados. LC 236 mantém título original e recebe descrição oficial separada. RMIT sem material localizado fica identificado, sem conteúdo inventado.
- [x] Verificar testes e gerar build; comparar IDs, conteúdo original e outras disciplinas antes/depois.

## Tarefa 2 — Índice, biblioteca e indicadores

**Arquivos:** criar `source-content/tax-index.js`, `source-content/tax-index.css`, `tax-index.test.mjs`; modificar `source-content/dificuldades.js` e `source-content/dificuldades.html`.

**Interfaces:** `taxIndexHTML(model, topics, {search,status,overrides,progress})` retorna dez categorias expansíveis; `taxTopicState(sectionKeys, progress, findings)` calcula estado sem presumir histórico. Componente usa eventos existentes para abrir arquivos e assuntos; nenhum leitor de documento é duplicado.

- [x] Testar dez categorias na ordem exata, grupos vazios distinguíveis, anexos vinculados sem contar assunto adicional e acesso a todos os IDs originais.
- [x] Testar busca por corpo textual/artigo/etiqueta e filtros todos/não estudados/em andamento/concluídos/com dificuldade/pendentes de revisão. Revisão pendente sem registro compatível mostra ausência de registro, não prazo inventado.
- [x] Testar progresso parcial e total com chaves reais do leitor, título repetido e ocorrência; nenhum estado gravado é alterado pelo render.
- [x] Confirmar falhas; implementar componente tributário compartilhado no sumário e biblioteca, preservando rotas antigas. Usar lista canônica de chaves derivada da mesma estrutura de títulos do leitor; seção com evidência insuficiente fica sem conclusão presumida.
- [x] Manter ambíguos acessíveis no contexto original, com sinalização para revisão. Oferecer referências a seções verificadas de material misto sem cópias independentes; não classificar trechos não examinados.
- [x] Aplicar CSS restrito ao componente e rolagem contida em tabelas. Atualizar versões dos recursos alterados.
- [x] Rodar testes e build. Conferir que o fluxo das demais disciplinas segue o código anterior.

## Tarefa 3 — Edição manual e proteção dos metadados

**Arquivos:** criar `source-content/tax-preferences.js`, `tax-preferences.test.mjs`; modificar os dois `study-sync-core` e `sync-client.test.mjs` somente para registrar a nova chave.

**Interfaces:** chave `mapa-tax-classification-v1` contém mapa por ID estável com `{categoryId,tags,updatedAt}`; leitura valida categoria permitida e etiquetas textuais; salvar atua somente nessa chave. Exportação de contingência inclui estado anterior dos metadados, sem credenciais.

- [x] Testar edição e recarga, etiquetas escapadas, IDs inválidos, JSON corrompido e armazenamento cheio. Falha ao salvar mantém formulário e mostra mensagem, sem declarar sucesso.
- [x] Testar que salvar categoria não altera nenhuma outra chave de localStorage nem títulos/IDs do leitor.
- [x] Confirmar falhas; implementar editor acessível com categoria principal e etiquetas e cópia anterior automática da nova chave antes da primeira edição. Não modificar progresso, observações ou anexos.
- [x] Registrar a nova chave nos núcleos espelhados de sync. Testar duas edições de IDs diferentes em dois aparelhos offline e a resolução determinística de conflito no mesmo ID, além de exclusão sem ressurreição; preservar demais registros.
- [x] Verificar todos os testes. Não conectar nem modificar perfis reais em produção.

## Tarefa 4 — Verificação integrada e entrega

**Arquivos:** criar relatório `docs/tributario/resultado-implementacao.md`; atualizar scripts de teste em `package.json`.

- [x] Executar suíte completa com testes tributários e autenticação/sync existentes; build e diff-check devem passar.
- [x] Testar no navegador local: dez categorias, expansão, busca, filtros, edição/recarga, acesso a cada anotação, links antigos e indicadores com marcas de teste.
- [x] Conferir computador e tablet, sem overflow da página; verificar tabelas, teclado e rótulos. Não alterar marcas do navegador real do usuário.
- [x] Exercitar estado offline no ambiente de teste e reconexão dos novos metadados; não prometer disponibilidade de arquivos do Drive não baixados.
- [x] Demonstrar rollback removendo mapa de classificação no ambiente de teste, preservando textos e chaves de estudo. Comparar contagens/hashes dos arquivos de dados e snapshots pessoais sintéticos.
- [x] Registrar contagens antes/depois, conflitos, material não localizado, testes e limites. Não declarar conferência de dados privados ou Drive que não ocorreu.
- [x] Entregar branch e resultado para revisão. Publicar somente após aprovação separada; nenhuma incorporação automática à main nesta etapa.

## Forma de execução proposta

Execução direta nesta conversa, em quatro partes, com atualização após cada resultado verificável. As tarefas dependem da conciliação e do contrato de IDs da primeira etapa; execução sequencial reduz alterações concorrentes nos mesmos arquivos. Uma revisão final independente pode ser feita após os testes, sem delegar edições simultâneas.

## Estado

Desenho, prévia e plano aprovados. Implementação executada diretamente;28 testes passaram, build e conferência local concluídos, revisão independente com ajustes resolvidos. Detalhes e limites em docs/tributario/resultado-implementacao.md. Publicação e incorporação à main não executadas.
