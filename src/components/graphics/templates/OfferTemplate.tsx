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

  // OFFER-LUXURY
  if (variant === 'offer-luxury') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)' }}>
        {/* Gold accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Offer" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* VIP Badge */}
          <div className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-6 shadow-lg shadow-amber-500/30">
            <span className="text-black text-xs font-bold tracking-[0.3em]">✦ PAKIET PREMIUM ✦</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Pakiet Luksusowy'}</h2>
          {subheadline && <p className="text-amber-400/80 text-sm mb-6">{subheadline}</p>}

          {/* Features */}
          {featureList.length > 0 && (
            <div className="space-y-2 mb-6">
              {featureList.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm">
                  <span className="text-amber-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            {oldPrice && <span className="text-zinc-500 line-through text-lg mr-2">{oldPrice}</span>}
            <span className="text-4xl font-black text-white">{price || '299 zł'}</span>
          </div>

          {ctaText && (
            <span className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-black font-bold shadow-lg shadow-amber-500/30">
              {ctaText}
            </span>
          )}
        </div>

        {/* Corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-amber-400/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-amber-400/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-amber-400/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-amber-400/40" />
      </div>
    );
  }

  // OFFER-SEASONAL
  if (variant === 'offer-seasonal') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
        {/* Decorative flowers */}
        <div className="absolute top-4 left-4 text-4xl opacity-20">🌸</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-20">🌺</div>

        {/* Content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-pink-500 text-white text-xs font-bold tracking-wider rounded-full">OFERTA SEZONOWA</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-3">{headline || 'Wiosenna Promocja'}</h2>
          </div>

          {/* Image */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-xl mb-4">
            <img src={img} alt="Seasonal" className="w-full h-full object-cover" />
          </div>

          {/* Price and CTA */}
          <div className="text-center">
            <div className="mb-3">
              {oldPrice && <span className="text-gray-400 line-through mr-2">{oldPrice}</span>}
              <span className="text-3xl font-bold text-pink-600">{price || '199 zł'}</span>
            </div>
            {ctaText && (
              <span className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-lg shadow-pink-500/30">
                {ctaText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // OFFER-PACKAGE
  if (variant === 'offer-package') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#0f0f0f' }}>
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-transparent to-purple-600/20" />

        {/* Content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full mb-3">
              <span className="text-pink-400 text-xs tracking-wider">PAKIET USŁUG</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{headline || 'Pakiet Beauty'}</h2>
            {subheadline && <p className="text-zinc-400 text-sm mt-1">{subheadline}</p>}
          </div>

          {/* Features list */}
          <div className="flex-1 bg-zinc-900/50 rounded-2xl p-4 mb-4">
            {featureList.length > 0 ? (
              <div className="space-y-3">
                {featureList.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <img src={img} alt="Package" className="w-full h-full object-cover rounded-xl opacity-50" />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="mb-3">
              {oldPrice && <span className="text-zinc-500 line-through text-sm mr-2">{oldPrice}</span>}
              <span className="text-3xl font-bold text-white">{price || '399 zł'}</span>
            </div>
            {ctaText && (
              <span className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-lg shadow-pink-500/30">
                {ctaText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // OFFER-VIP
  if (variant === 'offer-vip') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}>
        {/* Luxury glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Crown */}
          <div className="text-5xl mb-4">👑</div>

          <div className="px-6 py-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full mb-4">
            <span className="text-black text-xs font-bold tracking-[0.2em]">EKSKLUZYWNA OFERTA VIP</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Członkostwo VIP'}</h2>
          {subheadline && <p className="text-amber-300/60 text-sm mb-6">{subheadline}</p>}

          {/* Benefits */}
          {featureList.length > 0 && (
            <div className="space-y-2 mb-6">
              {featureList.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                  <span className="text-amber-400">★</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">{price || '599 zł'}</span>
            <span className="text-amber-400/60 text-sm block mt-1">/miesiąc</span>
          </div>

          {ctaText && (
            <span className="inline-block px-8 py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full text-black font-bold shadow-lg shadow-amber-500/30">
              {ctaText}
            </span>
          )}
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-10 h-10 border-l border-t border-amber-400/30" />
        <div className="absolute top-4 right-4 w-10 h-10 border-r border-t border-amber-400/30" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-l border-b border-amber-400/30" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-r border-b border-amber-400/30" />
      </div>
    );
  }

  // OFFER-STORY
  if (variant === 'offer-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #1a0a14 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 text-center">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold tracking-wider rounded-full shadow-lg">
            OFERTA SPECJALNA
          </span>
        </div>

        {/* Image */}
        <div className="absolute top-24 left-6 right-6 aspect-square rounded-2xl overflow-hidden shadow-2xl">
          <img src={img} alt="Offer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Pakiet Premium'}</h2>
          {subheadline && <p className="text-pink-300/80 mb-4">{subheadline}</p>}

          {/* Price */}
          <div className="mb-6">
            {oldPrice && <span className="text-zinc-500 line-through mr-2">{oldPrice}</span>}
            <span className="text-4xl font-black text-white">{price || '299 zł'}</span>
          </div>

          {ctaText && (
            <span className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold text-lg shadow-lg shadow-pink-500/30">
              {ctaText}
            </span>
          )}

          {/* Swipe */}
          <div className="mt-6 flex flex-col items-center">
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
