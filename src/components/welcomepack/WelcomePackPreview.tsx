import { 
  Sparkles, Heart, Star, Calendar, Phone, Mail, 
  CheckCircle2, Clock, ArrowRight, Users, 
  FileText, Camera, Target, MessageCircle, 
  Flower2, Palette, Zap, Gift, Rocket,
  CalendarDays, ListChecks, Headphones
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

  const Header = ({ subtitle }: { subtitle: string }) => (
    <div className="flex items-center justify-between mb-6">
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
      </div>
    </div>
  );

  const Footer = ({ activeSlide }: { activeSlide: number }) => (
    <div className="flex items-center justify-between mt-auto pt-6">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-60" />
        <span className="text-zinc-600 text-xs">aurine.pl</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-zinc-700/50'}`} />
        ))}
      </div>
      <span className="text-zinc-600 text-xs">Welcome Pack</span>
    </div>
  );

  // Slide 1: Welcome
  const WelcomeSlide = () => (
    <div className="w-full h-full bg-black p-12 flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-fuchsia-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <Header subtitle="Welcome Pack" />

      <div className="flex-1 flex items-center justify-center relative">
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-8">
            <Gift className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 font-medium">Witamy w rodzinie Aurine!</span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
            Cześć, <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">{data.ownerName || "Droga Klientko"}</span>! 👋
          </h1>
          
          <p className="text-2xl text-zinc-300 mb-6">
            Cieszymy się, że <span className="text-pink-400 font-semibold">{data.salonName || "Twój salon"}</span> jest z nami!
          </p>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
            Ten dokument to Twój przewodnik po współpracy z Aurine. Znajdziesz tu harmonogram, 
            kontakty i wszystko, czego potrzebujesz na dobry start.
          </p>

          {data.startDate && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900/80 border border-zinc-700 rounded-2xl">
              <Calendar className="w-6 h-6 text-pink-400" />
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Start współpracy</p>
                <p className="text-white font-semibold">{formatDate(data.startDate)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Floating decorations */}
        <div className="absolute top-32 right-24 w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center animate-pulse">
          <Rocket className="w-8 h-8 text-pink-400" />
        </div>
        <div className="absolute bottom-32 left-24 w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-fuchsia-400" />
        </div>
      </div>

      <Footer activeSlide={0} />
    </div>
  );

  // Slide 2: Team
  const TeamSlide = () => (
    <div className="w-full h-full bg-black p-12 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <Header subtitle="Nasz zespół" />

      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-2 gap-12 w-full">
          {/* Left - Main contact */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Twój <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">opiekun</span>
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Masz pytania? Potrzebujesz pomocy? Twój dedykowany opiekun jest zawsze do dyspozycji.
            </p>

            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-700/50 rounded-3xl p-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-pink-500/20">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{data.managerName || "Twój opiekun"}</h3>
                  <p className="text-pink-400 font-medium">Account Manager</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/30">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Telefon</p>
                    <p className="text-white font-semibold text-lg">{data.managerPhone || "+48 123 456 789"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/30">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Email</p>
                    <p className="text-white font-semibold text-lg">{data.managerEmail || "kontakt@aurine.pl"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Team values */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">Co nas wyróżnia</h3>
            
            <div className="space-y-4">
              {[
                { icon: Headphones, title: "Wsparcie 7 dni", desc: "Odpowiadamy szybko i skutecznie", color: "from-blue-500 to-cyan-500" },
                { icon: Target, title: "Fokus na wyniki", desc: "Twój sukces = nasz sukces", color: "from-pink-500 to-rose-500" },
                { icon: MessageCircle, title: "Stały kontakt", desc: "Regularne raporty i updates", color: "from-purple-500 to-violet-500" },
                { icon: Zap, title: "Szybka reakcja", desc: "Elastyczne dostosowanie strategii", color: "from-amber-500 to-orange-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900/60 rounded-xl border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer activeSlide={1} />
    </div>
  );

  // Slide 3: Timeline
  const TimelineSlide = () => (
    <div className="w-full h-full bg-black p-12 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <Header subtitle="Harmonogram współpracy" />

      <div className="flex-1 flex items-center">
        <div className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              Harmonogram <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">współpracy</span>
            </h2>
            <p className="text-zinc-400 text-lg">Tak będzie wyglądał nasz pierwszy miesiąc razem</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { 
                week: "Tydzień 1", 
                title: "Onboarding", 
                icon: Rocket,
                color: "from-blue-500 to-cyan-500",
                tasks: ["Analiza salonu", "Ustalenie celów", "Przygotowanie kont"] 
              },
              { 
                week: "Tydzień 2", 
                title: "Kreacje", 
                icon: Palette,
                color: "from-pink-500 to-rose-500",
                tasks: ["Sesja zdjęciowa", "Projektowanie grafik", "Teksty reklamowe"] 
              },
              { 
                week: "Tydzień 3", 
                title: "Kampanie", 
                icon: Target,
                color: "from-purple-500 to-violet-500",
                tasks: ["Uruchomienie reklam", "Testy A/B", "Optymalizacja"] 
              },
              { 
                week: "Tydzień 4", 
                title: "Raport", 
                icon: FileText,
                color: "from-emerald-500 to-teal-500",
                tasks: ["Analiza wyników", "Raport miesięczny", "Planowanie dalszych działań"] 
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <p className="text-zinc-500 text-sm font-medium mb-1">{item.week}</p>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  
                  <ul className="space-y-2">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {i < 3 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-zinc-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer activeSlide={2} />
    </div>
  );

  // Slide 4: Requirements
  const RequirementsSlide = () => (
    <div className="w-full h-full bg-black p-12 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-500/15 to-transparent rounded-full blur-3xl" />
      </div>

      <Header subtitle="Co potrzebujemy" />

      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-2 gap-12 w-full">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Co <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">potrzebujemy</span> od Ciebie?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Żeby współpraca przebiegała sprawnie, potrzebujemy kilku rzeczy na start.
            </p>

            <div className="space-y-4">
              {[
                { icon: Users, title: "Dostęp do Business Managera", desc: "Dodamy się jako partnerzy do Twojego konta", color: "from-blue-500 to-cyan-500" },
                { icon: Camera, title: "Zdjęcia z salonu", desc: "Najlepiej 10-15 zdjęć w wysokiej jakości", color: "from-pink-500 to-rose-500" },
                { icon: FileText, title: "Cennik usług", desc: "Aktualny cennik do wykorzystania w reklamach", color: "from-purple-500 to-violet-500" },
                { icon: Target, title: "Twoje cele", desc: "Ile klientek miesięcznie chcesz pozyskiwać?", color: "from-emerald-500 to-teal-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900/60 rounded-xl border border-zinc-700/30">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center mb-6 shadow-xl shadow-pink-500/20">
                  <ListChecks className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Checklista</h3>
                <p className="text-zinc-400 mb-6">Wyślemy Ci szczegółową checklistę mailem</p>
                <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full">
                  <Clock className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-300 text-sm font-medium">Max 30 min Twojego czasu</span>
                </div>
              </div>

              {/* Floating decorations */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer activeSlide={3} />
    </div>
  );

  // Slide 5: Contact
  const ContactSlide = () => (
    <div className="w-full h-full bg-black p-12 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-pink-500/15 to-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <Header subtitle="Kontakt" />

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 font-medium">Jesteśmy tu dla Ciebie!</span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6">
            Masz pytania? <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">Napisz lub zadzwoń!</span>
          </h2>
          
          <p className="text-xl text-zinc-400 mb-10">
            Nasz zespół jest do Twojej dyspozycji od poniedziałku do piątku, 9:00-17:00
          </p>

          <div className="flex justify-center gap-6 mb-10">
            <div className="flex items-center gap-4 px-8 py-5 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-700/50 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-sm">Zadzwoń</p>
                <p className="text-white font-bold text-xl">{data.managerPhone || "+48 123 456 789"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-8 py-5 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-700/50 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-sm">Napisz</p>
                <p className="text-white font-bold text-xl">{data.managerEmail || "kontakt@aurine.pl"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            <div className="text-left">
              <p className="text-white font-bold">Aurine Agency</p>
              <p className="text-zinc-500 text-sm">Marketing dla branży beauty</p>
            </div>
          </div>
        </div>
      </div>

      <Footer activeSlide={4} />
    </div>
  );

  const slides = [WelcomeSlide, TeamSlide, TimelineSlide, RequirementsSlide, ContactSlide];
  const CurrentSlideComponent = slides[currentSlide - 1] || WelcomeSlide;

  return <CurrentSlideComponent />;
};
