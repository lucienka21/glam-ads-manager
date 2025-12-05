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

  // PROMO-NEON - Cyberpunk sale
  if (variant === 'promo-neon') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#030303' }}>
        {/* Multi-color neon glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500/30 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-fuchsia-500/30 rounded-full blur-[80px]" />
        </div>
        
        {/* Circular image with neon ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-full overflow-hidden" style={{ boxShadow: '0 0 0 4px #ec4899, 0 0 60px rgba(236,72,153,0.6), 0 0 120px rgba(236,72,153,0.3)' }}>
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-6 right-6 w-28 h-28 rounded-full flex flex-col items-center justify-center transform rotate-12" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', boxShadow: '0 0 50px rgba(236,72,153,0.6)' }}>
          <span className="text-white text-4xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight" style={{ textShadow: '0 0 30px rgba(236,72,153,0.5)' }}>
            {headline || 'MEGA PROMOCJA'}
          </h2>
          {subheadline && <p className="text-pink-300/80 text-sm mt-2">{subheadline}</p>}
          {ctaText && (
            <div className="mt-5">
              <span className="inline-block px-8 py-3 bg-white text-pink-600 rounded-full font-bold text-sm shadow-xl">{ctaText}</span>
            </div>
          )}
        </div>

        {/* Neon corner accents */}
        <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-pink-500" style={{ boxShadow: '-4px -4px 20px rgba(236,72,153,0.6)' }} />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-pink-500" style={{ boxShadow: '4px 4px 20px rgba(236,72,153,0.6)' }} />
      </div>
    );
  }

  // PROMO-ELEGANT - Sophisticated promotion
  if (variant === 'promo-elegant') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Background" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Badge */}
          <div className="px-5 py-2 bg-pink-500/15 border border-pink-500/30 rounded-full mb-5">
            <span className="text-pink-400 text-[10px] tracking-[0.4em] uppercase">Promocja</span>
          </div>

          {/* Discount */}
          <div className="mb-5">
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
              {discountText || '-30%'}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{headline || 'Na wszystkie zabiegi'}</h2>
          {subheadline && <p className="text-zinc-400 text-sm mb-6">{subheadline}</p>}

          {ctaText && (
            <span className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-xl" style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.4)' }}>
              {ctaText}
            </span>
          )}
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-pink-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-pink-500 to-transparent" />
      </div>
    );
  }

  // PROMO-BOLD - High impact sale
  if (variant === 'promo-bold') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #db2777 100%)' }}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)' }} />

        {/* Circle image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full overflow-hidden ring-8 ring-white/20 shadow-2xl">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-8 right-8 bg-white rounded-2xl px-6 py-4 shadow-2xl transform rotate-6">
          <span className="text-pink-600 text-5xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-7 text-center">
          <h2 className="text-4xl font-black text-white drop-shadow-lg">{headline || 'WYPRZEDAŻ'}</h2>
          {subheadline && <p className="text-white/90 mt-2 text-lg">{subheadline}</p>}
          {ctaText && (
            <div className="mt-5">
              <span className="inline-block px-10 py-4 bg-white text-pink-600 rounded-full font-bold text-lg shadow-xl">{ctaText}</span>
            </div>
          )}
        </div>

        {/* Decorative */}
        <div className="absolute top-10 left-10 w-16 h-16 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-24 left-8 w-8 h-8 bg-white/20 rounded-full" />
      </div>
    );
  }

  // PROMO-FLASH - Urgent flash sale
  if (variant === 'promo-flash') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Dramatic gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.2) 0%, rgba(139,92,246,0.15) 50%, transparent 100%)' }} />
        
        {/* Lightning accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] opacity-5">⚡</div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          {/* Flash badge */}
          <div className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 rounded-full mb-5 shadow-xl" style={{ boxShadow: '0 0 40px rgba(234,179,8,0.4)' }}>
            <span className="text-black text-xs font-bold tracking-wider">⚡ FLASH SALE ⚡</span>
          </div>

          {/* Discount */}
          <span className="text-9xl font-black text-white" style={{ textShadow: '0 0 80px rgba(236,72,153,0.6)' }}>
            {discountText || '-70%'}
          </span>

          <h2 className="text-2xl font-bold text-white mt-2">{headline || 'Tylko dziś!'}</h2>
          {subheadline && <p className="text-zinc-400 text-sm mt-1 mb-6">{subheadline}</p>}

          {ctaText && (
            <span className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold text-lg shadow-xl" style={{ boxShadow: '0 10px 40px rgba(234,179,8,0.4)' }}>
              {ctaText}
            </span>
          )}

          {/* Countdown */}
          <div className="mt-7 flex gap-3">
            {['12', '34', '56'].map((num, i) => (
              <div key={i} className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                <span className="text-white font-mono font-bold text-xl">{num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PROMO-STORY - Story format
  if (variant === 'promo-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #ec4899 0%, #f43f5e 100%)' }}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)' }} />

        {/* Image */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-full overflow-hidden ring-8 ring-white/30 shadow-2xl">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-20 right-6 w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center shadow-xl transform rotate-12">
          <span className="text-pink-600 text-3xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
          <h2 className="text-5xl font-black text-white drop-shadow-lg">{headline || 'MEGA PROMOCJA'}</h2>
          {subheadline && <p className="text-white/90 text-xl mt-4">{subheadline}</p>}
          {ctaText && (
            <div className="mt-8">
              <span className="inline-block px-12 py-5 bg-white text-pink-600 rounded-full font-bold text-xl shadow-xl">{ctaText}</span>
            </div>
          )}

          {/* Swipe */}
          <div className="mt-10 flex flex-col items-center">
            <svg className="w-7 h-7 text-white/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-white/70 text-xs mt-1">Swipe up</span>
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