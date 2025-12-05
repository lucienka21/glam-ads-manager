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
import { Download, RotateCcw, Sparkles, Loader2, Upload, X, Palette, Type, Layers, ImageIcon, Wand2, Star, Zap, Heart, Crown, Gift, Camera, Scissors, Gem, Flower2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type AspectRatio = '1:1' | '9:16' | '4:5';
type TemplateCategory = 'metamorfoza' | 'promocja' | 'efekt' | 'rezerwacja' | 'social' | 'testimonial' | 'story' | 'cennik';

interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  aspectRatio: AspectRatio;
  premium?: boolean;
}

const TEMPLATES: Template[] = [
  // METAMORFOZA - przed/po
  { id: 'meta-luxury-split', name: 'Luxury Split', category: 'metamorfoza', aspectRatio: '1:1', premium: true },
  { id: 'meta-neon-glow', name: 'Neon Glow', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-diagonal-pro', name: 'Diagonal Pro', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-circle-duo', name: 'Circle Duo', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-frame-gold', name: 'Gold Frame', category: 'metamorfoza', aspectRatio: '1:1', premium: true },
  { id: 'meta-minimal-clean', name: 'Minimal Clean', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-glass-modern', name: 'Glass Modern', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-gradient-wave', name: 'Gradient Wave', category: 'metamorfoza', aspectRatio: '1:1' },
  
  // PROMOCJA
  { id: 'promo-neon-burst', name: 'Neon Burst', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-flash-sale', name: 'Flash Sale', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-elegant-offer', name: 'Elegant Offer', category: 'promocja', aspectRatio: '1:1', premium: true },
  { id: 'promo-bold-discount', name: 'Bold Discount', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-gradient-glow', name: 'Gradient Glow', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-luxury-card', name: 'Luxury Card', category: 'promocja', aspectRatio: '1:1', premium: true },
  { id: 'promo-minimal-chic', name: 'Minimal Chic', category: 'promocja', aspectRatio: '1:1' },
  
  // EFEKT
  { id: 'efekt-spotlight', name: 'Spotlight', category: 'efekt', aspectRatio: '1:1' },
  { id: 'efekt-magazine', name: 'Magazine Style', category: 'efekt', aspectRatio: '4:5' },
  { id: 'efekt-glow-circle', name: 'Glow Circle', category: 'efekt', aspectRatio: '1:1' },
  { id: 'efekt-clean-white', name: 'Clean White', category: 'efekt', aspectRatio: '1:1' },
  { id: 'efekt-dark-luxury', name: 'Dark Luxury', category: 'efekt', aspectRatio: '1:1', premium: true },
  { id: 'efekt-gradient-frame', name: 'Gradient Frame', category: 'efekt', aspectRatio: '1:1' },
  
  // REZERWACJA
  { id: 'book-cta-glow', name: 'CTA Glow', category: 'rezerwacja', aspectRatio: '1:1' },
  { id: 'book-contact-card', name: 'Contact Card', category: 'rezerwacja', aspectRatio: '1:1' },
  { id: 'book-minimal-button', name: 'Minimal Button', category: 'rezerwacja', aspectRatio: '1:1' },
  { id: 'book-luxury-invite', name: 'Luxury Invite', category: 'rezerwacja', aspectRatio: '1:1', premium: true },
  
  // SOCIAL
  { id: 'social-quote-elegant', name: 'Quote Elegant', category: 'social', aspectRatio: '1:1' },
  { id: 'social-tip-card', name: 'Tip Card', category: 'social', aspectRatio: '1:1' },
  { id: 'social-announcement', name: 'Announcement', category: 'social', aspectRatio: '1:1' },
  { id: 'social-carousel', name: 'Carousel Slide', category: 'social', aspectRatio: '1:1' },
  { id: 'social-question', name: 'Question Post', category: 'social', aspectRatio: '1:1' },
  
  // TESTIMONIAL
  { id: 'test-review-card', name: 'Review Card', category: 'testimonial', aspectRatio: '1:1' },
  { id: 'test-photo-review', name: 'Photo Review', category: 'testimonial', aspectRatio: '1:1' },
  { id: 'test-stars-focus', name: 'Stars Focus', category: 'testimonial', aspectRatio: '1:1' },
  { id: 'test-minimal-quote', name: 'Minimal Quote', category: 'testimonial', aspectRatio: '1:1' },
  
  // STORY
  { id: 'story-promo-full', name: 'Promo Full', category: 'story', aspectRatio: '9:16' },
  { id: 'story-before-after', name: 'Before After', category: 'story', aspectRatio: '9:16' },
  { id: 'story-cta-swipe', name: 'CTA Swipe', category: 'story', aspectRatio: '9:16' },
  { id: 'story-countdown', name: 'Countdown', category: 'story', aspectRatio: '9:16' },
  { id: 'story-new-post', name: 'New Post', category: 'story', aspectRatio: '9:16' },
  
  // CENNIK
  { id: 'price-service-list', name: 'Service List', category: 'cennik', aspectRatio: '1:1' },
  { id: 'price-single-service', name: 'Single Service', category: 'cennik', aspectRatio: '1:1' },
  { id: 'price-package-deal', name: 'Package Deal', category: 'cennik', aspectRatio: '1:1' },
];

const CATEGORY_LABELS: Record<TemplateCategory, { label: string; icon: React.ReactNode }> = {
  metamorfoza: { label: 'Przed/Po', icon: <Camera className="w-3.5 h-3.5" /> },
  promocja: { label: 'Promocje', icon: <Zap className="w-3.5 h-3.5" /> },
  efekt: { label: 'Efekty', icon: <Sparkles className="w-3.5 h-3.5" /> },
  rezerwacja: { label: 'Rezerwacje', icon: <Heart className="w-3.5 h-3.5" /> },
  social: { label: 'Social', icon: <Star className="w-3.5 h-3.5" /> },
  testimonial: { label: 'Opinie', icon: <Crown className="w-3.5 h-3.5" /> },
  story: { label: 'Stories', icon: <Flower2 className="w-3.5 h-3.5" /> },
  cennik: { label: 'Cennik', icon: <Gift className="w-3.5 h-3.5" /> },
};

const ACCENT_COLORS = [
  { name: 'Neon Pink', value: '#ec4899', glow: 'rgba(236,72,153,0.5)' },
  { name: 'Hot Pink', value: '#ff0080', glow: 'rgba(255,0,128,0.5)' },
  { name: 'Rose Gold', value: '#e8b4b8', glow: 'rgba(232,180,184,0.5)' },
  { name: 'Gold', value: '#d4af37', glow: 'rgba(212,175,55,0.5)' },
  { name: 'Purple', value: '#a855f7', glow: 'rgba(168,85,247,0.5)' },
  { name: 'Coral', value: '#ff6b6b', glow: 'rgba(255,107,107,0.5)' },
  { name: 'Teal', value: '#14b8a6', glow: 'rgba(20,184,166,0.5)' },
  { name: 'Blue', value: '#3b82f6', glow: 'rgba(59,130,246,0.5)' },
  { name: 'White', value: '#ffffff', glow: 'rgba(255,255,255,0.3)' },
];

const FONTS = [
  { name: 'Elegancki', value: "'Playfair Display', serif" },
  { name: 'Nowoczesny', value: "'Inter', sans-serif" },
  { name: 'Luksusowy', value: "'Cormorant Garamond', serif" },
  { name: 'Bold', value: "'Montserrat', sans-serif" },
];

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState('meta-luxury-split');
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
    setTestimonial('Jestem zachwycona efektami! Polecam wszystkim.');
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
    <div className="space-y-1.5">
      <Label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
      {image ? (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border/50 group">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button 
            onClick={onClear}
            className="absolute top-1.5 right-1.5 p-1 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-[4/3] rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 cursor-pointer transition-all bg-muted/20 hover:bg-muted/40">
          <Upload className="w-5 h-5 text-muted-foreground/40 mb-1" />
          <span className="text-[10px] text-muted-foreground/50">Dodaj</span>
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
      case 'meta-luxury-split':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a10 100%)' }}>
            <div className="absolute inset-0 flex p-5 gap-3">
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, transparent 50%)` }} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-white text-xs font-medium tracking-[0.2em]">PRZED</span>
                </div>
              </div>
              <div className="w-1.5 rounded-full" style={{ background: `linear-gradient(to bottom, transparent 5%, ${color} 30%, ${color} 70%, transparent 95%)`, boxShadow: `0 0 30px ${glow}` }} />
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: `0 0 50px ${glow}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, transparent 50%)` }} />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 20px ${glow}` }}>
                  <span className="text-white text-xs font-bold tracking-[0.2em]">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 pt-3 text-center z-10">
              <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${color}80` }}>{salonName}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 pb-3 text-center z-10">
              <h2 className="text-white text-lg font-semibold">{headline}</h2>
            </div>
          </div>
        );

      case 'meta-neon-glow':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#050505' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-40 blur-[100px] opacity-30" style={{ background: color }} />
            <div className="absolute inset-0 flex p-6 gap-4">
              <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10">
                <img src={before} alt="Before" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white/70 text-xs tracking-widest">PRZED</span>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden" style={{ boxShadow: `0 0 60px ${glow}, inset 0 0 0 2px ${color}50` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold tracking-widest" style={{ color, textShadow: `0 0 20px ${glow}` }}>PO</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-xl font-bold text-white" style={{ textShadow: `0 0 40px ${glow}` }}>{headline}</h2>
              <p className="text-white/40 text-[10px] mt-1 tracking-[0.3em] uppercase">{salonName}</p>
            </div>
          </div>
        );

      case 'meta-diagonal-pro':
        return (
          <div className="w-full aspect-square" style={baseStyles}>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 52% 0, 48% 100%, 0 100%)' }}>
              <img src={before} alt="Before" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 48% 100%)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-[140%] rotate-[6deg]" style={{ background: `linear-gradient(to bottom, transparent, ${color}, ${color}, transparent)`, boxShadow: `0 0 50px ${glow}` }} />
            </div>
            <div className="absolute top-6 left-6">
              <span className="text-white/60 text-[10px] tracking-[0.3em]">PRZED</span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="text-[10px] tracking-[0.3em] font-bold" style={{ color }}>PO</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white">{headline}</h2>
                <p className="text-sm mt-1" style={{ color: `${color}99` }}>{subheadline}</p>
              </div>
              <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase">{salonName}</span>
            </div>
          </div>
        );

      case 'meta-circle-duo':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'radial-gradient(ellipse at center, #151515 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-12 left-[18%] w-[32%] aspect-square rounded-full overflow-hidden border-4 border-white/5">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-12 right-[18%] w-[32%] aspect-square rounded-full overflow-hidden border-4" style={{ borderColor: `${color}60`, boxShadow: `0 0 60px ${glow}` }}>
              <img src={after} alt="After" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[45%] left-[28%] text-white/50 text-[10px] tracking-widest">PRZED</div>
            <div className="absolute top-[45%] right-[28%] text-[10px] tracking-widest font-bold" style={{ color }}>PO</div>
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}80` }}>{subheadline}</p>
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-4">{salonName}</p>
            </div>
          </div>
        );

      case 'meta-frame-gold':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1005 100%)' }}>
            <div className="absolute inset-6 border-2 rounded-2xl" style={{ borderColor: `${color}30` }} />
            <div className="absolute inset-10 flex gap-4">
              <div className="flex-1 relative rounded-xl overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 rounded-md text-white text-[10px] tracking-wider">PRZED</div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden border-2" style={{ borderColor: `${color}50` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md text-white text-[10px] tracking-wider font-bold" style={{ background: color }}>PO</div>
              </div>
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-6 py-1" style={{ background: `linear-gradient(90deg, transparent, ${color}15, transparent)` }}>
              <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color }}>{salonName}</p>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
              <h2 className="text-lg font-semibold text-white">{headline}</h2>
            </div>
            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-5 h-5 border-l-2 border-t-2" style={{ borderColor: color }} />
            <div className="absolute top-6 right-6 w-5 h-5 border-r-2 border-t-2" style={{ borderColor: color }} />
            <div className="absolute bottom-6 left-6 w-5 h-5 border-l-2 border-b-2" style={{ borderColor: color }} />
            <div className="absolute bottom-6 right-6 w-5 h-5 border-r-2 border-b-2" style={{ borderColor: color }} />
          </div>
        );

      case 'meta-minimal-clean':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#ffffff' }}>
            <div className="absolute inset-8 flex gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white text-xs tracking-wider">PRZED</span>
                </div>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl" style={{ boxShadow: `0 0 0 2px ${color}` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: `linear-gradient(to top, ${color}dd, transparent)` }}>
                  <span className="text-white text-xs font-bold tracking-wider">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h2 className="text-xl font-semibold text-zinc-800">{headline}</h2>
              <p className="text-sm mt-1" style={{ color }}>{salonName}</p>
            </div>
          </div>
        );

      case 'meta-glass-modern':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-0 flex p-6 gap-3">
              <div className="flex-1 relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-2">
                <img src={before} alt="Before" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
                  <span className="text-white text-[10px] tracking-widest">PRZED</span>
                </div>
              </div>
              <div className="flex-1 relative rounded-3xl overflow-hidden p-2" style={{ background: `linear-gradient(135deg, ${color}20, transparent)`, border: `1px solid ${color}30` }}>
                <img src={after} alt="After" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full" style={{ background: color }}>
                  <span className="text-white text-[10px] font-bold tracking-widest">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase">{salonName}</span>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
              <h2 className="text-lg font-semibold text-white">{headline}</h2>
            </div>
          </div>
        );

      case 'meta-gradient-wave':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30" style={{ background: `linear-gradient(to top, ${color}, transparent)` }} />
            <div className="absolute inset-0 flex p-8 gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white/70 text-xs tracking-widest">PRZED</span>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 0 2px ${color}80` }}>
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold tracking-widest" style={{ color }}>PO</span>
              </div>
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.4em] uppercase">{salonName}</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
            </div>
          </div>
        );

      // ============ PROMOCJA ============
      case 'promo-neon-burst':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #050208 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Promo" className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] opacity-40" style={{ background: color }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="px-6 py-2 border rounded-full mb-6" style={{ borderColor: `${color}40`, background: `${color}10` }}>
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium" style={{ color }}>Promocja</span>
              </div>
              <span className="text-[100px] font-black text-white leading-none" style={{ textShadow: `0 0 80px ${glow}` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-6">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-xs">{subheadline}</p>
              <button className="mt-10 px-12 py-4 rounded-full text-white font-bold text-sm tracking-wide transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 20px 60px ${glow}` }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.3em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-flash-sale':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#050505' }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 30%, ${color}15 0%, transparent 60%)` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-8" style={{ boxShadow: '0 0 50px rgba(234,179,8,0.4)' }}>
                <Zap className="w-5 h-5 text-black" />
                <span className="text-black text-sm font-bold tracking-wider">FLASH SALE</span>
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-[120px] font-black text-white leading-none" style={{ textShadow: `0 0 100px ${glow}` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-6">{headline}</h2>
              <p className="text-zinc-500 text-sm mt-2">{subheadline}</p>
              <button className="mt-10 px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold text-sm tracking-wide" style={{ boxShadow: '0 15px 50px rgba(234,179,8,0.3)' }}>
                {cta}
              </button>
              <div className="mt-10 flex gap-4">
                {['23', '59', '42'].map((n, i) => (
                  <div key={i} className="w-16 h-16 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                    <span className="text-white font-mono font-bold text-2xl">{n}</span>
                    <span className="text-white/30 text-[8px] uppercase tracking-wider">{['godz', 'min', 'sek'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'promo-elegant-offer':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-10 border rounded-2xl" style={{ borderColor: `${color}15` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: `${color}70` }}>Ekskluzywna oferta</p>
              <span className="text-7xl font-light text-white tracking-tight">{discount}</span>
              <div className="w-20 h-px my-8" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              <h2 className="text-xl text-white">{headline}</h2>
              <p className="text-zinc-500 text-sm mt-3">{subheadline}</p>
              <button className="mt-10 px-10 py-3 border rounded-full text-sm tracking-wider transition-colors" style={{ borderColor: color, color, background: 'transparent' }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.4em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-bold-discount':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}08 100%)` }}>
            <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${color}25 0%, transparent 60%)` }} />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full" style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 60%)` }} />
            <div className="relative h-full flex flex-col items-start justify-center p-12">
              <p className="text-[11px] tracking-[0.4em] uppercase mb-3 font-medium" style={{ color }}>Rabat</p>
              <span className="text-[160px] font-black leading-none text-white" style={{ textShadow: `6px 6px 0 ${color}` }}>{discount}</span>
              <h2 className="text-3xl font-bold text-white mt-4">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-2">{subheadline}</p>
              <button className="mt-8 px-10 py-4 rounded-xl text-white font-bold text-sm" style={{ background: color, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-6 right-6 text-white/20 text-[10px] tracking-[0.3em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-gradient-glow':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}10 50%, #0a0a0a 100%)` }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 20%, ${color}15 0%, transparent 40%)` }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 80%, ${color}10 0%, transparent 40%)` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <span className="text-[100px] font-black text-transparent bg-clip-text leading-none" style={{ backgroundImage: `linear-gradient(135deg, ${color}, white, ${color})` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-8">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-3">{subheadline}</p>
              <button className="mt-10 px-12 py-4 rounded-full text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 20px 60px ${glow}` }}>
                {cta}
              </button>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      case 'promo-luxury-card':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a05 0%, #15100a 100%)' }}>
            <div className="absolute inset-8 rounded-3xl border" style={{ borderColor: `${color}25`, background: 'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)' }} />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-8 h-px" style={{ background: color }} />
              <Crown className="w-4 h-4" style={{ color }} />
              <div className="w-8 h-px" style={{ background: color }} />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color }}>Premium</p>
              <span className="text-8xl font-light text-white">{discount}</span>
              <h2 className="text-xl text-white mt-6">{headline}</h2>
              <p className="text-zinc-500 text-sm mt-2">{subheadline}</p>
              <button className="mt-10 px-10 py-3 rounded-full text-sm font-medium" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, color: 'white' }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.4em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-minimal-chic':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#fafafa' }}>
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <span className="text-[120px] font-black text-zinc-800 leading-none">{discount}</span>
              <div className="w-16 h-1 my-6 rounded-full" style={{ background: color }} />
              <h2 className="text-2xl font-medium text-zinc-800">{headline}</h2>
              <p className="text-zinc-500 text-sm mt-2">{subheadline}</p>
              <button className="mt-10 px-10 py-4 rounded-full text-white font-medium text-sm" style={{ background: color }}>
                {cta}
              </button>
              <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      // ============ EFEKT ============
      case 'efekt-spotlight':
        return (
          <div className="w-full aspect-square" style={baseStyles}>
            <img src={main} alt="Result" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, transparent 20%, rgba(0,0,0,${opacity}) 100%)` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[65%] aspect-square rounded-full border-4" style={{ borderColor: `${color}40`, boxShadow: `0 0 80px ${glow}, inset 0 0 60px ${glow}` }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}99` }}>{subheadline}</p>
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-4">{salonName}</p>
            </div>
          </div>
        );

      case 'efekt-magazine':
        return (
          <div className="w-full aspect-[4/5]" style={baseStyles}>
            <img src={main} alt="Result" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, transparent 40%)` }} />
            <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-bold" style={{ background: color, color: 'white' }}>
              Efekt
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-white leading-tight">{headline}</h2>
              <p className="text-sm mt-3" style={{ color: `${color}cc` }}>{subheadline}</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-px" style={{ background: color }} />
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">{salonName}</p>
              </div>
            </div>
          </div>
        );

      case 'efekt-glow-circle':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a0a 0%, #100510 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[120px] opacity-40" style={{ background: color }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[55%] aspect-square rounded-full overflow-hidden border-4" style={{ borderColor: `${color}50`, boxShadow: `0 0 100px ${glow}` }}>
              <img src={main} alt="Result" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}80` }}>{subheadline}</p>
              <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase mt-6">{salonName}</p>
            </div>
          </div>
        );

      case 'efekt-clean-white':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#ffffff' }}>
            <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl">
              <img src={main} alt="Result" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-xl font-medium text-zinc-800">{headline}</h2>
              <p className="text-sm mt-1" style={{ color }}>{subheadline}</p>
              <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase mt-3">{salonName}</p>
            </div>
          </div>
        );

      case 'efekt-dark-luxury':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0a05 0%, #0f0a05 100%)' }}>
            <div className="absolute inset-6 rounded-2xl overflow-hidden">
              <img src={main} alt="Result" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <Gem className="w-4 h-4" style={{ color }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>{salonName}</span>
              <Gem className="w-4 h-4" style={{ color }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}99` }}>{subheadline}</p>
            </div>
          </div>
        );

      case 'efekt-gradient-frame':
        return (
          <div className="w-full aspect-square" style={baseStyles}>
            <div className="absolute inset-4 rounded-3xl p-1" style={{ background: `linear-gradient(135deg, ${color}, ${color}40, ${color})` }}>
              <div className="w-full h-full rounded-[20px] overflow-hidden">
                <img src={main} alt="Result" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mt-2">{salonName}</p>
            </div>
          </div>
        );

      // ============ REZERWACJA ============
      case 'book-cta-glow':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #080808 0%, #100810 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] opacity-30" style={{ background: color }} />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[45%] aspect-square rounded-full overflow-hidden border-4" style={{ borderColor: `${color}50`, boxShadow: `0 0 80px ${glow}` }}>
              <img src={main} alt="Booking" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}80` }}>{subheadline}</p>
              <button className="mt-8 px-12 py-4 rounded-full text-white font-bold text-sm tracking-wide" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 20px 60px ${glow}` }}>
                {cta}
              </button>
              <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      case 'book-contact-card':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0505 100%)' }}>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-3" style={{ borderColor: `${color}50` }}>
              <img src={main} alt="Contact" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-10 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}80` }}>{subheadline}</p>
              <div className="mt-8 space-y-3 w-full max-w-xs">
                <div className="flex items-center gap-4 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-xl">📞</span>
                  <span className="text-white text-sm">+48 123 456 789</span>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-xl">📍</span>
                  <span className="text-white text-sm">ul. Piękna 12, Warszawa</span>
                </div>
              </div>
              <button className="mt-8 px-10 py-4 rounded-full text-white font-bold text-sm" style={{ background: color, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.3em] uppercase">{salonName}</div>
          </div>
        );

      case 'book-minimal-button':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#fafafa' }}>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden shadow-xl" style={{ boxShadow: `0 0 0 4px ${color}30, 0 25px 50px -12px rgba(0,0,0,0.25)` }}>
              <img src={main} alt="Booking" className="w-full h-full object-cover" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center pt-24 px-10 text-center">
              <h2 className="text-2xl font-medium text-zinc-800">{headline}</h2>
              <p className="text-sm mt-2 text-zinc-500">{subheadline}</p>
              <button className="mt-10 px-12 py-4 rounded-full text-white font-medium text-sm" style={{ background: color }}>
                {cta}
              </button>
              <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      case 'book-luxury-invite':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a05 0%, #15100a 100%)' }}>
            <div className="absolute inset-6 rounded-2xl border" style={{ borderColor: `${color}20` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <Crown className="w-8 h-8 mb-4" style={{ color }} />
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color }}>Zaproszenie</p>
              <h2 className="text-2xl text-white">{headline}</h2>
              <p className="text-zinc-500 text-sm mt-3">{subheadline}</p>
              <div className="w-16 h-px my-8" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              <button className="px-10 py-3 rounded-full text-sm" style={{ background: color, color: 'white' }}>
                {cta}
              </button>
              <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      // ============ SOCIAL ============
      case 'social-quote-elegant':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}08 100%)` }}>
            <div className="absolute top-10 left-10 text-8xl font-serif opacity-20" style={{ color }}>"</div>
            <div className="absolute bottom-10 right-10 text-8xl font-serif rotate-180 opacity-20" style={{ color }}>"</div>
            <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
              <p className="text-2xl font-medium text-white leading-relaxed">{quote}</p>
              <div className="w-16 h-px my-8" style={{ background: color }} />
              <p className="text-sm" style={{ color }}>{salonName}</p>
            </div>
          </div>
        );

      case 'social-tip-card':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
              <span className="text-3xl">💡</span>
            </div>
            <div className="relative h-full flex flex-col justify-center px-10 pt-24">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3 font-medium" style={{ color }}>Porada Beauty</p>
              <h2 className="text-xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-5 leading-relaxed">{subheadline}</p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={main} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <p className="text-white/50 text-xs">{salonName}</p>
              </div>
            </div>
          </div>
        );

      case 'social-announcement':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, ${color}10 0%, #0a0a0a 100%)` }}>
            <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: color }} />
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ background: `${color}15`, border: `2px solid ${color}30` }}>
                <span className="text-4xl">📢</span>
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-medium" style={{ color }}>Ogłoszenie</p>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-4">{subheadline}</p>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      case 'social-carousel':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#0a0a0a' }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${color}20` }}>
                <Scissors className="w-8 h-8" style={{ color }} />
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color }}>01 / 05</p>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-4 max-w-xs">{subheadline}</p>
              <div className="flex gap-2 mt-10">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? color : 'rgba(255,255,255,0.2)' }} />
                ))}
              </div>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      case 'social-question':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(180deg, ${color}15 0%, #0a0a0a 50%)` }}>
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <span className="text-6xl mb-6">🤔</span>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-4">{subheadline}</p>
              <div className="mt-10 space-y-3 w-full max-w-xs">
                <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-sm">Opcja A</div>
                <div className="px-6 py-4 rounded-2xl border text-sm" style={{ borderColor: `${color}50`, background: `${color}10`, color }}>Opcja B</div>
              </div>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      // ============ TESTIMONIAL ============
      case 'test-review-card':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-8 left-8 text-6xl opacity-20" style={{ color }}>"</div>
            <div className="relative h-full flex flex-col justify-center px-12 pt-10">
              <p className="text-white text-lg leading-relaxed">{testimonial}</p>
              <div className="mt-10 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2" style={{ borderColor: `${color}50` }}>
                  <img src={main} alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-medium">{clientName}</p>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                  </div>
                </div>
              </div>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      case 'test-photo-review':
        return (
          <div className="w-full aspect-square" style={baseStyles}>
            <img src={main} alt="Client" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)` }} />
            <div className="absolute top-8 right-8 text-5xl opacity-40" style={{ color }}>"</div>
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <p className="text-white text-lg leading-relaxed">{testimonial}</p>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{clientName}</p>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                  </div>
                </div>
                <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">{salonName}</p>
              </div>
            </div>
          </div>
        );

      case 'test-stars-focus':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0a05 0%, #0a0a0a 100%)' }}>
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="flex gap-2 mb-8">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 fill-yellow-500 text-yellow-500" />)}
              </div>
              <p className="text-white text-lg leading-relaxed max-w-sm">{testimonial}</p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={main} alt="Client" className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-medium">{clientName}</p>
              </div>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-10">{salonName}</p>
            </div>
          </div>
        );

      case 'test-minimal-quote':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: '#fafafa' }}>
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <span className="text-5xl mb-6" style={{ color }}>"</span>
              <p className="text-zinc-700 text-lg leading-relaxed">{testimonial}</p>
              <div className="w-12 h-px my-8" style={{ background: color }} />
              <p className="text-zinc-800 font-medium">{clientName}</p>
              <div className="flex gap-1 mt-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4" style={{ fill: color, color }} />)}
              </div>
              <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      // ============ STORY ============
      case 'story-promo-full':
        return (
          <div className="w-full aspect-[9/16]" style={baseStyles}>
            <img src={main} alt="Story" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.5) 100%)` }} />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color }}>Promocja</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <span className="text-7xl font-black text-white" style={{ textShadow: `0 0 60px ${glow}` }}>{discount}</span>
              <h2 className="text-2xl font-bold text-white mt-4">{headline}</h2>
              <p className="text-white/70 text-sm mt-2">{subheadline}</p>
              <button className="mt-8 w-full py-4 rounded-2xl text-white font-bold text-sm" style={{ background: color, boxShadow: `0 10px 40px ${glow}` }}>
                {cta}
              </button>
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-6">{salonName}</p>
            </div>
          </div>
        );

      case 'story-before-after':
        return (
          <div className="w-full aspect-[9/16]" style={baseStyles}>
            <div className="absolute inset-0 top-0 bottom-1/2">
              <img src={before} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, rgba(0,0,0,${opacity}))` }} />
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs tracking-widest">PRZED</span>
              </div>
            </div>
            <div className="absolute h-3 left-0 right-0 top-1/2 -translate-y-1/2 z-10" style={{ background: color, boxShadow: `0 0 40px ${glow}` }} />
            <div className="absolute inset-0 top-1/2 bottom-0">
              <img src={after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity}), transparent)` }} />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full" style={{ background: color }}>
                <span className="text-white text-xs font-bold tracking-widest">PO</span>
              </div>
            </div>
            <div className="absolute bottom-8 left-6 right-6 text-center z-10">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-sm mt-2" style={{ color: `${color}cc` }}>{subheadline}</p>
              <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mt-4">{salonName}</p>
            </div>
          </div>
        );

      case 'story-cta-swipe':
        return (
          <div className="w-full aspect-[9/16]" style={baseStyles}>
            <img src={main} alt="Story" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.3em] uppercase">{salonName}</div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-3xl font-bold text-white">{headline}</h2>
              <p className="text-white/70 text-sm mt-3">{subheadline}</p>
              <div className="mt-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center animate-bounce" style={{ background: color }}>
                  <span className="text-white text-xl rotate-90">›</span>
                </div>
                <span className="text-white/50 text-xs tracking-wider">{cta}</span>
              </div>
            </div>
          </div>
        );

      case 'story-countdown':
        return (
          <div className="w-full aspect-[9/16]" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0a0508 0%, #050505 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-60 blur-[150px] opacity-20" style={{ background: color }} />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="px-5 py-2 rounded-full mb-8" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                <span className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color }}>Oferta kończy się za</span>
              </div>
              <div className="flex gap-4">
                {[{ n: '23', l: 'godz' }, { n: '59', l: 'min' }, { n: '42', l: 'sek' }].map((t, i) => (
                  <div key={i} className="w-20 h-24 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                    <span className="text-white font-mono font-bold text-4xl">{t.n}</span>
                    <span className="text-white/40 text-[9px] uppercase mt-1">{t.l}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-white mt-10">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-3">{subheadline}</p>
              <button className="mt-10 w-full max-w-xs py-4 rounded-2xl text-white font-bold text-sm" style={{ background: color, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      case 'story-new-post':
        return (
          <div className="w-full aspect-[9/16]" style={baseStyles}>
            <img src={main} alt="New Post" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)` }} />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full flex items-center gap-2" style={{ background: color }}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-bold">NOWY POST</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-white/70 text-sm mt-3">{subheadline}</p>
              <button className="mt-8 w-full py-4 rounded-2xl border border-white/20 text-white font-medium text-sm">
                Zobacz post →
              </button>
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-6">{salonName}</p>
            </div>
          </div>
        );

      // ============ CENNIK ============
      case 'price-service-list':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-6 border rounded-2xl" style={{ borderColor: `${color}15` }} />
            <div className="relative h-full flex flex-col p-10">
              <div className="text-center mb-8">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color }}>{salonName}</p>
                <h2 className="text-2xl font-bold text-white">{headline}</h2>
              </div>
              <div className="space-y-4 flex-1">
                {['Lifting twarzy', 'Mezoterapia', 'Botoks'].map((service, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-white">{service}</span>
                    <span className="font-bold" style={{ color }}>{299 + i * 100} zł</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full py-4 rounded-xl text-white font-bold text-sm" style={{ background: color }}>
                {cta}
              </button>
            </div>
          </div>
        );

      case 'price-single-service':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: `linear-gradient(135deg, #0a0a0a 0%, ${color}08 100%)` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-[100px] opacity-20" style={{ background: color }} />
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color }}>{salonName}</p>
              <h2 className="text-2xl font-bold text-white">{serviceName}</h2>
              <p className="text-zinc-400 text-sm mt-2">{subheadline}</p>
              <div className="mt-8">
                <span className="text-6xl font-bold text-white">{price}</span>
              </div>
              <button className="mt-10 px-10 py-4 rounded-full text-white font-bold text-sm" style={{ background: color, boxShadow: `0 15px 50px ${glow}` }}>
                {cta}
              </button>
            </div>
          </div>
        );

      case 'price-package-deal':
        return (
          <div className="w-full aspect-square" style={{ ...baseStyles, background: 'linear-gradient(135deg, #0a0a05 0%, #15100a 100%)' }}>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <Gift className="w-4 h-4" style={{ color }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color }}>Pakiet</span>
            </div>
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <div className="mt-6 space-y-2">
                <p className="text-zinc-400 text-sm">✓ {serviceName}</p>
                <p className="text-zinc-400 text-sm">✓ Konsultacja gratis</p>
                <p className="text-zinc-400 text-sm">✓ Zestaw pielęgnacyjny</p>
              </div>
              <div className="mt-8">
                <span className="text-zinc-500 text-lg line-through mr-3">599 zł</span>
                <span className="text-4xl font-bold" style={{ color }}>{price}</span>
              </div>
              <button className="mt-8 px-10 py-4 rounded-full text-white font-bold text-sm" style={{ background: color }}>
                {cta}
              </button>
              <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mt-8">{salonName}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full aspect-square bg-zinc-900 flex items-center justify-center">
            <span className="text-zinc-500">Wybierz szablon</span>
          </div>
        );
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kreator Grafik</h1>
                <p className="text-sm text-muted-foreground">{TEMPLATES.length} profesjonalnych szablonów</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleDownload} disabled={generating} size="sm" className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                Pobierz
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[400px_1fr] gap-6">
            {/* Controls */}
            <div className="space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-thin">
              {/* Templates */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">Szablony</h3>
                  <span className="ml-auto text-xs text-muted-foreground">{filteredTemplates.length}</span>
                </div>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
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
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                        selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {CATEGORY_LABELS[cat].icon}
                      {CATEGORY_LABELS[cat].label}
                    </button>
                  ))}
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto">
                  {filteredTemplates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={cn(
                        'relative p-3 rounded-xl border transition-all text-left group',
                        selectedTemplate === t.id
                          ? 'border-primary bg-primary/10 ring-1 ring-primary/30'
                          : 'border-border hover:border-primary/40 hover:bg-muted/30'
                      )}
                    >
                      {t.premium && (
                        <Crown className="absolute top-1.5 right-1.5 w-3 h-3 text-amber-500" />
                      )}
                      <span className="text-xs font-medium text-foreground block truncate">{t.name}</span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">{CATEGORY_LABELS[t.category].label} • {t.aspectRatio}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Images */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">Zdjęcia</h3>
                </div>
                {needsBeforeAfter ? (
                  <div className="grid grid-cols-2 gap-3">
                    <ImageUploadBox label="PRZED" image={beforeImage} onUpload={handleImageUpload(setBeforeImage)} onClear={() => setBeforeImage(null)} />
                    <ImageUploadBox label="PO" image={afterImage} onUpload={handleImageUpload(setAfterImage)} onClear={() => setAfterImage(null)} />
                  </div>
                ) : (
                  <ImageUploadBox label="Zdjęcie główne" image={mainImage} onUpload={handleImageUpload(setMainImage)} onClear={() => setMainImage(null)} />
                )}
              </Card>

              {/* Style */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">Styl</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Kolor akcentowy</Label>
                    <div className="flex flex-wrap gap-2">
                      {ACCENT_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setAccentColor(c)}
                          className={cn(
                            "w-8 h-8 rounded-full transition-all",
                            accentColor.value === c.value ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"
                          )}
                          style={{ background: c.value, boxShadow: accentColor.value === c.value ? `0 0 20px ${c.glow}` : undefined }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

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

                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Przyciemnienie ({overlayOpacity}%)</Label>
                    <Slider value={overlayOpacity} onValueChange={setOverlayOpacity} min={0} max={100} step={5} />
                  </div>
                </div>
              </Card>

              {/* Text */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">Teksty</h3>
                </div>
                
                <Tabs defaultValue="main" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-8 mb-3">
                    <TabsTrigger value="main" className="text-xs">Główne</TabsTrigger>
                    <TabsTrigger value="promo" className="text-xs">Promo</TabsTrigger>
                    <TabsTrigger value="opinie" className="text-xs">Opinie</TabsTrigger>
                    <TabsTrigger value="cennik" className="text-xs">Cennik</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="main" className="space-y-3">
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
                  
                  <TabsContent value="promo" className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Rabat</Label>
                      <Input value={discount} onChange={(e) => setDiscount(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Przycisk CTA</Label>
                      <Input value={cta} onChange={(e) => setCta(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Cytat / Porada</Label>
                      <Input value={quote} onChange={(e) => setQuote(e.target.value)} className="h-9 mt-1" />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="opinie" className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Opinia klientki</Label>
                      <Input value={testimonial} onChange={(e) => setTestimonial(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Imię klientki</Label>
                      <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="h-9 mt-1" />
                    </div>
                  </TabsContent>

                  <TabsContent value="cennik" className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Nazwa usługi</Label>
                      <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="h-9 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Cena</Label>
                      <Input value={price} onChange={(e) => setPrice(e.target.value)} className="h-9 mt-1" />
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center">
              <div className="sticky top-6 w-full max-w-md">
                <Card className="p-4 bg-zinc-950/50 border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Podgląd</span>
                    </div>
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-md">
                      {currentTemplate?.aspectRatio}
                    </span>
                  </div>
                  
                  <div className={cn("rounded-xl overflow-hidden shadow-2xl", getAspectRatioClass())}>
                    <div ref={previewRef} className="w-full h-full">
                      {renderTemplate()}
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-center text-muted-foreground mt-4">
                    {currentTemplate?.name} • {CATEGORY_LABELS[currentTemplate?.category || 'metamorfoza'].label}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
