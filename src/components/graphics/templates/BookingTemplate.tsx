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

  // BOOK-NOW - Clean booking CTA
  if (variant === 'book-now') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: 'linear-gradient(135deg, #080808 0%, #150810 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Circle image */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[60%] aspect-square rounded-full overflow-hidden ring-4 ring-pink-500/50" style={{ boxShadow: '0 0 80px rgba(236,72,153,0.3)' }}>
          <img src={img} alt="Book now" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-7 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Zarezerwuj Wizytę'}</h2>
          {subheadline && <p className="text-pink-300/70 text-sm mb-5">{subheadline}</p>}

          {/* CTA Button */}
          <div className="mb-4">
            <span className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-xl" style={{ boxShadow: '0 10px 50px rgba(236,72,153,0.4)' }}>
              {ctaText || 'REZERWUJ TERAZ'}
            </span>
          </div>

          {phone && (
            <p className="text-zinc-400 text-sm">📞 {phone}</p>
          )}

          {salonName && (
            <p className="text-zinc-600 text-[10px] mt-3 tracking-[0.4em] uppercase">{salonName}</p>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-pink-500/30" />
        <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-pink-500/30" />
      </div>
    );
  }

  // BOOK-LIMITED - Urgency-driven booking
  if (variant === 'book-limited') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)} style={{ background: '#050505' }}>
        {/* Urgency gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top right, rgba(239,68,68,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(249,115,22,0.15) 0%, transparent 50%)' }} />

        {/* Image */}
        <div className="absolute inset-6 rounded-3xl overflow-hidden">
          <img src={img} alt="Limited" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        </div>

        {/* Urgency badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <div className="px-6 py-2.5 bg-red-500 rounded-full shadow-xl animate-pulse" style={{ boxShadow: '0 0 40px rgba(239,68,68,0.5)' }}>
            <span className="text-white text-xs font-bold tracking-wider">🔥 {urgencyText || 'OSTATNIE MIEJSCA!'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-10 left-6 right-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{headline || 'Nie czekaj!'}</h2>
          {subheadline && <p className="text-zinc-400 text-sm mb-5">{subheadline}</p>}

          {/* Spots indicator */}
          <div className="flex justify-center gap-3 mb-5">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold', i < 2 ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40' : 'bg-green-500/20 text-green-400 ring-1 ring-green-500/40')}>
                {i < 2 ? '✗' : '✓'}
              </div>
            ))}
          </div>

          <span className="inline-block px-10 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold shadow-xl" style={{ boxShadow: '0 10px 40px rgba(239,68,68,0.4)' }}>
            {ctaText || 'ZAREZERWUJ'}
          </span>
        </div>
      </div>
    );
  }

  // BOOK-STORY - Story format booking
  if (variant === 'book-story') {
    return (
      <div className={cn('relative w-full aspect-[9/16] overflow-hidden', className)} style={{ background: 'linear-gradient(180deg, #080808 0%, #150810 100%)' }}>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px]" />

        {/* Image */}
        <div className="absolute top-20 left-6 right-6 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-pink-500/30">
          <img src={img} alt="Book" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Urgency badge */}
        {urgencyText && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
            <div className="px-5 py-2 bg-red-500 rounded-full shadow-xl" style={{ boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}>
              <span className="text-white text-xs font-bold">🔥 {urgencyText}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">{headline || 'Zarezerwuj Teraz'}</h2>
          {subheadline && <p className="text-pink-300/70 mb-7">{subheadline}</p>}

          <span className="inline-block px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold text-lg shadow-xl" style={{ boxShadow: '0 10px 50px rgba(236,72,153,0.4)' }}>
            {ctaText || 'REZERWUJ'}
          </span>

          {phone && (
            <p className="text-zinc-400 text-sm mt-5">📞 {phone}</p>
          )}

          {/* Swipe */}
          <div className="mt-8 flex flex-col items-center">
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