import { cn } from '@/lib/utils';

interface PromoTemplateProps {
  variant: 'promo-sale' | 'promo-new-service' | 'promo-discount' | 'promo-announcement';
  image: string | null;
  headline?: string;
  subheadline?: string;
  discountText?: string;
  ctaText?: string;
  className?: string;
}

export function PromoTemplate({
  variant,
  image,
  headline,
  subheadline,
  discountText,
  ctaText,
  className,
}: PromoTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;

  if (variant === 'promo-sale') {
    return (
      <div className={cn('relative w-full aspect-square bg-gradient-to-br from-pink-600 via-rose-500 to-pink-600 overflow-hidden', className)}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }} />
        </div>
        
        {/* Image circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-6 right-6 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-xl transform rotate-12">
          <span className="text-pink-600 text-3xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
            {headline || 'MEGA WYPRZEDAŻ'}
          </h2>
          {subheadline && (
            <p className="text-white/90 text-sm mt-2">{subheadline}</p>
          )}
          {ctaText && (
            <div className="mt-4">
              <span className="inline-block px-6 py-2 bg-white text-pink-600 rounded-full font-bold text-sm shadow-lg">
                {ctaText}
              </span>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full" />
        <div className="absolute bottom-20 right-4 w-8 h-8 bg-white/20 rounded-full" />
      </div>
    );
  }

  if (variant === 'promo-new-service') {
    return (
      <div className={cn('relative w-full aspect-square bg-zinc-900 overflow-hidden', className)}>
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={img} alt="New Service" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-zinc-900/30" />
        </div>

        {/* NEW badge */}
        <div className="absolute top-6 left-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold tracking-wider rounded-full shadow-lg shadow-pink-500/30">
            NOWOŚĆ
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-3xl font-bold text-white leading-tight">
            {headline || 'Nowa Usługa'}
          </h2>
          {subheadline && (
            <p className="text-pink-300 mt-2 text-sm">{subheadline}</p>
          )}
          {ctaText && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 text-white font-medium">
                {ctaText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500" />
      </div>
    );
  }

  if (variant === 'promo-discount') {
    return (
      <div className={cn('relative w-full aspect-square bg-zinc-950 overflow-hidden', className)}>
        {/* Neon glow effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8">
          {/* Discount */}
          <div className="text-center">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-rose-500" style={{ textShadow: '0 0 60px rgba(236,72,153,0.5)' }}>
              {discountText || '-30%'}
            </span>
          </div>

          {/* Code */}
          <div className="mt-6 px-8 py-3 border-2 border-dashed border-pink-500/50 rounded-lg bg-pink-500/10">
            <p className="text-xs text-pink-300/60 tracking-widest mb-1">KOD RABATOWY</p>
            <p className="text-2xl font-mono font-bold text-white tracking-wider">
              {headline || 'BEAUTY2024'}
            </p>
          </div>

          {subheadline && (
            <p className="mt-6 text-zinc-400 text-sm text-center max-w-xs">{subheadline}</p>
          )}

          {ctaText && (
            <div className="mt-6">
              <span className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-sm shadow-lg shadow-pink-500/30">
                {ctaText}
              </span>
            </div>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pink-500/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-500/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-pink-500/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-500/40" />
      </div>
    );
  }

  // promo-announcement
  return (
    <div className={cn('relative w-full aspect-square bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden', className)}>
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">
          {headline || 'Ważne Ogłoszenie'}
        </h2>
        
        {subheadline && (
          <p className="text-zinc-400 max-w-xs">{subheadline}</p>
        )}

        {ctaText && (
          <div className="mt-6">
            <span className="inline-block px-6 py-2.5 border border-pink-500/50 text-pink-400 rounded-full font-medium text-sm hover:bg-pink-500/10 transition-colors">
              {ctaText}
            </span>
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
    </div>
  );
}
