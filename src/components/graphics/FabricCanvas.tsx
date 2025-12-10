import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Canvas as FabricCanvas, Rect, Textbox, FabricImage, Gradient, Circle } from 'fabric';

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
  loadImage: (name: string, imageUrl: string) => Promise<void>;
}

interface FabricCanvasProps {
  template: TemplateData;
  formData: Record<string, string>;
}

const FabricCanvasComponent = forwardRef<FabricCanvasRef, FabricCanvasProps>(
  ({ template, formData }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<FabricCanvas | null>(null);
    const placeholdersRef = useRef<Map<string, { left: number; top: number; width: number; height: number }>>(new Map());
    const loadedImagesRef = useRef<Map<string, FabricImage>>(new Map());

    const loadImage = useCallback(async (name: string, imageUrl: string) => {
      const canvas = fabricRef.current;
      const placeholder = placeholdersRef.current.get(name);
      if (!canvas || !placeholder) {
        console.error('Canvas or placeholder not found for:', name);
        return;
      }

      try {
        // Remove old image if exists
        const oldImg = loadedImagesRef.current.get(name);
        if (oldImg) {
          canvas.remove(oldImg);
        }

        // Create HTML image element first
        const imgElement = document.createElement('img');
        imgElement.crossOrigin = 'anonymous';
        
        await new Promise<void>((resolve, reject) => {
          imgElement.onload = () => resolve();
          imgElement.onerror = () => reject(new Error('Failed to load image'));
          imgElement.src = imageUrl;
        });

        // Create fabric image from the loaded element
        const fabricImg = new FabricImage(imgElement, {
          left: placeholder.left,
          top: placeholder.top,
          selectable: false,
          evented: false,
        });

        // Scale to fit placeholder
        const scaleX = placeholder.width / (fabricImg.width || 1);
        const scaleY = placeholder.height / (fabricImg.height || 1);
        fabricImg.set({ scaleX, scaleY });

        canvas.add(fabricImg);
        canvas.sendObjectToBack(fabricImg);
        loadedImagesRef.current.set(name, fabricImg);
        canvas.renderAll();
        
        console.log('Image loaded successfully:', name);
      } catch (e) {
        console.error('Failed to load image:', name, e);
      }
    }, []);

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
      loadImage,
    }));

    // Build canvas when template changes
    useEffect(() => {
      if (!canvasRef.current) return;

      const canvas = new FabricCanvas(canvasRef.current, {
        width: template.width,
        height: template.height,
        backgroundColor: '#0a0a0a',
        selection: false,
      });

      fabricRef.current = canvas;
      placeholdersRef.current.clear();
      loadedImagesRef.current.clear();

      // Build template elements
      template.elements.forEach((el) => {
        let fabricObj: any = null;

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
            fabricObj = rect;
            break;
          }
          case 'rect': {
            fabricObj = new Rect({
              ...el.props,
              selectable: false,
              evented: false,
            });
            break;
          }
          case 'circle': {
            fabricObj = new Circle({
              ...el.props,
              selectable: false,
              evented: false,
            });
            break;
          }
          case 'text': {
            const textValue = el.props.name && formData[el.props.name] 
              ? formData[el.props.name] 
              : el.props.text || '';
            fabricObj = new Textbox(textValue, {
              ...el.props,
              text: textValue,
              selectable: false,
              editable: false,
              evented: false,
            });
            break;
          }
          case 'image': {
            // Store placeholder info for later image loading
            placeholdersRef.current.set(el.props.name, {
              left: el.props.left,
              top: el.props.top,
              width: el.props.width,
              height: el.props.height,
            });
            // Create dark placeholder rect
            fabricObj = new Rect({
              left: el.props.left,
              top: el.props.top,
              width: el.props.width,
              height: el.props.height,
              fill: '#1a1a1a',
              selectable: false,
              evented: false,
            });
            break;
          }
        }

        if (fabricObj) {
          canvas.add(fabricObj);
        }
      });

      canvas.renderAll();

      return () => {
        canvas.dispose();
      };
    }, [template, formData]);

    // Load images when formData changes
    useEffect(() => {
      if (!fabricRef.current) return;

      const imageNames = Array.from(placeholdersRef.current.keys());
      imageNames.forEach(name => {
        const imageUrl = formData[name];
        if (imageUrl) {
          loadImage(name, imageUrl);
        }
      });
    }, [formData, loadImage]);

    return (
      <div style={{ width: template.width, height: template.height }}>
        <canvas ref={canvasRef} />
      </div>
    );
  }
);

FabricCanvasComponent.displayName = 'FabricCanvas';

export default FabricCanvasComponent;