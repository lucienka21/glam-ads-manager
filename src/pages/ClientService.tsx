import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, MessageSquare, FileSignature, CheckCircle2, 
  AlertCircle, Lightbulb, Target, Heart, Clock, ArrowRight,
  Sparkles, Users, TrendingUp, Shield, Star, XCircle, X,
  Package, Play, Zap
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Cold Mail + Prezentacja",
    icon: Mail,
    description: "Pierwszy kontakt z potencjalnym klientem",
    color: "from-blue-500 to-blue-600",
    details: [
      "Personalizacja - użyj nazwy salonu i miasta w mailu",
      "Krótka, zwięzła wiadomość (max 150 słów)",
      "Załącz prezentację PDF - pokazuje profesjonalizm",
      "Prezentacja mówi za Ciebie - edukuje o Facebook Ads",
      "Jeden jasny CTA - zachęta do rozmowy",
      "Podpis z danymi kontaktowymi"
    ],
    tips: [
      "Wysyłaj wt-czw w godzinach 9-11 lub 14-16",
      "Unikaj poniedziałków (za dużo maili) i piątków (weekend)",
      "Sprawdź profil salonu i social media przed wysłaniem",
      "Prezentacja powinna być spersonalizowana pod miasto"
    ],
    donts: [
      "Nie wysyłaj bez prezentacji - mail sam w sobie jest za słaby",
      "Nie pisz długich elaboratów - nikt tego nie przeczyta",
      "Nie używaj 'Szanowna Pani' - brzmi jak spam"
    ]
  },
  {
    id: 2,
    title: "SMS Follow-up",
    icon: MessageSquare,
    description: "Celowy trigger 2 dni po cold mailu",
    color: "from-pink-500 to-pink-600",
    details: [
      "SMS wychodzi 2 dni po cold mailu jako celowy trigger",
      "Bardzo krótki - max 160 znaków",
      "Nawiąż do wysłanego maila z prezentacją",
      "Bezpośrednie pytanie o zainteresowanie",
      "Zaproponuj krótką rozmowę telefoniczną"
    ],
    tips: [
      "SMS wysyłaj w godzinach pracy salonu (10-17)",
      "Unikaj weekendów i poniedziałków",
      "Jeden SMS wystarczy - nie spamuj"
    ],
    donts: [
      "Nie wysyłaj SMS-ów wieczorem",
      "Nie pisz długich wiadomości",
      "Nie dzwoń bez uprzedzenia SMS-em"
    ]
  },
  {
    id: 3,
    title: "Follow-up Email #1",
    icon: Clock,
    description: "Przypomnienie po 3-4 dniach od SMS",
    color: "from-purple-500 to-purple-600",
    details: [
      "Nawiąż do poprzedniej wiadomości i prezentacji",
      "Dodaj nową wartość - case study, konkretna statystyka",
      "Zadaj otwarte pytanie o ich salon",
      "Krótsze niż cold mail - max 80 słów",
      "Nie załączaj ponownie prezentacji"
    ],
    tips: [
      "Bądź pomocny, nie nachalny",
      "Może być bardziej osobisty ton",
      "Możesz nawiązać do czegoś z ich social media"
    ],
    donts: [
      "Nie przepraszaj za 'nachodzenie'",
      "Nie pisz 'pewnie nie miała Pani czasu'",
      "Nie powtarzaj treści pierwszego maila"
    ]
  },
  {
    id: 4,
    title: "Follow-up Email #2",
    icon: Mail,
    description: "Drugi follow-up po kolejnych 3-4 dniach",
    color: "from-indigo-500 to-indigo-600",
    details: [
      "Ostatni email w sekwencji",
      "Bardziej bezpośrednie pytanie o zainteresowanie",
      "Możesz użyć techniki 'break-up email'",
      "Zaproponuj konkretny termin rozmowy",
      "Daj jasną opcję rezygnacji"
    ],
    tips: [
      "Break-up email często działa lepiej niż nachalne przypominanie",
      "Możesz napisać 'jeśli teraz nie jest dobry moment, wróćmy za 3 miesiące'",
      "Bądź szczery i bezpośredni"
    ],
    donts: [
      "Nie bądź zdesperowany",
      "Nie obwiniaj ich za brak odpowiedzi",
      "Nie wysyłaj więcej niż 2 follow-upy mailowe"
    ]
  },
  {
    id: 5,
    title: "Rozmowa telefoniczna",
    icon: Phone,
    description: "Kluczowy moment sprzedaży",
    color: "from-green-500 to-green-600",
    details: [
      "Przygotuj się - sprawdź ponownie profil salonu",
      "Zacznij od pytań, nie od sprzedaży",
      "Słuchaj więcej niż mówisz (zasada 70/30)",
      "Diagnozuj problemy - dopiero potem proponuj rozwiązanie",
      "Zawsze kończ z ustalonym następnym krokiem",
      "Potwierdź ustalenia SMS-em lub mailem"
    ],
    tips: [
      "Dzwoń stojąc - lepszy głos i energia",
      "Uśmiechaj się - naprawdę to słychać",
      "Miej notes przy sobie na notatki",
      "Najlepsze godziny: 10-12, 14-16"
    ],
    donts: [
      "Nie recytuj skryptu - bądź naturalny",
      "Nie mów tylko o sobie i ofercie",
      "Nie przerywaj klientowi",
      "Nie kończ rozmowy bez ustalenia następnego kroku"
    ]
  },
  {
    id: 6,
    title: "Negocjacje i Oferta",
    icon: Target,
    description: "Dopasowanie oferty do potrzeb",
    color: "from-orange-500 to-orange-600",
    details: [
      "Przygotuj spersonalizowaną ofertę",
      "Odnieś się do konkretnych problemów z rozmowy",
      "Przedstaw 2-3 opcje cenowe",
      "Pokaż case studies z podobnych salonów",
      "Zaproponuj okres próbny jeśli wahają się"
    ],
    tips: [
      "Wyślij ofertę tego samego dnia po rozmowie",
      "Umów się na rozmowę o ofercie - nie zostawiaj 'do przemyślenia'",
      "Przygotuj odpowiedzi na typowe obiekcje"
    ],
    donts: [
      "Nie dawaj zbyt dużo czasu 'do namysłu'",
      "Nie wysyłaj oferty bez wcześniejszej rozmowy",
      "Nie obniżaj ceny bez uzasadnienia"
    ]
  },
  {
    id: 7,
    title: "Umowa i Onboarding",
    icon: FileSignature,
    description: "Finalizacja i start współpracy",
    color: "from-emerald-500 to-emerald-600",
    details: [
      "Wyślij umowę natychmiast po akceptacji oferty",
      "Omów wszystkie punkty umowy telefonicznie",
      "Ustal konkretną datę startu kampanii",
      "Dodaj się do Business Managera klienta lub pomóż założyć nowe konto",
      "Wyślij Welcome Pack z harmonogramem współpracy",
      "Omów pierwszy tydzień i oczekiwania"
    ],
    tips: [
      "Deadline na podpisanie - max 3 dni",
      "Potwierdź wszystko mailowo",
      "Wyślij checklistę rzeczy do przygotowania",
      "Zaplanuj pierwszy raport i spotkanie"
    ],
    donts: [
      "Nie zostawiaj umowy 'do przemyślenia' na tydzień",
      "Nie zaczynaj bez podpisanej umowy",
      "Nie zapominaj o onboardingu - to buduje relację"
    ]
  }
];

