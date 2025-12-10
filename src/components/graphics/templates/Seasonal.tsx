interface SeasonalProps {
  data: Record<string, string>;
}

export function Seasonal({ data }: SeasonalProps) {
  const placeholder = 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80';
  
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
          style={{ filter: 'brightness(0.3)' }}
        />
      </div>
      
      <div className="absolute inset-0 p-10 flex flex-col">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-white/50 text-sm mb-2">
            {data.title || 'Letnia promocja'}
          </p>
          
          <div className="text-6xl font-extralight text-white" style={{ letterSpacing: '-0.04em' }}>
            -{data.discount || '25'}%
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(330 100% 60%), transparent)' }}
      />
    </div>
  );
}
