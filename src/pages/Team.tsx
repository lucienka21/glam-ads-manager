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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Crown, User, Search, Circle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { TeamChatPanel } from "@/components/chat/TeamChatPanel";

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
}

interface UserWithRole extends Profile {
  role: string | null;
}

export default function Team() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<UserWithRole[]>([]);
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

  useEffect(() => {
    fetchProfiles();

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

  const onlineCount = profiles.filter(p => p.status === "online").length;

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Zespół</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {profiles.length} członków • {onlineCount} online
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              Członkowie
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Czat zespołowy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj członka zespołu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Ładowanie...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.map((profile) => (
                  <Card 
                    key={profile.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => navigate(`/profile/${profile.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={profile.avatar_url || ""} />
                            <AvatarFallback className={profile.role === "szef" ? "bg-amber-500/20" : "bg-primary/20"}>
                              {profile.role === "szef" ? (
                                <Crown className="w-6 h-6 text-amber-500" />
                              ) : (
                                <User className="w-6 h-6 text-primary" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background",
                            getStatusColor(profile.status)
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground truncate">
                              {profile.full_name || profile.email?.split("@")[0] || "Użytkownik"}
                            </h3>
                            {profile.role === "szef" && (
                              <Badge variant="outline" className="text-amber-500 border-amber-500/30 text-xs">
                                Szef
                              </Badge>
                            )}
                          </div>
                          {profile.position && (
                            <p className="text-sm text-muted-foreground truncate">
                              {profile.position}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                            <Circle className={cn("w-2 h-2 fill-current", 
                              profile.status === "online" ? "text-emerald-500" :
                              profile.status === "away" ? "text-amber-500" : "text-zinc-500"
                            )} />
                            <span>{getStatusLabel(profile.status)}</span>
                            {profile.status !== "online" && profile.last_seen_at && (
                              <span className="text-muted-foreground/70">
                                • {formatDistanceToNow(new Date(profile.last_seen_at), { locale: pl, addSuffix: true })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {profile.bio && (
                        <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                          {profile.bio}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">Nie znaleziono członków zespołu</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                  Czat zespołowy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <TeamChatPanel />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
