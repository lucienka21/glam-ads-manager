import { useNavigate } from "react-router-dom";
import { FileText, Receipt, FileSignature, Presentation } from "lucide-react";
import { Card } from "@/components/ui/card";
import agencyLogo from "@/assets/agency-logo.png";

const GeneratorSelector = () => {
  const navigate = useNavigate();

  const generators = [
    {
      id: "report",
      title: "Generator Raportów",
      description: "Profesjonalne raporty kampanii Facebook Ads z wykresami i metrykami",
      icon: FileText,
      path: "/report-generator",
      color: "from-pink-500 to-rose-600",
      features: ["Wykresy KPI", "Rekomendacje AI", "PDF/PNG export"],
    },
    {
      id: "invoice",
      title: "Generator Faktur",
      description: "Faktury zaliczkowe, końcowe i pełne zwolnione z VAT",
      icon: Receipt,
      path: "/invoice-generator",
      color: "from-purple-500 to-violet-600",
      features: ["3 typy faktur", "Auto-kalkulacja", "PDF export"],
    },
    {
      id: "contract",
      title: "Generator Umów",
      description: "Umowy o świadczenie usług marketingowych",
      icon: FileSignature,
      path: "/contract-generator",
      color: "from-blue-500 to-cyan-600",
      features: ["Klauzule prawne", "RODO", "PDF export"],
    },
    {
      id: "presentation",
      title: "Generator Prezentacji",
      description: "Spersonalizowane prezentacje do cold maili",
      icon: Presentation,
      path: "/presentation-generator",
      color: "from-amber-500 to-orange-600",
      features: ["6 slajdów", "Case study", "Animacje"],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <img 
            src={agencyLogo} 
            alt="Aurine Agency" 
            className="w-24 h-24 mx-auto mb-6 object-contain"
          />
          <h1 className="text-5xl font-bold text-white mb-4">
            Aurine Document Generator
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Profesjonalne narzędzia do generowania dokumentów dla agencji marketingowej specjalizującej się w salonach beauty
          </p>
        </div>
      </header>

      {/* Generators Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {generators.map((gen) => (
            <Card
              key={gen.id}
              onClick={() => navigate(gen.path)}
              className="group relative p-8 bg-zinc-900/50 border-zinc-800 cursor-pointer transition-all duration-300 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gen.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gen.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <gen.icon className="w-7 h-7 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {gen.title}
                </h2>
                <p className="text-zinc-400 mb-6">{gen.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {gen.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <p className="text-zinc-500 text-sm font-medium">
              Aurine Agency
            </p>
          </div>
          <p className="text-zinc-600 text-sm">
            Profesjonalny marketing dla salonów beauty
          </p>
          <p className="text-zinc-700 text-xs mt-2">aurine.pl</p>
        </footer>
      </main>
    </div>
  );
};

export default GeneratorSelector;