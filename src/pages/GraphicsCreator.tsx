import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Download, 
  RotateCcw, 
  Upload, 
  X, 
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Wand2,
  Palette,
  Type,
  Layers,
  ZoomIn,
  ZoomOut,
  Move,
  Star,
  Crown,
  Diamond,
  Gem,
  Heart,
  Scissors,
  Brush,
  Camera,
  Eye,
  Gift,
  Clock,
  Percent,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Check,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ====== TEMPLATE DEFINITIONS ======
type TemplateCategory = 'metamorphosis' | 'promo' | 'service' | 'testimonial' | 'story';

interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  aspect: '1:1' | '4:5' | '9:16';
  description: string;
  premium?: boolean;
}

const TEMPLATES: Template[] = [
  // Metamorfozy - Before/After
  { id: 'meta-luxury', name: 'Luxury Split', category: 'metamorphosis', aspect: '1:1', description: 'Elegancki podział z efektem glow' },
  { id: 'meta-diagonal', name: 'Diagonal Cut', category: 'metamorphosis', aspect: '1:1', description: 'Dynamiczne diagonalne przejście' },
  { id: 'meta-reveal', name: 'Reveal Effect', category: 'metamorphosis', aspect: '4:5', description: 'Efekt odsłaniania z animacją' },
  { id: 'meta-magazine', name: 'Magazine Style', category: 'metamorphosis', aspect: '4:5', description: 'Styl okładki magazynu beauty' },
  { id: 'meta-minimal', name: 'Clean Minimal', category: 'metamorphosis', aspect: '1:1', description: 'Minimalistyczny design premium' },
  
  // Promocje
  { id: 'promo-flash', name: 'Flash Sale', category: 'promo', aspect: '1:1', description: 'Mocna promocja z countdown' },
  { id: 'promo-elegant', name: 'Elegant Offer', category: 'promo', aspect: '1:1', description: 'Elegancka oferta specjalna' },
  { id: 'promo-vip', name: 'VIP Access', category: 'promo', aspect: '4:5', description: 'Ekskluzywna oferta VIP', premium: true },
  { id: 'promo-seasonal', name: 'Seasonal Sale', category: 'promo', aspect: '1:1', description: 'Promocja sezonowa' },
  
  // Usługi
  { id: 'service-showcase', name: 'Service Showcase', category: 'service', aspect: '1:1', description: 'Prezentacja pojedynczej usługi' },
  { id: 'service-menu', name: 'Service Menu', category: 'service', aspect: '4:5', description: 'Menu usług salonu' },
  { id: 'service-highlight', name: 'Feature Highlight', category: 'service', aspect: '1:1', description: 'Wyróżnienie specjalności' },
  
  // Opinie
  { id: 'review-elegant', name: 'Elegant Review', category: 'testimonial', aspect: '1:1', description: 'Elegancka opinia klienta' },
  { id: 'review-photo', name: 'Photo Review', category: 'testimonial', aspect: '4:5', description: 'Opinia ze zdjęciem' },
  { id: 'review-stars', name: '5-Star Review', category: 'testimonial', aspect: '1:1', description: 'Opinia z gwiazdkami' },
  
  // Stories
  { id: 'story-promo', name: 'Story Promo', category: 'story', aspect: '9:16', description: 'Promocja na story' },
  { id: 'story-result', name: 'Story Result', category: 'story', aspect: '9:16', description: 'Efekt zabiegu na story' },
  { id: 'story-cta', name: 'Story CTA', category: 'story', aspect: '9:16', description: 'Call to action na story' },
];

const CATEGORIES: Record<TemplateCategory, { label: string; icon: any; gradient: string }> = {
  metamorphosis: { label: 'Metamorfozy', icon: Sparkles, gradient: 'from-rose-500 via-pink-500 to-fuchsia-500' },
  promo: { label: 'Promocje', icon: Percent, gradient: 'from-amber-400 via-orange-500 to-red-500' },
  service: { label: 'Usługi', icon: Scissors, gradient: 'from-violet-500 via-purple-500 to-indigo-500' },
  testimonial: { label: 'Opinie', icon: MessageCircle, gradient: 'from-cyan-400 via-teal-500 to-emerald-500' },
  story: { label: 'Stories', icon: Camera, gradient: 'from-pink-500 via-rose-500 to-red-500' },
};

