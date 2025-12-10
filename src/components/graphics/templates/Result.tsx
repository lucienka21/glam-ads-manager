interface ResultProps {
  data: Record<string, string>;
}

export function Result({ data }: ResultProps) {
  const placeholder = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ background: '#080808', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholder} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.9)' }}
        />
      </div>
      
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.8) 100%)' }}
      />
      
      <div className="absolute top-8 left-8">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
      </div>
      
      <div className="absolute bottom-8 left-8 right-8">
        <p className="text-xl font-light text-white">
          {data.service || 'Keratynowe prostowanie'}
        </p>
      </div>
      
      <div 
        className="absolute top-8 bottom-8 left-0 w-px"
        style={{ background: 'linear-gradient(180deg, hsl(330 100% 60%), transparent)' }}
      />
    </div>
  );
}
