import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, FileText, Users, Target, Receipt, FileSignature, Presentation, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SearchResult {
  id: string;
  type: "client" | "document" | "campaign" | "lead";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchResults: SearchResult[] = [];

    try {
      // Search clients
      const { data: clients } = await supabase
        .from("clients")
        .select("id, salon_name, owner_name, city")
        .or(`salon_name.ilike.%${searchQuery}%,owner_name.ilike.%${searchQuery}%,id.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`)
        .limit(5);

      clients?.forEach((c) => {
        searchResults.push({
          id: c.id,
          type: "client",
          title: c.salon_name,
          subtitle: `${c.owner_name || ""} · ${c.city || ""}`,
          icon: <Users className="w-4 h-4 text-pink-400" />,
        });
      });

      // Search documents
      const { data: documents } = await supabase
        .from("documents")
        .select("id, type, title, subtitle, client_id")
        .or(`title.ilike.%${searchQuery}%,subtitle.ilike.%${searchQuery}%,client_id.ilike.%${searchQuery}%`)
        .limit(5);

      documents?.forEach((d) => {
        const iconMap: Record<string, React.ReactNode> = {
          report: <FileText className="w-4 h-4 text-blue-400" />,
          invoice: <Receipt className="w-4 h-4 text-green-400" />,
          contract: <FileSignature className="w-4 h-4 text-purple-400" />,
          presentation: <Presentation className="w-4 h-4 text-pink-400" />,
        };
        searchResults.push({
          id: d.id,
          type: "document",
          title: d.title,
          subtitle: d.subtitle || d.type,
          icon: iconMap[d.type] || <FileText className="w-4 h-4" />,
        });
      });

      // Search campaigns
      const { data: campaigns } = await supabase
        .from("campaigns")
        .select("id, name, client_id")
        .or(`name.ilike.%${searchQuery}%,client_id.ilike.%${searchQuery}%`)
        .limit(5);

      campaigns?.forEach((c) => {
        searchResults.push({
          id: c.id,
          type: "campaign",
          title: c.name,
          subtitle: "Kampania",
          icon: <Target className="w-4 h-4 text-orange-400" />,
        });
      });

      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery("");
    
    if (result.type === "client") {
      navigate(`/clients/${result.id}`);
    } else if (result.type === "document") {
      navigate(`/history`);
    } else if (result.type === "campaign") {
      navigate(`/campaigns`);
    }
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex text-muted-foreground">Szukaj...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle className="text-lg">Wyszukiwarka globalna</DialogTitle>
          </DialogHeader>
          
          <div className="px-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Wpisz ID klienta, nazwę, email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="px-2 pb-4 max-h-80 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            
            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Brak wyników dla "{query}"
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-1">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!loading && query.length < 2 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Wpisz minimum 2 znaki aby wyszukać
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
