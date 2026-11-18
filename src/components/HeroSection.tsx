import { ArrowUpRight, Phone } from 'lucide-react';
import { PartnerSeal } from './BrandLogo';

interface HeroSectionProps {
  onSimulateClick: () => void;
  onContactClick: () => void;
}

export function HeroSection({ onSimulateClick, onContactClick }: HeroSectionProps) {
  return (
    <section id="topo" className="bg-[#E3DCD5] pt-6 pb-4 lg:pt-8 lg:pb-6">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-[#87692C]">
              2M Consórcios & Investimentos · Em parceria com NS Assessoria Consórcios
            </p>
            <h1
              className="mt-2 font-editorial font-semibold tracking-tight text-[#14243B]"
              style={{
                fontSize: 'clamp(2rem, 3.2vw, 3rem)',
                lineHeight: 1.08,
                textWrap: 'balance',
              }}
            >
              Planeje seu consórcio e seus investimentos no painel abaixo.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#294366] sm:text-base">
              Simule em tempo real a economia frente ao financiamento bancário, compare estratégias de lance e projete sua evolução patrimonial com suporte de Marcos Pedro Alves.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="tactile-panel flex flex-col justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5">
                <PartnerSeal className="h-14 w-14 sm:h-16 sm:w-16" />
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-[#87692C]">
                    Parceria Oficial
                  </p>
                  <p className="font-editorial text-lg font-semibold text-[#14243B]">
                    NS Assessoria Consórcios
                  </p>
                  <a
                    href="https://wa.me/5531987707470"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 font-mono text-xs font-medium text-[#294366] tabular-nums hover:text-[#87692C] hover:underline"
                  >
                    <Phone className="h-3 w-3 text-[#87692C]" aria-hidden="true" />
                    (31) 98770-7470
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                <button
                  type="button"
                  onClick={onSimulateClick}
                  className="tactile-tile-sage flex-1 rounded-xl px-4 py-2 text-xs font-semibold text-[#FCFAF7] whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 sm:flex-initial"
                >
                  Simular Agora
                </button>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="tactile-button-raised flex-1 rounded-xl px-4 py-2 text-xs font-semibold text-[#1D324E] whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 sm:flex-initial"
                >
                  Falar Conosco
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
