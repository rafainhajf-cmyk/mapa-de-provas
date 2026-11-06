# Mapa de Provas — padrão permanente de conteúdo

Estas instruções se aplicam a todo material, anotação e exercício enviado ao chat deste projeto e a qualquer alteração no site existente.

## Antes de editar e publicar
- Investigue a interface publicada e o catálogo efetivo do build. A publicação usa `source-content/`, preparada por `scripts/build.mjs`.
- Faça backup da revisão atual. Preserve IDs, fontes, texto integral, anotações, marcações, flashcards, histórico e funcionalidades.
- Nunca considerar publicação concluída apenas por estar Ready: abra o resultado e confira visualmente a mudança.

## Formato de estudo obrigatório
- Organize por conceitos teóricos; nomes de PDFs e números de páginas são referências, não a organização principal.
- Use quadros comparativos para conceitos semelhantes, lado a lado, mantendo a diferença que resolve a questão.
- Use fluxogramas para processos, regras condicionais, decisões e exceções; linhas do tempo para prazos e sequências temporais.
- Verde: regra permitida ou correta. Vermelho: proibição ou pegadinha. Amarelo: exceção, condição ou cuidado. Cor deve vir acompanhada de texto, nunca ser a única informação.
- Destaque fórmulas e inclua exemplos resolvidos quando pertinentes.
- Mantenha explicações extensas e fontes em “Ver explicação detalhada”. A revisão principal deve funcionar sem abrir esses detalhes.
- Não transformar OCR em tabela de trechos/páginas e chamar isso de esquema. Não acrescentar quadros genéricos do tipo “identifique a regra” como substitutos do conteúdo.
- Não inventar comparação, exceção, sequência ou conclusão ausente da fonte. Marque conteúdo incompleto como pendente de esquematização/revisão.
- Separar conformidade visual de validação factual/jurídica. Não usar verde para certificar texto ainda não conferido. Questões jurídicas: conferir fonte oficial e legislação da data da prova; indicar mudanças posteriores.

## Listas de exercícios do TEC
- Primeiro extrair o inventário/planilha de todas as questões e IDs, evitando duplicação. Aguardar a ordem do usuário para continuar a análise, conforme o fluxo já definido.
- Depois da autorização, ler enunciado e todas as alternativas; conferir o gabarito; apresentar informação necessária para resolver, esquema conceitual, pegadinha e resolução recolhida.
- Manter enunciado e alternativas completos; resposta/gabarito não devem aparecer antes da tentativa.

## Garantias de implementação
- Reutilizar os blocos visuais de `source-content/review-blocks.js` e os estilos compartilhados quando aplicáveis.
- Executar build, testes e auditoria visual. Conteúdo sem material não conta como esquema pronto; transcrição/OCR não conta como revisão teórica.
- Não prometer ingestão ou publicação automática em segundo plano: a aplicação deste padrão ocorre ao atender o envio e executar o trabalho autorizado no chat.

## Trabalho conjunto ChatGPT e Claude (regras de 2026-11-06)
- A planilha "Mapa de Provas — Controle Incremental de Questões e Esquemas" (aba "Regras de publicação", regras 10 a 12) e este repositório são o registro comum. Antes de começar, leia a planilha e o `git log`; ao terminar, registre status, origem e observação com o nome de quem fez, e faça commit descrito.
- Questão sem alternativa compatível (ex.: 1936754, 3539089, 3975996): manter como pendente com ressalva, nunca como resolução definitiva, até o usuário conferir o enunciado original no TEC. Registrar conclusão técnica e motivo sem alterar os números do enunciado para forçar uma letra.
- Divergência entre a conclusão técnica e o gabarito do PDF (ex.: 3385428): manter ID, enunciado e letra original, explicar a divergência na resolução e citar fonte primária, sem inventar retificação oficial da banca.
- Só vai ao site o que estiver `approved`, com autorização do usuário; depois do deploy, conferir o resultado no site.
