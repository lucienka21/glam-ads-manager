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
      {/* Main image */}
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
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.9) 100%)'
        }}
      />
      
      {/* Side accent */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(330 100% 60%), hsl(330 100% 60%), transparent)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div>
            <p 
              className="text-xs tracking-[0.4em] uppercase font-medium mb-1"
              style={{ color: 'hsl(330 100% 65%)' }}
            >
              {data.salon || 'Beauty Studio'}
            </p>
            <p className="text-xs text-white/40 tracking-wide">
              Metamorfoza
            </p>
          </div>
          
          {/* New badge */}
          <div 
            className="px-4 py-2 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 50%), hsl(340 100% 45%))',
              boxShadow: '0 4px 20px hsl(330 100% 50% / 0.4)'
            }}
          >
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              New Look
            </span>
          </div>
        </div>
        
        {/* Bottom content */}
        <div className="mt-auto">
          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
            {data.title || 'Nowy wymiar piękna'}
          </h2>
          
          <p className="text-white/60 mb-6 max-w-xs leading-relaxed">
            {data.description || 'Odkryj swoją najlepszą wersję z naszymi specjalistami'}
          </p>
          
          {/* Service tag */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ background: 'hsl(330 100% 60%)' }}
            />
            <span className="text-sm text-white/80">
              {data.service || 'Fryzura & Stylizacja'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute top-8 right-8 w-16 h-16"
        style={{ 
          borderRight: '1px solid rgba(255,255,255,0.15)',
          borderTop: '1px solid rgba(255,255,255,0.15)'
        }}
      />
    </div>
  );
}
