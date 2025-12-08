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
import { Badge } from '@/components/ui/badge';
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
  Star,
  Crown,
  Heart,
  Scissors,
  Camera,
  Eye,
  Gift,
  Snowflake,
  Sun,
  Flower2,
  TreePine,
  PartyPopper,
  Flame,
  ArrowRight,
  Check,
  Quote,
  Calendar,
  Percent,
  Award,
  Gem,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ====== TYPES ======
type TemplateCategory = 'metamorphosis' | 'promo' | 'service' | 'testimonial' | 'story' | 'seasonal';
type SeasonalType = 'christmas' | 'valentines' | 'spring' | 'summer' | 'autumn' | 'newyear' | 'womensday' | 'blackfriday';

interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  aspect: '1:1' | '4:5' | '9:16';
  seasonal?: SeasonalType;
  premium?: boolean;
}

// ====== TEMPLATES ======
const TEMPLATES: Template[] = [
  // METAMORFOZY
  { id: 'meta-glass', name: 'Glass Morphism', category: 'metamorphosis', aspect: '1:1' },
  { id: 'meta-neon', name: 'Neon Glow', category: 'metamorphosis', aspect: '1:1' },
  { id: 'meta-editorial', name: 'Editorial', category: 'metamorphosis', aspect: '4:5' },
  { id: 'meta-split', name: 'Dynamic Split', category: 'metamorphosis', aspect: '1:1' },
  { id: 'meta-frame', name: 'Luxury Frame', category: 'metamorphosis', aspect: '1:1' },
  { id: 'meta-slide', name: 'Slide Reveal', category: 'metamorphosis', aspect: '4:5' },
  
  // PROMOCJE
  { id: 'promo-gradient', name: 'Gradient Pop', category: 'promo', aspect: '1:1' },
  { id: 'promo-minimal', name: 'Minimal Luxe', category: 'promo', aspect: '1:1' },
  { id: 'promo-bold', name: 'Bold Statement', category: 'promo', aspect: '4:5' },
  { id: 'promo-flash', name: 'Flash Deal', category: 'promo', aspect: '1:1' },
  { id: 'promo-vip', name: 'VIP Exclusive', category: 'promo', aspect: '4:5', premium: true },
  
  // USŁUGI
  { id: 'service-card', name: 'Service Card', category: 'service', aspect: '1:1' },
  { id: 'service-feature', name: 'Feature Focus', category: 'service', aspect: '4:5' },
  { id: 'service-grid', name: 'Service Grid', category: 'service', aspect: '1:1' },
  
  // OPINIE
  { id: 'review-quote', name: 'Quote Card', category: 'testimonial', aspect: '1:1' },
  { id: 'review-photo', name: 'Photo Review', category: 'testimonial', aspect: '4:5' },
  { id: 'review-minimal', name: 'Minimal Review', category: 'testimonial', aspect: '1:1' },
  
  // STORIES
  { id: 'story-promo', name: 'Story Promo', category: 'story', aspect: '9:16' },
  { id: 'story-result', name: 'Story Result', category: 'story', aspect: '9:16' },
  { id: 'story-cta', name: 'Story CTA', category: 'story', aspect: '9:16' },
  { id: 'story-poll', name: 'Story Poll', category: 'story', aspect: '9:16' },
  
  // SEZONOWE - Święta
  { id: 'xmas-promo', name: 'Świąteczna Promocja', category: 'seasonal', aspect: '1:1', seasonal: 'christmas' },
  { id: 'xmas-gift', name: 'Bon Podarunkowy', category: 'seasonal', aspect: '1:1', seasonal: 'christmas' },
  { id: 'xmas-story', name: 'Świąteczne Story', category: 'seasonal', aspect: '9:16', seasonal: 'christmas' },
  
  // SEZONOWE - Walentynki
  { id: 'val-love', name: 'Walentynkowa Oferta', category: 'seasonal', aspect: '1:1', seasonal: 'valentines' },
  { id: 'val-duo', name: 'Pakiet dla Par', category: 'seasonal', aspect: '4:5', seasonal: 'valentines' },
  { id: 'val-story', name: 'Walentynki Story', category: 'seasonal', aspect: '9:16', seasonal: 'valentines' },
  
  // SEZONOWE - Wiosna
  { id: 'spring-fresh', name: 'Wiosenne Orzeźwienie', category: 'seasonal', aspect: '1:1', seasonal: 'spring' },
  { id: 'spring-bloom', name: 'Spring Bloom', category: 'seasonal', aspect: '4:5', seasonal: 'spring' },
  
  // SEZONOWE - Lato
  { id: 'summer-glow', name: 'Summer Glow', category: 'seasonal', aspect: '1:1', seasonal: 'summer' },
  { id: 'summer-beach', name: 'Beach Ready', category: 'seasonal', aspect: '4:5', seasonal: 'summer' },
  
  // SEZONOWE - Black Friday
  { id: 'bf-mega', name: 'Black Friday Mega', category: 'seasonal', aspect: '1:1', seasonal: 'blackfriday' },
  { id: 'bf-countdown', name: 'BF Countdown', category: 'seasonal', aspect: '4:5', seasonal: 'blackfriday' },
  
  // SEZONOWE - Dzień Kobiet
  { id: 'wd-queen', name: 'Dzień Kobiet', category: 'seasonal', aspect: '1:1', seasonal: 'womensday' },
  
  // SEZONOWE - Nowy Rok
  { id: 'ny-fresh', name: 'Nowy Rok Nowy Ty', category: 'seasonal', aspect: '1:1', seasonal: 'newyear' },
];

