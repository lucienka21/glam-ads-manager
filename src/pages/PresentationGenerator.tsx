import { useState, useEffect, useRef, useCallback } from "react";
import { Download, ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard } from "@/components/ui/FormCard";
import { toast } from "sonner";
import { PresentationPreview } from "@/components/presentation/PresentationPreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { useDocumentHistory } from "@/hooks/useDocumentHistory";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";

const TOTAL_SLIDES = 6;

const PresentationGenerator = () => {
  const { saveDocument, updateThumbnail } = useDocumentHistory();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.4);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    ownerName: "",
    salonName: "",
    city: "",
  });

  // Load document from session storage if coming from history
  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "presentation") {
          setFormData(doc.data as typeof formData);
          setShowPreview(true);
        }
      } catch (e) {
        console.error("Error loading document:", e);
      }
      sessionStorage.removeItem("loadDocument");
    }
  }, []);

  // Calculate preview scale based on container width
  useEffect(() => {
    const calculateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        const scale = containerWidth / 1600;
        setPreviewScale(Math.min(scale * 0.95, 1));
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [showPreview]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateThumbnail = async () => {
    const element = document.getElementById("presentation-preview");
    if (!element) return null;
    try {
      return await toJpeg(element, { cacheBust: true, pixelRatio: 0.2, backgroundColor: "#000000", quality: 0.8 });
    } catch {
      return null;
    }
  };

  const handleGenerate = async () => {
    if (!formData.ownerName || !formData.salonName || !formData.city) {
      toast.error("Uzupełnij wszystkie pola");
      return;
    }

    setShowPreview(true);
    setCurrentSlide(1);

    // Save to history
    const docId = saveDocument(
      "presentation",
      formData.salonName,
      `Prezentacja dla ${formData.ownerName}`,
      formData
    );
    setCurrentDocId(docId);

    toast.success("Prezentacja gotowa!");

    // Generate thumbnail after preview is shown
    setTimeout(async () => {
      const thumbnail = await generateThumbnail();
      if (thumbnail && docId) {
        updateThumbnail(docId, thumbnail);
      }
    }, 500);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev % TOTAL_SLIDES) + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => ((prev - 2 + TOTAL_SLIDES) % TOTAL_SLIDES) + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showPreview) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPreview]);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1600, 900],
        compress: true,
      });

      for (let i = 1; i <= TOTAL_SLIDES; i++) {
        setCurrentSlide(i);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const element = document.getElementById("presentation-preview");
        if (!element) continue;

        const imgData = await toJpeg(element, {
          cacheBust: true,
          pixelRatio: 1.8,
          backgroundColor: "#000000",
          quality: 0.92,
        });

        if (i > 1) {
          pdf.addPage([1600, 900], "landscape");
        }

        pdf.addImage(imgData, "JPEG", 0, 0, 1600, 900, undefined, "FAST");
      }

      const sanitizedName = formData.salonName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      pdf.save(`prezentacja-${sanitizedName}.pdf`);
      toast.success("Prezentacja PDF pobrana!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Nie udało się wygenerować PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const slideNames = ["Powitanie", "Wyzwania salonów", "Jak pomagamy", "Przebieg współpracy", "Specjalna oferta", "Kontakt"];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Generator Prezentacji</h1>
            <p className="text-muted-foreground">Profesjonalne prezentacje cold mail</p>
          </div>
          {showPreview && (
            <Button onClick={generatePDF} disabled={isGenerating}>
              <Download className="w-4 h-4 mr-2" />
              {isGenerating ? "Generuję..." : "Pobierz PDF"}
            </Button>
          )}
        </div>

        {!showPreview ? (
          <div className="max-w-lg mx-auto">
            <FormCard>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground font-sans mb-2">Stwórz spersonalizowaną prezentację</h2>
                <p className="text-muted-foreground">Prezentacja będzie zawierać 6 profesjonalnych slajdów</p>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="ownerName">Imię właścicielki salonu *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange("ownerName", e.target.value)}
                    placeholder="np. Anna"
                  />
                </div>

                <div>
                  <Label htmlFor="salonName">Nazwa salonu *</Label>
                  <Input
                    id="salonName"
                    value={formData.salonName}
                    onChange={(e) => handleInputChange("salonName", e.target.value)}
                    placeholder="np. Beauty Studio Anna"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Miasto *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="np. Nowy Sącz"
                  />
                </div>
              </div>

              <div className="mt-8 p-5 bg-secondary/50 border border-border/50 rounded-xl">
                <p className="text-sm text-foreground font-medium mb-3">Prezentacja zawiera:</p>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Wyzwania salonów beauty w reklamie
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Jak możemy pomóc Twojemu salonowi
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Przebieg współpracy krok po kroku
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Specjalna oferta: darmowy audyt + tydzień próbny
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Generuj prezentację
                </Button>
              </div>
            </FormCard>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-card border border-border/50 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Button onClick={prevSlide} size="icon" variant="outline">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="text-center min-w-[200px]">
                  <p className="text-sm text-muted-foreground">Slajd {currentSlide} z {TOTAL_SLIDES}</p>
                  <p className="text-foreground font-medium">{slideNames[currentSlide - 1]}</p>
                </div>
                <Button onClick={nextSlide} size="icon" variant="outline">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex gap-2">
                {slideNames.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx + 1)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentSlide === idx + 1 ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button onClick={() => setShowPreview(false)} variant="outline">
                Edytuj dane
              </Button>
            </div>

            <div 
              ref={previewContainerRef}
              className="border border-border/50 rounded-xl overflow-hidden shadow-lg bg-black"
            >
              <div 
                className="relative w-full bg-black"
                style={{ paddingBottom: '56.25%' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="origin-center"
                    style={{
                      width: '1600px',
                      height: '900px',
                      transform: `scale(${previewScale})`,
                    }}
                  >
                    <PresentationPreview data={formData} currentSlide={currentSlide} />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Użyj strzałek ← → do nawigacji między slajdami
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default PresentationGenerator;
