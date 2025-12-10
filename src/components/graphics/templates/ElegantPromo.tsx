interface ElegantPromoProps {
  data: Record<string, string>;
}

export function ElegantPromo({ data }: ElegantPromoProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Full background image */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        />
      </div>
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <p 
          className="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
          style={{ color: 'hsl(330 100% 70%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 
          className="text-4xl font-light text-white mb-3 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          {data.title || 'Twoja metamorfoza'}
        </h2>
        
        <p className="text-white/50 text-sm max-w-xs">
          {data.subtitle || 'Umów wizytę już dziś'}
        </p>
      </div>
      
      {/* Minimal accent line */}
      <div 
        className="absolute bottom-0 left-12 right-12 h-px"
        style={{ background: 'linear-gradient(90deg, hsl(330 100% 60%) 0%, transparent 100%)' }}
      />
    </div>
  );
}
