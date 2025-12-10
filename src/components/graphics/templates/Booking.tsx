interface BookingProps {
  data: Record<string, string>;
}

export function Booking({ data }: BookingProps) {
  const placeholder = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
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
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, transparent 50%, rgba(0,0,0,0.7) 100%)' }}
      />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-center">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase mb-6"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 className="text-4xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
          {data.title || 'Umów wizytę'}
        </h2>
        
        <p className="text-white/50 text-sm">
          {data.subtitle || 'Wolne terminy w tym tygodniu'}
        </p>
      </div>
      
      <div 
        className="absolute bottom-10 left-10 h-px w-16"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
    </div>
  );
}
