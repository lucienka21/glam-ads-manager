import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Download, RotateCcw, Sparkles, Loader2, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type TemplateId = 'split-classic' | 'split-diagonal' | 'promo-discount' | 'promo-flash' | 'result-glow' | 'booking-cta';

interface Template {
  id: TemplateId;
  name: string;
  category: 'metamorfoza' | 'promocja' | 'efekt' | 'rezerwacja';
}

const TEMPLATES: Template[] = [
  { id: 'split-classic', name: 'Klasyczny Split', category: 'metamorfoza' },
  { id: 'split-diagonal', name: 'Ukośny Split', category: 'metamorfoza' },
  { id: 'promo-discount', name: 'Rabat', category: 'promocja' },
  { id: 'promo-flash', name: 'Flash Sale', category: 'promocja' },
  { id: 'result-glow', name: 'Efekt Glow', category: 'efekt' },
  { id: 'booking-cta', name: 'Rezerwacja', category: 'rezerwacja' },
];

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('split-classic');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [headline, setHeadline] = useState('Metamorfoza');
  const [subheadline, setSubheadline] = useState('Zobacz efekt zabiegu');
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [discount, setDiscount] = useState('-30%');
  const [cta, setCta] = useState('Zarezerwuj');
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const needsBeforeAfter = currentTemplate?.category === 'metamorfoza';

  const handleImageUpload = (setter: (val: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Maksymalny rozmiar pliku to 5MB');
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
    setCta('Zarezerwuj');
  };

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
      <Label className="text-sm font-medium">{label}</Label>
      {image ? (
        <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary/30">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button 
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full hover:bg-black transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 cursor-pointer transition-colors bg-muted/20 hover:bg-muted/40">
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">Kliknij aby dodać</span>
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      )}
    </div>
  );

  const renderTemplate = () => {
    const placeholderBefore = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop';
    const placeholderAfter = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop';
    const placeholderMain = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop';
    
    const before = beforeImage || placeholderBefore;
    const after = afterImage || placeholderAfter;
    const main = mainImage || placeholderMain;

    switch (selectedTemplate) {
      case 'split-classic':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            <div className="absolute inset-4 flex gap-2">
              <div className="flex-1 relative rounded-2xl overflow-hidden">
                <img src={before} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-white text-xs font-medium tracking-wider">PRZED</span>
                </div>
              </div>
              <div className="w-1 bg-gradient-to-b from-pink-500/0 via-pink-500 to-pink-500/0" style={{ boxShadow: '0 0 20px rgba(236,72,153,0.8)' }} />
              <div className="flex-1 relative rounded-2xl overflow-hidden ring-2 ring-pink-500/40">
                <img src={after} alt="After" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                  <span className="text-white text-xs font-bold tracking-wider">PO</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 pt-3 text-center">
              <p className="text-pink-400/60 text-[10px] tracking-[0.3em] uppercase">{salonName}</p>
              <h2 className="text-white text-xl font-bold tracking-wide">{headline}</h2>
            </div>
          </div>
        );

      case 'split-diagonal':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#000' }}>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }}>
              <img src={before} alt="Before" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}>
              <img src={after} alt="After" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-[150%] bg-gradient-to-b from-pink-500/0 via-pink-500 to-pink-500/0 rotate-[8deg]" style={{ boxShadow: '0 0 30px rgba(236,72,153,1)' }} />
            </div>
            <div className="absolute top-6 left-6 text-white/80 text-sm tracking-[0.3em]">PRZED</div>
            <div className="absolute top-6 right-6 text-pink-400 text-sm tracking-[0.3em]" style={{ textShadow: '0 0 15px rgba(236,72,153,0.8)' }}>PO</div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-pink-300/80 text-sm mt-1">{subheadline}</p>
            </div>
            <div className="absolute bottom-6 right-6 text-white/40 text-[9px] tracking-[0.2em] uppercase">{salonName}</div>
          </div>
        );

      case 'promo-discount':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a14 100%)' }}>
            <div className="absolute inset-0">
              <img src={main} alt="Promo" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="px-4 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-full mb-4">
                <span className="text-pink-400 text-[10px] tracking-[0.3em] uppercase">Promocja</span>
              </div>
              <span className="text-7xl font-black text-white">{discount}</span>
              <h2 className="text-xl font-bold text-white mt-3">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-1">{subheadline}</p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-lg" style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.4)' }}>
                {cta}
              </button>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-pink-500 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-pink-500 to-transparent" />
          </div>
        );

      case 'promo-flash':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: '#0a0a0a' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.2) 0%, transparent 70%)' }} />
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-full mb-4 shadow-lg" style={{ boxShadow: '0 0 30px rgba(234,179,8,0.4)' }}>
                <span className="text-black text-xs font-bold">⚡ FLASH SALE ⚡</span>
              </div>
              <span className="text-8xl font-black text-white" style={{ textShadow: '0 0 60px rgba(236,72,153,0.5)' }}>{discount}</span>
              <h2 className="text-xl font-bold text-white mt-2">{headline}</h2>
              <p className="text-zinc-400 text-sm mt-1">{subheadline}</p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold shadow-lg" style={{ boxShadow: '0 10px 40px rgba(234,179,8,0.4)' }}>
                {cta}
              </button>
              <div className="mt-6 flex gap-2">
                {['12', '34', '56'].map((n, i) => (
                  <div key={i} className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                    <span className="text-white font-mono font-bold text-lg">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'result-glow':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #150810 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[60%] aspect-square rounded-full overflow-hidden ring-4 ring-pink-500/40" style={{ boxShadow: '0 0 60px rgba(236,72,153,0.4)' }}>
              <img src={main} alt="Result" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-pink-300/70 text-sm mt-1">{subheadline}</p>
              <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-4">{salonName}</p>
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-pink-500/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-500/30" />
          </div>
        );

      case 'booking-cta':
        return (
          <div className="w-full aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #080808 0%, #150810 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-pink-500/15 rounded-full blur-[80px]" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[55%] aspect-square rounded-full overflow-hidden ring-4 ring-pink-500/50" style={{ boxShadow: '0 0 60px rgba(236,72,153,0.3)' }}>
              <img src={main} alt="Booking" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-2xl font-bold text-white">{headline}</h2>
              <p className="text-pink-300/70 text-sm mt-1 mb-4">{subheadline}</p>
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-bold shadow-lg" style={{ boxShadow: '0 10px 40px rgba(236,72,153,0.4)' }}>
                {cta}
              </button>
              <p className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase mt-4">{salonName}</p>
            </div>
            <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-pink-500/30" />
            <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-pink-500/30" />
          </div>
        );

      default:
        return <div className="w-full aspect-square bg-zinc-900 flex items-center justify-center text-zinc-500">Wybierz szablon</div>;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kreator Grafik</h1>
                <p className="text-sm text-muted-foreground">Twórz profesjonalne grafiki dla FB Ads</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleDownload} disabled={generating} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                Pobierz PNG
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_500px] gap-8">
            {/* Left: Controls */}
            <div className="space-y-6">
              {/* Templates */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Wybierz szablon</h3>
                <div className="grid grid-cols-3 gap-3">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={cn(
                        'p-3 rounded-xl border-2 transition-all text-left',
                        selectedTemplate === t.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      )}
                    >
                      <span className="text-sm font-medium text-foreground">{t.name}</span>
                      <span className="text-xs text-muted-foreground block mt-0.5 capitalize">{t.category}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Images */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Zdjęcia</h3>
                {needsBeforeAfter ? (
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUploadBox label="Zdjęcie PRZED" image={beforeImage} onUpload={handleImageUpload(setBeforeImage)} onClear={() => setBeforeImage(null)} />
                    <ImageUploadBox label="Zdjęcie PO" image={afterImage} onUpload={handleImageUpload(setAfterImage)} onClear={() => setAfterImage(null)} />
                  </div>
                ) : (
                  <div className="max-w-xs">
                    <ImageUploadBox label="Zdjęcie główne" image={mainImage} onUpload={handleImageUpload(setMainImage)} onClear={() => setMainImage(null)} />
                  </div>
                )}
              </Card>

              {/* Text */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Treść</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Nagłówek</Label>
                    <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Metamorfoza" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Podtytuł</Label>
                    <Input value={subheadline} onChange={(e) => setSubheadline(e.target.value)} placeholder="Zobacz efekt" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Nazwa salonu</Label>
                    <Input value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder="Beauty Studio" />
                  </div>
                  {(currentTemplate?.category === 'promocja') && (
                    <div className="space-y-2">
                      <Label className="text-sm">Rabat</Label>
                      <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="-30%" />
                    </div>
                  )}
                  {(currentTemplate?.category === 'promocja' || currentTemplate?.category === 'rezerwacja') && (
                    <div className="space-y-2">
                      <Label className="text-sm">Przycisk CTA</Label>
                      <Input value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Zarezerwuj" />
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Right: Preview */}
            <div className="lg:sticky lg:top-6 h-fit">
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Podgląd</h3>
                <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzFhMWExYSIvPgo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzFhMWExYSIvPgo8cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMjIyMjIyIi8+CjxyZWN0IHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMyMjIyMjIiLz4KPC9zdmc+')] rounded-xl p-4">
                  <div ref={previewRef} className="rounded-lg overflow-hidden shadow-2xl">
                    {renderTemplate()}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Format: 1:1 (1080×1080px) • Optymalne dla Facebook Ads
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
