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
  Gift,
  Crown,
  Scissors,
  Heart,
  Percent,
  Clock,
  Users,
  MessageCircle,
  TrendingUp,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AspectRatio = '1:1' | '9:16' | '4:5';
type TemplateCategory = 'metamorfoza' | 'promocja' | 'efekt' | 'social' | 'story';

interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  aspectRatio: AspectRatio;
  description: string;
}

const TEMPLATES: Template[] = [
  // METAMORFOZA - Before/After
  { id: 'meta-luxury-split', name: 'Luxury Split', category: 'metamorfoza', aspectRatio: '1:1', description: 'Elegancki podział z efektem blasku' },
  { id: 'meta-diamond-frame', name: 'Diamond Frame', category: 'metamorfoza', aspectRatio: '1:1', description: 'Diamentowe ramki z gradientem' },
  { id: 'meta-neon-glow', name: 'Neon Glow', category: 'metamorfoza', aspectRatio: '1:1', description: 'Neonowy blask wokół zdjęć' },
  { id: 'meta-elegant-arch', name: 'Elegant Arch', category: 'metamorfoza', aspectRatio: '1:1', description: 'Łukowe ramki premium' },
  { id: 'meta-glass-morph', name: 'Glass Morph', category: 'metamorfoza', aspectRatio: '1:1', description: 'Efekt szkła z rozmyciem' },
  
  // PROMOCJA - Discounts & Offers
  { id: 'promo-flash-neon', name: 'Flash Neon', category: 'promocja', aspectRatio: '1:1', description: 'Błyskawiczna promocja z neonem' },
  { id: 'promo-luxury-gold', name: 'Luxury Gold', category: 'promocja', aspectRatio: '1:1', description: 'Złota elegancka oferta' },
  { id: 'promo-minimal-chic', name: 'Minimal Chic', category: 'promocja', aspectRatio: '1:1', description: 'Minimalistyczna promocja' },
  { id: 'promo-gradient-burst', name: 'Gradient Burst', category: 'promocja', aspectRatio: '1:1', description: 'Eksplozja gradientów' },
  { id: 'promo-countdown', name: 'Countdown', category: 'promocja', aspectRatio: '1:1', description: 'Promocja z odliczaniem' },
  
  // EFEKT - Showcase Results
  { id: 'efekt-spotlight', name: 'Spotlight', category: 'efekt', aspectRatio: '1:1', description: 'Reflektor na efekcie' },
  { id: 'efekt-magazine', name: 'Magazine Cover', category: 'efekt', aspectRatio: '4:5', description: 'Okładka magazynu' },
  { id: 'efekt-editorial', name: 'Editorial', category: 'efekt', aspectRatio: '4:5', description: 'Styl edytorialny' },
  { id: 'efekt-cinematic', name: 'Cinematic', category: 'efekt', aspectRatio: '1:1', description: 'Kinowy look' },
  
  // SOCIAL - Quotes & Tips
  { id: 'social-beauty-tip', name: 'Beauty Tip', category: 'social', aspectRatio: '1:1', description: 'Porada beauty' },
  { id: 'social-quote-elegant', name: 'Quote Elegant', category: 'social', aspectRatio: '1:1', description: 'Elegancki cytat' },
  { id: 'social-review-card', name: 'Review Card', category: 'social', aspectRatio: '1:1', description: 'Opinia klienta' },
  { id: 'social-announcement', name: 'Announcement', category: 'social', aspectRatio: '1:1', description: 'Ogłoszenie' },
  { id: 'social-stats', name: 'Stats Card', category: 'social', aspectRatio: '1:1', description: 'Statystyki sukcesu' },
  
  // STORY - 9:16 format
  { id: 'story-promo-full', name: 'Story Promo', category: 'story', aspectRatio: '9:16', description: 'Promocja na stories' },
  { id: 'story-before-after', name: 'Story B/A', category: 'story', aspectRatio: '9:16', description: 'Przed/po na stories' },
  { id: 'story-cta-swipe', name: 'Story CTA', category: 'story', aspectRatio: '9:16', description: 'Call to action na stories' },
  { id: 'story-testimonial', name: 'Story Review', category: 'story', aspectRatio: '9:16', description: 'Opinia na stories' },
];