// Preset color palettes for beauty industry
const COLOR_PALETTES = [
  { name: 'Neon Rose', primary: '#ff0080', secondary: '#ff66b2', accent: '#ffccdd', bg: '#0a0008' },
  { name: 'Luxury Gold', primary: '#d4a574', secondary: '#e8c9a0', accent: '#f5e6d3', bg: '#0a0806' },
  { name: 'Royal Purple', primary: '#9b59b6', secondary: '#c39bd3', accent: '#e8daef', bg: '#08060a' },
  { name: 'Ocean Teal', primary: '#00b4d8', secondary: '#48cae4', accent: '#90e0ef', bg: '#060a0c' },
  { name: 'Coral Sunset', primary: '#ff6b6b', secondary: '#ffa8a8', accent: '#ffd6d6', bg: '#0a0606' },
  { name: 'Emerald', primary: '#2ecc71', secondary: '#82e0aa', accent: '#d5f5e3', bg: '#060a08' },
  { name: 'Soft Blush', primary: '#f8b4d9', secondary: '#fad0e4', accent: '#fce4ef', bg: '#0a0608' },
  { name: 'Midnight Pink', primary: '#e91e8c', secondary: '#f06ebc', accent: '#f7b8dc', bg: '#050208' },
];

const FONTS = [
  { id: 'elegant', name: 'Elegancki', family: 'Playfair Display, serif' },
  { id: 'modern', name: 'Nowoczesny', family: 'Montserrat, sans-serif' },
  { id: 'minimal', name: 'Minimalistyczny', family: 'Inter, sans-serif' },
  { id: 'bold', name: 'Odważny', family: 'Oswald, sans-serif' },
  { id: 'luxury', name: 'Luksusowy', family: 'Cormorant Garamond, serif' },
];

