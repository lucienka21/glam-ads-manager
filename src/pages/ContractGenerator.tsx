import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileImage, ArrowLeft, Building2, User, Plus, X, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ContractPreview } from "@/components/contract/ContractPreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { useThumbnailGenerator } from "@/hooks/useThumbnailGenerator";
import { supabase } from "@/integrations/supabase/client";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import jsPDF from "jspdf";
import { toJpeg, toPng } from "html-to-image";

interface ClientOption {
  id: string;
  salon_name: string;
  city?: string;
  owner_name?: string;
  email?: string;
  phone?: string;
}

interface LeadOption {
  id: string;
  salon_name: string;
  city?: string;
  owner_name?: string;
  email?: string;
  phone?: string;
}

interface ServiceItem {
  id: string;
  name: string;
}

interface AgencyData {
  agencyName: string;
  agencyOwnerName: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyAddress: string;
  agencyNip: string;
}

const defaultServices: ServiceItem[] = [
  { id: "1", name: "Kampanie Facebook Ads" },
  { id: "2", name: "Materiały reklamowe" },
  { id: "3", name: "Optymalizacja i raportowanie" },
];

const AGENCY_STORAGE_KEY = "aurine_agency_data";

const defaultAgencyData: AgencyData = {
  agencyName: "Aurine Agency",
  agencyOwnerName: "",
  agencyEmail: "kontakt@aurine.pl",
  agencyPhone: "+48 731 856 524",
  agencyAddress: "",
  agencyNip: "",
};

