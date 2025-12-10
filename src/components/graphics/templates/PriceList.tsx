interface PriceListProps {
  data: Record<string, string>;
}

export function PriceList({ data }: PriceListProps) {
  return (
    <div 
      className="w-[540px] h-[540px] relative overflow-hidden"
      style={{ 
        background: '#0a0a0a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at top right, hsl(330 100% 15% / 0.3) 0%, transparent 60%)'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col">
        {/* Header */}
        <div className="mb-auto">
          <p 
            className="text-xs tracking-[0.4em] uppercase mb-2"
            style={{ color: 'hsl(330 100% 65%)' }}
          >
            {data.salon || 'Beauty Studio'}
          </p>
          <h2 className="text-2xl font-light text-white">
            {data.title || 'Cennik usług'}
          </h2>
        </div>
        
        {/* Services */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
            <span className="text-white/80">{data.service1 || 'Strzyżenie damskie'}</span>
            <span className="text-white font-light">{data.price1 || '120'} zł</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
            <span className="text-white/80">{data.service2 || 'Koloryzacja'}</span>
            <span className="text-white font-light">{data.price2 || '250'} zł</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
            <span className="text-white/80">{data.service3 || 'Stylizacja'}</span>
            <span className="text-white font-light">{data.price3 || '80'} zł</span>
          </div>
        </div>
        
        {/* Footer accent */}
        <div className="mt-auto pt-8">
          <div 
            className="h-px w-12"
            style={{ background: 'hsl(330 100% 60%)' }}
          />
        </div>
      </div>
    </div>
  );
}
