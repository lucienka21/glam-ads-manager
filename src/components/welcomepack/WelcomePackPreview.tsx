import { 
  Sparkles, Heart, Star, Calendar, Phone, Mail, 
  CheckCircle2, Clock, ArrowRight, Users, 
  FileText, Camera, Target, MessageCircle, 
  Flower2, Palette, Zap, Gift, Rocket,
  Headphones, Instagram, Facebook, Send,
  Award, Shield, TrendingUp, BarChart3
} from "lucide-react";
import agencyLogo from "@/assets/agency-logo.png";

interface WelcomePackData {
  ownerName: string;
  salonName: string;
  city: string;
  startDate: string;
  managerName: string;
  managerPhone: string;
  managerEmail: string;
}

interface WelcomePackPreviewProps {
  data: WelcomePackData;
  currentSlide: number;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "do ustalenia";
  const date = new Date(dateStr);
  return date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const WelcomePackPreview = ({ data, currentSlide }: WelcomePackPreviewProps) => {
  const totalSlides = 5;

  // Slide 1: Welcome - Hero with split layout
  const WelcomeSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      
      {/* Large glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />

      {/* Content - Split layout */}
      <div className="relative h-full flex">
        {/* Left side - Text content */}
        <div className="w-1/2 h-full flex flex-col p-14">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-pink-500/40">
              <img src={agencyLogo} alt="Aurine" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <p className="text-white font-black text-xl">AURINE</p>
              <p className="text-pink-400 text-xs font-medium tracking-widest">BEAUTY MARKETING</p>
            </div>
          </div>

          {/* Main text */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6 w-fit">
              <span className="text-pink-400 font-bold text-sm uppercase tracking-wider">Welcome Pack 2025</span>
            </div>
            
            <h1 className="text-6xl font-black text-white mb-4 leading-[1.1]">
              Witaj w<br />
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">rodzinie Aurine</span>
            </h1>
            
            <p className="text-2xl text-zinc-400 mb-8 font-light">
              {data.salonName || "Twój salon"}{data.city ? `, ${data.city}` : ""}
            </p>

            <div className="flex items-center gap-4">
              {data.startDate && (
                <div className="flex items-center gap-3 px-5 py-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <div>
                    <p className="text-zinc-500 text-xs font-medium">Start</p>
                    <p className="text-white font-bold">{formatDate(data.startDate)}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 px-5 py-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl">
                <Users className="w-5 h-5 text-fuchsia-400" />
                <div>
                  <p className="text-zinc-500 text-xs font-medium">Opiekun</p>
                  <p className="text-white font-bold">{data.managerName || "Twój opiekun"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-zinc-600 text-sm">aurine.pl</span>
            <div className="flex items-center gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === 0 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
              ))}
            </div>
            <span className="text-zinc-600 text-sm">1 / {totalSlides}</span>
          </div>
        </div>

        {/* Right side - Visual element */}
        <div className="w-1/2 h-full relative flex items-center justify-center p-10">
          {/* Main card */}
          <div className="relative">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-fuchsia-500/40 rounded-3xl blur-2xl scale-110" />
            
            {/* Card */}
            <div className="relative w-[380px] h-[480px] bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
              {/* Decorative top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-full">
                <span className="text-white font-bold text-sm">Dla {data.ownerName || "Ciebie"}</span>
              </div>
              
              {/* Icons grid */}
              <div className="grid grid-cols-3 gap-3 mb-8 mt-4">
                {[
                  { Icon: Rocket, color: "from-blue-500 to-cyan-500" },
                  { Icon: Target, color: "from-pink-500 to-rose-500" },
                  { Icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
                  { Icon: Heart, color: "from-fuchsia-500 to-purple-500" },
                  { Icon: Star, color: "from-amber-500 to-orange-500" },
                  { Icon: Zap, color: "from-yellow-500 to-amber-500" },
                ].map(({ Icon, color }, i) => (
                  <div key={i} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                ))}
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-white mb-2">Twój przewodnik</h3>
              <p className="text-zinc-400 text-sm mb-6">Wszystko co musisz wiedzieć o naszej współpracy</p>
              
              {/* Features list */}
              <div className="space-y-2 text-left w-full">
                {["Zespół i kontakty", "Harmonogram współpracy", "Wymagania na start", "Jak się komunikować"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2 bg-zinc-800/50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-xl shadow-pink-500/30 rotate-12">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-xl shadow-fuchsia-500/30 -rotate-12">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  // Slide 2: Team
  const TeamSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-bold">AURINE</p>
              <p className="text-zinc-500 text-xs">Twój zespół</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[Flower2, Heart, Sparkles].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/10 to-fuchsia-500/5 border border-pink-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-pink-400/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-2 gap-16">
          {/* Left - Manager */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-4">
              Twój <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">opiekun</span>
            </h2>
            <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
              Masz pytania? Potrzebujesz pomocy?<br />
              Twój dedykowany opiekun jest zawsze do dyspozycji.
            </p>

            <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-pink-500/30">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{data.managerName || "Twój opiekun"}</h3>
                  <p className="text-pink-400 font-medium text-lg">Account Manager</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-2xl border border-green-500/20">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm font-medium">Telefon</p>
                    <p className="text-white font-bold text-xl">{data.managerPhone || "+48 123 456 789"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded-2xl border border-blue-500/20">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm font-medium">Email</p>
                    <p className="text-white font-bold text-xl">{data.managerEmail || "kontakt@aurine.pl"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Values */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-8">Co nas wyróżnia</h3>
            
            <div className="space-y-4">
              {[
                { icon: Headphones, title: "Wsparcie 7 dni w tygodniu", desc: "Odpowiadamy szybko i skutecznie", color: "from-blue-500 to-cyan-600" },
                { icon: Target, title: "100% fokus na wyniki", desc: "Twój sukces = nasz sukces", color: "from-pink-500 to-rose-600" },
                { icon: MessageCircle, title: "Transparentny kontakt", desc: "Regularne raporty i updates", color: "from-purple-500 to-violet-600" },
                { icon: Zap, title: "Błyskawiczna reakcja", desc: "Elastyczne dostosowanie strategii", color: "from-amber-500 to-orange-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-2xl border border-zinc-700/30 hover:border-zinc-600/50 transition-all group">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{item.title}</p>
                    <p className="text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-600 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 1 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">2 / {totalSlides}</span>
        </div>
      </div>
    </div>
  );

  // Slide 3: Timeline
  const TimelineSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-pink-500/10 via-fuchsia-500/5 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-bold">AURINE</p>
              <p className="text-zinc-500 text-xs">Harmonogram</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-white mb-3">
            Etapy <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">współpracy</span>
          </h2>
          <p className="text-zinc-400 text-xl">Jak wygląda nasz proces od A do Z</p>
        </div>

        {/* Timeline - horizontal flow */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-5">
            {[
              { 
                step: "01", 
                title: "Onboarding", 
                icon: Rocket,
                color: "from-blue-500 to-cyan-600",
                shadowColor: "shadow-blue-500/30",
                tasks: ["Analiza Twojego salonu", "Ustalenie celów i budżetu", "Konfiguracja kont reklamowych"] 
              },
              { 
                step: "02", 
                title: "Kreacje", 
                icon: Camera,
                color: "from-pink-500 to-rose-600",
                shadowColor: "shadow-pink-500/30",
                tasks: ["Sesja zdjęciowa lub wybór zdjęć", "Projektowanie grafik", "Teksty reklamowe"] 
              },
              { 
                step: "03", 
                title: "Kampania", 
                icon: Target,
                color: "from-purple-500 to-violet-600",
                shadowColor: "shadow-purple-500/30",
                tasks: ["Uruchomienie reklam", "Bieżąca optymalizacja", "Testy różnych grup docelowych"] 
              },
              { 
                step: "04", 
                title: "Raport", 
                icon: BarChart3,
                color: "from-emerald-500 to-teal-600",
                shadowColor: "shadow-emerald-500/30",
                tasks: ["Analiza wyników", "Raport z rekomendacjami", "Plan na kolejny okres"] 
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-6 h-full backdrop-blur-sm hover:border-zinc-600/70 transition-all">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/40 text-white font-black text-sm">
                    {item.step}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-xl ${item.shadowColor} group-hover:scale-110 transition-transform mt-2`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  
                  <ul className="space-y-2.5">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-pink-400" />
                        </div>
                        <span className="text-zinc-400">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {i < 3 && (
                  <div className="absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/40">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 rounded-2xl mt-4">
          <Clock className="w-5 h-5 text-pink-400" />
          <p className="text-zinc-400 text-sm">Cykl powtarza się co miesiąc - stale optymalizujemy i raportujemy wyniki</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-zinc-600 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 2 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">3 / {totalSlides}</span>
        </div>
      </div>
    </div>
  );

  // Slide 4: Requirements
  const RequirementsSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-bold">AURINE</p>
              <p className="text-zinc-500 text-xs">Potrzebujemy od Ciebie</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-4">
              Co <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">potrzebujemy</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Żeby współpraca przebiegała sprawnie, potrzebujemy kilku rzeczy na start.
            </p>

            <div className="space-y-4">
              {[
                { icon: Users, title: "Dostęp do Business Managera", desc: "Dodamy się jako partnerzy", color: "from-blue-500 to-cyan-600" },
                { icon: Camera, title: "Zdjęcia z salonu", desc: "10-15 zdjęć w wysokiej jakości", color: "from-pink-500 to-rose-600" },
                { icon: FileText, title: "Cennik usług", desc: "Aktualny cennik do reklam", color: "from-purple-500 to-violet-600" },
                { icon: Target, title: "Twoje cele", desc: "Ile klientek chcesz pozyskiwać?", color: "from-emerald-500 to-teal-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-2xl border border-zinc-700/30 group hover:border-zinc-600/50 transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{item.title}</p>
                    <p className="text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 p-10 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-2xl">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center mb-8 shadow-2xl shadow-pink-500/30">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Checklista</h3>
                <p className="text-zinc-400 mb-8 text-lg">Wyślemy Ci szczegółową checklistę mailem</p>
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <span className="text-pink-300 font-semibold">Max 30 min Twojego czasu</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/40 to-orange-500/30 border border-amber-500/50 flex items-center justify-center shadow-xl">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-lg bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center shadow-xl">
                <Heart className="w-7 h-7 text-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-600 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 3 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">4 / {totalSlides}</span>
        </div>
      </div>
    </div>
  );

  // Slide 5: Contact
  const ContactSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-500/10 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-bold">AURINE</p>
              <p className="text-zinc-500 text-xs">Kontakt</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-4xl">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-10">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-pink-300 font-semibold text-lg">Jesteśmy tu dla Ciebie!</span>
              <Heart className="w-5 h-5 text-fuchsia-400" />
            </div>

            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Masz pytania?<br />
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Napisz lub zadzwoń!</span>
            </h2>
            
            <p className="text-xl text-zinc-400 mb-14">
              Nasz zespół jest do Twojej dyspozycji od poniedziałku do piątku, 9:00 - 17:00
            </p>

            <div className="flex justify-center gap-8 mb-14">
              <div className="flex items-center gap-5 px-10 py-6 bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-3xl backdrop-blur-sm shadow-2xl hover:border-green-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 font-medium mb-1">Zadzwoń</p>
                  <p className="text-white font-bold text-2xl">{data.managerPhone || "+48 123 456 789"}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 px-10 py-6 bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-3xl backdrop-blur-sm shadow-2xl hover:border-blue-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 font-medium mb-1">Napisz</p>
                  <p className="text-white font-bold text-2xl">{data.managerEmail || "kontakt@aurine.pl"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
                <img src={agencyLogo} alt="Aurine" className="w-9 h-9 object-contain" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-xl">Aurine Agency</p>
                <p className="text-zinc-500">Marketing dla branży beauty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-600 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 4 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">5 / {totalSlides}</span>
        </div>
      </div>
    </div>
  );

  const slides = [WelcomeSlide, TeamSlide, TimelineSlide, RequirementsSlide, ContactSlide];
  const CurrentSlideComponent = slides[currentSlide - 1] || WelcomeSlide;

  return <CurrentSlideComponent />;
};
