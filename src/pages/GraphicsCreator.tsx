import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Download, RotateCcw, Sparkles, Loader2, Star } from 'lucide-react';
import { TemplateGallery, TEMPLATES, TEMPLATE_CATEGORIES, type TemplateVariant, type TemplateCategory } from '@/components/graphics/TemplateGallery';
import { ImageUploader } from '@/components/graphics/ImageUploader';
import { BeforeAfterTemplate } from '@/components/graphics/templates/BeforeAfterTemplate';
import { PromoTemplate } from '@/components/graphics/templates/PromoTemplate';
import { TestimonialTemplate } from '@/components/graphics/templates/TestimonialTemplate';
import { QuoteTemplate } from '@/components/graphics/templates/QuoteTemplate';
import { SingleImageTemplate } from '@/components/graphics/templates/SingleImageTemplate';
import { StoryTemplate } from '@/components/graphics/templates/StoryTemplate';
import { Slider } from '@/components/ui/slider';

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateVariant>('elegant-split');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [discountText, setDiscountText] = useState('-30%');
  const [ctaText, setCtaText] = useState('');
  const [testimonialText, setTestimonialText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [generating, setGenerating] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const currentCategory = currentTemplate?.category || 'before-after';

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
    setMainImage(null);
    setHeadline('');
    setSubheadline('');
    setDiscountText('-30%');
    setCtaText('');
    setTestimonialText('');
    setAuthorName('');
    setAuthorTitle('');
    setRating(5);
  };

  const renderPreview = () => {
    // Before/After templates
    if (['elegant-split', 'diagonal-glam', 'neon-frame', 'minimal-luxury', 'bold-contrast', 'soft-glow', 'vertical-stack', 'circle-reveal', 'sliding-compare'].includes(selectedTemplate)) {
      return (
        <BeforeAfterTemplate
          variant={selectedTemplate as any}
          beforeImage={beforeImage}
          afterImage={afterImage}
          headline={headline}
          subheadline={subheadline}
        />
      );
    }

    // Promo templates
    if (['promo-sale', 'promo-new-service', 'promo-discount', 'promo-announcement'].includes(selectedTemplate)) {
      return (
        <PromoTemplate
          variant={selectedTemplate as any}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
          discountText={discountText}
          ctaText={ctaText}
        />
      );
    }

    // Testimonial templates
    if (['testimonial-card', 'testimonial-photo', 'testimonial-minimal'].includes(selectedTemplate)) {
      return (
        <TestimonialTemplate
          variant={selectedTemplate as any}
          image={mainImage}
          testimonialText={testimonialText}
          authorName={authorName}
          authorTitle={authorTitle}
          rating={rating}
        />
      );
    }

    // Quote templates
    if (['quote-elegant', 'quote-bold', 'quote-minimal'].includes(selectedTemplate)) {
      return (
        <QuoteTemplate
          variant={selectedTemplate as any}
          image={mainImage}
          quoteText={testimonialText || headline}
          authorName={authorName}
        />
      );
    }

    // Single image templates
    if (['single-hero', 'single-portfolio', 'single-feature'].includes(selectedTemplate)) {
      return (
        <SingleImageTemplate
          variant={selectedTemplate as any}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
        />
      );
    }

    // Story templates
    if (['story-promo', 'story-testimonial', 'story-announcement'].includes(selectedTemplate)) {
      return (
        <StoryTemplate
          variant={selectedTemplate as any}
          image={mainImage}
          headline={headline}
          subheadline={subheadline}
          discountText={discountText}
          testimonialText={testimonialText}
          authorName={authorName}
          ctaText={ctaText}
        />
      );
    }

    return null;
  };

  const renderImageUploaders = () => {
    if (currentCategory === 'before-after') {
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
        label="Zdjęcie"
        image={mainImage}
        onImageChange={setMainImage}
      />
    );
  };

  const renderTextFields = () => {
    return (
      <div className="space-y-4">
        {/* Common fields */}
        <div>
          <Label className="text-sm">Nagłówek</Label>
          <Input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder={currentCategory === 'promo' ? 'np. MEGA WYPRZEDAŻ' : 'np. Metamorfoza'}
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

        {/* Promo specific fields */}
        {(currentCategory === 'promo' || currentCategory === 'story') && (
          <>
            <div>
              <Label className="text-sm">Tekst rabatu</Label>
              <Input
                value={discountText}
                onChange={(e) => setDiscountText(e.target.value)}
                placeholder="np. -50%"
                className="bg-background/50 border-border/50 mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">Przycisk CTA</Label>
              <Input
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="np. Zarezerwuj teraz"
                className="bg-background/50 border-border/50 mt-1"
              />
            </div>
          </>
        )}

        {/* Testimonial/Quote specific fields */}
        {(currentCategory === 'testimonial' || currentCategory === 'quote' || selectedTemplate === 'story-testimonial') && (
          <>
            <div>
              <Label className="text-sm">Treść opinii / cytatu</Label>
              <Textarea
                value={testimonialText}
                onChange={(e) => setTestimonialText(e.target.value)}
                placeholder="np. Najlepszy salon w mieście!"
                className="bg-background/50 border-border/50 mt-1 min-h-[80px]"
              />
            </div>
            <div>
              <Label className="text-sm">Imię i nazwisko</Label>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="np. Anna Kowalska"
                className="bg-background/50 border-border/50 mt-1"
              />
            </div>
            {currentCategory === 'testimonial' && (
              <div>
                <Label className="text-sm">Podpis / tytuł</Label>
                <Input
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  placeholder="np. Stała klientka"
                  className="bg-background/50 border-border/50 mt-1"
                />
              </div>
            )}
            {currentCategory === 'testimonial' && (
              <div>
                <Label className="text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Ocena ({rating} gwiazdek)
                </Label>
                <Slider
                  value={[rating]}
                  onValueChange={(v) => setRating(v[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="mt-2"
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const getPreviewMaxWidth = () => {
    if (!currentTemplate) return 'max-w-lg';
    if (currentTemplate.aspectRatio === 'story') return 'max-w-xs';
    if (currentTemplate.aspectRatio === 'landscape') return 'max-w-2xl';
    if (currentTemplate.aspectRatio === 'portrait') return 'max-w-sm';
    return 'max-w-lg';
  };

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
              {TEMPLATES.length} szablonów w {TEMPLATE_CATEGORIES.length} kategoriach
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
              Pobierz PNG
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
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
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
                    {renderImageUploaders()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="text" className="mt-4">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Treść</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTextFields()}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Template info */}
            {currentTemplate && (
              <Card className="bg-gradient-to-br from-primary/10 to-pink-500/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{currentTemplate.name}</h3>
                      <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {currentTemplate.aspectRatio === 'story' ? '9:16' : 
                       currentTemplate.aspectRatio === 'portrait' ? '4:5' :
                       currentTemplate.aspectRatio === 'landscape' ? '16:9' : '1:1'}
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
                  className={`w-full ${getPreviewMaxWidth()} shadow-2xl shadow-black/20 rounded-xl overflow-hidden`}
                >
                  {renderPreview()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
