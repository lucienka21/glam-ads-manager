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
  Zap,
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  defaultOpen?: boolean;
}

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isSzef, role } = useUserRole();
  const currentPath = location.pathname;
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Główne": true,
    "CRM": true,
    "Narzędzia": false,
    "Administracja": true,
  });

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

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
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
    { label: "Główne", icon: LayoutDashboard, items: mainNavItems, defaultOpen: true },
    { label: "CRM", icon: Briefcase, items: crmItems, defaultOpen: true },
    { label: "Narzędzia", icon: Wand2, items: generatorItems, defaultOpen: false },
  ];

  if (isSzef) {
    sections.push({
      label: "Administracja",
      icon: Shield,
      items: [{ title: "Zarządzanie rolami", url: "/roles", icon: Shield }],
      defaultOpen: true,
    });
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header with logo */}
      <div className="flex-shrink-0 p-4 border-b border-sidebar-border/50">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigate("/")}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all group-hover:shadow-glow-sm">
              <img src={agencyLogo} alt="Aurine" className="w-6 h-6 object-contain" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-sidebar" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-sidebar-foreground tracking-tight">Aurine</span>
            <span className="text-[9px] text-primary font-semibold uppercase tracking-widest">Beauty CRM</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex-shrink-0 p-3 border-b border-sidebar-border/30">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigate("/leads")}
            className="flex-1 h-8 text-xs bg-sidebar-accent/50 border-sidebar-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Nowy lead
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigate("/tasks")}
            className="h-8 px-2.5 bg-sidebar-accent/50 border-sidebar-border/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
          >
            <CheckSquare className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Navigation - scrollable */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <div className="space-y-1">
          {sections.map((section) => {
            const isOpen = openSections[section.label] ?? section.defaultOpen;
            const hasActiveItem = section.items.some(item => isActive(item.url));
            
            return (
              <Collapsible 
                key={section.label} 
                open={isOpen} 
                onOpenChange={() => toggleSection(section.label)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                    hasActiveItem 
                      ? "text-primary bg-primary/5" 
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}>
                    <div className="flex items-center gap-2">
                      <section.icon className="w-3.5 h-3.5" />
                      <span>{section.label}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 transition-transform" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.url}
                      onClick={() => handleNavigate(item.url)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group",
                        isActive(item.url)
                          ? "bg-primary/15 text-primary font-medium shadow-sm"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4 flex-shrink-0 transition-colors",
                        isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"
                      )} />
                      <span className="flex-1 text-left truncate">{item.title}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </nav>

      {/* Footer with user and settings */}
      <div className="flex-shrink-0 border-t border-sidebar-border/50 p-3 space-y-2">
        {/* Settings button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleNavigate("/settings")}
          className="w-full h-8 justify-start text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="text-sm">Ustawienia</span>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full h-auto p-2.5 justify-start gap-2.5 bg-sidebar-accent/40 hover:bg-sidebar-accent/70 rounded-lg border border-sidebar-border/40"
            >
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                isSzef 
                  ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30" 
                  : "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
              )}>
                {isSzef ? (
                  <Crown className="w-4 h-4 text-amber-400" />
                ) : (
                  <User className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex-1 text-left overflow-hidden min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.email?.split('@')[0] || 'Użytkownik'}
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  {isSzef && <Zap className="w-2.5 h-2.5 text-amber-400" />}
                  {role ? (role === 'szef' ? 'Administrator' : 'Pracownik') : 'Brak roli'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-52 bg-popover border-border/50">
            <DropdownMenuItem onClick={() => handleNavigate(`/profile/${user?.id}`)} className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Mój profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigate("/settings")} className="cursor-pointer">
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
      </div>
    </aside>
  );
}