interface NewServiceProps {
  data: Record<string, string>;
}

export function NewService({ data }: NewServiceProps) {
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
          style={{ filter: 'brightness(0.4)' }}
        />
      </div>
      
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)' }}
      />
      
      <div className="absolute top-10 left-10">
        <div 
          className="text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
          style={{ background: 'hsl(330 100% 50%)', color: 'white' }}
        >
          Nowość
        </div>
      </div>
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase mb-3"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 className="text-3xl font-light text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
          {data.service || 'Hydrafacial'}
        </h2>
        
        <p className="text-2xl font-light" style={{ color: 'hsl(330 100% 70%)' }}>
          {data.price || '349'} zł
        </p>
      </div>
    </div>
  );
}
