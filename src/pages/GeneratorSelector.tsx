import { useNavigate } from "react-router-dom";
import { FileText, Receipt, FileSignature, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const GeneratorSelector = () => {
  const navigate = useNavigate();

  const generators = [
    {
      id: "report",
      title: "Generator Raportów",
      description: "Profesjonalne raporty Facebook Ads dla salonów beauty",
      icon: FileText,
      path: "/report-generator",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500",
    },
    {
      id: "invoice",
      title: "Generator Faktur",
      description: "Faktury: zaliczka, końcowa, pełna kwota (zwolnione z VAT)",
      icon: Receipt,
      path: "/invoice-generator",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      id: "contract",
      title: "Generator Umowy",
      description: "Profesjonalne umowy marketingowe dla klientów",
      icon: FileSignature,
      path: "/contract-generator",
      gradient: "from-rose-500/20 to-orange-500/20",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Aurine
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              Centrum Generatorów
            </h1>
            <p className="text-zinc-400 text-lg">
              Wybierz narzędzie do generowania profesjonalnych dokumentów
            </p>
          </div>

          {/* Generator Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {generators.map((generator, index) => {
              const Icon = generator.icon;
              return (
                <div
                  key={generator.id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className={`relative bg-gradient-to-br ${generator.gradient} border border-zinc-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col`}
                    onClick={() => navigate(generator.path)}
                  >
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-black/50 border border-zinc-800 flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                        <Icon className={`w-8 h-8 ${generator.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {generator.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {generator.description}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                      <Button
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0"
                        onClick={() => navigate(generator.path)}
                      >
                        Otwórz Generator
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="text-zinc-500 text-sm">
              Wszystkie generatory tworzone przez{" "}
              <span className="text-pink-500 font-semibold">Aurine Agency</span>
              <br />
              Profesjonalne narzędzia dla salonów beauty
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <div>
              <p>© 2025 Aurine Agency · Kampanie Facebook ads dla salonów beauty</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://aurine.pl" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                aurine.pl
              </a>
              <span>·</span>
              <a href="https://wa.me/48731856524" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                <span>+48 731 856 524</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneratorSelector;
