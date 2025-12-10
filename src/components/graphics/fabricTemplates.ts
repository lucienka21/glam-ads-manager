import { TemplateData } from './FabricCanvas';

export const fabricTemplates: TemplateData[] = [
  // 1. PRZED I PO - Minimalistyczne porównanie
  {
    id: 'before-after',
    name: 'Przed i Po',
    width: 1080,
    height: 1080,
    elements: [
      // Czarne tło
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: '#000000' } },
      // Zdjęcie PRZED - lewa strona
      { type: 'image', props: { name: 'beforeImage', left: 0, top: 0, width: 535, height: 1080 } },
      // Zdjęcie PO - prawa strona  
      { type: 'image', props: { name: 'afterImage', left: 545, top: 0, width: 535, height: 1080 } },
      // Złota linia środkowa
      { type: 'rect', props: { left: 537, top: 0, width: 6, height: 1080, fill: '#D4AF37' } },
      // Label PRZED
      { type: 'rect', props: { left: 30, top: 30, width: 120, height: 44, fill: '#000000' } },
      { type: 'text', props: { text: 'PRZED', left: 35, top: 38, width: 110, fontSize: 22, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff', textAlign: 'center' } },
      // Label PO
      { type: 'rect', props: { left: 930, top: 30, width: 120, height: 44, fill: '#D4AF37' } },
      { type: 'text', props: { text: 'PO', left: 935, top: 38, width: 110, fontSize: 22, fontFamily: 'Arial', fontWeight: 'bold', fill: '#000000', textAlign: 'center' } },
      // Nazwa zabiegu - dolny pasek
      { type: 'rect', props: { left: 0, top: 980, width: 1080, height: 100, fill: 'rgba(0,0,0,0.85)' } },
      { type: 'text', props: { name: 'treatmentName', text: 'LIFTING TWARZY', left: 40, top: 1005, width: 800, fontSize: 36, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff' } },
      { type: 'text', props: { name: 'salonName', text: '@beautystudio', left: 860, top: 1010, width: 200, fontSize: 24, fontFamily: 'Arial', fill: '#D4AF37', textAlign: 'right' } },
    ],
  },

  // 2. USŁUGA - Zdjęcie hero z eleganckim tekstem
  {
    id: 'service',
    name: 'Usługa',
    width: 1080,
    height: 1080,
    elements: [
      // Tło
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: '#0a0a0a' } },
      // Główne zdjęcie - pełne tło
      { type: 'image', props: { name: 'mainImage', left: 0, top: 0, width: 1080, height: 1080 } },
      // Gradient overlay od dołu
      { type: 'gradient-rect', props: { left: 0, top: 400, width: 1080, height: 680, gradientColors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.95)'], gradientDirection: 'vertical' } },
      // Złota linia akcentowa
      { type: 'rect', props: { left: 60, top: 750, width: 80, height: 4, fill: '#D4AF37' } },
      // Nazwa usługi
      { type: 'text', props: { name: 'serviceName', text: 'MEZOTERAPIA', left: 60, top: 780, width: 900, fontSize: 72, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff' } },
      // Opis
      { type: 'text', props: { name: 'description', text: 'Odmłodzenie i nawilżenie skóry', left: 60, top: 870, width: 600, fontSize: 28, fontFamily: 'Arial', fill: '#a0a0a0' } },
      // Cena
      { type: 'text', props: { name: 'price', text: 'od 299 zł', left: 60, top: 950, width: 300, fontSize: 40, fontFamily: 'Arial', fontWeight: 'bold', fill: '#D4AF37' } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 750, top: 1010, width: 280, fontSize: 20, fontFamily: 'Arial', fill: '#D4AF37', textAlign: 'right', letterSpacing: 3 } },
    ],
  },

  // 3. RABAT - Mocny, przyciągający uwagę
  {
    id: 'discount',
    name: 'Rabat',
    width: 1080,
    height: 1080,
    elements: [
      // Ciemne tło z różowym akcentem
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: ['#1a0510', '#0a0a0a', '#0a0a0a'], gradientDirection: 'diagonal' } },
      // Zdjęcie po prawej
      { type: 'image', props: { name: 'mainImage', left: 450, top: 0, width: 630, height: 1080 } },
      // Gradient na zdjęciu od lewej
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 700, height: 1080, gradientColors: ['#0a0a0a', 'rgba(10,10,10,0)'], gradientDirection: 'horizontal' } },
      // Duża liczba rabatu
      { type: 'text', props: { name: 'discountValue', text: '-30%', left: 40, top: 280, width: 500, fontSize: 200, fontFamily: 'Arial', fontWeight: 'bold', fill: '#FF6B9D' } },
      // Na co rabat
      { type: 'text', props: { name: 'discountOn', text: 'NA ZABIEGI\nPIELĘGNACYJNE', left: 50, top: 550, width: 450, fontSize: 48, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff', lineHeight: 1.1 } },
      // Termin ważności
      { type: 'rect', props: { left: 50, top: 750, width: 250, height: 50, fill: '#FF6B9D', rx: 25 } },
      { type: 'text', props: { name: 'validUntil', text: 'DO 31.12', left: 60, top: 762, width: 230, fontSize: 24, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff', textAlign: 'center' } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 50, top: 980, width: 300, fontSize: 20, fontFamily: 'Arial', fill: '#FF6B9D', letterSpacing: 3 } },
    ],
  },

  // 4. SALON - Elegancka prezentacja marki
  {
    id: 'salon',
    name: 'Salon',
    width: 1080,
    height: 1080,
    elements: [
      // Czarne tło
      { type: 'rect', props: { left: 0, top: 0, width: 1080, height: 1080, fill: '#050505' } },
      // Złota ramka zewnętrzna
      { type: 'rect', props: { left: 30, top: 30, width: 1020, height: 1020, fill: 'transparent', stroke: '#D4AF37', strokeWidth: 1 } },
      // Złota ramka wewnętrzna
      { type: 'rect', props: { left: 50, top: 50, width: 980, height: 980, fill: 'transparent', stroke: '#D4AF37', strokeWidth: 1, opacity: 0.4 } },
      // Zdjęcie w środku
      { type: 'image', props: { name: 'mainImage', left: 100, top: 100, width: 880, height: 500 } },
      // Nazwa salonu - duża
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY\nSTUDIO', left: 100, top: 660, width: 880, fontSize: 120, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff', textAlign: 'center', lineHeight: 0.9 } },
      // Tagline
      { type: 'text', props: { name: 'tagline', text: 'Twoja metamorfoza zaczyna się tutaj', left: 100, top: 930, width: 880, fontSize: 26, fontFamily: 'Arial', fill: '#D4AF37', textAlign: 'center', fontStyle: 'italic' } },
    ],
  },

  // 5. OFERTA LIMITOWANA - Elegancka z urgency
  {
    id: 'limited-offer',
    name: 'Oferta Limitowana',
    width: 1080,
    height: 1080,
    elements: [
      // Gradient tło
      { type: 'gradient-rect', props: { left: 0, top: 0, width: 1080, height: 1080, gradientColors: ['#0a0a0a', '#0f0f0f', '#0a0a0a'], gradientDirection: 'diagonal' } },
      // Dekoracyjne złote linie
      { type: 'rect', props: { left: 0, top: 0, width: 4, height: 1080, fill: '#D4AF37' } },
      { type: 'rect', props: { left: 1076, top: 0, width: 4, height: 1080, fill: '#D4AF37' } },
      // Badge "TYLKO TERAZ"
      { type: 'rect', props: { left: 60, top: 80, width: 220, height: 45, fill: '#D4AF37' } },
      { type: 'text', props: { text: 'TYLKO TERAZ', left: 70, top: 90, width: 200, fontSize: 22, fontFamily: 'Arial', fontWeight: 'bold', fill: '#000000', textAlign: 'center' } },
      // Nazwa oferty
      { type: 'text', props: { name: 'offerName', text: 'MAKIJAŻ\nPERMANENTNY', left: 60, top: 200, width: 960, fontSize: 90, fontFamily: 'Arial', fontWeight: 'bold', fill: '#ffffff', lineHeight: 0.95 } },
      // Stara cena przekreślona
      { type: 'text', props: { name: 'oldPrice', text: '799 zł', left: 60, top: 480, width: 200, fontSize: 36, fontFamily: 'Arial', fill: '#666666', textDecoration: 'line-through' } },
      // Nowa cena
      { type: 'text', props: { name: 'newPrice', text: '499 zł', left: 60, top: 530, width: 400, fontSize: 80, fontFamily: 'Arial', fontWeight: 'bold', fill: '#D4AF37' } },
      // Opis
      { type: 'text', props: { name: 'description', text: 'Brwi, usta lub kreski', left: 60, top: 650, width: 500, fontSize: 28, fontFamily: 'Arial', fill: '#a0a0a0' } },
      // CTA
      { type: 'rect', props: { left: 60, top: 750, width: 350, height: 70, fill: '#D4AF37' } },
      { type: 'text', props: { name: 'cta', text: 'UMÓW WIZYTĘ', left: 70, top: 770, width: 330, fontSize: 28, fontFamily: 'Arial', fontWeight: 'bold', fill: '#000000', textAlign: 'center' } },
      // Salon
      { type: 'text', props: { name: 'salonName', text: 'BEAUTY STUDIO', left: 60, top: 980, width: 300, fontSize: 20, fontFamily: 'Arial', fill: '#D4AF37', letterSpacing: 3 } },
    ],
  },
];

export const getTemplateById = (id: string): TemplateData | undefined => {
  return fabricTemplates.find(t => t.id === id);
};