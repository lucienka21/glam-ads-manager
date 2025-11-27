import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Download, Maximize2, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ReportPreview } from "@/components/report/ReportPreview";
import { ReportPreviewLandscape } from "@/components/report/ReportPreviewLandscape";
import { ReportHistory } from "@/components/report/ReportHistory";
import { useReportHistory } from "@/hooks/useReportHistory";
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
  const { history, saveReport, deleteReport, clearHistory } = useReportHistory();
  const containerClass = isLandscape ? "mx-auto" : "max-w-7xl mx-auto";

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
    saveReport(data as Record<string, string>);
    toast({
      title: "Podgląd gotowy!",
      description: "Sprawdź podgląd raportu poniżej i pobierz PDF",
    });
  };

  const loadFromHistory = (data: Record<string, string>) => {
    reset(data as ReportFormData);
    toast({
      title: "Załadowano raport",
      description: "Dane zostały wczytane z historii",
    });
  };

  const generatePDF = async () => {
    const element = document.getElementById("report-preview");
    if (!element || !reportData) return;

    setIsGenerating(true);

    try {
      const canvas = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#050509",
      });

      const img = new Image();
      img.src = canvas;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgWidth = img.width;
      const imgHeight = img.height;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [imgWidth, imgHeight],
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(
        canvas,
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

  return (
    <div className="min-h-screen bg-black p-8">
      <div className={containerClass}>
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-zinc-800 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Generator Raportów Facebook Ads
            </h1>
            <p className="text-zinc-400 text-lg">
              Profesjonalne raporty dla salonów beauty - Aurine Agency
            </p>
          </div>
        </div>

        {isLandscape && reportData ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Podgląd - tryb pełnoekranowy (poziomy)
                </h2>
                <p className="text-zinc-400 text-sm">
                  Widok poziomy dopasowany do szerokości ekranu komputera.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setIsLandscape(false)}
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Powrót
                </Button>
                <Button
                  onClick={downloadAsImage}
                  disabled={isGenerating}
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-950"
                >
                  <FileImage className="w-4 h-4 mr-2" />
                  {isGenerating ? "..." : "PNG 16:9"}
                </Button>
                <Button
                  onClick={generateLandscapePDF}
                  disabled={isGenerating}
                  size="sm"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? "..." : "PDF 16:9"}
                </Button>
                <Button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isGenerating ? "..." : "PDF pionowy"}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-zinc-950/70 p-4 flex items-center justify-center">
              <div className="w-full max-w-[1920px]">
                <ReportPreviewLandscape data={reportData} />
              </div>
            </div>

            <div className="fixed -left-[3000px] top-0">
              <ReportPreview data={reportData} />
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-8 bg-zinc-900/50 border-zinc-800">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Dane kampanii Facebook Ads
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="clientName" className="text-white">
                      Nazwa salonu
                    </Label>
                    <Input
                      id="clientName"
                      {...register("clientName")}
                      placeholder="np. Beauty Studio"
                      className="bg-zinc-950 border-zinc-700 text-white"
                    />
                    {errors.clientName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.clientName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-white">
                      Miasto salonu
                    </Label>
                    <Input
                      id="city"
                      {...register("city")}
                      placeholder="np. Warszawa"
                      className="bg-zinc-950 border-zinc-700 text-white"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="period" className="text-white">
                        Okres
                      </Label>
                      <Input
                        id="period"
                        {...register("period")}
                        placeholder="Styczeń 2024"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.period && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.period.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="budget" className="text-white">
                        Budżet (PLN)
                      </Label>
                      <Input
                        id="budget"
                        {...register("budget")}
                        placeholder="5,000"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.budget && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="impressions" className="text-white">
                        Wyświetlenia
                      </Label>
                      <Input
                        id="impressions"
                        {...register("impressions")}
                        placeholder="150,000"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.impressions && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.impressions.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="reach" className="text-white">
                        Zasięg
                      </Label>
                      <Input
                        id="reach"
                        {...register("reach")}
                        placeholder="85,000"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.reach && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.reach.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="clicks" className="text-white">
                        Kliknięcia
                      </Label>
                      <Input
                        id="clicks"
                        {...register("clicks")}
                        placeholder="3,500"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.clicks && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.clicks.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="ctr" className="text-white">
                        CTR (%)
                      </Label>
                      <Input
                        id="ctr"
                        {...register("ctr")}
                        placeholder="2.33"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.ctr && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.ctr.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="conversions" className="text-white">
                        Konwersje
                      </Label>
                      <Input
                        id="conversions"
                        {...register("conversions")}
                        placeholder="245"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.conversions && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.conversions.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="costPerConversion" className="text-white">
                        Koszt / konwersja (PLN)
                      </Label>
                      <Input
                        id="costPerConversion"
                        {...register("costPerConversion")}
                        placeholder="20.41"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.costPerConversion && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.costPerConversion.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="bookings" className="text-white">
                        Rezerwacje wizyt
                      </Label>
                      <Input
                        id="bookings"
                        {...register("bookings")}
                        placeholder="178"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                      {errors.bookings && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.bookings.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="campaignObjective" className="text-white">
                        Cel kampanii (opcjonalnie)
                      </Label>
                      <Input
                        id="campaignObjective"
                        {...register("campaignObjective")}
                        placeholder="np. Zwiększenie rezerwacji wizyt"
                        className="bg-zinc-950 border-zinc-700 text-white"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="campaignStatus" className="text-white">
                        Status kampanii (opcjonalnie)
                      </Label>
                      <Select
                        value={watch("campaignStatus") || ""}
                        onValueChange={(value) => setValue("campaignStatus", value, { shouldValidate: true })}
                      >
                        <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
                          <SelectValue placeholder="Wybierz status kampanii" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-zinc-700 text-white">
                          <SelectItem value="Aktywna">Aktywna</SelectItem>
                          <SelectItem value="Zakończona">Zakończona</SelectItem>
                          <SelectItem value="Wstrzymana">Wstrzymana</SelectItem>
                          <SelectItem value="Planowana">Planowana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-700">
                    <h3 className="text-white font-semibold mb-4 text-sm">
                      Dane opcjonalne (wykresy)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="engagementRate" className="text-zinc-300 text-sm">
                          Współczynnik zaangażowania (%)
                        </Label>
                        <Input
                          id="engagementRate"
                          {...register("engagementRate")}
                          placeholder="np. 65"
                          className="bg-zinc-950 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weeklyReachData" className="text-zinc-300 text-sm">
                          Zasięg tygodniowy (4 wartości, oddziel przecinkami)
                        </Label>
                        <Input
                          id="weeklyReachData"
                          {...register("weeklyReachData")}
                          placeholder="np. 15000,19000,25000,26000"
                          className="bg-zinc-950 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weeklyClicksData" className="text-zinc-300 text-sm">
                          Kliknięcia tygodniowe (4 wartości, oddziel przecinkami)
                        </Label>
                        <Input
                          id="weeklyClicksData"
                          {...register("weeklyClicksData")}
                          placeholder="np. 650,820,1100,930"
                          className="bg-zinc-950 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dailyBookingsData" className="text-zinc-300 text-sm">
                          Rezerwacje dzienne (7 dni, oddziel przecinkami)
                        </Label>
                        <Input
                          id="dailyBookingsData"
                          {...register("dailyBookingsData")}
                          placeholder="np. 22,28,32,35,38,42,25"
                          className="bg-zinc-950 border-zinc-700 text-white"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="recommendations" className="text-zinc-300 text-sm">
                            Rekomendacje marketingowe
                          </Label>
                          <Button
                            type="button"
                            onClick={generateAIRecommendations}
                            disabled={isGeneratingAI}
                            size="sm"
                            variant="outline"
                            className="border-purple-500 text-purple-400 hover:bg-purple-950 h-7 text-xs"
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
                          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    Generuj podgląd raportu
                  </Button>
                </form>
              </Card>

              <ReportHistory
                history={history}
                onSelect={loadFromHistory}
                onDelete={deleteReport}
                onClear={clearHistory}
              />
            </div>

            {reportData && (
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <h2 className="text-2xl font-bold text-white">Podgląd</h2>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setIsLandscape(true)}
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Pełny ekran
                    </Button>
                    <Button
                      onClick={generatePDF}
                      disabled={isGenerating}
                      size="sm"
                      className="bg-pink-600 hover:bg-pink-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isGenerating ? "..." : "Pobierz PDF"}
                    </Button>
                  </div>
                </div>
                <div className="border-2 border-zinc-700 rounded-lg overflow-hidden">
                  <ReportPreview data={reportData} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
