interface VipTreatmentProps {
  data: Record<string, string>;
}

export function VipTreatment({ data }: VipTreatmentProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Image takes most space */}
      <div className="absolute top-0 left-0 right-0 h-[70%]">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, transparent 50%, #0a0a0a 100%)'
          }}
        />
      </div>
      
      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-10">
        <p 
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 
          className="text-2xl font-light text-white mb-3"
          style={{ letterSpacing: '-0.01em' }}
        >
          {data.title || 'Ekskluzywny zabieg'}
        </h2>
        
        <p className="text-white/50 text-sm mb-6 max-w-sm">
          {data.description || 'Doświadcz luksusu i profesjonalnej pielęgnacji'}
        </p>
        
        <div className="flex items-baseline gap-3">
          <span 
            className="text-xl font-light"
            style={{ color: 'hsl(330 100% 70%)' }}
          >
            od {data.price || '399'} zł
          </span>
        </div>
      </div>
      
      {/* Top accent */}
      <div 
        className="absolute top-8 left-10 right-10 h-px"
        style={{ background: 'linear-gradient(90deg, hsl(330 100% 60% / 0.5), transparent)' }}
      />
    </div>
  );
}
