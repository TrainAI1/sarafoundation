import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuditLog } from "@/hooks/useAuditLog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { UserCog, Shield, Pencil, Eye, UserPlus, RefreshCw } from "lucide-react";
import { Navigate } from "react-router-dom";

type RoleName = "admin" | "editor" | "moderator";

interface UserRow {
  user_id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

const ALL_ROLES: { key: RoleName; label: string; description: string; icon: typeof Shield }[] = [
  { key: "admin", label: "Admin", description: "Full control: users, settings, content, submissions", icon: Shield },
  { key: "editor", label: "Editor", description: "Manage blog, pages, FAQ, partners, team, media", icon: Pencil },
  { key: "moderator", label: "Moderator", description: "Review & update contacts and applications", icon: Eye },
];

function roleBadgeClass(role: string) {
  if (role === "admin") return "bg-primary/15 text-primary border-primary/30";
  if (role === "editor") return "bg-accent/15 text-accent border-accent/30";
  if (role === "moderator") return "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30";
  return "bg-secondary text-muted-foreground border-border";
}

export default function AdminUsers() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { log } = useAuditLog();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("list_admin_users");
    if (error) {
      toast.error(error.message);
    } else {
      setUsers((data ?? []) as UserRow[]);
    }
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (adminLoading) return <div className="animate-pulse text-muted-foreground">Loading…</div>;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  const toggleRole = async (user: UserRow, role: RoleName) => {
    const has = user.roles.includes(role);
    if (has) {
      const { error } = await supabase.rpc("revoke_user_role", { _target_user: user.user_id, _role: role });
      if (error) { toast.error(error.message); return; }
      log({ action: "user.role.revoke", entity: "user", entity_id: user.user_id, summary: `Revoked ${role} from ${user.email}`, metadata: { role } });
      toast.success(`Revoked ${role} from ${user.email}`);
    } else {
      const { error } = await supabase.rpc("assign_user_role", { _target_user: user.user_id, _role: role });
      if (error) { toast.error(error.message); return; }
      log({ action: "user.role.grant", entity: "user", entity_id: user.user_id, summary: `Granted ${role} to ${user.email}`, metadata: { role } });
      toast.success(`Granted ${role} to ${user.email}`);
    }
    load();
  };

  const sendInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    // Use password reset email as a magic invite — they'll set a password via /admin/reset-password
    const { error } = await supabase.auth.resetPasswordForEmail(inviteEmail.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setInviting(false);
    if (error) { toast.error(error.message); return; }
    log({ action: "user.invite", entity: "user", summary: `Sent invite to ${inviteEmail.trim()}` });
    toast.success(`Invite link emailed to ${inviteEmail}. After they sign in, grant their role.`);
    setInviteEmail("");
  };

  const filtered = users.filter((u) => !search || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" /> Users & Roles
          </h1>
          <p className="text-sm text-muted-foreground">Grant or revoke admin, editor, and moderator roles.</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} className="gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </Button>
      </div>

      {/* Invite */}
      <div className="card-modern p-4 md:p-5 mb-6">
        <h3 className="font-display font-bold text-foreground text-sm mb-3 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-primary" /> Invite a new user
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="someone@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Button onClick={sendInvite} disabled={inviting || !inviteEmail.trim()}>
            {inviting ? "Sending…" : "Send invite link"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Sends a password setup email. After they sign in once, assign their role below.
        </p>
      </div>

      {/* Role legend */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {ALL_ROLES.map((r) => (
          <div key={r.key} className="card-modern p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${roleBadgeClass(r.key)}`}>
                <r.icon className="w-3 h-3" /> {r.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{r.description}</p>
          </div>
        ))}
      </div>

      <div className="card-modern overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-display font-bold text-foreground text-sm">All users ({users.length})</h3>
          <Input
            placeholder="Search email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No users found.</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((u) => (
              <div key={u.user_id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{u.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Joined {format(new Date(u.created_at), "MMM d, yyyy")}
                    {u.last_sign_in_at && ` · Last sign-in ${format(new Date(u.last_sign_in_at), "MMM d, p")}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {u.roles.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">No roles</span>
                  )}
                  {ALL_ROLES.map((r) => {
                    const active = u.roles.includes(r.key);
                    return (
                      <button
                        key={r.key}
                        onClick={() => toggleRole(u, r.key)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          active
                            ? roleBadgeClass(r.key)
                            : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        <r.icon className="w-3 h-3" />
                        {active ? r.label : `+ ${r.label}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Note: removing your last admin role is blocked by the database. Invitees must sign in once before you can assign roles.
      </p>
    </div>
  );
}