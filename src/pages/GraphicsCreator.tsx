import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Download, 
  ChevronLeft,
  Sparkles,
  Check,
  Loader2,
} from 'lucide-react';

// ====== TEMPLATES ======
type TemplateId = 
  | "christmas-promo" 
  | "elegant-offer" 
  | "spring-fresh" 
  | "summer-glow"
  | "minimal-beauty"
  | "new-year"
  | "valentine"
  | "autumn-vibes";

interface Template {
  id: TemplateId;
  name: string;
  category: "seasonal" | "universal";
}

const templates: Template[] = [
  { id: "christmas-promo", name: "Świąteczna Promocja", category: "seasonal" },
  { id: "new-year", name: "Nowy Rok", category: "seasonal" },
  { id: "valentine", name: "Walentynki", category: "seasonal" },
  { id: "spring-fresh", name: "Wiosenna Świeżość", category: "seasonal" },
  { id: "summer-glow", name: "Letni Blask", category: "seasonal" },
  { id: "autumn-vibes", name: "Jesienne Klimaty", category: "seasonal" },
  { id: "elegant-offer", name: "Elegancka Oferta", category: "universal" },
  { id: "minimal-beauty", name: "Minimalistyczna Uroda", category: "universal" },
];

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null);
  const [filterCategory, setFilterCategory] = useState<"all" | "seasonal" | "universal">("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredTemplates = templates.filter(
    t => filterCategory === "all" || t.category === filterCategory
  );

  const handleExport = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const url = await toPng(previewRef.current, { 
        quality: 1, 
        pixelRatio: 3, 
        cacheBust: true,
      });
      const a = document.createElement('a');
      a.download = `grafika-${selectedTemplate}-${Date.now()}.png`;
      a.href = url;
      a.click();
      toast.success('Grafika została pobrana!');
    } catch (err) {
      console.error(err);
      toast.error('Błąd podczas generowania grafiki');
    } finally {
      setIsGenerating(false);
    }
  };

  // Editor view
  if (selectedTemplate) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedTemplate(null)}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Powrót do galerii
            </Button>

            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-foreground">
                {templates.find(t => t.id === selectedTemplate)?.name}
              </h1>
              <Button 
                onClick={handleExport} 
                disabled={isGenerating}
                className="bg-primary hover:bg-primary/90"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Eksportuj PNG
              </Button>
            </div>

            <div className="flex justify-center">
              <div 
                ref={previewRef} 
                className="shadow-2xl rounded-lg overflow-hidden"
              >
                <TemplateRenderer templateId={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Gallery view
  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Kreator Grafik</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Wybierz szablon
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Profesjonalne szablony grafik dla Twojego salonu beauty
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 mb-10">
            {[
              { value: "all", label: "Wszystkie" },
              { value: "seasonal", label: "Sezonowe" },
              { value: "universal", label: "Uniwersalne" },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={filterCategory === filter.value ? "default" : "outline"}
                onClick={() => setFilterCategory(filter.value as typeof filterCategory)}
                className="px-6"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => setSelectedTemplate(template.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const TemplateCard = ({ 
  template, 
  onClick 
}: { 
  template: Template; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card"
    >
      {/* Preview - scaled down */}
      <div className="aspect-square overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div 
            className="origin-center"
            style={{ 
              transform: 'scale(0.25)', 
              width: '400%', 
              height: '400%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TemplateRenderer templateId={template.id} />
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {template.name}
        </p>
        <p className="text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          {template.category === "seasonal" ? "Sezonowy" : "Uniwersalny"}
        </p>
      </div>

      {/* Permanent label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent group-hover:opacity-0 transition-opacity">
        <p className="text-foreground font-medium text-sm">{template.name}</p>
      </div>
    </button>
  );
};

const TemplateRenderer = ({ templateId }: { templateId: TemplateId }) => {
  switch (templateId) {
    case "christmas-promo":
      return <ChristmasPromoTemplate />;
    case "elegant-offer":
      return <ElegantOfferTemplate />;
    case "spring-fresh":
      return <SpringFreshTemplate />;
    case "summer-glow":
      return <SummerGlowTemplate />;
    case "minimal-beauty":
      return <MinimalBeautyTemplate />;
    case "new-year":
      return <NewYearTemplate />;
    case "valentine":
      return <ValentineTemplate />;
    case "autumn-vibes":
      return <AutumnVibesTemplate />;
    default:
      return null;
  }
};

// === TEMPLATE COMPONENTS ===

const ChristmasPromoTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: '#0c0404',
    }}
  >
    {/* Subtle texture */}
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(139,69,69,0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(139,69,69,0.2) 0%, transparent 50%)`,
      }}
    />

    {/* Gold line accents */}
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #c9a962, transparent)' }} />
    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #c9a962, transparent)' }} />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-24">
      <p 
        className="text-2xl tracking-[0.5em] uppercase mb-10"
        style={{ color: '#c9a962' }}
      >
        Świąteczna
      </p>
      
      <h1 
        className="text-[140px] font-extralight leading-none mb-6"
        style={{ color: '#ffffff' }}
      >
        -30%
      </h1>
      
      <div className="w-40 h-[1px] mb-10" style={{ background: '#c9a962' }} />
      
      <p 
        className="text-4xl font-light mb-6"
        style={{ color: 'rgba(255,255,255,0.8)' }}
      >
        na wszystkie zabiegi
      </p>
      
      <p 
        className="text-xl tracking-[0.3em]"
        style={{ color: '#c9a962' }}
      >
        DO 31 GRUDNIA
      </p>
    </div>
  </div>
);

const ElegantOfferTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: '#0a0a0a',
    }}
  >
    {/* Geometric accents */}
    <div 
      className="absolute top-24 right-24 w-48 h-48 border rotate-45"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    />
    <div 
      className="absolute bottom-24 left-24 w-36 h-36 border rotate-12"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col justify-center px-28">
      <p 
        className="text-lg tracking-[0.6em] uppercase mb-10"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Ekskluzywna oferta
      </p>
      
      <h1 
        className="text-[110px] font-extralight leading-[0.85] mb-10"
        style={{ color: '#ffffff' }}
      >
        Odkryj<br />
        <span className="font-normal">Piękno</span>
      </h1>
      
      <div 
        className="w-28 h-[2px] mb-10"
        style={{ background: 'linear-gradient(90deg, #e879a9, #ec4899)' }}
      />
      
      <p 
        className="text-2xl font-light max-w-lg mb-14"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Profesjonalne zabiegi pielęgnacyjne dla Twojej skóry
      </p>
      
      <div 
        className="inline-block px-10 py-5 border self-start"
        style={{ borderColor: 'rgba(255,255,255,0.15)' }}
      >
        <span 
          className="text-sm tracking-[0.25em] uppercase"
          style={{ color: '#ffffff' }}
        >
          Umów wizytę
        </span>
      </div>
    </div>
  </div>
);

const SpringFreshTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: 'linear-gradient(135deg, #f9faf9 0%, #e8f4e8 100%)',
    }}
  >
    {/* Soft shapes */}
    <div 
      className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full"
      style={{ background: 'rgba(180,210,180,0.4)' }}
    />
    <div 
      className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full"
      style={{ background: 'rgba(160,195,160,0.3)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-24">
      <p className="text-7xl mb-10">🌿</p>
      
      <p 
        className="text-xl tracking-[0.4em] uppercase mb-8"
        style={{ color: '#4a7c4a' }}
      >
        Wiosenna kolekcja
      </p>
      
      <h1 
        className="text-[90px] font-light leading-tight mb-10"
        style={{ color: '#2d4d2d' }}
      >
        Odnowa<br />& Świeżość
      </h1>
      
      <div className="w-24 h-[2px] mb-10" style={{ background: '#4a7c4a' }} />
      
      <p 
        className="text-2xl max-w-xl"
        style={{ color: 'rgba(74,124,74,0.7)' }}
      >
        Zabiegi regenerujące, które obudzą Twoją skórę po zimie
      </p>
    </div>
  </div>
);

const SummerGlowTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: 'linear-gradient(180deg, #fef6e6 0%, #fdecc8 100%)',
    }}
  >
    {/* Sun rays */}
    <div className="absolute inset-0 flex items-center justify-center opacity-15">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 origin-bottom"
          style={{ 
            height: '60%',
            background: 'linear-gradient(to top, #e8a44a, transparent)',
            transform: `rotate(${i * 22.5}deg)`,
          }}
        />
      ))}
    </div>

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-24">
      <p 
        className="text-xl tracking-[0.5em] uppercase mb-10"
        style={{ color: '#c8863a' }}
      >
        Lato 2024
      </p>
      
      <h1 
        className="text-[100px] font-light leading-none mb-4"
        style={{ color: '#8b5a2b' }}
      >
        Summer
      </h1>
      <h2 
        className="text-[70px] font-extralight italic mb-12"
        style={{ color: '#c8863a' }}
      >
        Glow
      </h2>
      
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-[1px]" style={{ background: '#c8863a' }} />
        <span className="text-3xl" style={{ color: '#c8863a' }}>☀</span>
        <div className="w-20 h-[1px]" style={{ background: '#c8863a' }} />
      </div>
      
      <p 
        className="text-2xl"
        style={{ color: 'rgba(139,90,43,0.65)' }}
      >
        Przygotuj skórę na słońce
      </p>
    </div>
  </div>
);

const MinimalBeautyTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: '#ffffff',
    }}
  >
    {/* Accent line */}
    <div 
      className="absolute left-28 top-0 bottom-0 w-[1px]"
      style={{ background: 'rgba(0,0,0,0.08)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col justify-center pl-48 pr-28">
      <p 
        className="text-sm tracking-[0.6em] uppercase mb-16"
        style={{ color: 'rgba(0,0,0,0.25)' }}
      >
        Beauty Studio
      </p>
      
      <h1 
        className="text-[130px] font-thin leading-[0.8] mb-16"
        style={{ color: '#000000' }}
      >
        Less<br />
        is<br />
        More
      </h1>
      
      <div className="w-20 h-[1px] mb-16" style={{ background: '#000000' }} />
      
      <p 
        className="text-xl font-light"
        style={{ color: 'rgba(0,0,0,0.45)' }}
      >
        Minimalistyczne podejście<br />
        do piękna
      </p>
    </div>

    {/* Corner */}
    <div 
      className="absolute bottom-28 right-28 w-28 h-28"
      style={{ 
        borderRight: '1px solid rgba(0,0,0,0.08)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    />
  </div>
);

const NewYearTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: '#07070f',
    }}
  >
    {/* Stars */}
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: '#ffffff',
          opacity: 0.15 + Math.random() * 0.35,
        }}
      />
    ))}

    {/* Rings */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border"
      style={{ borderColor: 'rgba(201,169,98,0.15)' }}
    />
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border"
      style={{ borderColor: 'rgba(201,169,98,0.08)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center">
      <p 
        className="text-2xl tracking-[0.6em] mb-8"
        style={{ color: '#c9a962' }}
      >
        WITAJ
      </p>
      
      <h1 
        className="text-[200px] font-thin leading-none"
        style={{ color: '#ffffff' }}
      >
        2025
      </h1>
      
      <div className="flex items-center gap-8 my-12">
        <div 
          className="w-24 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #c9a962)' }}
        />
        <span className="text-4xl" style={{ color: '#c9a962' }}>✦</span>
        <div 
          className="w-24 h-[1px]"
          style={{ background: 'linear-gradient(90deg, #c9a962, transparent)' }}
        />
      </div>
      
      <p 
        className="text-3xl font-light"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Nowy rok, nowe piękno
      </p>
    </div>
  </div>
);

const ValentineTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: '#fdf4f5',
    }}
  >
    {/* Subtle hearts */}
    <div className="absolute inset-0 opacity-[0.04]">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-5xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: '#e11d48',
            transform: `rotate(${Math.random() * 40 - 20}deg)`,
          }}
        >
          ♥
        </div>
      ))}
    </div>

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-24">
      <div className="text-6xl mb-10" style={{ color: '#e11d48' }}>♥</div>
      
      <p 
        className="text-xl tracking-[0.4em] uppercase mb-8"
        style={{ color: '#be123c' }}
      >
        14 lutego
      </p>
      
      <h1 
        className="text-[85px] font-light leading-tight mb-10"
        style={{ color: '#881337' }}
      >
        Podaruj<br />Piękno
      </h1>
      
      <div className="w-24 h-[2px] mb-10" style={{ background: '#e11d48' }} />
      
      <p 
        className="text-2xl max-w-lg mb-14"
        style={{ color: 'rgba(190,18,60,0.65)' }}
      >
        Voucher na zabiegi dla ukochanej osoby
      </p>
      
      <div 
        className="px-12 py-5 border rounded-full"
        style={{ borderColor: 'rgba(225,29,72,0.25)' }}
      >
        <span 
          className="text-lg tracking-[0.2em]"
          style={{ color: '#be123c' }}
        >
          ZAMÓW VOUCHER
        </span>
      </div>
    </div>
  </div>
);

const AutumnVibesTemplate = () => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: '1080px', 
      height: '1080px',
      background: 'linear-gradient(145deg, #181310 0%, #2a1f16 100%)',
    }}
  >
    {/* Leaves accent */}
    <div className="absolute top-24 right-36 text-7xl opacity-15" style={{ transform: 'rotate(15deg)' }}>🍂</div>
    <div className="absolute bottom-48 left-28 text-6xl opacity-10" style={{ transform: 'rotate(-12deg)' }}>🍁</div>

    {/* Warm glow */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
      style={{ 
        background: 'radial-gradient(circle, rgba(201,118,58,0.08) 0%, transparent 70%)',
      }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-24">
      <p 
        className="text-xl tracking-[0.5em] uppercase mb-10"
        style={{ color: '#c9763a' }}
      >
        Sezon jesień
      </p>
      
      <h1 
        className="text-[95px] font-light leading-tight mb-8"
        style={{ color: '#f5e6d3' }}
      >
        Czas na<br />Regenerację
      </h1>
      
      <div className="flex items-center gap-5 my-10">
        <div className="w-16 h-[1px]" style={{ background: '#c9763a' }} />
        <span style={{ color: '#c9763a' }}>✦</span>
        <div className="w-16 h-[1px]" style={{ background: '#c9763a' }} />
      </div>
      
      <p 
        className="text-2xl max-w-xl"
        style={{ color: 'rgba(245,230,211,0.55)' }}
      >
        Odżywcze zabiegi przygotowujące skórę na chłodniejsze dni
      </p>
    </div>
  </div>
);
