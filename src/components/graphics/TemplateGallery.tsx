import { cn } from '@/lib/utils';
import { BeforeAfterTemplate } from './templates/BeforeAfterTemplate';

export type TemplateVariant = 'elegant-split' | 'diagonal-glam' | 'neon-frame' | 'minimal-luxury' | 'bold-contrast' | 'soft-glow';

interface Template {
  id: TemplateVariant;
  name: string;
  description: string;
  category: 'dark' | 'light' | 'colorful';
}

export const TEMPLATES: Template[] = [
  {
    id: 'elegant-split',
    name: 'Elegancki Podział',
    description: 'Klasyczny podział z neonowymi akcentami',
    category: 'dark',
  },
  {
    id: 'diagonal-glam',
    name: 'Diagonalny Glam',
    description: 'Dynamiczne ukośne przejście',
    category: 'dark',
  },
  {
    id: 'neon-frame',
    name: 'Neonowa Ramka',
    description: 'Świecąca ramka z efektem glow',
    category: 'dark',
  },
  {
    id: 'minimal-luxury',
    name: 'Minimalistyczny Lux',
    description: 'Elegancja w jasnych tonach',
    category: 'light',
  },
  {
    id: 'bold-contrast',
    name: 'Mocny Kontrast',
    description: 'Odważny overlap zdjęć',
    category: 'dark',
  },
  {
    id: 'soft-glow',
    name: 'Delikatna Poświata',
    description: 'Miękkie pastelowe tło',
    category: 'light',
  },
];

interface TemplateGalleryProps {
  selectedTemplate: TemplateVariant;
  onSelectTemplate: (template: TemplateVariant) => void;
}

export function TemplateGallery({ selectedTemplate, onSelectTemplate }: TemplateGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelectTemplate(template.id)}
          className={cn(
            'group relative rounded-xl overflow-hidden transition-all duration-300',
            'hover:ring-2 hover:ring-primary/50 hover:shadow-lg hover:shadow-primary/10',
            selectedTemplate === template.id && 'ring-2 ring-primary shadow-lg shadow-primary/20'
          )}
        >
          {/* Template preview */}
          <div className="aspect-square">
            <BeforeAfterTemplate
              variant={template.id}
              beforeImage={null}
              afterImage={null}
              headline=""
              className="pointer-events-none"
            />
          </div>
          
          {/* Overlay with info */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
            'flex flex-col justify-end p-3 transition-opacity',
            'opacity-0 group-hover:opacity-100',
            selectedTemplate === template.id && 'opacity-100'
          )}>
            <h3 className="text-white text-sm font-medium">{template.name}</h3>
            <p className="text-white/60 text-xs">{template.description}</p>
          </div>

          {/* Selected indicator */}
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
