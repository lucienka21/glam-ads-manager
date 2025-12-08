import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Download, 
  Upload, 
  X, 
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Wand2,
  Palette,
  Heart,
  Scissors,
  Camera,
  Gift,
  Snowflake,
  Sun,
  Flower2,
  TreePine,
  PartyPopper,
  Percent,
  RefreshCw,
  Zap,
  Star,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ====== TYPES ======
type TemplateType = 
  | 'before-after-horizontal' 
  | 'before-after-vertical' 
  | 'before-after-diagonal'
  | 'promo-square'
  | 'story'
  | 'carousel-item';

type TemplateCategory = 'metamorphosis' | 'promo' | 'seasonal' | 'story';

interface Template {
  id: TemplateType;
  name: string;
  description: string;
  category: TemplateCategory;
  aspect: '1:1' | '4:5' | '9:16';
  icon: any;
  needsBefore?: boolean;
  needsAfter?: boolean;
  seasonal?: string;
}

// ====== TEMPLATES ======
const TEMPLATES: Template[] = [
  // METAMORFOZY - Before/After
  { 
    id: 'before-after-horizontal', 
    name: 'Przed/Po Poziomo', 
    description: 'Klasyczne porównanie obok siebie',
    category: 'metamorphosis', 
    aspect: '1:1',
    icon: Sparkles,
    needsBefore: true,
    needsAfter: true,
  },
  { 
    id: 'before-after-vertical', 
    name: 'Przed/Po Pionowo', 
    description: 'Idealne na Stories i Reels',
    category: 'metamorphosis', 
    aspect: '9:16',
    icon: Camera,
    needsBefore: true,
    needsAfter: true,
  },
  { 
    id: 'before-after-diagonal', 
    name: 'Przed/Po Diagonalnie', 
    description: 'Artystyczny podział ukośny',
    category: 'metamorphosis', 
    aspect: '1:1',
    icon: Wand2,
    needsBefore: true,
    needsAfter: true,
  },
  
  // PROMOCJE
  { 
    id: 'promo-square', 
    name: 'Promocja Kwadrat', 
    description: 'Post promocyjny na feed',
    category: 'promo', 
    aspect: '1:1',
    icon: Percent,
  },
  { 
    id: 'carousel-item', 
    name: 'Karuzela', 
    description: 'Element karuzeli Instagram',
    category: 'promo', 
    aspect: '1:1',
    icon: Gift,
  },
  
  // STORIES
  { 
    id: 'story', 
    name: 'Story/Reels', 
    description: 'Format pionowy 9:16',
    category: 'story', 
    aspect: '9:16',
    icon: Camera,
  },
];

// Seasonal prompts
const SEASONAL_PROMPTS: Record<string, { label: string; icon: any; prompt: string; color: string }> = {
  christmas: { 
    label: 'Święta Bożego Narodzenia', 
    icon: TreePine, 
    prompt: 'Add Christmas themed elements like snowflakes, golden ornaments, Christmas lights, red and green accents, festive ribbons',
    color: '#27ae60'
  },
  valentines: { 
    label: 'Walentynki', 
    icon: Heart, 
    prompt: 'Add romantic Valentine\'s Day elements like hearts, roses, pink and red colors, love theme decorations',
    color: '#e74c3c'
  },
  spring: { 
    label: 'Wiosna', 
    icon: Flower2, 
    prompt: 'Add spring themed elements like flowers, butterflies, fresh green colors, pastel tones, blooming elements',
    color: '#f39c12'
  },
  summer: { 
    label: 'Lato', 
    icon: Sun, 
    prompt: 'Add summer vibes with sun elements, tropical leaves, bright warm colors, beach-inspired accents',
    color: '#f1c40f'
  },
  winter: { 
    label: 'Zima', 
    icon: Snowflake, 
    prompt: 'Add winter elements like snowflakes, frost effects, cool blue and white tones, cozy winter atmosphere',
    color: '#3498db'
  },
  newyear: { 
    label: 'Nowy Rok', 
    icon: PartyPopper, 
    prompt: 'Add New Year celebration elements like champagne, fireworks, golden confetti, glamorous party vibes',
    color: '#9b59b6'
  },
  blackfriday: { 
    label: 'Black Friday', 
    icon: Percent, 
    prompt: 'Add Black Friday sale elements with bold black and gold colors, dramatic lighting, urgency-inducing design',
    color: '#2c3e50'
  },
  womensday: { 
    label: 'Dzień Kobiet', 
    icon: Crown, 
    prompt: 'Add Women\'s Day celebration elements with elegant flowers, feminine colors, empowering design',
    color: '#e91e63'
  },
};

