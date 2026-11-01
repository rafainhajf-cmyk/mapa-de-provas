# Diagnóstico e prévia da reorganização de Direito Tributário

Data: 01/11/2026. Base atual da main: `74b6cd80840d8fb4f6bd94fb125abd454ad220d7`. Branch local: `dev/tributario-indice-10-categorias`. Esta entrega é diagnóstico e prévia; nenhum catálogo, progresso ou ambiente de produção foi migrado.

## Resultado do diagnóstico

O índice usa arquivos JSON versionados, não uma base SQL. `source-content/dificuldades.js` carrega `difficulty-data.json` servido pelo site. `scripts/build.mjs` copia `source-content` para `private-content` e aplica atualizações selecionadas do JSON da raiz. Os dois catálogos divergem; nenhum deles sozinho representa todo o conteúdo conhecido.

O Graphify foi consultado para dependências de `source-content/dificuldades.js`. Seu índice ainda descreve `fe5256e`, anterior à main atual. As funções e dependências foram verificadas nos arquivos atuais: `subjectContentsHTML`, `libraryTopics`, `taxGroup`, `taxGroups`, `studyFileProgress` e módulos de sincronização.

Hoje a biblioteca tributária agrupa por três categorias inferidas do título/área: Reforma Tributária, LTE com Convênios e Direito Tributário. O sumário usa outra estrutura (`subjectCatalogs`). As duas navegações precisam compartilhar uma classificação explícita, evitando resultados diferentes para o mesmo assunto.

## Inventário verificável

| Fonte | Pastas de Tributário | Arquivos únicos | Achados de dificuldade | Tentativas de questões |
|---|---:|---:|---:|---:|
| JSON da raiz | 35 | 9 | 0 | 0 |
| JSON de source-content | 34 | 6 | 0 | 0 |
| União por ID | 35 | 12 | — | — |

Os 12 arquivos correspondem a dez anotações, um PDF original e uma imagem original. PDF e imagem mantêm seus IDs e vínculos com as anotações principais. Não são 12 assuntos independentes. As 35 pastas incluem raiz e agrupadores; não devem ser somadas aos arquivos para anunciar total de conteúdos.

Áreas atuais da raiz: Tributação municipal 4 pastas; Reforma 9; LTE 6; Direito Tributário 14; Comparativo tributário de leis 1; raiz 1. No source-content há oito pastas em Reforma e as mesmas quantidades nas outras áreas.

Seis arquivos existem apenas na raiz. A anotação LC 236 já é incorporada pelo build; os outros cinco (responsabilidade, competência residual/extraordinária, legislação/normas complementares, empréstimo compulsório/IEG e CTN 109/110) não são incluídos no catálogo publicado pelo build atual. Source-content contém três arquivos ausentes da raiz: anotação sobre imunidades, anotação sobre retroatividade/interpretação e sua imagem original. A migração deverá reconciliar por ID sem substituir silenciosamente versões divergentes.

A prévia integral por arquivo e pasta está em `previa-classificacao.csv`. As variantes completas, fontes, IDs e hashes estão em `inventario.json`.

## Prévia das dez categorias

| Ordem | Categoria | Registros de arquivos propostos |
|---:|---|---:|
| 01 | IPVA | 0 |
| 02 | ITCMD | 0 |
| 03 | ITBI | 0 |
| 04 | ISSQN — LC 116/2003 | 0 |
| 05 | REFORMA — LEI 236 | 1 |
| 06 | COMPARATIVO TRIBUTÁRIO | 2 |
| 07 | LC 227/2026: TEXTO LEGAL | 0 |
| 08 | RMIT — REFORMA TRIBUTÁRIA | 0 |
| 09 | NOVIDADES EXCLUSIVAS DA REFORMA TRIBUTÁRIA | 0 |
| 10 | DIREITO TRIBUTÁRIO NORMATIVO | 9 |

Os zeros significam ausência de arquivo próprio nos catálogos examinados. Existem pastas vazias de IPVA, ITCMD, ITBI, ISSQN, LC 227 e Imposto Seletivo. Existem também trechos sobre vários tributos e novidades na apostila comparativa: manter seu registro principal e criar referências aos trechos, sem copiar conteúdo nem presumir análise integral das fontes remotas. Comparações internas ao CTN continuam no Normativo; não são comparações entre regime anterior e Reforma.

## Ambiguidades que exigem conferência

- LC 236/2026: a numeração existe, de 4/9/2026, sobre consensualidade, controvérsias e processo administrativo tributário e aduaneiro, com alterações no CTN. Manter a categoria pedida e o título original; apresentar descrição oficial em metadados, sem renomear o material automaticamente. A nota atual admite que é transcrição de uma página de material de estudo, sem conferência integral.
- LC 227/2026: numeração confirmada, de 13/1/2026, relativa ao CGIBS, processo administrativo do IBS, distribuição da arrecadação e normas gerais de ITCMD, entre outros dispositivos. A pasta existe, mas não contém arquivo no catálogo. Não inventar texto legal ou versão normativa.
- RMIT: nenhum registro próprio nem ocorrência exata de RMIT/regra-matriz nas anotações de source-content foi localizado. Não foi concluída inspeção integral dos PDFs, Drive remoto e dados privados. A categoria será mantida com indicação de material ainda não localizado; não declarar material preservado sem identificá-lo.
- Pastas amplas IBS e CBS, EC 132/transição, direitos e garantias, LTE e legislação estadual do Ceará permanecem sinalizadas na prévia, sem mudança automática. Pastas agrupadoras não devem virar assuntos duplicados.
- Apostila comparativa contém várias espécies de conteúdo. Manter um principal e referências de seção nas categorias pertinentes. A localização e classificação dessas seções requer conferência antes da migração.

