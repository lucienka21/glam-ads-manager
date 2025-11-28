import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, BarChart3, Heart,
  MessageCircle, Phone, Mail, Globe, Zap,
  Award, Clock, Instagram, Facebook, Calendar,
  Flower2, Search, FileText, LineChart,
  XCircle, Eye, DollarSign, Megaphone,
  Scissors, Palette, UserCheck, Send, Play,
  Gift, Shield, Rocket, ThumbsUp, Coffee,
  MapPin, Sparkle, CheckCircle, AlertCircle, Quote
} from "lucide-react";
import agencyLogo from "@/assets/agency-logo.png";
import slideBg1 from "@/assets/presentation/slide-bg-1.jpg";
import slideBg2 from "@/assets/presentation/slide-bg-2.jpg";
import slideBg3 from "@/assets/presentation/slide-bg-3.jpg";
import slideBg4 from "@/assets/presentation/slide-bg-4.jpg";
import slideBg5 from "@/assets/presentation/slide-bg-5.jpg";
import slideBg6 from "@/assets/presentation/slide-bg-6.jpg";

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
  const totalSlides = 6;

  // Common header component
  const Header = ({ subtitle }: { subtitle: string }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img src={agencyLogo} alt="Aurine" className="w-12 h-12 object-contain" />
        <div>
          <p className="text-pink-400 font-semibold text-sm">AURINE AGENCY</p>
          <p className="text-zinc-400 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
          <Flower2 className="w-4 h-4 text-pink-400" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center backdrop-blur-sm">
          <Heart className="w-4 h-4 text-fuchsia-400" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center backdrop-blur-sm">
          <Sparkle className="w-4 h-4 text-rose-400" />
        </div>
      </div>
    </div>
  );

  // Common footer component
  const Footer = ({ activeSlide }: { activeSlide: number }) => (
    <div className="flex items-center justify-between mt-auto pt-4">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain opacity-80" />
        <span className="text-zinc-300 text-xs font-medium">aurine.pl</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-2 bg-white/30'}`} />
        ))}
      </div>
      <span className="text-zinc-300 text-xs font-medium">Marketing dla branży beauty</span>
    </div>
  );

  // Slide 1: Welcome - facial treatment background
  const Slide1 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slideBg1})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Prezentacja dla Twojego salonu" />

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[60%]">
          {/* Warm greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-500/40 mb-6 w-fit">
            <Coffee className="w-4 h-4 text-pink-400" />
            <span className="text-pink-200 text-sm font-medium">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl font-black text-white leading-[1.2] mb-6 drop-shadow-lg">
            Wiemy, że prowadzenie<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              salonu to prawdziwe wyzwanie
            </span>
          </h1>

          <p className="text-lg text-zinc-200 leading-relaxed mb-8 max-w-xl drop-shadow">
            Codziennie dbasz o to, żeby Twoje klientki wychodziły szczęśliwe. 
            Zabiegi, grafik, zamówienia, media społecznościowe... 
            <span className="text-pink-300 font-medium"> A co z pozyskiwaniem nowych klientek?</span>
          </p>

          {/* Personal info card */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-pink-500/30 shadow-2xl shadow-pink-500/20 max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs">Ta prezentacja jest dla</p>
                <p className="text-2xl font-bold text-white">{data.ownerName || "Ciebie"}</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-pink-500/50 via-fuchsia-500/40 to-transparent mb-3" />
            <div className="flex items-center gap-4">
              <div>
                <p className="text-pink-400 font-semibold text-lg">{data.salonName || "Twój Salon"}</p>
                <p className="text-zinc-300 text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400/80" />
                  {data.city || "Twoje miasto"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer activeSlide={0} />
      </div>
    </div>
  );

  // Slide 2: Challenges - before/after background
  const Slide2 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slideBg2})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Rozumiemy Twoje wyzwania" />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-3 drop-shadow-lg">
            Czy to brzmi <span className="text-pink-400">znajomo</span>?
          </h2>
          <p className="text-lg text-zinc-200 drop-shadow">
            Wiele właścicielek salonów w mniejszych miastach zmaga się z tymi samymi problemami...
          </p>
        </div>

        {/* Problems */}
        <div className="flex-1 max-w-[65%] grid grid-cols-1 gap-4">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-5 border border-pink-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Post to nie reklama</h3>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  Wrzucasz piękne zdjęcia zabiegów, ale algorytm pokazuje je tylko <span className="text-pink-400 font-semibold">5-10%</span> Twoich obserwujących. 
                  Cała reszta nawet nie wie, że coś publikujesz.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-5 border border-zinc-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-zinc-400 rotate-180" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Organiczne zasięgi to przeszłość</h3>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  Kiedyś wystarczyło regularnie postować. Dziś zasięgi organiczne <span className="text-rose-400 font-semibold">spadły o 80%</span> — 
                  bez płatnej promocji trudno dotrzeć do nowych osób.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-5 border border-zinc-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">Brak czasu i wiedzy technicznej</h3>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  Między zabiegami, zamówieniami i grafikiem nie ma czasu na naukę 
                  Menedżera reklam. A kliknięcie "Promuj post" to często <span className="text-zinc-400">przepalone pieniądze</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hopeful message */}
        <div className="mt-4 bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-500/40 max-w-[65%]">
          <p className="text-base text-white flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <span className="text-emerald-400 font-bold">Dobra wiadomość:</span> W {data.city || "Twoim mieście"} wciąż mało salonów 
              korzysta z płatnych reklam — <span className="text-white font-semibold">to Twoja szansa!</span>
            </span>
          </p>
        </div>

        <Footer activeSlide={1} />
      </div>
    </div>
  );

  // Slide 3: Testimonials - salon interior background
  const Slide3 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slideBg3})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Co mówią nasze klientki" />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
            <span className="text-pink-400">Opinie</span> właścicielek salonów
          </h2>
          <p className="text-lg text-zinc-200 drop-shadow">
            Zobacz, jak pomagamy salonom beauty rozwijać się dzięki reklamom
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="flex-1 grid grid-cols-3 gap-5">
          {/* Testimonial 1 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-pink-500/30 flex flex-col">
            <Quote className="w-8 h-8 text-pink-500/50 mb-3" />
            <p className="text-zinc-200 text-sm leading-relaxed flex-1 italic">
              "Przez 3 miesiące współpracy zyskałam ponad 60 nowych stałych klientek. 
              Wcześniej sama próbowałam promować posty i nic z tego nie wychodziło. 
              Teraz mam pełny grafik na 3 tygodnie do przodu!"
            </p>
            <div className="h-px bg-gradient-to-r from-pink-500/40 to-transparent my-4" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center">
                <span className="text-pink-300 font-bold">MK</span>
              </div>
              <div>
                <p className="text-white font-semibold">Magda Kowalczyk</p>
                <p className="text-pink-400 text-sm">Beauty Studio Magda, Tarnów</p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-fuchsia-500/30 flex flex-col">
            <Quote className="w-8 h-8 text-fuchsia-500/50 mb-3" />
            <p className="text-zinc-200 text-sm leading-relaxed flex-1 italic">
              "Najlepsza decyzja biznesowa jaką podjęłam! Aurine zna branżę beauty 
              i wie jak dotrzeć do klientek. ROI z reklam to 400% - każda złotówka 
              wraca czterokrotnie w zabiegach."
            </p>
            <div className="h-px bg-gradient-to-r from-fuchsia-500/40 to-transparent my-4" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500/40 to-purple-500/30 border border-fuchsia-500/50 flex items-center justify-center">
                <span className="text-fuchsia-300 font-bold">KN</span>
              </div>
              <div>
                <p className="text-white font-semibold">Karolina Nowak</p>
                <p className="text-fuchsia-400 text-sm">Glow Clinic, Nowy Sącz</p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-rose-500/30 flex flex-col">
            <Quote className="w-8 h-8 text-rose-500/50 mb-3" />
            <p className="text-zinc-200 text-sm leading-relaxed flex-1 italic">
              "Bałam się reklam na Facebooku - wydawało mi się to skomplikowane. 
              Aurine wszystkim się zajęło. Teraz mam spokój głowy i stały przypływ 
              nowych klientek co tydzień!"
            </p>
            <div className="h-px bg-gradient-to-r from-rose-500/40 to-transparent my-4" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500/40 to-pink-500/30 border border-rose-500/50 flex items-center justify-center">
                <span className="text-rose-300 font-bold">AW</span>
              </div>
              <div>
                <p className="text-white font-semibold">Anna Wiśniewska</p>
                <p className="text-rose-400 text-sm">Salon Piękna Anna, Zakopane</p>
              </div>
            </div>
            <div className="flex gap-0.5 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-4 bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-pink-500/20">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-3xl font-black text-pink-400">50+</p>
              <p className="text-zinc-300 text-sm">salonów beauty</p>
            </div>
            <div className="w-px h-10 bg-zinc-700" />
            <div className="text-center">
              <p className="text-3xl font-black text-fuchsia-400">400%</p>
              <p className="text-zinc-300 text-sm">średnie ROI</p>
            </div>
            <div className="w-px h-10 bg-zinc-700" />
            <div className="text-center">
              <p className="text-3xl font-black text-rose-400">2000+</p>
              <p className="text-zinc-300 text-sm">nowych klientek</p>
            </div>
          </div>
        </div>

        <Footer activeSlide={2} />
      </div>
    </div>
  );

  // Slide 4: How we work - manicure background
  const Slide4 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slideBg4})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Przebieg współpracy" />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
            Jak <span className="text-pink-400">pracujemy</span>?
          </h2>
          <p className="text-lg text-zinc-200 drop-shadow">
            Prosty proces, który przynosi realne wyniki dla Twojego salonu
          </p>
        </div>

        {/* Process steps */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-pink-500/30 flex flex-col">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/40 to-rose-500/30 border border-pink-500/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-pink-400">1</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Poznajemy Twój salon</h3>
            <p className="text-zinc-300 text-sm leading-relaxed flex-1">
              Na bezpłatnej rozmowie poznajemy Twoje usługi, klientki i cele. 
              Słuchamy i zadajemy pytania.
            </p>
            <div className="mt-3 flex items-center gap-2 text-pink-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>30 min rozmowa</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-fuchsia-500/30 flex flex-col">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/40 to-purple-500/30 border border-fuchsia-500/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-fuchsia-400">2</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Tworzymy strategię</h3>
            <p className="text-zinc-300 text-sm leading-relaxed flex-1">
              Przygotowujemy plan działania dopasowany do Twojego salonu, 
              budżetu i lokalizacji.
            </p>
            <div className="mt-3 flex items-center gap-2 text-fuchsia-400 text-sm">
              <FileText className="w-4 h-4" />
              <span>Personalizowany plan</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-rose-500/30 flex flex-col">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/40 to-pink-500/30 border border-rose-500/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-rose-400">3</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Uruchamiamy reklamy</h3>
            <p className="text-zinc-300 text-sm leading-relaxed flex-1">
              Tworzymy i uruchamiamy kampanie reklamowe. Ty zajmujesz się 
              klientkami - my marketingiem.
            </p>
            <div className="mt-3 flex items-center gap-2 text-rose-400 text-sm">
              <Rocket className="w-4 h-4" />
              <span>Start w 7 dni</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 border border-amber-500/30 flex flex-col">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/40 to-orange-500/30 border border-amber-500/50 flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-amber-400">4</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Optymalizujemy wyniki</h3>
            <p className="text-zinc-300 text-sm leading-relaxed flex-1">
              Monitorujemy, testujemy i poprawiamy kampanie. 
              Co tydzień raport z wynikami.
            </p>
            <div className="mt-3 flex items-center gap-2 text-amber-400 text-sm">
              <LineChart className="w-4 h-4" />
              <span>Cotygodniowe raporty</span>
            </div>
          </div>
        </div>

        {/* Benefits bar */}
        <div className="mt-4 bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-pink-500/20">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-white text-sm">Bez umów na rok</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-white text-sm">Przejrzyste rozliczenia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-white text-sm">Stały kontakt z opiekunem</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-white text-sm">Gwarancja wyników</span>
            </div>
          </div>
        </div>

        <Footer activeSlide={3} />
      </div>
    </div>
  );

  // Slide 5: Special offers - happy client background
  const Slide5 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slideBg5})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Specjalna oferta dla Ciebie" />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
            <span className="text-pink-400">Propozycja</span> nie do odrzucenia
          </h2>
          <p className="text-lg text-zinc-200 drop-shadow">
            Mamy dla Ciebie coś wyjątkowego, {data.ownerName || "droga Właścicielko"}!
          </p>
        </div>

        {/* Offers */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Offer 1: Free audit */}
          <div className="bg-gradient-to-br from-pink-500/20 to-fuchsia-500/10 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-500/50 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-pink-300 text-sm font-medium">BONUS #1</p>
                <h3 className="text-2xl font-black text-white">Darmowy Audyt</h3>
              </div>
            </div>
            <p className="text-zinc-200 leading-relaxed mb-4 flex-1">
              Sprawdzimy Twoje obecne działania marketingowe i podpowiemy, 
              co możesz poprawić — <span className="text-pink-300 font-semibold">bez żadnych zobowiązań</span>.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-pink-400" />
                Analiza profili social media
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-pink-400" />
                Ocena konkurencji w {data.city || "Twoim mieście"}
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-pink-400" />
                Konkretne rekomendacje
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-pink-500/30">
              <p className="text-center">
                <span className="text-zinc-400 line-through text-lg">500 zł</span>
                <span className="text-3xl font-black text-pink-400 ml-3">GRATIS</span>
              </p>
            </div>
          </div>

          {/* Offer 2: Free trial week */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-md rounded-3xl p-6 border-2 border-emerald-500/50 flex flex-col relative overflow-hidden">
            {/* Limited badge */}
            <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              LIMITOWANE!
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-emerald-300 text-sm font-medium">BONUS #2</p>
                <h3 className="text-2xl font-black text-white">Tydzień Próbny</h3>
              </div>
            </div>
            <p className="text-zinc-200 leading-relaxed mb-4 flex-1">
              Dla <span className="text-emerald-300 font-bold">2 pierwszych salonów z {data.city || "Twojego miasta"}</span> — 
              tydzień pełnej obsługi reklamowej całkowicie za darmo!
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                7 dni kampanii reklamowej
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Profesjonalne grafiki reklamowe
              </li>
              <li className="flex items-center gap-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Pełne wsparcie i raportowanie
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-emerald-500/30">
              <p className="text-center">
                <span className="text-zinc-400 line-through text-lg">1500 zł</span>
                <span className="text-3xl font-black text-emerald-400 ml-3">0 zł</span>
              </p>
            </div>
          </div>
        </div>

        {/* Urgency message */}
        <div className="mt-4 bg-amber-500/20 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/40">
          <p className="text-center text-white font-medium flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>
              Oferta ważna do końca miesiąca lub do wyczerpania miejsc. 
              <span className="text-amber-400 font-bold"> Nie czekaj!</span>
            </span>
          </p>
        </div>

        <Footer activeSlide={4} />
      </div>
    </div>
  );

  // Slide 6: Contact - beauty products background
  const Slide6 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slideBg6})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 h-full flex flex-col px-16 py-10">
        <Header subtitle="Porozmawiajmy" />

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-[55%]">
            {/* Title */}
            <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
              Zróbmy pierwszy krok<br />
              <span className="text-pink-400">razem</span>
            </h2>

            <p className="text-xl text-zinc-200 leading-relaxed mb-8 drop-shadow">
              {data.ownerName || "Droga Właścicielko"}, chętnie porozmawiamy o tym, 
              jak możemy pomóc {data.salonName || "Twojemu salonowi"} przyciągnąć 
              więcej klientek z {data.city || "Twojego miasta"}.
            </p>

            {/* Contact options */}
            <div className="space-y-4 mb-8">
              <a href="tel:+48123456789" className="flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-pink-500/30 hover:border-pink-500/60 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Zadzwoń do nas</p>
                  <p className="text-xl font-bold text-white">+48 123 456 789</p>
                </div>
              </a>

              <a href="mailto:kontakt@aurine.pl" className="flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-fuchsia-500/30 hover:border-fuchsia-500/60 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Napisz do nas</p>
                  <p className="text-xl font-bold text-white">kontakt@aurine.pl</p>
                </div>
              </a>

              <a href="https://aurine.pl" className="flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-rose-500/30 hover:border-rose-500/60 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Odwiedź stronę</p>
                  <p className="text-xl font-bold text-white">aurine.pl</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - offer reminder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-6 border border-pink-500/30 max-w-sm">
              <div className="text-center mb-4">
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">Pamiętaj o bonusach!</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-pink-500/20 rounded-xl p-3 border border-pink-500/30">
                  <p className="text-pink-300 text-sm font-medium flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Darmowy audyt marketingowy
                  </p>
                </div>
                <div className="bg-emerald-500/20 rounded-xl p-3 border border-emerald-500/30">
                  <p className="text-emerald-300 text-sm font-medium flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Tydzień próbny gratis
                  </p>
                </div>
              </div>
              <p className="text-zinc-400 text-xs text-center mt-4">
                Dla 2 pierwszych salonów z {data.city || "Twojego miasta"}
              </p>
            </div>
          </div>
        </div>

        {/* Thank you */}
        <div className="bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-rose-500/20 backdrop-blur-sm rounded-2xl p-4 border border-pink-500/30 text-center">
          <p className="text-xl text-white font-medium">
            Dziękujemy za poświęcony czas! 💖
          </p>
          <p className="text-zinc-300 text-sm mt-1">
            Do zobaczenia, {data.ownerName || "droga Właścicielko"}!
          </p>
        </div>

        <Footer activeSlide={5} />
      </div>
    </div>
  );

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlide = slides[currentSlide] || Slide1;

  return (
    <div className="w-full h-full">
      <CurrentSlide />
    </div>
  );
};
