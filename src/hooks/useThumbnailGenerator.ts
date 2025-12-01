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
 * Waits for element to be fully rendered before capturing
 */
export function useThumbnailGenerator() {
  
  const waitForElement = useCallback((elementId: string, timeout = 5000): Promise<HTMLElement | null> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkElement = () => {
        const element = document.getElementById(elementId);
        
        if (element) {
          // Check if element has dimensions (is rendered)
          const rect = element.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            resolve(element);
            return;
          }
        }
        
        if (Date.now() - startTime < timeout) {
          requestAnimationFrame(checkElement);
        } else {
          resolve(null);
        }
      };
      
      checkElement();
    });
  }, []);

  const generateThumbnail = useCallback(async ({
    elementId,
    format = 'png',
    backgroundColor = '#09090b',
    pixelRatio = 0.3,
    quality = 0.8,
    maxRetries = 3,
    retryDelay = 500,
  }: ThumbnailOptions): Promise<string | null> => {
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Wait for element to be ready
        const element = await waitForElement(elementId);
        
        if (!element) {
          console.warn(`Thumbnail attempt ${attempt + 1}: Element ${elementId} not found`);
          if (attempt < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            continue;
          }
          return null;
        }

        // Small delay to ensure any animations/transitions are complete
        await new Promise(resolve => setTimeout(resolve, 100));

        // Generate thumbnail
        const options = {
          cacheBust: true,
          pixelRatio,
          backgroundColor,
          quality,
        };

        const dataUrl = format === 'jpeg' 
          ? await toJpeg(element, options)
          : await toPng(element, options);
        
        return dataUrl;
        
      } catch (error) {
        console.warn(`Thumbnail attempt ${attempt + 1} failed:`, error);
        
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }
    
    console.error(`Failed to generate thumbnail after ${maxRetries} attempts`);
    return null;
  }, [waitForElement]);

  return { generateThumbnail };
}
