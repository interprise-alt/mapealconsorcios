interface BrandLogoProps {
  className?: string;
  alt?: string;
}

const BRAND_LOGO_SRC =
  '/assets/aistudio/Logo_2M_em_Ouro_e_Marinho_bba11806.png';
const PARTNER_SEAL_SRC = '/assets/aistudio/image_826c8182.png';

export function BrandLogo({
  className = 'h-20 w-auto',
  alt = '2M Consórcios & Investimentos',
}: BrandLogoProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`rounded-xl border border-[#DDD5CC] object-contain shadow-[0_6px_16px_-6px_rgba(20,36,59,0.14)] ${className}`}
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
