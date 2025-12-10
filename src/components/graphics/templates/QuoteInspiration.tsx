interface QuoteInspirationProps {
  data: Record<string, string>;
}

export function QuoteInspiration({ data }: QuoteInspirationProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80';
  
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
          style={{ filter: 'brightness(0.3) saturate(0.7)' }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col justify-center items-center text-center">
        <div 
          className="text-6xl mb-6 font-light"
          style={{ color: 'hsl(330 100% 60% / 0.4)' }}
        >
          "
        </div>
        
        <p 
          className="text-xl font-light text-white leading-relaxed max-w-sm mb-8"
          style={{ letterSpacing: '0.01em' }}
        >
          {data.quote || 'Piękno zaczyna się od decyzji bycia sobą'}
        </p>
        
        <div 
          className="h-px w-12 mb-4"
          style={{ background: 'hsl(330 100% 60%)' }}
        />
        
        <p 
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
      </div>
    </div>
  );
}
