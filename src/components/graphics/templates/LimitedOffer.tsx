interface LimitedOfferProps {
  data: Record<string, string>;
}

export function LimitedOffer({ data }: LimitedOfferProps) {
  const placeholder = 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80';
  
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
          style={{ filter: 'brightness(0.35)' }}
        />
      </div>
      
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)' }}
      />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase mb-3"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 className="text-2xl font-light text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
          {data.service || 'Makijaż permanentny'}
        </h2>
        
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-light" style={{ color: 'hsl(330 100% 70%)' }}>
            {data.price || '499'} zł
          </span>
          {data.oldPrice && (
            <span className="text-lg text-white/40 line-through">
              {data.oldPrice} zł
            </span>
          )}
        </div>
      </div>
      
      <div 
        className="absolute top-10 right-10 w-12 h-12"
        style={{ borderRight: '1px solid hsl(330 100% 60% / 0.4)', borderTop: '1px solid hsl(330 100% 60% / 0.4)' }}
      />
    </div>
  );
}
