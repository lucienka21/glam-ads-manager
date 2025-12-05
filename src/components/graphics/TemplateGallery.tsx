import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export type TemplateCategory = 'before-after' | 'promo' | 'testimonial' | 'quote' | 'single' | 'story';

export type TemplateVariant = 
  // Before/After templates
  | 'elegant-split' | 'diagonal-glam' | 'neon-frame' | 'minimal-luxury' | 'bold-contrast' | 'soft-glow'
  | 'vertical-stack' | 'circle-reveal' | 'sliding-compare'
  // Promo templates
  | 'promo-sale' | 'promo-new-service' | 'promo-discount' | 'promo-announcement'
  // Testimonial templates
  | 'testimonial-card' | 'testimonial-photo' | 'testimonial-minimal'
  // Quote templates
  | 'quote-elegant' | 'quote-bold' | 'quote-minimal'
  // Single image templates
  | 'single-hero' | 'single-portfolio' | 'single-feature'
  // Story templates
  | 'story-promo' | 'story-testimonial' | 'story-announcement';

interface Template {
  id: TemplateVariant;
  name: string;
  description: string;
  category: TemplateCategory;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'story';
}

export const TEMPLATE_CATEGORIES: { id: TemplateCategory; name: string; icon: string }[] = [
  { id: 'before-after', name: 'Przed/Po', icon: '↔️' },
  { id: 'promo', name: 'Promocje', icon: '🏷️' },
  { id: 'testimonial', name: 'Opinie', icon: '💬' },
  { id: 'quote', name: 'Cytaty', icon: '✨' },
  { id: 'single', name: 'Portfolio', icon: '📸' },
  { id: 'story', name: 'Stories', icon: '📱' },
];

export const TEMPLATES: Template[] = [
  // Before/After templates
  {
    id: 'elegant-split',
    name: 'Elegancki Podział',
    description: 'Klasyczny podział z neonowymi akcentami',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'diagonal-glam',
    name: 'Diagonalny Glam',
    description: 'Dynamiczne ukośne przejście',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'neon-frame',
    name: 'Neonowa Ramka',
    description: 'Świecąca ramka z efektem glow',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'minimal-luxury',
    name: 'Minimalistyczny Lux',
    description: 'Elegancja w jasnych tonach',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'bold-contrast',
    name: 'Mocny Kontrast',
    description: 'Odważny overlap zdjęć',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'soft-glow',
    name: 'Delikatna Poświata',
    description: 'Miękkie pastelowe tło',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'vertical-stack',
    name: 'Pionowy Stos',
    description: 'Zdjęcia jedno pod drugim',
    category: 'before-after',
    aspectRatio: 'portrait',
  },
  {
    id: 'circle-reveal',
    name: 'Okrągłe Ramki',
    description: 'Efektowne okrągłe zdjęcia',
    category: 'before-after',
    aspectRatio: 'square',
  },
  {
    id: 'sliding-compare',
    name: 'Porównanie',
    description: 'Klasyczne porównanie z podziałem',
    category: 'before-after',
    aspectRatio: 'landscape',
  },
  // Promo templates
  {
    id: 'promo-sale',
    name: 'Wyprzedaż',
    description: 'Promocja z dużym rabatem',
    category: 'promo',
    aspectRatio: 'square',
  },
  {
    id: 'promo-new-service',
    name: 'Nowa Usługa',
    description: 'Prezentacja nowej oferty',
    category: 'promo',
    aspectRatio: 'square',
  },
  {
    id: 'promo-discount',
    name: 'Rabat',
    description: 'Kod rabatowy lub zniżka',
    category: 'promo',
    aspectRatio: 'square',
  },
  {
    id: 'promo-announcement',
    name: 'Ogłoszenie',
    description: 'Ważna informacja',
    category: 'promo',
    aspectRatio: 'square',
  },
  // Testimonial templates
  {
    id: 'testimonial-card',
    name: 'Karta Opinii',
    description: 'Klasyczna karta z opinią klienta',
    category: 'testimonial',
    aspectRatio: 'square',
  },
  {
    id: 'testimonial-photo',
    name: 'Opinia ze Zdjęciem',
    description: 'Opinia z dużym zdjęciem',
    category: 'testimonial',
    aspectRatio: 'square',
  },
  {
    id: 'testimonial-minimal',
    name: 'Minimalna Opinia',
    description: 'Prosta, elegancka forma',
    category: 'testimonial',
    aspectRatio: 'square',
  },
  // Quote templates
  {
    id: 'quote-elegant',
    name: 'Elegancki Cytat',
    description: 'Cytat z ozdobnikami',
    category: 'quote',
    aspectRatio: 'square',
  },
  {
    id: 'quote-bold',
    name: 'Wyrazisty Cytat',
    description: 'Duża, odważna typografia',
    category: 'quote',
    aspectRatio: 'square',
  },
  {
    id: 'quote-minimal',
    name: 'Minimalny Cytat',
    description: 'Prosta forma tekstowa',
    category: 'quote',
    aspectRatio: 'square',
  },
  // Single image templates
  {
    id: 'single-hero',
    name: 'Hero',
    description: 'Duże zdjęcie z tekstem',
    category: 'single',
    aspectRatio: 'square',
  },
  {
    id: 'single-portfolio',
    name: 'Portfolio',
    description: 'Elegancka prezentacja pracy',
    category: 'single',
    aspectRatio: 'square',
  },
  {
    id: 'single-feature',
    name: 'Wyróżnienie',
    description: 'Prezentacja z akcentami',
    category: 'single',
    aspectRatio: 'square',
  },
  // Story templates
  {
    id: 'story-promo',
    name: 'Story Promo',
    description: 'Promocja na Stories',
    category: 'story',
    aspectRatio: 'story',
  },
  {
    id: 'story-testimonial',
    name: 'Story Opinia',
    description: 'Opinia klienta na Stories',
    category: 'story',
    aspectRatio: 'story',
  },
  {
    id: 'story-announcement',
    name: 'Story Ogłoszenie',
    description: 'Ogłoszenie na Stories',
    category: 'story',
    aspectRatio: 'story',
  },
];