const loadAgencyData = (): AgencyData => {
  try {
    const stored = localStorage.getItem(AGENCY_STORAGE_KEY);
    if (stored) {
      return { ...defaultAgencyData, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Error loading agency data:", e);
  }
  return defaultAgencyData;
};

const saveAgencyData = (data: AgencyData) => {
  try {
    localStorage.setItem(AGENCY_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving agency data:", e);
  }
};

const ContractGenerator = () => {
  const navigate = useNavigate();
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const { generateThumbnail: genThumb } = useThumbnailGenerator();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [leads, setLeads] = useState<LeadOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [previewScale, setPreviewScale] = useState(0.5);
  const [newService, setNewService] = useState("");
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState(() => {
    const agencyData = loadAgencyData();
    return {
      clientName: "",
      clientAddress: "",
      clientNip: "",
      clientOwnerName: "",
      clientEmail: "",
      clientPhone: "",
      signDate: new Date().toISOString().split("T")[0],
      signCity: "",
      contractValue: "",
      paymentType: "split" as "full" | "split",
      advanceAmount: "",
      ...agencyData,
      services: defaultServices,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const [clientsRes, leadsRes] = await Promise.all([
        supabase.from('clients').select('id, salon_name, city, owner_name, email, phone').order('salon_name'),
        supabase.from('leads').select('id, salon_name, city, owner_name, email, phone').not('status', 'in', '("converted","lost")').order('salon_name')
      ]);
      setClients(clientsRes.data || []);
      setLeads(leadsRes.data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "contract") {
          setFormData(prev => ({ ...prev, ...doc.data }));
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
        const containerWidth = previewContainerRef.current.clientWidth;
        const containerHeight = previewContainerRef.current.clientHeight;
        // Fixed A4 dimensions: 794px x 1123px
        const scaleX = (containerWidth - 40) / 794;
        const scaleY = (containerHeight - 40) / 1123;
        // Use the smaller scale to fit, but ensure minimum readability
        const scale = Math.min(scaleX, scaleY, 0.85);
        setPreviewScale(Math.max(scale, 0.4));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Save agency data when it changes
  useEffect(() => {
    const agencyData: AgencyData = {
      agencyName: formData.agencyName,
      agencyOwnerName: formData.agencyOwnerName,
      agencyEmail: formData.agencyEmail,
      agencyPhone: formData.agencyPhone,
      agencyAddress: formData.agencyAddress,
      agencyNip: formData.agencyNip,
    };
    saveAgencyData(agencyData);
  }, [formData.agencyName, formData.agencyOwnerName, formData.agencyEmail, formData.agencyPhone, formData.agencyAddress, formData.agencyNip]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    setSelectedLeadId("");
    
    if (clientId) {
      const client = clients.find(c => c.id === clientId);
      if (client) {
        setFormData(prev => ({
          ...prev,
          clientName: client.salon_name,
          clientOwnerName: client.owner_name || "",
          clientEmail: client.email || "",
          clientPhone: client.phone || "",
          signCity: client.city || prev.signCity,
        }));
      }
    }
  };

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeadId(leadId);
    setSelectedClientId("");
    
    if (leadId) {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setFormData(prev => ({
          ...prev,
          clientName: lead.salon_name,
          clientOwnerName: lead.owner_name || "",
          clientEmail: lead.email || "",
          clientPhone: lead.phone || "",
          signCity: lead.city || prev.signCity,
        }));
      }
    }
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, { id: Date.now().toString(), name: newService.trim() }]
      }));
      setNewService("");
    }
  };

  const handleRemoveService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const hasRequiredFields = formData.clientName && formData.contractValue;

  const handleSave = async () => {
    if (!hasRequiredFields) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    const docId = await saveDocument(
      "contract",
      formData.clientName,
      `Umowa - ${formData.clientName}`,
      formData,
      undefined,
      selectedClientId || undefined,
      selectedLeadId || undefined
    );
    setCurrentDocId(docId);
    toast.success("Umowa zapisana!");

    if (docId) {
      setTimeout(async () => {
        const thumbnail = await genThumb({
          elementId: "contract-preview",
          format: 'jpeg',
          backgroundColor: "#0a0a0a",
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

    const element = document.getElementById("contract-preview");
    if (!element) return;

    setIsGenerating(true);
    try {
      // Auto-save before download
      let docId = currentDocId;
      if (!docId) {
        docId = await saveDocument(
          "contract",
          formData.clientName,
          `Umowa - ${formData.clientName}`,
          formData,
          undefined,
          selectedClientId || undefined,
          selectedLeadId || undefined
        );
        setCurrentDocId(docId);
        
        if (docId) {
          const thumbnail = await genThumb({
            elementId: "contract-preview",
            format: 'jpeg',
            backgroundColor: "#0a0a0a",
            pixelRatio: 0.2,
            quality: 0.6,
          });
          if (thumbnail) await updateThumbnail(docId, thumbnail);
        }
      }

      // Generate image - use exact element size
      const imgData = await toJpeg(element, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: "#0a0a0a", 
        quality: 0.92,
        skipFonts: true,
      });
      
      // Create A4 PDF
      const pdf = new jsPDF({ 
        orientation: "portrait", 
        unit: "mm", 
        format: "a4", 
        compress: true 
      });
      
      // A4 dimensions: 210mm x 297mm - fill entire page
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      
      const fileName = `Umowa_${formData.clientName.replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);
      toast.success("Umowa PDF pobrana!");
    } catch (error) {
      console.error("PDF generation error:", error);
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
      const imgData = await toPng(element, { cacheBust: true, pixelRatio: 2, backgroundColor: "#0a0a0a" });
      const link = document.createElement("a");
      const fileName = `Umowa_${formData.clientName.replace(/\s+/g, "_")}.png`;
      link.download = fileName;
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
        <div className="w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 border-r border-border/50 overflow-y-auto bg-card/30">
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
            {/* Client/Lead Selection */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-primary" />
                    Klient
                  </Label>
                  <SearchableSelect
                    options={clients.map(c => ({ value: c.id, label: c.salon_name, description: c.city || "" }))}
                    value={selectedClientId}
                    onValueChange={handleClientSelect}
                    placeholder="Wybierz..."
                  />
                </div>
                <div>
                  <Label className="text-xs flex items-center gap-1">
                    <User className="w-3 h-3 text-primary" />
                    Lead
                  </Label>
                  <SearchableSelect
                    options={leads.map(l => ({ value: l.id, label: l.salon_name, description: l.city || "" }))}
                    value={selectedLeadId}
                    onValueChange={handleLeadSelect}
                    placeholder="Wybierz..."
                  />
                </div>
              </div>
            </div>

            {/* Agency Details Section */}
            <div className="space-y-3 p-3 rounded-lg bg-pink-950/20 border border-pink-800/30">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-pink-300 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Dane Wykonawcy (Aurine)
                </p>
                <span className="text-[10px] text-pink-400/60">zapamiętywane</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Nazwa firmy</Label>
                  <Input
                    value={formData.agencyName}
                    onChange={(e) => handleInputChange("agencyName", e.target.value)}
                    placeholder="Aurine Agency"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Imię i nazwisko</Label>
                  <Input
                    value={formData.agencyOwnerName}
                    onChange={(e) => handleInputChange("agencyOwnerName", e.target.value)}
                    placeholder="Jan Kowalski"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">E-mail</Label>
                  <Input
                    type="email"
                    value={formData.agencyEmail}
                    onChange={(e) => handleInputChange("agencyEmail", e.target.value)}
                    placeholder="kontakt@aurine.pl"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Telefon</Label>
                  <Input
                    value={formData.agencyPhone}
                    onChange={(e) => handleInputChange("agencyPhone", e.target.value)}
                    placeholder="+48 731 856 524"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">NIP</Label>
                  <Input
                    value={formData.agencyNip}
                    onChange={(e) => handleInputChange("agencyNip", e.target.value)}
                    placeholder="123-456-78-90"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Adres</Label>
                  <Input
                    value={formData.agencyAddress}
                    onChange={(e) => handleInputChange("agencyAddress", e.target.value)}
                    placeholder="ul. Przykładowa 1"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Client Details Section */}
            <div className="space-y-3 p-3 rounded-lg bg-blue-950/20 border border-blue-800/30">
              <p className="text-xs font-medium text-blue-300 flex items-center gap-1">
                <User className="w-3 h-3" />
                Dane Zleceniodawcy
              </p>
              
              <div>
                <Label className="text-xs">Nazwa firmy / salonu *</Label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  placeholder="Salon Beauty XYZ"
                  className="h-8 mt-1 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Imię i nazwisko właściciela</Label>
                  <Input
                    value={formData.clientOwnerName}
                    onChange={(e) => handleInputChange("clientOwnerName", e.target.value)}
                    placeholder="Anna Kowalska"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">NIP</Label>
                  <Input
                    value={formData.clientNip}
                    onChange={(e) => handleInputChange("clientNip", e.target.value)}
                    placeholder="123-456-78-90"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs">Adres</Label>
                <Input
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                  placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                  className="h-8 mt-1 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">E-mail</Label>
                  <Input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                    placeholder="kontakt@salon.pl"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Telefon</Label>
                  <Input
                    value={formData.clientPhone}
                    onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                    placeholder="+48 123 456 789"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Data zawarcia</Label>
                  <Input
                    type="date"
                    value={formData.signDate}
                    onChange={(e) => handleInputChange("signDate", e.target.value)}
                    className="h-8 mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Miejscowość</Label>
                  <Input
                    value={formData.signCity}
                    onChange={(e) => handleInputChange("signCity", e.target.value)}
                    placeholder="Warszawa"
                    className="h-8 mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border/30 space-y-3">
                <p className="text-xs font-medium text-foreground">Wynagrodzenie i płatność</p>
                
                <div>
                  <Label className="text-xs">Wynagrodzenie miesięczne (PLN brutto) *</Label>
                  <Input
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => handleInputChange("contractValue", e.target.value)}
                    placeholder="1500"
                    className="h-8 mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label className="text-xs mb-2 block">Rodzaj rozliczenia</Label>
                  <RadioGroup
                    value={formData.paymentType}
                    onValueChange={(value) => handleInputChange("paymentType", value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="split" id="split" />
                      <Label htmlFor="split" className="text-xs cursor-pointer">Zaliczka + końcowa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="text-xs cursor-pointer">Całość z góry</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.paymentType === "split" && (
                  <div>
                    <Label className="text-xs">Kwota zaliczki (PLN)</Label>
                    <Input
                      type="number"
                      value={formData.advanceAmount}
                      onChange={(e) => handleInputChange("advanceAmount", e.target.value)}
                      placeholder="750"
                      className="h-8 mt-1 text-sm"
                    />
                    {formData.contractValue && formData.advanceAmount && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Pozostała część: {Math.max(0, parseFloat(formData.contractValue) - parseFloat(formData.advanceAmount)).toLocaleString("pl-PL")} PLN
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Services Section */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border/30 space-y-3">
                <p className="text-xs font-medium text-foreground">Usługi objęte umową</p>
                
                <div className="space-y-1.5">
                  {formData.services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between text-xs bg-background/50 rounded px-2 py-1.5">
                      <span>{service.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0"
                        onClick={() => handleRemoveService(service.id)}
                      >
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Nowa usługa..."
                    className="h-8 text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleAddService()}
                  />
                  <Button variant="outline" size="sm" className="h-8" onClick={handleAddService}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-border/30">
              <Button
                onClick={handleSave}
                className="w-full h-9"
                variant="outline"
                disabled={!hasRequiredFields}
              >
                <Save className="w-4 h-4 mr-2" />
                Zapisz umowę
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={generatePDF}
                  className="h-9 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                  disabled={isGenerating || !hasRequiredFields}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  {isGenerating ? "..." : "PDF"}
                </Button>
                <Button
                  onClick={downloadAsImage}
                  variant="secondary"
                  className="h-9"
                  disabled={isGenerating || !hasRequiredFields}
                >
                  <FileImage className="w-4 h-4 mr-1.5" />
                  PNG
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-zinc-950 overflow-auto" ref={previewContainerRef}>
          <div className="min-h-full flex items-start justify-center p-6">
            <div 
              className="origin-top shadow-2xl rounded-lg overflow-hidden"
              style={{ 
                transform: `scale(${previewScale})`,
                marginBottom: previewScale < 1 ? `${-1123 * (1 - previewScale)}px` : 0
              }}
            >
              <ContractPreview data={formData} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContractGenerator;