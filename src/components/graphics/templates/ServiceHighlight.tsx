interface ServiceHighlightProps {
  data: Record<string, string>;
}

export function ServiceHighlight({ data }: ServiceHighlightProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80';
  
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
          style={{ filter: 'brightness(0.35)' }}
        />
      </div>
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div>
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
        </div>
        
        <div>
          <h2 
            className="text-3xl font-light text-white mb-4 leading-tight max-w-xs"
            style={{ letterSpacing: '-0.01em' }}
          >
            {data.service || 'Luksusowy zabieg na twarz'}
          </h2>
          
          <div className="flex items-baseline gap-3">
            <span 
              className="text-2xl font-light"
              style={{ color: 'hsl(330 100% 70%)' }}
            >
              {data.price || '299'} zł
            </span>
          </div>
        </div>
      </div>
      
      {/* Corner accent */}
      <div 
        className="absolute top-12 right-12 w-12 h-12"
        style={{ 
          borderRight: '1px solid hsl(330 100% 60% / 0.4)',
          borderTop: '1px solid hsl(330 100% 60% / 0.4)'
        }}
      />
    </div>
  );
}
