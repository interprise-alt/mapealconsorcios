interface BrandLogoProps {
  className?: string;
  alt?: string;
}

const BRAND_LOGO_SRC =
  '/assets/aistudio/Logo_Mapeal_com_Swoosh_Dourado_e_Crescimento_5ad81f79.png';
const PARTNER_SEAL_SRC = '/assets/aistudio/image_826c8182.png';

export function BrandLogo({
  className = 'h-14 w-auto',
  alt = 'Mapeal — Consultoria em negócios, investimentos e consórcios',
}: BrandLogoProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`object-contain ${className}`}
    />
  );
}

interface PartnerSealProps {
  className?: string;
}

export function PartnerSeal({ className = 'h-20 w-20' }: PartnerSealProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full border border-[#DFD6C5] bg-[#182C46] shrink-0 ${className}`}
    >
      <img
        src={PARTNER_SEAL_SRC}
        alt="Selo oficial NS Assessoria Consórcios"
        referrerPolicy="no-referrer"
        className="h-full w-full scale-[1.09] object-cover"
      />
    </div>
  );
}