const CATEGORIES: Record<TemplateCategory, { label: string; icon: any; color: string }> = {
  metamorphosis: { label: 'Metamorfozy', icon: Sparkles, color: '#ff0080' },
  promo: { label: 'Promocje', icon: Percent, color: '#ff6b35' },
  service: { label: 'Usługi', icon: Scissors, color: '#9b59b6' },
  testimonial: { label: 'Opinie', icon: Quote, color: '#00b894' },
  story: { label: 'Stories', icon: Camera, color: '#0984e3' },
  seasonal: { label: 'Sezonowe', icon: Calendar, color: '#e17055' },
};

const SEASONAL_FILTERS: Record<SeasonalType, { label: string; icon: any; color: string }> = {
  christmas: { label: 'Święta', icon: TreePine, color: '#27ae60' },
  valentines: { label: 'Walentynki', icon: Heart, color: '#e74c3c' },
  spring: { label: 'Wiosna', icon: Flower2, color: '#f39c12' },
  summer: { label: 'Lato', icon: Sun, color: '#f1c40f' },
  autumn: { label: 'Jesień', icon: Flame, color: '#d35400' },
  newyear: { label: 'Nowy Rok', icon: PartyPopper, color: '#9b59b6' },
  womensday: { label: 'Dzień Kobiet', icon: Crown, color: '#e91e63' },
  blackfriday: { label: 'Black Friday', icon: Percent, color: '#2c3e50' },
};

const COLOR_SCHEMES = [
  { id: 'rose', name: 'Rose Gold', primary: '#ff0080', secondary: '#ff66b2', dark: '#1a0a12', light: '#fff0f5' },
  { id: 'gold', name: 'Luxury Gold', primary: '#d4a574', secondary: '#f5d9b8', dark: '#1a1408', light: '#fef9f3' },
  { id: 'violet', name: 'Royal Violet', primary: '#9b59b6', secondary: '#d7bde2', dark: '#120a16', light: '#f5eef8' },
  { id: 'teal', name: 'Ocean Teal', primary: '#00b894', secondary: '#55efc4', dark: '#081a16', light: '#e8faf5' },
  { id: 'coral', name: 'Coral Sunset', primary: '#ff6b6b', secondary: '#ffa8a8', dark: '#1a0c0c', light: '#fff5f5' },
  { id: 'midnight', name: 'Midnight', primary: '#667eea', secondary: '#a3bffa', dark: '#0a0c1a', light: '#f0f4ff' },
  { id: 'blush', name: 'Soft Blush', primary: '#f8b4d9', secondary: '#fce4ef', dark: '#1a1015', light: '#fef7fb' },
  { id: 'emerald', name: 'Emerald', primary: '#2ecc71', secondary: '#a9dfbf', dark: '#0a1a10', light: '#eafaf1' },
];

