import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  Download, 
  RotateCcw, 
  Upload, 
  X, 
  Loader2,
  ZoomIn,
  ZoomOut,
  Snowflake,
  Gift,
  Star,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ====== TEMPLATES ======
type TemplateId = 'christmas-elegance' | 'christmas-promo';

interface Template {
  id: TemplateId;
  name: string;
  description: string;
}

const TEMPLATES: Template[] = [
  { id: 'christmas-elegance', name: 'Świąteczna Elegancja', description: 'Elegancki szablon z zimową aurą' },
  { id: 'christmas-promo', name: 'Świąteczna Promocja', description: 'Promocja z magią świąt' },
];

export default function GraphicsCreator() {
  // State
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('christmas-elegance');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [headline, setHeadline] = useState('Magiczne Święta');
  const [subheadline, setSubheadline] = useState('Podaruj sobie piękno');
  const [discount, setDiscount] = useState('-30%');
  const [originalPrice, setOriginalPrice] = useState('599 zł');
  const [newPrice, setNewPrice] = useState('419 zł');
  const [ctaText, setCtaText] = useState('Zarezerwuj');
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.65);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Maksymalny rozmiar pliku to 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setMainImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const url = await toPng(previewRef.current, { 
        quality: 1, 
        pixelRatio: 3, 
        cacheBust: true,
        skipFonts: true,
      });
      const a = document.createElement('a');
      a.download = `${selectedTemplate}-${Date.now()}.png`;
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

  const resetAll = () => {
    setMainImage(null);
    setSalonName('Beauty Studio');
    setHeadline('Magiczne Święta');
    setSubheadline('Podaruj sobie piękno');
    setDiscount('-30%');
    setOriginalPrice('599 zł');
    setNewPrice('419 zł');
    setCtaText('Zarezerwuj');
    toast.success('Zresetowano');
  };

  // Placeholder
  const placeholderMain = 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80';
  const main = mainImage || placeholderMain;

  // ====== RENDER TEMPLATES ======
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'christmas-elegance':
        return (
          <div 
            className="w-[600px] h-[600px] relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #0a0c14 0%, #111827 50%, #0f172a 100%)',
              fontFamily: "'Playfair Display', Georgia, serif"
            }}
          >
            {/* Animated snow effect - layered particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Large snowflakes - slow fall */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`snow-lg-${i}`}
                  className="absolute animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3 + Math.random() * 0.4,
                    transform: `scale(${0.5 + Math.random() * 0.5})`,
                  }}
                >
                  <Snowflake className="w-3 h-3 text-white/60" />
                </div>
              ))}
              {/* Tiny sparkles */}
              {[...Array(40)].map((_, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white/40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: '0 0 4px rgba(255,255,255,0.6)',
                  }}
                />
              ))}
            </div>

            {/* Subtle gradient overlays for depth */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.08) 0%, transparent 50%)',
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 80% 80%, rgba(236,72,153,0.06) 0%, transparent 50%)',
              }}
            />

            {/* Golden corner ornaments */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                <defs>
                  <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f5e6a3" />
                    <stop offset="100%" stopColor="#b8860b" />
                  </linearGradient>
                </defs>
                <path d="M0,0 L100,0 L100,10 Q50,10 10,50 L10,100 L0,100 Z" fill="url(#gold1)" opacity="0.8" />
                <circle cx="25" cy="25" r="4" fill="url(#gold1)" />
                <circle cx="15" cy="40" r="2" fill="url(#gold1)" />
                <circle cx="40" cy="15" r="2" fill="url(#gold1)" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32" style={{ transform: 'scaleX(-1)' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                <path d="M0,0 L100,0 L100,10 Q50,10 10,50 L10,100 L0,100 Z" fill="url(#gold1)" opacity="0.8" />
                <circle cx="25" cy="25" r="4" fill="url(#gold1)" />
                <circle cx="15" cy="40" r="2" fill="url(#gold1)" />
                <circle cx="40" cy="15" r="2" fill="url(#gold1)" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32" style={{ transform: 'scaleY(-1)' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                <path d="M0,0 L100,0 L100,10 Q50,10 10,50 L10,100 L0,100 Z" fill="url(#gold1)" opacity="0.8" />
                <circle cx="25" cy="25" r="4" fill="url(#gold1)" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32" style={{ transform: 'scale(-1)' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                <path d="M0,0 L100,0 L100,10 Q50,10 10,50 L10,100 L0,100 Z" fill="url(#gold1)" opacity="0.8" />
                <circle cx="25" cy="25" r="4" fill="url(#gold1)" />
              </svg>
            </div>

            {/* Central image with elegant frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Outer glow */}
                <div 
                  className="absolute -inset-4 rounded-full opacity-40 blur-2xl"
                  style={{ background: 'linear-gradient(135deg, #d4af37, #f5e6a3, #b8860b)' }}
                />
                
                {/* Gold frame */}
                <div 
                  className="relative w-64 h-64 rounded-full p-1"
                  style={{ 
                    background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 25%, #d4af37 50%, #b8860b 75%, #d4af37 100%)',
                    boxShadow: '0 0 40px rgba(212,175,55,0.4), inset 0 0 20px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Inner gold ring */}
                  <div 
                    className="w-full h-full rounded-full p-1"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))' }}
                  >
                    <div 
                      className="w-full h-full rounded-full p-0.5"
                      style={{ background: 'linear-gradient(135deg, #b8860b, #f5e6a3, #d4af37)' }}
                    >
                      {/* Image container */}
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img 
                          src={main} 
                          alt="" 
                          className="w-full h-full object-cover"
                          style={{ filter: 'brightness(1.05) contrast(1.05) saturate(1.1)' }}
                        />
                        {/* Subtle overlay for mood */}
                        <div 
                          className="absolute inset-0 rounded-full"
                          style={{ 
                            background: 'linear-gradient(to bottom, transparent 40%, rgba(10,12,20,0.4) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative stars around frame */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Star className="w-5 h-5 text-amber-300 fill-amber-300" style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.8))' }} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <Sparkles className="w-4 h-4 text-amber-200" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))' }} />
                </div>
                <div className="absolute top-1/2 -left-5 -translate-y-1/2">
                  <Star className="w-3 h-3 text-amber-300 fill-amber-300" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))' }} />
                </div>
                <div className="absolute top-1/2 -right-5 -translate-y-1/2">
                  <Star className="w-3 h-3 text-amber-300 fill-amber-300" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))' }} />
                </div>
              </div>
            </div>

            {/* Top salon name */}
            <div className="absolute top-10 left-0 right-0 text-center">
              <div className="inline-block">
                <p 
                  className="text-xs tracking-[0.4em] uppercase mb-1"
                  style={{ 
                    color: 'rgba(212,175,55,0.9)',
                    textShadow: '0 0 20px rgba(212,175,55,0.5)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {salonName}
                </p>
                <div 
                  className="h-px w-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
                />
              </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-8">
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
                <Snowflake className="w-4 h-4 text-amber-300/60" />
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)' }} />
              </div>
              
              {/* Headline */}
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ 
                  background: 'linear-gradient(135deg, #ffffff 0%, #f5e6a3 50%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 30px rgba(212,175,55,0.3)',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {headline}
              </h1>
              
              {/* Subheadline */}
              <p 
                className="text-base mb-5"
                style={{ 
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                }}
              >
                {subheadline}
              </p>
              
              {/* CTA Button */}
              <button
                className="px-8 py-3 rounded-full text-sm font-medium tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 50%, #d4af37 100%)',
                  color: '#0a0c14',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.2)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'christmas-promo':
        return (
          <div 
            className="w-[600px] h-[600px] relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(150deg, #1a0a0a 0%, #2d1515 30%, #1f0f0f 70%, #0d0505 100%)',
              fontFamily: "'Playfair Display', Georgia, serif"
            }}
          >
            {/* Rich red/burgundy gradient overlays */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 30% 0%, rgba(153,27,27,0.25) 0%, transparent 60%)',
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 100% 100%, rgba(127,29,29,0.2) 0%, transparent 50%)',
              }}
            />

            {/* Floating bokeh/glow effects */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`bokeh-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  width: `${30 + Math.random() * 60}px`,
                  height: `${30 + Math.random() * 60}px`,
                  background: `radial-gradient(circle, ${
                    i % 3 === 0 ? 'rgba(212,175,55,0.15)' : 
                    i % 3 === 1 ? 'rgba(239,68,68,0.1)' : 
                    'rgba(255,255,255,0.05)'
                  } 0%, transparent 70%)`,
                  filter: 'blur(1px)',
                }}
              />
            ))}

            {/* Decorative holly/ornament corners */}
            <div className="absolute top-4 left-4">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-amber-400/70" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-amber-400/70" />
              </div>
            </div>

            {/* Main image - diagonal/artistic placement */}
            <div 
              className="absolute right-0 top-0 w-[55%] h-full"
              style={{
                clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
              }}
            >
              <img 
                src={main} 
                alt="" 
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' }}
              />
              {/* Color overlay for mood */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(127,29,29,0.3) 0%, transparent 60%)',
                }}
              />
              {/* Fade to background */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: 'linear-gradient(to right, #1a0a0a 0%, transparent 40%)',
                }}
              />
            </div>

            {/* Golden accent line */}
            <div 
              className="absolute left-[35%] top-[10%] bottom-[10%] w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6), rgba(212,175,55,0.6), transparent)',
              }}
            />

            {/* Content - Left side */}
            <div className="absolute left-8 top-0 bottom-0 w-[45%] flex flex-col justify-center">
              {/* Salon name */}
              <p 
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ 
                  color: 'rgba(212,175,55,0.8)',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                }}
              >
                {salonName}
              </p>

              {/* Holiday badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 w-fit"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <Snowflake className="w-3 h-3 text-amber-400" />
                <span 
                  className="text-xs tracking-wider uppercase"
                  style={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Świąteczna Oferta
                </span>
              </div>

              {/* Headline */}
              <h1 
                className="text-4xl font-bold leading-tight mb-4"
                style={{ 
                  color: '#ffffff',
                  textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {headline}
              </h1>

              {/* Subheadline */}
              <p 
                className="text-sm mb-8 leading-relaxed"
                style={{ 
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                }}
              >
                {subheadline}
              </p>

              {/* Price section */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  {/* Discount badge */}
                  <div 
                    className="px-3 py-1 rounded-md"
                    style={{
                      background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                      boxShadow: '0 4px 15px rgba(220,38,38,0.4)',
                    }}
                  >
                    <span 
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {discount}
                    </span>
                  </div>
                  
                  {/* Original price */}
                  <span 
                    className="text-lg line-through"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {originalPrice}
                  </span>
                </div>
                
                {/* New price */}
                <div 
                  className="text-4xl font-bold"
                  style={{ 
                    background: 'linear-gradient(135deg, #d4af37, #f5e6a3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {newPrice}
                </div>
              </div>

              {/* CTA */}
              <button
                className="px-8 py-3 rounded-full text-sm font-medium w-fit"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 50%, #d4af37 100%)',
                  color: '#1a0a0a',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.2)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {ctaText}
              </button>
            </div>

            {/* Bottom decorative stars */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className="w-3 h-3"
                  style={{ 
                    color: i === 2 ? 'rgba(212,175,55,0.8)' : 'rgba(212,175,55,0.4)',
                    fill: i === 2 ? 'rgba(212,175,55,0.8)' : 'transparent',
                    filter: i === 2 ? 'drop-shadow(0 0 6px rgba(212,175,55,0.6))' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left Panel - Controls */}
        <div className="w-[400px] border-r border-border bg-card/50 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground mb-1">Kreator Grafik</h1>
            <p className="text-sm text-muted-foreground">Szablony świąteczne</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8">
              {/* Template Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Wybierz szablon</Label>
                <div className="grid grid-cols-1 gap-3">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all duration-200",
                        selectedTemplate === template.id
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                          : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            selectedTemplate === template.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          <Snowflake className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{template.name}</p>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Zdjęcie</Label>
                <div 
                  className={cn(
                    "relative aspect-video rounded-xl border-2 border-dashed overflow-hidden transition-all",
                    mainImage ? "border-primary/50" : "border-border hover:border-primary/30"
                  )}
                >
                  {mainImage ? (
                    <>
                      <img src={mainImage} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setMainImage(null)}
                        className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-secondary/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Kliknij aby dodać</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-foreground">Treść</Label>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Nazwa salonu</label>
                    <Input 
                      value={salonName} 
                      onChange={(e) => setSalonName(e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Nagłówek</label>
                    <Input 
                      value={headline} 
                      onChange={(e) => setHeadline(e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Podtytuł</label>
                    <Input 
                      value={subheadline} 
                      onChange={(e) => setSubheadline(e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                  </div>

                  {selectedTemplate === 'christmas-promo' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Rabat</label>
                          <Input 
                            value={discount} 
                            onChange={(e) => setDiscount(e.target.value)}
                            className="bg-secondary/50 border-border"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Stara cena</label>
                          <Input 
                            value={originalPrice} 
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            className="bg-secondary/50 border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Nowa cena</label>
                        <Input 
                          value={newPrice} 
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="bg-secondary/50 border-border"
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Przycisk CTA</label>
                    <Input 
                      value={ctaText} 
                      onChange={(e) => setCtaText(e.target.value)}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="p-4 border-t border-border space-y-3">
            <Button 
              onClick={handleDownload} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generowanie...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz PNG
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetAll}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetuj
            </Button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-background flex flex-col">
          {/* Preview toolbar */}
          <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-card/30">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Podgląd</span>
              <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-secondary">
                {currentTemplate?.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.1))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-12 text-center">
                {Math.round(previewScale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview canvas */}
          <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <div 
              className="transition-transform duration-200"
              style={{ transform: `scale(${previewScale})` }}
            >
              <div 
                ref={previewRef}
                className="shadow-2xl rounded-lg overflow-hidden"
                style={{ 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)'
                }}
              >
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
