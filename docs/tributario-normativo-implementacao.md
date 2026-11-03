# Direito Tributário Normativo — integração de 03/11/2026

## Escopo e restauração

Projeto existente rafainhajf-cmyk/mapa-de-provas, pasta efetiva source-content, build scripts/build.mjs. Backup anterior: branch backup/normativo-503-antes-02c7f79. Restaurar o commit 02c7f792e7d1d5f836cbfc86056f04cad960adaf por novo commit de reversão e redeploy permite recuperar a versão anterior. Nenhuma migração de banco foi executada. Login iron-session e armazenamento privado Vercel Blob permanecem existentes.

As 11 abas foram congeladas integralmente em data-sources/tributario-normativo/snapshot.json.gz.base64 (JSON UTF-8, gzip, base64). O importador lê esse snapshot e gera normativo-data.json no build, sem alterar a planilha, data.json, catálogos antigos ou dados pessoais. Identificadores TEC e P- são preservados; agrupamento determinístico por título normalizado mantém aliases e variantes. Esse agrupamento não resolve todas as equivalências semânticas.

## Entrega implementada

Rota normativo.html integrada à navegação e à Análise de Provas; 503 questões únicas (328 originais + 175 complementares), 301 pontos integrais e 18 tópicos. Áreas complementares independentes para IPVA, ITCMD, ITBI, ISSQN e Reforma. Busca por conceito/ID, origem, evidência e frequência documental provisória; paginação; enunciado antes de gabarito recolhido; notas e marcações nos stores sincronizados já existentes, com namespace normativo:. A importação não escreve no localStorage e não remove registros anteriores.

Quatro quadros próprios com comparações, fluxos, cores semânticas e fontes: gênero/espécie; base do IR; solidariedade/art.134; efeitos sobre o crédito. Conferência pontual do CTN compilado no Planalto, Receita Federal e compilação Câmara/Senado. Dois IDs receberam auditoria direta: 3023153 (alternativa E) e 790682 (C). Os demais vínculos não são promovidos automaticamente a cobrança comprovada. A fonte oficial atual registra LC236/2026: redação histórica permanece separada e não é substituída silenciosamente.

## Pendências explícitas

A entrega não conclui a auditoria jurídica integral de 503 questões, nem a transformação visual de todos os núcleos. Os 412 fragmentos REG e vínculos legados exigem exame individual do enunciado/alternativa correta; contagens da planilha são provisórias. Alguns textos possuem falhas de extração. Os textos completos originais permanecem acessíveis. Muitas regras dos tópicos 8–12 só estavam nas resoluções; foram preservadas como núcleos candidatos. Sinônimos não triviais ainda precisam de consolidação humana com preservação de condições e exceções.

Não são certificados todos os gabaritos históricos, todas as alterações posteriores, jurisprudência ou frequências. O frontend identifica esses limites para não apresentar OCR ou fragmentos como esquemas concluídos.

## Validação técnica

Build e 28 testes automatizados aprovados: integridade e idempotência, 301 pontos completos/aliases, referências aos 18 tópicos, áreas independentes, exclusão de inferência automática de incidência, manifesto offline prioritário, preservação dos stores e demais testes de autenticação, sincronização, contabilidade, apostila e Macroeconomia/IS-LM. O manifesto inclui o módulo e dependências antes do limite de PDFs. Testes de dispositivos físicos, sincronização real entre dispositivos e desconexão real não são substituídos por esses testes de código.


## Cruzamento com Literalidade DT — segunda etapa

Backup adicional: backup/normativo-antes-cruzamento-dt-0079f12, commit 0079f1214cd7fb4e56a20ed1e7689f47c1e623d4. Os oito PDFs DT01 a DT08, edição de 26/09/2026, foram acessados pelo Drive. O texto licenciado foi processado em diretório privado fora do repositório e não foi incorporado ao site. São publicados somente metadados, títulos/seções e referências candidatas, além de sínteses próprias sobre conceitos legais.

O script cross-normativo-dt.mjs gera um registro para cada um dos 503 IDs. Versão refinada: 307 com localização textual candidata e 196 sem correspondência específica suficiente/fora da cobertura do DT geral. Isso NÃO significa 307 questões auditadas. A busca usa resolução, conhecimentos e assunto, sem calcular frequência a partir de alternativas erradas. Sigilo bancário da LC105, LTE e LC123 não são artificialmente vinculados ao DT geral.

Foram adicionados 31 esquemas próprios (35 no total), incluindo quadros reais, processos condicionais, timelines de certidão/PAF e alertas temporais para LC236/2026. A visão inicial mostra os esquemas; os 847 núcleos e textos originais ficam em opção própria, preservados. Fontes DT01–08 disponíveis na tela; cada questão mostra o estado da localização assistida. O material de 2026 não substitui automaticamente a legislação histórica da prova.

