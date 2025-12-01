import { useState, useEffect } from "react";
import { Download, FileImage, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormCard, FormRow } from "@/components/ui/FormCard";
import { toast } from "sonner";
import { ContractPreview } from "@/components/contract/ContractPreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const ContractGenerator = () => {
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
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

  // Load document from session storage if coming from history
  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "contract") {
          setFormData(doc.data as typeof formData);
          setShowPreview(true);
        }
      } catch (e) {
        console.error("Error loading document:", e);
      }
      sessionStorage.removeItem("loadDocument");
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateThumbnailWithRetry = async (docId: string, retries = 0) => {
    const element = document.getElementById("contract-preview");
    if (!element) {
      if (retries < 3) {
        setTimeout(() => generateThumbnailWithRetry(docId, retries + 1), 500);
      }
      return;
    }
    try {
      const thumbnail = await toPng(element, { 
        cacheBust: true, 
        pixelRatio: 0.3, 
        backgroundColor: "#ffffff",
        quality: 0.8 
      });
      await updateThumbnail(docId, thumbnail);
    } catch (e) {
      console.error("Error generating thumbnail:", e);
      if (retries < 2) {
        setTimeout(() => generateThumbnailWithRetry(docId, retries + 1), 500);
      }
    }
  };

  const handleGenerate = async () => {
    if (!formData.clientName || !formData.contractNumber || !formData.contractValue) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    setShowPreview(true);

    // Save to history (async)
    const docId = await saveDocument(
      "contract",
      formData.clientName,
      `Umowa ${formData.contractNumber}`,
      formData
    );
    setCurrentDocId(docId);

    toast.success("Podgląd umowy gotowy!");

    // Generate thumbnail after preview is shown with retry mechanism
    if (docId) {
      setTimeout(() => generateThumbnailWithRetry(docId), 1000);
    }
  };

  const generatePDF = async () => {
    const element = document.getElementById("contract-preview");
    if (!element) return;

    setIsGenerating(true);

    try {
      const canvas = await toPng(element, { cacheBust: true, pixelRatio: 3, backgroundColor: "#ffffff" });

      const img = new Image();
      img.src = canvas;
      await new Promise((resolve) => { img.onload = resolve; });

      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123], compress: true });
      pdf.addImage(canvas, "PNG", 0, 0, 794, 1123, undefined, "FAST");
      pdf.save(`${formData.contractNumber.replace(/\//g, "-")}.pdf`);

      toast.success("Umowa PDF pobrana!");
    } catch (error) {
      console.error("Error generating PDF:", error);
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
      console.error("Error downloading image:", error);
      toast.error("Nie udało się pobrać obrazu");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Generator Umów</h1>
          <p className="text-muted-foreground">Profesjonalne umowy marketingowe</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <FormCard title="Dane klienta">
              <div className="space-y-5">
                <FormRow>
                  <div>
                    <Label htmlFor="clientName">Nazwa klienta *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange("clientName", e.target.value)}
                      placeholder="Salon Beauty XYZ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contractNumber">Numer umowy *</Label>
                    <Input
                      id="contractNumber"
                      value={formData.contractNumber}
                      onChange={(e) => handleInputChange("contractNumber", e.target.value)}
                      placeholder="UM/2025/001"
                    />
                  </div>
                </FormRow>

                <div>
                  <Label htmlFor="clientAddress">Adres klienta</Label>
                  <Input
                    id="clientAddress"
                    value={formData.clientAddress}
                    onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                    placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                  />
                </div>

                <FormRow>
                  <div>
                    <Label htmlFor="clientNIP">NIP klienta</Label>
                    <Input
                      id="clientNIP"
                      value={formData.clientNIP}
                      onChange={(e) => handleInputChange("clientNIP", e.target.value)}
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signDate">Data podpisania</Label>
                    <Input
                      id="signDate"
                      type="date"
                      value={formData.signDate}
                      onChange={(e) => handleInputChange("signDate", e.target.value)}
                    />
                  </div>
                </FormRow>
              </div>
            </FormCard>

            <FormCard title="Warunki umowy">
              <div className="space-y-5">
                <FormRow>
                  <div>
                    <Label htmlFor="contractValue">Wartość umowy (PLN) *</Label>
                    <Input
                      id="contractValue"
                      type="number"
                      value={formData.contractValue}
                      onChange={(e) => handleInputChange("contractValue", e.target.value)}
                      placeholder="15000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contractDuration">Czas trwania</Label>
                    <Input
                      id="contractDuration"
                      value={formData.contractDuration}
                      onChange={(e) => handleInputChange("contractDuration", e.target.value)}
                      placeholder="3 miesiące"
                    />
                  </div>
                </FormRow>

                <div>
                  <Label htmlFor="paymentTerms">Warunki płatności</Label>
                  <Input
                    id="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                    placeholder="7 dni od wystawienia faktury"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceScope">Zakres usług</Label>
                  <Textarea
                    id="serviceScope"
                    value={formData.serviceScope}
                    onChange={(e) => handleInputChange("serviceScope", e.target.value)}
                    className="min-h-[100px] bg-secondary/30 border-border/50 focus:border-primary/50"
                    placeholder="Prowadzenie kampanii reklamowych Facebook Ads..."
                  />
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Info:</span> Umowa zawiera standardowe klauzule prawne i zabezpieczenia
                  </p>
                </div>

                <Button onClick={handleGenerate} className="w-full">
                  <Eye className="w-5 h-5 mr-2" />
                  Generuj podgląd umowy
                </Button>
              </div>
            </FormCard>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground font-sans">Podgląd umowy</h2>
                <div className="flex gap-2">
                  <Button onClick={downloadAsImage} disabled={isGenerating} size="sm" variant="success">
                    <FileImage className="w-4 h-4 mr-2" />
                    {isGenerating ? "..." : "PNG"}
                  </Button>
                  <Button onClick={generatePDF} disabled={isGenerating} size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {isGenerating ? "..." : "PDF"}
                  </Button>
                </div>
              </div>
              <div className="border border-border/50 rounded-xl overflow-hidden bg-white shadow-lg">
                <div className="transform scale-[0.6] origin-top-left w-[166%]">
                  <ContractPreview data={formData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ContractGenerator;
