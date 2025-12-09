import { ArrowRight, Sparkles } from 'lucide-react';

interface BeforeAfterProps {
  data: Record<string, string>;
}

export function BeforeAfter({ data }: BeforeAfterProps) {
  const placeholderBefore = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80';
  const placeholderAfter = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80';
  
  return (
    <div 
      className="w-[540px] h-[675px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #121212 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top - Salon branding */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 text-center">
        <p 
          className="text-xs tracking-[0.4em] uppercase font-medium mb-1"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        <div 
          className="h-px w-16 mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(330 100% 60%), transparent)' }}
        />
      </div>
      
      {/* Images container */}
      <div className="absolute top-16 left-6 right-6 bottom-24 flex gap-3">
        {/* Before */}
        <div className="flex-1 relative rounded-2xl overflow-hidden">
          <img 
            src={data.imageBefore || placeholderBefore} 
            alt="Przed" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.95)' }}
          />
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))' }}
          />
          {/* Label */}
          <div className="absolute bottom-4 left-4">
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
              style={{ 
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              Przed
            </span>
          </div>
        </div>
        
        {/* Divider with arrow */}
        <div className="flex flex-col items-center justify-center w-10 relative">
          <div 
            className="absolute inset-y-8 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, hsl(330 100% 60%), transparent)' }}
          />
          <div 
            className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
              boxShadow: '0 0 20px hsl(330 100% 60% / 0.5)'
            }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* After */}
        <div className="flex-1 relative rounded-2xl overflow-hidden">
          <img 
            src={data.imageAfter || placeholderAfter} 
            alt="Po" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.05) contrast(1.05) saturate(1.1)' }}
          />
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))' }}
          />
          {/* Label */}
          <div className="absolute bottom-4 right-4">
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
              style={{ 
                background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
                color: 'white',
                boxShadow: '0 0 15px hsl(330 100% 60% / 0.4)'
              }}
            >
              Po
            </span>
          </div>
          {/* Sparkles decoration */}
          <Sparkles 
            className="absolute top-4 right-4 w-5 h-5"
            style={{ color: 'hsl(330 100% 70%)', filter: 'drop-shadow(0 0 6px hsl(330 100% 60% / 0.6))' }}
          />
        </div>
      </div>
      
      {/* Bottom - Service name */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p 
          className="text-lg font-semibold text-white mb-1"
        >
          {data.service || 'Stylizacja włosów'}
        </p>
        <p className="text-xs text-white/50 uppercase tracking-wider">
          Metamorfoza
        </p>
      </div>
      
      {/* Pink glow effects */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
    </div>
  );
}
