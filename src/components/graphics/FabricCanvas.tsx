import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Canvas as FabricCanvas, Rect, Textbox, Image as FabricImage, Gradient, Circle } from 'fabric';

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
  updateText: (name: string, value: string) => void;
  updateImage: (name: string, imageUrl: string) => void;
}

interface FabricCanvasProps {
  template: TemplateData;
  scale?: number;
}

const FabricCanvasComponent = forwardRef<FabricCanvasRef, FabricCanvasProps>(
  ({ template, scale = 1 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<FabricCanvas | null>(null);
    const elementsMapRef = useRef<Map<string, any>>(new Map());

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
      updateText: (name: string, value: string) => {
        const element = elementsMapRef.current.get(name);
        if (element && element.type === 'textbox') {
          element.set('text', value);
          fabricRef.current?.renderAll();
        }
      },
      updateImage: async (name: string, imageUrl: string) => {
        const element = elementsMapRef.current.get(name);
        if (element) {
          try {
            const img = await FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' });
            img.set({
              left: element.left,
              top: element.top,
              scaleX: element.width / (img.width || 1),
              scaleY: element.height / (img.height || 1),
              selectable: false,
              name: name,
            });
            fabricRef.current?.remove(element);
            fabricRef.current?.add(img);
            fabricRef.current?.sendObjectToBack(img);
            elementsMapRef.current.set(name, img);
            fabricRef.current?.renderAll();
          } catch (e) {
            console.error('Failed to load image:', e);
          }
        }
      },
    }));

    useEffect(() => {
      if (!canvasRef.current) return;

      const canvas = new FabricCanvas(canvasRef.current, {
        width: template.width,
        height: template.height,
        backgroundColor: '#0a0a0a',
        selection: false,
      });

      fabricRef.current = canvas;
      elementsMapRef.current.clear();

      // Build template elements
      template.elements.forEach((el) => {
        let fabricObj: any = null;

        switch (el.type) {
          case 'gradient-rect': {
            const { gradientColors, gradientDirection, ...rectProps } = el.props;
            const rect = new Rect({
              ...rectProps,
              selectable: false,
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
            });
            break;
          }
          case 'circle': {
            fabricObj = new Circle({
              ...el.props,
              selectable: false,
            });
            break;
          }
          case 'text': {
            fabricObj = new Textbox(el.props.text || '', {
              ...el.props,
              selectable: true,
              editable: true,
              splitByGrapheme: false,
            });
            break;
          }
          case 'image': {
            // Create placeholder rect for image
            fabricObj = new Rect({
              left: el.props.left,
              top: el.props.top,
              width: el.props.width,
              height: el.props.height,
              fill: '#1a1a1a',
              selectable: false,
              name: el.props.name,
            });
            break;
          }
        }

        if (fabricObj) {
          canvas.add(fabricObj);
          if (el.props.name) {
            elementsMapRef.current.set(el.props.name, fabricObj);
          }
        }
      });

      canvas.renderAll();

      return () => {
        canvas.dispose();
      };
    }, [template]);

    return (
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          width: template.width,
          height: template.height,
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    );
  }
);

FabricCanvasComponent.displayName = 'FabricCanvas';

export default FabricCanvasComponent;