const conversationTopics = [
  {
    category: "Pytania otwierające",
    icon: MessageSquare,
    color: "from-blue-500 to-blue-600",
    questions: [
      "Jak obecnie pozyskujecie nowych klientów?",
      "Co sprawia największy problem w promocji salonu?",
      "Jakie działania marketingowe próbowaliście do tej pory?",
      "Ile średnio wizyt miesięcznie potrzebujecie, żeby salon się rozwijał?",
      "Kto jest Waszą idealną klientką?"
    ]
  },
  {
    category: "Pytania o problemy",
    icon: AlertCircle,
    color: "from-red-500 to-red-600",
    questions: [
      "Co Was najbardziej frustruje w obecnym marketingu?",
      "Czy mieliście złe doświadczenia z agencjami?",
      "Co powstrzymuje Was przed reklamowaniem w internecie?",
      "Ile czasu poświęcacie na marketing tygodniowo?",
      "Co by się zmieniło, gdybyście mieli stały napływ nowych klientek?"
    ]
  },
  {
    category: "Pytania o cele",
    icon: Target,
    color: "from-green-500 to-green-600",
    questions: [
      "Ile nowych klientek miesięcznie chcielibyście pozyskiwać?",
      "Jaki budżet możecie przeznaczyć na reklamę?",
      "Jakie usługi chcecie najbardziej promować?",
      "Kiedy chcielibyście zobaczyć pierwsze efekty?",
      "Jakie są Wasze plany rozwoju salonu?"
    ]
  },
  {
    category: "Pytania zamykające",
    icon: CheckCircle2,
    color: "from-purple-500 to-purple-600",
    questions: [
      "Co musiałoby się stać, żebyście zdecydowali się na współpracę?",
      "Czy jest coś, co Was powstrzymuje przed decyzją?",
      "Kiedy moglibyśmy zacząć?",
      "Czy potrzebujecie jeszcze jakichś informacji?",
      "Mam dla Was specjalną ofertę - czy chcielibyście ją poznać?"
    ]
  }
];

