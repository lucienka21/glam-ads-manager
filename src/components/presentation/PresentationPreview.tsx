import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  AlertTriangle, Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Shield, Zap,
  Award, Clock, PieChart, Rocket, Instagram, Facebook,
  Eye, MousePointer, Calendar, Gift, Scissors, Palette
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

// Decorative Beauty Elements
const BeautyBlob = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <path
      fill="currentColor"
      d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.2C64.8,55.2,53.8,66.6,40.4,74.4C27,82.2,11.2,86.4,-3.8,85.1C-18.8,83.8,-37.5,77,-52.3,66.2C-67.1,55.5,-77.9,40.8,-83.2,24.2C-88.5,7.6,-88.3,-10.9,-82.8,-27.4C-77.3,-43.9,-66.5,-58.4,-52.4,-65.6C-38.3,-72.8,-19.2,-72.7,-1.2,-70.7C16.7,-68.7,33.5,-64.8,44.7,-76.4Z"
      transform="translate(100 100)"
    />
  </svg>
);

const FloatingCircles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
  </div>
);

const InstagramMockup = ({ className }: { className?: string }) => (
  <div className={`bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-[2px] ${className}`}>
    <div className="bg-zinc-900 rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500" />
        <div>
          <p className="text-xs font-semibold text-white">salon_beauty</p>
          <p className="text-[10px] text-zinc-500">Sponsorowane</p>
        </div>
      </div>
      <div className="aspect-square bg-gradient-to-br from-pink-200 via-rose-100 to-pink-50 rounded-lg mb-3 flex items-center justify-center">
        <Scissors className="w-12 h-12 text-pink-400" />
      </div>
      <div className="flex gap-4 mb-2">
        <Heart className="w-5 h-5 text-white" />
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
      <p className="text-[10px] text-zinc-400">❤️ 1,234 polubień</p>
    </div>
  </div>
);

const FacebookAdMockup = ({ className }: { className?: string }) => (
  <div className={`bg-zinc-800 rounded-2xl p-4 border border-zinc-700 ${className}`}>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">Twój Salon Beauty</p>
        <p className="text-[10px] text-zinc-500">Sponsorowane · <Globe className="w-3 h-3 inline" /></p>
      </div>
    </div>
    <p className="text-sm text-zinc-300 mb-3">✨ Zarezerwuj zabieg i zyskaj 20% rabatu! Tylko do końca miesiąca 💅</p>
    <div className="aspect-video bg-gradient-to-br from-pink-100 via-rose-50 to-white rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDIzNiwgNzIsIDE1MywgMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
      <div className="text-center z-10">
        <Palette className="w-10 h-10 text-pink-400 mx-auto mb-2" />
        <p className="text-xs font-medium text-pink-600">Profesjonalne zabiegi</p>
      </div>
    </div>
    <button className="w-full bg-pink-500 text-white text-sm font-semibold py-2 rounded-lg">
      Zarezerwuj teraz
    </button>
  </div>
);

