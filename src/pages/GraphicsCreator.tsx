import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, RotateCcw, Upload, X, Loader2, ZoomIn, ZoomOut, Image as ImageIcon, Square, RectangleVertical, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TEMPLATES, CATEGORY_LABELS, type TemplateConfig, type TemplateCategory } from '@/components/graphics/templates';
import { ElegantPromo } from '@/components/graphics/templates/ElegantPromo';
import { BeforeAfter } from '@/components/graphics/templates/BeforeAfter';
import { TestimonialCard } from '@/components/graphics/templates/TestimonialCard';
import { ServiceHighlight } from '@/components/graphics/templates/ServiceHighlight';
import { FlashSale } from '@/components/graphics/templates/FlashSale';
import { NewLook } from '@/components/graphics/templates/NewLook';
import { PriceList } from '@/components/graphics/templates/PriceList';
import { QuoteInspiration } from '@/components/graphics/templates/QuoteInspiration';
import { HolidaySpecial } from '@/components/graphics/templates/HolidaySpecial';
import { VipTreatment } from '@/components/graphics/templates/VipTreatment';

const ASPECT_ICONS = {
  '1:1': Square,
  '4:5': RectangleVertical,
  '9:16': Smartphone,
};

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('elegant-promo');
  const [categoryFilter, setCategoryFilter] = useState<TemplateCategory | 'all'>('all');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplate);
  const filteredTemplates = categoryFilter === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === categoryFilter);

  const handleImageUpload = (fieldId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Maksymalny rozmiar pliku to 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setFormData(prev => ({ ...prev, [fieldId]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const url = await toPng(previewRef.current, { quality: 1, pixelRatio: 3, cacheBust: true });
      const a = document.createElement('a');
      a.download = `${selectedTemplate}-${Date.now()}.png`;
      a.href = url;
      a.click();
      toast.success('Grafika pobrana!');
    } catch {
      toast.error('Błąd podczas generowania');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetAll = () => {
    setFormData({});
    toast.success('Zresetowano');
  };

  const renderTemplate = () => {
    const data = formData;
    switch (selectedTemplate) {
      case 'elegant-promo': return <ElegantPromo data={data} />;
      case 'before-after': return <BeforeAfter data={data} />;
      case 'testimonial-card': return <TestimonialCard data={data} />;
      case 'service-highlight': return <ServiceHighlight data={data} />;
      case 'flash-sale': return <FlashSale data={data} />;
      case 'new-look': return <NewLook data={data} />;
      case 'price-list': return <PriceList data={data} />;
      case 'quote-inspiration': return <QuoteInspiration data={data} />;
      case 'holiday-special': return <HolidaySpecial data={data} />;
      case 'vip-treatment': return <VipTreatment data={data} />;
      default: return null;
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left Panel */}
        <div className="w-[420px] border-r border-border bg-card/50 flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground mb-1">Kreator Grafik</h1>
            <p className="text-sm text-muted-foreground">10 profesjonalnych szablonów</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Category Filter */}
              <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as any)}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all" className="text-xs">Wszystkie</TabsTrigger>
                  <TabsTrigger value="promotion" className="text-xs">Promocje</TabsTrigger>
                  <TabsTrigger value="service" className="text-xs">Usługi</TabsTrigger>
                </TabsList>
                <TabsList className="grid grid-cols-3 w-full mt-2">
                  <TabsTrigger value="metamorphosis" className="text-xs">Metamorfozy</TabsTrigger>
                  <TabsTrigger value="testimonial" className="text-xs">Opinie</TabsTrigger>
                  <TabsTrigger value="seasonal" className="text-xs">Sezonowe</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Template Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Wybierz szablon</Label>
                <div className="grid grid-cols-2 gap-2">
                  {filteredTemplates.map((template) => {
                    const AspectIcon = ASPECT_ICONS[template.aspectRatio];
                    return (
                      <button
                        key={template.id}
                        onClick={() => { setSelectedTemplate(template.id); setFormData({}); }}
                        className={cn(
                          "p-3 rounded-lg border text-left transition-all",
                          selectedTemplate === template.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <AspectIcon className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{template.aspectRatio}</span>
                        </div>
                        <p className="text-xs font-medium text-foreground truncate">{template.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Fields */}
              {currentTemplate && (
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Personalizacja</Label>
                  {currentTemplate.fields.map((field) => (
                    <div key={field.id}>
                      <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                      {field.type === 'image' ? (
                        <div className={cn(
                          "relative aspect-video rounded-lg border-2 border-dashed overflow-hidden",
                          formData[field.id] ? "border-primary/50" : "border-border hover:border-primary/30"
                        )}>
                          {formData[field.id] ? (
                            <>
                              <img src={formData[field.id]} alt="" className="w-full h-full object-cover" />
                              <button
                                onClick={() => setFormData(prev => { const n = {...prev}; delete n[field.id]; return n; })}
                                className="absolute top-2 right-2 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center hover:bg-destructive hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-secondary/50">
                              <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                              <span className="text-xs text-muted-foreground">Dodaj zdjęcie</span>
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload(field.id)} />
                            </label>
                          )}
                        </div>
                      ) : (
                        <Input
                          value={formData[field.id] || field.defaultValue || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="bg-secondary/50 border-border h-9"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button onClick={handleDownload} disabled={isGenerating} className="w-full">
              {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generowanie...</> : <><Download className="w-4 h-4 mr-2" />Pobierz PNG</>}
            </Button>
            <Button variant="outline" onClick={resetAll} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />Resetuj
            </Button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-background flex flex-col">
          <div className="h-12 border-b border-border px-6 flex items-center justify-between bg-card/30">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{currentTemplate?.name}</span>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary">{currentTemplate?.aspectRatio}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewScale(Math.max(0.2, previewScale - 0.1))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-10 text-center">{Math.round(previewScale * 100)}%</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewScale(Math.min(1, previewScale + 0.1))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(330 20% 6%) 50%, hsl(0 0% 5%) 100%)' }}>
            <div className="relative transition-transform duration-200" style={{ transform: `scale(${previewScale})` }}>
              <div ref={previewRef} className="shadow-2xl rounded-lg overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 60px hsl(330 100% 60% / 0.1)' }}>
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
