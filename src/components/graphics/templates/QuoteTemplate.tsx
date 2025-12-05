import { cn } from '@/lib/utils';

interface QuoteTemplateProps {
  variant: 'quote-elegant' | 'quote-bold' | 'quote-minimal';
  image: string | null;
  quoteText?: string;
  authorName?: string;
  className?: string;
}

export function QuoteTemplate({
  variant,
  image,
  quoteText,
  authorName,
  className,
}: QuoteTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;

  if (variant === 'quote-elegant') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
          {/* Decorative quote marks */}
          <div className="absolute top-10 left-10 text-8xl text-pink-500/30 font-serif leading-none">"</div>
          <div className="absolute bottom-10 right-10 text-8xl text-pink-500/30 font-serif leading-none rotate-180">"</div>

          {/* Quote */}
          <p className="text-white text-2xl leading-relaxed font-light max-w-sm">
            {quoteText || 'Piękno zaczyna się w momencie, gdy decydujesz się być sobą.'}
          </p>

          {authorName && (
            <>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent mt-6" />
              <p className="text-pink-300 text-sm tracking-widest uppercase mt-4">{authorName}</p>
            </>
          )}
        </div>

        {/* Frame */}
        <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none" />
      </div>
    );
  }

  if (variant === 'quote-bold') {
    return (
      <div className={cn('relative w-full aspect-square bg-zinc-950 overflow-hidden', className)}>
        {/* Gradient accent */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-pink-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-rose-600/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Quote */}
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-200 to-white leading-tight">
            {quoteText || 'TWOJA METAMORFOZA ZACZYNA SIĘ TUTAJ'}
          </p>

          {authorName && (
            <div className="mt-8">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium text-sm">
                {authorName}
              </span>
            </div>
          )}
        </div>

        {/* Decorative lines */}
        <div className="absolute top-6 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      </div>
    );
  }

  // quote-minimal
  return (
    <div className={cn('relative w-full aspect-square bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden', className)}>
      {/* Content */}
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        {/* Large quote mark */}
        <div className="text-8xl text-pink-300/50 font-serif leading-none">"</div>

        {/* Quote */}
        <p className="text-zinc-700 text-xl leading-relaxed font-serif mt-2 max-w-sm">
          {quoteText || 'Każdy dzień jest okazją do bycia piękną.'}
        </p>

        {authorName && (
          <>
            <div className="w-8 h-[2px] bg-pink-400 mt-6" />
            <p className="text-pink-500 text-sm font-medium tracking-wider uppercase mt-4">{authorName}</p>
          </>
        )}
      </div>
    </div>
  );
}
