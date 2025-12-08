import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { 
  Download, 
  RotateCcw, 
  Upload, 
  X, 
  Sparkles,
  Loader2,
  Camera,
  Zap,
  Star,
  Heart,
  Clock,
  ChevronRight,
  Quote,
  Award,
  Gem,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TemplateId = 
  | 'transform-split' 
  | 'transform-slider' 
  | 'transform-circle' 
  | 'transform-polaroid'
  | 'promo-bold'
  | 'promo-elegant'
  | 'promo-flash'
  | 'promo-minimal'
  | 'showcase-glow'
  | 'showcase-frame'
  | 'social-quote'
  | 'social-review'
  | 'story-offer'
  | 'story-result';

interface TemplateConfig {
  id: TemplateId;
  name: string;
  category: 'transform' | 'promo' | 'showcase' | 'social' | 'story';
  aspect: '1:1' | '4:5' | '9:16';
}

const TEMPLATES: TemplateConfig[] = [
  { id: 'transform-split', name: 'Elegancki Split', category: 'transform', aspect: '1:1' },
  { id: 'transform-slider', name: 'Slider Effect', category: 'transform', aspect: '1:1' },
  { id: 'transform-circle', name: 'Okrągłe Ramki', category: 'transform', aspect: '1:1' },
  { id: 'transform-polaroid', name: 'Polaroid Duo', category: 'transform', aspect: '1:1' },
  { id: 'promo-bold', name: 'Bold Promo', category: 'promo', aspect: '1:1' },
  { id: 'promo-elegant', name: 'Elegant Offer', category: 'promo', aspect: '1:1' },
  { id: 'promo-flash', name: 'Flash Sale', category: 'promo', aspect: '1:1' },
  { id: 'promo-minimal', name: 'Minimal Clean', category: 'promo', aspect: '1:1' },
  { id: 'showcase-glow', name: 'Glow Effect', category: 'showcase', aspect: '4:5' },
  { id: 'showcase-frame', name: 'Premium Frame', category: 'showcase', aspect: '1:1' },
  { id: 'social-quote', name: 'Quote Card', category: 'social', aspect: '1:1' },
  { id: 'social-review', name: 'Opinia Klienta', category: 'social', aspect: '1:1' },
  { id: 'story-offer', name: 'Story Promocja', category: 'story', aspect: '9:16' },
  { id: 'story-result', name: 'Story Efekt', category: 'story', aspect: '9:16' },
];

const CATEGORIES = {
  transform: { label: 'Metamorfozy', icon: Camera, color: 'from-rose-500 to-pink-600' },
  promo: { label: 'Promocje', icon: Zap, color: 'from-amber-500 to-orange-600' },
  showcase: { label: 'Prezentacje', icon: Gem, color: 'from-violet-500 to-purple-600' },
  social: { label: 'Social Media', icon: Heart, color: 'from-cyan-500 to-blue-600' },
  story: { label: 'Stories', icon: Star, color: 'from-emerald-500 to-teal-600' },
};

const COLORS = [
  { name: 'Neon Pink', bg: '#ff0080', text: '#ffffff' },
  { name: 'Coral', bg: '#ff6b6b', text: '#ffffff' },
  { name: 'Gold', bg: '#d4a574', text: '#1a1a1a' },
  { name: 'Violet', bg: '#8b5cf6', text: '#ffffff' },
  { name: 'Teal', bg: '#14b8a6', text: '#ffffff' },
  { name: 'Rose', bg: '#f472b6', text: '#ffffff' },
];

export default function GraphicsCreator() {
  const [template, setTemplate] = useState<TemplateId>('transform-split');
  const [category, setCategory] = useState<keyof typeof CATEGORIES | 'all'>('all');
  
  // Images
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [mainImg, setMainImg] = useState<string | null>(null);
  
  // Content
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [headline, setHeadline] = useState('Twoja Metamorfoza');
  const [subline, setSubline] = useState('Profesjonalne zabiegi dla Twojej urody');
  const [service, setService] = useState('Makijaż permanentny');
  const [discount, setDiscount] = useState('-30%');
  const [oldPrice, setOldPrice] = useState('599 zł');
  const [newPrice, setNewPrice] = useState('419 zł');
  const [quote, setQuote] = useState('Piękno to sztuka dbania o siebie');
  const [review, setReview] = useState('Jestem zachwycona efektami! Polecam każdej kobiecie.');
  const [reviewer, setReviewer] = useState('Anna K.');
  const [cta, setCta] = useState('Zarezerwuj wizytę');
  
  // Style
  const [color, setColor] = useState(COLORS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);
  
  const currentTemplate = TEMPLATES.find(t => t.id === template);
  const filteredTemplates = category === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === category);
  const needsBeforeAfter = currentTemplate?.category === 'transform' || template === 'story-result';

  const handleImageUpload = (setter: (v: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Maks. 10MB');
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
      const url = await toPng(previewRef.current, { quality: 1, pixelRatio: 3, cacheBust: true });
      const a = document.createElement('a');
      a.download = `${template}-${Date.now()}.png`;
      a.href = url;
      a.click();
      toast.success('Grafika pobrana!');
    } catch {
      toast.error('Błąd generowania');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetAll = () => {
    setBeforeImg(null);
    setAfterImg(null);
    setMainImg(null);
    setSalonName('Beauty Studio');
    setHeadline('Twoja Metamorfoza');
    setSubline('Profesjonalne zabiegi dla Twojej urody');
    setService('Makijaż permanentny');
    setDiscount('-30%');
    setOldPrice('599 zł');
    setNewPrice('419 zł');
    setQuote('Piękno to sztuka dbania o siebie');
    setReview('Jestem zachwycona efektami! Polecam każdej kobiecie.');
    setReviewer('Anna K.');
    setCta('Zarezerwuj wizytę');
    toast.success('Zresetowano');
  };

  const ImageUpload = ({ label, img, onUpload, onClear }: { label: string; img: string | null; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; onClear: () => void }) => (
    <div>
      <Label className="text-xs text-zinc-400 mb-2 block">{label}</Label>
      {img ? (
        <div className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10">
          <img src={img} alt={label} className="w-full h-full object-cover" />
          <button onClick={onClear} className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-zinc-700 hover:border-pink-500/50 cursor-pointer transition-all bg-zinc-900/50 hover:bg-zinc-800/50">
          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-3">
            <Upload className="w-5 h-5 text-pink-400" />
          </div>
          <span className="text-sm text-zinc-500">Kliknij aby dodać</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  );

  const getAspectClass = () => {
    if (currentTemplate?.aspect === '9:16') return 'aspect-[9/16]';
    if (currentTemplate?.aspect === '4:5') return 'aspect-[4/5]';
    return 'aspect-square';
  };

  const renderGraphic = () => {
    const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80';
    const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80';
    const placeholderMain = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80';
    
    const before = beforeImg || placeholderBefore;
    const after = afterImg || placeholderAfter;
    const main = mainImg || placeholderMain;
    const accent = color.bg;

    switch (template) {
      // ====== TRANSFORM TEMPLATES ======
      case 'transform-split':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            {/* Background glow */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-40 blur-[100px] opacity-30" style={{ background: accent }} />
            </div>
            
            {/* Images */}
            <div className="absolute inset-6 flex gap-3">
              <div className="flex-1 relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                <img src={before} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10">
                  <span className="text-white/80 text-[11px] font-semibold tracking-[0.2em]">PRZED</span>
                </div>
              </div>
              
              <div className="w-[3px] self-center h-[70%] rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`, boxShadow: `0 0 30px ${accent}` }} />
              
              <div className="flex-1 relative rounded-[2rem] overflow-hidden shadow-2xl" style={{ boxShadow: `0 0 60px ${accent}40` }}>
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full" style={{ background: accent }}>
                  <span className="text-white text-[11px] font-bold tracking-[0.2em]">PO</span>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="absolute top-3 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.4em] uppercase font-medium" style={{ color: `${accent}cc` }}>{salonName}</span>
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <h2 className="text-white text-xl font-bold">{headline}</h2>
            </div>
          </div>
        );

      case 'transform-slider':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#000' }}>
            {/* Full before image */}
            <div className="absolute inset-0">
              <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'grayscale(50%) brightness(0.7)' }} />
            </div>
            
            {/* After image (right half) */}
            <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}>
              <img src={after} alt="" className="w-full h-full object-cover" />
            </div>
            
            {/* Center slider line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1" style={{ background: accent, boxShadow: `0 0 20px ${accent}` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: accent, boxShadow: `0 0 30px ${accent}` }}>
              <ChevronRight className="w-5 h-5 text-white -ml-1" />
              <ChevronRight className="w-5 h-5 text-white -ml-3" style={{ transform: 'rotate(180deg)' }} />
            </div>
            
            {/* Labels */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur rounded-full">
              <span className="text-white/70 text-xs tracking-widest">PRZED</span>
            </div>
            <div className="absolute top-6 right-6 px-4 py-2 rounded-full" style={{ background: accent }}>
              <span className="text-white text-xs font-bold tracking-widest">PO</span>
            </div>
            
            {/* Bottom */}
            <div className="absolute bottom-0 inset-x-0 p-6 text-center" style={{ background: 'linear-gradient(to top, black, transparent)' }}>
              <h2 className="text-2xl font-bold text-white mb-1">{headline}</h2>
              <p className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>{salonName}</p>
            </div>
          </div>
        );

      case 'transform-circle':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c0c0c 0%, #1a0a10 100%)' }}>
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-white/5" />
            
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-30" style={{ background: accent }} />
            
            {/* Circle images */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 p-12">
              <div className="flex-1 aspect-square relative">
                <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img src={before} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-900/90 rounded-full border border-white/10">
                  <span className="text-white/60 text-[10px] tracking-widest">PRZED</span>
                </div>
              </div>
              
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accent, boxShadow: `0 0 30px ${accent}` }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 aspect-square relative">
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-2xl" style={{ border: `3px solid ${accent}`, boxShadow: `0 0 40px ${accent}40` }}>
                  <img src={after} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full" style={{ background: accent }}>
                  <span className="text-white text-[10px] font-bold tracking-widest">PO</span>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="absolute top-5 left-0 right-0 text-center">
              <h2 className="text-xl font-bold text-white">{headline}</h2>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${accent}90` }}>{salonName}</span>
            </div>
          </div>
        );

      case 'transform-polaroid':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#0f0f0f' }}>
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-[100px] opacity-20" style={{ background: accent }} />
            
            {/* Polaroids */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Before polaroid */}
              <div className="absolute left-[10%] rotate-[-8deg] w-[42%] bg-white p-2 pb-12 rounded shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <div className="aspect-square rounded overflow-hidden">
                  <img src={before} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.95)' }} />
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-zinc-400 text-xs font-medium">Przed</span>
                </div>
              </div>
              
              {/* After polaroid */}
              <div className="absolute right-[10%] rotate-[6deg] w-[42%] bg-white p-2 pb-12 rounded shadow-2xl z-10" style={{ boxShadow: `0 20px 60px ${accent}30` }}>
                <div className="aspect-square rounded overflow-hidden">
                  <img src={after} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="font-medium text-xs" style={{ color: accent }}>Po ✨</span>
                </div>
              </div>
            </div>
            
            {/* Overlay text */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-20">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-xs mt-2" style={{ color: accent }}>{salonName}</p>
            </div>
          </div>
        );

      // ====== PROMO TEMPLATES ======
      case 'promo-bold':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#000' }}>
            {/* Image */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            
            {/* Big accent shape */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[60px] opacity-40" style={{ background: accent }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>{salonName}</span>
              
              <div className="relative mb-2">
                <span className="absolute -top-3 right-2 text-white/30 text-base line-through">{oldPrice}</span>
                <h1 className="text-8xl font-black text-white" style={{ textShadow: `0 0 80px ${accent}` }}>{discount}</h1>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">{service}</h2>
              <p className="text-white/50 text-sm mb-6">{subline}</p>
              
              <button className="px-8 py-4 rounded-full text-white font-bold" style={{ background: accent, boxShadow: `0 0 40px ${accent}` }}>
                {cta}
              </button>
            </div>
            
            {/* Timer badge */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur rounded-full border border-white/10">
              <Clock className="w-4 h-4" style={{ color: accent }} />
              <span className="text-white/70 text-xs">Oferta ograniczona czasowo</span>
            </div>
          </div>
        );

      case 'promo-elegant':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a08 0%, #0d0c08 100%)' }}>
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2" style={{ borderColor: accent }} />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2" style={{ borderColor: accent }} />
            
            {/* Image */}
            <div className="absolute inset-12 rounded-2xl overflow-hidden">
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)` }} />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: accent }}>{salonName}</span>
              <h2 className="text-2xl font-bold text-white mb-4">{service}</h2>
              
              <div className="flex items-center gap-6 mb-4">
                <span className="text-white/40 text-lg line-through">{oldPrice}</span>
                <span className="text-3xl font-black" style={{ color: accent }}>{newPrice}</span>
              </div>
              
              <button className="px-8 py-3 rounded-full border-2 text-sm font-medium" style={{ borderColor: accent, color: accent }}>
                {cta}
              </button>
            </div>
          </div>
        );

      case 'promo-flash':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#000' }}>
            {/* Intense grid */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: `linear-gradient(${accent}40 1px, transparent 1px), linear-gradient(90deg, ${accent}40 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
            
            {/* Neon glow */}
            <div className="absolute top-0 inset-x-0 h-32 blur-[60px] opacity-50" style={{ background: accent }} />
            <div className="absolute bottom-0 inset-x-0 h-32 blur-[60px] opacity-30" style={{ background: accent }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <Zap className="w-10 h-10 mb-4" style={{ color: accent, filter: `drop-shadow(0 0 20px ${accent})` }} />
              
              <span className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: accent }}>{salonName}</span>
              <h1 className="text-[5rem] font-black text-white leading-none" style={{ textShadow: `0 0 60px ${accent}, 0 0 120px ${accent}` }}>{discount}</h1>
              
              <h2 className="text-xl font-bold text-white mt-2 mb-1">{service}</h2>
              <p className="text-white/50 text-sm mb-6">{subline}</p>
              
              <div className="flex items-center gap-4">
                <span className="text-white/40 line-through">{oldPrice}</span>
                <span className="px-6 py-3 rounded-full text-lg font-bold text-white" style={{ background: accent, boxShadow: `0 0 30px ${accent}` }}>{newPrice}</span>
              </div>
            </div>
            
            {/* Neon border */}
            <div className="absolute inset-3 border rounded-2xl pointer-events-none" style={{ borderColor: `${accent}40`, boxShadow: `inset 0 0 30px ${accent}20` }} />
          </div>
        );

      case 'promo-minimal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#fafafa' }}>
            {/* Split layout */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 relative">
                <img src={main} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fafafa]/30" />
              </div>
              
              <div className="w-1/2 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: accent }}>{salonName}</span>
                <h2 className="text-xl font-bold text-zinc-900 mb-4">{service}</h2>
                
                <div className="text-5xl font-black mb-4" style={{ color: accent }}>{discount}</div>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-zinc-400 line-through">{oldPrice}</span>
                  <span className="text-xl font-bold text-zinc-900">{newPrice}</span>
                </div>
                
                <button className="px-6 py-3 rounded-full text-white text-sm font-medium" style={{ background: accent }}>
                  {cta}
                </button>
              </div>
            </div>
            
            {/* Bottom accent */}
            <div className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: accent }} />
          </div>
        );

      // ====== SHOWCASE TEMPLATES ======
      case 'showcase-glow':
        return (
          <div className="w-full aspect-[4/5] relative overflow-hidden" style={{ background: '#000' }}>
            {/* Intense glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-48 blur-[100px] opacity-50" style={{ background: accent }} />
            
            {/* Image */}
            <div className="absolute inset-6 rounded-3xl overflow-hidden" style={{ boxShadow: `0 0 80px ${accent}50` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{headline}</h2>
              <p className="text-white/60 mb-4">{subline}</p>
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>{salonName}</span>
            </div>
          </div>
        );

      case 'showcase-frame':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            {/* Frame */}
            <div className="absolute inset-8">
              <div className="absolute inset-0 border-2 rounded-2xl" style={{ borderColor: `${accent}30` }} />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full" style={{ background: '#0a0a0a' }}>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>{salonName}</span>
              </div>
            </div>
            
            {/* Image */}
            <div className="absolute inset-12 rounded-xl overflow-hidden" style={{ boxShadow: `0 0 60px ${accent}30` }}>
              <img src={main} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-12 left-12 right-12 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-white/50 text-sm mt-2">{service}</p>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: accent }} />
            <div className="absolute top-8 right-8 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: accent }} />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: accent }} />
          </div>
        );

      // ====== SOCIAL TEMPLATES ======
      case 'social-quote':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c0c0c 0%, #1a0a12 100%)' }}>
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] opacity-20" style={{ background: accent }} />
            
            {/* Quote marks */}
            <div className="absolute top-12 left-12">
              <Quote className="w-16 h-16 opacity-20" style={{ color: accent }} />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <p className="text-2xl font-light text-white leading-relaxed italic mb-8">{quote}</p>
              
              <div className="w-20 h-px mb-6" style={{ background: accent }} />
              
              <span className="text-sm tracking-[0.3em] uppercase" style={{ color: accent }}>{salonName}</span>
            </div>
          </div>
        );

      case 'social-review':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-[80px] opacity-25" style={{ background: accent }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" style={{ color: accent }} />
                ))}
              </div>
              
              {/* Review */}
              <p className="text-xl text-white leading-relaxed mb-8 italic">"{review}"</p>
              
              {/* Reviewer */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2" style={{ borderColor: accent }}>
                  <img src={main} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{reviewer}</p>
                  <p className="text-white/50 text-sm">{service}</p>
                </div>
              </div>
              
              {/* Salon */}
              <span className="text-[10px] tracking-[0.4em] uppercase mt-8" style={{ color: `${accent}80` }}>{salonName}</span>
            </div>
          </div>
        );

      // ====== STORY TEMPLATES ======
      case 'story-offer':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: '#000' }}>
            {/* Background */}
            <div className="absolute inset-0">
              <img src={main} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.4)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            </div>
            
            {/* Top glow */}
            <div className="absolute top-0 inset-x-0 h-64 blur-[60px] opacity-40" style={{ background: accent }} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 pt-16 pb-20">
              <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: accent }}>{salonName}</span>
              
              <div className="text-center">
                <h1 className="text-7xl font-black text-white mb-2" style={{ textShadow: `0 0 60px ${accent}` }}>{discount}</h1>
                <h2 className="text-2xl font-bold text-white mb-2">{service}</h2>
                <p className="text-white/60">{subline}</p>
              </div>
              
              <div className="w-full">
                <button className="w-full py-4 rounded-full text-white font-bold text-lg" style={{ background: accent, boxShadow: `0 0 40px ${accent}` }}>
                  {cta}
                </button>
                <p className="text-center text-white/40 text-xs mt-4">Przesuń w górę</p>
              </div>
            </div>
          </div>
        );

      case 'story-result':
        return (
          <div className="w-full aspect-[9/16] relative overflow-hidden" style={{ background: '#000' }}>
            {/* Split images */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 relative">
                <img src={before} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
                <span className="absolute bottom-4 left-4 text-white/60 text-sm tracking-widest">PRZED</span>
              </div>
              
              <div className="h-1 relative z-10" style={{ background: accent, boxShadow: `0 0 20px ${accent}` }} />
              
              <div className="flex-1 relative">
                <img src={after} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/60" />
                <span className="absolute top-4 right-4 text-sm font-bold tracking-widest" style={{ color: accent }}>PO</span>
              </div>
            </div>
            
            {/* Bottom content */}
            <div className="absolute bottom-0 inset-x-0 p-8 text-center" style={{ background: 'linear-gradient(to top, black, transparent)' }}>
              <h2 className="text-2xl font-bold text-white mb-2">{headline}</h2>
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>{salonName}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="h-screen flex flex-col bg-zinc-950">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-pink-500" />
                Generator Grafik Pro
              </h1>
              <p className="text-sm text-zinc-500">Profesjonalne grafiki do Facebook Ads</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={resetAll} className="text-zinc-400 hover:text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleDownload} disabled={isGenerating} size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                Pobierz PNG
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-80 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Category Filter */}
                <div>
                  <Label className="text-xs text-zinc-500 mb-3 block">Kategoria</Label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCategory('all')}
                      className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-all", category === 'all' ? "bg-pink-500 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700")}
                    >
                      Wszystkie
                    </button>
                    {(Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, typeof CATEGORIES[keyof typeof CATEGORIES]][]).map(([key, cat]) => (
                      <button
                        key={key}
                        onClick={() => setCategory(key)}
                        className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5", category === key ? `bg-gradient-to-r ${cat.color} text-white` : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700")}
                      >
                        <cat.icon className="w-3 h-3" />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Templates */}
                <div>
                  <Label className="text-xs text-zinc-500 mb-3 block">Szablony ({filteredTemplates.length})</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredTemplates.map((t) => {
                      const cat = CATEGORIES[t.category];
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTemplate(t.id)}
                          className={cn(
                            "p-3 rounded-xl text-left transition-all border",
                            template === t.id
                              ? "bg-pink-500/20 border-pink-500"
                              : "bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
                          )}
                        >
                          <div className={cn(
                            "rounded-lg mb-2 flex items-center justify-center bg-gradient-to-br from-zinc-700/50 to-zinc-800/50",
                            t.aspect === '9:16' ? 'aspect-[9/16] h-20' : t.aspect === '4:5' ? 'aspect-[4/5] h-16' : 'aspect-square h-14'
                          )}>
                            <div className={cn("w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-r", cat.color)}>
                              <cat.icon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <p className="text-xs font-medium text-white truncate">{t.name}</p>
                          <p className="text-[10px] text-zinc-500">{t.aspect}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <Label className="text-xs text-zinc-500 mb-3 block">Zdjęcia</Label>
                  <div className="space-y-3">
                    {needsBeforeAfter ? (
                      <>
                        <ImageUpload label="Przed" img={beforeImg} onUpload={handleImageUpload(setBeforeImg)} onClear={() => setBeforeImg(null)} />
                        <ImageUpload label="Po" img={afterImg} onUpload={handleImageUpload(setAfterImg)} onClear={() => setAfterImg(null)} />
                      </>
                    ) : (
                      <ImageUpload label="Główne zdjęcie" img={mainImg} onUpload={handleImageUpload(setMainImg)} onClear={() => setMainImg(null)} />
                    )}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <Label className="text-xs text-zinc-500 mb-3 block">Kolor akcentu</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c)}
                        className={cn("aspect-square rounded-xl transition-all", color.bg === c.bg ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-90" : "hover:scale-105")}
                        style={{ background: c.bg }}
                      />
                    ))}
                  </div>
                </div>

                {/* Text fields based on template */}
                <div className="space-y-3">
                  <Label className="text-xs text-zinc-500 block">Treści</Label>
                  
                  <Input value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder="Nazwa salonu" className="bg-zinc-800/50 border-zinc-700" />
                  <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Nagłówek" className="bg-zinc-800/50 border-zinc-700" />
                  <Input value={subline} onChange={(e) => setSubline(e.target.value)} placeholder="Podtytuł" className="bg-zinc-800/50 border-zinc-700" />
                  <Input value={service} onChange={(e) => setService(e.target.value)} placeholder="Nazwa zabiegu" className="bg-zinc-800/50 border-zinc-700" />
                  
                  {currentTemplate?.category === 'promo' && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Rabat" className="bg-zinc-800/50 border-zinc-700" />
                        <Input value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="Stara cena" className="bg-zinc-800/50 border-zinc-700" />
                        <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Nowa cena" className="bg-zinc-800/50 border-zinc-700" />
                      </div>
                      <Input value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Przycisk CTA" className="bg-zinc-800/50 border-zinc-700" />
                    </>
                  )}
                  
                  {template === 'social-quote' && (
                    <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Cytat" className="bg-zinc-800/50 border-zinc-700 min-h-20" />
                  )}
                  
                  {template === 'social-review' && (
                    <>
                      <Textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Opinia" className="bg-zinc-800/50 border-zinc-700 min-h-20" />
                      <Input value={reviewer} onChange={(e) => setReviewer(e.target.value)} placeholder="Imię klienta" className="bg-zinc-800/50 border-zinc-700" />
                    </>
                  )}
                  
                  {currentTemplate?.category === 'story' && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Rabat" className="bg-zinc-800/50 border-zinc-700" />
                        <Input value={cta} onChange={(e) => setCta(e.target.value)} placeholder="CTA" className="bg-zinc-800/50 border-zinc-700" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ScrollArea>
          </aside>

          {/* Preview */}
          <main className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8 overflow-auto">
            <div className="relative">
              <div 
                ref={previewRef}
                className={cn("w-[400px] shadow-2xl rounded-xl overflow-hidden", getAspectClass())}
                style={{ boxShadow: `0 0 100px ${color.bg}30, 0 25px 50px rgba(0,0,0,0.5)` }}
              >
                {renderGraphic()}
              </div>
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-500 text-xs">
                <span className="px-2 py-1 rounded bg-zinc-800">{currentTemplate?.name}</span>
                <span>•</span>
                <span>{currentTemplate?.aspect}</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
