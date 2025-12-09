import { Snowflake, Star, Gift, Sparkles } from 'lucide-react';

interface HolidaySpecialProps {
  data: Record<string, string>;
}

export function HolidaySpecial({ data }: HolidaySpecialProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(160deg, #0a0810 0%, #150a14 50%, #0d0508 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Festive gold/pink gradient overlays */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(45 90% 55%), transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      
      {/* Snowflakes */}
      {[...Array(15)].map((_, i) => (
        <Snowflake
          key={i}
          className="absolute opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${12 + Math.random() * 8}px`,
            height: `${12 + Math.random() * 8}px`,
            color: i % 2 === 0 ? 'hsl(45 90% 55%)' : 'hsl(330 100% 65%)',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      
      {/* Image with circular frame */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2">
        <div 
          className="relative w-56 h-56 rounded-full p-1"
          style={{ 
            background: 'linear-gradient(135deg, hsl(45 90% 55%), hsl(330 100% 60%), hsl(45 90% 55%))',
            boxShadow: '0 0 40px hsl(330 100% 60% / 0.3), 0 0 60px hsl(45 90% 55% / 0.2)'
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src={data.image || placeholderImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Decorative stars around frame */}
        <Star 
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6"
          style={{ color: 'hsl(45 90% 55%)', fill: 'hsl(45 90% 55%)', filter: 'drop-shadow(0 0 6px hsl(45 90% 55%))' }}
        />
        <Gift 
          className="absolute top-1/2 -left-4 -translate-y-1/2 w-5 h-5 opacity-70"
          style={{ color: 'hsl(330 100% 65%)' }}
        />
        <Sparkles 
          className="absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 opacity-70"
          style={{ color: 'hsl(330 100% 65%)' }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
        {/* Salon name */}
        <p 
          className="text-xs tracking-[0.4em] uppercase font-medium mb-4"
          style={{ color: 'hsl(45 90% 55%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        {/* Headline */}
        <h1 
          className="text-4xl font-bold mb-3"
          style={{ 
            background: 'linear-gradient(135deg, #fff, hsl(45 90% 75%), hsl(330 100% 75%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 30px rgba(0,0,0,0.3)'
          }}
        >
          {data.headline || 'Świąteczna Magia'}
        </h1>
        
        {/* Subheadline */}
        <p className="text-white/70 mb-6">
          {data.subheadline || 'Przygotuj się na święta!'}
        </p>
        
        {/* Discount badge */}
        <div 
          className="inline-block px-8 py-3 rounded-full mb-6"
          style={{ 
            background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
            boxShadow: '0 4px 30px hsl(330 100% 60% / 0.5)'
          }}
        >
          <span className="text-2xl font-bold text-white">
            {data.discount || '-25%'}
          </span>
        </div>
        
        {/* CTA */}
        <div>
          <button
            className="px-8 py-3 rounded-full text-sm font-semibold tracking-wide"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {data.cta || 'Zarezerwuj'}
          </button>
        </div>
      </div>
      
      {/* Corner ornaments */}
      <div className="absolute top-4 left-4">
        <div 
          className="w-16 h-16"
          style={{
            borderTop: '2px solid hsl(45 90% 55% / 0.4)',
            borderLeft: '2px solid hsl(45 90% 55% / 0.4)',
            borderTopLeftRadius: '8px'
          }}
        />
      </div>
      <div className="absolute top-4 right-4">
        <div 
          className="w-16 h-16"
          style={{
            borderTop: '2px solid hsl(45 90% 55% / 0.4)',
            borderRight: '2px solid hsl(45 90% 55% / 0.4)',
            borderTopRightRadius: '8px'
          }}
        />
      </div>
    </div>
  );
}
