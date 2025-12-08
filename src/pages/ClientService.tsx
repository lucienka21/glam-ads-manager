import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mail, Phone, MessageSquare, FileSignature, CheckCircle2, 
  AlertCircle, Lightbulb, Target, Heart, Clock, 
  Users, TrendingUp, Shield, Star, XCircle,
  Package, ChevronRight, Sparkles, ArrowRight
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Cold Mail + Prezentacja",
    icon: Mail,
    timing: "Dzień 1",
    gradient: "from-blue-500 to-cyan-500",
    details: [
      "Personalizacja - użyj nazwy salonu i miasta",
      "Krótka wiadomość (max 150 słów)",
      "Załącz prezentację PDF",
      "Jeden jasny CTA"
    ],
    tips: ["Wysyłaj wt-czw, 9-11 lub 14-16", "Sprawdź profil przed wysłaniem"],
    donts: ["Bez prezentacji", "Długie elaboraty", "\"Szanowna Pani\""]
  },
  {
    id: 2,
    title: "SMS Follow-up",
    icon: MessageSquare,
    timing: "Dzień 3",
    gradient: "from-pink-500 to-rose-500",
    details: [
      "2 dni po cold mailu",
      "Max 160 znaków",
      "Nawiąż do maila",
      "Bezpośrednie pytanie"
    ],
    tips: ["Wysyłaj 10-17", "Unikaj weekendów"],
    donts: ["SMS-y wieczorem", "Długie wiadomości"]
  },
  {
    id: 3,
    title: "Follow-up Email #1",
    icon: Clock,
    timing: "Dzień 6-7",
    gradient: "from-purple-500 to-violet-500",
    details: [
      "Nawiąż do poprzedniej wiadomości",
      "Dodaj nową wartość - case study",
      "Zadaj otwarte pytanie",
      "Max 80 słów"
    ],
    tips: ["Bądź pomocny, nie nachalny", "Osobisty ton"],
    donts: ["Nie przepraszaj", "Nie powtarzaj treści"]
  },
  {
    id: 4,
    title: "Follow-up Email #2",
    icon: Mail,
    timing: "Dzień 10-12",
    gradient: "from-indigo-500 to-blue-500",
    details: [
      "Ostatni email w sekwencji",
      "Bezpośrednie pytanie",
      "Technika break-up email",
      "Jasna opcja rezygnacji"
    ],
    tips: ["Break-up email działa lepiej", "Bądź szczery"],
    donts: ["Desperacja", "Obwinianie", "Więcej niż 2 follow-upy"]
  },
  {
    id: 5,
    title: "Rozmowa telefoniczna",
    icon: Phone,
    timing: "Gdy odpowie",
    gradient: "from-green-500 to-emerald-500",
    details: [
      "Przygotuj się - sprawdź profil",
      "Zacznij od pytań",
      "Słuchaj więcej (70/30)",
      "Diagnozuj problemy",
      "Ustal następny krok"
    ],
    tips: ["Dzwoń stojąc", "Uśmiechaj się", "Godziny 10-12, 14-16"],
    donts: ["Nie recytuj skryptu", "Nie przerywaj"]
  },
  {
    id: 6,
    title: "Negocjacje i Oferta",
    icon: Target,
    timing: "Po rozmowie",
    gradient: "from-orange-500 to-amber-500",
    details: [
      "Spersonalizowana oferta",
      "Odnieś się do problemów z rozmowy",
      "2-3 opcje cenowe",
      "Case studies z podobnych salonów"
    ],
    tips: ["Wyślij tego samego dnia", "Umów się na rozmowę o ofercie"],
    donts: ["Za dużo czasu na namysł", "Oferta bez rozmowy"]
  },
  {
    id: 7,
    title: "Umowa i Onboarding",
    icon: FileSignature,
    timing: "Finał",
    gradient: "from-emerald-500 to-teal-500",
    details: [
      "Wyślij umowę natychmiast",
      "Omów wszystkie punkty telefonicznie",
      "Ustal datę startu kampanii",
      "Dodaj się do Business Managera",
      "Wyślij Welcome Pack"
    ],
    tips: ["Deadline max 3 dni", "Potwierdź mailowo"],
    donts: ["Nie zostawiaj na tydzień", "Nie zaczynaj bez umowy"]
  }
];

