import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type TemplateCategory = 'metamorfoza' | 'promocja' | 'oferta' | 'efekt' | 'rezerwacja';

export type TemplateVariant = 
  // Metamorfoza (Before/After) - główna kategoria
  | 'meta-glamour' | 'meta-neon' | 'meta-luxury' | 'meta-diagonal' | 'meta-circle' | 'meta-minimal' 
  | 'meta-dark' | 'meta-gold' | 'meta-pastel' | 'meta-bold' | 'meta-story' | 'meta-wide'
  // Promocja/Rabat
  | 'promo-neon' | 'promo-elegant' | 'promo-bold' | 'promo-flash' | 'promo-story'
  // Oferta specjalna
  | 'offer-luxury' | 'offer-seasonal' | 'offer-package' | 'offer-vip' | 'offer-story'
  // Efekt/Rezultat
  | 'effect-glow' | 'effect-wow' | 'effect-premium' | 'effect-story'
  // Rezerwacja
  | 'book-now' | 'book-limited' | 'book-story';

interface Template {
  id: TemplateVariant;
  name: string;
  description: string;
  category: TemplateCategory;
  aspectRatio: '1:1' | '4:5' | '9:16' | '16:9';
}

export const TEMPLATE_CATEGORIES: { id: TemplateCategory; name: string; icon: string; description: string }[] = [
  { id: 'metamorfoza', name: 'Metamorfozy', icon: '✨', description: 'Przed i po zabiegu' },
  { id: 'promocja', name: 'Promocje', icon: '🔥', description: 'Rabaty i wyprzedaże' },
  { id: 'oferta', name: 'Oferty', icon: '💎', description: 'Pakiety i oferty specjalne' },
  { id: 'efekt', name: 'Efekty', icon: '⭐', description: 'Prezentacja rezultatów' },
  { id: 'rezerwacja', name: 'Rezerwacje', icon: '📅', description: 'CTA do rezerwacji' },
];

