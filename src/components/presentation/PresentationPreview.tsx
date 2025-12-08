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

interface PresentationData {
  ownerName: string;
  salonName: string;
  city: string;
}

interface PresentationPreviewProps {
  data: PresentationData;
  currentSlide: number;
}

// Helper function to convert a single Polish word to locative case
const declineSingleWord = (word: string): string => {
  const wordLower = word.toLowerCase().trim();
  
  const exceptions: Record<string, string> = {
    "warszawa": "Warszawie", "kraków": "Krakowie", "łódź": "Łodzi",
    "wrocław": "Wrocławiu", "poznań": "Poznaniu", "gdańsk": "Gdańsku",
    "szczecin": "Szczecinie", "bydgoszcz": "Bydgoszczy", "lublin": "Lublinie",
    "białystok": "Białymstoku", "katowice": "Katowicach", "gdynia": "Gdyni",
    "częstochowa": "Częstochowie", "radom": "Radomiu", "sosnowiec": "Sosnowcu",
    "toruń": "Toruniu", "kielce": "Kielcach", "rzeszów": "Rzeszowie",
    "gliwice": "Gliwicach", "zabrze": "Zabrzu", "olsztyn": "Olsztynie",
    "bytom": "Bytomiu", "rybnik": "Rybniku", "tychy": "Tychach",
    "opole": "Opolu", "elbląg": "Elblągu", "płock": "Płocku",
    "tarnów": "Tarnowie", "chorzów": "Chorzowie", "koszalin": "Koszalinie",
    "kalisz": "Kaliszu", "legnica": "Legnicy", "grudziądz": "Grudziądzu",
    "jaworzno": "Jaworznie", "słupsk": "Słupsku", "siedlce": "Siedlcach",
    "mysłowice": "Mysłowicach", "piła": "Pile", "stargard": "Stargardzie",
    "gniezno": "Gnieźnie", "ostrołęka": "Ostrołęce", "inowrocław": "Inowrocławiu",
    "lubin": "Lubinie", "otwock": "Otwocku", "suwałki": "Suwałkach",
    "starachowice": "Starachowicach", "gorlice": "Gorlicach",
    "brodnica": "Brodnicy", "mława": "Mławie", "ciechanów": "Ciechanowie",
    "działdowo": "Działdowie", "przasnysz": "Przasnyszu", "żuromin": "Żurominie",
    "sierpc": "Sierpcu", "płońsk": "Płońsku", "pułtusk": "Pułtusku",
    "wyszków": "Wyszkowie", "ostrów": "Ostrowie", "węgrów": "Węgrowie",
    "sokołów": "Sokołowie", "łosice": "Łosicach", "mińsk": "Mińsku",
    "garwolin": "Garwolinie", "kozienice": "Kozienicach", "zwoleń": "Zwoleniu",
    "lipsko": "Lipsku", "radomsko": "Radomsku", "tomaszów": "Tomaszowie",
    "skierniewice": "Skierniewicach", "łowicz": "Łowiczu", "kutno": "Kutnie",
    "łęczyca": "Łęczycy", "zgierz": "Zgierzu", "pabianice": "Pabianicach",
    "bełchatów": "Bełchatowie", "sieradz": "Sieradzu", "wieluń": "Wieluniu",
    "zduńska": "Zduńskiej", "wola": "Woli", "łask": "Łasku",
    "poddębice": "Poddębicach", "turek": "Turku", "konin": "Koninie",
    "koło": "Kole", "słupca": "Słupcy", "września": "Wrześni",
    "wągrowiec": "Wągrowcu", "chodzież": "Chodzieży", "czarnków": "Czarnkowie",
    "trzcianka": "Trzciance", "złotów": "Złotowie", "wałcz": "Wałczu",
    "szczecinek": "Szczecinku", "drawsko": "Drawsku", "białogard": "Białogardzie",
    "kołobrzeg": "Kołobrzegu", "gryfice": "Gryficach", "kamień": "Kamieniu",
    "świnoujście": "Świnoujściu", "goleniów": "Goleniowie", "myślibórz": "Myśliborzu",
    "gryfino": "Gryfinie", "police": "Policach",
    "nowy": "Nowym", "nowa": "Nowej", "nowe": "Nowym",
    "stary": "Starym", "stara": "Starej", "stare": "Starym",
    "mazowiecka": "Mazowieckim", "mazowiecki": "Mazowieckim", "mazowieckie": "Mazowieckim",
    "wielkopolski": "Wielkopolskim", "wielkopolska": "Wielkopolskim", "wielkopolskie": "Wielkopolskim",
    "śląska": "Śląskiej", "śląski": "Śląskim", "śląskie": "Śląskim",
    "trybunalski": "Trybunalskim", "biała": "Białej", "góra": "Górze",
    "zdrój": "Zdroju", "sącz": "Sączu", "zielona": "Zielonej",
    "jelenia": "Jeleniej", "gorzów": "Gorzowie", "piotrków": "Piotrkowie",
    "ruda": "Rudzie", "bielsko": "Bielsku", "jastrzębie": "Jastrzębiu",
    "podlaski": "Podlaskim", "podlaska": "Podlaskiej", "podlaskie": "Podlaskim",
    "kujawski": "Kujawskim", "pomorski": "Pomorskim", "pomorska": "Pomorskiej",
    "pomorskie": "Pomorskim", "lubelski": "Lubelskim", "lubelska": "Lubelskiej",
    "dolny": "Dolnym", "dolna": "Dolnej", "górny": "Górnym", "górna": "Górnej",
    "świętokrzyski": "Świętokrzyskim", "świętokrzyska": "Świętokrzyskiej",
    "warmińsko": "Warmińsko", "mazurski": "Mazurskim",
  };
  
  if (exceptions[wordLower]) {
    const result = exceptions[wordLower];
    if (word.charAt(0) === word.charAt(0).toUpperCase()) {
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
    return result;
  }
  
  if (wordLower.endsWith("ica") || wordLower.endsWith("yca")) return word.slice(0, -1) + "y";
  if (wordLower.endsWith("ca")) return word.slice(0, -1) + "y";
  if (wordLower.endsWith("ga")) return word.slice(0, -2) + "dze";
  if (wordLower.endsWith("ka")) return word.slice(0, -2) + "ce";
  if (wordLower.endsWith("wa") || wordLower.endsWith("awa")) return word.slice(0, -1) + "ie";
  if (wordLower.endsWith("a")) return word.slice(0, -1) + "ie";
  if (wordLower.endsWith("ów")) return word.slice(0, -2) + "owie";
  if (wordLower.endsWith("ń")) return word.slice(0, -1) + "niu";
  if (wordLower.endsWith("w") || wordLower.endsWith("aw") || wordLower.endsWith("ław")) return word + "iu";
  if (wordLower.endsWith("k") || wordLower.endsWith("g")) return word + "u";
  if (wordLower.endsWith("n") || wordLower.endsWith("m") || wordLower.endsWith("l")) return word + "ie";
  if (wordLower.endsWith("i") || wordLower.endsWith("y")) return word.slice(0, -1) + "im";
  
  return word + "ie";
};

const getCityInLocative = (city: string): string => {
  if (!city) return "Twoim mieście";
  
  const cityTrimmed = city.trim();
  
  const fullExceptions: Record<string, string> = {
    "bielsko-biała": "Bielsku-Białej",
    "jastrzębie-zdrój": "Jastrzębiu-Zdroju",
    "nowy sącz": "Nowym Sączu",
    "jelenia góra": "Jeleniej Górze",
    "zielona góra": "Zielonej Górze",
    "gorzów wielkopolski": "Gorzowie Wielkopolskim",
    "ostrów wielkopolski": "Ostrowie Wielkopolskim",
    "ostrów mazowiecka": "Ostrowie Mazowieckim",
    "piotrków trybunalski": "Piotrkowie Trybunalskim",
    "ruda śląska": "Rudzie Śląskiej",
  };
  
  const cityLower = cityTrimmed.toLowerCase();
  if (fullExceptions[cityLower]) return fullExceptions[cityLower];
  
  if (cityTrimmed.includes("-")) {
    return cityTrimmed.split("-").map(part => declineSingleWord(part)).join("-");
  }
  
  if (cityTrimmed.includes(" ")) {
    return cityTrimmed.split(" ").map(word => declineSingleWord(word)).join(" ");
  }
  
  return declineSingleWord(cityTrimmed);
};

// ========== DECORATIVE COMPONENTS (Welcome Pack Style) ==========

const FloatingShapes = () => (
  <>
    <div className="absolute top-10 right-20 w-24 h-24 border-2 border-pink-500/20 rounded-full animate-pulse" />
    <div className="absolute top-32 right-10 w-10 h-10 bg-pink-500/10 rounded-lg rotate-45" />
    <div className="absolute bottom-20 left-16 w-20 h-20 border-2 border-fuchsia-500/20 rounded-xl rotate-12" />
    <div className="absolute bottom-32 right-32 w-8 h-8 bg-pink-400/20 rounded-full" />
    <div className="absolute top-1/2 left-8 w-4 h-4 bg-pink-500/30 rounded-full" />
    <div className="absolute top-20 left-1/3 w-6 h-6 border-2 border-pink-400/30 rotate-45" />
    <div className="absolute bottom-16 right-1/4 w-12 h-12 border border-amber-500/15 rounded-full" />
    <div className="absolute top-1/3 left-12 w-3 h-3 bg-fuchsia-400/40 rounded-full" />
  </>
);

const DotsPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute opacity-25 ${className}`}>
    <div className="grid grid-cols-6 gap-2.5">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400" />
      ))}
    </div>
  </div>
);

const GradientOrbs = () => (
  <>
    <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-pink-500/25 via-fuchsia-500/15 to-transparent blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent blur-[100px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-[80px]" />
    <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-fuchsia-500/10 blur-[60px]" />
  </>
);

const DecorativeLines = () => (
  <>
    <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-pink-500/40 to-transparent" />
    <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-fuchsia-500/30 to-transparent" />
    <div className="absolute top-1/2 right-0 w-32 h-px bg-gradient-to-l from-pink-500/20 to-transparent" />
    <div className="absolute bottom-1/3 left-0 w-24 h-px bg-gradient-to-r from-fuchsia-500/20 to-transparent" />
  </>
);

export const PresentationPreview = ({ data, currentSlide }: PresentationPreviewProps) => {
  const totalSlides = 6;

  // Footer component (Welcome Pack style)
  const Footer = ({ slideNumber }: { slideNumber: number }) => (
    <div className="flex items-center justify-between mt-auto pt-4">
      <div className="flex items-center gap-2">
        <img src={agencyLogo} alt="Aurine" className="w-5 h-5 object-contain opacity-60" />
        <span className="text-zinc-500 text-xs">aurine.pl</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === slideNumber - 1 ? 'w-8 bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'w-1.5 bg-zinc-700'}`} />
        ))}
      </div>
      <span className="text-zinc-500 text-xs font-medium">{slideNumber}/{totalSlides}</span>
    </div>
  );

  // Phone mockup with Facebook Ads (ZACHOWANE)
  const PhoneFacebookAds = () => (
    <div className="absolute top-1/2 right-[12%] -translate-y-1/2">
      <div className="relative w-[280px] h-[560px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[40px] p-3 shadow-2xl shadow-pink-500/20 border border-zinc-700">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
        <div className="w-full h-full bg-gradient-to-b from-zinc-950 to-black rounded-[32px] overflow-hidden relative">
          <div className="h-10 bg-black/50 flex items-center justify-between px-6 pt-2">
            <span className="text-white text-[10px]">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/60 rounded-sm">
                <div className="w-3/4 h-full bg-white/60 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-3">
            <Facebook className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-sm">Menedżer reklam</span>
          </div>
          <div className="p-3 space-y-3">
            <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Flower2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-[10px] font-semibold">{data.salonName || "Twój Salon"}</p>
                  <p className="text-zinc-500 text-[8px]">Sponsorowane</p>
                </div>
              </div>
              <div className="w-full h-32 bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-rose-500/30 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.1)%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="text-center z-10">
                  <Scissors className="w-8 h-8 text-pink-300 mx-auto mb-1" />
                  <p className="text-white text-xs font-medium">Zabieg marzeń</p>
                  <p className="text-pink-300 text-[10px]">-30% do końca tygodnia</p>
                </div>
              </div>
              <p className="text-white text-[9px] mb-2">✨ Umów wizytę już dziś i odkryj prawdziwe piękno!</p>
              <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg py-2 text-center">
                <span className="text-white text-[10px] font-bold">Zarezerwuj teraz</span>
              </div>
            </div>
            <div className="bg-zinc-900/60 rounded-xl p-3 border border-emerald-500/20">
              <p className="text-emerald-400 text-[9px] font-medium mb-2">📊 Wyniki kampanii</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-white text-sm font-bold">2,547</p>
                  <p className="text-zinc-500 text-[8px]">Kliknięcia</p>
                </div>
                <div className="text-center">
                  <p className="text-pink-400 text-sm font-bold">142</p>
                  <p className="text-zinc-500 text-[8px]">Rezerwacje</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-6 -left-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 border border-blue-500/40 flex items-center justify-center shadow-lg">
        <Facebook className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute -bottom-4 -left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-500/40 flex items-center justify-center shadow-lg">
        <Instagram className="w-6 h-6 text-pink-400" />
      </div>
      <div className="absolute top-20 -right-6 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="absolute bottom-24 -right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg">
        <Star className="w-6 h-6 text-amber-400" />
      </div>
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600/25 to-blue-500/15 rounded-lg border border-blue-500/35 flex items-center gap-1.5 backdrop-blur-sm">
          <Facebook className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 text-xs font-medium">Facebook</span>
        </div>
        <div className="px-3 py-1.5 bg-gradient-to-r from-pink-600/25 to-fuchsia-500/15 rounded-lg border border-pink-500/35 flex items-center gap-1.5 backdrop-blur-sm">
          <Instagram className="w-4 h-4 text-pink-400" />
          <span className="text-pink-300 text-xs font-medium">Instagram</span>
        </div>
      </div>
    </div>
  );

  // ==================== SLAJD 1: POWITANIE ====================
  const Slide1 = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DecorativeLines />
      <DotsPattern className="top-16 right-8" />
      <DotsPattern className="bottom-24 left-12" />

      {/* Phone mockup */}
      <PhoneFacebookAds />

      <div className="relative h-full flex flex-col p-10">
        {/* Logo with glow */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/40 blur-xl rounded-full" />
            <img src={agencyLogo} alt="Aurine" className="relative w-12 h-12 object-contain" />
          </div>
          <span className="text-pink-400 font-bold text-xl tracking-wider">AURINE</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-[55%]">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 rounded-full mb-6 w-fit backdrop-blur-sm">
            <Coffee className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Cześć {data.ownerName || "Droga Właścicielko"}!</span>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>

          <h1 className="text-5xl font-black text-white leading-[1.2] mb-4">
            Wiemy, że prowadzenie
          </h1>
          <h1 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              salonu to wyzwanie
            </span>
          </h1>

          <p className="text-xl text-zinc-300 leading-relaxed mb-8 max-w-xl">
            Codziennie dbasz o to, żeby Twoje klientki wychodziły szczęśliwe.
            <span className="text-pink-300 font-medium"> A co z pozyskiwaniem nowych?</span>
          </p>

          {/* Personal info card */}
          <div className="relative group w-fit">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-2xl blur-sm opacity-40" />
            <div className="relative bg-zinc-900 border border-pink-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Ta prezentacja jest dla</p>
                  <p className="text-2xl font-bold text-white">{data.ownerName || "Ciebie"}</p>
                  <p className="text-pink-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {data.salonName || "Twój Salon"}, {data.city || "Twoje miasto"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer slideNumber={1} />
      </div>
    </div>
  );

  // ==================== SLAJD 2: WYZWANIA ====================
  const Slide2 = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DecorativeLines />
      <DotsPattern className="top-10 left-10" />
      <DotsPattern className="bottom-16 right-16" />

      {/* Decorative icons */}
      <div className="absolute top-24 right-24">
        <Instagram className="w-12 h-12 text-pink-500/25" />
      </div>
      <div className="absolute bottom-32 right-20">
        <TrendingUp className="w-10 h-10 text-rose-500/20 rotate-180" />
      </div>

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <span className="text-pink-400 font-bold text-lg tracking-wider">AURINE</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4 w-fit">
            <AlertCircle className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">CZY TO BRZMI ZNAJOMO?</span>
          </div>

          <h2 className="text-5xl font-black text-white mb-3">
            Wyzwania <span className="text-pink-400">właścicielek</span> salonów
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl">
            Wiele właścicielek salonów w mniejszych miastach zmaga się z tymi samymi problemami...
          </p>

          {/* Problems grid */}
          <div className="grid grid-cols-3 gap-5 max-w-5xl">
            {[
              {
                icon: Instagram,
                title: "Post to nie reklama",
                desc: "Algorytm pokazuje Twoje posty tylko 5-10% obserwujących. Reszta nawet nie wie, że coś publikujesz.",
                color: "from-pink-500 to-rose-600"
              },
              {
                icon: TrendingUp,
                title: "Zasięgi spadły o 80%",
                desc: "Kiedyś wystarczyło regularnie postować. Dziś bez płatnej promocji trudno dotrzeć do nowych osób.",
                color: "from-purple-500 to-fuchsia-600"
              },
              {
                icon: Clock,
                title: "Brak czasu i wiedzy",
                desc: "Między zabiegami nie ma czasu na naukę Menedżera reklam. 'Promuj post' to przepalone pieniądze.",
                color: "from-amber-500 to-orange-600"
              }
            ].map((problem, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${problem.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <problem.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{problem.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hopeful message */}
          <div className="mt-6 inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl w-fit">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-zinc-300">
              W {getCityInLocative(data.city)} wciąż <span className="text-emerald-400 font-semibold">niewiele salonów</span> korzysta z reklam. 
              <span className="text-white font-medium"> To Twoja szansa!</span>
            </p>
          </div>
        </div>

        <Footer slideNumber={2} />
      </div>
    </div>
  );

  // ==================== SLAJD 3: JAK POMAGAMY ====================
  const Slide3 = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <DecorativeLines />
      <DotsPattern className="top-20 left-8" />
      <DotsPattern className="bottom-16 right-16" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <span className="text-pink-400 font-bold text-lg tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
            <Target className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">JAK POMAGAMY</span>
          </div>
          <h2 className="text-5xl font-black text-white">
            Reklamy, które <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">naprawdę działają</span>
          </h2>
          <p className="text-zinc-400 text-lg mt-2">Zajmujemy się Twoimi reklamami od A do Z</p>
        </div>

        {/* Benefits grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-5 w-full max-w-5xl">
            {[
              { icon: Target, title: "Precyzyjne dotarcie", desc: "Kobiety 25-45 lat, w promieniu 15 km od Ciebie", color: "from-pink-500 to-rose-600" },
              { icon: Eye, title: "Tysiące wyświetleń", desc: "Zamiast 50 osób, reklamę zobaczy kilka tysięcy", color: "from-blue-500 to-indigo-600" },
              { icon: Sparkles, title: "Piękne kreacje", desc: "Grafiki i teksty zgodne z estetyką Twojego salonu", color: "from-fuchsia-500 to-purple-600" },
              { icon: BarChart3, title: "Przejrzyste raporty", desc: "Co miesiąc jasny raport: zasięgi, kliknięcia, koszty", color: "from-emerald-500 to-teal-600" },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center h-full flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex justify-center">
          <div className="relative group max-w-2xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-2xl blur opacity-30" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                M
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-zinc-300 text-sm italic mb-1">"Po 2 miesiącach współpracy mam pełny grafik! Polecam każdej właścicielce salonu."</p>
                <p className="text-pink-400 text-sm font-medium">Magda, Studio Urody Magda, Nowy Sącz</p>
              </div>
            </div>
          </div>
        </div>

        <Footer slideNumber={3} />
      </div>
    </div>
  );

  // ==================== SLAJD 4: PROCES WSPÓŁPRACY ====================
  const Slide4 = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <DecorativeLines />
      
      <div className="absolute top-20 right-20 w-40 h-40 border-2 border-dashed border-pink-500/15 rounded-full" />
      <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-fuchsia-500/15 rounded-full" />
      
      <DotsPattern className="top-10 left-10" />
      <DotsPattern className="bottom-16 right-16" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <span className="text-pink-400 font-bold text-lg tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
            <Rocket className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">WSPÓŁPRACA</span>
          </div>
          <h2 className="text-5xl font-black text-white">
            Prosty i <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">przejrzysty</span> proces
          </h2>
          <p className="text-zinc-400 text-lg mt-2">Bez skomplikowanych umów i niezrozumiałych terminów</p>
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-4 gap-5 relative">
              <div className="absolute top-12 left-[12%] right-[12%] h-1.5 bg-gradient-to-r from-pink-500/50 via-fuchsia-500/50 to-pink-500/50 rounded-full" />
              
              {[
                { num: "01", title: "Rozmowa", icon: Coffee, desc: "Poznajemy Twój salon i cele", color: "from-pink-500 to-rose-600" },
                { num: "02", title: "Strategia", icon: FileText, desc: "Przygotowujemy plan dopasowany do Ciebie", color: "from-purple-500 to-fuchsia-600" },
                { num: "03", title: "Start", icon: Rocket, desc: "Uruchamiamy kampanie. Ty nie musisz nic robić", color: "from-blue-500 to-indigo-600" },
                { num: "04", title: "Wyniki", icon: LineChart, desc: "Co miesiąc raport z wynikami", color: "from-emerald-500 to-teal-600" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-xl opacity-50 rounded-xl`} />
                    <div className={`relative w-20 h-20 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-pink-500 bg-pink-500/15 px-2.5 py-1 rounded-full mb-2">{step.num}</span>
                  <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-tight">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-zinc-300">
              <span className="text-emerald-400 font-bold">Bez umów na rok.</span> Współpracujemy miesiąc do miesiąca.
              <span className="text-white font-medium"> Możesz zrezygnować kiedy chcesz.</span>
            </p>
          </div>
        </div>

        <Footer slideNumber={4} />
      </div>
    </div>
  );

  // ==================== SLAJD 5: OFERTA ====================
  const Slide5 = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DecorativeLines />
      
      {/* Celebratory decorations */}
      <Sparkle className="absolute top-20 left-24 w-8 h-8 text-pink-400/40" />
      <Star className="absolute top-28 right-32 w-6 h-6 text-amber-400/40 fill-amber-400/40" />
      <Gift className="absolute top-1/3 right-16 w-10 h-10 text-amber-400/30" />
      <Heart className="absolute bottom-1/3 left-20 w-8 h-8 text-pink-400/30" />

      <div className="relative h-full flex flex-col p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
          <span className="text-pink-400 font-bold text-lg tracking-wider">AURINE</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/10 rounded-full border border-amber-500/30 mb-4">
            <Gift className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">SPECJALNA OFERTA</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-5xl font-black text-white mb-2">
            Specjalnie dla <span className="bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">{data.city || "Twojego miasta"}</span>
          </h2>
          <p className="text-zinc-400 text-lg">Sprawdź jak działamy. Bez żadnego ryzyka.</p>
        </div>

        {/* Two offers */}
        <div className="flex-1 flex gap-6 items-center justify-center">
          {/* Free audit */}
          <div className="relative group w-[380px]">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 to-fuchsia-500 rounded-2xl blur opacity-40" />
            <div className="relative bg-zinc-900 rounded-2xl p-6 border border-pink-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1 bg-pink-500/20 rounded-full text-pink-400 text-sm font-bold">GRATIS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Darmowy audyt profilu</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Przeanalizujemy Twój Instagram i Facebook, pokażemy co poprawić.
                <span className="text-pink-300 font-medium"> Bez zobowiązań.</span>
              </p>
              <div className="space-y-2">
                {["Analiza profilu i postów", "Wskazówki do poprawy", "Rekomendacje hashtagów", "Propozycja content planu"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Free trial week */}
          <div className="relative group w-[380px]">
            <div className="absolute -top-4 right-6 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-black text-xs font-bold shadow-lg flex items-center gap-1.5 z-20">
              <Star className="w-3.5 h-3.5 fill-black" />
              <span>TYLKO 2 SALONY Z MIASTA</span>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur opacity-40" />
            <div className="relative bg-zinc-900 rounded-2xl p-6 border border-amber-500/30 mt-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm font-bold">GRATIS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Darmowy tydzień próbny</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Dla <span className="text-amber-400 font-semibold">dwóch pierwszych salonów</span> uruchamiamy kampanię na tydzień za darmo.
              </p>
              <div className="space-y-2">
                {["Pełna konfiguracja kampanii", "Profesjonalne kreacje", "7 dni aktywnej promocji", "Raport z wynikami"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer slideNumber={5} />
      </div>
    </div>
  );

  // ==================== SLAJD 6: KONTAKT ====================
  const Slide6 = () => (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <GradientOrbs />
      <FloatingShapes />
      <DecorativeLines />
      <DotsPattern className="top-16 right-8" />
      <DotsPattern className="bottom-24 left-12" />

      {/* Decorative beauty elements */}
      <div className="absolute top-16 left-20 w-20 h-20 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
        <Flower2 className="w-10 h-10 text-pink-400/50" />
      </div>
      <div className="absolute bottom-24 left-28 w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <Facebook className="w-7 h-7 text-blue-400/50" />
      </div>
      <div className="absolute top-28 right-24 w-16 h-16 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
        <Heart className="w-8 h-8 text-rose-400/50" />
      </div>
      <div className="absolute bottom-32 right-32 w-18 h-18 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
        <Sparkle className="w-8 h-8 text-amber-400/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center p-10">
        {/* Logo with glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-pink-500/40 blur-2xl rounded-full" />
          <img src={agencyLogo} alt="Aurine" className="relative w-20 h-20 object-contain" />
        </div>

        <h2 className="text-5xl font-black text-white text-center mb-3">
          Porozmawiajmy o <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">Twoim salonie</span>
        </h2>

        <p className="text-xl text-zinc-300 text-center max-w-2xl mb-8">
          Chętnie opowiemy więcej o tym, jak możemy pomóc {data.salonName || "Twojemu salonowi"}.
          <span className="text-pink-300"> Odpowiemy na wszystkie pytania!</span>
        </p>

        {/* Contact cards */}
        <div className="flex gap-4 mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl blur opacity-30" />
            <div className="relative bg-zinc-900 rounded-xl p-4 border border-pink-500/25 flex items-center gap-3 min-w-[200px]">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-0.5">Email</p>
                <p className="text-white font-semibold text-sm">kontakt@aurine.pl</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl blur opacity-30" />
            <div className="relative bg-zinc-900 rounded-xl p-4 border border-blue-500/25 flex items-center gap-3 min-w-[200px]">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-0.5">Telefon / WhatsApp</p>
                <p className="text-white font-semibold text-sm">+48 731 856 524</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-xl blur opacity-30" />
            <div className="relative bg-zinc-900 rounded-xl p-4 border border-fuchsia-500/25 flex items-center gap-3 min-w-[200px]">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs mb-0.5">Strona</p>
                <p className="text-white font-semibold text-sm">aurine.pl</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-xl blur opacity-60" />
          <div className="relative bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 rounded-xl px-10 py-4 flex items-center gap-3">
            <span className="text-white font-bold text-lg">Umów się na darmową rozmowę</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Bottom reminder */}
        <div className="flex items-center gap-5 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Darmowy tydzień próbny</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-pink-400" />
            <span>Darmowy audyt profilu</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Bez umów na rok</span>
          </div>
        </div>

        {/* Footer positioned at bottom */}
        <div className="absolute bottom-6 left-10 right-10">
          <Footer slideNumber={6} />
        </div>
      </div>
    </div>
  );

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];
  const CurrentSlideComponent = slides[currentSlide] || Slide1;

  return (
    <div className="w-[1600px] h-[900px] flex-shrink-0 shadow-2xl relative overflow-hidden">
      <CurrentSlideComponent />
    </div>
  );
};
