interface TestimonialCardProps {
  data: Record<string, string>;
}

export function TestimonialCard({ data }: TestimonialCardProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <p 
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        <div>
          <p 
            className="text-xl font-light text-white leading-relaxed mb-8"
            style={{ letterSpacing: '0.01em' }}
          >
            "{data.review || 'Najlepszy salon w mieście. Profesjonalna obsługa i wspaniałe efekty.'}"
          </p>
          
          <div 
            className="h-px w-12 mb-4"
            style={{ background: 'hsl(330 100% 60%)' }}
          />
          
          <p className="text-white/60 text-sm">
            {data.clientName || 'Anna K.'}
          </p>
        </div>
      </div>
    </div>
  );
}