export default function GraphicsCreator() {
  // State
  const [selectedTemplate, setSelectedTemplate] = useState('meta-glass');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [seasonalFilter, setSeasonalFilter] = useState<SeasonalType | null>(null);
  
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [headline, setHeadline] = useState('Twoja Metamorfoza');
  const [subheadline, setSubheadline] = useState('Profesjonalne zabiegi dla Twojej urody');
  const [serviceName, setServiceName] = useState('Makijaż Permanentny');
  const [discount, setDiscount] = useState('-30%');
  const [originalPrice, setOriginalPrice] = useState('599 zł');
  const [newPrice, setNewPrice] = useState('419 zł');
  const [reviewText, setReviewText] = useState('Jestem zachwycona efektami! Polecam każdej kobiecie.');
  const [reviewerName, setReviewerName] = useState('Anna K.');
  const [ctaText, setCtaText] = useState('Zarezerwuj wizytę');
  
  const [colorScheme, setColorScheme] = useState(COLOR_SCHEMES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  
  const previewRef = useRef<HTMLDivElement>(null);
  
  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  
  const filteredTemplates = TEMPLATES.filter(t => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    if (seasonalFilter && t.seasonal !== seasonalFilter) return false;
    return true;
  });

  const handleImageUpload = (setter: (v: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const url = await toPng(previewRef.current, { quality: 1, pixelRatio: 3 });
      const a = document.createElement('a');
      a.download = `${selectedTemplate}-${Date.now()}.png`;
      a.href = url;
      a.click();
      toast.success('Grafika pobrana!');
    } catch {
      toast.error('Błąd generowania');
    } finally {
      setIsGenerating(false);
    }
  };

  const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  const placeholderMain = 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80';
  
  const before = beforeImage || placeholderBefore;
  const after = afterImage || placeholderAfter;
  const main = mainImage || placeholderMain;
  const primary = colorScheme.primary;
  const secondary = colorScheme.secondary;
  const dark = colorScheme.dark;

  const renderTemplate = () => {
    switch (selectedTemplate) {
      // ===== METAMORFOZY =====
      case 'meta-glass':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${dark} 0%, #000 100%)` }}>
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full blur-[150px] opacity-20" style={{ background: primary }} />
            </div>
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <span className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: primary }}>{salonName}</span>
              <Sparkles className="w-4 h-4" style={{ color: primary }} />
            </div>
            <div className="absolute inset-6 top-12 bottom-16 flex gap-3">
              <div className="flex-1 relative rounded-3xl overflow-hidden backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={before} alt="" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                  <span className="text-white text-[11px] font-medium tracking-[0.2em] uppercase">Przed</span>
                </div>
              </div>
              <div className="w-10 self-center flex flex-col items-center gap-2">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: primary, boxShadow: `0 0 30px ${primary}80` }}>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </div>
              <div className="flex-1 relative rounded-3xl overflow-hidden" style={{ boxShadow: `0 0 60px ${primary}30`, border: `1px solid ${primary}40` }}>
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full" style={{ background: primary }}>
                  <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">Po</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
            </div>
          </div>
        );

      case 'meta-neon':
        return (
          <div className="w-full aspect-square relative overflow-hidden bg-black">
            <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, ${primary}40 0%, transparent 50%), radial-gradient(circle at 70% 70%, ${secondary}40 0%, transparent 50%)` }} />
            <div className="absolute inset-8 flex gap-6">
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 0 2px ${primary}60, 0 0 40px ${primary}30` }}>
                <img src={before} alt="" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase">Przed</div>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ boxShadow: `0 0 0 3px ${primary}, 0 0 60px ${primary}60` }}>
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-bold text-xs tracking-[0.3em] uppercase" style={{ color: primary, textShadow: `0 0 20px ${primary}` }}>Po</div>
              </div>
            </div>
            <div className="absolute top-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.5em] uppercase" style={{ color: primary, textShadow: `0 0 30px ${primary}` }}>{salonName}</span>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <h2 className="text-2xl font-black text-white" style={{ textShadow: `0 0 40px ${primary}60` }}>{headline}</h2>
            </div>
          </div>
        );

      case 'meta-editorial':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden bg-neutral-100">
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
              <span className="text-xs tracking-[0.3em] uppercase font-medium text-neutral-400">{salonName}</span>
              <span className="text-xs text-neutral-400">Beauty Transformation</span>
            </div>
            <div className="absolute inset-6 top-16 bottom-24 flex gap-4">
              <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl">
                <img src={before} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                  <span className="text-xs text-neutral-500 tracking-widest uppercase">Before</span>
                </div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl" style={{ boxShadow: `0 25px 50px -12px ${primary}40` }}>
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: primary }}>
                  <span className="text-xs text-white font-bold tracking-widest uppercase">After</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">{headline}</h2>
              <p className="text-neutral-500 text-sm mt-1">{subheadline}</p>
            </div>
          </div>
        );

      case 'meta-split':
        return (
          <div className="w-full aspect-square relative overflow-hidden bg-black">
            <div className="absolute inset-0">
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4) grayscale(50%)' }} />
            </div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}>
              <img src={after} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 49%, ${primary} 49%, ${primary} 51%, transparent 51%)` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: primary, boxShadow: `0 0 50px ${primary}` }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur rounded-full">
              <span className="text-white/80 text-xs tracking-widest uppercase">Przed</span>
            </div>
            <div className="absolute top-6 right-6 px-4 py-2 rounded-full" style={{ background: primary }}>
              <span className="text-white text-xs font-bold tracking-widest uppercase">Po</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-gradient-to-t from-black via-black/80 to-transparent">
              <span className="text-xs tracking-[0.4em] uppercase block mb-2" style={{ color: primary }}>{salonName}</span>
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
            </div>
          </div>
        );

      case 'meta-frame':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: dark }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${primary} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
            <div className="absolute inset-10 border rounded-3xl" style={{ borderColor: `${primary}30` }} />
            <div className="absolute inset-14 flex gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10">
                  <img src={before} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-900 rounded-full border border-white/10">
                  <span className="text-white/60 text-[10px] tracking-widest uppercase">Przed</span>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ border: `2px solid ${primary}`, boxShadow: `0 0 40px ${primary}40` }}>
                  <img src={after} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full" style={{ background: primary }}>
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">Po</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: `${primary}80` }}>{salonName}</span>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
            </div>
          </div>
        );

      case 'meta-slide':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: dark }}>
            <div className="absolute inset-4 rounded-3xl overflow-hidden">
              <img src={after} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${dark}80, transparent 50%, ${dark})` }} />
            </div>
            <div className="absolute top-10 left-10 w-28 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 rounded-full">
                <span className="text-white/80 text-[9px] tracking-widest uppercase">Przed</span>
              </div>
            </div>
            <div className="absolute top-10 right-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})`, boxShadow: `0 0 30px ${primary}50` }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <span className="text-xs tracking-[0.3em] uppercase block mb-2" style={{ color: primary }}>{serviceName}</span>
              <h2 className="text-3xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-white/50 text-sm mb-6">{subheadline}</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: primary }}>
                <span className="text-white font-semibold text-sm">{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        );

      // ===== PROMOCJE =====
      case 'promo-gradient':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${dark} 0%, #000 100%)` }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-40" style={{ background: primary }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-30" style={{ background: secondary }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
              <div className="mb-6 px-5 py-2 rounded-full border" style={{ borderColor: primary, background: `${primary}15` }}>
                <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: primary }}>Promocja</span>
              </div>
              <div className="text-8xl font-black text-white mb-4" style={{ textShadow: `0 0 80px ${primary}50` }}>{discount}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{serviceName}</h2>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xl text-white/40 line-through">{originalPrice}</span>
                <span className="text-3xl font-bold" style={{ color: primary }}>{newPrice}</span>
              </div>
              <button className="px-8 py-4 rounded-full text-white font-bold" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})`, boxShadow: `0 0 40px ${primary}40` }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-minimal':
        return (
          <div className="w-full aspect-square relative overflow-hidden bg-white">
            <div className="absolute top-6 left-6">
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: primary }}>{salonName}</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
              <span className="text-sm text-neutral-400 mb-4">Specjalna oferta</span>
              <h2 className="text-4xl font-bold text-neutral-900 mb-2">{serviceName}</h2>
              <div className="w-16 h-px my-6" style={{ background: primary }} />
              <div className="text-6xl font-black mb-4" style={{ color: primary }}>{discount}</div>
              <div className="flex items-center gap-3">
                <span className="text-lg text-neutral-400 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-neutral-900">{newPrice}</span>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <button className="px-8 py-3 rounded-full text-white font-medium" style={{ background: primary }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'promo-bold':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: primary }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)` }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
              <div className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4">{salonName}</div>
              <div className="text-[120px] font-black text-white leading-none" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>{discount}</div>
              <h2 className="text-3xl font-bold text-white mt-4 mb-2">{serviceName}</h2>
              <p className="text-white/70 mb-8">{subheadline}</p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xl text-white/50 line-through">{originalPrice}</span>
                <span className="text-4xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-10 py-4 rounded-full bg-white font-bold text-lg" style={{ color: primary }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'promo-flash':
        return (
          <div className="w-full aspect-square relative overflow-hidden bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full blur-[120px] opacity-30" style={{ background: `conic-gradient(from 0deg, ${primary}, ${secondary}, ${primary})` }} />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full animate-pulse">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-xs font-bold tracking-wider uppercase">Flash Sale</span>
              </div>
              <div className="text-7xl font-black text-white mb-2">{discount}</div>
              <h2 className="text-xl font-bold text-white mb-1">{serviceName}</h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold" style={{ color: primary }}>{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-white font-bold" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'promo-vip':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${dark} 0%, #000 100%)` }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${primary} 0, ${primary} 1px, transparent 0, transparent 50%)`, backgroundSize: '20px 20px' }} />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: primary }} />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
              <Crown className="w-5 h-5 text-white" />
              <span className="text-white font-bold tracking-widest uppercase text-sm">VIP Access</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 pt-24">
              <span className="text-xs tracking-[0.4em] uppercase text-white/50 mb-4">Ekskluzywna Oferta</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="w-16 h-px mb-6" style={{ background: `linear-gradient(to right, transparent, ${primary}, transparent)` }} />
              <div className="text-7xl font-black mb-4" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{discount}</div>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-xl text-white/30 line-through">{originalPrice}</span>
                <ArrowRight className="w-4 h-4 text-white/30" />
                <span className="text-3xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-10 py-4 rounded-full text-white font-bold border-2" style={{ borderColor: primary, background: `${primary}20` }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/20">{salonName}</span>
            </div>
          </div>
        );

      // ===== USŁUGI =====
      case 'service-card':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: dark }}>
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${dark} 0%, ${dark}80 40%, transparent 100%)` }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${primary}20`, border: `1px solid ${primary}40` }}>
                <Gem className="w-4 h-4" style={{ color: primary }} />
                <span className="text-xs font-medium" style={{ color: primary }}>Nasza Specjalność</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{serviceName}</h2>
              <p className="text-white/60 mb-6">{subheadline}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: primary }}>{newPrice}</span>
                <button className="px-6 py-2.5 rounded-full text-white font-medium" style={{ background: primary }}>{ctaText}</button>
              </div>
            </div>
            <div className="absolute top-6 left-6">
              <span className="text-xs tracking-[0.3em] uppercase text-white/50">{salonName}</span>
            </div>
          </div>
        );

      case 'service-feature':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${dark} 0%, #000 100%)` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full overflow-hidden" style={{ boxShadow: `0 0 100px ${primary}40` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="text-center">
                <span className="text-xs tracking-[0.4em] uppercase" style={{ color: primary }}>{salonName}</span>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">{serviceName}</h2>
                <p className="text-white/50 text-sm mb-4">{subheadline}</p>
                <span className="text-2xl font-bold" style={{ color: primary }}>{newPrice}</span>
              </div>
            </div>
          </div>
        );

      case 'service-grid':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: dark }}>
            <div className="absolute inset-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden relative" style={{ gridRow: 'span 2' }}>
                <img src={main} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl p-4 flex flex-col justify-end" style={{ background: primary }}>
                <span className="text-white/80 text-xs">Usługa</span>
                <span className="text-white font-bold">{serviceName}</span>
              </div>
              <div className="rounded-2xl p-4 flex flex-col justify-end bg-zinc-800/50 border border-white/5">
                <span className="text-white/40 text-xs">Cena</span>
                <span className="text-white font-bold text-xl">{newPrice}</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      // ===== OPINIE =====
      case 'review-quote':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${dark}, #000)` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20" style={{ background: primary }} />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${primary}20`, border: `1px solid ${primary}40` }}>
              <Quote className="w-6 h-6" style={{ color: primary }} />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center pt-28">
              <p className="text-xl text-white leading-relaxed mb-8">{reviewText}</p>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" style={{ color: primary }} />)}
              </div>
              <span className="text-white/60 text-sm">{reviewerName}</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'review-photo':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: dark }}>
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${dark} 50%, transparent 100%)` }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" style={{ color: primary }} />)}
              </div>
              <p className="text-lg text-white leading-relaxed mb-6">"{reviewText}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: primary }}>
                  <img src={main} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-white font-medium block">{reviewerName}</span>
                  <span className="text-white/50 text-sm">Zadowolona klientka</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'review-minimal':
        return (
          <div className="w-full aspect-square relative overflow-hidden bg-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current" style={{ color: primary }} />)}
              </div>
              <p className="text-xl text-neutral-800 leading-relaxed mb-6">"{reviewText}"</p>
              <div className="w-12 h-px mb-4" style={{ background: primary }} />
              <span className="text-neutral-500 font-medium">{reviewerName}</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: primary }}>{salonName}</span>
            </div>
          </div>
        );

      // ===== STORIES =====
      case 'story-promo':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: dark }}>
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${dark} 100%)` }} />
            </div>
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/70">{salonName}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ background: `${primary}20`, border: `1px solid ${primary}` }}>
                <span className="text-sm font-bold" style={{ color: primary }}>PROMOCJA</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{serviceName}</h2>
              <div className="text-5xl font-black mb-4" style={{ color: primary }}>{discount}</div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="w-full py-4 rounded-full font-bold text-white" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'story-result':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden bg-black">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 relative overflow-hidden">
                <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/50 backdrop-blur rounded-full">
                  <span className="text-white/80 text-sm tracking-widest uppercase">Przed</span>
                </div>
              </div>
              <div className="h-1" style={{ background: primary, boxShadow: `0 0 20px ${primary}` }} />
              <div className="flex-1 relative overflow-hidden">
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full" style={{ background: primary }}>
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Po</span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 left-0 right-0 text-center z-10">
              <span className="text-xs tracking-[0.3em] uppercase text-white/60">{salonName}</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 p-6 text-center z-10">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
            </div>
          </div>
        );

      case 'story-cta':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${dark} 0%, #000 100%)` }}>
            <div className="absolute inset-x-6 top-20 bottom-48 rounded-3xl overflow-hidden" style={{ boxShadow: `0 0 60px ${primary}30` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: primary }} />
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">{salonName}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-white/50 text-sm mb-6">{subheadline}</p>
              <button className="w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-4 text-white/30 text-xs">↑ Przesuń w górę</div>
            </div>
          </div>
        );

      case 'story-poll':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${dark} 0%, #000 100%)` }}>
            <div className="absolute top-0 left-0 right-0 h-1/2">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </div>
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">{salonName}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">{headline}</h2>
              <div className="space-y-3">
                <button className="w-full py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white font-medium">
                  ❤️ Tak, chcę!
                </button>
                <button className="w-full py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white font-medium">
                  🔥 Zdecydowanie!
                </button>
              </div>
            </div>
          </div>
        );

      // ===== SEZONOWE - ŚWIĘTA =====
      case 'xmas-promo':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a0a 0%, #0a1a0a 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-4xl">❄️</div>
              <div className="absolute top-20 right-16 text-2xl">✨</div>
              <div className="absolute bottom-32 left-16 text-xl">🎄</div>
              <div className="absolute top-1/3 right-10 text-3xl">⭐</div>
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: '#c41e3a' }} />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: '#228b22' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-4xl mb-4">🎁</div>
              <span className="text-xs tracking-[0.4em] uppercase text-white/60 mb-2">Świąteczna Oferta</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ background: 'linear-gradient(135deg, #c41e3a, #228b22)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #c41e3a, #228b22)' }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'xmas-gift':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a0a 0%, #0a0a1a 100%)' }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] opacity-20" style={{ background: '#d4af37' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
              <div className="text-6xl mb-6">🎁</div>
              <span className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#d4af37' }}>Bon Podarunkowy</span>
              <h2 className="text-4xl font-bold text-white mb-4">{serviceName}</h2>
              <p className="text-white/60 mb-6">Idealny prezent dla bliskiej osoby</p>
              <div className="text-5xl font-black text-white mb-6">{newPrice}</div>
              <button className="px-8 py-3 rounded-full text-zinc-900 font-bold" style={{ background: 'linear-gradient(135deg, #d4af37, #f5d485)' }}>
                Kup teraz
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'xmas-story':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a0a0a 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-8 left-8 text-3xl">❄️</div>
              <div className="absolute top-16 right-12 text-2xl">✨</div>
              <div className="absolute top-1/3 left-6 text-xl">⭐</div>
              <div className="absolute top-1/2 right-8 text-2xl">🎄</div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 blur-[100px] opacity-20" style={{ background: 'linear-gradient(135deg, #c41e3a, #228b22)' }} />
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">{salonName}</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">🎁</div>
              <span className="text-white/60 text-sm mb-2">Świąteczna Promocja</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ background: 'linear-gradient(135deg, #c41e3a, #228b22)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <button className="w-full py-4 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #c41e3a, #228b22)' }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      // ===== SEZONOWE - WALENTYNKI =====
      case 'val-love':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a0a14 0%, #1a0a0a 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-3xl">💕</div>
              <div className="absolute top-16 right-12 text-2xl">✨</div>
              <div className="absolute bottom-24 left-16 text-xl">💖</div>
              <div className="absolute top-1/3 right-8 text-2xl">❤️</div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: '#e74c3c' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">💝</div>
              <span className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#e74c3c' }}>Walentynkowa Oferta</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ color: '#e74c3c' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'val-duo':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2a0a14 0%, #1a0a0a 100%)' }}>
            <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden rounded-b-[3rem]">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #2a0a14)' }} />
            </div>
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">{salonName}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <div className="text-4xl mb-4">💑</div>
              <span className="text-sm mb-2" style={{ color: '#e74c3c' }}>Pakiet dla Par</span>
              <h2 className="text-2xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-5xl font-black mb-4" style={{ color: '#e74c3c' }}>{discount}</div>
              <p className="text-white/60 text-sm mb-6">Idealna randka w spa</p>
              <button className="w-full py-4 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'val-story':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2a0a14 0%, #1a0a0a 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-8 text-3xl">💕</div>
              <div className="absolute top-20 right-10 text-2xl">✨</div>
              <div className="absolute top-1/3 left-10 text-xl">💖</div>
              <div className="absolute top-1/2 right-6 text-3xl">❤️</div>
            </div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[100px] opacity-30" style={{ background: '#e74c3c' }} />
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">{salonName}</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-6xl mb-4">💝</div>
              <span className="text-sm mb-2" style={{ color: '#e74c3c' }}>Walentynki</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ color: '#e74c3c' }}>{discount}</div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <button className="w-full py-4 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      // ===== SEZONOWE - WIOSNA =====
      case 'spring-fresh':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1a14 0%, #0a0a14 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-3xl">🌸</div>
              <div className="absolute top-16 right-12 text-2xl">🌷</div>
              <div className="absolute bottom-24 left-16 text-xl">🌺</div>
              <div className="absolute top-1/3 right-8 text-2xl">🌻</div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: '#f39c12' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">🌸</div>
              <span className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#f39c12' }}>Wiosenna Promocja</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ color: '#f39c12' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)' }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'spring-bloom':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a10 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #0a1a10)' }} />
            </div>
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/60">{salonName}</span>
              <span className="text-2xl">🌷</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <span className="text-sm mb-2" style={{ color: '#2ecc71' }}>Spring Bloom</span>
              <h2 className="text-2xl font-bold text-white mb-4">{serviceName}</h2>
              <p className="text-white/60 text-sm mb-4">{subheadline}</p>
              <div className="text-4xl font-black mb-6" style={{ color: '#2ecc71' }}>{discount}</div>
              <button className="w-full py-4 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      // ===== SEZONOWE - LATO =====
      case 'summer-glow':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a0a 0%, #1a0a0a 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-3xl">☀️</div>
              <div className="absolute top-16 right-12 text-2xl">🌴</div>
              <div className="absolute bottom-24 left-16 text-xl">🌊</div>
              <div className="absolute top-1/3 right-8 text-2xl">🍹</div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: '#f1c40f' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">☀️</div>
              <span className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#f1c40f' }}>Summer Glow</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ color: '#f1c40f' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-zinc-900 font-bold" style={{ background: 'linear-gradient(135deg, #f1c40f, #f39c12)' }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'summer-beach':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a1a 0%, #0a0a0a 100%)' }}>
            <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #0a1a1a)' }} />
            </div>
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/60">{salonName}</span>
              <span className="text-2xl">🌴</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <span className="text-sm mb-2" style={{ color: '#00b894' }}>Beach Ready</span>
              <h2 className="text-2xl font-bold text-white mb-4">{serviceName}</h2>
              <p className="text-white/60 text-sm mb-4">Przygotuj się na lato!</p>
              <div className="text-4xl font-black mb-6" style={{ color: '#00b894' }}>{discount}</div>
              <button className="w-full py-4 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #00b894, #00cec9)' }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      // ===== SEZONOWE - BLACK FRIDAY =====
      case 'bf-mega':
        return (
          <div className="w-full aspect-square relative overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="mb-4 px-4 py-2 bg-yellow-500 rounded">
                <span className="text-black text-xs font-black tracking-wider uppercase">Black Friday</span>
              </div>
              <div className="text-[100px] font-black text-white leading-none" style={{ textShadow: '0 0 60px rgba(255,255,255,0.3)' }}>{discount}</div>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">{serviceName}</h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-yellow-500">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-black font-bold bg-yellow-500">
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      case 'bf-countdown':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden bg-black">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(234,179,8,0.1) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="mb-6 px-6 py-2 bg-yellow-500 rounded">
                <span className="text-black text-sm font-black tracking-wider uppercase">⚡ Black Friday ⚡</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-8xl font-black text-yellow-500 mb-4">{discount}</div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <div className="flex gap-4 mb-8">
                {['23', '59', '59'].map((n, i) => (
                  <div key={i} className="w-16 h-20 bg-zinc-900 rounded-lg flex items-center justify-center border border-yellow-500/30">
                    <span className="text-3xl font-bold text-yellow-500">{n}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-full text-black font-bold bg-yellow-500">
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      // ===== SEZONOWE - DZIEŃ KOBIET =====
      case 'wd-queen':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a14 0%, #0a0a0a 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-3xl">👑</div>
              <div className="absolute top-16 right-12 text-2xl">💐</div>
              <div className="absolute bottom-24 left-16 text-xl">✨</div>
              <div className="absolute top-1/3 right-8 text-2xl">🌹</div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: '#e91e63' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">👑</div>
              <span className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#e91e63' }}>Dzień Kobiet</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ color: '#e91e63' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)' }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
            </div>
          </div>
        );

      // ===== SEZONOWE - NOWY ROK =====
      case 'ny-fresh':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #000 100%)' }}>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 text-3xl">🎉</div>
              <div className="absolute top-16 right-12 text-2xl">✨</div>
              <div className="absolute bottom-24 left-16 text-xl">🥂</div>
              <div className="absolute top-1/3 right-8 text-2xl">🎊</div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-30" style={{ background: '#9b59b6' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-5xl mb-4">🎆</div>
              <span className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#9b59b6' }}>Nowy Rok, Nowy Ty</span>
              <h2 className="text-3xl font-bold text-white mb-4">{serviceName}</h2>
              <div className="text-6xl font-black mb-4" style={{ color: '#9b59b6' }}>{discount}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg text-white/40 line-through">{originalPrice}</span>
                <span className="text-2xl font-bold text-white">{newPrice}</span>
              </div>
              <button className="px-8 py-3 rounded-full text-white font-bold" style={{ background: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }}>
                {ctaText}
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-[0.3em] uppercase text-white/30">{salonName}</span>
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

  const getAspectClass = () => {
    switch (currentTemplate?.aspect) {
      case '9:16': return 'aspect-[9/16]';
      case '4:5': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  const ImageUpload = ({ label, image, onUpload, onClear }: { label: string; image: string | null; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; onClear: () => void }) => (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {image ? (
        <div className="relative aspect-square rounded-xl overflow-hidden group border border-border/50">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="icon" variant="destructive" onClick={onClear} className="h-8 w-8"><X className="h-4 w-4" /></Button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-all bg-card/30 hover:bg-card/50">
          <Upload className="w-6 h-6 text-muted-foreground mb-2" />
          <span className="text-xs text-muted-foreground">Dodaj zdjęcie</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  );

  return (
    <AppLayout>
      <div className="h-full flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="w-full lg:w-[440px] border-r border-border/50 bg-gradient-to-b from-card/50 to-background flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-primary/20">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kreator Grafik</h1>
                <p className="text-xs text-muted-foreground">Profesjonalne grafiki Facebook Ads</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-6">
              <Tabs defaultValue="templates" className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-6 bg-background/50 p-1 h-auto">
                  <TabsTrigger value="templates" className="text-xs py-2.5 gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Layers className="w-3.5 h-3.5" />
                    Szablony
                  </TabsTrigger>
                  <TabsTrigger value="images" className="text-xs py-2.5 gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Zdjęcia
                  </TabsTrigger>
                  <TabsTrigger value="content" className="text-xs py-2.5 gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Type className="w-3.5 h-3.5" />
                    Treść
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs py-2.5 gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Palette className="w-3.5 h-3.5" />
                    Styl
                  </TabsTrigger>
                </TabsList>
                
                {/* TEMPLATES */}
                <TabsContent value="templates" className="space-y-6 mt-0">
                  {/* Categories */}
                  <div>
                    <Label className="text-xs text-muted-foreground mb-3 block">Kategoria</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => { setActiveCategory('all'); setSeasonalFilter(null); }} className="h-8 text-xs">
                        Wszystkie
                      </Button>
                      {Object.entries(CATEGORIES).map(([key, cat]) => (
                        <Button key={key} size="sm" variant={activeCategory === key ? 'default' : 'outline'} onClick={() => { setActiveCategory(key as TemplateCategory); setSeasonalFilter(null); }} className="h-8 text-xs gap-1.5">
                          <cat.icon className="w-3.5 h-3.5" />
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Seasonal filters */}
                  {activeCategory === 'seasonal' && (
                    <div>
                      <Label className="text-xs text-muted-foreground mb-3 block">Okazja</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant={seasonalFilter === null ? 'default' : 'outline'} onClick={() => setSeasonalFilter(null)} className="h-7 text-xs">
                          Wszystkie
                        </Button>
                        {Object.entries(SEASONAL_FILTERS).map(([key, sf]) => (
                          <Button key={key} size="sm" variant={seasonalFilter === key ? 'default' : 'outline'} onClick={() => setSeasonalFilter(key as SeasonalType)} className="h-7 text-xs gap-1">
                            <sf.icon className="w-3 h-3" />
                            {sf.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Templates grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map((tmpl) => {
                      const isSelected = selectedTemplate === tmpl.id;
                      const cat = CATEGORIES[tmpl.category];
                      const seasonal = tmpl.seasonal ? SEASONAL_FILTERS[tmpl.seasonal] : null;
                      return (
                        <button
                          key={tmpl.id}
                          onClick={() => setSelectedTemplate(tmpl.id)}
                          className={cn(
                            "relative p-3 rounded-xl border text-left transition-all",
                            isSelected ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" : "border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50"
                          )}
                        >
                          {tmpl.premium && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}20` }}>
                              <cat.icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                            </div>
                            {seasonal && (
                              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: `${seasonal.color}20` }}>
                                <seasonal.icon className="w-3 h-3" style={{ color: seasonal.color }} />
                              </div>
                            )}
                          </div>
                          <div className="font-medium text-sm text-foreground">{tmpl.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-background/50 text-muted-foreground">{tmpl.aspect}</span>
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
                  
                  <div className="text-center pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">{filteredTemplates.length} szablonów</span>
                  </div>
                </TabsContent>
                
                {/* IMAGES */}
                <TabsContent value="images" className="space-y-6 mt-0">
                  {currentTemplate?.category === 'metamorphosis' || selectedTemplate.includes('result') ? (
                    <div className="grid grid-cols-2 gap-4">
                      <ImageUpload label="Zdjęcie PRZED" image={beforeImage} onUpload={handleImageUpload(setBeforeImage)} onClear={() => setBeforeImage(null)} />
                      <ImageUpload label="Zdjęcie PO" image={afterImage} onUpload={handleImageUpload(setAfterImage)} onClear={() => setAfterImage(null)} />
                    </div>
                  ) : (
                    <ImageUpload label="Główne zdjęcie" image={mainImage} onUpload={handleImageUpload(setMainImage)} onClear={() => setMainImage(null)} />
                  )}
                </TabsContent>
                
                {/* CONTENT */}
                <TabsContent value="content" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Nazwa salonu</Label>
                    <Input value={salonName} onChange={(e) => setSalonName(e.target.value)} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Nagłówek</Label>
                    <Input value={headline} onChange={(e) => setHeadline(e.target.value)} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Podtytuł</Label>
                    <Textarea value={subheadline} onChange={(e) => setSubheadline(e.target.value)} className="bg-background/50 resize-none h-16" />
                  </div>
                  <div className="border-t border-border/50 pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Nazwa usługi</Label>
                      <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-background/50" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Rabat</Label>
                        <Input value={discount} onChange={(e) => setDiscount(e.target.value)} className="bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Stara cena</Label>
                        <Input value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="bg-background/50" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Nowa cena</Label>
                        <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="bg-background/50" />
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border/50 pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Opinia klienta</Label>
                      <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="bg-background/50 resize-none h-16" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Imię klienta</Label>
                      <Input value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="bg-background/50" />
                    </div>
                  </div>
                  <div className="border-t border-border/50 pt-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Przycisk CTA</Label>
                      <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="bg-background/50" />
                    </div>
                  </div>
                </TabsContent>
                
                {/* STYLE */}
                <TabsContent value="style" className="space-y-6 mt-0">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-3 block">Paleta kolorów</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_SCHEMES.map((cs) => (
                        <button
                          key={cs.id}
                          onClick={() => setColorScheme(cs)}
                          className={cn(
                            "aspect-square rounded-xl relative overflow-hidden transition-all",
                            colorScheme.id === cs.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : "hover:scale-105"
                          )}
                          style={{ background: `linear-gradient(135deg, ${cs.primary}, ${cs.secondary})` }}
                        >
                          {colorScheme.id === cs.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">{colorScheme.name}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
          
          {/* Actions */}
          <div className="p-6 border-t border-border/50 space-y-3">
            <Button onClick={handleDownload} disabled={isGenerating} className="w-full bg-gradient-to-r from-primary via-pink-500 to-rose-500 hover:opacity-90 shadow-lg shadow-primary/20" size="lg">
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generowanie...</> : <><Download className="w-4 h-4 mr-2" />Pobierz grafikę</>}
            </Button>
            <Button onClick={() => { setBeforeImage(null); setAfterImage(null); setMainImage(null); toast.success('Zresetowano'); }} variant="outline" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />Reset
            </Button>
          </div>
        </div>
        
        {/* Right Panel - Preview */}
        <div className="flex-1 bg-[#050505] flex flex-col">
          <div className="p-4 border-b border-border/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Podgląd</span>
              {currentTemplate && (
                <Badge variant="outline" className="text-xs">{currentTemplate.aspect}</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setPreviewScale(Math.max(0.5, previewScale - 0.1))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(previewScale * 100)}%</span>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div 
              className={cn("transition-transform duration-200 shadow-2xl shadow-black/50", getAspectClass())}
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
