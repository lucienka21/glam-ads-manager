interface BeforeAfterProps {
  data: Record<string, string>;
}

export function BeforeAfter({ data }: BeforeAfterProps) {
  const beforeImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80';
  const afterImage = 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Split images */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative overflow-hidden">
          <img 
            src={data.beforeImage || beforeImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.8) saturate(0.9)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.4) 100%)' }}
          />
        </div>
        <div className="w-1/2 h-full relative overflow-hidden">
          <img 
            src={data.afterImage || afterImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.9)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(270deg, transparent 60%, rgba(0,0,0,0.4) 100%)' }}
          />
        </div>
      </div>
      
      {/* Center divider */}
      <div 
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      
      {/* Labels */}
      <div className="absolute top-8 left-8">
        <span className="text-white/60 text-xs tracking-[0.2em] uppercase">Przed</span>
      </div>
      <div className="absolute top-8 right-8">
        <span 
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: 'hsl(330 100% 70%)' }}
        >
          Po
        </span>
      </div>
      
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div 
          className="p-6 rounded-lg"
          style={{ 
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <p 
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: 'hsl(330 100% 70%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          <p className="text-white text-lg font-light">
            {data.service || 'Profesjonalna metamorfoza'}
          </p>
        </div>
      </div>
    </div>
  );
}
