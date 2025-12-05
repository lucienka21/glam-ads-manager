import { cn } from '@/lib/utils';

interface TestimonialTemplateProps {
  variant: 'testimonial-card' | 'testimonial-photo' | 'testimonial-minimal';
  image: string | null;
  testimonialText?: string;
  authorName?: string;
  authorTitle?: string;
  rating?: number;
  className?: string;
}

export function TestimonialTemplate({
  variant,
  image,
  testimonialText,
  authorName,
  authorTitle,
  rating = 5,
  className,
}: TestimonialTemplateProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format';
  const img = image || placeholderImage;

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={cn('w-4 h-4', i < count ? 'text-yellow-400' : 'text-zinc-600')} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (variant === 'testimonial-card') {
    return (
      <div className={cn('relative w-full aspect-square bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden', className)}>
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8">
          {/* Quote mark */}
          <div className="text-6xl text-pink-500/30 font-serif leading-none">"</div>

          {/* Testimonial text */}
          <p className="text-white text-center text-lg leading-relaxed max-w-xs mt-2">
            {testimonialText || 'Niesamowita metamorfoza! Jestem zachwycona efektami.'}
          </p>

          {/* Stars */}
          <div className="flex gap-1 mt-4">
            {renderStars(rating)}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-500/50">
              <img src={img} alt={authorName} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-medium">{authorName || 'Anna Kowalska'}</p>
              <p className="text-pink-400 text-sm">{authorTitle || 'Klientka'}</p>
            </div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-pink-500/30" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-pink-500/30" />
      </div>
    );
  }

  if (variant === 'testimonial-photo') {
    return (
      <div className={cn('relative w-full aspect-square overflow-hidden', className)}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={img} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6">
          {/* Quote */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
            <div className="text-3xl text-pink-400 font-serif leading-none">"</div>
            <p className="text-white text-base leading-relaxed mt-1">
              {testimonialText || 'Najlepszy salon w mieście! Polecam każdemu.'}
            </p>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-white font-medium">{authorName || 'Marta Nowak'}</p>
                <p className="text-pink-300 text-sm">{authorTitle || 'Stała klientka'}</p>
              </div>
              <div className="flex gap-0.5">
                {renderStars(rating)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // testimonial-minimal
  return (
    <div className={cn('relative w-full aspect-square bg-[#faf8f5] overflow-hidden', className)}>
      {/* Content */}
      <div className="h-full flex flex-col items-center justify-center p-10 text-center">
        {/* Stars */}
        <div className="flex gap-1">
          {renderStars(rating)}
        </div>

        {/* Quote */}
        <p className="text-zinc-800 text-xl leading-relaxed mt-6 font-serif italic">
          "{testimonialText || 'Profesjonalizm na najwyższym poziomie.'}"
        </p>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent mt-6" />

        {/* Author */}
        <div className="mt-6">
          <p className="text-zinc-700 font-medium">{authorName || 'Katarzyna Wiśniewska'}</p>
          <p className="text-pink-500 text-sm mt-1">{authorTitle || 'Klientka od 2022'}</p>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-6 left-6 text-6xl text-pink-200/40 font-serif">"</div>
      <div className="absolute bottom-6 right-6 text-6xl text-pink-200/40 font-serif rotate-180">"</div>
    </div>
  );
}
