import { useState } from 'react';
import { Landmark } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = '2M Consórcios & Investimentos',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#DCE4EE] via-[#F2EBE0] to-[#F6EFE0] p-8 text-center ${className}`}
      >
        <Landmark className="h-8 w-8 text-[#294366] opacity-70" aria-hidden="true" />
        <p className="mt-3 font-editorial text-lg font-semibold text-[#14243B]">
          {fallbackTitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