export default function GraphicsCreator() {
  // Template & Category
  const [selectedTemplate, setSelectedTemplate] = useState<string>('meta-luxury');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  
  // Images
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  
  // Content
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [headline, setHeadline] = useState('Odkryj Piękno');
  const [subheadline, setSubheadline] = useState('Profesjonalne zabiegi dla Twojej urody');
  const [serviceName, setServiceName] = useState('Makijaż Permanentny');
  const [discount, setDiscount] = useState('-30%');
  const [originalPrice, setOriginalPrice] = useState('599 zł');
  const [newPrice, setNewPrice] = useState('419 zł');
  const [reviewText, setReviewText] = useState('Jestem zachwycona efektami! Polecam każdej kobiecie, która chce poczuć się pięknie.');
  const [reviewerName, setReviewerName] = useState('Anna K.');
  const [ctaText, setCtaText] = useState('Zarezerwuj wizytę');
  
  // Style
  const [palette, setPalette] = useState(COLOR_PALETTES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [overlayOpacity, setOverlayOpacity] = useState([40]);
  const [showLogo, setShowLogo] = useState(true);
  const [showWatermark, setShowWatermark] = useState(false);
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const filteredTemplates = activeCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === activeCategory);

  // Helpers
  const handleImageUpload = (setter: (v: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Maksymalny rozmiar pliku to 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target?.result as string);
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
    setBeforeImage(null);
    setAfterImage(null);
    setMainImage(null);
    setSalonName('Beauty Studio');
    setHeadline('Odkryj Piękno');
    setSubheadline('Profesjonalne zabiegi dla Twojej urody');
    setServiceName('Makijaż Permanentny');
    setDiscount('-30%');
    setOriginalPrice('599 zł');
    setNewPrice('419 zł');
    setReviewText('Jestem zachwycona efektami! Polecam każdej kobiecie, która chce poczuć się pięknie.');
    setReviewerName('Anna K.');
    setCtaText('Zarezerwuj wizytę');
    setOverlayOpacity([40]);
    toast.success('Wszystko zostało zresetowane');
  };

  const getAspectClass = () => {
    switch (currentTemplate?.aspect) {
      case '9:16': return 'aspect-[9/16]';
      case '4:5': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  // Placeholder images
  const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  const placeholderMain = 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80';

  const before = beforeImage || placeholderBefore;
  const after = afterImage || placeholderAfter;
  const main = mainImage || placeholderMain;

  // ====== RENDER TEMPLATES ======
  const renderTemplate = () => {
    const styles = {
      fontFamily: selectedFont.family,
      '--primary': palette.primary,
      '--secondary': palette.secondary,
      '--accent': palette.accent,
    } as React.CSSProperties;

    switch (selectedTemplate) {
      case 'meta-luxury':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: `linear-gradient(135deg, ${palette.bg} 0%, #000 100%)` }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full blur-[120px] opacity-30" 
                style={{ background: `radial-gradient(circle, ${palette.primary}40 0%, transparent 70%)` }} />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-20 h-20 border border-white/5 rounded-full" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border border-white/5 rounded-full" />
            <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full" style={{ background: palette.primary, boxShadow: `0 0 20px ${palette.primary}` }} />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full" style={{ background: palette.secondary }} />
            
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: palette.primary }}>{salonName}</span>
              </div>
              {showLogo && logoImage && (
                <img src={logoImage} alt="Logo" className="h-8 w-auto object-contain opacity-80" />
              )}
            </div>
            
            {/* Images container */}
            <div className="absolute inset-8 top-16 bottom-20 flex gap-4">
              {/* Before */}
              <div className="flex-1 relative group">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img src={before} alt="Przed" className="w-full h-full object-cover" style={{ filter: 'brightness(0.9)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-white/90 text-xs font-semibold tracking-[0.25em] uppercase">Przed</span>
                </div>
              </div>
              
              {/* Divider */}
              <div className="w-px self-center h-[60%] relative">
                <div className="absolute inset-0 rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${palette.primary}, transparent)` }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: palette.primary, boxShadow: `0 0 30px ${palette.primary}80` }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* After */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl"
                  style={{ border: `2px solid ${palette.primary}40`, boxShadow: `0 0 60px ${palette.primary}30` }}>
                  <img src={after} alt="Po" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full"
                  style={{ background: palette.primary, boxShadow: `0 0 20px ${palette.primary}60` }}>
                  <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">Po</span>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: selectedFont.family }}>{headline}</h2>
              <p className="text-sm text-white/50">{subheadline}</p>
            </div>
          </div>
        );

      case 'meta-diagonal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: '#000' }}>
            {/* Before image - full */}
            <div className="absolute inset-0">
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.5) grayscale(30%)' }} />
            </div>
            
            {/* After image - diagonal clip */}
            <div className="absolute inset-0" style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 65% 100%)' }}>
              <img src={after} alt="" className="w-full h-full object-cover" />
            </div>
            
            {/* Diagonal line */}
            <div className="absolute inset-0" style={{ 
              background: `linear-gradient(115deg, transparent 49.5%, ${palette.primary} 49.5%, ${palette.primary} 50.5%, transparent 50.5%)`,
              filter: `drop-shadow(0 0 10px ${palette.primary})`
            }} />
            
            {/* Labels */}
            <div className="absolute top-8 left-8">
              <div className="px-5 py-2.5 bg-black/70 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-white/80 text-sm tracking-[0.2em] uppercase">Przed</span>
              </div>
            </div>
            <div className="absolute top-8 right-8">
              <div className="px-5 py-2.5 rounded-full" style={{ background: palette.primary }}>
                <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">Po</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-gradient-to-t from-black via-black/80 to-transparent">
              <span className="text-xs tracking-[0.4em] uppercase mb-3 block" style={{ color: palette.primary }}>{salonName}</span>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: selectedFont.family }}>{headline}</h2>
              <p className="text-white/60 text-sm">{subheadline}</p>
            </div>
          </div>
        );

      case 'meta-reveal':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Main image */}
            <div className="absolute inset-4 rounded-3xl overflow-hidden">
              <img src={after} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}, transparent 50%)` }} />
            </div>
            
            {/* Before image (small) */}
            <div className="absolute top-8 left-8 w-28 aspect-square rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl"
              style={{ boxShadow: `0 20px 50px ${palette.bg}` }}>
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 rounded-full">
                <span className="text-white/80 text-[10px] tracking-widest uppercase">Przed</span>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`, boxShadow: `0 0 30px ${palette.primary}50` }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-center">
                <span className="text-xs tracking-[0.3em] uppercase mb-2 block" style={{ color: palette.primary }}>{serviceName}</span>
                <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: selectedFont.family }}>{headline}</h2>
                <p className="text-white/50 text-sm mb-6">{subheadline}</p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                  style={{ background: palette.primary, boxShadow: `0 0 30px ${palette.primary}50` }}>
                  <span className="text-white font-semibold">{ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'meta-magazine':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...styles, background: '#000' }}>
            {/* Full bleed image */}
            <div className="absolute inset-0">
              <img src={after} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to bottom, ${palette.bg}cc 0%, transparent 30%, transparent 60%, ${palette.bg} 100%)`
              }} />
            </div>
            
            {/* Magazine header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
              <span className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: selectedFont.family }}>{salonName}</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                <span className="text-xs text-white/80 tracking-widest uppercase">Metamorfoza</span>
              </div>
            </div>
            
            {/* Before inset */}
            <div className="absolute top-24 right-6 w-24 aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-xl">
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <span className="text-white/90 text-[9px] tracking-widest uppercase">Przed</span>
              </div>
            </div>
            
            {/* Content block */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mb-4">
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: palette.primary }}>{serviceName}</span>
              </div>
              <h2 className="text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: selectedFont.family }}>
                {headline}
              </h2>
              <p className="text-white/60 text-base max-w-xs">{subheadline}</p>
              
              {/* CTA */}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: palette.primary }}>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{ctaText}</span>
              </div>
            </div>
          </div>
        );

      case 'meta-minimal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: '#fafafa' }}>
            {/* Clean grid */}
            <div className="absolute inset-8 grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img src={before} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full">
                  <span className="text-zinc-800 text-[10px] font-medium tracking-widest uppercase">Przed</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ boxShadow: `0 20px 40px ${palette.primary}20` }}>
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full" style={{ background: palette.primary }}>
                  <span className="text-white text-[10px] font-semibold tracking-widest uppercase">Po</span>
                </div>
              </div>
            </div>
            
            {/* Header */}
            <div className="absolute top-3 left-8 right-8 flex justify-between items-center">
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: palette.primary }}>{salonName}</span>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-3 left-8 right-8 text-center">
              <span className="text-zinc-800 text-sm font-medium">{headline}</span>
            </div>
          </div>
        );

      case 'promo-flash':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Dynamic background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-40" style={{ background: palette.primary }} />
              <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-30" style={{ background: palette.secondary }} />
            </div>
            
            {/* Decorative lines */}
            <div className="absolute top-0 left-1/4 w-px h-full opacity-10" style={{ background: `linear-gradient(to bottom, transparent, ${palette.primary}, transparent)` }} />
            <div className="absolute top-0 right-1/3 w-px h-full opacity-10" style={{ background: `linear-gradient(to bottom, transparent, ${palette.secondary}, transparent)` }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              {/* Flash badge */}
              <div className="mb-6 px-4 py-2 rounded-full border animate-pulse"
                style={{ borderColor: palette.primary, background: `${palette.primary}15` }}>
                <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: palette.primary }}>
                  ⚡ Flash Sale ⚡
                </span>
              </div>
              
              {/* Main discount */}
              <h1 className="text-8xl font-black text-white mb-2" style={{ 
                fontFamily: selectedFont.family,
                textShadow: `0 0 60px ${palette.primary}60`
              }}>
                {discount}
              </h1>
              
              {/* Service */}
              <div className="mb-8">
                <span className="text-2xl font-bold text-white">{serviceName}</span>
              </div>
              
              {/* Prices */}
              <div className="flex items-center gap-6 mb-8">
                <span className="text-2xl text-white/40 line-through">{originalPrice}</span>
                <span className="text-4xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
              </div>
              
              {/* CTA */}
              <button className="px-8 py-4 rounded-full text-white font-bold text-lg"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`, boxShadow: `0 0 40px ${palette.primary}40` }}>
                {ctaText}
              </button>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-elegant':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: `linear-gradient(135deg, ${palette.bg} 0%, #000 100%)` }}>
            {/* Image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" style={{ opacity: overlayOpacity[0] / 100 }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}, transparent)` }} />
            </div>
            
            {/* Elegant frame */}
            <div className="absolute inset-6 border border-white/10 rounded-3xl" />
            <div className="absolute inset-10 border border-white/5 rounded-2xl" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <Diamond className="w-8 h-8 mb-6" style={{ color: palette.primary }} />
              
              <span className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: palette.primary }}>Oferta Specjalna</span>
              
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: selectedFont.family }}>{serviceName}</h2>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-5xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
              </div>
              
              <p className="text-white/60 text-sm max-w-xs mb-8">{subheadline}</p>
              
              <div className="px-8 py-3 rounded-full border-2" style={{ borderColor: palette.primary }}>
                <span className="font-semibold" style={{ color: palette.primary }}>{ctaText}</span>
              </div>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-vip':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...styles, background: `linear-gradient(180deg, ${palette.bg} 0%, #000 100%)` }}>
            {/* Luxury pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${palette.primary} 0, ${palette.primary} 1px, transparent 0, transparent 50%)`,
              backgroundSize: '20px 20px'
            }} />
            
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: palette.primary }} />
            
            {/* VIP badge */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
              <Crown className="w-5 h-5 text-white" />
              <span className="text-white font-bold tracking-widest uppercase text-sm">VIP Access</span>
            </div>
            
            {/* Main content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              <span className="text-xs tracking-[0.4em] uppercase mb-4 text-white/50">Ekskluzywna Oferta</span>
              
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: selectedFont.family }}>{serviceName}</h2>
              
              <div className="w-16 h-px mb-6" style={{ background: `linear-gradient(to right, transparent, ${palette.primary}, transparent)` }} />
              
              <div className="text-7xl font-black mb-2" style={{ 
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {discount}
              </div>
              
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-xl text-white/30 line-through">{originalPrice}</span>
                <ArrowRight className="w-4 h-4 text-white/30" />
                <span className="text-3xl font-bold text-white">{newPrice}</span>
              </div>
              
              <p className="text-white/50 text-sm max-w-xs mb-8">{subheadline}</p>
              
              <button className="px-10 py-4 rounded-full text-white font-bold border-2"
                style={{ borderColor: palette.primary, background: `${palette.primary}20` }}>
                {ctaText}
              </button>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/20">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-seasonal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Background image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" style={{ opacity: 0.3 }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${palette.bg}ee, ${palette.bg}aa)` }} />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 p-10 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start">
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: palette.primary }}>{salonName}</span>
                <div className="px-4 py-2 rounded-full" style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}40` }}>
                  <span className="text-xs font-medium" style={{ color: palette.primary }}>Promocja</span>
                </div>
              </div>
              
              {/* Main */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: selectedFont.family }}>{headline}</h2>
                
                <div className="text-6xl font-black mb-4" style={{ color: palette.primary }}>{discount}</div>
                
                <p className="text-white/60 mb-6">{serviceName}</p>
                
                <div className="flex items-center gap-4">
                  <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                  <span className="text-2xl font-bold text-white">{newPrice}</span>
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex justify-center">
                <button className="px-8 py-3 rounded-full font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
                  {ctaText}
                </button>
              </div>
            </div>
          </div>
        );

      case 'service-showcase':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to top, ${palette.bg} 0%, ${palette.bg}80 40%, transparent 100%)`
              }} />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}40` }}>
                <Gem className="w-4 h-4" style={{ color: palette.primary }} />
                <span className="text-xs font-medium" style={{ color: palette.primary }}>Nasza Specjalność</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: selectedFont.family }}>{serviceName}</h2>
              <p className="text-white/60 mb-6 max-w-sm">{subheadline}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
                <button className="px-6 py-2.5 rounded-full text-white font-medium"
                  style={{ background: palette.primary }}>
                  {ctaText}
                </button>
              </div>
            </div>
            
            {/* Logo */}
            <div className="absolute top-6 left-6">
              <span className="text-xs tracking-[0.3em] uppercase text-white/50">{salonName}</span>
            </div>
          </div>
        );

      case 'service-menu':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(${palette.primary} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
            
            {/* Header */}
            <div className="p-8">
              <div className="text-center">
                <span className="text-xs tracking-[0.4em] uppercase mb-2 block" style={{ color: palette.primary }}>{salonName}</span>
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: selectedFont.family }}>Menu Usług</h2>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-16 h-px mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${palette.primary}, transparent)` }} />
            
            {/* Services list */}
            <div className="px-8 space-y-4">
              {[serviceName, 'Makijaż permanentny brwi', 'Laminacja rzęs', 'Stylizacja brwi'].map((service, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
                  <span className="text-white font-medium">{service}</span>
                  <span className="font-bold" style={{ color: palette.primary }}>{i === 0 ? newPrice : `${200 + i * 100} zł`}</span>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <button className="px-8 py-3 rounded-full font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'service-highlight':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: `linear-gradient(135deg, ${palette.bg}, #000)` }}>
            {/* Circle frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full overflow-hidden"
              style={{ border: `3px solid ${palette.primary}`, boxShadow: `0 0 60px ${palette.primary}30` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
            </div>
            
            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] aspect-square rounded-full border border-white/3" />
            
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: palette.primary }}>{salonName}</span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-6 left-0 right-0 p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: selectedFont.family }}>{serviceName}</h2>
              <span className="text-xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
            </div>
          </div>
        );

      case 'review-elegant':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: `linear-gradient(135deg, ${palette.bg}, #000)` }}>
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: palette.primary }} />
            
            {/* Quote icon */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}40` }}>
              <span className="text-4xl" style={{ color: palette.primary }}>"</span>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center pt-24">
              <p className="text-xl text-white leading-relaxed mb-8 max-w-sm" style={{ fontFamily: selectedFont.family }}>
                {reviewText}
              </p>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: palette.primary }} />
                ))}
              </div>
              
              {/* Reviewer */}
              <span className="text-white/60 text-sm">{reviewerName}</span>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'review-photo':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to top, ${palette.bg} 40%, transparent 100%)`
              }} />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: palette.primary }} />
                ))}
              </div>
              
              <p className="text-lg text-white leading-relaxed mb-6" style={{ fontFamily: selectedFont.family }}>
                "{reviewText}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: palette.primary }}>
                  <img src={main} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-white font-medium block">{reviewerName}</span>
                  <span className="text-white/50 text-sm">Zadowolona klientka</span>
                </div>
              </div>
            </div>
            
            {/* Header */}
            <div className="absolute top-6 left-6">
              <span className="text-xs tracking-[0.3em] uppercase text-white/50">{salonName}</span>
            </div>
          </div>
        );

      case 'review-stars':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...styles, background: `linear-gradient(135deg, ${palette.bg}, #000)` }}>
            {/* Big stars background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <Star className="w-96 h-96" style={{ color: palette.primary }} />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {/* Big 5 */}
              <div className="text-8xl font-black mb-2" style={{ 
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>5.0</div>
              
              {/* Stars */}
              <div className="flex gap-2 mb-6">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-8 h-8 fill-current" style={{ color: palette.primary }} />
                ))}
              </div>
              
              <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-sm" style={{ fontFamily: selectedFont.family }}>
                "{reviewText}"
              </p>
              
              <span className="text-white/60">— {reviewerName}</span>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'story-promo':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ ...styles, background: palette.bg }}>
            {/* Image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to bottom, transparent 30%, ${palette.bg} 100%)`
              }} />
            </div>
            
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/70">{salonName}</span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <div className="inline-block px-4 py-2 rounded-full mb-4"
                style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}` }}>
                <span className="text-sm font-bold" style={{ color: palette.primary }}>PROMOCJA</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: selectedFont.family }}>{serviceName}</h2>
              
              <div className="text-5xl font-black mb-4" style={{ color: palette.primary }}>{discount}</div>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              
              <button className="w-full py-4 rounded-full font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'story-result':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ ...styles, background: '#000' }}>
            {/* Before/After split */}
            <div className="absolute inset-0 flex flex-col">
              {/* Before */}
              <div className="flex-1 relative overflow-hidden">
                <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/50 backdrop-blur rounded-full">
                  <span className="text-white/80 text-sm tracking-widest uppercase">Przed</span>
                </div>
              </div>
              
              {/* Divider */}
              <div className="h-1 relative">
                <div className="absolute inset-0" style={{ background: palette.primary, boxShadow: `0 0 20px ${palette.primary}` }} />
              </div>
              
              {/* After */}
              <div className="flex-1 relative overflow-hidden">
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full"
                  style={{ background: palette.primary }}>
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Po</span>
                </div>
              </div>
            </div>
            
            {/* Header */}
            <div className="absolute top-4 left-0 right-0 text-center z-10">
              <span className="text-xs tracking-[0.3em] uppercase text-white/60">{salonName}</span>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-6 left-0 right-0 p-6 text-center z-10">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: selectedFont.family }}>{headline}</h2>
            </div>
          </div>
        );

      case 'story-cta':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ ...styles, background: `linear-gradient(180deg, ${palette.bg} 0%, #000 100%)` }}>
            {/* Image */}
            <div className="absolute inset-x-6 top-20 bottom-48 rounded-3xl overflow-hidden"
              style={{ boxShadow: `0 0 60px ${palette.primary}30` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
            </div>
            
            {/* Glow */}
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: palette.primary }} />
            
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">{salonName}</span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: selectedFont.family }}>{headline}</h2>
              <p className="text-white/50 mb-6">{subheadline}</p>
              
              <button className="w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-4 text-white/30 text-xs">Przesuń w górę</div>
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

  // ====== IMAGE UPLOAD COMPONENT ======
  const ImageUploadBox = ({ 
    label, 
    image, 
    onUpload, 
    onClear 
  }: { 
    label: string; 
    image: string | null; 
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onClear: () => void;
  }) => (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {image ? (
        <div className="relative aspect-square rounded-xl overflow-hidden group border border-border/50">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="icon" variant="destructive" onClick={onClear} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-all bg-card/50 hover:bg-card">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Kliknij aby dodać</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  );

  return (
    <AppLayout>
      <div className="h-full flex flex-col lg:flex-row gap-0">
        {/* Left Panel - Controls */}
        <div className="w-full lg:w-[420px] border-r border-border/50 bg-card/30 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kreator Grafik</h1>
                <p className="text-xs text-muted-foreground">Facebook Ads dla Beauty</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-6">
              <Tabs defaultValue="templates" className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-6 bg-background/50">
                  <TabsTrigger value="templates" className="text-xs gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Szablony
                  </TabsTrigger>
                  <TabsTrigger value="images" className="text-xs gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Zdjęcia
                  </TabsTrigger>
                  <TabsTrigger value="content" className="text-xs gap-1.5">
                    <Type className="w-3.5 h-3.5" />
                    Treść
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs gap-1.5">
                    <Palette className="w-3.5 h-3.5" />
                    Styl
                  </TabsTrigger>
                </TabsList>
                
                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-6 mt-0">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={activeCategory === 'all' ? 'default' : 'outline'}
                      onClick={() => setActiveCategory('all')}
                      className="text-xs h-8"
                    >
                      Wszystkie
                    </Button>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                      <Button
                        key={key}
                        size="sm"
                        variant={activeCategory === key ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(key as TemplateCategory)}
                        className="text-xs h-8 gap-1.5"
                      >
                        <cat.icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Templates grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map((tmpl) => {
                      const cat = CATEGORIES[tmpl.category];
                      const isSelected = selectedTemplate === tmpl.id;
                      return (
                        <button
                          key={tmpl.id}
                          onClick={() => setSelectedTemplate(tmpl.id)}
                          className={cn(
                            "relative p-3 rounded-xl border text-left transition-all group",
                            isSelected 
                              ? "border-primary bg-primary/10" 
                              : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card"
                          )}
                        >
                          {tmpl.premium && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br",
                            cat.gradient
                          )}>
                            <cat.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="font-medium text-sm text-foreground mb-0.5">{tmpl.name}</div>
                          <div className="text-[10px] text-muted-foreground">{tmpl.description}</div>
                          <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-background/50 text-muted-foreground">
                              {tmpl.aspect}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Images Tab */}
                <TabsContent value="images" className="space-y-6 mt-0">
                  {currentTemplate?.category === 'metamorphosis' || selectedTemplate === 'story-result' ? (
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
                      label="Główne zdjęcie"
                      image={mainImage}
                      onUpload={handleImageUpload(setMainImage)}
                      onClear={() => setMainImage(null)}
                    />
                  )}
                  
                  <div className="border-t border-border/50 pt-6">
                    <ImageUploadBox
                      label="Logo salonu (opcjonalne)"
                      image={logoImage}
                      onUpload={handleImageUpload(setLogoImage)}
                      onClear={() => setLogoImage(null)}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <Label className="text-sm text-muted-foreground">Pokaż logo</Label>
                      <Switch checked={showLogo} onCheckedChange={setShowLogo} />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Content Tab */}
                <TabsContent value="content" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Nazwa salonu</Label>
                    <Input 
                      value={salonName} 
                      onChange={(e) => setSalonName(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Nagłówek</Label>
                    <Input 
                      value={headline} 
                      onChange={(e) => setHeadline(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Podtytuł</Label>
                    <Textarea 
                      value={subheadline} 
                      onChange={(e) => setSubheadline(e.target.value)}
                      className="bg-background/50 resize-none h-20"
                    />
                  </div>
                  
                  <div className="border-t border-border/50 pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Nazwa usługi</Label>
                      <Input 
                        value={serviceName} 
                        onChange={(e) => setServiceName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Rabat</Label>
                        <Input 
                          value={discount} 
                          onChange={(e) => setDiscount(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Stara cena</Label>
                        <Input 
                          value={originalPrice} 
                          onChange={(e) => setOriginalPrice(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Nowa cena</Label>
                        <Input 
                          value={newPrice} 
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border/50 pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Opinia klienta</Label>
                      <Textarea 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)}
                        className="bg-background/50 resize-none h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Imię klienta</Label>
                      <Input 
                        value={reviewerName} 
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-border/50 pt-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Przycisk CTA</Label>
                      <Input 
                        value={ctaText} 
                        onChange={(e) => setCtaText(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Style Tab */}
                <TabsContent value="style" className="space-y-6 mt-0">
                  {/* Color palettes */}
                  <div className="space-y-3">
                    <Label className="text-xs text-muted-foreground">Paleta kolorów</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_PALETTES.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setPalette(p)}
                          className={cn(
                            "aspect-square rounded-xl relative overflow-hidden transition-all",
                            palette.name === p.name 
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                              : "hover:scale-105"
                          )}
                          style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }}
                        >
                          {palette.name === p.name && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">{palette.name}</p>
                  </div>
                  
                  {/* Fonts */}
                  <div className="space-y-3">
                    <Label className="text-xs text-muted-foreground">Czcionka</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {FONTS.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setSelectedFont(font)}
                          className={cn(
                            "p-3 rounded-xl text-left transition-all border",
                            selectedFont.id === font.id 
                              ? "border-primary bg-primary/10" 
                              : "border-border/50 bg-card/50 hover:border-primary/50"
                          )}
                        >
                          <span className="text-lg text-foreground" style={{ fontFamily: font.family }}>
                            {font.name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">Aa Bb Cc</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Overlay opacity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Przezroczystość zdjęcia</Label>
                      <span className="text-xs text-muted-foreground">{overlayOpacity[0]}%</span>
                    </div>
                    <Slider
                      value={overlayOpacity}
                      onValueChange={setOverlayOpacity}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
          
          {/* Actions */}
          <div className="p-6 border-t border-border/50 space-y-3">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generowanie...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz grafikę
                </>
              )}
            </Button>
            <Button
              onClick={resetAll}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetuj wszystko
            </Button>
          </div>
        </div>
        
        {/* Right Panel - Preview */}
        <div className="flex-1 bg-[#0a0a0a] flex flex-col">
          {/* Preview toolbar */}
          <div className="p-4 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Podgląd</span>
              {currentTemplate && (
                <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                  {currentTemplate.aspect}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setPreviewScale(Math.max(0.5, previewScale - 0.1))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center">
                {Math.round(previewScale * 100)}%
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Preview canvas */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div 
              className={cn("transition-transform duration-200 shadow-2xl", getAspectClass())}
              style={{ 
                transform: `scale(${previewScale})`,
                width: currentTemplate?.aspect === '9:16' ? '320px' : currentTemplate?.aspect === '4:5' ? '400px' : '480px'
              }}
            >
              <div ref={previewRef} className="w-full h-full">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
