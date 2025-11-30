import { useState, useRef } from "react";
import { FileText, Receipt, FileSignature, Presentation, Trash2, Search, Filter, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/AppLayout";
import { useDocumentHistory, DocumentHistoryItem } from "@/hooks/useDocumentHistory";
import { DocumentViewer } from "@/components/document/DocumentViewer";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const typeLabels: Record<string, string> = {
  report: "Raport",
  invoice: "Faktura",
  contract: "Umowa",
  presentation: "Prezentacja",
};

const typeColors: Record<string, string> = {
  report: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  invoice: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  contract: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  presentation: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

const filterOptions = [
  { value: "all", label: "Wszystkie" },
  { value: "report", label: "Raporty" },
  { value: "invoice", label: "Faktury" },
  { value: "contract", label: "Umowy" },
  { value: "presentation", label: "Prezentacje" },
];

export default function DocumentHistory() {
  const { history, deleteDocument, clearHistory, importHistory, exportHistory } = useDocumentHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<DocumentHistoryItem | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonData = exportHistory();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `aurine-historia-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const success = importHistory(content);
        if (success) {
          window.location.reload();
        } else {
          alert("Błąd importu - nieprawidłowy format pliku");
        }
      } catch (err) {
        alert("Błąd importu - nieprawidłowy plik JSON");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const filteredHistory = history.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleOpenDocument = (doc: DocumentHistoryItem) => {
    setSelectedDocument(doc);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
    setSelectedDocument(null);
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Historia dokumentów</h1>
            <p className="text-muted-foreground">
              {history.length} dokumentów w historii
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            {history.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Eksport
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Wyczyść
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Wyczyścić całą historię?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ta akcja usunie wszystkie dokumenty z historii. Tej operacji nie można cofnąć.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction onClick={() => clearHistory()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Wyczyść
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj dokumentów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filterType === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        {filteredHistory.length === 0 ? (
          <div className="bg-secondary/20 border border-border/30 rounded-xl p-12 text-center">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Brak dokumentów</p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              {searchQuery || filterType !== "all" 
                ? "Spróbuj zmienić filtry wyszukiwania"
                : "Wygenerowane dokumenty pojawią się tutaj"
              }
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredHistory.map((doc) => (
              <div
                key={doc.id}
                className="bg-secondary/30 border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
              >
                {/* Thumbnail */}
                <div 
                  className="aspect-video bg-zinc-900/50 relative overflow-hidden cursor-pointer"
                  onClick={() => handleOpenDocument(doc)}
                >
                  {doc.thumbnail ? (
                    <img 
                      src={doc.thumbnail} 
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-xl ${typeColors[doc.type]} border flex items-center justify-center`}>
                        {doc.type === "report" && <FileText className="w-6 h-6" />}
                        {doc.type === "invoice" && <Receipt className="w-6 h-6" />}
                        {doc.type === "contract" && <FileSignature className="w-6 h-6" />}
                        {doc.type === "presentation" && <Presentation className="w-6 h-6" />}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[doc.type]}`}>
                      {typeLabels[doc.type]}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Usunąć dokument?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Czy na pewno chcesz usunąć "{doc.title}"? Tej operacji nie można cofnąć.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Anuluj</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteDocument(doc.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Usuń
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <h3 
                    className="font-medium text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleOpenDocument(doc)}
                  >
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">{doc.subtitle}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {format(new Date(doc.createdAt), "d MMMM yyyy, HH:mm", { locale: pl })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewer
        document={selectedDocument}
        open={viewerOpen}
        onClose={handleCloseViewer}
      />
    </AppLayout>
  );
}
