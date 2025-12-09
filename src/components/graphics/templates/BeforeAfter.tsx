interface BeforeAfterProps {
  data: Record<string, string>;
}

export function BeforeAfter({ data }: BeforeAfterProps) {
  const placeholderBefore = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  const placeholderAfter = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
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
        {/* Before side */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <img 
            src={data.beforeImage || placeholderBefore} 
            alt="Before" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.85) saturate(0.9)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 100%)' }}
          />
          {/* Before label */}
          <div className="absolute bottom-8 left-6">
            <span 
              className="text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full"
              style={{ 
                background: 'rgba(0,0,0,0.7)',
                color: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Przed
            </span>
          </div>
        </div>
        
        {/* After side */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <img 
            src={data.afterImage || placeholderAfter} 
            alt="After" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.95) saturate(1.1)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(270deg, rgba(0,0,0,0.3) 0%, transparent 100%)' }}
          />
          {/* After label */}
          <div className="absolute bottom-8 right-6">
            <span 
              className="text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full"
              style={{ 
                background: 'linear-gradient(135deg, hsl(330 100% 50%), hsl(340 100% 45%))',
                color: 'white',
                boxShadow: '0 4px 16px hsl(330 100% 50% / 0.3)'
              }}
            >
              Po
            </span>
          </div>
        </div>
      </div>
      
      {/* Center divider */}
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(330 100% 60%), hsl(330 100% 60%), transparent)' }}
      />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, hsl(330 100% 50%), hsl(340 100% 45%))',
          boxShadow: '0 0 30px hsl(330 100% 50% / 0.5)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M18 8l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      
      {/* Top overlay */}
      <div 
        className="absolute top-0 left-0 right-0 p-8"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
      >
        <p 
          className="text-xs tracking-[0.4em] uppercase font-medium mb-2"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        <h2 className="text-xl font-semibold text-white">
          {data.service || 'Metamorfoza'}
        </h2>
      </div>
      
      {/* Bottom overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 text-center"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
      >
        <p className="text-sm text-white/60 pt-8">
          {data.description || 'Efekty mówią same za siebie'}
        </p>
      </div>
    </div>
  );
}
