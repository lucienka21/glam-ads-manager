import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, MessageSquare, Crown, User, Search, Circle, Shield, 
  FileText, CheckCircle2, Clock, TrendingUp, Activity, Mail, Phone,
  Briefcase, Calendar, BarChart3
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { EmbeddedTeamChat } from "@/components/chat/EmbeddedTeamChat";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  position: string | null;
  status: string | null;
  last_seen_at: string | null;
  bio: string | null;
  phone: string | null;
  created_at: string;
}

interface UserWithRole extends Profile {
  role: string | null;
}

interface UserStats {
  userId: string;
  documentsCount: number;
  tasksCompleted: number;
  messagesCount: number;
}

interface RecentActivity {
  id: string;
  type: 'document' | 'task' | 'message';
  title: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export default function Team() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<UserWithRole[]>([]);
  const [userStats, setUserStats] = useState<Record<string, UserStats>>({});
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("members");

  const fetchProfiles = async () => {
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      setLoading(false);
      return;
    }

    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("user_id, role");

    const profilesWithRoles = (profilesData || []).map((profile) => {
      const userRole = rolesData?.find((r) => r.user_id === profile.id);
      return {
        ...profile,
        role: userRole?.role || null,
      };
    });

    setProfiles(profilesWithRoles);
    setLoading(false);
  };

  const fetchUserStats = async () => {
    // Fetch document counts per user
    const { data: docsData } = await supabase
      .from("documents")
      .select("created_by");
    
    // Fetch completed tasks per user
    const { data: tasksData } = await supabase
      .from("tasks")
      .select("completed_by")
      .not("completed_by", "is", null);
    
    // Fetch messages per user
    const { data: messagesData } = await supabase
      .from("team_messages")
      .select("user_id");

    const stats: Record<string, UserStats> = {};
    
    docsData?.forEach(d => {
      if (d.created_by) {
        if (!stats[d.created_by]) {
          stats[d.created_by] = { userId: d.created_by, documentsCount: 0, tasksCompleted: 0, messagesCount: 0 };
        }
        stats[d.created_by].documentsCount++;
      }
    });

    tasksData?.forEach(t => {
      if (t.completed_by) {
        if (!stats[t.completed_by]) {
          stats[t.completed_by] = { userId: t.completed_by, documentsCount: 0, tasksCompleted: 0, messagesCount: 0 };
        }
        stats[t.completed_by].tasksCompleted++;
      }
    });

    messagesData?.forEach(m => {
      if (m.user_id) {
        if (!stats[m.user_id]) {
          stats[m.user_id] = { userId: m.user_id, documentsCount: 0, tasksCompleted: 0, messagesCount: 0 };
        }
        stats[m.user_id].messagesCount++;
      }
    });

    setUserStats(stats);
  };

  const fetchRecentActivities = async () => {
    const [docsRes, tasksRes, messagesRes] = await Promise.all([
      supabase.from("documents").select("id, title, created_by, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("tasks").select("id, title, completed_by, completed_at").not("completed_by", "is", null).order("completed_at", { ascending: false }).limit(5),
      supabase.from("team_messages").select("id, content, user_id, created_at").order("created_at", { ascending: false }).limit(5),
    ]);

    const { data: profilesData } = await supabase.from("profiles").select("id, full_name, email");
    const profileMap = new Map(profilesData?.map(p => [p.id, p.full_name || p.email?.split("@")[0] || "Użytkownik"]));

    const activities: RecentActivity[] = [];

    docsRes.data?.forEach(d => {
      if (d.created_by) {
        activities.push({
          id: d.id,
          type: 'document',
          title: `Utworzono dokument "${d.title}"`,
          userId: d.created_by,
          userName: profileMap.get(d.created_by) || "Użytkownik",
          createdAt: d.created_at,
        });
      }
    });

    tasksRes.data?.forEach(t => {
      if (t.completed_by && t.completed_at) {
        activities.push({
          id: t.id,
          type: 'task',
          title: `Ukończono zadanie "${t.title}"`,
          userId: t.completed_by,
          userName: profileMap.get(t.completed_by) || "Użytkownik",
          createdAt: t.completed_at,
        });
      }
    });

    messagesRes.data?.forEach(m => {
      activities.push({
        id: m.id,
        type: 'message',
        title: `Wysłano wiadomość: "${m.content.slice(0, 40)}${m.content.length > 40 ? "..." : ""}"`,
        userId: m.user_id,
        userName: profileMap.get(m.user_id) || "Użytkownik",
        createdAt: m.created_at,
      });
    });

    activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setRecentActivities(activities.slice(0, 10));
  };

  useEffect(() => {
    fetchProfiles();
    fetchUserStats();
    fetchRecentActivities();

    const channel = supabase
      .channel("profiles-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => fetchProfiles()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.full_name?.toLowerCase().includes(searchLower) ||
      profile.email?.toLowerCase().includes(searchLower) ||
      profile.position?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "away":
        return "bg-amber-500";
      default:
        return "bg-zinc-500";
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case "online":
        return "Online";
      case "away":
        return "Zaraz wracam";
      default:
        return "Offline";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'task': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-pink-400" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const onlineCount = profiles.filter(p => p.status === "online").length;
  const totalDocuments = Object.values(userStats).reduce((sum, s) => sum + s.documentsCount, 0);
  const totalTasksCompleted = Object.values(userStats).reduce((sum, s) => sum + s.tasksCompleted, 0);
  const totalMessages = Object.values(userStats).reduce((sum, s) => sum + s.messagesCount, 0);

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Zespół
            </h1>
            <p className="text-muted-foreground mt-1">
              Zarządzaj zespołem i komunikuj się w czasie rzeczywistym
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2 px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {onlineCount} online
            </Badge>
            <Badge variant="secondary" className="gap-2 px-3 py-1.5">
              <Users className="w-4 h-4" />
              {profiles.length} członków
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Członkowie</p>
                  <p className="text-3xl font-bold text-foreground">{profiles.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Dokumenty</p>
                  <p className="text-3xl font-bold text-foreground">{totalDocuments}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ukończone zadania</p>
                  <p className="text-3xl font-bold text-foreground">{totalTasksCompleted}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wiadomości</p>
                  <p className="text-3xl font-bold text-foreground">{totalMessages}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-secondary/50">
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              Członkowie
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="w-4 h-4" />
              Aktywność
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Czat
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj członka zespołu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary/30 border-border/50"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Ładowanie...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map((profile) => {
                  const stats = userStats[profile.id] || { documentsCount: 0, tasksCompleted: 0, messagesCount: 0 };
                  
                  return (
                    <Card 
                      key={profile.id}
                      className="cursor-pointer hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/5 group"
                      onClick={() => navigate(`/profile/${profile.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <Avatar className="w-16 h-16 border-2 border-border group-hover:border-pink-500/50 transition-colors">
                              <AvatarImage src={profile.avatar_url || ""} />
                              <AvatarFallback className={cn(
                                "text-lg",
                                profile.role === "szef" ? "bg-amber-500/20 text-amber-400" : "bg-pink-500/20 text-pink-400"
                              )}>
                                {profile.role === "szef" ? (
                                  <Crown className="w-7 h-7" />
                                ) : (
                                  <User className="w-7 h-7" />
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-background",
                              getStatusColor(profile.status)
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-foreground truncate">
                                {profile.full_name || profile.email?.split("@")[0] || "Użytkownik"}
                              </h3>
                            </div>
                            {profile.position && (
                              <p className="text-sm text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                                <Briefcase className="w-3 h-3" />
                                {profile.position}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {profile.role === "szef" && (
                                <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 text-xs gap-1">
                                  <Crown className="w-3 h-3" />
                                  Szef
                                </Badge>
                              )}
                              {profile.role === "pracownik" && (
                                <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-500/10 text-xs gap-1">
                                  <Shield className="w-3 h-3" />
                                  Pracownik
                                </Badge>
                              )}
                              <Badge variant="outline" className={cn(
                                "text-xs gap-1",
                                profile.status === "online" ? "text-emerald-400 border-emerald-500/30" :
                                profile.status === "away" ? "text-amber-400 border-amber-500/30" : 
                                "text-zinc-400 border-zinc-500/30"
                              )}>
                                <Circle className={cn("w-2 h-2 fill-current")} />
                                {getStatusLabel(profile.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{stats.documentsCount}</p>
                            <p className="text-xs text-muted-foreground">Dokumentów</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{stats.tasksCompleted}</p>
                            <p className="text-xs text-muted-foreground">Zadań</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-foreground">{stats.messagesCount}</p>
                            <p className="text-xs text-muted-foreground">Wiadomości</p>
                          </div>
                        </div>

                        {/* Contact info */}
                        {(profile.email || profile.phone) && (
                          <div className="mt-4 pt-4 border-t border-border/50 space-y-1">
                            {profile.email && (
                              <p className="text-xs text-muted-foreground flex items-center gap-2 truncate">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                {profile.email}
                              </p>
                            )}
                            {profile.phone && (
                              <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <Phone className="w-3 h-3 flex-shrink-0" />
                                {profile.phone}
                              </p>
                            )}
                          </div>
                        )}

                        {profile.last_seen_at && profile.status !== "online" && (
                          <p className="text-xs text-muted-foreground/70 mt-3 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Ostatnio: {formatDistanceToNow(new Date(profile.last_seen_at), { locale: pl, addSuffix: true })}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {!loading && filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">Nie znaleziono członków zespołu</p>
              </div>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity Feed */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-pink-400" />
                    Ostatnia aktywność
                  </CardTitle>
                  <CardDescription>
                    Przegląd najnowszych działań zespołu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    {recentActivities.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        Brak aktywności do wyświetlenia
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div 
                            key={`${activity.type}-${activity.id}`}
                            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground">
                                <span className="font-medium text-pink-400">{activity.userName}</span>
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {activity.title}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                {formatDistanceToNow(new Date(activity.createdAt), { locale: pl, addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Ranking
                  </CardTitle>
                  <CardDescription>
                    Najbardziej aktywni członkowie
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profiles
                      .map(p => ({
                        ...p,
                        totalActivity: (userStats[p.id]?.documentsCount || 0) + 
                                       (userStats[p.id]?.tasksCompleted || 0) + 
                                       (userStats[p.id]?.messagesCount || 0)
                      }))
                      .sort((a, b) => b.totalActivity - a.totalActivity)
                      .slice(0, 5)
                      .map((profile, index) => (
                        <div 
                          key={profile.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
                          onClick={() => navigate(`/profile/${profile.id}`)}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            index === 0 ? "bg-amber-500/20 text-amber-400" :
                            index === 1 ? "bg-zinc-400/20 text-zinc-300" :
                            index === 2 ? "bg-orange-500/20 text-orange-400" :
                            "bg-secondary text-muted-foreground"
                          )}>
                            {index + 1}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={profile.avatar_url || ""} />
                            <AvatarFallback className="bg-pink-500/20 text-pink-400">
                              {(profile.full_name || profile.email || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {profile.full_name || profile.email?.split("@")[0]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {profile.totalActivity} działań
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Quick stats */}
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Śr. dokumentów/osoba
                      </span>
                      <span className="font-medium">
                        {profiles.length > 0 ? (totalDocuments / profiles.length).toFixed(1) : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Śr. zadań/osoba
                      </span>
                      <span className="font-medium">
                        {profiles.length > 0 ? (totalTasksCompleted / profiles.length).toFixed(1) : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                  Czat zespołowy
                </CardTitle>
                <CardDescription>
                  Komunikuj się z zespołem w czasie rzeczywistym
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <EmbeddedTeamChat />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
