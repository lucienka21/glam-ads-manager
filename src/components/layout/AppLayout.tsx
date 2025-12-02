import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu } from "lucide-react";
import { TeamChatPanel } from "@/components/chat/TeamChatPanel";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface AppLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

export function AppLayout({ children, fullScreen = false }: AppLayoutProps) {
  if (fullScreen) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Mobile header */}
          <header className="lg:hidden flex items-center justify-between gap-3 p-4 border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <span className="text-sm font-medium text-foreground">Aurine</span>
            </div>
            <NotificationBell />
          </header>
          
          {/* Desktop notification bell */}
          <div className="hidden lg:flex justify-end p-4 pb-0">
            <NotificationBell />
          </div>
          
          {/* Main content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
        
        {/* Team Chat - available globally */}
        <TeamChatPanel />
      </div>
    </SidebarProvider>
  );
}