Referências oficiais consultadas em 01/11/2026:

- LC 236: https://www2.camara.leg.br/legin/fed/leicom/2026/leicomplementar-236-4-setembro-2026-799905-norma-pl.html
- LC 227: https://www2.camara.leg.br/legin/fed/leicom/2026/leicomplementar-227-13-janeiro-2026-798657-norma-pl.html

## Backup e reversão

Backup local criado em `../backup-tributario-2026-11-01/fontes-versionadas.zip`, fora do repositório. O manifesto registra caminho, tamanho e SHA-256 dos 398 arquivos versionados. Todos os bytes foram relidos do ZIP e comparados; os dois JSONs foram restaurados em memória e comparados integralmente. Isso verifica recuperação dos arquivos locais, não recuperação de toda a produção.

Não foi realizado backup de perfis privados no Vercel Blob, arquivos remotos do Drive, localStorage nem IndexedDB. Portanto não há ainda backup integral de todas as fontes reais. A próxima etapa precisa exportar os dados do navegador/perfil conectado no ambiente de teste e confirmar o alcance antes de qualquer escrita real.

Progresso e críticos: `mapa-study-progress-v1`, com chaves de seção formadas por ID do arquivo, título normalizado e ocorrência. Preservar títulos dos blocos, IDs e ordem das ocorrências, não apenas o ID principal. Observações, textos editados, favoritos e leitor tributário usam outras chaves listadas em `study-sync-core.js`. A caixa de anexos usa IndexedDB `mapa-study-inbox-v1`, objectStore `entries`, e não é sincronizada com o Blob. O importador atual da caixa gera novos IDs; não serve como restauração fiel sem adaptação específica. O armazenamento remoto de sincronização é Vercel Blob privado, com merge por registro e ETag; nenhum perfil foi lido ou alterado nesta etapa.

Proposta de reversão: manter os arquivos de dados originais imutáveis; adicionar somente um mapa de categorias e etiquetas por ID, versionado. Desativar o mapa recupera a navegação anterior. Eventuais metadados pessoais terão namespace separado e exportação anterior; rollback não deve apagar edições posteriores nem restaurar snapshots globais sobre trabalho novo.

## Desenho proposto para aprovação

Recomendação: um mapa explícito de classificação tributária compartilhado pelo sumário e biblioteca, sobre a união validada dos dois catálogos. Preservar arquivos, notas e anexos completos; divergências mantêm ambas as variantes no backup e exigem decisão explícita. Não mover arquivos no Drive. Criar as dez categorias exatamente na ordem solicitada; categoria principal única e etiquetas/referências de seção para usos secundários. Registros ambíguos conservam acesso original e recebem aviso de conferência.

Alternativa de apenas trocar os títulos dos três grupos é insuficiente: não resolve divergência de fontes, edição manual ou referências cruzadas. Substituir toda a persistência por banco novo amplia risco e não é necessário para o objetivo.

Contadores distinguem assuntos, arquivos e marcações. Concluído/em andamento dependem de seções realmente existentes e marcas já registradas. Ausência de avaliação não significa dificuldade nem revisão pendente. Não criar datas ou históricos; quando não houver evidência, exibir ausência de registro. A semântica de revisão pendente precisa usar algum estado real identificável; caso não exista, indicar isso sem fabricar dados.

A edição manual altera somente categoria/etiquetas, preservando ID, conteúdo e histórico. Busca inclui texto integral já disponível, títulos, legislação e artigos. Tabelas usam rolagem horizontal contida no celular/tablet. Outras disciplinas mantêm navegação e dados atuais.

## Sequência de implementação após aprovação

1. Confirmar inventário, prévia e ambiguidades com o usuário; completar localização do RMIT e proteção dos dados privados relevantes.
2. Conciliar somente Tributário no build por ID com validação de variantes; não substituir o JSON global inteiro nem afetar outras matérias.
3. Criar mapa das dez categorias com versão, origem, confiança e referências; migração idempotente com dry-run e comparação de IDs/hashes.
4. Integrar sumário e biblioteca; filtros, contadores e busca tributários; edição manual de categoria/etiquetas com persistência compatível.
5. Testar repetição, interrupção/retomada, rollback, integridade de conteúdo/links/anexos, títulos de seção e progresso; regressão das outras matérias; cenários de dois dispositivos para os metadados novos.
6. Conferir computador/tablet/offline no ambiente de teste. A auditoria profunda de sincronização/offline continua como etapa separada, salvo correção indispensável à segurança.
7. Apresentar resultados e pedir aprovação separada para publicação na Vercel. Nenhum deploy automático nesta fase.

## Limites da entrega atual

Não houve implementação, migração, publicação, leitura do perfil Blob nem verificação de progresso real por dispositivo. As contagens são dos arquivos versionados locais na base indicada. A prévia é uma proposta auditável, não prova de classificação de todos os trechos dos materiais remotos. Somente artefatos de diagnóstico foram criados na branch local.
