import { useState, useEffect } from "react";
import { Download, FileImage, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard, FormRow } from "@/components/ui/FormCard";
import { toast } from "sonner";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

type InvoiceType = "advance" | "final" | "full";

const InvoiceGenerator = () => {
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("full");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    clientNIP: "",
    invoiceNumber: "",
    issueDate: new Date().toISOString().split("T")[0],
    serviceDescription: "Usługi marketingowe Facebook Ads",
    amount: "",
    advanceAmount: "",
    paymentDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  // Load document from session storage if coming from history
  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "invoice") {
          setFormData(doc.data as typeof formData);
          if (doc.data.invoiceType) {
            setInvoiceType(doc.data.invoiceType as InvoiceType);
          }
          setShowPreview(true);
        }
      } catch (e) {
        console.error("Error loading document:", e);
      }
      sessionStorage.removeItem("loadDocument");
    }
  }, []);

  const invoiceTypes = [
    { id: "advance" as InvoiceType, label: "Zaliczkowa", description: "Płatność zaliczki" },
    { id: "final" as InvoiceType, label: "Końcowa", description: "Rozliczenie po zaliczce" },
    { id: "full" as InvoiceType, label: "Pełna", description: "Pełna kwota usługi" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateThumbnail = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return null;
    try {
      return await toPng(element, { cacheBust: true, pixelRatio: 0.3, backgroundColor: "#ffffff" });
    } catch {
      return null;
    }
  };

  const handleGenerate = async () => {
    if (!formData.clientName || !formData.invoiceNumber || !formData.amount) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    if (invoiceType === "final" && !formData.advanceAmount) {
      toast.error("Podaj kwotę zaliczki dla faktury końcowej");
      return;
    }

    setShowPreview(true);

    // Save to history (async)
    const docId = await saveDocument(
      "invoice",
      formData.clientName,
      `Faktura ${formData.invoiceNumber}`,
      { ...formData, invoiceType }
    );
    setCurrentDocId(docId);

    toast.success("Podgląd faktury gotowy!");

    // Generate thumbnail after preview is shown
    setTimeout(async () => {
      const thumbnail = await generateThumbnail();
      if (thumbnail && docId) {
        await updateThumbnail(docId, thumbnail);
      }
    }, 500);
  };

  const generatePDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    setIsGenerating(true);

    try {
      const canvas = await toPng(element, { cacheBust: true, pixelRatio: 3, backgroundColor: "#ffffff" });

      const img = new Image();
      img.src = canvas;
      await new Promise((resolve) => { img.onload = resolve; });

      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123], compress: true });
      pdf.addImage(canvas, "PNG", 0, 0, 794, 1123, undefined, "FAST");
      pdf.save(`${formData.invoiceNumber.replace(/\//g, "-")}.pdf`);

      toast.success("Faktura PDF pobrana!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Nie udało się wygenerować PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsImage = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    setIsGenerating(true);

    try {
      const imgData = await toPng(element, { cacheBust: true, pixelRatio: 2, backgroundColor: "#ffffff" });

      const link = document.createElement("a");
      link.download = `${formData.invoiceNumber.replace(/\//g, "-")}.png`;
      link.href = imgData;
      link.click();

      toast.success("Faktura PNG pobrana!");
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
          <h1 className="text-2xl font-bold text-foreground">Generator Faktur</h1>
          <p className="text-muted-foreground">Profesjonalne faktury dla Aurine Agency</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <FormCard title="Typ faktury">
              <div className="grid grid-cols-3 gap-3">
                {invoiceTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInvoiceType(type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      invoiceType === type.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/30 bg-secondary/30"
                    }`}
                  >
                    <h3 className="font-semibold text-sm mb-1 text-foreground">{type.label}</h3>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </FormCard>

            <FormCard title="Dane faktury">
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
                    <Label htmlFor="invoiceNumber">Numer faktury *</Label>
                    <Input
                      id="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                      placeholder="FV/2025/001"
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
                    <Label htmlFor="issueDate">Data wystawienia</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    />
                  </div>
                </FormRow>

                <FormRow>
                  <div>
                    <Label htmlFor="paymentDue">Termin płatności</Label>
                    <Input
                      id="paymentDue"
                      type="date"
                      value={formData.paymentDue}
                      onChange={(e) => handleInputChange("paymentDue", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">{invoiceType === "final" ? "Kwota całkowita" : "Kwota"} (PLN) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      placeholder="5000"
                    />
                  </div>
                </FormRow>

                {invoiceType === "final" && (
                  <div>
                    <Label htmlFor="advanceAmount">Zaliczka (PLN) *</Label>
                    <Input
                      id="advanceAmount"
                      type="number"
                      value={formData.advanceAmount}
                      onChange={(e) => handleInputChange("advanceAmount", e.target.value)}
                      placeholder="2000"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="serviceDescription">Opis usługi</Label>
                  <Input
                    id="serviceDescription"
                    value={formData.serviceDescription}
                    onChange={(e) => handleInputChange("serviceDescription", e.target.value)}
                    placeholder="Usługi marketingowe Facebook Ads"
                  />
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Info:</span> Wszystkie faktury są zwolnione z VAT
                  </p>
                </div>

                <Button onClick={handleGenerate} className="w-full">
                  <Eye className="w-5 h-5 mr-2" />
                  Generuj podgląd faktury
                </Button>
              </div>
            </FormCard>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground font-sans">Podgląd faktury</h2>
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
                  <InvoicePreview data={{ ...formData, invoiceType }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default InvoiceGenerator;
