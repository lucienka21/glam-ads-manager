interface NewLookProps {
  data: Record<string, string>;
}

export function NewLook({ data }: NewLookProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Full image */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.9) contrast(1.05)' }}
        />
      </div>
      
      {/* Gradient overlays */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      
      {/* Top content */}
      <div className="absolute top-0 left-0 right-0 p-8">
        <p 
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 70%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
      </div>
      
      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h2 
          className="text-2xl font-light text-white mb-2"
          style={{ letterSpacing: '-0.01em' }}
        >
          {data.title || 'Nowy wymiar piękna'}
        </h2>
        <p className="text-white/50 text-sm">
          {data.service || 'Profesjonalna stylizacja'}
        </p>
      </div>
      
      {/* Side accent */}
      <div 
        className="absolute top-8 bottom-8 left-0 w-px"
        style={{ background: 'linear-gradient(180deg, hsl(330 100% 60%), transparent)' }}
      />
    </div>
  );
}
