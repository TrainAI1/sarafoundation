import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, FileText, PenTool, LogOut, Home,
  Users, MessageSquare, Image, Settings, Menu, X, ChevronRight, Handshake,
  HelpCircle, Mail, Newspaper, BarChart3, GraduationCap, Shield, Briefcase,
  UserCog, ScrollText
} from "lucide-react";

type Capability = "content" | "submissions" | "admin" | "any";

interface NavItem { label: string; path: string; icon: typeof Mail; cap: Capability }
interface NavGroup { label: string; cap: Capability; items: NavItem[] }

const navGroups: NavGroup[] = [
  {
    label: "Overview", cap: "any",
    items: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard, cap: "any" },
      { label: "Analytics", path: "/admin/analytics", icon: BarChart3, cap: "any" },
    ],
  },
  {
    label: "Content", cap: "content",
    items: [
      { label: "Blog Posts", path: "/admin/blog", icon: PenTool, cap: "content" },
      { label: "Pages", path: "/admin/pages", icon: FileText, cap: "content" },
      { label: "FAQ", path: "/admin/faq", icon: HelpCircle, cap: "content" },
      { label: "Partners", path: "/admin/partners", icon: Handshake, cap: "content" },
      { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare, cap: "content" },
      { label: "Team", path: "/admin/team", icon: Users, cap: "content" },
      { label: "Media Library", path: "/admin/media", icon: Image, cap: "content" },
    ],
  },
  {
    label: "Inbox & Pipeline", cap: "submissions",
    items: [
      { label: "Contact Messages", path: "/admin/contacts", icon: Mail, cap: "submissions" },
      { label: "Newsletter", path: "/admin/newsletter", icon: Newspaper, cap: "submissions" },
      { label: "CAP Applications", path: "/admin/cap-applications", icon: GraduationCap, cap: "submissions" },
      { label: "FLIP Applications", path: "/admin/flip-applications", icon: GraduationCap, cap: "submissions" },
      { label: "GJP Applications", path: "/admin/gjp-applications", icon: Briefcase, cap: "submissions" },
    ],
  },
  {
    label: "Admin", cap: "admin",
    items: [
      { label: "Users & Roles", path: "/admin/users", icon: UserCog, cap: "admin" },
      { label: "Audit Log", path: "/admin/audit-log", icon: ScrollText, cap: "admin" },
      { label: "Site Settings", path: "/admin/settings", icon: Settings, cap: "admin" },
      { label: "Site Health & Backup", path: "/admin/site-health", icon: Shield, cap: "admin" },
    ],
  },
];

export default function AdminLayout() {
  const { isAdmin, canEditContent, canModerate, loading, roles, email } = useAdmin();
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

  if (!isAdmin && !canEditContent && !canModerate) return null;

  const allow = (cap: Capability) =>
    cap === "any" ||
    (cap === "admin" && isAdmin) ||
    (cap === "content" && canEditContent) ||
    (cap === "submissions" && canModerate);

  const visibleGroups = navGroups
    .filter((g) => allow(g.cap))
    .map((g) => ({ ...g, items: g.items.filter((i) => allow(i.cap)) }))
    .filter((g) => g.items.length > 0);

  const primaryRole = isAdmin ? "admin" : roles[0] ?? "viewer";
  const roleBadge = {
    admin: "bg-primary/15 text-primary",
    editor: "bg-accent/15 text-accent",
    moderator: "bg-success/15 text-success",
    viewer: "bg-muted text-muted-foreground",
  }[primaryRole] || "bg-muted text-muted-foreground";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="min-w-0">
          <h2 className="font-display font-bold text-foreground text-lg">Sara Admin</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${roleBadge}`}>
              {primaryRole}
            </span>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {visibleGroups.map((group) => (
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