const objections = [
  { text: "To za drogo", emoji: "💰", response: "Policzmy - ile kosztuje Was teraz pozyskanie jednego klienta? Nasi klienci płacą 15-25 zł za rezerwację." },
  { text: "Muszę się zastanowić", emoji: "🤔", response: "Nad czym konkretnie? Może mogę pomóc odpowiedzieć na wątpliwości teraz." },
  { text: "Nie mam czasu", emoji: "⏰", response: "Właśnie dlatego my się tym zajmujemy! Potrzebujemy od Was tylko 30 minut na start." },
  { text: "Ads nie działają", emoji: "📱", response: "Czy kampanię prowadziła agencja specjalizująca się w beauty? Bo to ma ogromne znaczenie." },
  { text: "Mam już kogoś", emoji: "👥", response: "Super! A jakie wyniki osiągacie? Bo chętnie porównamy nasze rezultaty." },
  { text: "Muszę pogadać z mężem", emoji: "👫", response: "Może umówmy się na rozmowę we trójkę? Chętnie odpowiem na wszystkie pytania." },
];

const goldenRules = [
  { icon: Heart, title: "Bądź autentyczny", desc: "Klienci wyczuwają sztuczność. Mów swoimi słowami.", gradient: "from-pink-500 to-rose-500" },
  { icon: Users, title: "Słuchaj więcej", desc: "Zasada 70/30 - klient mówi więcej niż Ty.", gradient: "from-blue-500 to-cyan-500" },
  { icon: Lightbulb, title: "Rozwiązuj problemy", desc: "Oferuj rozwiązanie, nie usługę.", gradient: "from-amber-500 to-orange-500" },
  { icon: TrendingUp, title: "Mów o wynikach", desc: "Konkretne liczby są bardziej przekonujące.", gradient: "from-green-500 to-emerald-500" },
  { icon: Shield, title: "Buduj zaufanie", desc: "Nie obiecuj cudów. Szczerość wygrywa.", gradient: "from-purple-500 to-violet-500" },
  { icon: Star, title: "Follow-up jest kluczem", desc: "80% sprzedaży wymaga 5+ kontaktów.", gradient: "from-yellow-500 to-amber-500" },
];

const questions = [
  { q: "Jak obecnie pozyskujecie nowych klientów?", category: "Otwierające" },
  { q: "Co sprawia największy problem w promocji?", category: "Otwierające" },
  { q: "Co Was najbardziej frustruje w marketingu?", category: "Problemy" },
  { q: "Ile nowych klientek miesięcznie chcecie?", category: "Cele" },
  { q: "Jaki budżet możecie przeznaczyć?", category: "Cele" },
  { q: "Co musiałoby się stać, żebyście zdecydowali?", category: "Zamykające" },
];

type TabType = "process" | "objections" | "rules" | "questions";

