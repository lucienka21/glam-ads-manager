import { cn } from '@/lib/utils';

interface BookingTemplateProps {
  variant: string;
  image: string | null;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  urgencyText?: string;
  salonName?: string;
  phone?: string;
  className?: string;
}

export function BookingTemplate({
  variant,
  image,
  headline,
  subheadline,
  ctaText,
  urgencyText,
  salonName,
  phone,
  className,
}: BookingTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop&auto=format';
  const img = image || placeholderImage;

  // BOOK-NOW
  if (variant === 'book-now') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0a14 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Image */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[60%] aspect-square rounded-full overflow-hidden ring-4 ring-pink-500/50 shadow-[0_0_60px_rgba(236,72,153,0.3)]">
          <img src={img} alt="Book now" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Zarezerwuj Wizytę'}</h2>
          {subheadline && <p className="text-pink-300/80 text-sm mb-4">{subheadline}</p>}

          {/* CTA Button */}
          <div className="mb-4">
            <span className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-lg shadow-pink-500/40">
              {ctaText || 'REZERWUJ TERAZ'}
            </span>
          </div>

          {phone && (
            <p className="text-zinc-400 text-sm">📞 {phone}</p>
          )}

          {salonName && (
            <p className="text-zinc-600 text-xs mt-2 tracking-wider">{salonName}</p>
          )}
        </div>

        {/* Decorative */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pink-500/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-500/30" />
      </div>
    );
  }

  // BOOK-LIMITED
  if (variant === 'book-limited') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#0a0a0a' }}>
        {/* Urgency gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/20" />

        {/* Image */}
        <div className="absolute inset-6 rounded-2xl overflow-hidden">
          <img src={img} alt="Limited" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Urgency badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="px-5 py-2 bg-red-500 rounded-full shadow-lg shadow-red-500/40 animate-pulse">
            <span className="text-white text-xs font-bold tracking-wider">🔥 {urgencyText || 'OSTATNIE MIEJSCA!'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-10 left-6 right-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{headline || 'Nie czekaj!'}</h2>
          {subheadline && <p className="text-zinc-400 text-sm mb-4">{subheadline}</p>}

          {/* Spots indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold', i < 2 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400')}>
                {i < 2 ? '✗' : '✓'}
              </div>
            ))}
          </div>

          <span className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold shadow-lg shadow-red-500/30">
            {ctaText || 'ZAREZERWUJ'}
          </span>
        </div>
      </div>
    );
  }

  // BOOK-STORY
  if (variant === 'book-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #1a0a14 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Image */}
        <div className="absolute top-16 left-6 right-6 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-pink-500/30">
          <img src={img} alt="Book" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Urgency badge */}
        {urgencyText && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="px-4 py-1.5 bg-red-500 rounded-full shadow-lg">
              <span className="text-white text-xs font-bold">🔥 {urgencyText}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Zarezerwuj Teraz'}</h2>
          {subheadline && <p className="text-pink-300/80 mb-6">{subheadline}</p>}

          <span className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold text-lg shadow-lg shadow-pink-500/40">
            {ctaText || 'REZERWUJ'}
          </span>

          {phone && (
            <p className="text-zinc-400 text-sm mt-4">📞 {phone}</p>
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
