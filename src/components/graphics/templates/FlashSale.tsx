import { Clock, Zap } from 'lucide-react';

interface FlashSaleProps {
  data: Record<string, string>;
}

export function FlashSale({ data }: FlashSaleProps) {
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a10 50%, #0a0a0a 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Animated background elements */}
      <div 
        className="absolute top-10 right-10 w-72 h-72 opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 55%), transparent 60%)' }}
      />
      <div 
        className="absolute bottom-10 left-10 w-56 h-56 opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(340 100% 50%), transparent 60%)' }}
      />
      
      {/* Geometric accents */}
      <div 
        className="absolute top-0 left-0 w-32 h-32"
        style={{ 
          background: 'linear-gradient(135deg, hsl(330 100% 50% / 0.2) 0%, transparent 60%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-48 h-48"
        style={{ 
          background: 'linear-gradient(315deg, hsl(330 100% 50% / 0.15) 0%, transparent 60%)'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col items-center justify-center text-center">
        {/* Flash badge */}
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ 
            background: 'hsl(330 100% 50% / 0.2)',
            border: '1px solid hsl(330 100% 60% / 0.3)'
          }}
        >
          <Zap className="w-4 h-4" style={{ color: 'hsl(330 100% 65%)' }} />
          <span 
            className="text-xs tracking-[0.2em] uppercase font-semibold"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            Flash Sale
          </span>
        </div>
        
        {/* Discount */}
        <div className="mb-4">
          <span 
            className="text-9xl font-black"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 70%) 0%, hsl(340 100% 60%) 50%, hsl(330 100% 70%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px hsl(330 100% 60% / 0.5)'
            }}
          >
            -{data.discount || '50'}%
          </span>
        </div>
        
        {/* Service */}
        <h2 className="text-2xl font-semibold text-white mb-6">
          {data.service || 'Na wszystkie usługi'}
        </h2>
        
        {/* Timer badge */}
        <div 
          className="flex items-center gap-3 px-6 py-3 rounded-lg mb-8"
          style={{ 
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Clock className="w-5 h-5 text-white/60" />
          <span className="text-white/80 font-medium">
            {data.validity || 'Tylko dziś!'}
          </span>
        </div>
        
        {/* Salon */}
        <p 
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
      </div>
      
      {/* Border glow */}
      <div 
        className="absolute inset-4 rounded-2xl pointer-events-none"
        style={{ 
          border: '1px solid hsl(330 100% 60% / 0.2)',
          boxShadow: 'inset 0 0 60px hsl(330 100% 60% / 0.05)'
        }}
      />
    </div>
  );
}
