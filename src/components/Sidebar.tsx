import { LayoutDashboard, Users, Megaphone, Calendar, Settings } from "lucide-react";
import { NavLink } from "./NavLink";

const Sidebar = () => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/clients", icon: Users, label: "Klienci" },
    { to: "/campaigns", icon: Megaphone, label: "Kampanie" },
    { to: "/calendar", icon: Calendar, label: "Kalendarz" },
    { to: "/settings", icon: Settings, label: "Ustawienia" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Beauty CRM
        </h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Facebook Ads Manager</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-sm text-sidebar-foreground font-medium">Need help?</p>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Contact support</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
