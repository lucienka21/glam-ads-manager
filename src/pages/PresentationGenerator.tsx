import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { PresentationPreview, getTotalSlides } from "@/components/presentation/PresentationPreview";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const PresentationGenerator = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalSlides = getTotalSlides();

  const [formData, setFormData] = useState({
    ownerName: "",
    salonName: "",
    city: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!formData.ownerName || !formData.salonName || !formData.city) {
      toast.error("Uzupełnij wszystkie pola");
      return;
    }

    setShowPreview(true);
    setCurrentSlide(0);
    toast.success("Prezentacja gotowa!");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1600, 900],
        compress: true,
      });

      for (let i = 0; i < totalSlides; i++) {
        setCurrentSlide(i);
        
        // Wait for slide to render
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const element = document.getElementById("presentation-preview");
        if (!element) continue;

        const imgData = await toPng(element, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#050509",
        });

        if (i > 0) {
          pdf.addPage([1600, 900], "landscape");
        }

        pdf.addImage(imgData, "PNG", 0, 0, 1600, 900, undefined, "FAST");
      }

      const sanitizedName = formData.salonName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      
      pdf.save(`prezentacja-${sanitizedName}.pdf`);
      toast.success("Prezentacja PDF pobrana!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Nie udało się wygenerować PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const slideNames = [
    "Strona tytułowa",
    "Najczęstsze błędy",
    "Dlaczego Facebook Ads?",
    "Co zapewniamy",
    "Case Study",
    "Opinie klientek",
    "Kontakt"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-zinc-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Generator Prezentacji</h1>
                <p className="text-sm text-zinc-400">Profesjonalne prezentacje cold mail</p>
              </div>
            </div>
            {showPreview && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generuję..." : "Pobierz PDF"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {!showPreview ? (
          <div className="max-w-xl mx-auto">
            <Card className="p-8 bg-zinc-900/50 border-zinc-800">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Stwórz spersonalizowaną prezentację</h2>
                <p className="text-zinc-400">Prezentacja będzie zawierać 7 profesjonalnych slajdów</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="ownerName">Imię właścicielki salonu *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange("ownerName", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="np. Anna"
                  />
                </div>

                <div>
                  <Label htmlFor="salonName">Nazwa salonu *</Label>
                  <Input
                    id="salonName"
                    value={formData.salonName}
                    onChange={(e) => handleInputChange("salonName", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="np. Beauty Studio Anna"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Miasto *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="np. Warszawa"
                  />
                </div>
              </div>

              {/* What's included */}
              <div className="mt-8 p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                <p className="text-sm text-pink-300 font-medium mb-3">Prezentacja zawiera:</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    Dlaczego Facebook Ads dla beauty?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    Najczęstsze błędy salonów
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    Co zapewniamy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    Case study z wynikami
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    Opinie klientek
                  </li>
                </ul>
              </div>

              {/* Generate Button */}
              <div className="mt-8">
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg py-6"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Generuj prezentację
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Slide Navigator */}
            <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={prevSlide}
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="text-center min-w-[200px]">
                  <p className="text-sm text-zinc-400">Slajd {currentSlide + 1} z {totalSlides}</p>
                  <p className="text-white font-medium">{slideNames[currentSlide]}</p>
                </div>
                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Slide thumbnails */}
              <div className="flex gap-2">
                {slideNames.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === idx 
                        ? "bg-pink-500 scale-125" 
                        : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
              >
                Edytuj dane
              </Button>
            </div>

            {/* Preview */}
            <div className="border-2 border-zinc-700 rounded-xl overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
                <div className="transform scale-[0.55] origin-center">
                  <PresentationPreview data={formData} currentSlide={currentSlide} />
                </div>
              </div>
            </div>

            {/* Keyboard hint */}
            <div className="text-center text-sm text-zinc-500">
              Użyj strzałek ← → do nawigacji między slajdami
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PresentationGenerator;
