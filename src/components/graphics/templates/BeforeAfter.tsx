interface BeforeAfterProps {
  data: Record<string, string>;
}

export function BeforeAfter({ data }: BeforeAfterProps) {
  const before = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80';
  const after = 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ background: '#080808', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative">
          <img 
            src={data.beforeImage || before} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.85)' }}
          />
        </div>
        <div className="w-1/2 h-full relative">
          <img 
            src={data.afterImage || after} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.9)' }}
          />
        </div>
      </div>
      
      <div 
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      
      <div className="absolute top-6 left-6">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Przed</span>
      </div>
      <div className="absolute top-6 right-6">
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(330 100% 70%)' }}>Po</span>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
      >
        <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'hsl(330 100% 65%)' }}>
          {data.salon || 'Beauty Studio'}
        </p>
        <p className="text-white text-lg font-light">
          {data.service || 'Lifting twarzy'}
        </p>
      </div>
    </div>
  );
}
