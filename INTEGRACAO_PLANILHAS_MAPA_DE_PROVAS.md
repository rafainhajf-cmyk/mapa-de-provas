# Integração Google Drive → Mapa de Provas

## Fontes
- Pasta: https://drive.google.com/drive/folders/1ktPq8VYJ0WKQGmAGw9p9nPuqSJA0yNM5
- Controle de questões e esquemas: https://docs.google.com/spreadsheets/d/1DoDAI1T_LYd5g-kAnrWl-3EKw05vcWk4YOVVg36g4g4/edit
- Aba editorial: **Conteúdos estruturados**.
- Site: https://mapa-de-provas.vercel.app/dificuldades.html

## Contrato compartilhado ChatGPT ↔ Claude
A planilha é o local comum para listar questões, fontes, versões e blocos editáveis. Cada matéria tem seu conjunto de registros. Os blocos devem ser JSON estruturado (parágrafos, quadros, alertas, fluxo, fórmulas e referências), nunca imagem estática.

Colunas da aba editorial: ID | Matéria | ID capítulo | Título capítulo | Título esquema | Status | Tipo | Origem | Versão | Data | Blocos JSON | Flashcards JSON | Observações.

Status aceitos: `draft` (rascunho), `approved` (aprovado), `rejected` (rejeitado). Só `approved` pode ir ao site. Identificadores e versões são estáveis.

## Procedimento obrigatório por lista do TEC ou anotação livre
1. Registrar fonte, ID da questão, disciplina, índice, data e conteúdo original.
2. Conferir os resumos e esquemas **já existentes**, inclusive conteúdo semanticamente equivalente.
3. Classificar cada item: `já coberto`, `incremental`, `comparativo`, `novo assunto` ou `a revisar`.
4. Somente gerar blocos novos onde houver complemento real. Em comparação, criar tabela com distinções normativas e hipóteses.
5. Vincular às questões e aos índices, sem perder exemplos anteriores, flashcards ou fontes.
6. Inserir na aba com status `draft`, revisar, depois marcar `approved`.
7. Exportar as linhas aprovadas como matriz JSON, rodar `node scripts/import-study-knowledge.mjs export.json` e revisar o diff de `source-content/study-knowledge.json`.
8. Executar `npm test` e `npm run build`; publicar via GitHub/Vercel depois da autorização, conferindo `READY` e acesso no site.

**No chat normal:** quando Google Drive, GitHub e Vercel estiverem conectados, a etapa de exportação/importação pode ser feita diretamente pelas integrações, atualizando `study-knowledge.json` sem invocar Work. Claude pode seguir o mesmo contrato se estiver autorizado a acessar a planilha e o repositório.

## Limites atuais
A planilha privada **não é consultada automaticamente pelo navegador**. O site lê `study-knowledge.json`, gerado a partir das linhas aprovadas. Não foi instalado um processo recorrente nem configurada credencial de servidor para o Google Sheets. A atualização acontece quando for solicitada no ChatGPT ou executada por um agente com as permissões necessárias. O código do importador evita excluir entradas que não constem no lote recebido e bloqueia IDs duplicados, estados inválidos e regressões de versão.

## Segurança e preservação
O script do site não contém credenciais do Google ou GitHub. Conteúdo da planilha é escapado antes da renderização HTML. Os resumos históricos não são regravados pela sincronização. Para novos capítulos, a integração coloca uma entrada suplementar apenas quando não há correspondência segura com assunto existente. Conteúdo não aprovado não é publicado.
