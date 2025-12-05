import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Download, RotateCcw, Sparkles, Loader2, Upload, X, Palette, Type, Layers, ImageIcon, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type TemplateCategory = 'metamorfoza' | 'promocja' | 'efekt' | 'rezerwacja' | 'social' | 'testimonial';

interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  aspectRatio: '1:1' | '9:16' | '4:5';
}

const TEMPLATES: Template[] = [
  // Metamorfoza
  { id: 'split-elegant', name: 'Elegancki Split', category: 'metamorfoza', description: 'Klasyczne porównanie z neonowym akcentem', aspectRatio: '1:1' },
  { id: 'split-diagonal', name: 'Ukośny Split', category: 'metamorfoza', description: 'Dynamiczny układ diagonalny', aspectRatio: '1:1' },
  { id: 'split-vertical', name: 'Wertykalny Split', category: 'metamorfoza', description: 'Format pionowy idealny na Stories', aspectRatio: '9:16' },
  { id: 'split-frame', name: 'Ramka Luksusowa', category: 'metamorfoza', description: 'Złote akcenty premium', aspectRatio: '1:1' },
  { id: 'split-modern', name: 'Nowoczesny Slider', category: 'metamorfoza', description: 'Minimalistyczny design', aspectRatio: '1:1' },
  { id: 'split-circle', name: 'Okrągłe Porównanie', category: 'metamorfoza', description: 'Unikalne okrągłe zdjęcia', aspectRatio: '1:1' },
  
  // Promocja
  { id: 'promo-neon', name: 'Neonowa Promocja', category: 'promocja', description: 'Przyciągający wzrok neon', aspectRatio: '1:1' },
  { id: 'promo-flash', name: 'Flash Sale', category: 'promocja', description: 'Pilna oferta czasowa', aspectRatio: '1:1' },
  { id: 'promo-elegant', name: 'Elegancka Oferta', category: 'promocja', description: 'Subtelny i luksusowy', aspectRatio: '1:1' },
  { id: 'promo-bold', name: 'Mocny Rabat', category: 'promocja', description: 'Duże cyfry, duży efekt', aspectRatio: '1:1' },
  { id: 'promo-gradient', name: 'Gradient Promo', category: 'promocja', description: 'Płynne przejścia kolorów', aspectRatio: '1:1' },
  
  // Efekt
  { id: 'result-glow', name: 'Efekt Glow', category: 'efekt', description: 'Podświetlenie efektu', aspectRatio: '1:1' },
  { id: 'result-spotlight', name: 'Spotlight', category: 'efekt', description: 'Wyeksponowany efekt zabiegu', aspectRatio: '1:1' },
  { id: 'result-magazine', name: 'Styl Magazynowy', category: 'efekt', description: 'Jak z okładki', aspectRatio: '4:5' },
  { id: 'result-clean', name: 'Czysty Efekt', category: 'efekt', description: 'Minimalistyczne podejście', aspectRatio: '1:1' },
  
  // Rezerwacja
  { id: 'booking-cta', name: 'Call to Action', category: 'rezerwacja', description: 'Zachęcający do rezerwacji', aspectRatio: '1:1' },
  { id: 'booking-contact', name: 'Kontakt', category: 'rezerwacja', description: 'Z danymi kontaktowymi', aspectRatio: '1:1' },
  { id: 'booking-story', name: 'Story CTA', category: 'rezerwacja', description: 'Format Stories z CTA', aspectRatio: '9:16' },
  
  // Social
  { id: 'social-quote', name: 'Cytat Inspirujący', category: 'social', description: 'Motywacyjny post', aspectRatio: '1:1' },
  { id: 'social-tip', name: 'Porada Beauty', category: 'social', description: 'Edukacyjna treść', aspectRatio: '1:1' },
  { id: 'social-announcement', name: 'Ogłoszenie', category: 'social', description: 'Ważna informacja', aspectRatio: '1:1' },
  
  // Testimonial
  { id: 'testimonial-card', name: 'Karta Opinii', category: 'testimonial', description: 'Opinia klientki', aspectRatio: '1:1' },
  { id: 'testimonial-photo', name: 'Opinia ze Zdjęciem', category: 'testimonial', description: 'Opinia z twarzą', aspectRatio: '1:1' },
];

const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  metamorfoza: 'Przed/Po',
  promocja: 'Promocje',
  efekt: 'Efekty',
  rezerwacja: 'Rezerwacje',
  social: 'Social Media',
  testimonial: 'Opinie',
};

