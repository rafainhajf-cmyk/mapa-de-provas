import {dtGuides} from './normativo-dt-guides.js';
// Revisão pontual: textos próprios. As variantes históricas permanecem nos dados-fonte.
const table=(title,rows)=>({type:'table',title,rows});
const flow=(title,steps)=>({type:'flowchart',title,steps});
const call=(kind,title,text)=>({type:'callout',kind,title,text});
const ctn='https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm';
const resumedGuides=[
 {id:'guia-natureza',topic:'01 Definição e espécies',title:'Natureza do tributo: fato gerador × nome × destinação',law:'CTN, arts. 3º e 4º; CF, arts. 148 e 149',confirmed:['3112998','3233108','719267','2740888'],blocks:[
 table('O recorte da pergunta importa',[['Critério','Literalidade do CTN','Cuidado constitucional'],['Fato gerador','Determina a natureza específica','Identificar a hipótese real da cobrança'],['Nome escolhido pela lei','Não determina a espécie','Chamar imposto de taxa não o transforma'],['Destinação da arrecadação','Irrelevante no art. 4º, II','Finalidade importa às contribuições especiais e empréstimos compulsórios'],['Atividade de cobrança','Plenamente vinculada','A palavra discricionária torna falsa a definição do art. 3º']]),
 call('danger','Pegadinhas dos itens','Não trocar atividade plenamente vinculada por vinculada ou discricionária. No item II da TEC 3233108, dentre outras formas contraria o critério literal pedido.'),
 {type:'detail',title:'Ver explicação detalhada',blocks:[{type:'paragraph',text:'O quadro distingue o critério do CTN da classificação constitucional completa. A ressalva finalística não torna a destinação correta quando a questão exige expressamente o art. 4º.'}]} ]},
 {id:'guia-pedagio',topic:'01 Definição e espécies',title:'Pedágio de rodovia concedida × taxa',law:'STF, ADI 800; CTN, art. 3º; CF, art. 150, V',confirmed:['734450'],source:'https://www.stf.jus.br/arquivo/informativo/documento/informativo750.htm',blocks:[
 table('O fato de a estrada ser pública não resolve sozinho',[['Ponto','Pedágio pelo uso efetivo','Taxa'],['Natureza','Preço público','Tributo'],['Cobrança','Relacionada ao uso efetivo da rodovia','Obrigação tributária compulsória na hipótese legal'],['Fundamento','Regime de remuneração do uso da via','Poder de polícia ou serviço específico e divisível']]),
 flow('Como classificar o caso',[{label:'Rodovia concedida e uso efetivo',text:'A remuneração descrita é preço público.',kind:'success'},{label:'Evite a troca pela taxa',text:'Finalidade pública e estrada pública não bastam para criar natureza tributária.',kind:'danger'},{label:'Cuidado com o precedente histórico',text:'O antigo selo-pedágio tinha outra estrutura; não generalizar sua classificação.',kind:'warning'}]),
 call('warning','Via alternativa gratuita','A ADI 800 não exige uma via alternativa gratuita como condição constitucional da cobrança de pedágio.') ]}
].map(g=>({...g,source:g.source||ctn,checkedAt:'2026-11-03',evidence:'Cobrança comprovada nos IDs indicados'}));
const initialGuides=[
 {id:'guia-especies',topic:'01 Definição e espécies',title:'Tributo e imposto: gênero, espécie e fato gerador',law:'CTN, arts. 3º, 5º e 16; CF, arts. 145, 148 e 149',confirmed:['3023153','3822135','638588'],blocks:[call('rule','Regra central','Tributo é o gênero. Imposto é uma espécie: seu fato gerador independe de atuação estatal específica relativa ao contribuinte.'),table('O elemento que diferencia',[['Conceito','Critério','Exemplo'],['Tributo','Prestação compulsória instituída por lei; não é sanção por ilícito','Gênero das espécies tributárias'],['Imposto','Situação independente de atuação estatal individualizada','Imposto de renda'],['Taxa','Poder de polícia ou serviço específico e divisível','Coleta domiciliar de lixo']]),flow('Como resolver a questão 3023153',[{label:'Verifique a hierarquia',text:'Tributo → gênero; imposto → espécie.',kind:'success'},{label:'Examine o fato gerador',text:'A definição de imposto não pode ser trocada pela de taxa.',kind:'warning'},{label:'Confira o exemplo',text:'IR confirma imposto; taxa de coleta de lixo não é exemplo de imposto.',kind:'danger'}]),call('warning','Incidência auditada','TEC 3023153: a alternativa E exige hierarquia e conceito de imposto. A regra de taxa, isoladamente, não recebe incidência comprovada por aparecer em distrator.')]},
 {id:'guia-ir',topic:'Outros complementares',title:'IR: modalidades da base de cálculo',law:'CTN, art. 44',confirmed:['790682'],blocks:[call('rule','Regra central','A base do IR pode ser real, arbitrada ou presumida; deve se referir à renda ou aos proventos tributáveis.'),table('Termos que resolvem a questão',[['Admitido','Não corresponde ao art. 44'],['Real, arbitrado ou presumido','Incluir modalidade “ficta”'],['Renda e proventos tributáveis','Incluir valores não tributáveis na definição'],['Arbitramento previsto em lei','Excluir arbitramento em qualquer hipótese']]),flow('Teste da alternativa',[{label:'Modalidade legal?',text:'Real, arbitrada ou presumida.',kind:'success'},{label:'Objeto tributável?',text:'Renda/proventos tributáveis: os dois requisitos devem estar corretos.',kind:'warning'},{label:'Resultado no TEC 790682',text:'Alternativa C. Os outros rótulos da extração não são cobranças independentes.',kind:'success'}])]},
 {id:'guia-solidariedade',topic:'07 Obrigação e sujeição',title:'Solidariedade geral × responsabilidade de terceiros',law:'CTN, arts. 124 e 134',confirmed:[],blocks:[call('rule','Regra central','A solidariedade do art. 124 não admite benefício de ordem. O art. 134 exige impossibilidade de cobrança do contribuinte e intervenção ou omissão do terceiro.'),table('Não confundir hipóteses',[['Ponto','Art. 124','Art. 134'],['Vínculo','Interesse comum no fato gerador ou designação legal','Terceiro legalmente enumerado'],['Ordem da cobrança','Sem benefício de ordem','Impossibilidade de exigir do contribuinte'],['Condição adicional','Enquadramento na hipótese legal','Ato em que interveio ou omissão pela qual responde'],['Penalidades','Examinar o regime da hipótese','Somente penalidades moratórias']]),flow('Responsabilidade do art. 134',[{label:'Contribuinte pode cumprir?',text:'Se possível exigir dele, não se preenche a condição inicial do art. 134.',kind:'warning'},{label:'Terceiro está na lista legal?',text:'A responsabilidade não decorre só do parentesco ou do cargo.',kind:'warning'},{label:'Houve intervenção ou omissão relevante?',text:'Exigir o nexo previsto no dispositivo.',kind:'success'}]),call('danger','Pegadinha','Não transferir automaticamente a ausência de benefício de ordem do art. 124 para toda hipótese de responsabilidade de terceiros.')]},
 {id:'guia-credito',topic:'11 Suspensão e exclusão',title:'Suspensão × extinção × exclusão do crédito',law:'CTN, arts. 151, 156 e 175. Conferência temporal obrigatória.',confirmed:[],blocks:[table('Efeitos distintos',[['Instituto','O que ocorre','Exemplos'],['Suspensão','Paralisa a exigibilidade','Depósito integral; moratória; parcelamento'],['Extinção','Encerra o crédito na hipótese legal','Pagamento; compensação; remissão'],['Exclusão','Isenção ou anistia, no regime do CTN','Isenção não é remissão; anistia não é pagamento']]),flow('Qual é o efeito da medida?',[{label:'A cobrança fica temporariamente impedida?',text:'Examinar as hipóteses do art. 151.',kind:'warning'},{label:'O crédito se encerra?',text:'Examinar o art. 156 e as condições da modalidade.',kind:'success'},{label:'Há isenção ou anistia?',text:'Examinar exclusão e seus limites; não presumir dispensa de deveres acessórios.',kind:'warning'}]),call('danger','Pegadinha','Depósito integral suspende; conversão do depósito em renda extingue. Remissão alcança crédito; anistia refere-se a infrações nos limites legais.'),call('warning','Legislação da prova × atualização','A compilação oficial registra alterações da LC 236/2026 nos arts. 151 e 156. Este quadro não enumera todas as hipóteses atuais. A resposta histórica de cada prova permanece separada e demanda conferência da vigência.') ]}
].map(g=>({...g,source:ctn,checkedAt:'2026-11-03',evidence:g.confirmed.length?'Cobrança comprovada nos IDs indicados':'Complemento teórico; frequência não certificada'}));

