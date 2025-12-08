import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileImage, ArrowLeft, Building2, User } from "lucide-react";
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
import jsPDF from "jspdf";
import { toPng, toJpeg } from "html-to-image";

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

const STORAGE_KEY = "contract-agency-data";

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
  const previewContainerRef = useRef<HTMLDivElement>(null);
  
  // Load agency data from localStorage
  const getStoredAgencyData = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      agencyName: "Agencja Marketingowa Aurine",
      agencyOwner: "",
      agencyAddress: "",
      agencyNIP: "",
      agencyEmail: "kontakt@aurine.pl",
    };
  };

  const [formData, setFormData] = useState({
    clientName: "",
    clientOwnerName: "",
    clientAddress: "",
    clientNIP: "",
    clientEmail: "",
    clientPhone: "",
    signDate: new Date().toISOString().split("T")[0],
    signCity: "",
    contractValue: "",
    ...getStoredAgencyData(),
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
        setPreviewScale(Math.min(width / 595, 0.85));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Persist agency data to localStorage
  useEffect(() => {
    const agencyData = {
      agencyName: formData.agencyName,
      agencyOwner: formData.agencyOwner,
      agencyAddress: formData.agencyAddress,
      agencyNIP: formData.agencyNIP,
      agencyEmail: formData.agencyEmail,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agencyData));
  }, [formData.agencyName, formData.agencyOwner, formData.agencyAddress, formData.agencyNIP, formData.agencyEmail]);

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
          signCity: client.city || prev.signCity,
          clientEmail: client.email || "",
          clientPhone: client.phone || "",
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
          signCity: lead.city || prev.signCity,
          clientEmail: lead.email || "",
          clientPhone: lead.phone || "",
        }));
      }
    }
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
          backgroundColor: "#09090b",
          pixelRatio: 0.3,
          quality: 0.8,
          maxRetries: 3,
          retryDelay: 300,
          width: 595,
          height: 842
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
            backgroundColor: "#09090b",
            pixelRatio: 0.3,
            quality: 0.8,
          });
          if (thumbnail) await updateThumbnail(docId, thumbnail);
        }
      }

      const A4_WIDTH = 595.28;
      const A4_HEIGHT = 841.89;

      const canvas = await toJpeg(element, { 
        cacheBust: true, 
        pixelRatio: 2, 
        backgroundColor: "#09090b", 
        quality: 0.95 
      });
      const pdf = new jsPDF({ 
        orientation: "portrait", 
        unit: "pt", 
        format: "a4",
        compress: true 
      });
      pdf.addImage(canvas, "JPEG", 0, 0, A4_WIDTH, A4_HEIGHT);
      
      const fileName = `Umowa_${formData.clientName.replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);
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
      const imgData = await toPng(element, { cacheBust: true, pixelRatio: 2, backgroundColor: "#09090b" });
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
            {/* Client/Lead Selection */}
            <div className="space-y-3">
              <div>
                <Label className="text-xs flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-primary" />
                  Klient
                </Label>
                <SearchableSelect
                  options={clients.map(c => ({ value: c.id, label: c.salon_name, description: c.city || "" }))}
                  value={selectedClientId}
                  onValueChange={handleClientSelect}
                  placeholder="Wybierz klienta..."
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
                  placeholder="Wybierz leada..."
                />
              </div>
            </div>

            {/* Zleceniodawca Section */}
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Dane Zleceniodawcy</p>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Nazwa firmy / salonu *</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                    placeholder="Salon Beauty XYZ"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Imię i nazwisko właściciela</Label>
                  <Input
                    value={formData.clientOwnerName}
                    onChange={(e) => handleInputChange("clientOwnerName", e.target.value)}
                    placeholder="Anna Kowalska"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Adres</Label>
                  <Input
                    value={formData.clientAddress}
                    onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                    placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">NIP</Label>
                  <Input
                    value={formData.clientNIP}
                    onChange={(e) => handleInputChange("clientNIP", e.target.value)}
                    placeholder="1234567890"
                    className="h-9 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">E-mail</Label>
                    <Input
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                      placeholder="kontakt@salon.pl"
                      className="h-9 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Telefon</Label>
                    <Input
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                      placeholder="+48 123 456 789"
                      className="h-9 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Szczegóły umowy</p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Data zawarcia</Label>
                    <Input
                      type="date"
                      value={formData.signDate}
                      onChange={(e) => handleInputChange("signDate", e.target.value)}
                      className="h-9 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Miejscowość</Label>
                    <Input
                      value={formData.signCity}
                      onChange={(e) => handleInputChange("signCity", e.target.value)}
                      placeholder="Warszawa"
                      className="h-9 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Wynagrodzenie miesięczne (PLN brutto) *</Label>
                  <Input
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => handleInputChange("contractValue", e.target.value)}
                    placeholder="1500"
                    className="h-9 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Wykonawca Section */}
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Dane Wykonawcy (Aurine)</p>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Nazwa agencji</Label>
                  <Input
                    value={formData.agencyName}
                    onChange={(e) => handleInputChange("agencyName", e.target.value)}
                    placeholder="Agencja Marketingowa Aurine"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Właściciel</Label>
                  <Input
                    value={formData.agencyOwner}
                    onChange={(e) => handleInputChange("agencyOwner", e.target.value)}
                    placeholder="Imię i nazwisko"
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Adres do korespondencji</Label>
                  <Input
                    value={formData.agencyAddress}
                    onChange={(e) => handleInputChange("agencyAddress", e.target.value)}
                    placeholder="Adres agencji..."
                    className="h-9 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">NIP</Label>
                    <Input
                      value={formData.agencyNIP}
                      onChange={(e) => handleInputChange("agencyNIP", e.target.value)}
                      placeholder="1234567890"
                      className="h-9 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">E-mail</Label>
                    <Input
                      value={formData.agencyEmail}
                      onChange={(e) => handleInputChange("agencyEmail", e.target.value)}
                      placeholder="kontakt@aurine.pl"
                      className="h-9 mt-1"
                    />
                  </div>
                </div>
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
              className="rounded-xl shadow-2xl overflow-hidden ring-1 ring-border/20"
              style={{ 
                width: `${595 * previewScale}px`,
                height: `${842 * previewScale}px`,
              }}
            >
              <div 
                style={{ 
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top left',
                  width: '595px',
                  height: '842px',
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
