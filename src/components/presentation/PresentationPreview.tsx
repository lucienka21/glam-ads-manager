import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  AlertTriangle, Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, Settings, LineChart, HandshakeIcon
} from "lucide-react";

interface PresentationData {
  ownerName: string;
  salonName: string;
  city: string;
}

interface PresentationPreviewProps {
  data: PresentationData;
  currentSlide: number;
}

// Elegant floating petals animation
const FloatingPetals = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[10%] left-[15%] w-4 h-4 rounded-full bg-gradient-to-br from-rose-200 to-pink-100 opacity-60 animate-float-slow" />
    <div className="absolute top-[20%] right-[20%] w-6 h-6 rounded-full bg-gradient-to-br from-pink-200 to-rose-100 opacity-40 animate-float-medium" />
    <div className="absolute bottom-[30%] left-[10%] w-5 h-5 rounded-full bg-gradient-to-br from-amber-100 to-yellow-50 opacity-50 animate-float-slow" />
    <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-gradient-to-br from-rose-100 to-pink-50 opacity-60 animate-float-medium" />
    <div className="absolute bottom-[20%] right-[30%] w-4 h-4 rounded-full bg-gradient-to-br from-pink-100 to-white opacity-50 animate-float-slow" />
  </div>
);

// Elegant gradient background
const ElegantBackground = ({ variant = 'rose' }: { variant?: 'rose' | 'amber' | 'sage' | 'cream' }) => {
  const gradients = {
    rose: 'from-rose-50 via-pink-50 to-white',
    amber: 'from-amber-50 via-yellow-50 to-white',
    sage: 'from-emerald-50 via-teal-50 to-white',
    cream: 'from-orange-50 via-amber-50 to-white'
  };
  
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent" />
      <FloatingPetals />
    </div>
  );
};

// Decorative line element
const DecorativeLine = () => (
  <div className="flex items-center gap-3 my-6">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
    <Flower2 className="w-4 h-4 text-rose-300" />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
  </div>
);

