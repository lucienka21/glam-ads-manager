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
  Star,
  Crown,
  Diamond,
  Gem,
  Heart,
  Scissors,
  Camera,
  Gift,
  Percent,
  ChevronRight,
  ArrowRight,
  Check,
  Quote,
  Phone,
  MapPin,
  Calendar,
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
  { id: 'meta-glamour', name: 'Glamour Split', category: 'metamorphosis', aspect: '1:1', description: 'Luksusowy podział ze złotymi akcentami' },
  { id: 'meta-magazine', name: 'Beauty Magazine', category: 'metamorphosis', aspect: '4:5', description: 'Styl okładki Vogue' },
  { id: 'meta-reveal', name: 'Reveal Slider', category: 'metamorphosis', aspect: '1:1', description: 'Efekt odsłaniania' },
  { id: 'meta-story', name: 'Story Split', category: 'metamorphosis', aspect: '9:16', description: 'Pionowy format story' },
  
  // Promocje - zachowuję elegant i seasonal, dodaję nowe
  { id: 'promo-elegant', name: 'Elegant Offer', category: 'promo', aspect: '1:1', description: 'Elegancka oferta specjalna' },
  { id: 'promo-seasonal', name: 'Seasonal Sale', category: 'promo', aspect: '1:1', description: 'Promocja sezonowa' },
  { id: 'promo-luxury', name: 'Luxury Deal', category: 'promo', aspect: '1:1', description: 'Luksusowa promocja premium', premium: true },
  { id: 'promo-flash', name: 'Flash Discount', category: 'promo', aspect: '4:5', description: 'Błyskawiczna promocja' },
  
  // Usługi
  { id: 'service-hero', name: 'Service Hero', category: 'service', aspect: '1:1', description: 'Pełnoekranowa prezentacja' },
  { id: 'service-card', name: 'Beauty Card', category: 'service', aspect: '4:5', description: 'Elegancka karta usługi' },
  { id: 'service-minimal', name: 'Minimal Service', category: 'service', aspect: '1:1', description: 'Minimalistyczny styl' },
  
  // Opinie
  { id: 'review-luxury', name: 'Luxury Review', category: 'testimonial', aspect: '1:1', description: 'Luksusowa opinia klienta' },
  { id: 'review-photo', name: 'Photo Testimonial', category: 'testimonial', aspect: '4:5', description: 'Opinia ze zdjęciem' },
  
  // Stories
  { id: 'story-promo', name: 'Story Promo', category: 'story', aspect: '9:16', description: 'Promocja na story' },
  { id: 'story-cta', name: 'Story CTA', category: 'story', aspect: '9:16', description: 'Call to action' },
];

const CATEGORIES: Record<TemplateCategory, { label: string; icon: any; gradient: string }> = {
  metamorphosis: { label: 'Metamorfozy', icon: Sparkles, gradient: 'from-rose-500 via-pink-500 to-fuchsia-500' },
  promo: { label: 'Promocje', icon: Percent, gradient: 'from-amber-400 via-orange-500 to-red-500' },
  service: { label: 'Usługi', icon: Scissors, gradient: 'from-violet-500 via-purple-500 to-indigo-500' },
  testimonial: { label: 'Opinie', icon: Star, gradient: 'from-cyan-400 via-teal-500 to-emerald-500' },
  story: { label: 'Stories', icon: Camera, gradient: 'from-pink-500 via-rose-500 to-red-500' },
};

// Profesjonalne palety kolorów dla beauty
const COLOR_PALETTES = [
  { name: 'Rose Gold', primary: '#e8b4b8', secondary: '#f5d5d8', accent: '#d4a574', bg: '#1a1212' },
  { name: 'Champagne', primary: '#d4a574', secondary: '#e8c9a0', accent: '#c9b896', bg: '#141210' },
  { name: 'Blush Pink', primary: '#f4a5c7', secondary: '#f8c8dc', accent: '#e8b4b8', bg: '#1a1016' },
  { name: 'Soft Mauve', primary: '#c8a2c8', secondary: '#d8bfd8', accent: '#dda0dd', bg: '#16121a' },
  { name: 'Pearl White', primary: '#f5f5f5', secondary: '#ffffff', accent: '#e8e8e8', bg: '#0a0a0a' },
  { name: 'Nude Beige', primary: '#d2b48c', secondary: '#deb887', accent: '#c4a77d', bg: '#12100e' },
  { name: 'Berry Wine', primary: '#8b2252', secondary: '#a0526e', accent: '#c08090', bg: '#120a0e' },
  { name: 'Soft Coral', primary: '#f08080', secondary: '#f5a9a9', accent: '#ffc0cb', bg: '#1a1010' },
];

