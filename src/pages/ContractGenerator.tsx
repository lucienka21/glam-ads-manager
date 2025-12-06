import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileImage, ArrowLeft, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ContractPreview } from "@/components/contract/ContractPreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { useThumbnailGenerator } from "@/hooks/useThumbnailGenerator";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

interface ClientOption {
  id: string;
  salon_name: string;
}

const ContractGenerator = () => {
  const navigate = useNavigate();
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const { generateThumbnail: genThumb } = useThumbnailGenerator();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [previewScale, setPreviewScale] = useState(0.5);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    clientNIP: "",
    contractNumber: "",
    signDate: new Date().toISOString().split("T")[0],
    serviceScope: "Prowadzenie kampanii reklamowych Facebook Ads, tworzenie kreacji, optymalizacja i raportowanie wyników.",
    contractValue: "",
    paymentTerms: "7 dni od wystawienia faktury",
    contractDuration: "3 miesiące",
  });

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from('clients').select('id, salon_name').order('salon_name');
      setClients(data || []);
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "contract") {
          setFormData(doc.data as typeof formData);
        }
      } catch (e) {
        console.error("Error loading document:", e);
      }
      sessionStorage.removeItem("loadDocument");
    }
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const width = previewContainerRef.current.clientWidth;
        setPreviewScale(Math.min(width / 794, 0.7));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const hasRequiredFields = formData.clientName && formData.contractNumber && formData.contractValue;

  const handleSave = async () => {
    if (!hasRequiredFields) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    const docId = await saveDocument(
      "contract",
      formData.clientName,
      `Umowa ${formData.contractNumber}`,
      formData,
      undefined,
      selectedClientId || undefined
    );
    setCurrentDocId(docId);
    toast.success("Umowa zapisana!");

    if (docId) {
      setTimeout(async () => {
        const thumbnail = await genThumb({
          elementId: "contract-preview",
          backgroundColor: "#ffffff",
          pixelRatio: 0.3,
          maxRetries: 5,
          retryDelay: 800
        });
        if (thumbnail) await updateThumbnail(docId, thumbnail);
      }, 500);
    }
  };

  const generatePDF = async () => {
    const element = document.getElementById("contract-preview");
    if (!element) return;

    setIsGenerating(true);
    try {
      const canvas = await toPng(element, { cacheBust: true, pixelRatio: 3, backgroundColor: "#ffffff" });
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123], compress: true });
      pdf.addImage(canvas, "PNG", 0, 0, 794, 1123, undefined, "FAST");
      pdf.save(`${formData.contractNumber.replace(/\//g, "-")}.pdf`);
      toast.success("Umowa PDF pobrana!");
    } catch (error) {
      toast.error("Nie udało się wygenerować PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsImage = async () => {
    const element = document.getElementById("contract-preview");
    if (!element) return;

    setIsGenerating(true);
    try {
      const imgData = await toPng(element, { cacheBust: true, pixelRatio: 2, backgroundColor: "#ffffff" });
      const link = document.createElement("a");
      link.download = `${formData.contractNumber.replace(/\//g, "-")}.png`;
      link.href = imgData;
      link.click();
      toast.success("Umowa PNG pobrana!");
    } catch (error) {
      toast.error("Nie udało się pobrać obrazu");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 border-r border-border/50 overflow-y-auto bg-card/30">
          <div className="p-4 border-b border-border/50 sticky top-0 bg-card/95 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-foreground">Generator Umów</h1>
                <p className="text-xs text-muted-foreground">Profesjonalne umowy marketingowe</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Nazwa klienta *</Label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  placeholder="Salon Beauty XYZ"
                  className="h-9 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Numer umowy *</Label>
                  <Input
                    value={formData.contractNumber}
                    onChange={(e) => handleInputChange("contractNumber", e.target.value)}
                    placeholder="UM/2025/001"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Wartość (PLN) *</Label>
                  <Input
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => handleInputChange("contractValue", e.target.value)}
                    placeholder="15000"
                    className="h-9 mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs flex items-center gap-1">
                  <Link className="w-3 h-3 text-primary" />
                  Połącz z klientem
                </Label>
                <Select value={selectedClientId || "none"} onValueChange={(v) => setSelectedClientId(v === "none" ? "" : v)}>
                  <SelectTrigger className="h-9 mt-1">
                    <SelectValue placeholder="Opcjonalne..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Bez powiązania</SelectItem>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.salon_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Adres klienta</Label>
                <Input
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                  placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                  className="h-9 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">NIP klienta</Label>
                  <Input
                    value={formData.clientNIP}
                    onChange={(e) => handleInputChange("clientNIP", e.target.value)}
                    placeholder="1234567890"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Data podpisania</Label>
                  <Input
                    type="date"
                    value={formData.signDate}
                    onChange={(e) => handleInputChange("signDate", e.target.value)}
                    className="h-9 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Czas trwania</Label>
                  <Input
                    value={formData.contractDuration}
                    onChange={(e) => handleInputChange("contractDuration", e.target.value)}
                    placeholder="3 miesiące"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Warunki płatności</Label>
                  <Input
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                    placeholder="7 dni"
                    className="h-9 mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs">Zakres usług</Label>
                <Textarea
                  value={formData.serviceScope}
                  onChange={(e) => handleInputChange("serviceScope", e.target.value)}
                  className="mt-1 min-h-[80px] bg-secondary/30 border-border/50"
                  placeholder="Prowadzenie kampanii reklamowych..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Button onClick={handleSave} className="w-full" disabled={!hasRequiredFields}>
                Zapisz umowę
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={downloadAsImage} disabled={isGenerating || !hasRequiredFields} variant="outline" size="sm">
                  <FileImage className="w-4 h-4 mr-1" />
                  PNG
                </Button>
                <Button onClick={generatePDF} disabled={isGenerating || !hasRequiredFields} variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div ref={previewContainerRef} className="flex-1 overflow-auto bg-muted/30 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Podgląd na żywo</h2>
          </div>
          
          <div className="flex justify-center">
            <div 
              className="bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-border/20"
              style={{ 
                width: `${794 * previewScale}px`,
                height: `${1123 * previewScale}px`,
              }}
            >
              <div 
                style={{ 
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top left',
                  width: '794px',
                  height: '1123px',
                }}
              >
                <ContractPreview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContractGenerator;