Conferências pontuais registradas em reviewed-bindings.json: 15 questões, incluindo as duas anteriores. Os 13 acréscimos tiveram enunciado, alternativas, gabarito e resolução examinados. Cada registro contém núcleo decisivo, fundamento, exclusão de menções não decisivas e limitação temporal. A data/edital nem sempre estão disponíveis; portanto não constituem auditoria histórica integral. Restam 488 questões sem essa conferência individual registrada. O texto da planilha e os 301 pontos continuam integrais.

Build e 30 testes automatizados passaram após o cruzamento, incluindo integridade dos 503 IDs, distinção candidato/conferido, manutenção dos 301 pontos, armazenamento e dependência offline do novo módulo de esquemas. Não foram certificados dispositivos físicos nem a navegação realmente desconectada. A verificação visual pós-deploy deve registrar as visões novas, fontes DT e persistência.


## Retomada de 03/11/2026 — lote inicial

Backup local `backup/normativo-retomada-d4169cb`, anterior a esta alteração. PDF `3.pdf` recuperado e páginas 2–3 lidas integralmente, com identificação dos anos das provas. Acrescentadas quatro conferências: 734450 (C, 2018), 3112998 (D, 2024), 3233108 (D, 2024), 719764 (E, 2018). Fontes oficiais: Informativo STF 750 (ADI 800, julgamento em 2014), CTN na publicação oficial do Senado. O acesso direto ao Planalto foi bloqueado; não foi tratado como consulta bem-sucedida.

A separação de b/c da 3112998 foi corrigida apenas na projeção de exibição, a partir do PDF; o snapshot e `raw` permanecem íntegros. Dois quadros adicionais sobre natureza do tributo e pedágio; vínculo de 719764 no quadro de taxas. Total: 19 conferências individuais, 37 esquemas e 484 questões ainda pendentes. Não confundir esta contagem com auditoria integral da legislação histórica ou dos PDFs restantes. Nenhum banco de dados ou informação pessoal alterado.

## Continuação — 41 novas conferências, total de 60

Estado preparado localmente em 03/11/2026: 60 IDs com conferência individual, 443 pendentes, 45 esquemas. As 41 novas conferências estão discriminadas em `reviewed-bindings.json`, com arquivo, páginas (inclusive continuações), ano, núcleo decisivo, fonte oficial, ressalvas e seções DT efetivamente consultadas. Os volumes DT01 e DT02 foram relidos pelo Drive; suas transcrições e dados de licenciamento não foram adicionados ao repositório.

Páginas consultadas nesta continuação: `3.pdf`, 4–8; `4.pdf`, 5–8; `Caderno [União] Tributário.pdf`, 5–9. As páginas 2–3 de `3.pdf`, já lidas na retomada anterior, também embasam os novos registros 684685 e 638588. Não foram criadas alternativas inexistentes: 3113014 tem quatro alternativas no PDF. O snapshot comprimido e todos os campos `raw` foram preservados.

Acrescentados oito esquemas: conceito de tributo; empréstimo compulsório; competências das contribuições; COSIP e mudanças temporais; Tema 1282 dos bombeiros; princípios da EC132; isonomia; controle da base das taxas. Os quadros existentes de taxas, natureza, espécies, melhoria e anterioridades receberam vínculos adicionais. O exemplo numérico da melhoria distingue teto global e individual sem tratar 90% como percentual universal.

Ressalvas relevantes:
- 2235806: C permanece como gabarito do PDF; B resulta na mesma data concreta de exigibilidade. Sobreposição registrada, sem certificação de univocidade.
- 3670614: mérito do Tema 1282 em 26/03/2025, publicação em 29/05/2025 e trânsito em 03/09/2025; ainda falta identificar a data exata da aplicação da prova.
- COSIP: separar a redação de 2021/2022 da EC132/2023 e do CTN art. 82-A incluído pela LC227/2026.
- 1994901: aplicação subnacional da EC103/2019 exige observar o regime de vigência e referendo legal; déficit atuarial não produz cobrança automática.
- 2324333: ADI3775 e modulação com efeitos a partir de 17/04/2020, anterior à prova de 2022.

Não promovidos a conferência concluída: 3764354 (classificação doutrinária e redação absoluta sobre repercussão), 2740889 (progressividade estrutural) e 2231509 (teoria do sacrifício e redação do gabarito). Os textos e gabaritos dessas questões continuam preservados e pendentes, até confronto adequado com fonte doutrinária. Não presumir que foram omitidos do inventário. Outros itens jurisprudenciais ainda pendentes incluem 3610437 e 3419867; não inferir confirmação por proximidade com os quadros de taxas.

Validação final desta etapa: build concluído; 33 testes aprovados, incluindo todos os 503 IDs únicos, 301 pontos integrais, correspondência entre os 60 registros e esquemas, quatro alternativas na 3113014, ausência de duplicação dos registros e preservação das ressalvas. A interface preparada exibe contagem real de conferidos/pendentes, ano da prova e fonte/páginas da conferência. O navegador de QA não alcançou o servidor local (`ERR_CONNECTION_REFUSED`); nenhuma auditoria visual desta versão é afirmada.

