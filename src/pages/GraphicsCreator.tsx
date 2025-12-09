import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Download, 
  ChevronLeft,
  Sparkles,
  Loader2,
  Snowflake,
  Star,
  Gift,
  Heart,
  Sun,
  Leaf,
} from 'lucide-react';

// ====== TEMPLATES ======
type TemplateId = 
  | "christmas-promo" 
  | "christmas-elegance"
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
  { id: "christmas-elegance", name: "Świąteczna Elegancja", category: "seasonal" },
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

            <div className="flex justify-center overflow-auto">
              <div 
                ref={previewRef} 
                className="shadow-2xl rounded-lg overflow-hidden flex-shrink-0"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card aspect-square"
    >
      {/* Preview - scaled down */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 origin-top-left"
          style={{ 
            transform: 'scale(0.2)', 
            width: '600px',
            height: '600px',
          }}
        >
          <TemplateRenderer templateId={template.id} size="small" />
        </div>
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Info on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-semibold text-lg">{template.name}</p>
        <p className="text-white/60 text-sm">
          {template.category === "seasonal" ? "Sezonowy" : "Uniwersalny"}
        </p>
      </div>

      {/* Permanent bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card via-card to-transparent group-hover:opacity-0 transition-opacity">
        <p className="text-foreground font-medium">{template.name}</p>
      </div>
    </button>
  );
};

const TemplateRenderer = ({ templateId, size = "full" }: { templateId: TemplateId; size?: "small" | "full" }) => {
  const dimensions = size === "small" ? { width: 600, height: 600 } : { width: 1080, height: 1080 };
  
  switch (templateId) {
    case "christmas-elegance":
      return <ChristmasEleganceTemplate {...dimensions} />;
    case "christmas-promo":
      return <ChristmasPromoTemplate {...dimensions} />;
    case "elegant-offer":
      return <ElegantOfferTemplate {...dimensions} />;
    case "spring-fresh":
      return <SpringFreshTemplate {...dimensions} />;
    case "summer-glow":
      return <SummerGlowTemplate {...dimensions} />;
    case "minimal-beauty":
      return <MinimalBeautyTemplate {...dimensions} />;
    case "new-year":
      return <NewYearTemplate {...dimensions} />;
    case "valentine":
      return <ValentineTemplate {...dimensions} />;
    case "autumn-vibes":
      return <AutumnVibesTemplate {...dimensions} />;
    default:
      return null;
  }
};

// === TEMPLATE COMPONENTS ===

interface TemplateProps {
  width: number;
  height: number;
}

const ChristmasEleganceTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(135deg, #0a0c14 0%, #111827 50%, #0f172a 100%)',
      fontFamily: "'Playfair Display', Georgia, serif",
    }}
  >
    {/* Snowflakes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <div
          key={`snow-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        >
          <Snowflake 
            className="text-white/50" 
            style={{ 
              width: `${12 + Math.random() * 16}px`,
              height: `${12 + Math.random() * 16}px`,
            }} 
          />
        </div>
      ))}
      {/* Sparkle dots */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px rgba(255,255,255,0.6)',
          }}
        />
      ))}
    </div>

    {/* Gradient overlays */}
    <div 
      className="absolute inset-0"
      style={{ background: 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.1) 0%, transparent 50%)' }}
    />
    <div 
      className="absolute inset-0"
      style={{ background: 'radial-gradient(circle at 80% 80%, rgba(236,72,153,0.08) 0%, transparent 50%)' }}
    />

    {/* Golden corner ornaments */}
    <svg className="absolute top-0 left-0 w-40 h-40 opacity-70" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f5e6a3" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <path d="M0,0 L100,0 L100,12 Q50,12 12,50 L12,100 L0,100 Z" fill="url(#goldGrad)" opacity="0.8" />
      <circle cx="28" cy="28" r="5" fill="url(#goldGrad)" />
      <circle cx="18" cy="45" r="3" fill="url(#goldGrad)" />
      <circle cx="45" cy="18" r="3" fill="url(#goldGrad)" />
    </svg>
    <svg className="absolute top-0 right-0 w-40 h-40 opacity-70" viewBox="0 0 100 100" style={{ transform: 'scaleX(-1)' }}>
      <path d="M0,0 L100,0 L100,12 Q50,12 12,50 L12,100 L0,100 Z" fill="url(#goldGrad)" opacity="0.8" />
      <circle cx="28" cy="28" r="5" fill="url(#goldGrad)" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-40 h-40 opacity-70" viewBox="0 0 100 100" style={{ transform: 'scaleY(-1)' }}>
      <path d="M0,0 L100,0 L100,12 Q50,12 12,50 L12,100 L0,100 Z" fill="url(#goldGrad)" opacity="0.8" />
      <circle cx="28" cy="28" r="5" fill="url(#goldGrad)" />
    </svg>
    <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-70" viewBox="0 0 100 100" style={{ transform: 'scale(-1)' }}>
      <path d="M0,0 L100,0 L100,12 Q50,12 12,50 L12,100 L0,100 Z" fill="url(#goldGrad)" opacity="0.8" />
      <circle cx="28" cy="28" r="5" fill="url(#goldGrad)" />
    </svg>

    {/* Central decorative frame */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Outer glow */}
        <div 
          className="absolute -inset-6 rounded-full opacity-50 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #d4af37, #f5e6a3, #b8860b)' }}
        />
        
        {/* Gold ring frame */}
        <div 
          className="relative rounded-full p-1.5"
          style={{ 
            width: width * 0.42,
            height: width * 0.42,
            background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 25%, #d4af37 50%, #b8860b 75%, #d4af37 100%)',
            boxShadow: '0 0 60px rgba(212,175,55,0.5), inset 0 0 30px rgba(0,0,0,0.3)',
          }}
        >
          <div 
            className="w-full h-full rounded-full p-1"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))' }}
          >
            <div 
              className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
            >
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-amber-300 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.8))' }} />
                <p className="text-amber-200/60 text-sm tracking-widest">TWOJE ZDJĘCIE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stars around */}
        <Star className="absolute -top-8 left-1/2 -translate-x-1/2 w-7 h-7 text-amber-300 fill-amber-300" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.8))' }} />
        <Star className="absolute top-1/2 -left-7 -translate-y-1/2 w-5 h-5 text-amber-300 fill-amber-300" style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.6))' }} />
        <Star className="absolute top-1/2 -right-7 -translate-y-1/2 w-5 h-5 text-amber-300 fill-amber-300" style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.6))' }} />
      </div>
    </div>

    {/* Top salon name */}
    <div className="absolute top-12 left-0 right-0 text-center">
      <p 
        className="text-sm tracking-[0.5em] uppercase"
        style={{ 
          color: 'rgba(212,175,55,0.9)',
          textShadow: '0 0 20px rgba(212,175,55,0.5)',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 500,
        }}
      >
        Beauty Studio
      </p>
      <div 
        className="h-px w-40 mx-auto mt-3"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
      />
    </div>

    {/* Bottom content */}
    <div className="absolute bottom-12 left-0 right-0 text-center px-12">
      <div className="flex items-center justify-center gap-6 mb-5">
        <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
        <Snowflake className="w-5 h-5 text-amber-300/70" />
        <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
      </div>
      
      <h1 
        className="text-5xl font-bold mb-4"
        style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f5e6a3 50%, #d4af37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 30px rgba(212,175,55,0.3)',
        }}
      >
        Magiczne Święta
      </h1>
      
      <p 
        className="text-lg mb-6"
        style={{ 
          color: 'rgba(255,255,255,0.7)',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
        }}
      >
        Podaruj sobie piękno
      </p>
      
      <button
        className="px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 50%, #d4af37 100%)',
          color: '#0a0c14',
          boxShadow: '0 4px 30px rgba(212,175,55,0.5), 0 0 50px rgba(212,175,55,0.3)',
        }}
      >
        Zarezerwuj
      </button>
    </div>
  </div>
);

const ChristmasPromoTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(150deg, #1a0a0a 0%, #2d1515 30%, #1f0f0f 70%, #0d0505 100%)',
      fontFamily: "'Playfair Display', Georgia, serif",
    }}
  >
    {/* Rich overlays */}
    <div 
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(153,27,27,0.3) 0%, transparent 60%)' }}
    />
    <div 
      className="absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(127,29,29,0.25) 0%, transparent 50%)' }}
    />

    {/* Bokeh effects */}
    {[...Array(15)].map((_, i) => (
      <div
        key={`bokeh-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          width: `${40 + Math.random() * 80}px`,
          height: `${40 + Math.random() * 80}px`,
          background: `radial-gradient(circle, ${
            i % 3 === 0 ? 'rgba(212,175,55,0.2)' : 
            i % 3 === 1 ? 'rgba(239,68,68,0.15)' : 
            'rgba(255,255,255,0.08)'
          } 0%, transparent 70%)`,
          filter: 'blur(2px)',
        }}
      />
    ))}

    {/* Corner decorations */}
    <div className="absolute top-6 left-6">
      <div className="relative">
        <div 
          className="w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)', filter: 'blur(10px)' }}
        />
        <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-400/80" />
      </div>
    </div>
    <div className="absolute top-6 right-6">
      <div className="relative">
        <div 
          className="w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)', filter: 'blur(10px)' }}
        />
        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-400/80" />
      </div>
    </div>

    {/* Main content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-16">
      <p 
        className="text-xl tracking-[0.6em] uppercase mb-8"
        style={{ 
          color: '#c9a962',
          textShadow: '0 0 20px rgba(201,169,98,0.5)',
        }}
      >
        Świąteczna Oferta
      </p>

      <div 
        className="relative mb-8"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(127,29,29,0.1) 100%)',
          padding: '40px 60px',
          borderRadius: '20px',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        <h1 
          className="text-[140px] font-bold leading-none"
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f5e6a3 50%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(212,175,55,0.4)',
          }}
        >
          -30%
        </h1>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6))' }} />
        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
        <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.6), transparent)' }} />
      </div>
      
      <p 
        className="text-3xl font-light mb-4"
        style={{ color: 'rgba(255,255,255,0.85)' }}
      >
        na wszystkie zabiegi
      </p>
      
      <p 
        className="text-lg tracking-[0.3em]"
        style={{ color: '#c9a962' }}
      >
        DO 31 GRUDNIA
      </p>
    </div>

    {/* Bottom ornament */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-3">
        <Snowflake className="w-4 h-4 text-amber-400/50" />
        <div className="w-32 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
        <Snowflake className="w-4 h-4 text-amber-400/50" />
      </div>
    </div>
  </div>
);

const NewYearTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(135deg, #050510 0%, #0a0a1f 50%, #0f0f2a 100%)',
    }}
  >
    {/* Stars background */}
    {[...Array(60)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 3}px`,
          height: `${1 + Math.random() * 3}px`,
          background: '#ffffff',
          opacity: 0.2 + Math.random() * 0.5,
          boxShadow: '0 0 6px rgba(255,255,255,0.5)',
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}

    {/* Golden rings */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ 
        width: width * 0.65,
        height: width * 0.65,
        border: '1px solid rgba(212,175,55,0.2)',
        boxShadow: '0 0 40px rgba(212,175,55,0.1)',
      }}
    />
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ 
        width: width * 0.55,
        height: width * 0.55,
        border: '1px solid rgba(212,175,55,0.12)',
      }}
    />
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ 
        width: width * 0.45,
        height: width * 0.45,
        border: '1px solid rgba(212,175,55,0.08)',
      }}
    />

    {/* Firework bursts */}
    <div className="absolute top-20 left-20">
      <Sparkles className="w-10 h-10 text-amber-400/40" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }} />
    </div>
    <div className="absolute top-32 right-24">
      <Star className="w-8 h-8 text-amber-300/50 fill-amber-300/50" style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.4))' }} />
    </div>
    <div className="absolute bottom-40 left-32">
      <Star className="w-6 h-6 text-amber-400/30 fill-amber-400/30" />
    </div>

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center">
      <p 
        className="text-2xl tracking-[0.7em] mb-10"
        style={{ 
          color: '#c9a962',
          textShadow: '0 0 30px rgba(201,169,98,0.5)',
        }}
      >
        WITAJ
      </p>
      
      <h1 
        className="text-[220px] font-thin leading-none mb-8"
        style={{ 
          color: '#ffffff',
          textShadow: '0 0 80px rgba(212,175,55,0.3)',
        }}
      >
        2025
      </h1>
      
      <div className="flex items-center gap-10 mb-10">
        <div 
          className="w-28 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #c9a962)' }}
        />
        <Star className="w-8 h-8 text-amber-400 fill-amber-400" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.8))' }} />
        <div 
          className="w-28 h-[1px]"
          style={{ background: 'linear-gradient(90deg, #c9a962, transparent)' }}
        />
      </div>
      
      <p 
        className="text-3xl font-light"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        Nowy rok, nowe piękno
      </p>
    </div>
  </div>
);

const ValentineTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(135deg, #fdf2f4 0%, #fce7ea 50%, #fad4db 100%)',
    }}
  >
    {/* Floating hearts */}
    {[...Array(20)].map((_, i) => (
      <Heart
        key={i}
        className="absolute animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${16 + Math.random() * 24}px`,
          height: `${16 + Math.random() * 24}px`,
          color: '#e11d48',
          opacity: 0.06 + Math.random() * 0.08,
          transform: `rotate(${Math.random() * 30 - 15}deg)`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}

    {/* Soft glow */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 70%)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-20">
      <Heart 
        className="w-20 h-20 mb-10" 
        style={{ 
          color: '#e11d48', 
          fill: '#e11d48',
          filter: 'drop-shadow(0 0 20px rgba(225,29,72,0.4))',
        }} 
      />
      
      <p 
        className="text-2xl tracking-[0.5em] uppercase mb-8"
        style={{ color: '#be123c' }}
      >
        14 lutego
      </p>
      
      <h1 
        className="text-[100px] font-light leading-tight mb-10"
        style={{ color: '#881337' }}
      >
        Podaruj<br />Piękno
      </h1>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="w-20 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #e11d48)' }} />
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        <div className="w-20 h-[2px]" style={{ background: 'linear-gradient(90deg, #e11d48, transparent)' }} />
      </div>
      
      <p 
        className="text-2xl max-w-xl mb-12"
        style={{ color: 'rgba(190,18,60,0.7)' }}
      >
        Voucher na zabiegi dla ukochanej osoby
      </p>
      
      <button
        className="px-14 py-5 rounded-full text-lg tracking-widest"
        style={{
          background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(225,29,72,0.4)',
        }}
      >
        ZAMÓW VOUCHER
      </button>
    </div>
  </div>
);

const SpringFreshTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
    }}
  >
    {/* Soft circles */}
    <div 
      className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
      style={{ background: 'rgba(134,239,172,0.4)' }}
    />
    <div 
      className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full"
      style={{ background: 'rgba(74,222,128,0.3)' }}
    />
    <div 
      className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full"
      style={{ background: 'rgba(134,239,172,0.2)' }}
    />

    {/* Leaf decorations */}
    <Leaf className="absolute top-16 right-20 w-12 h-12 text-green-500/30 rotate-45" />
    <Leaf className="absolute bottom-24 left-16 w-10 h-10 text-green-600/25 -rotate-12" />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-20">
      <div className="text-8xl mb-10" style={{ filter: 'drop-shadow(0 4px 20px rgba(34,197,94,0.3))' }}>🌸</div>
      
      <p 
        className="text-2xl tracking-[0.5em] uppercase mb-8"
        style={{ color: '#16a34a' }}
      >
        Wiosenna kolekcja
      </p>
      
      <h1 
        className="text-[100px] font-light leading-tight mb-10"
        style={{ color: '#166534' }}
      >
        Odnowa<br />& Świeżość
      </h1>
      
      <div className="w-28 h-[2px] mb-10" style={{ background: 'linear-gradient(90deg, transparent, #16a34a, transparent)' }} />
      
      <p 
        className="text-2xl max-w-xl"
        style={{ color: 'rgba(22,163,74,0.7)' }}
      >
        Zabiegi regenerujące, które obudzą Twoją skórę po zimie
      </p>
    </div>
  </div>
);

const SummerGlowTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
    }}
  >
    {/* Sun rays */}
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 origin-bottom"
          style={{ 
            height: '55%',
            background: 'linear-gradient(to top, rgba(245,158,11,0.25), transparent)',
            transform: `rotate(${i * 18}deg)`,
          }}
        />
      ))}
    </div>

    {/* Central glow */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
      style={{ 
        background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-20">
      <Sun 
        className="w-20 h-20 mb-10" 
        style={{ 
          color: '#f59e0b',
          filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.5))',
        }} 
      />
      
      <p 
        className="text-2xl tracking-[0.6em] uppercase mb-10"
        style={{ color: '#b45309' }}
      >
        Lato 2024
      </p>
      
      <h1 
        className="text-[110px] font-light leading-none mb-4"
        style={{ color: '#78350f' }}
      >
        Summer
      </h1>
      <h2 
        className="text-[80px] font-extralight italic mb-12"
        style={{ 
          color: '#b45309',
          textShadow: '0 4px 20px rgba(180,83,9,0.2)',
        }}
      >
        Glow
      </h2>
      
      <div className="flex items-center gap-8 mb-10">
        <div className="w-24 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #d97706)' }} />
        <Sun className="w-6 h-6 text-amber-500" />
        <div className="w-24 h-[1px]" style={{ background: 'linear-gradient(90deg, #d97706, transparent)' }} />
      </div>
      
      <p 
        className="text-2xl"
        style={{ color: 'rgba(120,53,15,0.7)' }}
      >
        Przygotuj skórę na słońce
      </p>
    </div>
  </div>
);

const AutumnVibesTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(145deg, #1c1410 0%, #2a1f16 50%, #1f1812 100%)',
    }}
  >
    {/* Warm glow */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
      style={{ 
        background: 'radial-gradient(circle, rgba(180,100,50,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />

    {/* Falling leaves */}
    <div className="absolute top-20 right-28 text-8xl opacity-20" style={{ transform: 'rotate(20deg)' }}>🍂</div>
    <div className="absolute top-40 left-20 text-6xl opacity-15" style={{ transform: 'rotate(-15deg)' }}>🍁</div>
    <div className="absolute bottom-32 right-40 text-5xl opacity-12" style={{ transform: 'rotate(35deg)' }}>🍂</div>
    <div className="absolute bottom-48 left-32 text-7xl opacity-18" style={{ transform: 'rotate(-25deg)' }}>🍁</div>

    {/* Decorative circles */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ 
        width: width * 0.5,
        height: width * 0.5,
        border: '1px solid rgba(180,100,50,0.15)',
      }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col items-center justify-center text-center px-20">
      <Leaf 
        className="w-16 h-16 mb-10" 
        style={{ 
          color: '#c9763a',
          filter: 'drop-shadow(0 0 20px rgba(201,118,58,0.4))',
        }} 
      />
      
      <p 
        className="text-2xl tracking-[0.6em] uppercase mb-10"
        style={{ color: '#c9763a' }}
      >
        Sezon jesień
      </p>
      
      <h1 
        className="text-[100px] font-light leading-tight mb-8"
        style={{ color: '#f5e6d3' }}
      >
        Czas na<br />Regenerację
      </h1>
      
      <div className="flex items-center gap-6 my-10">
        <div className="w-20 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #c9763a)' }} />
        <Leaf className="w-5 h-5 text-orange-400/70" />
        <div className="w-20 h-[1px]" style={{ background: 'linear-gradient(90deg, #c9763a, transparent)' }} />
      </div>
      
      <p 
        className="text-2xl max-w-xl"
        style={{ color: 'rgba(245,230,211,0.6)' }}
      >
        Odżywcze zabiegi przygotowujące skórę na chłodniejsze dni
      </p>
    </div>
  </div>
);

const ElegantOfferTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0f0f0f 100%)',
    }}
  >
    {/* Subtle pink glow */}
    <div 
      className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
      style={{ 
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />

    {/* Geometric accents */}
    <div 
      className="absolute top-24 right-24 w-56 h-56 border rotate-45"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    />
    <div 
      className="absolute bottom-24 left-24 w-40 h-40 border rotate-12"
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    />

    {/* Accent line */}
    <div 
      className="absolute left-20 top-0 bottom-0 w-[1px]"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(236,72,153,0.3), transparent)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col justify-center px-32">
      <p 
        className="text-lg tracking-[0.7em] uppercase mb-12"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Ekskluzywna oferta
      </p>
      
      <h1 
        className="text-[120px] font-extralight leading-[0.85] mb-12"
        style={{ color: '#ffffff' }}
      >
        Odkryj<br />
        <span className="font-normal" style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Piękno</span>
      </h1>
      
      <div 
        className="w-32 h-[2px] mb-12"
        style={{ background: 'linear-gradient(90deg, #ec4899, #8b5cf6)' }}
      />
      
      <p 
        className="text-2xl font-light max-w-lg mb-16"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Profesjonalne zabiegi pielęgnacyjne dla Twojej skóry
      </p>
      
      <button
        className="self-start px-12 py-5 border"
        style={{ 
          borderColor: 'rgba(236,72,153,0.3)',
          background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, transparent 100%)',
        }}
      >
        <span 
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: '#ec4899' }}
        >
          Umów wizytę
        </span>
      </button>
    </div>

    {/* Corner accent */}
    <Sparkles 
      className="absolute bottom-20 right-20 w-10 h-10" 
      style={{ color: 'rgba(236,72,153,0.3)' }} 
    />
  </div>
);

