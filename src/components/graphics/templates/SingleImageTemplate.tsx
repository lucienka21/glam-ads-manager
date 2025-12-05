import { cn } from '@/lib/utils';

interface SingleImageTemplateProps {
  variant: 'single-hero' | 'single-portfolio' | 'single-feature';
  image: string | null;
  headline?: string;
  subheadline?: string;
  className?: string;
}

export function SingleImageTemplate({
  variant,
  image,
  headline,
  subheadline,
  className,
}: SingleImageTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;

  if (variant === 'single-hero') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          <h2 className="text-4xl font-bold text-white leading-tight">
            {headline || 'Twoja Metamorfoza'}
          </h2>
          {subheadline && (
            <p className="text-pink-300 mt-2 text-lg">{subheadline}</p>
          )}
          
          {/* Accent line */}
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mt-4 rounded-full" />
        </div>

        {/* Top accent */}
        <div className="absolute top-6 right-6 w-20 h-20 border-2 border-white/20 rounded-full" />
        <div className="absolute top-8 right-8 w-16 h-16 border border-pink-500/50 rounded-full" />
      </div>
    );
  }

  if (variant === 'single-portfolio') {
    return (
      <div className={cn('relative w-full aspect-square bg-zinc-900 overflow-hidden p-4', className)}>
        {/* Main image */}
        <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
          <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-pink-400 text-xs tracking-widest uppercase mb-2">Portfolio</p>
                <h2 className="text-2xl font-bold text-white">
                  {headline || 'Stylizacja Wieczorowa'}
                </h2>
                {subheadline && (
                  <p className="text-zinc-400 text-sm mt-1">{subheadline}</p>
                )}
              </div>
              
              {/* Logo placeholder */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <span className="text-white text-lg font-bold">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frame accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      </div>
    );
  }

  // single-feature
  return (
    <div className={cn('relative w-full aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden', className)}>
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-500/10 rounded-full blur-3xl" />

      {/* Image with frame */}
      <div className="absolute inset-8 rounded-3xl overflow-hidden ring-2 ring-pink-500/30 shadow-2xl shadow-pink-500/20">
        <img src={img} alt="Feature" className="w-full h-full object-cover" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            {headline || 'Makijaż Ślubny'}
          </h2>
          {subheadline && (
            <p className="text-pink-300 text-sm mt-1">{subheadline}</p>
          )}
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
