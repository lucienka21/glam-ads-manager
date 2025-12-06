import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu, Sparkles } from "lucide-react";
import { TeamChatPanel } from "@/components/chat/TeamChatPanel";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useActivityStatus } from "@/hooks/useActivityStatus";

interface AppLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

export function AppLayout({ children, fullScreen = false }: AppLayoutProps) {
  useActivityStatus();
  
  if (fullScreen) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Mobile header */}
          <header className="lg:hidden flex items-center justify-between gap-3 p-4 border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="p-2 hover:bg-secondary/50 rounded-lg transition-colors border border-border/30">
                <Menu className="w-5 h-5 text-foreground" />
              </SidebarTrigger>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Aurine</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GlobalSearch />
              <NotificationBell />
            </div>
          </header>
          
          {/* Desktop header with search and notifications */}
          <div className="hidden lg:flex justify-end items-center gap-3 p-4 pb-0">
            <GlobalSearch />
            <NotificationBell />
          </div>
          
          {/* Main content */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            {children}
          </div>
        </main>
        
        {/* Team Chat */}
        <TeamChatPanel />
      </div>
    </SidebarProvider>
  );
}