const MinimalBeautyTemplate = ({ width, height }: TemplateProps) => (
  <div 
    className="relative overflow-hidden"
    style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      background: '#ffffff',
    }}
  >
    {/* Subtle gradient */}
    <div 
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%)' }}
    />

    {/* Accent lines */}
    <div 
      className="absolute left-32 top-0 bottom-0 w-[1px]"
      style={{ background: 'rgba(0,0,0,0.06)' }}
    />
    <div 
      className="absolute left-36 top-20 bottom-20 w-[1px]"
      style={{ background: 'rgba(0,0,0,0.03)' }}
    />

    {/* Content */}
    <div className="relative h-full flex flex-col justify-center pl-52 pr-32">
      <p 
        className="text-sm tracking-[0.7em] uppercase mb-20"
        style={{ color: 'rgba(0,0,0,0.25)' }}
      >
        Beauty Studio
      </p>
      
      <h1 
        className="text-[140px] font-thin leading-[0.75] mb-20"
        style={{ color: '#000000' }}
      >
        Less<br />
        is<br />
        More
      </h1>
      
      <div className="w-24 h-[1px] mb-16" style={{ background: '#000000' }} />
      
      <p 
        className="text-xl font-light"
        style={{ color: 'rgba(0,0,0,0.4)' }}
      >
        Minimalistyczne podejście<br />
        do piękna
      </p>
    </div>

    {/* Corner detail */}
    <div 
      className="absolute bottom-32 right-32 w-32 h-32"
      style={{ 
        borderRight: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    />
    <div 
      className="absolute bottom-28 right-28 w-4 h-4 rounded-full"
      style={{ background: 'rgba(0,0,0,0.08)' }}
    />
  </div>
);
