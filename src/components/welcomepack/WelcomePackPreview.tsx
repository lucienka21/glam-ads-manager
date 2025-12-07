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

  // Slide 1: Welcome - Hero
  const WelcomeSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      
      {/* Large decorative circles */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-500/25 via-pink-500/15 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-fuchsia-500/10 to-transparent blur-3xl" />
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
              <img src={agencyLogo} alt="Aurine" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <p className="text-pink-400 font-bold text-lg tracking-wide">AURINE</p>
              <p className="text-zinc-500 text-xs tracking-widest uppercase">Agency</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 rounded-full backdrop-blur-sm">
              <span className="text-pink-300 text-sm font-medium">Welcome Pack</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-8">
              <Gift className="w-5 h-5 text-pink-400" />
              <span className="text-pink-300 font-semibold">Witamy w rodzinie Aurine!</span>
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
            </div>
            
            <h1 className="text-7xl font-black text-white mb-6 leading-[1.1]">
              Cześć, <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">{data.ownerName || "Droga Klientko"}</span>!
            </h1>
            
            <p className="text-3xl text-zinc-300 mb-4 font-light">
              Cieszymy się, że <span className="text-pink-400 font-semibold">{data.salonName || "Twój salon"}</span>
            </p>
            <p className="text-3xl text-zinc-300 mb-10 font-light">
              dołącza do naszych klientów 🎉
            </p>
            
            <p className="text-lg text-zinc-500 max-w-2xl leading-relaxed mb-10">
              Ten dokument to Twój przewodnik po współpracy z nami. Znajdziesz tu harmonogram, 
              kontakty i wszystko, co potrzebujesz na dobry start.
            </p>

            {data.startDate && (
              <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-zinc-900/90 to-zinc-800/70 border border-zinc-700/50 rounded-2xl backdrop-blur-sm shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-medium">Start współpracy</p>
                  <p className="text-white font-bold text-xl">{formatDate(data.startDate)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
            <span className="text-zinc-600 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === 0 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
            ))}
          </div>
          <span className="text-zinc-600 text-sm">1 / {totalSlides}</span>
        </div>
      </div>

      {/* Floating decorations */}
      <div className="absolute top-32 right-32 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center animate-pulse shadow-xl shadow-pink-500/20">
        <Rocket className="w-10 h-10 text-pink-400" />
      </div>
      <div className="absolute bottom-40 right-48 w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center shadow-xl">
        <Heart className="w-8 h-8 text-fuchsia-400" />
      </div>
      <div className="absolute top-48 right-64 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg">
        <Star className="w-6 h-6 text-amber-400" />
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-pink-400 font-bold">AURINE</p>
              <p className="text-zinc-500 text-xs">Harmonogram</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-white mb-3">
            Harmonogram <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">współpracy</span>
          </h2>
          <p className="text-zinc-400 text-xl">Pierwszy miesiąc razem krok po kroku</p>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-6">
            {[
              { 
                week: "Tydzień 1", 
                title: "Onboarding", 
                icon: Rocket,
                color: "from-blue-500 to-cyan-600",
                shadowColor: "shadow-blue-500/30",
                tasks: ["Analiza salonu", "Ustalenie celów", "Konfiguracja kont"] 
              },
              { 
                week: "Tydzień 2", 
                title: "Kreacje", 
                icon: Palette,
                color: "from-pink-500 to-rose-600",
                shadowColor: "shadow-pink-500/30",
                tasks: ["Sesja zdjęciowa", "Projektowanie grafik", "Teksty reklamowe"] 
              },
              { 
                week: "Tydzień 3", 
                title: "Start kampanii", 
                icon: Target,
                color: "from-purple-500 to-violet-600",
                shadowColor: "shadow-purple-500/30",
                tasks: ["Uruchomienie reklam", "Testy A/B", "Optymalizacja"] 
              },
              { 
                week: "Tydzień 4", 
                title: "Raport", 
                icon: BarChart3,
                color: "from-emerald-500 to-teal-600",
                shadowColor: "shadow-emerald-500/30",
                tasks: ["Analiza wyników", "Raport miesięczny", "Plan na kolejny miesiąc"] 
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-7 h-full backdrop-blur-sm hover:border-zinc-600/70 transition-all">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-xl ${item.shadowColor} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <p className="text-zinc-500 text-sm font-semibold mb-1 uppercase tracking-wider">{item.week}</p>
                  <h3 className="text-2xl font-bold text-white mb-5">{item.title}</h3>
                  
                  <ul className="space-y-3">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-pink-400" />
                        </div>
                        <span className="text-zinc-400">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {i < 3 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 hidden lg:block">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
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
