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
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, isToday, isYesterday } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";
import { cn } from "@/lib/utils";

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
}

interface ReferenceItem {
  id: string;
  name: string;
}

const getInitials = (name: string | null | undefined, email: string | null | undefined) => {
  if (name) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "??";
};

const formatMessageDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Dzisiaj";
  if (isYesterday(date)) return "Wczoraj";
  return format(date, "d MMMM", { locale: pl });
};

const groupMessagesByDate = (messages: TeamMessage[]) => {
  const groups: { date: string; messages: TeamMessage[] }[] = [];
  let currentDate = "";
  
  messages.forEach(msg => {
    const msgDate = formatMessageDate(msg.created_at);
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groups.push({ date: msgDate, messages: [msg] });
    } else {
      groups[groups.length - 1].messages.push(msg);
    }
  });
  
  return groups;
};

export function TeamChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadTime, setLastReadTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`chat-last-read-${user.id}`);
      setLastReadTime(stored);
    }
  }, [user]);

  useEffect(() => {
    if (open && user) {
      const now = new Date().toISOString();
      localStorage.setItem(`chat-last-read-${user.id}`, now);
      setLastReadTime(now);
      setUnreadCount(0);
    }
  }, [open, user]);

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

  const fetchMessages = async () => {
    const { data: messagesData, error } = await supabase
      .from("team_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(200);

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    const userIds = [...new Set(messagesData?.map(m => m.user_id) || [])];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]));

    const enrichedMessages = (messagesData || []).map(msg => ({
      ...msg,
      profile: profileMap.get(msg.user_id),
    }));

    setMessages(enrichedMessages);
    calculateUnread(enrichedMessages);
    setLoading(false);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (user && !open) {
      fetchMessages();
      
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

  const fetchReferences = async () => {
    const [docsRes, clientsRes, leadsRes, campaignsRes] = await Promise.all([
      supabase.from("documents").select("id, title").order("created_at", { ascending: false }).limit(15),
      supabase.from("clients").select("id, salon_name").order("created_at", { ascending: false }).limit(15),
      supabase.from("leads").select("id, salon_name").order("created_at", { ascending: false }).limit(15),
      supabase.from("campaigns").select("id, name").order("created_at", { ascending: false }).limit(15),
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

  const filteredMessages = searchQuery
    ? messages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const groupedMessages = groupMessagesByDate(filteredMessages);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 z-50 transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-white text-pink-600 text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-bounce">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:w-[440px] p-0 flex flex-col bg-background border-l border-border/50">
        {/* Header */}
        <SheetHeader className="px-4 py-3 border-b border-border/50 bg-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-base font-semibold text-foreground">
                  Chat zespołu
                </SheetTitle>
                <p className="text-xs text-muted-foreground">
                  {messages.length} wiadomości
                </p>
              </div>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Szukaj</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {showSearch && (
            <div className="pt-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj w wiadomościach..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 bg-background/50"
                />
                {searchQuery && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="py-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  {searchQuery ? "Brak wyników" : "Brak wiadomości"}
                </p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  {searchQuery ? "Spróbuj innej frazy" : "Napisz pierwszą wiadomość!"}
                </p>
              </div>
            ) : (
              groupedMessages.map((group) => (
                <div key={group.date}>
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary/50 rounded-full">
                      {group.date}
                    </span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>
                  
                  <div className="space-y-3">
                    {group.messages.map((msg, msgIndex) => {
                      const isOwn = msg.user_id === user?.id;
                      const replyMessage = msg.reply_to_id 
                        ? messages.find(m => m.id === msg.reply_to_id) 
                        : null;
                      const showAvatar = msgIndex === 0 || 
                        group.messages[msgIndex - 1]?.user_id !== msg.user_id;

                      return (
                        <div
                          key={msg.id}
                          className={cn(
                            "group flex gap-2",
                            isOwn ? "flex-row-reverse" : "flex-row"
                          )}
                        >
                          <div className={cn("w-8 flex-shrink-0", !showAvatar && "invisible")}>
                            {!isOwn && (
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 text-pink-400 text-xs font-medium">
                                  {getInitials(msg.profile?.full_name, msg.profile?.email)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          
                          <div className={cn("max-w-[75%] space-y-1", isOwn && "items-end")}>
                            {!isOwn && showAvatar && (
                              <p className="text-xs font-medium text-muted-foreground ml-1">
                                {msg.profile?.full_name || msg.profile?.email?.split("@")[0] || "Użytkownik"}
                              </p>
                            )}
                            
                            {replyMessage && (
                              <div className={cn(
                                "flex items-center gap-1.5 text-[11px] text-muted-foreground px-2 py-1 rounded-lg bg-secondary/30",
                                isOwn ? "ml-auto" : ""
                              )}>
                                <CornerDownRight className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate max-w-[180px]">
                                  {replyMessage.content}
                                </span>
                              </div>
                            )}
                            
                            <div
                              className={cn(
                                "relative px-3 py-2 rounded-2xl",
                                isOwn 
                                  ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-tr-md" 
                                  : "bg-secondary/50 text-foreground rounded-tl-md"
                              )}
                            >
                              {msg.reference_type && (
                                <div className={cn(
                                  "inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded mb-1.5",
                                  isOwn 
                                    ? "bg-white/20 text-white/90" 
                                    : "bg-pink-500/10 text-pink-400"
                                )}>
                                  {getRefIcon(msg.reference_type)}
                                  <span>{getRefLabel(msg.reference_type)}</span>
                                </div>
                              )}
                              
                              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                {msg.content}
                              </p>
                              
                              <p className={cn(
                                "text-[10px] mt-1",
                                isOwn ? "text-white/60" : "text-muted-foreground"
                              )}>
                                {format(new Date(msg.created_at), "HH:mm")}
                              </p>
                            </div>
                            
                            <div className={cn(
                              "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                              isOwn ? "justify-end pr-1" : "pl-1"
                            )}>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-6 w-6"
                                      onClick={() => {
                                        setReplyTo(msg);
                                        inputRef.current?.focus();
                                      }}
                                    >
                                      <CornerDownRight className="w-3 h-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Odpowiedz</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              {(isOwn || isSzef) && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                        onClick={() => handleDelete(msg.id)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Usuń</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-secondary/20 space-y-2">
          {replyTo && (
            <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                <CornerDownRight className="w-3 h-3 flex-shrink-0 text-pink-400" />
                <span className="font-medium text-pink-400">Odpowiedź:</span>
                <span className="truncate">{replyTo.content}</span>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 flex-shrink-0" 
                onClick={() => setReplyTo(null)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          
          {selectedReference && (
            <div className="flex items-center justify-between bg-pink-500/10 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-pink-400 min-w-0">
                {getRefIcon(selectedReference.type)}
                <span className="font-medium">{getRefLabel(selectedReference.type)}:</span>
                <span className="truncate">{selectedReference.name}</span>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 flex-shrink-0" 
                onClick={() => setSelectedReference(null)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="flex-shrink-0 h-9 w-9 hover:bg-secondary/50"
                >
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <FileText className="w-4 h-4 mr-2" />
                    Dokumenty ({references.documents.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[200px] overflow-y-auto">
                    {references.documents.length === 0 ? (
                      <DropdownMenuItem disabled>Brak dokumentów</DropdownMenuItem>
                    ) : (
                      references.documents.map(doc => (
                        <DropdownMenuItem 
                          key={doc.id}
                          onClick={() => setSelectedReference({ type: "document", id: doc.id, name: doc.name })}
                        >
                          <span className="truncate">{doc.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Users className="w-4 h-4 mr-2" />
                    Klienci ({references.clients.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[200px] overflow-y-auto">
                    {references.clients.length === 0 ? (
                      <DropdownMenuItem disabled>Brak klientów</DropdownMenuItem>
                    ) : (
                      references.clients.map(client => (
                        <DropdownMenuItem 
                          key={client.id}
                          onClick={() => setSelectedReference({ type: "client", id: client.id, name: client.name })}
                        >
                          <span className="truncate">{client.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Leady ({references.leads.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[200px] overflow-y-auto">
                    {references.leads.length === 0 ? (
                      <DropdownMenuItem disabled>Brak leadów</DropdownMenuItem>
                    ) : (
                      references.leads.map(lead => (
                        <DropdownMenuItem 
                          key={lead.id}
                          onClick={() => setSelectedReference({ type: "lead", id: lead.id, name: lead.name })}
                        >
                          <span className="truncate">{lead.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Target className="w-4 h-4 mr-2" />
                    Kampanie ({references.campaigns.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[200px] overflow-y-auto">
                    {references.campaigns.length === 0 ? (
                      <DropdownMenuItem disabled>Brak kampanii</DropdownMenuItem>
                    ) : (
                      references.campaigns.map(campaign => (
                        <DropdownMenuItem 
                          key={campaign.id}
                          onClick={() => setSelectedReference({ type: "campaign", id: campaign.id, name: campaign.name })}
                        >
                          <span className="truncate">{campaign.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Input
              ref={inputRef}
              placeholder="Napisz wiadomość..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 h-10 bg-background/50"
            />
            
            <Button 
              size="icon"
              onClick={handleSend} 
              disabled={!newMessage.trim() || sending}
              className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
