import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileImage, ArrowLeft, Link, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { useThumbnailGenerator } from "@/hooks/useThumbnailGenerator";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import { toPng, toJpeg } from "html-to-image";

type InvoiceType = "advance" | "final" | "full";

interface ClientOption {
  id: string;
  salon_name: string;
  owner_name?: string | null;
  city?: string | null;
  email?: string | null;
  phone?: string | null;
}

const AGENCY_STORAGE_KEY = "aurine_agency_data";

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const { generateThumbnail: genThumb } = useThumbnailGenerator();
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("full");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [previewScale, setPreviewScale] = useState(0.5);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  const getStoredAgencyData = () => {
    try {
      const stored = localStorage.getItem(AGENCY_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      agencyName: "Aurine",
      agencyOwner: "",
      agencyAddress: "",
      agencyNIP: "",
      bankName: "",
      bankAccount: "",
    };
  };

  const storedAgency = getStoredAgencyData();

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
    bankName: storedAgency.bankName,
    bankAccount: storedAgency.bankAccount,
    agencyName: storedAgency.agencyName,
    agencyOwner: storedAgency.agencyOwner,
    agencyAddress: storedAgency.agencyAddress,
    agencyNIP: storedAgency.agencyNIP,
  });

  // Save agency data when it changes
  useEffect(() => {
    const agencyData = {
      agencyName: formData.agencyName,
      agencyOwner: formData.agencyOwner,
      agencyAddress: formData.agencyAddress,
      agencyNIP: formData.agencyNIP,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
    };
    localStorage.setItem(AGENCY_STORAGE_KEY, JSON.stringify(agencyData));
  }, [formData.agencyName, formData.agencyOwner, formData.agencyAddress, formData.agencyNIP, formData.bankName, formData.bankAccount]);

  useEffect(() => {
    const fetchData = async () => {
      const clientsRes = await supabase.from('clients').select('id, salon_name, owner_name, city, email, phone').order('salon_name');
      setClients(clientsRes.data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "invoice") {
          setFormData(doc.data as typeof formData);
          if (doc.data.invoiceType) setInvoiceType(doc.data.invoiceType as InvoiceType);
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

  const hasRequiredFields = formData.clientName && formData.invoiceNumber && formData.amount;

  const handleSave = async () => {
    if (!hasRequiredFields) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    if (invoiceType === "final" && !formData.advanceAmount) {
      toast.error("Podaj kwotę zaliczki dla faktury końcowej");
      return;
    }

    const docId = await saveDocument(
      "invoice",
      formData.clientName,
      `Faktura ${formData.invoiceNumber}`,
      { ...formData, invoiceType },
      undefined,
      selectedClientId || undefined,
      undefined
    );
    setCurrentDocId(docId);
    toast.success("Faktura zapisana!");

    if (docId) {
      setTimeout(async () => {
        const thumbnail = await genThumb({
          elementId: "invoice-preview",
          format: 'jpeg',
          backgroundColor: "#ffffff",
          pixelRatio: 0.2,
          quality: 0.7,
          maxRetries: 3,
          retryDelay: 300,
          width: 794,
          height: 1123
        });
        if (thumbnail) await updateThumbnail(docId, thumbnail);
      }, 300);
    }
  };

  const generatePDF = async () => {
    if (!hasRequiredFields) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    const element = document.getElementById("invoice-preview");
    if (!element) return;

    setIsGenerating(true);
    try {
      // Auto-save before download
      let docId = currentDocId;
      if (!docId) {
        docId = await saveDocument(
          "invoice",
          formData.clientName,
          `Faktura ${formData.invoiceNumber}`,
          { ...formData, invoiceType },
          undefined,
          selectedClientId || undefined,
          undefined
        );
        setCurrentDocId(docId);
        
        if (docId) {
          const thumbnail = await genThumb({
            elementId: "invoice-preview",
            format: 'jpeg',
            backgroundColor: "#ffffff",
            pixelRatio: 0.2,
            quality: 0.6,
          });
          if (thumbnail) await updateThumbnail(docId, thumbnail);
        }
      }

      const canvas = await toJpeg(element, { cacheBust: true, pixelRatio: 1, backgroundColor: "#ffffff", quality: 0.85 });
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123], compress: true });
      pdf.addImage(canvas, "JPEG", 0, 0, 794, 1123, undefined, "FAST");
      pdf.save(`${formData.invoiceNumber.replace(/\//g, "-")}.pdf`);
      toast.success("Faktura PDF pobrana!");
    } catch (error) {
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
      toast.error("Nie udało się pobrać obrazu");
    } finally {
      setIsGenerating(false);
    }
  };

  const invoiceTypes = [
    { id: "advance" as InvoiceType, label: "Zaliczkowa" },
    { id: "final" as InvoiceType, label: "Końcowa" },
    { id: "full" as InvoiceType, label: "Pełna" },
  ];

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 border-r border-border/50 overflow-y-auto bg-card/30">
          <div className="p-4 border-b border-border/50 sticky top-0 bg-card/95 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-foreground">Generator Faktur</h1>
                <p className="text-xs text-muted-foreground">Faktury bez VAT</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Invoice Type */}
            <div>
              <Label className="text-xs mb-2 block">Typ faktury</Label>
              <div className="grid grid-cols-3 gap-2">
                {invoiceTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInvoiceType(type.id)}
                    className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                      invoiceType === type.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 hover:border-primary/30 text-muted-foreground"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

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
                  <Label className="text-xs">Numer faktury *</Label>
                  <Input
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    placeholder="FV/2025/001"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Kwota (PLN) *</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    placeholder="5000"
                    className="h-9 mt-1"
                  />
                </div>
              </div>

              {invoiceType === "final" && (
                <div>
                  <Label className="text-xs">Zaliczka (PLN) *</Label>
                  <Input
                    type="number"
                    value={formData.advanceAmount}
                    onChange={(e) => handleInputChange("advanceAmount", e.target.value)}
                    placeholder="2000"
                    className="h-9 mt-1"
                  />
                </div>
              )}

              <div>
                <Label className="text-xs flex items-center gap-1">
                  <Link className="w-3 h-3 text-primary" />
                  Wybierz klienta
                </Label>
                <Select 
                  value={selectedClientId || "none"} 
                  onValueChange={(v) => { 
                    setSelectedClientId(v === "none" ? "" : v); 
                    if (v !== "none") {
                      const client = clients.find(c => c.id === v);
                      if (client) {
                        setFormData(prev => ({
                          ...prev,
                          clientName: client.salon_name,
                          clientAddress: client.city ? `${client.city}` : prev.clientAddress,
                        }));
                      }
                    }
                  }}
                >
                  <SelectTrigger className="h-9 mt-1">
                    <SelectValue placeholder="Wybierz klienta..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Bez powiązania</SelectItem>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.salon_name} {c.owner_name ? `(${c.owner_name})` : ''}
                      </SelectItem>
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
                  <Label className="text-xs">Data wystawienia</Label>
                  <Input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    className="h-9 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Termin płatności</Label>
                  <Input
                    type="date"
                    value={formData.paymentDue}
                    onChange={(e) => handleInputChange("paymentDue", e.target.value)}
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Opis usługi</Label>
                  <Input
                    value={formData.serviceDescription}
                    onChange={(e) => handleInputChange("serviceDescription", e.target.value)}
                    placeholder="Usługi marketingowe"
                    className="h-9 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Nazwa banku</Label>
                  <Input
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    placeholder="mBank"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Numer konta</Label>
                  <Input
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                    placeholder="00 0000 0000 0000 0000 0000"
                    className="h-9 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Agency Data Section */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">Dane agencji (zapamiętywane)</h3>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Nazwa firmy</Label>
                    <Input
                      value={formData.agencyName}
                      onChange={(e) => handleInputChange("agencyName", e.target.value)}
                      placeholder="Aurine"
                      className="h-9 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Imię i nazwisko</Label>
                    <Input
                      value={formData.agencyOwner}
                      onChange={(e) => handleInputChange("agencyOwner", e.target.value)}
                      placeholder="Jan Kowalski"
                      className="h-9 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Adres agencji</Label>
                  <Input
                    value={formData.agencyAddress}
                    onChange={(e) => handleInputChange("agencyAddress", e.target.value)}
                    placeholder="ul. Przykładowa 123, 00-000 Miasto"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">NIP agencji</Label>
                  <Input
                    value={formData.agencyNIP}
                    onChange={(e) => handleInputChange("agencyNIP", e.target.value)}
                    placeholder="1234567890"
                    className="h-9 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Button onClick={handleSave} className="w-full" disabled={!hasRequiredFields}>
                Zapisz fakturę
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
                <InvoicePreview data={{ ...formData, invoiceType }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default InvoiceGenerator;
