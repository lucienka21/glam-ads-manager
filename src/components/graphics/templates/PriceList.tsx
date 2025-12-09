interface PriceListProps {
  data: Record<string, string>;
}

export function PriceList({ data }: PriceListProps) {
  const services = [
    { name: data.service1 || 'Strzyżenie damskie', price: data.price1 || '120' },
    { name: data.service2 || 'Koloryzacja', price: data.price2 || '250' },
    { name: data.service3 || 'Modelowanie', price: data.price3 || '80' },
    { name: data.service4 || 'Zabieg regenerujący', price: data.price4 || '150' },
  ];
  
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Subtle accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(330 100% 60%), transparent 60%)' }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-10 flex flex-col">
        {/* Header */}
        <div className="text-center mb-10">
          <p 
            className="text-xs tracking-[0.4em] uppercase font-medium mb-3"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          <h2 className="text-3xl font-bold text-white mb-2">
            Cennik usług
          </h2>
          <div 
            className="h-px w-20 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(330 100% 60%), transparent)' }}
          />
        </div>
        
        {/* Services list */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-4 px-6 rounded-xl"
              style={{ 
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'hsl(330 100% 60%)' }}
                />
                <span className="text-white font-medium">
                  {service.name}
                </span>
              </div>
              <span 
                className="text-lg font-bold"
                style={{ color: 'hsl(330 100% 65%)' }}
              >
                {service.price} zł
              </span>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-white/40">
            {data.note || 'Rezerwacja wymagana • Ceny mogą się różnić w zależności od długości włosów'}
          </p>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div 
        className="absolute top-6 left-6 w-10 h-10"
        style={{ 
          borderLeft: '1px solid hsl(330 100% 60% / 0.3)',
          borderTop: '1px solid hsl(330 100% 60% / 0.3)'
        }}
      />
      <div 
        className="absolute bottom-6 right-6 w-10 h-10"
        style={{ 
          borderRight: '1px solid hsl(330 100% 60% / 0.3)',
          borderBottom: '1px solid hsl(330 100% 60% / 0.3)'
        }}
      />
    </div>
  );
}
