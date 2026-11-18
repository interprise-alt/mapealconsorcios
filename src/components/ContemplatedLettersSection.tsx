import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { AttachedSimulationSummary } from '../types/consultancy';

interface ContemplatedLettersSectionProps {
  onRequestScenario: (summary: AttachedSimulationSummary) => void;
}

const FINANCIAL_ROWS = [
  {
    stage: 'Valor da Carta de Crédito',
    value: 'R$ 500.000,00',
    detail: 'Crédito disponível para o comprador final',
    emphasis: false,
  },
  {
    stage: 'Investimento Inicial (Parcelas + Lance)',
    value: 'R$ 115.000,00',
    detail: '2 parcelas pagas + R$ 110 mil de lance',
    emphasis: false,
  },
  {
    stage: 'Valor de Venda da Carta (Ágio + Reembolso)',
    value: 'R$ 160.000,00',
    detail: 'Vendida por 32% do valor do crédito (padrão de mercado)',
    emphasis: false,
  },
  {
    stage: 'Custos Operacionais (Transferência/Taxas)',
    value: '- R$ 4.500,00',
    detail: 'Taxa de transferência da administradora',
    emphasis: false,
  },
  {
    stage: 'Lucro Líquido da Operação',
    value: 'R$ 40.500,00',
    detail: 'Retorno livre direto na conta do investidor',
    emphasis: true,
  },
];

const OPERATION_STEPS = [
  {
    title: '01. Adesão e Lance',
    text: 'O cliente adquiriu uma cota de consórcio imobiliário no valor de R$ 500.000,00 (prazo de 200 meses, com taxa de administração diluída).',
  },
  {
    title: '02. Contemplação Estratégica',
    text: 'Parte do capital disponível (R$ 110.000,00) foi utilizada para ofertar um lance estratégico estudado pela nossa equipe com base no histórico do grupo.',
  },
  {
    title: '03. Aprovação e Posse do Crédito',
    text: 'A cota foi contemplada no 2º mês. O cliente passou a ter em mãos uma carta de crédito contemplada de R$ 500.000,00 pronta para uso imediato.',
  },
  {
    title: '04. Venda no Mercado Secundário',
    text: 'Com o crédito liberado, a 2M Consórcios & Investimentos intermediou a venda dessa cota contemplada para um comprador final que buscava comprar à vista sem juros bancários.',
  },
];

const SAFETY_PILLARS = [
  {
    label: 'Regulamentação',
    text: 'Todo o processo é fiscalizado pelo Banco Central do Brasil (Lei nº 11.795/2008).',
  },
  {
    label: 'Garantia',
    text: 'Até a venda, o crédito permanece rendendo em fundo conservador atrelado à administradora (geralmente próximo a 100% do CDI).',
  },
  {
    label: 'Liquidez',
    text: 'Existe demanda constante de compradores que buscam cartas contempladas para fugir das altas taxas de juros dos bancos tradicionais.',
  },
];