const ACCENT_COLORS = [
  { name: 'Neon Pink', value: '#ec4899', glow: 'rgba(236,72,153,0.6)' },
  { name: 'Rose Gold', value: '#f59e92', glow: 'rgba(245,158,146,0.6)' },
  { name: 'Electric Purple', value: '#a855f7', glow: 'rgba(168,85,247,0.6)' },
  { name: 'Coral', value: '#ff6b6b', glow: 'rgba(255,107,107,0.6)' },
  { name: 'Teal', value: '#2dd4bf', glow: 'rgba(45,212,191,0.6)' },
  { name: 'Gold', value: '#f59e0b', glow: 'rgba(245,158,11,0.6)' },
  { name: 'White', value: '#ffffff', glow: 'rgba(255,255,255,0.3)' },
];

const FONTS = [
  { name: 'Elegancki', value: 'Playfair Display, serif' },
  { name: 'Nowoczesny', value: 'Inter, sans-serif' },
  { name: 'Minimalistyczny', value: 'Montserrat, sans-serif' },
  { name: 'Luksusowy', value: 'Cormorant Garamond, serif' },
];

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState('split-elegant');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [headline, setHeadline] = useState('Metamorfoza');
  const [subheadline, setSubheadline] = useState('Zobacz efekt zabiegu');
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [discount, setDiscount] = useState('-30%');
  const [cta, setCta] = useState('Zarezerwuj teraz');
  const [quote, setQuote] = useState('Piękno zaczyna się od pielęgnacji');
  const [testimonial, setTestimonial] = useState('Jestem zachwycona efektami! Polecam wszystkim.');
  const [clientName, setClientName] = useState('Anna K.');
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [font, setFont] = useState(FONTS[0].value);
  const [overlayOpacity, setOverlayOpacity] = useState([60]);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const needsBeforeAfter = currentTemplate?.category === 'metamorfoza';
  const filteredTemplates = selectedCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  const handleImageUpload = (setter: (val: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Maksymalny rozmiar pliku to 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setGenerating(true);
    try {
      const dataUrl = await toPng(previewRef.current, { quality: 1, pixelRatio: 3, cacheBust: true });
      const link = document.createElement('a');
      link.download = `grafika-${selectedTemplate}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Grafika pobrana!');
    } catch {
      toast.error('Błąd podczas generowania');
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setMainImage(null);
    setHeadline('Metamorfoza');
    setSubheadline('Zobacz efekt zabiegu');
    setSalonName('Beauty Studio');
    setDiscount('-30%');
    setCta('Zarezerwuj teraz');
    setQuote('Piękno zaczyna się od pielęgnacji');
    setTestimonial('Jestem zachwycona efektami! Polecam wszystkim.');
    setClientName('Anna K.');
    setAccentColor(ACCENT_COLORS[0]);
    setOverlayOpacity([60]);
  };

  const ImageUploadBox = ({ 
    label, 
    image, 
    onUpload, 
    onClear,
    compact = false
  }: { 
    label: string; 
    image: string | null; 
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    compact?: boolean;
  }) => (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {image ? (
        <div className={cn("relative rounded-xl overflow-hidden border border-border/50", compact ? "aspect-video" : "aspect-square")}>
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full hover:bg-black transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      ) : (
        <label className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 cursor-pointer transition-all bg-muted/10 hover:bg-muted/30",
          compact ? "aspect-video" : "aspect-square"
        )}>
          <Upload className="w-6 h-6 text-muted-foreground/50 mb-1" />
          <span className="text-xs text-muted-foreground/50">Dodaj zdjęcie</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  );

  const getAspectRatioClass = () => {
    switch (currentTemplate?.aspectRatio) {
      case '9:16': return 'aspect-[9/16]';
      case '4:5': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  const renderTemplate = () => {
    const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop';
    const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop';
    const placeholderMain = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop';
    
    const before = beforeImage || placeholderBefore;
    const after = afterImage || placeholderAfter;
    const main = mainImage || placeholderMain;
    const color = accentColor.value;
    const glow = accentColor.glow;

    const baseStyles = {
      fontFamily: font,
      background: '#0a0a0a',
    };

    switch (selectedTemplate) {
      case 'split-elegant':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={baseStyles}>
            <div className="absolute inset-4 flex gap-2">
              <div className="flex-1 relative rounded-2xl overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity[0]/100}) 0%, transparent 60%)` }} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-white text-xs font-medium tracking-wider">PRZED</span>
                </div>
              </div>
              <div className="w-1 rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, boxShadow: `0 0 20px ${glow}` }} />
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 30px ${glow}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity[0]/100}) 0%, transparent 60%)` }} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                  <span className="text-white text-xs font-bold tracking-wider">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 pt-3 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${color}99` }}>{salonName}</p>
              <h2 className="text-white text-xl font-bold tracking-wide">{headline}</h2>
            </div>
          </div>
        );

      case 'split-diagonal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={baseStyles}>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}>
              <img src={before} alt="Before" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(0,0,0,${overlayOpacity[0]/100}), transparent)` }} />
            </div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1.5 h-[150%] rounded-full rotate-[8deg]" style={{ background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, boxShadow: `0 0 40px ${glow}` }} />
            </div>
            <div className="absolute top-6 left-6 text-white/80 text-sm tracking-[0.3em]">PRZED</div>
            <div className="absolute top-6 right-6 text-sm tracking-[0.3em]" style={{ color, textShadow: `0 0 20px ${glow}` }}>PO</div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-1" style={{ color: `${color}cc` }}>{subheadline}</p>
            </div>
            <div className="absolute bottom-6 right-6 text-white/40 text-[9px] tracking-[0.2em] uppercase">{salonName}</div>
          </div>
        );

      case 'split-vertical':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={baseStyles}>
            <div className="absolute inset-0 top-0 bottom-1/2">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 30%, transparent 70%, rgba(0,0,0,${overlayOpacity[0]/100}))` }} />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">
                <span className="text-white text-xs tracking-wider">PRZED</span>
              </div>
            </div>
            <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 z-10" style={{ background: color, boxShadow: `0 0 30px ${glow}` }} />
            <div className="absolute inset-0 top-1/2 bottom-0">
              <img src={after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity[0]/100}), transparent 40%)` }} />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full" style={{ background: color }}>
                <span className="text-white text-xs font-bold tracking-wider">PO</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-4 right-4 text-center z-10">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-1" style={{ color: `${color}cc` }}>{subheadline}</p>
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-3">{salonName}</p>
            </div>
          </div>
        );

      case 'split-frame':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a, #1a1005)' }}>
            <div className="absolute inset-6 border-2 rounded-xl" style={{ borderColor: `${color}40` }} />
            <div className="absolute inset-8 flex gap-3">
              <div className="flex-1 relative rounded-lg overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-white text-[10px] tracking-wider">PRZED</div>
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden border-2" style={{ borderColor: `${color}60` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-white text-[10px] tracking-wider font-bold" style={{ background: color }}>PO</div>
              </div>
            </div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1" style={{ background: `linear-gradient(90deg, transparent, ${color}20, transparent)` }}>
              <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>{salonName}</p>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
              <h2 className="text-lg font-bold text-white">{headline}</h2>
            </div>
            <div className="absolute top-6 left-6 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: color }} />
            <div className="absolute top-6 right-6 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: color }} />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: color }} />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: color }} />
          </div>
        );

      case 'split-modern':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={baseStyles}>
            <div className="absolute inset-0 flex">
              <div className="flex-1 relative">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="flex-1 relative">
                <img src={after} alt="After" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center bg-black/50 backdrop-blur-sm" style={{ borderColor: color, boxShadow: `0 0 40px ${glow}` }}>
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] ml-1" style={{ borderLeftColor: color }} />
              </div>
            </div>
            <div className="absolute top-4 left-4 text-white/60 text-xs tracking-widest">PRZED</div>
            <div className="absolute top-4 right-4 text-xs tracking-widest" style={{ color }}>PO</div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
              <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mt-1">{salonName}</p>
            </div>
          </div>
        );

      case 'split-circle':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'radial-gradient(circle at center, #151515, #0a0a0a)' }}>
            <div className="absolute top-8 left-1/4 -translate-x-1/2 w-[40%] aspect-square rounded-full overflow-hidden border-4 border-white/10">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 rounded-full text-white text-[10px]">PRZED</div>
            </div>
            <div className="absolute top-8 right-1/4 translate-x-1/2 w-[40%] aspect-square rounded-full overflow-hidden border-4" style={{ borderColor: `${color}80`, boxShadow: `0 0 40px ${glow}, inset 0 0 0 0 transparent` }}>
              <img src={after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-[10px] font-bold" style={{ background: color }}>PO</div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-1" style={{ color: `${color}99` }}>{subheadline}</p>
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-3">{salonName}</p>
            </div>
          </div>
        );

      case 'promo-neon':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #150510 100%)' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Promo" className="w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[80px]" style={{ background: color }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="px-5 py-2 border rounded-full mb-6" style={{ borderColor: `${color}50`, background: `${color}15` }}>
                <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color }}>Promocja</span>
              </div>
              <span className="text-8xl font-black text-white" style={{ textShadow: `0 0 60px ${glow}` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-4">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-2">{subheadline}</p>
              <button className="mt-8 px-10 py-4 rounded-full text-white font-bold text-sm tracking-wide" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.2em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-flash':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={baseStyles}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 rounded-full mb-6" style={{ boxShadow: '0 0 40px rgba(234,179,8,0.5)' }}>
                <span className="text-black text-sm font-bold">⚡ FLASH SALE ⚡</span>
              </div>
              <span className="text-9xl font-black text-white" style={{ textShadow: `0 0 80px ${glow}` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-4">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-2">{subheadline}</p>
              <button className="mt-8 px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold text-sm tracking-wide" style={{ boxShadow: '0 15px 50px rgba(234,179,8,0.4)' }}>
                {cta}
              </button>
              <div className="mt-8 flex gap-3">
                {['23', '59', '42'].map((n, i) => (
                  <div key={i} className="w-14 h-14 bg-white/5 rounded-xl flex flex-col items-center justify-center border border-white/10">
                    <span className="text-white font-mono font-bold text-xl">{n}</span>
                    <span className="text-white/40 text-[8px] uppercase">{['godz', 'min', 'sek'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'promo-elegant':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-8 border rounded-xl" style={{ borderColor: `${color}20` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: `${color}80` }}>Ekskluzywna oferta</p>
              <span className="text-6xl font-light text-white tracking-tight">{discount}</span>
              <div className="w-16 h-px my-6" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              <h2 className="text-xl font-medium text-white">{headline}</h2>
              <p className="text-zinc-500 text-sm mt-2">{subheadline}</p>
              <button className="mt-8 px-8 py-3 border rounded-full text-sm tracking-wide" style={{ borderColor: color, color }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.3em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-bold':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}10 100%)` }}>
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full" style={{ background: `radial-gradient(circle, ${color}30 0%, transparent 70%)` }} />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full" style={{ background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` }} />
            <div className="relative h-full flex flex-col items-start justify-center p-10">
              <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color }}>Rabat</p>
              <span className="text-[140px] font-black leading-none text-white" style={{ textShadow: `4px 4px 0 ${color}` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-2">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-1">{subheadline}</p>
              <button className="mt-6 px-8 py-3 rounded-lg text-white font-bold text-sm" style={{ background: color, boxShadow: `0 10px 40px ${glow}` }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-4 right-4 text-white/30 text-[10px] tracking-[0.2em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-gradient':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}15 50%, #0a0a0a 100%)` }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 20%, ${color}20 0%, transparent 50%)` }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 80%, ${color}15 0%, transparent 50%)` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="relative">
                <span className="text-8xl font-black text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${color}, white, ${color})` }}>{discount}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-6">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-2">{subheadline}</p>
              <button className="mt-8 px-10 py-4 rounded-full text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)`, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      case 'result-glow':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #150810 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px]" style={{ background: `${color}30` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[55%] aspect-square rounded-full overflow-hidden border-4" style={{ borderColor: `${color}60`, boxShadow: `0 0 80px ${glow}` }}>
              <img src={main} alt="Result" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}99` }}>{subheadline}</p>
              <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mt-4">{salonName}</p>
            </div>
            <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: `${color}40` }} />
            <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2" style={{ borderColor: `${color}40` }} />
          </div>
        );

      case 'result-spotlight':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={baseStyles}>
            <div className="absolute inset-0">
              <img src={main} alt="Result" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, transparent 30%, rgba(0,0,0,${overlayOpacity[0]/100}) 100%)` }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] aspect-square rounded-full border-4" style={{ borderColor: `${color}50`, boxShadow: `0 0 60px ${glow}, inset 0 0 60px ${glow}` }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-1" style={{ color: `${color}99` }}>{subheadline}</p>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-3">{salonName}</p>
            </div>
          </div>
        );

      case 'result-magazine':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={baseStyles}>
            <img src={main} alt="Result" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity[0]/100}) 0%, transparent 50%)` }} />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ background: color, color: 'white' }}>
              Efekt
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white leading-tight">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}cc` }}>{subheadline}</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-px" style={{ background: color }} />
                <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">{salonName}</p>
              </div>
            </div>
          </div>
        );

      case 'result-clean':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: '#ffffff' }}>
            <div className="absolute inset-6 rounded-2xl overflow-hidden shadow-2xl">
              <img src={main} alt="Result" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-xl font-semibold text-zinc-800">{headline}</h2>
              <p className="text-sm mt-1" style={{ color }}>{subheadline}</p>
              <p className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase mt-2">{salonName}</p>
            </div>
          </div>
        );

      case 'booking-cta':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(135deg, #080808 0%, #150810 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px]" style={{ background: `${color}20` }} />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[50%] aspect-square rounded-full overflow-hidden border-4" style={{ borderColor: `${color}60`, boxShadow: `0 0 60px ${glow}` }}>
              <img src={main} alt="Booking" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}99` }}>{subheadline}</p>
              <button className="mt-6 px-10 py-4 rounded-full text-white font-bold text-sm tracking-wide" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
              <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mt-6">{salonName}</p>
            </div>
          </div>
        );

      case 'booking-contact':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0505 100%)' }}>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-2" style={{ borderColor: `${color}60` }}>
              <img src={main} alt="Contact" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-8 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}99` }}>{subheadline}</p>
              <div className="mt-6 space-y-3 w-full max-w-xs">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-lg">📞</span>
                  <span className="text-white text-sm">+48 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-lg">📍</span>
                  <span className="text-white text-sm">ul. Piękna 12, Warszawa</span>
                </div>
              </div>
              <button className="mt-6 px-8 py-3 rounded-full text-white font-bold text-sm" style={{ background: color, boxShadow: `0 10px 40px ${glow}` }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.2em] uppercase">{salonName}</div>
          </div>
        );

      case 'booking-story':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={baseStyles}>
            <img src={main} alt="Story" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color }}>Zarezerwuj wizytę</p>
              <h2 className="text-3xl font-bold text-white leading-tight">{headline}</h2>
              <p className="text-sm mt-3 text-white/70">{subheadline}</p>
              <button className="mt-8 w-full py-4 rounded-xl text-white font-bold text-sm" style={{ background: color, boxShadow: `0 10px 40px ${glow}` }}>
                {cta}
              </button>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-6">{salonName}</p>
            </div>
          </div>
        );

      case 'social-quote':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}10 100%)` }}>
            <div className="absolute top-8 left-8 text-7xl font-serif" style={{ color: `${color}30` }}>"</div>
            <div className="absolute bottom-8 right-8 text-7xl font-serif rotate-180" style={{ color: `${color}30` }}>"</div>
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <p className="text-2xl font-medium text-white leading-relaxed">{quote}</p>
              <div className="w-12 h-px my-6" style={{ background: color }} />
              <p className="text-sm" style={{ color }}>{salonName}</p>
            </div>
          </div>
        );

      case 'social-tip':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-6 left-6 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
              <span className="text-2xl">💡</span>
            </div>
            <div className="relative h-full flex flex-col justify-center px-8 pt-20">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color }}>Porada Beauty</p>
              <h2 className="text-xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-4 leading-relaxed">{subheadline}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={main} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <p className="text-white/50 text-xs">{salonName}</p>
              </div>
            </div>
          </div>
        );

      case 'social-announcement':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: `linear-gradient(135deg, ${color}15 0%, #0a0a0a 100%)` }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${color}20`, border: `2px solid ${color}40` }}>
                <span className="text-3xl">📢</span>
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color }}>Ogłoszenie</p>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-4">{subheadline}</p>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      case 'testimonial-card':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-6 left-6 text-5xl" style={{ color: `${color}30` }}>"</div>
            <div className="relative h-full flex flex-col justify-center px-10 pt-8">
              <p className="text-white text-lg leading-relaxed">{testimonial}</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: `${color}60` }}>
                  <img src={main} alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-medium">{clientName}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-500 text-sm">★</span>)}
                  </div>
                </div>
              </div>
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      case 'testimonial-photo':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={baseStyles}>
            <img src={main} alt="Client" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)` }} />
            <div className="absolute top-6 right-6 text-4xl" style={{ color: `${color}50` }}>"</div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-lg leading-relaxed">{testimonial}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{clientName}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-500 text-sm">★</span>)}
                  </div>
                </div>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">{salonName}</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="w-full aspect-square bg-zinc-900 flex items-center justify-center text-zinc-500">Wybierz szablon</div>;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kreator Grafik</h1>
                <p className="text-sm text-muted-foreground">Profesjonalne grafiki dla FB Ads • {TEMPLATES.length} szablonów</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleDownload} disabled={generating} size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                Pobierz PNG
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-6">
            {/* Left: Controls */}
            <div className="space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
              {/* Template Selection */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Szablony</h3>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs transition-all",
                      selectedCategory === 'all' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    Wszystkie
                  </button>
                  {(Object.keys(CATEGORY_LABELS) as TemplateCategory[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs transition-all",
                        selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                  {filteredTemplates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={cn(
                        'p-2.5 rounded-lg border transition-all text-left',
                        selectedTemplate === t.id
                          ? 'border-primary bg-primary/10 ring-1 ring-primary/50'
                          : 'border-border hover:border-primary/40 hover:bg-muted/30'
                      )}
                    >
                      <span className="text-xs font-medium text-foreground block truncate">{t.name}</span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5 capitalize">{CATEGORY_LABELS[t.category]}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Images */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Zdjęcia</h3>
                </div>
                {needsBeforeAfter ? (
                  <div className="grid grid-cols-2 gap-3">
                    <ImageUploadBox label="PRZED" image={beforeImage} onUpload={handleImageUpload(setBeforeImage)} onClear={() => setBeforeImage(null)} compact />
                    <ImageUploadBox label="PO" image={afterImage} onUpload={handleImageUpload(setAfterImage)} onClear={() => setAfterImage(null)} compact />
                  </div>
                ) : (
                  <ImageUploadBox label="Zdjęcie główne" image={mainImage} onUpload={handleImageUpload(setMainImage)} onClear={() => setMainImage(null)} compact />
                )}
              </Card>

              {/* Style */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Styl</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Accent Color */}
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Kolor akcentowy</Label>
                    <div className="flex flex-wrap gap-2">
                      {ACCENT_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setAccentColor(c)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            accentColor.value === c.value ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"
                          )}
                          style={{ background: c.value, boxShadow: accentColor.value === c.value ? `0 0 15px ${c.glow}` : undefined }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font */}
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Czcionka</Label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONTS.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            <span style={{ fontFamily: f.value }}>{f.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Overlay Opacity */}
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Przyciemnienie ({overlayOpacity}%)</Label>
                    <Slider value={overlayOpacity} onValueChange={setOverlayOpacity} min={0} max={100} step={5} className="w-full" />
                  </div>
                </div>
              </Card>

              {/* Text */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Teksty</h3>
                </div>
                
                <Tabs defaultValue="main" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="main" className="text-xs">Główne</TabsTrigger>
                    <TabsTrigger value="promo" className="text-xs">Promo</TabsTrigger>
                    <TabsTrigger value="other" className="text-xs">Inne</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="main" className="space-y-3 mt-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Nagłówek</Label>
                      <Input value={headline} onChange={(e) => setHeadline(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Podtytuł</Label>
                      <Input value={subheadline} onChange={(e) => setSubheadline(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Nazwa salonu</Label>
                      <Input value={salonName} onChange={(e) => setSalonName(e.target.value)} className="h-9 mt-1" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="promo" className="space-y-3 mt-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Rabat</Label>
                      <Input value={discount} onChange={(e) => setDiscount(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Przycisk CTA</Label>
                      <Input value={cta} onChange={(e) => setCta(e.target.value)} className="h-9 mt-1" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="other" className="space-y-3 mt-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Cytat / Porada</Label>
                      <Input value={quote} onChange={(e) => setQuote(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Opinia klientki</Label>
                      <Input value={testimonial} onChange={(e) => setTestimonial(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Imię klientki</Label>
                      <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="h-9 mt-1" />
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Right: Preview */}
            <div className="flex flex-col items-center">
              <div className="sticky top-6 w-full max-w-md">
                <Card className="p-4 bg-zinc-950/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-pink-500" />
                      <span className="text-sm font-medium text-foreground">Podgląd</span>
                    </div>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
                      {currentTemplate?.aspectRatio}
                    </span>
                  </div>
                  
                  <div ref={previewRef} className={cn("w-full overflow-hidden rounded-lg shadow-2xl", getAspectRatioClass())}>
                    {renderTemplate()}
                  </div>
                  
                  <div className="mt-3 text-center">
                    <p className="text-xs text-muted-foreground">{currentTemplate?.name}</p>
                    <p className="text-[10px] text-muted-foreground/60">{currentTemplate?.description}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