const FONTS = [
  { id: 'playfair', name: 'Elegancki', family: 'Playfair Display, serif' },
  { id: 'cormorant', name: 'Luksusowy', family: 'Cormorant Garamond, serif' },
  { id: 'montserrat', name: 'Nowoczesny', family: 'Montserrat, sans-serif' },
  { id: 'raleway', name: 'Subtelny', family: 'Raleway, sans-serif' },
];

export default function GraphicsCreator() {
  // Template & Category
  const [selectedTemplate, setSelectedTemplate] = useState<string>('promo-elegant');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  
  // Images
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  
  // Content
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [headline, setHeadline] = useState('Odkryj Swoje Piękno');
  const [subheadline, setSubheadline] = useState('Profesjonalne zabiegi kosmetyczne');
  const [serviceName, setServiceName] = useState('Makijaż Permanentny');
  const [discount, setDiscount] = useState('-30%');
  const [originalPrice, setOriginalPrice] = useState('599 zł');
  const [newPrice, setNewPrice] = useState('419 zł');
  const [reviewText, setReviewText] = useState('Jestem zachwycona efektami! Polecam każdej kobiecie.');
  const [reviewerName, setReviewerName] = useState('Anna K.');
  const [ctaText, setCtaText] = useState('Zarezerwuj wizytę');
  
  // Style
  const [palette, setPalette] = useState(COLOR_PALETTES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [overlayOpacity, setOverlayOpacity] = useState([50]);
  const [showLogo, setShowLogo] = useState(true);
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.8);
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
    setHeadline('Odkryj Swoje Piękno');
    setSubheadline('Profesjonalne zabiegi kosmetyczne');
    setServiceName('Makijaż Permanentny');
    setDiscount('-30%');
    setOriginalPrice('599 zł');
    setNewPrice('419 zł');
    setReviewText('Jestem zachwycona efektami! Polecam każdej kobiecie.');
    setReviewerName('Anna K.');
    setCtaText('Zarezerwuj wizytę');
    setOverlayOpacity([50]);
    toast.success('Wszystko zostało zresetowane');
  };

  const getAspectClass = () => {
    switch (currentTemplate?.aspect) {
      case '9:16': return 'aspect-[9/16]';
      case '4:5': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  // Placeholder images - professional beauty
  const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
  const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  const placeholderMain = 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80';

  const before = beforeImage || placeholderBefore;
  const after = afterImage || placeholderAfter;
  const main = mainImage || placeholderMain;

  // ====== RENDER TEMPLATES ======
  const renderTemplate = () => {
    const baseStyles = {
      fontFamily: selectedFont.family,
      '--primary': palette.primary,
      '--secondary': palette.secondary,
      '--accent': palette.accent,
    } as React.CSSProperties;

    switch (selectedTemplate) {
      // ============ METAMORFOZY ============
      case 'meta-glamour':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0" style={{ 
              background: `radial-gradient(ellipse at center, ${palette.primary}15 0%, transparent 70%)`
            }} />
            
            {/* Gold decorative corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2" style={{ borderColor: palette.accent }} />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2" style={{ borderColor: palette.accent }} />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2" style={{ borderColor: palette.accent }} />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2" style={{ borderColor: palette.accent }} />
            
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center z-20">
              <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: palette.accent }}>{salonName}</span>
            </div>
            
            {/* Images */}
            <div className="absolute inset-12 flex gap-3">
              {/* Before */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl" 
                  style={{ boxShadow: `0 25px 50px -12px ${palette.bg}` }}>
                  <img src={before} alt="Przed" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85) contrast(1.05)' }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}ee, transparent 40%)` }} />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full backdrop-blur-sm"
                  style={{ background: `${palette.bg}cc`, border: `1px solid ${palette.accent}40` }}>
                  <span className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: palette.primary }}>Przed</span>
                </div>
              </div>
              
              {/* Divider with diamond */}
              <div className="w-8 flex flex-col items-center justify-center gap-2 relative z-10">
                <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${palette.accent}, transparent)` }} />
                <div className="w-8 h-8 rotate-45 flex items-center justify-center" 
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, boxShadow: `0 0 30px ${palette.primary}60` }}>
                  <Sparkles className="w-4 h-4 text-white -rotate-45" />
                </div>
                <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${palette.accent}, transparent)` }} />
              </div>
              
              {/* After */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{ boxShadow: `0 0 60px ${palette.primary}40, 0 25px 50px -12px ${palette.bg}` }}>
                  <img src={after} alt="Po" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}ee, transparent 40%)` }} />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, boxShadow: `0 4px 20px ${palette.primary}60` }}>
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white">Po</span>
                </div>
              </div>
            </div>
            
            {/* Bottom text */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <h2 className="text-xl font-semibold mb-1" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{headline}</h2>
              <p className="text-xs" style={{ color: `${palette.primary}80` }}>{subheadline}</p>
            </div>
          </div>
        );

      case 'meta-magazine':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Main after image - large */}
            <div className="absolute inset-0">
              <img src={after} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to bottom, ${palette.bg}dd 0%, transparent 25%, transparent 50%, ${palette.bg} 100%)`
              }} />
            </div>
            
            {/* Magazine header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
              <div>
                <span className="text-2xl font-bold tracking-tight" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{salonName}</span>
                <div className="h-0.5 w-12 mt-1" style={{ background: palette.accent }} />
              </div>
              <div className="text-right">
                <span className="text-[9px] tracking-[0.3em] uppercase block" style={{ color: palette.accent }}>Metamorfoza</span>
                <span className="text-[9px] tracking-wider" style={{ color: `${palette.primary}60` }}>{serviceName}</span>
              </div>
            </div>
            
            {/* Before inset - elegant frame */}
            <div className="absolute top-24 right-6 w-28 aspect-[3/4] p-1 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.primary})` }}>
              <div className="w-full h-full rounded-md overflow-hidden relative">
                <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}90, transparent)` }} />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: palette.primary }}>Przed</span>
                </div>
              </div>
            </div>
            
            {/* Content block */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${palette.accent}, transparent)` }} />
                <Diamond className="w-4 h-4" style={{ color: palette.accent }} />
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${palette.accent}, transparent)` }} />
              </div>
              
              <h2 className="text-4xl font-bold leading-tight mb-3" style={{ color: palette.primary, fontFamily: selectedFont.family }}>
                {headline}
              </h2>
              <p className="text-sm max-w-xs" style={{ color: `${palette.primary}70` }}>{subheadline}</p>
              
              {/* CTA */}
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, boxShadow: `0 4px 20px ${palette.primary}50` }}>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium" style={{ color: palette.primary }}>{ctaText}</span>
              </div>
            </div>
          </div>
        );

      case 'meta-reveal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Background subtle pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(${palette.primary} 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }} />
            
            {/* Images side by side with slider illusion */}
            <div className="absolute inset-8 flex">
              {/* Before side */}
              <div className="w-1/2 relative overflow-hidden rounded-l-2xl">
                <img src={before} alt="" className="absolute inset-0 w-[200%] h-full object-cover" style={{ filter: 'brightness(0.8) saturate(0.9)' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${palette.bg}40)` }} />
              </div>
              
              {/* After side */}
              <div className="w-1/2 relative overflow-hidden rounded-r-2xl">
                <img src={after} alt="" className="absolute inset-0 w-[200%] h-full object-cover object-right" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to left, transparent, ${palette.bg}20)` }} />
              </div>
              
              {/* Center slider handle */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-center z-10"
                style={{ background: palette.primary, boxShadow: `0 0 20px ${palette.primary}` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: palette.primary, boxShadow: `0 4px 20px ${palette.primary}80` }}>
                  <ChevronRight className="w-4 h-4 text-white -ml-1" />
                  <ChevronRight className="w-4 h-4 text-white -ml-3" style={{ transform: 'rotate(180deg)' }} />
                </div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-12 left-12 px-4 py-2 rounded-full backdrop-blur-sm"
              style={{ background: `${palette.bg}cc`, border: `1px solid ${palette.primary}30` }}>
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.primary }}>Przed</span>
            </div>
            <div className="absolute top-12 right-12 px-4 py-2 rounded-full"
              style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white font-semibold">Po</span>
            </div>
            
            {/* Bottom info */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: palette.accent }}>{salonName}</span>
            </div>
          </div>
        );

      case 'meta-story':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Top section - Before */}
            <div className="absolute top-0 left-0 right-0 h-[48%] overflow-hidden">
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${palette.bg}40, ${palette.bg})` }} />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full backdrop-blur-sm"
                style={{ background: `${palette.bg}aa`, border: `1px solid ${palette.accent}40` }}>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.primary }}>Przed</span>
              </div>
            </div>
            
            {/* Divider with sparkle */}
            <div className="absolute top-[48%] left-0 right-0 h-[4%] flex items-center justify-center z-10">
              <div className="w-full h-0.5" style={{ background: `linear-gradient(to right, transparent, ${palette.primary}, transparent)` }} />
              <div className="absolute w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: palette.bg, border: `2px solid ${palette.primary}`, boxShadow: `0 0 30px ${palette.primary}60` }}>
                <Sparkles className="w-5 h-5" style={{ color: palette.primary }} />
              </div>
            </div>
            
            {/* Bottom section - After */}
            <div className="absolute bottom-0 left-0 right-0 h-[48%] overflow-hidden">
              <img src={after} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}ee, transparent)` }} />
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white font-semibold">Po</span>
              </div>
            </div>
            
            {/* Header */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: palette.accent }}>{salonName}</span>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-20">
              <h2 className="text-xl font-semibold mb-1" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{headline}</h2>
              <p className="text-[10px]" style={{ color: `${palette.primary}60` }}>{subheadline}</p>
            </div>
          </div>
        );

      // ============ PROMOCJE ============
      case 'promo-elegant':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Subtle radial glow */}
            <div className="absolute inset-0" style={{ 
              background: `radial-gradient(ellipse at center, ${palette.primary}10 0%, transparent 60%)`
            }} />
            
            {/* Background image with heavy overlay */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" style={{ opacity: overlayOpacity[0] / 100 }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}, ${palette.bg}dd 30%, ${palette.bg}aa)` }} />
            </div>
            
            {/* Elegant frame */}
            <div className="absolute inset-8 border rounded-2xl" style={{ borderColor: `${palette.accent}30` }} />
            <div className="absolute inset-12 border rounded-xl" style={{ borderColor: `${palette.accent}15` }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
              <Diamond className="w-8 h-8 mb-6" style={{ color: palette.accent }} />
              
              <span className="text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: palette.accent }}>Oferta Specjalna</span>
              
              <h2 className="text-2xl font-semibold mb-4" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{serviceName}</h2>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-lg line-through" style={{ color: `${palette.primary}40` }}>{originalPrice}</span>
                <span className="text-4xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
              </div>
              
              <p className="text-sm max-w-xs mb-8" style={{ color: `${palette.primary}60` }}>{subheadline}</p>
              
              <div className="px-8 py-3 rounded-full" style={{ border: `2px solid ${palette.primary}` }}>
                <span className="text-sm font-medium" style={{ color: palette.primary }}>{ctaText}</span>
              </div>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${palette.accent}60` }}>{salonName}</span>
            </div>
          </div>
        );

      case 'promo-seasonal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Background image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${palette.bg}f0, ${palette.bg}dd)` }} />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-10" style={{ background: palette.primary }} />
            <div className="absolute bottom-16 left-8 w-16 h-16 rounded-full opacity-10" style={{ background: palette.accent }} />
            
            {/* Content */}
            <div className="absolute inset-0 p-10 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start">
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.accent }}>{salonName}</span>
                <div className="px-4 py-2 rounded-full" style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}30` }}>
                  <span className="text-[10px] font-medium tracking-wider" style={{ color: palette.primary }}>Promocja</span>
                </div>
              </div>
              
              {/* Main content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-semibold mb-4" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{headline}</h2>
                
                <div className="text-6xl font-bold mb-4" style={{ color: palette.primary }}>{discount}</div>
                
                <p className="mb-4" style={{ color: `${palette.primary}80` }}>{serviceName}</p>
                
                <div className="flex items-center gap-4">
                  <span className="text-lg line-through" style={{ color: `${palette.primary}40` }}>{originalPrice}</span>
                  <span className="text-2xl font-semibold" style={{ color: palette.primary }}>{newPrice}</span>
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex justify-center">
                <button className="px-8 py-3 rounded-full font-medium text-white"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, boxShadow: `0 4px 20px ${palette.primary}40` }}>
                  {ctaText}
                </button>
              </div>
            </div>
          </div>
        );

      case 'promo-luxury':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: `linear-gradient(135deg, ${palette.bg}, #000)` }}>
            {/* Luxury pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${palette.primary} 0, ${palette.primary} 1px, transparent 0, transparent 50%)`,
              backgroundSize: '16px 16px'
            }} />
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[100px] opacity-20" style={{ background: palette.primary }} />
            
            {/* Crown badge */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.primary})` }}>
              <Crown className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Premium</span>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: `${palette.primary}80` }}>Ekskluzywna Oferta</span>
              
              <h2 className="text-3xl font-semibold mb-4" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{serviceName}</h2>
              
              <div className="w-16 h-px mb-6" style={{ background: `linear-gradient(to right, transparent, ${palette.accent}, transparent)` }} />
              
              <div className="text-7xl font-bold mb-4" style={{ 
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {discount}
              </div>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-xl line-through" style={{ color: `${palette.primary}30` }}>{originalPrice}</span>
                <ArrowRight className="w-4 h-4" style={{ color: `${palette.primary}40` }} />
                <span className="text-3xl font-semibold" style={{ color: palette.primary }}>{newPrice}</span>
              </div>
              
              <p className="text-sm max-w-xs mb-8" style={{ color: `${palette.primary}50` }}>{subheadline}</p>
              
              <button className="px-10 py-4 rounded-full font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, boxShadow: `0 8px 30px ${palette.primary}50` }}>
                {ctaText}
              </button>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${palette.primary}30` }}>{salonName}</span>
            </div>
          </div>
        );

      case 'promo-flash':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Dynamic background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[80px] opacity-30" style={{ background: palette.primary }} />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-[60px] opacity-20" style={{ background: palette.accent }} />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {/* Flash badge */}
              <div className="mb-8 px-5 py-2 rounded-full"
                style={{ background: `${palette.primary}15`, border: `1px solid ${palette.primary}40` }}>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: palette.primary }}>
                  ⚡ Flash Sale ⚡
                </span>
              </div>
              
              {/* Discount */}
              <h1 className="text-8xl font-black mb-4" style={{ 
                color: palette.primary,
                textShadow: `0 0 60px ${palette.primary}40`,
                fontFamily: selectedFont.family
              }}>
                {discount}
              </h1>
              
              {/* Service */}
              <div className="mb-8">
                <span className="text-2xl font-semibold" style={{ color: palette.primary }}>{serviceName}</span>
              </div>
              
              {/* Prices */}
              <div className="flex items-center gap-6 mb-10">
                <span className="text-2xl line-through" style={{ color: `${palette.primary}35` }}>{originalPrice}</span>
                <span className="text-4xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
              </div>
              
              {/* CTA */}
              <button className="px-10 py-4 rounded-full font-semibold text-white text-lg"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, boxShadow: `0 8px 30px ${palette.primary}40` }}>
                {ctaText}
              </button>
            </div>
            
            {/* Salon name */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${palette.primary}40` }}>{salonName}</span>
            </div>
          </div>
        );

      // ============ USŁUGI ============
      case 'service-hero':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Full image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to top, ${palette.bg} 0%, ${palette.bg}cc 30%, transparent 60%)`
              }} />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}30` }}>
                <Gem className="w-3.5 h-3.5" style={{ color: palette.primary }} />
                <span className="text-[10px] font-medium tracking-wider" style={{ color: palette.primary }}>Nasza Specjalność</span>
              </div>
              
              <h2 className="text-3xl font-semibold mb-3" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{serviceName}</h2>
              <p className="mb-6 max-w-sm" style={{ color: `${palette.primary}60` }}>{subheadline}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: palette.primary }}>{newPrice}</span>
                <button className="px-6 py-3 rounded-full font-medium text-white"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}>
                  {ctaText}
                </button>
              </div>
            </div>
            
            {/* Logo/name */}
            <div className="absolute top-6 left-6">
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${palette.primary}70` }}>{salonName}</span>
            </div>
          </div>
        );

      case 'service-card':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Subtle background */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(${palette.primary} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
            
            {/* Image area */}
            <div className="absolute top-6 left-6 right-6 h-[50%] rounded-2xl overflow-hidden"
              style={{ boxShadow: `0 20px 40px ${palette.bg}` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}80, transparent 50%)` }} />
            </div>
            
            {/* Content area */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pt-4">
              <div className="text-center">
                <span className="text-[9px] tracking-[0.4em] uppercase mb-3 block" style={{ color: palette.accent }}>{salonName}</span>
                
                <div className="w-10 h-px mx-auto mb-4" style={{ background: palette.accent }} />
                
                <h2 className="text-2xl font-semibold mb-3" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{serviceName}</h2>
                <p className="text-sm mb-6" style={{ color: `${palette.primary}60` }}>{subheadline}</p>
                
                <div className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>{newPrice}</div>
                
                <button className="w-full py-4 rounded-full font-medium text-white"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}>
                  {ctaText}
                </button>
              </div>
            </div>
          </div>
        );

      case 'service-minimal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: '#fafafa' }}>
            {/* Clean layout */}
            <div className="absolute inset-8 flex flex-col">
              {/* Image */}
              <div className="flex-1 rounded-xl overflow-hidden mb-6" style={{ boxShadow: `0 10px 30px ${palette.primary}15` }}>
                <img src={main} alt="" className="w-full h-full object-cover" />
              </div>
              
              {/* Content */}
              <div className="text-center">
                <span className="text-[9px] tracking-[0.3em] uppercase mb-2 block" style={{ color: palette.primary }}>{salonName}</span>
                <h2 className="text-xl font-medium mb-2" style={{ color: '#1a1a1a', fontFamily: selectedFont.family }}>{serviceName}</h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg font-semibold" style={{ color: palette.primary }}>{newPrice}</span>
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: `${palette.primary}15`, color: palette.primary }}>
                    {ctaText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      // ============ OPINIE ============
      case 'review-luxury':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Elegant glow */}
            <div className="absolute inset-0" style={{ 
              background: `radial-gradient(ellipse at center, ${palette.primary}08 0%, transparent 60%)`
            }} />
            
            {/* Decorative frame */}
            <div className="absolute inset-6 border rounded-2xl" style={{ borderColor: `${palette.accent}20` }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: palette.accent }} />
                ))}
              </div>
              
              {/* Quote */}
              <Quote className="w-10 h-10 mb-4" style={{ color: `${palette.primary}30` }} />
              
              <p className="text-lg italic leading-relaxed mb-6" style={{ color: palette.primary, fontFamily: selectedFont.family }}>
                "{reviewText}"
              </p>
              
              <div className="w-12 h-px mb-4" style={{ background: `linear-gradient(to right, transparent, ${palette.accent}, transparent)` }} />
              
              <span className="text-sm font-medium" style={{ color: `${palette.primary}80` }}>{reviewerName}</span>
            </div>
            
            {/* Salon */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${palette.accent}60` }}>{salonName}</span>
            </div>
          </div>
        );

      case 'review-photo':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Background image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${palette.bg}, ${palette.bg}dd 50%, transparent)` }} />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: palette.accent }} />
                ))}
              </div>
              
              <p className="text-lg italic leading-relaxed mb-4" style={{ color: palette.primary, fontFamily: selectedFont.family }}>
                "{reviewText}"
              </p>
              
              <span className="text-sm font-medium" style={{ color: `${palette.primary}80` }}>— {reviewerName}</span>
            </div>
            
            {/* Header */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: palette.primary }}>{salonName}</span>
              <div className="px-3 py-1.5 rounded-full" style={{ background: `${palette.primary}20` }}>
                <span className="text-[9px] tracking-wider" style={{ color: palette.primary }}>Opinia klienta</span>
              </div>
            </div>
          </div>
        );

      // ============ STORIES ============
      case 'story-promo':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ 
                background: `linear-gradient(to bottom, ${palette.bg}60, transparent 30%, transparent 50%, ${palette.bg})` 
              }} />
            </div>
            
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: palette.primary }}>{salonName}</span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <div className="inline-block px-4 py-2 rounded-full mb-4"
                style={{ background: `${palette.primary}20`, border: `1px solid ${palette.primary}40` }}>
                <span className="text-[10px] font-bold tracking-wider" style={{ color: palette.primary }}>PROMOCJA</span>
              </div>
              
              <h2 className="text-2xl font-semibold mb-3" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{serviceName}</h2>
              
              <div className="text-5xl font-bold mb-4" style={{ color: palette.primary }}>{discount}</div>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-lg line-through" style={{ color: `${palette.primary}40` }}>{originalPrice}</span>
                <span className="text-2xl font-semibold" style={{ color: palette.primary }}>{newPrice}</span>
              </div>
              
              <button className="w-full py-4 rounded-full font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}>
                {ctaText}
              </button>
            </div>
          </div>
        );

      case 'story-cta':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ ...baseStyles, background: palette.bg }}>
            {/* Image */}
            <div className="absolute inset-x-6 top-20 bottom-52 rounded-3xl overflow-hidden"
              style={{ boxShadow: `0 20px 60px ${palette.primary}30` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
            </div>
            
            {/* Glow */}
            <div className="absolute bottom-44 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-25" style={{ background: palette.primary }} />
            
            {/* Header */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: palette.accent }}>{salonName}</span>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: palette.primary, fontFamily: selectedFont.family }}>{headline}</h2>
              <p className="text-sm mb-6" style={{ color: `${palette.primary}60` }}>{subheadline}</p>
              
              <button className="w-full py-4 rounded-full font-medium text-white flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}>
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-4 text-[10px]" style={{ color: `${palette.primary}40` }}>Przesuń w górę</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full aspect-square flex items-center justify-center" style={{ background: palette.bg }}>
            <span style={{ color: `${palette.primary}40` }}>Wybierz szablon</span>
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
        <div className="w-full lg:w-[400px] border-r border-border/50 bg-card/30 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Kreator Grafik</h1>
                <p className="text-xs text-muted-foreground">Facebook Ads dla Beauty</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-5">
              <Tabs defaultValue="templates" className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-5 bg-background/50">
                  <TabsTrigger value="templates" className="text-xs gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Szablony</span>
                  </TabsTrigger>
                  <TabsTrigger value="images" className="text-xs gap-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Zdjęcia</span>
                  </TabsTrigger>
                  <TabsTrigger value="content" className="text-xs gap-1">
                    <Type className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Treść</span>
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs gap-1">
                    <Palette className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Styl</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-5 mt-0">
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-1.5">
                    <Button
                      size="sm"
                      variant={activeCategory === 'all' ? 'default' : 'outline'}
                      onClick={() => setActiveCategory('all')}
                      className="text-xs h-7"
                    >
                      Wszystkie
                    </Button>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                      <Button
                        key={key}
                        size="sm"
                        variant={activeCategory === key ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(key as TemplateCategory)}
                        className="text-xs h-7 gap-1"
                      >
                        <cat.icon className="w-3 h-3" />
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Templates grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {filteredTemplates.map((tmpl) => {
                      const cat = CATEGORIES[tmpl.category];
                      const isSelected = selectedTemplate === tmpl.id;
                      return (
                        <button
                          key={tmpl.id}
                          onClick={() => setSelectedTemplate(tmpl.id)}
                          className={cn(
                            "relative p-3 rounded-lg border text-left transition-all",
                            isSelected 
                              ? "border-primary bg-primary/10" 
                              : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card"
                          )}
                        >
                          {tmpl.premium && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <Crown className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          <div className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center mb-2 bg-gradient-to-br",
                            cat.gradient
                          )}>
                            <cat.icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="font-medium text-xs text-foreground mb-0.5">{tmpl.name}</div>
                          <div className="text-[10px] text-muted-foreground line-clamp-1">{tmpl.description}</div>
                          <div className="mt-1.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-background/50 text-muted-foreground">
                              {tmpl.aspect}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </TabsContent>
                
                {/* Images Tab */}
                <TabsContent value="images" className="space-y-5 mt-0">
                  {currentTemplate?.category === 'metamorphosis' ? (
                    <div className="grid grid-cols-2 gap-3">
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
                  
                  <div className="border-t border-border/50 pt-5">
                    <ImageUploadBox
                      label="Logo salonu (opcjonalne)"
                      image={logoImage}
                      onUpload={handleImageUpload(setLogoImage)}
                      onClear={() => setLogoImage(null)}
                    />
                    <div className="flex items-center justify-between mt-3">
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
                      className="bg-background/50 resize-none h-16"
                    />
                  </div>
                  
                  <div className="border-t border-border/50 pt-4 space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Nazwa usługi</Label>
                      <Input 
                        value={serviceName} 
                        onChange={(e) => setServiceName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Rabat</Label>
                        <Input 
                          value={discount} 
                          onChange={(e) => setDiscount(e.target.value)}
                          className="bg-background/50 h-9"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Stara cena</Label>
                        <Input 
                          value={originalPrice} 
                          onChange={(e) => setOriginalPrice(e.target.value)}
                          className="bg-background/50 h-9"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Nowa cena</Label>
                        <Input 
                          value={newPrice} 
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="bg-background/50 h-9"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {currentTemplate?.category === 'testimonial' && (
                    <div className="border-t border-border/50 pt-4 space-y-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Treść opinii</Label>
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
                  )}
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Tekst CTA</Label>
                    <Input 
                      value={ctaText} 
                      onChange={(e) => setCtaText(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                </TabsContent>
                
                {/* Style Tab */}
                <TabsContent value="style" className="space-y-5 mt-0">
                  {/* Color palettes */}
                  <div className="space-y-3">
                    <Label className="text-xs text-muted-foreground">Paleta kolorów</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_PALETTES.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setPalette(p)}
                          className={cn(
                            "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                            palette.name === p.name ? "border-primary ring-2 ring-primary/30" : "border-transparent"
                          )}
                          style={{ background: p.bg }}
                          title={p.name}
                        >
                          <div className="w-full h-full flex flex-col">
                            <div className="flex-1" style={{ background: p.primary }} />
                            <div className="h-1/3 flex">
                              <div className="flex-1" style={{ background: p.secondary }} />
                              <div className="flex-1" style={{ background: p.accent }} />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center">{palette.name}</p>
                  </div>
                  
                  {/* Fonts */}
                  <div className="space-y-3">
                    <Label className="text-xs text-muted-foreground">Czcionka</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {FONTS.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => setSelectedFont(font)}
                          className={cn(
                            "p-3 rounded-lg border text-left transition-all",
                            selectedFont.id === font.id 
                              ? "border-primary bg-primary/10" 
                              : "border-border/50 bg-card/50 hover:border-primary/50"
                          )}
                        >
                          <span className="text-sm" style={{ fontFamily: font.family }}>{font.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Overlay opacity */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
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
          <div className="p-5 border-t border-border/50 space-y-2">
            <Button 
              className="w-full gap-2" 
              onClick={handleDownload}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generowanie...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Pobierz grafikę
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full gap-2" onClick={resetAll}>
              <RotateCcw className="w-4 h-4" />
              Resetuj
            </Button>
          </div>
        </div>
        
        {/* Right Panel - Preview */}
        <div className="flex-1 bg-zinc-950 flex flex-col min-h-0">
          {/* Preview toolbar */}
          <div className="p-3 border-b border-border/30 flex items-center justify-between bg-zinc-900/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded bg-background/30">{currentTemplate?.aspect}</span>
              <span>{currentTemplate?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7"
                onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.1))}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(previewScale * 100)}%</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7"
                onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          
          {/* Preview area */}
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
            <div 
              className="transition-transform duration-200"
              style={{ transform: `scale(${previewScale})`, transformOrigin: 'center' }}
            >
              <div 
                ref={previewRef}
                className={cn("max-w-md shadow-2xl", getAspectClass())}
                style={{ width: '400px' }}
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
