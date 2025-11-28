import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, LineChart,
  XCircle, Eye, DollarSign, Megaphone,
  Scissors, Palette, UserCheck, Send, Play,
  Gift, Shield, Rocket, ThumbsUp, Coffee,
  MapPin, Sparkle, CheckCircle, AlertCircle, Quote, HandHeart
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

  // Common footer component
  const Footer = ({ activeSlide }: { activeSlide: number }) => (
    <div className="flex items-center justify-between mt-auto pt-4">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
        <span className="text-zinc-500 text-xs">aurine.pl</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
        ))}
      </div>
      <span className="text-zinc-500 text-xs">Marketing dla branży beauty</span>
    </div>
  );

  // Slide 1: Welcome - warm, personal
  const Slide1 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Beautiful gradient background - no grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-pink-500/20 via-fuchsia-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-gradient-to-tr from-rose-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl" />
      
      {/* Scattered beauty elements across the slide */}
      <div className="absolute top-[15%] left-[8%] w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/25 to-rose-500/15 border border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
        <Flower2 className="w-10 h-10 text-pink-400" />
      </div>
      
      <div className="absolute top-[35%] left-[3%] w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-7 h-7 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-[25%] left-[12%] w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Scissors className="w-8 h-8 text-amber-400" />
      </div>
      
      <div className="absolute top-[20%] right-[25%] w-16 h-16 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/15 border border-rose-500/25 flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-rose-400" />
      </div>
      
      <div className="absolute top-[55%] right-[8%] w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 border border-pink-500/25 flex items-center justify-center">
        <Palette className="w-7 h-7 text-pink-400" />
      </div>
      
      <div className="absolute bottom-[35%] right-[20%] w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Star className="w-6 h-6 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>

      {/* Instagram mockup - centered more */}
      <div className="absolute top-[18%] right-[10%] w-52 h-64 bg-zinc-900 rounded-[28px] p-1.5 shadow-2xl shadow-pink-500/20 border border-zinc-700/80">
        <div className="w-full h-full bg-black rounded-[22px] overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600/30 to-fuchsia-600/30 px-3 py-2 flex items-center gap-2 border-b border-pink-500/20">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-white font-medium">{data.salonName || 'Twój Salon'}</span>
          </div>
          <div className="aspect-square bg-gradient-to-br from-pink-900/40 via-zinc-900 to-fuchsia-900/40 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-pink-500/50 to-rose-500/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-300" />
              </div>
              <p className="text-pink-300 text-xs font-semibold">Zabiegi beauty</p>
            </div>
          </div>
          <div className="p-2.5 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="text-[10px] text-zinc-400">847 polubień</span>
          </div>
        </div>
      </div>

      {/* Facebook badge */}
      <div className="absolute bottom-[20%] right-[12%] px-4 py-2.5 bg-gradient-to-r from-blue-600/25 to-blue-500/15 rounded-xl border border-blue-500/30 flex items-center gap-2 backdrop-blur-sm">
        <Facebook className="w-5 h-5 text-blue-400" />
        <span className="text-blue-300 text-sm font-medium">Facebook Ads</span>
      </div>

      {/* Small decorative sparkles */}
      <Sparkle className="absolute top-[45%] left-[25%] w-6 h-6 text-pink-400/40" />
      <Sparkle className="absolute bottom-[45%] right-[35%] w-5 h-5 text-fuchsia-400/30" />
      <Star className="absolute top-[70%] left-[35%] w-4 h-4 text-amber-400/40 fill-amber-400/40" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
            <div>
              <p className="text-pink-400 font-bold text-base">AURINE</p>
              <p className="text-zinc-400 text-sm">Marketing dla salonów beauty</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[55%]">
          {/* Warm greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/15 rounded-full border border-pink-500/30 mb-6 w-fit">
            <Coffee className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400/50" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl font-black text-white leading-[1.15] mb-6">
            Porozmawiajmy o<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Twoim salonie
            </span>
          </h1>

          <p className="text-xl text-zinc-300 leading-relaxed mb-8 max-w-xl">
            Wiemy, że prowadzenie salonu to codzienne wyzwanie — zabiegi, grafik, klientki...
            <span className="text-pink-300 font-medium"> Chcielibyśmy Ci w tym pomóc.</span>
          </p>

          {/* Personal info card */}
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 backdrop-blur rounded-2xl p-6 border border-pink-500/30 shadow-2xl shadow-pink-500/10 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-pink-300" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-0.5">Ta prezentacja jest dla</p>
                <p className="text-2xl font-bold text-white">{data.ownerName || "Ciebie"}</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-pink-500/50 via-fuchsia-500/40 to-transparent mb-4" />
            <div>
              <p className="text-pink-400 font-semibold text-lg">{data.salonName || "Twój Salon"}</p>
              <p className="text-zinc-400 text-sm flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-pink-400/70" />
                {data.city || "Twoje miasto"}
              </p>
            </div>
          </div>
        </div>

        <Footer activeSlide={0} />
      </div>
    </div>
  );

  // Slide 2: Understanding challenges
  const Slide2 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Gradient background - no grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-pink-500/15 via-transparent to-rose-500/10 rounded-full blur-3xl" />
      
      {/* Beauty elements scattered throughout */}
      <div className="absolute top-[12%] left-[6%] w-18 h-18 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/15 border border-pink-500/25 flex items-center justify-center">
        <Flower2 className="w-9 h-9 text-pink-400" />
      </div>
      
      <div className="absolute top-[60%] left-[4%] w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Scissors className="w-7 h-7 text-amber-400" />
      </div>
      
      <div className="absolute bottom-[15%] left-[15%] w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-6 h-6 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>

      <div className="absolute top-[25%] right-[5%] w-16 h-16 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/15 border border-rose-500/25 flex items-center justify-center">
        <Palette className="w-8 h-8 text-rose-400" />
      </div>
      
      <div className="absolute bottom-[40%] right-[3%] w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 border border-pink-500/25 flex items-center justify-center">
        <Sparkle className="w-7 h-7 text-pink-400" />
      </div>
      
      <Sparkle className="absolute top-[40%] left-[20%] w-5 h-5 text-pink-400/40" />
      <Star className="absolute bottom-[30%] right-[25%] w-4 h-4 text-amber-400/40 fill-amber-400/40" />

      {/* Phone mockup showing low reach */}
      <div className="absolute top-[15%] right-[12%]">
        <div className="w-52 h-72 bg-zinc-900 rounded-[28px] p-1.5 shadow-2xl shadow-pink-500/10 border border-zinc-700">
          <div className="w-full h-full bg-black rounded-[22px] overflow-hidden relative">
            <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800">
              <Instagram className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-400">Statystyki posta</span>
            </div>
            <div className="p-3 space-y-2.5">
              <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">Zasięg organiczny</p>
                <p className="text-2xl font-bold text-zinc-400">47</p>
                <p className="text-xs text-zinc-600">z 1,200 obserwujących</p>
              </div>
              <div className="bg-zinc-900/80 rounded-xl p-2.5 border border-zinc-800">
                <p className="text-zinc-500 text-xs mb-1">Reakcje</p>
                <p className="text-lg font-bold text-zinc-400">12</p>
              </div>
              <div className="bg-rose-500/15 rounded-xl p-2.5 border border-rose-500/25">
                <p className="text-rose-400 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Tylko 4% osób zobaczyło
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating sad stats */}
        <div className="absolute -left-24 top-8 bg-zinc-900/95 backdrop-blur rounded-xl p-3 border border-zinc-700 shadow-xl">
          <p className="text-xs text-zinc-500 mb-1">Zasięgi spadły o</p>
          <p className="text-xl font-bold text-rose-400">-80%</p>
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Rozumiemy Twoje wyzwania</p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-3">
            Czy to brzmi <span className="text-pink-400">znajomo</span>?
          </h2>
          <p className="text-lg text-zinc-300 max-w-xl">
            Wiele właścicielek salonów w mniejszych miastach mierzy się z tymi samymi wyzwaniami...
          </p>
        </div>

        {/* Problems - empathetic, human */}
        <div className="flex-1 max-w-[55%] space-y-4">
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-2xl p-5 border border-pink-500/30 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6 text-pink-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Wrzucasz piękne posty, ale...</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  ...algorytm pokazuje je tylko <span className="text-pink-400 font-semibold">kilku procentom</span> obserwujących. 
                  Post to nie reklama — nawet najpiękniejsze zdjęcie zabiegu nie dotrze do nowych osób.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-2xl p-5 border border-zinc-700/60 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/90 border border-zinc-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Brakuje czasu na wszystko</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Między zabiegami, zamówieniami i prowadzeniem grafiku ciężko znaleźć chwilę 
                  na naukę narzędzi reklamowych. Rozumiemy to doskonale.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-2xl p-5 border border-zinc-700/60 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/90 border border-zinc-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">W {data.city || "Twoim mieście"} płatne reklamy to rzadkość</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Większość salonów wciąż liczy na organiczne zasięgi. 
                  To <span className="text-emerald-400 font-semibold">ogromna szansa</span> dla Ciebie — możesz być pierwsza!
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer activeSlide={1} />
      </div>
    </div>
  );

  // Slide 3: How we help - with testimonials
  const Slide3 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-fuchsia-500/15 to-transparent rounded-full blur-3xl" />
      
      {/* Scattered beauty elements */}
      <div className="absolute top-[10%] left-[5%] w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/15 border border-pink-500/25 flex items-center justify-center">
        <Flower2 className="w-8 h-8 text-pink-400" />
      </div>
      
      <div className="absolute top-[50%] left-[2%] w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Scissors className="w-6 h-6 text-amber-400" />
      </div>
      
      <div className="absolute bottom-[20%] left-[8%] w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-7 h-7 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute top-[15%] right-[3%] w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/15 border border-rose-500/25 flex items-center justify-center">
        <Sparkle className="w-7 h-7 text-rose-400" />
      </div>
      
      <div className="absolute bottom-[35%] right-[2%] w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 border border-pink-500/25 flex items-center justify-center">
        <Palette className="w-6 h-6 text-pink-400" />
      </div>
      
      <Sparkle className="absolute top-[35%] left-[25%] w-5 h-5 text-pink-400/30" />
      <Star className="absolute bottom-[45%] right-[30%] w-4 h-4 text-amber-400/30 fill-amber-400/30" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Jak możemy Ci pomóc</p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-4xl font-black text-white mb-2">
            Zajmiemy się <span className="text-pink-400">wszystkim</span>
          </h2>
          <p className="text-lg text-zinc-300">
            Ty skupiasz się na tym, co kochasz — dbaniu o klientki. My zajmiemy się resztą.
          </p>
        </div>

        {/* Main content - 3 columns */}
        <div className="flex-1 grid grid-cols-3 gap-5">
          {/* Column 1: What we do */}
          <div className="space-y-3">
            {[
              { 
                icon: Target, 
                title: "Docieramy do właściwych osób", 
                desc: "Twoje reklamy zobaczą kobiety zainteresowane urodą, mieszkające blisko Twojego salonu",
                color: "from-pink-500/40 to-rose-500/30",
                borderColor: "border-pink-500/40"
              },
              { 
                icon: Sparkles, 
                title: "Tworzymy piękne kreacje", 
                desc: "Grafiki i teksty dopasowane do estetyki Twojego salonu — żadnych generycznych reklam",
                color: "from-fuchsia-500/40 to-purple-500/30",
                borderColor: "border-fuchsia-500/40"
              },
              { 
                icon: HandHeart, 
                title: "Jesteśmy z Tobą", 
                desc: "Regularny kontakt, odpowiedzi na pytania. Traktujemy Cię jak partnerkę",
                color: "from-rose-500/40 to-pink-500/30",
                borderColor: "border-rose-500/40"
              },
              { 
                icon: BarChart3, 
                title: "Pokazujemy co się dzieje", 
                desc: "Co miesiąc prosty raport: ile osób zobaczyło, ile kliknęło. Bez zagadek",
                color: "from-emerald-500/40 to-teal-500/30",
                borderColor: "border-emerald-500/40"
              },
            ].map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-xl p-4 border ${item.borderColor} shadow-lg`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10 flex-shrink-0`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold mb-0.5">{item.title}</p>
                    <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Phone mockup with successful ad */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-52 h-[340px] bg-zinc-900 rounded-[32px] p-1.5 shadow-2xl shadow-pink-500/15 border border-zinc-700">
                <div className="w-full h-full bg-black rounded-[26px] overflow-hidden relative">
                  <div className="bg-gradient-to-r from-pink-600/25 to-fuchsia-600/25 px-3 py-2 flex items-center justify-between border-b border-pink-500/20">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-semibold text-white truncate max-w-[100px]">{data.salonName || 'Twój Salon'}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  
                  <div className="px-3 py-1.5 flex items-center justify-between bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <Flower2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs text-white font-medium">{data.salonName || 'Salon'}</span>
                    </div>
                    <span className="text-[10px] text-pink-400 font-medium">Sponsorowane</span>
                  </div>
                  
                  <div className="aspect-square bg-gradient-to-br from-pink-900/50 via-zinc-900 to-fuchsia-900/40 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.3),transparent_60%)]" />
                    <div className="text-center p-4 relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/40">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-pink-300 font-bold text-sm mb-1">Zarezerwuj wizytę</p>
                      <p className="text-zinc-400 text-xs">w {data.salonName || 'Twoim salonie'}</p>
                    </div>
                  </div>
                  
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

              {/* Floating positive stats */}
              <div className="absolute -left-20 top-8 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 backdrop-blur rounded-xl p-3 border border-emerald-500/35 shadow-lg">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-[10px] text-zinc-400">Nowe klientki</p>
                    <p className="text-lg font-bold text-emerald-400">+24</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-16 top-24 bg-gradient-to-br from-blue-500/20 to-blue-500/10 backdrop-blur rounded-xl p-3 border border-blue-500/35 shadow-lg">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-[10px] text-zinc-400">Zobaczyło</p>
                    <p className="text-lg font-bold text-white">12,400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Testimonials */}
          <div className="space-y-3">
            <p className="text-sm text-pink-400 font-semibold mb-2 flex items-center gap-2">
              <Quote className="w-4 h-4" />
              Co mówią właścicielki salonów
            </p>
            
            {[
              {
                name: "Magda",
                salon: "Studio Urody Magda",
                city: "Nowy Sącz",
                text: "Nareszcie ktoś, kto rozumie branżę beauty. Czuję się zaopiekowana!",
                avatar: "M"
              },
              {
                name: "Karolina",
                salon: "Beauty by Karo",
                city: "Tarnów",
                text: "Bałam się płatnych reklam, ale ekipa Aurine wszystko wytłumaczyła cierpliwie.",
                avatar: "K"
              },
              {
                name: "Anna",
                salon: "Salon Piękności Anna",
                city: "Gorlice",
                text: "Polecam każdej właścicielce salonu. Profesjonalizm i serdeczność!",
                avatar: "A"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-xl p-4 border border-pink-500/20 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg shadow-pink-500/30">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed mb-2 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="text-white text-xs font-semibold">{testimonial.name}</p>
                      <p className="text-zinc-500 text-[10px]">{testimonial.salon}, {testimonial.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer activeSlide={2} />
      </div>
    </div>
  );

  // Slide 4: Cooperation process
  const Slide4 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-pink-500/10 via-transparent to-fuchsia-500/10 rounded-full blur-3xl" />
      
      {/* Beauty elements scattered */}
      <div className="absolute top-[12%] left-[5%] w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/15 border border-pink-500/25 flex items-center justify-center">
        <Flower2 className="w-8 h-8 text-pink-400" />
      </div>
      
      <div className="absolute top-[55%] left-[3%] w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-6 h-6 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-[18%] left-[10%] w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Scissors className="w-7 h-7 text-amber-400" />
      </div>
      
      <div className="absolute top-[15%] right-[4%] w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/15 border border-rose-500/25 flex items-center justify-center">
        <Sparkle className="w-7 h-7 text-rose-400" />
      </div>
      
      <div className="absolute top-[50%] right-[3%] w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 border border-pink-500/25 flex items-center justify-center">
        <Palette className="w-6 h-6 text-pink-400" />
      </div>
      
      <div className="absolute bottom-[25%] right-[8%] w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Star className="w-7 h-7 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <Sparkle className="absolute top-[35%] left-[20%] w-5 h-5 text-pink-400/30" />
      <Sparkle className="absolute bottom-[40%] right-[22%] w-4 h-4 text-fuchsia-400/30" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Jak wygląda współpraca</p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-2">
            Wszystko jest <span className="text-pink-400">proste i przejrzyste</span>
          </h2>
          <p className="text-lg text-zinc-300">Bez skomplikowanych umów, bez niezrozumiałych terminów</p>
        </div>

        {/* Process steps - horizontal */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-4 relative">
            {/* Connection line */}
            <div className="absolute top-14 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-pink-500/40 via-fuchsia-500/40 to-pink-500/40" />

            {[
              { 
                num: "01", 
                icon: Coffee, 
                title: "Rozmowa", 
                desc: "Poznajemy Ciebie, Twój salon i Twoje marzenia. Bez zobowiązań — po prostu pogadajmy!", 
                details: ["Poznanie Twojego salonu", "Wspólne określenie celów", "Odpowiedzi na pytania"],
                color: "from-pink-500/40 to-rose-500/30"
              },
              { 
                num: "02", 
                icon: FileText, 
                title: "Strategia", 
                desc: "Przygotowujemy plan dopasowany do Ciebie — żadnych szablonów.", 
                details: ["Kreacje reklamowe", "Teksty i grafiki", "Ustalenie budżetu"],
                color: "from-fuchsia-500/40 to-purple-500/30"
              },
              { 
                num: "03", 
                icon: Rocket, 
                title: "Start", 
                desc: "Uruchamiamy kampanie. Ty nie musisz nic robić — my zajmujemy się wszystkim.", 
                details: ["Konfiguracja reklam", "Targetowanie odbiorców", "Ciągła optymalizacja"],
                color: "from-blue-500/40 to-indigo-500/30"
              },
              { 
                num: "04", 
                icon: LineChart, 
                title: "Efekty", 
                desc: "Co miesiąc dostajesz prosty raport i rozmawiamy o kolejnych krokach.", 
                details: ["Przejrzysty raport", "Wspólna analiza", "Planowanie dalszych działań"],
                color: "from-emerald-500/40 to-teal-500/30"
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {/* Step icon circle */}
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} border border-white/20 flex items-center justify-center relative z-10 shadow-lg`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Card */}
                <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-xl p-4 border border-zinc-700/60 h-[calc(100%-72px)] shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-pink-500 bg-pink-500/20 px-2 py-0.5 rounded-full">{step.num}</span>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-300 mb-3 leading-relaxed">{step.desc}</p>
                  <div className="space-y-1.5">
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

        {/* Bottom - reassurance */}
        <div className="mt-4 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 rounded-xl p-4 border border-emerald-500/30">
          <p className="text-base text-center text-zinc-200 flex items-center justify-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>
              <span className="text-emerald-400 font-bold">Bez długich umów</span> — współpracujemy miesiąc do miesiąca. 
              <span className="text-white font-medium"> Zaufanie budujemy działaniami, nie papierami.</span>
            </span>
          </p>
        </div>

        <Footer activeSlide={3} />
      </div>
    </div>
  );

  // Slide 5: Special offer
  const Slide5 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-rose-500/20 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl" />
      
      {/* Beauty elements scattered throughout */}
      <div className="absolute top-[10%] left-[6%] w-18 h-18 rounded-2xl bg-gradient-to-br from-pink-500/25 to-rose-500/15 border border-pink-500/30 flex items-center justify-center">
        <Flower2 className="w-9 h-9 text-pink-400" />
      </div>
      
      <div className="absolute top-[45%] left-[3%] w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-7 h-7 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-[18%] left-[10%] w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Scissors className="w-6 h-6 text-amber-400" />
      </div>
      
      <div className="absolute top-[15%] right-[5%] w-16 h-16 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/15 border border-rose-500/25 flex items-center justify-center">
        <Sparkle className="w-8 h-8 text-rose-400" />
      </div>
      
      <div className="absolute top-[55%] right-[4%] w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 border border-pink-500/25 flex items-center justify-center">
        <Palette className="w-7 h-7 text-pink-400" />
      </div>
      
      <div className="absolute bottom-[30%] right-[10%] w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Star className="w-6 h-6 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <Sparkle className="absolute top-[30%] left-[25%] w-6 h-6 text-pink-400/40" />
      <Sparkle className="absolute bottom-[45%] right-[25%] w-5 h-5 text-fuchsia-400/30" />
      <Star className="absolute top-[65%] left-[35%] w-4 h-4 text-amber-400/40 fill-amber-400/40" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Na dobry początek</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/15 rounded-full border border-pink-500/30 mb-3">
            <Gift className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Mamy dla Ciebie coś specjalnego</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2">
            Żebyś mogła nas <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">poznać bez ryzyka</span>
          </h2>
          <p className="text-lg text-zinc-300">
            Chcemy, żebyś sama zobaczyła jak działamy — zanim podejmiesz jakąkolwiek decyzję
          </p>
        </div>

        {/* Two offers */}
        <div className="flex-1 flex items-center justify-center gap-8">
          {/* Free audit */}
          <div className="w-[380px] bg-gradient-to-br from-pink-500/15 via-zinc-900/95 to-zinc-800/90 rounded-2xl p-6 border-2 border-pink-500/40 shadow-2xl shadow-pink-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center shadow-lg">
                  <Search className="w-7 h-7 text-pink-300" />
                </div>
                <span className="px-3 py-1.5 bg-pink-500/25 rounded-full text-pink-300 text-sm font-bold">GRATIS</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Darmowy audyt Twojego profilu</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Przeanalizujemy Twój profil na Instagramie i Facebooku. Pokażemy co działa, 
                a co warto poprawić. <span className="text-pink-300">Bez żadnych zobowiązań.</span>
              </p>
              
              <div className="space-y-2">
                {["Analiza profilu i postów", "Konkretne wskazówki", "Porównanie z konkurencją", "Rozmowa o celach"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Free trial week */}
          <div className="w-[380px] bg-gradient-to-br from-amber-500/15 via-zinc-900/95 to-zinc-800/90 rounded-2xl p-6 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-2xl" />
            
            {/* Special badge */}
            <div className="absolute -top-3 right-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-black text-xs font-bold shadow-lg flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-black" />
              TYLKO 2 SALONY Z {(data.city || "MIASTA").toUpperCase()}
            </div>
            
            <div className="relative z-10 mt-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/40 to-orange-500/30 border border-amber-500/50 flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-amber-300" />
                </div>
                <span className="px-3 py-1.5 bg-amber-500/25 rounded-full text-amber-300 text-sm font-bold">GRATIS</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Darmowy tydzień próbny</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Dla <span className="text-amber-300 font-semibold">dwóch pierwszych salonów z {data.city || "Twojego miasta"}</span> uruchamiamy 
                prawdziwą kampanię na tydzień. <span className="text-amber-300">Zobaczysz efekty zanim cokolwiek zapłacisz.</span>
              </p>
              
              <div className="space-y-2">
                {["Pełna konfiguracja kampanii", "Profesjonalne kreacje", "7 dni aktywnej promocji", "Raport z wynikami"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-4 bg-gradient-to-r from-pink-500/15 via-fuchsia-500/15 to-pink-500/15 rounded-xl p-4 border border-pink-500/30 text-center">
          <p className="text-base text-zinc-200">
            <Heart className="w-4 h-4 text-pink-400 inline mr-2" />
            <span className="text-white font-semibold">Nie musisz nic decydować teraz</span> — po prostu porozmawiajmy i sama zobaczysz
          </p>
        </div>

        <Footer activeSlide={4} />
      </div>
    </div>
  );

  // Slide 6: Contact & CTA
  const Slide6 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-rose-500/20 rounded-full blur-3xl" />
      
      {/* Beauty elements scattered throughout the entire slide */}
      <div className="absolute top-[10%] left-[8%] w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/25 to-rose-500/15 border border-pink-500/30 flex items-center justify-center">
        <Flower2 className="w-10 h-10 text-pink-400" />
      </div>
      
      <div className="absolute top-[35%] left-[4%] w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-7 h-7 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-[25%] left-[10%] w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Scissors className="w-8 h-8 text-amber-400" />
      </div>
      
      <div className="absolute top-[15%] right-[8%] w-18 h-18 rounded-2xl bg-gradient-to-br from-rose-500/25 to-pink-500/15 border border-rose-500/30 flex items-center justify-center">
        <Sparkle className="w-9 h-9 text-rose-400" />
      </div>
      
      <div className="absolute top-[45%] right-[5%] w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/15 border border-pink-500/25 flex items-center justify-center">
        <Palette className="w-7 h-7 text-pink-400" />
      </div>
      
      <div className="absolute bottom-[30%] right-[12%] w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/15 border border-fuchsia-500/25 flex items-center justify-center">
        <Star className="w-8 h-8 text-fuchsia-400 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-[15%] left-[30%] w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/15 border border-pink-500/25 flex items-center justify-center">
        <Flower2 className="w-6 h-6 text-pink-400" />
      </div>
      
      <div className="absolute top-[25%] left-[25%] w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/25 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>
      
      <Sparkle className="absolute top-[55%] left-[20%] w-6 h-6 text-pink-400/40" />
      <Sparkle className="absolute bottom-[45%] right-[25%] w-5 h-5 text-fuchsia-400/30" />
      <Star className="absolute top-[70%] right-[35%] w-4 h-4 text-amber-400/40 fill-amber-400/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16 py-10">
        {/* Logo */}
        <img src={agencyLogo} alt="Aurine" className="w-20 h-20 object-contain mb-4" />
        
        {/* Main headline */}
        <h2 className="text-5xl font-black text-white text-center mb-3">
          Porozmawiajmy o <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Twoim salonie</span>
        </h2>
        
        <p className="text-xl text-zinc-300 text-center max-w-2xl mb-8">
          Chętnie opowiemy więcej i odpowiemy na wszystkie pytania. 
          <span className="text-pink-300"> Napisz lub zadzwoń — jesteśmy tu dla Ciebie!</span>
        </p>

        {/* Contact cards */}
        <div className="flex gap-5 mb-8">
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-xl p-5 border border-pink-500/30 flex items-center gap-4 min-w-[240px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-pink-300" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Email</p>
              <p className="text-white font-semibold">kontakt@aurine.pl</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-xl p-5 border border-blue-500/30 flex items-center gap-4 min-w-[240px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/40 to-indigo-500/30 border border-blue-500/50 flex items-center justify-center shadow-lg">
              <Phone className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Telefon</p>
              <p className="text-white font-semibold">+48 XXX XXX XXX</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-xl p-5 border border-fuchsia-500/30 flex items-center gap-4 min-w-[240px] shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/40 to-purple-500/30 border border-fuchsia-500/50 flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-fuchsia-300" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Strona</p>
              <p className="text-white font-semibold">aurine.pl</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-xl p-0.5 mb-8 shadow-xl shadow-pink-500/30">
          <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-[10px] px-10 py-4 flex items-center gap-3">
            <Coffee className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-lg">Umówmy się na kawę online</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Bottom reminder */}
        <div className="flex items-center gap-5 text-zinc-400 text-sm">
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
            <span>Bez zobowiązań</span>
          </div>
        </div>

        {/* Footer positioned at bottom */}
        <div className="absolute bottom-6 left-16 right-16">
          <Footer activeSlide={5} />
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
