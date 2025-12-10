export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'image' | 'price' | 'percentage';
  placeholder?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'promo' | 'result' | 'price' | 'seasonal' | 'brand';
  aspectRatio: '1:1' | '4:5';
  width: number;
  height: number;
  fields: TemplateField[];
}

export const templates: Template[] = [
  {
    id: 'elegant-promo',
    name: 'Promo',
    description: 'Minimalistyczna promocja',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Twoja metamorfoza' },
      { name: 'subtitle', label: 'Podtytuł', type: 'text', placeholder: 'Umów wizytę już dziś' },
    ],
  },
  {
    id: 'before-after',
    name: 'Przed / Po',
    description: 'Porównanie efektów',
    category: 'result',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'beforeImage', label: 'Zdjęcie przed', type: 'image' },
      { name: 'afterImage', label: 'Zdjęcie po', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Nazwa zabiegu', type: 'text', placeholder: 'Profesjonalna metamorfoza' },
    ],
  },
  {
    id: 'service-highlight',
    name: 'Usługa',
    description: 'Prezentacja zabiegu z ceną',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Nazwa usługi', type: 'text', placeholder: 'Luksusowy zabieg na twarz' },
      { name: 'price', label: 'Cena', type: 'price', placeholder: '299' },
    ],
  },
  {
    id: 'flash-sale',
    name: 'Rabat',
    description: 'Promocja procentowa',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie tła', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'discount', label: 'Rabat (%)', type: 'percentage', placeholder: '30' },
      { name: 'service', label: 'Na co', type: 'text', placeholder: 'Na wszystkie zabiegi' },
      { name: 'validUntil', label: 'Ważność', type: 'text', placeholder: 'Tylko do końca tygodnia' },
    ],
  },
  {
    id: 'new-look',
    name: 'Efekt',
    description: 'Prezentacja metamorfozy',
    category: 'result',
    aspectRatio: '4:5',
    width: 540,
    height: 675,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Nowy wymiar piękna' },
      { name: 'service', label: 'Usługa', type: 'text', placeholder: 'Profesjonalna stylizacja' },
    ],
  },
  {
    id: 'price-list',
    name: 'Cennik',
    description: 'Lista usług z cenami',
    category: 'price',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Cennik usług' },
      { name: 'service1', label: 'Usługa 1', type: 'text', placeholder: 'Strzyżenie damskie' },
      { name: 'price1', label: 'Cena 1', type: 'price', placeholder: '120' },
      { name: 'service2', label: 'Usługa 2', type: 'text', placeholder: 'Koloryzacja' },
      { name: 'price2', label: 'Cena 2', type: 'price', placeholder: '250' },
      { name: 'service3', label: 'Usługa 3', type: 'text', placeholder: 'Stylizacja' },
      { name: 'price3', label: 'Cena 3', type: 'price', placeholder: '80' },
    ],
  },
  {
    id: 'quote-inspiration',
    name: 'Cytat',
    description: 'Inspirujący cytat',
    category: 'brand',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie tła', type: 'image' },
      { name: 'quote', label: 'Cytat', type: 'text', placeholder: 'Piękno zaczyna się od decyzji bycia sobą' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
    ],
  },
  {
    id: 'holiday-special',
    name: 'Voucher',
    description: 'Bon prezentowy',
    category: 'seasonal',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'occasion', label: 'Okazja', type: 'text', placeholder: 'Oferta specjalna' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Voucher prezentowy' },
      { name: 'value', label: 'Wartość', type: 'price', placeholder: '500' },
    ],
  },
  {
    id: 'vip-treatment',
    name: 'Premium',
    description: 'Ekskluzywna oferta',
    category: 'promo',
    aspectRatio: '4:5',
    width: 540,
    height: 675,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Ekskluzywny zabieg' },
      { name: 'description', label: 'Opis', type: 'text', placeholder: 'Doświadcz luksusu i profesjonalnej pielęgnacji' },
      { name: 'price', label: 'Cena od', type: 'price', placeholder: '399' },
    ],
  },
  {
    id: 'testimonial',
    name: 'Opinia',
    description: 'Opinia klientki',
    category: 'brand',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie tła', type: 'image' },
      { name: 'salon', label: 'Nazwa salonu', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'review', label: 'Opinia', type: 'text', placeholder: 'Najlepszy salon w mieście. Profesjonalna obsługa i wspaniałe efekty.' },
      { name: 'clientName', label: 'Imię klientki', type: 'text', placeholder: 'Anna K.' },
    ],
  },
];

export { ElegantPromo } from './ElegantPromo';
export { BeforeAfter } from './BeforeAfter';
export { TestimonialCard } from './TestimonialCard';
export { ServiceHighlight } from './ServiceHighlight';
export { FlashSale } from './FlashSale';
export { NewLook } from './NewLook';
export { PriceList } from './PriceList';
export { QuoteInspiration } from './QuoteInspiration';
export { HolidaySpecial } from './HolidaySpecial';
export { VipTreatment } from './VipTreatment';
