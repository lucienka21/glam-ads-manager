import { 
  Heart, Calendar, Phone, Mail, 
  CheckCircle2, Users, Rocket,
  Settings, Camera, FileText, Clock,
  Instagram, Facebook, ArrowRight,
  Sparkles, Star, Zap, Target, TrendingUp,
  MessageCircle, Gift, Award, Crown
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

// Decorative floating shapes component
const FloatingShapes = () => (
  <>
    <div className="absolute top-10 right-20 w-20 h-20 border border-pink-500/20 rounded-full animate-pulse" />
    <div className="absolute top-32 right-10 w-8 h-8 bg-pink-500/10 rounded-lg rotate-45" />
    <div className="absolute bottom-20 left-16 w-16 h-16 border border-fuchsia-500/20 rounded-xl rotate-12" />
    <div className="absolute bottom-32 right-32 w-6 h-6 bg-pink-400/20 rounded-full" />
    <div className="absolute top-1/2 left-8 w-3 h-3 bg-pink-500/30 rounded-full" />
    <div className="absolute top-20 left-1/3 w-4 h-4 border border-pink-400/30 rotate-45" />
  </>
);

// Decorative dots pattern
const DotsPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute opacity-20 ${className}`}>
    <div className="grid grid-cols-5 gap-3">
      {[...Array(25)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400" />
      ))}
    </div>
  </div>
);

// Gradient orbs
const GradientOrbs = () => (
  <>
    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent blur-[80px]" />
    <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent blur-[80px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pink-500/5 blur-[60px]" />
  </>
);

export const WelcomePackPreview = ({ data, currentSlide }: WelcomePackPreviewProps) => {
  const totalSlides = 6;

  // Footer component
  const Footer = ({ slideNumber }: { slideNumber: number }) => (
    <div className="flex items-center justify-between mt-auto pt-4">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-5 h-5 object-contain opacity-60" />
        <span className="text-zinc-500 text-xs">aurine.pl</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === slideNumber - 1 ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-1.5 bg-zinc-700'}`} />
        ))}
      </div>
      <span className="text-zinc-500 text-xs font-medium">{slideNumber}/{totalSlides}</span>
    </div>
  );

  // ==================== SLAJD 1: POWITANIE ====================
  const WelcomeSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DotsPattern className="top-16 right-8" />
      <DotsPattern className="bottom-24 left-12" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-pink-500/40 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-fuchsia-500/30 to-transparent" />

      <div className="relative h-full flex flex-col p-10">
        {/* Logo with glow */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
            <img src={agencyLogo} alt="Aurine" className="relative w-10 h-10 object-contain" />
          </div>
          <span className="text-pink-400 font-bold text-lg tracking-wider">AURINE</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Decorative stars */}
          <div className="absolute top-1/4 left-1/4">
            <Sparkles className="w-6 h-6 text-pink-400/40" />
          </div>
          <div className="absolute top-1/3 right-1/4">
            <Star className="w-5 h-5 text-fuchsia-400/30" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-8 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-semibold tracking-wide">WELCOME PACK</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>

          <h1 className="text-5xl font-black text-white mb-3 leading-tight">
            Witaj w rodzinie
          </h1>
          <h1 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Aurine!</span>
          </h1>

          <p className="text-xl text-zinc-300 mb-10 max-w-lg">
            <span className="text-white font-semibold">{data.ownerName || "Droga Klientko"}</span>, cieszymy się że{" "}
            <span className="text-pink-400 font-semibold">{data.salonName || "Twój salon"}</span> dołącza do nas!
          </p>

          {data.startDate && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex items-center gap-5 px-8 py-5 bg-zinc-900 border border-pink-500/30 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-pink-400/80 text-xs font-medium uppercase tracking-wider">Start współpracy</p>
                  <p className="text-white font-bold text-xl">{formatDate(data.startDate)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer slideNumber={1} />
      </div>
    </div>
  );

  // ==================== SLAJD 2: TWÓJ OPIEKUN ====================
  const TeamSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-dashed border-pink-500/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-fuchsia-500/15 rounded-full" />
      
      <DotsPattern className="top-10 left-10" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold text-sm tracking-wider">AURINE</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Decorative icon */}
          <div className="absolute top-1/4 right-16">
            <MessageCircle className="w-8 h-8 text-pink-500/20" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
            <Users className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-xs font-medium">TWÓJ OPIEKUN</span>
          </div>
          
          <h2 className="text-4xl font-black text-white text-center mb-2">
            Poznaj swojego <span className="text-pink-400">opiekuna</span>
          </h2>
          <p className="text-zinc-400 text-center mb-10">Masz pytania? Potrzebujesz pomocy? Dzwoń śmiało!</p>

          {/* Manager card */}
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500/50 blur-lg rounded-xl" />
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{data.managerName || "Account Manager"}</h3>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <p className="text-pink-400 text-sm font-medium">Account Manager</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-green-500/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">Telefon</p>
                    <p className="text-white font-semibold">{data.managerPhone || "+48 123 456 789"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-blue-500/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">Email</p>
                    <p className="text-white font-semibold">{data.managerEmail || "kontakt@aurine.pl"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/50">
            <Clock className="w-4 h-4 text-zinc-400" />
            <p className="text-zinc-400 text-sm">Dostępni <span className="text-white font-medium">pon-pt, 9:00-17:00</span></p>
          </div>
        </div>

        <Footer slideNumber={2} />
      </div>
    </div>
  );

  // ==================== SLAJD 3: PIERWSZE DNI ====================
  const OnboardingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 border border-dashed border-pink-500/10 rounded-full" />
      <div className="absolute bottom-10 left-10 w-28 h-28 border border-fuchsia-500/10 rounded-xl rotate-12" />
      <DotsPattern className="top-20 left-8" />
      <DotsPattern className="bottom-16 right-16" />
      
      {/* Decorative icons */}
      <div className="absolute top-24 right-24">
        <Zap className="w-6 h-6 text-amber-400/30" />
      </div>
      <div className="absolute bottom-32 left-24">
        <Target className="w-8 h-8 text-pink-500/20" />
      </div>

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold text-sm tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
            <Rocket className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-xs font-medium">ONBOARDING</span>
          </div>
          <h2 className="text-4xl font-black text-white">
            Pierwsze <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">dni</span> współpracy
          </h2>
          <p className="text-zinc-400 mt-2">Co się będzie działo w pierwszym tygodniu</p>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="grid grid-cols-4 gap-4 relative">
              {/* Animated connection line */}
              <div className="absolute top-9 left-[12%] right-[12%] h-1 bg-gradient-to-r from-pink-500/50 via-fuchsia-500/50 to-pink-500/50 rounded-full" />
              
              {[
                { day: "Dzień 1", title: "Dostępy", icon: Settings, desc: "Konfiguracja Business Manager", color: "from-blue-500 to-cyan-500" },
                { day: "Dzień 2-3", title: "Analiza", icon: FileText, desc: "Poznajemy Twój salon", color: "from-purple-500 to-pink-500" },
                { day: "Dzień 3-4", title: "Kreacje", icon: Camera, desc: "Tworzymy reklamy", color: "from-amber-500 to-orange-500" },
                { day: "Dzień 5", title: "Start!", icon: Rocket, desc: "Uruchamiamy kampanie", color: "from-pink-500 to-fuchsia-500" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                  <div className={`relative mb-3`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-lg opacity-40 rounded-xl group-hover:opacity-60 transition-opacity`} />
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <span className="text-xs text-pink-400/80 font-medium mb-1">{step.day}</span>
                  <h3 className="text-white font-bold mb-1">{step.title}</h3>
                  <p className="text-zinc-500 text-xs leading-tight">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-green-300 font-medium">Po 5 dniach Twoje reklamy już działają!</span>
          </div>
        </div>

        <Footer slideNumber={3} />
      </div>
    </div>
  );

  // ==================== SLAJD 4: CO DALEJ (STAŁA WSPÓŁPRACA) ====================
  const OngoingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      
      {/* Decorative */}
      <DotsPattern className="top-16 right-8" />
      <div className="absolute top-20 left-16">
        <TrendingUp className="w-8 h-8 text-emerald-500/20" />
      </div>
      <div className="absolute bottom-24 right-20">
        <Award className="w-6 h-6 text-amber-400/30" />
      </div>

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold text-sm tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-xs font-medium">STAŁA WSPÓŁPRACA</span>
          </div>
          <h2 className="text-4xl font-black text-white">
            Jak wygląda <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">współpraca</span>
          </h2>
          <p className="text-zinc-400 mt-2">Co robimy dla Ciebie każdego miesiąca</p>
        </div>

        {/* Monthly cycle */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {[
              { icon: Settings, title: "Codzienna optymalizacja", desc: "Codziennie sprawdzamy i optymalizujemy Twoje kampanie", color: "from-blue-500 to-cyan-500" },
              { icon: Camera, title: "Nowe kreacje", desc: "Regularnie tworzymy świeże grafiki i teksty reklam", color: "from-purple-500 to-pink-500" },
              { icon: FileText, title: "Raport miesięczny", desc: "Co miesiąc dostajesz szczegółowy raport z wynikami", color: "from-amber-500 to-orange-500" },
              { icon: Phone, title: "Konsultacje", desc: "Omawiamy wyniki i planujemy kolejne działania", color: "from-green-500 to-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="relative flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-pink-400" />
            </div>
            <span className="text-zinc-300">Kampanie działają <span className="text-white font-semibold">non-stop</span> przez cały okres współpracy</span>
          </div>
        </div>

        <Footer slideNumber={4} />
      </div>
    </div>
  );

  // ==================== SLAJD 5: POTRZEBUJEMY OD CIEBIE (CHECKLISTA) ====================
  const RequirementsSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      
      {/* Decorative */}
      <div className="absolute top-16 right-16 w-36 h-36 border-2 border-dashed border-amber-500/10 rounded-full" />
      <DotsPattern className="bottom-20 left-8" />
      <div className="absolute top-24 left-20">
        <Gift className="w-8 h-8 text-pink-500/20" />
      </div>

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold text-sm tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs font-medium">CHECKLISTA</span>
          </div>
          <h2 className="text-4xl font-black text-white">
            Potrzebujemy od <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">Ciebie</span>
          </h2>
          <p className="text-zinc-400 mt-2">Żebyśmy mogli zacząć, potrzebujemy kilku rzeczy</p>
        </div>

        {/* Checklist */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg space-y-3">
            {[
              { title: "Dostęp do Business Managera", desc: "Dodamy Cię do naszego lub założymy nowy", icon: Settings, color: "from-blue-500 to-cyan-500" },
              { title: "Zdjęcia z salonu", desc: "Zdjęcia efektów, wnętrza, zabiegów", icon: Camera, color: "from-purple-500 to-pink-500" },
              { title: "Cennik usług", desc: "Lista usług z cenami do promocji", icon: FileText, color: "from-amber-500 to-orange-500" },
              { title: "Dostęp do Instagrama", desc: "Żebyśmy mogli tworzyć reklamy", icon: Instagram, color: "from-pink-500 to-fuchsia-500" },
              { title: "Dane do faktury", desc: "NIP i dane firmy", icon: FileText, color: "from-green-500 to-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className="relative flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-pink-500/30 transition-colors">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-700 group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-colors flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-zinc-600 group-hover:text-pink-400 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer slideNumber={5} />
      </div>
    </div>
  );

  // ==================== SLAJD 6: KONTAKT ====================
  const ContactSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DotsPattern className="top-16 left-12" />
      <DotsPattern className="bottom-20 right-10" />
      
      {/* Extra decorative */}
      <div className="absolute top-1/3 right-16">
        <Sparkles className="w-6 h-6 text-amber-400/30" />
      </div>
      <div className="absolute bottom-1/3 left-16">
        <Heart className="w-8 h-8 text-pink-500/20" />
      </div>

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold text-sm tracking-wider">AURINE</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-xs font-medium">KONTAKT</span>
          </div>
          
          <h2 className="text-4xl font-black text-white mb-2">
            Jesteśmy do <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">dyspozycji</span>!
          </h2>
          <p className="text-zinc-400 mb-8">Masz pytania? Napisz lub zadzwoń - odpowiadamy szybko!</p>

          {/* Contact grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-6">
            <a href="tel:+48123456789" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-green-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider">Telefon</p>
                  <p className="text-white font-semibold">{data.managerPhone || "+48 123 456 789"}</p>
                </div>
              </div>
            </a>

            <a href="mailto:kontakt@aurine.pl" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider">Email</p>
                  <p className="text-white font-semibold">{data.managerEmail || "kontakt@aurine.pl"}</p>
                </div>
              </div>
            </a>

            <a href="https://instagram.com/aurine.pl" target="_blank" rel="noopener noreferrer" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-pink-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider">Instagram</p>
                  <p className="text-white font-semibold">@aurine.pl</p>
                </div>
              </div>
            </a>

            <a href="https://facebook.com/aurine.pl" target="_blank" rel="noopener noreferrer" className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider">Facebook</p>
                  <p className="text-white font-semibold">Aurine</p>
                </div>
              </div>
            </a>
          </div>

          {/* Website */}
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-500/30 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-zinc-300">Odwiedź nas: <span className="text-white font-bold">aurine.pl</span></span>
          </div>
        </div>

        <Footer slideNumber={6} />
      </div>
    </div>
  );

  // Render current slide
  const renderSlide = () => {
    switch (currentSlide) {
      case 1: return <WelcomeSlide />;
      case 2: return <TeamSlide />;
      case 3: return <OnboardingSlide />;
      case 4: return <OngoingSlide />;
      case 5: return <RequirementsSlide />;
      case 6: return <ContactSlide />;
      default: return <WelcomeSlide />;
    }
  };

  return (
    <div className="w-full" style={{ aspectRatio: '16/9' }}>
      {/* Visible slide */}
      <div 
        id={`capture-welcomepack-slide-${currentSlide}`} 
        className="w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-pink-500/10"
      >
        {renderSlide()}
      </div>

      {/* Hidden slides for PDF capture */}
      <div className="hidden">
        {[1, 2, 3, 4, 5, 6].filter(num => num !== currentSlide).map(slideNum => (
          <div 
            key={slideNum}
            id={`capture-welcomepack-slide-${slideNum}`}
            className="w-full"
            style={{ aspectRatio: '16/9' }}
          >
            {slideNum === 1 && <WelcomeSlide />}
            {slideNum === 2 && <TeamSlide />}
            {slideNum === 3 && <OnboardingSlide />}
            {slideNum === 4 && <OngoingSlide />}
            {slideNum === 5 && <RequirementsSlide />}
            {slideNum === 6 && <ContactSlide />}
          </div>
        ))}
      </div>
    </div>
  );
};
