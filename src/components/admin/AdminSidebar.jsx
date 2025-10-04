import { useState } from "react";
import {
  BarChart3,
  Bed,
  Calendar,
  FileText,
  Home,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Reservations", url: "/reservations", icon: Calendar },
  { title: "Rooms", url: "/rooms", icon: Bed },
  { title: "Users", url: "/users", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 
          ${isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64"} 
          bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out
          flex flex-col shadow-lg
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Hotel Admin</h1>
                <p className="text-xs text-sidebar-foreground/70">Management System</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 text-sm text-sidebar-foreground/60">
              <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">A</span>
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-xs">admin@hotel.com</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-30"
        onClick={() => setIsCollapsed(false)}
      >
        <Menu className="w-4 h-4" />
      </Button>
    </>
  );
}