export default function ClientService() {
  const [activeTab, setActiveTab] = useState<TabType>("process");
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const navigate = useNavigate();

  const currentStep = processSteps.find(s => s.id === selectedStep) || processSteps[0];

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Navigation */}
        <div className="w-full lg:w-80 flex-shrink-0 border-r border-border/50 bg-card/30 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Obsługa Klienta</h1>
                <p className="text-xs text-muted-foreground">Przewodnik sprzedaży</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="p-3 border-b border-border/50">
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-muted/50 rounded-lg">
              {[
                { id: "process" as TabType, label: "Proces", icon: ArrowRight },
                { id: "objections" as TabType, label: "Obiekcje", icon: AlertCircle },
                { id: "rules" as TabType, label: "Zasady", icon: Star },
                { id: "questions" as TabType, label: "Pytania", icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-md text-[10px] font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content - Left Side */}
          <ScrollArea className="flex-1">
            <div className="p-3">
              {activeTab === "process" && (
                <div className="space-y-1.5">
                  {processSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStep(step.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                        selectedStep === step.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted/50 border border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-primary">#{step.id}</span>
                          <span className="text-xs text-muted-foreground">{step.timing}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">{step.title}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedStep === step.id ? "text-primary rotate-90" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "objections" && (
                <div className="space-y-2">
                  {objections.map((obj, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{obj.emoji}</span>
                        <span className="text-sm font-medium text-foreground">"{obj.text}"</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-8">{obj.response}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "rules" && (
                <div className="space-y-2">
                  {goldenRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${rule.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <rule.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{rule.title}</p>
                        <p className="text-xs text-muted-foreground">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "questions" && (
                <div className="space-y-2">
                  {questions.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/30 border border-border/50">
                      <Badge variant="outline" className="text-[9px] mb-1.5">{q.category}</Badge>
                      <p className="text-sm text-foreground">"{q.q}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Welcome Pack Button */}
          <div className="p-3 border-t border-border/50">
            <Button 
              onClick={() => navigate('/welcome-pack-generator')}
              className="w-full bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white shadow-lg gap-2"
            >
              <Package className="w-4 h-4" />
              Generuj Welcome Pack
            </Button>
          </div>
        </div>

        {/* Right Panel - Detail View */}
        <div className="flex-1 overflow-hidden bg-background">
          {activeTab === "process" ? (
            <div className="h-full flex flex-col p-6">
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStep.gradient} flex items-center justify-center shadow-xl`}>
                  <currentStep.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`bg-gradient-to-r ${currentStep.gradient} text-white border-0`}>
                      Krok {currentStep.id}
                    </Badge>
                    <Badge variant="outline">{currentStep.timing}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{currentStep.title}</h2>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center gap-1">
                  {processSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStep(step.id)}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        step.id === selectedStep
                          ? `bg-gradient-to-r ${step.gradient}`
                          : step.id < selectedStep
                          ? "bg-primary/40"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-3 gap-6 flex-1">
                {/* Co robić */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl p-5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Co robić</h3>
                  </div>
                  <ul className="space-y-3">
                    {currentStep.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro tipy */}
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-2xl p-5 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Pro tipy</h3>
                  </div>
                  <ul className="space-y-3">
                    {currentStep.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Czego nie robić */}
                <div className="bg-gradient-to-br from-red-500/10 to-rose-500/5 rounded-2xl p-5 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Czego nie robić</h3>
                  </div>
                  <ul className="space-y-3">
                    {currentStep.donts.map((dont, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        {dont}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))}
                  disabled={selectedStep === 1}
                  className="gap-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Poprzedni krok
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedStep} z {processSteps.length}
                </span>
                <Button
                  onClick={() => setSelectedStep(Math.min(7, selectedStep + 1))}
                  disabled={selectedStep === 7}
                  className="gap-2 bg-gradient-to-r from-primary to-pink-600"
                >
                  Następny krok
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-500/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  {activeTab === "objections" && <AlertCircle className="w-10 h-10 text-primary/70" />}
                  {activeTab === "rules" && <Star className="w-10 h-10 text-primary/70" />}
                  {activeTab === "questions" && <MessageSquare className="w-10 h-10 text-primary/70" />}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {activeTab === "objections" && "Obsługa obiekcji"}
                  {activeTab === "rules" && "Złote zasady"}
                  {activeTab === "questions" && "Pytania do klienta"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Przeglądaj {activeTab === "objections" ? "obiekcje" : activeTab === "rules" ? "zasady" : "pytania"} w panelu po lewej stronie.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
