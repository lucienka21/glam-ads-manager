import { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Download,
  GraduationCap,
  Building2,
  TrendingUp,
  Camera,
  Percent,
  Quote,
  Flower2,
  Heart,
  Sparkle,
  Star,
  Target,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Award,
  BarChart3,
  Calendar,
  Gift,
  MessageCircle,
  Scissors,
  ThumbsUp,
  Eye,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";
import agencyLogo from "@/assets/agency-logo.png";

const CATEGORIES = [
  { value: "edukacyjne", label: "Edukacyjne", icon: GraduationCap },
  { value: "o-agencji", label: "O agencji", icon: Building2 },
  { value: "case-studies", label: "Case studies", icon: TrendingUp },
  { value: "behind-the-scenes", label: "Behind the scenes", icon: Camera },
  { value: "promocje", label: "Promocje", icon: Percent },
  { value: "cytaty", label: "Cytaty", icon: Quote },
] as const;

interface SocialPost {
  id: string;
  category: string;
  headline: string;
  subheadline?: string;
  points?: string[];
  stat?: { value: string; label: string };
  quote?: { text: string; author: string };
  accentColor: "pink" | "emerald" | "amber" | "blue" | "purple" | "rose";
}

const POSTS: SocialPost[] = [
  // EDUKACYJNE
  {
    id: "edu-1",
    category: "edukacyjne",
    headline: "Post ≠ Reklama",
    subheadline: "Dlaczego organiczne zasięgi to przeszłość",
    points: [
      "Tylko 2-5% obserwujących widzi Twoje posty",
      "Algorytm preferuje płatne treści",
      "Reklamy docierają do tysięcy nowych klientek"
    ],
    accentColor: "emerald",
  },
  {
    id: "edu-2",
    category: "edukacyjne",
    headline: "Ile kosztuje klientka z reklamy?",
    subheadline: "Prawdziwe liczby z kampanii beauty",
    stat: { value: "15-30 zł", label: "średni koszt rezerwacji" },
    points: [
      "Usługa za 200 zł = zwrot x7",
      "Remarketing obniża koszty o 40%"
    ],
    accentColor: "pink",
  },
  {
    id: "edu-3",
    category: "edukacyjne",
    headline: "3 błędy w reklamach beauty",
    subheadline: "Których unikniesz z nami",
    points: [
      "Brak precyzyjnego targetowania",
      "Słabe kreacje bez CTA",
      "Zero remarketingu"
    ],
    accentColor: "rose",
  },
  // O AGENCJI
  {
    id: "agency-1",
    category: "o-agencji",
    headline: "Aurine",
    subheadline: "Agencja stworzona dla branży beauty",
    points: [
      "Specjalizujemy się wyłącznie w salonach",
      "Znamy Twoje wyzwania i klientki",
      "Reklamy, które naprawdę działają"
    ],
    accentColor: "pink",
  },
  {
    id: "agency-2",
    category: "o-agencji",
    headline: "Dlaczego my?",
    subheadline: "To nas wyróżnia od innych agencji",
    points: [
      "Tylko branża beauty – zero kompromisów",
      "Przejrzyste miesięczne raporty",
      "Brak długoterminowych umów"
    ],
    accentColor: "purple",
  },
  {
    id: "agency-3",
    category: "o-agencji",
    headline: "Współpraca bez ryzyka",
    subheadline: "Elastyczne warunki dla Twojego salonu",
    points: [
      "Współpracujemy tak długo, jak jesteś zadowolona",
      "Rezygnacja w dowolnym momencie",
      "Pierwszy tydzień na próbę"
    ],
    accentColor: "emerald",
  },
  // CASE STUDIES
  {
    id: "case-1",
    category: "case-studies",
    headline: "+156%",
    subheadline: "wzrost rezerwacji w 3 miesiące",
    points: [
      "Salon kosmetyczny w Toruniu",
      "Budżet: 2000 zł/mies.",
      "142 nowe klientki"
    ],
    accentColor: "emerald",
  },
  {
    id: "case-2",
    category: "case-studies",
    headline: "47 nowych klientek",
    subheadline: "w pierwszym miesiącu współpracy",
    points: [
      "Studio stylizacji rzęs",
      "Koszt pozyskania: 22 zł/os.",
      "ROAS: 6.8x"
    ],
    accentColor: "pink",
  },
  {
    id: "case-3",
    category: "case-studies",
    headline: "ROAS 8.2x",
    subheadline: "zwrot z każdej zainwestowanej złotówki",
    points: [
      "Salon fryzjerski premium",
      "Średni koszyk: 350 zł",
      "89 rezerwacji miesięcznie"
    ],
    accentColor: "amber",
  },
  // BEHIND THE SCENES
  {
    id: "bts-1",
    category: "behind-the-scenes",
    headline: "Jak tworzymy kreacje?",
    subheadline: "Zakulisowy proces w Aurine",
    points: [
      "Analiza Twojej konkurencji",
      "Badanie grupy docelowej",
      "Grafiki, które konwertują"
    ],
    accentColor: "blue",
  },
  {
    id: "bts-2",
    category: "behind-the-scenes",
    headline: "Codziennie monitorujemy",
    subheadline: "Twoje kampanie pod lupą",
    points: [
      "Optymalizacja budżetu w czasie rzeczywistym",
      "Testy A/B kreacji",
      "Natychmiastowa reakcja na spadki"
    ],
    accentColor: "purple",
  },
  {
    id: "bts-3",
    category: "behind-the-scenes",
    headline: "Raport co miesiąc",
    subheadline: "Pełna przejrzystość wydatków",
    points: [
      "Ile wydane, ile klientek, jaki koszt",
      "Porównanie z poprzednim miesiącem",
      "Rekomendacje na kolejny okres"
    ],
    accentColor: "emerald",
  },
  // PROMOCJE
  {
    id: "promo-1",
    category: "promocje",
    headline: "Darmowy audyt",
    subheadline: "Sprawdź potencjał swojego salonu",
    points: [
      "Analiza Twojego profilu i konkurencji",
      "Konkretne rekomendacje",
      "Bez zobowiązań"
    ],
    accentColor: "pink",
  },
  {
    id: "promo-2",
    category: "promocje",
    headline: "Tydzień próbny",
    subheadline: "Dla pierwszych 2 salonów w mieście",
    points: [
      "Pełna kampania za darmo",
      "Prawdziwe wyniki po 7 dniach",
      "Decyzja należy do Ciebie"
    ],
    accentColor: "amber",
  },
  {
    id: "promo-3",
    category: "promocje",
    headline: "-20% na start",
    subheadline: "Rabat na pierwszy miesiąc",
    points: [
      "Oferta dla nowych klientek",
      "Pełny pakiet usług",
      "Limitowana liczba miejsc"
    ],
    accentColor: "rose",
  },
  // CYTATY
  {
    id: "quote-1",
    category: "cytaty",
    headline: "",
    quote: {
      text: "Klientki same do nas trafiają. Wreszcie mam czas na to, co kocham – zabiegi.",
      author: "Magda, salon w Poznaniu"
    },
    accentColor: "pink",
  },
  {
    id: "quote-2",
    category: "cytaty",
    headline: "",
    quote: {
      text: "Reklamy zwracają się już w pierwszym tygodniu. To była najlepsza decyzja.",
      author: "Karolina Ł., Toruń"
    },
    accentColor: "purple",
  },
  {
    id: "quote-3",
    category: "cytaty",
    headline: "",
    quote: {
      text: "Przestałam szukać klientek – teraz one szukają mnie.",
      author: "Anna, studio rzęs"
    },
    accentColor: "emerald",
  },
];

const accentColors = {
  pink: {
    gradient: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    glow: "shadow-pink-500/20",
    iconBg: "bg-pink-500/15",
  },
  emerald: {
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    iconBg: "bg-emerald-500/15",
  },
  amber: {
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
    iconBg: "bg-amber-500/15",
  },
  blue: {
    gradient: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
    iconBg: "bg-blue-500/15",
  },
  purple: {
    gradient: "from-purple-500/20 to-fuchsia-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
    iconBg: "bg-purple-500/15",
  },
  rose: {
    gradient: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    glow: "shadow-rose-500/20",
    iconBg: "bg-rose-500/15",
  },
};

function PostCard({ post }: { post: SocialPost }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = accentColors[post.accentColor];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        width: 1080,
        height: 1080,
      });
      const link = document.createElement("a");
      link.download = `aurine-${post.id}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Pobrano!");
    } catch {
      toast.error("Błąd pobierania");
    }
  };

  const isQuote = !!post.quote;

  return (
    <div className="group relative">
      {/* Card for export - fixed 1080x1080 internally, displayed smaller */}
      <div
        ref={cardRef}
        style={{ width: 1080, height: 1080 }}
        className="origin-top-left scale-[0.25] sm:scale-[0.28] md:scale-[0.3]"
      >
        <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden p-16 flex flex-col">
          {/* Background glows */}
          <div className={cn(
            "absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-60",
            `bg-gradient-to-bl ${colors.gradient}`
          )} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/10 via-fuchsia-500/5 to-transparent rounded-full blur-[100px]" />

          {/* Floating decorative elements */}
          <div className="absolute top-24 right-24 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/15 to-rose-500/10 border border-pink-500/20 flex items-center justify-center">
            <Flower2 className="w-10 h-10 text-pink-400/70" />
          </div>
          <div className="absolute bottom-32 right-32 w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 border border-fuchsia-500/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-fuchsia-400/70" />
          </div>
          <div className="absolute bottom-24 left-1/2 w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
            <Star className="w-7 h-7 text-amber-400/70" />
          </div>

          {/* Header */}
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/25 flex items-center justify-center">
              <img src={agencyLogo} alt="Aurine" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-pink-400 font-semibold text-2xl tracking-wide">AURINE</p>
              <p className="text-zinc-500 text-lg">Marketing dla branży beauty</p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center relative z-10 py-12">
            {isQuote ? (
              /* Quote layout */
              <div className="max-w-[850px]">
                <div className={cn("w-20 h-20 rounded-2xl mb-10 flex items-center justify-center", colors.iconBg, colors.border, "border")}>
                  <Quote className={cn("w-10 h-10", colors.text)} />
                </div>
                <p 
                  className="text-white text-[52px] leading-tight font-medium mb-10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  „{post.quote!.text}"
                </p>
                <p className={cn("text-2xl font-medium", colors.text)}>
                  — {post.quote!.author}
                </p>
              </div>
            ) : (
              /* Standard layout */
              <div className="max-w-[850px]">
                {/* Headline */}
                {post.stat ? (
                  <div className="mb-8">
                    <p 
                      className={cn("text-[120px] font-bold leading-none", colors.text)}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {post.stat.value}
                    </p>
                    <p className="text-zinc-400 text-3xl mt-2">{post.stat.label}</p>
                  </div>
                ) : (
                  <h2 
                    className="text-white text-[72px] font-bold leading-tight mb-6"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {post.headline}
                  </h2>
                )}

                {post.subheadline && (
                  <p className={cn("text-3xl font-medium mb-12", colors.text)}>
                    {post.subheadline}
                  </p>
                )}

                {/* Points */}
                {post.points && (
                  <div className="space-y-5">
                    {post.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-5">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1",
                          colors.iconBg, colors.border, "border"
                        )}>
                          <CheckCircle className={cn("w-5 h-5", colors.text)} />
                        </div>
                        <p className="text-zinc-300 text-2xl leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <img src={agencyLogo} alt="Aurine" className="w-8 h-8 object-contain opacity-60" />
              <span className="text-zinc-600 text-xl">aurine.pl</span>
            </div>
            <div className={cn(
              "h-2 w-32 rounded-full",
              `bg-gradient-to-r ${colors.gradient.replace('/20', '/40').replace('/10', '/30')}`
            )} />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div 
        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center"
        style={{ 
          width: 'calc(1080px * 0.25)', 
          height: 'calc(1080px * 0.25)',
        }}
      >
        <Button
          variant="secondary"
          className="gap-2"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          Pobierz PNG
        </Button>
      </div>
    </div>
  );
}

export default function SocialMediaLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPosts = selectedCategory === "all"
    ? POSTS
    : POSTS.filter((p) => p.category === selectedCategory);

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Social Media</h1>
          <p className="text-sm text-muted-foreground">
            18 gotowych postów w stylu Aurine • Kliknij aby pobrać PNG (1080×1080)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Wszystkie ({POSTS.length})
          </Button>
          {CATEGORIES.map((cat) => {
            const count = POSTS.filter((p) => p.category === cat.value).length;
            const Icon = cat.icon;
            return (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className="gap-1.5"
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label} ({count})
              </Button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="relative overflow-hidden rounded-xl border border-border/50"
              style={{ 
                width: 'calc(1080px * 0.25)', 
                height: 'calc(1080px * 0.25)',
              }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground border border-border/50">
          <p>
            <strong className="text-foreground">Wskazówka:</strong> Najedź na post i kliknij "Pobierz PNG" aby zapisać grafikę w wysokiej rozdzielczości (1080×1080px).
            Posty są zoptymalizowane pod Instagram i Facebook.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
