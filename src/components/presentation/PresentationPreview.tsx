import { 
  Sparkles, TrendingUp, Target, CheckCircle2, Users, 
  Star, ArrowRight, Heart, MessageCircle, Phone, 
  Award, Instagram, Facebook, Calendar,
  Flower2, Scissors, Palette, Gift, Coffee,
  MapPin, Sparkle, Quote, HandHeart, Play
} from "lucide-react";
import agencyLogo from "@/assets/agency-logo.png";

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

  // Slide 1: Welcome - Big, Bold, Personal
  const Slide1 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Rich gradient background with beauty vibes */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(236,72,153,0.3)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(219,39,119,0.25)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)]" />
      
      {/* Large decorative beauty elements */}
      <div className="absolute top-8 right-8 w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500/30 to-rose-600/20 border-2 border-pink-400/40 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-pink-500/20">
        <Flower2 className="w-16 h-16 text-pink-300" />
      </div>
      
      <div className="absolute top-48 right-48 w-24 h-24 rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/20 border-2 border-fuchsia-400/35 flex items-center justify-center">
        <Heart className="w-12 h-12 text-fuchsia-300 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-32 right-24 w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-600/20 border-2 border-amber-400/35 flex items-center justify-center">
        <Scissors className="w-14 h-14 text-amber-300" />
      </div>
      
      <div className="absolute bottom-48 right-64 w-20 h-20 rounded-xl bg-gradient-to-br from-rose-500/25 to-pink-600/20 border-2 border-rose-400/35 flex items-center justify-center">
        <Palette className="w-10 h-10 text-rose-300" />
      </div>
      
      <div className="absolute top-1/2 right-36 w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-fuchsia-600/15 border border-pink-400/30 flex items-center justify-center">
        <Sparkle className="w-8 h-8 text-pink-300" />
      </div>

      {/* Floating sparkles */}
      <Star className="absolute top-1/3 right-1/4 w-8 h-8 text-pink-400/50 fill-pink-400/30" />
      <Sparkle className="absolute bottom-1/3 right-1/3 w-6 h-6 text-fuchsia-400/40" />
      <Star className="absolute top-2/3 right-1/2 w-5 h-5 text-amber-400/40 fill-amber-400/30" />

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-auto">
          <img src={agencyLogo} alt="Aurine" className="w-16 h-16 object-contain" />
          <div>
            <p className="text-pink-400 font-black text-xl tracking-wide">AURINE</p>
            <p className="text-zinc-400 text-base">Marketing dla salonów beauty</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[60%]">
          {/* Greeting badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/25 to-fuchsia-500/20 rounded-full border-2 border-pink-400/40 mb-8 w-fit shadow-lg shadow-pink-500/10">
            <Coffee className="w-6 h-6 text-pink-300" />
            <span className="text-pink-200 text-xl font-semibold">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            <Heart className="w-5 h-5 text-pink-300 fill-pink-400/50" />
          </div>

          {/* Main headline - LARGE */}
          <h1 className="text-7xl font-black text-white leading-[1.1] mb-8">
            Porozmawiajmy<br />
            o <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Twoim salonie</span>
          </h1>

          <p className="text-2xl text-zinc-300 leading-relaxed mb-10 max-w-2xl">
            Wiemy, że prowadzenie salonu to codzienne wyzwanie.<br />
            <span className="text-pink-300 font-semibold">Chcielibyśmy Ci w tym pomóc.</span>
          </p>

          {/* Personal card */}
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-500/40 shadow-2xl shadow-pink-500/15 max-w-lg">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/50 to-rose-600/40 border-2 border-pink-400/60 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-pink-200" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-1">Ta prezentacja jest dla</p>
                <p className="text-4xl font-black text-white">{data.ownerName || "Ciebie"}</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-pink-500/60 via-fuchsia-500/50 to-transparent my-5" />
            <p className="text-pink-400 font-bold text-2xl">{data.salonName || "Twój Salon"}</p>
            <p className="text-zinc-400 text-lg flex items-center gap-2 mt-2">
              <MapPin className="w-5 h-5 text-pink-400" />
              {data.city || "Twoje miasto"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <div className="flex items-center gap-3">
            <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-70" />
            <span className="text-zinc-500 text-sm">aurine.pl</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-3 rounded-full transition-all ${i === 0 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-3 bg-zinc-700/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 2: The Problem - Empathetic
  const Slide2 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(236,72,153,0.2)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(244,114,182,0.15)_0%,_transparent_50%)]" />

      {/* Large decorative elements */}
      <div className="absolute top-16 left-16 w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-500/25 to-rose-600/20 border-2 border-pink-400/35 flex items-center justify-center">
        <Flower2 className="w-14 h-14 text-pink-300" />
      </div>
      
      <div className="absolute bottom-24 left-24 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-600/20 border-2 border-amber-400/35 flex items-center justify-center">
        <Scissors className="w-12 h-12 text-amber-300" />
      </div>
      
      <div className="absolute top-1/3 left-8 w-20 h-20 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-600/15 border-2 border-fuchsia-400/30 flex items-center justify-center">
        <Heart className="w-10 h-10 text-fuchsia-300 fill-fuchsia-400/50" />
      </div>

      <Star className="absolute top-1/4 left-1/4 w-6 h-6 text-pink-400/40 fill-pink-400/30" />
      <Sparkle className="absolute bottom-1/3 left-1/3 w-5 h-5 text-fuchsia-400/30" />

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
          <div>
            <p className="text-pink-400 font-bold text-lg">AURINE</p>
            <p className="text-zinc-500 text-sm">Rozumiemy Twoje wyzwania</p>
          </div>
        </div>

        {/* Title - LARGE */}
        <h2 className="text-6xl font-black text-white mb-4">
          Czy to brzmi <span className="text-pink-400">znajomo</span>?
        </h2>
        <p className="text-2xl text-zinc-300 mb-10 max-w-3xl">
          Wiele właścicielek salonów mierzy się z tymi samymi wyzwaniami...
        </p>

        {/* Problems grid */}
        <div className="flex-1 grid grid-cols-2 gap-6 max-w-5xl">
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-pink-500/40 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/40 to-rose-600/30 border-2 border-pink-400/50 flex items-center justify-center mb-5">
              <Instagram className="w-8 h-8 text-pink-200" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Posty to nie reklamy</h3>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Wrzucasz piękne zdjęcia, ale algorytm pokazuje je tylko <span className="text-pink-400 font-semibold">kilku procentom</span> obserwujących.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-zinc-700/60 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/90 border-2 border-zinc-600 flex items-center justify-center mb-5">
              <Users className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Nowe klientki nie przychodzą</h3>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Stałe klientki wracają, ale pozyskanie nowych wymaga czegoś więcej niż profil na Instagramie.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-zinc-700/60 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/90 border-2 border-zinc-600 flex items-center justify-center mb-5">
              <Calendar className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Brakuje czasu</h3>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Między zabiegami i prowadzeniem grafiku ciężko znaleźć chwilę na marketing.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-emerald-500/30 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-600/20 border-2 border-emerald-400/40 flex items-center justify-center mb-5">
              <MapPin className="w-8 h-8 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">To Twoja szansa!</h3>
            <p className="text-lg text-zinc-300 leading-relaxed">
              W {data.city || "Twoim mieście"} mało kto używa płatnych reklam. <span className="text-emerald-400 font-semibold">Możesz być pierwsza!</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-500 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-3 rounded-full transition-all ${i === 1 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-3 bg-zinc-700/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 3: Testimonials
  const Slide3 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.1)_0%,_transparent_50%)]" />

      {/* Large beauty elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-500/25 to-rose-600/20 border-2 border-pink-400/35 flex items-center justify-center">
        <Flower2 className="w-16 h-16 text-pink-300" />
      </div>
      
      <div className="absolute bottom-20 right-32 w-24 h-24 rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/20 border-2 border-fuchsia-400/35 flex items-center justify-center">
        <Heart className="w-12 h-12 text-fuchsia-300 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute top-1/2 right-12 w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/15 border-2 border-amber-400/30 flex items-center justify-center">
        <Scissors className="w-10 h-10 text-amber-300" />
      </div>

      <Star className="absolute top-1/3 right-1/3 w-7 h-7 text-pink-400/40 fill-pink-400/30" />
      <Sparkle className="absolute bottom-1/4 right-1/4 w-5 h-5 text-fuchsia-400/30" />

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
          <div>
            <p className="text-pink-400 font-bold text-lg">AURINE</p>
            <p className="text-zinc-500 text-sm">Co mówią nasze klientki</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-6xl font-black text-white mb-3">
          Historie <span className="text-pink-400">sukcesu</span>
        </h2>
        <p className="text-2xl text-zinc-300 mb-10">
          Prawdziwe opinie właścicielek salonów
        </p>

        {/* Testimonials - LARGE */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-pink-500/40 shadow-xl flex flex-col">
            <Quote className="w-12 h-12 text-pink-400/60 mb-4" />
            <p className="text-xl text-zinc-200 leading-relaxed flex-1 italic">
              "W końcu mam czas na zabiegi, a klientki same przychodzą. Po 3 miesiącach współpracy grafik jest pełny!"
            </p>
            <div className="mt-6 pt-6 border-t border-pink-500/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/40 to-rose-600/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-pink-200">M</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Magda</p>
                  <p className="text-pink-400">Beauty Room Magda</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-fuchsia-500/40 shadow-xl flex flex-col">
            <Quote className="w-12 h-12 text-fuchsia-400/60 mb-4" />
            <p className="text-xl text-zinc-200 leading-relaxed flex-1 italic">
              "Byłam sceptyczna, ale wyniki przerosły oczekiwania. Koszt reklam zwraca się wielokrotnie!"
            </p>
            <div className="mt-6 pt-6 border-t border-fuchsia-500/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-500/40 to-purple-600/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-fuchsia-200">K</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Karolina</p>
                  <p className="text-fuchsia-400">Studio Karolina</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-rose-500/40 shadow-xl flex flex-col">
            <Quote className="w-12 h-12 text-rose-400/60 mb-4" />
            <p className="text-xl text-zinc-200 leading-relaxed flex-1 italic">
              "Profesjonalne podejście i świetne efekty. Polecam każdej właścicielce salonu!"
            </p>
            <div className="mt-6 pt-6 border-t border-rose-500/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/40 to-pink-600/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-rose-200">A</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Anna</p>
                  <p className="text-rose-400">Salon Anna Beauty</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-500 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-3 rounded-full transition-all ${i === 2 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-3 bg-zinc-700/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 4: How We Work Together
  const Slide4 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(236,72,153,0.2)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.15)_0%,_transparent_50%)]" />

      {/* Decorative elements */}
      <div className="absolute bottom-24 right-24 w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-500/25 to-rose-600/20 border-2 border-pink-400/35 flex items-center justify-center">
        <Flower2 className="w-14 h-14 text-pink-300" />
      </div>
      
      <div className="absolute top-32 right-16 w-24 h-24 rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/20 border-2 border-fuchsia-400/35 flex items-center justify-center">
        <Palette className="w-12 h-12 text-fuchsia-300" />
      </div>
      
      <div className="absolute top-1/2 right-8 w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/15 border-2 border-amber-400/30 flex items-center justify-center">
        <Scissors className="w-10 h-10 text-amber-300" />
      </div>

      <Star className="absolute top-1/4 right-1/3 w-6 h-6 text-pink-400/40 fill-pink-400/30" />

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
          <div>
            <p className="text-pink-400 font-bold text-lg">AURINE</p>
            <p className="text-zinc-500 text-sm">Jak wygląda współpraca</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-6xl font-black text-white mb-4">
          Jak <span className="text-pink-400">działamy</span>
        </h2>
        <p className="text-2xl text-zinc-300 mb-10">
          Prosty proces, który nie zabiera Ci czasu
        </p>

        {/* Steps - Large */}
        <div className="flex-1 flex flex-col gap-5 max-w-4xl">
          <div className="flex items-center gap-6 bg-gradient-to-r from-pink-500/20 to-transparent rounded-3xl p-6 border-l-4 border-pink-500">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/40 to-rose-600/30 border-2 border-pink-400/50 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-black text-pink-200">1</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Poznajemy Twój salon</h3>
              <p className="text-lg text-zinc-300">Krótka rozmowa o Twoich celach, usługach i wymarzonej klientce.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gradient-to-r from-fuchsia-500/20 to-transparent rounded-3xl p-6 border-l-4 border-fuchsia-500">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-500/40 to-purple-600/30 border-2 border-fuchsia-400/50 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-black text-fuchsia-200">2</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Tworzymy strategię</h3>
              <p className="text-lg text-zinc-300">Przygotowujemy kampanię dopasowaną do Twojego miasta i budżetu.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gradient-to-r from-rose-500/20 to-transparent rounded-3xl p-6 border-l-4 border-rose-500">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500/40 to-pink-600/30 border-2 border-rose-400/50 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-black text-rose-200">3</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Uruchamiamy reklamy</h3>
              <p className="text-lg text-zinc-300">Ty robisz zabiegi, my zajmujemy się całym marketingiem.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-3xl p-6 border-l-4 border-emerald-500">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-teal-600/30 border-2 border-emerald-400/50 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-black text-emerald-200">4</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Klientki same się zapisują</h3>
              <p className="text-lg text-zinc-300">Widzisz nowe rezerwacje i raport z wynikami co tydzień.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-500 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-3 rounded-full transition-all ${i === 3 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-3 bg-zinc-700/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 5: Special Offer
  const Slide5 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(168,85,247,0.15)_0%,_transparent_50%)]" />

      {/* Decorative elements */}
      <div className="absolute top-16 left-16 w-28 h-28 rounded-3xl bg-gradient-to-br from-pink-500/25 to-rose-600/20 border-2 border-pink-400/35 flex items-center justify-center">
        <Flower2 className="w-14 h-14 text-pink-300" />
      </div>
      
      <div className="absolute bottom-32 left-24 w-24 h-24 rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/20 border-2 border-fuchsia-400/35 flex items-center justify-center">
        <Heart className="w-12 h-12 text-fuchsia-300 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute top-1/3 left-8 w-20 h-20 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/15 border-2 border-amber-400/30 flex items-center justify-center">
        <Scissors className="w-10 h-10 text-amber-300" />
      </div>

      <Star className="absolute bottom-1/4 left-1/4 w-7 h-7 text-pink-400/40 fill-pink-400/30" />
      <Sparkle className="absolute top-1/2 left-1/3 w-5 h-5 text-fuchsia-400/30" />

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
          <div>
            <p className="text-pink-400 font-bold text-lg">AURINE</p>
            <p className="text-zinc-500 text-sm">Specjalna oferta</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-6xl font-black text-white mb-4">
          Mamy coś <span className="text-pink-400">dla Ciebie</span>
        </h2>
        <p className="text-2xl text-zinc-300 mb-10">
          Tylko dla salonów z {data.city || "Twojego miasta"}
        </p>

        {/* Offers */}
        <div className="flex-1 flex gap-8">
          {/* Main offer */}
          <div className="flex-1 bg-gradient-to-br from-pink-500/20 via-zinc-900/95 to-fuchsia-500/15 rounded-3xl p-10 border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20 relative overflow-hidden">
            <div className="absolute top-6 right-6 px-5 py-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full">
              <span className="text-white font-bold text-lg">GRATIS</span>
            </div>
            
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500/40 to-rose-600/30 border-2 border-pink-400/50 flex items-center justify-center mb-8">
              <Gift className="w-12 h-12 text-pink-200" />
            </div>
            
            <h3 className="text-4xl font-black text-white mb-4">
              Tydzień testowy
            </h3>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Dla pierwszych dwóch salonów z {data.city || "Twojego miasta"} — tydzień darmowej kampanii reklamowej, bez żadnych zobowiązań.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                <span className="text-xl text-zinc-200">Pełna konfiguracja kampanii</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                <span className="text-xl text-zinc-200">Profesjonalne kreacje reklamowe</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                <span className="text-xl text-zinc-200">Raport z wynikami</span>
              </div>
            </div>
          </div>

          {/* Secondary offer */}
          <div className="w-80 bg-gradient-to-br from-zinc-900/95 to-zinc-800/90 rounded-3xl p-8 border-2 border-fuchsia-500/40 shadow-xl flex flex-col">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-500/40 to-purple-600/30 border-2 border-fuchsia-400/50 flex items-center justify-center mb-6">
              <Target className="w-10 h-10 text-fuchsia-200" />
            </div>
            
            <div className="px-4 py-2 bg-fuchsia-500/20 rounded-full w-fit mb-4">
              <span className="text-fuchsia-300 font-bold">GRATIS</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              Audyt marketingowy
            </h3>
            <p className="text-lg text-zinc-300 flex-1 leading-relaxed">
              Przeanalizujemy Twoje social media i pokażemy, co można poprawić.
            </p>
            
            <div className="mt-6 pt-6 border-t border-fuchsia-500/30">
              <p className="text-zinc-400 text-sm">
                Bez zobowiązań — umówmy się na rozmowę
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <span className="text-zinc-500 text-sm">aurine.pl</span>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-3 rounded-full transition-all ${i === 4 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-3 bg-zinc-700/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 6: Contact / CTA
  const Slide6 = () => (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.3)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(168,85,247,0.2)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(219,39,119,0.15)_0%,_transparent_50%)]" />

      {/* Large decorative elements */}
      <div className="absolute top-20 right-20 w-36 h-36 rounded-3xl bg-gradient-to-br from-pink-500/30 to-rose-600/20 border-2 border-pink-400/40 flex items-center justify-center">
        <Flower2 className="w-20 h-20 text-pink-300" />
      </div>
      
      <div className="absolute top-1/2 right-16 w-28 h-28 rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/20 border-2 border-fuchsia-400/35 flex items-center justify-center">
        <Heart className="w-14 h-14 text-fuchsia-300 fill-fuchsia-400/50" />
      </div>
      
      <div className="absolute bottom-28 right-28 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-600/20 border-2 border-amber-400/35 flex items-center justify-center">
        <Scissors className="w-12 h-12 text-amber-300" />
      </div>
      
      <div className="absolute bottom-1/3 right-48 w-20 h-20 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-600/15 border-2 border-rose-400/30 flex items-center justify-center">
        <Palette className="w-10 h-10 text-rose-300" />
      </div>

      <Star className="absolute top-1/3 right-1/3 w-8 h-8 text-pink-400/50 fill-pink-400/30" />
      <Sparkle className="absolute bottom-1/4 right-1/4 w-6 h-6 text-fuchsia-400/40" />
      <Star className="absolute top-2/3 right-1/2 w-5 h-5 text-amber-400/40 fill-amber-400/30" />

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img src={agencyLogo} alt="Aurine" className="w-14 h-14 object-contain" />
          <div>
            <p className="text-pink-400 font-bold text-lg">AURINE</p>
            <p className="text-zinc-500 text-sm">Porozmawiajmy</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[55%]">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/25 to-fuchsia-500/20 rounded-full border-2 border-pink-400/40 mb-8 w-fit">
            <HandHeart className="w-6 h-6 text-pink-300" />
            <span className="text-pink-200 text-xl font-semibold">Jesteśmy tu dla Ciebie</span>
          </div>

          <h2 className="text-7xl font-black text-white leading-[1.1] mb-8">
            Umówmy się na<br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">kawę online</span>
          </h2>

          <p className="text-2xl text-zinc-300 leading-relaxed mb-10 max-w-xl">
            Bez zobowiązań, bez sprzedaży.<br />
            <span className="text-pink-300 font-semibold">Po prostu porozmawiajmy o Twoim salonie.</span>
          </p>

          {/* Contact options */}
          <div className="space-y-4 mb-10">
            <a href="tel:+48123456789" className="flex items-center gap-5 bg-gradient-to-r from-pink-500/20 to-transparent rounded-2xl p-5 border-l-4 border-pink-500 hover:from-pink-500/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/40 to-rose-600/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-8 h-8 text-pink-200" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Zadzwoń do nas</p>
                <p className="text-2xl font-bold text-white">+48 123 456 789</p>
              </div>
            </a>

            <a href="mailto:kontakt@aurine.pl" className="flex items-center gap-5 bg-gradient-to-r from-fuchsia-500/20 to-transparent rounded-2xl p-5 border-l-4 border-fuchsia-500 hover:from-fuchsia-500/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500/40 to-purple-600/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageCircle className="w-8 h-8 text-fuchsia-200" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Napisz wiadomość</p>
                <p className="text-2xl font-bold text-white">kontakt@aurine.pl</p>
              </div>
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="flex -space-x-3">
              {['M', 'K', 'A'].map((initial, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/40 to-fuchsia-600/30 border-2 border-zinc-900 flex items-center justify-center">
                  <span className="text-lg font-bold text-pink-200">{initial}</span>
                </div>
              ))}
            </div>
            <p className="text-lg">
              <span className="text-pink-400 font-semibold">50+ salonów</span> już nam zaufało
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6">
          <div className="flex items-center gap-4">
            <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-white font-bold">aurine.pl</p>
              <p className="text-zinc-500 text-sm">Marketing dla salonów beauty</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div key={i} className={`h-3 rounded-full transition-all ${i === 5 ? 'w-10 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-3 bg-zinc-700/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlideComponent = slides[currentSlide] || Slide1;

  return (
    <div className="w-full h-full bg-zinc-950">
      <CurrentSlideComponent />
    </div>
  );
};
