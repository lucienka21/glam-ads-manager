interface HolidaySpecialProps {
  data: Record<string, string>;
}

export function HolidaySpecial({ data }: HolidaySpecialProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.9)' }}
        />
      </div>
      
      {/* Subtle overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col">
        <p 
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <div className="mt-auto">
          <p 
            className="text-xs tracking-[0.3em] uppercase mb-3 text-white/50"
          >
            {data.occasion || 'Oferta specjalna'}
          </p>
          
          <h2 
            className="text-3xl font-light text-white mb-6 leading-tight"
            style={{ letterSpacing: '-0.01em' }}
          >
            {data.title || 'Voucher prezentowy'}
          </h2>
          
          <div className="flex items-baseline gap-4">
            <span 
              className="text-4xl font-extralight"
              style={{ color: 'hsl(330 100% 70%)' }}
            >
              {data.value || '500'} zł
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative corner */}
      <div 
        className="absolute bottom-12 right-12 w-16 h-16"
        style={{ 
          borderRight: '1px solid hsl(330 100% 60% / 0.3)',
          borderBottom: '1px solid hsl(330 100% 60% / 0.3)'
        }}
      />
    </div>
  );
}
