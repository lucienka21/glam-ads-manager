import { Gift, Sparkles } from 'lucide-react';

interface HolidaySpecialProps {
  data: Record<string, string>;
}

export function HolidaySpecial({ data }: HolidaySpecialProps) {
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0a0808 0%, #1a0a10 50%, #0a0808 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Festive gradient orbs */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 55%), transparent 60%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(45 100% 50%), transparent 60%)' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 50%)' }}
      />
      
      {/* Decorative sparkles */}
      <Sparkles 
        className="absolute top-16 right-16 w-6 h-6 opacity-40"
        style={{ color: 'hsl(45 100% 60%)' }}
      />
      <Sparkles 
        className="absolute bottom-20 left-20 w-4 h-4 opacity-30"
        style={{ color: 'hsl(330 100% 65%)' }}
      />
      <Sparkles 
        className="absolute top-1/3 left-16 w-5 h-5 opacity-25"
        style={{ color: 'hsl(45 100% 55%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ 
            background: 'linear-gradient(135deg, hsl(330 100% 50%), hsl(340 100% 45%))',
            boxShadow: '0 8px 32px hsl(330 100% 50% / 0.3)'
          }}
        >
          <Gift className="w-8 h-8 text-white" />
        </div>
        
        {/* Holiday label */}
        <p 
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: 'hsl(45 100% 60%)' }}
        >
          {data.occasion || 'Świąteczna Promocja'}
        </p>
        
        {/* Main title */}
        <h2 
          className="text-4xl font-bold text-white mb-4"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          {data.title || 'Magiczne Święta'}
        </h2>
        
        {/* Discount */}
        <div className="mb-6">
          <span 
            className="text-7xl font-black"
            style={{ 
              background: 'linear-gradient(135deg, hsl(330 100% 65%) 0%, hsl(45 100% 60%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            -{data.discount || '25'}%
          </span>
        </div>
        
        {/* Description */}
        <p className="text-white/70 mb-8 max-w-xs">
          {data.description || 'Na wszystkie vouchery prezentowe'}
        </p>
        
        {/* Validity */}
        <div 
          className="px-6 py-2 rounded-full"
          style={{ 
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <span className="text-sm text-white/60">
            {data.validity || 'Ważne do 31.12.2024'}
          </span>
        </div>
        
        {/* Salon */}
        <p 
          className="absolute bottom-8 text-xs tracking-[0.4em] uppercase"
          style={{ color: 'hsl(330 100% 65%)' }}
        >
          {data.salon || 'Beauty Studio'}
        </p>
      </div>
      
      {/* Border decoration */}
      <div 
        className="absolute inset-6 rounded-2xl pointer-events-none"
        style={{ 
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      />
    </div>
  );
}
