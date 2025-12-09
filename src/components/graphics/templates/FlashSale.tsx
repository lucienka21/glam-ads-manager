import { Zap, ArrowUp } from 'lucide-react';

interface FlashSaleProps {
  data: Record<string, string>;
}

export function FlashSale({ data }: FlashSaleProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[960px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #121212 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Full background image */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5) contrast(1.1)' }}
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.9) 100%)'
          }}
        />
      </div>
      
      {/* Animated pink pulse effect */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)',
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col">
        {/* Top - Salon name */}
        <div className="text-center mb-8">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
        </div>
        
        {/* Center - Main content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Flash icon */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
              boxShadow: '0 0 40px hsl(330 100% 60% / 0.5)'
            }}
          >
            <Zap className="w-8 h-8 text-white" fill="white" />
          </div>
          
          {/* Headline */}
          <h1 
            className="text-5xl font-black text-white mb-4 text-center"
            style={{ 
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em'
            }}
          >
            {data.headline || 'TYLKO DZIŚ!'}
          </h1>
          
          {/* Big discount */}
          <div 
            className="text-8xl font-black mb-6"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 65%), hsl(340 100% 75%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px hsl(330 100% 60% / 0.5))'
            }}
          >
            {data.discount || '-50%'}
          </div>
          
          {/* Service */}
          <p className="text-xl text-white/80 text-center">
            {data.service || 'Wszystkie zabiegi'}
          </p>
        </div>
        
        {/* Bottom - CTA */}
        <div className="text-center pb-12">
          <button
            className="px-10 py-4 rounded-full text-lg font-bold tracking-wide flex items-center gap-2 mx-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
              color: 'white',
              boxShadow: '0 4px 30px hsl(330 100% 60% / 0.5)',
            }}
          >
            {data.cta || 'Zarezerwuj teraz'}
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Corner accents */}
      <div 
        className="absolute top-0 left-0 w-40 h-40"
        style={{
          background: 'linear-gradient(135deg, hsl(330 100% 60% / 0.2) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute top-0 right-0 w-40 h-40"
        style={{
          background: 'linear-gradient(225deg, hsl(330 100% 60% / 0.2) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
