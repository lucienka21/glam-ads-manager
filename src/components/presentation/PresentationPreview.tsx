import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, LineChart,
  XCircle, Eye, DollarSign, Megaphone,
  Scissors, Palette, UserCheck, Send, Play
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

export const PresentationPreview = ({ data, currentSlide }: PresentationPreviewProps) => {
  const totalSlides = 6;

  // Slide 1: Cover
  const Slide1 = () => (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-pink-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="w-[55%] h-full flex flex-col justify-center px-20">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <img src={agencyLogo} alt="Aurine" className="w-16 h-16 object-contain" />
            <div>
              <p className="text-pink-400 font-bold text-xl tracking-wide">AURINE AGENCY</p>
              <p className="text-zinc-500 text-sm">Facebook & Instagram Ads dla Beauty</p>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl font-black text-white leading-[1.1] mb-6">
            Skuteczna reklama<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              dla Twojego salonu
            </span>
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-lg">
            Pomagamy salonom beauty w małych miastach przyciągać nowe klientki 
            dzięki przemyślanym kampaniom na Facebooku i Instagramie.
          </p>

          {/* Personal info card */}
          <div className="bg-zinc-900/90 backdrop-blur rounded-2xl p-6 border border-zinc-800 max-w-md">
            <p className="text-zinc-500 text-sm mb-1">Prezentacja przygotowana dla</p>
            <p className="text-3xl font-bold text-white mb-1">{data.ownerName || "Ciebie"}</p>
            <p className="text-pink-400 font-semibold text-lg">{data.salonName || "Twój Salon"}</p>
            <p className="text-zinc-500">{data.city || "Polska"}</p>
          </div>

          {/* Platform badges */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-5 py-3 bg-blue-600/15 rounded-xl border border-blue-500/30">
              <Facebook className="w-6 h-6 text-blue-400" />
              <span className="text-blue-300 font-semibold">Facebook Ads</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-pink-600/15 rounded-xl border border-pink-500/30">
              <Instagram className="w-6 h-6 text-pink-400" />
              <span className="text-pink-300 font-semibold">Instagram Ads</span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="w-[45%] h-full flex items-center justify-center relative">
          {/* Phone mockup */}
          <div className="relative">
            <div className="w-72 h-[500px] bg-zinc-900 rounded-[48px] p-2 shadow-2xl shadow-pink-500/20 border border-zinc-700">
              <div className="w-full h-full bg-black rounded-[40px] overflow-hidden relative">
                {/* Instagram header */}
                <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
                  <Instagram className="w-5 h-5 text-pink-400" />
                  <span className="text-sm font-semibold text-white">{data.salonName || 'salon_beauty'}</span>
                  <Heart className="w-5 h-5 text-zinc-500" />
                </div>
                
                {/* Sponsored post */}
                <div className="px-4 py-2 flex items-center justify-between bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                      <Flower2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-white font-medium">{data.salonName || 'Twój Salon'}</span>
                  </div>
                  <span className="text-xs text-zinc-500">Sponsorowane</span>
                </div>
                
                {/* Ad content */}
                <div className="aspect-square bg-gradient-to-br from-pink-900/50 via-zinc-900 to-fuchsia-900/40 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2),transparent_60%)]" />
                  <div className="text-center p-6 relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/40">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-pink-300 font-bold text-xl mb-2">-20% na pierwszy zabieg</p>
                    <p className="text-zinc-400">Tylko do końca tygodnia</p>
                  </div>
                </div>
                
                {/* Engagement */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-4">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                    <MessageCircle className="w-6 h-6 text-zinc-500" />
                    <Send className="w-6 h-6 text-zinc-500" />
                  </div>
                  <p className="text-sm text-white font-semibold">2,847 polubień</p>
                  <p className="text-xs text-zinc-500">Zobacz wszystkie 43 komentarze</p>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -left-28 top-16 bg-zinc-900/95 backdrop-blur rounded-xl p-4 shadow-lg border border-pink-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Zasięg</p>
                  <p className="text-lg font-bold text-white">12,400</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-24 top-40 bg-zinc-900/95 backdrop-blur rounded-xl p-4 shadow-lg border border-pink-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Nowe klientki</p>
                  <p className="text-lg font-bold text-pink-400">+24</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-20 bottom-28 bg-zinc-900/95 backdrop-blur rounded-xl p-4 shadow-lg border border-pink-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">CTR</p>
                  <p className="text-lg font-bold text-white">4.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 px-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
          <span className="text-zinc-600 text-sm">aurine.pl</span>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(totalSlides)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === 0 ? 'w-8 bg-pink-500' : 'w-2 bg-zinc-700'}`} />
          ))}
        </div>
        <span className="text-zinc-600 text-sm">Marketing dla branży beauty</span>
      </div>
    </div>
  );

  // Slide 2: Common mistakes
  const Slide2 = () => (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-600 text-xs">Dlaczego to nie działa</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-zinc-400">Ads</span>
            </div>
            <div className="px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="text-xs text-zinc-400">Ads</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-black text-white mb-3">
          Najczęstsze <span className="text-pink-400">błędy salonów</span>
        </h2>
        <p className="text-xl text-zinc-400 mb-10">Czy któryś z tych problemów brzmi znajomo?</p>

        {/* Mistakes grid */}
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { 
              icon: XCircle, 
              title: "Post ≠ Reklama", 
              desc: "Wrzucasz zdjęcia i liczysz na klientki. Algorytm pokazuje Twoje posty tylko 5-10% obserwujących.",
              highlight: true
            },
            { 
              icon: Users, 
              title: "Organiczne zasięgi", 
              desc: "\"Mam 500 obserwujących\". Organiczne zasięgi spadły o 80%. Bez reklamy jesteś niewidoczna.",
              highlight: true
            },
            { 
              icon: Target, 
              title: "Brak targetowania", 
              desc: "Promujesz do wszystkich, zamiast do kobiet 25-45 zainteresowanych urodą w Twoim mieście.",
              highlight: false
            },
            { 
              icon: DollarSign, 
              title: "\"Próbowałam, nie działa\"", 
              desc: "50 zł na \"promuj post\" i rezygnacja. Bez strategii i optymalizacji to przepalone pieniądze.",
              highlight: false
            },
            { 
              icon: Clock, 
              title: "Nieregularność", 
              desc: "Raz na miesiąc coś wrzucisz, potem cisza. Algorytm karze za brak aktywności.",
              highlight: false
            },
            { 
              icon: MessageCircle, 
              title: "Brak CTA", 
              desc: "\"Piękne zdjęcie\" bez info jak zarezerwować, ile kosztuje. Klientka scrolluje dalej.",
              highlight: false
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl p-5 transition-all ${
                item.highlight 
                  ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/10 border-2 border-pink-500/40' 
                  : 'bg-zinc-900/80 border border-zinc-800'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                item.highlight 
                  ? 'bg-pink-500/30 border border-pink-500/50' 
                  : 'bg-zinc-800 border border-zinc-700'
              }`}>
                <item.icon className={`w-6 h-6 ${item.highlight ? 'text-pink-400' : 'text-zinc-400'}`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${item.highlight ? 'text-pink-300' : 'text-white'}`}>
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-6 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-xl p-4 border border-pink-500/30">
          <p className="text-zinc-300 text-center">
            <span className="text-pink-400 font-bold">Dobra wiadomość:</span> wszystkie te problemy da się rozwiązać dzięki przemyślanej strategii reklamowej
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
            <span className="text-zinc-600 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 1 ? 'w-8 bg-pink-500' : 'w-2 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 3: Why Ads work
  const Slide3 = () => (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-pink-500/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="w-[55%] h-full flex flex-col justify-center px-20">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-600 text-xs">Rozwiązanie</p>
            </div>
          </div>

          <h2 className="text-5xl font-black text-white mb-4">
            Dlaczego <span className="text-pink-400">płatna reklama</span> działa?
          </h2>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-lg">
            Facebook i Instagram to miejsca, gdzie Twoje przyszłe klientki spędzają czas każdego dnia.
          </p>

          <div className="space-y-4">
            {[
              { icon: Target, title: "Precyzyjne dotarcie", desc: "Reklamy trafiają do kobiet 25-45 zainteresowanych urodą w promieniu 15km" },
              { icon: Eye, title: "Gwarancja wyświetleń", desc: "Twoja reklama dotrze do tysięcy osób, nie tylko 5% obserwujących" },
              { icon: DollarSign, title: "Kontrola budżetu", desc: "Ty decydujesz ile wydajesz. Start już od 500 zł miesięcznie" },
              { icon: BarChart3, title: "Mierzalne efekty", desc: "Wiesz dokładnie ile osób zobaczyło reklamę i ile kliknęło" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-900/70 rounded-xl p-4 border border-zinc-800 hover:border-pink-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30 flex-shrink-0">
                  <item.icon className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-white font-bold">{item.title}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual - Ad Manager */}
        <div className="w-[45%] h-full flex items-center justify-center relative px-10">
          <div className="bg-zinc-900/95 backdrop-blur rounded-3xl p-8 border border-zinc-800 shadow-2xl w-full max-w-md">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Menedżer reklam</p>
                <p className="text-zinc-500 text-sm">Panel kampanii</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-zinc-800/70 rounded-xl">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-zinc-300">Zasięg</span>
                </div>
                <span className="text-white font-bold text-xl">45,230</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-800/70 rounded-xl">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <span className="text-zinc-300">Kliknięcia</span>
                </div>
                <span className="text-white font-bold text-xl">1,847</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-zinc-800/70 rounded-xl">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-purple-400" />
                  <span className="text-zinc-300">Konwersje</span>
                </div>
                <span className="text-white font-bold text-xl">127</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-pink-500/15 rounded-xl border border-pink-500/30">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-pink-400" />
                  <span className="text-zinc-300">Koszt/klientka</span>
                </div>
                <span className="text-pink-400 font-bold text-xl">7,87 zł</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-zinc-500 text-sm">Przykładowe wyniki kampanii</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 px-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
          <span className="text-zinc-600 text-sm">aurine.pl</span>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(totalSlides)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === 2 ? 'w-8 bg-pink-500' : 'w-2 bg-zinc-700'}`} />
          ))}
        </div>
        <span className="text-zinc-600 text-sm">Marketing dla branży beauty</span>
      </div>
    </div>
  );

  // Slide 4: Cooperation process
  const Slide4 = () => (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-to-r from-pink-500/10 via-fuchsia-500/5 to-rose-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-600 text-xs">Jak to wygląda</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-zinc-400">Ads</span>
            </div>
            <div className="px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="text-xs text-zinc-400">Ads</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-black text-white mb-2">
          Przebieg <span className="text-pink-400">współpracy</span>
        </h2>
        <p className="text-xl text-zinc-400 mb-8">Przejrzysty proces od początku do końca</p>

        {/* Process steps */}
        <div className="grid grid-cols-4 gap-6 flex-1">
          {[
            {
              num: "01",
              icon: Search,
              title: "Rozmowa",
              desc: "Poznajemy Twój salon, klientki i cele. Sprawdzamy co działało, a co nie.",
              details: ["Analiza profili", "Określenie grupy docelowej", "Ustalenie budżetu"]
            },
            {
              num: "02",
              icon: FileText,
              title: "Strategia",
              desc: "Przygotowujemy plan kampanii dopasowany do Twojego salonu.",
              details: ["Kreacje reklamowe", "Teksty i grafiki", "Harmonogram działań"]
            },
            {
              num: "03",
              icon: Play,
              title: "Uruchomienie",
              desc: "Konfigurujemy i uruchamiamy kampanie. Ty nie musisz nic robić.",
              details: ["Konfiguracja reklam", "Targetowanie", "Optymalizacja"]
            },
            {
              num: "04",
              icon: LineChart,
              title: "Raportowanie",
              desc: "Co miesiąc dostajesz raport z wynikami i rekomendacjami.",
              details: ["Zasięgi i kliknięcia", "Koszt pozyskania", "Kolejne kroki"]
            }
          ].map((item, idx) => (
            <div key={idx} className="relative bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6 flex flex-col">
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-white font-bold text-sm">{item.num}</span>
              </div>
              
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 flex items-center justify-center mb-4 mt-2 border border-pink-500/30">
                <item.icon className="w-7 h-7 text-pink-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>
              
              <div className="space-y-2 pt-4 border-t border-zinc-800">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-zinc-500">{detail}</span>
                  </div>
                ))}
              </div>

              {idx < 3 && (
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-pink-500/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-6 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-xl p-4 border border-pink-500/30">
          <p className="text-zinc-300 text-center text-lg">
            <span className="text-pink-400 font-bold">Bez umów na rok</span> — współpracujemy miesiąc do miesiąca. Jeśli nie będziesz zadowolona, możesz zrezygnować.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
            <span className="text-zinc-600 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 3 ? 'w-8 bg-pink-500' : 'w-2 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 5: Testimonials
  const Slide5 = () => (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-600 text-xs">Efekty współpracy</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-black text-white mb-8">
          Co mówią <span className="text-pink-400">właścicielki salonów</span>
        </h2>

        {/* Testimonials */}
        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            {
              name: "Kasia M.",
              salon: "Studio kosmetyczne",
              city: "Nowy Sącz",
              quote: "Wcześniej sama wrzucałam posty i liczyłam na cud. Teraz mam stały napływ nowych klientek. Grafik jest pełny na 3 tygodnie do przodu.",
              stats: [{ label: "Zasięg/mies.", value: "32,000+" }, { label: "Nowe klientki", value: "+28" }]
            },
            {
              name: "Anna K.",
              salon: "Salon fryzjerski",
              city: "Zamość",
              quote: "Myślałam, że reklamy to tylko dla dużych firm. Przy dobrej strategii nawet mały salon może konkurować z sieciówkami.",
              stats: [{ label: "Zasięg/mies.", value: "41,000+" }, { label: "Nowe klientki", value: "+35" }]
            },
            {
              name: "Monika T.",
              salon: "Studio urody",
              city: "Krosno",
              quote: "Wreszcie wiem na co idą moje pieniądze. Raporty pokazują dokładnie ile osób zobaczyło reklamę i ile z tego klientek przyszło.",
              stats: [{ label: "Zasięg/mies.", value: "27,000+" }, { label: "Nowe klientki", value: "+22" }]
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6 flex flex-col">
              {/* Author */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/30">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{item.name}</p>
                  <p className="text-zinc-500 text-sm">{item.salon}, {item.city}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1 mb-5">
                <p className="text-zinc-300 leading-relaxed italic text-lg">"{item.quote}"</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {item.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="bg-zinc-800/70 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-pink-400">{stat.value}</p>
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-5 bg-zinc-900/60 rounded-xl p-3 border border-zinc-800">
          <p className="text-zinc-500 text-sm text-center">
            Wyniki mogą się różnić w zależności od lokalizacji, konkurencji i budżetu reklamowego.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
            <span className="text-zinc-600 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 4 ? 'w-8 bg-pink-500' : 'w-2 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 6: Contact
  const Slide6 = () => (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-500/15 via-fuchsia-500/10 to-rose-500/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="w-[55%] h-full flex flex-col justify-center px-20">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <img src={agencyLogo} alt="Aurine" className="w-20 h-20 object-contain" />
            <div>
              <p className="text-pink-400 font-bold text-2xl tracking-wide">AURINE AGENCY</p>
              <p className="text-zinc-500">Specjaliści od reklam dla beauty</p>
            </div>
          </div>

          <h2 className="text-5xl font-black text-white mb-4">
            Porozmawiajmy o<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Twoim salonie
            </span>
          </h2>

          <p className="text-xl text-zinc-400 max-w-lg leading-relaxed mb-10">
            Umów się na bezpłatną rozmowę. Opowiemy jak możemy pomóc Twojemu salonowi przyciągnąć nowe klientki.
          </p>

          {/* Contact info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-5 border border-zinc-800 max-w-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30">
                <Mail className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Email</p>
                <p className="text-white font-semibold text-lg">kontakt@aurine.pl</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-5 border border-zinc-800 max-w-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30">
                <Phone className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Telefon</p>
                <p className="text-white font-semibold text-lg">+48 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-5 border border-zinc-800 max-w-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/20 flex items-center justify-center border border-pink-500/30">
                <Globe className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-zinc-500 text-sm">Strona</p>
                <p className="text-white font-semibold text-lg">aurine.pl</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="w-[45%] h-full flex items-center justify-center relative">
          <div className="bg-zinc-900/95 backdrop-blur rounded-3xl p-10 border border-zinc-800 shadow-2xl text-center max-w-sm">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-pink-500/30">
              <Heart className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Dziękuję za uwagę</h3>
            <p className="text-zinc-500 mb-6">Prezentacja przygotowana dla</p>
            
            <div className="bg-zinc-800/70 rounded-xl p-6 border border-zinc-700">
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                {data.ownerName || "Ciebie"}
              </p>
              <p className="text-white text-lg mt-2">{data.salonName || "Twój Salon"}</p>
              <p className="text-zinc-500">{data.city || "Polska"}</p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Facebook className="w-6 h-6 text-blue-400" />
              </div>
              <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center border border-pink-500/30">
                <Instagram className="w-6 h-6 text-pink-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 px-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-50" />
          <span className="text-zinc-600 text-sm">aurine.pl</span>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(totalSlides)].map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === 5 ? 'w-8 bg-pink-500' : 'w-2 bg-zinc-700'}`} />
          ))}
        </div>
        <span className="text-zinc-600 text-sm">Marketing dla branży beauty</span>
      </div>
    </div>
  );

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlideComponent = slides[currentSlide - 1];

  return (
    <div 
      id="presentation-preview"
      className="w-[1600px] h-[900px] overflow-hidden relative bg-black"
    >
      <CurrentSlideComponent />
    </div>
  );
};