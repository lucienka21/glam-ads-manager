import { useState, useRef, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, RotateCcw, Upload, X, Loader2, ZoomIn, ZoomOut, Image as ImageIcon, Square, RectangleVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import FabricCanvasComponent, { FabricCanvasRef } from '@/components/graphics/FabricCanvas';
import { fabricTemplates, getTemplateById } from '@/components/graphics/fabricTemplates';

const ASPECT_ICONS: Record<string, React.ElementType> = {
  '1:1': Square,
  '4:5': RectangleVertical,
};

export default function GraphicsCreator() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('elegant-service');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const canvasRef = useRef<FabricCanvasRef>(null);

  const currentTemplate = getTemplateById(selectedTemplateId);

  // Get editable fields from template
  const editableFields = currentTemplate?.elements
    .filter(el => el.type === 'text' && el.props.name)
    .map(el => ({
      name: el.props.name as string,
      label: el.props.name as string,
      defaultValue: el.props.text as string,
    })) || [];

  const imageFields = currentTemplate?.elements
    .filter(el => el.type === 'image' && el.props.name)
    .map(el => ({
      name: el.props.name as string,
      label: el.props.name as string,
    })) || [];

  // Update canvas when form data changes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (imageFields.some(f => f.name === key)) {
        canvasRef.current?.updateImage(key, value);
      } else {
        canvasRef.current?.updateText(key, value);
      }
    });
  }, [formData, imageFields]);

  const handleImageUpload = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Maksymalny rozmiar pliku to 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setFormData(prev => ({ ...prev, [fieldName]: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await canvasRef.current.exportImage();
      if (dataUrl) {
        const a = document.createElement('a');
        a.download = `${selectedTemplateId}-${Date.now()}.png`;
        a.href = dataUrl;
        a.click();
        toast.success('Grafika pobrana!');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Błąd podczas eksportu');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({});
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setFormData({});
  };

  const getAspectRatio = (template: typeof currentTemplate) => {
    if (!template) return '1:1';
    const ratio = template.width / template.height;
    if (Math.abs(ratio - 1) < 0.01) return '1:1';
    if (Math.abs(ratio - 0.8) < 0.01) return '4:5';
    return '4:5';
  };

  const getLabelForField = (name: string): string => {
    const labels: Record<string, string> = {
      mainImage: 'Zdjęcie główne',
      beforeImage: 'Zdjęcie przed',
      afterImage: 'Zdjęcie po',
      serviceName: 'Nazwa usługi',
      treatmentName: 'Nazwa zabiegu',
      description: 'Opis',
      price: 'Cena',
      salonName: 'Nazwa salonu',
      discountNumber: 'Wartość rabatu',
      discountOn: 'Na co rabat',
      validUntil: 'Ważne do',
      headline: 'Nagłówek',
      subtitle: 'Podtytuł',
      oldPrice: 'Stara cena',
      newPrice: 'Nowa cena',
      cta: 'Przycisk CTA',
      category: 'Kategoria',
      duration: 'Czas trwania',
      phone: 'Telefon',
      seasonLabel: 'Etykieta sezonu',
      discount: 'Rabat',
      tagline: 'Hasło',
    };
    return labels[name] || name;
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left sidebar */}
        <div className="w-[380px] border-r border-border bg-card/50 flex flex-col">
          <div className="p-5 border-b border-border">
            <h1 className="text-xl font-semibold text-foreground">Kreator Grafik</h1>
            <p className="text-sm text-muted-foreground mt-1">Fabric.js Templates</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-5 space-y-5">
              {/* Template selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Wybierz szablon</Label>
                <div className="grid grid-cols-2 gap-2">
                  {fabricTemplates.map((template) => {
                    const aspectRatio = getAspectRatio(template);
                    const AspectIcon = ASPECT_ICONS[aspectRatio] || Square;
                    return (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateChange(template.id)}
                        className={cn(
                          "p-3 rounded-lg border text-left transition-all",
                          selectedTemplateId === template.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <AspectIcon className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{aspectRatio}</span>
                        </div>
                        <p className="text-xs font-medium text-foreground">{template.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image fields */}
              {imageFields.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Zdjęcia</Label>
                  {imageFields.map((field) => (
                    <div key={field.name}>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        {getLabelForField(field.name)}
                      </label>
                      <div className={cn(
                        "relative aspect-video rounded-lg border-2 border-dashed overflow-hidden",
                        formData[field.name] ? "border-primary/50" : "border-border hover:border-primary/30"
                      )}>
                        {formData[field.name] ? (
                          <>
                            <img src={formData[field.name]} alt="" className="w-full h-full object-cover" />
                            <button
                              onClick={() => setFormData(prev => {
                                const n = { ...prev };
                                delete n[field.name];
                                return n;
                              })}
                              className="absolute top-2 right-2 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center hover:bg-background"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                            <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                            <span className="text-xs text-muted-foreground">Dodaj zdjęcie</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload(field.name)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Text fields */}
              {editableFields.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Teksty</Label>
                  {editableFields.map((field) => (
                    <div key={field.name}>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        {getLabelForField(field.name)}
                      </label>
                      <Input
                        value={formData[field.name] ?? field.defaultValue}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.defaultValue}
                        className="bg-secondary/50 h-9 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Bottom actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button onClick={handleDownload} disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Pobierz PNG
            </Button>
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Right preview area */}
        <div className="flex-1 bg-background flex flex-col">
          {/* Header */}
          <div className="h-12 border-b border-border px-5 flex items-center justify-between bg-card/30">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{currentTemplate?.name}</span>
              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary">
                {currentTemplate?.width} x {currentTemplate?.height}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPreviewScale(Math.max(0.2, previewScale - 0.1))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center">
                {Math.round(previewScale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPreviewScale(Math.min(1, previewScale + 0.1))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Canvas preview */}
          <div
            className="flex-1 overflow-auto p-8 flex items-start justify-center"
            style={{ background: '#0a0a0a' }}
          >
            {currentTemplate && (
              <div className="shadow-2xl" style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }}>
                <FabricCanvasComponent
                  key={selectedTemplateId}
                  ref={canvasRef}
                  template={currentTemplate}
                  scale={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}