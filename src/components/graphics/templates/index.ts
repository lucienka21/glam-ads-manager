// Graphics Creator Templates Registry

export type TemplateCategory = 
  | 'promotion' 
  | 'metamorphosis' 
  | 'testimonial' 
  | 'service' 
  | 'seasonal';

export type AspectRatio = '1:1' | '4:5' | '9:16';

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  aspectRatio: AspectRatio;
  width: number;
  height: number;
  fields: TemplateField[];
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'image' | 'price' | 'percentage';
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}

// Template dimensions based on aspect ratio
export const DIMENSIONS: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1080, height: 1080 },
  '4:5': { width: 1080, height: 1350 },
  '9:16': { width: 1080, height: 1920 },
};

// Category labels
export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  promotion: 'Promocje',
  metamorphosis: 'Metamorfozy',
  testimonial: 'Opinie',
  service: 'Usługi',
  seasonal: 'Sezonowe',
};

// All template configurations
export const TEMPLATES: TemplateConfig[] = [
  // 1. Elegant Promotion (1:1)
  {
    id: 'elegant-promo',
    name: 'Elegancka Promocja',
    description: 'Minimalistyczna promocja z akcentem różowym',
    category: 'promotion',
    aspectRatio: '1:1',
    width: 1080,
    height: 1080,
    fields: [
      { id: 'image', label: 'Zdjęcie', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'headline', label: 'Nagłówek', type: 'text', defaultValue: 'Wyjątkowa Promocja' },
      { id: 'discount', label: 'Rabat', type: 'percentage', defaultValue: '-30%' },
      { id: 'oldPrice', label: 'Stara cena', type: 'price', defaultValue: '299 zł' },
      { id: 'newPrice', label: 'Nowa cena', type: 'price', defaultValue: '199 zł' },
      { id: 'cta', label: 'Przycisk', type: 'text', defaultValue: 'Rezerwuj' },
    ],
  },
  // 2. Before/After (4:5)
  {
    id: 'before-after',
    name: 'Przed i Po',
    description: 'Efektowne porównanie metamorfozy',
    category: 'metamorphosis',
    aspectRatio: '4:5',
    width: 1080,
    height: 1350,
    fields: [
      { id: 'imageBefore', label: 'Zdjęcie PRZED', type: 'image', required: true },
      { id: 'imageAfter', label: 'Zdjęcie PO', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'service', label: 'Nazwa usługi', type: 'text', defaultValue: 'Stylizacja włosów' },
    ],
  },
  // 3. Testimonial Card (1:1)
  {
    id: 'testimonial-card',
    name: 'Opinia Klientki',
    description: 'Elegancka karta z opinią',
    category: 'testimonial',
    aspectRatio: '1:1',
    width: 1080,
    height: 1080,
    fields: [
      { id: 'image', label: 'Zdjęcie klientki', type: 'image' },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'quote', label: 'Treść opinii', type: 'text', defaultValue: 'Najlepszy salon w mieście! Profesjonalna obsługa i niesamowite efekty.' },
      { id: 'author', label: 'Imię klientki', type: 'text', defaultValue: 'Anna K.' },
      { id: 'rating', label: 'Ocena (1-5)', type: 'text', defaultValue: '5' },
    ],
  },
  // 4. Service Highlight (1:1)
  {
    id: 'service-highlight',
    name: 'Usługa Premium',
    description: 'Prezentacja pojedynczej usługi',
    category: 'service',
    aspectRatio: '1:1',
    width: 1080,
    height: 1080,
    fields: [
      { id: 'image', label: 'Zdjęcie', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'service', label: 'Nazwa usługi', type: 'text', defaultValue: 'Keratynowe prostowanie' },
      { id: 'description', label: 'Opis', type: 'text', defaultValue: 'Gładkie, lśniące włosy przez 3-6 miesięcy' },
      { id: 'price', label: 'Cena', type: 'price', defaultValue: 'od 399 zł' },
      { id: 'duration', label: 'Czas zabiegu', type: 'text', defaultValue: '2-3h' },
    ],
  },
  // 5. Flash Sale Story (9:16)
  {
    id: 'flash-sale',
    name: 'Błyskawiczna Wyprzedaż',
    description: 'Story z pilną promocją',
    category: 'promotion',
    aspectRatio: '9:16',
    width: 1080,
    height: 1920,
    fields: [
      { id: 'image', label: 'Zdjęcie', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'headline', label: 'Nagłówek', type: 'text', defaultValue: 'TYLKO DZIŚ!' },
      { id: 'discount', label: 'Rabat', type: 'percentage', defaultValue: '-50%' },
      { id: 'service', label: 'Usługa', type: 'text', defaultValue: 'Wszystkie zabiegi' },
      { id: 'cta', label: 'CTA', type: 'text', defaultValue: 'Zarezerwuj teraz ⬆️' },
    ],
  },
  // 6. New Look Reveal (4:5)
  {
    id: 'new-look',
    name: 'Nowy Wygląd',
    description: 'Efektowna prezentacja metamorfozy',
    category: 'metamorphosis',
    aspectRatio: '4:5',
    width: 1080,
    height: 1350,
    fields: [
      { id: 'image', label: 'Zdjęcie efektu', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'headline', label: 'Nagłówek', type: 'text', defaultValue: 'Nowy Wygląd' },
      { id: 'subheadline', label: 'Podtytuł', type: 'text', defaultValue: 'Twoja metamorfoza zaczyna się tutaj' },
      { id: 'service', label: 'Usługa', type: 'text', defaultValue: 'Koloryzacja + stylizacja' },
    ],
  },
  // 7. Price List Mini (1:1)
  {
    id: 'price-list',
    name: 'Mini Cennik',
    description: 'Prezentacja kilku usług z cenami',
    category: 'service',
    aspectRatio: '1:1',
    width: 1080,
    height: 1080,
    fields: [
      { id: 'image', label: 'Zdjęcie tła', type: 'image' },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'title', label: 'Tytuł', type: 'text', defaultValue: 'Nasze Usługi' },
      { id: 'service1', label: 'Usługa 1', type: 'text', defaultValue: 'Strzyżenie damskie' },
      { id: 'price1', label: 'Cena 1', type: 'price', defaultValue: '89 zł' },
      { id: 'service2', label: 'Usługa 2', type: 'text', defaultValue: 'Koloryzacja' },
      { id: 'price2', label: 'Cena 2', type: 'price', defaultValue: '249 zł' },
      { id: 'service3', label: 'Usługa 3', type: 'text', defaultValue: 'Keratyna' },
      { id: 'price3', label: 'Cena 3', type: 'price', defaultValue: '399 zł' },
    ],
  },
  // 8. Quote Inspiration (1:1)
  {
    id: 'quote-inspiration',
    name: 'Inspirujący Cytat',
    description: 'Motywacyjny cytat z eleganckim tłem',
    category: 'testimonial',
    aspectRatio: '1:1',
    width: 1080,
    height: 1080,
    fields: [
      { id: 'image', label: 'Zdjęcie tła', type: 'image' },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'quote', label: 'Cytat', type: 'text', defaultValue: 'Piękno zaczyna się od chwili, gdy zdecydujesz się być sobą' },
      { id: 'author', label: 'Autor', type: 'text', defaultValue: 'Coco Chanel' },
    ],
  },
  // 9. Holiday Special (4:5)
  {
    id: 'holiday-special',
    name: 'Świąteczna Oferta',
    description: 'Elegancka promocja świąteczna',
    category: 'seasonal',
    aspectRatio: '4:5',
    width: 1080,
    height: 1350,
    fields: [
      { id: 'image', label: 'Zdjęcie', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'headline', label: 'Nagłówek', type: 'text', defaultValue: 'Świąteczna Magia' },
      { id: 'subheadline', label: 'Podtytuł', type: 'text', defaultValue: 'Przygotuj się na święta!' },
      { id: 'discount', label: 'Rabat', type: 'percentage', defaultValue: '-25%' },
      { id: 'cta', label: 'CTA', type: 'text', defaultValue: 'Zarezerwuj' },
    ],
  },
  // 10. VIP Treatment (9:16)
  {
    id: 'vip-treatment',
    name: 'Zabieg VIP',
    description: 'Luksusowa prezentacja usługi premium',
    category: 'service',
    aspectRatio: '9:16',
    width: 1080,
    height: 1920,
    fields: [
      { id: 'image', label: 'Zdjęcie', type: 'image', required: true },
      { id: 'salon', label: 'Nazwa salonu', type: 'text', defaultValue: 'Beauty Studio' },
      { id: 'badge', label: 'Badge', type: 'text', defaultValue: 'PREMIUM' },
      { id: 'service', label: 'Nazwa zabiegu', type: 'text', defaultValue: 'Luxury Hair Spa' },
      { id: 'description', label: 'Opis', type: 'text', defaultValue: 'Kompleksowa regeneracja włosów z użyciem ekskluzywnych składników' },
      { id: 'price', label: 'Cena', type: 'price', defaultValue: '599 zł' },
      { id: 'cta', label: 'CTA', type: 'text', defaultValue: 'Umów wizytę' },
    ],
  },
];

export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: TemplateCategory): TemplateConfig[] => {
  return TEMPLATES.filter(t => t.category === category);
};
