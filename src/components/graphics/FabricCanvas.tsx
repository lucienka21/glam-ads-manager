import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
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
}

interface FabricCanvasProps {
  template: TemplateData;
  formData: Record<string, string>;
}

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

      // Track image placeholders for loading
      const imagePlaceholders: Map<string, { left: number; top: number; width: number; height: number; index: number }> = new Map();

      // Build template elements
      template.elements.forEach((el, index) => {
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
            // Store placeholder info
            imagePlaceholders.set(el.props.name, {
              left: el.props.left,
              top: el.props.top,
              width: el.props.width,
              height: el.props.height,
              index,
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

      // Now load images if we have them in formData
      imagePlaceholders.forEach((placeholder, name) => {
        const imageUrl = formData[name];
        if (imageUrl) {
          // Load image
          const imgElement = document.createElement('img');
          imgElement.crossOrigin = 'anonymous';
          imgElement.onload = () => {
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
            // Move to correct z-index (back, under other elements)
            canvas.sendObjectToBack(fabricImg);
            canvas.renderAll();
          };
          imgElement.src = imageUrl;
        }
      });

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