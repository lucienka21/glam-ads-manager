import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  AlertTriangle, Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, Settings, LineChart, HandshakeIcon,
  XCircle, ThumbsDown, Eye, DollarSign, Megaphone, Image,
  Scissors, Palette, Gift
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

// Premium neon glow effects
const NeonGlow = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[5%] right-[15%] w-96 h-96 rounded-full bg-pink-500/15 blur-[100px] animate-pulse" />
    <div className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full bg-fuchsia-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-[40%] left-[30%] w-64 h-64 rounded-full bg-rose-500/8 blur-[60px] animate-pulse" style={{ animationDelay: '0.5s' }} />
  </div>
);

// Floating beauty elements
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <Flower2 className="absolute top-[15%] right-[8%] w-8 h-8 text-pink-500/20 animate-float-slow" />
    <Scissors className="absolute bottom-[25%] left-[5%] w-6 h-6 text-pink-500/15 animate-float-medium" style={{ animationDelay: '0.5s' }} />
    <Palette className="absolute top-[60%] right-[12%] w-7 h-7 text-fuchsia-500/15 animate-float-slow" style={{ animationDelay: '1s' }} />
    <Heart className="absolute bottom-[15%] right-[20%] w-5 h-5 text-rose-500/20 animate-float-medium" />
    <Gift className="absolute top-[35%] left-[8%] w-6 h-6 text-pink-500/15 animate-float-slow" style={{ animationDelay: '1.5s' }} />
  </div>
);

// Logo header component for all slides
const SlideHeader = ({ subtitle }: { subtitle?: string }) => (
  <div className="flex items-center justify-between w-full mb-6 animate-fade-in">
    <div className="flex items-center gap-3">
      <img src={agencyLogo} alt="Aurine Agency" className="w-10 h-10 object-contain" />
      <div>
        <p className="text-pink-400 font-semibold tracking-wide">Aurine Agency</p>
        {subtitle && <p className="text-zinc-500 text-xs">{subtitle}</p>}
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 rounded-full border border-zinc-800">
        <Facebook className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs text-zinc-400">Ads</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 rounded-full border border-zinc-800">
        <Instagram className="w-3.5 h-3.5 text-pink-400" />
        <span className="text-xs text-zinc-400">Ads</span>
      </div>
    </div>
  </div>
);

