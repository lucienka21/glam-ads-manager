import { 
  Sparkles, Heart, Star, Calendar, Phone, Mail, 
  CheckCircle2, Clock, ArrowRight, Users, 
  FileText, Camera, Target, MessageCircle, 
  Flower2, Palette, Zap, Gift, Rocket,
  Headphones, Instagram, Facebook, Send,
  Award, Shield, TrendingUp, BarChart3,
  Briefcase, Settings, RefreshCcw, Eye, 
  LineChart, MessageSquare, Megaphone, BadgeCheck
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

// Calculate dates based on start date
const getWeekDates = (startDateStr: string) => {
  if (!startDateStr) return { week1: "", week2: "", week3: "", week4: "" };
  const start = new Date(startDateStr);
  
  const week1End = new Date(start);
  week1End.setDate(week1End.getDate() + 6);
  
  const week2Start = new Date(start);
  week2Start.setDate(week2Start.getDate() + 7);
  const week2End = new Date(week2Start);
  week2End.setDate(week2End.getDate() + 6);
  
  const week3Start = new Date(start);
  week3Start.setDate(week3Start.getDate() + 14);
  const week3End = new Date(week3Start);
  week3End.setDate(week3End.getDate() + 6);
  
  const week4Start = new Date(start);
  week4Start.setDate(week4Start.getDate() + 21);
  const week4End = new Date(week4Start);
  week4End.setDate(week4End.getDate() + 6);

  const formatRange = (s: Date, e: Date) => 
    `${s.getDate()}.${(s.getMonth()+1).toString().padStart(2,'0')} - ${e.getDate()}.${(e.getMonth()+1).toString().padStart(2,'0')}`;

  return {
    week1: formatRange(start, week1End),
    week2: formatRange(week2Start, week2End),
    week3: formatRange(week3Start, week3End),
    week4: formatRange(week4Start, week4End)
  };
};

export const WelcomePackPreview = ({ data, currentSlide }: WelcomePackPreviewProps) => {
  const totalSlides = 6;
  const weekDates = getWeekDates(data.startDate);

  // Header component
  const Header = ({ subtitle }: { subtitle?: string }) => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
        </div>
        <div>
          <p className="text-pink-400 font-bold tracking-wide">AURINE</p>
          <p className="text-zinc-500 text-xs">{subtitle || "Welcome Pack"}</p>
        </div>
      </div>
    </div>
  );

  // Footer component
  const Footer = ({ slideNumber }: { slideNumber: number }) => (
    <div className="flex items-center justify-between mt-auto pt-6">
      <span className="text-zinc-600 text-sm">aurine.pl</span>
      <div className="flex items-center gap-2">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === slideNumber - 1 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
        ))}
      </div>
      <span className="text-zinc-600 text-sm">{slideNumber} / {totalSlides}</span>
    </div>
  );

  // Slide 1: Welcome - Hero
  const WelcomeSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-500/25 via-pink-500/15 to-transparent blur-3xl" />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

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
          
          <div className="px-5 py-2.5 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 rounded-full backdrop-blur-sm">
            <span className="text-pink-300 text-sm font-medium">Welcome Pack</span>
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

        <Footer slideNumber={1} />
      </div>

      {/* Floating decorations */}
      <div className="absolute top-32 right-32 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center animate-pulse shadow-xl shadow-pink-500/20">
        <Rocket className="w-10 h-10 text-pink-400" />
      </div>
      <div className="absolute bottom-40 right-48 w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center shadow-xl">
        <Heart className="w-8 h-8 text-fuchsia-400" />
      </div>
    </div>
  );

  // Slide 2: Team & Manager
  const TeamSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        <Header subtitle="Twój zespół" />

        <div className="flex-1 grid grid-cols-2 gap-16">
          {/* Left - Manager */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-4">
              Twój <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">opiekun</span>
            </h2>
            <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
              Masz pytania? Potrzebujesz pomocy?<br />
              Twój dedykowany opiekun jest do dyspozycji.
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
            <h3 className="text-2xl font-bold text-white mb-8">Jak pracujemy</h3>
            
            <div className="space-y-4">
              {[
                { icon: Clock, title: "Pon-Pt, 9:00 - 17:00", desc: "Godziny pracy naszego zespołu", color: "from-blue-500 to-cyan-600" },
                { icon: MessageCircle, title: "Szybka odpowiedź", desc: "Odpowiadamy w ciągu 24h w dni robocze", color: "from-pink-500 to-rose-600" },
                { icon: Target, title: "100% fokus na wyniki", desc: "Twój sukces = nasz sukces", color: "from-purple-500 to-violet-600" },
                { icon: BarChart3, title: "Regularne raporty", desc: "Comiesięczne podsumowanie wyników", color: "from-amber-500 to-orange-600" },
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

        <Footer slideNumber={2} />
      </div>
    </div>
  );

  // Slide 3: Monthly Timeline - Onboarding
  const OnboardingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-pink-500/10 via-fuchsia-500/5 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        <Header subtitle="Pierwszy miesiąc" />

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-white mb-3">
            Harmonogram <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">pierwszego miesiąca</span>
          </h2>
          <p className="text-zinc-400 text-xl">Przygotowanie i start kampanii</p>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-4 gap-5">
            {[
              { 
                week: "Tydzień 1", 
                dates: weekDates.week1,
                title: "Onboarding", 
                icon: Briefcase,
                color: "from-blue-500 to-cyan-600",
                shadowColor: "shadow-blue-500/30",
                tasks: ["Analiza Twojego salonu", "Ustalenie celów kampanii", "Konfiguracja kont reklamowych"] 
              },
              { 
                week: "Tydzień 2", 
                dates: weekDates.week2,
                title: "Kreacje", 
                icon: Palette,
                color: "from-pink-500 to-rose-600",
                shadowColor: "shadow-pink-500/30",
                tasks: ["Projektowanie grafik", "Pisanie tekstów reklamowych", "Przygotowanie materiałów"] 
              },
              { 
                week: "Tydzień 3", 
                dates: weekDates.week3,
                title: "Start kampanii", 
                icon: Rocket,
                color: "from-purple-500 to-violet-600",
                shadowColor: "shadow-purple-500/30",
                tasks: ["Uruchomienie reklam", "Testy różnych grup", "Codzienna optymalizacja"] 
              },
              { 
                week: "Tydzień 4", 
                dates: weekDates.week4,
                title: "Analiza i skalowanie", 
                icon: LineChart,
                color: "from-emerald-500 to-teal-600",
                shadowColor: "shadow-emerald-500/30",
                tasks: ["Analiza pierwszych wyników", "Optymalizacja kampanii", "Przygotowanie raportu"] 
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-2xl p-6 h-full backdrop-blur-sm hover:border-zinc-600/70 transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-xl ${item.shadowColor} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <p className="text-zinc-500 text-xs font-semibold mb-1 uppercase tracking-wider">{item.week}</p>
                  {item.dates && <p className="text-pink-400/70 text-xs mb-2">{item.dates}</p>}
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  
                  <ul className="space-y-2">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-pink-400" />
                        </div>
                        <span className="text-zinc-400">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {i < 3 && (
                  <div className="absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500/50 to-fuchsia-500/50 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-full">
            <RefreshCcw className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-medium">Kampania działa ciągle - każdy miesiąc to nowe optymalizacje i wyniki</span>
          </div>
        </div>

        <Footer slideNumber={3} />
      </div>
    </div>
  );

  // Slide 4: Ongoing Workflow
  const OngoingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        <Header subtitle="Stała współpraca" />

        <div className="flex-1 grid grid-cols-2 gap-16">
          {/* Left - Monthly cycle */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-4">
              Jak wygląda <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">każdy miesiąc</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Po pierwszym miesiącu kampania działa w ciągłym cyklu optymalizacji i raportowania.
            </p>

            <div className="space-y-4">
              {[
                { icon: Eye, title: "Ciągły monitoring", desc: "Codziennie sprawdzamy wyniki i reagujemy", number: "01" },
                { icon: Settings, title: "Optymalizacja", desc: "Dostosowujemy reklamy dla lepszych wyników", number: "02" },
                { icon: Megaphone, title: "Nowe kreacje", desc: "Świeże grafiki i teksty co miesiąc", number: "03" },
                { icon: BarChart3, title: "Raport miesięczny", desc: "Pełne podsumowanie wyników i plan na kolejny miesiąc", number: "04" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-4 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-2xl border border-zinc-700/30 group hover:border-zinc-600/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
                    <span className="text-pink-400 font-bold text-lg">{item.number}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                  <item.icon className="w-6 h-6 text-zinc-600 group-hover:text-pink-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Right - What you get */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-10 backdrop-blur-sm shadow-2xl w-full max-w-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-pink-500/30">
                  <BadgeCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Co dostajesz</h3>
                  <p className="text-zinc-500">Każdego miesiąca</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Aktywna kampania Facebook Ads",
                  "Profesjonalne grafiki reklamowe",
                  "Targetowanie na Twoją okolicę",
                  "Optymalizacja pod rezerwacje",
                  "Dedykowany opiekun konta",
                  "Miesięczny raport z wynikami",
                  "Stałe testowanie nowych grup",
                  "Rekomendacje rozwoju"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer slideNumber={4} />
      </div>
    </div>
  );

  // Slide 5: Requirements
  const RequirementsSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        <Header subtitle="Potrzebujemy od Ciebie" />

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
                { icon: Users, title: "Dostęp do Business Managera", desc: "Lub pomożemy założyć nowe konto", color: "from-blue-500 to-cyan-600" },
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

        <Footer slideNumber={5} />
      </div>
    </div>
  );

  // Slide 6: Contact
  const ContactSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-rose-500/10 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-16">
        <Header subtitle="Kontakt" />

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
            
            <p className="text-xl text-zinc-400 mb-12">
              Nasz zespół jest do Twojej dyspozycji<br />
              <span className="text-pink-400 font-semibold">poniedziałek - piątek, 9:00 - 17:00</span>
            </p>

            <div className="flex justify-center gap-8 mb-12">
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

        <Footer slideNumber={6} />
      </div>
    </div>
  );

  const slides = [WelcomeSlide, TeamSlide, OnboardingSlide, OngoingSlide, RequirementsSlide, ContactSlide];
  const CurrentSlideComponent = slides[currentSlide - 1] || WelcomeSlide;

  return <CurrentSlideComponent />;
};
