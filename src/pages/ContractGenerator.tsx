import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContractGenerator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    clientNIP: "",
    contractNumber: "",
    signDate: new Date().toISOString().split("T")[0],
    serviceScope: "Kampanie reklamowe Facebook Ads dla salonu beauty",
    contractValue: "",
    paymentTerms: "7 dni od wystawienia faktury",
    contractDuration: "3 miesiące",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (
      !formData.clientName ||
      !formData.contractNumber ||
      !formData.contractValue
    ) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }

    toast.success("Generowanie umowy...");
    // TODO: Implement PDF generation
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
              <h1 className="text-xl font-bold">Generator Umowy Marketingowej</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-white">
              Dane umowy marketingowej
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="clientName">Nazwa klienta *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  className="bg-black border-zinc-800"
                  placeholder="Salon Beauty XYZ"
                />
              </div>

              <div>
                <Label htmlFor="contractNumber">Numer umowy *</Label>
                <Input
                  id="contractNumber"
                  value={formData.contractNumber}
                  onChange={(e) =>
                    handleInputChange("contractNumber", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="UM/2025/001"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="clientAddress">Adres klienta</Label>
                <Input
                  id="clientAddress"
                  value={formData.clientAddress}
                  onChange={(e) =>
                    handleInputChange("clientAddress", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="ul. Przykładowa 123, 00-000 Warszawa"
                />
              </div>

              <div>
                <Label htmlFor="clientNIP">NIP klienta</Label>
                <Input
                  id="clientNIP"
                  value={formData.clientNIP}
                  onChange={(e) => handleInputChange("clientNIP", e.target.value)}
                  className="bg-black border-zinc-800"
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
                  className="bg-black border-zinc-800"
                />
              </div>

              <div>
                <Label htmlFor="contractValue">Wartość umowy (PLN) *</Label>
                <Input
                  id="contractValue"
                  type="number"
                  value={formData.contractValue}
                  onChange={(e) =>
                    handleInputChange("contractValue", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="15000"
                />
              </div>

              <div>
                <Label htmlFor="contractDuration">Czas trwania umowy</Label>
                <Input
                  id="contractDuration"
                  value={formData.contractDuration}
                  onChange={(e) =>
                    handleInputChange("contractDuration", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="3 miesiące"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="serviceScope">Zakres usług</Label>
                <Textarea
                  id="serviceScope"
                  value={formData.serviceScope}
                  onChange={(e) =>
                    handleInputChange("serviceScope", e.target.value)
                  }
                  className="bg-black border-zinc-800 min-h-[100px]"
                  placeholder="Kampanie reklamowe Facebook Ads dla salonu beauty"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="paymentTerms">Warunki płatności</Label>
                <Input
                  id="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    handleInputChange("paymentTerms", e.target.value)
                  }
                  className="bg-black border-zinc-800"
                  placeholder="7 dni od wystawienia faktury"
                />
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
              <p className="text-sm text-rose-300">
                📄 Umowa będzie zawierała standardowe klauzule prawne i zabezpieczenia
              </p>
            </div>

            {/* Generate Button */}
            <div className="mt-8">
              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg py-6"
              >
                <Download className="w-5 h-5 mr-2" />
                Wygeneruj umowę
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractGenerator;
