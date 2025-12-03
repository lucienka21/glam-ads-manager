import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  FileSignature, 
  Presentation,
  History,
  Sparkles,
  Users,
  UserPlus,
  LogOut,
  User,
  Shield,
  Crown,
  Target,
  Mail,
  CheckSquare,
  TrendingDown,
  Bell,
  UsersRound,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import agencyLogo from "@/assets/agency-logo.png";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Zadania", url: "/tasks", icon: CheckSquare },
  { title: "Zespół", url: "/team", icon: UsersRound },
  { title: "Powiadomienia", url: "/notifications", icon: Bell },
  { title: "Historia", url: "/history", icon: History },
];

const crmItems = [
  { title: "Leady", url: "/leads", icon: UserPlus },
  { title: "Klienci", url: "/clients", icon: Users },
  { title: "Lejek", url: "/funnel", icon: TrendingDown },
  { title: "Kalendarz", url: "/calendar", icon: Calendar },
  { title: "Kampanie", url: "/campaigns", icon: Target },
  { title: "Szablony email", url: "/email-templates", icon: Mail },
  { title: "Szablony SMS", url: "/sms-templates", icon: MessageSquare },
  { title: "Raport miesięczny", url: "/monthly-report", icon: BarChart3 },
];

const generatorItems = [
  { title: "Raporty", url: "/report-generator", icon: FileText },
  { title: "Faktury", url: "/invoice-generator", icon: Receipt },
  { title: "Umowy", url: "/contract-generator", icon: FileSignature },
  { title: "Prezentacje", url: "/presentation-generator", icon: Presentation },
  { title: "Oferty", url: "/proposal-generator", icon: Sparkles },
  { title: "Kalkulator ROI", url: "/roi-calculator", icon: BarChart3 },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isSzef, role } = useUserRole();
  const currentPath = location.pathname;
  const [incompleteTasks, setIncompleteTasks] = useState(0);

  const isActive = (path: string) => currentPath === path;

  useEffect(() => {
    if (!user) return;

    const loadIncompleteTasks = async () => {
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      const isSzef = userRoles?.role === 'szef';

      const { data, error } = await supabase
        .from('tasks')
        .select('id, status, assigned_to, is_agency_task, created_by')
        .neq('status', 'completed');

      if (error) {
        console.error('Error loading incomplete tasks:', error);
        return;
      }

      const incomplete = (data || []).filter((task) => {
        if (isSzef) {
          // Szef sees only their own tasks and agency tasks
          return (
            task.assigned_to === user.id ||
            task.is_agency_task ||
            (task.created_by === user.id && !task.assigned_to && !task.is_agency_task)
          );
        } else {
          // Pracownik sees tasks assigned to them and agency tasks
          return task.assigned_to === user.id || task.is_agency_task;
        }
      }).length;

      setIncompleteTasks(incomplete);
    };

    loadIncompleteTasks();

    // Subscribe to task changes for real-time updates
    const channel = supabase
      .channel('task-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        () => {
          loadIncompleteTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar">
      <SidebarHeader className="p-4 border-b border-border/30">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center overflow-hidden">
            <img src={agencyLogo} alt="Aurine" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">Aurine CRM</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Beauty Agency</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">
            Nawigacja
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.url)
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.title === "Zadania" && incompleteTasks > 0 && (
                      <span className="ml-auto bg-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {incompleteTasks}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">
            CRM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {crmItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.url)
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">
            Generatory
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generatorItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.url)
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Szef only: Role management */}
        {isSzef && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">
              Administracja
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate("/roles")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive("/roles")
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Zarządzanie rolami</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/30 space-y-3">
        {/* User info and logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isSzef ? 'bg-amber-500/20' : 'bg-primary/20'
              }`}>
                {isSzef ? (
                  <Crown className="w-4 h-4 text-amber-500" />
                ) : (
                  <User className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.email?.split('@')[0] || 'Użytkownik'}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {role ? (role === 'szef' ? 'Szef' : 'Pracownik') : 'Brak roli'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate(`/profile/${user?.id}`)}>
              <User className="w-4 h-4 mr-2" />
              Mój profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Ustawienia
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj się
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Sparkles className="w-3 h-3 text-pink-400" />
          <span>Powered by Aurine</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
