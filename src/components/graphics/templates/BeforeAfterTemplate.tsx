import { cn } from '@/lib/utils';

interface BeforeAfterTemplateProps {
  beforeImage: string | null;
  afterImage: string | null;
  headline?: string;
  subheadline?: string;
  variant: 'elegant-split' | 'diagonal-glam' | 'neon-frame' | 'minimal-luxury' | 'bold-contrast' | 'soft-glow' | 'vertical-stack' | 'circle-reveal' | 'sliding-compare';
  className?: string;
}

export function BeforeAfterTemplate({
  beforeImage,
  afterImage,
  headline,
  subheadline,
  variant,
  className,
}: BeforeAfterTemplateProps) {
  const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop&auto=format';
  const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop&auto=format';

  const before = beforeImage || placeholderBefore;
  const after = afterImage || placeholderAfter;

  if (variant === 'elegant-split') {
    return (
      <div className={cn('relative w-full aspect-square bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden', className)}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)]" />
        </div>
        
        <div className="absolute inset-4 flex gap-3">
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium tracking-wider">
                PRZED
              </span>
            </div>
          </div>
          
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-pink-500/50">
            <img src={after} alt="After" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white text-sm font-medium tracking-wider shadow-lg shadow-pink-500/30">
                PO
              </span>
            </div>
          </div>
        </div>

        {(headline || subheadline) && (
          <div className="absolute top-0 left-0 right-0 p-6 text-center">
            {headline && (
              <h2 className="text-2xl font-bold text-white tracking-wide">{headline}</h2>
            )}
            {subheadline && (
              <p className="text-pink-300 text-sm mt-1">{subheadline}</p>
            )}
          </div>
        )}

        <div className="absolute top-4 right-4 w-20 h-20 border border-pink-500/30 rounded-full" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border border-pink-500/20 rounded-full" />
      </div>
    );
  }

  if (variant === 'diagonal-glam') {
    return (
      <div className={cn('relative w-full aspect-square bg-black overflow-hidden', className)}>
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}>
          <img src={before} alt="Before" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
        </div>
        
        <div className="absolute inset-0" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}>
          <img src={after} alt="After" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[2px] h-[150%] bg-gradient-to-b from-transparent via-pink-500 to-transparent rotate-[12deg] shadow-[0_0_30px_rgba(236,72,153,0.8)]" />
        </div>

        <div className="absolute top-8 left-8">
          <span className="text-white/80 text-lg font-light tracking-[0.3em]">PRZED</span>
        </div>
        <div className="absolute bottom-8 right-8">
          <span className="text-pink-400 text-lg font-light tracking-[0.3em]">PO</span>
        </div>

        {headline && (
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
              {headline}
            </h2>
            {subheadline && (
              <p className="text-pink-300/80 text-sm mt-2 tracking-wider">{subheadline}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'neon-frame') {
    return (
      <div className={cn('relative w-full aspect-square bg-zinc-950 overflow-hidden p-6', className)}>
        <div className="absolute inset-3 rounded-3xl border-2 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4),inset_0_0_30px_rgba(236,72,153,0.1)]" />
        
        <div className="relative h-full flex flex-col gap-4 p-4">
          <div className="text-center py-2">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              {headline || 'METAMORFOZA'}
            </h2>
            {subheadline && (
              <p className="text-zinc-400 text-xs tracking-widest mt-1">{subheadline}</p>
            )}
          </div>

          <div className="flex-1 flex gap-4">
            <div className="flex-1 relative rounded-2xl overflow-hidden">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <span className="text-white/70 text-xs tracking-[0.2em]">PRZED</span>
              </div>
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden ring-2 ring-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <img src={after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-pink-950/80 to-transparent">
                <span className="text-pink-300 text-xs tracking-[0.2em]">PO</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-pink-500" />
        <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-pink-500" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-pink-500" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (variant === 'minimal-luxury') {
    return (
      <div className={cn('relative w-full aspect-square bg-[#f5f0eb] overflow-hidden', className)}>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#d4a574_1px,transparent_1px)] bg-[length:20px_20px]" />
        
        <div className="relative h-full flex flex-col p-8">
          <div className="text-center mb-6">
            <p className="text-[#8b7355] text-xs tracking-[0.4em] uppercase">{subheadline || 'Beauty Transformation'}</p>
            <h2 className="text-3xl font-serif text-[#3d3027] mt-2">{headline || 'Metamorfoza'}</h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mx-auto mt-3" />
          </div>

          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[#8b7355] text-sm tracking-[0.2em] mt-3">PRZED</p>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden shadow-xl ring-1 ring-[#d4a574]/30">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[#d4a574] text-sm tracking-[0.2em] mt-3 font-medium">PO</p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-[#d4a574]/40" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r border-t border-[#d4a574]/40" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-[#d4a574]/40" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-[#d4a574]/40" />
      </div>
    );
  }

  if (variant === 'bold-contrast') {
    return (
      <div className={cn('relative w-full aspect-square bg-black overflow-hidden', className)}>
        <div className="absolute inset-0 flex">
          <div className="absolute left-4 top-4 bottom-4 w-[55%] rounded-2xl overflow-hidden">
            <img src={before} alt="Before" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <div className="absolute right-4 top-8 bottom-8 w-[55%] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-pink-500">
            <img src={after} alt="After" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="absolute top-6 left-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white text-sm font-medium tracking-wider">PRZED</span>
        </div>
        <div className="absolute bottom-6 right-8 bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 rounded-full shadow-lg shadow-pink-500/40">
          <span className="text-white text-sm font-bold tracking-wider">PO</span>
        </div>

        {headline && (
          <div className="absolute bottom-6 left-8 max-w-[40%]">
            <h2 className="text-white text-2xl font-bold leading-tight">{headline}</h2>
            {subheadline && (
              <p className="text-pink-300 text-sm mt-1">{subheadline}</p>
            )}
          </div>
        )}

        <div className="absolute top-0 left-1/2 w-[1px] h-16 bg-gradient-to-b from-pink-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 w-[1px] h-16 bg-gradient-to-t from-pink-500 to-transparent" />
      </div>
    );
  }

  if (variant === 'vertical-stack') {
    return (
      <div className={cn('relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden p-4', className)}>
        <div className="h-full flex flex-col gap-3">
          {/* Header */}
          {(headline || subheadline) && (
            <div className="text-center py-2">
              {headline && <h2 className="text-xl font-bold text-white">{headline}</h2>}
              {subheadline && <p className="text-pink-400 text-sm">{subheadline}</p>}
            </div>
          )}

          {/* Before */}
          <div className="flex-1 relative rounded-xl overflow-hidden">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 px-3 py-1 bg-zinc-900/80 backdrop-blur-sm rounded-full">
              <span className="text-white text-xs tracking-wider">PRZED</span>
            </div>
          </div>

          {/* After */}
          <div className="flex-1 relative rounded-xl overflow-hidden ring-2 ring-pink-500/50">
            <img src={after} alt="After" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
              <span className="text-white text-xs tracking-wider font-medium">PO</span>
            </div>
          </div>
        </div>

        {/* Accent */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30 z-10">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'circle-reveal') {
    return (
      <div className={cn('relative w-full aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden', className)}>
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6 p-6">
          {/* Header */}
          {(headline || subheadline) && (
            <div className="text-center">
              {headline && <h2 className="text-2xl font-bold text-white">{headline}</h2>}
              {subheadline && <p className="text-pink-400 text-sm mt-1">{subheadline}</p>}
            </div>
          )}

          {/* Circles */}
          <div className="flex items-center gap-6">
            {/* Before */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-zinc-700 shadow-xl">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-800 rounded-full">
                <span className="text-zinc-300 text-xs tracking-wider">PRZED</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* After */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-pink-500 shadow-xl shadow-pink-500/20">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                <span className="text-white text-xs tracking-wider font-medium">PO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sliding-compare') {
    return (
      <div className={cn('relative w-full aspect-video bg-zinc-900 overflow-hidden', className)}>
        {/* Full width images */}
        <div className="absolute inset-0 flex">
          {/* Before - left half */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <img src={before} alt="Before" className="absolute inset-0 w-[200%] h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg">
              <span className="text-white text-sm tracking-wider">PRZED</span>
            </div>
          </div>

          {/* After - right half */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <img src={after} alt="After" className="absolute inset-0 w-[200%] h-full object-cover object-right" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
            <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg shadow-lg shadow-pink-500/30">
              <span className="text-white text-sm tracking-wider font-medium">PO</span>
            </div>
          </div>
        </div>

        {/* Center divider */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-pink-500 via-white to-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
          <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>

        {/* Header */}
        {(headline || subheadline) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
            {headline && <h2 className="text-xl font-bold text-white">{headline}</h2>}
            {subheadline && <p className="text-pink-300 text-sm">{subheadline}</p>}
          </div>
        )}
      </div>
    );
  }

  // soft-glow variant (default)
  return (
    <div className={cn('relative w-full aspect-square bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden', className)}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl" />
      
      <div className="relative h-full flex flex-col p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{headline || 'Efekt Wow'}</h2>
          {subheadline && (
            <p className="text-pink-500 text-sm mt-1">{subheadline}</p>
          )}
        </div>

        <div className="flex-1 flex gap-4 items-center">
          <div className="flex-1 h-full flex flex-col">
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-3">
              <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-gray-600 text-sm">Przed</span>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-8 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 h-full flex flex-col">
            <div className="flex-1 rounded-2xl overflow-hidden shadow-xl shadow-pink-200/50 ring-2 ring-pink-200">
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-3">
              <span className="inline-block px-4 py-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full text-white text-sm font-medium">Po</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