interface TemplateGalleryProps {
  selectedTemplate: TemplateVariant;
  onSelectTemplate: (template: TemplateVariant) => void;
  selectedCategory: TemplateCategory | 'all';
  onSelectCategory: (category: TemplateCategory | 'all') => void;
}

function TemplatePreview({ template }: { template: Template }) {
  const getPreviewStyle = () => {
    switch (template.category) {
      case 'before-after':
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center gap-1 p-2">
            <div className="flex-1 h-full bg-zinc-700 rounded" />
            <div className="flex-1 h-full bg-gradient-to-br from-pink-500/50 to-rose-500/50 rounded" />
          </div>
        );
      case 'promo':
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center p-2">
            <div className="text-white text-center">
              <div className="text-lg font-bold">-50%</div>
              <div className="text-[8px] opacity-80">PROMOCJA</div>
            </div>
          </div>
        );
      case 'testimonial':
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center p-2">
            <div className="text-pink-400 text-lg">"</div>
            <div className="w-8 h-8 rounded-full bg-pink-500/30 mt-1" />
          </div>
        );
      case 'quote':
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-2">
            <div className="text-pink-500 text-2xl font-serif">"</div>
          </div>
        );
      case 'single':
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center p-2">
            <div className="w-3/4 h-3/4 bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded" />
          </div>
        );
      case 'story':
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center p-1">
            <div className="w-full h-full border-2 border-white/30 rounded flex items-center justify-center">
              <div className="text-white/60 text-[8px]">9:16</div>
            </div>
          </div>
        );
      default:
        return <div className="w-full h-full bg-zinc-800" />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-lg">
      {getPreviewStyle()}
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

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer transition-all',
            selectedCategory === 'all' && 'bg-primary text-primary-foreground'
          )}
          onClick={() => onSelectCategory('all')}
        >
          Wszystkie
        </Badge>
        {TEMPLATE_CATEGORIES.map((cat) => (
          <Badge
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer transition-all',
              selectedCategory === cat.id && 'bg-primary text-primary-foreground'
            )}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </Badge>
        ))}
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={cn(
              'group relative rounded-xl overflow-hidden transition-all duration-300 aspect-square',
              'hover:ring-2 hover:ring-primary/50 hover:shadow-lg hover:shadow-primary/10',
              selectedTemplate === template.id && 'ring-2 ring-primary shadow-lg shadow-primary/20'
            )}
          >
            <TemplatePreview template={template} />
            
            {/* Overlay with info */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
              'flex flex-col justify-end p-2 transition-opacity',
              'opacity-0 group-hover:opacity-100',
              selectedTemplate === template.id && 'opacity-100'
            )}>
              <h3 className="text-white text-xs font-medium truncate">{template.name}</h3>
              <p className="text-white/60 text-[10px] truncate">{template.description}</p>
            </div>

            {/* Aspect ratio badge */}
            <div className="absolute top-1 left-1">
              <span className={cn(
                'text-[8px] px-1.5 py-0.5 rounded-full',
                template.aspectRatio === 'story' ? 'bg-purple-500/80 text-white' :
                template.aspectRatio === 'portrait' ? 'bg-blue-500/80 text-white' :
                template.aspectRatio === 'landscape' ? 'bg-green-500/80 text-white' :
                'bg-zinc-500/80 text-white'
              )}>
                {template.aspectRatio === 'story' ? '9:16' : 
                 template.aspectRatio === 'portrait' ? '4:5' :
                 template.aspectRatio === 'landscape' ? '16:9' : '1:1'}
              </span>
            </div>

            {/* Selected indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
