import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileImage, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

type InvoiceType = "advance" | "final" | "full";

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("full");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const invoiceTypes = [
    {
      id: "advance" as InvoiceType,
      label: "Faktura Zaliczkowa",
      description: "Płatność zaliczki przed rozpoczęciem kampanii",
    },
    {
      id: "final" as InvoiceType,
      label: "Faktura Końcowa",
      description: "Rozliczenie końcowe po zaliczce",
    },
    {
      id: "full" as InvoiceType,
      label: "Faktura Pełna",
      description: "Pełna kwota usługi",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!formData.clientName || !formData.invoiceNumber || !formData.amount) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    if (invoiceType === "final" && !formData.advanceAmount) {
      toast.error("Podaj kwotę zaliczki dla faktury końcowej");
      return;
    }

    setShowPreview(true);
    toast.success("Podgląd faktury gotowy!");
  };

  const generatePDF = async () => {
    const element = document.getElementById("invoice-preview");
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
      const imgData = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

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
                <h1 className="text-xl font-bold">Generator Faktur</h1>
                <p className="text-sm text-zinc-400">Profesjonalne faktury dla Aurine Agency</p>
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
            {/* Invoice Type Selection */}
            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <h2 className="text-lg font-bold mb-4 text-pink-500">Typ faktury</h2>
              <div className="grid grid-cols-3 gap-3">
                {invoiceTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setInvoiceType(type.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      invoiceType === type.id
                        ? "border-pink-500 bg-pink-500/10"
                        : "border-zinc-800 hover:border-pink-500/50"
                    }`}
                  >
                    <h3 className="font-bold text-sm mb-1">{type.label}</h3>
                    <p className="text-xs text-zinc-400">{type.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Form Fields */}
            <Card className="p-6 bg-zinc-900/50 border-zinc-800">
              <h2 className="text-lg font-bold mb-4 text-white">Dane faktury</h2>
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
                  <Label htmlFor="invoiceNumber">Numer faktury *</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="FV/2025/001"
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
                  <Label htmlFor="issueDate">Data wystawienia</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                  />
                </div>

                <div>
                  <Label htmlFor="paymentDue">Termin płatności</Label>
                  <Input
                    id="paymentDue"
                    type="date"
                    value={formData.paymentDue}
                    onChange={(e) => handleInputChange("paymentDue", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                  />
                </div>

                <div>
                  <Label htmlFor="amount">
                    {invoiceType === "final" ? "Kwota całkowita" : "Kwota"} (PLN) *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="5000"
                  />
                </div>

                {invoiceType === "final" && (
                  <div>
                    <Label htmlFor="advanceAmount">Zaliczka (PLN) *</Label>
                    <Input
                      id="advanceAmount"
                      type="number"
                      value={formData.advanceAmount}
                      onChange={(e) => handleInputChange("advanceAmount", e.target.value)}
                      className="bg-zinc-950 border-zinc-700"
                      placeholder="2000"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <Label htmlFor="serviceDescription">Opis usługi</Label>
                  <Input
                    id="serviceDescription"
                    value={formData.serviceDescription}
                    onChange={(e) => handleInputChange("serviceDescription", e.target.value)}
                    className="bg-zinc-950 border-zinc-700"
                    placeholder="Usługi marketingowe Facebook Ads"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-purple-300">ℹ️ Wszystkie faktury są zwolnione z VAT</p>
              </div>

              {/* Generate Button */}
              <div className="mt-6">
                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Generuj podgląd faktury
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Podgląd faktury</h2>
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
                  <InvoicePreview data={{ ...formData, invoiceType }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvoiceGenerator;
