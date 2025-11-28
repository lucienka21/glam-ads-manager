import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, LineChart,
  XCircle, Eye, DollarSign, Megaphone,
  Scissors, Palette, UserCheck, Send, Play,
  Gift, Shield, Rocket, ThumbsUp, Coffee,
  MapPin, Sparkle, CheckCircle, AlertCircle
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

  // Slide 1: Welcome - warm, personal introduction
  const Slide1 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Main gradient glow */}
        <div className="absolute top-1/4 right-1/4 w-[900px] h-[900px] bg-gradient-to-br from-pink-500/25 via-fuchsia-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-rose-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl" />
        
        {/* Floating beauty icons - decorative */}
        <div className="absolute top-20 right-32 w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center animate-pulse">
          <Flower2 className="w-8 h-8 text-pink-400/60" />
        </div>
        <div className="absolute top-40 right-56 w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <Sparkle className="w-6 h-6 text-fuchsia-400/60" />
        </div>
        <div className="absolute bottom-32 right-40 w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Heart className="w-7 h-7 text-rose-400/60" />
        </div>
        <div className="absolute top-32 left-[55%] w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
          <Scissors className="w-5 h-5 text-pink-400/50" />
        </div>
        <div className="absolute bottom-48 left-[60%] w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <Palette className="w-6 h-6 text-fuchsia-400/50" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-14">
        {/* Header with logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
            <div>
              <p className="text-pink-400 font-bold text-lg tracking-wide">AURINE AGENCY</p>
              <p className="text-zinc-500 text-sm">Marketing dla branży beauty</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-blue-600/15 rounded-xl border border-blue-500/30 flex items-center gap-2">
              <Facebook className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Facebook Ads</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-pink-600/15 to-fuchsia-600/15 rounded-xl border border-pink-500/30 flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-400" />
              <span className="text-pink-300 text-sm font-medium">Instagram Ads</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-3xl">
            {/* Warm greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/15 rounded-full border border-pink-500/30 mb-8">
              <Coffee className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300 text-sm font-medium">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            </div>

            {/* Main headline - warm tone */}
            <h1 className="text-6xl font-black text-white leading-[1.15] mb-8">
              Wiemy, że prowadzenie salonu<br />
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
                to nie lada wyzwanie
              </span>
            </h1>

            <p className="text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl">
              Codziennie dbasz o to, żeby Twoje klientki wychodziły zadowolone. 
              Zabiegi, grafik, zamówienia, prowadzenie social mediów... 
              <span className="text-pink-300 font-medium"> A skąd brać nowe klientki?</span>
            </p>

            {/* Personal info card */}
            <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 backdrop-blur rounded-2xl p-8 border border-pink-500/20 shadow-2xl shadow-pink-500/10 max-w-lg">
              <p className="text-zinc-400 text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Ta prezentacja jest dla Ciebie
              </p>
              <p className="text-4xl font-bold text-white mb-2">{data.ownerName || "Właścicielka"}</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
              </div>
              <p className="text-pink-400 font-semibold text-xl mb-1">{data.salonName || "Twój Salon"}</p>
              <p className="text-zinc-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400/70" />
                {data.city || "Twoje miasto"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === 0 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2.5 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-500 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 2: Understanding the challenge - empathetic tone
  const Slide2 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-pink-500/15 via-transparent to-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-500 text-xs">Rozumiemy Twoje wyzwania</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-pink-400/50" />
            <Sparkle className="w-4 h-4 text-fuchsia-400/50" />
            <Heart className="w-5 h-5 text-rose-400/50" />
          </div>
        </div>

        {/* Title - empathetic */}
        <div className="mb-8">
          <h2 className="text-5xl font-black text-white mb-4">
            Czy to brzmi <span className="text-pink-400">znajomo</span>?
          </h2>
          <p className="text-xl text-zinc-300">
            Wiele salonów w mniejszych miastach zmaga się z tymi samymi problemami...
          </p>
        </div>

        {/* Problems grid - 2 columns, more visual */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-6 border border-pink-500/20 h-[calc(50%-10px)]">
              <div className="flex items-start gap-4 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 flex items-center justify-center border border-pink-500/40 flex-shrink-0">
                  <Instagram className="w-7 h-7 text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Post ≠ Reklama</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Wrzucasz piękne zdjęcia zabiegów, ale algorytm pokazuje je tylko <span className="text-pink-400 font-semibold">5-10%</span> Twoich obserwujących. 
                    Reszta nawet nie wie, że coś publikujesz.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <Eye className="w-4 h-4" />
                    <span>Organiczne zasięgi spadły o 80% w ostatnich latach</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-6 border border-zinc-700/50 h-[calc(50%-10px)]">
              <div className="flex items-start gap-4 h-full">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700 flex-shrink-0">
                  <DollarSign className="w-7 h-7 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">"Próbowałam, nie działa"</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Kliknęłaś "Promuj post", wydałaś 50-100 zł i... nic. 
                    Bez strategii i odpowiednich ustawień to często przepalone pieniądze.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>Przycisk "Promuj" to nie jest prawdziwa reklama</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-6 border border-zinc-700/50 h-[calc(50%-10px)]">
              <div className="flex items-start gap-4 h-full">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700 flex-shrink-0">
                  <Target className="w-7 h-7 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Brak precyzji w reklamie</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Twoja reklama trafia do przypadkowych osób zamiast do kobiet w wieku 25-45 lat, 
                    zainteresowanych urodą, mieszkających w promieniu 15 km od Twojego salonu.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <MapPin className="w-4 h-4" />
                    <span>Targetowanie to klucz do skutecznej reklamy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-6 border border-zinc-700/50 h-[calc(50%-10px)]">
              <div className="flex items-start gap-4 h-full">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700 flex-shrink-0">
                  <Clock className="w-7 h-7 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Brak czasu i wiedzy</h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Między zabiegami, zamówieniami i prowadzeniem grafiku nie ma czasu na naukę 
                    skomplikowanego Menedżera reklam Facebooka.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <Coffee className="w-4 h-4" />
                    <span>Dlatego możemy to zrobić za Ciebie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message - hopeful */}
        <div className="mt-6 bg-gradient-to-r from-pink-500/15 via-fuchsia-500/10 to-pink-500/15 rounded-2xl p-5 border border-pink-500/30">
          <p className="text-lg text-center text-zinc-200">
            <span className="text-pink-400 font-bold">Dobra wiadomość:</span> W {data.city || "Twoim mieście"} wciąż mało salonów 
            korzysta z płatnych reklam — <span className="text-white font-semibold">to Twoja szansa, żeby być pierwsza!</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === 1 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2.5 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-500 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 3: How we help - the solution
  const Slide3 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[900px] h-[900px] bg-gradient-to-tl from-pink-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-500 text-xs">Jak możemy Ci pomóc</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-blue-600/15 rounded-xl border border-blue-500/30 flex items-center gap-2">
              <Facebook className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm">Ads</span>
            </div>
            <div className="px-4 py-2 bg-pink-600/15 rounded-xl border border-pink-500/30 flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-400" />
              <span className="text-pink-300 text-sm">Ads</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-5xl font-black text-white mb-4">
            Reklamy, które <span className="text-pink-400">działają</span>
          </h2>
          <p className="text-xl text-zinc-300">
            Zajmujemy się Twoimi reklamami od A do Z, a Ty możesz skupić się na tym, co robisz najlepiej — 
            <span className="text-pink-300 font-medium"> dbaniu o klientki.</span>
          </p>
        </div>

        {/* Main content - 2 columns */}
        <div className="flex-1 flex gap-8">
          {/* Left - benefits */}
          <div className="flex-1 space-y-4">
            {[
              { 
                icon: Target, 
                title: "Precyzyjne dotarcie", 
                desc: "Twoje reklamy trafiają dokładnie do kobiet zainteresowanych urodą, w odpowiednim wieku, mieszkających w pobliżu salonu.",
                color: "from-pink-500/30 to-rose-500/20"
              },
              { 
                icon: Eye, 
                title: "Tysiące wyświetleń", 
                desc: "Zamiast 50 osób, Twoją reklamę zobaczy nawet kilka tysięcy potencjalnych klientek miesięcznie.",
                color: "from-blue-500/30 to-indigo-500/20"
              },
              { 
                icon: Sparkles, 
                title: "Piękne kreacje reklamowe", 
                desc: "Projektujemy grafiki i teksty, które przyciągają uwagę i zachęcają do rezerwacji — zgodne z estetyką Twojego salonu.",
                color: "from-fuchsia-500/30 to-purple-500/20"
              },
              { 
                icon: BarChart3, 
                title: "Przejrzyste raporty", 
                desc: "Co miesiąc dostajesz jasny raport: ile osób zobaczyło, ile kliknęło, ile to kosztowało. Zero zagadek.",
                color: "from-emerald-500/30 to-teal-500/20"
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-5 border border-zinc-700/50 hover:border-pink-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10 flex-shrink-0`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg text-white font-bold mb-1">{item.title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Phone mockup with ad example */}
          <div className="w-[340px] flex items-center justify-center relative">
            <div className="relative">
              {/* Phone */}
              <div className="w-64 h-[440px] bg-zinc-900 rounded-[40px] p-2 shadow-2xl shadow-pink-500/20 border border-zinc-700">
                <div className="w-full h-full bg-black rounded-[32px] overflow-hidden relative">
                  {/* Instagram header */}
                  <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-semibold text-white truncate max-w-[120px]">{data.salonName || 'Twój Salon'}</span>
                    <Heart className="w-4 h-4 text-zinc-600" />
                  </div>
                  
                  {/* Sponsored post */}
                  <div className="px-3 py-1.5 flex items-center justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <Flower2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs text-white font-medium truncate max-w-[100px]">{data.salonName || 'Salon'}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">Sponsorowane</span>
                  </div>
                  
                  {/* Ad content */}
                  <div className="aspect-square bg-gradient-to-br from-pink-900/50 via-zinc-900 to-fuchsia-900/40 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.25),transparent_60%)]" />
                    <div className="text-center p-4 relative z-10">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/40">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-pink-300 font-bold text-lg mb-1">-20% na pierwszy zabieg</p>
                      <p className="text-zinc-400 text-xs">Zarezerwuj online</p>
                    </div>
                  </div>
                  
                  {/* Engagement */}
                  <div className="p-3 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                      <MessageCircle className="w-5 h-5 text-zinc-500" />
                      <Send className="w-5 h-5 text-zinc-500" />
                    </div>
                    <p className="text-xs text-white font-semibold">2,847 polubień</p>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -left-16 top-8 bg-zinc-900/95 backdrop-blur rounded-xl p-3 shadow-lg border border-pink-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">Nowe klientki</p>
                    <p className="text-base font-bold text-emerald-400">+24</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-16 top-32 bg-zinc-900/95 backdrop-blur rounded-xl p-3 shadow-lg border border-pink-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">Zasięg</p>
                    <p className="text-base font-bold text-white">12,400</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-12 bottom-16 bg-zinc-900/95 backdrop-blur rounded-xl p-3 shadow-lg border border-pink-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">CTR</p>
                    <p className="text-base font-bold text-pink-400">4.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === 2 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2.5 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-500 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 4: Cooperation process
  const Slide4 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-500/10 via-transparent to-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-500 text-xs">Jak wygląda współpraca</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-pink-400/50" />
            <Sparkle className="w-4 h-4 text-fuchsia-400/50" />
            <Heart className="w-5 h-5 text-rose-400/50" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-5xl font-black text-white mb-3">
            Przebieg <span className="text-pink-400">współpracy</span>
          </h2>
          <p className="text-xl text-zinc-300">Prosty i przejrzysty proces od początku do końca</p>
        </div>

        {/* Process steps - horizontal with connection */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-5 relative">
            {/* Connection line */}
            <div className="absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-pink-500/50 via-fuchsia-500/50 to-pink-500/50" />

            {[
              { 
                num: "01", 
                icon: Search, 
                title: "Rozmowa", 
                desc: "Poznajemy Twój salon, klientki i cele. Sprawdzamy co do tej pory działało, a co nie.", 
                details: ["Analiza profilu", "Określenie grupy docelowej", "Ustalenie budżetu"]
              },
              { 
                num: "02", 
                icon: FileText, 
                title: "Strategia", 
                desc: "Przygotowujemy plan kampanii dopasowany specjalnie do Twojego salonu.", 
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
                desc: "Co miesiąc dostajesz jasny raport z wynikami i rekomendacjami.", 
                details: ["Zasięgi i kliknięcia", "Koszt pozyskania", "Kolejne kroki"]
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {/* Step number circle */}
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-pink-500/30 to-fuchsia-500/20 border border-pink-500/50 flex items-center justify-center relative z-10">
                  <step.icon className="w-7 h-7 text-pink-400" />
                </div>
                
                {/* Card */}
                <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-5 border border-zinc-700/50 hover:border-pink-500/30 transition-all h-[calc(100%-76px)]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-pink-500 bg-pink-500/10 px-2 py-1 rounded-full">{step.num}</span>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-300 mb-4 leading-relaxed">{step.desc}</p>
                  <div className="space-y-2">
                    {step.details.map((detail, didx) => (
                      <div key={didx} className="flex items-center gap-2 text-xs text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom - no contracts message */}
        <div className="mt-6 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 rounded-2xl p-5 border border-emerald-500/30">
          <p className="text-lg text-center text-zinc-200">
            <span className="text-emerald-400 font-bold">Bez umów na rok</span> — współpracujemy miesiąc do miesiąca. 
            <span className="text-white font-medium"> Jeśli nie będziesz zadowolona, możesz zrezygnować.</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === 3 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2.5 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-500 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 5: Special offer - irresistible
  const Slide5 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background - more celebratory */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-40 w-[400px] h-[400px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear_gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Celebratory icons */}
        <Sparkle className="absolute top-24 left-32 w-8 h-8 text-pink-400/30" />
        <Star className="absolute top-32 right-48 w-6 h-6 text-amber-400/30" />
        <Sparkle className="absolute bottom-40 left-48 w-6 h-6 text-fuchsia-400/30" />
        <Star className="absolute bottom-32 right-32 w-8 h-8 text-pink-400/30" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold">Aurine Agency</p>
              <p className="text-zinc-500 text-xs">Specjalna oferta</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-amber-500/15 rounded-xl border border-amber-500/30 flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Limitowana oferta</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/15 rounded-full border border-pink-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Oferta nie do odrzucenia</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4">
            Specjalnie dla <span className="text-pink-400">{data.city || "Twojego miasta"}</span>
          </h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Chcemy, żebyś mogła sprawdzić jak działamy bez żadnego ryzyka
          </p>
        </div>

        {/* Main offers - 2 big cards */}
        <div className="flex-1 flex gap-8 items-center justify-center">
          {/* Free audit */}
          <div className="w-[420px] bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-3xl p-8 border-2 border-pink-500/30 shadow-2xl shadow-pink-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-fuchsia-500/20 border border-pink-500/40 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-pink-400" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-pink-500/20 rounded-full text-pink-400 text-sm font-bold">GRATIS</span>
                <span className="text-zinc-500 text-sm line-through">wartość 300 zł</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Darmowy audyt profilu</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Przeanalizujemy Twój Instagram i Facebook — pokażemy co możesz poprawić, 
                żeby Twoje posty były bardziej widoczne. Bez zobowiązań.
              </p>
              
              <div className="space-y-3">
                {["Analiza profilu i postów", "Wskazówki do poprawy bio", "Rekomendacje hashtagów", "Propozycja content planu"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-pink-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Free trial week */}
          <div className="w-[420px] bg-gradient-to-br from-amber-500/10 via-zinc-900/95 to-zinc-900/80 rounded-3xl p-8 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute -top-2 -right-2 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />
            
            {/* Special badge */}
            <div className="absolute -top-3 right-6 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-black text-xs font-bold shadow-lg">
              TYLKO 2 SALONY Z MIASTA
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-amber-400" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm font-bold">GRATIS</span>
                <span className="text-zinc-500 text-sm line-through">wartość 500 zł</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Darmowy tydzień próbny</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Dla <span className="text-amber-400 font-semibold">dwóch pierwszych salonów z {data.city || "Twojego miasta"}</span> uruchamiamy 
                kampanię na tydzień całkowicie za darmo. Zobaczysz efekty, zanim zapłacisz choćby złotówkę.
              </p>
              
              <div className="space-y-3">
                {["Pełna konfiguracja kampanii", "Profesjonalne kreacje reklamowe", "7 dni aktywnej promocji", "Raport z wynikami"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/15 to-pink-500/10 rounded-2xl p-5 border border-pink-500/30 text-center">
          <p className="text-lg text-zinc-200">
            <span className="text-white font-semibold">Nie masz nic do stracenia</span> — sprawdź, jak możemy pomóc Twojemu salonowi!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === 4 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2.5 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-500 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  // Slide 6: Contact & CTA
  const Slide6 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Decorative beauty elements */}
        <div className="absolute top-20 left-24 w-20 h-20 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
          <Flower2 className="w-10 h-10 text-pink-400/40" />
        </div>
        <div className="absolute bottom-28 left-32 w-16 h-16 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <Sparkle className="w-8 h-8 text-fuchsia-400/40" />
        </div>
        <div className="absolute top-32 right-28 w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Heart className="w-7 h-7 text-rose-400/40" />
        </div>
        <div className="absolute bottom-40 right-40 w-18 h-18 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
          <Scissors className="w-8 h-8 text-pink-400/40" />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-20 py-12">
        {/* Logo */}
        <img src={agencyLogo} alt="Aurine" className="w-24 h-24 object-contain mb-6" />
        
        {/* Main headline */}
        <h2 className="text-5xl font-black text-white text-center mb-4">
          Porozmawiajmy o <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Twoim salonie</span>
        </h2>
        
        <p className="text-xl text-zinc-300 text-center max-w-2xl mb-10">
          Chętnie opowiemy więcej o tym, jak możemy pomóc {data.salonName || "Twojemu salonowi"} 
          w pozyskiwaniu nowych klientek. Napisz lub zadzwoń — odpowiemy na wszystkie pytania!
        </p>

        {/* Contact cards */}
        <div className="flex gap-6 mb-10">
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border border-pink-500/30 flex items-center gap-5 min-w-[280px]">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center">
              <Mail className="w-7 h-7 text-pink-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Email</p>
              <p className="text-white font-semibold text-lg">kontakt@aurine.pl</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border border-pink-500/30 flex items-center gap-5 min-w-[280px]">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-blue-500/40 flex items-center justify-center">
              <Phone className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Telefon</p>
              <p className="text-white font-semibold text-lg">+48 XXX XXX XXX</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border border-pink-500/30 flex items-center gap-5 min-w-[280px]">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center">
              <Globe className="w-7 h-7 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Strona</p>
              <p className="text-white font-semibold text-lg">aurine.pl</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-2xl p-1 mb-10">
          <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-xl px-12 py-5 flex items-center gap-3">
            <span className="text-white font-bold text-xl">Umów się na darmową rozmowę</span>
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Bottom reminder */}
        <div className="flex items-center gap-6 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Darmowy tydzień próbny</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-pink-400" />
            <span>Darmowy audyt profilu</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Bez umów na rok</span>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-20 right-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === 5 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2.5 bg-zinc-700'}`} />
            ))}
          </div>
          <span className="text-zinc-500 text-sm">Marketing dla branży beauty</span>
        </div>
      </div>
    </div>
  );

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlideComponent = slides[currentSlide - 1] || Slide1;

  return (
    <div 
      id="presentation-preview" 
      className="w-[1600px] h-[900px] overflow-hidden bg-black"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <CurrentSlideComponent />
    </div>
  );
};
