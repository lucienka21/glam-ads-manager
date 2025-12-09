import { Crown, Sparkles, ArrowRight } from 'lucide-react';

interface VipTreatmentProps {
  data: Record<string, string>;
}

export function VipTreatment({ data }: VipTreatmentProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  return (
    <div 
      className="w-[540px] h-[960px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #050505 0%, #0f0f0f 50%, #080808 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background image - top portion */}
      <div className="absolute top-0 left-0 right-0 h-[55%]">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.8) contrast(1.1) saturate(1.1)' }}
        />
        {/* Gradient fade to black */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 80%, #0f0f0f 100%)'
          }}
        />
      </div>
      
      {/* Gold accent glows */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(45 90% 55%), transparent 70%)' }}
      />
      <div 
        className="absolute bottom-40 right-0 w-48 h-48 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      
      {/* Premium badge - top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div 
          className="flex items-center gap-2 px-5 py-2 rounded-full"
          style={{ 
            background: 'linear-gradient(135deg, hsl(45 90% 45%), hsl(40 85% 55%))',
            boxShadow: '0 4px 20px hsl(45 90% 55% / 0.4)'
          }}
        >
          <Crown className="w-4 h-4 text-black" />
          <span className="text-xs font-bold text-black uppercase tracking-widest">
            {data.badge || 'PREMIUM'}
          </span>
        </div>
      </div>
      
      {/* Content - bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-10">
        {/* Salon name */}
        <p 
          className="text-xs tracking-[0.4em] uppercase font-medium mb-6"
          style={{ color: 'hsl(45 90% 55%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
        
        {/* Service name */}
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6" style={{ color: 'hsl(330 100% 65%)' }} />
          <h1 
            className="text-3xl font-bold text-white"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            {data.service || 'Luxury Hair Spa'}
          </h1>
        </div>
        
        {/* Description */}
        <p className="text-white/60 mb-8 leading-relaxed">
          {data.description || 'Kompleksowa regeneracja włosów z użyciem ekskluzywnych składników'}
        </p>
        
        {/* Price */}
        <div 
          className="inline-block px-8 py-4 rounded-2xl mb-8"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="text-sm text-white/50 block mb-1">Cena zabiegu</span>
          <span 
            className="text-3xl font-bold"
            style={{ 
              background: 'linear-gradient(135deg, hsl(45 90% 55%), hsl(40 85% 65%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {data.price || '599 zł'}
          </span>
        </div>
        
        {/* CTA */}
        <button
          className="w-full py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(340 100% 65%))',
            color: 'white',
            boxShadow: '0 4px 30px hsl(330 100% 60% / 0.4)',
          }}
        >
          {data.cta || 'Umów wizytę'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Decorative side lines */}
      <div 
        className="absolute left-6 top-32 bottom-32 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(45 90% 55% / 0.3), transparent)' }}
      />
      <div 
        className="absolute right-6 top-32 bottom-32 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, hsl(45 90% 55% / 0.3), transparent)' }}
      />
    </div>
  );
}