export const TEMPLATES: Template[] = [
  // METAMORFOZY - 12 szablonów
  { id: 'meta-glamour', name: 'Glamour', description: 'Elegancki split z neonowym akcentem', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-neon', name: 'Neon Glow', description: 'Świecące ramki z efektem glow', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-luxury', name: 'Luxury Gold', description: 'Złote akcenty premium', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-diagonal', name: 'Diagonal Cut', description: 'Dynamiczne ukośne cięcie', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-circle', name: 'Circle Frame', description: 'Okrągłe ramki z efektem', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-minimal', name: 'Minimal Chic', description: 'Minimalistyczna elegancja', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-dark', name: 'Dark Mode', description: 'Ciemna estetyka premium', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-gold', name: 'Rose Gold', description: 'Różowe złoto i blask', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-pastel', name: 'Soft Pastel', description: 'Delikatne pastelowe tło', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-bold', name: 'Bold Impact', description: 'Mocny kontrast i overlap', category: 'metamorfoza', aspectRatio: '1:1' },
  { id: 'meta-story', name: 'Story Format', description: 'Format pionowy 9:16', category: 'metamorfoza', aspectRatio: '9:16' },
  { id: 'meta-wide', name: 'Wide Banner', description: 'Szeroki format 16:9', category: 'metamorfoza', aspectRatio: '16:9' },
  // PROMOCJE - 5 szablonów
  { id: 'promo-neon', name: 'Neon Sale', description: 'Neonowy efekt wyprzedaży', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-elegant', name: 'Elegant Promo', description: 'Elegancka promocja', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-bold', name: 'Bold Discount', description: 'Mocny rabat w centrum', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-flash', name: 'Flash Sale', description: 'Błyskawiczna promocja', category: 'promocja', aspectRatio: '1:1' },
  { id: 'promo-story', name: 'Promo Story', description: 'Promocja na Stories', category: 'promocja', aspectRatio: '9:16' },
  // OFERTY - 5 szablonów
  { id: 'offer-luxury', name: 'Luxury Package', description: 'Pakiet premium', category: 'oferta', aspectRatio: '1:1' },
  { id: 'offer-seasonal', name: 'Seasonal', description: 'Oferta sezonowa', category: 'oferta', aspectRatio: '1:1' },
  { id: 'offer-package', name: 'Bundle Deal', description: 'Pakiet usług', category: 'oferta', aspectRatio: '1:1' },
  { id: 'offer-vip', name: 'VIP Offer', description: 'Ekskluzywna oferta VIP', category: 'oferta', aspectRatio: '1:1' },
  { id: 'offer-story', name: 'Offer Story', description: 'Oferta na Stories', category: 'oferta', aspectRatio: '9:16' },
  // EFEKTY - 4 szablony
  { id: 'effect-glow', name: 'Glow Effect', description: 'Efekt blasku', category: 'efekt', aspectRatio: '1:1' },
  { id: 'effect-wow', name: 'WOW Result', description: 'Spektakularny efekt', category: 'efekt', aspectRatio: '1:1' },
  { id: 'effect-premium', name: 'Premium Look', description: 'Premium prezentacja', category: 'efekt', aspectRatio: '1:1' },
  { id: 'effect-story', name: 'Effect Story', description: 'Efekt na Stories', category: 'efekt', aspectRatio: '9:16' },
  // REZERWACJE - 3 szablony
  { id: 'book-now', name: 'Book Now', description: 'Zarezerwuj teraz', category: 'rezerwacja', aspectRatio: '1:1' },
  { id: 'book-limited', name: 'Limited Spots', description: 'Ostatnie miejsca', category: 'rezerwacja', aspectRatio: '1:1' },
  { id: 'book-story', name: 'Book Story', description: 'Rezerwacja na Stories', category: 'rezerwacja', aspectRatio: '9:16' },
];

interface TemplateGalleryProps {
  selectedTemplate: TemplateVariant;
  onSelectTemplate: (template: TemplateVariant) => void;
  selectedCategory: TemplateCategory | 'all';
  onSelectCategory: (category: TemplateCategory | 'all') => void;
}

function TemplatePreviewMini({ template }: { template: Template }) {
  const getAspectClass = () => {
    switch (template.aspectRatio) {
      case '9:16': return 'aspect-[9/16]';
      case '16:9': return 'aspect-video';
      case '4:5': return 'aspect-[4/5]';
      default: return 'aspect-square';
    }
  };

  const getPreviewContent = () => {
    if (template.category === 'metamorfoza') {
      return (
        <div className="absolute inset-1 flex gap-0.5 rounded overflow-hidden">
          <div className="flex-1 bg-gradient-to-br from-zinc-600 to-zinc-700" />
          <div className="w-px bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          <div className="flex-1 bg-gradient-to-br from-pink-500/30 to-rose-500/30" />
        </div>
      );
    }
    if (template.category === 'promocja') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center">
          <span className="text-white font-black text-lg">%</span>
        </div>
      );
    }
    if (template.category === 'oferta') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <span className="text-white font-black text-sm">VIP</span>
        </div>
      );
    }
    if (template.category === 'efekt') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
          <span className="text-white text-lg">✨</span>
        </div>
      );
    }
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
        <span className="text-white font-bold text-xs">📅</span>
      </div>
    );
  };

  return (
    <div className={cn('relative bg-zinc-800 rounded-lg overflow-hidden', getAspectClass())}>
      {getPreviewContent()}
    </div>
  );
}

export function TemplateGallery({ 
  selectedTemplate, 
  onSelectTemplate,
  selectedCategory,
  onSelectCategory
}: TemplateGalleryProps) {
  const filteredTemplates = selectedCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === selectedCategory);

  const getCategoryCount = (catId: TemplateCategory) => TEMPLATES.filter(t => t.category === catId).length;

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onSelectCategory('all')}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
            selectedCategory === 'all' 
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          )}
        >
          Wszystkie ({TEMPLATES.length})
        </button>
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1',
              selectedCategory === cat.id 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="opacity-60">({getCategoryCount(cat.id)})</span>
          </button>
        ))}
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={cn(
              'group relative rounded-lg overflow-hidden transition-all duration-200 p-1',
              'hover:bg-primary/10',
              selectedTemplate === template.id && 'bg-primary/20 ring-2 ring-primary'
            )}
          >
            <TemplatePreviewMini template={template} />
            
            {/* Info */}
            <div className="mt-1 text-left">
              <p className="text-[10px] font-medium text-foreground truncate">{template.name}</p>
              <p className="text-[8px] text-muted-foreground">{template.aspectRatio}</p>
            </div>

            {/* Selected */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