export function ContemplatedLettersSection({
  onRequestScenario,
}: ContemplatedLettersSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const handleScheduleFromModal = () => {
    setModalOpen(false);
    onRequestScenario({
      mode: 'consorcio',
      title: 'Interesse em Operação com Carta Contemplada',
      details:
        'Simulação baseada no exemplo hipotético de carta contemplada (capital disponível entre R$ 50 mil e R$ 200 mil).',
      highlightLabel: 'Referência do estudo',
      highlightValue: '3 a 6 meses · Carta Contemplada',
    });
  };

  return (
    <section
      id="contempladas"
      className="border-t border-[#CFC6BC] bg-[#E3DCD5] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="tactile-panel rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                Mercado Secundário & Crédito Imediato
              </p>
              <h2
                className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#14243B] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Também trabalhamos com compra, venda e intermediação de cartas contempladas.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3E597B]">
                Na <span className="font-semibold text-[#14243B]">2M Consórcios & Investimentos</span>, conectamos quem precisa de crédito imobiliário ou veicular imediato às melhores cotas já contempladas — e estruturamos operações de contemplação acelerada para investidores que buscam rentabilidade acima do CDI em ciclos de 3 a 6 meses.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="tactile-tile-navy inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-[#FCFAF7] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5833E]"
                >
                  Clique aqui e veja um exemplo Hipotético
                  <ExternalLink className="h-4 w-4 text-[#DEC796]" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <div className="tactile-tile-slate rounded-2xl p-5 text-[#FCFAF7]">
                <p className="text-xs font-semibold tracking-wide text-[#DEC796]">
                  Para Compradores Finais
                </p>
                <p className="mt-1.5 font-editorial text-xl font-semibold">
                  Crédito liberado para compra à vista sem esperar assembleias.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#FCFAF7]/85">
                  Assuma cotas já contempladas com transferência segura junto à administradora e custo total muito inferior ao financiamento bancário.
                </p>
              </div>

              <div className="tactile-tile-sage rounded-2xl p-5 text-[#FCFAF7]">
                <p className="text-xs font-semibold tracking-wide text-[#F6EFE0]">
                  Para Investidores
                </p>
                <p className="mt-1.5 font-editorial text-xl font-semibold">
                  Alavancagem estratégica com venda assistida no mercado secundário.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#FCFAF7]/85">
                  Estudamos grupos com histórico favorável de lance, estruturamos a contemplação e intermediamos a cessão da cota com liquidez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal ("Balão") com o Exemplo Hipotético */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-exemplo-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#14243B]/60 p-4 backdrop-blur-xs sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="tactile-panel relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-6 sm:p-8 lg:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#D5CDC4] pb-5">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                  Exemplo Hipotético · Operação com Carta Contemplada
                </p>
                <h3
                  id="modal-exemplo-titulo"
                  className="mt-1 font-editorial text-2xl font-semibold text-[#14243B] sm:text-3xl"
                >
                  Alavancagem financeira com consórcio como ferramenta de investimento
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Fechar exemplo hipotético"
                className="tactile-button-raised inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#14243B]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* 1. Passo a Passo */}
            <div className="mt-6">
              <h4 className="font-editorial text-xl font-semibold text-[#14243B]">
                01. A Estratégia Aplicada (O Passo a Passo)
              </h4>
              <p className="mt-1.5 text-sm text-[#3E597B]">
                Em vez de deixar o capital parado ou imobilizar o valor total na compra de um único bem, estruturamos uma operação de alavancagem financeira:
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {OPERATION_STEPS.map((item) => (
                  <div key={item.title} className="tactile-card-stone rounded-2xl p-4">
                    <p className="text-xs font-semibold text-[#1D324E]">{item.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#294366]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Demonstrativo Financeiro */}
            <div className="mt-8">
              <h4 className="font-editorial text-xl font-semibold text-[#14243B]">
                02. Demonstrativo Financeiro da Operação
              </h4>

              <div className="mt-3 overflow-x-auto rounded-2xl border border-[#D5CDC4] bg-[#FCFAF7]">
                <table className="w-full min-w-[540px] border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E3DCD5] bg-[#ECE6DF] text-[#294366]">
                      <th className="px-4 py-3 font-semibold">Etapa / Indicador</th>
                      <th className="px-4 py-3 font-semibold">Valores (R$)</th>
                      <th className="px-4 py-3 font-semibold">Detalhamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE6DF]">
                    {FINANCIAL_ROWS.map((row) => (
                      <tr
                        key={row.stage}
                        className={row.emphasis ? 'bg-[#F6EFE0]/60 font-semibold' : undefined}
                      >
                        <td className="px-4 py-3 text-[#14243B]">{row.stage}</td>
                        <td
                          className={`px-4 py-3 font-mono tabular-nums whitespace-nowrap ${
                            row.emphasis ? 'text-[#87692C]' : 'text-[#1D324E]'
                          }`}
                        >
                          {row.value}
                        </td>
                        <td className="px-4 py-3 text-[#3E597B]">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tempo e Rentabilidade */}
              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="tactile-tile-navy rounded-2xl p-4 text-[#FCFAF7]">
                  <p className="text-xs text-[#FCFAF7]/80">Tempo total da operação</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-[#DEC796] tabular-nums">
                    4 meses
                  </p>
                  <p className="mt-0.5 text-xs text-[#FCFAF7]/85">
                    Da adesão até o recebimento da venda.
                  </p>
                </div>

                <div className="tactile-tile-sage rounded-2xl p-4 text-[#FCFAF7]">
                  <p className="text-xs text-[#FCFAF7]/85">Rentabilidade Líquida</p>
                  <p className="mt-1 font-mono text-lg font-semibold tabular-nums">
                    35,2% em 4 meses
                  </p>
                  <p className="mt-0.5 text-xs text-[#FCFAF7]/90">
                    Equivalente a +8,8% ao mês (mais de 8x o CDI do período).
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Segurança */}
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#6E8579]" aria-hidden="true" />
                <h4 className="font-editorial text-xl font-semibold text-[#14243B]">
                  03. Por que essa operação é segura para o investidor?
                </h4>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {SAFETY_PILLARS.map((pillar) => (
                  <div key={pillar.label} className="tactile-card-stone rounded-2xl p-4">
                    <p className="text-xs font-semibold text-[#87692C]">{pillar.label}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#294366]">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. CTA para o cenário atual do cliente */}
            <div className="tactile-card-stone mt-8 flex flex-col justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-[#14243B]">
                  Tem entre R$ 50 mil e R$ 200 mil disponíveis hoje?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#3E597B]">
                  Montamos uma simulação personalizada para o seu cenário mostrando as projeções para os próximos 3 a 6 meses com segurança. Agende 15 minutos para ver o cálculo.
                </p>
                <p className="mt-2 text-[11px] text-[#4E6478]">
                  * Exemplo hipotético ilustrativo baseado em condições de mercado; resultados reais dependem do grupo, lance vencedor e demanda no momento da venda.
                </p>
              </div>

              <button
                type="button"
                onClick={handleScheduleFromModal}
                className="tactile-tile-navy inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold text-[#FCFAF7] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
              >
                Simular meu cenário (15 min)
                <ArrowRight className="h-4 w-4 text-[#DEC796]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
