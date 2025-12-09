import { Quote } from 'lucide-react';

interface QuoteInspirationProps {
  data: Record<string, string>;
}

export function QuoteInspiration({ data }: QuoteInspirationProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background image with artistic blur */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) blur(2px) saturate(0.8)' }}
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>
      
      {/* Pink accent glows */}
      <div 
        className="absolute top-20 left-20 w-40 h-40 opacity-25 blur-3xl"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      <div 
        className="absolute bottom-20 right-20 w-32 h-32 opacity-20 blur-3xl"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center">
        {/* Quote icon */}
        <Quote 
          className="w-12 h-12 mb-6 opacity-50"
          style={{ color: 'hsl(330 100% 65%)' }}
        />
        
        {/* Quote text */}
        <blockquote 
          className="text-2xl font-medium text-white leading-relaxed mb-8 max-w-md"
          style={{ fontStyle: 'italic' }}
        >
          "{data.quote || 'Piękno zaczyna się od chwili, gdy zdecydujesz się być sobą'}"
        </blockquote>
        
        {/* Divider */}
        <div 
          className="h-px w-16 mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 100% 60%), transparent)' }}
        />
        
        {/* Author */}
        <p 
          className="text-sm tracking-widest uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          — {data.author || 'Coco Chanel'}
        </p>
      </div>
      
      {/* Salon branding - bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40">
          {data.salon || 'Beauty Studio'}
        </p>
      </div>
      
      {/* Decorative frame */}
      <div 
        className="absolute inset-8 border rounded-lg pointer-events-none"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      />
    </div>
  );
}