const objectionHandling = [
  {
    objection: "To za drogo",
    icon: "💰",
    responses: [
      "Rozumiem. Ale policzmy - ile kosztuje Was teraz pozyskanie jednego klienta? Nasi klienci płacą średnio 15-25 zł za rezerwację.",
      "Drogo w porównaniu do czego? Posty na Facebooku nic nie kosztują, ale też nic nie dają.",
      "Ile kosztuje Was puste miejsce w grafiku? Bo właśnie to możemy wypełnić."
    ]
  },
  {
    objection: "Muszę się zastanowić",
    icon: "🤔",
    responses: [
      "Jasne, ale nad czym konkretnie? Może mogę pomóc odpowiedzieć na wątpliwości teraz.",
      "Oczywiście. Kiedy mogę oddzwonić? Mam wolne miejsce w kalendarzu w tym tygodniu.",
      "Rozumiem. Co musiałoby się wydarzyć, żebyście byli pewni swojej decyzji?"
    ]
  },
  {
    objection: "Nie mam czasu na marketing",
    icon: "⏰",
    responses: [
      "Właśnie dlatego my się tym zajmujemy! Potrzebujemy od Was tylko 30 minut na start.",
      "To idealnie - bo nasi klienci poświęcają na współpracę z nami max 2 godziny miesięcznie.",
      "A ile czasu poświęcacie na posty, które i tak nie działają?"
    ]
  },
  {
    objection: "Facebook Ads nie działają",
    icon: "📱",
    responses: [
      "Rozumiem to rozczarowanie. Ale czy kampanię prowadziła agencja specjalizująca się w beauty? Bo to ma ogromne znaczenie.",
      "Co konkretnie nie zadziałało? Bo najczęściej problem leży w targetowaniu lub kreacjach.",
      "Mogę pokazać wyniki naszych klientów z podobnych salonów - potem możemy wrócić do rozmowy."
    ]
  },
  {
    objection: "Mam już kogoś od marketingu",
    icon: "👥",
    responses: [
      "Super! A jakie wyniki osiągacie? Bo chętnie porównamy nasze rezultaty.",
      "To świetnie. A jak wygląda koszt pozyskania klienta u Was?",
      "Rozumiem. Gdyby jednak obecna współpraca nie przynosiła oczekiwanych efektów - możemy wrócić do rozmowy?"
    ]
  }
];

const goldenRules = [
  {
    icon: Heart,
    title: "Bądź autentyczny",
    description: "Klienci wyczuwają sztuczność. Mów swoimi słowami, nie skryptem.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Users,
    title: "Słuchaj więcej niż mówisz",
    description: "Zasada 70/30 - klient powinien mówić więcej niż Ty.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Lightbulb,
    title: "Rozwiązuj problemy",
    description: "Nie sprzedawaj usługi - oferuj rozwiązanie konkretnego problemu.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Mów o wynikach",
    description: "Konkretne liczby i case studies są bardziej przekonujące niż obietnice.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Buduj zaufanie",
    description: "Nie obiecuj cudów. Szczerość buduje długoterminowe relacje.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Star,
    title: "Follow-up jest kluczem",
    description: "80% sprzedaży wymaga 5+ kontaktów. Nie poddawaj się po pierwszym.",
    color: "from-yellow-500 to-amber-500"
  }
];

