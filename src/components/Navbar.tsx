import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { href: '#simulador', label: 'Simulador' },
  { href: '#estrategias', label: 'Estratégias' },
  { href: '#resultados', label: 'Avaliações' },
  { href: '#contato', label: 'Contato' },
];

export function Navbar({ onBookClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-[#CFC6BC] bg-[#e3dcd5]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4 lg:px-10 lg:py-5">
        {/* Zone 1: Inaugural 2x Mapeal logo */}
        <a
          href="#topo"
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D324E]"
        >
          <BrandLogo className="h-20 w-auto sm:h-24 lg:h-28" />
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#294366]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#14243B] hover:underline hover:decoration-[#A5833E] hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D324E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary tactile action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="tactile-tile-navy hidden sm:inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide text-[#FCFAF7] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A5833E]"
          >
            Agendar Diagnóstico
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="tactile-button-raised inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#14243B] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-[#CFC6BC] bg-[#e3dcd5] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-[#294366] hover:text-[#14243B]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="tactile-tile-navy mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-[#FCFAF7]"
            >
              Agendar Diagnóstico
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
