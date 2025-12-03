import { useState, useRef, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import {
  Upload,
  Download,
  Image as ImageIcon,
  Wand2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  SunMedium,
  Contrast,
  Palette,
  Sparkles,
  Loader2,
  ArrowRightLeft,
} from 'lucide-react';

interface ImageState {
  file: File | null;
  preview: string | null;
  brightness: number;
  contrast: number;
  saturation: number;
}

const templates = [
  { id: 'before-after-horizontal', name: 'Przed/Po - Poziomo', aspect: '16:9' },
  { id: 'before-after-vertical', name: 'Przed/Po - Pionowo', aspect: '9:16' },
  { id: 'before-after-diagonal', name: 'Przed/Po - Ukośnie', aspect: '1:1' },
  { id: 'single-promo', name: 'Promocja - Pojedyncze', aspect: '1:1' },
  { id: 'carousel-item', name: 'Element karuzeli', aspect: '1:1' },
  { id: 'story', name: 'Story/Reels', aspect: '9:16' },
];

const overlayColors = [
  { id: 'pink', name: 'Różowy', color: '#ec4899' },
  { id: 'gold', name: 'Złoty', color: '#f59e0b' },
  { id: 'purple', name: 'Fioletowy', color: '#8b5cf6' },
  { id: 'teal', name: 'Turkusowy', color: '#14b8a6' },
  { id: 'rose', name: 'Rose', color: '#fb7185' },
];

export default function GraphicsCreator() {
  const [beforeImage, setBeforeImage] = useState<ImageState>({
    file: null,
    preview: null,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  
  const [afterImage, setAfterImage] = useState<ImageState>({
    file: null,
    preview: null,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  const [selectedTemplate, setSelectedTemplate] = useState('before-after-horizontal');
  const [overlayColor, setOverlayColor] = useState('pink');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      if (type === 'before') {
        setBeforeImage(prev => ({ ...prev, file, preview }));
      } else {
        setAfterImage(prev => ({ ...prev, file, preview }));
      }
    };
    reader.readAsDataURL(file);
  };

  const updateImageSettings = (type: 'before' | 'after', key: keyof ImageState, value: number) => {
    if (type === 'before') {
      setBeforeImage(prev => ({ ...prev, [key]: value }));
    } else {
      setAfterImage(prev => ({ ...prev, [key]: value }));
    }
  };

  const getImageStyle = (state: ImageState) => ({
    filter: `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`,
  });

  const generateGraphic = useCallback(async () => {
    if (!beforeImage.preview && !afterImage.preview) {
      toast.error('Dodaj przynajmniej jedno zdjęcie');
      return;
    }

    setGenerating(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not found');

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Cannot get canvas context');

      const template = templates.find(t => t.id === selectedTemplate);
      const color = overlayColors.find(c => c.id === overlayColor)?.color || '#ec4899';

      // Set canvas size based on template
      let width = 1080;
      let height = 1080;
      if (template?.aspect === '16:9') {
        width = 1920;
        height = 1080;
      } else if (template?.aspect === '9:16') {
        width = 1080;
        height = 1920;
      }

      canvas.width = width;
      canvas.height = height;

      // Fill background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Load and draw images
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      const applyFilters = (imgState: ImageState) => {
        ctx.filter = `brightness(${imgState.brightness}%) contrast(${imgState.contrast}%) saturate(${imgState.saturation}%)`;
      };

      // Draw based on template
      if (selectedTemplate.includes('before-after')) {
        if (selectedTemplate === 'before-after-horizontal') {
          // Side by side
          if (beforeImage.preview) {
            const img = await loadImage(beforeImage.preview);
            applyFilters(beforeImage);
            ctx.drawImage(img, 0, 0, width / 2 - 5, height);
          }
          if (afterImage.preview) {
            const img = await loadImage(afterImage.preview);
            applyFilters(afterImage);
            ctx.drawImage(img, width / 2 + 5, 0, width / 2 - 5, height);
          }
          
          // Divider
          ctx.filter = 'none';
          ctx.fillStyle = color;
          ctx.fillRect(width / 2 - 5, 0, 10, height);

          // Labels
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(20, height - 80, 150, 50);
          ctx.fillRect(width / 2 + 25, height - 80, 150, 50);
          
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 28px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('PRZED', 95, height - 45);
          ctx.fillText('PO', width / 2 + 100, height - 45);

        } else if (selectedTemplate === 'before-after-vertical') {
          // Top and bottom
          if (beforeImage.preview) {
            const img = await loadImage(beforeImage.preview);
            applyFilters(beforeImage);
            ctx.drawImage(img, 0, 0, width, height / 2 - 5);
          }
          if (afterImage.preview) {
            const img = await loadImage(afterImage.preview);
            applyFilters(afterImage);
            ctx.drawImage(img, 0, height / 2 + 5, width, height / 2 - 5);
          }

          // Divider
          ctx.filter = 'none';
          ctx.fillStyle = color;
          ctx.fillRect(0, height / 2 - 5, width, 10);

          // Labels
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(width / 2 - 75, 20, 150, 50);
          ctx.fillRect(width / 2 - 75, height / 2 + 25, 150, 50);
          
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 28px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('PRZED', width / 2, 55);
          ctx.fillText('PO', width / 2, height / 2 + 60);

        } else if (selectedTemplate === 'before-after-diagonal') {
          // Diagonal split
          if (beforeImage.preview) {
            const img = await loadImage(beforeImage.preview);
            applyFilters(beforeImage);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(width, 0);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, 0, 0, width, height);
            ctx.restore();
          }
          if (afterImage.preview) {
            const img = await loadImage(afterImage.preview);
            applyFilters(afterImage);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(width, 0);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, 0, 0, width, height);
            ctx.restore();
          }

          // Diagonal line
          ctx.filter = 'none';
          ctx.strokeStyle = color;
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(width + 4, -4);
          ctx.lineTo(-4, height + 4);
          ctx.stroke();

          // Labels
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(20, 20, 150, 50);
          ctx.fillRect(width - 170, height - 70, 150, 50);
          
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 28px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('PRZED', 95, 55);
          ctx.fillText('PO', width - 95, height - 35);
        }
      } else {
        // Single image templates
        const imgState = beforeImage.preview ? beforeImage : afterImage;
        if (imgState.preview) {
          const img = await loadImage(imgState.preview);
          applyFilters(imgState);
          ctx.drawImage(img, 0, 0, width, height);
        }
      }

      // Add headline if provided
      ctx.filter = 'none';
      if (headline) {
        const padding = 40;
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(padding, padding, width - padding * 2, 100);
        
        // Accent bar
        ctx.fillStyle = color;
        ctx.fillRect(padding, padding, 8, 100);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 42px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(headline.toUpperCase(), padding + 30, padding + 60);
        
        if (subheadline) {
          ctx.font = '24px Inter, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.fillText(subheadline, padding + 30, padding + 90);
        }
      }

      // Add watermark/logo area
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(width - 200, height - 60, 180, 40);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AURINE', width - 110, height - 32);

      // Export
      const dataUrl = canvas.toDataURL('image/png', 1);
      setGeneratedImage(dataUrl);
      toast.success('Grafika wygenerowana!');

    } catch (err) {
      console.error('Error generating graphic:', err);
      toast.error('Błąd generowania grafiki');
    } finally {
      setGenerating(false);
    }
  }, [beforeImage, afterImage, selectedTemplate, overlayColor, headline, subheadline]);

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `aurine-${selectedTemplate}-${Date.now()}.png`;
    link.href = generatedImage;
    link.click();
    toast.success('Grafika pobrana');
  };

  const resetAll = () => {
    setBeforeImage({ file: null, preview: null, brightness: 100, contrast: 100, saturation: 100 });
    setAfterImage({ file: null, preview: null, brightness: 100, contrast: 100, saturation: 100 });
    setHeadline('');
    setSubheadline('');
    setGeneratedImage(null);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Palette className="w-6 h-6 text-primary" />
              Kreator Grafik
            </h1>
            <p className="text-muted-foreground text-sm">
              Twórz profesjonalne grafiki przed/po i reklamy
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetAll}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            {generatedImage && (
              <Button onClick={downloadImage} className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Pobierz
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Template Selection */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Szablon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="form-input-elegant">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(t => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name} ({t.aspect})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div>
                  <Label className="text-sm">Kolor akcentu</Label>
                  <div className="flex gap-2 mt-2">
                    {overlayColors.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setOverlayColor(c.id)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          overlayColor === c.id ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Uploads */}
            <Tabs defaultValue="before" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/30">
                <TabsTrigger value="before">Przed</TabsTrigger>
                <TabsTrigger value="after">Po</TabsTrigger>
              </TabsList>

              {['before', 'after'].map((type) => {
                const state = type === 'before' ? beforeImage : afterImage;
                const inputRef = type === 'before' ? beforeInputRef : afterInputRef;
                
                return (
                  <TabsContent key={type} value={type} className="mt-4 space-y-4">
                    <Card className="bg-card/50 border-border/50">
                      <CardContent className="pt-4 space-y-4">
                        <input
                          ref={inputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(type as 'before' | 'after', file);
                          }}
                        />
                        
                        {state.preview ? (
                          <div className="relative">
                            <img
                              src={state.preview}
                              alt={type}
                              className="w-full h-40 object-cover rounded-lg"
                              style={getImageStyle(state)}
                            />
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-2 right-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Zmień
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => inputRef.current?.click()}
                            className="w-full h-40 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                          >
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Kliknij aby dodać zdjęcie
                            </span>
                          </button>
                        )}

                        {state.preview && (
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <Label className="text-xs flex items-center gap-1">
                                  <SunMedium className="w-3 h-3" /> Jasność
                                </Label>
                                <span className="text-xs text-muted-foreground">{state.brightness}%</span>
                              </div>
                              <Slider
                                value={[state.brightness]}
                                onValueChange={([v]) => updateImageSettings(type as 'before' | 'after', 'brightness', v)}
                                min={50}
                                max={150}
                                step={1}
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <Label className="text-xs flex items-center gap-1">
                                  <Contrast className="w-3 h-3" /> Kontrast
                                </Label>
                                <span className="text-xs text-muted-foreground">{state.contrast}%</span>
                              </div>
                              <Slider
                                value={[state.contrast]}
                                onValueChange={([v]) => updateImageSettings(type as 'before' | 'after', 'contrast', v)}
                                min={50}
                                max={150}
                                step={1}
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <Label className="text-xs flex items-center gap-1">
                                  <Palette className="w-3 h-3" /> Nasycenie
                                </Label>
                                <span className="text-xs text-muted-foreground">{state.saturation}%</span>
                              </div>
                              <Slider
                                value={[state.saturation]}
                                onValueChange={([v]) => updateImageSettings(type as 'before' | 'after', 'saturation', v)}
                                min={0}
                                max={200}
                                step={1}
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>

            {/* Text Options */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tekst (opcjonalnie)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm">Nagłówek</Label>
                  <Input
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="np. Metamorfoza"
                    className="form-input-elegant"
                  />
                </div>
                <div>
                  <Label className="text-sm">Podtytuł</Label>
                  <Input
                    value={subheadline}
                    onChange={(e) => setSubheadline(e.target.value)}
                    placeholder="np. Salon Beauty"
                    className="form-input-elegant"
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={generateGraphic}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={generating || (!beforeImage.preview && !afterImage.preview)}
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generowanie...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generuj grafikę
                </>
              )}
            </Button>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Podgląd
                </CardTitle>
                <CardDescription>
                  {generatedImage ? 'Wygenerowana grafika' : 'Dodaj zdjęcia i kliknij "Generuj grafikę"'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[400px]">
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated graphic"
                    className="max-w-full max-h-[600px] rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ArrowRightLeft className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Podgląd grafiki pojawi się tutaj</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hidden canvas for generation */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
