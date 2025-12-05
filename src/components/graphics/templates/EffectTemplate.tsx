import { cn } from '@/lib/utils';

interface EffectTemplateProps {
  variant: string;
  image: string | null;
  headline?: string;
  subheadline?: string;
  serviceName?: string;
  salonName?: string;
  className?: string;
}

export function EffectTemplate({
  variant,
  image,
  headline,
  subheadline,
  serviceName,
  salonName,
  className,
}: EffectTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;

  // EFFECT-GLOW - Multi-color glow effect
  if (variant === 'effect-glow') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#030303' }}>
        {/* Multi-color ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-pink-500/25 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500/25 rounded-full blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rose-500/15 rounded-full blur-[60px]" />
        </div>

        {/* Image with glow frame */}
        <div className="absolute inset-8 rounded-3xl overflow-hidden" style={{ boxShadow: '0 0 80px rgba(236,72,153,0.4), 0 0 150px rgba(168,85,247,0.2)' }}>
          <img src={img} alt="Effect" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-12 left-8 right-8 text-center">
          <h2 className="text-4xl font-bold text-white" style={{ textShadow: '0 0 50px rgba(236,72,153,0.6)' }}>
            {headline || 'Efekt Glow'}
          </h2>
          {subheadline && <p className="text-pink-300/80 text-sm mt-2">{subheadline}</p>}
        </div>

        {/* Service tag */}
        {serviceName && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2">
            <span className="px-5 py-2 bg-pink-500/20 border border-pink-500/40 rounded-full text-pink-400 text-xs tracking-wider backdrop-blur-sm">
              {serviceName}
            </span>
          </div>
        )}
      </div>
    );
  }

  // EFFECT-WOW - Spectacular result showcase
  if (variant === 'effect-wow') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0f0a1a 0%, #1a0f2e 50%, #0f0a1a 100%)' }}>
        {/* Starburst effect */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 60%)' }} />

        {/* Image */}
        <div className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-pink-500/30">
          <img src={img} alt="WOW" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </div>

        {/* WOW badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-xl transform -rotate-2" style={{ boxShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
            <span className="text-white text-xl font-black tracking-wider">WOW!</span>
          </div>
        </div>

        {/* Text */}
        <div className="absolute bottom-10 left-6 right-6 text-center">
          <h2 className="text-3xl font-bold text-white">{headline || 'Niesamowity Efekt'}</h2>
          {serviceName && <p className="text-pink-400 text-sm mt-2 font-medium">{serviceName}</p>}
          {salonName && <p className="text-zinc-500 text-xs mt-3 tracking-[0.3em] uppercase">{salonName}</p>}
        </div>

        {/* Sparkle decorations */}
        <div className="absolute top-8 left-8 text-3xl">✨</div>
        <div className="absolute top-14 right-10 text-2xl">⭐</div>
        <div className="absolute bottom-24 left-10 text-xl">✨</div>
        <div className="absolute bottom-16 right-8 text-lg">✦</div>
      </div>
    );
  }

  // EFFECT-PREMIUM - Gold premium result
  if (variant === 'effect-premium') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#050505' }}>
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Image with premium frame */}
        <div className="absolute inset-5">
          <div className="relative h-full rounded-2xl overflow-hidden ring-1 ring-amber-400/30">
            <img src={img} alt="Premium" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
          </div>
        </div>

        {/* Premium badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-xl" style={{ boxShadow: '0 0 30px rgba(245,158,11,0.4)' }}>
            <span className="text-black text-xs font-bold tracking-[0.2em] uppercase">Premium Result</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-10 left-5 right-5 text-center">
          <h2 className="text-3xl font-bold text-white">{headline || 'Efekt Premium'}</h2>
          {serviceName && (
            <div className="mt-3 inline-block px-5 py-1.5 bg-amber-400/10 border border-amber-400/25 rounded-full">
              <span className="text-amber-400 text-xs tracking-wider">{serviceName}</span>
            </div>
          )}
        </div>

        {/* Corners */}
        <div className="absolute top-3 left-3 w-10 h-10 border-l border-t border-amber-400/40" />
        <div className="absolute top-3 right-3 w-10 h-10 border-r border-t border-amber-400/40" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-l border-b border-amber-400/40" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-r border-b border-amber-400/40" />
      </div>
    );
  }

  // EFFECT-STORY - Vertical story format
  if (variant === 'effect-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: '#050505' }}>
        {/* Full image background */}
        <div className="absolute inset-0">
          <img src={img} alt="Effect" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Top badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-xl" style={{ boxShadow: '0 0 50px rgba(236,72,153,0.5)' }}>
            <span className="text-white text-sm font-bold tracking-wider">✨ EFEKT ✨</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
          <h2 className="text-5xl font-bold text-white mb-3">{headline || 'Wow Result'}</h2>
          {serviceName && <p className="text-pink-400 text-xl">{serviceName}</p>}
          {salonName && (
            <p className="text-zinc-500 text-sm mt-5 tracking-[0.4em] uppercase">{salonName}</p>
          )}

          {/* Swipe */}
          <div className="mt-10 flex flex-col items-center">
            <svg className="w-7 h-7 text-white/50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-white/50 text-xs mt-1">Zobacz więcej</span>
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