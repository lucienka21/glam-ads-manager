import { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Download,
  Filter,
  GraduationCap,
  Building2,
  TrendingUp,
  Camera,
  Percent,
  Quote,
  ZoomIn,
  ZoomOut,
  X,
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
  title: string;
  subtitle?: string;
  content?: string;
  accent?: string;
  variant: "gradient" | "dark" | "light" | "quote";
}

const POSTS: SocialPost[] = [
  // EDUKACYJNE
  {
    id: "edu-1",
    category: "edukacyjne",
    title: "Post ≠ Reklama",
    subtitle: "Organiczne zasięgi to przeszłość",
    content: "Tylko 2-5% Twoich obserwujących widzi Twoje posty. Reklamy docierają do tysięcy nowych klientek.",
    variant: "gradient",
  },
  {
    id: "edu-2",
    category: "edukacyjne",
    title: "Ile kosztuje klientka z reklamy?",
    subtitle: "Prawdziwe liczby",
    content: "Średnio 15-30 zł za rezerwację. Przy usługach za 200+ zł to zwrot x7.",
    variant: "dark",
  },
  {
    id: "edu-3",
    category: "edukacyjne",
    title: "3 błędy w reklamach beauty",
    subtitle: "Których unikniesz z nami",
    content: "1. Brak targetowania\n2. Słabe kreacje\n3. Brak remarketingu",
    variant: "light",
  },
  // O AGENCJI
  {
    id: "agency-1",
    category: "o-agencji",
    title: "Aurine",
    subtitle: "Agencja dla salonów beauty",
    content: "Specjalizujemy się wyłącznie w branży beauty. Znamy Twoje wyzwania.",
    variant: "gradient",
  },
  {
    id: "agency-2",
    category: "o-agencji",
    title: "Dlaczego my?",
    subtitle: "To nas wyróżnia",
    content: "✓ Tylko branża beauty\n✓ Przejrzyste raporty\n✓ Brak długich umów",
    variant: "dark",
  },
  {
    id: "agency-3",
    category: "o-agencji",
    title: "Współpraca bez ryzyka",
    subtitle: "Elastyczne warunki",
    content: "Współpracujemy tak długo, jak jesteś zadowolona z efektów.",
    variant: "light",
  },
  // CASE STUDIES
  {
    id: "case-1",
    category: "case-studies",
    title: "+156%",
    subtitle: "wzrost rezerwacji",
    content: "Salon kosmetyczny w Toruniu. 3 miesiące współpracy.",
    accent: "rezerwacji",
    variant: "gradient",
  },
  {
    id: "case-2",
    category: "case-studies",
    title: "47 nowych klientek",
    subtitle: "w pierwszym miesiącu",
    content: "Studio stylizacji rzęs. Budżet: 1500 zł/mies.",
    variant: "dark",
  },
  {
    id: "case-3",
    category: "case-studies",
    title: "ROAS 8.2x",
    subtitle: "zwrot z inwestycji",
    content: "Salon fryzjerski premium. Każda złotówka zwróciła się 8-krotnie.",
    variant: "light",
  },
  // BEHIND THE SCENES
  {
    id: "bts-1",
    category: "behind-the-scenes",
    title: "Jak tworzymy kreacje?",
    subtitle: "Zakulisowy proces",
    content: "Badamy Twoją konkurencję, analizujemy grupę docelową, projektujemy grafiki, które konwertują.",
    variant: "gradient",
  },
  {
    id: "bts-2",
    category: "behind-the-scenes",
    title: "Codziennie monitorujemy",
    subtitle: "Twoje kampanie",
    content: "Optymalizujemy budżet, testujemy kreacje, reagujemy na zmiany.",
    variant: "dark",
  },
  {
    id: "bts-3",
    category: "behind-the-scenes",
    title: "Raport co miesiąc",
    subtitle: "Pełna przejrzystość",
    content: "Dokładne dane: ile wydane, ile klientek, jaki koszt. Bez ukrytych kosztów.",
    variant: "light",
  },
  // PROMOCJE
  {
    id: "promo-1",
    category: "promocje",
    title: "Darmowy audyt",
    subtitle: "Sprawdź potencjał swojego salonu",
    content: "Bezpłatna analiza Twojego profilu i konkurencji. Bez zobowiązań.",
    variant: "gradient",
  },
  {
    id: "promo-2",
    category: "promocje",
    title: "Tydzień próbny",
    subtitle: "Dla pierwszych 2 salonów w mieście",
    content: "Przetestuj nasze reklamy przez tydzień za darmo.",
    variant: "dark",
  },
  {
    id: "promo-3",
    category: "promocje",
    title: "-20% na start",
    subtitle: "Dla nowych klientek",
    content: "Pierwszy miesiąc współpracy ze zniżką. Oferta limitowana.",
    variant: "light",
  },
  // CYTATY
  {
    id: "quote-1",
    category: "cytaty",
    title: '"Klientki same do nas trafiają"',
    subtitle: "— Magda, salon w Poznaniu",
    variant: "quote",
  },
  {
    id: "quote-2",
    category: "cytaty",
    title: '"Wreszcie mam czas na zabiegi, nie na szukanie klientek"',
    subtitle: "— Karolina Ł., Toruń",
    variant: "quote",
  },
  {
    id: "quote-3",
    category: "cytaty",
    title: '"Reklamy zwracają się już w pierwszym tygodniu"',
    subtitle: "— Anna, studio rzęs",
    variant: "quote",
  },
];

