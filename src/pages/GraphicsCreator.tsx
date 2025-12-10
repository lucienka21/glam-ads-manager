import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, RotateCcw, Upload, X, Loader2, ZoomIn, ZoomOut, Image as ImageIcon, Square, RectangleVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { templates, ServicePromo, BeforeAfter, Discount, NewService, Result, LimitedOffer, Treatment, Booking, Seasonal, Brand } from '@/components/graphics/templates';

const ASPECT_ICONS = {
  '1:1': Square,
  '4:5': RectangleVertical,
};

type CategoryFilter = 'all' | 'promo' | 'result' | 'offer';

export default function GraphicsCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('service-promo');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.6);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const filteredTemplates = categoryFilter === 'all' 
    ? templates 
    : templates.filter(t => t.category === categoryFilter);

  const handleImageUpload = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Max 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setFormData(prev => ({ ...prev, [fieldName]: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
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
      toast.success('Pobrano');
    } catch {
      toast.error('Błąd');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'service-promo': return <ServicePromo data={formData} />;
      case 'before-after': return <BeforeAfter data={formData} />;
      case 'discount': return <Discount data={formData} />;
      case 'new-service': return <NewService data={formData} />;
      case 'result': return <Result data={formData} />;
      case 'limited-offer': return <LimitedOffer data={formData} />;
      case 'treatment': return <Treatment data={formData} />;
      case 'booking': return <Booking data={formData} />;
      case 'seasonal': return <Seasonal data={formData} />;
      case 'brand': return <Brand data={formData} />;
      default: return null;
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        <div className="w-[380px] border-r border-border bg-card/50 flex flex-col">
          <div className="p-5 border-b border-border">
            <h1 className="text-xl font-semibold text-foreground">Kreator Grafik</h1>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-5 space-y-5">
              <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all" className="text-xs">Wszystkie</TabsTrigger>
                  <TabsTrigger value="promo" className="text-xs">Usługi</TabsTrigger>
                  <TabsTrigger value="result" className="text-xs">Efekty</TabsTrigger>
                  <TabsTrigger value="offer" className="text-xs">Oferty</TabsTrigger>
                </TabsList>
              </Tabs>

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
                      <p className="text-xs font-medium text-foreground">{template.name}</p>
                    </button>
                  );
                })}
              </div>

              {currentTemplate && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Dane</Label>
                  {currentTemplate.fields.map((field) => (
                    <div key={field.name}>
                      <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                      {field.type === 'image' ? (
                        <div className={cn(
                          "relative aspect-video rounded-lg border-2 border-dashed overflow-hidden",
                          formData[field.name] ? "border-primary/50" : "border-border hover:border-primary/30"
                        )}>
                          {formData[field.name] ? (
                            <>
                              <img src={formData[field.name]} alt="" className="w-full h-full object-cover" />
                              <button
                                onClick={() => setFormData(prev => { const n = {...prev}; delete n[field.name]; return n; })}
                                className="absolute top-2 right-2 w-5 h-5 bg-background/80 rounded-full flex items-center justify-center"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                              <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                              <span className="text-xs text-muted-foreground">Dodaj</span>
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload(field.name)} />
                            </label>
                          )}
                        </div>
                      ) : (
                        <Input
                          value={formData[field.name] || ''}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="bg-secondary/50 h-8 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border space-y-2">
            <Button onClick={handleDownload} disabled={isGenerating} className="w-full">
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4 mr-2" />Pobierz</>}
            </Button>
            <Button variant="outline" onClick={() => setFormData({})} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />Reset
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-background flex flex-col">
          <div className="h-11 border-b border-border px-5 flex items-center justify-between bg-card/30">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{currentTemplate?.name}</span>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary">{currentTemplate?.aspectRatio}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.1))}>
                <ZoomOut className="w-3 h-3" />
              </Button>
              <span className="text-xs text-muted-foreground w-8 text-center">{Math.round(previewScale * 100)}%</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPreviewScale(Math.min(1, previewScale + 0.1))}>
                <ZoomIn className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 flex items-center justify-center" style={{ background: '#0a0a0a' }}>
            <div style={{ transform: `scale(${previewScale})` }}>
              <div ref={previewRef} className="shadow-2xl">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
