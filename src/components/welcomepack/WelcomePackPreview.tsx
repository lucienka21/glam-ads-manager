import { 
  Heart, Calendar, Phone, Mail, 
  CheckCircle2, Users, Rocket,
  Settings, Camera, FileText, Clock,
  Instagram, Facebook, ArrowRight
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
          <div key={i} className={`h-1 rounded-full transition-all ${i === slideNumber - 1 ? 'w-6 bg-pink-500' : 'w-1.5 bg-zinc-700'}`} />
        ))}
      </div>
      <span className="text-zinc-500 text-xs">{slideNumber}/{totalSlides}</span>
    </div>
  );

  // ==================== SLAJD 1: POWITANIE ====================
  const WelcomeSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-[100px]" />

      <div className="relative h-full flex flex-col p-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold text-sm tracking-wider">AURINE</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-pink-300 text-xs font-medium">WELCOME PACK</span>
          </div>

          <h1 className="text-5xl font-black text-white mb-4">
            Witaj w rodzinie <span className="text-pink-400">Aurine</span>!
          </h1>

          <p className="text-xl text-zinc-400 mb-8">
            {data.ownerName || "Droga Klientko"}, cieszymy się że <span className="text-white font-medium">{data.salonName || "Twój salon"}</span> dołącza do nas
          </p>

          {data.startDate && (
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-pink-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Start współpracy</p>
                <p className="text-white font-bold text-lg">{formatDate(data.startDate)}</p>
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
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          <span className="text-pink-400 font-bold text-xs tracking-wider">AURINE</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-black text-white text-center mb-2">
            Twój <span className="text-pink-400">opiekun</span>
          </h2>
          <p className="text-zinc-400 text-center mb-10">Masz pytania? Potrzebujesz pomocy? Dzwoń śmiało!</p>

          {/* Manager card */}
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{data.managerName || "Account Manager"}</h3>
                <p className="text-pink-400 text-sm">Account Manager</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Telefon</p>
                  <p className="text-white font-medium">{data.managerPhone || "+48 123 456 789"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">Email</p>
                  <p className="text-white font-medium">{data.managerEmail || "kontakt@aurine.pl"}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-zinc-500 text-sm mt-6">Dostępni pon-pt, 9:00-17:00</p>
        </div>

        <Footer slideNumber={2} />
      </div>
    </div>
  );

  // ==================== SLAJD 3: PIERWSZE DNI ====================
  const OnboardingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          <span className="text-pink-400 font-bold text-xs tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white">
            Pierwsze <span className="text-pink-400">dni</span> współpracy
          </h2>
          <p className="text-zinc-400 mt-2">Co się będzie działo w pierwszym tygodniu</p>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="grid grid-cols-4 gap-4 relative">
              {/* Connection line */}
              <div className="absolute top-7 left-[12%] right-[12%] h-0.5 bg-zinc-800" />
              
              {[
                { day: "Dzień 1", title: "Dostępy", icon: Settings, desc: "Konfiguracja Business Manager" },
                { day: "Dzień 2-3", title: "Analiza", icon: FileText, desc: "Poznajemy Twój salon" },
                { day: "Dzień 3-4", title: "Kreacje", icon: Camera, desc: "Przygotowujemy reklamy" },
                { day: "Dzień 5", title: "Start!", icon: Rocket, desc: "Uruchamiamy kampanie" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${
                    i === 3 ? 'bg-pink-500' : 'bg-zinc-800 border border-zinc-700'
                  }`}>
                    <step.icon className={`w-7 h-7 ${i === 3 ? 'text-white' : 'text-zinc-400'}`} />
                  </div>
                  <span className="text-xs text-zinc-500 mb-1">{step.day}</span>
                  <h3 className="text-white font-bold mb-1">{step.title}</h3>
                  <p className="text-zinc-500 text-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">Po 5 dniach Twoje reklamy już działają!</span>
          </div>
        </div>

        <Footer slideNumber={3} />
      </div>
    </div>
  );

  // ==================== SLAJD 4: CO DALEJ (STAŁA WSPÓŁPRACA) ====================
  const OngoingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-[100px]" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          <span className="text-pink-400 font-bold text-xs tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white">
            Jak wygląda <span className="text-pink-400">współpraca</span>
          </h2>
          <p className="text-zinc-400 mt-2">Co robimy dla Ciebie każdego miesiąca</p>
        </div>

        {/* Monthly cycle */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {[
              { icon: Settings, title: "Codzienna optymalizacja", desc: "Codziennie sprawdzamy i optymalizujemy Twoje kampanie" },
              { icon: Camera, title: "Nowe kreacje", desc: "Regularnie tworzymy świeże grafiki i teksty reklam" },
              { icon: FileText, title: "Raport miesięczny", desc: "Co miesiąc dostajesz szczegółowy raport z wynikami" },
              { icon: Phone, title: "Konsultacje", desc: "Omawiamy wyniki i planujemy kolejne działania" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-sm">Kampanie działają non-stop przez cały okres współpracy</span>
          </div>
        </div>

        <Footer slideNumber={4} />
      </div>
    </div>
  );

  // ==================== SLAJD 5: POTRZEBUJEMY OD CIEBIE (CHECKLISTA) ====================
  const RequirementsSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          <span className="text-pink-400 font-bold text-xs tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white">
            Potrzebujemy od <span className="text-pink-400">Ciebie</span>
          </h2>
          <p className="text-zinc-400 mt-2">Żebyśmy mogli zacząć, potrzebujemy kilku rzeczy</p>
        </div>

        {/* Checklist */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg space-y-3">
            {[
              { title: "Dostęp do Business Managera", desc: "Dodamy Cię do naszego lub założymy nowy" },
              { title: "Zdjęcia z salonu", desc: "Zdjęcia efektów, wnętrza, zabiegów" },
              { title: "Cennik usług", desc: "Lista usług z cenami do promocji" },
              { title: "Dostęp do Instagrama", desc: "Żebyśmy mogli tworzyć reklamy" },
              { title: "Dane do faktury", desc: "NIP i dane firmy" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl group hover:border-pink-500/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-sm group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-pink-400 transition-colors" />
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
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-pink-500/10 blur-[100px]" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          <span className="text-pink-400 font-bold text-xs tracking-wider">AURINE</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-black text-white mb-2">
            Jesteśmy do <span className="text-pink-400">dyspozycji</span>!
          </h2>
          <p className="text-zinc-400 mb-10">Masz pytania? Napisz lub zadzwoń</p>

          {/* Contact grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
            <a href="tel:+48123456789" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-green-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Telefon</p>
                <p className="text-white font-medium">{data.managerPhone || "+48 123 456 789"}</p>
              </div>
            </a>

            <a href="mailto:kontakt@aurine.pl" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Email</p>
                <p className="text-white font-medium">{data.managerEmail || "kontakt@aurine.pl"}</p>
              </div>
            </a>

            <a href="https://instagram.com/aurine.pl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-pink-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Instagram</p>
                <p className="text-white font-medium">@aurine.pl</p>
              </div>
            </a>

            <a href="https://facebook.com/aurine.pl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Facebook className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Facebook</p>
                <p className="text-white font-medium">Aurine</p>
              </div>
            </a>
          </div>

          {/* Hours */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-sm">Dostępni pon-pt, 9:00-17:00</span>
          </div>

          {/* Thank you */}
          <div className="mt-8">
            <p className="text-2xl font-bold text-white">Dziękujemy za zaufanie! 💜</p>
          </div>
        </div>

        <Footer slideNumber={6} />
      </div>
    </div>
  );

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
    <div className="w-full h-full bg-zinc-950 text-white overflow-hidden">
      {renderSlide()}
    </div>
  );
};