const COLOR_SCHEMES = [
  { id: 'pink', name: 'Różowy', color: '#ff0080' },
  { id: 'gold', name: 'Złoty', color: '#d4a574' },
  { id: 'violet', name: 'Fioletowy', color: '#9b59b6' },
  { id: 'coral', name: 'Koralowy', color: '#ff6b6b' },
  { id: 'teal', name: 'Morski', color: '#00b894' },
  { id: 'midnight', name: 'Granatowy', color: '#667eea' },
];

const CATEGORIES: Record<TemplateCategory, { label: string; icon: any }> = {
  metamorphosis: { label: 'Metamorfozy', icon: Sparkles },
  promo: { label: 'Promocje', icon: Percent },
  seasonal: { label: 'Sezonowe', icon: Gift },
  story: { label: 'Stories', icon: Camera },
};

export default function GraphicsCreator() {
  // State
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  
  const [salonName, setSalonName] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [discount, setDiscount] = useState('');
  
  const [accentColor, setAccentColor] = useState(COLOR_SCHEMES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates = TEMPLATES.filter(t => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const handleImageUpload = (type: 'before' | 'after') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Wybierz plik graficzny');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Plik jest za duży (max 10MB)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (type === 'before') {
        setBeforeImage(result);
      } else {
        setAfterImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    // Validation
    if (selectedTemplate.needsBefore && !beforeImage) {
      toast.error('Dodaj zdjęcie "Przed"');
      return;
    }
    if (selectedTemplate.needsAfter && !afterImage) {
      toast.error('Dodaj zdjęcie "Po"');
      return;
    }
    if (!selectedTemplate.needsBefore && !selectedTemplate.needsAfter && !beforeImage && !afterImage) {
      toast.error('Dodaj przynajmniej jedno zdjęcie');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImage(null);

    try {
      // Build the prompt
      let seasonalPrompt = '';
      if (selectedSeason && SEASONAL_PROMPTS[selectedSeason]) {
        seasonalPrompt = SEASONAL_PROMPTS[selectedSeason].prompt;
      }

      const payload = {
        beforeImage: beforeImage || undefined,
        afterImage: afterImage || undefined,
        template: selectedTemplate.id,
        headline: headline || (salonName ? `${salonName}` : undefined),
        subheadline: subheadline || (discount ? `${discount} zniżki!` : undefined),
        accentColor: accentColor.name.toLowerCase(),
        // Add custom and seasonal prompts to the request
        ...(seasonalPrompt && { seasonalTheme: seasonalPrompt }),
        ...(customPrompt && { customInstructions: customPrompt }),
      };

      const { data, error } = await supabase.functions.invoke('process-graphics', {
        body: payload
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.generatedImage) {
        setGeneratedImage(data.generatedImage);
        toast.success('Grafika wygenerowana!');
      } else {
        throw new Error('Nie otrzymano grafiki');
      }
    } catch (error) {
      console.error('Generation error:', error);
      const message = error instanceof Error ? error.message : 'Błąd generowania grafiki';
      setGenerationError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `${selectedTemplate.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Grafika pobrana!');
  };

  const clearImage = (type: 'before' | 'after') => {
    if (type === 'before') {
      setBeforeImage(null);
      if (beforeInputRef.current) beforeInputRef.current.value = '';
    } else {
      setAfterImage(null);
      if (afterInputRef.current) afterInputRef.current.value = '';
    }
  };

  const resetAll = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setGeneratedImage(null);
    setGenerationError(null);
    setHeadline('');
    setSubheadline('');
    setSalonName('');
    setDiscount('');
    setCustomPrompt('');
    setSelectedSeason(null);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Header */}
        <div className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Kreator Grafik AI</h1>
                  <p className="text-sm text-zinc-400">Generuj profesjonalne grafiki dla Twojego salonu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAll}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Left Panel - Controls */}
          <div className="w-[420px] border-r border-white/5 bg-black/30 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-8">
                
                {/* Templates Section */}
                <section>
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    Wybierz szablon
                  </h3>
                  
                  {/* Category filters */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        activeCategory === 'all'
                          ? "bg-pink-500 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      )}
                    >
                      Wszystkie
                    </button>
                    {Object.entries(CATEGORIES).map(([key, { label }]) => (
                      <button
                        key={key}
                        onClick={() => setActiveCategory(key as TemplateCategory)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          activeCategory === key
                            ? "bg-pink-500 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Template grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {filteredTemplates.map((template) => {
                      const Icon = template.icon;
                      const isSelected = selectedTemplate.id === template.id;
                      
                      return (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template)}
                          className={cn(
                            "p-4 rounded-xl text-left transition-all group relative overflow-hidden",
                            isSelected
                              ? "bg-gradient-to-br from-pink-500/20 to-rose-500/10 border-2 border-pink-500/50"
                              : "bg-zinc-800/50 border border-zinc-700/50 hover:border-pink-500/30 hover:bg-zinc-800"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              isSelected ? "bg-pink-500" : "bg-zinc-700"
                            )}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <Badge variant="outline" className="text-[10px] border-zinc-600 text-zinc-400">
                              {template.aspect}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-white text-sm">{template.name}</h4>
                          <p className="text-xs text-zinc-500 mt-1">{template.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Images Section */}
                <section>
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-pink-400" />
                    Zdjęcia
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Before Image */}
                    {(selectedTemplate.needsBefore || !selectedTemplate.needsAfter) && (
                      <div>
                        <Label className="text-zinc-300 text-xs mb-2 block">
                          {selectedTemplate.needsBefore ? 'Zdjęcie "Przed"' : 'Główne zdjęcie'}
                          {selectedTemplate.needsBefore && <span className="text-pink-400 ml-1">*</span>}
                        </Label>
                        <div className="relative">
                          {beforeImage ? (
                            <div className="relative rounded-xl overflow-hidden bg-zinc-800 aspect-video">
                              <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                              <button
                                onClick={() => clearImage('before')}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                              >
                                <X className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-pink-500/50 cursor-pointer transition-colors bg-zinc-800/30">
                              <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                              <span className="text-xs text-zinc-500">Kliknij lub przeciągnij</span>
                              <input
                                ref={beforeInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload('before')}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* After Image */}
                    {selectedTemplate.needsAfter && (
                      <div>
                        <Label className="text-zinc-300 text-xs mb-2 block">
                          Zdjęcie "Po" <span className="text-pink-400">*</span>
                        </Label>
                        <div className="relative">
                          {afterImage ? (
                            <div className="relative rounded-xl overflow-hidden bg-zinc-800 aspect-video">
                              <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                              <button
                                onClick={() => clearImage('after')}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                              >
                                <X className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-pink-500/50 cursor-pointer transition-colors bg-zinc-800/30">
                              <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                              <span className="text-xs text-zinc-500">Kliknij lub przeciągnij</span>
                              <input
                                ref={afterInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload('after')}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Text Content */}
                <section>
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-pink-400" />
                    Treść
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-zinc-300 text-xs mb-2 block">Nazwa salonu</Label>
                      <Input
                        value={salonName}
                        onChange={(e) => setSalonName(e.target.value)}
                        placeholder="np. Beauty Studio Anna"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-zinc-300 text-xs mb-2 block">Nagłówek</Label>
                      <Input
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="np. Twoja Metamorfoza"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-zinc-300 text-xs mb-2 block">Podtytuł</Label>
                      <Input
                        value={subheadline}
                        onChange={(e) => setSubheadline(e.target.value)}
                        placeholder="np. Profesjonalne zabiegi dla Ciebie"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-zinc-300 text-xs mb-2 block">Zniżka (opcjonalnie)</Label>
                      <Input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="np. -30%"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                </section>

                {/* Style Section */}
                <section>
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-400" />
                    Styl
                  </h3>
                  
                  {/* Colors */}
                  <div className="mb-6">
                    <Label className="text-zinc-300 text-xs mb-3 block">Kolor akcentowy</Label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_SCHEMES.map((scheme) => (
                        <button
                          key={scheme.id}
                          onClick={() => setAccentColor(scheme)}
                          className={cn(
                            "w-10 h-10 rounded-xl transition-all",
                            accentColor.id === scheme.id && "ring-2 ring-white ring-offset-2 ring-offset-zinc-900"
                          )}
                          style={{ background: scheme.color }}
                          title={scheme.name}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Seasonal Theme */}
                  <div>
                    <Label className="text-zinc-300 text-xs mb-3 block">Motyw sezonowy (opcjonalnie)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(SEASONAL_PROMPTS).map(([key, { label, icon: Icon, color }]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedSeason(selectedSeason === key ? null : key)}
                          className={cn(
                            "p-3 rounded-xl flex flex-col items-center gap-2 transition-all border-2",
                            selectedSeason === key
                              ? "ring-offset-1 ring-offset-zinc-900"
                              : "bg-zinc-800/50 hover:bg-zinc-800 border-transparent"
                          )}
                          style={{
                            background: selectedSeason === key ? `${color}20` : undefined,
                            borderColor: selectedSeason === key ? color : 'transparent',
                          }}
                          title={label}
                        >
                          <Icon className="w-5 h-5" style={{ color }} />
                          <span className="text-[10px] text-zinc-400 text-center leading-tight">{label.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Custom Prompt */}
                <section>
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-pink-400" />
                    Dodatkowe instrukcje AI
                  </h3>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="np. Dodaj efekt bokeh w tle, użyj ciepłych kolorów, dodaj logo w rogu..."
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[80px]"
                  />
                </section>

              </div>
            </ScrollArea>

            {/* Generate Button */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold text-base rounded-xl shadow-lg shadow-pink-500/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generuję...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Wygeneruj grafikę AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 bg-zinc-950 flex items-center justify-center p-8 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Preview Container */}
              <div className={cn(
                "relative rounded-2xl overflow-hidden shadow-2xl",
                selectedTemplate.aspect === '9:16' ? 'w-[320px] h-[568px]' : 
                selectedTemplate.aspect === '4:5' ? 'w-[400px] h-[500px]' : 
                'w-[500px] h-[500px]'
              )}>
                {generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="w-full h-full object-cover"
                  />
                ) : isGenerating ? (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
                      <Wand2 className="w-8 h-8 text-pink-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-zinc-400 mt-6 text-sm">AI generuje Twoją grafikę...</p>
                    <p className="text-zinc-600 text-xs mt-2">To może potrwać do 30 sekund</p>
                  </div>
                ) : generationError ? (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                      <X className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-red-400 text-center mb-2">Błąd generowania</p>
                    <p className="text-zinc-500 text-sm text-center">{generationError}</p>
                    <Button
                      onClick={handleGenerate}
                      variant="outline"
                      className="mt-6 border-zinc-700 text-zinc-300"
                    >
                      Spróbuj ponownie
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 flex items-center justify-center mb-6">
                      <ImageIcon className="w-10 h-10 text-pink-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Podgląd grafiki</h3>
                    <p className="text-zinc-500 text-sm text-center max-w-xs">
                      Wybierz szablon, dodaj zdjęcia i kliknij "Wygeneruj grafikę AI"
                    </p>
                    <div className="flex items-center gap-2 mt-6 text-zinc-600 text-xs">
                      <ChevronRight className="w-4 h-4" />
                      <span>Szablon: {selectedTemplate.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Button */}
              {generatedImage && (
                <Button
                  onClick={handleDownload}
                  className="mt-6 bg-white text-zinc-900 hover:bg-zinc-100 font-semibold px-8"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz grafikę
                </Button>
              )}

              {/* Template info */}
              <div className="mt-6 flex items-center gap-4 text-zinc-500 text-xs">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                  {selectedTemplate.name}
                </span>
                <span>•</span>
                <span>{selectedTemplate.aspect}</span>
                {selectedSeason && (
                  <>
                    <span>•</span>
                    <span>{SEASONAL_PROMPTS[selectedSeason].label}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
