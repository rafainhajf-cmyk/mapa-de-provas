# Resultado da implementação do índice tributário

Implementado localmente na branch `dev/tributario-indice-10-categorias`, a partir de `74b6cd80840d8fb4f6bd94fb125abd454ad220d7`. Nenhuma publicação, incorporação à main ou alteração de dados pessoais em produção foi realizada.

O build anterior incluía sete arquivos de Tributário. A conciliação inclui os 12 IDs conhecidos sem duplicação: dez anotações e dois anexos vinculados. Os JSONs originais permanecem intactos. Divergências conservam as duas variantes integrais no relatório autenticado do build, com indicação na interface; a fonte de referência tem precedência, sem mudança automática de seus títulos. Há uma divergência real de anotação: Mandado de segurança. Metadados divergentes de catálogo e recursos também são registrados pelo algoritmo.

## Organização efetiva na prévia

| Categoria | Assuntos no índice | Com material próprio | Referências a trechos |
|---|---:|---:|---:|
| IPVA | 1 | 0 | 1 |
| ITCMD | 1 | 0 | 1 |
| ITBI | 1 | 0 | 1 |
| ISSQN — LC 116/2003 | 1 | 0 | 1 |
| REFORMA — LEI 236 | 1 | 1 | 1 |
| COMPARATIVO TRIBUTÁRIO | 1 | 1 | 0 |
| LC 227/2026: TEXTO LEGAL | 2 | 0 | 0 |
| RMIT — REFORMA TRIBUTÁRIA | 0 | 0 | 12 na apostila existente |
| NOVIDADES EXCLUSIVAS DA REFORMA TRIBUTÁRIA | 2 | 0 | 1 |
| DIREITO TRIBUTÁRIO NORMATIVO | 18 | 8 | 1 |

Há 28 assuntos classificados e quatro assuntos com classificação pendente, totalizando 32 entradas de navegação. Dez têm material próprio e 22 são entradas de pastas sem arquivo próprio. Referências de seção não criam assuntos ou arquivos novos. PDF e imagem anexos permanecem vinculados às respectivas anotações principais. As 35 pastas originais continuam no catálogo, incluindo raiz e agrupadores; não somar pastas aos assuntos como se fossem conteúdos independentes.

Os quatro itens de conferência são Direitos e garantias do contribuinte, EC 132/2023: Constituição e transição, IBS e CBS e Legislação estadual do Ceará. Permanecem acessíveis pelo contexto original fora da contagem das dez categorias; edição manual resolve sua categoria sem alterar o registro original.

Correção após indicação do usuário: RMIT está no volume Regra-Matriz da Apostila de Tributário (`apostila-data.json` e leitor `apostila.js`), fora dos dois catálogos de dificuldade. A categoria08 e a biblioteca agora apontam para as12 seções do grupo existente, preservando seus IDs e a chave `mapa-tributario-reader-v1`. Isso conserva a organização anterior do volume, inclusive seus trechos contextuais, sem certificar que cada seção seja teoria específica de regra-matriz. Nenhuma seção ou texto foi duplicado. Foi corrigido também um fragmento de sintaxe inválida no leitor que impedia seu carregamento.

## Recursos implementados

- Mesmas dez categorias no índice e na biblioteca; expansão/recolhimento e contadores.
- Busca nos textos disponíveis, títulos, artigos e etiquetas. Filtros por estado de leitura e dificuldade com evidência existente.
- Estado de conclusão calculado pelas mesmas chaves de seção do leitor original, incluindo cabeçalho para assuntos com material. Pastas vazias não são concluídas automaticamente.
- Revisão pendente exige indicação explícita `reviewPending`; os dados atuais não possuem esse estado. Não foram criados prazos, históricos ou conclusões.
- Editor de categoria/etiquetas em chave separada `mapa-tax-classification-v1`, com cópia anterior antes da primeira edição e restauração da sugestão por ID.
- Sincronização da nova chave pelo mecanismo existente, por registro. Nenhuma marcação antiga é migrada ou reiniciada.
- Sete atalhos para títulos verificados da apostila comparativa, com foco na seção existente e sem copiar seu texto.
- Correção mínima na seleção do download offline: código e dados passam antes das imagens/PDFs, mantendo limites de45MB totais e8MB por arquivo. Nenhuma mudança no consentimento de rede, service worker ou política de sincronização.

## Validação

A suíte final inclui autenticação, sincronização, Contabilidade e testes novos de conciliação, classificação, preservação, quota, corrupção local, conflitos offline, anexos e seleção de cache. Resultado:28 testes passaram, zero falhas. Build e diff-check passaram.

Na prévia local pelo navegador: dez categorias, edição/recarga/restauração, busca textual, filtro sem conclusão fictícia, marcação de leitura preservada e filtro em andamento verificados. A marcação do documento CTN109/110 aparece como1 de8 seções após incluir o cabeçalho original. O atalho IPVA focou exatamente “3.3. IPVA: duas emendas, duas mudanças”. Sete referências presentes. Tablet820px: largura do documento810px, sem rolagem horizontal da página. Prévia visual guardada fora do repositório em `../tributario-indice-tablet.jpg`.

Revisão independente encontrou três ajustes, corrigidos e reconferidos: contagem do cabeçalho, variantes de metadados e referências de seções. A lista offline gerada contém HTML, JS, CSS, JSON e módulos necessários ao índice.

Os dados das outras disciplinas foram comparados integralmente ao resultado do build anterior, executado em uma cópia isolada: iguais, descontando apenas o carimbo global de leitura. Evidência em `integridade-implementacao.json`. Os dois arquivos JSON de origem não têm alterações.

## Limites e reversão

O backup local dos398 arquivos versionados foi verificado no diagnóstico. Não foi realizado backup nem escrita de perfis reais no Blob, localStorage, IndexedDB ou Drive. O código atua como camada de navegação e metadados novos, evitando migração destrutiva de dados pessoais.

Os cenários de offline/conflitos foram executados com dois aparelhos simulados em teste. O download offline efetivo e a reconexão em tablet físico não foram certificados; essa validação deixou de ser requisito por solicitação expressa do usuário. Arquivos externos do Drive não são prometidos offline. A auditoria profunda offline/sync permanece separada.

Para reverter o código, voltar ao commit base e reconstruir a aplicação; as fontes originais estão intactas. O build anterior foi reproduzido isoladamente. As novas preferências não devem ser apagadas globalmente para reverter uma tela; basta desativar a nova navegação ou restaurar a sugestão por assunto. Nenhuma restauração de snapshot deve sobrescrever trabalho posterior de estudo.

A publicação na Vercel depende de aprovação separada, como exigido na especificação fornecida. Não houve push da branch nesta etapa para evitar disparar publicação automática.

## Ajuste de leitura por categoria

A leitura contínua de Tributário agora contém somente os blocos da categoria selecionada. Direito Tributário Normativo não carrega junto os materiais dos grupos específicos. As outras categorias permanecem acessíveis na biblioteca; registros ambíguos abrem isoladamente. Títulos de seções, IDs de documentos e marcações foram preservados. As demais disciplinas mantêm seu fluxo anterior. Verificação:34 testes aprovados e revisão independente sem apontamentos; prévia local normativa conferida com os18 assuntos classificados no grupo10.
