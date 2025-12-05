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

  // EFFECT-GLOW
  if (variant === 'effect-glow') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#050505' }}>
        {/* Multi-color glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink-500/30 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/30 rounded-full blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/20 rounded-full blur-[60px]" />
        </div>

        {/* Image with glow frame */}
        <div className="absolute inset-8 rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(236,72,153,0.4), 0 0 120px rgba(168,85,247,0.2)' }}>
          <img src={img} alt="Effect" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-12 left-8 right-8 text-center">
          <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
            {headline || 'Efekt Glow'}
          </h2>
          {subheadline && <p className="text-pink-300/80 text-sm mt-2">{subheadline}</p>}
        </div>

        {/* Service tag */}
        {serviceName && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-400 text-xs tracking-wider">
              {serviceName}
            </span>
          </div>
        )}
      </div>
    );
  }

  // EFFECT-WOW
  if (variant === 'effect-wow') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        {/* Starburst effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)' }} />

        {/* Image */}
        <div className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-pink-500/30">
          <img src={img} alt="WOW" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* WOW badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/40 transform -rotate-3">
            <span className="text-white text-lg font-black tracking-wider">WOW!</span>
          </div>
        </div>

        {/* Text */}
        <div className="absolute bottom-10 left-6 right-6 text-center">
          <h2 className="text-2xl font-bold text-white">{headline || 'Niesamowity Efekt'}</h2>
          {serviceName && <p className="text-pink-400 text-sm mt-1">{serviceName}</p>}
          {salonName && <p className="text-zinc-500 text-xs mt-2 tracking-wider">{salonName}</p>}
        </div>

        {/* Stars decoration */}
        <div className="absolute top-8 left-8 text-2xl">✨</div>
        <div className="absolute top-12 right-10 text-xl">⭐</div>
        <div className="absolute bottom-20 left-10 text-lg">✨</div>
      </div>
    );
  }

  // EFFECT-PREMIUM
  if (variant === 'effect-premium') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Gold accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Image with premium frame */}
        <div className="absolute inset-5">
          <div className="relative h-full rounded-2xl overflow-hidden ring-1 ring-amber-400/30">
            <img src={img} alt="Premium" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>
        </div>

        {/* Premium badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <div className="px-5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-lg">
            <span className="text-black text-xs font-bold tracking-wider">PREMIUM RESULT</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-8 left-5 right-5 text-center">
          <h2 className="text-2xl font-bold text-white">{headline || 'Efekt Premium'}</h2>
          {serviceName && (
            <div className="mt-2 inline-block px-4 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full">
              <span className="text-amber-400 text-xs">{serviceName}</span>
            </div>
          )}
        </div>

        {/* Corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-amber-400/40" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r border-t border-amber-400/40" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l border-b border-amber-400/40" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-amber-400/40" />
      </div>
    );
  }

  // EFFECT-STORY
  if (variant === 'effect-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Full image */}
        <div className="absolute inset-0">
          <img src={img} alt="Effect" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Top badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <div className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/40">
            <span className="text-white text-sm font-bold tracking-wider">✨ EFEKT ✨</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">{headline || 'Wow Result'}</h2>
          {serviceName && <p className="text-pink-400 text-lg">{serviceName}</p>}
          {salonName && (
            <p className="text-zinc-500 text-sm mt-4 tracking-wider">{salonName}</p>
          )}

          {/* Swipe */}
          <div className="mt-8 flex flex-col items-center">
            <svg className="w-6 h-6 text-white/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-white/40 text-xs mt-1">Zobacz więcej</span>
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
