import { Sparkles, Star } from 'lucide-react';

interface NewLookProps {
  data: Record<string, string>;
}

export function NewLook({ data }: NewLookProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Full background image with artistic treatment */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.8) contrast(1.1) saturate(1.1)' }}
        />
        {/* Complex gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `
              linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 25%, transparent 50%, rgba(0,0,0,0.8) 100%),
              linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)
            `
          }}
        />
      </div>
      
      {/* Pink accent glows */}
      <div 
        className="absolute top-10 left-10 w-32 h-32 opacity-40 blur-3xl"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      <div 
        className="absolute bottom-20 right-10 w-40 h-40 opacity-30 blur-3xl"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col">
        {/* Top - Salon name */}
        <div className="flex items-center justify-between">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          <div className="flex gap-2">
            <Star className="w-4 h-4" style={{ color: 'hsl(330 100% 65%)', fill: 'hsl(330 100% 65%)' }} />
            <Sparkles className="w-4 h-4" style={{ color: 'hsl(330 100% 65%)' }} />
          </div>
        </div>
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Bottom - Content */}
        <div>
          {/* Badge */}
          <div 
            className="inline-block px-4 py-1.5 rounded-full mb-4"
            style={{ 
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <span className="text-xs font-medium text-white uppercase tracking-wider">
              Metamorfoza
            </span>
          </div>
          
          {/* Headline */}
          <h1 
            className="text-5xl font-bold text-white mb-3"
            style={{ 
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
              lineHeight: '1.1'
            }}
          >
            {data.headline || 'Nowy Wygląd'}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg text-white/70 mb-6">
            {data.subheadline || 'Twoja metamorfoza zaczyna się tutaj'}
          </p>
          
          {/* Service tag */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
              boxShadow: '0 4px 20px hsl(330 100% 60% / 0.4)'
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {data.service || 'Koloryzacja + stylizacja'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative frame corners */}
      <div 
        className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 rounded-tl-lg"
        style={{ borderColor: 'hsl(330 100% 60% / 0.5)' }}
      />
      <div 
        className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 rounded-tr-lg"
        style={{ borderColor: 'hsl(330 100% 60% / 0.5)' }}
      />
      <div 
        className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 rounded-bl-lg"
        style={{ borderColor: 'hsl(330 100% 60% / 0.5)' }}
      />
      <div 
        className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 rounded-br-lg"
        style={{ borderColor: 'hsl(330 100% 60% / 0.5)' }}
      />
    </div>
  );
}