const continuationGuides=[
  {
    "id": "lote-emprestimo",
    "title": "Empréstimo compulsório: calamidade × investimento urgente",
    "topic": "01 Definição e espécies",
    "law": "CF, arts. 148 e 150, §1º",
    "confirmed": [
      "2163520",
      "3846938"
    ],
    "blocks": [
      {
        "type": "callout",
        "kind": "rule",
        "title": "Quem institui e como",
        "text": "Somente a União, por lei complementar. A arrecadação fica vinculada à despesa que justificou o empréstimo."
      },
      {
        "type": "table",
        "title": "A urgência não produz o mesmo regime",
        "rows": [
          [
            "Ponto",
            "Art. 148, I",
            "Art. 148, II"
          ],
          [
            "Hipótese",
            "Despesa extraordinária: calamidade, guerra externa ou iminência",
            "Investimento público urgente e de relevante interesse nacional"
          ],
          [
            "Anterioridade anual",
            "Dispensada",
            "Exigida"
          ],
          [
            "Noventena",
            "Dispensada",
            "Exigida"
          ],
          [
            "Lei complementar",
            "Obrigatória",
            "Obrigatória"
          ]
        ]
      },
      {
        "type": "flowchart",
        "title": "Decisão para a cobrança",
        "steps": [
          {
            "label": "Qual hipótese?",
            "text": "Calamidade/guerra: inciso I. Investimento: inciso II.",
            "kind": "neutral"
          },
          {
            "label": "Há lei complementar válida?",
            "text": "Decreto ou medida provisória não substituem a lei complementar.",
            "kind": "warning"
          },
          {
            "label": "Aplique a espera correspondente",
            "text": "Inciso I dispensa as duas anterioridades; inciso II respeita ambas.",
            "kind": "success"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Pegadinha",
        "text": "Urgência, calamidade ou publicação no Diário Oficial não dispensam o veículo legislativo exigido."
      }
    ],
    "source": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!tit6_cap1",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; consultar ressalvas históricas nas questões",
    "dt": [
      1,
      "05.2"
    ]
  },
  {
    "id": "lote-contribuicoes",
    "title": "Contribuições especiais: quem pode instituir cada uma",
    "topic": "01 Definição e espécies",
    "law": "CF, arts. 149 e 149-A; EC 103/2019, art. 36",
    "confirmed": [
      "1994901",
      "719260"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Competências lado a lado",
        "rows": [
          [
            "Contribuição",
            "Competência",
            "Cuidado"
          ],
          [
            "Sociais do caput, CIDE e de categorias",
            "União",
            "Não transferir o caput aos Estados"
          ],
          [
            "Custeio do RPPS",
            "Ente com regime próprio",
            "Alcança ativos, aposentados e pensionistas nas condições legais"
          ],
          [
            "Iluminação pública — COSIP",
            "Municípios e DF",
            "Estados não recebem essa competência"
          ]
        ]
      },
      {
        "type": "table",
        "title": "RPPS e CIDE: condições que a banca troca",
        "rows": [
          [
            "Tema",
            "Regra",
            "Pegadinha"
          ],
          [
            "Inativos — regra do art. 40, §18",
            "Parcela acima do teto do RGPS",
            "Não dizer que aposentados nunca contribuem"
          ],
          [
            "Déficit atuarial — art. 149, §1º-A",
            "Pode alcançar parcela acima do salário mínimo",
            "Não é incidência automática sem a disciplina aplicável"
          ],
          [
            "CIDE — receitas de exportação",
            "Não incide",
            "Exportação não recebe a regra da importação"
          ],
          [
            "CIDE — importação",
            "Constituição admite incidência",
            "Não estender a imunidade de receitas de exportação"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Vigência para entes subnacionais",
        "text": "A aplicação das alterações da EC 103/2019 depende das condições de vigência e do referendo legal previstos no art. 36. Conferir a lei do ente."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O quadro distingue a competência constitucional para contribuições do caput das exceções específicas para RPPS e COSIP. A afirmação de competência municipal na questão 719260 não exclui o DF. O corte de 2018 precede a ampliação das finalidades da COSIP pela EC 132/2023."
          }
        ]
      }
    ],
    "source": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!tit6_cap1",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; consultar ressalvas históricas nas questões",
    "dt": [
      1,
      "06.2"
    ]
  },
  {
    "id": "lote-iluminacao",
    "title": "COSIP: competência, anterioridades e mudança de finalidade",
    "topic": "01 Definição e espécies",
    "law": "CF, arts. 149-A e 150, I e III; EC 39/2002; EC 132/2023; CTN, art. 82-A",
    "confirmed": [
      "2163749"
    ],
    "blocks": [
      {
        "type": "callout",
        "kind": "rule",
        "title": "Contribuição, não taxa",
        "text": "Municípios e DF podem instituir a contribuição por lei. A cobrança na fatura de energia é facultativa."
      },
      {
        "type": "table",
        "title": "Redações em momentos diferentes",
        "rows": [
          [
            "Período",
            "Finalidades no texto",
            "Limite do uso histórico"
          ],
          [
            "Redação da EC 39/2002",
            "Custeio da iluminação pública",
            "Aplicável à questão de 2021/2022"
          ],
          [
            "Redação da EC 132/2023",
            "Custeio, expansão e melhoria da iluminação e sistemas de monitoramento para segurança/preservação de logradouros",
            "Não substituir silenciosamente o texto antigo"
          ],
          [
            "LC 227/2026 — CTN, art. 82-A",
            "Detalhamento legal das finalidades atuais",
            "Atualização posterior à prova de 2022"
          ]
        ]
      },
      {
        "type": "timeline",
        "title": "Lei publicada em 29/12/2021",
        "steps": [
          {
            "label": "Publicação",
            "text": "Começa a referência da noventena.",
            "kind": "neutral"
          },
          {
            "label": "01/01/2022",
            "text": "Cumpre a anualidade, mas ainda não os 90 dias.",
            "kind": "warning"
          },
          {
            "label": "Após os 90 dias",
            "text": "As duas limitações temporais foram atendidas, no caso narrado.",
            "kind": "success"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Não confundir finalidade e arrecadação",
        "text": "Perda de arrecadação não permite retroatividade nem destinação livre da contribuição. A fatura de energia não elimina as anterioridades."
      }
    ],
    "source": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!tit6_cap1",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; consultar ressalvas históricas nas questões",
    "dt": [
      1,
      "07.2"
    ]
  },
  {
    "id": "lote-bombeiros",
    "title": "Taxas de bombeiros: Tema 1282 × vedações que permanecem",
    "topic": "01 Definição e espécies",
    "law": "STF, Tema 1282; SV 12, 29 e 41; ADI 800",
    "confirmed": [
      "3670614"
    ],
    "blocks": [
      {
        "type": "callout",
        "kind": "rule",
        "title": "Tese de 2025",
        "text": "O Tema 1282 admite taxas estaduais pelos serviços de bombeiros de prevenção/combate a incêndios, busca, salvamento ou resgate, por uso efetivo ou potencial."
      },
      {
        "type": "table",
        "title": "A conclusão depende da cobrança",
        "rows": [
          [
            "Cobrança",
            "Resultado",
            "Fundamento"
          ],
          [
            "Taxa estadual de bombeiros na hipótese da tese",
            "Constitucional",
            "Tema 1282"
          ],
          [
            "Taxa de matrícula em universidade pública",
            "Inconstitucional",
            "SV 12"
          ],
          [
            "Taxa de iluminação pública",
            "Inconstitucional",
            "SV 41"
          ],
          [
            "Um ou mais elementos comuns à base de imposto",
            "Pode ser constitucional, sem identidade integral",
            "SV 29"
          ],
          [
            "Pedágio por uso efetivo de rodovia",
            "Preço público",
            "ADI 800"
          ]
        ]
      },
      {
        "type": "timeline",
        "title": "Marcos do precedente",
        "steps": [
          {
            "label": "26/03/2025",
            "text": "Julgamento do mérito do Tema 1282.",
            "kind": "neutral"
          },
          {
            "label": "29/05/2025",
            "text": "Publicação do acórdão de mérito.",
            "kind": "neutral"
          },
          {
            "label": "03/09/2025",
            "text": "Trânsito em julgado.",
            "kind": "neutral"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Data da prova ainda a confirmar",
        "text": "O PDF identifica 2025, sem informar a data da aplicação. O núcleo e o gabarito B foram conferidos; o corte jurisprudencial exato exige a data da prova."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A tese não autoriza genericamente qualquer taxa de segurança pública ou taxa municipal de incêndio. O quadro mantém separados os serviços e o ente abrangidos pelo Tema 1282. As alternativas completas e o gabarito estão nas páginas 5–6 do PDF 4.pdf."
          }
        ]
      }
    ],
    "source": "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=6543739&numeroProcesso=1417155&numeroTema=1282",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; consultar ressalvas históricas nas questões"
  },
  {
    "id": "lote-principios",
    "title": "EC 132: cinco princípios gerais × regra contra regressividade",
    "topic": "03 Princípios tributários",
    "law": "CF, art. 145, §§3º e 4º; EC 132/2023",
    "confirmed": [
      "3670600",
      "3127643",
      "3079697"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "As duas listas não são intercambiáveis",
        "rows": [
          [
            "Dispositivo",
            "Conteúdo",
            "Como a banca altera"
          ],
          [
            "Art. 145, §3º",
            "Simplicidade; transparência; justiça tributária; cooperação; defesa do meio ambiente",
            "Troca transparência por neutralidade ou justiça tributária por federativa"
          ],
          [
            "Art. 145, §4º",
            "Alterações da legislação buscarão atenuar efeitos regressivos",
            "Transforma uma diretriz sobre alterações em proibição genérica de todo tributo regressivo"
          ]
        ]
      },
      {
        "type": "flowchart",
        "title": "Reconheça o recorte da questão",
        "steps": [
          {
            "label": "Pede o rol do §3º?",
            "text": "Confira os cinco termos, sem acrescentar princípios de outros dispositivos.",
            "kind": "success"
          },
          {
            "label": "Pede a diretriz do §4º?",
            "text": "Identifique a busca de atenuação dos efeitos regressivos.",
            "kind": "success"
          },
          {
            "label": "A opção cita neutralidade?",
            "text": "Há previsão específica para o IBS; ela não substitui transparência no rol geral.",
            "kind": "warning"
          }
        ]
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Legalidade, segurança jurídica e isonomia continuam relevantes ao sistema. O fato de não constarem da lista específica do §3º não os elimina da Constituição. As três questões vinculadas cobram a redação posterior à EC 132/2023."
          }
        ]
      }
    ],
    "source": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!tit6_cap1",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; consultar ressalvas históricas nas questões",
    "dt": [
      2,
      "01.2"
    ]
  },
  {
    "id": "lote-isonomia",
    "title": "Isonomia: situação equivalente × critério legítimo",
    "topic": "03 Princípios tributários",
    "law": "CF, art. 150, II",
    "confirmed": [
      "3407116"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "O que comparar",
        "rows": [
          [
            "Pergunta",
            "Regra",
            "Cuidado"
          ],
          [
            "Contribuintes estão em situação equivalente?",
            "Veda-se o tratamento desigual",
            "Não dispensar a comparação das situações"
          ],
          [
            "Diferença é só ocupação ou função?",
            "Esse critério não justifica a discriminação descrita",
            "A proteção alcança ambos os termos"
          ],
          [
            "Mudou o nome dos rendimentos?",
            "O nome não contorna a isonomia",
            "Rendimentos, títulos e direitos são mencionados"
          ],
          [
            "Situações são efetivamente distintas?",
            "Examinar critério constitucionalmente legítimo",
            "Isonomia não é proibição de toda diferenciação"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Pegadinha",
        "text": "A alternativa D preserva ocupação e função. As demais retiram uma proteção ou autorizam a discriminação proibida."
      }
    ],
    "source": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!tit6_cap1",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; consultar ressalvas históricas nas questões",
    "dt": [
      2,
      "03.1"
    ]
  }
];

const conceptGuides=[
 {id:'lote-conceito',topic:'01 Definição e espécies',title:'Conceito de tributo: cinco requisitos e as trocas da banca',law:'CTN, arts. 3º e 97',dt:[1,'01.1'],confirmed:['3851055','3567710','2395573'],blocks:[
 table('Os requisitos são cumulativos',[['Elemento correto','Troca que torna a alternativa errada'],['Prestação pecuniária compulsória','Prestação discricionária ou facultativa'],['Em moeda ou valor exprimível em moeda','Autorização genérica para exigir trabalho ou bens'],['Não é sanção por ilícito','Tributo como penalização'],['Instituído por lei','Tributo criado autonomamente por decreto'],['Cobrança administrativa plenamente vinculada','Cobrança legislativa ou discricionária']]),
 call('warning','Conceito × extinção do crédito','A dação de imóvel nos termos da lei é modalidade específica de extinção. Não transforma o conceito de tributo em obrigação genérica de prestar bens ou trabalho.'),
 {type:'detail',title:'Ver explicação detalhada',blocks:[{type:'paragraph',text:'O defeito da TEC 2395573 é o instrumento que cria o tributo: decreto. Na TEC 3567710, a alternativa correta afirma reserva legal. Na TEC 3851055, somente o item IV reúne os requisitos de lei e atividade administrativa plenamente vinculada.'}]}
 ]},
 {id:'lote-bases-taxas',topic:'01 Definição e espécies',title:'Base da taxa: elemento comum × identidade integral × critério sem correlação',law:'CF, art. 145, II e §2º; CTN, art. 77; STF, SV 19 e 29; RE 554.951; ADI 3.775',dt:[1,'03.2'],confirmed:['3441379','3401187','2324333','2163522','279486','3368168'],source:'https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26&sumula=1282',blocks:[
 table('Três testes diferentes',[['Situação','Resultado','Exemplo'],['Um elemento em comum, com pertinência à atividade','Pode ser admitido; verificar os demais requisitos','Metragem do imóvel na taxa de coleta de resíduos'],['Toda a base do imposto reproduzida','Vedado','Valor venal integral do IPTU usado na taxa de lixo'],['Critério sem correlação com o custo da atividade','Inválido no caso examinado','Número de empregados na taxa de localização e funcionamento']]),
 flow('A base passa no controle?',[{label:'Reproduz integralmente base de imposto?',text:'Se sim, viola a vedação constitucional.',kind:'danger'},{label:'Só usa um elemento comum?',text:'Isso pode ser admitido; ainda falta examinar pertinência e proporcionalidade.',kind:'warning'},{label:'Mede razoavelmente a atuação estatal?',text:'Não basta que o critério revele a riqueza do contribuinte.',kind:'success'}]),
 call('danger','Documento do veículo não é o próprio veículo','Na alteração de registro/expedição de certificado, tipo, potência e ano não medem o trabalho documental descrito. ADI 3.775; não generalizar para qualquer atividade de vistoria.'),
 call('warning','Coleta de resíduos × limpeza geral','A SV 19 trata de resíduos provenientes de imóveis. Limpeza geral de ruas e logradouros não se torna divisível apenas por ser útil ao imóvel.'),
 {type:'detail',title:'Ver explicação detalhada',blocks:[{type:'paragraph',text:'A SV 29 permite elementos comuns sem identidade integral, mas não afasta o controle de correlação com a atividade. O RE 554.951, julgado em 2013, rechaçou o número de empregados no caso de taxa de localização/funcionamento. A ADI 3.775, julgada em 2020, declarou inválida a quantificação do serviço de registro do veículo, com efeitos modulados a partir de 17/04/2020. Essas decisões antecedem as provas de 2022 e 2025.'}]}
 ]}
].map(g=>({...g,source:g.source||ctn,checkedAt:'2026-11-03',evidence:'Núcleo conferido nos IDs indicados; observar o contexto de cada cobrança'}));

export const visualGuides=[...initialGuides,...dtGuides,...resumedGuides,...continuationGuides,...conceptGuides];
