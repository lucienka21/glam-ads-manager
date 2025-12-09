import { Scissors } from 'lucide-react';

interface PriceListProps {
  data: Record<string, string>;
}

export function PriceList({ data }: PriceListProps) {
  const placeholderImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  
  const services = [
    { name: data.service1 || 'Strzyżenie damskie', price: data.price1 || '89 zł' },
    { name: data.service2 || 'Koloryzacja', price: data.price2 || '249 zł' },
    { name: data.service3 || 'Keratyna', price: data.price3 || '399 zł' },
  ];
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #0a0a0a 0%, #151515 50%, #0f0f0f 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img 
          src={data.image || placeholderImage} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.2) blur(3px)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)'
          }}
        />
      </div>
      
      {/* Pink accent */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 70%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium mb-4"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {data.title || 'Nasze Usługi'}
          </h1>
          
          <div 
            className="h-px w-24 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 100% 60%), transparent)' }}
          />
        </div>
        
        {/* Services list */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex items-center justify-between px-6 py-4 rounded-xl"
              style={{ 
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(330 100% 60% / 0.2), hsl(340 100% 65% / 0.1))',
                    border: '1px solid hsl(330 100% 60% / 0.3)'
                  }}
                >
                  <Scissors className="w-4 h-4" style={{ color: 'hsl(330 100% 65%)' }} />
                </div>
                <span className="text-white font-medium">
                  {service.name}
                </span>
              </div>
              <span 
                className="text-lg font-bold"
                style={{ color: 'hsl(330 100% 65%)' }}
              >
                {service.price}
              </span>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/40">
            Ceny mogą się różnić w zależności od długości włosów
          </p>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div 
        className="absolute top-6 left-6 w-8 h-8 border-t border-l"
        style={{ borderColor: 'hsl(330 100% 60% / 0.4)' }}
      />
      <div 
        className="absolute top-6 right-6 w-8 h-8 border-t border-r"
        style={{ borderColor: 'hsl(330 100% 60% / 0.4)' }}
      />
      <div 
        className="absolute bottom-6 left-6 w-8 h-8 border-b border-l"
        style={{ borderColor: 'hsl(330 100% 60% / 0.4)' }}
      />
      <div 
        className="absolute bottom-6 right-6 w-8 h-8 border-b border-r"
        style={{ borderColor: 'hsl(330 100% 60% / 0.4)' }}
      />
    </div>
  );
}