export default function ClientService() {
  const [activeTab, setActiveTab] = useState("process");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15),transparent_50%)]" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Obsługa Klienta</h1>
                <p className="text-muted-foreground">Kompletny przewodnik sprzedażowy od cold maila do umowy</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/welcome-pack-generator')}
              className="bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white shadow-lg gap-2"
            >
              <Package className="w-4 h-4" />
              Generuj Welcome Pack
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card/80 border border-border/50 p-1.5 h-auto flex-wrap">
            <TabsTrigger 
              value="process" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-600 data-[state=active]:text-white gap-2 px-4"
            >
              <Play className="w-4 h-4" />
              Proces sprzedaży
            </TabsTrigger>
            <TabsTrigger 
              value="conversation" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-600 data-[state=active]:text-white gap-2 px-4"
            >
              <MessageSquare className="w-4 h-4" />
              Rozmowa z klientem
            </TabsTrigger>
            <TabsTrigger 
              value="objections" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-600 data-[state=active]:text-white gap-2 px-4"
            >
              <Shield className="w-4 h-4" />
              Obiekcje
            </TabsTrigger>
            <TabsTrigger 
              value="rules" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-600 data-[state=active]:text-white gap-2 px-4"
            >
              <Zap className="w-4 h-4" />
              Złote zasady
            </TabsTrigger>
          </TabsList>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-4">
            {/* Timeline header */}
            <div className="flex items-center gap-3 px-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-muted-foreground">Start</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Umowa</span>
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="space-y-3">
              {processSteps.map((step) => (
                <Card 
                  key={step.id} 
                  className={`bg-card/50 border-border/50 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/5 ${
                    expandedStep === step.id ? 'ring-2 ring-primary/30' : ''
                  }`}
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                >
                  <div className="flex flex-col">
                    {/* Step Header - Always visible */}
                    <div className="flex items-center gap-4 p-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                            Krok {step.id}
                          </Badge>
                          <h3 className="font-bold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        expandedStep === step.id ? 'rotate-90' : ''
                      }`} />
                    </div>

                    {/* Expanded Content */}
                    {expandedStep === step.id && (
                      <div className="border-t border-border/50 p-4 bg-gradient-to-b from-muted/30 to-transparent animate-fade-in">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              Co robić
                            </h4>
                            <ul className="space-y-2">
                              {step.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <ArrowRight className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              Pro tips
                            </h4>
                            <ul className="space-y-2">
                              {step.tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {step.donts && (
                            <div className="space-y-3">
                              <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                                <XCircle className="w-4 h-4 text-red-500" />
                                Czego nie robić
                              </h4>
                              <ul className="space-y-2">
                                {step.donts.map((dont, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-red-400/80">
                                    <X className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                                    {dont}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Conversation Tab */}
          <TabsContent value="conversation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {conversationTopics.map((topic) => (
                <Card key={topic.category} className="bg-card/50 border-border/50 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <CardHeader className="pb-3">
                    <div className={`w-full h-1 bg-gradient-to-r ${topic.color} rounded-full mb-3`} />
                    <CardTitle className="text-base flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-md`}>
                        <topic.icon className="w-5 h-5 text-white" />
                      </div>
                      {topic.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {topic.questions.map((question, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm group">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 font-semibold group-hover:bg-primary group-hover:text-white transition-colors">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Objections Tab */}
          <TabsContent value="objections" className="space-y-4">
            {objectionHandling.map((item, index) => (
              <Card key={index} className="bg-card/50 border-border/50 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Obiekcja klienta</p>
                      <p className="text-lg font-bold text-foreground">"{item.objection}"</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Możliwe odpowiedzi
                  </p>
                  <div className="space-y-3">
                    {item.responses.map((response, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-colors">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground leading-relaxed">{response}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Golden Rules Tab */}
          <TabsContent value="rules" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goldenRules.map((rule, index) => (
                <Card 
                  key={index} 
                  className="bg-card/50 border-border/50 overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rule.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <rule.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{rule.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rule.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
