import { cn } from '@/lib/utils';

interface StoryTemplateProps {
  variant: 'story-promo' | 'story-testimonial' | 'story-announcement';
  image: string | null;
  headline?: string;
  subheadline?: string;
  discountText?: string;
  testimonialText?: string;
  authorName?: string;
  ctaText?: string;
  className?: string;
}

export function StoryTemplate({
  variant,
  image,
  headline,
  subheadline,
  discountText,
  testimonialText,
  authorName,
  ctaText,
  className,
}: StoryTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1400&fit=crop&auto=format';
  const img = image || placeholderImage;

  if (variant === 'story-promo') {
    return (
      <div className={cn('relative w-full aspect-[9/16] bg-gradient-to-br from-pink-600 via-rose-500 to-pink-600 overflow-hidden', className)}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }} />
        </div>

        {/* Image */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl">
          <img src={img} alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Discount badge */}
        <div className="absolute top-16 right-6 w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center shadow-xl transform rotate-12">
          <span className="text-pink-600 text-2xl font-black">{discountText || '-50%'}</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
            {headline || 'MEGA WYPRZEDAŻ'}
          </h2>
          {subheadline && (
            <p className="text-white/90 text-lg mt-3">{subheadline}</p>
          )}
          {ctaText && (
            <div className="mt-6">
              <span className="inline-block px-8 py-3 bg-white text-pink-600 rounded-full font-bold shadow-lg">
                {ctaText}
              </span>
            </div>
          )}
          
          {/* Swipe up indicator */}
          <div className="mt-8 flex flex-col items-center animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-white/60 text-xs mt-1">Swipe up</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'story-testimonial') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Testimonial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          {/* Quote card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
            <div className="text-4xl text-pink-400 font-serif leading-none">"</div>
            <p className="text-white text-xl leading-relaxed mt-2">
              {testimonialText || 'Najlepszy salon w mieście! Jestem zachwycona!'}
            </p>
            
            {/* Stars */}
            <div className="flex gap-1 mt-4">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/20">
              <div className="w-10 h-10 rounded-full bg-pink-500/50 flex items-center justify-center">
                <span className="text-white font-bold">{(authorName || 'A')[0]}</span>
              </div>
              <p className="text-white font-medium">{authorName || 'Anna K.'}</p>
            </div>
          </div>

          {/* Swipe up */}
          <div className="mt-6 flex flex-col items-center">
            <svg className="w-6 h-6 text-white/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // story-announcement
  return (
    <div className={cn('relative w-full aspect-[9/16] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden', className)}>
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-8 shadow-lg shadow-pink-500/30">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">
          {headline || 'Ważne Ogłoszenie'}
        </h2>
        
        {subheadline && (
          <p className="text-zinc-300 text-lg max-w-xs">{subheadline}</p>
        )}

        {ctaText && (
          <div className="mt-8">
            <span className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg shadow-pink-500/30">
              {ctaText}
            </span>
          </div>
        )}
      </div>

      {/* Swipe up */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <svg className="w-6 h-6 text-white/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span className="text-white/60 text-xs mt-1">Swipe up</span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-pink-500/40" />
      <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-pink-500/40" />
    </div>
  );
}
