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

const audited100Guides=[
  {
    "id": "lote-federacao",
    "title": "Limitações federativas: uniformidade × isenção heterônoma × origem/destino",
    "topic": "03 Princípios tributários",
    "law": "CF, arts. 151 e 152",
    "confirmed": [
      "2235976",
      "2235809",
      "1071936"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Destinatário e conduta são diferentes",
        "rows": [
          [
            "Norma",
            "Destinatário",
            "Conduta vedada/ressalva"
          ],
          [
            "Art. 151, I",
            "União",
            "Tributo federal não uniforme; admite incentivo de equilíbrio regional"
          ],
          [
            "Art. 151, II",
            "União",
            "Tributar renda de obrigações e agentes subnacionais acima do nível federal comparável"
          ],
          [
            "Art. 151, III",
            "União",
            "Isenção interna de tributo de outro ente"
          ],
          [
            "Art. 152",
            "Estados, DF e Municípios",
            "Discriminar bens e serviços pela procedência ou destino"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "A troca do instrumento não resolve",
        "text": "Uma lei federal, mesmo complementar, não é autorização genérica para a União isentar ICMS por política interna."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A vedação de isenção interna por ente incompetente deve ser distinguida da atuação da República em tratados internacionais e de exceções escritas na própria Constituição. O art. 151, II, não cria imunidade absoluta de toda a renda de títulos estaduais: exige paridade de níveis."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões",
    "dt": [
      2,
      "06.5"
    ]
  },
  {
    "id": "lote-mp",
    "title": "Medida provisória: impostos × taxas e o marco da conversão",
    "topic": "03 Princípios tributários",
    "law": "CF, arts. 62, §2º, e 150, III; STF, Tema 382 e RE416.601",
    "confirmed": [
      "1147520",
      "2022740"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Regimes não intercambiáveis",
        "rows": [
          [
            "Caso",
            "Regra",
            "Cuidado"
          ],
          [
            "Impostos abrangidos pelo art.62, §2º",
            "Efeitos no ano seguinte dependem de conversão até o fim do ano da edição",
            "Há exceções expressas: II, IE, IPI, IOF e IEG"
          ],
          [
            "Taxa instituída por MP",
            "Aplicar anualidade e noventena desde a publicação",
            "Não transportar a regra especial de impostos"
          ],
          [
            "Conversão sem nova majoração material",
            "Não reiniciar automaticamente a noventena",
            "Comparar o texto da MP com o da lei"
          ],
          [
            "Matéria reservada a lei complementar",
            "MP não substitui LC",
            "Ex.: empréstimo compulsório"
          ]
        ]
      },
      {
        "type": "flowchart",
        "title": "MP de taxa publicada em 31/10/2022",
        "steps": [
          {
            "label": "Publicação",
            "text": "É o marco da noventena.",
            "kind": "neutral"
          },
          {
            "label": "Virada para 2023",
            "text": "Anualidade atendida; ainda conferir os 90 dias.",
            "kind": "warning"
          },
          {
            "label": "Conversão em 03/01/2023",
            "text": "Não desloca automaticamente a taxa para 2024.",
            "kind": "success"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Ressalva na questão 1147520",
        "text": "O gabarito A precisa ser lido dentro das exceções do §2º, sem generalizar a exigência de conversão anual a todos os impostos."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Tema 382: a postergação de novas hipóteses de creditamento de ICMS examinada pelo STF não representou majoração e não se sujeitou à noventena. Isso não autoriza generalizar a tese para qualquer supressão de benefício ou aumento indireto."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões"
  },
  {
    "id": "lote-confisco",
    "title": "Não confisco: tributo × multa × sanção sobre bens",
    "topic": "03 Princípios tributários",
    "law": "CF, art. 150, IV; CTN, art.3º; STF, ADI551",
    "confirmed": [
      "3976058",
      "719259"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Institutos distintos",
        "rows": [
          [
            "Instituto",
            "Regra",
            "Não confundir"
          ],
          [
            "Tributo",
            "Não pode ter efeito confiscatório",
            "Finalidade social não afasta a garantia"
          ],
          [
            "Multa tributária",
            "STF aplica controle de não confisco",
            "Multa continua sendo sanção; não vira tributo"
          ],
          [
            "Desapropriação ou perda de bens",
            "Regime constitucional/legal próprio",
            "Não é autorização para imposto confiscatório"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Questão com ressalva de unicidade",
        "text": "TEC 719259: PDF traz D. A opção C também proíbe tributo confiscatório e tem fundamento material. O registro consolidado C/D permanece, sem presumir anulação oficial."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A questão 3976058 cobra o alcance da garantia e a distinção entre tributo e multa, sem exigir percentual máximo. Na 719259, a correção de D sobre reserva legal não torna automaticamente falsa a proibição expressa em C. Conferir eventual decisão oficial de recurso antes de atribuir solução única."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões"
  },
  {
    "id": "lote-imunidades",
    "title": "Imunidades de entidades: sujeito, finalidade e requisitos",
    "topic": "04 Imunidades",
    "law": "CF, art.150, VI, a–c e §§2º–4º; CTN, art.14",
    "confirmed": [
      "3113504",
      "760030",
      "644493"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Cada extensão tem condições",
        "rows": [
          [
            "Entidade",
            "Regra",
            "Limite"
          ],
          [
            "Autarquia/fundação pública",
            "Extensão da recíproca",
            "Patrimônio, renda e serviços ligados a finalidades essenciais ou decorrentes"
          ],
          [
            "Partido político, inclusive fundação",
            "Imunidade da alínea c",
            "Finalidades essenciais e requisitos legais"
          ],
          [
            "Instituição de educação/assistência sem fins lucrativos",
            "Imunidade condicionada",
            "Não é automática por mera relevância social"
          ],
          [
            "Entidade religiosa e templo",
            "Alínea b e finalidade essencial",
            "Redação ampliada pela EC132/2023"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "2018 × 2024",
        "text": "A questão 3113504 já usa a ampliação de 2023. No texto de 2018, a extensão expressa da recíproca à empresa pública postal ainda não constava do §2º."
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Ressalva da questão 644493",
        "text": "B é o gabarito impresso. O art.151, II, não proíbe toda tributação da renda de títulos estaduais; veda níveis superiores aos federais. A opção C exige esse cuidado de leitura."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Não estender automaticamente a todas as espécies tributárias a imunidade de impostos do art.150, VI. Outras imunidades e as regras de IBS/CBS têm fundamentos próprios. A alínea c inclui fundações partidárias e não se limita a imóveis."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões",
    "dt": [
      2,
      "08.6"
    ]
  },
  {
    "id": "lote-musical",
    "title": "Imunidade musical: requisitos × exceção industrial × atualização",
    "topic": "04 Imunidades",
    "law": "CF, art.150, VI, e; EC75/2013; STF, Tema1083",
    "confirmed": [
      "1994900"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Teste da alínea e",
        "rows": [
          [
            "Ponto",
            "O que verificar"
          ],
          [
            "Objeto",
            "Fonograma ou videofonograma musical"
          ],
          [
            "Produção",
            "No Brasil"
          ],
          [
            "Vínculo brasileiro",
            "Autoria brasileira e/ou interpretação por artista brasileiro, conforme o texto"
          ],
          [
            "Suportes",
            "Materiais ou arquivos digitais que contenham as obras"
          ],
          [
            "Exceção expressa",
            "Replicação industrial de mídias ópticas de leitura a laser"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Não ampliar para toda cultura",
        "text": "Filmes, espetáculos ou todo produto musical importado não se tornam imunes por essa regra."
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Corte temporal",
        "text": "A questão é de 2022 e usa a redação da EC75/2013. O Tema1083, firmado em 2024, exclui suportes produzidos fora do Brasil mesmo com obra de artista brasileiro; é atualização posterior."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O requisito de vínculo brasileiro contém e/ou. Não exigir sempre autoria e interpretação brasileiras cumulativamente. A ressalva industrial é específica, não uma exclusão de toda a produção industrial musical."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões",
    "dt": [
      2,
      "09.7"
    ]
  },
  {
    "id": "lote-mapa-competencias",
    "title": "Mapa dos impostos cobrados: União × Estados/DF × Municípios",
    "topic": "05 Competência",
    "law": "CF, arts.153, 155 e 156",
    "confirmed": [
      "2041802",
      "984501",
      "3543937",
      "943740",
      "1071942"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Recorte das questões",
        "rows": [
          [
            "Ente",
            "Impostos no recorte",
            "Ponto que diferencia"
          ],
          [
            "União",
            "II, IE, IR, IPI, IOF, ITR, IGF",
            "IGF depende de instituição nos termos de LC"
          ],
          [
            "Estados e DF",
            "ICMS, IPVA, ITCMD",
            "Circulação/aquisição, propriedade e transmissão gratuita são fatos distintos"
          ],
          [
            "Municípios e DF",
            "IPTU, ITBI, ISS",
            "Urbano; transmissão onerosa de imóveis; serviços do campo municipal"
          ]
        ]
      },
      {
        "type": "flowchart",
        "title": "Veículo: compra × propriedade",
        "steps": [
          {
            "label": "Operação de aquisição descrita",
            "text": "Relacionar à circulação/ICMS na questão 3543937.",
            "kind": "success"
          },
          {
            "label": "Propriedade do veículo",
            "text": "Relacionar ao IPVA, sem trocar o fato cobrado.",
            "kind": "warning"
          },
          {
            "label": "Benefício fiscal",
            "text": "Identificar competência não dispensa o regime próprio de concessão.",
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
            "text": "O quadro é o recorte dos impostos das provas indicadas, não um inventário exaustivo da reforma. Na questão 2041802, as colunas I–IV foram separadas para corrigir a leitura da matriz do PDF. Fiscalização/arrecadação municipal do ITR não transfere sua competência legislativa."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões"
  },
  {
    "id": "lote-transportes",
    "title": "Transporte intramunicipal × intermunicipal × interestadual",
    "topic": "05 Competência",
    "law": "CF, arts.147, 155, II, e 156, III",
    "confirmed": [
      "867068",
      "684696"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "A fronteira geográfica resolve",
        "rows": [
          [
            "Serviço",
            "Campo tributário nas questões",
            "Ente"
          ],
          [
            "Transporte dentro do Município",
            "ISS",
            "Município/DF"
          ],
          [
            "Transporte entre Municípios",
            "ICMS",
            "Estado/DF"
          ],
          [
            "Transporte entre Estados",
            "ICMS",
            "Estado/DF"
          ],
          [
            "Comunicação no campo do art.155, II",
            "ICMS",
            "Estado/DF"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "DF acumula, mas não mistura",
        "text": "O DF alcança transporte intra e intermunicipal por impostos diferentes. Isso não põe transporte intramunicipal no ICMS nem intermunicipal no ISS."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "As questões são de 2018/2019. O quadro descreve o sistema aplicado a esses enunciados e não substitui o estudo separado da transição para o IBS."
          }
        ]
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões"
  },
  {
    "id": "lote-cumulativa",
    "title": "Competência cumulativa: Território × DF × Estado fictício sem Municípios",
    "topic": "05 Competência",
    "law": "CF, art.147; CTN, art.18",
    "confirmed": [
      "3561409"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Quem institui?",
        "rows": [
          [
            "Hipótese",
            "Competência"
          ],
          [
            "Território Federal",
            "União exerce impostos estaduais; municipais também se não dividido em Municípios"
          ],
          [
            "Distrito Federal",
            "Exerce impostos estaduais e municipais"
          ],
          [
            "Estado não dividido em Municípios, na hipótese literal do CTN",
            "O próprio Estado exerce estaduais e municipais"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Hipótese abstrata",
        "text": "A questão 3561409 descreve um novo Estado fictício. Não afirmar que existe hoje Estado brasileiro com essa organização."
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Não trocar a pessoa federativa",
        "text": "A competência da União relativa a Território Federal não se transfere automaticamente ao cenário de um novo Estado."
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões",
    "dt": [
      3,
      "02.2"
    ]
  },
  {
    "id": "lote-residual-guerra",
    "title": "Imposto residual × imposto extraordinário de guerra",
    "topic": "05 Competência",
    "law": "CF, art.154; CTN, art.76",
    "confirmed": [
      "877333",
      "877341"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "Dois poderes federais com condições diferentes",
        "rows": [
          [
            "Ponto",
            "Residual — art.154, I",
            "Extraordinário de guerra — art.154, II"
          ],
          [
            "Ente",
            "União",
            "União"
          ],
          [
            "Veículo",
            "Lei complementar",
            "Não exige LC só por ser IEG"
          ],
          [
            "Hipótese",
            "Novo imposto residual",
            "Guerra externa ou iminência"
          ],
          [
            "Fato gerador/base",
            "Não próprios dos impostos discriminados",
            "Pode alcançar materialidades fora da competência ordinária federal"
          ],
          [
            "Não cumulatividade",
            "Exigida",
            "Não é requisito geral do inciso II"
          ],
          [
            "Encerramento",
            "Não é tributo temporário pela simples natureza residual",
            "Supressão gradativa cessadas as causas"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "IEG não é empréstimo compulsório",
        "text": "A hipótese de guerra pode aparecer nos dois institutos. O imposto não tem restituição inerente à espécie e não herda a reserva de LC do empréstimo."
      }
    ],
    "source": "https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões",
    "dt": [
      3,
      "05.2"
    ]
  },
  {
    "id": "lote-ivvc",
    "title": "IVVC: data da emenda × data efetiva da eliminação",
    "topic": "05 Competência",
    "law": "EC3/1993, arts.1º e4º; CF, art.156",
    "confirmed": [
      "1037325"
    ],
    "blocks": [
      {
        "type": "timeline",
        "title": "A eliminação não produziu efeitos na própria data da emenda",
        "steps": [
          {
            "label": "1993",
            "text": "EC3 altera a competência e prevê a transição.",
            "kind": "neutral"
          },
          {
            "label": "1995",
            "text": "Regra transitória de redução da alíquota.",
            "kind": "warning"
          },
          {
            "label": "01/01/1996",
            "text": "Produção dos efeitos da eliminação do imposto municipal.",
            "kind": "success"
          },
          {
            "label": "Prova de 2019",
            "text": "Não há competência municipal para instituir o antigo IVVC.",
            "kind": "success"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Norma local remanescente não recria competência",
        "text": "Uma previsão antiga em constituição estadual ou lei orgânica não supera a Constituição Federal vigente."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A resolução anterior foi precisada na exibição: a emenda é de 1993, mas seu art.4º fixa a eliminação com efeitos em 01/01/1996. O texto original permanece no snapshot e no campo raw."
          }
        ]
      }
    ],
    "source": "https://www2.camara.leg.br/legin/fed/emecon/1993/emendaconstitucional-3-17-marco-1993-354966-normaatualizada-pl.html",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões"
  },
  {
    "id": "lote-policia",
    "title": "Taxa de polícia: exercício efetivo × visita individual × segurança geral",
    "topic": "01 Definição e espécies",
    "law": "STF, Tema217 e ADI3770; CTN, arts.77–80",
    "confirmed": [
      "3610437",
      "3079706"
    ],
    "blocks": [
      {
        "type": "table",
        "title": "A distinção depende da atividade",
        "rows": [
          [
            "Situação",
            "Conclusão",
            "Cuidado"
          ],
          [
            "Órgão e estrutura competentes em funcionamento",
            "Podem demonstrar exercício do poder de polícia",
            "Não exigir visita individual como regra absoluta"
          ],
          [
            "Alvarás/atestados individualizáveis nas hipóteses da ADI3770",
            "Admite taxa estadual",
            "Não confundir com toda a segurança pública"
          ],
          [
            "Policiamento ostensivo/investigativo geral",
            "Custeio não se torna divisível por receber nome de taxa",
            "Evitar financiamento geral por cobrança sem referibilidade"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Comando da questão 3079706",
        "text": "Pede a alternativa INCORRETA. A exigência absoluta de comprovar ação fiscal sobre cada contribuinte é o erro cobrado."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Tema217: taxa de renovação/localização pode ser constitucional com exercício efetivo demonstrado por órgão e estrutura competentes. A ADI3770, julgada em 2019, examina atividades individualizáveis de polícia. O Tema1282 de bombeiros é de 2025 e não deve ser tratado como precedente já disponível em 2024."
          }
        ]
      }
    ],
    "source": "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=2622137&numeroProcesso=588322&numeroTema=217",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; gabaritos e ressalvas nas questões"
  }
];
const audited100Bindings={"dt-anterioridades": ["1234916", "1073698", "719755", "592988", "682639", "1821296", "1768965"], "guia-pedagio": ["1071941", "693066"], "dt-retroatividade": ["684690"], "dt-competencia": ["2235835", "1016813"], "dt-reserva": ["1071937", "1015172"], "lote-iluminacao": ["881688"], "lote-bases-taxas": ["3419867"]};
const audited100Blocks={"guia-pedagio": [{"type": "callout", "kind": "rule", "title": "Limitação tributária ao tráfego", "text": "O art.150, V, veda limitar o tráfego de pessoas ou bens por tributos interestaduais/intermunicipais e ressalva o pedágio nas condições constitucionais. Isso não proíbe, por si, toda incidência de ICMS interestadual."}], "dt-retroatividade": [{"type": "table", "title": "Redução de imposto × redução de multa", "rows": [["Mudança", "Efeito temporal"], ["Redução da alíquota do imposto", "Beneficia fatos futuros conforme vigência, sem espera de anterioridade"], ["Redução da multa por lei", "Pode retroagir a ato não definitivamente julgado nos termos do art.106, II, c"], ["Lei sem cláusula de vigência", "Verificar regra geral; não presumir efeito no dia da publicação"]]}], "dt-reserva": [{"type": "table", "title": "Lei de instituição × normas gerais nacionais", "rows": [["Matéria", "Instrumento"], ["Conflitos de competência, limitações e normas gerais do art.146", "Lei complementar"], ["Instituição de cada tributo", "Observar a reserva específica; não exigir LC indistintamente"], ["Alíquotas de ICMS atribuídas ao Senado", "Resolução nas hipóteses constitucionais, não LC como substituto genérico"]]}], "lote-bases-taxas": [{"type": "callout", "kind": "warning", "title": "Fiscalização ambiental: critério × montante", "text": "Porte por receita bruta e energia gerada podem ser parâmetros idôneos em tese. A ADI5489 invalidou a cobrança concreta desproporcional, sem banir automaticamente todo uso desses critérios."}]};
const priorVisualGuides=[...initialGuides,...dtGuides,...resumedGuides,...continuationGuides,...conceptGuides,...audited100Guides].map(g=>audited100Bindings[g.id]?{...g,confirmed:[...g.confirmed,...audited100Bindings[g.id]],blocks:[...g.blocks,...(audited100Blocks[g.id]||[])],evidence:'Núcleo conferido; observar ressalvas nas questões',law:g.law+(g.id==='dt-reserva'?'; CF, art.146':g.id==='guia-pedagio'?'; CF, art.150, V':'')}:g);

const successorGuide={id:'lote-imunidade-sucessor',title:'Imunidade do sucessor × dívida anterior à sucessão',topic:'04 Imunidades',law:'STF, Tema224 (RE599176)',confirmed:['3685889'],source:'https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=2672267&numeroProcesso=599176&numeroTema=224',checkedAt:'2026-11-03',evidence:'Núcleo conferido; demais imunidades explicadas na resolução',blocks:[{type:'table',title:'O momento do fato tributário resolve a questão',rows:[['Situação','Consequência'],['Obrigação de fato anterior à sucessão','A imunidade do sucessor não apaga a dívida'],['Fato posterior envolvendo ente imune','Examinar os requisitos da imunidade aplicável'],['Mudança do titular','Não transforma dívida anterior em fato imune']]},{type:'callout',kind:'danger',title:'Pegadinha: imunidade não é perdão retroativo',text:'A condição atual do sucessor não exonera as obrigações anteriores abrangidas pela sucessão.'},{type:'callout',kind:'warning',title:'Analise o fato e o responsável',text:'Não basta descobrir que o sucessor é a União: verifique quando ocorreu o fato tributário e a responsabilidade pela dívida.'},{type:'detail',title:'Ver explicação detalhada',blocks:[{type:'paragraph',text:'No RE599176, julgado em2014, a União sucedeu a RFFSA. O STF reconheceu que a proteção recíproca da sucessora não afasta a obrigação relativa ao período anterior. Na questão3685889, os distratores negam indevidamente imunidades do IOF, da exportação indireta e do e-book, ou estendem proteção ao uso privado lucrativo de imóvel público; esses temas não são contados como incidência direta deste núcleo.'}]}]};
const continuation104Bindings={'dt-denuncia':['3670605']};
const more104=[{id:'lote-gleba',title:'ITR: pequena gleba × qualquer pequena propriedade',topic:'04 Imunidades',law:'CF, art.153, §4º, II; Lei9.393/1996, art.2º',confirmed:['3127523'],blocks:[{type:'table',title:'Requisitos cumulativos',rows:[['Requisito','Verificação'],['Área','Enquadramento na definição legal de pequena gleba'],['Exploração','Pelo proprietário'],['Outros imóveis','O proprietário não pode possuir outro imóvel']]},{type:'callout',kind:'warning',title:'Pequena não basta',text:'Não confundir o adjetivo pequena com a definição legal da gleba imune; a questão usa a expressão em sentido constitucional.'}]},{id:'lote-vigencia',title:'Publicação × vigência × lei interpretativa',topic:'06 Legislação tributária',law:'CTN, arts.100,103 e106; LC95/1998, art.8º',confirmed:['3228225'],blocks:[{type:'table',title:'Não presumir vigência imediata',rows:[['Norma','Regra'],['Ato administrativo do art.100,I','Publicação, salvo disposição contrária'],['Decisão administrativa com eficácia normativa','Efeitos normativos após30 dias, salvo disposição contrária'],['Convênio do art.100,IV','Data nele prevista'],['Lei com repercussão relevante','Indicar vigência expressa e vacância razoável']]},{type:'callout',kind:'danger',title:'Interpretar não autoriza inovar retroativamente',text:'O nome interpretativa não permite mudar elementos da obrigação como se a regra já existisse.'}]}].map(g=>({...g,source:g.id==='lote-vigencia'?'https://www2.camara.leg.br/legin/fed/leicom/1998/leicomplementar-95-26-fevereiro-1998-363948-normaatualizada-pl.html':'https://www4.planalto.gov.br/legislacao/portal-legis/legislacao-1/constituicao',checkedAt:'2026-11-03',evidence:'Núcleo conferido; ver resolução e fontes da questão'}));
const guides104=[...priorVisualGuides.map(g=>continuation104Bindings[g.id]?{...g,confirmed:[...g.confirmed,...continuation104Bindings[g.id]]}:g),successorGuide,...more104];

const guides116=[
  {
    "id": "lote-ipva-venda",
    "title": "Veículo vendido: IPVA × multa de trânsito × acordo particular",
    "topic": "07 Obrigação e sujeição",
    "law": "CTN, arts.123 e124; STJ, Súmula585 eTema1118",
    "confirmed": [
      "1768958"
    ],
    "source": "https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=585.num.",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "Fontes diferentes de responsabilidade",
        "rows": [
          [
            "Situação",
            "Efeito"
          ],
          [
            "Falta de comunicação da venda",
            "Art.134 do CTB não basta para cobrar IPVA posterior do vendedor"
          ],
          [
            "Lei estadual/distrital específica",
            "Pode prever solidariedade nas condições legais"
          ],
          [
            "Contrato transfere todos os débitos ao comprador",
            "Obriga entre as partes; não muda por si o sujeito passivo legal"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Multa de trânsito não é IPVA",
        "text": "Não transportar automaticamente a responsabilidade do CTB para a obrigação tributária."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A transferência do bem móvel decorre da tradição. A Súmula585 afasta a responsabilidade tributária baseada somente no art.134 do CTB. A necessidade de lei específica já aparecia em precedentes anteriores à prova; o Tema1118 a consolidou em2022, depois da questão de2021."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-socios",
    "title": "Sócio cotista × gestor: quando cabe responsabilização",
    "topic": "07 Obrigação e sujeição",
    "law": "CTN, art.135; STF, Tema13; STJ, Súmula430 eTemas103 e649",
    "confirmed": [
      "1147537"
    ],
    "source": "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=2555009&numeroProcesso=562276&numeroTema=13",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "Condição societária não basta",
        "rows": [
          [
            "Hipótese",
            "Regra"
          ],
          [
            "Sócio sem gestão, apenas por ser cotista",
            "Sem responsabilidade automática pelo tributo da sociedade"
          ],
          [
            "Gestor e simples inadimplemento",
            "Não basta, por si só, para responsabilizar"
          ],
          [
            "Atos enquadrados no art.135",
            "Examinar excesso de poderes ou infração e os requisitos da responsabilidade"
          ],
          [
            "Nome do sócio já consta da CDA",
            "Cabe ao indicado afastar as hipóteses do art.135, conforme Tema103"
          ],
          [
            "Pessoa jurídica recorre só em defesa do sócio",
            "Sem legitimidade, conforme Tema649"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Norma geral × hipótese específica",
        "text": "A lei ordinária não pode contrariar as normas gerais do CTN para tornar todo cotista solidário."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O Tema13/STF afastou a responsabilização indiscriminada prevista no art.13 da Lei8.620/1993. A alternativa correta não autoriza concluir que nenhuma lei ordinária possa jamais disciplinar responsabilidade: a vedação é criar regime incompatível com as normas gerais reservadas à lei complementar."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-declaracao-prescricao",
    "title": "Crédito declarado × autuação impugnada: início da prescrição",
    "topic": "09 Crédito e lançamento",
    "law": "CTN, arts.149,151 e174; STJ, Súmula436",
    "confirmed": [
      "263610",
      "292038"
    ],
    "source": "https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=436.num.",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "O modo de constituição muda o marco",
        "rows": [
          [
            "Situação",
            "Constituição e cobrança"
          ],
          [
            "Débito reconhecido em declaração",
            "Dispensa novo lançamento do valor declarado"
          ],
          [
            "Declaração entregue após o vencimento",
            "Comparar datas: cobrança não prescreve antes da constituição"
          ],
          [
            "Autuação com impugnação tempestiva",
            "Aguardar decisão administrativa definitiva e prazo para pagar"
          ]
        ]
      },
      {
        "type": "timeline",
        "title": "Exemplo da questão263610",
        "steps": [
          {
            "label": "Dezembro/2012",
            "text": "Vencimento sem declaração do débito no cenário narrado.",
            "kind": "neutral"
          },
          {
            "label": "Junho/2013",
            "text": "Entrega da declaração constitui o crédito já vencido.",
            "kind": "warning"
          },
          {
            "label": "Junho/2018",
            "text": "Marco quinquenal para cobrança, sem causas modificativas no enunciado.",
            "kind": "danger"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Não lançar de novo o que já foi declarado",
        "text": "A dívida reconhecida permite cobrança; não nasce um novo prazo para constituir por lançamento de ofício."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Na questão292038, a omissão fraudulenta foi detectada e houve autuação impugnada. A prescrição de cobrança não corre durante a pendência regular do contencioso. O regime de homologação não impede lançamento de ofício das omissões e não garante homologação tácita quando comprovado dolo, fraude ou simulação. Na263610, o PDF traz D e o cadastro anterior B; a exibição foi corrigida sem apagar o histórico."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-parcelamento",
    "title": "Pedido de parcelamento × concessão: interrupção e suspensão",
    "topic": "11 Suspensão e exclusão",
    "law": "CTN, arts.151, VI,155-A e174; STJ, Súmula653",
    "confirmed": [
      "2390139"
    ],
    "source": "https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=653.num.",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "Dois efeitos distintos",
        "rows": [
          [
            "Ato",
            "Prescrição",
            "Exigibilidade"
          ],
          [
            "Pedido que reconhece o débito, mesmo indeferido",
            "Interrompe se a prescrição ainda estiver em curso",
            "Não presumir concessão ou suspensão automática"
          ],
          [
            "Parcelamento concedido e regular",
            "Cobrança impedida durante o regime regular",
            "Suspende nos termos legais"
          ],
          [
            "Pedido após crédito já prescrito",
            "Não recria crédito extinto",
            "Não convalida a dívida"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "rule",
        "title": "Parcelar não perdoa acréscimos",
        "text": "Juros e multas permanecem, salvo disposição legal em contrário."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O parcelamento depende de lei específica, e as regras da moratória aplicam-se subsidiariamente. Não confundir a confissão que interrompe a prescrição com a suspensão de exigibilidade decorrente do parcelamento regularmente concedido."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-moratoria",
    "title": "Moratória: limite regional × garantia do crédito",
    "topic": "11 Suspensão e exclusão",
    "law": "CTN, art.152, parágrafo único; STJ, Súmula112",
    "confirmed": [
      "218247"
    ],
    "source": "https://normas.leg.br/api/public/binario/ef1d040f-caf4-4afc-b17d-f0348291549e/texto",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "Condições que a banca troca",
        "rows": [
          [
            "Instituto",
            "Regra"
          ],
          [
            "Moratória por lei",
            "Pode limitar-se a região ou categoria de sujeitos passivos"
          ],
          [
            "Depósito para suspender",
            "Integral e em dinheiro, conforme Súmula112"
          ],
          [
            "Fiança na prova de2014",
            "Não se equipara ao depósito do art.151, II"
          ],
          [
            "Atualização de2026",
            "Examinar a hipótese autônoma e condicionada do art.151, X"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Data da prova importa",
        "text": "A novidade de2026 não muda o gabarito histórico de2014 nem transforma fiança em depósito."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A alternativa A é literal no CTN. Os demais itens misturam interrupção da prescrição, suspensão de exigibilidade e efeitos do depósito. A extinção judicial sem mérito não garante automaticamente levantamento pelo contribuinte: a jurisprudência admite conversão ao Fisco, com atenção às condições e exceções."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-iptu-prescricao",
    "title": "IPTU: quem responde × quando começa a prescrição",
    "topic": "10 Extinção e indébito",
    "law": "CTN, arts.34 e174; STJ, Temas122 e980",
    "confirmed": [
      "3127440"
    ],
    "source": "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?cod_tema_inicial=980&cod_tema_final=980&novaConsulta=true&tipo_pesquisa=T",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "Dois eixos da questão",
        "rows": [
          [
            "Pergunta",
            "Resposta"
          ],
          [
            "Proprietário registral ou promitente comprador?",
            "Ambos podem ser sujeitos passivos, conforme lei municipal"
          ],
          [
            "Vencimento em31/01",
            "Início da prescrição em01/02"
          ],
          [
            "Carnê oferece10 parcelas sem adesão",
            "Oferta unilateral não adia a prescrição até novembro"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Não presumir adesão ao parcelamento",
        "text": "Receber o carnê com parcelas não equivale a pedir parcelamento ou confessar a dívida."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O Tema122 e a Súmula399 remetem à legislação municipal, respeitado o art.34 do CTN. No caso concreto, a lei contempla proprietário e comprador. O Tema980 fixa o dia seguinte ao vencimento e afasta efeito interruptivo do parcelamento de ofício sem anuência."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-remissao-deposito",
    "title": "Coisa julgada × remissão antes da conversão do depósito",
    "topic": "10 Extinção e indébito",
    "law": "STJ, Tema480; CTN, art.156",
    "confirmed": [
      "2022752"
    ],
    "source": "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?cod_tema_inicial=480&cod_tema_final=480&novaConsulta=true&tipo_pesquisa=T",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "timeline",
        "title": "Crédito ainda pode ser extinto por fato posterior",
        "steps": [
          {
            "label": "Trânsito em julgado",
            "text": "Confirmação judicial do débito, com depósito vinculado.",
            "kind": "neutral"
          },
          {
            "label": "Lei de remissão",
            "text": "Verificar se abrange o crédito e não exclui essa situação.",
            "kind": "warning"
          },
          {
            "label": "Antes da ordem de conversão",
            "text": "A remissão pode alcançar o crédito, conforme Tema480.",
            "kind": "success"
          }
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "O marco é a ordem de conversão",
        "text": "Não basta supor que o dinheiro ainda não foi materialmente transferido."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O Tema480 diferencia a confirmação judicial da extinção por pagamento. Se o crédito ainda existe e a lei abrange a situação, a remissão posterior pode justificar o levantamento. Não é aplicação retroativa de penalidade mais benigna."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-divida-prescrita",
    "title": "Confissão em prazo × confissão de dívida já prescrita",
    "topic": "10 Extinção e indébito",
    "law": "CTN, arts.156, V,165, I, e174; STJ, REsp646328/RS",
    "confirmed": [
      "1768972"
    ],
    "source": "https://www.stj.jus.br/websecstj/cgi/revista/REJ.cgi/ITA?CodOrgaoJgdr=&SeqCgrmaSessao=&dt=20090623&formato=PDF&nreg=200400346220&salvar=false&seq=890587&tipo=0",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar ressalvas e contexto temporal nas questões",
    "blocks": [
      {
        "type": "table",
        "title": "Antes ou depois do fim do prazo?",
        "rows": [
          [
            "Momento do reconhecimento",
            "Consequência"
          ],
          [
            "Prescrição ainda em curso",
            "Ato inequívoco pode interromper o prazo"
          ],
          [
            "Prescrição já consumada",
            "Crédito extinto não renasce pela confissão"
          ],
          [
            "Pagamento de crédito já prescrito",
            "Repetição do indébito, conforme requisitos legais"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Inscrição não reinicia o relógio",
        "text": "Inscrever em dívida ativa não é, por si só, causa interruptiva da prescrição tributária."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Na1768972, o pedido ocorre após seis anos nas condições do enunciado. O crédito já estava extinto quando houve a confissão e o parcelamento; a execução do restante é indevida. O REsp646328/RS reconhece o direito à restituição do pagamento de débito tributário prescrito."
          }
        ]
      }
    ]
  }
];
const bindings116={"dt-denuncia": ["373725", "3248385"], "dt-suspensao": ["3228235"]};
const reviewed116=[...guides104.map(g=>bindings116[g.id]?{...g,confirmed:[...g.confirmed,...bindings116[g.id]],evidence:'Núcleo conferido; observar ressalvas e contexto temporal nas questões'}:g),...guides116];

const guides131=[
  {
    "id": "lote-ipva-notificacao",
    "title": "IPVA: notificação do lançamento × vencimento × prescrição",
    "topic": "10 Extinção e indébito",
    "law": "STJ, Tema903; CTN, art.174",
    "confirmed": [
      "609603"
    ],
    "source": "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?cod_tema_inicial=903&cod_tema_final=903&novaConsulta=true&tipo_pesquisa=T",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Três marcos diferentes",
        "rows": [
          [
            "Marco",
            "Efeito"
          ],
          [
            "Notificação para recolherIPVA",
            "Constitui o crédito no lançamento de ofício"
          ],
          [
            "Dia seguinte ao vencimento",
            "Inicia a prescrição para cobrança"
          ],
          [
            "Novo processo após inadimplemento",
            "Não recria crédito nem reinicia por si o prazo"
          ]
        ]
      },
      {
        "type": "timeline",
        "title": "Exemplo da questão609603",
        "steps": [
          {
            "label": "Janeiro/2012",
            "text": "Notificação com valor e instruções para pagar.",
            "kind": "neutral"
          },
          {
            "label": "10/02/2012",
            "text": "Vencimento da obrigação.",
            "kind": "warning"
          },
          {
            "label": "11/02/2012",
            "text": "Início do prazo para cobrança, conforme Tema903.",
            "kind": "warning"
          },
          {
            "label": "Fevereiro/2017",
            "text": "Quinquênio consumado nas condições do enunciado.",
            "kind": "danger"
          }
        ]
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A execução proposta em 2018 não salva um crédito já prescrito. Não confundir a constituição pela notificação com um processo administrativo posterior instaurado para o inadimplemento."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-energia-consumidor",
    "title": "ICMS de energia: contribuinte de fato × legitimidade para restituição",
    "topic": "ICMS",
    "law": "STJ, Tema537",
    "confirmed": [
      "263637"
    ],
    "source": "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?cod_tema_inicial=537&cod_tema_final=537&novaConsulta=true&tipo_pesquisa=T",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "O enquadramento resolve a questão",
        "rows": [
          [
            "Pessoa",
            "Posição no caso"
          ],
          [
            "Distribuidora",
            "Contribuinte de direito na relação tributária"
          ],
          [
            "Consumidor de energia",
            "Contribuinte de fato; suporta o encargo"
          ],
          [
            "Demanda contratada e não utilizada",
            "Consumidor tem legitimidade para discutir e pedir repetição"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Exceção específica",
        "text": "A legitimidade decorre da relação peculiar entre concedente, concessionária e consumidor. Não generalizar a todo contribuinte de fato."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O Tema537 distingue a energia elétrica de outros regimes de tributos indiretos. Ser contribuinte de fato não torna o consumidor contribuinte de direito; a legitimidade processual é que é reconhecida nesta hipótese."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-isencao-onerosa",
    "title": "Isenção comum × isenção com prazo e condição onerosa",
    "topic": "11 Suspensão e exclusão",
    "law": "CTN, arts.175 e178; STF, Súmula544",
    "confirmed": [
      "1147522"
    ],
    "source": "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2283",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Proteção depende dos requisitos",
        "rows": [
          [
            "Hipótese",
            "Regra"
          ],
          [
            "Isenção sem a proteção específica",
            "Pode ser alterada por lei, observadas as garantias aplicáveis"
          ],
          [
            "Prazo certo e condição onerosa",
            "Não pode ser livremente suprimida"
          ],
          [
            "Isenção em caráter individual",
            "Despacho reconhece requisitos legais; não elimina deveres acessórios"
          ],
          [
            "Isenção no CTN",
            "Exclusão do crédito, não extinção"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "O rótulo da lei não cria hierarquia absoluta",
        "text": "Dispositivo apenas formalmente complementar e materialmente ordinário pode ser alterado por lei ordinária nos limites constitucionais."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A proteção da isenção onerosa exige analisar o prazo e as condições. A questão de 2020 não se fundamenta na SV62 de 2025: os precedentes anteriores já distinguiam matéria reservada àlei complementar de dispositivo materialmente ordinário. Tratados celebrados pela República também não se confundem com isenção heterônoma interna da União."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-fraude-fiscal",
    "title": "Fraude fiscal: antes × depois de 09/06/2005",
    "topic": "12 Garantias e administração",
    "law": "CTN, art.185; STJ, Tema290",
    "confirmed": [
      "3252193"
    ],
    "source": "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?cod_tema_inicial=290&cod_tema_final=290&novaConsulta=true&tipo_pesquisa=T",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "O marco temporal muda a regra",
        "rows": [
          [
            "Alienação",
            "Marco relevante"
          ],
          [
            "Até08/06/2005",
            "Citação do devedor na execução fiscal"
          ],
          [
            "A partir de 09/06/2005",
            "Inscrição regular em dívida ativa"
          ],
          [
            "Reserva de bens/rendas suficientes",
            "Afasta a presunção nos termos do art.185, parágrafo único"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Boa-fé não basta nesta hipótese",
        "text": "Não importar automaticamente aSúmula375 da execução comum para afastar a presunção absoluta tributária."
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Não omitir a reserva suficiente",
        "text": "A presunção pressupõe o cenário do art.185; alienação com patrimônio reservado suficiente tem tratamento distinto."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A jurisprudência do Tema290 dispensa registro de penhora e prova de má-fé no regime tributário. Alienações sucessivas não tornam relativa a presunção. O ato é ineficaz perante a cobrança nas condições legais; não ensinar que toda venda de devedor fiscal é proibida."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-preferencias-entes",
    "title": "Créditos fiscais concorrentes: hierarquia federativa × ordem das penhoras",
    "topic": "12 Garantias e administração",
    "law": "STF, ADPF357; CPC, arts.797 e908",
    "confirmed": [
      "3127385"
    ],
    "source": "https://www.gov.br/pgfn/pt-br/cidadania-tributaria/por-assunto/execucao-fiscal/penhora-e-indisponibilidade",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Caso concreto: três Fazendas e credor comum",
        "rows": [
          [
            "Credor",
            "Dívida",
            "Preferência narrada"
          ],
          [
            "Estado",
            "R$ 20.000",
            "Primeira penhora fiscal"
          ],
          [
            "Município",
            "R$ 10.000",
            "Segunda penhora fiscal"
          ],
          [
            "União",
            "R$ 30.000",
            "Terceira penhora fiscal"
          ],
          [
            "Rufino",
            "R$50.000",
            "Quirografário; recebe eventual sobra após os fiscais"
          ]
        ]
      },
      {
        "type": "formula",
        "text": "R$ 70.000 − R$ 20.000 − R$ 10.000 − R$ 30.000 = R$ 10.000 para o credor comum"
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "União não passa automaticamente àfrente",
        "text": "A ordem União–Estados–Municípios do antigo art.187, parágrafo único, foi afastada pela ADPF357."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O critério das penhoras é aplicado ao concurso singular narrado. Não universalizar essa ordem para falência ou situações de rateio em outros regimes. A preferência material tributária antecede o crédito quirografário, ainda que este seja mais antigo."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-sancoes-politicas",
    "title": "Retenção para fiscalizar × apreensão para cobrar tributo",
    "topic": "12 Garantias e administração",
    "law": "STF, ADI395 eSúmula323",
    "confirmed": [
      "300953"
    ],
    "source": "https://noticias.stf.jus.br/postsnoticias/stf-declara-constitucional-norma-tributaria-do-estado-de-sao-paulo/",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Finalidades distintas",
        "rows": [
          [
            "Medida",
            "Tratamento"
          ],
          [
            "Mercadoria sem documento idôneo; comprovação da posse legítima",
            "Fiscalização admitida na ADI395"
          ],
          [
            "Reter até o devedor pagar imposto",
            "Coação vedada pelaSúmula323"
          ],
          [
            "Obrigação acessória regular",
            "Não é automaticamente sanção política"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Questão com ressalva de unicidade",
        "text": "O PDF indicaE. A alternativaC admite leitura verdadeira em hipóteses de denúncia espontânea de tributos por homologação; não ensinar proibição absoluta."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A ressalva não equivale a declarar a questão anulada. A conclusão segura é a diferença entre fiscalização da origem/posse e retenção como instrumento de cobrança. O comando daSúmula360 é específico para tributo regularmente declarado e pago em atraso, e não uma vedação a todo tributo por homologação."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-averbacao-cda",
    "title": "CDA: publicidade registral × indisponibilidade administrativa",
    "topic": "12 Garantias e administração",
    "law": "STF, ADIs5881 e conexas",
    "confirmed": [
      "3419877"
    ],
    "source": "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=456910&ori=1",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "MesmaCDA, efeitos diferentes",
        "rows": [
          [
            "Ato",
            "Conclusão no julgamento"
          ],
          [
            "Averbação pré-executória em registro",
            "Admitida para publicidade e proteção de terceiros"
          ],
          [
            "Indisponibilidade dos bens peloFisco sem ordem judicial",
            "Vedada no regime examinado"
          ],
          [
            "Comunicação a cadastro de crédito",
            "Não se confunde automaticamente com bloqueio patrimonial"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Averbar não é tornar indisponível",
        "text": "Não usar a constitucionalidade da publicidade para justificar o bloqueio administrativo."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O STF julgou conjuntamente seisADIs em 2020. Os demais requisitos da cobrança e a fiscalização judicial continuam relevantes. Este quadro trata do regime específico da averbação pré-executória e não elimina todas as formas legais de restrição patrimonial."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-cda-correcao",
    "title": "CDA: erro de grafia × troca do sujeito passivo",
    "topic": "12 Garantias e administração",
    "law": "STJ, Súmula392",
    "confirmed": [
      "87990",
      "282885"
    ],
    "source": "https://scon.stj.jus.br/SCON/sumstj/toc.jsp?sumula=392.num.",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Parece erro de nome, mas o efeito é diferente",
        "rows": [
          [
            "Situação",
            "Substituir a CDA?"
          ],
          [
            "QTN em vez deQTRN: mesma empresa",
            "Sim, erro material/formal, no prazo admitido"
          ],
          [
            "Foi executada pessoa diferente da devedora",
            "Não para trocar o sujeito passivo"
          ],
          [
            "Momento da correção admitida",
            "Até a prolação da sentença de embargos"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "rule",
        "title": "Corrigir identificação não é criar outro devedor",
        "text": "Verifique se a pessoa é a mesma antes de classificar o problema como mero erro material."
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Não corrigir a qualquer tempo",
        "text": "A Súmula392 fixa limite processual e veda mudança do sujeito passivo."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A87990 descreve pessoa diversa, portanto não há simples correção de grafia. A282885 mantém a mesma empresa e corrige a escrita do nome. A concordância do executado não substitui os requisitos legais da correção."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-difal-simples",
    "title": "DIFAL doSimples: constitucionalidade × lei estadual",
    "topic": "ICMS",
    "law": "STF, Temas517 e1284",
    "confirmed": [
      "3228243"
    ],
    "source": "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=520843",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Duas perguntas sucessivas",
        "rows": [
          [
            "Pergunta",
            "Resposta"
          ],
          [
            "Pode haverDIFAL para empresa doSimples?",
            "Sim, conforme Tema517, mesmo sem compensação de créditos"
          ],
          [
            "Basta a previsão na LC123 e um decreto?",
            "Não: é necessária lei estadual em sentido estrito"
          ],
          [
            "Qual precedente explicita a legalidade?",
            "Tema1284, reafirmado em 2023"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "danger",
        "title": "Constitucional em tese não dispensa lei",
        "text": "O decreto não institui sozinho a obrigação tributária."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A posição da empresa na cadeia produtiva ou a ausência de creditamento não afasta, por si, a validade reconhecida no Tema517. A questão de 2025 combina esse ponto com a reserva de lei estadual do Tema1284."
          }
        ]
      }
    ]
  },
  {
    "id": "lote-icms-tres-regras",
    "title": "ICMS: transferência entre filiais × restituiçãoST × energia",
    "topic": "ICMS",
    "law": "STF, ADC49 eTemas201,745 e1367",
    "confirmed": [
      "3685885"
    ],
    "source": "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=464511&tip=UN",
    "checkedAt": "2026-11-03",
    "evidence": "Núcleo conferido; observar contexto temporal e ressalvas das questões",
    "blocks": [
      {
        "type": "table",
        "title": "Três regras, sem trocar o fundamento",
        "rows": [
          [
            "Tema",
            "Regra"
          ],
          [
            "Mero deslocamento entre estabelecimentos do mesmo titular",
            "Não é circulação jurídica tributável; observar regime e recorte temporal"
          ],
          [
            "Base efetiva inferior àpresumida no ICMS-ST",
            "Cabe restituição da diferença"
          ],
          [
            "Energia elétrica e seletividade",
            "Não adotar alíquota superior à geral desconsiderando a essencialidade"
          ]
        ]
      },
      {
        "type": "callout",
        "kind": "warning",
        "title": "Modulação exige atualização",
        "text": "O Tema1367 foi alterado emembargos: não autoriza cobrança de operações anteriores a 2024 em que o tributo não foi pago. Não usar a tese anterior como regra atual fixa."
      },
      {
        "type": "detail",
        "title": "Ver explicação detalhada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "O itemII resolve o gabaritoC. ADC49/Tema1099 eTema745 afastam as generalizações dos itensI eIII. A transferência tem disciplina legal própria, inclusive opção de equiparação, e o resumo não dispensa verificar o fato, a data e a legislação aplicável. Para a restituiçãoST, o Tema201 compara a base efetiva com a presumida."
          }
        ]
      }
    ]
  }
];
const bindings131={"lote-declaracao-prescricao": ["1147525", "87988"], "dt-preferencias": ["3670604"], "dt-certidoes": ["1768970"]};
const blocks131={"dt-certidoes": [{"type": "table", "title": "CPEN: garantia e condição do ente público", "rows": [["Hipótese", "Cuidado"], ["Ente público em ação anulatória/execução embargada", "Tema273 admiteCPEN sem penhora"], ["Garantia antecipada idônea", "Tema237 pode permitirCPEN; não éCND automática"], ["Fiança versus depósito integral", "Não equiparar para todos os efeitos; contexto legal e temporal importam"]]}, {"type": "callout", "kind": "warning", "title": "Atualização posterior àprova", "text": "O art.151, X, acrescido em 2026, é hipótese autônoma condicionada. Não reescrever o gabarito de 2021 como se já existisse."}], "dt-preferencias": [{"type": "table", "title": "Falência: tributo principal × multa", "rows": [["Crédito", "Tratamento no CTN"], ["Tributo concursal", "Não prefere a extraconcursais, restituições e garantia real no limite legal"], ["Multa tributária", "Prefere apenas aos subordinados"], ["Fato gerador no curso da falência", "Tributo extraconcursal: art.188"]]}]};
export const visualGuides=[...reviewed116.map(g=>bindings131[g.id]?{...g,confirmed:[...g.confirmed,...bindings131[g.id]],blocks:[...g.blocks,...(blocks131[g.id]||[])],evidence:"Núcleo conferido; observar ressalvas e contexto temporal nas questões"}:g),...guides131];
