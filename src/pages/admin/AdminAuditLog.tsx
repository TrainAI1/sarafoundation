import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toCSV, downloadCSV } from "@/lib/csv";
import { format } from "date-fns";
import { Download, ScrollText } from "lucide-react";

interface Entry {
  id: string;
  actor_email: string | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  summary: string | null;
  metadata: unknown;
  created_at: string;
}

const ACTION_COLOR: Record<string, string> = {
  grant: "text-[hsl(var(--success))]",
  revoke: "text-destructive",
  delete: "text-destructive",
  add: "text-primary",
  update: "text-accent",
  status: "text-accent",
  invite: "text-primary",
  bulk: "text-primary",
};

export default function AdminAuditLog() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("admin_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setEntries((data ?? []) as Entry[]);
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const actions = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => set.add(e.action.split(".")[0]));
    return Array.from(set).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (actionFilter !== "all" && !e.action.startsWith(actionFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          (e.actor_email ?? "").toLowerCase().includes(q) ||
          e.action.toLowerCase().includes(q) ||
          (e.entity ?? "").toLowerCase().includes(q) ||
          (e.summary ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [entries, actionFilter, search]);

  if (adminLoading) return <div className="animate-pulse text-muted-foreground">Loading…</div>;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  const exportCsv = () => {
    const rows = filtered.map((e) => ({
      timestamp: e.created_at,
      actor: e.actor_email ?? "",
      action: e.action,
      entity: e.entity ?? "",
      entity_id: e.entity_id ?? "",
      summary: e.summary ?? "",
    }));
    downloadCSV(`audit-log-${format(new Date(), "yyyy-MM-dd")}.csv`, toCSV(rows));
  };

  const colorFor = (action: string) => {
    const parts = action.split(".");
    const last = parts[parts.length - 1];
    return ACTION_COLOR[last] || ACTION_COLOR[parts[0]] || "text-foreground";
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-primary" /> Audit Log
          </h1>
          <p className="text-sm text-muted-foreground">Every sensitive admin action, with actor and target. Last 500 events.</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </Button>
      </div>

      <div className="card-modern p-4 mb-4 flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Search actor, action, entity, summary…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-border bg-background text-sm"
        >
          <option value="all">All actions</option>
          {actions.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="card-modern overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No events match.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">When</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Entity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(e.created_at), "MMM d, p")}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">{e.actor_email ?? "—"}</td>
                    <td className={`px-4 py-2.5 font-mono text-xs font-semibold ${colorFor(e.action)}`}>
                      {e.action}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">
                      {e.entity}{e.entity_id ? <span className="opacity-60"> · {e.entity_id.slice(0, 8)}</span> : null}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{e.summary ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}