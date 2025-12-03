import { useState, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Upload,
  Download,
  Image as ImageIcon,
  Wand2,
  RotateCcw,
  Sparkles,
  Loader2,
  ArrowRightLeft,
  LayoutGrid,
  Film,
  Square,
  RectangleVertical,
  Layers,
} from 'lucide-react';

const templates = [
  { id: 'before-after-horizontal', name: 'Przed/Po - Poziomo', aspect: '16:9', icon: ArrowRightLeft, category: 'before-after' },
  { id: 'before-after-vertical', name: 'Przed/Po - Pionowo', aspect: '9:16', icon: RectangleVertical, category: 'before-after' },
  { id: 'before-after-diagonal', name: 'Przed/Po - Ukośnie', aspect: '1:1', icon: Layers, category: 'before-after' },
  { id: 'carousel-item', name: 'Karuzela Instagram', aspect: '1:1', icon: LayoutGrid, category: 'social' },
  { id: 'story', name: 'Story / Reels', aspect: '9:16', icon: Film, category: 'social' },
  { id: 'promo-square', name: 'Promocja kwadrat', aspect: '1:1', icon: Square, category: 'promo' },
  { id: 'reels-cover', name: 'Okładka Reels', aspect: '9:16', icon: Film, category: 'social' },
  { id: 'multi-image-carousel', name: 'Karuzela wielozdj.', aspect: '1:1', icon: LayoutGrid, category: 'social' },
];

const accentColors = [
  { id: 'neon-pink', name: 'Neon Pink', color: '#ff1493', tailwind: 'bg-pink-500' },
  { id: 'rose-gold', name: 'Rose Gold', color: '#b76e79', tailwind: 'bg-rose-400' },
  { id: 'purple', name: 'Fiolet', color: '#8b5cf6', tailwind: 'bg-violet-500' },
  { id: 'gold', name: 'Złoty', color: '#f59e0b', tailwind: 'bg-amber-500' },
  { id: 'teal', name: 'Turkus', color: '#14b8a6', tailwind: 'bg-teal-500' },
  { id: 'coral', name: 'Koral', color: '#ff6b6b', tailwind: 'bg-red-400' },
];

export default function GraphicsCreator() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('before-after-horizontal');
  const [accentColor, setAccentColor] = useState('neon-pink');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (type === 'before') {
        setBeforeImage(dataUrl);
      } else {
        setAfterImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const generateGraphic = async () => {
    if (!beforeImage && !afterImage) {
      toast.error('Dodaj przynajmniej jedno zdjęcie');
      return;
    }

    setGenerating(true);
    const selectedColor = accentColors.find(c => c.id === accentColor)?.color || '#ff1493';

    try {
      const { data, error } = await supabase.functions.invoke('process-graphics', {
        body: {
          beforeImage,
          afterImage,
          template: selectedTemplate,
          headline,
          subheadline,
          accentColor: selectedColor,
        },
      });

      if (error) throw error;

      if (data?.generatedImage) {
        setGeneratedImage(data.generatedImage);
        toast.success('Grafika wygenerowana przez AI!');
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Error generating graphic:', err);
      toast.error(err instanceof Error ? err.message : 'Błąd generowania grafiki');
    } finally {
      setGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `aurine-${selectedTemplate}-${Date.now()}.png`;
    link.href = generatedImage;
    link.click();
    toast.success('Grafika pobrana');
  };

  const resetAll = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setHeadline('');
    setSubheadline('');
    setGeneratedImage(null);
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
  const isBeforeAfterTemplate = selectedTemplateData?.category === 'before-after';

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Kreator Grafik
            </h1>
            <p className="text-muted-foreground text-sm">
              Twórz profesjonalne grafiki z pomocą sztucznej inteligencji
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
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-primary" />
                  Wybierz szablon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {templates.map(t => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedTemplate === t.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border/50 hover:border-primary/50 bg-card/30'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${selectedTemplate === t.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="text-xs font-medium truncate">{t.name}</div>
                        <div className="text-[10px] text-muted-foreground">{t.aspect}</div>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <Label className="text-sm mb-2 block">Kolor akcentu</Label>
                  <div className="flex flex-wrap gap-2">
                    {accentColors.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setAccentColor(c.id)}
                        className={`w-8 h-8 rounded-full border-2 transition-all shadow-lg ${
                          accentColor === c.id 
                            ? 'border-white scale-110 ring-2 ring-primary/50' 
                            : 'border-transparent hover:scale-105'
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
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Zdjęcia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isBeforeAfterTemplate ? (
                  <Tabs defaultValue="before" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted/30">
                      <TabsTrigger value="before">Przed</TabsTrigger>
                      <TabsTrigger value="after">Po</TabsTrigger>
                    </TabsList>

                    <TabsContent value="before" className="mt-4">
                      <ImageUploadArea
                        image={beforeImage}
                        onUpload={(file) => handleImageUpload('before', file)}
                        inputRef={beforeInputRef}
                        label="Zdjęcie PRZED"
                      />
                    </TabsContent>

                    <TabsContent value="after" className="mt-4">
                      <ImageUploadArea
                        image={afterImage}
                        onUpload={(file) => handleImageUpload('after', file)}
                        inputRef={afterInputRef}
                        label="Zdjęcie PO"
                      />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <ImageUploadArea
                    image={beforeImage}
                    onUpload={(file) => handleImageUpload('before', file)}
                    inputRef={beforeInputRef}
                    label="Główne zdjęcie"
                  />
                )}
              </CardContent>
            </Card>

            {/* Text Options */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
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
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <Label className="text-sm">Podtytuł</Label>
                  <Input
                    value={subheadline}
                    onChange={(e) => setSubheadline(e.target.value)}
                    placeholder="np. Salon Beauty"
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={generateGraphic}
              className="w-full bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 shadow-lg shadow-primary/25"
              disabled={generating || (!beforeImage && !afterImage)}
              size="lg"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  AI przetwarza...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generuj z AI
                </>
              )}
            </Button>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Podgląd
                </CardTitle>
                <CardDescription>
                  {generatedImage 
                    ? 'Grafika wygenerowana przez AI' 
                    : 'Dodaj zdjęcia i kliknij "Generuj z AI"'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[500px]">
                {generating ? (
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                      <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-muted-foreground mt-4">AI przetwarza Twoje zdjęcia...</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">To może potrwać do 30 sekund</p>
                  </div>
                ) : generatedImage ? (
                  <div className="relative group">
                    <img
                      src={generatedImage}
                      alt="Generated graphic"
                      className="max-w-full max-h-[600px] rounded-xl shadow-2xl shadow-primary/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-center pb-4">
                      <Button onClick={downloadImage} variant="secondary" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Pobierz
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-500/20 flex items-center justify-center">
                      <Wand2 className="w-12 h-12 text-primary/50" />
                    </div>
                    <p className="font-medium">Twoja grafika pojawi się tutaj</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                      AI przetworzy zdjęcia i stworzy profesjonalną grafikę
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface ImageUploadAreaProps {
  image: string | null;
  onUpload: (file: File) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  label: string;
}

function ImageUploadArea({ image, onUpload, inputRef, label }: ImageUploadAreaProps) {
  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
      
      {image ? (
        <div className="relative group">
          <img
            src={image}
            alt={label}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              Zmień zdjęcie
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all group"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">Kliknij aby dodać</p>
          </div>
        </button>
      )}
    </div>
  );
}
