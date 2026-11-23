interface BrandMarkProps {
  variant?: 'solid' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
}

export function BrandMark({ variant = 'solid', size = 'md' }: BrandMarkProps) {
  const dimensions =
    size === 'sm'
      ? 'w-7 h-7 rounded-[6px]'
      : size === 'lg'
        ? 'w-11 h-11 rounded-[8px]'
        : 'w-9 h-9 rounded-[7px]';

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  const surfaceClass =
    variant === 'inverted'
      ? 'bg-[#FEFAF6] text-[#5C3317]'
      : 'bg-[#5C3317] text-[#FEFAF6]';

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${dimensions} ${surfaceClass}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" fill="none" className={iconSize}>
        <path d="M8 1.5L12.5 8H8V14.5L3.5 8H8V1.5Z" fill="currentColor" />
      </svg>
    </span>
  );
}
