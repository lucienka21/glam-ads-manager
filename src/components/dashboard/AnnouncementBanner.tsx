import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";
import { Megaphone, Plus, X, Pin, Trash2, Edit2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { processMentions } from "@/lib/notifications";
import { renderMentions } from "@/components/ui/Mention";
import { AnnouncementComments } from "@/components/announcements/AnnouncementComments";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_pinned: boolean;
  created_by: string;
}

export function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [profiles, setProfiles] = useState<{ id: string; full_name: string | null; email: string | null }[]>([]);
  const { isSzef } = useUserRole();
  const { user } = useAuth();

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error && data) {
      setAnnouncements(data);
      
      // Fetch comment counts
      const counts: Record<string, number> = {};
      for (const announcement of data) {
        const { count } = await supabase
          .from("announcement_comments")
          .select("*", { count: "exact", head: true })
          .eq("announcement_id", announcement.id);
        counts[announcement.id] = count || 0;
      }
      setCommentCounts(counts);
    }
    setLoading(false);
  };

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, email");
    setProfiles(data || []);
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchProfiles();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    if (!user) return;

    if (editingAnnouncement) {
      const { error } = await supabase
        .from("announcements")
        .update({ title, content, is_pinned: isPinned })
        .eq("id", editingAnnouncement.id);

      if (error) {
        toast.error("Błąd podczas edycji");
        return;
      }
      toast.success("Komunikat zaktualizowany");
    } else {
      const { data, error } = await supabase.from("announcements").insert({
        title,
        content,
        is_pinned: isPinned,
        created_by: user.id,
      }).select().single();

      if (error) {
        toast.error("Błąd podczas dodawania");
        return;
      }
      
      // Process mentions in announcement content
      if (data) {
        await processMentions(
          content,
          profiles,
          user.id,
          "komunikacie",
          "announcement",
          data.id
        );
      }
      
      toast.success("Komunikat dodany");
    }

    setDialogOpen(false);
    setTitle("");
    setContent("");
    setIsPinned(false);
    setEditingAnnouncement(null);
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (!error) {
      toast.success("Komunikat usunięty");
      fetchAnnouncements();
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setTitle(announcement.title);
    setContent(announcement.content);
    setIsPinned(announcement.is_pinned);
    setDialogOpen(true);
  };

  if (loading) return null;

  return (
    <div className="space-y-3">
      {/* Header with add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-foreground">Komunikaty</h3>
        </div>
        {isSzef && (
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingAnnouncement(null);
              setTitle("");
              setContent("");
              setIsPinned(false);
            }
          }}>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-7 text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Dodaj
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingAnnouncement ? "Edytuj komunikat" : "Nowy komunikat"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  placeholder="Tytuł komunikatu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Treść komunikatu..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded border-border"
                  />
                  <Pin className="w-3.5 h-3.5 text-amber-400" />
                  Przypnij na górze
                </label>
                <Button onClick={handleSubmit} className="w-full">
                  {editingAnnouncement ? "Zapisz zmiany" : "Opublikuj"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Announcements list */}
      {announcements.length === 0 ? (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Brak komunikatów
        </div>
      ) : (
        <div className="space-y-2">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-3 rounded-lg border transition-colors ${
                announcement.is_pinned
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-secondary/30 border-border/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {announcement.is_pinned && (
                      <Pin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    )}
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {announcement.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {renderMentions(announcement.content)}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <p className="text-[10px] text-muted-foreground/60">
                      {format(new Date(announcement.created_at), "d MMM, HH:mm", { locale: pl })}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(expandedId === announcement.id ? null : announcement.id);
                      }}
                      className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      {commentCounts[announcement.id] || 0}
                      {expandedId === announcement.id ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                {isSzef && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => handleEdit(announcement)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              {expandedId === announcement.id && (
                <AnnouncementComments announcementId={announcement.id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
