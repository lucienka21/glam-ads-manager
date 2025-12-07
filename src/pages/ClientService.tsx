import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, Phone, MessageSquare, FileSignature, CheckCircle2, 
  AlertCircle, Lightbulb, Target, Heart, Clock, ArrowRight,
  Sparkles, Users, TrendingUp, Shield, Star
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Cold Mail",
    icon: Mail,
    description: "Pierwszy kontakt z potencjalnym klientem",
    color: "from-blue-500 to-blue-600",
    details: [
      "Personalizacja - użyj nazwy salonu i miasta",
      "Krótka, zwięzła wiadomość (max 150 słów)",
      "Konkretna wartość - co zyskają?",
      "Jeden jasny CTA - zachęta do rozmowy",
      "Podpis z danymi kontaktowymi"
    ],
    tips: [
      "Wysyłaj w godzinach 9-11 lub 14-16",
      "Unikaj poniedziałków i piątków",
      "Sprawdź profil salonu przed wysłaniem"
    ]
  },
  {
    id: 2,
    title: "Follow-up #1",
    icon: Clock,
    description: "Przypomnienie po 3-4 dniach",
    color: "from-purple-500 to-purple-600",
    details: [
      "Nawiąż do poprzedniej wiadomości",
      "Dodaj nową wartość (case study, statystyka)",
      "Zadaj otwarte pytanie",
      "Krótsze niż cold mail"
    ],
    tips: [
      "Nie przepraszaj za 'nachodzenie'",
      "Bądź pomocny, nie nachalny",
      "Może być bardziej osobisty ton"
    ]
  },
  {
    id: 3,
    title: "Follow-up #2 / SMS",
    icon: MessageSquare,
    description: "Ostatnia próba kontaktu",
    color: "from-pink-500 to-pink-600",
    details: [
      "SMS jeśli brak odpowiedzi na maile",
      "Bardzo krótki - max 160 znaków",
      "Bezpośrednie pytanie o zainteresowanie",
      "Opcja 'break-up' - ostatnia szansa"
    ],
    tips: [
      "SMS wysyłaj w godzinach pracy salonu",
      "Unikaj weekendów",
      "Jeden SMS wystarczy"
    ]
  },
  {
    id: 4,
    title: "Rozmowa telefoniczna",
    icon: Phone,
    description: "Kluczowy moment sprzedaży",
    color: "from-green-500 to-green-600",
    details: [
      "Przygotuj się - sprawdź profil salonu",
      "Zacznij od pytań, nie sprzedaży",
      "Słuchaj więcej niż mówisz (70/30)",
      "Zaproponuj konkretne rozwiązanie",
      "Ustal następny krok"
    ],
    tips: [
      "Dzwoń stojąc - lepszy głos",
      "Uśmiechaj się - słychać to",
      "Miej notes przy sobie"
    ]
  },
  {
    id: 5,
    title: "Prezentacja / Spotkanie",
    icon: Target,
    description: "Pokazanie wartości współpracy",
    color: "from-orange-500 to-orange-600",
    details: [
      "Dostosuj prezentację do salonu",
      "Pokaż case studies z branży",
      "Mów o wynikach, nie o procesie",
      "Odpowiedz na wszystkie pytania",
      "Przygotuj ofertę na spotkanie"
    ],
    tips: [
      "Weź ze sobą materiały do zostawienia",
      "Przygotuj odpowiedzi na obiekcje",
      "Zaproponuj okres próbny"
    ]
  },
  {
    id: 6,
    title: "Umowa",
    icon: FileSignature,
    description: "Finalizacja współpracy",
    color: "from-emerald-500 to-emerald-600",
    details: [
      "Wyślij umowę tego samego dnia",
      "Omów wszystkie punkty",
      "Ustal datę startu",
      "Zbierz dostępy do kont",
      "Wyślij welcome pack"
    ],
    tips: [
      "Nie zostawiaj umowy 'do przemyślenia'",
      "Ustal deadline na podpisanie",
      "Potwierdź mailowo wszystkie ustalenia"
    ]
  }
];