function PostCard({ post, onDownload }: { post: SocialPost; onDownload: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
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

  return (
    <div className="group relative">
      {/* Actual card for export */}
      <div
        ref={cardRef}
        className={cn(
          "aspect-square w-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative",
          post.variant === "gradient" && "bg-gradient-to-br from-[#FF6B9D] via-[#C44569] to-[#8B2F4F] text-white",
          post.variant === "dark" && "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] text-white",
          post.variant === "light" && "bg-gradient-to-br from-[#fff5f7] via-[#ffe4ec] to-[#ffd1dc] text-[#8B2F4F]",
          post.variant === "quote" && "bg-gradient-to-br from-[#2d1f3d] via-[#1a1a2e] to-[#0f0f23] text-white"
        )}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            post.variant === "light" ? "bg-[#C44569]/10" : "bg-white/10"
          )}>
            <img src={agencyLogo} alt="Aurine" className="w-5 h-5" />
          </div>
          <span className={cn(
            "text-sm font-semibold",
            post.variant === "light" ? "text-[#C44569]" : "text-white/80"
          )}>
            Aurine
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center relative z-10 py-4">
          {post.variant === "quote" ? (
            <>
              <p className="text-xl md:text-2xl font-medium leading-snug mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {post.title}
              </p>
              {post.subtitle && (
                <p className="text-sm text-white/60">{post.subtitle}</p>
              )}
            </>
          ) : (
            <>
              <h3 className={cn(
                "text-2xl md:text-3xl font-bold mb-2 leading-tight",
                post.variant === "light" && "text-[#8B2F4F]"
              )} style={{ fontFamily: "'Playfair Display', serif" }}>
                {post.title}
              </h3>
              {post.subtitle && (
                <p className={cn(
                  "text-sm md:text-base font-medium mb-3",
                  post.variant === "light" ? "text-[#C44569]" : "text-white/80"
                )}>
                  {post.subtitle}
                </p>
              )}
              {post.content && (
                <p className={cn(
                  "text-xs md:text-sm leading-relaxed whitespace-pre-line",
                  post.variant === "light" ? "text-[#8B2F4F]/80" : "text-white/70"
                )}>
                  {post.content}
                </p>
              )}
            </>
          )}
        </div>

        {/* Bottom accent */}
        <div className={cn(
          "h-1 w-16 rounded-full relative z-10",
          post.variant === "light" ? "bg-[#C44569]" : "bg-white/30"
        )} />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
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
  const [previewPost, setPreviewPost] = useState<SocialPost | null>(null);

  const filteredPosts = selectedCategory === "all"
    ? POSTS
    : POSTS.filter((p) => p.category === selectedCategory);

  const getCategoryLabel = (value: string) =>
    CATEGORIES.find((c) => c.value === value)?.label || value;

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Social Media</h1>
            <p className="text-sm text-muted-foreground">
              18 gotowych postów w stylu Aurine • Pobierz i publikuj
            </p>
          </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDownload={() => {}}
            />
          ))}
        </div>

        {/* Info */}
        <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
          <p>
            <strong>Wskazówka:</strong> Najedź na post i kliknij "Pobierz PNG" aby zapisać grafikę w wysokiej rozdzielczości (1080x1080px).
            Posty są zoptymalizowane pod Instagram i Facebook.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
