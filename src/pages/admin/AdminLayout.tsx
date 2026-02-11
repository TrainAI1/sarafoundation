import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, FileText, PenTool, LogOut, Home,
  Users, MessageSquare, Image, Settings, Menu, X, ChevronRight, Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navGroups = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { label: "Blog Posts", path: "/admin/blog", icon: PenTool },
      { label: "Pages", path: "/admin/pages", icon: FileText },
      { label: "Partners", path: "/admin/partners", icon: Handshake },
      { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
      { label: "Team", path: "/admin/team", icon: Users },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Site Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout() {
  const { isAdmin, loading } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-foreground text-lg">Sara Admin</h2>
          <p className="text-xs text-muted-foreground">Content Management</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Home className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-card border-b border-border flex items-center justify-between px-4 h-14">
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-display font-bold text-foreground text-base">Sara Admin</h2>
        <div className="w-9" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card flex flex-col z-50 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 bg-card border-r border-border flex-col fixed h-full z-20">
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
