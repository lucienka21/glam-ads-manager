import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  MessageCircle, 
  Send, 
  X, 
  FileText, 
  Users, 
  UserPlus,
  Target,
  Paperclip,
  CornerDownRight,
  Trash2,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";

interface TeamMessage {
  id: string;
  user_id: string;
  content: string;
  reference_type: string | null;
  reference_id: string | null;
  created_at: string;
  reply_to_id: string | null;
  profile?: {
    full_name: string | null;
    email: string | null;
  };
  reference_name?: string;
}

interface ReferenceItem {
  id: string;
  name: string;
}

export function TeamChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadTime, setLastReadTime] = useState<string | null>(null);
  const [selectedReference, setSelectedReference] = useState<{
    type: string;
    id: string;
    name: string;
  } | null>(null);
  const [replyTo, setReplyTo] = useState<TeamMessage | null>(null);
  const [references, setReferences] = useState<{
    documents: ReferenceItem[];
    clients: ReferenceItem[];
    leads: ReferenceItem[];
    campaigns: ReferenceItem[];
  }>({ documents: [], clients: [], leads: [], campaigns: [] });
  
  const { user } = useAuth();
  const { isSzef } = useUserRole();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load last read time from localStorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`chat-last-read-${user.id}`);
      setLastReadTime(stored);
    }
  }, [user]);

  // Save last read time when opening chat
  useEffect(() => {
    if (open && user) {
      const now = new Date().toISOString();
      localStorage.setItem(`chat-last-read-${user.id}`, now);
      setLastReadTime(now);
      setUnreadCount(0);
    }
  }, [open, user]);

  // Calculate unread count
  const calculateUnread = useCallback((msgs: TeamMessage[]) => {
    if (!lastReadTime || !user || open) {
      setUnreadCount(0);
      return;
    }
    const count = msgs.filter(m => 
      m.user_id !== user.id && 
      new Date(m.created_at) > new Date(lastReadTime)
    ).length;
    setUnreadCount(count);
  }, [lastReadTime, user, open]);

  // Fetch messages
  const fetchMessages = async () => {
    const { data: messagesData, error } = await supabase
      .from("team_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100);

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    // Fetch profiles for messages
    const userIds = [...new Set(messagesData?.map(m => m.user_id) || [])];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]));

    // Enrich messages with profile data
    const enrichedMessages = (messagesData || []).map(msg => ({
      ...msg,
      profile: profileMap.get(msg.user_id),
    }));

    setMessages(enrichedMessages);
    calculateUnread(enrichedMessages);
    setLoading(false);

    // Scroll to bottom
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, 100);
  };

  // Initial fetch for unread count (even when chat is closed)
  useEffect(() => {
    if (user && !open) {
      fetchMessages();
      
      // Subscribe to realtime for notifications
      const channel = supabase
        .channel("team-chat-notifications")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "team_messages" },
          () => fetchMessages()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, open, lastReadTime]);

  // Fetch reference data
  const fetchReferences = async () => {
    const [docsRes, clientsRes, leadsRes, campaignsRes] = await Promise.all([
      supabase.from("documents").select("id, title").order("created_at", { ascending: false }).limit(20),
      supabase.from("clients").select("id, salon_name").order("created_at", { ascending: false }).limit(20),
      supabase.from("leads").select("id, salon_name").order("created_at", { ascending: false }).limit(20),
      supabase.from("campaigns").select("id, name").order("created_at", { ascending: false }).limit(20),
    ]);

    setReferences({
      documents: docsRes.data?.map(d => ({ id: d.id, name: d.title })) || [],
      clients: clientsRes.data?.map(c => ({ id: c.id, name: c.salon_name })) || [],
      leads: leadsRes.data?.map(l => ({ id: l.id, name: l.salon_name })) || [],
      campaigns: campaignsRes.data?.map(c => ({ id: c.id, name: c.name })) || [],
    });
  };

  useEffect(() => {
    if (open) {
      fetchMessages();
      fetchReferences();

      // Subscribe to realtime updates
      const channel = supabase
        .channel("team-chat")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "team_messages" },
          () => fetchMessages()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [open]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;

    setSending(true);
    const { error } = await supabase.from("team_messages").insert({
      user_id: user.id,
      content: newMessage.trim(),
      reference_type: selectedReference?.type || null,
      reference_id: selectedReference?.id || null,
      reply_to_id: replyTo?.id || null,
    });

    if (error) {
      toast.error("Błąd wysyłania wiadomości");
    } else {
      setNewMessage("");
      setSelectedReference(null);
      setReplyTo(null);
    }
    setSending(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("team_messages").delete().eq("id", id);
    if (!error) {
      toast.success("Wiadomość usunięta");
    }
  };

  const getRefIcon = (type: string | null) => {
    switch (type) {
      case "document": return <FileText className="w-3 h-3" />;
      case "client": return <Users className="w-3 h-3" />;
      case "lead": return <UserPlus className="w-3 h-3" />;
      case "campaign": return <Target className="w-3 h-3" />;
      default: return null;
    }
  };

  const getRefLabel = (type: string | null) => {
    switch (type) {
      case "document": return "Dokument";
      case "client": return "Klient";
      case "lead": return "Lead";
      case "campaign": return "Kampania";
      default: return "";
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50 group"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[420px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border/50">
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Chat zespołu
          </SheetTitle>
        </SheetHeader>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-muted-foreground py-8">
                Ładowanie...
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Brak wiadomości. Napisz pierwszą!
              </div>
            ) : (
              messages.map((msg) => {
                const isOwn = msg.user_id === user?.id;
                const replyMessage = msg.reply_to_id 
                  ? messages.find(m => m.id === msg.reply_to_id) 
                  : null;

                return (
                  <div
                    key={msg.id}
                    className={`group flex flex-col ${isOwn ? "items-end" : "items-start"}`}
                  >
                    {/* Reply indicator */}
                    {replyMessage && (
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1 px-2">
                        <CornerDownRight className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">
                          {replyMessage.content}
                        </span>
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 ${
                        isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground"
                      }`}
                    >
                      {/* Sender name */}
                      {!isOwn && (
                        <p className="text-[10px] font-medium opacity-70 mb-0.5">
                          {msg.profile?.full_name || msg.profile?.email?.split("@")[0] || "Użytkownik"}
                        </p>
                      )}
                      
                      {/* Reference badge */}
                      {msg.reference_type && (
                        <div className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded mb-1 ${
                          isOwn ? "bg-white/20" : "bg-primary/10 text-primary"
                        }`}>
                          {getRefIcon(msg.reference_type)}
                          <span>{getRefLabel(msg.reference_type)}</span>
                        </div>
                      )}
                      
                      {/* Message content */}
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                      
                      {/* Time and actions */}
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className={`text-[10px] ${isOwn ? "opacity-70" : "text-muted-foreground"}`}>
                          {format(new Date(msg.created_at), "HH:mm", { locale: pl })}
                        </span>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5"
                            onClick={() => setReplyTo(msg)}
                          >
                            <CornerDownRight className="w-3 h-3" />
                          </Button>
                          {(isOwn || isSzef) && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(msg.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 border-t border-border/50 space-y-2">
          {/* Reply indicator */}
          {replyTo && (
            <div className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CornerDownRight className="w-3 h-3" />
                <span className="truncate max-w-[200px]">{replyTo.content}</span>
              </div>
              <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => setReplyTo(null)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          
          {/* Reference indicator */}
          {selectedReference && (
            <div className="flex items-center justify-between bg-primary/10 rounded-lg px-3 py-2 text-xs">
              <div className="flex items-center gap-2 text-primary">
                {getRefIcon(selectedReference.type)}
                <span className="truncate max-w-[200px]">{selectedReference.name}</span>
              </div>
              <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => setSelectedReference(null)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            {/* Reference picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <FileText className="w-4 h-4 mr-2" />
                    Dokumenty
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {references.documents.map(doc => (
                      <DropdownMenuItem 
                        key={doc.id}
                        onClick={() => setSelectedReference({ type: "document", id: doc.id, name: doc.name })}
                      >
                        {doc.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Users className="w-4 h-4 mr-2" />
                    Klienci
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {references.clients.map(client => (
                      <DropdownMenuItem 
                        key={client.id}
                        onClick={() => setSelectedReference({ type: "client", id: client.id, name: client.name })}
                      >
                        {client.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Leady
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {references.leads.map(lead => (
                      <DropdownMenuItem 
                        key={lead.id}
                        onClick={() => setSelectedReference({ type: "lead", id: lead.id, name: lead.name })}
                      >
                        {lead.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Target className="w-4 h-4 mr-2" />
                    Kampanie
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {references.campaigns.map(campaign => (
                      <DropdownMenuItem 
                        key={campaign.id}
                        onClick={() => setSelectedReference({ type: "campaign", id: campaign.id, name: campaign.name })}
                      >
                        {campaign.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Input
              placeholder="Napisz wiadomość..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1"
            />
            
            <Button 
              size="icon" 
              onClick={handleSend} 
              disabled={!newMessage.trim() || sending}
              className="flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
