interface BrandProps {
  data: Record<string, string>;
}

export function Brand({ data }: BrandProps) {
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
          style={{ filter: 'brightness(0.45)' }}
        />
      </div>
      
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
      />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <p 
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <h2 className="text-3xl font-light text-white" style={{ letterSpacing: '-0.02em' }}>
          {data.tagline || 'Twoja metamorfoza'}
        </h2>
      </div>
      
      <div 
        className="absolute top-10 right-10 w-10 h-10"
        style={{ borderRight: '1px solid hsl(330 100% 60% / 0.5)', borderTop: '1px solid hsl(330 100% 60% / 0.5)' }}
      />
    </div>
  );
}
