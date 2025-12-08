import { 
  Sparkles, Heart, Calendar, Phone, Mail, 
  CheckCircle2, Users, Gift, Rocket,
  Instagram, Facebook, Settings, Eye,
  MessageSquare, Palette, BarChart3, FileCheck
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
    <div className="flex items-center justify-between mt-auto pt-6">
      <div className="flex items-center gap-3">
        <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-50" />
        <span className="text-zinc-600 text-sm">aurine.pl</span>
      </div>
      <div className="flex items-center gap-2">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === slideNumber - 1 ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-1.5 bg-zinc-700/50'}`} />
        ))}
      </div>
      <span className="text-zinc-600 text-sm">{slideNumber} / {totalSlides}</span>
    </div>
  );

  // Slide 1: Welcome - Powitanie
  const WelcomeSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background with beautiful gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Large decorative circles */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />
      <div className="absolute -bottom-48 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-500/15 to-transparent blur-3xl" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative h-full flex flex-col p-10">
        {/* Minimal header with logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            <span className="text-pink-400 font-bold tracking-widest text-sm">AURINE</span>
          </div>
        </div>

        {/* Main content - centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-3xl">
            {/* Welcome badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300 text-sm font-medium tracking-wide">WELCOME PACK</span>
            </div>
            
            {/* Main greeting */}
            <h1 className="text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Witaj w <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Aurine</span>,
              <br />
              <span className="text-5xl">{data.ownerName || "Droga Klientko"}!</span>
            </h1>
            
            {/* Salon name highlight */}
            <div className="mb-8">
              <p className="text-xl text-zinc-400 mb-2">Cieszymy się, że</p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-2xl">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-2xl font-bold text-white">{data.salonName || "Twój salon"}</span>
                <span className="text-xl text-zinc-400">dołącza do nas</span>
              </div>
            </div>

            {/* Start date */}
            {data.startDate && (
              <div className="inline-flex items-center gap-4 px-8 py-5 bg-zinc-900/80 border border-zinc-700/50 rounded-2xl backdrop-blur-sm">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-zinc-500 text-sm">Start współpracy</p>
                  <p className="text-white font-bold text-2xl">{formatDate(data.startDate)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-16 w-3 h-3 rounded-full bg-pink-500/60" />
        <div className="absolute top-1/3 right-32 w-2 h-2 rounded-full bg-fuchsia-500/40" />
        <div className="absolute bottom-1/3 left-20 w-4 h-4 rounded-full bg-rose-500/30" />
        <div className="absolute bottom-1/4 left-40 w-2 h-2 rounded-full bg-pink-500/50" />

        <Footer slideNumber={1} />
      </div>
    </div>
  );

  // Slide 2: Team - Twój opiekun
  const TeamSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-pink-400 font-bold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Twój zespół</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-12">
          {/* Left - Manager info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white mb-3">
              Twój <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">opiekun</span>
            </h2>
            <p className="text-zinc-400 mb-8 text-base leading-relaxed">
              Masz pytania? Potrzebujesz pomocy?<br />
              Twój dedykowany opiekun jest zawsze do dyspozycji.
            </p>

            <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-pink-500/30">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{data.managerName || "Twój opiekun"}</h3>
                  <p className="text-pink-400 font-medium">Account Manager</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-xl border border-green-500/20">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Telefon</p>
                    <p className="text-white font-bold">{data.managerPhone || "+48 123 456 789"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded-xl border border-blue-500/20">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Email</p>
                    <p className="text-white font-bold">{data.managerEmail || "kontakt@aurine.pl"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Team values */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-6">Nasz zespół</h3>
            
            <div className="space-y-4">
              {[
                { icon: Heart, title: "Pasja do beauty", desc: "Specjalizujemy się wyłącznie w branży beauty", color: "from-pink-500 to-rose-600" },
                { icon: BarChart3, title: "Fokus na wyniki", desc: "Twój sukces to nasz sukces", color: "from-purple-500 to-violet-600" },
                { icon: MessageSquare, title: "Stały kontakt", desc: "Jesteśmy dostępni gdy nas potrzebujesz", color: "from-blue-500 to-cyan-600" },
                { icon: FileCheck, title: "Regularne raporty", desc: "Comiesięczne podsumowanie wyników", color: "from-amber-500 to-orange-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-xl border border-zinc-700/30">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
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

  // Slide 3: Onboarding - Pierwsze dni współpracy
  const OnboardingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
          <span className="text-pink-400 font-bold tracking-widest text-xs">AURINE</span>
        </div>

        {/* Title section */}
        <div className="text-center mb-10">
          <p className="text-pink-400 text-sm font-medium tracking-widest mb-2">PIERWSZE DNI</p>
          <h2 className="text-5xl font-black text-white">
            Jak <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">zaczynamy</span>
          </h2>
        </div>

        {/* Timeline steps */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            {/* Connection line */}
            <div className="relative">
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 opacity-30" />
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { 
                    day: "Dzień 1-2", 
                    title: "Dostępy", 
                    icon: Settings,
                    color: "from-blue-500 to-cyan-500",
                    desc: "Konfigurujemy Business Manager i konta reklamowe"
                  },
                  { 
                    day: "Dzień 2-3", 
                    title: "Analiza", 
                    icon: Eye,
                    color: "from-pink-500 to-rose-500",
                    desc: "Poznajemy Twój salon, usługi i konkurencję"
                  },
                  { 
                    day: "Dzień 3-4", 
                    title: "Kreacje", 
                    icon: Palette,
                    color: "from-purple-500 to-violet-500",
                    desc: "Tworzymy grafiki i teksty reklamowe"
                  },
                  { 
                    day: "Dzień 5", 
                    title: "Start!", 
                    icon: Rocket,
                    color: "from-emerald-500 to-teal-500",
                    desc: "Uruchamiamy pierwsze kampanie reklamowe"
                  },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    {/* Icon circle */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl mb-4 relative z-10`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Day label */}
                    <div className="px-3 py-1 bg-zinc-800/80 rounded-full mb-3">
                      <span className="text-xs font-medium text-zinc-400">{item.day}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    
                    {/* Description */}
                    <p className="text-sm text-zinc-500 leading-relaxed px-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-zinc-300 text-sm">Po 5 dniach Twoje reklamy już pracują!</span>
          </div>
        </div>

        <Footer slideNumber={3} />
      </div>
    </div>
  );

  // Slide 4: Ongoing - Ciągła obsługa
  const OngoingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-pink-400 font-bold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Ciągła obsługa</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Jak <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">pracujemy</span> na co dzień
          </h2>
          <p className="text-zinc-400">Kampanie działają przez cały okres współpracy</p>
        </div>

        {/* Content */}
        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Left - What we do */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Co robimy każdego miesiąca</h3>
            
            {[
              { icon: Eye, title: "Codzienna optymalizacja", desc: "Monitorujemy i optymalizujemy Twoje kampanie codziennie", color: "from-blue-500 to-cyan-600" },
              { icon: Palette, title: "Nowe kreacje", desc: "Regularnie tworzymy nowe grafiki i teksty reklamowe", color: "from-pink-500 to-rose-600" },
              { icon: BarChart3, title: "Raport miesięczny", desc: "Otrzymujesz szczegółowy raport z wynikami kampanii", color: "from-purple-500 to-violet-600" },
              { icon: MessageSquare, title: "Konsultacje", desc: "Omawiamy wyniki i planujemy kolejne działania", color: "from-amber-500 to-orange-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 rounded-xl border border-zinc-700/30">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Important info */}
          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Ważne informacje</h3>
              </div>

              <ul className="space-y-3">
                {[
                  "Kampanie działają non-stop przez cały okres umowy",
                  "Optymalizujemy reklamy na bieżąco",
                  "Budżet reklamowy opłacasz bezpośrednio do Facebooka",
                  "Raport otrzymujesz do 5. dnia każdego miesiąca",
                  "W każdej chwili możesz się z nami skontaktować"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Footer slideNumber={4} />
      </div>
    </div>
  );

  // Slide 5: Requirements - Co potrzebujemy od Ciebie
  const RequirementsSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-pink-400 font-bold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Wymagania</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Co <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">potrzebujemy</span> od Ciebie
          </h2>
          <p className="text-zinc-400">Kilka rzeczy, które pomogą nam zacząć</p>
        </div>

        {/* Requirements grid */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {[
            { 
              icon: Facebook, 
              title: "Dostęp do Business Managera", 
              desc: "Potrzebujemy uprawnień do zarządzania Twoim kontem reklamowym. Poprosimy Cię o dodanie nas jako partnera.",
              color: "from-blue-500 to-blue-600"
            },
            { 
              icon: Instagram, 
              title: "Zdjęcia z salonu", 
              desc: "Zdjęcia wnętrza, efektów zabiegów, zespołu. Wykorzystamy je w reklamach - autentyczne zdjęcia działają najlepiej!",
              color: "from-pink-500 to-rose-600"
            },
            { 
              icon: FileCheck, 
              title: "Cennik usług", 
              desc: "Lista usług z cenami, żebyśmy wiedzieli co i jak promować. Możemy też pomóc dobrać najlepsze oferty.",
              color: "from-purple-500 to-violet-600"
            },
            { 
              icon: MessageSquare, 
              title: "15-20 minut na start", 
              desc: "Krótka rozmowa, podczas której poznamy Twój salon, cele i oczekiwania. Potem zajmiemy się wszystkim!",
              color: "from-emerald-500 to-teal-600"
            },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-2xl p-6 flex items-start gap-5">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-zinc-300 text-sm">Pomożemy Ci z każdym krokiem - nie martw się, jeśli czegoś nie masz!</span>
          </div>
        </div>

        <Footer slideNumber={5} />
      </div>
    </div>
  );

  // Slide 6: Contact - Kontakt
  const ContactSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent blur-3xl" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-pink-400 font-bold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Kontakt</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-pink-500/30">
              <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-3">
              Jesteśmy <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">do dyspozycji</span>
            </h2>
            <p className="text-zinc-400 mb-10 text-lg">Masz pytania? Skontaktuj się z nami</p>

            {/* Contact cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <p className="text-zinc-500 text-xs mb-1">Telefon</p>
                <p className="text-white font-bold">{data.managerPhone || "+48 123 456 789"}</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <p className="text-zinc-500 text-xs mb-1">Email</p>
                <p className="text-white font-bold">{data.managerEmail || "kontakt@aurine.pl"}</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <p className="text-zinc-500 text-xs mb-1">Instagram</p>
                <p className="text-white font-bold">@aurine.pl</p>
              </div>
            </div>

            {/* Working hours */}
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-500/30 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-zinc-500 text-xs">Godziny pracy</p>
                <p className="text-white font-bold">Poniedziałek - Piątek, 9:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thank you note */}
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-white mb-2">
            Dziękujemy za zaufanie! <span className="text-pink-400">💖</span>
          </p>
          <p className="text-zinc-500">Nie możemy się doczekać, aż zaczniemy razem pracować</p>
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
    <div className="w-full h-full bg-zinc-950">
      {renderSlide()}
    </div>
  );
};
