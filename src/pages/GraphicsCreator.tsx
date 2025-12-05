import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, RotateCcw, Sparkles, Loader2, Copy, Image as ImageIcon, Type, Wand2, Check, ArrowRight } from 'lucide-react';
import { TemplateGallery, TEMPLATES, type TemplateVariant, type TemplateCategory } from '@/components/graphics/TemplateGallery';
import { ImageUploader } from '@/components/graphics/ImageUploader';
import { MetamorfozaTemplate } from '@/components/graphics/templates/MetamorfozaTemplate';
import { PromoTemplate } from '@/components/graphics/templates/PromoTemplate';
import { OfferTemplate } from '@/components/graphics/templates/OfferTemplate';
import { EffectTemplate } from '@/components/graphics/templates/EffectTemplate';
import { BookingTemplate } from '@/components/graphics/templates/BookingTemplate';
import { cn } from '@/lib/utils';

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateVariant>('meta-glamour');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  
  // Images
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  // Text fields
  const [headline, setHeadline] = useState('Metamorfoza');
  const [subheadline, setSubheadline] = useState('Zobacz efekt zabiegu');
  const [salonName, setSalonName] = useState('Beauty Studio');
  const [discountText, setDiscountText] = useState('-30%');
  const [ctaText, setCtaText] = useState('Zarezerwuj teraz');
  const [price, setPrice] = useState('299 zł');
  const [oldPrice, setOldPrice] = useState('499 zł');
  const [features, setFeatures] = useState('Zabieg premium\nDługotrwały efekt\nNaturalny wygląd');
  const [serviceName, setServiceName] = useState('Laminacja brwi');
  const [phone, setPhone] = useState('+48 123 456 789');
  const [urgencyText, setUrgencyText] = useState('Ostatnie 3 miejsca!');
  
  const [generating, setGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState<'template' | 'content' | 'preview'>('template');
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
      toast.success('Grafika pobrana pomyślnie!');
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
    setHeadline('Metamorfoza');
    setSubheadline('Zobacz efekt zabiegu');
    setSalonName('Beauty Studio');
    setDiscountText('-30%');
    setCtaText('Zarezerwuj teraz');
    setPrice('299 zł');
    setOldPrice('499 zł');
    setFeatures('Zabieg premium\nDługotrwały efekt\nNaturalny wygląd');
    setServiceName('Laminacja brwi');
    setPhone('+48 123 456 789');
    setUrgencyText('Ostatnie 3 miejsca!');
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
      );
    }

    return (
      <ImageUploader
        label="Zdjęcie główne"
        image={mainImage}
        onImageChange={setMainImage}
        className="max-w-sm mx-auto"
      />
    );
  };

  const renderTextFields = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground font-medium">Nagłówek</Label>
          <Input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="np. Metamorfoza"
            className="h-10"
          />
        </div>
        
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground font-medium">Podtytuł</Label>
          <Input
            value={subheadline}
            onChange={(e) => setSubheadline(e.target.value)}
            placeholder="np. Zobacz efekt zabiegu"
            className="h-10"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground font-medium">Nazwa salonu</Label>
          <Input
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            placeholder="np. Beauty Studio"
            className="h-10"
          />
        </div>

        {currentCategory === 'promocja' && (
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground font-medium">Rabat</Label>
            <Input
              value={discountText}
              onChange={(e) => setDiscountText(e.target.value)}
              placeholder="np. -50%"
              className="h-10"
            />
          </div>
        )}

        {currentCategory === 'oferta' && (
          <>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground font-medium">Cena</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="np. 299 zł"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground font-medium">Stara cena</Label>
              <Input
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="np. 499 zł"
                className="h-10"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs text-muted-foreground font-medium">Lista korzyści (każda w nowej linii)</Label>
              <Textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Zabieg 1&#10;Zabieg 2&#10;Zabieg 3"
                className="min-h-[80px]"
              />
            </div>
          </>
        )}

        {currentCategory === 'efekt' && (
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground font-medium">Nazwa usługi</Label>
            <Input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="np. Laminacja brwi"
              className="h-10"
            />
          </div>
        )}

        {currentCategory === 'rezerwacja' && (
          <>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground font-medium">Telefon</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="np. +48 123 456 789"
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground font-medium">Tekst pilności</Label>
              <Input
                value={urgencyText}
                onChange={(e) => setUrgencyText(e.target.value)}
                placeholder="np. Ostatnie 3 miejsca!"
                className="h-10"
              />
            </div>
          </>
        )}

        {(currentCategory === 'promocja' || currentCategory === 'oferta' || currentCategory === 'rezerwacja') && (
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground font-medium">Przycisk CTA</Label>
            <Input
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="np. Zarezerwuj teraz"
              className="h-10"
            />
          </div>
        )}
      </div>
    );
  };

  const getPreviewDimensions = () => {
    if (!currentTemplate) return { width: 400, height: 400 };
    
    switch (currentTemplate.aspectRatio) {
      case '9:16': return { width: 270, height: 480 };
      case '16:9': return { width: 640, height: 360 };
      case '4:5': return { width: 400, height: 500 };
      default: return { width: 400, height: 400 };
    }
  };

  const dimensions = getPreviewDimensions();

  const steps = [
    { id: 'template', label: 'Szablon', icon: Wand2 },
    { id: 'content', label: 'Treść', icon: Type },
    { id: 'preview', label: 'Podgląd', icon: ImageIcon },
  ] as const;

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Kreator Grafik</h1>
                  <p className="text-sm text-muted-foreground">{TEMPLATES.length} profesjonalnych szablonów dla FB Ads</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyToClipboard} disabled={generating}>
                  <Copy className="w-4 h-4 mr-2" />
                  Kopiuj
                </Button>
                <Button size="sm" onClick={handleDownload} disabled={generating} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                  Pobierz PNG
                </Button>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mt-4">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeStep === step.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <step.icon className="w-4 h-4" />
                  {step.label}
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 ml-1 opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Left Panel - Controls */}
          <div className="w-[400px] flex-shrink-0 border-r border-border/50 bg-muted/10 min-h-[calc(100vh-140px)]">
            <ScrollArea className="h-[calc(100vh-140px)]">
              <div className="p-6 space-y-6">
                {/* Step 1: Templates */}
                {activeStep === 'template' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary font-bold">1</span>
                      </div>
                      Wybierz szablon
                    </div>
                    <TemplateGallery
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={(t) => {
                        setSelectedTemplate(t);
                        // Auto advance to next step
                        setTimeout(() => setActiveStep('content'), 200);
                      }}
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />
                    
                    {currentTemplate && (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
                        <p className="text-sm font-medium text-foreground">{currentTemplate.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{currentTemplate.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded-full">
                            {currentTemplate.aspectRatio}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                            {currentTemplate.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Content */}
                {activeStep === 'content' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary font-bold">2</span>
                      </div>
                      Dodaj treść
                    </div>

                    {/* Images Section */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-pink-500" />
                        {currentCategory === 'metamorfoza' ? 'Zdjęcia przed/po' : 'Zdjęcie'}
                      </h3>
                      {renderImageUploaders()}
                    </div>

                    {/* Text Section */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Type className="w-4 h-4 text-pink-500" />
                        Treść grafiki
                      </h3>
                      {renderTextFields()}
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500"
                      onClick={() => setActiveStep('preview')}
                    >
                      Przejdź do podglądu
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {/* Step 3: Preview info */}
                {activeStep === 'preview' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary font-bold">3</span>
                      </div>
                      Podgląd i eksport
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-500 mb-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Grafika gotowa!</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Twoja grafika jest gotowa do pobrania. Kliknij "Pobierz PNG" aby zapisać ją na swoim urządzeniu.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500"
                        onClick={handleDownload}
                        disabled={generating}
                      >
                        {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                        Pobierz PNG (3x)
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={handleCopyToClipboard}
                        disabled={generating}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Kopiuj do schowka
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="ghost"
                        className="flex-1"
                        onClick={() => setActiveStep('template')}
                      >
                        Zmień szablon
                      </Button>
                      <Button 
                        variant="ghost"
                        className="flex-1"
                        onClick={() => setActiveStep('content')}
                      >
                        Edytuj treść
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 flex items-center justify-center p-8 bg-[#1a1a1a] min-h-[calc(100vh-140px)]">
            <div className="relative">
              {/* Checkerboard background */}
              <div 
                className="absolute inset-0 rounded-xl overflow-hidden" 
                style={{
                  backgroundImage: 'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }} 
              />
              
              <div 
                ref={previewRef}
                className="relative shadow-2xl rounded-xl overflow-hidden"
                style={{ width: dimensions.width, height: dimensions.height }}
              >
                {renderPreview()}
              </div>

              {/* Dimension indicator */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                {dimensions.width} × {dimensions.height}px • {currentTemplate?.aspectRatio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
