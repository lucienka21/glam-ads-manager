import { 
  Sparkles, Heart, Star, Calendar, Phone, Mail, 
  CheckCircle2, Clock, ArrowRight, Users, 
  FileText, Camera, Target, MessageCircle, 
  Flower2, Palette, Zap, Gift, Rocket,
  Headphones, Instagram, Facebook, Send,
  Award, Shield, TrendingUp, BarChart3,
  MapPin, Coffee, Sparkle, UserCheck
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

  // Common header component - matching presentation style
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
      <span className="text-zinc-600 text-xs">Welcome Pack 2025</span>
    </div>
  );

  // Floating welcome graphics
  const WelcomeGraphics = () => (
    <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[380px] h-[450px]">
      {/* Central gift icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-pink-500/40">
        <Gift className="w-16 h-16 text-white" />
      </div>
      
      {/* Surrounding icons */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg">
        <Star className="w-8 h-8 text-amber-400" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg">
        <Rocket className="w-8 h-8 text-emerald-400" />
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-500/40 flex items-center justify-center shadow-lg">
        <TrendingUp className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/30 to-pink-500/20 border border-rose-500/40 flex items-center justify-center shadow-lg">
        <Heart className="w-7 h-7 text-rose-400" />
      </div>
      
      {/* Diagonal corners */}
      <div className="absolute top-16 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/25 to-purple-500/15 border border-fuchsia-500/30 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-fuchsia-400" />
      </div>
      <div className="absolute top-16 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/25 to-rose-500/15 border border-pink-500/30 flex items-center justify-center">
        <Flower2 className="w-6 h-6 text-pink-400" />
      </div>
      <div className="absolute bottom-20 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-500/15 border border-violet-500/30 flex items-center justify-center">
        <Award className="w-6 h-6 text-violet-400" />
      </div>
      <div className="absolute bottom-20 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-500/15 border border-cyan-500/30 flex items-center justify-center">
        <Target className="w-6 h-6 text-cyan-400" />
      </div>

      {/* Welcome badge */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-pink-600/30 to-fuchsia-600/20 rounded-xl border border-pink-500/40 backdrop-blur-sm">
        <span className="text-pink-300 font-bold text-lg">🎉 Witamy w rodzinie!</span>
      </div>
    </div>
  );

  // Slide 1: Welcome
  const WelcomeSlide = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-pink-500/15 via-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Welcome graphics */}
      <WelcomeGraphics />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Welcome Pack dla Twojego salonu" />

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[55%]">
          {/* Warm greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/15 to-fuchsia-500/10 rounded-full border border-pink-500/25 mb-6 w-fit">
            <Coffee className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Cześć {data.ownerName || "Droga Klientko"}!</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl font-black text-white leading-[1.2] mb-6">
            Witamy w<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              rodzinie Aurine!
            </span>
          </h1>

          <p className="text-lg text-zinc-300 leading-relaxed mb-8 max-w-xl">
            Cieszymy się, że <span className="text-pink-300 font-semibold">{data.salonName || "Twój salon"}</span> dołącza 
            do grona naszych klientów. Ten dokument to Twój przewodnik po współpracy z nami.
          </p>

          {/* Info card */}
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-pink-500/25 shadow-2xl shadow-pink-500/10 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs">Welcome Pack dla</p>
                <p className="text-2xl font-bold text-white">{data.salonName || "Twój Salon"}</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-pink-500/40 via-fuchsia-500/30 to-transparent mb-4" />
            <div className="flex items-center gap-4">
              {data.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  <span className="text-zinc-300 text-sm">{formatDate(data.startDate)}</span>
                </div>
              )}
              {data.city && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-zinc-300 text-sm">{data.city}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer activeSlide={0} />
      </div>
    </div>
  );

  // Team graphics cluster
  const TeamGraphics = () => (
    <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[380px] h-[420px]">
      {/* Central user icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
        <Users className="w-14 h-14 text-white" />
      </div>
      
      {/* Surrounding icons */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center">
        <Heart className="w-7 h-7 text-pink-400" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center">
        <Shield className="w-7 h-7 text-emerald-400" />
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/20 border border-green-500/40 flex items-center justify-center">
        <Phone className="w-7 h-7 text-green-400" />
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center">
        <Mail className="w-7 h-7 text-fuchsia-400" />
      </div>
      
      {/* Small corners */}
      <div className="absolute top-20 left-12 w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-500/30 flex items-center justify-center">
        <Headphones className="w-5 h-5 text-amber-400" />
      </div>
      <div className="absolute top-20 right-12 w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/25 to-purple-500/15 border border-violet-500/30 flex items-center justify-center">
        <MessageCircle className="w-5 h-5 text-violet-400" />
      </div>
      <div className="absolute bottom-20 left-12 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/25 to-blue-500/15 border border-cyan-500/30 flex items-center justify-center">
        <Zap className="w-5 h-5 text-cyan-400" />
      </div>
      <div className="absolute bottom-20 right-12 w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/25 to-pink-500/15 border border-rose-500/30 flex items-center justify-center">
        <Target className="w-5 h-5 text-rose-400" />
      </div>

      {/* Support badge */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-gradient-to-r from-blue-600/25 to-cyan-600/15 rounded-xl border border-blue-500/35 backdrop-blur-sm">
        <span className="text-blue-300 font-medium">Wsparcie 7 dni w tygodniu</span>
      </div>
    </div>
  );

  // Slide 2: Team
  const TeamSlide = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Team graphics */}
      <TeamGraphics />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Twój zespół wsparcia" />

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[50%]">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Poznaj swojego<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              opiekuna konta
            </span>
          </h2>

          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Masz pytania? Potrzebujesz pomocy? Twój dedykowany opiekun jest zawsze do dyspozycji.
          </p>

          {/* Manager card */}
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 backdrop-blur rounded-2xl p-6 border border-blue-500/20 shadow-xl max-w-md mb-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data.managerName || "Twój opiekun"}</p>
                <p className="text-blue-400 font-medium">Account Manager</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">{data.managerPhone || "+48 123 456 789"}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">{data.managerEmail || "kontakt@aurine.pl"}</span>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="flex gap-3">
            {[
              { icon: Headphones, text: "Szybka odpowiedź", color: "from-pink-500/20 to-rose-500/10 border-pink-500/30" },
              { icon: Target, text: "100% fokus", color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30" },
              { icon: Zap, text: "Elastyczność", color: "from-amber-500/20 to-orange-500/10 border-amber-500/30" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${item.color} rounded-xl border`}>
                <item.icon className="w-4 h-4 text-white/80" />
                <span className="text-zinc-200 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <Footer activeSlide={1} />
      </div>
    </div>
  );

  // Slide 3: Timeline
  const TimelineSlide = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-pink-500/10 via-fuchsia-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Harmonogram współpracy" />

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white mb-2">
            Etapy <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">współpracy</span>
          </h2>
          <p className="text-zinc-400 text-lg">Jak wygląda nasz proces od A do Z</p>
        </div>

        {/* Timeline cards */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-4">
            {[
              { 
                step: "01", 
                title: "Onboarding", 
                icon: Rocket,
                color: "from-blue-500 to-cyan-600",
                tasks: ["Analiza salonu", "Ustalenie celów", "Konfiguracja kont"] 
              },
              { 
                step: "02", 
                title: "Kreacje", 
                icon: Camera,
                color: "from-pink-500 to-rose-600",
                tasks: ["Sesja lub zdjęcia", "Projektowanie grafik", "Teksty reklamowe"] 
              },
              { 
                step: "03", 
                title: "Kampania", 
                icon: Target,
                color: "from-purple-500 to-violet-600",
                tasks: ["Uruchomienie reklam", "Bieżąca optymalizacja", "Testy grup"] 
              },
              { 
                step: "04", 
                title: "Raport", 
                icon: BarChart3,
                color: "from-emerald-500 to-teal-600",
                tasks: ["Analiza wyników", "Raport miesięczny", "Plan dalszy"] 
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 border border-zinc-700/50 rounded-2xl p-5 h-full backdrop-blur hover:border-zinc-600 transition-all">
                  {/* Step badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    {item.step}
                  </div>
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 mt-1 shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  
                  <ul className="space-y-2">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-400">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {i < 3 && (
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-pink-400/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="flex items-center justify-center gap-2 py-3 px-5 bg-pink-500/10 border border-pink-500/20 rounded-xl w-fit mx-auto">
          <Clock className="w-4 h-4 text-pink-400" />
          <span className="text-zinc-300 text-sm">Cykl powtarza się co miesiąc</span>
        </div>

        <Footer activeSlide={2} />
      </div>
    </div>
  );

  // Slide 4: Requirements
  const RequirementsSlide = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Requirements graphics */}
      <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[350px] h-[400px]">
        {/* Central checklist icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
          <FileText className="w-14 h-14 text-white" />
        </div>
        
        {/* Surrounding icons */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-500/40 flex items-center justify-center">
          <Users className="w-7 h-7 text-blue-400" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center">
          <Target className="w-7 h-7 text-emerald-400" />
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center">
          <Camera className="w-7 h-7 text-pink-400" />
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-violet-500/20 border border-purple-500/40 flex items-center justify-center">
          <Palette className="w-7 h-7 text-purple-400" />
        </div>

        {/* Time badge */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-gradient-to-r from-amber-600/25 to-orange-600/15 rounded-xl border border-amber-500/35 backdrop-blur-sm">
          <span className="text-amber-300 font-medium">⏱️ Max 30 min Twojego czasu</span>
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Co potrzebujemy na start" />

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[50%]">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Co <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">potrzebujemy</span>
            <br />od Ciebie?
          </h2>

          <p className="text-zinc-400 text-lg mb-8">
            Żeby współpraca ruszyła sprawnie, potrzebujemy kilku rzeczy na start.
          </p>

          {/* Requirements list */}
          <div className="space-y-3">
            {[
              { icon: Users, title: "Dostęp do Business Managera", desc: "Dodamy się jako partnerzy", color: "from-blue-500 to-cyan-600" },
              { icon: Camera, title: "Zdjęcia z salonu", desc: "10-15 zdjęć w wysokiej jakości", color: "from-pink-500 to-rose-600" },
              { icon: FileText, title: "Cennik usług", desc: "Aktualny cennik do reklam", color: "from-purple-500 to-violet-600" },
              { icon: Target, title: "Twoje cele", desc: "Ile klientek chcesz pozyskiwać?", color: "from-emerald-500 to-teal-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-zinc-900/90 to-zinc-900/60 rounded-xl border border-zinc-700/40 group hover:border-zinc-600 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">{item.title}</p>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer activeSlide={3} />
      </div>
    </div>
  );

  // Slide 5: Contact
  const ContactSlide = () => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-pink-500/15 via-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Kontakt i następne kroki" />

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500/15 to-fuchsia-500/10 rounded-full border border-pink-500/25 mb-8">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-pink-300 font-medium">Jesteśmy tu dla Ciebie!</span>
              <Heart className="w-5 h-5 text-fuchsia-400" />
            </div>

            <h2 className="text-5xl font-black text-white mb-4">
              Gotowi na <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">sukces</span>?
            </h2>

            <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Masz pytania? Napisz lub zadzwoń - odpowiemy błyskawicznie!
            </p>

            {/* Contact cards */}
            <div className="flex justify-center gap-6 mb-10">
              <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border border-green-500/20 shadow-xl min-w-[200px]">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <p className="text-zinc-400 text-sm mb-1">Telefon</p>
                <p className="text-white font-bold text-lg">{data.managerPhone || "+48 123 456 789"}</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border border-blue-500/20 shadow-xl min-w-[200px]">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <p className="text-zinc-400 text-sm mb-1">Email</p>
                <p className="text-white font-bold text-lg">{data.managerEmail || "kontakt@aurine.pl"}</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-900/80 rounded-2xl p-6 border border-pink-500/20 shadow-xl min-w-[200px]">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <p className="text-zinc-400 text-sm mb-1">Instagram</p>
                <p className="text-white font-bold text-lg">@aurine.pl</p>
              </div>
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-2xl shadow-xl shadow-pink-500/30">
              <Rocket className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Do dzieła! 🚀</span>
            </div>
          </div>
        </div>

        <Footer activeSlide={4} />
      </div>
    </div>
  );

  const slides = [
    <WelcomeSlide key="welcome" />,
    <TeamSlide key="team" />,
    <TimelineSlide key="timeline" />,
    <RequirementsSlide key="requirements" />,
    <ContactSlide key="contact" />,
  ];

  return (
    <div className="w-full h-full">
      {slides[currentSlide] || slides[0]}
    </div>
  );
};