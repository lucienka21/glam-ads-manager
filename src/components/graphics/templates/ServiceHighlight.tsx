import { Sparkles } from 'lucide-react';

interface ServiceHighlightProps {
  data: Record<string, string>;
}

export function ServiceHighlight({ data }: ServiceHighlightProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80';
  
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
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
      </div>
      
      {/* Gradient overlays */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%)'
        }}
      />
      
      {/* Pink accent */}
      <div 
        className="absolute top-20 left-20 w-40 h-40 opacity-30 blur-3xl"
        style={{ background: 'hsl(330 100% 60%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-auto">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          <Sparkles 
            className="w-5 h-5"
            style={{ color: 'hsl(330 100% 65%)' }}
          />
        </div>
        
        {/* Main content */}
        <div className="mt-auto">
          <p 
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Polecany zabieg
          </p>
          
          <h2 
            className="text-4xl font-bold text-white mb-4 leading-tight"
          >
            {data.service || 'Luksusowy zabieg na twarz'}
          </h2>
          
          {/* Decorative line */}
          <div 
            className="h-1 w-16 mb-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(330 100% 60%), hsl(340 100% 50%))' }}
          />
          
          <p className="text-white/70 mb-8 leading-relaxed max-w-sm">
            {data.description || 'Odkryj głęboko nawilżający zabieg, który odmieni Twoją skórę.'}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span 
              className="text-3xl font-bold"
              style={{ color: 'hsl(330 100% 65%)' }}
            >
              {data.price || '299'} zł
            </span>
            {data.oldPrice && (
              <span className="text-lg text-white/40 line-through">
                {data.oldPrice} zł
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, hsl(330 100% 60%), hsl(340 100% 50%), hsl(330 100% 60%))' }}
      />
    </div>
  );
}
