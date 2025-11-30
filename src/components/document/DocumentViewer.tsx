import { useRef, useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ReportPreviewLandscape } from "@/components/report/ReportPreviewLandscape";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { ContractPreview } from "@/components/contract/ContractPreview";
import { PresentationPreview } from "@/components/presentation/PresentationPreview";
import { DocumentHistoryItem } from "@/hooks/useDocumentHistory";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

interface DocumentViewerProps {
  document: DocumentHistoryItem | null;
  open: boolean;
  onClose: () => void;
}

export const DocumentViewer = ({ document, open, onClose }: DocumentViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!open || !containerRef.current || !document) return;

    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48;
        const containerHeight = containerRef.current.clientHeight - 48;
        
        let docWidth = 1600;
        let docHeight = 900;
        
        if (document.type === "invoice" || document.type === "contract") {
          docWidth = 794;
          docHeight = 1123;
        } else if (document.type === "presentation") {
          docWidth = 1600;
          docHeight = 900;
        }
        
        const scaleByWidth = containerWidth / docWidth;
        const scaleByHeight = containerHeight / docHeight;
        const newScale = Math.min(scaleByWidth, scaleByHeight, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [open, document]);

  const generatePDF = async () => {
    if (!document) return;
    setIsGenerating(true);

    try {
      let elementId = "";
      let orientation: "landscape" | "portrait" = "landscape";
      let width = 1600;
      let height = 900;

      switch (document.type) {
        case "report":
          elementId = "report-preview-landscape";
          break;
        case "invoice":
          elementId = "invoice-preview";
          orientation = "portrait";
          width = 794;
          height = 1123;
          break;
        case "contract":
          elementId = "contract-preview";
          orientation = "portrait";
          width = 794;
          height = 1123;
          break;
        case "presentation":
          elementId = "presentation-preview";
          break;
      }

      const element = window.document.getElementById(elementId);
      if (!element) {
        toast({
          title: "Błąd",
          description: "Nie można znaleźć elementu do eksportu",
          variant: "destructive",
        });
        return;
      }

      const dataUrl = await toPng(element, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#000000",
      });

      const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [width, height],
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`${document.title.replace(/\s+/g, "-")}.pdf`);

      toast({
        title: "Sukces",
        description: "PDF został wygenerowany",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wygenerować PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!document) return null;

  const getDocumentDimensions = () => {
    switch (document.type) {
      case "report":
      case "presentation":
        return { width: 1600, height: 900 };
      case "invoice":
      case "contract":
        return { width: 794, height: 1123 };
      default:
        return { width: 1600, height: 900 };
    }
  };

  const dims = getDocumentDimensions();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-zinc-950 border-zinc-800">
        <DialogTitle className="sr-only">Podgląd dokumentu: {document.title}</DialogTitle>
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-zinc-950 to-transparent">
          <div>
            <h2 className="text-lg font-semibold text-white">{document.title}</h2>
            <p className="text-sm text-zinc-400">{document.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={generatePDF}
              disabled={isGenerating}
              size="sm"
              className="bg-pink-600 hover:bg-pink-700"
            >
              <Download className="w-4 h-4 mr-1.5" />
              {isGenerating ? "..." : "PDF"}
            </Button>
            <Button
              onClick={onClose}
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Document Container */}
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center overflow-hidden pt-16 pb-4 px-4"
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              width: dims.width,
              height: dims.height,
            }}
          >
            {document.type === "report" && (
              <ReportPreviewLandscape data={document.data as any} />
            )}
            {document.type === "invoice" && (
              <InvoicePreview data={document.data as any} />
            )}
            {document.type === "contract" && (
              <ContractPreview data={document.data as any} />
            )}
            {document.type === "presentation" && (
              <PresentationPreview data={document.data as any} currentSlide={1} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
