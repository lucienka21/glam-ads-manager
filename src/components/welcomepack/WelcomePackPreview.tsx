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
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/25 via-fuchsia-500/15 to-transparent blur-3xl" />
      <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-500/20 via-pink-500/10 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
              <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <p className="text-pink-400 font-bold tracking-wide text-sm">AURINE</p>
              <p className="text-zinc-500 text-xs">Welcome Pack</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 rounded-full">
            <span className="text-pink-300 text-xs font-medium">Pakiet powitalny</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-6">
              <Gift className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300 font-medium text-sm">Witamy w Aurine!</span>
              <Sparkles className="w-3 h-3 text-fuchsia-400" />
            </div>
            
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">
              Cześć, <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">{data.ownerName || "Droga Klientko"}</span>!
            </h1>
            
            <p className="text-2xl text-zinc-300 mb-3 font-light">
              Cieszymy się, że <span className="text-pink-400 font-medium">{data.salonName || "Twój salon"}</span>
            </p>
            <p className="text-2xl text-zinc-300 mb-8 font-light">
              dołącza do naszych klientów
            </p>
            
            <p className="text-base text-zinc-500 max-w-xl leading-relaxed mb-8">
              Ten dokument to Twój przewodnik po współpracy z nami. Znajdziesz tu 
              informacje o zespole, procesie onboardingu i wszystko, czego potrzebujesz.
            </p>

            {data.startDate && (
              <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-zinc-900/90 to-zinc-800/70 border border-zinc-700/50 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-medium">Start współpracy</p>
                  <p className="text-white font-bold text-lg">{formatDate(data.startDate)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Decorations */}
        <div className="absolute top-28 right-24 w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center shadow-xl shadow-pink-500/20">
          <Rocket className="w-8 h-8 text-pink-400" />
        </div>
        <div className="absolute bottom-32 right-36 w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 border border-fuchsia-500/40 flex items-center justify-center">
          <Heart className="w-6 h-6 text-fuchsia-400" />
        </div>

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

  // Slide 3: Onboarding - Co robimy na start
  const OnboardingSlide = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl" />

      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-pink-400 font-bold text-sm">AURINE</p>
            <p className="text-zinc-500 text-xs">Onboarding</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Co robimy <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">na start</span>
          </h2>
          <p className="text-zinc-400">Pierwsze kroki naszej współpracy</p>
        </div>

        {/* Steps */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {[
            { 
              step: "1", 
              title: "Konfiguracja kont", 
              icon: Settings,
              color: "from-blue-500 to-cyan-600",
              tasks: [
                "Dostęp do Business Managera",
                "Konfiguracja konta reklamowego",
                "Połączenie z Facebookiem i Instagramem",
                "Instalacja piksela na stronie (jeśli jest)"
              ] 
            },
            { 
              step: "2", 
              title: "Analiza salonu", 
              icon: Eye,
              color: "from-pink-500 to-rose-600",
              tasks: [
                "Poznajemy Twoje usługi i specjalizację",
                "Analizujemy konkurencję w okolicy",
                "Określamy grupę docelową",
                "Ustalamy cele kampanii"
              ] 
            },
            { 
              step: "3", 
              title: "Przygotowanie kampanii", 
              icon: Palette,
              color: "from-purple-500 to-violet-600",
              tasks: [
                "Projektowanie grafik reklamowych",
                "Pisanie tekstów reklamowych",
                "Konfiguracja targetowania",
                "Uruchomienie pierwszych reklam"
              ] 
            },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/80 border border-zinc-700/50 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-medium">Krok {item.step}</p>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
              </div>
              
              <ul className="space-y-2.5 flex-1">
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
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
            <Rocket className="w-5 h-5 text-blue-400" />
            <span className="text-zinc-300 text-sm">Cały proces onboardingu trwa zazwyczaj <span className="text-blue-400 font-semibold">3-5 dni roboczych</span></span>
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
