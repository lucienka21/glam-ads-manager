import { useCallback } from 'react';
import { toPng, toJpeg } from 'html-to-image';

interface ThumbnailOptions {
  elementId: string;
  format?: 'png' | 'jpeg';
  backgroundColor?: string;
  pixelRatio?: number;
  quality?: number;
  maxRetries?: number;
  retryDelay?: number;
  width?: number;
  height?: number;
}

/**
 * Hook for generating thumbnails with robust retry logic
 * Creates a clean clone at full size for accurate capture without black space
 */
export function useThumbnailGenerator() {
  
  const generateThumbnail = useCallback(async ({
    elementId,
    format = 'jpeg',
    backgroundColor = '#000000',
    pixelRatio = 0.2,
    quality = 0.7,
    maxRetries = 3,
    retryDelay = 300,
    width = 1600,
    height = 900,
  }: ThumbnailOptions): Promise<string | null> => {
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        const element = document.getElementById(elementId);
        if (!element) {
          console.warn(`Thumbnail attempt ${attempt + 1}: Element ${elementId} not found`);
          continue;
        }

        // Create hidden container for clean capture
        const container = document.createElement('div');
        container.style.cssText = `position: fixed; top: -10000px; left: -10000px; width: ${width}px; height: ${height}px; overflow: hidden;`;
        document.body.appendChild(container);

        // Clone element at full size
        const clone = element.cloneNode(true) as HTMLElement;
        clone.style.cssText = `width: ${width}px; height: ${height}px; transform: none; position: relative;`;
        container.appendChild(clone);

        await new Promise(resolve => setTimeout(resolve, 100));

        const options = {
          cacheBust: true,
          pixelRatio,
          backgroundColor,
          quality,
          width,
          height,
        };

        const dataUrl = format === 'jpeg' 
          ? await toJpeg(clone, options)
          : await toPng(clone, options);
        
        // Cleanup
        document.body.removeChild(container);
        
        console.log(`Thumbnail generated successfully on attempt ${attempt + 1}`);
        return dataUrl;
        
      } catch (error) {
        console.warn(`Thumbnail attempt ${attempt + 1} failed:`, error);
      }
    }
    
    console.error(`Failed to generate thumbnail after ${maxRetries} attempts`);
    return null;
  }, []);

  return { generateThumbnail };
}
