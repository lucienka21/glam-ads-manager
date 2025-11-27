import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  AlertTriangle, Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, Settings, LineChart, HandshakeIcon
} from "lucide-react";
import agencyLogo from "@/assets/agency-logo.png";

interface PresentationData {
  ownerName: string;
  salonName: string;
  city: string;
}

interface PresentationPreviewProps {
  data: PresentationData;
  currentSlide: number;
}

// Neon glow circles
const NeonCircles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-pink-500/10 blur-3xl animate-pulse" />
    <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-rose-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-[50%] left-[40%] w-48 h-48 rounded-full bg-fuchsia-500/5 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
  </div>
);

// Logo header component for all slides
const SlideHeader = ({ subtitle }: { subtitle?: string }) => (
  <div className="flex items-center justify-between w-full mb-8 animate-fade-in">
    <div className="flex items-center gap-4">
      <img src={agencyLogo} alt="Aurine Agency" className="w-12 h-12 object-contain" />
      <div>
        <p className="text-pink-400 font-semibold tracking-wide text-lg">Aurine Agency</p>
        {subtitle && <p className="text-zinc-500 text-sm">{subtitle}</p>}
      </div>
    </div>
    <p className="text-zinc-600 text-sm">aurine.pl</p>
  </div>
);

// Footer with logo
const SlideFooter = () => (
  <div className="absolute bottom-6 left-0 right-0 px-16 flex items-center justify-between animate-fade-in">
    <div className="flex items-center gap-3">
      <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
      <span className="text-zinc-600 text-sm">Aurine Agency</span>
    </div>
    <span className="text-zinc-700 text-xs">Marketing dla branży beauty</span>
  </div>
);

