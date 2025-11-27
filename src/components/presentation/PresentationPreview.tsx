import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  AlertTriangle, Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Shield, Zap,
  Award, Clock, PieChart, Rocket
} from "lucide-react";

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
  const slides = [
    // Slide 1: Cover
    <div key="1" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 text-center space-y-8 px-16 animate-fade-in">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-pink-500/30 animate-scale-in">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-4">
          <p className="text-pink-400 text-lg tracking-[0.3em] uppercase font-light">Aurine Agency prezentuje</p>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Skuteczne Kampanie<br />
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">Facebook Ads</span>
          </h1>
          <p className="text-2xl text-zinc-400">dla Twojego salonu beauty</p>
        </div>

        <div className="pt-8 space-y-2">
          <p className="text-3xl font-bold text-white">{data.salonName || "Twój Salon"}</p>
          <p className="text-xl text-zinc-500">{data.city || "Polska"}</p>
        </div>

        <div className="pt-4">
          <p className="text-pink-300">Przygotowane dla: <span className="font-semibold text-white">{data.ownerName || "Właściciela"}</span></p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-600">
        <span className="text-sm">aurine.pl</span>
      </div>
    </div>,

    // Slide 2: Problem
    <div key="2" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col p-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-amber-400 text-sm tracking-wider uppercase">Problem</p>
            <h2 className="text-4xl font-bold text-white">Najczęstsze błędy salonów beauty</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
          {[
            { icon: Target, title: "Brak precyzyjnego targetowania", desc: "Reklamy docierają do osób, które nigdy nie odwiedzą salonu" },
            { icon: PieChart, title: "Nieefektywne wydawanie budżetu", desc: "Pieniądze idą na reklamy bez konwersji i zwrotu" },
            { icon: BarChart3, title: "Brak analizy wyników", desc: "Bez danych nie wiesz co działa, a co nie" },
            { icon: Clock, title: "Nieregularne działania", desc: "Kampanie od czasu do czasu zamiast ciągłej obecności" },
            { icon: Users, title: "Złe kreacje reklamowe", desc: "Zdjęcia z telefonu zamiast profesjonalnych materiałów" },
            { icon: MessageCircle, title: "Brak śledzenia konwersji", desc: "Nie wiesz ile rezerwacji pochodzi z reklam" },
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                  <item.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 3: Why Facebook Ads
    <div key="3" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col p-16 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-blue-400 text-sm tracking-wider uppercase">Dlaczego Facebook Ads?</p>
            <h2 className="text-4xl font-bold text-white">Potęga precyzyjnego targetowania</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { value: "3.5M", label: "Polskich kobiet 25-55", sublabel: "aktywnych na Facebooku dziennie" },
            { value: "73%", label: "Kobiet szuka usług", sublabel: "beauty w social media" },
            { value: "2.5x", label: "Wyższy ROI", sublabel: "vs tradycyjna reklama" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-500/20 rounded-2xl p-6 text-center">
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{stat.value}</p>
              <p className="text-white font-medium">{stat.label}</p>
              <p className="text-sm text-zinc-500">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Precyzyjne dotarcie", desc: "Reklamy tylko dla kobiet w Twoim mieście, zainteresowanych beauty" },
            { icon: BarChart3, title: "Mierzalne wyniki", desc: "Dokładnie wiesz ile kosztuje Cię pozyskanie jednej klientki" },
            { icon: Zap, title: "Szybkie efekty", desc: "Pierwsze rezerwacje nawet w pierwszym tygodniu kampanii" },
            { icon: Shield, title: "Kontrola budżetu", desc: "Ty decydujesz ile wydajesz dziennie i możesz to zmienić w każdej chwili" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-zinc-900/30 rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 4: What we provide
    <div key="4" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col p-16 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-pink-400 text-sm tracking-wider uppercase">Co zapewniamy</p>
            <h2 className="text-4xl font-bold text-white">Pełna obsługa Twoich kampanii</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="space-y-4">
            {[
              "Strategia kampanii dopasowana do Twojego salonu",
              "Profesjonalne kreacje reklamowe",
              "Konfiguracja piksela i śledzenia konwersji",
              "Targetowanie idealnych klientek",
              "Codzienne monitorowanie wyników",
              "Optymalizacja i testy A/B",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-pink-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-medium">{item}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {[
              "Comiesięczne raporty z wyników",
              "Remarketing dla niezdecydowanych",
              "Kampanie sezonowe i promocyjne",
              "Obsługa budżetu reklamowego",
              "Stały kontakt i konsultacje",
              "Rekomendacje rozwoju",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-pink-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,

    // Slide 5: Case Study / Results
    <div key="5" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col p-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-emerald-400 text-sm tracking-wider uppercase">Case Study</p>
            <h2 className="text-4xl font-bold text-white">Realne wyniki naszych klientów</h2>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-zinc-500 text-sm">Przykładowy salon beauty</p>
              <p className="text-2xl font-bold text-white">Wzrost rezerwacji o 340%</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold">3 miesiące współpracy</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "Zasięg miesięczny", before: "2,000", after: "85,000" },
              { label: "Kliknięcia", before: "50", after: "3,500" },
              { label: "Rezerwacje", before: "5", after: "178" },
              { label: "Koszt/rezerwacja", before: "—", after: "28 PLN" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs text-zinc-500 mb-2">{stat.label}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-zinc-600 line-through text-sm">{stat.before}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-2xl font-bold text-emerald-400">{stat.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-950/30 to-zinc-900/50 border border-pink-800/30 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm mb-4">Fragment raportu z naszego systemu:</p>
          <div className="bg-black/50 rounded-xl p-4 border border-zinc-800">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase">Wyświetlenia</p>
                <p className="text-lg font-bold text-white">150,000</p>
              </div>
              <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase">CTR</p>
                <p className="text-lg font-bold text-pink-400">2.33%</p>
              </div>
              <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase">Konwersje</p>
                <p className="text-lg font-bold text-white">245</p>
              </div>
              <div className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                <p className="text-[10px] text-zinc-500 uppercase">ROI</p>
                <p className="text-lg font-bold text-emerald-400">420%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 6: Testimonials
    <div key="6" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col p-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-pink-400 text-sm tracking-wider uppercase">Opinie</p>
            <h2 className="text-4xl font-bold text-white">Co mówią nasze klientki</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1">
          {[
            {
              quote: "Dzięki Aurine mój salon w końcu ma stały napływ nowych klientek. W pierwszy miesiąc mieliśmy 45 nowych rezerwacji!",
              author: "Anna K.",
              salon: "Beauty Studio",
              city: "Warszawa"
            },
            {
              quote: "Profesjonalne podejście i świetne raporty. Wiem dokładnie za co płacę i jakie mam wyniki. Polecam każdemu salonowi!",
              author: "Marta W.",
              salon: "Salon Urody Marta",
              city: "Kraków"
            },
            {
              quote: "Wreszcie reklamy, które działają! Wcześniej sama próbowałam i przepalałam pieniądze. Teraz mam 3x więcej klientek.",
              author: "Karolina M.",
              salon: "Karolina Beauty",
              city: "Gdańsk"
            },
            {
              quote: "Zespół Aurine rozumie branżę beauty. Wiedzą co przyciąga klientki i jak je przekonać do rezerwacji.",
              author: "Patrycja Z.",
              salon: "Studio Pazur",
              city: "Poznań"
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white text-lg leading-relaxed flex-1">"{testimonial.quote}"</p>
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-zinc-500">{testimonial.salon} • {testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 7: CTA
    <div key="7" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/20 via-pink-500/5 to-transparent" />
      
      <div className="relative z-10 text-center space-y-8 px-16 max-w-4xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-pink-500/30">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-5xl font-bold text-white leading-tight">
          Gotowa na więcej klientek<br />
          <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">w {data.salonName || "Twoim salonie"}?</span>
        </h2>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Umów się na bezpłatną konsultację i dowiedz się, jak możemy pomóc rozwinąć Twój salon w {data.city || "Twoim mieście"}.
        </p>

        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4">
            <Phone className="w-5 h-5 text-pink-500" />
            <span className="text-white font-medium">+48 123 456 789</span>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4">
            <Mail className="w-5 h-5 text-pink-500" />
            <span className="text-white font-medium">kontakt@aurine.pl</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Globe className="w-5 h-5 text-zinc-500" />
          <span className="text-zinc-500">aurine.pl</span>
        </div>

        <div className="pt-8">
          <p className="text-zinc-600 text-sm">Prezentacja przygotowana specjalnie dla</p>
          <p className="text-xl font-bold text-pink-400">{data.ownerName || "Ciebie"}</p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div
      id="presentation-preview"
      className="w-[1600px] h-[900px] mx-auto overflow-hidden"
    >
      {slides[currentSlide] || slides[0]}
    </div>
  );
};

export const getTotalSlides = () => 7;
