interface DiscountProps {
  data: Record<string, string>;
}

export function Discount({ data }: DiscountProps) {
  const placeholder = 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ background: '#080808', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholder} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25)' }}
        />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase mb-6"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <div className="text-7xl font-extralight text-white mb-3" style={{ letterSpacing: '-0.04em' }}>
          -{data.discount || '30'}%
        </div>
        
        <p className="text-white/50 text-sm">
          {data.service || 'Zabiegi na twarz'}
        </p>
      </div>
      
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px w-12"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
    </div>
  );
}
