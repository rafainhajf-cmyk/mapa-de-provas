// Revisão por conceitos. Fontes anteriores e IDs de leitura permanecem no catálogo.
export const macroConcepts = {
  "macro-topico-02": [
    {
      "title": "PIB: três óticas, uma mesma produção",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Ótica",
              "O que mede",
              "Como calcular"
            ],
            [
              "Produto",
              "Valor adicionado no território",
              "Produção − consumo intermediário + impostos líquidos sobre produtos"
            ],
            [
              "Renda",
              "Renda gerada na produção",
              "Remunerações + excedente + rendimento misto + impostos líquidos"
            ],
            [
              "Despesa",
              "Destino dos bens e serviços finais",
              "C + I + G + X − M"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "PIB = C + I + G + X − M"
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — ótica da despesa",
          "text": "C = 600; I = 150; G = 200; X = 100; M = 80. PIB = 600 + 150 + 200 + 100 − 80 = 970."
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: importar não é produzir internamente",
          "text": "M retira a produção estrangeira já incluída nos gastos. Transferências às famílias não entram diretamente em G; compra de ações não é formação de capital."
        }
      ]
    },
    {
      "title": "Interno × nacional · bruto × líquido · mercado × fatores",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Troca de conceito",
              "Operação",
              "Cuidado"
            ],
            [
              "PIB → PNB / RNB",
              "Subtrair RLEE ou somar RLRE",
              "Residentes, não nacionalidade do proprietário"
            ],
            [
              "Bruto → líquido",
              "Subtrair depreciação",
              "Desgaste do capital"
            ],
            [
              "Mercado → custo de fatores",
              "Subtrair impostos indiretos e somar subsídios",
              "Convenção tradicional de exercícios"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "RN = PNLcf = PIBpm − RLEE − depreciação − impostos indiretos + subsídios"
        },
        {
          "type": "flowchart",
          "title": "Como chegar à renda nacional — convenção tradicional",
          "steps": [
            {
              "label": "PIBpm: 300",
              "kind": "success"
            },
            {
              "label": "− RLEE: 35 → PNBpm: 265",
              "kind": "success"
            },
            {
              "label": "− depreciação: 30 → PNLpm: 235",
              "kind": "success"
            },
            {
              "label": "− impostos: 100 + subsídios: 30 → PNLcf: 165",
              "kind": "success"
            }
          ]
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "Cuidado com a convenção",
          "text": "A metodologia moderna distingue preços básicos e de mercado. Use custo de fatores quando o exercício adotar essa apresentação. Se a renda líquida do exterior for recebida, some; se for enviada, subtraia."
        }
      ]
    },
    {
      "title": "PIB nominal × real × deflator",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Medida",
              "Preços utilizados",
              "O que pode variar"
            ],
            [
              "Nominal",
              "Do próprio período",
              "Preços e quantidades"
            ],
            [
              "Real",
              "De referência, no exercício simplificado",
              "Quantidades"
            ],
            [
              "Deflator",
              "Índice implícito: nominal ÷ real × 100",
              "Preços da produção interna"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "Deflator = (PIB nominal ÷ PIB real) × 100"
        },
        {
          "type": "formula",
          "text": "PIB real = (PIB nominal ÷ deflator) × 100"
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — crescimento real",
          "text": "Ano A: nominal 100 e deflator 105 → real 95,24. Ano B: nominal 125 e deflator 125 → real 100. Crescimento real = (100 ÷ 95,24 − 1) × 100 ≈ 5%."
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: nominal maior não prova crescimento real",
          "text": "O PIB nominal pode aumentar somente por alta de preços. O deflator não é a mesma cesta fixa de um índice de preços ao consumidor."
        }
      ]
    }
  ],
  "macro-topico-04": [
    {
      "title": "Consumo e poupança: marginal × média",
      "blocks": [
        {
          "type": "formula",
          "text": "C = C₀ + c·Yd     |     S = −C₀ + (1 − c)·Yd"
        },
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Indicador",
              "Fórmula",
              "Leitura"
            ],
            [
              "PMgC (c)",
              "ΔC ÷ ΔYd",
              "Quanto do acréscimo de renda é consumido"
            ],
            [
              "PMgP (s)",
              "ΔS ÷ ΔYd = 1 − c",
              "Quanto do acréscimo é poupado"
            ],
            [
              "PMeC",
              "C ÷ Yd = C₀/Yd + c",
              "Parcela da renda total consumida"
            ]
          ]
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido",
          "text": "C₀ = 100; c = 0,8; Yd = 1.000 → C = 900; S = 100. PMgC = 0,8; PMeC = 0,9."
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: marginal ≠ média",
          "text": "Com consumo autônomo positivo, C/Yd difere de c. No modelo simples, c + s = 1."
        }
      ]
    },
    {
      "title": "Multiplicadores: escolha pelas hipóteses",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Modelo",
              "Multiplicador dos gastos autônomos",
              "Hipóteses"
            ],
            [
              "Fechado, sem tributação proporcional",
              "k = 1/(1 − c)",
              "Preços fixos; capacidade ociosa; juros e investimento dados"
            ],
            [
              "Fechado, tributo T = T₀ + tY",
              "k = 1/[1 − c(1 − t)]",
              "t é a alíquota marginal"
            ],
            [
              "Aberto, M = M₀ + mY",
              "k = 1/[1 − c(1 − t) + m]",
              "m é a propensão marginal a importar"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "ΔY = k·ΔA     |     Y de equilíbrio = k·A"
        },
        {
          "type": "flowchart",
          "title": "Por que a renda se multiplica?",
          "steps": [
            {
              "label": "Gasto autônomo aumenta 100",
              "kind": "success"
            },
            {
              "label": "Vira renda: consumo adicional de 80 (c = 0,8)",
              "kind": "success"
            },
            {
              "label": "Nova renda gera consumo de 64",
              "kind": "success"
            },
            {
              "label": "Rodadas sucessivas → ΔY = 100/(1 − 0,8) = 500",
              "kind": "success"
            }
          ]
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — renda de equilíbrio",
          "text": "C = 0,8Y; I = 100; G = 200. A = 300; k = 5; Y = 1.500. Se houvesse C₀ = 50, A seria 350 e Y seria 1.750."
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "Cuidado: vazamentos reduzem k",
          "text": "Maior poupança marginal, tributação proporcional ou importações reduzem o efeito. Não aplique k = 5 a qualquer economia sem verificar as hipóteses."
        }
      ]
    },
    {
      "title": "Gastos × tributos × transferências",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Mudança no modelo fechado com tributos fixos",
              "Multiplicador",
              "Com c = 0,8"
            ],
            [
              "Gastos públicos G",
              "1/(1 − c)",
              "+5"
            ],
            [
              "Tributos autônomos T₀",
              "−c/(1 − c)",
              "−4"
            ],
            [
              "Transferências autônomas TR",
              "c/(1 − c)",
              "+4"
            ],
            [
              "Orçamento equilibrado: ΔG = ΔT₀",
              "1",
              "ΔY = ΔG"
            ]
          ]
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: tributo tem sinal negativo",
          "text": "Elevar T₀ em 100 reduz Y em 400 neste modelo. O multiplicador de orçamento equilibrado igual a 1 depende dessas hipóteses; não é regra geral para economia aberta."
        }
      ]
    }
  ],
  "macro-topico-03": [
    {
      "title": "Balanço de pagamentos: classifique a operação",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Regra central",
          "text": "O BP registra transações entre residentes e não residentes durante um período. Residência econômica é o critério."
        },
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conta",
              "Inclui",
              "Exemplo"
            ],
            [
              "Transações correntes — bens",
              "Exportação e importação de mercadorias",
              "Venda de café ao exterior"
            ],
            [
              "Transações correntes — serviços",
              "Transportes, viagens, seguros e outros serviços",
              "Gasto de turista brasileiro no exterior"
            ],
            [
              "Transações correntes — renda primária",
              "Juros, dividendos e remunerações",
              "Juros de empréstimo externo"
            ],
            [
              "Transações correntes — renda secundária",
              "Transferências correntes sem contraprestação",
              "Remessa pessoal"
            ],
            [
              "Capital",
              "Transferências de capital e ativos não financeiros não produzidos",
              "Perdão de dívida, quando classificado como transferência de capital"
            ],
            [
              "Financeira",
              "Investimento direto, carteira, derivativos, outros e reservas",
              "Empréstimo externo e aquisição de títulos"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "TC = bens + serviços + renda primária + renda secundária"
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: juros ≠ principal",
          "text": "Juros são renda primária; contratação e amortização do principal são transações financeiras. Conta capital não reúne todos os movimentos de capitais."
        }
      ]
    },
    {
      "title": "Conta financeira: ativo × passivo e sinais BPM6",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Transação",
              "Registro do componente",
              "Contribuição para CF"
            ],
            [
              "Residente adquire título externo",
              "Ativo aumenta: +20",
              "+20"
            ],
            [
              "Não residente adquire ação brasileira de residente",
              "Passivo aumenta: +30",
              "−30"
            ],
            [
              "Residente vende ativo externo a não residente",
              "Ativo diminui: −10",
              "−10"
            ],
            [
              "Residente amortiza dívida externa",
              "Passivo diminui: −8",
              "+8"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "CF = aquisição líquida de ativos − incorrência líquida de passivos"
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — totais líquidos",
          "text": "Com contrapartidas já consideradas: ativos = 40 e passivos = 70 → CF = 40 − 70 = −30: captação líquida de financiamento."
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "Cada operação tem contrapartida",
          "text": "As linhas isolam um componente. Comprar título usando depósito já mantido no exterior pode apenas trocar a composição dos ativos. Não conclua o saldo total a partir de uma única perna da operação."
        }
      ]
    },
    {
      "title": "Fechamento e reservas: mantenha uma convenção",
      "blocks": [
        {
          "type": "formula",
          "text": "TC + CK + EO = CF     |     EO = CF − TC − CK"
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — fechamento BPM6",
          "text": "TC = −30; CK = 0; EO = 0 → CF = −30. O déficit corrente corresponde à captação líquida de financiamento."
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: não contar reservas duas vezes",
          "text": "Ativos de reserva integram a conta financeira no BPM6. Não acrescente a mesma variação novamente por fora de CF."
        },
        {
          "type": "flowchart",
          "title": "Roteiro para resolver a questão",
          "steps": [
            {
              "label": "Identifique residentes e não residentes",
              "kind": "success"
            },
            {
              "label": "Classifique: corrente, capital ou financeira",
              "kind": "success"
            },
            {
              "label": "Na financeira, separe ativos de passivos",
              "kind": "success"
            },
            {
              "label": "Registre a contrapartida e confira os sinais do enunciado",
              "kind": "success"
            }
          ]
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "Fluxo × estoque",
          "text": "BP é fluxo do período; Posição de Investimento Internacional é estoque numa data. Variação cambial pode alterar o estoque sem ser transação do BP."
        }
      ]
    }
  ],
  "macro-topico-05": [
    {
      "title": "Moeda: funções e quem mantém o dinheiro",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Função",
              "Significado",
              "Exemplo"
            ],
            [
              "Meio de troca",
              "Intermediar pagamentos",
              "Pagar uma compra"
            ],
            [
              "Unidade de conta",
              "Expressar preços e dívidas",
              "Preço em reais"
            ],
            [
              "Reserva de valor",
              "Transferir poder de compra no tempo",
              "Manter saldo para usar depois"
            ]
          ]
        },
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Sigla",
              "Conceito",
              "Relação"
            ],
            [
              "PMC",
              "Papel-moeda em circulação fora do BC",
              "Inclui caixa dos bancos"
            ],
            [
              "PMPP",
              "Papel-moeda em poder do público",
              "PMC − caixa dos bancos"
            ],
            [
              "RB",
              "Reservas bancárias no BC",
              "Não são depósitos à vista do público"
            ],
            [
              "BM / B",
              "Base monetária",
              "PMPP + caixa bancário + reservas no BC"
            ]
          ]
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: público ≠ bancos",
          "text": "Dinheiro no caixa bancário não é PMPP. Reservas dos bancos no BC não integram M1 como depósitos do público."
        }
      ]
    },
    {
      "title": "Agregados monetários: do restrito ao amplo",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Agregado — metodologia brasileira",
              "Acrescenta",
              "Como lembrar"
            ],
            [
              "M1",
              "PMPP + depósitos à vista",
              "Meios de pagamento restritos"
            ],
            [
              "M2",
              "M1 + poupança + títulos privados emitidos por instituições depositárias",
              "Captação bancária ampliada"
            ],
            [
              "M3",
              "M2 + quotas de fundos depositários (renda fixa, cambial e multimercado) + compromissadas com títulos públicos e privados",
              "Intermediação ampliada"
            ],
            [
              "M4",
              "M3 + títulos públicos federais",
              "Medida mais ampla deste conjunto"
            ]
          ]
        },
        {
          "type": "formula",
          "text": "M1 ⊂ M2 ⊂ M3 ⊂ M4"
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — base e M1",
          "text": "PMPP = 100; depósitos à vista = 400; caixa dos bancos = 20; reservas no BC = 80. M1 = 500; base = 100 + 20 + 80 = 200."
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "Cuidado com a definição adotada",
          "text": "A composição segue a metodologia brasileira revisada em 2018. Materiais antigos podem usar outra classificação. Siga a data da prova; os saldos são consolidados para evitar dupla contagem."
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha: M4 não é todo patrimônio",
          "text": "Imóveis e ações não entram automaticamente em M4. Transferir depósito à vista para poupança pode reduzir M1 sem reduzir M2."
        }
      ]
    },
    {
      "title": "Multiplicador monetário × multiplicador keynesiano",
      "blocks": [
        {
          "type": "formula",
          "text": "m monetário = M1/B = (1 + c)/(c + r)"
        },
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Parâmetro do modelo monetário",
              "Definição",
              "Efeito, demais condições constantes"
            ],
            [
              "c",
              "PMPP ÷ depósitos à vista",
              "Mais retenção de papel-moeda tende a reduzir m"
            ],
            [
              "r",
              "Reservas bancárias totais ÷ depósitos à vista",
              "Mais reservas tende a reduzir m"
            ],
            [
              "k keynesiano",
              "1/(1 − PMgC), no modelo simples",
              "Relaciona gasto autônomo à renda"
            ]
          ]
        },
        {
          "type": "callout",
          "kind": "rule",
          "title": "Exemplo resolvido — multiplicador da base",
          "text": "c = 0,25; r = 0,25 → m = 1,25/0,50 = 2,5. Base de 200 corresponde a M1 de 500, mantidas as razões."
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "A letra c muda de sentido",
          "text": "Aqui c é a razão papel-moeda/depósitos; no multiplicador keynesiano c costuma ser a propensão marginal a consumir. Confira a definição antes de substituir valores."
        },
        {
          "type": "flowchart",
          "title": "Criação de depósitos no modelo simples",
          "steps": [
            {
              "label": "Banco recebe depósito",
              "kind": "success"
            },
            {
              "label": "Retém reservas e concede crédito",
              "kind": "success"
            },
            {
              "label": "Pagamento gera novo depósito no sistema",
              "kind": "success"
            },
            {
              "label": "Novas rodadas, limitadas por reservas e retenção de dinheiro",
              "kind": "success"
            }
          ]
        }
      ]
    }
  ],
  "macro-topico-01": [
    {
      "title": "00.1 ORDEM SUGERIDA",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Conceitos e Contas Nacionais",
              "01 → 09."
            ],
            [
              "Moeda e estabilidade de preços",
              "02 → 03 → 04."
            ],
            [
              "Demanda agregada e políticas",
              "05 → 06 → 07."
            ]
          ]
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Crescimento e desemprego: 08."
            }
          ]
        }
      ]
    },
    {
      "title": "00.2 DOCUMENTOS EDITÁVEIS",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "MACRO 01 — Contas Nacionais, PIB, PNB e Deflator"
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 01 — Contas Nacionais, PIB, PNB e Deflator"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 02 — Moeda, Base Monetária e M1–M4"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 03 — BC, Multiplicador e Instrumentos Monetários"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 04 — Inflação, Índices e Metas"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 05 — Keynes e Equivalência Ricardiana"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 06 — IS-LM e Armadilha da Liquidez"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 07 — Políticas Fiscal e Monetária / Crowding-out"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 08 — Phillips e Solow"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 09 — Câmbio e Balanço de Pagamentos"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "FONTES ORIGINAIS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Biblioteca de Conteúdo > Macroeconomia — PDFs e notas preservados: https://drive.google.com/drive/folders/1oYS6LP81ZS-CuX8diBmHJoPYjih1L_Xr"
            }
          ]
        }
      ]
    },
    {
      "title": "00.3 IMPORTANTE",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Alguns PDFs originais continham apenas título, sem explicação extraível; nesses casos o esquema didático foi completado com conceitos econômicos consolidados, e não apresentado como transcrição literal do PDF. Informações institucionais (CMN, Copom, inflação e agregados) foram conferidas em materiais públicos do Banco Central em 2026."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Alguns PDFs originais continham apenas título, sem explicação extraível; nesses casos o esquema didático foi completado com conceitos econômicos consolidados, e não apresentado como transcrição literal do PDF. Informações institucionais (CMN, Copom, inflação e agregados) foram conferidas em materiais públicos do Banco Central em 2026."
            }
          ]
        }
      ]
    }
  ],
  "macro-topico-06": [
    {
      "title": "06.1 Visão geral",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "LM: equilíbrio monetário; inclinação positiva no modelo padrão."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "LM: equilíbrio monetário; inclinação positiva no modelo padrão."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Equilíbrio simultâneo: interseção IS-LM, determinando renda Y e juros i."
            }
          ]
        }
      ]
    },
    {
      "title": "06.2 DESLOCAMENTOS",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Política fiscal expansionista → IS direita → Y e juros tendem a subir."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Política fiscal expansionista → IS direita → Y e juros tendem a subir."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Fiscal contracionista → IS esquerda."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Expansão monetária → LM direita/baixo → Y tende a subir e juros a cair."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Contração monetária → LM esquerda/cima."
            }
          ]
        }
      ]
    },
    {
      "title": "06.3 CASOS ESPECIAIS",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "LM horizontal (armadilha da liquidez)",
              "expansão monetária tem baixa eficácia; política fiscal tende a ser eficaz."
            ],
            [
              "LM vertical (caso clássico simplificado)",
              "fiscal afeta sobretudo juros e não o produto; monetária tem maior eficácia."
            ],
            [
              "IS vertical (gastos insensíveis aos juros)",
              "política monetária altera juros sem expandir produto; política fiscal atua mais intensamente sobre produto."
            ],
            [
              "CUIDADO",
              "uma mudança de juros pode mover o equilíbrio ao longo de uma curva sem deslocá-la. Deslocamento da curva depende de outras variáveis exógenas."
            ]
          ]
        }
      ]
    },
    {
      "title": "06.4 LEITURA DE GRÁFICOS (EIXOS E MOVIMENTOS)",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Na representação usual, renda/produto Y está no eixo horizontal e taxa de juros i no vertical."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na representação usual, renda/produto Y está no eixo horizontal e taxa de juros i no vertical."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "IS desce: juros maiores tendem a reduzir investimento sensível aos juros e demanda por bens, diminuindo Y de equilíbrio nesse mercado."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "LM sobe: renda mais alta aumenta demanda por moeda; mantendo oferta real de moeda, juros precisam se elevar para equilibrar mercado monetário."
            }
          ]
        }
      ]
    },
    {
      "title": "06.5 QUADRO DE COMPARAÇÃO DAS POLÍTICAS — MODELO SIMPLIFICADO",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Fiscal expansiva",
              "IS → direita; produto ↑ e juros ↑, com possível crowding-out parcial do investimento privado."
            ],
            [
              "Monetária expansiva",
              "LM → direita/baixo; produto ↑ e juros ↓."
            ],
            [
              "Armadilha da liquidez (LM horizontal)",
              "monetária perde eficácia no produto, fiscal tende a ser eficaz."
            ],
            [
              "Caso clássico (LM vertical)",
              "deslocamento de IS altera juros, não produto; deslocamento de LM pode alterar produto."
            ],
            [
              "Caso de IS vertical",
              "monetária muda juros, mas não produto; política fiscal desloca renda."
            ],
            [
              "EXEMPLO",
              "aumento de gastos públicos desloca IS à direita; o aumento de juros reduz parte do investimento privado. É efeito 'crowding-out', não a mesma coisa que uma elevação do PIB automático no valor exato dos gastos."
            ],
            [
              "PEGADINHA",
              "maior elasticidade da demanda por moeda aos juros costuma tornar LM mais PLANA; maior sensibilidade do investimento aos juros costuma tornar IS mais PLANA."
            ]
          ]
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "As conclusões são do IS-LM clássico de curto prazo com preços dados; não generalizar para toda teoria macroeconômica."
            }
          ]
        }
      ]
    }
  ],
  "macro-topico-08": [
    {
      "title": "04.1 Visão geral",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "IPCA",
              "índice do IBGE usado como referência do regime brasileiro de metas de inflação."
            ],
            [
              "INPC",
              "índice do IBGE com população-alvo distinta do IPCA."
            ],
            [
              "IGP-M",
              "índice da FGV; composição clássica: IPA (60%) + IPC (30%) + INCC (10%)."
            ],
            [
              "Deflator do PIB",
              "índice implícito de preços da produção medida pelo PIB; não é sinônimo de IPCA."
            ],
            [
              "IPA",
              "preços ao produtor. IPC: preços ao consumidor na metodologia da FGV. INCC: custo da construção."
            ]
          ]
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "QUEM MEDE O QUÊ?"
            }
          ]
        }
      ]
    },
    {
      "title": "04.2 INFLAÇÃO X NÍVEL DE PREÇOS",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Inflação",
              "taxa de variação do nível geral de preços; inflação menor ainda pode significar preços subindo, mas mais lentamente."
            ],
            [
              "Deflação",
              "queda do nível geral de preços."
            ],
            [
              "Desinflação",
              "inflação positiva, porém em desaceleração."
            ]
          ]
        }
      ]
    },
    {
      "title": "04.3 REGIME DE METAS NO BRASIL — DISTINÇÃO HISTÓRICA",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Até 2024",
              "verificação da inflação no ano-calendário."
            ],
            [
              "Desde janeiro de 2025",
              "meta contínua, aferida mensalmente pela variação acumulada do IPCA em 12 meses."
            ],
            [
              "Meta fixada",
              "3% com tolerância de ±1,5 ponto percentual (faixa 1,5% a 4,5%). A sistemática considera descumprimento quando a inflação fica seis meses consecutivos fora da banda."
            ]
          ]
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "CMN estabelece a meta para a inflação; Banco Central executa a política monetária; Copom decide a meta da taxa Selic."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "O Copom controla o instrumento de juros e usa operações de mercado aberto para aproximar a Selic efetiva da meta."
            }
          ]
        }
      ]
    },
    {
      "title": "04.4 PEGADINHAS",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "CMN não é Copom; fixar a meta de inflação não é fixar a meta Selic."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "CMN não é Copom; fixar a meta de inflação não é fixar a meta Selic."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "IPCA ≠ IGP-M ≠ deflator do PIB."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Meta contínua a partir de 2025 ≠ checagem apenas em dezembro."
            }
          ]
        }
      ]
    },
    {
      "title": "08.1 PHILLIPS: CURTO PRAZO",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Relação empírica originalmente entre desemprego e salários nominais; versões modernas abordam inflação e hiato de atividade/desemprego."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Relação empírica originalmente entre desemprego e salários nominais; versões modernas abordam inflação e hiato de atividade/desemprego."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No curto prazo, sob certas hipóteses, desemprego menor pode pressionar salários e inflação."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Inflação esperada e choques de oferta também deslocam a curva: não há troca simples e invariável entre inflação e desemprego."
            }
          ]
        }
      ]
    },
    {
      "title": "08.2 PHILLIPS: LONGO PRAZO",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Na versão com expectativas ajustadas, a curva de longo prazo é vertical na taxa natural de desemprego: tentar manter desemprego abaixo dessa referência pode produzir inflação crescente."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na versão com expectativas ajustadas, a curva de longo prazo é vertical na taxa natural de desemprego: tentar manter desemprego abaixo dessa referência pode produzir inflação crescente."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Choque de petróleo/custos: pode elevar inflação E desemprego; não representa mero deslocamento ao longo da mesma curva."
            }
          ]
        }
      ]
    },
    {
      "title": "08.4 PEGADINHAS",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Phillips original usava salários; versões posteriores usam inflação."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Phillips original usava salários; versões posteriores usam inflação."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Curto prazo ≠ longo prazo; expectativas importam."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Elevar nível estacionário do PIB per capita não é elevar sua taxa de crescimento permanentemente."
            }
          ]
        }
      ]
    }
  ],
  "macro-topico-09": [
    {
      "title": "07.1 Visão geral",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Fiscal",
              "governo altera GASTOS, TRIBUTOS e transferências no quadro orçamentário; afeta demanda agregada e incentivos."
            ],
            [
              "Monetária",
              "Banco Central atua sobre CONDIÇÕES MONETÁRIAS, liquidez e taxa de juros, via instrumentos próprios."
            ],
            [
              "Cambial",
              "intervenções e regime cambial; não confundir com política monetária, embora possam interagir."
            ]
          ]
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "QUAL INSTRUMENTO?"
            }
          ]
        }
      ]
    },
    {
      "title": "07.2 EXPANSIONISTA X CONTRACIONISTA",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Fiscal expansionista",
              "G↑ ou tributos↓ → demanda agregada tende a ↑ no curto prazo."
            ],
            [
              "Fiscal contracionista",
              "G↓ ou tributos↑ → demanda agregada tende a ↓."
            ],
            [
              "Monetária expansionista",
              "liquidez↑, juros↓, crédito e gasto sensíveis aos juros tendem a ↑."
            ],
            [
              "Monetária contracionista",
              "liquidez↓, juros↑, crédito e gasto tendem a ↓."
            ]
          ]
        }
      ]
    },
    {
      "title": "07.3 CROWDING-OUT (EFEITO EXPULSÃO)",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Gasto público maior → eleva demanda de recursos financeiros/renda → juros podem subir → investimento privado sensível aos juros pode cair → efeito líquido do estímulo fiscal sobre produto fica menor."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Gasto público maior → eleva demanda de recursos financeiros/renda → juros podem subir → investimento privado sensível aos juros pode cair → efeito líquido do estímulo fiscal sobre produto fica menor."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No modelo IS-LM padrão, vê-se pela IS à direita, subida de i e redução parcial de investimentos privados."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não é necessariamente eliminação completa do efeito fiscal: intensidade depende de sensibilidade da IS/LM e das condições econômicas."
            }
          ]
        }
      ]
    },
    {
      "title": "07.4 POLÍTICA MONETÁRIA COMO ACOMODAÇÃO",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Se BC expande moeda ao mesmo tempo que o estímulo fiscal, pode limitar elevação dos juros e o deslocamento privado; o resultado depende da inflação, das expectativas e do regime monetário."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Se BC expande moeda ao mesmo tempo que o estímulo fiscal, pode limitar elevação dos juros e o deslocamento privado; o resultado depende da inflação, das expectativas e do regime monetário."
            }
          ]
        }
      ]
    },
    {
      "title": "07.5 EXEMPLOS DE PROVA",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Venda de títulos pelo BC no mercado aberto = contracionista em liquidez."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Venda de títulos pelo BC no mercado aberto = contracionista em liquidez."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento de G = fiscal expansionista, ainda que financiado por dívida."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento do compulsório = monetária contracionista, ceteris paribus."
            }
          ]
        }
      ]
    },
    {
      "title": "07.6 PEGADINHAS",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Meta Selic é definida pelo Copom; meta da inflação pelo CMN."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Meta Selic é definida pelo Copom; meta da inflação pelo CMN."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Política fiscal não é medida agregada do PIB; é conjunto de decisões e instrumentos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Crowding-out ≠ equivalência ricardiana, embora ambas limitem efeitos de certos estímulos em modelos diferentes."
            }
          ]
        }
      ]
    },
    {
      "title": "03.1 BALANÇO PATRIMONIAL CONCEITUAL DO BC",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Ativos: títulos, reservas internacionais, operações de crédito e demais ativos."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Ativos: títulos, reservas internacionais, operações de crédito e demais ativos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Passivos: moeda emitida, reservas e depósitos de instituições financeiras e outras obrigações."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não confundir operações com o Tesouro e emissão de moeda com identidade entre dinheiro e receita tributária."
            }
          ]
        }
      ]
    },
    {
      "title": "03.2 MULTIPLICADOR",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "m = M1 ÷ base monetária (definição básica)."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "m = M1 ÷ base monetária (definição básica)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Se c = moeda em poder do público / depósitos à vista e r = reservas dos bancos / depósitos à vista, o modelo simplificado dá m = (1+c)/(r+c)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Quanto maior o encaixe/compulsório r, menor tende a ser a capacidade de multiplicação, mantendo os demais fatores constantes."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Exemplo: c = 0,2 e r = 0,1 → m = 1,2/0,3 = 4."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "O multiplicador NÃO é universalmente igual a 1/compulsório; isso pressupõe hipóteses simplificadoras restritivas."
            }
          ]
        }
      ]
    },
    {
      "title": "03.3 INSTRUMENTOS DA POLÍTICA MONETÁRIA",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Venda de títulos pelo BC no mercado aberto → retira liquidez (contracionista, ceteris paribus)."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Venda de títulos pelo BC no mercado aberto → retira liquidez (contracionista, ceteris paribus)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Compra de títulos → injeta liquidez (expansionista)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento do compulsório → reduz recursos livres do sistema bancário."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Redução do compulsório → expande espaço para concessão de crédito."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Redesconto: instrumento de liquidez e crédito às instituições, dependendo da modalidade."
            }
          ]
        }
      ]
    },
    {
      "title": "03.4 SENHORIAGEM",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Ganho econômico decorrente da emissão de moeda; não se resume, em macroeconomia, a uma comparação mecânica entre valor facial e custo de impressão."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Ganho econômico decorrente da emissão de moeda; não se resume, em macroeconomia, a uma comparação mecânica entre valor facial e custo de impressão."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Imposto inflacionário: perda de poder aquisitivo dos saldos monetários pela inflação. Relaciona-se à emissão, mas não é termo rigorosamente idêntico à senhoriagem em toda formulação."
            }
          ]
        }
      ]
    }
  ],
  "macro-topico-10": [
    {
      "title": "09.1 CÂMBIO NOMINAL (CONVENÇÃO REAL POR DÓLAR)",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "E = R$/US$; mede quantos reais compram um dólar."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "E = R$/US$; mede quantos reais compram um dólar."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "E sobe (de 5 para 6) → real se deprecia nominalmente; dólar fica mais caro em reais."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "E cai (de 6 para 5) → real se aprecia nominalmente."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Cuidado: na cotação inversa US$/R$, o sentido da variação se inverte."
            }
          ]
        }
      ]
    },
    {
      "title": "09.2 CÂMBIO REAL",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "q = E × P* / P, com P* nível de preços externo e P nível de preços interno."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "q = E × P* / P, com P* nível de preços externo e P nível de preços interno."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento de q = depreciação real na convenção adotada; bens externos tornam-se relativamente mais caros em moeda doméstica."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "q constante não significa E constante: diferenças na inflação interna/externa podem compensar variação cambial nominal."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Exemplo: E=5, P*=120, P=100 → q=6; se E=4, P*=150 e P=100 → q permanece 6."
            }
          ]
        }
      ]
    }
  ],
  "macro-topico-11": [
    {
      "title": "08.3 SOLOW: PRODUTO POR TRABALHADOR",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Capital por trabalhador k; produção por trabalhador y=f(k)."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Capital por trabalhador k; produção por trabalhador y=f(k)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Acumulação de capital aumenta produção, mas retornos marginais decrescentes dificultam crescimento sustentado de y somente pela acumulação, na versão básica."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No estado estacionário, investimento por trabalhador efetivo se iguala à reposição exigida pelo desgaste, crescimento populacional e progresso tecnológico, conforme o modelo."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "O QUE A POUPANÇA MUDA?"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Taxa de poupança maior → estado estacionário com MAIS capital e produto por trabalhador."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na versão básica sem progresso tecnológico, NÃO aumenta permanentemente a taxa de crescimento do produto por trabalhador no estado estacionário; gera crescimento temporariamente maior durante a transição."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Com progresso tecnológico exógeno, o crescimento sustentado por trabalhador é explicado pela tecnologia, não apenas pela taxa de poupança."
            }
          ]
        }
      ]
    }
  ],
  "macro-revisao-integrada": [
    {
      "title": "00.1 ORDEM SUGERIDA",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Conceito",
              "Regra ou fórmula"
            ],
            [
              "Conceitos e Contas Nacionais",
              "01 → 09."
            ],
            [
              "Moeda e estabilidade de preços",
              "02 → 03 → 04."
            ],
            [
              "Demanda agregada e políticas",
              "05 → 06 → 07."
            ]
          ]
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Crescimento e desemprego: 08."
            }
          ]
        }
      ]
    },
    {
      "title": "00.2 DOCUMENTOS EDITÁVEIS",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "MACRO 01 — Contas Nacionais, PIB, PNB e Deflator"
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 01 — Contas Nacionais, PIB, PNB e Deflator"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 02 — Moeda, Base Monetária e M1–M4"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 03 — BC, Multiplicador e Instrumentos Monetários"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 04 — Inflação, Índices e Metas"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 05 — Keynes e Equivalência Ricardiana"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 06 — IS-LM e Armadilha da Liquidez"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 07 — Políticas Fiscal e Monetária / Crowding-out"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 08 — Phillips e Solow"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 09 — Câmbio e Balanço de Pagamentos"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "FONTES ORIGINAIS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Biblioteca de Conteúdo > Macroeconomia — PDFs e notas preservados: https://drive.google.com/drive/folders/1oYS6LP81ZS-CuX8diBmHJoPYjih1L_Xr"
            }
          ]
        }
      ]
    },
    {
      "title": "00.3 IMPORTANTE",
      "blocks": [
        {
          "type": "callout",
          "kind": "rule",
          "title": "Conceito central",
          "text": "Alguns PDFs originais continham apenas título, sem explicação extraível; nesses casos o esquema didático foi completado com conceitos econômicos consolidados, e não apresentado como transcrição literal do PDF. Informações institucionais (CMN, Copom, inflação e agregados) foram conferidas em materiais públicos do Banco Central em 2026."
        },
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Alguns PDFs originais continham apenas título, sem explicação extraível; nesses casos o esquema didático foi completado com conceitos econômicos consolidados, e não apresentado como transcrição literal do PDF. Informações institucionais (CMN, Copom, inflação e agregados) foram conferidas em materiais públicos do Banco Central em 2026."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 00 — Índice e Trilha de Revisão",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "00.1 ORDEM SUGERIDA"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Conceitos e Contas Nacionais",
                  "01 → 09."
                ],
                [
                  "Moeda e estabilidade de preços",
                  "02 → 03 → 04."
                ],
                [
                  "Demanda agregada e políticas",
                  "05 → 06 → 07."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Crescimento e desemprego: 08."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "00.2 DOCUMENTOS EDITÁVEIS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 01 — Contas Nacionais, PIB, PNB e Deflator"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 02 — Moeda, Base Monetária e M1–M4"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 03 — BC, Multiplicador e Instrumentos Monetários"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 04 — Inflação, Índices e Metas"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 05 — Keynes e Equivalência Ricardiana"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 06 — IS-LM e Armadilha da Liquidez"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 07 — Políticas Fiscal e Monetária / Crowding-out"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 08 — Phillips e Solow"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "MACRO 09 — Câmbio e Balanço de Pagamentos"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "FONTES ORIGINAIS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Biblioteca de Conteúdo > Macroeconomia — PDFs e notas preservados: https://drive.google.com/drive/folders/1oYS6LP81ZS-CuX8diBmHJoPYjih1L_Xr"
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "00.3 IMPORTANTE"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Alguns PDFs originais continham apenas título, sem explicação extraível; nesses casos o esquema didático foi completado com conceitos econômicos consolidados, e não apresentado como transcrição literal do PDF. Informações institucionais (CMN, Copom, inflação e agregados) foram conferidas em materiais públicos do Banco Central em 2026."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 01 — Contas Nacionais, PIB, PNB e Deflator",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "01.0 Árvore de conversões — Interno, Nacional, Bruto e Líquido"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Transformação",
                  "Ida ↓",
                  "Volta ↑"
                ],
                [
                  "Interno ↔ Nacional",
                  "PIB → PNB: subtrair RLEE",
                  "PNB → PIB: somar RLEE"
                ],
                [
                  "Bruto ↔ Líquido",
                  "PIB → PIL: subtrair depreciação",
                  "PIL → PIB: somar depreciação"
                ],
                [
                  "Preços de mercado ↔ Custo de fatores",
                  "pm → cf: subtrair impostos indiretos e somar subsídios",
                  "cf → pm: somar impostos indiretos e subtrair subsídios"
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "Fluxo de transformação — PIBpm até PNLcf"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PIBpm 1.000 → (− RLEE 60) → PNBpm 940 → (− depreciação 100) → PNLpm 840 → (− impostos indiretos 80 + subsídios 20) → PNLcf 780."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "Pegadinhas"
            },
            {
              "type": "table",
              "rows": [
                [
                  "Atenção",
                  "Regra"
                ],
                [
                  "RLEE positiva",
                  "PIB é maior que PNB: PNB = PIB − RLEE."
                ],
                [
                  "RLEE negativa",
                  "Subtrair uma RLEE negativa aumenta o PNB."
                ],
                [
                  "Siglas",
                  "PIL = Produto Interno Líquido; PNL = Produto Nacional Líquido. Não usar PIN para Produto Interno Nacional."
                ],
                [
                  "Preços de mercado",
                  "Na abordagem tradicional de concursos: pm = cf + impostos indiretos − subsídios."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Referência visual: diagrama de conversão Interno/Nacional, Bruto/Líquido e preço de mercado/custo de fatores enviado pelo usuário. Esquema adaptado, sem reproduzir a imagem original."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "01.1 TRÊS ÓTICAS DO MESMO PIB"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Produto",
                  "soma do valor adicionado, evitando dupla contagem dos insumos intermediários."
                ],
                [
                  "Renda",
                  "remuneração dos fatores e componentes de renda da produção, com ajustes contábeis correspondentes."
                ],
                [
                  "Despesa",
                  "gasto com bens e serviços finais produzidos internamente."
                ],
                [
                  "IDENTIDADE",
                  "PIB = C + I + G + X − M."
                ],
                [
                  "C: consumo das famílias; I",
                  "formação bruta de capital (capital fixo + variação de estoques); G: consumo do governo; X: exportações; M: importações."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Por que subtrair importações? Porque C, I e G podem incluir bens importados, que não integram a produção doméstica."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "01.2 PIB X PNB"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PIB = produção dentro do território econômico nacional."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PNB = produto atribuído aos residentes nacionais; a diferença deriva das rendas primárias líquidas recebidas ou enviadas ao exterior."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No conceito das questões clássicas: PNB = PIB − RLEE."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "RLEE positiva (rendas enviadas superam recebidas) → PNB menor que PIB."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "RLEE negativa → PNB maior que PIB."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "01.3 NOMINAL X REAL"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "PIB nominal",
                  "quantidades multiplicadas pelos preços do período."
                ],
                [
                  "PIB real",
                  "quantidades avaliadas a preços constantes (ano-base/metodologia de volume)."
                ],
                [
                  "Exemplo",
                  "nominal 1200 e deflator 120 → real 1000."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Deflator do PIB = (PIB nominal ÷ PIB real) × 100, com índice de base igual a 100."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PIB real = PIB nominal × 100 ÷ deflator."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "01.4 PEGADINHAS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PIB mede fluxo de produção, não estoque de riqueza."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Compra de ações de segunda mão não constitui, por si, investimento produtivo do PIB."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Transferência de renda do governo não entra em G como compra direta de produção; pode financiar consumo das famílias."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PNB não é apenas o PIB somado à balança comercial."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "01.9 Teoria — produto agregado e dupla contagem"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "FGV 2022 SEFAZ-ES. Laranja: valor 20 e insumos 0. Morango: valor 10 e insumos 0. Suco: valor 50 e insumos 30. Gabarito B: produto agregado 50, valor adicionado 50 e VBP 80."
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Etapa",
                  "Valor bruto produzido",
                  "Insumos",
                  "Valor adicionado"
                ],
                [
                  "Laranja",
                  "20",
                  "0",
                  "20"
                ],
                [
                  "Morango",
                  "10",
                  "0",
                  "10"
                ],
                [
                  "Suco",
                  "50",
                  "30",
                  "20"
                ],
                [
                  "TOTAL",
                  "80",
                  "30",
                  "50"
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Pegadinha: 50 − 30 = 20 é somente o valor adicionado na etapa final. Somando todas as etapas, o valor adicionado total é 50. O VBP é 80 porque inclui o valor bruto de bens intermediários. Questão: https://www.tecconcursos.com.br/questoes/1888945"
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 02 — Moeda, Base Monetária e Agregados M1 a M4",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "02.1 FUNÇÕES DA MOEDA"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Meio de troca; unidade de conta; reserva de valor. A inflação prejudica sobretudo a função de reserva de valor."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Características relevantes: aceitação, divisibilidade, durabilidade, portabilidade e dificuldade de falsificação."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "02.2 TRÊS CONCEITOS NÃO INTERCAMBIÁVEIS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PME = papel-moeda emitido pelo Banco Central."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PMC = papel-moeda em circulação, após ajustes e retenções pertinentes."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "PMPP = papel-moeda em poder do público (não inclui o numerário nos caixas dos bancos)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Base monetária (conceito usual) = papel-moeda emitido em circulação + reservas bancárias no Banco Central, com metodologia específica das estatísticas."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M1 = PMPP + depósitos à vista."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Logo, PMC não pode ser simplesmente substituído por PMPP na fórmula de M1."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "02.3 AGREGADOS MONETÁRIOS DO BANCO CENTRAL"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M1: papel-moeda em poder do público + depósitos à vista."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M2: M1 + depósitos de poupança + títulos privados emitidos por instituições depositárias."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M3: M2 + cotas de fundos de investimento depositários + compromissadas com títulos públicos e privados."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M4: M3 + títulos públicos emitidos pelo governo federal detidos pelo público, conforme a metodologia."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Ordem de abrangência: M1 ⊂ M2 ⊂ M3 ⊂ M4."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "02.4 O QUE CONFUNDE A BANCA"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M1 mede liquidez imediata; aplicações remuneradas podem compor conceitos mais amplos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Caixa dos bancos comerciais NÃO entra diretamente em M1 como papel-moeda em poder do público."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "M1 não é sinônimo de base monetária."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Agregados refletem passivos/ativos monetários específicos definidos pela metodologia, não a soma indiscriminada de todos os investimentos."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 03 — Banco Central, Multiplicador e Instrumentos Monetários",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "03.1 BALANÇO PATRIMONIAL CONCEITUAL DO BC"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Ativos: títulos, reservas internacionais, operações de crédito e demais ativos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Passivos: moeda emitida, reservas e depósitos de instituições financeiras e outras obrigações."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não confundir operações com o Tesouro e emissão de moeda com identidade entre dinheiro e receita tributária."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "03.2 MULTIPLICADOR"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "m = M1 ÷ base monetária (definição básica)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Se c = moeda em poder do público / depósitos à vista e r = reservas dos bancos / depósitos à vista, o modelo simplificado dá m = (1+c)/(r+c)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Quanto maior o encaixe/compulsório r, menor tende a ser a capacidade de multiplicação, mantendo os demais fatores constantes."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Exemplo: c = 0,2 e r = 0,1 → m = 1,2/0,3 = 4."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "O multiplicador NÃO é universalmente igual a 1/compulsório; isso pressupõe hipóteses simplificadoras restritivas."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "03.3 INSTRUMENTOS DA POLÍTICA MONETÁRIA"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Venda de títulos pelo BC no mercado aberto → retira liquidez (contracionista, ceteris paribus)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Compra de títulos → injeta liquidez (expansionista)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento do compulsório → reduz recursos livres do sistema bancário."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Redução do compulsório → expande espaço para concessão de crédito."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Redesconto: instrumento de liquidez e crédito às instituições, dependendo da modalidade."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "03.4 SENHORIAGEM"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Ganho econômico decorrente da emissão de moeda; não se resume, em macroeconomia, a uma comparação mecânica entre valor facial e custo de impressão."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Imposto inflacionário: perda de poder aquisitivo dos saldos monetários pela inflação. Relaciona-se à emissão, mas não é termo rigorosamente idêntico à senhoriagem em toda formulação."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 04 — Inflação, Índices e Regime de Metas",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "04.1 Visão geral"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "IPCA",
                  "índice do IBGE usado como referência do regime brasileiro de metas de inflação."
                ],
                [
                  "INPC",
                  "índice do IBGE com população-alvo distinta do IPCA."
                ],
                [
                  "IGP-M",
                  "índice da FGV; composição clássica: IPA (60%) + IPC (30%) + INCC (10%)."
                ],
                [
                  "Deflator do PIB",
                  "índice implícito de preços da produção medida pelo PIB; não é sinônimo de IPCA."
                ],
                [
                  "IPA",
                  "preços ao produtor. IPC: preços ao consumidor na metodologia da FGV. INCC: custo da construção."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "QUEM MEDE O QUÊ?"
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "04.2 INFLAÇÃO X NÍVEL DE PREÇOS"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Inflação",
                  "taxa de variação do nível geral de preços; inflação menor ainda pode significar preços subindo, mas mais lentamente."
                ],
                [
                  "Deflação",
                  "queda do nível geral de preços."
                ],
                [
                  "Desinflação",
                  "inflação positiva, porém em desaceleração."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "04.3 REGIME DE METAS NO BRASIL — DISTINÇÃO HISTÓRICA"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Até 2024",
                  "verificação da inflação no ano-calendário."
                ],
                [
                  "Desde janeiro de 2025",
                  "meta contínua, aferida mensalmente pela variação acumulada do IPCA em 12 meses."
                ],
                [
                  "Meta fixada",
                  "3% com tolerância de ±1,5 ponto percentual (faixa 1,5% a 4,5%). A sistemática considera descumprimento quando a inflação fica seis meses consecutivos fora da banda."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "CMN estabelece a meta para a inflação; Banco Central executa a política monetária; Copom decide a meta da taxa Selic."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "O Copom controla o instrumento de juros e usa operações de mercado aberto para aproximar a Selic efetiva da meta."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "04.4 PEGADINHAS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "CMN não é Copom; fixar a meta de inflação não é fixar a meta Selic."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "IPCA ≠ IGP-M ≠ deflator do PIB."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Meta contínua a partir de 2025 ≠ checagem apenas em dezembro."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 05 — Multiplicador Keynesiano e Equivalência Ricardiana",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "05.0 Função consumo keynesiana — renda, PMgC e PMeC"
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "Regra central — função consumo de curto prazo"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "C = C₀ + c·Yd. C₀ é consumo autônomo; Yd é renda disponível; c é a propensão marginal a consumir (PMgC), com 0 < c < 1 na hipótese keynesiana simples."
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra",
                  "Pegadinha"
                ],
                [
                  "Renda disponível ↑",
                  "Consumo ↑, mas menos que proporcionalmente",
                  "O consumo não permanece fixo e não cresce necessariamente na mesma proporção."
                ],
                [
                  "PMgC (c)",
                  "ΔC ÷ ΔYd; fração consumida de uma unidade adicional de renda",
                  "Não é a razão C/Yd."
                ],
                [
                  "PMeC",
                  "C ÷ Yd; na função linear, C₀/Yd + c",
                  "Com C₀ positivo, diminui quando a renda aumenta."
                ],
                [
                  "Juros e riqueza",
                  "Influência secundária na formulação keynesiana simples de curto prazo",
                  "Não significa influência literalmente inexistente."
                ],
                [
                  "Função consumo",
                  "Relativamente estável no curto prazo",
                  "Estabilidade não significa consumo constante."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "Exemplo numérico"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Se C₀ = 100 e c = 0,8: renda disponível 1.000 → consumo 900 e PMeC de 90%; renda disponível 2.000 → consumo 1.700 e PMeC de 85%. A PMgC permanece 0,8."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "Pegadinha de banca — Keynes versus clássicos"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na teoria keynesiana simples, a renda disponível é o principal determinante do consumo no curto prazo. Na abordagem clássica, os juros têm papel central na escolha entre consumir e poupar. Alternativa correta no enunciado fornecido: D. Identificador TEC não informado; não atribuir contagem de incidência por essa questão."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "05.1 MODELO KEYNESIANO SIMPLES"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Consumo",
                  "C = C0 + cY, onde c é a propensão marginal a consumir (0<c<1)."
                ],
                [
                  "Equilíbrio",
                  "Y = C0 + cY + I + G."
                ],
                [
                  "Logo",
                  "Y = (C0 + I + G)/(1−c)."
                ],
                [
                  "Multiplicador dos gastos autônomos",
                  "k = 1/(1−c)."
                ],
                [
                  "Propensão marginal a poupar",
                  "s = 1−c → k=1/s."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Economia fechada sem tributos proporcionais, importações ou outras fugas."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "05.2 EXEMPLO RESOLVIDO"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Se c=0,8, então k=1/(1−0,8)=5."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento autônomo de G em R$ 100, mantendo hipóteses → ΔY=5×100=R$ 500."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento de c, ceteris paribus, eleva k. Tributos proporcionais e importações tendem a reduzir o multiplicador ao criar vazamentos."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "05.3 MULTIPLICADOR X EQUILÍBRIO"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Multiplicador é o coeficiente de propagação; renda de equilíbrio é o nível obtido após incorporar os gastos autônomos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não multiplicar por I+G se o consumo autônomo C0 também foi especificado na questão."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "05.4 EQUIVALÊNCIA RICARDIANA (HIPÓTESE TEÓRICA)"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Corte de impostos hoje financiado por dívida pública pode ser compensado por maior poupança privada, porque agentes antecipam tributos futuros. Sob hipóteses rigorosas de racionalidade, horizonte, acesso a crédito e tributação, o consumo atual não se altera."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não confundir a hipótese com lei empírica universal: restrições de liquidez e outras fricções enfraquecem a equivalência."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "05.5 PEGADINHAS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "k depende da PMC, não da propensão média a consumir."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Corte de tributos e aumento direto dos gastos têm multiplicadores diferentes em modelos completos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Poupança privada ↑ não significa necessariamente PIB ↑, no cenário ricardiano puro."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 06 — IS-LM, Inclinações e Armadilha da Liquidez",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "06.1 Visão geral"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "LM: equilíbrio monetário; inclinação positiva no modelo padrão."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Equilíbrio simultâneo: interseção IS-LM, determinando renda Y e juros i."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "06.2 DESLOCAMENTOS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Política fiscal expansionista → IS direita → Y e juros tendem a subir."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Fiscal contracionista → IS esquerda."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Expansão monetária → LM direita/baixo → Y tende a subir e juros a cair."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Contração monetária → LM esquerda/cima."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "06.3 CASOS ESPECIAIS"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "LM horizontal (armadilha da liquidez)",
                  "expansão monetária tem baixa eficácia; política fiscal tende a ser eficaz."
                ],
                [
                  "LM vertical (caso clássico simplificado)",
                  "fiscal afeta sobretudo juros e não o produto; monetária tem maior eficácia."
                ],
                [
                  "IS vertical (gastos insensíveis aos juros)",
                  "política monetária altera juros sem expandir produto; política fiscal atua mais intensamente sobre produto."
                ],
                [
                  "CUIDADO",
                  "uma mudança de juros pode mover o equilíbrio ao longo de uma curva sem deslocá-la. Deslocamento da curva depende de outras variáveis exógenas."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "06.4 LEITURA DE GRÁFICOS (EIXOS E MOVIMENTOS)"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na representação usual, renda/produto Y está no eixo horizontal e taxa de juros i no vertical."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "IS desce: juros maiores tendem a reduzir investimento sensível aos juros e demanda por bens, diminuindo Y de equilíbrio nesse mercado."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "LM sobe: renda mais alta aumenta demanda por moeda; mantendo oferta real de moeda, juros precisam se elevar para equilibrar mercado monetário."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "06.5 QUADRO DE COMPARAÇÃO DAS POLÍTICAS — MODELO SIMPLIFICADO"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Fiscal expansiva",
                  "IS → direita; produto ↑ e juros ↑, com possível crowding-out parcial do investimento privado."
                ],
                [
                  "Monetária expansiva",
                  "LM → direita/baixo; produto ↑ e juros ↓."
                ],
                [
                  "Armadilha da liquidez (LM horizontal)",
                  "monetária perde eficácia no produto, fiscal tende a ser eficaz."
                ],
                [
                  "Caso clássico (LM vertical)",
                  "deslocamento de IS altera juros, não produto; deslocamento de LM pode alterar produto."
                ],
                [
                  "Caso de IS vertical",
                  "monetária muda juros, mas não produto; política fiscal desloca renda."
                ],
                [
                  "EXEMPLO",
                  "aumento de gastos públicos desloca IS à direita; o aumento de juros reduz parte do investimento privado. É efeito 'crowding-out', não a mesma coisa que uma elevação do PIB automático no valor exato dos gastos."
                ],
                [
                  "PEGADINHA",
                  "maior elasticidade da demanda por moeda aos juros costuma tornar LM mais PLANA; maior sensibilidade do investimento aos juros costuma tornar IS mais PLANA."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "As conclusões são do IS-LM clássico de curto prazo com preços dados; não generalizar para toda teoria macroeconômica."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 07 — Políticas Fiscal e Monetária e Crowding-out",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "07.1 Visão geral"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Fiscal",
                  "governo altera GASTOS, TRIBUTOS e transferências no quadro orçamentário; afeta demanda agregada e incentivos."
                ],
                [
                  "Monetária",
                  "Banco Central atua sobre CONDIÇÕES MONETÁRIAS, liquidez e taxa de juros, via instrumentos próprios."
                ],
                [
                  "Cambial",
                  "intervenções e regime cambial; não confundir com política monetária, embora possam interagir."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "QUAL INSTRUMENTO?"
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "07.2 EXPANSIONISTA X CONTRACIONISTA"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Fiscal expansionista",
                  "G↑ ou tributos↓ → demanda agregada tende a ↑ no curto prazo."
                ],
                [
                  "Fiscal contracionista",
                  "G↓ ou tributos↑ → demanda agregada tende a ↓."
                ],
                [
                  "Monetária expansionista",
                  "liquidez↑, juros↓, crédito e gasto sensíveis aos juros tendem a ↑."
                ],
                [
                  "Monetária contracionista",
                  "liquidez↓, juros↑, crédito e gasto tendem a ↓."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "07.3 CROWDING-OUT (EFEITO EXPULSÃO)"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Gasto público maior → eleva demanda de recursos financeiros/renda → juros podem subir → investimento privado sensível aos juros pode cair → efeito líquido do estímulo fiscal sobre produto fica menor."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No modelo IS-LM padrão, vê-se pela IS à direita, subida de i e redução parcial de investimentos privados."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não é necessariamente eliminação completa do efeito fiscal: intensidade depende de sensibilidade da IS/LM e das condições econômicas."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "07.4 POLÍTICA MONETÁRIA COMO ACOMODAÇÃO"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Se BC expande moeda ao mesmo tempo que o estímulo fiscal, pode limitar elevação dos juros e o deslocamento privado; o resultado depende da inflação, das expectativas e do regime monetário."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "07.5 EXEMPLOS DE PROVA"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Venda de títulos pelo BC no mercado aberto = contracionista em liquidez."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento de G = fiscal expansionista, ainda que financiado por dívida."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento do compulsório = monetária contracionista, ceteris paribus."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "07.6 PEGADINHAS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Meta Selic é definida pelo Copom; meta da inflação pelo CMN."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Política fiscal não é medida agregada do PIB; é conjunto de decisões e instrumentos."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Crowding-out ≠ equivalência ricardiana, embora ambas limitem efeitos de certos estímulos em modelos diferentes."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 08 — Curva de Phillips e Modelo de Solow",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "08.1 PHILLIPS: CURTO PRAZO"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Relação empírica originalmente entre desemprego e salários nominais; versões modernas abordam inflação e hiato de atividade/desemprego."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No curto prazo, sob certas hipóteses, desemprego menor pode pressionar salários e inflação."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Inflação esperada e choques de oferta também deslocam a curva: não há troca simples e invariável entre inflação e desemprego."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "08.2 PHILLIPS: LONGO PRAZO"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na versão com expectativas ajustadas, a curva de longo prazo é vertical na taxa natural de desemprego: tentar manter desemprego abaixo dessa referência pode produzir inflação crescente."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Choque de petróleo/custos: pode elevar inflação E desemprego; não representa mero deslocamento ao longo da mesma curva."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "08.3 SOLOW: PRODUTO POR TRABALHADOR"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Capital por trabalhador k; produção por trabalhador y=f(k)."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Acumulação de capital aumenta produção, mas retornos marginais decrescentes dificultam crescimento sustentado de y somente pela acumulação, na versão básica."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "No estado estacionário, investimento por trabalhador efetivo se iguala à reposição exigida pelo desgaste, crescimento populacional e progresso tecnológico, conforme o modelo."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "O QUE A POUPANÇA MUDA?"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Taxa de poupança maior → estado estacionário com MAIS capital e produto por trabalhador."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Na versão básica sem progresso tecnológico, NÃO aumenta permanentemente a taxa de crescimento do produto por trabalhador no estado estacionário; gera crescimento temporariamente maior durante a transição."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Com progresso tecnológico exógeno, o crescimento sustentado por trabalhador é explicado pela tecnologia, não apenas pela taxa de poupança."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "08.4 PEGADINHAS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Phillips original usava salários; versões posteriores usam inflação."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Curto prazo ≠ longo prazo; expectativas importam."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Elevar nível estacionário do PIB per capita não é elevar sua taxa de crescimento permanentemente."
            }
          ]
        }
      ]
    },
    {
      "title": "Macro 09 — Câmbio, Setor Externo e Balanço de Pagamentos",
      "blocks": [
        {
          "type": "detail",
          "title": "Ver explicação detalhada",
          "blocks": [
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.0 Quadro para prova — estrutura do BP"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Parte",
                  "O que entra",
                  "Pegadinha / diferença"
                ],
                [
                  "1. Bens — balança comercial",
                  "Exportação e importação de mercadorias, em geral FOB.",
                  "⚠️ Frete e seguro internacionais separados dos bens: serviços, conforme critérios de registro."
                ],
                [
                  "2. Serviços",
                  "Manufatura de insumos de terceiros; reparos; transportes; viagens; construção; seguros; financeiros; propriedade intelectual; aluguel de equipamentos; demais serviços.",
                  "⚠️ Royalties pelo uso de propriedade intelectual e aluguel de equipamentos são serviços, não renda primária."
                ],
                [
                  "3. Renda primária",
                  "Remuneração de trabalhadores, juros, dividendos, lucros e outras rendas de investimentos.",
                  "⚠️ Juros são renda; principal de empréstimos é conta financeira."
                ],
                [
                  "4. Renda secundária",
                  "Transferências correntes, como transferências pessoais e certas doações sem contrapartida.",
                  "⚠️ Nem toda transferência em bens é automaticamente exportação/importação: classificar conforme natureza e metodologia."
                ],
                [
                  "Saldo de transações correntes",
                  "Bens + Serviços + Renda primária + Renda secundária.",
                  "✅ Identidade para revisão. Contas financeiras e capital ficam fora da soma."
                ],
                [
                  "5. Conta de capital",
                  "Transferências de capital, inclusive certos perdões de dívidas, e aquisições/cessões de ativos não financeiros não produzidos.",
                  "⛔ Investimento estrangeiro direto NÃO integra a conta de capital. Mudança de residência com transferência de patrimônio, por si só, não é transação no BPM6."
                ],
                [
                  "6. Conta financeira",
                  "Investimento direto (participações e dívida entre empresas relacionadas), investimento em carteira, derivativos, outros investimentos, ativos de reserva.",
                  "⚠️ Principal/amortização de empréstimos entram aqui. Reinvestimento de lucros gera contrapartida financeira; rendimento correspondente entra em renda primária."
                ],
                [
                  "7. Erros e omissões",
                  "Ajuste estatístico para discrepâncias entre registros do BP.",
                  "⚠️ Não é uma categoria econômica de receita ou despesa."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Transações correntes = bens + serviços + renda primária + renda secundária. Conta capital não é a conta dos investimentos estrangeiros; estes se classificam na conta financeira."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Referências: Banco Central do Brasil, Estatísticas do Setor Externo — BPM6; FMI, BPM6, capítulos de contas corrente, capital e financeira."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.1 CÂMBIO NOMINAL (CONVENÇÃO REAL POR DÓLAR)"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "E = R$/US$; mede quantos reais compram um dólar."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "E sobe (de 5 para 6) → real se deprecia nominalmente; dólar fica mais caro em reais."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "E cai (de 6 para 5) → real se aprecia nominalmente."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Cuidado: na cotação inversa US$/R$, o sentido da variação se inverte."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.2 CÂMBIO REAL"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "q = E × P* / P, com P* nível de preços externo e P nível de preços interno."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Aumento de q = depreciação real na convenção adotada; bens externos tornam-se relativamente mais caros em moeda doméstica."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "q constante não significa E constante: diferenças na inflação interna/externa podem compensar variação cambial nominal."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Exemplo: E=5, P*=120, P=100 → q=6; se E=4, P*=150 e P=100 → q permanece 6."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.3 SETOR EXTERNO E PIB"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Exportações X entram positivamente em PIB=C+I+G+X−M."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Importações M entram negativamente para retirar a parcela não produzida internamente."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Saldo comercial = X−M (bens e serviços em questões simplificadas; nas estatísticas formais, delimitar a balança de bens conforme a classificação do enunciado)."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.4 BALANÇO DE PAGAMENTOS"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Conceito",
                  "Regra ou fórmula"
                ],
                [
                  "Conta corrente",
                  "bens, serviços, renda primária e renda secundária."
                ],
                [
                  "Conta capital",
                  "transferências de capital e ativos não financeiros não produzidos, nas categorias estatísticas pertinentes."
                ],
                [
                  "Conta financeira",
                  "investimento direto, carteira, derivativos, outros investimentos e ativos de reserva."
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Registra transações econômicas entre residentes e não residentes."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Não confundir remessa de lucros ao exterior com importação de bens, nem dívida externa com déficit comercial do período."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.5 PEGADINHAS"
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Câmbio nominal ≠ câmbio real."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Desvalorização não garante automaticamente melhora do saldo comercial; elasticidades, defasagens e preços importam."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Renda líquida enviada ao exterior influencia a passagem de PIB a PNB no tratamento clássico."
            },
            {
              "type": "paragraph",
              "style": "HEADING_2",
              "text": "09.8 diferenças BPM5 e BPM6"
            },
            {
              "type": "table",
              "comparison": true,
              "rows": [
                [
                  "Item",
                  "BPM5",
                  "BPM6"
                ],
                [
                  "Manufatura sobre insumos físicos de terceiros",
                  "Bens para processamento",
                  "Serviços de manufatura"
                ],
                [
                  "Manutenção e reparos",
                  "Bens",
                  "Serviços"
                ],
                [
                  "Merchanting",
                  "Serviços",
                  "Bens"
                ],
                [
                  "Transferências de migrantes",
                  "Transferências de capital",
                  "Não constitui transação apenas por alteração de residência"
                ]
              ]
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Questão FGV 2023, TEC 2558417: a alternativa E é a exceção porque descreve uma transferência de serviços para bens, mas o BPM6 fez a mudança inversa (bens para serviços). A alternativa D se refere ao tratamento do investimento direto no Brasil como aumento de passivos perante não residentes."
            },
            {
              "type": "paragraph",
              "style": "NORMAL_TEXT",
              "text": "Fontes: Banco Central, FAQ BPM5 → BPM6 e apresentação 'Contas externas — BPM6' (2015). https://www.tecconcursos.com.br/questoes/2558417"
            }
          ]
        }
      ]
    }
  ],
  "macro-classica": [
    {
      "title": "Clássicos × keynesianos: ajuste do produto",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Hipótese",
              "Modelo clássico estilizado",
              "Keynesiano de curto prazo"
            ],
            [
              "Preços e salários",
              "Flexíveis",
              "Rigidez nominal"
            ],
            [
              "Produto",
              "Determinado por fatores reais",
              "Pode responder à demanda"
            ],
            [
              "Moeda",
              "Neutra no longo prazo",
              "Pode afetar atividade no curto prazo"
            ]
          ]
        },
        {
          "type": "callout",
          "kind": "warning",
          "title": "Casos extremos do IS-LM",
          "text": "LM vertical e armadilha da liquidez são casos distintos. Os gráficos originais permanecem nos materiais do modelo IS-LM."
        }
      ]
    }
  ],
  "macro-topico-07": [
    {
      "title": "Demanda agregada: movimento × deslocamento",
      "blocks": [
        {
          "type": "table",
          "comparison": true,
          "rows": [
            [
              "Mudança",
              "Efeito, demais condições constantes"
            ],
            [
              "Nível de preços",
              "Movimento ao longo da DA"
            ],
            [
              "Gasto autônomo, tributos ou política monetária",
              "Pode deslocar a DA"
            ],
            [
              "Custos e produtividade",
              "Afetam a oferta agregada"
            ]
          ]
        },
        {
          "type": "flowchart",
          "title": "Canal de juros da demanda agregada",
          "steps": [
            {
              "label": "Nível de preços cai",
              "kind": "success"
            },
            {
              "label": "Saldos monetários reais aumentam, com M dado",
              "kind": "success"
            },
            {
              "label": "Juros caem no modelo",
              "kind": "success"
            },
            {
              "label": "Investimento e quantidade demandada aumentam",
              "kind": "success"
            }
          ]
        },
        {
          "type": "callout",
          "kind": "danger",
          "title": "Pegadinha",
          "text": "Queda de preços, sozinha, não desloca a curva DA. Melhora de produtividade é choque de oferta."
        }
      ]
    }
  ]
};

export const macroSources = [
 {title:'IBGE — Sistema de Contas Nacionais',url:'https://www.ibge.gov.br/estatisticas/todos-os-produtos-estatisticas/9052-sistema-de-contas-nacionais-brasil.html'},
 {title:'BCB — Metodologia de meios de pagamento amplos',url:'https://dadosabertos.bcb.gov.br/pt_BR/dataset/1839-sgs'},
 {title:'BCB — Nota metodológica BPM6: contas e sinais',url:'https://www.bcb.gov.br/content/estatisticas/Documents/notas_metodologicas/balanco_pagamentos/bpm6/nm1bpm6p.pdf'}
];
