import { Clock, Sparkles } from 'lucide-react';

interface ServiceHighlightProps {
  data: Record<string, string>;
}

export function ServiceHighlight({ data }: ServiceHighlightProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Full background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)'
          }}
        />
      </div>
      
      {/* Pink accent glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30"
        style={{ 
          background: 'linear-gradient(to top, hsl(330 100% 60% / 0.2), transparent)'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        {/* Top - Salon name */}
        <div className="flex items-center justify-between">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          <Sparkles 
            className="w-5 h-5"
            style={{ color: 'hsl(330 100% 65%)' }}
          />
        </div>
        
        {/* Center - Visual focus (empty for image) */}
        <div />
        
        {/* Bottom - Service info */}
        <div>
          {/* Service name */}
          <h1 
            className="text-3xl font-bold text-white mb-3"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            {data.service || 'Keratynowe prostowanie'}
          </h1>
          
          {/* Description */}
          <p className="text-white/70 mb-5 leading-relaxed">
            {data.description || 'Gładkie, lśniące włosy przez 3-6 miesięcy'}
          </p>
          
          {/* Price and duration */}
          <div className="flex items-center justify-between">
            <div 
              className="px-6 py-3 rounded-xl"
              style={{ 
                background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
                boxShadow: '0 4px 20px hsl(330 100% 60% / 0.4)'
              }}
            >
              <span className="text-xl font-bold text-white">
                {data.price || 'od 399 zł'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {data.duration || '2-3h'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <div 
        className="absolute top-0 right-0 w-32 h-32"
        style={{
          background: 'linear-gradient(225deg, hsl(330 100% 60% / 0.15) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
