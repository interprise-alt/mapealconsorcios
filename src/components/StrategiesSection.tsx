import { ArrowUpRight } from 'lucide-react';
import { ConsortiumCategory, SimulatorMode } from '../types/consultancy';
import { SafeImage } from './SafeImage';

interface StrategiesSectionProps {
  onSimulatePreset: (mode: SimulatorMode, category?: ConsortiumCategory) => void;
}

export function StrategiesSection({ onSimulatePreset }: StrategiesSectionProps) {
  return (
    <section id="estrategias" className="border-t border-[#E5DBCA] bg-[#F5F0E6]/70 py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#87692C]">
            Estratégias Patrimoniais
          </p>
          <h2
            className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#14243B] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Soluções desenhadas para preservar caixa e construir ativos reais.
          </h2>
          <p className="mt-3 text-base text-[#3E597B]">
            Cada operação combina seleção rigorosa de administradoras, matemática de lances e proteção de liquidez em renda fixa.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Strategy 01 — Featured Wide Card (7 cols) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#DFD6C5] bg-[#FCFAF7] lg:col-span-7">
            <div className="grid h-full grid-cols-1 sm:grid-cols-12">
              <div className="flex flex-col justify-between p-6 sm:col-span-7 sm:p-8">
                <div>
                  <p className="font-editorial text-lg font-semibold text-[#87692C]">
                    01. Consórcio Imobiliário e Construção
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#14243B]">
                    Aquisição residencial ou comercial sem descapitalizar sua carteira.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3E597B]">
                    Em vez de imobilizar R$ 800 mil na compra à vista ou pagar juros compostos de banco, estruturamos cartas com meia parcela enquanto seu capital permanece rendendo em CDI.
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E5DBCA] pt-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#3E597B]">
                    <span>Prazos de 60 a 220 meses</span>
                    <span aria-hidden="true">·</span>
                    <span>Uso de FGTS permitido</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSimulatePreset('consorcio', 'imoveis')}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D324E] hover:text-[#87692C] hover:underline hover:underline-offset-4"
                  >
                    Simular carta imobiliária
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="min-h-[220px] bg-[#DCE4EE] sm:col-span-5">
                <SafeImage
                  src="/src/assets/images/strategy_real_estate_1794859977558.jpg"
                  alt="Residência contemporânea em pedra bege e vidro ao entardecer azul pastel"
                  fallbackTitle="Consórcio Imobiliário"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </article>

          {/* Strategy 02 — Compact Vertical Card (5 cols) */}
          <article className="flex flex-col justify-between rounded-xl border border-[#C2D0E0] bg-[#EEF2F7]/75 p-6 sm:p-8 lg:col-span-5">
            <div>
              <p className="font-editorial text-lg font-semibold text-[#87692C]">
                02. Alavancagem e Renda Passiva
              </p>
              <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#14243B]">
                Imóveis de locação que pagam a própria parcela após a entrega das chaves.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3E597B]">
                Planejamos a contemplação com lance embutido ou recurso próprio para adquirir imóveis prontos de alta liquidez locatícia, gerando fluxo positivo mensal e ganho de capital.
              </p>
            </div>

            <div className="mt-6 border-t border-[#C2D0E0] pt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#3E597B]">
                <span>Retorno alvo via aluguel</span>
                <span aria-hidden="true">·</span>
                <span>Venda de cota contemplada</span>
              </div>
              <button
                type="button"
                onClick={() => onSimulatePreset('consorcio', 'alavancagem')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D324E] hover:text-[#87692C] hover:underline hover:underline-offset-4"
              >
                Simular alavancagem patrimonial
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Strategy 03 — Compact Card (5 cols) */}
          <article className="flex flex-col justify-between rounded-xl border border-[#DFD6C5] bg-[#F6EFE0]/65 p-6 sm:p-8 lg:col-span-5">
            <div>
              <p className="font-editorial text-lg font-semibold text-[#87692C]">
                03. Carteira de Investimentos & Liquidez
              </p>
              <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#14243B]">
                Alocação conservadora para sustentar lances e proteger o poder de compra.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3E597B]">
                Estruturamos sua reserva de lance em títulos públicos, CDBs líquidos e ativos isentos (LCI/LCA), garantindo disponibilidade imediata na assembleia de contemplação.
              </p>
            </div>

            <div className="mt-6 border-t border-[#DFD6C5] pt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#3E597B]">
                <span>Tesouro Selic e IPCA+</span>
                <span aria-hidden="true">·</span>
                <span>Liquidez programada</span>
              </div>
              <button
                type="button"
                onClick={() => onSimulatePreset('investimento')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D324E] hover:text-[#87692C] hover:underline hover:underline-offset-4"
              >
                Projetar carteira de investimentos
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Strategy 04 — Wide Card with Editorial Photo (7 cols) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#DFD6C5] bg-[#FCFAF7] lg:col-span-7">
            <div className="grid h-full grid-cols-1 sm:grid-cols-12">
              <div className="min-h-[220px] bg-[#E5DBCA] sm:col-span-5">
                <SafeImage
                  src="/src/assets/images/strategy_advisory_desk_1794859977033.jpg"
                  alt="Mesa de consultoria em travertino bege com portfólio azul marinho e caneta dourada"
                  fallbackTitle="Gestão de Frotas e Capital"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:col-span-7 sm:p-8">
                <div>
                  <p className="font-editorial text-lg font-semibold text-[#87692C]">
                    04. Renovação de Frota e Veículos Executivos
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#14243B]">
                    Substitua financiamentos de 21% ao ano por crédito programado para sua empresa.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3E597B]">
                    Para frotistas, clínicas e executivos que trocam de veículo a cada 3 ou 4 anos, o consórcio elimina juros bancários e permite utilizar o usado como lance livre.
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E5DBCA] pt-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#3E597B]">
                    <span>Automóveis, utilitários e pesados</span>
                    <span aria-hidden="true">·</span>
                    <span>Aprovação simplificada</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSimulatePreset('consorcio', 'veiculos')}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D324E] hover:text-[#87692C] hover:underline hover:underline-offset-4"
                  >
                    Simular carta de veículos
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