const MetricCard = ({ value, label, icon: Icon, color }: { value: string; label: string; icon: any; color: string }) => (
  <div className={`bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-${color}-500/20 group hover:border-${color}-500/50 transition-all duration-500`}>
    <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 text-${color}-400`} />
    </div>
    <p className={`text-4xl font-bold text-${color}-400 mb-1`}>{value}</p>
    <p className="text-sm text-zinc-400">{label}</p>
  </div>
);

export const PresentationPreview = ({ data, currentSlide }: PresentationPreviewProps) => {
  const slides = [
    // Slide 1: Cover - Beauty focused
    <div key="1" className="w-full h-full bg-zinc-950 flex relative overflow-hidden">
      <FloatingCircles />
      
      {/* Left side - Content */}
      <div className="flex-1 flex flex-col justify-center px-20 relative z-10">
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-pink-500/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-pink-400 tracking-widest uppercase">Aurine Agency</p>
              <p className="text-xs text-zinc-500">Marketing dla branży beauty</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white leading-tight">
              Więcej klientek<br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
                w Twoim salonie
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-md">
              Skuteczne kampanie Facebook & Instagram Ads dla salonów beauty
            </p>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <Facebook className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Facebook Ads</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Instagram className="w-5 h-5 text-pink-400" />
              <span className="text-sm">Instagram Ads</span>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm">Prezentacja przygotowana dla</p>
            <p className="text-2xl font-bold text-white mt-1">{data.ownerName || "Ciebie"}</p>
            <p className="text-pink-400">{data.salonName || "Twój Salon"} • {data.city || "Polska"}</p>
          </div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-l from-pink-500/10 to-transparent" />
        
        {/* Floating social media mockups */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute top-32 right-20 transform rotate-3 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <InstagramMockup className="w-56 shadow-2xl shadow-pink-500/20" />
          </div>
          <div className="absolute bottom-32 right-40 transform -rotate-6 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <FacebookAdMockup className="w-72 shadow-2xl shadow-blue-500/20" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-pink-500/20 rounded-full" />
          <div className="absolute bottom-40 left-10 w-20 h-20 border border-rose-500/20 rounded-full" />
        </div>
      </div>
    </div>,

    // Slide 2: Problem - Beauty salon mistakes
    <div key="2" className="w-full h-full bg-zinc-950 flex flex-col p-16 relative overflow-hidden">
      <FloatingCircles />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-amber-400 text-sm tracking-wider uppercase">Czy rozpoznajesz te problemy?</p>
            <h2 className="text-4xl font-bold text-white">Najczęstsze błędy salonów beauty</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { 
              icon: Target, 
              title: "Reklamy do wszystkich", 
              desc: "Targetujesz całe miasto zamiast kobiet realnie zainteresowanych zabiegami w Twojej okolicy",
              color: "amber"
            },
            { 
              icon: PieChart, 
              title: "Przepalony budżet", 
              desc: "Wydajesz 500-1000 zł miesięcznie bez wiedzy, czy to przynosi rezerwacje",
              color: "amber"
            },
            { 
              icon: Eye, 
              title: "Zdjęcia z telefonu", 
              desc: "Posty bez profesjonalnych zdjęć przed/po nie przyciągają uwagi w scrollowaniu",
              color: "amber"
            },
            { 
              icon: MousePointer, 
              title: "Brak przycisku rezerwacji", 
              desc: "Klientki widzą reklamę, ale nie mają prostej ścieżki do umówienia wizyty",
              color: "amber"
            },
            { 
              icon: BarChart3, 
              title: "Zero analizy", 
              desc: "Nie wiesz które reklamy działają, a które pochłaniają budżet bez efektu",
              color: "amber"
            },
            { 
              icon: Calendar, 
              title: "Raz na miesiąc post", 
              desc: "Nieregularna obecność = algorytm Cię karze i mniej osób widzi Twoje treści",
              color: "amber"
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 group animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all">
                <item.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-zinc-500">
            <span className="text-amber-400 font-semibold">87% salonów beauty</span> robi przynajmniej 3 z tych błędów
          </p>
        </div>
      </div>
    </div>,

    // Slide 3: Why Facebook & Instagram Ads
    <div key="3" className="w-full h-full bg-zinc-950 flex relative overflow-hidden">
      <FloatingCircles />
      
      {/* Left content */}
      <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-blue-400 text-sm tracking-wider uppercase">Dlaczego to działa?</p>
              <h2 className="text-4xl font-bold text-white">Facebook & Instagram Ads</h2>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { 
                icon: Users, 
                stat: "3.5M", 
                label: "Polskich kobiet 25-55 lat",
                desc: "aktywnych dziennie na Facebooku i Instagramie"
              },
              { 
                icon: Target, 
                stat: "97%", 
                label: "Precyzja targetowania",
                desc: "docierasz tylko do kobiet zainteresowanych beauty w Twoim mieście"
              },
              { 
                icon: Zap, 
                stat: "7 dni", 
                label: "Pierwsze rezerwacje",
                desc: "nowe klientki nawet w pierwszym tygodniu kampanii"
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 bg-zinc-900/50 backdrop-blur-sm rounded-xl p-5 border border-zinc-800 hover:border-blue-500/30 transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-400">{item.stat}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right visual */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/5 to-transparent" />
        
        <div className="relative">
          {/* Phone mockup with Instagram */}
          <div className="w-72 h-[500px] bg-zinc-900 rounded-[40px] p-3 border-4 border-zinc-800 shadow-2xl animate-scale-in">
            <div className="w-full h-full bg-zinc-950 rounded-[32px] overflow-hidden">
              {/* Instagram header */}
              <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
                <Instagram className="w-6 h-6 text-white" />
                <Heart className="w-6 h-6 text-white" />
              </div>
              
              {/* Story bubbles */}
              <div className="px-4 py-3 flex gap-3 border-b border-zinc-800">
                {['Twój salon', 'Promo', 'Zabiegi'].map((label, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-14 h-14 rounded-full p-[2px] bg-gradient-to-br ${i === 0 ? 'from-pink-500 to-rose-500' : 'from-zinc-700 to-zinc-600'}`}>
                      <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
                        <Sparkles className={`w-5 h-5 ${i === 0 ? 'text-pink-400' : 'text-zinc-500'}`} />
                      </div>
                    </div>
                    <span className="text-[9px] text-zinc-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Post */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500" />
                  <div>
                    <p className="text-xs font-semibold text-white">{data.salonName || 'salon_beauty'}</p>
                    <p className="text-[9px] text-zinc-500">Sponsorowane</p>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-50 rounded-lg mb-2 flex items-center justify-center">
                  <div className="text-center">
                    <Gift className="w-10 h-10 text-pink-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-pink-600">-20% na pierwszy zabieg!</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating metrics */}
          <div className="absolute -left-32 top-20 bg-zinc-900/90 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 shadow-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-xs text-zinc-500">Zasięg</p>
            <p className="text-2xl font-bold text-emerald-400">+340%</p>
          </div>
          <div className="absolute -left-24 bottom-32 bg-zinc-900/90 backdrop-blur-sm rounded-xl p-4 border border-zinc-800 shadow-xl animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p className="text-xs text-zinc-500">Rezerwacje</p>
            <p className="text-2xl font-bold text-pink-400">+178</p>
          </div>
        </div>
      </div>
    </div>,

    // Slide 4: What we provide
    <div key="4" className="w-full h-full bg-zinc-950 flex flex-col p-16 relative overflow-hidden">
      <FloatingCircles />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-pink-400 text-sm tracking-wider uppercase">Co dostajesz?</p>
            <h2 className="text-4xl font-bold text-white">Pełna obsługa kampanii</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Strategia i kreacje
            </h3>
            {[
              "Analiza Twojego salonu i konkurencji",
              "Strategia kampanii dopasowana do celów",
              "Profesjonalne kreacje reklamowe",
              "Teksty sprzedażowe dla beauty",
              "Grafiki przed/po, promocje, oferty",
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-white">{item}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Optymalizacja i raportowanie
            </h3>
            {[
              "Konfiguracja piksela i śledzenia",
              "Codzienne monitorowanie wyników",
              "Testy A/B kreacji i grup",
              "Remarketing dla niezdecydowanych",
              "Comiesięczne raporty z wynikami",
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 hover:border-blue-500/30 transition-all animate-fade-in"
                style={{ animationDelay: `${(idx + 5) * 80}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus */}
        <div className="mt-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">Bonus: Stały kontakt i konsultacje</p>
              <p className="text-zinc-400 text-sm">Odpowiadamy na pytania, doradzamy, optymalizujemy na bieżąco</p>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 5: Case Study / Results
    <div key="5" className="w-full h-full bg-zinc-950 flex relative overflow-hidden">
      <FloatingCircles />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col p-16 relative z-10">
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-emerald-400 text-sm tracking-wider uppercase">Case Study</p>
            <h2 className="text-4xl font-bold text-white">Realne wyniki</h2>
          </div>
        </div>

        {/* Results comparison */}
        <div className="bg-zinc-900/60 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-zinc-400 text-sm">Salon kosmetyczny • Warszawa</p>
              <p className="text-2xl font-bold text-white">3 miesiące współpracy</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold">ROI: 420%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "Zasięg", before: "2,000", after: "85,000", change: "+4150%" },
              { label: "Kliknięcia", before: "50", after: "3,500", change: "+6900%" },
              { label: "Rezerwacje", before: "5", after: "178", change: "+3460%" },
              { label: "Koszt/rez.", before: "—", after: "28 PLN", change: "" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center animate-fade-in" style={{ animationDelay: `${300 + idx * 100}ms` }}>
                <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">{stat.label}</p>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-zinc-600 line-through text-sm">{stat.before}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-500 rotate-90" />
                  <span className="text-3xl font-bold text-emerald-400">{stat.after}</span>
                  {stat.change && <span className="text-xs text-emerald-500">{stat.change}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini report preview */}
        <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 animate-fade-in" style={{ animationDelay: '700ms' }}>
          <p className="text-zinc-400 text-sm mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Fragment raportu z naszego systemu
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Wyświetlenia", value: "150,000", color: "white" },
              { label: "CTR", value: "2.33%", color: "pink" },
              { label: "Konwersje", value: "245", color: "white" },
              { label: "ROI", value: "420%", color: "emerald" },
            ].map((item, idx) => (
              <div key={idx} className="bg-black/50 rounded-xl p-4 border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.label}</p>
                <p className={`text-xl font-bold ${item.color === 'pink' ? 'text-pink-400' : item.color === 'emerald' ? 'text-emerald-400' : 'text-white'}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side visual */}
      <div className="w-96 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/5 to-transparent" />
        <div className="relative animate-scale-in" style={{ animationDelay: '400ms' }}>
          <div className="w-72 bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Studio Piękna</p>
                <p className="text-xs text-zinc-500">Warszawa, Mokotów</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Nowe klientki/mies.</span>
                <span className="font-bold text-emerald-400">+45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Średni przychód</span>
                <span className="font-bold text-emerald-400">+12,500 PLN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Koszt pozyskania</span>
                <span className="font-bold text-white">28 PLN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 6: Testimonials
    <div key="6" className="w-full h-full bg-zinc-950 flex flex-col p-16 relative overflow-hidden">
      <FloatingCircles />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-pink-400 text-sm tracking-wider uppercase">Opinie</p>
            <h2 className="text-4xl font-bold text-white">Co mówią nasze klientki</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
          {[
            {
              quote: "W pierwszy miesiąc mieliśmy 45 nowych rezerwacji. Wcześniej sama próbowałam i przepalałam pieniądze bez efektu.",
              author: "Anna K.",
              salon: "Beauty Studio Anna",
              city: "Warszawa",
              result: "+45 rezerwacji/mies."
            },
            {
              quote: "Profesjonalne podejście i świetne raporty. Wiem dokładnie za co płacę i jakie mam wyniki. W końcu reklamy, które działają!",
              author: "Marta W.",
              salon: "Salon Urody Marta",
              city: "Kraków",
              result: "+320% więcej klientek"
            },
            {
              quote: "Zespół Aurine rozumie branżę beauty. Wiedzą co przyciąga klientki i jak je przekonać do rezerwacji. Polecam!",
              author: "Karolina M.",
              salon: "Karolina Beauty",
              city: "Gdańsk",
              result: "ROI 380%"
            },
            {
              quote: "Najlepsza decyzja dla mojego salonu. Dzięki reklamom mam pełny grafik i listę oczekujących na zabiegi.",
              author: "Patrycja Z.",
              salon: "Studio Pazur",
              city: "Poznań",
              result: "Pełny grafik"
            },
          ].map((testimonial, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-pink-500/30 transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white leading-relaxed flex-1">"{testimonial.quote}"</p>
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-zinc-500">{testimonial.salon} • {testimonial.city}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-xs text-emerald-400 font-medium">{testimonial.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 7: CTA
    <div key="7" className="w-full h-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
      <FloatingCircles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/20 via-pink-500/5 to-transparent" />
      
      <div className="relative z-10 text-center space-y-8 px-16 max-w-4xl animate-fade-in">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-pink-500/30 animate-scale-in">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-5xl font-bold text-white leading-tight">
          Gotowa na więcej klientek<br />
          <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
            w {data.salonName || "Twoim salonie"}?
          </span>
        </h2>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Umów się na bezpłatną konsultację i dowiedz się, jak możemy pomóc rozwinąć Twój salon w {data.city || "Twoim mieście"}.
        </p>

        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl px-6 py-4 hover:border-pink-500/50 transition-all">
            <Phone className="w-5 h-5 text-pink-500" />
            <span className="text-white font-medium">+48 731 856 524</span>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl px-6 py-4 hover:border-pink-500/50 transition-all">
            <Mail className="w-5 h-5 text-pink-500" />
            <span className="text-white font-medium">kontakt@aurine.pl</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <Instagram className="w-5 h-5" />
            <span className="text-sm">@aurine.agency</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <Globe className="w-5 h-5" />
            <span className="text-sm">aurine.pl</span>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800">
          <p className="text-zinc-600 text-sm">Prezentacja przygotowana specjalnie dla</p>
          <p className="text-2xl font-bold text-pink-400 mt-1">{data.ownerName || "Ciebie"}</p>
          <p className="text-zinc-500">{data.salonName || "Twój Salon"} • {data.city || "Polska"}</p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div
      id="presentation-preview"
      className="w-[1600px] h-[900px] mx-auto overflow-hidden"
    >
      {slides[currentSlide] || slides[0]}
    </div>
  );
};

export const getTotalSlides = () => 7;
