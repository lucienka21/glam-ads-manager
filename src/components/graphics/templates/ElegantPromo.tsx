interface ElegantPromoProps {
  data: Record<string, string>;
}

export function ElegantPromo({ data }: ElegantPromoProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4) saturate(0.9)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)'
          }}
        />
      </div>
      
      {/* Pink accent glow */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-48 h-48 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        {/* Top - Salon name */}
        <div>
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
        </div>
        
        {/* Center - Main content */}
        <div className="text-center">
          <p 
            className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Oferta specjalna
          </p>
          
          {/* Discount */}
          <div className="relative inline-block mb-6">
            <span 
              className="text-8xl font-bold"
              style={{ 
                background: 'linear-gradient(135deg, hsl(330 100% 65%) 0%, hsl(340 100% 70%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              -{data.discount || '30'}%
            </span>
          </div>
          
          {/* Service name */}
          <h2 
            className="text-2xl font-semibold text-white mb-2"
            style={{ letterSpacing: '0.05em' }}
          >
            {data.service || 'Wszystkie zabiegi'}
          </h2>
          
          {/* Decorative line */}
          <div 
            className="h-px w-24 mx-auto my-6"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 100% 60%), transparent)' }}
          />
          
          <p className="text-sm text-white/50">
            {data.validity || 'Oferta ważna do końca miesiąca'}
          </p>
        </div>
        
        {/* Bottom - CTA */}
        <div className="text-center">
          <div 
            className="inline-block px-8 py-3 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 50%), hsl(340 100% 45%))',
              boxShadow: '0 8px 32px hsl(330 100% 50% / 0.3)'
            }}
          >
            <span className="text-white font-semibold tracking-wide">
              Umów wizytę
            </span>
          </div>
        </div>
      </div>
      
      {/* Corner accents */}
      <div 
        className="absolute top-6 left-6 w-12 h-12"
        style={{ 
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}
      />
      <div 
        className="absolute bottom-6 right-6 w-12 h-12"
        style={{ 
          borderRight: '1px solid rgba(255,255,255,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}
      />
    </div>
  );
}
