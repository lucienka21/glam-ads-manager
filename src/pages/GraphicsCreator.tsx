import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import { TemplateGallery, TEMPLATES, type TemplateVariant } from '@/components/graphics/TemplateGallery';
import { ImageUploader } from '@/components/graphics/ImageUploader';
import { BeforeAfterTemplate } from '@/components/graphics/templates/BeforeAfterTemplate';

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateVariant>('elegant-split');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [generating, setGenerating] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    
    setGenerating(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `grafika-${selectedTemplate}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Grafika pobrana!');
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Błąd podczas generowania grafiki');
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setHeadline('');
    setSubheadline('');
  };

  const selectedTemplateData = TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Kreator Grafik
            </h1>
            <p className="text-muted-foreground text-sm">
              Wybierz szablon i dodaj zdjęcia przed/po
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={handleDownload}
              disabled={generating}
              className="bg-primary hover:bg-primary/90"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Pobierz
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left panel - Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/30">
                <TabsTrigger value="templates">Szablony</TabsTrigger>
                <TabsTrigger value="images">Zdjęcia</TabsTrigger>
                <TabsTrigger value="text">Tekst</TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="mt-4">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Wybierz szablon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TemplateGallery
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="mt-4">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Dodaj zdjęcia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <ImageUploader
                        label="Zdjęcie PRZED"
                        image={beforeImage}
                        onImageChange={setBeforeImage}
                      />
                      <ImageUploader
                        label="Zdjęcie PO"
                        image={afterImage}
                        onImageChange={setAfterImage}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="text" className="mt-4">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Tekst (opcjonalnie)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm">Nagłówek</Label>
                      <Input
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="np. Metamorfoza"
                        className="bg-background/50 border-border/50 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Podtytuł</Label>
                      <Input
                        value={subheadline}
                        onChange={(e) => setSubheadline(e.target.value)}
                        placeholder="np. Studio Beauty"
                        className="bg-background/50 border-border/50 mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Template info */}
            {selectedTemplateData && (
              <Card className="bg-gradient-to-br from-primary/10 to-pink-500/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{selectedTemplateData.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedTemplateData.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right panel - Preview */}
          <div className="lg:col-span-3">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Podgląd
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div 
                  ref={previewRef}
                  className="w-full max-w-lg shadow-2xl shadow-black/20 rounded-xl overflow-hidden"
                >
                  <BeforeAfterTemplate
                    variant={selectedTemplate}
                    beforeImage={beforeImage}
                    afterImage={afterImage}
                    headline={headline}
                    subheadline={subheadline}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
