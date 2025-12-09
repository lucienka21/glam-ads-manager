import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  data: Record<string, string>;
}

export function TestimonialCard({ data }: TestimonialCardProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80';
  const rating = parseInt(data.rating || '5', 10);
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Subtle gradient accents */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-48 h-48 opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col">
        {/* Salon name */}
        <p 
          className="text-xs tracking-[0.4em] uppercase font-medium mb-8"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        {/* Quote icon */}
        <div className="mb-6">
          <Quote 
            className="w-10 h-10 opacity-30"
            style={{ color: 'hsl(330 100% 65%)' }}
          />
        </div>
        
        {/* Quote text */}
        <blockquote 
          className="text-2xl font-medium text-white leading-relaxed mb-8 flex-1"
          style={{ fontStyle: 'italic' }}
        >
          "{data.quote || 'Najlepszy salon w mieście! Profesjonalna obsługa i niesamowite efekty.'}"
        </blockquote>
        
        {/* Author section */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div 
            className="w-14 h-14 rounded-full overflow-hidden"
            style={{ 
              border: '2px solid hsl(330 100% 60%)',
              boxShadow: '0 0 15px hsl(330 100% 60% / 0.3)'
            }}
          >
            <img 
              src={data.image || placeholderImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <p className="text-white font-semibold">
              {data.author || 'Anna K.'}
            </p>
            {/* Stars */}
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className="w-4 h-4"
                  style={{ 
                    color: star <= rating ? 'hsl(45 100% 55%)' : 'rgba(255,255,255,0.2)',
                    fill: star <= rating ? 'hsl(45 100% 55%)' : 'transparent'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative corner */}
      <div 
        className="absolute bottom-0 right-0 w-24 h-24"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, hsl(330 100% 60% / 0.1) 50%)',
        }}
      />
    </div>
  );
}
