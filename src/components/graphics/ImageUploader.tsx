import { useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  label: string;
  image: string | null;
  onImageChange: (image: string | null) => void;
  className?: string;
}

export function ImageUploader({ label, image, onImageChange, className }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Plik jest za duży. Maksymalny rozmiar to 10MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Plik jest za duży. Maksymalny rozmiar to 10MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageChange(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {image ? (
        <div 
          className="relative group rounded-xl overflow-hidden aspect-square bg-muted cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Zmień
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="shadow-lg"
              onClick={handleRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Checkmark indicator */}
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={cn(
            'w-full aspect-square rounded-xl border-2 border-dashed',
            'flex flex-col items-center justify-center gap-3',
            'transition-all duration-200',
            'border-border/50 bg-muted/30',
            'hover:border-pink-500/50 hover:bg-pink-500/5',
            'focus:outline-none focus:ring-2 focus:ring-pink-500/50',
            'group cursor-pointer'
          )}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center group-hover:from-pink-500/30 group-hover:to-rose-500/30 transition-all">
            <Camera className="w-7 h-7 text-pink-500/70 group-hover:text-pink-500 transition-colors" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Kliknij lub przeciągnij zdjęcie
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">
              JPG, PNG • max 10MB
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
