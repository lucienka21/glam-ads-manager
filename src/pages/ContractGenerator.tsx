import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileImage, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ContractPreview } from "@/components/contract/ContractPreview";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const ContractGenerator = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!formData.clientName || !formData.contractNumber || !formData.contractValue) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    setShowPreview(true);
    toast.success("Podgląd umowy gotowy!");
  };

  const generatePDF = async () => {
    const element = document.getElementById("contract-preview");
    if (!element) return;

    setIsGenerating(true);

    try {
      const canvas = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const img = new Image();
      img.src = canvas;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [794, 1123],
        compress: true,
      });

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
      const imgData = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

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
                <h1 className="text-xl font-bold">Generator Umów</h1>
                <p className="text-sm text-zinc-400">Profesjonalne umowy marketingowe</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <h2 className="text-lg font-bold mb-4 text-pink-500">Dane klienta</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nazwa klienta *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="Salon Beauty XYZ"
                  />
                </div>

                <div>
                  <Label htmlFor="contractNumber">Numer umowy *</Label>
                  <Input
                    id="contractNumber"
                    value={formData.contractNumber}
                    onChange={(e) => handleInputChange("contractNumber", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="UM/2025/001"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="clientAddress">Adres klienta</Label>
                  <Input
                    id="clientAddress"
                    value={formData.clientAddress}
                    onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                  />
                </div>

                <div>
                  <Label htmlFor="clientNIP">NIP klienta</Label>
                  <Input
                    id="clientNIP"
                    value={formData.clientNIP}
                    onChange={(e) => handleInputChange("clientNIP", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
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
                    className="bg-zinc-950 border-zinc-700"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <h2 className="text-lg font-bold mb-4 text-pink-500">Warunki umowy</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contractValue">Wartość umowy (PLN) *</Label>
                  <Input
                    id="contractValue"
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => handleInputChange("contractValue", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="15000"
                  />
                </div>

                <div>
                  <Label htmlFor="contractDuration">Czas trwania</Label>
                  <Input
                    id="contractDuration"
                    value={formData.contractDuration}
                    onChange={(e) => handleInputChange("contractDuration", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="3 miesiące"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="paymentTerms">Warunki płatności</Label>
                  <Input
                    id="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="7 dni od wystawienia faktury"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="serviceScope">Zakres usług</Label>
                  <Textarea
                    id="serviceScope"
                    value={formData.serviceScope}
                    onChange={(e) => handleInputChange("serviceScope", e.target.value)}
                    className="bg-zinc-950 border-zinc-700 min-h-[100px]"
                    placeholder="Prowadzenie kampanii reklamowych Facebook Ads..."
                  />
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                <p className="text-sm text-rose-300">📄 Umowa zawiera standardowe klauzule prawne i zabezpieczenia</p>
              </div>

              {/* Generate Button */}
              <div className="mt-6">
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Generuj podgląd umowy
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Podgląd umowy</h2>
                <div className="flex gap-2">
                  <Button
                    onClick={downloadAsImage}
                    disabled={isGenerating}
                    size="sm"
                    className="bg-emerald-900 border border-emerald-600 text-emerald-400 hover:bg-emerald-800"
                  >
                    <FileImage className="w-4 h-4 mr-2" />
                    {isGenerating ? "..." : "PNG"}
                  </Button>
                  <Button
                    onClick={generatePDF}
                    disabled={isGenerating}
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isGenerating ? "..." : "PDF"}
                  </Button>
                </div>
              </div>
              <div className="border-2 border-zinc-700 rounded-lg overflow-hidden bg-white">
                <div className="transform scale-[0.6] origin-top-left w-[166%]">
                  <ContractPreview data={formData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContractGenerator;
