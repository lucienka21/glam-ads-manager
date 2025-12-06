import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
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
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar - fixed position */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 h-14 border-b border-border/30 bg-background/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
              <AppSidebar />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <img src={agencyLogo} alt="Aurine" className="w-6 h-6" />
            <span className="text-sm font-bold text-foreground">Aurine</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <NotificationBell />
        </div>
      </header>

      {/* Main content area - offset by sidebar width on desktop */}
      <main className="lg:ml-64 min-h-screen">
        {/* Desktop header with search and notifications */}
        <div className="hidden lg:flex justify-end items-center gap-3 p-4 sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border/20">
          <GlobalSearch />
          <NotificationBell />
        </div>

        {/* Mobile spacer for fixed header */}
        <div className="lg:hidden h-14" />
        
        {/* Page content */}
        <div className="overflow-auto">
          {children}
        </div>
      </main>
      
      {/* Team Chat */}
      <TeamChatPanel />
    </div>
  );
}