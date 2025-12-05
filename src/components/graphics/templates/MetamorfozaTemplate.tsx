import { cn } from '@/lib/utils';

interface MetamorfozaTemplateProps {
  variant: string;
  beforeImage: string | null;
  afterImage: string | null;
  headline?: string;
  subheadline?: string;
  salonName?: string;
  className?: string;
}

export function MetamorfozaTemplate({
  variant,
  beforeImage,
  afterImage,
  headline,
  subheadline,
  salonName,
  className,
}: MetamorfozaTemplateProps) {
  const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop&auto=format';
  const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop&auto=format';
  const before = beforeImage || placeholderBefore;
  const after = afterImage || placeholderAfter;

  // META-GLAMOUR - Premium split design
  if (variant === 'meta-glamour') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a14 50%, #0a0a0a 100%)' }}>
        {/* Luxurious ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]" style={{ background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.15) 0%, transparent 70%)' }} />
        
        {/* Elegant frame border */}
        <div className="absolute inset-3 border border-pink-500/20 rounded-xl" />
        
        {/* Header with salon branding */}
        <div className="absolute top-4 left-0 right-0 text-center z-10">
          {salonName && <p className="text-[10px] tracking-[0.4em] text-pink-400/60 uppercase font-light">{salonName}</p>}
          <h2 className="text-2xl font-bold text-white tracking-wider mt-1" style={{ fontFamily: 'system-ui', letterSpacing: '0.1em' }}>
            {headline || 'METAMORFOZA'}
          </h2>
        </div>

        {/* Images container */}
        <div className="absolute top-16 bottom-6 left-5 right-5 flex gap-3">
          {/* Before */}
          <div className="relative flex-1 rounded-2xl overflow-hidden group">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase">Przed</span>
            </div>
          </div>
          
          {/* Neon divider */}
          <div className="relative w-1 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/0 via-pink-500 to-pink-500/0" style={{ boxShadow: '0 0 20px rgba(236,72,153,0.8), 0 0 40px rgba(236,72,153,0.4)' }} />
          </div>
          
          {/* After */}
          <div className="relative flex-1 rounded-2xl overflow-hidden ring-2 ring-pink-500/40" style={{ boxShadow: '0 0 40px rgba(236,72,153,0.2)' }}>
            <img src={after} alt="After" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/40">
              <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">Po</span>
            </div>
          </div>
        </div>

        {/* Decorative sparkles */}
        <div className="absolute top-5 right-5 text-pink-400/30 text-lg">✦</div>
        <div className="absolute bottom-5 left-5 text-pink-400/20 text-sm">✦</div>
      </div>
    );
  }

  // META-NEON - Cyberpunk beauty aesthetic
  if (variant === 'meta-neon') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#030303' }}>
        {/* Neon frame */}
        <div className="absolute inset-2 rounded-2xl" style={{ 
          border: '2px solid #ec4899',
          boxShadow: '0 0 30px rgba(236,72,153,0.5), inset 0 0 30px rgba(236,72,153,0.1), 0 0 100px rgba(236,72,153,0.3)'
        }} />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #ec4899 0px, transparent 1px, transparent 2px)' }} />
        
        <div className="relative h-full flex flex-col p-4">
          {/* Header */}
          <div className="text-center mb-4 pt-1">
            <h2 className="text-3xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
              {headline || 'EFEKT WOW'}
            </h2>
            {subheadline && <p className="text-pink-500/60 text-xs mt-1 tracking-wider">{subheadline}</p>}
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-3">
            <div className="flex-1 rounded-xl overflow-hidden bg-zinc-900/50 ring-1 ring-pink-500/20">
              <img src={before} alt="Before" className="w-full h-full object-cover opacity-90" />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden ring-2 ring-pink-500" style={{ boxShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-3 px-8">
            <span className="text-zinc-600 text-[10px] tracking-[0.3em] font-medium">PRZED</span>
            <span className="text-pink-400 text-[10px] tracking-[0.3em] font-bold" style={{ textShadow: '0 0 10px rgba(236,72,153,0.8)' }}>PO</span>
          </div>
        </div>

        {/* Corner neon accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-pink-500" style={{ boxShadow: '-4px -4px 20px rgba(236,72,153,0.5)' }} />
        <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-pink-500" style={{ boxShadow: '4px -4px 20px rgba(236,72,153,0.5)' }} />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-pink-500" style={{ boxShadow: '-4px 4px 20px rgba(236,72,153,0.5)' }} />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-pink-500" style={{ boxShadow: '4px 4px 20px rgba(236,72,153,0.5)' }} />
      </div>
    );
  }

  // META-LUXURY - Gold premium aesthetic
  if (variant === 'meta-luxury') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0806 100%)' }}>
        {/* Gold shimmer overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.03) 50%, transparent 60%)' }} />
        
        {/* Top gold line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        
        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
              <span className="text-amber-400/50 text-[9px] tracking-[0.5em] uppercase">Premium Beauty</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>
            <h2 className="text-3xl font-light text-white tracking-[0.15em]">{headline || 'Metamorfoza'}</h2>
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-5">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-amber-400/20">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-amber-400/40 text-[9px] tracking-[0.4em] mt-3 uppercase">Przed</p>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-amber-400/50" style={{ boxShadow: '0 0 40px rgba(217,119,6,0.15)' }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-amber-400 text-[9px] tracking-[0.4em] mt-3 uppercase font-medium">Po</p>
            </div>
          </div>

          {/* Footer */}
          {salonName && (
            <div className="text-center mt-4">
              <p className="text-amber-400/30 text-[8px] tracking-[0.5em] uppercase">{salonName}</p>
            </div>
          )}
        </div>

        {/* Elegant corner frames */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-amber-400/25" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r border-t border-amber-400/25" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-amber-400/25" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-amber-400/25" />
      </div>
    );
  }

  // META-DIAGONAL - Dynamic angled split
  if (variant === 'meta-diagonal') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#000' }}>
        {/* Before - left diagonal */}
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}>
          <img src={before} alt="Before" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
        
        {/* After - right diagonal */}
        <div className="absolute inset-0" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}>
          <img src={after} alt="After" className="w-full h-full object-cover scale-110" />
        </div>

        {/* Neon diagonal divider */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-[150%] bg-gradient-to-b from-pink-500/0 via-pink-500 to-pink-500/0 rotate-[8deg]" style={{ boxShadow: '0 0 40px rgba(236,72,153,1), 0 0 80px rgba(236,72,153,0.6)' }} />
        </div>

        {/* Labels */}
        <div className="absolute top-8 left-8">
          <span className="text-white/80 text-sm tracking-[0.4em] font-light">PRZED</span>
        </div>
        <div className="absolute top-8 right-8">
          <span className="text-pink-400 text-sm tracking-[0.4em] font-medium" style={{ textShadow: '0 0 20px rgba(236,72,153,0.8)' }}>PO</span>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-8 left-8 max-w-[45%]">
          <h2 className="text-3xl font-bold text-white leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            {headline || 'Metamorfoza'}
          </h2>
          {subheadline && <p className="text-pink-300/90 text-sm mt-2 font-light">{subheadline}</p>}
        </div>

        {/* Salon name */}
        {salonName && (
          <div className="absolute bottom-8 right-8">
            <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase">{salonName}</p>
          </div>
        )}
      </div>
    );
  }

  // META-CIRCLE - Elegant circular frames
  if (variant === 'meta-circle') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0f0a1a 0%, #1a0f2e 50%, #0f0a1a 100%)' }}>
        {/* Ambient glows */}
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 text-center">
          <h2 className="text-2xl font-bold text-white tracking-wider">{headline || 'EFEKT ZABIEGU'}</h2>
          {subheadline && <p className="text-pink-400/50 text-xs mt-1">{subheadline}</p>}
        </div>

        {/* Circles */}
        <div className="absolute inset-0 flex items-center justify-center gap-8 pt-6">
          {/* Before circle */}
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-zinc-700/60" style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)' }}>
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-zinc-800/90 backdrop-blur rounded-full border border-zinc-700">
              <span className="text-zinc-400 text-[9px] tracking-[0.25em] uppercase">Przed</span>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-xl" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.5)' }}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* After circle */}
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-pink-500/50" style={{ boxShadow: '0 0 50px rgba(236,72,153,0.3)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg">
              <span className="text-white text-[9px] tracking-[0.25em] uppercase font-semibold">Po</span>
            </div>
          </div>
        </div>

        {/* Salon name */}
        {salonName && (
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-zinc-600 text-[9px] tracking-[0.4em] uppercase">{salonName}</p>
          </div>
        )}
      </div>
    );
  }

  // META-MINIMAL - Clean minimalist
  if (variant === 'meta-minimal') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#faf9f6' }}>
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #c9a96e 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative h-full flex flex-col p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-[#9a8a70] text-[10px] tracking-[0.5em] uppercase">{salonName || 'Beauty Studio'}</p>
            <h2 className="text-4xl text-[#3d3027] mt-2" style={{ fontFamily: 'Georgia, serif' }}>{headline || 'Metamorfoza'}</h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mx-auto mt-4" />
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden shadow-xl">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[#9a8a70] text-xs tracking-[0.3em] mt-3 uppercase">Przed</p>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden shadow-2xl ring-1 ring-[#c9a96e]/30">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[#8b6914] text-xs tracking-[0.3em] mt-3 uppercase font-medium">Po</p>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-5 left-5 w-14 h-14 border-l border-t border-[#c9a96e]/40" />
        <div className="absolute top-5 right-5 w-14 h-14 border-r border-t border-[#c9a96e]/40" />
        <div className="absolute bottom-5 left-5 w-14 h-14 border-l border-b border-[#c9a96e]/40" />
        <div className="absolute bottom-5 right-5 w-14 h-14 border-r border-b border-[#c9a96e]/40" />
      </div>
    );
  }

  // META-DARK - Dark premium
  if (variant === 'meta-dark') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#050505' }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(236,72,153,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(139,92,246,0.08) 0%, transparent 50%)' }} />

        <div className="relative h-full p-5">
          {/* Images side by side */}
          <div className="h-full flex gap-3">
            {/* Before */}
            <div className="flex-1 relative rounded-2xl overflow-hidden">
              <img src={before} alt="Before" className="w-full h-full object-cover brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase">Przed</span>
              </div>
            </div>

            {/* After */}
            <div className="flex-1 relative rounded-2xl overflow-hidden ring-1 ring-pink-500/40" style={{ boxShadow: '0 0 40px rgba(236,72,153,0.15)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 px-4 py-1.5 bg-pink-500/90 backdrop-blur-md rounded-full">
                <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">Po</span>
              </div>
            </div>
          </div>

          {/* Bottom overlay text */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl font-bold text-white">{headline || 'Transformacja'}</h2>
            {subheadline && <p className="text-pink-400/80 text-sm mt-1">{subheadline}</p>}
          </div>
        </div>
      </div>
    );
  }

  // META-GOLD - Rose gold elegance
  if (variant === 'meta-gold') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #1f1a17 0%, #0f0c0a 100%)' }}>
        {/* Rose gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-rose-400/10 rounded-full border border-rose-400/20 mb-3">
              <span className="text-rose-400 text-[9px] tracking-[0.4em] uppercase">✦ Premium ✦</span>
            </div>
            <h2 className="text-2xl font-light text-white tracking-[0.15em]">{headline || 'Metamorfoza'}</h2>
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-4">
            <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-rose-400/20">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden ring-2 ring-rose-400/50" style={{ boxShadow: '0 0 40px rgba(251,113,133,0.2)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-4 px-4">
            <span className="text-rose-400/40 text-[10px] tracking-[0.3em] uppercase">Przed</span>
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-medium">Po</span>
          </div>

          {/* Salon name */}
          {salonName && (
            <div className="text-center mt-3">
              <p className="text-rose-400/30 text-[8px] tracking-[0.5em] uppercase">{salonName}</p>
            </div>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-10 h-10 border-l border-t border-rose-400/30" />
        <div className="absolute top-3 right-3 w-10 h-10 border-r border-t border-rose-400/30" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-l border-b border-rose-400/30" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-r border-b border-rose-400/30" />
      </div>
    );
  }

  // META-PASTEL - Soft aesthetic
  if (variant === 'meta-pastel') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
        {/* Soft circles */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-rose-300/20 rounded-full blur-3xl" />

        <div className="relative h-full flex flex-col p-7">
          {/* Header */}
          <div className="text-center mb-5">
            <h2 className="text-3xl text-rose-900/80" style={{ fontFamily: 'Georgia, serif' }}>{headline || 'Metamorfoza'}</h2>
            {subheadline && <p className="text-rose-600/60 text-sm mt-1">{subheadline}</p>}
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-5">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white/60">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-rose-400 text-xs tracking-wider mt-3">Przed</p>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-2xl overflow-hidden shadow-xl ring-4 ring-pink-400/40">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-rose-600 text-xs tracking-wider mt-3 font-medium">Po</p>
            </div>
          </div>

          {/* Salon */}
          {salonName && (
            <div className="text-center mt-4">
              <p className="text-rose-400/60 text-[10px] tracking-[0.3em] uppercase">{salonName}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // META-BOLD - High contrast impact
  if (variant === 'meta-bold') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#000' }}>
        {/* Images with overlap effect */}
        <div className="absolute top-6 left-6 right-[45%] bottom-[30%] rounded-xl overflow-hidden shadow-2xl ring-2 ring-white/10 z-10">
          <img src={before} alt="Before" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur rounded-full">
            <span className="text-white text-[9px] tracking-widest uppercase">Przed</span>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 left-[35%] top-[25%] rounded-xl overflow-hidden shadow-2xl ring-2 ring-pink-500/50 z-20" style={{ boxShadow: '0 20px 60px rgba(236,72,153,0.3)' }}>
          <img src={after} alt="After" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-black/20" />
          <div className="absolute top-3 right-3 px-4 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg">
            <span className="text-white text-[9px] tracking-widest uppercase font-bold">Po</span>
          </div>
        </div>

        {/* Text */}
        <div className="absolute bottom-6 left-6 z-30">
          <h2 className="text-3xl font-black text-white leading-none">{headline || 'METAMORFOZA'}</h2>
          {salonName && <p className="text-pink-400/60 text-xs mt-2 tracking-wider">{salonName}</p>}
        </div>
      </div>
    );
  }

  // META-STORY - Vertical story format
  if (variant === 'meta-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a14 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-48 bg-pink-500/10 blur-[80px]" />

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 text-center z-10">
          {salonName && <p className="text-pink-400/50 text-[10px] tracking-[0.4em] uppercase">{salonName}</p>}
          <h2 className="text-3xl font-bold text-white mt-1">{headline || 'METAMORFOZA'}</h2>
        </div>

        {/* Images stacked */}
        <div className="absolute top-28 left-5 right-5 bottom-20 flex flex-col gap-3">
          <div className="flex-1 rounded-2xl overflow-hidden ring-1 ring-white/10">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden ring-2 ring-pink-500/50" style={{ boxShadow: '0 0 40px rgba(236,72,153,0.3)' }}>
            <img src={after} alt="After" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-32 left-8 px-4 py-1.5 bg-black/60 backdrop-blur rounded-full">
          <span className="text-white/80 text-[10px] tracking-widest uppercase">Przed</span>
        </div>
        <div className="absolute bottom-[52%] left-8 px-4 py-1.5 bg-pink-500 rounded-full shadow-lg">
          <span className="text-white text-[10px] tracking-widest uppercase font-bold">Po</span>
        </div>

        {/* Swipe up */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
          <svg className="w-5 h-5 text-white/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="text-white/40 text-[10px] mt-1">Swipe up</span>
        </div>
      </div>
    );
  }

  // META-WIDE - Wide banner format
  if (variant === 'meta-wide') {
    return (
      <div className={cn('relative w-full aspect-video overflow-hidden', className)} style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, #1a0a14 50%, #0a0a0a 100%)' }}>
        {/* Images */}
        <div className="absolute inset-4 flex gap-4">
          <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-white/10">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </div>
          <div className="flex-1 rounded-xl overflow-hidden ring-2 ring-pink-500/50" style={{ boxShadow: '0 0 50px rgba(236,72,153,0.3)' }}>
            <img src={after} alt="After" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Center text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8 py-4 bg-black/70 backdrop-blur-sm rounded-xl border border-pink-500/20">
            <h2 className="text-2xl font-bold text-white">{headline || 'METAMORFOZA'}</h2>
            {subheadline && <p className="text-pink-400/80 text-sm mt-1">{subheadline}</p>}
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-6 left-8 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full">
          <span className="text-white/80 text-xs tracking-widest uppercase">Przed</span>
        </div>
        <div className="absolute bottom-6 right-8 px-4 py-1.5 bg-pink-500 rounded-full shadow-lg">
          <span className="text-white text-xs tracking-widest uppercase font-bold">Po</span>
        </div>

        {/* Salon */}
        {salonName && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">{salonName}</p>
          </div>
        )}
      </div>
    );
  }

  // Default fallback
  return (
    <div className={cn('relative w-full aspect-square bg-zinc-900 flex items-center justify-center', className)}>
      <p className="text-zinc-500">Wybierz szablon</p>
    </div>
  );
}