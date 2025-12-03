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
  landscape?: boolean;
  width?: number;
  height?: number;
}

/**
 * Hook for generating thumbnails with robust retry logic
 * Handles off-screen elements by temporarily moving them into view
 */
export function useThumbnailGenerator() {
  
  const waitForElement = useCallback((elementId: string, timeout = 5000): Promise<HTMLElement | null> => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkElement = () => {
        const element = document.getElementById(elementId);
        
        if (element) {
          // For off-screen elements, check computed dimensions instead of getBoundingClientRect
          const computedStyle = window.getComputedStyle(element);
          const hasWidth = parseInt(computedStyle.width) > 0 || element.offsetWidth > 0;
          const hasHeight = parseInt(computedStyle.height) > 0 || element.offsetHeight > 0;
          
          if (hasWidth && hasHeight) {
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
    landscape = false,
    width,
    height,
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

        const parent = element.parentElement;
        
        // Store original styles for both element and parent
        const originalStyles = {
          element: {
            position: element.style.position,
            top: element.style.top,
            left: element.style.left,
            visibility: element.style.visibility,
            opacity: element.style.opacity,
            zIndex: element.style.zIndex,
          },
          parent: parent ? {
            position: parent.style.position,
            top: parent.style.top,
            left: parent.style.left,
            visibility: parent.style.visibility,
            opacity: parent.style.opacity,
          } : null
        };

        // Move element into view for capture
        if (parent) {
          parent.style.position = 'fixed';
          parent.style.top = '0';
          parent.style.left = '0';
          parent.style.visibility = 'visible';
          parent.style.opacity = '1';
        }
        
        element.style.visibility = 'visible';
        element.style.opacity = '1';

        // Small delay to ensure rendering is complete
        await new Promise(resolve => setTimeout(resolve, 150));

        // Generate thumbnail
        const options: Record<string, unknown> = {
          cacheBust: true,
          pixelRatio,
          backgroundColor,
          quality,
          skipAutoScale: true,
        };

        if (width) options.width = width;
        if (height) options.height = height;

        const dataUrl = format === 'jpeg' 
          ? await toJpeg(element, options)
          : await toPng(element, options);
        
        // Restore original styles
        if (parent && originalStyles.parent) {
          parent.style.position = originalStyles.parent.position;
          parent.style.top = originalStyles.parent.top;
          parent.style.left = originalStyles.parent.left;
          parent.style.visibility = originalStyles.parent.visibility;
          parent.style.opacity = originalStyles.parent.opacity;
        }
        
        element.style.position = originalStyles.element.position;
        element.style.top = originalStyles.element.top;
        element.style.left = originalStyles.element.left;
        element.style.visibility = originalStyles.element.visibility;
        element.style.opacity = originalStyles.element.opacity;
        element.style.zIndex = originalStyles.element.zIndex;
        
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
