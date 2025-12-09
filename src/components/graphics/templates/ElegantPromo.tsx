import { Star } from 'lucide-react';

interface ElegantPromoProps {
  data: Record<string, string>;
}

export function ElegantPromo({ data }: ElegantPromoProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Pink glow accent */}
      <div 
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      
      {/* Main image with diagonal clip */}
      <div 
        className="absolute right-0 top-0 w-[60%] h-full"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
      >
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.9) contrast(1.1)' }}
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%)' }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        {/* Top - Salon name */}
        <div>
          <p 
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
        </div>
        
        {/* Center - Discount badge */}
        <div className="relative z-10">
          <div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
              boxShadow: '0 4px 20px hsl(330 100% 60% / 0.4)'
            }}
          >
            <span className="text-2xl font-bold text-white">
              {data.discount || '-30%'}
            </span>
          </div>
          
          <h1 
            className="text-4xl font-bold text-white mb-3 leading-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {data.headline || 'Wyjątkowa Promocja'}
          </h1>
          
          {/* Prices */}
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="text-xl line-through opacity-50"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {data.oldPrice || '299 zł'}
            </span>
            <span 
              className="text-3xl font-bold"
              style={{ color: 'hsl(330 100% 65%)' }}
            >
              {data.newPrice || '199 zł'}
            </span>
          </div>
        </div>
        
        {/* Bottom - CTA */}
        <div>
          <button
            className="px-8 py-3 rounded-full text-sm font-semibold tracking-wide uppercase"
            style={{
              background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
              color: 'white',
              boxShadow: '0 4px 20px hsl(330 100% 60% / 0.4)',
            }}
          >
            {data.cta || 'Rezerwuj'}
          </button>
        </div>
      </div>
      
      {/* Decorative stars */}
      <Star 
        className="absolute top-8 right-8 w-4 h-4 opacity-40"
        style={{ color: 'hsl(330 100% 65%)', fill: 'hsl(330 100% 65%)' }}
      />
      <Star 
        className="absolute bottom-16 right-16 w-3 h-3 opacity-30"
        style={{ color: 'hsl(330 100% 65%)', fill: 'hsl(330 100% 65%)' }}
      />
    </div>
  );
}