export const PresentationPreview = ({ data, currentSlide }: PresentationPreviewProps) => {
  const slides = [
    // Slide 1: Cover - Elegant Beauty Introduction
    <div key="1" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="rose" />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-20">
          <div className="space-y-8 animate-slide-up">
            {/* Logo/Brand */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-rose-600 font-semibold tracking-wide">Aurine Agency</p>
                <p className="text-rose-400 text-sm">Marketing dla salonów beauty</p>
              </div>
            </div>
            
            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-light text-gray-800 leading-tight">
                Odkryj potencjał<br />
                <span className="font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Twojego salonu
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Pomagamy salonom kosmetycznym docierać do nowych klientek poprzez 
                przemyślane kampanie w mediach społecznościowych. Bez nachalnej sprzedaży, 
                z szacunkiem dla Twojej marki.
              </p>
            </div>

            <DecorativeLine />

            {/* Personal note */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 max-w-md">
              <p className="text-gray-500 text-sm mb-2">Prezentacja przygotowana dla</p>
              <p className="text-2xl font-semibold text-gray-800">{data.ownerName || "Ciebie"}</p>
              <p className="text-rose-500">{data.salonName || "Twój Salon"}</p>
              <p className="text-gray-400 text-sm mt-1">{data.city || "Polska"}</p>
            </div>

            {/* Platform badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-gray-100 shadow-sm">
                <Facebook className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Facebook</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-gray-100 shadow-sm">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-gray-600">Instagram</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right visual - elegant phone mockup */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-100 to-pink-50 opacity-60" />
          
          <div className="relative animate-scale-in">
            {/* Phone frame */}
            <div className="w-64 h-[440px] bg-white rounded-[40px] p-2 shadow-2xl shadow-rose-200/50 border border-gray-100">
              <div className="w-full h-full bg-gray-50 rounded-[36px] overflow-hidden">
                {/* Instagram header */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
                  <Instagram className="w-5 h-5 text-gray-800" />
                  <span className="text-sm font-semibold text-gray-800">{data.salonName || 'twoj_salon'}</span>
                  <Heart className="w-5 h-5 text-gray-800" />
                </div>
                
                {/* Post content */}
                <div className="p-3">
                  <div className="aspect-square bg-gradient-to-br from-rose-100 via-pink-50 to-white rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flower2 className="w-20 h-20 text-rose-200" />
                    </div>
                    <div className="relative text-center p-4">
                      <p className="text-rose-600 font-semibold text-lg">Zabieg dnia</p>
                      <p className="text-gray-500 text-sm">Zarezerwuj teraz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-500">1,234 polubień</p>
                  <p className="text-xs text-gray-400 mt-1">Sponsorowane</p>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -left-24 top-16 bg-white rounded-xl p-4 shadow-lg shadow-gray-200/50 border border-gray-100 animate-float-slow">
              <p className="text-xs text-gray-400">Zasięg tygodniowy</p>
              <p className="text-xl font-bold text-emerald-500">+2,400</p>
            </div>
            <div className="absolute -right-20 bottom-24 bg-white rounded-xl p-4 shadow-lg shadow-gray-200/50 border border-gray-100 animate-float-medium">
              <p className="text-xs text-gray-400">Nowe zapytania</p>
              <p className="text-xl font-bold text-rose-500">+18</p>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 2: Understanding challenges
    <div key="2" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="amber" />
      
      <div className="relative z-10 h-full flex flex-col p-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-200">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-amber-600 text-sm tracking-wide uppercase">Zrozumienie wyzwań</p>
            <h2 className="text-3xl font-light text-gray-800">Z czym mierzą się salony beauty?</h2>
          </div>
        </div>

        <p className="text-gray-600 max-w-3xl mb-10 text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          Prowadzenie salonu to nie tylko świadczenie usług. To także ciągłe dbanie o widoczność, 
          budowanie relacji z klientkami i konkurowanie o uwagę w mediach społecznościowych. 
          Oto najczęstsze wyzwania, z którymi spotykamy się w rozmowach z właścicielkami salonów:
        </p>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { 
              icon: Target, 
              title: "Dotarcie do właściwych osób", 
              desc: "Reklamy często trafiają do szerokiego grona, zamiast do kobiet, które faktycznie szukają zabiegów kosmetycznych w okolicy. To oznacza wydatki bez realnych efektów."
            },
            { 
              icon: BarChart3, 
              title: "Brak jasnych wyników", 
              desc: "Trudno ocenić, czy wydane pieniądze przekładają się na rezerwacje. Bez konkretnych danych łatwo o frustrację i poczucie, że 'reklamy nie działają'."
            },
            { 
              icon: Clock, 
              title: "Brak czasu na social media", 
              desc: "Między zabiegami, zamówieniami i codziennymi obowiązkami często nie zostaje chwili na przemyślane prowadzenie profili i tworzenie treści."
            },
            { 
              icon: Calendar, 
              title: "Nieregularna komunikacja", 
              desc: "Sporadyczne posty sprawiają, że algorytm pokazuje treści mniejszej liczbie osób. Budowanie społeczności wymaga systematyczności."
            },
            { 
              icon: MessageCircle, 
              title: "Przekaz, który nie rezonuje", 
              desc: "Generyczne hasła reklamowe nie budują zaufania. Klientki szukają autentyczności i profesjonalizmu, nie kolejnej promocji '-50%'."
            },
            { 
              icon: TrendingUp, 
              title: "Rosnąca konkurencja", 
              desc: "Coraz więcej salonów inwestuje w reklamę online. Wyróżnienie się wymaga przemyślanej strategii, nie tylko większego budżetu."
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white/70 backdrop-blur-sm border border-amber-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-amber-100/50 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 3: Why social media marketing works
    <div key="3" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="cream" />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-16">
          <div className="animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-200">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-blue-600 text-sm tracking-wide uppercase">Dlaczego to ma sens</p>
                <h2 className="text-3xl font-light text-gray-800">Marketing w social media</h2>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
              Media społecznościowe to miejsce, gdzie Twoje przyszłe klientki spędzają czas, 
              szukają inspiracji i odkrywają nowe miejsca. To naturalna przestrzeń do budowania 
              relacji i pokazywania, co wyróżnia Twój salon.
            </p>

            <div className="space-y-5">
              {[
                { 
                  icon: Users, 
                  stat: "18 milionów", 
                  label: "Polek aktywnych na Facebooku i Instagramie",
                  desc: "Codziennie scrollują, szukają inspiracji beauty, porównują salony"
                },
                { 
                  icon: Target, 
                  stat: "Precyzyjne dotarcie", 
                  label: "Do kobiet zainteresowanych beauty w Twoim mieście",
                  desc: "Nie płacisz za wyświetlenia osobom, które nigdy nie zarezerwują"
                },
                { 
                  icon: Zap, 
                  stat: "Szybkie efekty", 
                  label: "Pierwsze zapytania nawet w pierwszym tygodniu",
                  desc: "W przeciwieństwie do SEO czy poleceń, wyniki są mierzalne od razu"
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all animate-slide-up"
                  style={{ animationDelay: `${200 + idx * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{item.stat}</p>
                    <p className="text-gray-700">{item.label}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="w-[45%] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-50/50 to-transparent" />
          
          <div className="relative animate-scale-in">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 max-w-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-rose-200">
                  <Flower2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-800 font-semibold text-lg">{data.salonName || 'Twój Salon'}</p>
                <p className="text-gray-400 text-sm">{data.city || 'Twoje miasto'}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Obecny zasięg</span>
                  <span className="text-gray-400">~500/mies.</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Potencjalny zasięg</span>
                  <span className="text-emerald-500 font-semibold">15,000+/mies.</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500">Możliwe rezerwacje</span>
                  <span className="text-rose-500 font-semibold">+30-50/mies.</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                <p className="text-sm text-gray-600 text-center">
                  To szacunki oparte na doświadczeniu z podobnymi salonami. 
                  Realne wyniki zależą od wielu czynników.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 4: Cooperation process (NEW)
    <div key="4" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="sage" />
      
      <div className="relative z-10 h-full flex flex-col p-16">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
            <HandshakeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-emerald-600 text-sm tracking-wide uppercase">Jak to wygląda</p>
            <h2 className="text-3xl font-light text-gray-800">Proces współpracy krok po kroku</h2>
          </div>
        </div>

        <p className="text-gray-600 max-w-3xl mb-10 text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          Wierzymy w przejrzystość i partnerskie podejście. Oto jak wygląda nasza współpraca 
          od pierwszej rozmowy do stabilnych, powtarzalnych wyników. Żadnych ukrytych kosztów, 
          żadnych zobowiązań na lata.
        </p>

        <div className="grid grid-cols-5 gap-4 flex-1">
          {[
            { 
              step: "01",
              icon: MessageCircle, 
              title: "Poznajemy się", 
              desc: "Bezpłatna rozmowa, podczas której poznajemy Twój salon, cele i wyzwania. Odpowiadamy na pytania i sprawdzamy, czy możemy pomóc.",
              duration: "30 min"
            },
            { 
              step: "02",
              icon: Search, 
              title: "Analiza i plan", 
              desc: "Przeglądamy Twoją obecność online, konkurencję i możliwości. Przygotowujemy propozycję strategii dopasowaną do Twoich celów.",
              duration: "3-5 dni"
            },
            { 
              step: "03",
              icon: FileText, 
              title: "Przygotowanie", 
              desc: "Tworzymy kreacje reklamowe, teksty i grafiki. Konfigurujemy konta reklamowe i narzędzia do śledzenia wyników.",
              duration: "5-7 dni"
            },
            { 
              step: "04",
              icon: Settings, 
              title: "Start kampanii", 
              desc: "Uruchamiamy kampanie i na bieżąco monitorujemy wyniki. Testujemy różne podejścia, by znaleźć to, co działa najlepiej.",
              duration: "Ciągłe"
            },
            { 
              step: "05",
              icon: LineChart, 
              title: "Raporty i rozwój", 
              desc: "Co miesiąc otrzymujesz przejrzysty raport z wynikami. Wspólnie analizujemy i planujemy kolejne kroki.",
              duration: "Miesięczne"
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col animate-slide-up"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-light text-emerald-300">{item.step}</span>
                <div className={`h-px flex-1 bg-gradient-to-r ${idx < 4 ? 'from-emerald-200 to-emerald-100' : 'from-emerald-200 to-transparent'}`} />
              </div>
              
              {/* Card */}
              <div className="flex-1 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-5 hover:shadow-lg hover:shadow-emerald-100/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <div className="px-3 py-1 bg-emerald-50 rounded-full inline-block">
                  <span className="text-xs text-emerald-600">{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 animate-slide-up" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Bez długoterminowych umów</p>
              <p className="text-gray-600 text-sm">
                Współpracujemy w modelu miesięcznym. Jeśli wyniki Cię nie zadowolą, możesz zakończyć 
                współpracę w dowolnym momencie. Wierzymy, że jakość pracy powinna być powodem do kontynuacji, nie kontrakt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 5: What we provide
    <div key="5" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="rose" />
      
      <div className="relative z-10 h-full flex flex-col p-16">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-rose-600 text-sm tracking-wide uppercase">Co otrzymujesz</p>
            <h2 className="text-3xl font-light text-gray-800">Kompleksowa obsługa kampanii</h2>
          </div>
        </div>

        <p className="text-gray-600 max-w-3xl mb-10 text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          Zajmujemy się wszystkim, co związane z Twoją obecnością reklamową w social media. 
          Ty skupiasz się na tym, co robisz najlepiej – prowadzeniu salonu i dbaniu o klientki.
        </p>

        <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold text-rose-600 mb-4 flex items-center gap-2">
              <Flower2 className="w-5 h-5" />
              Strategia i kreacje
            </h3>
            {[
              { title: "Analiza Twojego salonu", desc: "Poznajemy Twoje mocne strony, grupę docelową i wyróżniki" },
              { title: "Strategia kampanii", desc: "Plan działań dopasowany do Twoich celów i budżetu" },
              { title: "Profesjonalne kreacje", desc: "Grafiki i teksty, które przyciągają uwagę i budują zaufanie" },
              { title: "Harmonogram publikacji", desc: "Przemyślany kalendarz, który zapewnia regularność" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Optymalizacja i wyniki
            </h3>
            {[
              { title: "Konfiguracja techniczna", desc: "Piksel, śledzenie konwersji, integracje z systemami rezerwacji" },
              { title: "Monitorowanie i optymalizacja", desc: "Codzienne sprawdzanie wyników i dostosowywanie kampanii" },
              { title: "Testy różnych podejść", desc: "Sprawdzamy, co działa najlepiej dla Twojego salonu" },
              { title: "Przejrzyste raporty", desc: "Miesięczne podsumowania z konkretnymi liczbami i wnioskami" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Stały kontakt i wsparcie</p>
              <p className="text-gray-600 text-sm">
                Jesteśmy dostępni na bieżąco. Odpowiadamy na pytania, doradzamy i wspólnie 
                rozwiązujemy pojawiające się wyzwania. Traktujemy Cię jak partnera, nie jak kolejnego klienta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 6: Results / Case Study
    <div key="6" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="sage" />
      
      <div className="relative z-10 h-full flex">
        <div className="flex-1 flex flex-col p-16">
          <div className="flex items-center gap-4 mb-8 animate-slide-up">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-emerald-600 text-sm tracking-wide uppercase">Przykładowe wyniki</p>
              <h2 className="text-3xl font-light text-gray-800">Co udało się osiągnąć</h2>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            Każdy salon jest inny i wyniki zależą od wielu czynników. Oto przykład z jednej 
            z naszych dotychczasowych współprac, który pokazuje, co jest możliwe przy dobrze 
            zaplanowanej kampanii.
          </p>

          {/* Case study card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <Flower2 className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Salon kosmetyczny</p>
                  <p className="text-sm text-gray-500">Warszawa • 3 miesiące współpracy</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Zasięg", before: "2,000", after: "45,000", unit: "/mies." },
                { label: "Zapytania", before: "5", after: "38", unit: "/mies." },
                { label: "Rezerwacje", before: "—", after: "+24", unit: "/mies." },
                { label: "Koszt/rezerwację", before: "—", after: "32 PLN", unit: "" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 bg-emerald-50/50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{stat.label}</p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400 line-through">{stat.before}</p>
                    <p className="text-2xl font-semibold text-emerald-600">{stat.after}</p>
                    <p className="text-xs text-gray-400">{stat.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report preview hint */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-500">
                Każdy miesiąc podsumowujemy przejrzystym raportem z konkretnymi liczbami, 
                wnioskami i rekomendacjami na kolejny okres.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - testimonial */}
        <div className="w-[40%] flex items-center justify-center p-8">
          <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 max-w-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "Wcześniej sama próbowałam prowadzić reklamy, ale nie wiedziałam, 
                czy to w ogóle działa. Teraz mam jasny obraz sytuacji i co miesiąc 
                widzę nowe twarze w salonie. Polecam rozmowę z zespołem Aurine."
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                  <span className="text-rose-600 font-semibold">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Anna K.</p>
                  <p className="text-sm text-gray-500">Właścicielka salonu, Warszawa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 7: Testimonials
    <div key="7" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="rose" />
      
      <div className="relative z-10 h-full flex flex-col p-16">
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-rose-600 text-sm tracking-wide uppercase">Głosy naszych klientek</p>
            <h2 className="text-3xl font-light text-gray-800">Co mówią o współpracy</h2>
          </div>
        </div>

        <p className="text-gray-600 max-w-2xl mb-10 text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          Najlepszą rekomendacją są słowa osób, z którymi współpracujemy. 
          Oto kilka opinii od właścicielek salonów beauty.
        </p>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            {
              quote: "Podejście zespołu Aurine mnie zaskoczyło. Nie obiecują złotych gór, ale uczciwie mówią, czego można się spodziewać. I dostarczają.",
              author: "Marta W.",
              city: "Kraków",
              highlight: "Uczciwe podejście"
            },
            {
              quote: "Wreszcie reklamy, które wyglądają profesjonalnie i pasują do wizerunku mojego salonu. Wcześniej próbowałam sama, ale efekty były słabe.",
              author: "Karolina M.",
              city: "Gdańsk",
              highlight: "Profesjonalne kreacje"
            },
            {
              quote: "Cenię sobie raporty, które dostaję co miesiąc. Wiem dokładnie, na co idą moje pieniądze i jakie są efekty. Żadnych niespodzianek.",
              author: "Patrycja Z.",
              city: "Poznań",
              highlight: "Przejrzyste raporty"
            },
          ].map((testimonial, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl p-6 flex flex-col hover:shadow-lg hover:shadow-rose-100/50 transition-all animate-slide-up"
              style={{ animationDelay: `${200 + idx * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed flex-1 italic">"{testimonial.quote}"</p>
              
              <div className="mt-6 pt-4 border-t border-rose-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100">
                    <span className="text-xs text-rose-600">{testimonial.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DecorativeLine />

        <div className="text-center animate-slide-up" style={{ animationDelay: '600ms' }}>
          <p className="text-gray-500">
            Współpracujemy z salonami różnej wielkości – od jednoosobowych gabinetów po większe studia z kilkoma specjalistkami.
          </p>
        </div>
      </div>
    </div>,

    // Slide 8: Contact / CTA (soft, not salesy)
    <div key="8" className="w-full h-full relative overflow-hidden">
      <ElegantBackground variant="cream" />
      
      <div className="relative z-10 h-full flex items-center justify-center p-16">
        <div className="text-center max-w-2xl animate-slide-up">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-200 mb-8 animate-scale-in">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl font-light text-gray-800 leading-tight mb-6">
            Porozmawiajmy o<br />
            <span className="font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Twoim salonie
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Jeśli chcesz sprawdzić, czy nasze podejście może pomóc Twojemu salonowi, 
            umów się na bezpłatną rozmowę. Bez zobowiązań, bez presji. 
            Po prostu porozmawiamy o Twoich celach i możliwościach.
          </p>

          <DecorativeLine />

          {/* Contact info */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
              <Phone className="w-5 h-5 text-rose-500" />
              <span className="text-gray-700">+48 731 856 524</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
              <Mail className="w-5 h-5 text-rose-500" />
              <span className="text-gray-700">kontakt@aurine.pl</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-gray-400">
              <Instagram className="w-5 h-5" />
              <span className="text-sm">@aurine.agency</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe className="w-5 h-5" />
              <span className="text-sm">aurine.pl</span>
            </div>
          </div>

          {/* Personal closing */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 inline-block">
            <p className="text-gray-500 text-sm mb-2">Prezentacja przygotowana dla</p>
            <p className="text-2xl font-semibold text-gray-800">{data.ownerName || "Ciebie"}</p>
            <p className="text-rose-500">{data.salonName || "Twój Salon"}</p>
            <p className="text-gray-400 text-sm mt-1">{data.city || "Polska"}</p>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            Dziękujemy za poświęcony czas. Do zobaczenia!
          </p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div
      id="presentation-preview"
      className="w-[1600px] h-[900px] mx-auto overflow-hidden"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
      `}</style>
      {slides[currentSlide] || slides[0]}
    </div>
  );
};

export const getTotalSlides = () => 8;
