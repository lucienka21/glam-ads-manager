interface TreatmentProps {
  data: Record<string, string>;
}

export function Treatment({ data }: TreatmentProps) {
  const placeholder = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ background: '#080808', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[65%]">
        <img 
          src={data.image || placeholder} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 60%, #080808 100%)' }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-10">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 className="text-2xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
          {data.service || 'Peeling kawitacyjny'}
        </h2>
        
        <p className="text-white/50 text-sm mb-4">
          {data.description || 'Głębokie oczyszczanie skóry'}
        </p>
        
        <p className="text-xl font-light" style={{ color: 'hsl(330 100% 70%)' }}>
          {data.price || '199'} zł
        </p>
      </div>
      
      <div 
        className="absolute top-6 left-10 right-10 h-px"
        style={{ background: 'linear-gradient(90deg, hsl(330 100% 60% / 0.5), transparent)' }}
      />
    </div>
  );
}
