import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ChevronLeft, ChevronRight, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PresentationPreview } from "@/components/presentation/PresentationPreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { useThumbnailGenerator } from "@/hooks/useThumbnailGenerator";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";

const TOTAL_SLIDES = 6;
const slideNames = ["Powitanie", "Wyzwania salonów", "Jak pomagamy", "Przebieg współpracy", "Specjalna oferta", "Kontakt"];

interface LeadOption {
  id: string;
  salon_name: string;
  owner_name: string | null;
  city: string | null;
}

const PresentationGenerator = () => {
  const navigate = useNavigate();
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const { generateThumbnail: genThumb } = useThumbnailGenerator();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.5);
  const [leads, setLeads] = useState<LeadOption[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    ownerName: "",
    salonName: "",
    city: "",
  });

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from('leads').select('id, salon_name, owner_name, city').order('salon_name');
      setLeads(data || []);
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "presentation") {
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
        const width = previewContainerRef.current.clientWidth - 48;
        const height = previewContainerRef.current.clientHeight - 100;
        const scaleByWidth = width / 1600;
        const scaleByHeight = height / 900;
        setPreviewScale(Math.min(scaleByWidth, scaleByHeight, 0.8));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const hasRequiredFields = formData.ownerName && formData.salonName && formData.city;

  const nextSlide = () => setCurrentSlide((prev) => (prev % TOTAL_SLIDES) + 1);
  const prevSlide = () => setCurrentSlide((prev) => ((prev - 2 + TOTAL_SLIDES) % TOTAL_SLIDES) + 1);

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeadId(leadId);
    if (leadId && leadId !== "none") {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        setFormData({
          ownerName: lead.owner_name || "",
          salonName: lead.salon_name || "",
          city: lead.city || "",
        });
      }
    }
  };

  const handleSave = async () => {
    if (!hasRequiredFields) {
      toast.error("Uzupełnij wszystkie pola");
      return;
    }

    const docId = await saveDocument(
      "presentation",
      formData.salonName,
      `Prezentacja dla ${formData.ownerName}`,
      formData
    );
    setCurrentDocId(docId);
    toast.success("Prezentacja zapisana!");

    if (docId) {
      setTimeout(async () => {
        const thumbnail = await genThumb({
          elementId: "presentation-preview",
          format: 'jpeg',
          backgroundColor: "#000000",
          pixelRatio: 0.2,
          quality: 0.7,
          width: 1600,
          height: 900
        });
        if (thumbnail) await updateThumbnail(docId, thumbnail);
      }, 300);
    }
  };

  const generatePDF = async () => {
    if (!hasRequiredFields) {
      toast.error("Uzupełnij wszystkie pola");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Auto-save before download
      let docId = currentDocId;
      if (!docId) {
        docId = await saveDocument(
          "presentation",
          formData.salonName,
          `Prezentacja dla ${formData.ownerName}`,
          formData
        );
        setCurrentDocId(docId);
        
        if (docId) {
          const thumbnail = await genThumb({
            elementId: "presentation-preview",
            format: 'jpeg',
            backgroundColor: "#000000",
            pixelRatio: 0.2,
            quality: 0.7,
            width: 1600,
            height: 900
          });
          if (thumbnail) await updateThumbnail(docId, thumbnail);
        }
      }

      const element = document.getElementById("presentation-preview");
      if (!element) {
        toast.error("Nie można znaleźć elementu prezentacji");
        return;
      }

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1600, 900],
        compress: true,
      });

      for (let i = 1; i <= TOTAL_SLIDES; i++) {
        setCurrentSlide(i);
        await new Promise(resolve => setTimeout(resolve, 50));

        const imgData = await toJpeg(element, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#000000",
          quality: 0.92,
        });

        if (i > 1) pdf.addPage([1600, 900], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, 1600, 900, undefined, "FAST");
      }

      const sanitizedName = formData.salonName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      pdf.save(`prezentacja-${sanitizedName}.pdf`);
      toast.success("Prezentacja PDF pobrana!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Nie udało się wygenerować PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 border-r border-border/50 overflow-y-auto bg-card/30">
          <div className="p-4 border-b border-border/50 sticky top-0 bg-card/95 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-foreground">Generator Prezentacji</h1>
                <p className="text-xs text-muted-foreground">Cold mail slides</p>
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
                <Label className="text-xs">Imię właścicielki *</Label>
                <Input
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  placeholder="np. Anna"
                  className="h-9 mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Nazwa salonu *</Label>
                <Input
                  value={formData.salonName}
                  onChange={(e) => handleInputChange("salonName", e.target.value)}
                  placeholder="np. Beauty Studio Anna"
                  className="h-9 mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Miasto *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="np. Nowy Sącz"
                  className="h-9 mt-1"
                />
              </div>

              <div>
                <Label className="text-xs flex items-center gap-1">
                  <Users className="w-3 h-3 text-primary" />
                  Wybierz leada (auto-wypełni dane)
                </Label>
                <Select value={selectedLeadId || "none"} onValueChange={(v) => handleLeadSelect(v === "none" ? "" : v)}>
                  <SelectTrigger className="h-9 mt-1">
                    <SelectValue placeholder="Wybierz leada..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Wprowadź ręcznie</SelectItem>
                    {leads.map((l) => (
                      <SelectItem key={l.id} value={l.id}>{l.salon_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Slide Info */}
            <div className="p-3 bg-secondary/50 rounded-xl border border-border/50">
              <p className="text-xs font-medium text-foreground mb-2">Prezentacja zawiera:</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {slideNames.map((name, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-medium">
                      {idx + 1}
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Button onClick={handleSave} className="w-full" disabled={!hasRequiredFields}>
                Zapisz prezentację
              </Button>
              <Button onClick={generatePDF} disabled={isGenerating || !hasRequiredFields} variant="secondary" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                {isGenerating ? "Generuję PDF..." : "Pobierz PDF"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div ref={previewContainerRef} className="flex-1 overflow-hidden bg-black/95 p-4 lg:p-6 flex flex-col">
          {/* Slide Navigation */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button onClick={prevSlide} size="icon" variant="outline" className="h-8 w-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center min-w-[140px]">
                <p className="text-xs text-muted-foreground">Slajd {currentSlide} z {TOTAL_SLIDES}</p>
                <p className="text-sm text-foreground font-medium">{slideNames[currentSlide - 1]}</p>
              </div>
              <Button onClick={nextSlide} size="icon" variant="outline" className="h-8 w-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-1.5">
              {slideNames.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx + 1)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === idx + 1 ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center">
            <div 
              className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              style={{ 
                width: `${1600 * previewScale}px`,
                height: `${900 * previewScale}px`,
                backgroundColor: '#000',
              }}
            >
              <div 
                id="presentation-preview"
                style={{ 
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top left',
                  width: '1600px',
                  height: '900px',
                }}
              >
                <PresentationPreview data={formData} currentSlide={currentSlide} />
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-3 flex-shrink-0">
            Użyj strzałek ← → do nawigacji
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default PresentationGenerator;