Publicação permanece pendente. A tentativa anterior de enviar ao GitHub foi rejeitada pela revisão automática por ausência de autorização suficientemente explícita para envio à branch `main` e publicação externa. Nenhuma alternativa de envio/deploy foi usada para contornar a rejeição. O site em produção ainda deve ser tratado como a revisão anterior `d4169cb` até confirmação de publicação autorizada. Backup local anterior a esta continuação: `backup/normativo-antes-lote-20-1270103`.

## Publicação autorizada e continuação até 100 conferências

O usuário autorizou expressamente o envio à branch principal e a publicação no Vercel, e determinou a continuação. O envio por Git CLI encontrou ausência de credencial de escrita; usou-se então a conexão GitHub já autorizada. Não houve nova rejeição de aprovação. Backup remoto: `backup/normativo-antes-publicacao-60-d4169cb`. O commit publicado `66fb1868cf82f7fc37565bfd370d090eb3bc980f` tem a mesma árvore do checkpoint local de 60 questões e 45 esquemas (`4b406a4e63f37bf9cc1ba72650838863101c5018`). Vercel: produção `dpl_DEik1ZKgsbvZg1MRVhZt6XJumkva`, READY, alias `mapa-de-provas.vercel.app`. Navegação real conferiu 60 registros/443 pendentes, o novo quadro de bases das taxas e as cinco opções corrigidas da 3112998 com gabarito recolhido.

Na continuação foram conferidos outros 40 IDs, totalizando 100 conferências individuais e 403 pendentes, agora em 56 esquemas. Os registros discriminam páginas 9–16 do `3.pdf`, páginas 6–7 do `4.pdf` e páginas 9–11 do `Caderno [União] Tributário.pdf`, com leitura de continuidades. Seções dos volumes DT02 e DT03 foram consultadas novamente. Sem reprodução dos volumes ou dados de licenciamento no repositório.

Precisões desta etapa:
- 719259: PDF imprime D; o registro consolidado C/D permanece e a ressalva de unicidade foi explicitada. A interface distingue gabarito impresso de registro consolidado, sem declarar anulação não comprovada.
- 644493: B impresso preservado; art.151, II, exige paridade de níveis, não imunidade absoluta da renda de títulos estaduais. Ressalva sobre a leitura genérica de C registrada.
- 1147520: A precisa das exceções expressas do art.62, §2º; não generalizar a todas as MPs de impostos. Tema382 é distinguido de supressão genérica de créditos/benefícios.
- 2041802: matriz I–IV foi separada nas cinco alternativas por conferência do PDF, sem modificar `raw` ou snapshot.
- 1037325: emenda de 1993 versus efeitos da eliminação do IVVC em 01/01/1996. Resolução de exibição corrigida; resolução original preservada no `raw`.
- 3079706: comando INCORRETA; Tema217 não exige visita individual a cada contribuinte. Tema1282 de 2025 é atualização posterior à prova de 2024.
- 3419867: validade em tese de parâmetro ambiental não equivale à constitucionalidade do montante desproporcional examinado na ADI5489.

Validação: build e 34 testes aprovados, incluindo integração dos 100 registros, 56 esquemas, 503 IDs únicos, 301 pontos integrais, preservação de originais e distinção de gabarito impresso/consolidado. Nenhum banco ou dado pessoal foi alterado. Permanecem pendentes as 403 questões sem conferência individual registrada; não confundir o contador com auditoria histórica integral dos gabaritos.


### Continuação — 104 questões / 59 esquemas
- Conferidos integralmente no 4.pdf:3685889(p.9),3127523(p.9–10),3228225 e3670605(p.11).
- Fontes: STF SV19/SV29, Tema224; distratores de3685889 confrontados com Temas328,674,385 eSV57. Nenhuma incidência adicional inferida dos distratores.
- Acrescentado comparativo conceitual da imunidade do sucessor e dívida anterior. Referências DT vazias neste lote: não registrar leitura não realizada.
- Backup local preservado em backup/normativo-100-local; publicação anterior100 validada em produção (4e660e6).


### Continuação —116 questões e67 esquemas
- Conferência integral de12 questões no4.pdf,p.11–14; IDs:1768958,1147537,373725,263610,3228235,2390139,292038,218247,3248385,3127440,2022752,1768972.
- Corrigida exibição da263610: PDF D, consolidado B, comentário deslocado de outra questão. Preservados snapshot,raw eanswer original; gabarito documental e resolução correta explícitos nos detalhes. Knowledge e fundamento também substituídos somente na exibição.
- Apoio DT04:03.5,08.4,08.5,09.3; DT05:05.4,06.3,07.4,07.5,09.2,09.6,09.7. Edição2026 separada dos gabaritos históricos.
- Fontes oficiais STJ: Súmulas112,360,399,430,436,585,653; Temas103,122,480,649,980,1118; REsp646328/RS,AgRg noREsp1297954/MG. STF: Tema13.
- Ressalvas: Tema1118 posterior à prova2021; fiança como hipótese autônoma em2026 não equivale a depósito na prova2014; cumulação de multas exige identidade e absorção; remissão considera ordem de conversão.
- Backup local backup/normativo-104-local; base remota b13ff7c.
