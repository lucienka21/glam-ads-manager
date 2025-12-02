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
  Plus,
  Reply,
  Trash2,
  Search,
  Smile,
  ExternalLink,
  CheckSquare
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isToday, isYesterday } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Reaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  profile?: {
    full_name: string | null;
  };
}

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
  reactions?: Reaction[];
  referenceName?: string;
}

interface ReferenceItem {
  id: string;
  name: string;
}

const EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "😢", "🔥", "👏", "🎉"];

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
  return format(date, "d MMMM yyyy", { locale: pl });
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
    tasks: ReferenceItem[];
  }>({ documents: [], clients: [], leads: [], campaigns: [], tasks: [] });
  
  const { user } = useAuth();
  const { isSzef } = useUserRole();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

    // Fetch profiles
    const userIds = [...new Set(messagesData?.map(m => m.user_id) || [])];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]));

    // Fetch reactions
    const messageIds = messagesData?.map(m => m.id) || [];
    const { data: reactionsData } = await supabase
      .from("message_reactions")
      .select("*")
      .in("message_id", messageIds);

    // Fetch reference names
    const referenceGroups = {
      document: new Set<string>(),
      client: new Set<string>(),
      lead: new Set<string>(),
      campaign: new Set<string>(),
      task: new Set<string>(),
    };

    messagesData?.forEach(msg => {
      if (msg.reference_type && msg.reference_id) {
        referenceGroups[msg.reference_type as keyof typeof referenceGroups]?.add(msg.reference_id);
      }
    });

    const [docsRes, clientsRes, leadsRes, campaignsRes, tasksRes] = await Promise.all([
      referenceGroups.document.size > 0 
        ? supabase.from("documents").select("id, title").in("id", [...referenceGroups.document])
        : { data: [] },
      referenceGroups.client.size > 0
        ? supabase.from("clients").select("id, salon_name").in("id", [...referenceGroups.client])
        : { data: [] },
      referenceGroups.lead.size > 0
        ? supabase.from("leads").select("id, salon_name").in("id", [...referenceGroups.lead])
        : { data: [] },
      referenceGroups.campaign.size > 0
        ? supabase.from("campaigns").select("id, name").in("id", [...referenceGroups.campaign])
        : { data: [] },
      referenceGroups.task.size > 0
        ? supabase.from("tasks").select("id, title").in("id", [...referenceGroups.task])
        : { data: [] },
    ]);

    const referenceNames = new Map<string, string>();
    docsRes.data?.forEach(d => referenceNames.set(d.id, d.title));
    clientsRes.data?.forEach(c => referenceNames.set(c.id, c.salon_name));
    leadsRes.data?.forEach(l => referenceNames.set(l.id, l.salon_name));
    campaignsRes.data?.forEach(c => referenceNames.set(c.id, c.name));
    tasksRes.data?.forEach(t => referenceNames.set(t.id, t.title));

    // Build reactions map
    const reactionsMap = new Map<string, Reaction[]>();
    reactionsData?.forEach(r => {
      const existing = reactionsMap.get(r.message_id) || [];
      existing.push({
        ...r,
        profile: profileMap.get(r.user_id),
      });
      reactionsMap.set(r.message_id, existing);
    });

    const enrichedMessages = (messagesData || []).map(msg => ({
      ...msg,
      profile: profileMap.get(msg.user_id),
      reactions: reactionsMap.get(msg.id) || [],
      referenceName: msg.reference_id ? referenceNames.get(msg.reference_id) : undefined,
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
    const [docsRes, clientsRes, leadsRes, campaignsRes, tasksRes] = await Promise.all([
      supabase.from("documents").select("id, title").order("created_at", { ascending: false }).limit(15),
      supabase.from("clients").select("id, salon_name").order("created_at", { ascending: false }).limit(15),
      supabase.from("leads").select("id, salon_name").order("created_at", { ascending: false }).limit(15),
      supabase.from("campaigns").select("id, name").order("created_at", { ascending: false }).limit(15),
      supabase.from("tasks").select("id, title").order("created_at", { ascending: false }).limit(15),
    ]);

    setReferences({
      documents: docsRes.data?.map(d => ({ id: d.id, name: d.title })) || [],
      clients: clientsRes.data?.map(c => ({ id: c.id, name: c.salon_name })) || [],
      leads: leadsRes.data?.map(l => ({ id: l.id, name: l.salon_name })) || [],
      campaigns: campaignsRes.data?.map(c => ({ id: c.id, name: c.name })) || [],
      tasks: tasksRes.data?.map(t => ({ id: t.id, name: t.title })) || [],
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
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "message_reactions" },
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

  const handleReaction = async (messageId: string, emoji: string) => {
    if (!user) return;

    // Check if user already reacted with this emoji
    const existingReaction = messages
      .find(m => m.id === messageId)
      ?.reactions?.find(r => r.user_id === user.id && r.emoji === emoji);

    if (existingReaction) {
      // Remove reaction
      await supabase.from("message_reactions").delete().eq("id", existingReaction.id);
    } else {
      // Add reaction
      await supabase.from("message_reactions").insert({
        message_id: messageId,
        user_id: user.id,
        emoji,
      });
    }
  };

  const handleReferenceClick = (type: string | null, id: string | null) => {
    if (!type || !id) return;
    
    setOpen(false);
    setTimeout(() => {
      switch (type) {
        case "document":
          navigate("/document-history");
          break;
        case "client":
          navigate(`/clients/${id}`);
          break;
        case "lead":
          navigate(`/leads/${id}`);
          break;
        case "campaign":
          navigate("/campaigns");
          break;
        case "task":
          navigate("/tasks");
          break;
      }
    }, 300);
  };

  const getRefIcon = (type: string | null) => {
    switch (type) {
      case "document": return <FileText className="w-3.5 h-3.5" />;
      case "client": return <Users className="w-3.5 h-3.5" />;
      case "lead": return <UserPlus className="w-3.5 h-3.5" />;
      case "campaign": return <Target className="w-3.5 h-3.5" />;
      case "task": return <CheckSquare className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getRefLabel = (type: string | null) => {
    switch (type) {
      case "document": return "Dokument";
      case "client": return "Klient";
      case "lead": return "Lead";
      case "campaign": return "Kampania";
      case "task": return "Zadanie";
      default: return "";
    }
  };

  const filteredMessages = searchQuery
    ? messages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  const groupedMessages = groupMessagesByDate(filteredMessages);

  // Group reactions by emoji
  const groupReactions = (reactions: Reaction[]) => {
    const grouped: { emoji: string; count: number; users: string[]; userIds: string[] }[] = [];
    reactions.forEach(r => {
      const existing = grouped.find(g => g.emoji === r.emoji);
      if (existing) {
        existing.count++;
        existing.users.push(r.profile?.full_name || "Użytkownik");
        existing.userIds.push(r.user_id);
      } else {
        grouped.push({ 
          emoji: r.emoji, 
          count: 1, 
          users: [r.profile?.full_name || "Użytkownik"],
          userIds: [r.user_id]
        });
      }
    });
    return grouped;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 z-50 transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-white text-pink-600 text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-pulse">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:w-[480px] p-0 flex flex-col bg-zinc-950 border-l border-zinc-800">
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-base font-semibold text-white">
                  Chat zespołu
                </SheetTitle>
                <p className="text-xs text-zinc-400">
                  {messages.length} wiadomości
                </p>
              </div>
            </div>
            
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-9 w-9 rounded-lg transition-colors",
                showSearch ? "bg-pink-500/20 text-pink-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {showSearch && (
            <div className="pt-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  placeholder="Szukaj w wiadomościach..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-zinc-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Messages */}
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="p-4 space-y-1">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-zinc-400 font-medium">
                  {searchQuery ? "Brak wyników" : "Brak wiadomości"}
                </p>
                <p className="text-sm text-zinc-600 mt-1">
                  {searchQuery ? "Spróbuj innej frazy" : "Napisz pierwszą wiadomość!"}
                </p>
              </div>
            ) : (
              groupedMessages.map((group) => (
                <div key={group.date}>
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-zinc-800" />
                    <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
                      {group.date}
                    </span>
                    <div className="flex-1 h-px bg-zinc-800" />
                  </div>
                  
                  <div className="space-y-4">
                    {group.messages.map((msg) => {
                      const isOwn = msg.user_id === user?.id;
                      const replyMessage = msg.reply_to_id 
                        ? messages.find(m => m.id === msg.reply_to_id) 
                        : null;
                      const groupedReactions = groupReactions(msg.reactions || []);

                      return (
                        <div key={msg.id} className="group">
                          {/* Author */}
                          {!isOwn && (
                            <div className="flex items-center gap-2 mb-1.5 ml-11">
                              <span className="text-xs font-medium text-zinc-400">
                                {msg.profile?.full_name || msg.profile?.email?.split("@")[0] || "Użytkownik"}
                              </span>
                              <span className="text-[10px] text-zinc-600">
                                {format(new Date(msg.created_at), "HH:mm")}
                              </span>
                            </div>
                          )}
                          
                          <div className={cn("flex items-start gap-2", isOwn && "flex-row-reverse")}>
                            {/* Avatar */}
                            {!isOwn && (
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                                  {getInitials(msg.profile?.full_name, msg.profile?.email)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={cn("max-w-[80%] space-y-1", isOwn && "items-end flex flex-col")}>
                              {/* Reply preview */}
                              {replyMessage && (
                                <div className={cn(
                                  "flex items-center gap-2 text-[11px] text-zinc-500 px-3 py-1.5 rounded-lg bg-zinc-800/50 border-l-2 border-pink-500/50",
                                  isOwn && "ml-auto"
                                )}>
                                  <Reply className="w-3 h-3 flex-shrink-0 rotate-180" />
                                  <span className="truncate max-w-[200px]">
                                    {replyMessage.content}
                                  </span>
                                </div>
                              )}
                              
                              {/* Reference link */}
                              {msg.reference_type && msg.reference_id && (
                                <button
                                  onClick={() => handleReferenceClick(msg.reference_type, msg.reference_id)}
                                  className={cn(
                                    "flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors",
                                    isOwn 
                                      ? "bg-pink-500/20 text-pink-300 hover:bg-pink-500/30" 
                                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
                                    isOwn && "ml-auto"
                                  )}
                                >
                                  {getRefIcon(msg.reference_type)}
                                  <span className="font-medium">{getRefLabel(msg.reference_type)}:</span>
                                  <span className="truncate max-w-[150px]">{msg.referenceName || "..."}</span>
                                  <ExternalLink className="w-3 h-3 opacity-60" />
                                </button>
                              )}
                              
                              {/* Message bubble */}
                              <div
                                className={cn(
                                  "relative px-4 py-2.5 rounded-2xl",
                                  isOwn 
                                    ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-br-md" 
                                    : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                                )}
                              >
                                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                  {msg.content}
                                </p>
                                
                                {isOwn && (
                                  <span className="text-[10px] text-white/50 mt-1 block text-right">
                                    {format(new Date(msg.created_at), "HH:mm")}
                                  </span>
                                )}
                              </div>
                              
                              {/* Reactions */}
                              {groupedReactions.length > 0 && (
                                <div className={cn("flex flex-wrap gap-1", isOwn && "justify-end")}>
                                  {groupedReactions.map((r) => (
                                    <button
                                      key={r.emoji}
                                      onClick={() => handleReaction(msg.id, r.emoji)}
                                      className={cn(
                                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors",
                                        r.userIds.includes(user?.id || "") 
                                          ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700"
                                      )}
                                      title={r.users.join(", ")}
                                    >
                                      <span>{r.emoji}</span>
                                      <span className="text-[10px]">{r.count}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              {/* Actions */}
                              <div className={cn(
                                "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                isOwn ? "justify-end" : ""
                              )}>
                                {/* Emoji picker */}
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                    >
                                      <Smile className="w-3.5 h-3.5" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-2 bg-zinc-900 border-zinc-800" align={isOwn ? "end" : "start"}>
                                    <div className="flex gap-1">
                                      {EMOJI_OPTIONS.map((emoji) => (
                                        <button
                                          key={emoji}
                                          onClick={() => handleReaction(msg.id, emoji)}
                                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors text-lg"
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                  </PopoverContent>
                                </Popover>
                                
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                  onClick={() => {
                                    setReplyTo(msg);
                                    inputRef.current?.focus();
                                  }}
                                >
                                  <Reply className="w-3.5 h-3.5" />
                                </Button>
                                
                                {(isOwn || isSzef) && (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleDelete(msg.id)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                )}
                              </div>
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
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 space-y-2">
          {replyTo && (
            <div className="flex items-center justify-between bg-zinc-800/50 rounded-lg px-3 py-2 border-l-2 border-pink-500">
              <div className="flex items-center gap-2 text-xs text-zinc-400 min-w-0">
                <Reply className="w-3.5 h-3.5 flex-shrink-0 text-pink-400 rotate-180" />
                <span className="font-medium text-pink-400">Odpowiedź dla {replyTo.profile?.full_name || "użytkownika"}:</span>
                <span className="truncate text-zinc-500">{replyTo.content}</span>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 flex-shrink-0 text-zinc-500 hover:text-white" 
                onClick={() => setReplyTo(null)}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
          
          {selectedReference && (
            <div className="flex items-center justify-between bg-pink-500/10 rounded-lg px-3 py-2 border-l-2 border-pink-500">
              <div className="flex items-center gap-2 text-xs text-pink-300 min-w-0">
                {getRefIcon(selectedReference.type)}
                <span className="font-medium">{getRefLabel(selectedReference.type)}:</span>
                <span className="truncate">{selectedReference.name}</span>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 flex-shrink-0 text-pink-300 hover:text-white" 
                onClick={() => setSelectedReference(null)}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="flex-shrink-0 h-10 w-10 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-zinc-900 border-zinc-800">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <FileText className="w-4 h-4 mr-2 text-blue-400" />
                    Dokumenty ({references.documents.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[250px] overflow-y-auto bg-zinc-900 border-zinc-800">
                    {references.documents.length === 0 ? (
                      <DropdownMenuItem disabled className="text-zinc-500">Brak dokumentów</DropdownMenuItem>
                    ) : (
                      references.documents.map(doc => (
                        <DropdownMenuItem 
                          key={doc.id}
                          onClick={() => setSelectedReference({ type: "document", id: doc.id, name: doc.name })}
                          className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                        >
                          <span className="truncate">{doc.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <Users className="w-4 h-4 mr-2 text-emerald-400" />
                    Klienci ({references.clients.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[250px] overflow-y-auto bg-zinc-900 border-zinc-800">
                    {references.clients.length === 0 ? (
                      <DropdownMenuItem disabled className="text-zinc-500">Brak klientów</DropdownMenuItem>
                    ) : (
                      references.clients.map(client => (
                        <DropdownMenuItem 
                          key={client.id}
                          onClick={() => setSelectedReference({ type: "client", id: client.id, name: client.name })}
                          className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                        >
                          <span className="truncate">{client.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <UserPlus className="w-4 h-4 mr-2 text-amber-400" />
                    Leady ({references.leads.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[250px] overflow-y-auto bg-zinc-900 border-zinc-800">
                    {references.leads.length === 0 ? (
                      <DropdownMenuItem disabled className="text-zinc-500">Brak leadów</DropdownMenuItem>
                    ) : (
                      references.leads.map(lead => (
                        <DropdownMenuItem 
                          key={lead.id}
                          onClick={() => setSelectedReference({ type: "lead", id: lead.id, name: lead.name })}
                          className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                        >
                          <span className="truncate">{lead.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <Target className="w-4 h-4 mr-2 text-purple-400" />
                    Kampanie ({references.campaigns.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[250px] overflow-y-auto bg-zinc-900 border-zinc-800">
                    {references.campaigns.length === 0 ? (
                      <DropdownMenuItem disabled className="text-zinc-500">Brak kampanii</DropdownMenuItem>
                    ) : (
                      references.campaigns.map(campaign => (
                        <DropdownMenuItem 
                          key={campaign.id}
                          onClick={() => setSelectedReference({ type: "campaign", id: campaign.id, name: campaign.name })}
                          className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                        >
                          <span className="truncate">{campaign.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <CheckSquare className="w-4 h-4 mr-2 text-cyan-400" />
                    Zadania ({references.tasks.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[250px] overflow-y-auto bg-zinc-900 border-zinc-800">
                    {references.tasks.length === 0 ? (
                      <DropdownMenuItem disabled className="text-zinc-500">Brak zadań</DropdownMenuItem>
                    ) : (
                      references.tasks.map(task => (
                        <DropdownMenuItem 
                          key={task.id}
                          onClick={() => setSelectedReference({ type: "task", id: task.id, name: task.name })}
                          className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                        >
                          <span className="truncate">{task.name}</span>
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
              className="flex-1 h-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500 rounded-xl"
            />
            
            <Button 
              size="icon"
              onClick={handleSend} 
              disabled={!newMessage.trim() || sending}
              className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
