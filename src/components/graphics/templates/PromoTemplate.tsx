import { cn } from '@/lib/utils';

interface PromoTemplateProps {
  variant: string;
  image: string | null;
  headline?: string;
  subheadline?: string;
  discountText?: string;
  ctaText?: string;
  salonName?: string;
  className?: string;
}

export function PromoTemplate({
  variant,
  image,
  headline,
  subheadline,
  discountText,
  ctaText,
  salonName,
  className,
}: PromoTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;

  // PROMO-NEON
  if (variant === 'promo-neon') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#050505' }}>
        {/* Neon glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-500/10 rounded-full blur-[100px]" />
        
        {/* Image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-full overflow-hidden ring-4 ring-pink-500 shadow-[0_0_60px_rgba(236,72,153,0.5)]">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-6 right-6 w-24 h-24 rounded-full flex flex-col items-center justify-center transform rotate-12" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', boxShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
          <span className="text-white text-3xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight">{headline || 'MEGA PROMOCJA'}</h2>
          {subheadline && <p className="text-pink-300 text-sm mt-2">{subheadline}</p>}
          {ctaText && (
            <div className="mt-4">
              <span className="inline-block px-6 py-2.5 bg-white text-pink-600 rounded-full font-bold text-sm">{ctaText}</span>
            </div>
          )}
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pink-500" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-500" />
      </div>
    );
  }

  // PROMO-ELEGANT
  if (variant === 'promo-elegant') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)' }}>
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={img} alt="Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Badge */}
          <div className="px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full mb-4">
            <span className="text-pink-400 text-xs tracking-[0.3em] uppercase">Promocja</span>
          </div>

          {/* Discount */}
          <div className="mb-4">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">{discountText || '-30%'}</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{headline || 'Na wszystkie zabiegi'}</h2>
          {subheadline && <p className="text-zinc-400 text-sm mb-6">{subheadline}</p>}

          {ctaText && (
            <span className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-lg shadow-pink-500/30">
              {ctaText}
            </span>
          )}
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-pink-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-pink-500 to-transparent" />
      </div>
    );
  }

  // PROMO-BOLD
  if (variant === 'promo-bold') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)' }}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />

        {/* Circle image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount - big */}
        <div className="absolute top-6 right-6 bg-white rounded-2xl px-5 py-3 shadow-xl transform rotate-6">
          <span className="text-pink-600 text-4xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h2 className="text-3xl font-black text-white drop-shadow-lg">{headline || 'WYPRZEDAŻ'}</h2>
          {subheadline && <p className="text-white/90 mt-2">{subheadline}</p>}
          {ctaText && (
            <div className="mt-4">
              <span className="inline-block px-8 py-3 bg-white text-pink-600 rounded-full font-bold shadow-lg">{ctaText}</span>
            </div>
          )}
        </div>

        {/* Decorative circles */}
        <div className="absolute top-8 left-8 w-12 h-12 border-2 border-white/30 rounded-full" />
        <div className="absolute bottom-20 left-6 w-6 h-6 bg-white/20 rounded-full" />
      </div>
    );
  }

  // PROMO-FLASH
  if (variant === 'promo-flash') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 via-purple-600/20 to-rose-600/30" />
        
        {/* Lightning bolt accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-10">⚡</div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          {/* Flash badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-full mb-4 shadow-lg shadow-yellow-500/30">
            <span className="text-black text-xs font-bold tracking-wider">⚡ FLASH SALE</span>
          </div>

          {/* Discount */}
          <span className="text-8xl font-black text-white mb-2" style={{ textShadow: '0 0 60px rgba(236,72,153,0.5)' }}>
            {discountText || '-70%'}
          </span>

          <h2 className="text-2xl font-bold text-white mb-1">{headline || 'Tylko dziś!'}</h2>
          {subheadline && <p className="text-zinc-400 text-sm mb-6">{subheadline}</p>}

          {ctaText && (
            <span className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold shadow-lg shadow-yellow-500/30">
              {ctaText}
            </span>
          )}

          {/* Timer placeholder */}
          <div className="mt-6 flex gap-2">
            {['12', '34', '56'].map((num, i) => (
              <div key={i} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white font-mono font-bold">{num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PROMO-STORY
  if (variant === 'promo-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #ec4899 0%, #f43f5e 100%)' }}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />

        {/* Image */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[65%] aspect-square rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-16 right-6 w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center shadow-xl transform rotate-12">
          <span className="text-pink-600 text-2xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h2 className="text-4xl font-black text-white drop-shadow-lg">{headline || 'MEGA PROMOCJA'}</h2>
          {subheadline && <p className="text-white/90 text-lg mt-3">{subheadline}</p>}
          {ctaText && (
            <div className="mt-6">
              <span className="inline-block px-10 py-4 bg-white text-pink-600 rounded-full font-bold text-lg shadow-xl">{ctaText}</span>
            </div>
          )}

          {/* Swipe up */}
          <div className="mt-8 flex flex-col items-center">
            <svg className="w-6 h-6 text-white/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-white/60 text-xs mt-1">Swipe up</span>
          </div>
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className={cn('relative w-full aspect-square bg-zinc-900 flex items-center justify-center', className)}>
      <p className="text-zinc-500">Wybierz szablon</p>
    </div>
  );
}
