import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Canvas as FabricCanvas, Rect, Textbox, FabricImage, Gradient, Circle, FabricObject } from 'fabric';

export interface TemplateData {
  id: string;
  name: string;
  width: number;
  height: number;
  elements: TemplateElement[];
}

export interface TemplateElement {
  type: 'rect' | 'text' | 'image' | 'circle' | 'gradient-rect';
  props: Record<string, any>;
}

export interface FabricCanvasRef {
  canvas: FabricCanvas | null;
  exportImage: () => Promise<string | null>;
}

interface FabricCanvasProps {
  template: TemplateData;
  formData: Record<string, string>;
}

interface ImagePlaceholder {
  type: 'image-placeholder';
  name: string;
  props: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

type OrderedItem = FabricObject | ImagePlaceholder;

// Helper to load image as promise
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

const isImagePlaceholder = (item: OrderedItem): item is ImagePlaceholder => {
  return 'type' in item && item.type === 'image-placeholder';
};

const FabricCanvasComponent = forwardRef<FabricCanvasRef, FabricCanvasProps>(
  ({ template, formData }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<FabricCanvas | null>(null);

    useImperativeHandle(ref, () => ({
      canvas: fabricRef.current,
      exportImage: async () => {
        if (!fabricRef.current) return null;
        return fabricRef.current.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 2,
        });
      },
    }));

    // Build canvas when template or formData changes
    useEffect(() => {
      if (!canvasRef.current) return;

      // Dispose previous canvas
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }

      const canvas = new FabricCanvas(canvasRef.current, {
        width: template.width,
        height: template.height,
        backgroundColor: '#0a0a0a',
        selection: false,
      });

      fabricRef.current = canvas;

      // Store objects with their intended order
      const orderedObjects: OrderedItem[] = [];

      // Build template elements - collect all objects first
      template.elements.forEach((el) => {
        switch (el.type) {
          case 'gradient-rect': {
            const { gradientColors, gradientDirection, ...rectProps } = el.props;
            const rect = new Rect({
              ...rectProps,
              selectable: false,
              evented: false,
            });
            
            const gradient = new Gradient({
              type: 'linear',
              coords: gradientDirection === 'horizontal' 
                ? { x1: 0, y1: 0, x2: rectProps.width, y2: 0 }
                : gradientDirection === 'diagonal'
                ? { x1: 0, y1: 0, x2: rectProps.width, y2: rectProps.height }
                : { x1: 0, y1: 0, x2: 0, y2: rectProps.height },
              colorStops: gradientColors.map((color: string, i: number) => ({
                offset: i / (gradientColors.length - 1),
                color,
              })),
            });
            rect.set('fill', gradient);
            orderedObjects.push(rect);
            break;
          }
          case 'rect': {
            const rect = new Rect({
              ...el.props,
              selectable: false,
              evented: false,
            });
            orderedObjects.push(rect);
            break;
          }
          case 'circle': {
            const circle = new Circle({
              ...el.props,
              selectable: false,
              evented: false,
            });
            orderedObjects.push(circle);
            break;
          }
          case 'text': {
            const textValue = el.props.name && formData[el.props.name] 
              ? formData[el.props.name] 
              : el.props.text || '';
            const textbox = new Textbox(textValue, {
              ...el.props,
              text: textValue,
              selectable: false,
              editable: false,
              evented: false,
            });
            orderedObjects.push(textbox);
            break;
          }
          case 'image': {
            // Mark as image placeholder - will be replaced with actual image or placeholder rect
            orderedObjects.push({ 
              type: 'image-placeholder', 
              name: el.props.name, 
              props: {
                left: el.props.left,
                top: el.props.top,
                width: el.props.width,
                height: el.props.height,
              }
            });
            break;
          }
        }
      });

      // Process all objects - load images where needed
      const processObjects = async () => {
        for (const item of orderedObjects) {
          if (isImagePlaceholder(item)) {
            const imageUrl = formData[item.name];
            
            if (imageUrl) {
              try {
                const imgElement = await loadImage(imageUrl);
                const fabricImg = new FabricImage(imgElement, {
                  left: item.props.left,
                  top: item.props.top,
                  selectable: false,
                  evented: false,
                });

                // Scale to fit placeholder dimensions
                const scaleX = item.props.width / (fabricImg.width || 1);
                const scaleY = item.props.height / (fabricImg.height || 1);
                fabricImg.set({ scaleX, scaleY });

                canvas.add(fabricImg);
              } catch (error) {
                console.error('Failed to load image:', error);
                // Add placeholder rect on error
                const placeholder = new Rect({
                  left: item.props.left,
                  top: item.props.top,
                  width: item.props.width,
                  height: item.props.height,
                  fill: '#1a1a1a',
                  selectable: false,
                  evented: false,
                });
                canvas.add(placeholder);
              }
            } else {
              // No image URL - add placeholder rect
              const placeholder = new Rect({
                left: item.props.left,
                top: item.props.top,
                width: item.props.width,
                height: item.props.height,
                fill: '#1a1a1a',
                selectable: false,
                evented: false,
              });
              canvas.add(placeholder);
            }
          } else {
            // Regular fabric object
            canvas.add(item);
          }
        }
        
        canvas.renderAll();
      };

      processObjects();

      return () => {
        canvas.dispose();
      };
    }, [template, formData]);

    return (
      <div style={{ width: template.width, height: template.height }}>
        <canvas ref={canvasRef} />
      </div>
    );
  }
);

FabricCanvasComponent.displayName = 'FabricCanvas';

export default FabricCanvasComponent;