const CATEGORY_INFO: Record<TemplateCategory, { label: string; icon: React.ReactNode; color: string }> = {
  metamorfoza: { label: 'Przed/Po', icon: <Camera className="w-4 h-4" />, color: 'from-pink-500 to-rose-500' },
  promocja: { label: 'Promocje', icon: <Zap className="w-4 h-4" />, color: 'from-amber-500 to-orange-500' },
  efekt: { label: 'Efekty', icon: <Sparkles className="w-4 h-4" />, color: 'from-violet-500 to-purple-500' },
  social: { label: 'Social', icon: <Star className="w-4 h-4" />, color: 'from-cyan-500 to-blue-500' },
  story: { label: 'Stories', icon: <Layers className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500' },
};

const ACCENT_COLORS = [
  { name: 'Neon Pink', value: '#ff0080', glow: 'rgba(255,0,128,0.6)' },
  { name: 'Hot Coral', value: '#ff4d6d', glow: 'rgba(255,77,109,0.6)' },
  { name: 'Rose Gold', value: '#e8b4b8', glow: 'rgba(232,180,184,0.5)' },
  { name: 'Luxury Gold', value: '#d4af37', glow: 'rgba(212,175,55,0.5)' },
  { name: 'Electric Purple', value: '#a855f7', glow: 'rgba(168,85,247,0.6)' },
  { name: 'Ocean Blue', value: '#0ea5e9', glow: 'rgba(14,165,233,0.6)' },
  { name: 'Emerald', value: '#10b981', glow: 'rgba(16,185,129,0.6)' },
  { name: 'Pure White', value: '#ffffff', glow: 'rgba(255,255,255,0.4)' },
];

const FONTS = [
  { name: 'Elegancki Serif', value: "'Playfair Display', serif" },
  { name: 'Nowoczesny Sans', value: "'Inter', sans-serif" },
  { name: 'Luksusowy', value: "'Cormorant Garamond', serif" },
  { name: 'Bold Impact', value: "'Montserrat', sans-serif" },
  { name: 'Minimalistyczny', value: "'Helvetica Neue', sans-serif" },
];

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState('meta-luxury-split');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  // Text content
  const [headline, setHeadline] = useState('Twoja metamorfoza');
  const [subheadline, setSubheadline] = useState('Profesjonalne zabiegi');
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [discount, setDiscount] = useState('-30%');
  const [originalPrice, setOriginalPrice] = useState('499 zł');
  const [newPrice, setNewPrice] = useState('349 zł');
  const [cta, setCta] = useState('Zarezerwuj teraz');
  const [quote, setQuote] = useState('Piękno to siła, która zmienia świat');
  const [testimonial, setTestimonial] = useState('Jestem absolutnie zachwycona efektami! Profesjonalna obsługa i niesamowite rezultaty.');
  const [clientName, setClientName] = useState('Anna K.');
  const [serviceName, setServiceName] = useState('Lifting twarzy');
  const [tipTitle, setTipTitle] = useState('Codzienna pielęgnacja');
  const [tipContent, setTipContent] = useState('Nawilżaj skórę rano i wieczorem, stosuj SPF 50 każdego dnia.');
  const [statNumber, setStatNumber] = useState('98%');
  const [statLabel, setStatLabel] = useState('zadowolonych klientek');
  const [countdown, setCountdown] = useState('24h');
  
  // Styling
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [font, setFont] = useState(FONTS[0].value);
  const [overlayOpacity, setOverlayOpacity] = useState([40]);
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
    setHeadline('Twoja metamorfoza');
    setSubheadline('Profesjonalne zabiegi');
    setSalonName('Beauty Studio');
    setDiscount('-30%');
    setOriginalPrice('499 zł');
    setNewPrice('349 zł');
    setCta('Zarezerwuj teraz');
    setQuote('Piękno to siła, która zmienia świat');
    setTestimonial('Jestem absolutnie zachwycona efektami! Profesjonalna obsługa i niesamowite rezultaty.');
    setClientName('Anna K.');
    setServiceName('Lifting twarzy');
    setTipTitle('Codzienna pielęgnacja');
    setTipContent('Nawilżaj skórę rano i wieczorem, stosuj SPF 50 każdego dnia.');
    setStatNumber('98%');
    setStatLabel('zadowolonych klientek');
    setCountdown('24h');
    setAccentColor(ACCENT_COLORS[0]);
    setOverlayOpacity([40]);
    toast.success('Ustawienia zresetowane');
  };

  const ImageUploadBox = ({ 
    label, 
    image, 
    onUpload, 
    onClear,
    aspectRatio = 'aspect-[4/3]'
  }: { 
    label: string; 
    image: string | null; 
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    aspectRatio?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-muted-foreground text-xs font-medium">{label}</Label>
      {image ? (
        <div className={cn("relative rounded-xl overflow-hidden border border-border/50 group", aspectRatio)}>
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 p-2 bg-black/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:scale-110"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <label className={cn("flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-all bg-secondary/30 hover:bg-secondary/50 group", aspectRatio)}>
          <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-3">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Dodaj zdjęcie</span>
          <span className="text-xs text-muted-foreground/60 mt-1">PNG, JPG do 10MB</span>
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
      position: 'relative',
      overflow: 'hidden',
    };

    switch (selectedTemplate) {
      // ============ METAMORFOZA TEMPLATES ============
      case 'meta-luxury-split':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a12 50%, #0a0a0a 100%)' }}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: color }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-15" style={{ background: color }} />
            
            {/* Main content */}
            <div className="absolute inset-0 p-8 flex gap-5">
              {/* Before */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                  <img src={before} alt="Before" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, transparent 50%)` }} />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
                  <span className="text-white/80 text-sm font-medium tracking-[0.25em]">PRZED</span>
                </div>
              </div>
              
              {/* Divider with glow */}
              <div className="relative flex items-center justify-center w-2">
                <div className="absolute h-[80%] w-1 rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${color}, ${color}, transparent)`, boxShadow: `0 0 30px ${glow}, 0 0 60px ${glow}` }} />
                <div className="absolute w-4 h-4 rounded-full" style={{ background: color, boxShadow: `0 0 20px ${glow}` }} />
              </div>
              
              {/* After */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ boxShadow: `0 0 80px ${glow}, 0 0 0 2px ${color}30` }}>
                  <img src={after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, transparent 50%)` }} />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 30px ${glow}` }}>
                  <span className="text-white text-sm font-bold tracking-[0.25em]">PO</span>
                </div>
              </div>
            </div>
            
            {/* Header */}
            <div className="absolute top-4 left-0 right-0 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase font-medium" style={{ color: `${color}90` }}>{salonName}</p>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <h2 className="text-white text-2xl font-bold tracking-wide">{headline}</h2>
              <p className="text-white/50 text-sm mt-1">{subheadline}</p>
            </div>
          </div>
        );

      case 'meta-diamond-frame':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #050505 0%, #0d0d0d 100%)' }}>
            {/* Diamond pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23fff' fill-opacity='0.1'/%3E%3C/svg%3E")` }} />
            
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-24 blur-[100px] opacity-30 rotate-45" style={{ background: color }} />
            
            <div className="absolute inset-0 flex items-center justify-center p-10 gap-6">
              {/* Before frame */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 rotate-[2deg] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img src={before} alt="Before" className="w-full h-full object-cover grayscale-[20%]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-3 left-4 px-4 py-1.5 bg-zinc-900/90 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-white/60 text-[10px] tracking-[0.3em] font-medium">PRZED</span>
                </div>
              </div>
              
              {/* Center diamond */}
              <div className="relative z-10 w-10 h-10 rotate-45 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, boxShadow: `0 0 40px ${glow}` }}>
                <Sparkles className="w-4 h-4 text-white -rotate-45" />
              </div>
              
              {/* After frame */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 -rotate-[2deg] rounded-2xl overflow-hidden" style={{ border: `2px solid ${color}50`, boxShadow: `0 0 60px ${glow}` }}>
                  <img src={after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-black/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-3 right-4 px-4 py-1.5 rounded-full" style={{ background: color, boxShadow: `0 4px 20px ${glow}` }}>
                  <span className="text-white text-[10px] tracking-[0.3em] font-bold">PO</span>
                </div>
              </div>
            </div>
            
            {/* Title */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h2 className="text-3xl font-bold text-white">{headline}</h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
                <p className="text-sm uppercase tracking-[0.3em]" style={{ color }}>{serviceName}</p>
                <div className="w-12 h-px" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
              </div>
            </div>
            
            {/* Logo */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase">{salonName}</p>
            </div>
          </div>
        );

      case 'meta-neon-glow':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#000' }}>
            {/* Neon grid background */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: `linear-gradient(${color}20 1px, transparent 1px), linear-gradient(90deg, ${color}20 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            
            {/* Intense glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 blur-[80px] opacity-50" style={{ background: color }} />
            
            <div className="absolute inset-0 p-8 flex gap-6">
              {/* Before */}
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 0 2px ${color}30, 0 0 30px ${glow}` }}>
                <img src={before} alt="Before" className="w-full h-full object-cover" style={{ filter: 'brightness(0.9) contrast(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${color}50, transparent)` }} />
                <span className="absolute bottom-4 left-4 text-white/70 text-xs tracking-[0.4em] font-bold">PRZED</span>
              </div>
              
              {/* After */}
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 0 3px ${color}, 0 0 60px ${glow}, 0 0 100px ${glow}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" style={{ filter: 'brightness(1.05) contrast(1.1) saturate(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 text-sm tracking-[0.4em] font-black" style={{ color, textShadow: `0 0 20px ${glow}, 0 0 40px ${glow}` }}>PO</span>
              </div>
            </div>
            
            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)`, boxShadow: `0 0 30px ${glow}` }} />
            
            {/* Title */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h2 className="text-3xl font-black text-white" style={{ textShadow: `0 0 40px ${glow}` }}>{headline}</h2>
              <p className="text-white/40 text-[10px] mt-2 tracking-[0.5em] uppercase">{salonName}</p>
            </div>
          </div>
        );

      case 'meta-elegant-arch':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0c0c0c 0%, #0a0507 100%)' }}>
            {/* Soft glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-48 rounded-full blur-[100px] opacity-20" style={{ background: color }} />
            
            <div className="absolute inset-0 p-10">
              <div className="relative w-full h-full flex gap-8">
                {/* Before - rounded arch */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 rounded-t-full overflow-hidden border border-white/10">
                    <img src={before} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity * 1.2}) 0%, transparent 60%)` }} />
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <span className="text-white/60 text-sm tracking-[0.3em] font-medium">PRZED</span>
                  </div>
                </div>
                
                {/* After - rounded arch */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 rounded-t-full overflow-hidden" style={{ border: `2px solid ${color}40`, boxShadow: `0 0 60px ${glow}` }}>
                    <img src={after} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity * 1.2}) 0%, transparent 60%)` }} />
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <span className="text-sm font-bold tracking-[0.3em]" style={{ color, textShadow: `0 0 20px ${glow}` }}>PO</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Header */}
            <div className="absolute top-5 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-white/40 text-xs mt-2">{subheadline}</p>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <p className="text-[9px] tracking-[0.5em] uppercase" style={{ color: `${color}80` }}>{salonName}</p>
            </div>
          </div>
        );

      case 'meta-glass-morph':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#080808' }}>
            {/* Background blobs */}
            <div className="absolute top-10 right-10 w-40 h-40 rounded-full blur-[80px] opacity-40" style={{ background: color }} />
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full blur-[60px] opacity-30" style={{ background: color }} />
            
            <div className="absolute inset-0 p-8 flex items-center gap-6">
              {/* Before */}
              <div className="flex-1 relative h-[85%]">
                <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                  <img src={before} alt="Before" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/20">
                  <span className="text-white/70 text-xs tracking-[0.3em]">PRZED</span>
                </div>
              </div>
              
              {/* After */}
              <div className="flex-1 relative h-[85%]">
                <div className="absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-sm" style={{ background: `linear-gradient(135deg, ${color}20, transparent)`, border: `1px solid ${color}50`, boxShadow: `0 0 50px ${glow}` }}>
                  <img src={after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${color}20, transparent)` }} />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full backdrop-blur-xl" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 20px ${glow}` }}>
                  <span className="text-white text-xs font-bold tracking-[0.3em]">PO</span>
                </div>
              </div>
            </div>
            
            {/* Title */}
            <div className="absolute top-5 left-0 right-0 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color: `${color}80` }}>{salonName}</p>
            </div>
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
            </div>
          </div>
        );

      // ============ PROMOCJA TEMPLATES ============
      case 'promo-flash-neon':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#000' }}>
            {/* Intense neon effects */}
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: `linear-gradient(${color}30 1px, transparent 1px), linear-gradient(90deg, ${color}30 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
            <div className="absolute top-0 left-0 right-0 h-48 blur-[80px] opacity-50" style={{ background: color }} />
            <div className="absolute bottom-0 left-0 right-0 h-32 blur-[60px] opacity-30" style={{ background: color }} />
            
            {/* Main image */}
            <div className="absolute inset-0">
              <img src={main} alt="Promotion" className="w-full h-full object-cover" style={{ filter: 'brightness(0.5)' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-2">
                <span className="text-[10px] tracking-[0.5em] uppercase font-medium" style={{ color: `${color}80` }}>{salonName}</span>
              </div>
              
              <div className="relative mb-4">
                <span className="absolute -top-4 right-0 text-white/40 text-lg line-through">{originalPrice}</span>
                <h1 className="text-8xl font-black" style={{ color, textShadow: `0 0 60px ${glow}, 0 0 120px ${glow}` }}>{discount}</h1>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">{serviceName}</h2>
              <p className="text-white/60 text-sm mb-6">{subheadline}</p>
              
              <div className="px-8 py-4 rounded-full" style={{ background: color, boxShadow: `0 0 40px ${glow}` }}>
                <span className="text-white font-bold tracking-wide">{cta}</span>
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" style={{ color }} />
                <span className="text-white/60 text-sm">Tylko przez {countdown}</span>
              </div>
            </div>
            
            {/* Neon borders */}
            <div className="absolute inset-x-4 top-4 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)`, boxShadow: `0 0 20px ${glow}` }} />
            <div className="absolute inset-x-4 bottom-4 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)`, boxShadow: `0 0 20px ${glow}` }} />
          </div>
        );

      case 'promo-luxury-gold':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a08 0%, #0d0c08 100%)' }}>
            {/* Gold accent glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 blur-[80px] opacity-30" style={{ background: color }} />
            
            {/* Decorative corners */}
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2" style={{ borderColor: color }} />
            <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2" style={{ borderColor: color }} />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2" style={{ borderColor: color }} />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2" style={{ borderColor: color }} />
            
            {/* Main image */}
            <div className="absolute inset-16 rounded-xl overflow-hidden">
              <img src={main} alt="Luxury" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity * 1.5}), transparent 60%)` }} />
            </div>
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center">
              <div className="w-full max-w-xs">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color }}>{salonName}</p>
                <h2 className="text-2xl font-bold text-white mb-2">{serviceName}</h2>
                
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-white/40 text-lg line-through">{originalPrice}</span>
                  <span className="text-3xl font-black" style={{ color }}>{newPrice}</span>
                </div>
                
                <p className="text-white/60 text-sm mb-4">{subheadline}</p>
                
                <div className="inline-flex px-8 py-3 rounded-full border-2" style={{ borderColor: color }}>
                  <span className="text-sm font-medium tracking-wide" style={{ color }}>{cta}</span>
                </div>
              </div>
            </div>
            
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-8 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
          </div>
        );

      case 'promo-minimal-chic':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#fafafa' }}>
            {/* Clean minimal layout */}
            <div className="absolute inset-0 flex">
              {/* Image half */}
              <div className="w-1/2 relative">
                <img src={main} alt="Service" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, rgba(250,250,250,${opacity}))` }} />
              </div>
              
              {/* Content half */}
              <div className="w-1/2 flex flex-col items-center justify-center p-8 text-center">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color }}>{salonName}</p>
                
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">{serviceName}</h2>
                
                <div className="mb-6">
                  <span className="text-6xl font-black" style={{ color }}>{discount}</span>
                </div>
                
                <p className="text-zinc-500 text-sm mb-6">{subheadline}</p>
                
                <div className="px-8 py-3 rounded-full" style={{ background: color }}>
                  <span className="text-white text-sm font-medium">{cta}</span>
                </div>
              </div>
            </div>
            
            {/* Accent line */}
            <div className="absolute bottom-0 inset-x-0 h-2" style={{ background: color }} />
          </div>
        );

      case 'promo-gradient-burst':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}15 50%, #0a0a0a 100%)` }}>
            {/* Burst effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20" style={{ 
              background: `conic-gradient(from 0deg, transparent, ${color}, transparent, ${color}, transparent)`,
              animation: 'spin 20s linear infinite'
            }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color }}>{salonName}</p>
              
              <div className="relative mb-4">
                <div className="absolute -inset-8 rounded-full blur-3xl opacity-30" style={{ background: color }} />
                <h1 className="relative text-9xl font-black text-white">{discount}</h1>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">{serviceName}</h2>
              <p className="text-white/50 text-sm mb-8 max-w-xs">{subheadline}</p>
              
              <div className="flex items-center gap-4">
                <span className="text-white/40 line-through">{originalPrice}</span>
                <div className="px-8 py-4 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 0 40px ${glow}` }}>
                  <span className="text-white font-bold text-lg">{newPrice}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'promo-countdown':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #080808 0%, #0c0c0c 100%)' }}>
            {/* Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-32 blur-[100px] opacity-40" style={{ background: color }} />
            
            {/* Image background */}
            <div className="absolute inset-0">
              <img src={main} alt="Countdown" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4">
                <Zap className="w-8 h-8" style={{ color }} />
              </div>
              
              <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color }}>{salonName}</p>
              <h2 className="text-2xl font-bold text-white mb-6">{serviceName}</h2>
              
              {/* Countdown display */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}50` }}>
                  <span className="text-3xl font-black text-white">{countdown.replace(/\D/g, '')}</span>
                  <span className="text-[10px] text-white/60 uppercase tracking-wider">Godzin</span>
                </div>
              </div>
              
              <div className="text-5xl font-black mb-4" style={{ color, textShadow: `0 0 30px ${glow}` }}>{discount}</div>
              
              <div className="px-8 py-4 rounded-full" style={{ background: color, boxShadow: `0 0 30px ${glow}` }}>
                <span className="text-white font-bold">{cta}</span>
              </div>
            </div>
          </div>
        );

      // ============ EFEKT TEMPLATES ============
      case 'efekt-spotlight':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#000' }}>
            {/* Spotlight effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-60" style={{
              background: `radial-gradient(ellipse at top, ${color}40 0%, transparent 60%)`
            }} />
            
            {/* Main image */}
            <div className="absolute inset-8 rounded-3xl overflow-hidden" style={{ boxShadow: `0 0 80px ${glow}` }}>
              <img src={main} alt="Effect" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-white/60 text-sm mb-4">{subheadline}</p>
              <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>{salonName}</p>
            </div>
          </div>
        );

      case 'efekt-magazine':
        return (
          <div className="w-full aspect-[4/5]" style={{ ...baseStyles, background: '#000' }}>
            {/* Full image */}
            <div className="absolute inset-0">
              <img src={main} alt="Magazine" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            </div>
            
            {/* Magazine style overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* Top bar */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] tracking-[0.5em] uppercase font-bold" style={{ color }}>{salonName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-[10px] tracking-widest uppercase">Beauty</p>
                  <p className="text-white/40 text-[10px]">Edition</p>
                </div>
              </div>
              
              {/* Bottom content */}
              <div>
                <h1 className="text-5xl font-black text-white leading-tight mb-3">{headline}</h1>
                <p className="text-white/70 text-lg mb-4">{subheadline}</p>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1" style={{ background: color }} />
                  <span className="text-xs uppercase tracking-[0.3em]" style={{ color }}>{serviceName}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'efekt-editorial':
        return (
          <div className="w-full aspect-[4/5]" style={{ ...baseStyles, background: '#0a0a0a' }}>
            {/* Image with editorial treatment */}
            <div className="absolute inset-6 rounded-2xl overflow-hidden">
              <img src={main} alt="Editorial" className="w-full h-full object-cover" style={{ filter: 'contrast(1.1) brightness(0.95)' }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity * 1.2}) 0%, transparent 40%)` }} />
            </div>
            
            {/* Decorative line */}
            <div className="absolute top-6 left-6 w-px h-24" style={{ background: color }} />
            <div className="absolute bottom-6 right-6 w-24 h-px" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color }}>{salonName}</p>
              <h2 className="text-4xl font-bold text-white leading-tight mb-2">{headline}</h2>
              <p className="text-white/60 text-sm">{subheadline}</p>
            </div>
          </div>
        );

      case 'efekt-cinematic':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#000' }}>
            {/* Cinematic bars */}
            <div className="absolute top-0 left-0 right-0 h-[15%] bg-black z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-black z-10" />
            
            {/* Main image */}
            <div className="absolute inset-0">
              <img src={main} alt="Cinematic" className="w-full h-full object-cover" style={{ filter: 'contrast(1.15) saturate(0.9)' }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(0,0,0,0.5), transparent, rgba(0,0,0,0.5))` }} />
            </div>
            
            {/* Content in bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-black z-10 flex items-center justify-between px-8">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
              <span className="text-sm" style={{ color }}>{salonName}</span>
            </div>
          </div>
        );

      // ============ SOCIAL TEMPLATES ============
      case 'social-beauty-tip':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0810 100%)' }}>
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-[100px] opacity-25" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${color}20`, boxShadow: `0 0 30px ${glow}` }}>
                <Sparkles className="w-8 h-8" style={{ color }} />
              </div>
              
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color }}>{salonName}</p>
              
              <h2 className="text-2xl font-bold text-white mb-4">{tipTitle}</h2>
              
              <p className="text-white/70 text-lg leading-relaxed max-w-xs mb-6">{tipContent}</p>
              
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" style={{ color }} />
                <span className="text-white/50 text-sm">Zapisz na później</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-12 h-12 border border-white/10 rounded-full" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border border-white/10 rounded-full" />
          </div>
        );

      case 'social-quote-elegant':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            {/* Subtle radial */}
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)` }} />
            
            {/* Quote marks */}
            <div className="absolute top-12 left-12 text-8xl font-serif opacity-20" style={{ color }}>"</div>
            <div className="absolute bottom-12 right-12 text-8xl font-serif opacity-20 rotate-180" style={{ color }}>"</div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-14 text-center">
              <p className="text-2xl font-light text-white leading-relaxed mb-8 italic">{quote}</p>
              
              <div className="w-16 h-px mb-6" style={{ background: color }} />
              
              <p className="text-sm tracking-[0.3em] uppercase" style={{ color }}>{salonName}</p>
            </div>
          </div>
        );

      case 'social-review-card':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0d12 100%)' }}>
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-[100px] opacity-20" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {/* Stars */}
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" style={{ color }} />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-xl text-white leading-relaxed mb-8 max-w-sm italic">"{testimonial}"</p>
              
              {/* Client */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: color }}>
                  <img src={main} alt="Client" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">{clientName}</p>
                  <p className="text-white/50 text-sm">{serviceName}</p>
                </div>
              </div>
              
              {/* Salon */}
              <p className="text-[10px] tracking-[0.4em] uppercase mt-8" style={{ color: `${color}80` }}>{salonName}</p>
            </div>
          </div>
        );

      case 'social-announcement':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(to right, ${color}, ${color}80)` }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${color}20`, border: `2px solid ${color}` }}>
                <MessageCircle className="w-7 h-7" style={{ color }} />
              </div>
              
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color }}>{salonName}</p>
              
              <h2 className="text-3xl font-bold text-white mb-4">{headline}</h2>
              <p className="text-white/60 text-lg mb-8 max-w-xs">{subheadline}</p>
              
              <div className="px-8 py-4 rounded-full" style={{ background: color, boxShadow: `0 0 30px ${glow}` }}>
                <span className="text-white font-medium">{cta}</span>
              </div>
            </div>
          </div>
        );

      case 'social-stats':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a0a 0%, #0a0810 100%)' }}>
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color }}>{salonName}</p>
              
              <div className="relative mb-4">
                <h1 className="text-8xl font-black text-white">{statNumber}</h1>
                <div className="absolute -inset-4 rounded-full blur-2xl opacity-20" style={{ background: color }} />
              </div>
              
              <p className="text-xl text-white/70 mb-8">{statLabel}</p>
              
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5" style={{ color }} />
                <span className="text-white/50">{subheadline}</span>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full" style={{ background: color, opacity: 0.3 }} />
            <div className="absolute bottom-10 right-10 w-6 h-6 rounded-full" style={{ background: color, opacity: 0.2 }} />
          </div>
        );

      // ============ STORY TEMPLATES ============
      case 'story-promo-full':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: '#000' }}>
            {/* Background image */}
            <div className="absolute inset-0">
              <img src={main} alt="Story" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            
            {/* Top glow */}
            <div className="absolute top-0 inset-x-0 h-48 blur-[60px] opacity-40" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* Top */}
              <div className="text-center pt-8">
                <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color }}>{salonName}</p>
              </div>
              
              {/* Middle - Discount */}
              <div className="text-center">
                <span className="text-8xl font-black text-white" style={{ textShadow: `0 0 60px ${glow}` }}>{discount}</span>
                <h2 className="text-2xl font-bold text-white mt-4">{serviceName}</h2>
              </div>
              
              {/* Bottom */}
              <div className="text-center pb-12">
                <p className="text-white/60 text-sm mb-6">{subheadline}</p>
                <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full" style={{ background: color, boxShadow: `0 0 40px ${glow}` }}>
                  <span className="text-white font-bold">{cta}</span>
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'story-before-after':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: '#000' }}>
            {/* Two images stacked */}
            <div className="absolute inset-0 flex flex-col">
              {/* Before */}
              <div className="flex-1 relative">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                <span className="absolute bottom-4 left-4 text-white/60 text-sm tracking-[0.3em]">PRZED</span>
              </div>
              
              {/* Divider */}
              <div className="h-1 relative z-10" style={{ background: color, boxShadow: `0 0 30px ${glow}` }} />
              
              {/* After */}
              <div className="flex-1 relative">
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/60" />
                <span className="absolute top-4 right-4 text-sm font-bold tracking-[0.3em]" style={{ color, textShadow: `0 0 20px ${glow}` }}>PO</span>
              </div>
            </div>
            
            {/* Bottom overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 text-center" style={{ background: 'linear-gradient(to top, black, transparent)' }}>
              <h2 className="text-2xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>{salonName}</p>
            </div>
          </div>
        );

      case 'story-cta-swipe':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a0a 0%, #0a0810 100%)' }}>
            {/* Background image */}
            <div className="absolute inset-0">
              <img src={main} alt="CTA" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>
            
            {/* Glow */}
            <div className="absolute bottom-0 inset-x-0 h-64 blur-[80px] opacity-40" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 pb-16 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color }}>{salonName}</p>
              <h2 className="text-3xl font-bold text-white mb-3">{headline}</h2>
              <p className="text-white/60 mb-8">{subheadline}</p>
              
              {/* Swipe indicator */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center animate-bounce" style={{ background: color, boxShadow: `0 0 30px ${glow}` }}>
                  <TrendingUp className="w-5 h-5 text-white rotate-[-45deg]" />
                </div>
                <span className="text-white/60 text-sm">Przesuń w górę</span>
              </div>
            </div>
          </div>
        );

      case 'story-testimonial':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0810 100%)' }}>
            {/* Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: color }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {/* Client photo */}
              <div className="w-24 h-24 rounded-full overflow-hidden mb-8" style={{ boxShadow: `0 0 0 4px ${color}` }}>
                <img src={main} alt="Client" className="w-full h-full object-cover" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color }} />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-xl text-white leading-relaxed mb-8 italic max-w-sm">"{testimonial}"</p>
              
              {/* Client name */}
              <p className="text-white font-medium text-lg">{clientName}</p>
              <p className="text-white/50 text-sm">{serviceName}</p>
              
              {/* Salon */}
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>{salonName}</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full aspect-square flex items-center justify-center bg-secondary/50 rounded-2xl">
            <p className="text-muted-foreground">Wybierz szablon</p>
          </div>
        );
    }
  };

  // Get category-specific text fields
  const renderCategoryTextFields = () => {
    const category = currentTemplate?.category;
    
    const CommonFields = () => (
      <>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">Nazwa salonu</Label>
          <Input value={salonName} onChange={(e) => setSalonName(e.target.value)} className="bg-secondary/50 border-border/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">Nagłówek</Label>
          <Input value={headline} onChange={(e) => setHeadline(e.target.value)} className="bg-secondary/50 border-border/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">Podtytuł</Label>
          <Input value={subheadline} onChange={(e) => setSubheadline(e.target.value)} className="bg-secondary/50 border-border/50" />
        </div>
      </>
    );

    switch (category) {
      case 'metamorfoza':
        return (
          <>
            <CommonFields />
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Nazwa zabiegu</Label>
              <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
          </>
        );
      
      case 'promocja':
        return (
          <>
            <CommonFields />
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Rabat</Label>
              <Input value={discount} onChange={(e) => setDiscount(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Stara cena</Label>
                <Input value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Nowa cena</Label>
                <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Nazwa zabiegu</Label>
              <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">CTA (przycisk)</Label>
              <Input value={cta} onChange={(e) => setCta(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Odliczanie</Label>
              <Input value={countdown} onChange={(e) => setCountdown(e.target.value)} className="bg-secondary/50 border-border/50" placeholder="np. 24h, 2 dni" />
            </div>
          </>
        );
      
      case 'social':
        return (
          <>
            <CommonFields />
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Cytat / Tip tytuł</Label>
              <Input value={tipTitle} onChange={(e) => setTipTitle(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Treść / Tip zawartość</Label>
              <Input value={tipContent} onChange={(e) => setTipContent(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Cytat</Label>
              <Input value={quote} onChange={(e) => setQuote(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Opinia klienta</Label>
              <Input value={testimonial} onChange={(e) => setTestimonial(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Imię klienta</Label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Zabieg</Label>
                <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Statystyka liczba</Label>
                <Input value={statNumber} onChange={(e) => setStatNumber(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Statystyka opis</Label>
                <Input value={statLabel} onChange={(e) => setStatLabel(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">CTA (przycisk)</Label>
              <Input value={cta} onChange={(e) => setCta(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
          </>
        );
      
      case 'story':
        return (
          <>
            <CommonFields />
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Rabat</Label>
              <Input value={discount} onChange={(e) => setDiscount(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Nazwa zabiegu</Label>
              <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Opinia klienta</Label>
              <Input value={testimonial} onChange={(e) => setTestimonial(e.target.value)} className="bg-secondary/50 border-border/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Imię klienta</Label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">CTA</Label>
                <Input value={cta} onChange={(e) => setCta(e.target.value)} className="bg-secondary/50 border-border/50" />
              </div>
            </div>
          </>
        );
      
      default:
        return <CommonFields />;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Generator Grafik</h1>
                <p className="text-sm text-muted-foreground">Twórz profesjonalne grafiki do Facebook Ads</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button onClick={handleDownload} disabled={generating} className="gap-2 bg-primary hover:bg-primary/90" size="sm">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Pobierz PNG
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Left Panel - Controls */}
          <div className="w-[420px] border-r border-border/50 bg-card/20 flex flex-col">
            <Tabs defaultValue="templates" className="flex-1 flex flex-col">
              <div className="border-b border-border/50 px-4 pt-4">
                <TabsList className="w-full grid grid-cols-4 bg-secondary/50">
                  <TabsTrigger value="templates" className="gap-2 text-xs">
                    <Layers className="w-3.5 h-3.5" />
                    Szablony
                  </TabsTrigger>
                  <TabsTrigger value="images" className="gap-2 text-xs">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Zdjęcia
                  </TabsTrigger>
                  <TabsTrigger value="style" className="gap-2 text-xs">
                    <Palette className="w-3.5 h-3.5" />
                    Styl
                  </TabsTrigger>
                  <TabsTrigger value="text" className="gap-2 text-xs">
                    <Type className="w-3.5 h-3.5" />
                    Tekst
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                {/* Templates Tab */}
                <TabsContent value="templates" className="m-0 p-4">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        selectedCategory === 'all'
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      Wszystkie
                    </button>
                    {(Object.entries(CATEGORY_INFO) as [TemplateCategory, typeof CATEGORY_INFO[TemplateCategory]][]).map(([key, info]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                          selectedCategory === key
                            ? `bg-gradient-to-r ${info.color} text-white`
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {info.icon}
                        {info.label}
                      </button>
                    ))}
                  </div>

                  {/* Template grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map((template) => {
                      const catInfo = CATEGORY_INFO[template.category];
                      return (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={cn(
                            "relative p-3 rounded-xl text-left transition-all group",
                            selectedTemplate === template.id
                              ? "bg-primary/20 ring-2 ring-primary"
                              : "bg-secondary/30 hover:bg-secondary/50 ring-1 ring-border/30"
                          )}
                        >
                          {/* Template preview placeholder */}
                          <div className={cn(
                            "rounded-lg mb-2 flex items-center justify-center",
                            template.aspectRatio === '9:16' ? 'aspect-[9/16]' : template.aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'
                          )} style={{ background: `linear-gradient(135deg, ${ACCENT_COLORS[0].value}20, ${ACCENT_COLORS[0].value}05)` }}>
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r", catInfo.color)}>
                              {catInfo.icon}
                            </div>
                          </div>
                          
                          <p className="text-xs font-medium text-foreground mb-0.5">{template.name}</p>
                          <p className="text-[10px] text-muted-foreground">{template.description}</p>
                          
                          {/* Selected indicator */}
                          {selectedTemplate === template.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="m-0 p-4 space-y-4">
                  {needsBeforeAfter ? (
                    <>
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
                    </>
                  ) : (
                    <ImageUploadBox
                      label="Główne zdjęcie"
                      image={mainImage}
                      onUpload={handleImageUpload(setMainImage)}
                      onClear={() => setMainImage(null)}
                    />
                  )}
                  
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-3">Wskazówki:</p>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        Używaj zdjęć wysokiej jakości (min. 1080x1080px)
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        Dobre oświetlenie to klucz do sukcesu
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        Podobne tło przed/po wygląda profesjonalnie
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                {/* Style Tab */}
                <TabsContent value="style" className="m-0 p-4 space-y-6">
                  {/* Accent Color */}
                  <div className="space-y-3">
                    <Label className="text-muted-foreground text-xs font-medium">Kolor akcentu</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {ACCENT_COLORS.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setAccentColor(c)}
                          className={cn(
                            "aspect-square rounded-xl transition-all relative group",
                            accentColor.value === c.value ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-95" : "hover:scale-105"
                          )}
                          style={{ background: c.value, boxShadow: accentColor.value === c.value ? `0 0 20px ${c.glow}` : 'none' }}
                        >
                          {accentColor.value === c.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{accentColor.name}</p>
                  </div>

                  {/* Font */}
                  <div className="space-y-3">
                    <Label className="text-muted-foreground text-xs font-medium">Czcionka</Label>
                    <div className="space-y-2">
                      {FONTS.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setFont(f.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl text-left transition-all",
                            font === f.value
                              ? "bg-primary/20 ring-1 ring-primary"
                              : "bg-secondary/30 hover:bg-secondary/50"
                          )}
                        >
                          <span className="text-sm" style={{ fontFamily: f.value }}>{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Overlay Opacity */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground text-xs font-medium">Przyciemnienie</Label>
                      <span className="text-xs text-muted-foreground">{overlayOpacity[0]}%</span>
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

                {/* Text Tab */}
                <TabsContent value="text" className="m-0 p-4 space-y-4">
                  {renderCategoryTextFields()}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8 overflow-auto">
            <div className="relative">
              {/* Preview container with proper scaling */}
              <div 
                ref={previewRef}
                className={cn("w-[500px] shadow-2xl", getAspectRatioClass())}
                style={{ 
                  boxShadow: `0 0 100px ${accentColor.glow}, 0 25px 50px -12px rgba(0, 0, 0, 0.8)`
                }}
              >
                {renderTemplate()}
              </div>
              
              {/* Template info badge */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {currentTemplate?.name} • {currentTemplate?.aspectRatio}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
