interface FlashSaleProps {
  data: Record<string, string>;
}

export function FlashSale({ data }: FlashSaleProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80';
  
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
          style={{ filter: 'brightness(0.25) saturate(0.8)' }}
        />
      </div>
      
      {/* Content centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
        <p 
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <div 
          className="text-8xl font-extralight mb-4"
          style={{ 
            color: 'white',
            letterSpacing: '-0.04em'
          }}
        >
          -{data.discount || '30'}%
        </div>
        
        <p 
          className="text-white/60 text-sm tracking-wide max-w-xs"
        >
          {data.service || 'Na wszystkie zabiegi'}
        </p>
        
        <div 
          className="mt-8 h-px w-16"
          style={{ background: 'hsl(330 100% 60%)' }}
        />
        
        <p 
          className="mt-4 text-xs text-white/40 tracking-wider uppercase"
        >
          {data.validUntil || 'Tylko do końca tygodnia'}
        </p>
      </div>
    </div>
  );
}
