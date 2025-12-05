import { cn } from '@/lib/utils';

interface OfferTemplateProps {
  variant: string;
  image: string | null;
  headline?: string;
  subheadline?: string;
  price?: string;
  oldPrice?: string;
  features?: string;
  ctaText?: string;
  salonName?: string;
  className?: string;
}

export function OfferTemplate({
  variant,
  image,
  headline,
  subheadline,
  price,
  oldPrice,
  features,
  ctaText,
  salonName,
  className,
}: OfferTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;
  const featureList = features ? features.split('\n').filter(f => f.trim()) : [];

  // OFFER-LUXURY - Premium gold aesthetic
  if (variant === 'offer-luxury') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #050505 100%)' }}>
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Offer" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* VIP Badge */}
          <div className="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-6 shadow-xl" style={{ boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>
            <span className="text-black text-xs font-bold tracking-[0.4em]">✦ PAKIET PREMIUM ✦</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-2">{headline || 'Pakiet Luksusowy'}</h2>
          {subheadline && <p className="text-amber-400/70 text-sm mb-6">{subheadline}</p>}

          {/* Features */}
          {featureList.length > 0 && (
            <div className="space-y-3 mb-6">
              {featureList.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-200 text-sm">
                  <span className="text-amber-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            {oldPrice && <span className="text-zinc-500 line-through text-xl mr-3">{oldPrice}</span>}
            <span className="text-5xl font-black text-white">{price || '299 zł'}</span>
          </div>

          {ctaText && (
            <span className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-black font-bold shadow-xl" style={{ boxShadow: '0 10px 40px rgba(245,158,11,0.4)' }}>
              {ctaText}
            </span>
          )}
        </div>

        {/* Corners */}
        <div className="absolute top-4 left-4 w-10 h-10 border-l border-t border-amber-400/40" />
        <div className="absolute top-4 right-4 w-10 h-10 border-r border-t border-amber-400/40" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-l border-b border-amber-400/40" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-r border-b border-amber-400/40" />
      </div>
    );
  }

  // OFFER-SEASONAL - Fresh seasonal offer
  if (variant === 'offer-seasonal') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
        {/* Soft decorative elements */}
        <div className="absolute top-6 left-6 text-5xl opacity-15">🌸</div>
        <div className="absolute bottom-6 right-6 text-5xl opacity-15">🌺</div>
        <div className="absolute top-1/2 right-8 text-3xl opacity-10">✿</div>

        {/* Content */}
        <div className="relative h-full flex flex-col p-7">
          {/* Header */}
          <div className="text-center mb-4">
            <span className="inline-block px-5 py-2 bg-pink-500 text-white text-xs font-bold tracking-wider rounded-full shadow-lg">
              OFERTA SEZONOWA
            </span>
            <h2 className="text-3xl font-bold text-rose-900 mt-4">{headline || 'Wiosenna Promocja'}</h2>
          </div>

          {/* Image */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl mb-5 ring-4 ring-white/60">
            <img src={img} alt="Seasonal" className="w-full h-full object-cover" />
          </div>

          {/* Price and CTA */}
          <div className="text-center">
            <div className="mb-4">
              {oldPrice && <span className="text-rose-400 line-through mr-3 text-lg">{oldPrice}</span>}
              <span className="text-4xl font-bold text-pink-600">{price || '199 zł'}</span>
            </div>
            {ctaText && (
              <span className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-xl" style={{ boxShadow: '0 10px 30px rgba(236,72,153,0.3)' }}>
                {ctaText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // OFFER-PACKAGE - Bundle deal
  if (variant === 'offer-package') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#080808' }}>
        {/* Gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(236,72,153,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(139,92,246,0.15) 0%, transparent 50%)' }} />

        {/* Content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-500/15 border border-pink-500/30 rounded-full mb-3">
              <span className="text-pink-400 text-xs tracking-[0.2em] uppercase">Pakiet Usług</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{headline || 'Pakiet Beauty'}</h2>
            {subheadline && <p className="text-zinc-400 text-sm mt-1">{subheadline}</p>}
          </div>

          {/* Features list */}
          <div className="flex-1 bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-zinc-800">
            {featureList.length > 0 ? (
              <div className="space-y-4">
                {featureList.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 text-white">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <img src={img} alt="Package" className="w-full h-full object-cover rounded-xl opacity-40" />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="mb-4">
              {oldPrice && <span className="text-zinc-500 line-through text-sm mr-2">{oldPrice}</span>}
              <span className="text-4xl font-bold text-white">{price || '399 zł'}</span>
            </div>
            {ctaText && (
              <span className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-xl" style={{ boxShadow: '0 10px 30px rgba(236,72,153,0.4)' }}>
                {ctaText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // OFFER-VIP - Exclusive VIP
  if (variant === 'offer-vip') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0f0a1a 0%, #1a0f2e 50%, #0f0a1a 100%)' }}>
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Crown */}
          <div className="text-6xl mb-4">👑</div>

          <div className="px-8 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full mb-5 shadow-xl">
            <span className="text-black text-xs font-bold tracking-[0.3em]">EKSKLUZYWNA OFERTA VIP</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Członkostwo VIP'}</h2>
          {subheadline && <p className="text-amber-300/50 text-sm mb-6">{subheadline}</p>}

          {/* Benefits */}
          {featureList.length > 0 && (
            <div className="space-y-2 mb-6">
              {featureList.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <span className="text-amber-400">★</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">{price || '599 zł'}</span>
            <span className="text-amber-400/50 text-sm block mt-1">/miesiąc</span>
          </div>

          {ctaText && (
            <span className="inline-block px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full text-black font-bold shadow-xl" style={{ boxShadow: '0 10px 50px rgba(245,158,11,0.4)' }}>
              {ctaText}
            </span>
          )}
        </div>

        {/* Corners */}
        <div className="absolute top-5 left-5 w-12 h-12 border-l border-t border-amber-400/30" />
        <div className="absolute top-5 right-5 w-12 h-12 border-r border-t border-amber-400/30" />
        <div className="absolute bottom-5 left-5 w-12 h-12 border-l border-b border-amber-400/30" />
        <div className="absolute bottom-5 right-5 w-12 h-12 border-r border-b border-amber-400/30" />
      </div>
    );
  }

  // OFFER-STORY - Story format
  if (variant === 'offer-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #080808 0%, #150810 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-[100px]" />

        {/* Header */}
        <div className="absolute top-10 left-0 right-0 text-center">
          <span className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold tracking-wider rounded-full shadow-xl">
            OFERTA SPECJALNA
          </span>
        </div>

        {/* Image */}
        <div className="absolute top-28 left-6 right-6 aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-pink-500/30">
          <img src={img} alt="Offer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">{headline || 'Pakiet Premium'}</h2>
          {subheadline && <p className="text-pink-300/80 mb-5">{subheadline}</p>}

          {/* Price */}
          <div className="mb-6">
            {oldPrice && <span className="text-zinc-500 line-through mr-2">{oldPrice}</span>}
            <span className="text-5xl font-black text-white">{price || '299 zł'}</span>
          </div>

          {ctaText && (
            <span className="inline-block px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold text-lg shadow-xl" style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.4)' }}>
              {ctaText}
            </span>
          )}

          {/* Swipe */}
          <div className="mt-8 flex flex-col items-center">
            <svg className="w-6 h-6 text-white/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
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