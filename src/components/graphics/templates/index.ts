export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'image' | 'price' | 'percentage';
  placeholder?: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'promo' | 'result' | 'offer';
  aspectRatio: '1:1' | '4:5';
  width: number;
  height: number;
  fields: TemplateField[];
}

export const templates: Template[] = [
  {
    id: 'service-promo',
    name: 'Usługa',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Usługa', type: 'text', placeholder: 'Mezoterapia igłowa' },
      { name: 'price', label: 'Cena', type: 'price', placeholder: '299' },
    ],
  },
  {
    id: 'before-after',
    name: 'Przed / Po',
    category: 'result',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'beforeImage', label: 'Przed', type: 'image' },
      { name: 'afterImage', label: 'Po', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Zabieg', type: 'text', placeholder: 'Lifting twarzy' },
    ],
  },
  {
    id: 'discount',
    name: 'Rabat',
    category: 'offer',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'discount', label: 'Rabat', type: 'percentage', placeholder: '30' },
      { name: 'service', label: 'Na co', type: 'text', placeholder: 'Zabiegi na twarz' },
    ],
  },
  {
    id: 'new-service',
    name: 'Nowość',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Nowa usługa', type: 'text', placeholder: 'Hydrafacial' },
      { name: 'price', label: 'Cena', type: 'price', placeholder: '349' },
    ],
  },
  {
    id: 'result',
    name: 'Efekt',
    category: 'result',
    aspectRatio: '4:5',
    width: 540,
    height: 675,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Zabieg', type: 'text', placeholder: 'Keratynowe prostowanie' },
    ],
  },
  {
    id: 'limited-offer',
    name: 'Oferta',
    category: 'offer',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Usługa', type: 'text', placeholder: 'Makijaż permanentny' },
      { name: 'price', label: 'Cena', type: 'price', placeholder: '499' },
      { name: 'oldPrice', label: 'Stara cena', type: 'price', placeholder: '699' },
    ],
  },
  {
    id: 'treatment',
    name: 'Zabieg',
    category: 'promo',
    aspectRatio: '4:5',
    width: 540,
    height: 675,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'service', label: 'Zabieg', type: 'text', placeholder: 'Peeling kawitacyjny' },
      { name: 'description', label: 'Opis', type: 'text', placeholder: 'Głębokie oczyszczanie skóry' },
      { name: 'price', label: 'Cena', type: 'price', placeholder: '199' },
    ],
  },
  {
    id: 'booking',
    name: 'Rezerwacja',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Umów wizytę' },
      { name: 'subtitle', label: 'Podtytuł', type: 'text', placeholder: 'Wolne terminy w tym tygodniu' },
    ],
  },
  {
    id: 'seasonal',
    name: 'Sezon',
    category: 'offer',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'title', label: 'Tytuł', type: 'text', placeholder: 'Letnia promocja' },
      { name: 'discount', label: 'Rabat', type: 'percentage', placeholder: '25' },
    ],
  },
  {
    id: 'brand',
    name: 'Marka',
    category: 'promo',
    aspectRatio: '1:1',
    width: 540,
    height: 540,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'salon', label: 'Salon', type: 'text', placeholder: 'Beauty Studio' },
      { name: 'tagline', label: 'Hasło', type: 'text', placeholder: 'Twoja metamorfoza' },
    ],
  },
  {
    id: 'photo-ad',
    name: 'Zdjęcie + Tekst',
    category: 'promo',
    aspectRatio: '1:1',
    width: 1080,
    height: 1080,
    fields: [
      { name: 'image', label: 'Zdjęcie', type: 'image' },
      { name: 'headline', label: 'Nagłówek', type: 'text', placeholder: 'UWAGA KOBIETO' },
      { name: 'subheadline', label: 'Podtytuł', type: 'text', placeholder: 'Odbierz hair plan, czyli spersonalizowany plan pielęgnacyjny włosów!' },
      { name: 'tagline', label: 'Hasło (biały)', type: 'text', placeholder: 'Twój wizerunek' },
      { name: 'taglineAccent', label: 'Hasło (złoty)', type: 'text', placeholder: 'zaczyna się od fryzury!' },
      { name: 'logoText', label: 'Logo/Nazwa', type: 'text', placeholder: 'Beauty Studio' },
    ],
  },
];

export { ServicePromo } from './ServicePromo';
export { BeforeAfter } from './BeforeAfter';
export { Discount } from './Discount';
export { NewService } from './NewService';
export { Result } from './Result';
export { LimitedOffer } from './LimitedOffer';
export { Treatment } from './Treatment';
export { Booking } from './Booking';
export { Seasonal } from './Seasonal';
export { Brand } from './Brand';
export { default as PhotoAd } from './PhotoAd';
