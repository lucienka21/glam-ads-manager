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

  // META-GLAMOUR - Elegancki split z neonem
  if (variant === 'meta-glamour') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)' }}>
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-500/10 rounded-full blur-[100px]" />
        
        {/* Images */}
        <div className="absolute inset-5 flex gap-2">
          <div className="relative flex-1 rounded-2xl overflow-hidden">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold tracking-[0.2em] uppercase">
                Przed
              </span>
            </div>
          </div>
          
          <div className="relative flex-1 rounded-2xl overflow-hidden ring-2 ring-pink-500/60 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
            <img src={after} alt="After" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-pink-500/40">
                Po
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-3 left-0 right-0 text-center">
          <h2 className="text-xl font-bold text-white tracking-wide">{headline || 'METAMORFOZA'}</h2>
          {salonName && <p className="text-pink-400/80 text-[10px] tracking-[0.3em] uppercase mt-0.5">{salonName}</p>}
        </div>

        {/* Decorative */}
        <div className="absolute top-4 right-4 w-16 h-16 border border-pink-500/20 rounded-full" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border border-pink-500/20 rounded-full" />
      </div>
    );
  }

  // META-NEON - Świecące ramki
  if (variant === 'meta-neon') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden p-4', className)} style={{ background: '#050505' }}>
        {/* Neon border */}
        <div className="absolute inset-2 rounded-2xl" style={{ 
          border: '2px solid #ec4899',
          boxShadow: '0 0 20px rgba(236,72,153,0.4), inset 0 0 20px rgba(236,72,153,0.1), 0 0 60px rgba(236,72,153,0.2)'
        }} />
        
        <div className="relative h-full flex flex-col p-3">
          {/* Header */}
          <div className="text-center mb-3">
            <h2 className="text-2xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
              {headline || 'EFEKT WOW'}
            </h2>
            {subheadline && <p className="text-zinc-500 text-xs mt-1">{subheadline}</p>}
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-3">
            <div className="flex-1 rounded-xl overflow-hidden bg-zinc-900">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden ring-2 ring-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-3 px-4">
            <span className="text-zinc-500 text-xs tracking-[0.2em]">PRZED</span>
            <span className="text-pink-400 text-xs tracking-[0.2em] font-medium">PO</span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-500" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-500" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-500" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-500" />
      </div>
    );
  }

  // META-LUXURY - Złote akcenty
  if (variant === 'meta-luxury') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)' }}>
        {/* Gold accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-amber-500/10 blur-[80px]" />

        {/* Decorative line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <p className="text-amber-400/60 text-[10px] tracking-[0.4em] uppercase">Premium Beauty</p>
            <h2 className="text-2xl font-light text-white mt-1 tracking-wide">{headline || 'Metamorfoza'}</h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-4">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden ring-1 ring-amber-400/20">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-amber-400/50 text-[10px] tracking-[0.3em] mt-2">PRZED</p>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden ring-1 ring-amber-400/40 shadow-[0_0_30px_rgba(217,119,6,0.2)]">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-amber-400 text-[10px] tracking-[0.3em] mt-2 font-medium">PO</p>
            </div>
          </div>

          {/* Footer */}
          {salonName && (
            <div className="text-center mt-4">
              <p className="text-amber-400/40 text-[9px] tracking-[0.4em] uppercase">{salonName}</p>
            </div>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-10 h-10 border-l border-t border-amber-400/30" />
        <div className="absolute top-3 right-3 w-10 h-10 border-r border-t border-amber-400/30" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-l border-b border-amber-400/30" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-r border-b border-amber-400/30" />
      </div>
    );
  }

  // META-DIAGONAL - Ukośne cięcie
  if (variant === 'meta-diagonal') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#000' }}>
        {/* Before - lewy trójkąt */}
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 58% 0, 42% 100%, 0 100%)' }}>
          <img src={before} alt="Before" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        
        {/* After - prawy trójkąt */}
        <div className="absolute inset-0" style={{ clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)' }}>
          <img src={after} alt="After" className="w-full h-full object-cover" />
        </div>

        {/* Diagonal divider */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1 h-[150%] bg-gradient-to-b from-pink-500/0 via-pink-500 to-pink-500/0 rotate-[10deg]" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.8), 0 0 60px rgba(236,72,153,0.4)' }} />
        </div>

        {/* Labels */}
        <div className="absolute top-6 left-6">
          <span className="text-white/70 text-sm font-light tracking-[0.3em]">PRZED</span>
        </div>
        <div className="absolute bottom-6 right-6">
          <span className="text-pink-400 text-sm font-medium tracking-[0.3em]">PO</span>
        </div>

        {/* Center text */}
        <div className="absolute bottom-6 left-6 max-w-[45%]">
          <h2 className="text-2xl font-bold text-white leading-tight" style={{ textShadow: '0 0 40px rgba(236,72,153,0.5)' }}>
            {headline || 'Metamorfoza'}
          </h2>
          {subheadline && <p className="text-pink-300/80 text-xs mt-1">{subheadline}</p>}
        </div>
      </div>
    );
  }

  // META-CIRCLE - Okrągłe ramki
  if (variant === 'meta-circle') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #0f0f1a 100%)' }}>
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 text-center">
          <h2 className="text-xl font-bold text-white">{headline || 'EFEKT ZABIEGU'}</h2>
          {subheadline && <p className="text-pink-400/60 text-xs mt-1">{subheadline}</p>}
        </div>

        {/* Circles */}
        <div className="absolute inset-0 flex items-center justify-center gap-6 pt-8">
          {/* Before circle */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-zinc-700/50">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-800 rounded-full border border-zinc-700">
              <span className="text-zinc-400 text-[10px] tracking-widest">PRZED</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/40">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* After circle */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-pink-500/50 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
              <span className="text-white text-[10px] tracking-widest font-medium">PO</span>
            </div>
          </div>
        </div>

        {/* Salon name */}
        {salonName && (
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">{salonName}</p>
          </div>
        )}
      </div>
    );
  }

  // META-MINIMAL - Minimalistyczny
  if (variant === 'meta-minimal') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#faf9f7' }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #d4a574 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative h-full flex flex-col p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-[#8b7355] text-[10px] tracking-[0.4em] uppercase">{salonName || 'Beauty Studio'}</p>
            <h2 className="text-3xl font-serif text-[#3d3027] mt-2">{headline || 'Metamorfoza'}</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mx-auto mt-3" />
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[#8b7355] text-xs tracking-[0.2em] mt-3">PRZED</p>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden shadow-xl ring-1 ring-[#d4a574]/30">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-[#d4a574] text-xs tracking-[0.2em] mt-3 font-medium">PO</p>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-[#d4a574]/30" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r border-t border-[#d4a574]/30" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-[#d4a574]/30" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-[#d4a574]/30" />
      </div>
    );
  }

  // META-DARK - Ciemna premium
  if (variant === 'meta-dark') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-transparent to-purple-900/20" />

        <div className="relative h-full p-5">
          {/* Images stacked */}
          <div className="h-full flex gap-3">
            {/* Before */}
            <div className="flex-1 relative rounded-xl overflow-hidden">
              <img src={before} alt="Before" className="w-full h-full object-cover brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                <span className="text-white/70 text-[10px] tracking-wider">PRZED</span>
              </div>
            </div>

            {/* After */}
            <div className="flex-1 relative rounded-xl overflow-hidden ring-1 ring-pink-500/40">
              <img src={after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-pink-500/80 backdrop-blur-sm rounded-full">
                <span className="text-white text-[10px] tracking-wider font-medium">PO</span>
              </div>
            </div>
          </div>

          {/* Text overlay */}
          <div className="absolute bottom-5 left-5 right-5">
            <h2 className="text-2xl font-bold text-white">{headline || 'Transformacja'}</h2>
            {subheadline && <p className="text-pink-400/80 text-sm mt-1">{subheadline}</p>}
          </div>
        </div>
      </div>
    );
  }

  // META-GOLD - Rose gold
  if (variant === 'meta-gold') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #2d2a26 0%, #1a1816 100%)' }}>
        {/* Rose gold accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-rose-400/10 rounded-full border border-rose-400/20 mb-3">
              <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase">✦ Premium ✦</span>
            </div>
            <h2 className="text-2xl font-light text-white tracking-wide">{headline || 'Metamorfoza'}</h2>
          </div>

          {/* Images */}
          <div className="flex-1 flex gap-4">
            <div className="flex-1 rounded-xl overflow-hidden ring-1 ring-rose-400/20">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden ring-2 ring-rose-400/40 shadow-[0_0_30px_rgba(251,113,133,0.2)]">
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-4 px-2">
            <span className="text-rose-400/50 text-xs tracking-[0.2em]">PRZED</span>
            <span className="text-rose-400 text-xs tracking-[0.2em] font-medium">PO</span>
          </div>
        </div>
      </div>
    );
  }

  // META-PASTEL - Pastelowe
  if (variant === 'meta-pastel') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
        {/* Soft blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-300/30 rounded-full blur-3xl" />

        <div className="relative h-full flex flex-col p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{headline || 'Efekt Wow'}</h2>
            {subheadline && <p className="text-pink-500 text-sm mt-1">{subheadline}</p>}
          </div>

          {/* Images */}
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 h-full flex flex-col">
              <div className="flex-1 rounded-2xl overflow-hidden shadow-lg shadow-pink-200/50">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-3">
                <span className="inline-block px-4 py-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 text-xs shadow-sm">Przed</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-300/50">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            <div className="flex-1 h-full flex flex-col">
              <div className="flex-1 rounded-2xl overflow-hidden shadow-xl shadow-pink-300/50 ring-2 ring-pink-300/50">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-3">
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full text-white text-xs font-medium shadow-lg shadow-pink-300/50">Po</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // META-BOLD - Mocny kontrast
  if (variant === 'meta-bold') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#000' }}>
        {/* Before - tło */}
        <div className="absolute left-3 top-3 bottom-3 w-[58%] rounded-2xl overflow-hidden">
          <img src={before} alt="Before" className="w-full h-full object-cover grayscale contrast-110" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* After - na wierzchu */}
        <div className="absolute right-3 top-6 bottom-6 w-[58%] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-pink-500">
          <img src={after} alt="After" className="w-full h-full object-cover" />
        </div>

        {/* Labels */}
        <div className="absolute top-5 left-6">
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs tracking-wider">PRZED</span>
        </div>
        <div className="absolute bottom-5 right-6">
          <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white text-xs font-bold tracking-wider shadow-lg shadow-pink-500/50">PO</span>
        </div>

        {/* Text */}
        {headline && (
          <div className="absolute bottom-5 left-6 max-w-[40%]">
            <h2 className="text-xl font-bold text-white leading-tight">{headline}</h2>
          </div>
        )}

        {/* Accent lines */}
        <div className="absolute top-0 left-1/2 w-px h-12 bg-gradient-to-b from-pink-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 w-px h-12 bg-gradient-to-t from-pink-500 to-transparent" />
      </div>
    );
  }

  // META-STORY - Format 9:16
  if (variant === 'meta-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #1a0a14 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 text-center z-10">
          <p className="text-pink-400/60 text-xs tracking-[0.3em] uppercase mb-2">{salonName || 'Beauty Studio'}</p>
          <h2 className="text-3xl font-bold text-white">{headline || 'METAMORFOZA'}</h2>
        </div>

        {/* Images */}
        <div className="absolute top-28 bottom-24 left-4 right-4 flex flex-col gap-3">
          {/* Before */}
          <div className="flex-1 relative rounded-2xl overflow-hidden">
            <img src={before} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white text-xs tracking-wider">PRZED</span>
            </div>
          </div>

          {/* After */}
          <div className="flex-1 relative rounded-2xl overflow-hidden ring-2 ring-pink-500/50 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
            <img src={after} alt="After" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
              <span className="text-white text-xs tracking-wider font-medium">PO</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
          <svg className="w-6 h-6 text-white/40 animate-bounce mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="text-white/40 text-xs tracking-wider">SWIPE UP</span>
        </div>
      </div>
    );
  }

  // META-WIDE - Format 16:9
  if (variant === 'meta-wide') {
    return (
      <div className={cn('relative w-full aspect-video overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Full width split */}
        <div className="absolute inset-0 flex">
          {/* Before half */}
          <div className="w-1/2 relative overflow-hidden">
            <img src={before} alt="Before" className="absolute inset-0 w-[200%] h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg">
              <span className="text-white text-sm tracking-wider">PRZED</span>
            </div>
          </div>

          {/* After half */}
          <div className="w-1/2 relative overflow-hidden">
            <img src={after} alt="After" className="absolute inset-0 w-[200%] h-full object-cover object-right" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
            <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg shadow-lg">
              <span className="text-white text-sm tracking-wider font-medium">PO</span>
            </div>
          </div>
        </div>

        {/* Center divider */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-pink-500/0 via-pink-500 to-pink-500/0 shadow-[0_0_20px_rgba(236,72,153,0.6)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
          <span className="text-pink-500 font-bold text-sm">VS</span>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
          <h2 className="text-xl font-bold text-white">{headline || 'Metamorfoza'}</h2>
          {subheadline && <p className="text-pink-300 text-sm">{subheadline}</p>}
        </div>
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
