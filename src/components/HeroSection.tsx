import { ArrowDownRight } from 'lucide-react';
import { BrandLogo, PartnerSeal } from './BrandLogo';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onSimulateClick: () => void;
  onContactClick: () => void;
}

const PROOF_METRICS = [
  {
    value: 'R$ 184M+',
    label: 'Em cartas estruturadas',
    detail: 'Operações auditadas em parceria',
  },
  {
    value: '94%',
    label: 'Contemplação planejada',
    detail: 'Dentro da janela de 6 a 14 meses',
  },
  {
    value: '38%',
    label: 'Economia média de capital',
    detail: 'Frente ao financiamento tradicional',
  },
  {
    value: '340+',
    label: 'Patrimônios assessorados',
    detail: 'Empresários, investidores e famílias',
  },
];

export function HeroSection({ onSimulateClick, onContactClick }: HeroSectionProps) {
  return (
    <section
      id="topo"
      className="border-b border-[#E5DBCA] bg-gradient-to-b from-[#FCFAF7] via-[#F8F4EC] to-[#F2EBE0]/60"
    >
      <div className="mx-auto max-w-[1280px] px-6 pt-8 pb-14 lg:px-10 lg:pt-12 lg:pb-16">
        {/* Two-column editorial split with balanced stretch */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-medium tracking-wide text-[#87692C]">
              Mapeal Consultoria · Em parceria com NS Assessoria Consórcios
            </p>

            <h1
              className="mt-4 font-editorial font-semibold tracking-tight text-[#14243B]"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                lineHeight: 1.08,
                textWrap: 'balance',
              }}
            >
              Consultoria em negócios, investimentos e consórcios para expandir seu patrimônio sem juros.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#3E597B]">
              Na <span className="font-semibold text-[#14243B]">Mapeal</span>, unimos a assessoria de Marcos Pedro Alves à estrutura de grupos da NS Assessoria Consórcios para planejar aquisições, alavancagem imobiliária e preservação de liquidez.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onSimulateClick}
                className="inline-flex items-center gap-2 rounded-md bg-[#1D324E] px-6 py-3.5 text-sm font-semibold text-[#FCFAF7] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#294366] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5833E]"
              >
                Simular Estratégia Agora
                <ArrowDownRight className="h-4 w-4 text-[#DEC796]" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center rounded-md border border-[#C2D0E0] bg-[#FCFAF7] px-6 py-3.5 text-sm font-medium text-[#1D324E] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#A5833E] hover:bg-[#F6EFE0]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D324E]"
              >
                Falar com Consultor
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#3E597B]">
              <span>Administradoras reguladas pelo Banco Central</span>
              <span aria-hidden="true" className="text-[#C4A25D]">
                ·
              </span>
              <span>Engenharia de lances NS Consórcios</span>
              <span aria-hidden="true" className="text-[#C4A25D]">
                ·
              </span>
              <span>Atendimento personalizado</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-[#DFD6C5] bg-[#DCE4EE] shadow-sm">
              <SafeImage
                src="/src/assets/images/hero_wealth_office_1794859976820.jpg"
                alt="Escritório de consultoria patrimonial Mapeal com mesa em travertino bege e poltronas azul marinho"
                fallbackTitle="Mapeal Consultoria"
                className="h-full w-full object-cover lg:h-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14243B]/25 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column proof strip directly below hero split */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-[#DFD6C5] border-t border-[#DFD6C5] pt-8 sm:grid-cols-2 sm:divide-y-0 sm:gap-8 lg:grid-cols-4">
          {PROOF_METRICS.map((metric) => (
            <div key={metric.label} className="py-3 sm:py-0">
              <p className="font-mono text-2xl font-medium tracking-tight text-[#14243B] tabular-nums lg:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#294366]">{metric.label}</p>
              <p className="mt-0.5 text-xs text-[#3E597B]">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* Brand & Strategic Partnership Showcase */}
        <div className="mt-10 rounded-xl border border-[#DFD6C5] bg-[#FCFAF7] p-6 sm:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:col-span-7">
              <div className="shrink-0">
                <BrandLogo className="h-20 w-auto sm:h-24" />
              </div>

              <div className="hidden h-16 w-px bg-[#DFD6C5] sm:block" aria-hidden="true" />

              <div className="flex items-center gap-4">
                <PartnerSeal className="h-20 w-20 sm:h-22 sm:w-22" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#87692C]">
                    Parceria Estratégica
                  </p>
                  <p className="mt-0.5 font-editorial text-xl font-semibold text-[#14243B]">
                    NS Assessoria Consórcios
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#3E597B]">
                    Acesso direto às melhores administradoras e histórico de contemplação de grupos.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5DBCA] pt-5 lg:col-span-5 lg:border-t-0 lg:pt-0">
              <p className="text-sm leading-relaxed text-[#294366]">
                Enquanto a <span className="font-semibold text-[#14243B]">Mapeal</span> estrutura sua estratégia de negócios e alocação financeira com Marcos Pedro Alves, a parceria com a{' '}
                <span className="font-semibold text-[#14243B]">NS Assessoria Consórcios</span> assegura curadoria técnica de cartas, inteligência de lances e acompanhamento até a liberação do crédito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
