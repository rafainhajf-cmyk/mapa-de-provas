# Backup integral dos flashcards — desenho para aprovação

Objetivo: arquivo portátil com cartões originais, mídias e revisões, restaurável sem perder trabalho já existente. O backup de revisões atual permanece compatível.

## Interface
Adicionar “Baixar backup completo” e “Restaurar backup completo” na página Flashcards. Antes da restauração, apresentar quantidade de cartões, mídias e revisões, quantos são novos e quantos conflitam. Aplicar somente após confirmação dessa prévia. Não tratar importar arquivo como autorização para substituir dados.

## Formato e integridade
Arquivo JSON versionado, contendo data, cartões por ID, mídias com nome original/namespace, MIME, conteúdo binário codificado e resumo SHA-256, e revisões por ID. Preservar HTML original dos cartões, IDs e vínculo sourceFile da mídia. Validar formato, tipos, tamanhos, unicidade e hashes antes de qualquer escrita; rejeitar arquivo inválido sem alterar dados. Não depender do carregamento de bibliotecas externas para exportar/restaurar.

## Reconciliação
Adicionar IDs ausentes. Manter registros locais quando o mesmo ID já existir; se conteúdo divergir, registrar conflito e informar que o registro local foi preservado. Não sobrescrever revisões locais automaticamente, nem excluir cartões/mídias ausentes no backup. Referências a mídias devem permanecer consistentes; conflitos de mídia não podem substituir imagens usadas por cartões existentes. Nunca limpar stores para restaurar.

## Persistência e falhas
Cartões e mídias em uma transação IndexedDB; revisões têm persistência separada no localStorage. A interface deve distinguir importação de conteúdo da restauração de revisões e reportar gravações parciais se essa segunda etapa falhar. Não prometer atomicidade entre tecnologias diferentes. Oferecer backup prévio antes de aplicar. Conferir leitura após gravação e comunicar contagens reais.

## Verificação
Testar ida e volta com HTML, imagens e bytes idênticos; IDs duplicados; arquivo malformado/hash incorreto; conflitos sem sobrescrita; falha na transação e no localStorage; revisão antiga compatível; restauração repetida sem duplicação. Testar no navegador com coleção artificial isolada, sem tocar coleção pessoal. Backup efetivo do acervo do usuário continua pendente até exportação e restauração privada verificadas.

## Limites
Não implementa sincronização automática dos baralhos nem backup do Blob ou Drive. Não publica nem muda main. Alteração funcional depende da aprovação deste desenho, conforme habilidade brainstorming.