// Footer with logo
const SlideFooter = ({ slideNum, totalSlides }: { slideNum: number; totalSlides: number }) => (
  <div className="absolute bottom-4 left-0 right-0 px-12 flex items-center justify-between animate-fade-in">
    <div className="flex items-center gap-2">
      <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
      <span className="text-zinc-600 text-xs">aurine.pl</span>
    </div>
    <div className="flex items-center gap-1.5">
      {[...Array(totalSlides)].map((_, i) => (
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full transition-all ${i === slideNum - 1 ? 'bg-pink-500 w-6' : 'bg-zinc-700'}`} 
        />
      ))}
    </div>
    <span className="text-zinc-600 text-xs">Marketing dla branży beauty</span>
  </div>
);

// Phone mockup with Instagram ad
const PhoneMockup = ({ salonName }: { salonName: string }) => (
  <div className="relative animate-scale-in">
    <div className="w-56 h-[380px] bg-zinc-900 rounded-[32px] p-1.5 shadow-2xl shadow-pink-500/20 border border-zinc-800">
      <div className="w-full h-full bg-black rounded-[28px] overflow-hidden">
        {/* Instagram header */}
        <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800">
          <Instagram className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-semibold text-white">{salonName || 'salon_beauty'}</span>
          <Heart className="w-4 h-4 text-zinc-500" />
        </div>
        
        {/* Sponsored label */}
        <div className="px-3 py-1.5 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Flower2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-white font-medium">{salonName || 'Twój Salon'}</span>
          </div>
          <span className="text-[10px] text-zinc-500">Sponsorowane</span>
        </div>
        
        {/* Ad content */}
        <div className="aspect-square bg-gradient-to-br from-pink-900/40 via-zinc-900 to-fuchsia-900/30 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.15),transparent_60%)]" />
          <div className="text-center p-4 relative z-10">
            <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-pink-300 font-semibold text-sm">-20% na pierwszy zabieg</p>
            <p className="text-zinc-500 text-xs mt-1">Tylko do końca tygodnia</p>
          </div>
        </div>
        
        {/* Engagement */}
        <div className="p-2.5 space-y-1.5">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <MessageCircle className="w-5 h-5 text-zinc-500" />
            <Megaphone className="w-5 h-5 text-zinc-500" />
          </div>
          <p className="text-[10px] text-zinc-400 font-medium">2,847 polubień</p>
          <p className="text-[10px] text-zinc-500">Zobacz wszystkie komentarze (43)</p>
        </div>
      </div>
    </div>
    
    {/* Floating stats */}
    <div className="absolute -left-20 top-12 bg-zinc-900/95 backdrop-blur rounded-xl p-3 shadow-lg border border-pink-500/20 animate-float-slow">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-blue-400" />
        <div>
          <p className="text-[10px] text-zinc-500">Zasięg</p>
          <p className="text-sm font-bold text-white">12,400</p>
        </div>
      </div>
    </div>
    <div className="absolute -right-16 bottom-20 bg-zinc-900/95 backdrop-blur rounded-xl p-3 shadow-lg border border-pink-500/20 animate-float-medium">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-emerald-400" />
        <div>
          <p className="text-[10px] text-zinc-500">Zapytania</p>
          <p className="text-sm font-bold text-pink-400">+24</p>
        </div>
      </div>
    </div>
  </div>
);

// Facebook Ad Manager mockup
const AdManagerMockup = () => (
  <div className="bg-zinc-900/90 backdrop-blur rounded-2xl p-5 border border-zinc-800 shadow-xl max-w-sm animate-scale-in">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-800">
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
        <Facebook className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-white text-sm font-medium">Menedżer reklam</p>
        <p className="text-zinc-500 text-xs">Panel kampanii</p>
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-xl">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-400" />
          <span className="text-zinc-400 text-sm">Zasięg</span>
        </div>
        <span className="text-white font-bold">45,230</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-xl">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span className="text-zinc-400 text-sm">Kliknięcia</span>
        </div>
        <span className="text-white font-bold">1,847</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-pink-400" />
          <span className="text-zinc-400 text-sm">Koszt/klik</span>
        </div>
        <span className="text-pink-400 font-bold">0,42 zł</span>
      </div>
    </div>
  </div>
);

export const PresentationPreview = ({ data, currentSlide }: PresentationPreviewProps) => {
  const totalSlides = 6;
  
  const slides = [
    // Slide 1: Cover - Professional intro
    <div key="1" className="w-full h-full relative overflow-hidden bg-black">
      <NeonGlow />
      <FloatingElements />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-16">
          <div className="space-y-6 animate-slide-up">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={agencyLogo} alt="Aurine Agency" className="w-14 h-14 object-contain" />
              <div>
                <p className="text-pink-400 font-semibold tracking-wide text-lg">Aurine Agency</p>
                <p className="text-zinc-500 text-sm">Specjaliści Facebook & Instagram Ads</p>
              </div>
            </div>
            
            {/* Main headline */}
            <div className="space-y-3">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Skuteczna reklama<br />
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
                  dla Twojego salonu
                </span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                Pomagamy salonom beauty w małych miastach przyciągać nowe klientki 
                dzięki przemyślanym kampaniom reklamowym.
              </p>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-3 max-w-xs">
              <div className="h-px flex-1 bg-gradient-to-r from-pink-500/60 via-fuchsia-500/40 to-transparent" />
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>

            {/* Personal card */}
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-5 border border-zinc-800/80 max-w-sm">
              <p className="text-zinc-500 text-xs mb-1">Prezentacja dla</p>
              <p className="text-2xl font-bold text-white">{data.ownerName || "Ciebie"}</p>
              <p className="text-pink-400 font-medium">{data.salonName || "Twój Salon"}</p>
              <p className="text-zinc-500 text-sm">{data.city || "Polska"}</p>
            </div>

            {/* Platform badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-blue-500/10 rounded-xl border border-blue-500/30">
                <Facebook className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Facebook Ads</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600/20 to-fuchsia-500/10 rounded-xl border border-pink-500/30">
                <Instagram className="w-5 h-5 text-pink-400" />
                <span className="text-sm text-pink-300 font-medium">Instagram Ads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right visual - phone mockup */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-500/10 blur-3xl" />
          <PhoneMockup salonName={data.salonName} />
        </div>
      </div>
      
      <SlideFooter slideNum={1} totalSlides={totalSlides} />
    </div>,

    // Slide 2: Common mistakes - KLUCZOWY SLAJD
    <div key="2" className="w-full h-full relative overflow-hidden bg-black">
      <NeonGlow />
      <FloatingElements />
      
      <div className="relative z-10 h-full flex flex-col px-14 py-8">
        <SlideHeader subtitle="Dlaczego to nie działa" />
        
        <h2 className="text-4xl font-bold text-white mb-2 animate-slide-up">
          Najczęstsze <span className="text-pink-400">błędy salonów</span> w reklamie
        </h2>
        <p className="text-zinc-400 mb-6 animate-slide-up" style={{ animationDelay: '50ms' }}>
          Czy któryś z tych problemów brzmi znajomo?
        </p>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {[
            { 
              icon: Image, 
              title: "Post ≠ Reklama", 
              desc: "Wrzucasz zdjęcia na profil i liczysz, że klientki same się znajdą. Ale algorytm pokazuje Twoje posty tylko 5-10% obserwujących.",
              highlight: true
            },
            { 
              icon: Users, 
              title: "Bazowanie na organicznych zasięgach", 
              desc: "\"Mam 500 obserwujących, to wystarczy\". Niestety organiczne zasięgi spadły o 80% w ostatnich latach. Bez płatnej promocji jesteś niewidoczna.",
              highlight: true
            },
            { 
              icon: Target, 
              title: "Brak precyzyjnego targetowania", 
              desc: "Promujesz post \"do wszystkich\", zamiast do kobiet 25-45 lat zainteresowanych urodą w Twoim mieście.",
              highlight: false
            },
            { 
              icon: DollarSign, 
              title: "\"Próbowałam, nie działa\"", 
              desc: "Wydajesz 50 zł na \"promuj post\" i rezygnujesz po tygodniu. Bez strategii i optymalizacji to przepalone pieniądze.",
              highlight: false
            },
            { 
              icon: Clock, 
              title: "Nieregularność", 
              desc: "Raz na miesiąc wrzucisz coś na Instagram, a potem cisza. Algorytm karze za brak aktywności.",
              highlight: false
            },
            { 
              icon: MessageCircle, 
              title: "Brak wezwania do działania", 
              desc: "\"Piękne zdjęcie zabiegu\" bez informacji jak zarezerwować, ile kosztuje, gdzie jesteś. Klientka scrolluje dalej.",
              highlight: false
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl p-4 transition-all duration-500 animate-slide-up group ${
                item.highlight 
                  ? 'bg-gradient-to-br from-pink-500/15 to-rose-500/10 border border-pink-500/30' 
                  : 'bg-zinc-900/60 border border-zinc-800 hover:border-pink-500/20'
              }`}
              style={{ animationDelay: `${100 + idx * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.highlight 
                    ? 'bg-pink-500/30 border border-pink-500/50' 
                    : 'bg-zinc-800 border border-zinc-700'
                }`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? 'text-pink-400' : 'text-zinc-400'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${item.highlight ? 'text-pink-300' : 'text-white'}`}>{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-zinc-900/80 rounded-xl p-3 border border-zinc-800 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <p className="text-zinc-300 text-center text-sm">
            <span className="text-pink-400 font-semibold">Dobra wiadomość:</span> wszystkie te problemy da się rozwiązać dzięki przemyślanej strategii reklamowej
          </p>
        </div>
        
        <SlideFooter slideNum={2} totalSlides={totalSlides} />
      </div>
    </div>,

    // Slide 3: Why Facebook & Instagram Ads work
    <div key="3" className="w-full h-full relative overflow-hidden bg-black">
      <NeonGlow />
      <FloatingElements />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-14">
          <div className="animate-slide-up">
            <SlideHeader subtitle="Rozwiązanie" />

            <h2 className="text-4xl font-bold text-white mb-4">
              Dlaczego <span className="text-pink-400">płatna reklama</span> działa?
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-6 max-w-lg">
              Facebook i Instagram to miejsca, gdzie Twoje przyszłe klientki spędzają 
              czas każdego dnia. Reklamy pozwalają dotrzeć właśnie do nich.
            </p>

            <div className="space-y-3">
              {[
                { 
                  icon: Target, 
                  stat: "Precyzyjne dotarcie", 
                  label: "Do kobiet zainteresowanych beauty w promieniu 15km od salonu",
                },
                { 
                  icon: Eye, 
                  stat: "Gwarancja wyświetleń", 
                  label: "Twoja reklama dotrze do tysięcy osób, nie tylko do 5% obserwujących",
                },
                { 
                  icon: DollarSign, 
                  stat: "Kontrola budżetu", 
                  label: "Ty decydujesz ile wydajesz. Możesz zacząć nawet od 500 zł/mies.",
                },
                { 
                  icon: BarChart3, 
                  stat: "Mierzalne efekty", 
                  label: "Wiesz dokładnie ile osób zobaczyło reklamę i ile kliknęło",
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-zinc-900/70 backdrop-blur-sm rounded-xl p-3 border border-zinc-800 hover:border-pink-500/30 transition-all animate-slide-up"
                  style={{ animationDelay: `${150 + idx * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0 border border-pink-500/30">
                    <item.icon className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.stat}</p>
                    <p className="text-zinc-400 text-sm">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual - Ad Manager */}
        <div className="w-[42%] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-pink-500/5 to-transparent" />
          <AdManagerMockup />
        </div>
      </div>
      
      <SlideFooter slideNum={3} totalSlides={totalSlides} />
    </div>,

    // Slide 4: Cooperation process
    <div key="4" className="w-full h-full relative overflow-hidden bg-black">
      <NeonGlow />
      <FloatingElements />
      
      <div className="relative z-10 h-full flex flex-col px-14 py-8">
        <SlideHeader subtitle="Jak to wygląda" />
        
        <h2 className="text-4xl font-bold text-white mb-2 animate-slide-up">
          Przebieg <span className="text-pink-400">współpracy</span>
        </h2>
        <p className="text-zinc-400 mb-6 animate-slide-up" style={{ animationDelay: '50ms' }}>
          Przejrzysty proces od początku do końca
        </p>

        <div className="grid grid-cols-4 gap-4 flex-1">
          {[
            {
              step: "01",
              icon: Search,
              title: "Rozmowa",
              desc: "Poznajemy Twój salon, klientki i cele. Sprawdzamy co działało, a co nie.",
              details: ["Analiza profili", "Określenie grupy docelowej", "Ustalenie budżetu"]
            },
            {
              step: "02",
              icon: FileText,
              title: "Strategia",
              desc: "Przygotowujemy plan kampanii dopasowany do Twojego salonu.",
              details: ["Kreacje reklamowe", "Teksty i grafiki", "Harmonogram działań"]
            },
            {
              step: "03",
              icon: Megaphone,
              title: "Uruchomienie",
              desc: "Konfigurujemy i uruchamiamy kampanie. Ty nie musisz nic robić.",
              details: ["Konfiguracja reklam", "Targetowanie", "Optymalizacja budżetu"]
            },
            {
              step: "04",
              icon: LineChart,
              title: "Raportowanie",
              desc: "Co miesiąc dostajesz raport z wynikami i rekomendacjami.",
              details: ["Zasięgi i kliknięcia", "Koszt pozyskania", "Kolejne kroki"]
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 hover:border-pink-500/30 transition-all animate-slide-up group"
              style={{ animationDelay: `${150 + idx * 100}ms` }}
            >
              <div className="absolute -top-2 -left-2 w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-white font-bold text-xs">{item.step}</span>
              </div>
              
              <div className="mt-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 flex items-center justify-center mb-3 border border-pink-500/30">
                  <item.icon className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                
                <div className="space-y-1.5">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-500/70" />
                      <span className="text-xs text-zinc-500">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {idx < 3 && (
                <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 hidden xl:block">
                  <ArrowRight className="w-5 h-5 text-pink-500/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-xl p-3 border border-pink-500/20 animate-slide-up" style={{ animationDelay: '550ms' }}>
          <p className="text-zinc-300 text-center text-sm">
            <span className="text-pink-400 font-semibold">Bez umów na rok</span> — 
            współpracujemy miesiąc do miesiąca. Jeśli nie będziesz zadowolona, możesz zrezygnować.
          </p>
        </div>
        
        <SlideFooter slideNum={4} totalSlides={totalSlides} />
      </div>
    </div>,

    // Slide 5: Results / Testimonials
    <div key="5" className="w-full h-full relative overflow-hidden bg-black">
      <NeonGlow />
      <FloatingElements />
      
      <div className="relative z-10 h-full flex flex-col px-14 py-8">
        <SlideHeader subtitle="Efekty współpracy" />
        
        <h2 className="text-4xl font-bold text-white mb-6 animate-slide-up">
          Co mówią <span className="text-pink-400">właścicielki salonów</span>
        </h2>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              name: "Kasia M.",
              salon: "Studio kosmetyczne",
              city: "Nowy Sącz",
              quote: "Wcześniej sama wrzucałam posty i liczyłam na cud. Teraz mam stały napływ nowych klientek.",
              results: [
                { label: "Zasięg/mies.", value: "32,000+" },
                { label: "Nowe klientki", value: "+28" },
              ]
            },
            {
              salon: "Salon fryzjerski",
              name: "Anna K.",
              city: "Zamość",
              quote: "Myślałam, że reklamy to tylko dla dużych firm. Okazuje się, że przy dobrej strategii nawet mały salon może konkurować.",
              results: [
                { label: "Zasięg/mies.", value: "41,000+" },
                { label: "Nowe klientki", value: "+35" },
              ]
            },
            {
              name: "Monika T.",
              salon: "Studio urody",
              city: "Krosno",
              quote: "Wreszcie wiem na co idą moje pieniądze. Raporty pokazują dokładnie ile osób zobaczyło reklamę i ile zadzwoniło.",
              results: [
                { label: "Zasięg/mies.", value: "27,000+" },
                { label: "Nowe klientki", value: "+22" },
              ]
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 hover:border-pink-500/30 transition-all animate-slide-up flex flex-col"
              style={{ animationDelay: `${100 + idx * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/30">
                  {item.name.split(' ')[0][0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-zinc-500 text-sm">{item.salon}, {item.city}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1 mb-4">
                <p className="text-zinc-300 leading-relaxed text-sm italic">"{item.quote}"</p>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 gap-2">
                {item.results.map((result, rIdx) => (
                  <div key={rIdx} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-pink-400">{result.value}</p>
                    <p className="text-xs text-zinc-500">{result.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-zinc-900/60 rounded-xl p-3 border border-zinc-800 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <p className="text-zinc-500 text-sm text-center">
            Wyniki mogą się różnić w zależności od lokalizacji, konkurencji i budżetu reklamowego.
          </p>
        </div>
        
        <SlideFooter slideNum={5} totalSlides={totalSlides} />
      </div>
    </div>,

    // Slide 6: Contact
    <div key="6" className="w-full h-full relative overflow-hidden bg-black">
      <NeonGlow />
      <FloatingElements />
      
      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-16">
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-3">
              <img src={agencyLogo} alt="Aurine Agency" className="w-16 h-16 object-contain" />
              <div>
                <p className="text-pink-400 font-bold text-xl">Aurine Agency</p>
                <p className="text-zinc-500">Specjaliści od reklam dla beauty</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-white">
                Porozmawiajmy o<br />
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
                  Twoim salonie
                </span>
              </h2>
              <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                Umów się na bezpłatną rozmowę. Opowiemy jak możemy pomóc 
                Twojemu salonowi przyciągnąć nowe klientki.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all max-w-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30">
                  <Mail className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Email</p>
                  <p className="text-white font-medium">kontakt@aurine.pl</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all max-w-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30">
                  <Phone className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Telefon</p>
                  <p className="text-white font-medium">+48 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900/80 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all max-w-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30">
                  <Globe className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Strona</p>
                  <p className="text-white font-medium">aurine.pl</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="w-[42%] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-pink-500/10 to-transparent" />
          
          <div className="relative animate-scale-in">
            <div className="bg-zinc-900/90 backdrop-blur rounded-3xl p-8 border border-zinc-800 shadow-xl shadow-pink-500/10 text-center max-w-xs">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-pink-500/30">
                <Heart className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">
                Dziękuję za uwagę
              </h3>
              <p className="text-zinc-500 text-sm mb-5">
                Prezentacja dla
              </p>
              
              <div className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700">
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {data.ownerName || "Ciebie"}
                </p>
                <p className="text-white mt-1">{data.salonName || "Twój Salon"}</p>
                <p className="text-zinc-500 text-sm">{data.city || "Polska"}</p>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                  <Facebook className="w-5 h-5 text-blue-400" />
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center border border-pink-500/30">
                  <Instagram className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SlideFooter slideNum={6} totalSlides={totalSlides} />
    </div>,
  ];

  return (
    <div 
      id="presentation-preview"
      className="w-[1600px] h-[900px] overflow-hidden relative transition-all duration-700 ease-out"
    >
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
      `}</style>
      
      {slides[currentSlide - 1]}
    </div>
  );
};
