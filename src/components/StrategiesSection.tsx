import { ArrowUpRight } from 'lucide-react';
import { ConsortiumCategory, SimulatorMode } from '../types/consultancy';
import { SafeImage } from './SafeImage';

interface StrategiesSectionProps {
  onSimulatePreset: (mode: SimulatorMode, category?: ConsortiumCategory) => void;
}

export function StrategiesSection({ onSimulatePreset }: StrategiesSectionProps) {
  return (
    <section
      id="estrategias"
      className="border-t border-[#CFC6BC] bg-[#ECE6DF] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
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
              Cada operação combina seleção rigorosa de administradoras, matemática de lances da NS Assessoria Consórcios e proteção de liquidez em renda fixa.
            </p>
          </div>
        </div>

        {/* Asymmetric Tactile Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Strategy 01 — Wide Tactile Card with Photo */}
          <article className="tactile-panel flex flex-col justify-between overflow-hidden rounded-2xl lg:col-span-7">
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
                    Estruturamos cartas com meia parcela enquanto seu capital permanece rendendo em CDI, eliminando juros compostos bancários.
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E3DCD5] pt-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4E6478]">
                    <span>Prazos de 60 a 220 meses</span>
                    <span aria-hidden="true">·</span>
                    <span>Uso de FGTS permitido</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSimulatePreset('consorcio', 'imoveis')}
                    className="tactile-button-raised mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#1D324E] transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Carregar no Simulador
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#87692C]" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="min-h-[220px] bg-[#D6CFC6] sm:col-span-5">
                <SafeImage
                  src="/src/assets/images/strategy_real_estate_1794859977558.jpg"
                  alt="Residência contemporânea em pedra bege e vidro ao entardecer"
                  fallbackTitle="Consórcio Imobiliário"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </article>

          {/* Strategy 02 — Matte Slate Pastel Tile */}
          <article className="tactile-tile-slate flex flex-col justify-between rounded-2xl p-6 text-[#FCFAF7] sm:p-8 lg:col-span-5">
            <div>
              <p className="font-editorial text-lg font-semibold text-[#DEC796]">
                02. Alavancagem e Renda Passiva
              </p>
              <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#FCFAF7]">
                Imóveis de locação que pagam a própria parcela após a entrega das chaves.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#FCFAF7]/85">
                Planejamos a contemplação com lance embutido ou recurso próprio para adquirir imóveis de alta liquidez locatícia, gerando fluxo mensal positivo.
              </p>
            </div>

            <div className="mt-6 border-t border-white/20 pt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#FCFAF7]/80">
                <span>Retorno alvo via aluguel</span>
                <span aria-hidden="true">·</span>
                <span>Venda de cota contemplada</span>
              </div>
              <button
                type="button"
                onClick={() => onSimulatePreset('consorcio', 'alavancagem')}
                className="tactile-button-raised mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#1D324E] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Carregar no Simulador
                <ArrowUpRight className="h-3.5 w-3.5 text-[#87692C]" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Strategy 03 — Matte Sage Pastel Tile */}
          <article className="tactile-tile-sage flex flex-col justify-between rounded-2xl p-6 text-[#FCFAF7] sm:p-8 lg:col-span-5">
            <div>
              <p className="font-editorial text-lg font-semibold text-[#F6EFE0]">
                03. Carteira de Investimentos & Liquidez
              </p>
              <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#FCFAF7]">
                Alocação conservadora para sustentar lances e proteger o poder de compra.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#FCFAF7]/85">
                Estruturamos sua reserva de lance em títulos públicos, CDBs líquidos e ativos isentos (LCI/LCA), garantindo liquidez imediata na assembleia.
              </p>
            </div>

            <div className="mt-6 border-t border-white/20 pt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#FCFAF7]/80">
                <span>Tesouro Selic e IPCA+</span>
                <span aria-hidden="true">·</span>
                <span>Liquidez programada</span>
              </div>
              <button
                type="button"
                onClick={() => onSimulatePreset('investimento')}
                className="tactile-button-raised mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#1D324E] transition-transform duration-150 hover:-translate-y-0.5"
              >
                Projetar Carteira
                <ArrowUpRight className="h-3.5 w-3.5 text-[#87692C]" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Strategy 04 — Wide Tactile Card with Photo */}
          <article className="tactile-panel flex flex-col justify-between overflow-hidden rounded-2xl lg:col-span-7">
            <div className="grid h-full grid-cols-1 sm:grid-cols-12">
              <div className="min-h-[220px] bg-[#D6CFC6] sm:col-span-5">
                <SafeImage
                  src="/src/assets/images/strategy_advisory_desk_1794859977033.jpg"
                  alt="Mesa de consultoria em travertino bege com portfólio azul marinho e caneta dourada"
                  fallbackTitle="Gestão de Frotas"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:col-span-7 sm:p-8">
                <div>
                  <p className="font-editorial text-lg font-semibold text-[#87692C]">
                    04. Renovação de Frota e Veículos Executivos
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#14243B]">
                    Substitua financiamentos de 21% ao ano por crédito programado.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3E597B]">
                    Para frotistas, clínicas e executivos que trocam de veículo a cada 3 ou 4 anos, o consórcio elimina juros bancários e aceita o usado como lance.
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E3DCD5] pt-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4E6478]">
                    <span>Automóveis, utilitários e pesados</span>
                    <span aria-hidden="true">·</span>
                    <span>Aprovação simplificada</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSimulatePreset('consorcio', 'veiculos')}
                    className="tactile-button-raised mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#1D324E] transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Carregar no Simulador
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#87692C]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Tactile Institutional Office Showcase Card */}
        <div className="tactile-panel mt-8 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <div className="min-h-[240px] lg:col-span-5">
              <SafeImage
                src="/src/assets/images/hero_wealth_office_1794859976820.jpg"
                alt="Escritório de consultoria patrimonial Mapeal com mesa em travertino bege e poltronas azul marinho"
                fallbackTitle="Mapeal Consultoria"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                Assessoria Independente · Marcos Pedro Alves & NS Assessoria Consórcios
              </p>
              <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#14243B] sm:text-3xl">
                Curadoria técnica de administradoras sem conflito de interesse.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3E597B]">
                Analisamos taxas reais, regras de reajuste e histórico de lances vencedores para que cada carta contratada faça sentido dentro do seu planejamento financeiro e tributário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
