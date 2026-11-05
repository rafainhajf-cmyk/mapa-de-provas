# Atualização do Mapa de Provas pelo ChatGPT normal

## Objetivo
Manter a interface existente do Mapa de Provas no Mac e tablet Android sem exigir ChatGPT Work para cada inclusão, correção ou revisão de conteúdo.

## Infraestrutura verificada em 04/11/2026
- Repositório: `rafainhajf-cmyk/mapa-de-provas`.
- Produção Vercel: projeto `mapa-de-provas`; deploys de `main`.
- Conteúdo publicado: compilado de `source-content/` para `private-content/` pelo `scripts/build.mjs`.
- Testes existentes: `npm test`.
- Sincronização de dados pessoais entre dispositivos: `lib/study-sync.mjs` e `source-content/study-sync.js` usando Vercel Blob e um código de conexão. **Não confundir progresso pessoal com a base editorial publicada.**
- O repositório contém também arquivos legados na raiz; para conteúdos exibidos no site, deve-se confirmar o arquivo efetivamente lido em `source-content/` antes de editar.

## Fluxo pelo chat normal
1. Usuário conclui uma lista do TEC ou envia material.
2. ChatGPT apresenta um esquema editável em prévia, com matéria, assunto, fundamentos, pegadinhas, exemplos, fonte e identificação estável.
3. Usuário autoriza a inclusão.
4. ChatGPT lê o arquivo-fonte atual no GitHub e identifica a estrutura e os IDs existentes.
5. ChatGPT altera somente os dados correspondentes na fonte real, mantendo tópicos anteriores, notas, referências e outros campos; faz deduplicação por ID e assunto.
6. Quando possível, usa uma branch de revisão e abre PR com a diferença. Executa/verifica os testes antes de mesclar.
7. A alteração aprovada é mesclada em `main`, de onde a Vercel gera o deploy. Verificar se o deployment ficou `READY` e se o conteúdo apareceu no site.
8. Mac e tablet acessam o mesmo endereço hospedado; não é exigido modo offline.

## Regras de segurança
- Não modificar `main` nem publicar sem autorização para aquele lote.
- Não trocar domínio, autenticação, base editorial nem sincronização sem verificar compatibilidade.
- Não substituir arquivos JSON completos por uma seleção parcial de conteúdos.
- Não expor senha, token ou código de conexão em commits, arquivos de conteúdo ou mensagens.
- Se testes não puderem ser executados, registrar explicitamente essa limitação e não presumir aprovação técnica.
- Registrar em cada lote a fonte e os IDs afetados, incluindo questões TEC quando disponíveis.

## Primeira validação
Este arquivo foi criado em uma branch de revisão exclusivamente pelo chat normal, usando a integração GitHub. Não modifica a interface nem os dados do site. Serve para comprovar a permissão de escrita sem Work; a primeira atualização efetiva de conteúdo seguirá o fluxo acima.
