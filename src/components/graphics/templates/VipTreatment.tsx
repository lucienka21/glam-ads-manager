import { Crown } from 'lucide-react';

interface VipTreatmentProps {
  data: Record<string, string>;
}

export function VipTreatment({ data }: VipTreatmentProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) saturate(0.8)' }}
        />
      </div>
      
      {/* Gold/Pink gradient overlays */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      <div 
        className="absolute top-0 left-0 w-64 h-64 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(45 100% 50%), transparent 60%)' }}
      />
      <div 
        className="absolute bottom-0 right-0 w-72 h-72 opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 55%), transparent 60%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col">
        {/* Top section */}
        <div className="flex items-start justify-between">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          
          {/* VIP badge */}
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, hsl(45 80% 45%), hsl(40 90% 40%))',
              boxShadow: '0 4px 20px hsl(45 100% 50% / 0.3)'
            }}
          >
            <Crown className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white tracking-wider">
              VIP
            </span>
          </div>
        </div>
        
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p 
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'hsl(45 100% 60%)' }}
          >
            Ekskluzywna oferta
          </p>
          
          <h2 
            className="text-4xl font-bold text-white mb-4 leading-tight"
          >
            {data.title || 'Luksusowy Pakiet'}
          </h2>
          
          {/* Decorative line */}
          <div 
            className="h-px w-24 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(45 100% 50%), transparent)' }}
          />
          
          <p className="text-white/60 mb-8 max-w-sm leading-relaxed">
            {data.description || 'Pełna metamorfoza: zabieg na twarz, stylizacja włosów i manicure'}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span 
              className="text-5xl font-bold"
              style={{ 
                background: 'linear-gradient(135deg, hsl(45 100% 55%), hsl(40 100% 45%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {data.price || '599'} zł
            </span>
          </div>
          
          {data.originalPrice && (
            <p className="text-white/40 line-through text-lg">
              {data.originalPrice} zł
            </p>
          )}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <div 
            className="inline-block px-8 py-3 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, hsl(45 80% 45%), hsl(40 90% 40%))',
              boxShadow: '0 8px 32px hsl(45 100% 50% / 0.3)'
            }}
          >
            <span className="text-white font-semibold tracking-wide">
              {data.cta || 'Zarezerwuj teraz'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Gold corner accents */}
      <div 
        className="absolute top-6 left-6 w-12 h-12"
        style={{ 
          borderLeft: '1px solid hsl(45 100% 50% / 0.4)',
          borderTop: '1px solid hsl(45 100% 50% / 0.4)'
        }}
      />
      <div 
        className="absolute bottom-6 right-6 w-12 h-12"
        style={{ 
          borderRight: '1px solid hsl(45 100% 50% / 0.4)',
          borderBottom: '1px solid hsl(45 100% 50% / 0.4)'
        }}
      />
    </div>
  );
}
