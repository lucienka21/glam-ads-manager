import { Menu } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarNav } from "./SidebarNav";
import { TeamChatPanel } from "@/components/chat/TeamChatPanel";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useActivityStatus } from "@/hooks/useActivityStatus";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import agencyLogo from "@/assets/agency-logo.png";

interface AppLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

export function AppLayout({ children, fullScreen = false }: AppLayoutProps) {
  useActivityStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (fullScreen) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background w-screen max-w-[100vw] overflow-x-hidden">
      {/* Desktop sidebar - fixed position */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 px-3 h-14 border-b border-border/30 bg-background/95 backdrop-blur-xl safe-area-top">
        <div className="flex items-center gap-2 min-w-0">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] max-w-[85vw] p-0 bg-sidebar border-sidebar-border safe-area-left">
              <SidebarNav 
                onNavigate={() => setMobileMenuOpen(false)} 
                showCloseButton 
                onClose={() => setMobileMenuOpen(false)} 
              />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 min-w-0">
            <img src={agencyLogo} alt="Aurine" className="w-7 h-7 shrink-0" />
            <span className="text-sm font-bold text-foreground truncate">Aurine</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <GlobalSearch />
          <NotificationBell />
        </div>
      </header>

      {/* Main content area - offset by sidebar width on desktop */}
      <main className="lg:ml-64 min-h-screen min-h-[100dvh] w-full max-w-[100vw] lg:max-w-[calc(100vw-16rem)] overflow-x-hidden">
        {/* Desktop header with search and notifications */}
        <div className="hidden lg:flex justify-end items-center gap-3 p-4 sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border/20">
          <GlobalSearch />
          <NotificationBell />
        </div>

        {/* Mobile spacer for fixed header */}
        <div className="lg:hidden h-14" />
        
        {/* Page content */}
        <div className="min-h-[calc(100vh-64px)] min-h-[calc(100dvh-64px)] w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
      
      {/* Team Chat - hidden on mobile */}
      <div className="hidden lg:block">
        <TeamChatPanel />
      </div>
    </div>
  );
}