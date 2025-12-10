import { TemplateData } from './FabricCanvas';

// Color palette
const COLORS = {
  black: '#0a0a0a',
  darkGray: '#1a1a1a',
  gold: '#D4AF37',
  pink: '#FF6B9D',
  white: '#ffffff',
  lightGray: '#a3a3a3',
};

export const fabricTemplates: TemplateData[] = [
  // 1. Elegant Service Promo
  {
    id: 'elegant-service',
    name: 'Elegancka Usługa',
    width: 1080,
    height: 1080,
    elements: [
      // Background
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: ['#0a0a0a', '#1a1a1a', '#0a0a0a'], gradientDirection: 'diagonal' } },
      // Image placeholder
      { type: 'image', props: { name: 'mainImage', left: 0, top: 0, width: 1080, height: 650 } },
      // Bottom dark overlay
      { type: 'gradient-rect', props: { left: 0, top: 550, width: 1080, height: 530, gradientColors: ['transparent', '#0a0a0a'], gradientDirection: 'vertical' } },
      // Gold accent line
      { type: 'rect', props: { left: 60, top: 720, width: 120, height: 4, fill: COLORS.gold } },
      // Service name
      { type: 'text', props: { name: 'serviceName', text: 'MEZOTERAPIA IGŁOWA', left: 60, top: 750, width: 960, fontSize: 64, fontFamily: 'Arial Black', fontWeight: 'bold', fill: COLORS.white, textAlign: 'left' } },
      // Description
      { type: 'text', props: { name: 'description', text: 'Odmłodzenie i regeneracja skóry', left: 60, top: 840, width: 700, fontSize: 32, fontFamily: 'Arial', fill: COLORS.lightGray, textAlign: 'left' } },
      // Price box
      { type: 'rect', props: { left: 800, top: 820, width: 220, height: 80, fill: COLORS.gold, rx: 8 } },
      { type: 'text', props: { name: 'price', text: '299 zł', left: 810, top: 835, width: 200, fontSize: 42, fontFamily: 'Arial Black', fill: COLORS.black, textAlign: 'center' } },
      // Salon name
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 970, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 2. Before/After Split
  {
    id: 'before-after',
    name: 'Przed i Po',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: COLORS.black } },
      // Left image (before)
      { type: 'image', props: { name: 'beforeImage', left: 0, top: 100, width: 530, height: 800 } },
      // Right image (after)
      { type: 'image', props: { name: 'afterImage', left: 550, top: 100, width: 530, height: 800 } },
      // Center divider
      { type: 'rect', props: { left: 535, top: 100, width: 10, height: 800, fill: COLORS.gold } },
      // Before label
      { type: 'rect', props: { left: 30, top: 130, width: 140, height: 50, fill: COLORS.black, rx: 4 } },
      { type: 'text', props: { text: 'PRZED', left: 40, top: 140, width: 120, fontSize: 28, fontFamily: 'Arial Black', fill: COLORS.white, textAlign: 'center' } },
      // After label
      { type: 'rect', props: { left: 910, top: 130, width: 140, height: 50, fill: COLORS.gold, rx: 4 } },
      { type: 'text', props: { text: 'PO', left: 920, top: 140, width: 120, fontSize: 28, fontFamily: 'Arial Black', fill: COLORS.black, textAlign: 'center' } },
      // Treatment name
      { type: 'text', props: { name: 'treatmentName', text: 'LIFTING TWARZY', left: 40, top: 930, width: 700, fontSize: 48, fontFamily: 'Arial Black', fill: COLORS.white } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 40, top: 1000, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 3. Bold Discount
  {
    id: 'bold-discount',
    name: 'Rabat',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: ['#1a0a10', '#0a0a0a'], gradientDirection: 'diagonal' } },
      // Image
      { type: 'image', props: { name: 'mainImage', left: 500, top: 0, width: 580, height: 1080 } },
      // Left dark overlay
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 700, height: 1080, gradientColors: ['#0a0a0a', 'transparent'], gradientDirection: 'horizontal' } },
      // Discount number
      { type: 'text', props: { name: 'discountNumber', text: '-30', left: 40, top: 250, width: 500, fontSize: 280, fontFamily: 'Arial Black', fill: COLORS.pink } },
      { type: 'text', props: { text: '%', left: 420, top: 320, width: 150, fontSize: 120, fontFamily: 'Arial Black', fill: COLORS.pink } },
      // On what
      { type: 'text', props: { name: 'discountOn', text: 'NA ZABIEGI\nNA TWARZ', left: 60, top: 580, width: 500, fontSize: 56, fontFamily: 'Arial Black', fill: COLORS.white, lineHeight: 1.1 } },
      // Valid until
      { type: 'rect', props: { left: 60, top: 780, width: 300, height: 60, fill: COLORS.pink, rx: 30 } },
      { type: 'text', props: { name: 'validUntil', text: 'DO 31.12', left: 70, top: 793, width: 280, fontSize: 32, fontFamily: 'Arial Black', fill: COLORS.white, textAlign: 'center' } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 970, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.pink, letterSpacing: 4 } },
    ],
  },

  // 4. New Service Launch
  {
    id: 'new-service',
    name: 'Nowość',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: COLORS.black } },
      // Full image
      { type: 'image', props: { name: 'mainImage', left: 0, top: 0, width: 1080, height: 1080 } },
      // Dark overlay
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: ['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.8)'], gradientDirection: 'vertical' } },
      // "NOWOŚĆ" badge
      { type: 'rect', props: { left: 60, top: 60, width: 200, height: 60, fill: COLORS.gold, rx: 4 } },
      { type: 'text', props: { text: 'NOWOŚĆ', left: 70, top: 73, width: 180, fontSize: 32, fontFamily: 'Arial Black', fill: COLORS.black, textAlign: 'center' } },
      // Service name
      { type: 'text', props: { name: 'serviceName', text: 'HYDRAFACIAL', left: 60, top: 800, width: 960, fontSize: 80, fontFamily: 'Arial Black', fill: COLORS.white } },
      // Description
      { type: 'text', props: { name: 'description', text: 'Głębokie nawilżenie i oczyszczenie', left: 60, top: 900, width: 700, fontSize: 32, fontFamily: 'Arial', fill: COLORS.lightGray } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 980, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 5. Result Showcase
  {
    id: 'result-showcase',
    name: 'Efekt',
    width: 1080,
    height: 1350,
    elements: [
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1350, fill: COLORS.black } },
      // Main image
      { type: 'image', props: { name: 'mainImage', left: 0, top: 0, width: 1080, height: 1100 } },
      // Bottom gradient
      { type: 'gradient-rect', props: { left: 0, top: 900, width: 1080, height: 450, gradientColors: ['transparent', COLORS.black], gradientDirection: 'vertical' } },
      // Gold line
      { type: 'rect', props: { left: 60, top: 1130, width: 80, height: 4, fill: COLORS.gold } },
      // Treatment
      { type: 'text', props: { name: 'treatmentName', text: 'KERATYNOWE PROSTOWANIE', left: 60, top: 1160, width: 960, fontSize: 48, fontFamily: 'Arial Black', fill: COLORS.white } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 1250, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 6. Limited Offer
  {
    id: 'limited-offer',
    name: 'Oferta Limitowana',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: [COLORS.black, '#0f0f0f'], gradientDirection: 'vertical' } },
      // Decorative circles
      { type: 'circle', props: { left: -100, top: -100, radius: 300, fill: 'transparent', stroke: COLORS.gold, strokeWidth: 1, opacity: 0.3 } },
      { type: 'circle', props: { left: 800, top: 700, radius: 400, fill: 'transparent', stroke: COLORS.gold, strokeWidth: 1, opacity: 0.2 } },
      // Top label
      { type: 'text', props: { text: 'OFERTA LIMITOWANA', left: 60, top: 80, width: 500, fontSize: 20, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 6 } },
      // Main headline
      { type: 'text', props: { name: 'headline', text: 'MAKIJAŻ\nPERMANENTNY', left: 60, top: 200, width: 960, fontSize: 100, fontFamily: 'Arial Black', fill: COLORS.white, lineHeight: 1 } },
      // Old price
      { type: 'text', props: { name: 'oldPrice', text: '699 zł', left: 60, top: 500, width: 200, fontSize: 40, fontFamily: 'Arial', fill: COLORS.lightGray, textDecoration: 'line-through' } },
      // New price
      { type: 'text', props: { name: 'newPrice', text: '499 zł', left: 60, top: 560, width: 400, fontSize: 80, fontFamily: 'Arial Black', fill: COLORS.gold } },
      // CTA box
      { type: 'rect', props: { left: 60, top: 720, width: 400, height: 80, fill: COLORS.gold, rx: 8 } },
      { type: 'text', props: { name: 'cta', text: 'UMÓW WIZYTĘ', left: 70, top: 740, width: 380, fontSize: 32, fontFamily: 'Arial Black', fill: COLORS.black, textAlign: 'center' } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 970, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 7. Treatment Details
  {
    id: 'treatment-details',
    name: 'Szczegóły Zabiegu',
    width: 1080,
    height: 1350,
    elements: [
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1350, fill: COLORS.black } },
      // Image
      { type: 'image', props: { name: 'mainImage', left: 0, top: 0, width: 1080, height: 700 } },
      // Gradient overlay
      { type: 'gradient-rect', props: { left: 0, top: 500, width: 1080, height: 850, gradientColors: ['transparent', COLORS.black], gradientDirection: 'vertical' } },
      // Treatment category
      { type: 'text', props: { name: 'category', text: 'PIELĘGNACJA TWARZY', left: 60, top: 750, width: 500, fontSize: 18, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
      // Treatment name
      { type: 'text', props: { name: 'treatmentName', text: 'PEELING\nKAWITACYJNY', left: 60, top: 790, width: 960, fontSize: 72, fontFamily: 'Arial Black', fill: COLORS.white, lineHeight: 1 } },
      // Description
      { type: 'text', props: { name: 'description', text: 'Głębokie oczyszczanie skóry przy pomocy ultradźwięków. Bezbolesna procedura odpowiednia dla każdego typu cery.', left: 60, top: 980, width: 700, fontSize: 28, fontFamily: 'Arial', fill: COLORS.lightGray, lineHeight: 1.4 } },
      // Price
      { type: 'text', props: { name: 'price', text: '199 zł', left: 60, top: 1150, width: 300, fontSize: 56, fontFamily: 'Arial Black', fill: COLORS.gold } },
      // Duration
      { type: 'text', props: { name: 'duration', text: '45 min', left: 300, top: 1170, width: 200, fontSize: 28, fontFamily: 'Arial', fill: COLORS.lightGray } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 1280, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 8. Booking Call
  {
    id: 'booking-call',
    name: 'Rezerwacja',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: ['#1a0a15', '#0a0a0a', '#0a1015'], gradientDirection: 'diagonal' } },
      // Decorative elements
      { type: 'rect', props: { left: 0, top: 0, width: 4, height: 1080, fill: COLORS.pink } },
      { type: 'rect', props: { left: 1076, top: 0, width: 4, height: 1080, fill: COLORS.pink } },
      // Main headline
      { type: 'text', props: { name: 'headline', text: 'UMÓW\nWIZYTĘ', left: 80, top: 250, width: 920, fontSize: 140, fontFamily: 'Arial Black', fill: COLORS.white, lineHeight: 0.95 } },
      // Subtitle
      { type: 'text', props: { name: 'subtitle', text: 'Wolne terminy w tym tygodniu', left: 80, top: 600, width: 700, fontSize: 36, fontFamily: 'Arial', fill: COLORS.lightGray } },
      // Phone
      { type: 'rect', props: { left: 80, top: 720, width: 450, height: 80, fill: COLORS.pink, rx: 8 } },
      { type: 'text', props: { name: 'phone', text: '📞 500 123 456', left: 90, top: 740, width: 430, fontSize: 36, fontFamily: 'Arial Black', fill: COLORS.white, textAlign: 'center' } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 80, top: 970, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.pink, letterSpacing: 4 } },
    ],
  },

  // 9. Seasonal Promo
  {
    id: 'seasonal-promo',
    name: 'Promocja Sezonowa',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: COLORS.black } },
      // Background image
      { type: 'image', props: { name: 'mainImage', left: 0, top: 0, width: 1080, height: 1080 } },
      // Dark overlay
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: 'rgba(0,0,0,0.6)' } },
      // Season label
      { type: 'rect', props: { left: 60, top: 100, width: 250, height: 50, fill: COLORS.gold, rx: 25 } },
      { type: 'text', props: { name: 'seasonLabel', text: '❄️ ZIMOWA', left: 70, top: 112, width: 230, fontSize: 26, fontFamily: 'Arial Black', fill: COLORS.black, textAlign: 'center' } },
      // Headline
      { type: 'text', props: { name: 'headline', text: 'PROMOCJA', left: 60, top: 400, width: 960, fontSize: 120, fontFamily: 'Arial Black', fill: COLORS.white } },
      // Discount
      { type: 'text', props: { name: 'discount', text: '-25%', left: 60, top: 540, width: 500, fontSize: 160, fontFamily: 'Arial Black', fill: COLORS.gold } },
      // On what
      { type: 'text', props: { name: 'discountOn', text: 'na wszystkie zabiegi', left: 60, top: 740, width: 600, fontSize: 36, fontFamily: 'Arial', fill: COLORS.lightGray } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 970, width: 400, fontSize: 24, fontFamily: 'Arial', fill: COLORS.gold, letterSpacing: 4 } },
    ],
  },

  // 10. Brand Awareness
  {
    id: 'brand-awareness',
    name: 'Marka',
    width: 1080,
    height: 1080,
    elements: [
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: [COLORS.black, '#0d0d0d', COLORS.black], gradientDirection: 'diagonal' } },
      // Gold frame
      { type: 'rect', props: { left: 40, top: 40, width: 1000, height: 1000, fill: 'transparent', stroke: COLORS.gold, strokeWidth: 2 } },
      { type: 'rect', props: { left: 60, top: 60, width: 960, height: 960, fill: 'transparent', stroke: COLORS.gold, strokeWidth: 1, opacity: 0.5 } },
      // Image
      { type: 'image', props: { name: 'mainImage', left: 100, top: 100, width: 880, height: 550 } },
      // Salon name big
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY\nSTUDIO', left: 100, top: 700, width: 880, fontSize: 110, fontFamily: 'Arial Black', fill: COLORS.white, textAlign: 'center', lineHeight: 0.95 } },
      // Tagline
      { type: 'text', props: { name: 'tagline', text: 'Twoja metamorfoza zaczyna się tutaj', left: 100, top: 950, width: 880, fontSize: 28, fontFamily: 'Arial', fill: COLORS.gold, textAlign: 'center' } },
    ],
  },
];

export const getTemplateById = (id: string): TemplateData | undefined => {
  return fabricTemplates.find(t => t.id === id);
};