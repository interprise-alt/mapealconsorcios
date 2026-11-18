import { BrandLogo, PartnerSeal } from './BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-[#CFC6BC] bg-[#E3DCD5]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-md">
            <div className="flex flex-wrap items-center gap-5">
              <BrandLogo className="h-16 w-auto sm:h-20" />
              <div className="h-10 w-px bg-[#CFC6BC]" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <PartnerSeal className="h-12 w-12" />
                <div className="text-xs text-[#294366]">
                  <p className="font-semibold text-[#14243B]">Parceria Oficial</p>
                  <p>NS Assessoria Consórcios</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#3E597B]">
              2M Consórcios & Investimentos — Consultoria estratégica por Marcos Pedro Alves, unindo planejamento financeiro independente à inteligência de contemplação da NS Assessoria Consórcios.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#87692C]">Navegação</p>
              <ul className="mt-3 space-y-2 text-sm text-[#294366]">
                <li>
                  <a href="#simulador" className="hover:text-[#14243B] hover:underline">
                    Simulador
                  </a>
                </li>
                <li>
                  <a href="#estrategias" className="hover:text-[#14243B] hover:underline">
                    Estratégias
                  </a>
                </li>
                <li>
                  <a href="#contempladas" className="hover:text-[#14243B] hover:underline">
                    Contempladas
                  </a>
                </li>
                <li>
                  <a href="#resultados" className="hover:text-[#14243B] hover:underline">
                    Avaliações
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-[#14243B] hover:underline">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wide text-[#87692C]">Atendimento</p>
              <ul className="mt-3 space-y-2 text-sm text-[#294366]">
                <li>
                  <a
                    href="https://wa.me/5531987707470"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-medium text-[#14243B] tabular-nums hover:text-[#87692C] hover:underline"
                  >
                    WhatsApp: (31) 98770-7470
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:mapealconsorcios@gmail.com"
                    className="hover:text-[#14243B] hover:underline"
                  >
                    mapealconsorcios@gmail.com
                  </a>
                </li>
                <li>Segunda a Sexta · 09h às 19h</li>
                <li>Atendimento Presencial e Online</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#CFC6BC] pt-6 text-xs text-[#4E6478] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} 2M Consórcios & Investimentos. Em parceria com NS Assessoria Consórcios.
          </p>
          <p>
            As simulações são estimativas educacionais sujeitas à atualização de índices (INCC/IPCA) e disponibilidade de grupos.
          </p>
        </div>
      </div>
    </footer>
  );
}
