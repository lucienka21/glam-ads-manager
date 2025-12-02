import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Download, Maximize2, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCard, FormRow } from "@/components/ui/FormCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ReportPreview } from "@/components/report/ReportPreview";
import { ReportPreviewLandscape } from "@/components/report/ReportPreviewLandscape";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { useThumbnailGenerator } from "@/hooks/useThumbnailGenerator";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const reportSchema = z.object({
  clientName: z.string().min(1, "Nazwa klienta wymagana").max(100),
  city: z.string().min(1, "Miasto salonu wymagane").max(100),
  period: z.string().min(1, "Pole wymagane"),
  budget: z.string().min(1, "Pole wymagane"),
  impressions: z.string().min(1, "Pole wymagane"),
  reach: z.string().min(1, "Pole wymagane"),
  clicks: z.string().min(1, "Pole wymagane"),
  ctr: z.string().min(1, "Pole wymagane"),
  conversions: z.string().min(1, "Pole wymagane"),
  costPerConversion: z.string().min(1, "Pole wymagane"),
  bookings: z.string().min(1, "Pole wymagane"),
  campaignObjective: z.string().optional(),
  campaignStatus: z.string().optional(),
  engagementRate: z.string().optional(),
  weeklyReachData: z.string().optional(),
  weeklyClicksData: z.string().optional(),
  dailyBookingsData: z.string().optional(),
  recommendations: z.string().optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

const ReportGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reportData, setReportData] = useState<ReportFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [scale, setScale] = useState(1);
  const [portraitScale, setPortraitScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const { saveDocument, updateThumbnail } = useCloudDocumentHistory();
  const { generateThumbnail: genThumb } = useThumbnailGenerator();

  // Load document from session storage if coming from history
  useEffect(() => {
    const stored = sessionStorage.getItem("loadDocument");
    if (stored) {
      try {
        const doc = JSON.parse(stored);
        if (doc.type === "report") {
          reset(doc.data);
          setReportData(doc.data);
        }
      } catch (e) {
        console.error("Error loading document:", e);
      }
      sessionStorage.removeItem("loadDocument");
    }
  }, []);

  // Scale for landscape fullscreen view
  useEffect(() => {
    if (!isLandscape || !containerRef.current) return;
    
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        // Scale based on both width AND height to prevent cutoff
        const scaleByWidth = containerWidth / 1600;
        const scaleByHeight = containerHeight / 900;
        const newScale = Math.min(scaleByWidth, scaleByHeight, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isLandscape]);

  // Scale for portrait preview - auto-fit to available space
  useEffect(() => {
    if (!reportData || isLandscape || !portraitContainerRef.current) return;
    
    const updatePortraitScale = () => {
      const container = portraitContainerRef.current;
      if (!container) return;
      
      // Get parent container width (the right column of the grid)
      const parentWidth = container.parentElement?.clientWidth || window.innerWidth * 0.45;
      // Portrait document width is 794px
      const newScale = Math.min(parentWidth / 794, 0.8);
      setPortraitScale(Math.max(newScale, 0.3));
    };

    // Use ResizeObserver for better responsiveness
    const resizeObserver = new ResizeObserver(updatePortraitScale);
    resizeObserver.observe(portraitContainerRef.current.parentElement || portraitContainerRef.current);
    
    // Initial calculation
    setTimeout(updatePortraitScale, 50);
    
    return () => resizeObserver.disconnect();
  }, [reportData, isLandscape]);

  const parseReportPeriod = (period: string): string => {
    const monthMap: { [key: string]: string } = {
      "styczeń": "01", "styczen": "01",
      "luty": "02",
      "marzec": "03",
      "kwiecień": "04", "kwiecien": "04",
      "maj": "05",
      "czerwiec": "06",
      "lipiec": "07",
      "sierpień": "08", "sierpien": "08",
      "wrzesień": "09", "wrzesien": "09",
      "październik": "10", "pazdziernik": "10",
      "listopad": "11",
      "grudzień": "12", "grudzien": "12",
    };

    const normalized = period.toLowerCase().trim();
    const parts = normalized.split(/\s+/);

    let month = "01";
    let year = new Date().getFullYear().toString();

    for (const part of parts) {
      if (monthMap[part]) {
        month = monthMap[part];
      }
      if (/^\d{4}$/.test(part)) {
        year = part;
      }
    }

    return `${year}-${month}`;
  };

  const sanitizeSalonName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const generateAIRecommendations = async () => {
    const formData = watch();
    setIsGeneratingAI(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-recommendations', {
        body: { campaignData: formData }
      });

      if (error) throw error;

      if (data.recommendations) {
        setValue('recommendations', data.recommendations);
        toast({
          title: "Rekomendacje wygenerowane!",
          description: "AI przygotowało rekomendacje na podstawie danych kampanii",
        });
      }
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się wygenerować rekomendacji AI",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const onSubmit = async (data: ReportFormData) => {
    setReportData(data);
    
    // Save to new document history (async)
    const docId = await saveDocument(
      "report",
      data.clientName,
      `Raport ${data.period}`,
      data as Record<string, string>
    );
    
    toast({
      title: "Podgląd gotowy!",
      description: "Sprawdź podgląd raportu poniżej i pobierz PDF",
    });
    
    // Generate thumbnail using landscape preview for consistent horizontal thumbnails
    if (docId) {
      // Wait for React to render the landscape preview
      setTimeout(async () => {
        const thumbnail = await genThumb({
          elementId: "report-preview-landscape",
          backgroundColor: "#050509",
          pixelRatio: 0.2,
          maxRetries: 5,
          retryDelay: 800
        });
        
        if (thumbnail) {
          await updateThumbnail(docId, thumbnail);
        }
      }, 500);
    }
  };

  const loadFromHistory = (data: Record<string, string>) => {
    reset(data as ReportFormData);
    toast({
      title: "Załadowano raport",
      description: "Dane zostały wczytane z historii",
    });
  };

  const generatePDF = async () => {
    // Use hidden full-size element for better quality
    const element = document.getElementById("report-preview-pdf") || document.getElementById("report-preview");
    if (!element || !reportData) return;

    setIsGenerating(true);

    try {
      // Get actual content height
      const actualHeight = element.scrollHeight || element.offsetHeight;
      const actualWidth = 794;
      
      const canvas = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#000000",
        width: actualWidth,
        height: actualHeight,
      });

      const img = new Image();
      img.src = canvas;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [actualWidth, actualHeight],
        compress: true,
      });

      pdf.addImage(
        canvas,
        "PNG",
        0,
        0,
        actualWidth,
        actualHeight,
        undefined,
        "FAST"
      );

      const periodCode = parseReportPeriod(reportData.period || "");
      const salonName = sanitizeSalonName(reportData.clientName);
      pdf.save(`${periodCode}-${salonName}-pionowy.pdf`);

      toast({
        title: "PDF wygenerowany!",
        description: "Raport został pobrany",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wygenerować PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLandscapePDF = async () => {
    const element = document.getElementById("report-preview-landscape");
    if (!element || !reportData) return;

    setIsGenerating(true);

    try {
      const imgData = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#050509",
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [1600, 900],
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );

      const periodCode = parseReportPeriod(reportData.period || "");
      const salonName = sanitizeSalonName(reportData.clientName);
      pdf.save(`${periodCode}-${salonName}-16-9.pdf`);

      toast({
        title: "PDF 16:9 wygenerowany!",
        description: "Raport został pobrany",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wygenerować PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsImage = async () => {
    const element = document.getElementById("report-preview-landscape");
    if (!element || !reportData) return;

    setIsGenerating(true);

    try {
      const imgData = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#050509",
      });

      const periodCode = parseReportPeriod(reportData.period || "");
      const salonName = sanitizeSalonName(reportData.clientName);

      const link = document.createElement("a");
      link.download = `${periodCode}-${salonName}.png`;
      link.href = imgData;
      link.click();

      toast({
        title: "Obraz pobrany!",
        description: "Raport został zapisany jako PNG w formacie poziomym 16:9",
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać obrazu",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Landscape mode - completely different layout to avoid scrolling issues
  if (isLandscape && reportData) {
    return (
      <div 
        className="fixed inset-0 bg-background overflow-hidden"
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        <div className="h-full flex flex-col px-4 py-3">
          {/* Header */}
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3 flex-shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-foreground font-sans">
                Podgląd pełnoekranowy
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsLandscape(false)}
                size="sm"
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Powrót
              </Button>
              <div className="h-6 w-px bg-border" />
              <Button
                onClick={downloadAsImage}
                disabled={isGenerating}
                size="sm"
                variant="success"
              >
                <FileImage className="w-4 h-4 mr-1.5" />
                PNG
              </Button>
              <Button
                onClick={generateLandscapePDF}
                disabled={isGenerating}
                size="sm"
              >
                <Download className="w-4 h-4 mr-1.5" />
                PDF 16:9
              </Button>
              <Button
                onClick={generatePDF}
                disabled={isGenerating}
                size="sm"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Pionowy
              </Button>
            </div>
          </div>

          {/* Report container - takes remaining space */}
          <div 
            ref={containerRef}
            className="flex-1 flex items-center justify-center overflow-hidden"
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5"
              style={{ 
                backgroundColor: '#000000',
                width: `${1600 * scale}px`,
                height: `${900 * scale}px`
              }}
            >
              <div 
                className="w-[1600px] h-[900px] origin-top-left"
                style={{
                  backgroundColor: '#000000',
                  transform: `scale(${scale})`
                }}
              >
                <ReportPreviewLandscape data={reportData} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-2 text-xs text-muted-foreground flex-shrink-0">
            <p>Powered by <span className="text-pink-400 font-medium">Aurine</span> · aurine.pl</p>
          </div>
        </div>

        {/* Hidden portrait preview for PDF generation - must match exact report dimensions */}
        <div 
          className="fixed pointer-events-none" 
          style={{ left: '-9999px', top: 0 }}
        >
          <div 
            id="report-preview-pdf" 
            style={{ 
              width: 794, 
              backgroundColor: '#09090b'
            }}
          >
            <ReportPreview data={reportData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Generator Raportów</h1>
          <p className="text-muted-foreground">Profesjonalne raporty kampanii Facebook Ads</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FormCard title="Dane kampanii Facebook Ads">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormRow cols={1}>
                  <div>
                    <Label htmlFor="clientName">Nazwa salonu</Label>
                    <Input
                      id="clientName"
                      {...register("clientName")}
                      placeholder="np. Beauty Studio"
                    />
                    {errors.clientName && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.clientName.message}
                      </p>
                    )}
                  </div>
                </FormRow>

                  <FormRow cols={1}>
                    <div>
                      <Label htmlFor="city">Miasto salonu</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        placeholder="np. Warszawa"
                      />
                      {errors.city && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </FormRow>

                  <FormRow>
                    <div>
                      <Label htmlFor="period">Okres</Label>
                      <Input
                        id="period"
                        {...register("period")}
                        placeholder="Styczeń 2024"
                      />
                      {errors.period && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.period.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="budget">Budżet (PLN)</Label>
                      <Input
                        id="budget"
                        {...register("budget")}
                        placeholder="5,000"
                      />
                      {errors.budget && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>
                  </FormRow>

                  <FormRow>
                    <div>
                      <Label htmlFor="impressions">Wyświetlenia</Label>
                      <Input
                        id="impressions"
                        {...register("impressions")}
                        placeholder="150,000"
                      />
                      {errors.impressions && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.impressions.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="reach">Zasięg</Label>
                      <Input
                        id="reach"
                        {...register("reach")}
                        placeholder="85,000"
                      />
                      {errors.reach && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.reach.message}
                        </p>
                      )}
                    </div>
                  </FormRow>

                  <FormRow>
                    <div>
                      <Label htmlFor="clicks">Kliknięcia</Label>
                      <Input
                        id="clicks"
                        {...register("clicks")}
                        placeholder="3,500"
                      />
                      {errors.clicks && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.clicks.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="ctr">CTR (%)</Label>
                      <Input
                        id="ctr"
                        {...register("ctr")}
                        placeholder="2.33"
                      />
                      {errors.ctr && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.ctr.message}
                        </p>
                      )}
                    </div>
                  </FormRow>

                  <FormRow>
                    <div>
                      <Label htmlFor="conversions">Konwersje</Label>
                      <Input
                        id="conversions"
                        {...register("conversions")}
                        placeholder="245"
                      />
                      {errors.conversions && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.conversions.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="costPerConversion">Koszt / konwersja (PLN)</Label>
                      <Input
                        id="costPerConversion"
                        {...register("costPerConversion")}
                        placeholder="20.41"
                      />
                      {errors.costPerConversion && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.costPerConversion.message}
                        </p>
                      )}
                    </div>
                  </FormRow>

                  <FormRow cols={1}>
                    <div>
                      <Label htmlFor="bookings">Rezerwacje wizyt</Label>
                      <Input
                        id="bookings"
                        {...register("bookings")}
                        placeholder="178"
                      />
                      {errors.bookings && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.bookings.message}
                        </p>
                      )}
                    </div>
                  </FormRow>

                  <FormRow cols={1}>
                    <div>
                      <Label htmlFor="campaignObjective">Cel kampanii (opcjonalnie)</Label>
                      <Input
                        id="campaignObjective"
                        {...register("campaignObjective")}
                        placeholder="np. Zwiększenie rezerwacji wizyt"
                      />
                    </div>
                  </FormRow>

                  <FormRow cols={1}>
                    <div>
                      <Label htmlFor="campaignStatus">Status kampanii (opcjonalnie)</Label>
                      <Select
                        value={watch("campaignStatus") || ""}
                        onValueChange={(value) => setValue("campaignStatus", value, { shouldValidate: true })}
                      >
                        <SelectTrigger className="bg-secondary/30 border-border/50">
                          <SelectValue placeholder="Wybierz status kampanii" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Aktywna">Aktywna</SelectItem>
                          <SelectItem value="Zakończona">Zakończona</SelectItem>
                          <SelectItem value="Wstrzymana">Wstrzymana</SelectItem>
                          <SelectItem value="Planowana">Planowana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormRow>

                  <div className="pt-5 border-t border-border/50">
                    <h3 className="text-foreground font-semibold mb-4 text-sm">
                      Dane opcjonalne (wykresy)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="engagementRate">Współczynnik zaangażowania (%)</Label>
                        <Input
                          id="engagementRate"
                          {...register("engagementRate")}
                          placeholder="np. 65"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weeklyReachData">Zasięg tygodniowy (4 wartości, oddziel przecinkami)</Label>
                        <Input
                          id="weeklyReachData"
                          {...register("weeklyReachData")}
                          placeholder="np. 15000,19000,25000,26000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weeklyClicksData">Kliknięcia tygodniowe (4 wartości, oddziel przecinkami)</Label>
                        <Input
                          id="weeklyClicksData"
                          {...register("weeklyClicksData")}
                          placeholder="np. 650,820,1100,930"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dailyBookingsData">Rezerwacje dzienne (7 dni, oddziel przecinkami)</Label>
                        <Input
                          id="dailyBookingsData"
                          {...register("dailyBookingsData")}
                          placeholder="np. 22,28,32,35,38,42,25"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="recommendations">Rekomendacje marketingowe</Label>
                          <Button
                            type="button"
                            onClick={generateAIRecommendations}
                            disabled={isGeneratingAI}
                            size="sm"
                            variant="secondary"
                            className="h-7 text-xs"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            {isGeneratingAI ? "Generuję..." : "Generuj AI"}
                          </Button>
                        </div>
                        <textarea
                          id="recommendations"
                          {...register("recommendations")}
                          rows={5}
                          placeholder="Wpisz rekomendacje lub kliknij 'Generuj AI'"
                          className="w-full px-4 py-2.5 bg-secondary/30 border border-border/50 text-foreground rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Generuj podgląd raportu
                  </Button>
                </form>
              </FormCard>
            </div>

            {reportData && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-xl font-semibold text-foreground font-sans">Podgląd</h2>
                  <div className="grid grid-cols-2 sm:flex gap-2">
                    <Button
                      onClick={() => setIsLandscape(true)}
                      size="sm"
                      variant="outline"
                    >
                      <Maximize2 className="w-4 h-4 mr-1.5" />
                      <span className="hidden sm:inline">Pełny ekran</span>
                      <span className="sm:hidden">16:9</span>
                    </Button>
                    <Button
                      onClick={generatePDF}
                      disabled={isGenerating}
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-1.5" />
                      {isGenerating ? "..." : "PDF"}
                    </Button>
                  </div>
                </div>
                <div 
                  ref={portraitContainerRef} 
                  className="relative w-full"
                >
                  <div 
                    className="border-2 border-border/60 rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/5 origin-top-left" 
                    id="report-preview"
                    style={{ 
                      backgroundColor: '#000000',
                      transform: `scale(${portraitScale})`,
                      width: '794px',
                      marginBottom: `calc(-100% * ${1 - portraitScale})`,
                    }}
                  >
                    <ReportPreview data={reportData} />
                  </div>
                </div>
                
                {/* Hidden full-size element for PDF generation - must match exact report dimensions */}
                <div 
                  className="fixed pointer-events-none" 
                  style={{ left: '-9999px', top: 0 }}
                >
                  <div 
                    id="report-preview-pdf" 
                    style={{ 
                      width: 794, 
                      backgroundColor: '#09090b'
                    }}
                  >
                    <ReportPreview data={reportData} />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportGenerator;
