import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, LineChart,
  Eye, Megaphone, Scissors, Palette, UserCheck, Send,
  Gift, Shield, Rocket, ThumbsUp, Coffee,
  MapPin, Sparkle, CheckCircle, Quote
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

  // Elegant footer with slide indicators
  const Footer = ({ activeSlide }: { activeSlide: number }) => (
    <div className="flex items-center justify-between mt-auto pt-6">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-5 h-5 object-contain opacity-70" />
        <span className="text-zinc-500 text-xs tracking-wide">aurine.pl</span>
      </div>
      <div className="flex items-center gap-2">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-1.5 bg-zinc-700/60'}`} />
        ))}
      </div>
      <span className="text-zinc-500 text-xs tracking-wide">Marketing beauty</span>
    </div>
  );

  // Slide 1: Warm welcome with integrated beauty visuals
  const Slide1 = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-pink-950/40 via-fuchsia-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-pink-950/30 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left content */}
        <div className="w-[55%] h-full flex flex-col px-12 py-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-auto">
            <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-pink-400 font-semibold text-sm tracking-wide">AURINE</p>
              <p className="text-zinc-500 text-xs">Marketing dla salonów beauty</p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/20 mb-8 w-fit">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300 text-sm">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            </div>

            <h1 className="text-[2.8rem] font-bold text-white leading-[1.15] mb-6">
              Wiemy, że prowadzenie salonu to
              <span className="block text-pink-400">prawdziwe wyzwanie</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-md">
              Codziennie dbasz o to, żeby Twoje klientki wychodziły szczęśliwe.
              <span className="text-zinc-300"> A co z pozyskiwaniem nowych?</span>
            </p>

            {/* Personal card */}
            <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800 max-w-sm">
              <p className="text-zinc-500 text-xs mb-2 uppercase tracking-wider">Ta prezentacja jest dla</p>
              <p className="text-2xl font-bold text-white mb-1">{data.ownerName || "Ciebie"}</p>
              <p className="text-pink-400 font-medium">{data.salonName || "Twój Salon"}</p>
              <p className="text-zinc-500 text-sm flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {data.city || "Twoje miasto"}
              </p>
            </div>
          </div>

          <Footer activeSlide={0} />
        </div>

        {/* Right side - integrated beauty visual */}
        <div className="w-[45%] h-full flex items-center justify-center p-8">
          <div className="relative w-full h-full max-h-[500px] flex items-center justify-center">
            {/* Main beauty composition */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[380px]">
              {/* Beauty icons grid */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/30 flex items-center justify-center p-6">
                <div className="text-center">
                  <Flower2 className="w-14 h-14 text-pink-400 mx-auto mb-2" />
                  <span className="text-pink-300/80 text-xs font-medium">Pielęgnacja</span>
                </div>
              </div>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10 border border-fuchsia-500/30 flex items-center justify-center p-6">
                <div className="text-center">
                  <Scissors className="w-14 h-14 text-fuchsia-400 mx-auto mb-2" />
                  <span className="text-fuchsia-300/80 text-xs font-medium">Stylizacja</span>
                </div>
              </div>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/30 flex items-center justify-center p-6">
                <div className="text-center">
                  <Palette className="w-14 h-14 text-rose-400 mx-auto mb-2" />
                  <span className="text-rose-300/80 text-xs font-medium">Makijaż</span>
                </div>
              </div>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center p-6">
                <div className="text-center">
                  <Sparkles className="w-14 h-14 text-amber-400 mx-auto mb-2" />
                  <span className="text-amber-300/80 text-xs font-medium">Uroda</span>
                </div>
              </div>
            </div>

            {/* Floating social badges */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
              <div className="px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-xs font-medium">Ads</span>
              </div>
              <div className="px-4 py-2 bg-pink-600/20 rounded-full border border-pink-500/30 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-pink-300 text-xs font-medium">Ads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 2: Understanding challenges - empathetic tone
  const Slide2 = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-950/20 via-transparent to-fuchsia-950/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-12 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm tracking-wide">AURINE</p>
            <p className="text-zinc-500 text-xs">Rozumiemy Twoje wyzwania</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-3">
          Czy to brzmi <span className="text-pink-400">znajomo</span>?
        </h2>
        <p className="text-lg text-zinc-400 mb-8">
          Wiele właścicielek salonów w mniejszych miastach zmaga się z tym samym...
        </p>

        {/* Content grid */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Left - Problems */}
          <div className="space-y-4">
            <div className="bg-zinc-900/70 rounded-2xl p-5 border border-zinc-800">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-pink-500/15 border border-pink-500/25 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-7 h-7 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Post to nie reklama</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Wrzucasz piękne zdjęcia, ale algorytm pokazuje je tylko <span className="text-pink-400 font-medium">5-10%</span> obserwujących.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/70 rounded-2xl p-5 border border-zinc-800">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-7 h-7 text-zinc-500 rotate-180" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Zasięgi spadły</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Organiczne zasięgi zmniejszyły się o <span className="text-rose-400 font-medium">80%</span>. Bez płatnej promocji trudno dotrzeć do nowych osób.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/70 rounded-2xl p-5 border border-zinc-800">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Brak czasu</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Między zabiegami nie ma kiedy uczyć się reklam. A "Promuj post" to często przepalone pieniądze.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Visual representation */}
          <div className="flex flex-col gap-4">
            {/* Phone mockup showing low stats */}
            <div className="flex-1 bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6 flex items-center justify-center">
              <div className="w-48 bg-zinc-950 rounded-3xl p-1 border border-zinc-800">
                <div className="bg-black rounded-[22px] overflow-hidden">
                  <div className="bg-zinc-900 px-3 py-2 flex items-center gap-2 border-b border-zinc-800">
                    <Instagram className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Statystyki</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="text-center">
                      <p className="text-zinc-600 text-xs mb-1">Zasięg posta</p>
                      <p className="text-3xl font-bold text-zinc-500">47</p>
                      <p className="text-xs text-zinc-700">z 1,200 obserwujących</p>
                    </div>
                    <div className="h-px bg-zinc-800" />
                    <div className="bg-rose-500/10 rounded-lg p-2 border border-rose-500/20">
                      <p className="text-xs text-rose-400 text-center">Tylko 4% osób zobaczyło</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Good news */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-5 border border-emerald-500/25">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-emerald-400 font-semibold mb-1">Dobra wiadomość!</p>
                  <p className="text-zinc-300 text-sm">
                    W {data.city || "Twoim mieście"} mało salonów korzysta z płatnych reklam — <span className="text-white font-medium">to Twoja szansa.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer activeSlide={1} />
      </div>
    </div>
  );

  // Slide 3: How we help with testimonials
  const Slide3 = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/15 via-transparent to-blue-950/15" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-12 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm tracking-wide">AURINE</p>
            <p className="text-zinc-500 text-xs">Jak możemy Ci pomóc</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-2">
          Reklamy, które <span className="text-pink-400">działają</span>
        </h2>
        <p className="text-zinc-400 mb-6">Zajmujemy się wszystkim — Ty możesz skupić się na klientkach</p>

        {/* Main content */}
        <div className="flex-1 grid grid-cols-3 gap-5">
          {/* Benefits */}
          <div className="space-y-3">
            {[
              { icon: Target, title: "Precyzyjne dotarcie", desc: "Reklamy trafiają do kobiet 25-45 lat w Twojej okolicy", color: "bg-pink-500/15 border-pink-500/25 text-pink-400" },
              { icon: Eye, title: "Tysiące wyświetleń", desc: "Zamiast 50 osób, reklamę zobaczy kilka tysięcy", color: "bg-blue-500/15 border-blue-500/25 text-blue-400" },
              { icon: Sparkles, title: "Piękne kreacje", desc: "Grafiki dopasowane do estetyki Twojego salonu", color: "bg-fuchsia-500/15 border-fuchsia-500/25 text-fuchsia-400" },
              { icon: BarChart3, title: "Jasne raporty", desc: "Co miesiąc przejrzysty raport z wynikami", color: "bg-emerald-500/15 border-emerald-500/25 text-emerald-400" },
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.color} border flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phone mockup with successful ad */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-52 bg-zinc-900 rounded-[32px] p-1.5 border border-zinc-700 shadow-2xl shadow-pink-500/10">
                <div className="bg-black rounded-[26px] overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-600/20 to-fuchsia-600/20 px-3 py-2 flex items-center justify-between border-b border-pink-500/20">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-white font-medium">{data.salonName || 'Salon'}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="px-3 py-1.5 flex items-center gap-2 bg-zinc-900/50">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                      <Flower2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-white">{data.salonName || 'Salon'}</span>
                    <span className="text-[10px] text-pink-400 ml-auto">Sponsorowane</span>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-pink-900/40 via-zinc-900 to-fuchsia-900/30 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-pink-300 font-bold text-sm">-20% na pierwszy zabieg</p>
                      <p className="text-zinc-500 text-xs mt-1">Zarezerwuj online</p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                    <p className="text-xs text-white font-medium">2,847 polubień</p>
                  </div>
                </div>
              </div>
              
              {/* Stats floating */}
              <div className="absolute -left-16 top-8 bg-zinc-900/95 rounded-xl p-2.5 border border-emerald-500/30">
                <p className="text-[10px] text-zinc-500">Nowe klientki</p>
                <p className="text-lg font-bold text-emerald-400">+24</p>
              </div>
              <div className="absolute -right-14 bottom-20 bg-zinc-900/95 rounded-xl p-2.5 border border-blue-500/30">
                <p className="text-[10px] text-zinc-500">Zasięg</p>
                <p className="text-lg font-bold text-white">12.4k</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-3">
            <p className="text-pink-400 text-sm font-semibold flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-pink-400" />
              Co mówią nasze klientki
            </p>
            {[
              { name: "Magda", salon: "Studio Urody Magda", city: "Nowy Sącz", text: "Po 2 miesiącach mam pełny grafik! Polecam każdej właścicielce.", avatar: "M" },
              { name: "Karolina", salon: "Beauty by Karo", city: "Tarnów", text: "Wreszcie ktoś, kto rozumie branżę beauty. Reklamy są piękne!", avatar: "K" },
              { name: "Anna", salon: "Salon Piękności Anna", city: "Gorlice", text: "Bałam się reklam, ale wszystko mi wytłumaczyli. Teraz mam nowe klientki co tydzień.", avatar: "A" }
            ].map((t, idx) => (
              <div key={idx} className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed mb-2 italic">"{t.text}"</p>
                    <p className="text-white text-xs font-medium">{t.name}</p>
                    <p className="text-zinc-600 text-[10px]">{t.salon}</p>
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
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-950/10 via-transparent to-fuchsia-950/10" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-12 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm tracking-wide">AURINE</p>
            <p className="text-zinc-500 text-xs">Jak wygląda współpraca</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-2">
          Prosty i <span className="text-pink-400">przejrzysty</span> proces
        </h2>
        <p className="text-zinc-400 mb-8">Bez skomplikowanych umów i niezrozumiałych terminów</p>

        {/* Process steps */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-5">
            {[
              { num: "01", icon: Coffee, title: "Rozmowa", desc: "Poznajemy Twój salon, klientki i cele. Bez zobowiązań — po prostu rozmawiamy.", details: ["Analiza profilu", "Określenie celów", "Ustalenie budżetu"], color: "from-pink-500/20 to-rose-500/10 border-pink-500/30" },
              { num: "02", icon: FileText, title: "Strategia", desc: "Przygotowujemy plan dopasowany do Twojego salonu i lokalnego rynku.", details: ["Kreacje reklamowe", "Teksty i grafiki", "Harmonogram"], color: "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30" },
              { num: "03", icon: Rocket, title: "Start", desc: "Uruchamiamy kampanie. Ty nie musisz nic robić — my wszystkim zarządzamy.", details: ["Konfiguracja konta", "Targetowanie", "Optymalizacja"], color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30" },
              { num: "04", icon: LineChart, title: "Wyniki", desc: "Co miesiąc jasny raport z wynikami i propozycjami na następny okres.", details: ["Zasięgi i kliknięcia", "Koszty kampanii", "Rekomendacje"], color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-5 border h-full flex flex-col`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-pink-400 font-bold text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{step.desc}</p>
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    {step.details.map((detail, didx) => (
                      <div key={didx} className="flex items-center gap-2 text-xs text-zinc-300">
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

        {/* No contracts */}
        <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/25">
          <p className="text-zinc-300 text-center flex items-center justify-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span><span className="text-emerald-400 font-semibold">Bez umów na rok</span> — współpracujemy miesiąc do miesiąca. Możesz zrezygnować kiedy chcesz.</span>
          </p>
        </div>

        <Footer activeSlide={3} />
      </div>
    </div>
  );

  // Slide 5: Special offer - irresistible
  const Slide5 = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/30 via-transparent to-amber-950/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-12 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm tracking-wide">AURINE</p>
            <p className="text-zinc-500 text-xs">Specjalna propozycja</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/15 rounded-full border border-amber-500/30 mb-4">
            <Gift className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Propozycja dla {data.city || "Twojego miasta"}</span>
          </div>
          <h2 className="text-4xl font-bold text-white">
            Coś specjalnego <span className="text-pink-400">dla Ciebie</span>
          </h2>
        </div>

        {/* Offers */}
        <div className="flex-1 grid grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {/* Free audit */}
          <div className="bg-gradient-to-br from-pink-500/15 to-rose-500/10 rounded-3xl p-8 border border-pink-500/30 flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Darmowy audyt</h3>
            <p className="text-zinc-400 leading-relaxed mb-6 flex-1">
              Przeanalizujemy Twoje obecne działania marketingowe i pokażemy, co możesz poprawić — <span className="text-pink-300">całkowicie za darmo</span>, bez żadnych zobowiązań.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-pink-400" />
                <span>Analiza profili social media</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-pink-400" />
                <span>Ocena potencjału reklamowego</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-pink-400" />
                <span>Konkretne rekomendacje</span>
              </div>
            </div>
          </div>

          {/* Free trial */}
          <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 rounded-3xl p-8 border border-amber-500/30 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/30 rounded-full border border-amber-500/40">
              <span className="text-amber-300 text-xs font-semibold">LIMITOWANE</span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Darmowy tydzień próbny</h3>
            <p className="text-zinc-400 leading-relaxed mb-6 flex-1">
              Dla <span className="text-amber-300 font-semibold">2 pierwszych salonów</span> z {data.city || "Twojego miasta"} — tydzień pełnej obsługi reklamowej całkowicie gratis.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span>Profesjonalne kreacje reklamowe</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span>Pełna konfiguracja kampanii</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span>Raport z pierwszych wyników</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            <span className="text-white font-medium">Nic nie ryzykujesz</span> — jeśli nie będziesz zadowolona, po prostu dziękujemy za rozmowę.
          </p>
        </div>

        <Footer activeSlide={4} />
      </div>
    </div>
  );

  // Slide 6: Contact - friendly invitation to talk
  const Slide6 = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/25 via-fuchsia-950/15 to-rose-950/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-12 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-auto">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-pink-400 font-semibold text-sm tracking-wide">AURINE</p>
            <p className="text-zinc-500 text-xs">Porozmawiajmy</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-2 gap-12 items-center">
            {/* Left - invitation */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                Porozmawiajmy o
                <span className="block text-pink-400">Twoim salonie</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                Bez presji, bez zobowiązań. Chętnie poznamy {data.salonName || "Twój salon"} i opowiemy więcej o tym, jak mogłybyśmy współpracować.
              </p>

              {/* Offers reminder */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                    <Search className="w-4 h-4 text-pink-400" />
                  </div>
                  <span>Darmowy audyt marketingowy</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>Tydzień próbny dla 2 pierwszych salonów z {data.city || "miasta"}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-pink-400">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Czekamy na wiadomość od Ciebie!</span>
              </div>
            </div>

            {/* Right - contact card */}
            <div className="flex justify-center">
              <div className="bg-zinc-900/80 rounded-3xl p-8 border border-zinc-800 max-w-sm w-full">
                <div className="flex items-center gap-4 mb-8">
                  <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
                  <div>
                    <p className="text-xl font-bold text-white">Aurine Agency</p>
                    <p className="text-zinc-500 text-sm">Marketing dla branży beauty</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a href="tel:+48123456789" className="flex items-center gap-4 p-4 bg-pink-500/10 rounded-xl border border-pink-500/25 hover:bg-pink-500/15 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs">Telefon</p>
                      <p className="text-white font-medium">+48 123 456 789</p>
                    </div>
                  </a>

                  <a href="mailto:kontakt@aurine.pl" className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs">Email</p>
                      <p className="text-white font-medium">kontakt@aurine.pl</p>
                    </div>
                  </a>

                  <a href="https://aurine.pl" className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs">Strona</p>
                      <p className="text-white font-medium">aurine.pl</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer activeSlide={5} />
      </div>
    </div>
  );

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlide = slides[currentSlide] || Slide1;

  return (
    <div className="w-full h-full">
      <CurrentSlide />
    </div>
  );
};
