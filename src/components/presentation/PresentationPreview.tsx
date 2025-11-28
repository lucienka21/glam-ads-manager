import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, LineChart,
  XCircle, Eye, DollarSign, Megaphone,
  Scissors, Palette, UserCheck, Send, Play,
  Gift, Shield, Rocket, ThumbsUp, Coffee,
  MapPin, Sparkle, CheckCircle, AlertCircle, Quote
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

  // Common header component
  const Header = ({ subtitle }: { subtitle: string }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
        <div>
          <p className="text-pink-400 font-semibold text-sm">AURINE AGENCY</p>
          <p className="text-zinc-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
          <Flower2 className="w-4 h-4 text-pink-400/60" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <Heart className="w-4 h-4 text-fuchsia-400/60" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Sparkle className="w-4 h-4 text-rose-400/60" />
        </div>
      </div>
    </div>
  );

  // Common footer component
  const Footer = ({ activeSlide }: { activeSlide: number }) => (
    <div className="flex items-center justify-between mt-auto pt-4">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
        <span className="text-zinc-600 text-xs">aurine.pl</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
        ))}
      </div>
      <span className="text-zinc-600 text-xs">Marketing dla branży beauty</span>
    </div>
  );

  // Centered beauty graphics cluster component
  const CenteredBeautyGraphics = () => (
    <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[400px] h-[400px]">
      {/* Central large icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-500/25 to-rose-500/15 border border-pink-500/30 flex items-center justify-center shadow-xl shadow-pink-500/10">
        <Flower2 className="w-14 h-14 text-pink-400" />
      </div>
      
      {/* Surrounding icons - evenly distributed */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/10 border border-fuchsia-500/25 flex items-center justify-center">
        <Heart className="w-8 h-8 text-fuchsia-400" />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/25 flex items-center justify-center">
        <Star className="w-8 h-8 text-amber-400" />
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-500/25 flex items-center justify-center">
        <Scissors className="w-8 h-8 text-rose-400" />
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 border border-purple-500/25 flex items-center justify-center">
        <Palette className="w-8 h-8 text-purple-400" />
      </div>
      
      {/* Diagonal corners */}
      <div className="absolute top-12 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/15 to-rose-500/10 border border-pink-500/20 flex items-center justify-center">
        <Sparkle className="w-6 h-6 text-pink-400/80" />
      </div>
      <div className="absolute top-12 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/15 to-pink-500/10 border border-rose-500/20 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-rose-400/80" />
      </div>
      <div className="absolute bottom-12 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 border border-fuchsia-500/20 flex items-center justify-center">
        <Award className="w-6 h-6 text-fuchsia-400/80" />
      </div>
      <div className="absolute bottom-12 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/15 to-emerald-500/10 border border-teal-500/20 flex items-center justify-center">
        <ThumbsUp className="w-6 h-6 text-teal-400/80" />
      </div>
      
      {/* Social media badges centered below */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/10 rounded-xl border border-blue-500/30 flex items-center gap-2 backdrop-blur-sm">
          <Facebook className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">Facebook Ads</span>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-pink-600/20 to-fuchsia-500/10 rounded-xl border border-pink-500/30 flex items-center gap-2 backdrop-blur-sm">
          <Instagram className="w-5 h-5 text-pink-400" />
          <span className="text-pink-300 text-sm font-medium">Instagram Ads</span>
        </div>
      </div>
    </div>
  );

  // Slide 1: Welcome - warm, personal introduction with lots of graphics
  const Slide1 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-pink-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Centered beauty graphics cluster */}
      <CenteredBeautyGraphics />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Prezentacja dla Twojego salonu" />

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[55%]">
          {/* Warm greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/15 to-fuchsia-500/10 rounded-full border border-pink-500/25 mb-6 w-fit">
            <Coffee className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>

          {/* Main headline - warm tone */}
          <h1 className="text-5xl font-black text-white leading-[1.2] mb-6">
            Wiemy, że prowadzenie<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              salonu to prawdziwe wyzwanie
            </span>
          </h1>

          <p className="text-lg text-zinc-300 leading-relaxed mb-8 max-w-xl">
            Codziennie dbasz o to, żeby Twoje klientki wychodziły szczęśliwe. 
            Zabiegi, grafik, zamówienia, media społecznościowe... 
            <span className="text-pink-300 font-medium"> A co z pozyskiwaniem nowych klientek?</span>
          </p>

          {/* Personal info card */}
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-pink-500/25 shadow-2xl shadow-pink-500/10 max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs">Ta prezentacja jest dla</p>
                <p className="text-2xl font-bold text-white">{data.ownerName || "Ciebie"}</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-pink-500/40 via-fuchsia-500/30 to-transparent mb-3" />
            <div className="flex items-center gap-4">
              <div>
                <p className="text-pink-400 font-semibold text-lg">{data.salonName || "Twój Salon"}</p>
                <p className="text-zinc-400 text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400/70" />
                  {data.city || "Twoje miasto"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer activeSlide={0} />
      </div>
    </div>
  );

  // Slide 2: Understanding challenges - empathetic, with graphics
  const Slide2 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-500/15 via-transparent to-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Right side visual - social media frustration illustration */}
      <div className="absolute top-20 right-12 w-[380px]">
        {/* Phone mockup showing low reach */}
        <div className="relative">
          <div className="w-52 h-80 bg-zinc-900 rounded-[32px] p-1.5 shadow-2xl shadow-pink-500/10 border border-zinc-700 mx-auto">
            <div className="w-full h-full bg-black rounded-[26px] overflow-hidden relative">
              <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800">
                <Instagram className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400">Statystyki posta</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Zasięg organiczny</p>
                  <p className="text-2xl font-bold text-zinc-400">47</p>
                  <p className="text-xs text-zinc-600">z 1,200 obserwujących</p>
                </div>
                <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Reakcje</p>
                  <p className="text-xl font-bold text-zinc-400">12</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/20">
                  <p className="text-red-400 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Tylko 4% osób zobaczyło
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating sad stats */}
          <div className="absolute -left-16 top-8 bg-zinc-900/95 backdrop-blur rounded-xl p-3 border border-zinc-700">
            <p className="text-xs text-zinc-500 mb-1">Zasięgi spadły o</p>
            <p className="text-xl font-bold text-rose-400">-80%</p>
          </div>
          <div className="absolute -right-8 bottom-20 bg-zinc-900/95 backdrop-blur rounded-xl p-3 border border-zinc-700">
            <Eye className="w-5 h-5 text-zinc-500 mb-1" />
            <p className="text-xs text-zinc-400">5-10%</p>
            <p className="text-[10px] text-zinc-600">widzi post</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Rozumiemy Twoje wyzwania" />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-3">
            Czy to brzmi <span className="text-pink-400">znajomo</span>?
          </h2>
          <p className="text-lg text-zinc-300">
            Wiele właścicielek salonów w mniejszych miastach zmaga się z tymi samymi problemami...
          </p>
        </div>

        {/* Problems - left side, more human */}
        <div className="flex-1 max-w-[55%] grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-5 border border-pink-500/25">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Post to nie reklama</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Wrzucasz piękne zdjęcia zabiegów, ale algorytm pokazuje je tylko <span className="text-pink-400 font-semibold">5-10%</span> Twoich obserwujących. 
                  Cała reszta nawet nie wie, że coś publikujesz.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-5 border border-zinc-700/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-zinc-400 rotate-180" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Organiczne zasięgi to przeszłość</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Kiedyś wystarczyło regularnie postować. Dziś zasięgi organiczne <span className="text-rose-400 font-semibold">spadły o 80%</span> — 
                  bez płatnej promocji trudno dotrzeć do nowych osób.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-2xl p-5 border border-zinc-700/40">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Brak czasu i wiedzy technicznej</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Między zabiegami, zamówieniami i grafiku nie ma czasu na naukę 
                  Menedżera reklam. A kliknięcie "Promuj post" to często <span className="text-zinc-400">przepalone pieniądze</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hopeful message */}
        <div className="mt-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-2xl p-4 border border-emerald-500/25 max-w-[55%]">
          <p className="text-base text-zinc-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <span className="text-emerald-400 font-bold">Dobra wiadomość:</span> W {data.city || "Twoim mieście"} wciąż mało salonów 
              korzysta z płatnych reklam — <span className="text-white font-semibold">to Twoja szansa!</span>
            </span>
          </p>
        </div>

        <Footer activeSlide={1} />
      </div>
    </div>
  );

  // Slide 3: How we help - the solution with testimonials
  const Slide3 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-pink-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Jak możemy Ci pomóc" />

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-4xl font-black text-white mb-2">
            Reklamy, które <span className="text-pink-400">naprawdę działają</span>
          </h2>
          <p className="text-lg text-zinc-300">
            Zajmujemy się Twoimi reklamami od A do Z — Ty możesz skupić się na <span className="text-pink-300">dbaniu o klientki</span>
          </p>
        </div>

        {/* Main content - 3 columns */}
        <div className="flex-1 grid grid-cols-3 gap-5">
          {/* Column 1: Benefits */}
          <div className="space-y-3">
            {[
              { 
                icon: Target, 
                title: "Precyzyjne dotarcie", 
                desc: "Reklamy trafiają do kobiet 25-45 lat, zainteresowanych urodą, w promieniu 15 km od Ciebie",
                color: "from-pink-500/30 to-rose-500/20",
                borderColor: "border-pink-500/30"
              },
              { 
                icon: Eye, 
                title: "Tysiące wyświetleń", 
                desc: "Zamiast 50 osób, Twoją reklamę zobaczy nawet kilka tysięcy potencjalnych klientek",
                color: "from-blue-500/30 to-indigo-500/20",
                borderColor: "border-blue-500/30"
              },
              { 
                icon: Sparkles, 
                title: "Piękne kreacje", 
                desc: "Projektujemy grafiki i teksty zgodne z estetyką Twojego salonu",
                color: "from-fuchsia-500/30 to-purple-500/20",
                borderColor: "border-fuchsia-500/30"
              },
              { 
                icon: BarChart3, 
                title: "Przejrzyste raporty", 
                desc: "Co miesiąc jasny raport: zasięgi, kliknięcia, koszty. Zero zagadek",
                color: "from-emerald-500/30 to-teal-500/20",
                borderColor: "border-emerald-500/30"
              },
            ].map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-xl p-4 border ${item.borderColor}`}>
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
              <div className="w-56 h-[380px] bg-zinc-900 rounded-[36px] p-1.5 shadow-2xl shadow-pink-500/15 border border-zinc-700">
                <div className="w-full h-full bg-black rounded-[30px] overflow-hidden relative">
                  <div className="bg-gradient-to-r from-pink-600/20 to-fuchsia-600/20 px-3 py-2 flex items-center justify-between border-b border-pink-500/20">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-semibold text-white truncate max-w-[100px]">{data.salonName || 'Twój Salon'}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
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
                      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/40">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-pink-300 font-bold text-base mb-1">-20% na pierwszy zabieg</p>
                      <p className="text-zinc-400 text-xs">Zarezerwuj online</p>
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
              <div className="absolute -left-20 top-10 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 backdrop-blur rounded-xl p-3 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-emerald-400" />
                  <div>
                    <p className="text-[10px] text-zinc-400">Nowe klientki</p>
                    <p className="text-lg font-bold text-emerald-400">+24</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-16 top-28 bg-gradient-to-br from-blue-500/15 to-blue-500/5 backdrop-blur rounded-xl p-3 border border-blue-500/30">
                <div className="flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-[10px] text-zinc-400">Zasięg</p>
                    <p className="text-lg font-bold text-white">12,400</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-16 bottom-16 bg-gradient-to-br from-pink-500/15 to-pink-500/5 backdrop-blur rounded-xl p-3 border border-pink-500/30">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                  <div>
                    <p className="text-[10px] text-zinc-400">CTR</p>
                    <p className="text-lg font-bold text-pink-400">4.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Testimonials */}
          <div className="space-y-3">
            <p className="text-sm text-pink-400 font-semibold mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 fill-pink-400" />
              Co mówią nasze klientki
            </p>
            
            {[
              {
                name: "Magda",
                salon: "Studio Urody Magda",
                city: "Nowy Sącz",
                text: "Po 2 miesiącach współpracy mam pełny grafik! Polecam każdej właścicielce salonu.",
                avatar: "M"
              },
              {
                name: "Karolina",
                salon: "Beauty by Karo",
                city: "Tarnów",
                text: "Wreszcie ktoś, kto rozumie branżę beauty. Reklamy są piękne i skuteczne!",
                avatar: "K"
              },
              {
                name: "Anna",
                salon: "Salon Piękności Anna",
                city: "Gorlice",
                text: "Bałam się płatnych reklam, ale ekipa Aurine wszystko wytłumaczyła. Teraz co tydzień mam nowe klientki.",
                avatar: "A"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-xl p-4 border border-pink-500/15">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
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

  // Slide 4: Cooperation process with visuals
  const Slide4 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-pink-500/10 via-transparent to-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Flower2 className="w-8 h-8 text-pink-400/50" />
      </div>
      <div className="absolute bottom-32 right-28 w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
        <Heart className="w-6 h-6 text-fuchsia-400/50" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Jak wygląda współpraca" />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-2">
            Prosty i <span className="text-pink-400">przejrzysty</span> proces
          </h2>
          <p className="text-lg text-zinc-300">Bez skomplikowanych umów i niezrozumiałych terminów</p>
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
                desc: "Poznajemy Twój salon, klientki i cele. Bez zobowiązań.", 
                details: ["Analiza profilu", "Określenie grupy", "Ustalenie budżetu"],
                color: "from-pink-500/30 to-rose-500/20"
              },
              { 
                num: "02", 
                icon: FileText, 
                title: "Strategia", 
                desc: "Przygotowujemy plan dopasowany do Twojego salonu.", 
                details: ["Kreacje reklamowe", "Teksty i grafiki", "Harmonogram"],
                color: "from-fuchsia-500/30 to-purple-500/20"
              },
              { 
                num: "03", 
                icon: Rocket, 
                title: "Start", 
                desc: "Uruchamiamy kampanie. Ty nie musisz nic robić.", 
                details: ["Konfiguracja", "Targetowanie", "Optymalizacja"],
                color: "from-blue-500/30 to-indigo-500/20"
              },
              { 
                num: "04", 
                icon: LineChart, 
                title: "Wyniki", 
                desc: "Co miesiąc raport z wynikami i rekomendacjami.", 
                details: ["Zasięgi", "Koszty", "Kolejne kroki"],
                color: "from-emerald-500/30 to-teal-500/20"
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {/* Step icon circle */}
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.color} border border-white/20 flex items-center justify-center relative z-10`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Card */}
                <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/70 rounded-xl p-4 border border-zinc-700/50 h-[calc(100%-72px)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-pink-500 bg-pink-500/15 px-2 py-0.5 rounded-full">{step.num}</span>
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

        {/* Bottom - no contracts message */}
        <div className="mt-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-xl p-4 border border-emerald-500/25">
          <p className="text-base text-center text-zinc-200 flex items-center justify-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>
              <span className="text-emerald-400 font-bold">Bez umów na rok</span> — współpracujemy miesiąc do miesiąca. 
              <span className="text-white font-medium"> Możesz zrezygnować kiedy chcesz.</span>
            </span>
          </p>
        </div>

        <Footer activeSlide={3} />
      </div>
    </div>
  );

  // Slide 5: Special offer - irresistible with more graphics
  const Slide5 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Rich celebratory background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-20 w-[300px] h-[300px] bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Celebratory decorations */}
      <Sparkle className="absolute top-20 left-24 w-8 h-8 text-pink-400/40" />
      <Star className="absolute top-28 right-32 w-6 h-6 text-amber-400/40 fill-amber-400/40" />
      <Sparkle className="absolute bottom-36 left-36 w-6 h-6 text-fuchsia-400/40" />
      <Star className="absolute bottom-28 right-24 w-8 h-8 text-pink-400/40 fill-pink-400/40" />
      <Gift className="absolute top-1/3 right-16 w-10 h-10 text-amber-400/30" />
      <Heart className="absolute bottom-1/3 left-20 w-8 h-8 text-pink-400/30" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Specjalna oferta" />

        {/* Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/10 rounded-full border border-amber-500/30 mb-3">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Propozycja nie do odrzucenia</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2">
            Specjalnie dla <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">{data.city || "Twojego miasta"}</span>
          </h2>
          <p className="text-lg text-zinc-300">
            Chcemy, żebyś mogła sprawdzić jak działamy — <span className="text-pink-300">bez żadnego ryzyka</span>
          </p>
        </div>

        {/* Two offers */}
        <div className="flex-1 flex gap-6 items-center justify-center">
          {/* Free audit */}
          <div className="w-[380px] bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border-2 border-pink-500/30 shadow-2xl shadow-pink-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/30 to-fuchsia-500/20 border border-pink-500/40 flex items-center justify-center">
                  <Search className="w-7 h-7 text-pink-400" />
                </div>
                <div>
                  <span className="px-2.5 py-1 bg-pink-500/20 rounded-full text-pink-400 text-xs font-bold">GRATIS</span>
                  <p className="text-zinc-500 text-xs mt-1 line-through">wartość 300 zł</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Darmowy audyt profilu</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Przeanalizujemy Twój Instagram i Facebook — pokażemy co poprawić, 
                żeby Twoje posty były bardziej widoczne. <span className="text-pink-300">Bez zobowiązań.</span>
              </p>
              
              <div className="space-y-2">
                {["Analiza profilu i postów", "Wskazówki do poprawy", "Rekomendacje hashtagów", "Propozycja content planu"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Free trial week */}
          <div className="w-[380px] bg-gradient-to-br from-amber-500/10 via-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/25 to-transparent rounded-full blur-2xl" />
            
            {/* Special badge */}
            <div className="absolute -top-3 right-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-black text-xs font-bold shadow-lg flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-black" />
              TYLKO 2 SALONY Z MIASTA
            </div>
            
            <div className="relative z-10 mt-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <span className="px-2.5 py-1 bg-amber-500/20 rounded-full text-amber-400 text-xs font-bold">GRATIS</span>
                  <p className="text-zinc-500 text-xs mt-1 line-through">wartość 500 zł</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Darmowy tydzień próbny</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Dla <span className="text-amber-400 font-semibold">dwóch pierwszych salonów z {data.city || "Twojego miasta"}</span> uruchamiamy 
                kampanię na tydzień za darmo. <span className="text-amber-300">Zobaczysz efekty przed zapłatą.</span>
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
        <div className="mt-4 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-xl p-4 border border-pink-500/25 text-center">
          <p className="text-base text-zinc-200">
            <Heart className="w-4 h-4 text-pink-400 inline mr-2" />
            <span className="text-white font-semibold">Nie masz nic do stracenia</span> — sprawdź, jak możemy pomóc Twojemu salonowi!
          </p>
        </div>

        <Footer activeSlide={4} />
      </div>
    </div>
  );

  // Slide 6: Contact & CTA - warm and inviting
  const Slide6 = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Decorative beauty elements */}
      <div className="absolute top-16 left-20 w-20 h-20 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Flower2 className="w-10 h-10 text-pink-400/50" />
      </div>
      <div className="absolute bottom-24 left-28 w-14 h-14 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
        <Sparkle className="w-7 h-7 text-fuchsia-400/50" />
      </div>
      <div className="absolute top-28 right-24 w-16 h-16 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <Heart className="w-8 h-8 text-rose-400/50" />
      </div>
      <div className="absolute bottom-32 right-32 w-18 h-18 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Scissors className="w-8 h-8 text-amber-400/50" />
      </div>
      <div className="absolute top-1/2 right-16 w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Palette className="w-6 h-6 text-pink-400/50" />
      </div>
      <div className="absolute top-1/3 left-32 w-10 h-10 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
        <Star className="w-5 h-5 text-fuchsia-400/50 fill-fuchsia-400/50" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-16 py-10">
        {/* Logo */}
        <img src={agencyLogo} alt="Aurine" className="w-20 h-20 object-contain mb-4" />
        
        {/* Main headline - warm */}
        <h2 className="text-4xl font-black text-white text-center mb-3">
          Porozmawiajmy o <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Twoim salonie</span>
        </h2>
        
        <p className="text-lg text-zinc-300 text-center max-w-2xl mb-8">
          Chętnie opowiemy więcej o tym, jak możemy pomóc {data.salonName || "Twojemu salonowi"}. 
          Napisz lub zadzwoń — <span className="text-pink-300">odpowiemy na wszystkie pytania!</span>
        </p>

        {/* Contact cards */}
        <div className="flex gap-5 mb-8">
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-xl p-5 border border-pink-500/25 flex items-center gap-4 min-w-[240px]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center">
              <Mail className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Email</p>
              <p className="text-white font-semibold">kontakt@aurine.pl</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-xl p-5 border border-blue-500/25 flex items-center gap-4 min-w-[240px]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-blue-500/40 flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Telefon</p>
              <p className="text-white font-semibold">+48 XXX XXX XXX</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-xl p-5 border border-fuchsia-500/25 flex items-center gap-4 min-w-[240px]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center">
              <Globe className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Strona</p>
              <p className="text-white font-semibold">aurine.pl</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-xl p-0.5 mb-8">
          <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-[10px] px-10 py-4 flex items-center gap-3">
            <span className="text-white font-bold text-lg">Umów się na darmową rozmowę</span>
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
            <span>Bez umów na rok</span>
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
