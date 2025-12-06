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
  Settings,
  Wand2,
  Palette,
  ChevronRight,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import agencyLogo from "@/assets/agency-logo.png";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isSzef, role } = useUserRole();
  const currentPath = location.pathname;
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'crm', 'generators']);

  const isActive = (path: string) => currentPath === path;

  useEffect(() => {
    if (!user) return;

    const loadIncompleteTasks = async () => {
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      const isSzefUser = userRoles?.role === 'szef';

      const { data, error } = await supabase
        .from('tasks')
        .select('id, status, assigned_to, is_agency_task, created_by')
        .neq('status', 'completed');

      if (error) {
        console.error('Error loading incomplete tasks:', error);
        return;
      }

      const incomplete = (data || []).filter((task) => {
        if (isSzefUser) {
          return (
            task.assigned_to === user.id ||
            task.is_agency_task ||
            (task.created_by === user.id && !task.assigned_to && !task.is_agency_task)
          );
        } else {
          return task.assigned_to === user.id || task.is_agency_task;
        }
      }).length;

      setIncompleteTasks(incomplete);
    };

    loadIncompleteTasks();

    const channel = supabase
      .channel('task-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        loadIncompleteTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const mainNavItems: NavItem[] = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Zadania", url: "/tasks", icon: CheckSquare, badge: incompleteTasks || undefined },
    { title: "Zespół", url: "/team", icon: UsersRound },
    { title: "Powiadomienia", url: "/notifications", icon: Bell },
    { title: "Historia", url: "/history", icon: History },
  ];

  const crmItems: NavItem[] = [
    { title: "Leady", url: "/leads", icon: UserPlus },
    { title: "Klienci", url: "/clients", icon: Users },
    { title: "Lejek sprzedażowy", url: "/funnel", icon: TrendingDown },
    { title: "Kalendarz", url: "/calendar", icon: Calendar },
    { title: "Kampanie", url: "/campaigns", icon: Target },
    { title: "Szablony email", url: "/email-templates", icon: Mail },
    { title: "Szablony SMS", url: "/sms-templates", icon: MessageSquare },
    { title: "Raporty miesięczne", url: "/monthly-report", icon: BarChart3 },
  ];

  const generatorItems: NavItem[] = [
    { title: "Kampania AI", url: "/campaign-generator", icon: Wand2 },
    { title: "Kreator grafik", url: "/graphics-creator", icon: Palette },
    { title: "Generator raportów", url: "/report-generator", icon: FileText },
    { title: "Generator faktur", url: "/invoice-generator", icon: Receipt },
    { title: "Generator umów", url: "/contract-generator", icon: FileSignature },
    { title: "Generator prezentacji", url: "/presentation-generator", icon: Presentation },
    { title: "Generator ofert", url: "/proposal-generator", icon: Sparkles },
    { title: "Kalkulator ROI", url: "/roi-calculator", icon: BarChart3 },
  ];

  const sections: NavSection[] = [
    { label: "Główne", items: mainNavItems },
    { label: "CRM", items: crmItems },
    { label: "Narzędzia", items: generatorItems },
  ];

  if (isSzef) {
    sections.push({
      label: "Administracja",
      items: [{ title: "Zarządzanie rolami", url: "/roles", icon: Shield }],
    });
  }

  const toggleSection = (label: string) => {
    setExpandedSections(prev => 
      prev.includes(label) 
        ? prev.filter(s => s !== label) 
        : [...prev, label]
    );
  };

  return (
    <Sidebar className="border-r border-border/30 bg-sidebar">
      {/* Header with logo */}
      <SidebarHeader className="p-5 border-b border-border/20">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-colors">
              <img src={agencyLogo} alt="Aurine" className="w-7 h-7 object-contain" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-sidebar animate-pulse-glow" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight">Aurine</span>
            <span className="text-[10px] text-primary font-medium uppercase tracking-widest">Beauty CRM</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="p-0">
        <ScrollArea className="h-full custom-scrollbar">
          <div className="p-3 space-y-2">
            {sections.map((section) => (
              <div key={section.label} className="space-y-1">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{section.label}</span>
                  <ChevronRight 
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      expandedSections.includes(section.label) && "rotate-90"
                    )}
                  />
                </button>

                {/* Section items */}
                {expandedSections.includes(section.label) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <button
                        key={item.url}
                        onClick={() => navigate(item.url)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                          isActive(item.url)
                            ? "bg-primary/15 text-primary border-l-2 border-primary ml-0.5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        <item.icon className={cn(
                          "w-4 h-4 flex-shrink-0 transition-colors",
                          isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )} />
                        <span className="flex-1 text-left truncate font-medium">{item.title}</span>
                        {item.badge && item.badge > 0 && (
                          <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>

      {/* Footer with user */}
      <SidebarFooter className="p-4 border-t border-border/20 space-y-3">
        {/* Quick actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/settings")}
            className="flex-1 h-9 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Ustawienia
          </Button>
        </div>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full h-auto p-3 justify-start gap-3 bg-secondary/30 hover:bg-secondary/50 rounded-xl border border-border/30"
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                isSzef ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30" : "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
              )}>
                {isSzef ? (
                  <Crown className="w-5 h-5 text-amber-400" />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user?.email?.split('@')[0] || 'Użytkownik'}
                </p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  {isSzef && <Zap className="w-3 h-3 text-amber-400" />}
                  {role ? (role === 'szef' ? 'Administrator' : 'Pracownik') : 'Brak roli'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover border-border/50">
            <DropdownMenuItem onClick={() => navigate(`/profile/${user?.id}`)} className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Mój profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Ustawienia
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj się
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Branding */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60">
          <Sparkles className="w-3 h-3 text-primary/60" />
          <span>Powered by Aurine</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
