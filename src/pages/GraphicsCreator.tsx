import { useState, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Download, RotateCcw, Upload, X, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import FabricCanvasComponent, { FabricCanvasRef } from '@/components/graphics/FabricCanvas';
import { fabricTemplates, getTemplateById } from '@/components/graphics/fabricTemplates';

export default function GraphicsCreator() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('before-after');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const canvasRef = useRef<FabricCanvasRef>(null);

  const currentTemplate = getTemplateById(selectedTemplateId);

  // Get image fields from template
  const imageFields = currentTemplate?.elements
    .filter(el => el.type === 'image' && el.props.name)
    .map(el => ({ name: el.props.name as string })) || [];

  // Get text fields from template
  const textFields = currentTemplate?.elements
    .filter(el => el.type === 'text' && el.props.name)
    .map(el => ({
      name: el.props.name as string,
      defaultValue: el.props.text as string,
    })) || [];

  const handleImageUpload = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Max 10MB');
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
        toast.success('Pobrano!');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Błąd eksportu');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setFormData({});
  };

  const getFieldLabel = (name: string): string => {
    const labels: Record<string, string> = {
      mainImage: 'Zdjęcie',
      beforeImage: 'Zdjęcie PRZED',
      afterImage: 'Zdjęcie PO',
      treatmentName: 'Nazwa zabiegu',
      serviceName: 'Nazwa usługi',
      salonName: 'Nazwa salonu',
      description: 'Opis',
      price: 'Cena',
      discountValue: 'Rabat (np. -30%)',
      discountOn: 'Na co rabat',
      validUntil: 'Ważne do',
      tagline: 'Hasło',
      offerName: 'Nazwa oferty',
      oldPrice: 'Stara cena',
      newPrice: 'Nowa cena',
      cta: 'Przycisk',
    };
    return labels[name] || name;
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar */}
        <div className="w-[360px] border-r border-border bg-card/50 flex flex-col">
          <div className="p-4 border-b border-border">
            <h1 className="text-lg font-semibold">Kreator Grafik</h1>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Template selection */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Szablon</Label>
                <div className="space-y-1">
                  {fabricTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className={cn(
                        "w-full p-3 rounded-lg border text-left transition-all",
                        selectedTemplateId === template.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="text-sm font-medium">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image uploads */}
              {imageFields.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Zdjęcia</Label>
                  {imageFields.map((field) => (
                    <div key={field.name}>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        {getFieldLabel(field.name)}
                      </label>
                      <div className={cn(
                        "relative h-24 rounded-lg border-2 border-dashed overflow-hidden",
                        formData[field.name] ? "border-primary/50" : "border-border hover:border-primary/30"
                      )}>
                        {formData[field.name] ? (
                          <>
                            <img src={formData[field.name]} alt="" className="w-full h-full object-cover" />
                            <button
                              onClick={() => {
                                setFormData(prev => {
                                  const n = { ...prev };
                                  delete n[field.name];
                                  return n;
                                });
                              }}
                              className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-black"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                            <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                            <span className="text-xs text-muted-foreground">Kliknij aby dodać</span>
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
              {textFields.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Teksty</Label>
                  {textFields.map((field) => (
                    <div key={field.name}>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        {getFieldLabel(field.name)}
                      </label>
                      <Input
                        value={formData[field.name] ?? ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.defaultValue}
                        className="h-9 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button onClick={handleDownload} disabled={isGenerating} className="w-full">
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
              Pobierz PNG
            </Button>
            <Button variant="outline" onClick={() => setFormData({})} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />Reset
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-zinc-950 flex flex-col">
          <div className="h-11 border-b border-border px-4 flex items-center justify-between bg-card/30">
            <span className="text-sm">{currentTemplate?.name} • {currentTemplate?.width}x{currentTemplate?.height}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPreviewScale(Math.max(0.2, previewScale - 0.1))}>
                <ZoomOut className="w-3 h-3" />
              </Button>
              <span className="text-xs w-10 text-center">{Math.round(previewScale * 100)}%</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPreviewScale(Math.min(1, previewScale + 0.1))}>
                <ZoomIn className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 flex items-start justify-center">
            {currentTemplate && (
              <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top center' }}>
                <FabricCanvasComponent
                  key={`${selectedTemplateId}-${JSON.stringify(formData)}`}
                  ref={canvasRef}
                  template={currentTemplate}
                  formData={formData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}