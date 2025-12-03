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
}

/**
 * Hook for generating thumbnails with robust retry logic
 * Handles hidden elements by temporarily making them visible
 */
export function useThumbnailGenerator() {
  
  const generateThumbnail = useCallback(async ({
    elementId,
    format = 'png',
    backgroundColor = '#000000',
    pixelRatio = 0.25,
    quality = 0.8,
    maxRetries = 5,
    retryDelay = 600,
  }: ThumbnailOptions): Promise<string | null> => {
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Wait a bit for rendering
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        const element = document.getElementById(elementId);
        if (!element) {
          console.warn(`Thumbnail attempt ${attempt + 1}: Element ${elementId} not found`);
          continue;
        }

        // Get the container (parent) to make visible during capture
        const container = element.parentElement;
        
        // Store original styles
        const originalContainerStyles = container ? {
          visibility: container.style.visibility,
          zIndex: container.style.zIndex,
        } : null;
        
        // Make container visible for capture
        if (container) {
          container.style.visibility = 'visible';
          container.style.zIndex = '99999';
        }
        
        // Wait for browser to render
        await new Promise(resolve => setTimeout(resolve, 100));

        // Generate thumbnail
        const options = {
          cacheBust: true,
          pixelRatio,
          backgroundColor,
          quality,
          width: 1600,
          height: 900,
        };

        const dataUrl = format === 'jpeg' 
          ? await toJpeg(element, options)
          : await toPng(element, options);
        
        // Restore original styles
        if (container && originalContainerStyles) {
          container.style.visibility = originalContainerStyles.visibility;
          container.style.zIndex = originalContainerStyles.zIndex;
        }
        
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
