import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { 
  Download, 
  RotateCcw, 
  Upload, 
  X, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Sparkles,
  Loader2,
  Layers,
  Camera,
  Zap,
  Star,
  Heart,
  Gift,
  Crown,
  Scissors,
  Wand2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AspectRatio = '1:1' | '9:16' | '4:5';
type TemplateCategory = 'metamorfoza' | 'promocja' | 'efekt' | 'social' | 'story';

interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  aspectRatio: AspectRatio;
  premium?: boolean;
}

const TEMPLATES: Template[] = [
  // METAMORFOZA
  { id: 'meta-elegant-split', name: 'Elegant Split', category: 'metamorfoza', aspectRatio: '1:1', premium: true },
  { id: 'meta-glow-compare', name: 'Glow Compare', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-diagonal-lux', name: 'Diagonal Lux', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-circle-frames', name: 'Circle Frames', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-minimal-duo', name: 'Minimal Duo', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-gradient-reveal', name: 'Gradient Reveal', category: 'metamorfoza', aspectRatio: '1:1', premium: true },
  
  // PROMOCJA
  { id: 'promo-flash-sale', name: 'Flash Sale', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-elegant-offer', name: 'Elegant Offer', category: 'promocja', aspectRatio: '1:1', premium: true },
  { id: 'promo-neon-discount', name: 'Neon Discount', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-luxury-deal', name: 'Luxury Deal', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-bold-save', name: 'Bold Save', category: 'promocja', aspectRatio: '1:1' },
  
  // EFEKT
  { id: 'efekt-spotlight', name: 'Spotlight', category: 'efekt', aspectRatio: '1:1' },
  { id: 'efekt-magazine', name: 'Magazine', category: 'efekt', aspectRatio: '4:5' },
  { id: 'efekt-glow-frame', name: 'Glow Frame', category: 'efekt', aspectRatio: '1:1', premium: true },
  { id: 'efekt-dark-elegant', name: 'Dark Elegant', category: 'efekt', aspectRatio: '1:1' },
  
  // SOCIAL
  { id: 'social-quote', name: 'Quote Card', category: 'social', aspectRatio: '1:1' },
  { id: 'social-tip', name: 'Beauty Tip', category: 'social', aspectRatio: '1:1' },
  { id: 'social-announcement', name: 'Announcement', category: 'social', aspectRatio: '1:1' },
  { id: 'social-review', name: 'Client Review', category: 'social', aspectRatio: '1:1' },
  
  // STORY
  { id: 'story-promo', name: 'Story Promo', category: 'story', aspectRatio: '9:16' },
  { id: 'story-before-after', name: 'Story B/A', category: 'story', aspectRatio: '9:16' },
  { id: 'story-cta', name: 'Story CTA', category: 'story', aspectRatio: '9:16' },
];

const CATEGORY_INFO: Record<TemplateCategory, { label: string; icon: React.ReactNode }> = {
  metamorfoza: { label: 'Przed/Po', icon: <Camera className="w-4 h-4" /> },
  promocja: { label: 'Promocje', icon: <Zap className="w-4 h-4" /> },
  efekt: { label: 'Efekty', icon: <Sparkles className="w-4 h-4" /> },
  social: { label: 'Social', icon: <Star className="w-4 h-4" /> },
  story: { label: 'Stories', icon: <Layers className="w-4 h-4" /> },
};

const ACCENT_COLORS = [
  { name: 'Neon Pink', value: '#ec4899', glow: 'rgba(236,72,153,0.5)' },
  { name: 'Hot Pink', value: '#ff0080', glow: 'rgba(255,0,128,0.5)' },
  { name: 'Rose Gold', value: '#e8b4b8', glow: 'rgba(232,180,184,0.4)' },
  { name: 'Gold', value: '#d4af37', glow: 'rgba(212,175,55,0.4)' },
  { name: 'Purple', value: '#a855f7', glow: 'rgba(168,85,247,0.5)' },
  { name: 'Coral', value: '#ff6b6b', glow: 'rgba(255,107,107,0.5)' },
  { name: 'White', value: '#ffffff', glow: 'rgba(255,255,255,0.3)' },
];

const FONTS = [
  { name: 'Elegancki', value: "'Playfair Display', serif" },
  { name: 'Nowoczesny', value: "'Inter', sans-serif" },
  { name: 'Luksusowy', value: "'Cormorant Garamond', serif" },
  { name: 'Bold', value: "'Montserrat', sans-serif" },
];

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState('meta-elegant-split');
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
  const [testimonial, setTestimonial] = useState('Jestem zachwycona efektami!');
  const [clientName, setClientName] = useState('Anna K.');
  const [price, setPrice] = useState('299 zł');
  const [serviceName, setServiceName] = useState('Lifting twarzy');
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [font, setFont] = useState(FONTS[0].value);
  const [overlayOpacity, setOverlayOpacity] = useState([50]);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const needsBeforeAfter = currentTemplate?.category === 'metamorfoza' || selectedTemplate === 'story-before-after';
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
    } catch (err) {
      console.error(err);
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
    setTestimonial('Jestem zachwycona efektami!');
    setClientName('Anna K.');
    setPrice('299 zł');
    setServiceName('Lifting twarzy');
    setAccentColor(ACCENT_COLORS[0]);
    setOverlayOpacity([50]);
  };

  const ImageUploadBox = ({ 
    label, 
    image, 
    onUpload, 
    onClear,
  }: { 
    label: string; 
    image: string | null; 
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
  }) => (
    <div className="space-y-2">
      <Label className="text-zinc-400 text-xs">{label}</Label>
      {image ? (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-zinc-700/50 group">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-[4/3] rounded-lg border-2 border-dashed border-zinc-700/50 hover:border-pink-500/50 cursor-pointer transition-all bg-zinc-900/30 hover:bg-zinc-900/50">
          <Upload className="w-6 h-6 text-zinc-600 mb-2" />
          <span className="text-xs text-zinc-500">Kliknij aby dodać</span>
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
    const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop';
    const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop';
    const placeholderMain = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop';
    
    const before = beforeImage || placeholderBefore;
    const after = afterImage || placeholderAfter;
    const main = mainImage || placeholderMain;
    const color = accentColor.value;
    const glow = accentColor.glow;
    const opacity = overlayOpacity[0] / 100;

    const baseStyles: React.CSSProperties = {
      fontFamily: font,
      background: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
    };

    switch (selectedTemplate) {
      // ============ METAMORFOZA ============
      case 'meta-elegant-split':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0a10 100%)' }}>
            <div className="absolute inset-0 flex p-6 gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity * 0.8}) 0%, transparent 60%)` }} />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-white text-xs font-semibold tracking-[0.25em]">PRZED</span>
                </div>
              </div>
              <div className="w-1 rounded-full" style={{ background: `linear-gradient(to bottom, transparent 5%, ${color} 30%, ${color} 70%, transparent 95%)`, boxShadow: `0 0 40px ${glow}` }} />
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: `0 0 60px ${glow}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity * 0.8}) 0%, transparent 60%)` }} />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 25px ${glow}` }}>
                  <span className="text-white text-xs font-bold tracking-[0.25em]">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 left-0 right-0 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color: `${color}80` }}>{salonName}</p>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <h2 className="text-white text-xl font-semibold">{headline}</h2>
            </div>
          </div>
        );

      case 'meta-glow-compare':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#050505' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-48 blur-[120px] opacity-40" style={{ background: color }} />
            <div className="absolute inset-0 flex p-7 gap-5">
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/5">
                <img src={before} alt="Before" className="w-full h-full object-cover grayscale-[30%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white/60 text-xs tracking-[0.3em] font-medium">PRZED</span>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden" style={{ boxShadow: `0 0 80px ${glow}, inset 0 0 0 2px ${color}40` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-bold tracking-[0.3em]" style={{ color, textShadow: `0 0 30px ${glow}` }}>PO</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-white" style={{ textShadow: `0 0 50px ${glow}` }}>{headline}</h2>
              <p className="text-white/30 text-[10px] mt-2 tracking-[0.4em] uppercase">{salonName}</p>
            </div>
          </div>
        );

      case 'meta-diagonal-lux':
        return (
          <div className="w-full aspect-square" style={baseStyles}>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 52% 0, 48% 100%, 0 100%)' }}>
              <img src={before} alt="Before" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            </div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 48% 100%)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-[150%] rotate-[6deg]" style={{ background: `linear-gradient(to bottom, transparent, ${color}, ${color}, transparent)`, boxShadow: `0 0 60px ${glow}` }} />
            </div>
            <div className="absolute top-7 left-7">
              <span className="text-white/50 text-[10px] tracking-[0.4em] font-medium">PRZED</span>
            </div>
            <div className="absolute top-7 right-7">
              <span className="text-[10px] tracking-[0.4em] font-bold" style={{ color }}>PO</span>
            </div>
            <div className="absolute bottom-7 left-7 right-7 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white">{headline}</h2>
                <p className="text-sm mt-1" style={{ color: `${color}90` }}>{subheadline}</p>
              </div>
              <span className="text-white/20 text-[9px] tracking-[0.3em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'meta-circle-frames':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0810 100%)' }}>
            <div className="absolute inset-0 flex items-center justify-center gap-6 p-10">
              <div className="relative flex-1 aspect-square">
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/10">
                  <img src={before} alt="Before" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-900/90 rounded-full border border-white/10">
                  <span className="text-white/70 text-[10px] tracking-[0.2em]">PRZED</span>
                </div>
              </div>
              <div className="relative flex-1 aspect-square">
                <div className="absolute inset-0 rounded-full overflow-hidden" style={{ boxShadow: `0 0 60px ${glow}, 0 0 0 3px ${color}50` }}>
                  <img src={after} alt="After" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full" style={{ background: color, boxShadow: `0 4px 20px ${glow}` }}>
                  <span className="text-white text-[10px] font-bold tracking-[0.2em]">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-6 left-0 right-0 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-500 text-xs mt-1">{subheadline}</p>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${color}70` }}>{salonName}</p>
            </div>
          </div>
        );

      case 'meta-minimal-duo':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0c0c0c' }}>
            <div className="absolute inset-8 flex gap-4">
              <div className="flex-1 relative rounded-lg overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded">
                  <span className="text-white/80 text-[10px] tracking-widest">PRZED</span>
                </div>
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden" style={{ boxShadow: `0 0 40px ${glow}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded" style={{ background: color }}>
                  <span className="text-white text-[10px] font-semibold tracking-widest">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'meta-gradient-reveal':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}15 50%, #0a0a0a 100%)` }}>
            <div className="absolute inset-6 flex gap-3 rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 80px ${glow}` }}>
              <div className="flex-1 relative">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 70%, ${color}40 100%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white/70 text-xs tracking-[0.2em]">PRZED</span>
                </div>
              </div>
              <div className="w-px" style={{ background: `linear-gradient(to bottom, transparent, ${color}, transparent)` }} />
              <div className="flex-1 relative">
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(270deg, transparent 70%, ${color}40 100%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-right">
                  <span className="text-xs font-bold tracking-[0.2em]" style={{ color }}>PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: `${color}60` }}>{salonName}</span>
            </div>
          </div>
        );

      // ============ PROMOCJA ============
      case 'promo-flash-sale':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #150510 100%)' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Promo" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="mb-4">
                <Zap className="w-10 h-10 mx-auto" style={{ color, filter: `drop-shadow(0 0 20px ${glow})` }} />
              </div>
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: `${color}80` }}>Oferta specjalna</p>
              <h2 className="text-6xl font-black text-white mb-2" style={{ textShadow: `0 0 60px ${glow}` }}>{discount}</h2>
              <p className="text-white/80 text-lg font-medium mb-6">{headline}</p>
              <div className="px-8 py-3 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 30px ${glow}` }}>
                <span className="text-white font-semibold tracking-wide">{cta}</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-elegant-offer':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute top-0 right-0 w-2/3 h-full">
              <img src={main} alt="Offer" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
            </div>
            <div className="absolute inset-0 p-10 flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color }}>Promocja</p>
              <h2 className="text-4xl font-bold text-white mb-3">{headline}</h2>
              <p className="text-zinc-400 mb-6 max-w-[60%]">{subheadline}</p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-5xl font-black" style={{ color, textShadow: `0 0 40px ${glow}` }}>{discount}</span>
                <span className="text-zinc-500">na wszystkie usługi</span>
              </div>
              <div className="w-fit px-6 py-3 rounded-lg" style={{ background: color, boxShadow: `0 4px 25px ${glow}` }}>
                <span className="text-white font-semibold">{cta}</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-10">
              <span className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-neon-discount':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#030303' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Promo" className="w-full h-full object-cover opacity-30 blur-sm" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-32 blur-[150px] opacity-50" style={{ background: color }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <span className="text-8xl font-black text-white" style={{ textShadow: `0 0 80px ${glow}, 0 0 120px ${glow}` }}>{discount}</span>
                <div className="absolute -inset-4 rounded-xl border-2 opacity-50" style={{ borderColor: color, boxShadow: `0 0 40px ${glow}` }} />
              </div>
              <h2 className="text-2xl font-bold text-white mt-6 mb-2">{headline}</h2>
              <p className="text-zinc-400 mb-8">{subheadline}</p>
              <div className="px-8 py-3 rounded-full border-2" style={{ borderColor: color, boxShadow: `0 0 30px ${glow}` }}>
                <span className="font-semibold" style={{ color }}>{cta}</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-luxury-deal':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0508 100%)' }}>
            <div className="absolute top-6 left-6 right-6 bottom-6 border rounded-2xl" style={{ borderColor: `${color}30` }} />
            <div className="absolute inset-12">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img src={main} alt="Deal" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            </div>
            <div className="absolute bottom-16 left-0 right-0 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: `${color}80` }}>Ekskluzywna oferta</p>
              <h2 className="text-3xl font-bold text-white mb-1">{headline}</h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-4xl font-black" style={{ color }}>{discount}</span>
                <span className="text-zinc-400">|</span>
                <span className="text-white font-medium">{price}</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="text-zinc-600 text-[9px] tracking-[0.4em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-bold-save':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: color }}>
            <div className="absolute inset-4 bg-[#0a0a0a] rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                <img src={main} alt="Save" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color }}>Oszczędź teraz</p>
                <h2 className="text-7xl font-black text-white mb-4">{discount}</h2>
                <p className="text-white/80 text-lg mb-6">{headline}</p>
                <div className="px-8 py-3 rounded-lg" style={{ background: color }}>
                  <span className="text-white font-bold">{cta}</span>
                </div>
              </div>
            </div>
          </div>
        );

      // ============ EFEKT ============
      case 'efekt-spotlight':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#050505' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Effect" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, transparent 30%, #050505 70%)` }} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h2 className="text-3xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-zinc-400 mb-4">{subheadline}</p>
              <div className="flex items-center gap-3">
                <div className="px-5 py-2 rounded-full" style={{ background: color, boxShadow: `0 4px 25px ${glow}` }}>
                  <span className="text-white text-sm font-semibold">{cta}</span>
                </div>
                <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase">{salonName}</span>
              </div>
            </div>
          </div>
        );

      case 'efekt-magazine':
        return (
          <div className="w-full aspect-[4/5]" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute inset-4 rounded-xl overflow-hidden">
              <img src={main} alt="Magazine" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            </div>
            <div className="absolute top-8 left-8">
              <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>{salonName}</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-4xl font-bold text-white mb-3 leading-tight">{headline}</h2>
              <p className="text-zinc-400 mb-6">{subheadline}</p>
              <div className="h-0.5 w-16 rounded" style={{ background: color }} />
            </div>
          </div>
        );

      case 'efekt-glow-frame':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#050505' }}>
            <div className="absolute inset-8 rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 80px ${glow}, inset 0 0 0 2px ${color}40` }}>
              <img src={main} alt="Glow" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-zinc-400 text-sm">{subheadline}</p>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.5em] uppercase" style={{ color: `${color}60` }}>{salonName}</span>
            </div>
          </div>
        );

      case 'efekt-dark-elegant':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0c0c0c 0%, #060306 100%)' }}>
            <div className="absolute inset-6 rounded-xl overflow-hidden">
              <img src={main} alt="Elegant" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,${opacity}) 100%)` }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-semibold text-white">{headline}</h2>
              <p className="text-zinc-500 text-xs mt-2 tracking-widest uppercase">{salonName}</p>
            </div>
          </div>
        );

      // ============ SOCIAL ============
      case 'social-quote':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0f0f0f 0%, #0a050a 100%)' }}>
            <div className="absolute top-8 left-8 text-6xl font-serif" style={{ color: `${color}30` }}>"</div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <p className="text-2xl text-white font-light leading-relaxed italic mb-8">"{quote}"</p>
              <div className="w-12 h-0.5 rounded" style={{ background: color }} />
              <p className="text-zinc-500 mt-4 text-sm">{salonName}</p>
            </div>
          </div>
        );

      case 'social-tip':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
            <div className="absolute inset-0 p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Sparkles className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-white font-semibold">Beauty Tip</p>
                  <p className="text-zinc-500 text-xs">{salonName}</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{headline}</h2>
              <p className="text-zinc-400 flex-1">{subheadline}</p>
              <div className="pt-6 border-t border-zinc-800">
                <span className="text-xs tracking-widest uppercase" style={{ color }}>Zapisz na później</span>
              </div>
            </div>
          </div>
        );

      case 'social-announcement':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #080508 100%)' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${color}15`, boxShadow: `0 0 40px ${glow}` }}>
                <Gift className="w-8 h-8" style={{ color }} />
              </div>
              <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color }}>Ogłoszenie</p>
              <h2 className="text-3xl font-bold text-white mb-4">{headline}</h2>
              <p className="text-zinc-400 max-w-[80%]">{subheadline}</p>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'social-review':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute inset-8 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color }} />
                ))}
              </div>
              <p className="text-xl text-white font-light leading-relaxed flex-1">"{testimonial}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                  {mainImage && <img src={mainImage} alt="Client" className="w-full h-full object-cover" />}
                </div>
                <div>
                  <p className="text-white font-medium">{clientName}</p>
                  <p className="text-zinc-500 text-sm">Klientka</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 right-8">
              <span className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      // ============ STORY ============
      case 'story-promo':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: '#050505' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Story Promo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color }}>Oferta specjalna</p>
              <h2 className="text-5xl font-black text-white mb-4">{discount}</h2>
              <p className="text-white/80 text-lg mb-8">{headline}</p>
              <div className="px-8 py-4 rounded-full self-center" style={{ background: color, boxShadow: `0 4px 30px ${glow}` }}>
                <span className="text-white font-bold">{cta}</span>
              </div>
              <p className="text-zinc-500 text-xs mt-8 tracking-widest uppercase">{salonName}</p>
            </div>
          </div>
        );

      case 'story-before-after':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute inset-4 flex flex-col gap-3">
              <div className="flex-1 relative rounded-2xl overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full">
                  <span className="text-white text-xs tracking-widest">PRZED</span>
                </div>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 40px ${glow}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full" style={{ background: color }}>
                  <span className="text-white text-xs font-bold tracking-widest">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'story-cta':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a0a 0%, #0f050a 100%)' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ background: `${color}15`, boxShadow: `0 0 60px ${glow}` }}>
                <Heart className="w-10 h-10" style={{ color }} />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{headline}</h2>
              <p className="text-zinc-400 mb-10 max-w-[80%]">{subheadline}</p>
              <div className="w-full max-w-xs">
                <div className="px-8 py-4 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 40px ${glow}` }}>
                  <span className="text-white font-bold text-lg">{cta}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <span className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full aspect-square flex items-center justify-center" style={baseStyles}>
            <p className="text-zinc-500">Wybierz szablon</p>
          </div>
        );
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-zinc-950">
        {/* Header */}
        <div className="border-b border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Generator Grafik</h1>
                  <p className="text-zinc-400 text-sm">Twórz profesjonalne grafiki dla social media</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={generating}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg shadow-pink-500/20"
                >
                  {generating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Pobierz PNG
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-90px)]">
          {/* Left Panel - Controls */}
          <div className="w-[380px] border-r border-zinc-800/50 bg-zinc-900/20 flex flex-col">
            <Tabs defaultValue="templates" className="flex-1 flex flex-col">
              <div className="border-b border-zinc-800/50 px-4">
                <TabsList className="h-12 bg-transparent w-full justify-start gap-1">
                  <TabsTrigger 
                    value="templates"
                    className="data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400 text-zinc-400"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Szablony
                  </TabsTrigger>
                  <TabsTrigger 
                    value="images"
                    className="data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400 text-zinc-400"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Zdjęcia
                  </TabsTrigger>
                  <TabsTrigger 
                    value="style"
                    className="data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400 text-zinc-400"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Styl
                  </TabsTrigger>
                  <TabsTrigger 
                    value="text"
                    className="data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400 text-zinc-400"
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Tekst
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <TabsContent value="templates" className="mt-0 p-4 space-y-4">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        selectedCategory === 'all'
                          ? "bg-pink-500 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      )}
                    >
                      Wszystkie
                    </button>
                    {Object.entries(CATEGORY_INFO).map(([key, { label, icon }]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key as TemplateCategory)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                          selectedCategory === key
                            ? "bg-pink-500 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                      >
                        {icon}
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Template Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "relative p-3 rounded-xl text-left transition-all",
                          selectedTemplate === template.id
                            ? "bg-pink-500/10 border-2 border-pink-500"
                            : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={cn(
                            "text-sm font-medium",
                            selectedTemplate === template.id ? "text-pink-400" : "text-white"
                          )}>
                            {template.name}
                          </span>
                          {template.premium && (
                            <Crown className="w-3.5 h-3.5 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                            {CATEGORY_INFO[template.category]?.label}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-[10px] text-zinc-600">{template.aspectRatio}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="images" className="mt-0 p-4 space-y-4">
                  {needsBeforeAfter ? (
                    <div className="grid grid-cols-2 gap-4">
                      <ImageUploadBox
                        label="Zdjęcie PRZED"
                        image={beforeImage}
                        onUpload={handleImageUpload(setBeforeImage)}
                        onClear={() => setBeforeImage(null)}
                      />
                      <ImageUploadBox
                        label="Zdjęcie PO"
                        image={afterImage}
                        onUpload={handleImageUpload(setAfterImage)}
                        onClear={() => setAfterImage(null)}
                      />
                    </div>
                  ) : (
                    <ImageUploadBox
                      label="Zdjęcie główne"
                      image={mainImage}
                      onUpload={handleImageUpload(setMainImage)}
                      onClear={() => setMainImage(null)}
                    />
                  )}
                </TabsContent>

                <TabsContent value="style" className="mt-0 p-4 space-y-6">
                  {/* Accent Color */}
                  <div className="space-y-3">
                    <Label className="text-zinc-400 text-xs">Kolor akcentu</Label>
                    <div className="flex flex-wrap gap-2">
                      {ACCENT_COLORS.map(c => (
                        <button
                          key={c.value}
                          onClick={() => setAccentColor(c)}
                          className={cn(
                            "w-10 h-10 rounded-lg transition-all",
                            accentColor.value === c.value
                              ? "ring-2 ring-offset-2 ring-offset-zinc-900 ring-pink-500 scale-110"
                              : "hover:scale-105"
                          )}
                          style={{ 
                            background: c.value,
                            boxShadow: accentColor.value === c.value ? `0 0 20px ${c.glow}` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font */}
                  <div className="space-y-3">
                    <Label className="text-zinc-400 text-xs">Czcionka</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {FONTS.map(f => (
                        <button
                          key={f.value}
                          onClick={() => setFont(f.value)}
                          className={cn(
                            "p-3 rounded-lg text-left transition-all",
                            font === f.value
                              ? "bg-pink-500/10 border border-pink-500 text-pink-400"
                              : "bg-zinc-900/50 border border-zinc-800 text-zinc-300 hover:border-zinc-700"
                          )}
                          style={{ fontFamily: f.value }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Overlay Opacity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-zinc-400 text-xs">Ciemność overlay</Label>
                      <span className="text-zinc-500 text-xs">{overlayOpacity[0]}%</span>
                    </div>
                    <Slider
                      value={overlayOpacity}
                      onValueChange={setOverlayOpacity}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="text" className="mt-0 p-4 space-y-4">
                  <div>
                    <Label className="text-zinc-400 text-xs">Nazwa salonu</Label>
                    <Input
                      value={salonName}
                      onChange={(e) => setSalonName(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-400 text-xs">Nagłówek</Label>
                    <Input
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-400 text-xs">Podtytuł</Label>
                    <Input
                      value={subheadline}
                      onChange={(e) => setSubheadline(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-zinc-400 text-xs">Rabat</Label>
                      <Input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-zinc-400 text-xs">Cena</Label>
                      <Input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-zinc-400 text-xs">CTA</Label>
                    <Input
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-400 text-xs">Cytat / Tip</Label>
                    <Input
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-400 text-xs">Opinia klienta</Label>
                    <Input
                      value={testimonial}
                      onChange={(e) => setTestimonial(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-zinc-400 text-xs">Imię klienta</Label>
                    <Input
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="mt-1.5 bg-zinc-900/50 border-zinc-700/50 text-white"
                    />
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 flex items-center justify-center p-8 bg-zinc-950">
            <div className="relative">
              {/* Preview Container */}
              <div 
                ref={previewRef}
                className={cn(
                  "shadow-2xl rounded-xl overflow-hidden",
                  getAspectRatioClass()
                )}
                style={{
                  width: currentTemplate?.aspectRatio === '9:16' ? '320px' : currentTemplate?.aspectRatio === '4:5' ? '400px' : '480px',
                }}
              >
                {renderTemplate()}
              </div>

              {/* Template Info Badge */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <span className="text-zinc-500 text-xs">{currentTemplate?.name}</span>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-600 text-xs">{currentTemplate?.aspectRatio}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
