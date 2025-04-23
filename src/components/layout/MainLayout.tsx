
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Home, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!collapsed && <h2 className="text-xl font-bold">Weave CM</h2>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-sidebar-foreground"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {[
              { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
              { icon: <FileText size={20} />, label: 'Cases', path: '/cases' },
              { icon: <Users size={20} />, label: 'Clients', path: '/clients' },
              { icon: <BookOpen size={20} />, label: 'Reports', path: '/reports' },
              { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
            ].map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-sidebar-accent group",
                    window.location.pathname === item.path ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && (
                    <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-sidebar-accent text-sidebar-foreground text-sm invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-semibold">
            A
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-sidebar-foreground/70">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container py-6 max-w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