export const PresentationPreview = ({ data, currentSlide }: PresentationPreviewProps) => {
  const slides = [
    // Slide 1: Cover
    <div key="1" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-20">
          <div className="space-y-8 animate-slide-up">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img src={agencyLogo} alt="Aurine Agency" className="w-16 h-16 object-contain" />
              <div>
                <p className="text-pink-400 font-semibold tracking-wide text-xl">Aurine Agency</p>
                <p className="text-zinc-500 text-sm">Marketing dla salonów beauty</p>
              </div>
            </div>
            
            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Odkryj potencjał<br />
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Twojego salonu
                </span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
                Pomagamy salonom kosmetycznym docierać do nowych klientek poprzez 
                przemyślane kampanie w mediach społecznościowych.
              </p>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 via-zinc-700 to-transparent max-w-xs" />
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>

            {/* Personal note */}
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 max-w-md">
              <p className="text-zinc-500 text-sm mb-2">Prezentacja przygotowana dla</p>
              <p className="text-2xl font-bold text-white">{data.ownerName || "Ciebie"}</p>
              <p className="text-pink-400 font-medium">{data.salonName || "Twój Salon"}</p>
              <p className="text-zinc-500 text-sm mt-1">{data.city || "Polska"}</p>
            </div>

            {/* Platform badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 rounded-full border border-zinc-800">
                <Facebook className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-zinc-400">Facebook</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 rounded-full border border-zinc-800">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-zinc-400">Instagram</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right visual - phone mockup */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/10 blur-2xl" />
          
          <div className="relative animate-scale-in">
            {/* Phone frame */}
            <div className="w-64 h-[440px] bg-zinc-900 rounded-[40px] p-2 shadow-2xl shadow-pink-500/20 border border-zinc-800">
              <div className="w-full h-full bg-black rounded-[36px] overflow-hidden">
                {/* Instagram header */}
                <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
                  <Instagram className="w-5 h-5 text-pink-400" />
                  <span className="text-sm font-semibold text-white">{data.salonName || 'twoj_salon'}</span>
                  <Heart className="w-5 h-5 text-zinc-400" />
                </div>
                
                {/* Post content */}
                <div className="p-3">
                  <div className="aspect-square bg-gradient-to-br from-pink-900/50 via-zinc-900 to-zinc-900 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-pink-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flower2 className="w-20 h-20 text-pink-500/30" />
                    </div>
                    <div className="relative text-center p-4">
                      <p className="text-pink-400 font-semibold text-lg">Zabieg dnia</p>
                      <p className="text-zinc-500 text-sm">Zarezerwuj teraz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                    <MessageCircle className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-xs text-zinc-400">1,234 polubień</p>
                  <p className="text-xs text-zinc-600 mt-1">Sponsorowane</p>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -left-24 top-16 bg-zinc-900 rounded-xl p-4 shadow-lg shadow-pink-500/10 border border-zinc-800 animate-float-slow">
              <p className="text-xs text-zinc-500">Zasięg tygodniowy</p>
              <p className="text-xl font-bold text-emerald-400">+2,400</p>
            </div>
            <div className="absolute -right-20 bottom-24 bg-zinc-900 rounded-xl p-4 shadow-lg shadow-pink-500/10 border border-zinc-800 animate-float-medium">
              <p className="text-xs text-zinc-500">Nowe zapytania</p>
              <p className="text-xl font-bold text-pink-400">+18</p>
            </div>
          </div>
        </div>
      </div>
      
      <SlideFooter />
    </div>,

    // Slide 2: Understanding challenges
    <div key="2" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <SlideHeader subtitle="Zrozumienie wyzwań" />
        
        <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
          Z czym mierzą się <span className="text-pink-400">salony beauty?</span>
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-8 text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          Prowadzenie salonu to nie tylko świadczenie usług. To także ciągłe dbanie o widoczność, 
          budowanie relacji z klientkami i konkurowanie o uwagę w mediach społecznościowych.
        </p>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { 
              icon: Target, 
              title: "Dotarcie do właściwych osób", 
              desc: "Reklamy często trafiają do szerokiego grona, zamiast do kobiet szukających zabiegów w okolicy."
            },
            { 
              icon: BarChart3, 
              title: "Brak jasnych wyników", 
              desc: "Trudno ocenić, czy wydane pieniądze przekładają się na rezerwacje. Bez danych łatwo o frustrację."
            },
            { 
              icon: Clock, 
              title: "Brak czasu na social media", 
              desc: "Między zabiegami często nie zostaje chwili na przemyślane prowadzenie profili."
            },
            { 
              icon: Calendar, 
              title: "Nieregularna komunikacja", 
              desc: "Sporadyczne posty sprawiają, że algorytm pokazuje treści mniejszej liczbie osób."
            },
            { 
              icon: MessageCircle, 
              title: "Przekaz, który nie rezonuje", 
              desc: "Generyczne hasła nie budują zaufania. Klientki szukają autentyczności."
            },
            { 
              icon: TrendingUp, 
              title: "Rosnąca konkurencja", 
              desc: "Coraz więcej salonów inwestuje w reklamę online. Wyróżnienie wymaga strategii."
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 hover:border-pink-500/30 transition-all duration-500 animate-slide-up group"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4 border border-pink-500/30 group-hover:from-pink-500/30 group-hover:to-rose-500/30 transition-all">
                <item.icon className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <SlideFooter />
      </div>
    </div>,

    // Slide 3: Why social media marketing works
    <div key="3" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-16">
          <div className="animate-slide-up">
            <SlideHeader subtitle="Dlaczego to ma sens" />

            <h2 className="text-4xl font-bold text-white mb-6">
              Marketing w <span className="text-pink-400">social media</span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
              Media społecznościowe to miejsce, gdzie Twoje przyszłe klientki spędzają czas, 
              szukają inspiracji i odkrywają nowe miejsca.
            </p>

            <div className="space-y-4">
              {[
                { 
                  icon: Users, 
                  stat: "18 milionów", 
                  label: "Polek aktywnych na Facebooku i Instagramie",
                },
                { 
                  icon: Target, 
                  stat: "Precyzyjne dotarcie", 
                  label: "Do kobiet zainteresowanych beauty w Twoim mieście",
                },
                { 
                  icon: Zap, 
                  stat: "Szybkie efekty", 
                  label: "Pierwsze zapytania nawet w pierwszym tygodniu",
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all animate-slide-up"
                  style={{ animationDelay: `${200 + idx * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0 border border-pink-500/30">
                    <item.icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{item.stat}</p>
                    <p className="text-zinc-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="w-[45%] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-pink-500/5 to-transparent" />
          
          <div className="relative animate-scale-in">
            <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl shadow-pink-500/10 border border-zinc-800 max-w-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
                  <Flower2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-semibold text-lg">{data.salonName || 'Twój Salon'}</p>
                <p className="text-zinc-500 text-sm">{data.city || 'Twoje miasto'}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                  <span className="text-zinc-500">Obecny zasięg</span>
                  <span className="text-zinc-400">~500/mies.</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                  <span className="text-zinc-500">Potencjalny zasięg</span>
                  <span className="text-emerald-400 font-semibold">15,000+/mies.</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-zinc-500">Możliwe rezerwacje</span>
                  <span className="text-pink-400 font-semibold">+30-50/mies.</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
                <p className="text-sm text-zinc-400 text-center">
                  Szacunki oparte na doświadczeniu z podobnymi salonami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SlideFooter />
    </div>,

    // Slide 4: Cooperation process
    <div key="4" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <SlideHeader subtitle="Jak to wygląda" />
        
        <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
          Przebieg <span className="text-pink-400">współpracy</span>
        </h2>

        <p className="text-zinc-400 max-w-3xl mb-8 text-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
          Współpraca z nami to przejrzysty, uporządkowany proces. Na każdym etapie wiesz, 
          co się dzieje i jakie są kolejne kroki.
        </p>

        <div className="grid grid-cols-4 gap-6 flex-1">
          {[
            {
              step: "01",
              icon: Search,
              title: "Analiza",
              desc: "Poznajemy Twój salon, grupę docelową i dotychczasowe działania marketingowe."
            },
            {
              step: "02",
              icon: FileText,
              title: "Strategia",
              desc: "Przygotowujemy plan kampanii dopasowany do Twoich celów i budżetu."
            },
            {
              step: "03",
              icon: Settings,
              title: "Realizacja",
              desc: "Tworzymy i uruchamiamy kampanie. Zajmujemy się wszystkim od A do Z."
            },
            {
              step: "04",
              icon: LineChart,
              title: "Optymalizacja",
              desc: "Monitorujemy wyniki i stale ulepszamy kampanie dla lepszych efektów."
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all animate-slide-up group"
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-white font-bold text-sm">{item.step}</span>
              </div>
              
              <div className="mt-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4 border border-pink-500/30">
                  <item.icon className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
              
              {idx < 3 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-pink-500/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 rounded-xl p-4 border border-pink-500/20 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <p className="text-zinc-300 text-center">
            <span className="text-pink-400 font-semibold">Comiesięczne raporty</span> — 
            Otrzymujesz przejrzyste podsumowanie wyników z konkretnymi liczbami i rekomendacjami
          </p>
        </div>
        
        <SlideFooter />
      </div>
    </div>,

    // Slide 5: What you get
    <div key="5" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <SlideHeader subtitle="Co otrzymujesz" />
        
        <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
          Kompleksowa <span className="text-pink-400">obsługa kampanii</span>
        </h2>

        <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {[
              { icon: Target, text: "Precyzyjne targetowanie do Twoich potencjalnych klientek" },
              { icon: FileText, text: "Profesjonalne kreacje reklamowe dopasowane do branży beauty" },
              { icon: Settings, text: "Pełna konfiguracja i zarządzanie kampaniami" },
              { icon: LineChart, text: "Ciągła optymalizacja dla najlepszych wyników" },
              { icon: BarChart3, text: "Przejrzyste raporty z konkretnymi liczbami" },
              { icon: MessageCircle, text: "Stały kontakt i wsparcie na każdym etapie" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-900/60 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30 flex-shrink-0">
                  <item.icon className="w-5 h-5 text-pink-400" />
                </div>
                <p className="text-zinc-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-xl shadow-pink-500/10 max-w-sm">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Bez ukrytych kosztów</h3>
                <p className="text-zinc-500">Wszystko zawarte w jednej miesięcznej opłacie</p>
              </div>
              
              <div className="space-y-3">
                {["Strategia i planowanie", "Kreacje reklamowe", "Zarządzanie kampaniami", "Raporty i analityka"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <SlideFooter />
      </div>
    </div>,

    // Slide 6: Example results
    <div key="6" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <SlideHeader subtitle="Przykładowe wyniki" />
        
        <h2 className="text-4xl font-bold text-white mb-8 animate-slide-up">
          Jak to wygląda <span className="text-pink-400">w praktyce</span>
        </h2>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            {
              salon: "Salon kosmetyczny",
              city: "Warszawa",
              results: [
                { label: "Zasięg miesięczny", value: "45,000+", color: "text-blue-400" },
                { label: "Nowe zapytania", value: "+67", color: "text-emerald-400" },
                { label: "Rezerwacje", value: "+34", color: "text-pink-400" },
              ],
              quote: "Pierwszy raz widzę, że reklamy naprawdę przynoszą efekty."
            },
            {
              salon: "Studio stylizacji",
              city: "Kraków",
              results: [
                { label: "Zasięg miesięczny", value: "38,000+", color: "text-blue-400" },
                { label: "Nowe zapytania", value: "+52", color: "text-emerald-400" },
                { label: "Rezerwacje", value: "+28", color: "text-pink-400" },
              ],
              quote: "Grafik zapełnił się w dwa tygodnie. Polecam każdemu salonowi."
            },
            {
              salon: "Centrum urody",
              city: "Poznań",
              results: [
                { label: "Zasięg miesięczny", value: "52,000+", color: "text-blue-400" },
                { label: "Nowe zapytania", value: "+89", color: "text-emerald-400" },
                { label: "Rezerwacje", value: "+41", color: "text-pink-400" },
              ],
              quote: "Profesjonalne podejście i realne wyniki od pierwszego miesiąca."
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all animate-slide-up"
              style={{ animationDelay: `${100 + idx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30">
                  <Flower2 className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{item.salon}</p>
                  <p className="text-zinc-500 text-sm">{item.city}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {item.results.map((result, rIdx) => (
                  <div key={rIdx} className="flex justify-between items-center py-2 border-b border-zinc-800 last:border-0">
                    <span className="text-zinc-500 text-sm">{result.label}</span>
                    <span className={`font-bold ${result.color}`}>{result.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-400 text-sm italic">"{item.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <p className="text-zinc-500 text-sm text-center">
            Wyniki oparte na rzeczywistych kampaniach. Indywidualne efekty mogą się różnić w zależności od lokalizacji, budżetu i specyfiki salonu.
          </p>
        </div>
        
        <SlideFooter />
      </div>
    </div>,

    // Slide 7: Testimonials
    <div key="7" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <SlideHeader subtitle="Opinie klientek" />
        
        <h2 className="text-4xl font-bold text-white mb-8 animate-slide-up">
          Co mówią <span className="text-pink-400">właścicielki salonów</span>
        </h2>

        <div className="grid grid-cols-2 gap-8 flex-1">
          {[
            {
              name: "Katarzyna M.",
              role: "Właścicielka salonu kosmetycznego",
              city: "Warszawa",
              quote: "Współpraca z Aurine to najlepsza decyzja biznesowa jaką podjęłam w tym roku. Profesjonalne podejście, regularne raporty i co najważniejsze - realne wyniki. Mój kalendarz jest zapełniony na 3 tygodnie do przodu.",
              result: "+40 nowych klientek miesięcznie"
            },
            {
              name: "Agnieszka K.",
              role: "Studio stylizacji paznokci",
              city: "Kraków",
              quote: "Wcześniej sama próbowałam prowadzić reklamy, ale bez efektów. Teraz widzę dokładnie ile osób trafia do mnie z reklam i ile rezerwuje. To zupełnie inna jakość pracy.",
              result: "3x większy zasięg w 2 miesiące"
            },
            {
              name: "Monika T.",
              role: "Centrum urody premium",
              city: "Gdańsk",
              quote: "Cenię sobie transparentność i profesjonalizm. Dostaję comiesięczne raporty, wiem na co idzie budżet i jakie są efekty. Współpraca jest bezproblemowa.",
              result: "ROI 280% z kampanii"
            },
            {
              name: "Anna S.",
              role: "Salon fryzjerski",
              city: "Poznań",
              quote: "Polecono mi Aurine i nie żałuję. Zespół naprawdę rozumie branżę beauty i wie jak dotrzeć do klientek. Reklamy wyglądają profesjonalnie i przynoszą efekty.",
              result: "+25 rezerwacji tygodniowo"
            },
          ].map((testimonial, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-pink-500/30 transition-all animate-slide-up"
              style={{ animationDelay: `${100 + idx * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/30">
                  {testimonial.name.split(' ')[0][0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                  <p className="text-zinc-600 text-xs">{testimonial.city}</p>
                </div>
              </div>
              
              <p className="text-zinc-400 leading-relaxed mb-4">"{testimonial.quote}"</p>
              
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl px-4 py-3 border border-pink-500/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-400 font-semibold text-sm">{testimonial.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <SlideFooter />
      </div>
    </div>,

    // Slide 8: Contact
    <div key="8" className="w-full h-full relative overflow-hidden bg-black">
      <NeonCircles />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-20">
          <div className="space-y-8 animate-slide-up">
            <div className="flex items-center gap-4">
              <img src={agencyLogo} alt="Aurine Agency" className="w-20 h-20 object-contain" />
              <div>
                <p className="text-pink-400 font-bold text-2xl">Aurine Agency</p>
                <p className="text-zinc-500">Marketing dla salonów beauty</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Porozmawiajmy o<br />
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Twoim salonie
                </span>
              </h2>
              <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
                Chętnie opowiemy więcej o tym, jak możemy pomóc rozwinąć Twój biznes. 
                Bez zobowiązań, bez nachalnej sprzedaży.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all max-w-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30">
                  <Mail className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Email</p>
                  <p className="text-white font-medium">kontakt@aurine.pl</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all max-w-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30">
                  <Phone className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Telefon</p>
                  <p className="text-white font-medium">+48 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all max-w-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center border border-pink-500/30">
                  <Globe className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Strona</p>
                  <p className="text-white font-medium">aurine.pl</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="w-[45%] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-pink-500/10 to-transparent" />
          
          <div className="relative animate-scale-in">
            <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 shadow-xl shadow-pink-500/10 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-xl shadow-pink-500/30">
                <Heart className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                Dziękujemy za uwagę
              </h3>
              <p className="text-zinc-400 mb-6">
                Prezentacja przygotowana specjalnie dla
              </p>
              
              <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  {data.ownerName || "Ciebie"}
                </p>
                <p className="text-white text-lg mt-1">{data.salonName || "Twój Salon"}</p>
                <p className="text-zinc-500">{data.city || "Polska"}</p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full">
                  <Facebook className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SlideFooter />
    </div>,
  ];

  return (
    <div 
      id="presentation-preview"
      className="w-[1600px] h-[900px] overflow-hidden relative transition-all duration-500 ease-out"
    >
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
      `}</style>
      
      {slides[currentSlide]}
    </div>
  );
};

export const getTotalSlides = () => 8;