const conversationTopics = [
  {
    category: "Pytania otwierające",
    icon: MessageSquare,
    color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
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
    color: "bg-red-500/10 border-red-500/20 text-red-400",
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
    color: "bg-green-500/10 border-green-500/20 text-green-400",
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
    color: "bg-purple-500/10 border-purple-500/20 text-purple-400",
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
    responses: [
      "Rozumiem. Ale policzmy - ile kosztuje Was teraz pozyskanie jednego klienta? Nasi klienci płacą średnio 15-25 zł za rezerwację.",
      "Drogo w porównaniu do czego? Posty na Facebooku nic nie kosztują, ale też nic nie dają.",
      "Ile kosztuje Was puste miejsce w grafiku? Bo właśnie to możemy wypełnić."
    ]
  },
  {
    objection: "Muszę się zastanowić",
    responses: [
      "Jasne, ale nad czym konkretnie? Może mogę pomóc odpowiedzieć na wątpliwości teraz.",
      "Oczywiście. Kiedy mogę oddzwonić? Mam wolne miejsce w kalendarzu w tym tygodniu.",
      "Rozumiem. Co musiałoby się wydarzyć, żebyście byli pewni swojej decyzji?"
    ]
  },
  {
    objection: "Nie mam czasu na marketing",
    responses: [
      "Właśnie dlatego my się tym zajmujemy! Potrzebujemy od Was tylko 30 minut na start.",
      "To idealnie - bo nasi klienci poświęcają na współpracę z nami max 2 godziny miesięcznie.",
      "A ile czasu poświęcacie na posty, które i tak nie działają?"
    ]
  },
  {
    objection: "Facebook Ads nie działają",
    responses: [
      "Rozumiem to rozczarowanie. Ale czy kampanię prowadziła agencja specjalizująca się w beauty? Bo to ma ogromne znaczenie.",
      "Co konkretnie nie zadziałało? Bo najczęściej problem leży w targetowaniu lub kreacjach.",
      "Mogę pokazać wyniki naszych klientów z podobnych salonów - potem możemy wrócić do rozmowy."
    ]
  },
  {
    objection: "Mam już kogoś od marketingu",
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
    description: "Klienci wyczuwają sztuczność. Mów swoimi słowami, nie skryptem."
  },
  {
    icon: Users,
    title: "Słuchaj więcej niż mówisz",
    description: "Zasada 70/30 - klient powinien mówić więcej niż Ty."
  },
  {
    icon: Lightbulb,
    title: "Rozwiązuj problemy",
    description: "Nie sprzedawaj usługi - oferuj rozwiązanie konkretnego problemu."
  },
  {
    icon: TrendingUp,
    title: "Mów o wynikach",
    description: "Konkretne liczby i case studies są bardziej przekonujące niż obietnice."
  },
  {
    icon: Shield,
    title: "Buduj zaufanie",
    description: "Nie obiecuj cudów. Szczerość buduje długoterminowe relacje."
  },
  {
    icon: Star,
    title: "Follow-up jest kluczem",
    description: "80% sprzedaży wymaga 5+ kontaktów. Nie poddawaj się po pierwszym."
  }
];

export default function ClientService() {
  const [activeTab, setActiveTab] = useState("process");

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Obsługa Klienta</h1>
              <p className="text-muted-foreground text-sm">Przewodnik sprzedażowy od cold maila do umowy</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card/50 border border-border/50 p-1">
            <TabsTrigger value="process" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Proces sprzedaży
            </TabsTrigger>
            <TabsTrigger value="conversation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Rozmowa z klientem
            </TabsTrigger>
            <TabsTrigger value="objections" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Obiekcje
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Złote zasady
            </TabsTrigger>
          </TabsList>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-6">
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <Card key={step.id} className="bg-card/50 border-border/50 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Step Header */}
                    <div className={`bg-gradient-to-br ${step.color} p-4 md:p-6 md:w-64 flex-shrink-0`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0">
                          Krok {step.id}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-white/80 text-sm mt-1">{step.description}</p>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 p-4 md:p-6 grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
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
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
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
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Conversation Tab */}
          <TabsContent value="conversation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {conversationTopics.map((topic) => (
                <Card key={topic.category} className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${topic.color} border flex items-center justify-center`}>
                        <topic.icon className="w-4 h-4" />
                      </div>
                      {topic.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {topic.questions.map((question, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{question}</span>
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
              <Card key={index} className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-400">"{item.objection}"</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.responses.map((response, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-sm text-muted-foreground">{response}</p>
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
                <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4">
                      <rule.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{rule.title}</h3>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bonus Section */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Pamiętaj!
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <p>• Każda rozmowa to okazja do nauki</p>
                    <p>• Nie każdy klient jest dla nas - i to OK</p>
                    <p>• Odmowa teraz ≠ odmowa na zawsze</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Lepszy klient, który płaci mniej, ale jest fajny</p>
                    <p>• Twoja pewność siebie jest zaraźliwa</p>
                    <p>• Zawsze kończ rozmowę z następnym krokiem</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
