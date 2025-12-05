import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, RotateCcw, Sparkles, Loader2, Copy, Image as ImageIcon, Type, Palette } from 'lucide-react';
import { TemplateGallery, TEMPLATES, TEMPLATE_CATEGORIES, type TemplateVariant, type TemplateCategory } from '@/components/graphics/TemplateGallery';
import { ImageUploader } from '@/components/graphics/ImageUploader';
import { MetamorfozaTemplate } from '@/components/graphics/templates/MetamorfozaTemplate';
import { PromoTemplate } from '@/components/graphics/templates/PromoTemplate';
import { OfferTemplate } from '@/components/graphics/templates/OfferTemplate';
import { EffectTemplate } from '@/components/graphics/templates/EffectTemplate';
import { BookingTemplate } from '@/components/graphics/templates/BookingTemplate';

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateVariant>('meta-glamour');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  
  // Images
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  // Text fields
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [salonName, setSalonName] = useState('');
  const [discountText, setDiscountText] = useState('-30%');
  const [ctaText, setCtaText] = useState('Zarezerwuj teraz');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [phone, setPhone] = useState('');
  const [urgencyText, setUrgencyText] = useState('');
  
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const currentCategory = currentTemplate?.category || 'metamorfoza';

  const handleDownload = async () => {
    if (!previewRef.current) return;
    
    setGenerating(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `beauty-graphic-${selectedTemplate}-${Date.now()}.png`;
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

  const handleCopyToClipboard = async () => {
    if (!previewRef.current) return;
    
    setGenerating(true);
    try {
      const dataUrl = await toPng(previewRef.current, { quality: 1, pixelRatio: 3 });
      const blob = await fetch(dataUrl).then(r => r.blob());
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      toast.success('Skopiowano do schowka!');
    } catch (err) {
      toast.error('Nie udało się skopiować');
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setMainImage(null);
    setHeadline('');
    setSubheadline('');
    setSalonName('');
    setDiscountText('-30%');
    setCtaText('Zarezerwuj teraz');
    setPrice('');
    setOldPrice('');
    setFeatures('');
    setServiceName('');
    setPhone('');
    setUrgencyText('');
  };

  const renderPreview = () => {
    if (currentCategory === 'metamorfoza') {
      return (
        <MetamorfozaTemplate
          variant={selectedTemplate}
          beforeImage={beforeImage}
          afterImage={afterImage}
          headline={headline}
          subheadline={subheadline}
          salonName={salonName}
        />
      );
    }

    if (currentCategory === 'promocja') {
      return (
        <PromoTemplate
          variant={selectedTemplate}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
          discountText={discountText}
          ctaText={ctaText}
          salonName={salonName}
        />
      );
    }

    if (currentCategory === 'oferta') {
      return (
        <OfferTemplate
          variant={selectedTemplate}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
          price={price}
          oldPrice={oldPrice}
          features={features}
          ctaText={ctaText}
          salonName={salonName}
        />
      );
    }

    if (currentCategory === 'efekt') {
      return (
        <EffectTemplate
          variant={selectedTemplate}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
          serviceName={serviceName}
          salonName={salonName}
        />
      );
    }

    if (currentCategory === 'rezerwacja') {
      return (
        <BookingTemplate
          variant={selectedTemplate}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
          ctaText={ctaText}
          urgencyText={urgencyText}
          salonName={salonName}
          phone={phone}
        />
      );
    }

    return null;
  };

  const renderImageUploaders = () => {
    if (currentCategory === 'metamorfoza') {
      return (
        <div className="space-y-3">
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
      );
    }

    return (
      <ImageUploader
        label="Zdjęcie"
        image={mainImage}
        onImageChange={setMainImage}
      />
    );
  };

  const renderTextFields = () => {
    return (
      <div className="space-y-3">
        <div>
          <Label className="text-xs text-muted-foreground">Nagłówek</Label>
          <Input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="np. Metamorfoza"
            className="mt-1 h-9"
          />
        </div>
        
        <div>
          <Label className="text-xs text-muted-foreground">Podtytuł</Label>
          <Input
            value={subheadline}
            onChange={(e) => setSubheadline(e.target.value)}
            placeholder="np. Zobacz efekt zabiegu"
            className="mt-1 h-9"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Nazwa salonu</Label>
          <Input
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            placeholder="np. Beauty Studio"
            className="mt-1 h-9"
          />
        </div>

        {(currentCategory === 'promocja') && (
          <div>
            <Label className="text-xs text-muted-foreground">Rabat</Label>
            <Input
              value={discountText}
              onChange={(e) => setDiscountText(e.target.value)}
              placeholder="np. -50%"
              className="mt-1 h-9"
            />
          </div>
        )}

        {(currentCategory === 'oferta') && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Cena</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="np. 299 zł"
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Stara cena</Label>
                <Input
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  placeholder="np. 499 zł"
                  className="mt-1 h-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Lista korzyści (każda w nowej linii)</Label>
              <Textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Zabieg 1&#10;Zabieg 2&#10;Zabieg 3"
                className="mt-1 min-h-[80px]"
              />
            </div>
          </>
        )}

        {(currentCategory === 'efekt') && (
          <div>
            <Label className="text-xs text-muted-foreground">Nazwa usługi</Label>
            <Input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="np. Laminacja brwi"
              className="mt-1 h-9"
            />
          </div>
        )}

        {(currentCategory === 'rezerwacja') && (
          <>
            <div>
              <Label className="text-xs text-muted-foreground">Telefon</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="np. +48 123 456 789"
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Tekst pilności</Label>
              <Input
                value={urgencyText}
                onChange={(e) => setUrgencyText(e.target.value)}
                placeholder="np. Ostatnie 3 miejsca!"
                className="mt-1 h-9"
              />
            </div>
          </>
        )}

        {(currentCategory === 'promocja' || currentCategory === 'oferta' || currentCategory === 'rezerwacja') && (
          <div>
            <Label className="text-xs text-muted-foreground">Przycisk CTA</Label>
            <Input
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="np. Zarezerwuj teraz"
              className="mt-1 h-9"
            />
          </div>
        )}
      </div>
    );
  };

  const getPreviewContainerClass = () => {
    if (!currentTemplate) return 'max-w-md';
    if (currentTemplate.aspectRatio === '9:16') return 'max-w-[280px]';
    if (currentTemplate.aspectRatio === '16:9') return 'max-w-2xl';
    return 'max-w-md';
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Compact Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Kreator Grafik</h1>
                <p className="text-xs text-muted-foreground">{TEMPLATES.length} szablonów dla FB Ads Beauty</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard} disabled={generating}>
                <Copy className="w-4 h-4 mr-1" />
                Kopiuj
              </Button>
              <Button size="sm" onClick={handleDownload} disabled={generating} className="bg-pink-500 hover:bg-pink-600">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 mr-1" />}
                Pobierz PNG
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Controls */}
          <div className="w-[340px] flex-shrink-0 border-r border-border/50 bg-muted/20">
            <Tabs defaultValue="templates" className="h-full flex flex-col">
              <TabsList className="flex-shrink-0 mx-3 mt-3 grid grid-cols-3 h-9">
                <TabsTrigger value="templates" className="text-xs gap-1">
                  <Palette className="w-3 h-3" /> Szablony
                </TabsTrigger>
                <TabsTrigger value="images" className="text-xs gap-1">
                  <ImageIcon className="w-3 h-3" /> Zdjęcia
                </TabsTrigger>
                <TabsTrigger value="text" className="text-xs gap-1">
                  <Type className="w-3 h-3" /> Tekst
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="templates" className="h-full m-0 p-3">
                  <ScrollArea className="h-full">
                    <TemplateGallery
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="images" className="h-full m-0 p-3">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-pink-500" />
                          {currentCategory === 'metamorfoza' ? 'Zdjęcia przed/po' : 'Zdjęcie główne'}
                        </h3>
                        {renderImageUploaders()}
                      </div>
                      
                      {currentTemplate && (
                        <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                          <p className="text-xs text-pink-400">
                            <span className="font-medium">{currentTemplate.name}</span>
                            <span className="text-pink-400/60"> • {currentTemplate.aspectRatio}</span>
                          </p>
                          <p className="text-xs text-pink-400/60 mt-0.5">{currentTemplate.description}</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="text" className="h-full m-0 p-3">
                  <ScrollArea className="h-full">
                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Type className="w-4 h-4 text-pink-500" />
                        Treść grafiki
                      </h3>
                      {renderTextFields()}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 flex items-center justify-center p-6 bg-[#1a1a1a] overflow-auto">
            <div className="relative">
              {/* Checkerboard background for transparency */}
              <div className="absolute inset-0 rounded-xl overflow-hidden" style={{
                backgroundImage: 'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }} />
              
              <div 
                ref={previewRef}
                className={`relative ${getPreviewContainerClass()} shadow-2xl rounded-xl overflow-hidden`}
              >
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
