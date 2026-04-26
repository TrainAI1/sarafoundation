import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, Download, RefreshCw, AlertTriangle, CheckCircle2, Database, Loader2, Info, AlertCircle } from "lucide-react";

interface Finding {
  id: string;
  level: "info" | "warn" | "error";
  title: string;
  description: string;
  remediation?: string;
}

const KNOWN_TABLES = [
  "blog_posts",
  "cap_applications",
  "contact_submissions",
  "faq_items",
  "flip_applications",
  "newsletter_subscribers",
  "pages",
  "partners",
  "user_roles",
] as const;

export default function AdminSiteHealth() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [scanning, setScanning] = useState(false);
  const [backingUp, setBackingUp] = useState(false);
  const [lastScan, setLastScan] = useState<Date | null>(null);
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});

  const runChecks = async () => {
    setScanning(true);
    const results: Finding[] = [];
    const counts: Record<string, number> = {};

    for (const t of KNOWN_TABLES) {
      const { count, error } = await supabase
        .from(t as any)
        .select("*", { count: "exact", head: true });
      if (error) {
        results.push({
          id: `read_${t}`,
          level: "error",
          title: `Cannot read table "${t}"`,
          description: error.message,
          remediation: "Verify RLS policies and that the admin role is assigned to your account.",
        });
      } else {
        counts[t] = count || 0;
      }
    }

    // Sanity: at least one admin exists
    const { count: adminCount, error: adminErr } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (!adminErr) {
      if ((adminCount || 0) === 0) {
        results.push({
          id: "no_admin",
          level: "error",
          title: "No admin accounts configured",
          description: "Without an admin user, the dashboard becomes inaccessible.",
          remediation: "Add an admin role for at least one trusted user_id in user_roles.",
        });
      } else {
        results.push({
          id: "admin_ok",
          level: "info",
          title: `${adminCount} admin account(s) active`,
          description: "Admin access is healthy.",
        });
      }
    }

    // Pending FLIP/CAP older than 14 days — possible abandoned payments
    const cutoff = new Date(Date.now() - 14 * 86400000).toISOString();
    const { count: stalePending } = await supabase
      .from("flip_applications")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "pending")
      .lt("created_at", cutoff);
    if ((stalePending || 0) > 0) {
      results.push({
        id: "stale_flip",
        level: "warn",
        title: `${stalePending} stale FLIP applications`,
        description: "FLIP applications stuck in 'pending' for over 14 days.",
        remediation: "Review and clean up abandoned payment attempts.",
      });
    }

    const { count: staleCap } = await supabase
      .from("cap_applications")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "pending")
      .lt("created_at", cutoff);
    if ((staleCap || 0) > 0) {
      results.push({
        id: "stale_cap",
        level: "warn",
        title: `${staleCap} stale CAP applications`,
        description: "CAP applications stuck in 'pending' for over 14 days.",
        remediation: "Review and clean up abandoned payment attempts.",
      });
    }

    // Unread contact backlog
    const { count: unread } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);
    if ((unread || 0) >= 10) {
      results.push({
        id: "unread_contacts",
        level: "warn",
        title: `${unread} unread contact messages`,
        description: "Inbox backlog detected.",
        remediation: "Visit Contact Messages to triage submissions.",
      });
    }

    // Check active service worker
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        results.push({
          id: "sw_ok",
          level: "info",
          title: "Service worker active",
          description: "Auto-update on new deploys is enabled.",
        });
      }
    }

    setTableCounts(counts);
    setFindings(results);
    setLastScan(new Date());
    setScanning(false);
  };

  useEffect(() => {
    runChecks();
  }, []);

  const downloadBackup = async () => {
    setBackingUp(true);
    try {
      const backup: Record<string, any> = {
        meta: {
          generated_at: new Date().toISOString(),
          source: "Sara Foundation Africa — Admin Backup",
          schema_version: 1,
        },
        tables: {} as Record<string, any[]>,
      };

      for (const t of KNOWN_TABLES) {
        const { data, error } = await supabase.from(t as any).select("*");
        if (error) throw new Error(`${t}: ${error.message}`);
        backup.tables[t] = data || [];
      }

      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sara-foundation-backup-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Backup downloaded");
    } catch (e: any) {
      toast.error(`Backup failed: ${e.message}`);
    } finally {
      setBackingUp(false);
    }
  };

  const errCount = findings.filter((f) => f.level === "error").length;
  const warnCount = findings.filter((f) => f.level === "warn").length;
  const okCount = findings.filter((f) => f.level === "info").length;

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5" /> Site Health & Backup
          </h1>
          <p className="text-sm text-muted-foreground">
            Track issues across your site and export a full backup of your data.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={runChecks} disabled={scanning}>
            {scanning ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
            {scanning ? "Scanning..." : "Re-scan"}
          </Button>
          <Button size="sm" onClick={downloadBackup} disabled={backingUp}>
            {backingUp ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Download className="w-4 h-4 mr-1" />}
            {backingUp ? "Backing up..." : "Download Backup"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Errors" value={errCount} icon={AlertCircle} tone="error" />
        <StatCard label="Warnings" value={warnCount} icon={AlertTriangle} tone="warn" />
        <StatCard label="Healthy" value={okCount} icon={CheckCircle2} tone="ok" />
        <StatCard label="Tables tracked" value={Object.keys(tableCounts).length} icon={Database} tone="muted" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-modern p-4 md:p-5">
          <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Issue Tracker
          </h3>
          {scanning && findings.length === 0 ? (
            <div className="text-sm text-muted-foreground py-6 text-center">Running checks...</div>
          ) : findings.length === 0 ? (
            <div className="text-sm text-muted-foreground py-6 text-center">No findings.</div>
          ) : (
            <div className="space-y-2">
              {findings.map((f) => (
                <FindingRow key={f.id} f={f} />
              ))}
            </div>
          )}
          {lastScan && (
            <p className="text-xs text-muted-foreground mt-3">
              Last scanned: {lastScan.toLocaleString()}
            </p>
          )}
        </div>

        <div className="card-modern p-4 md:p-5">
          <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" /> Data Snapshot
          </h3>
          <div className="space-y-1.5">
            {Object.entries(tableCounts).map(([t, c]) => (
              <div key={t} className="flex justify-between items-center px-3 py-2 rounded-lg bg-secondary/40 text-sm">
                <span className="text-foreground font-medium">{t}</span>
                <span className="text-muted-foreground tabular-nums">{c.toLocaleString()} rows</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Backups are JSON files containing every row from these tables. Store them somewhere safe — they
            include personal data.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone: "error" | "warn" | "ok" | "muted";
}) {
  const tones: Record<string, string> = {
    error: "bg-destructive/10 text-destructive",
    warn: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    ok: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    muted: "bg-secondary text-muted-foreground",
  };
  return (
    <div className="card-modern p-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${tones[tone]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}

function FindingRow({ f }: { f: Finding }) {
  const tone =
    f.level === "error"
      ? "border-destructive/30 bg-destructive/5"
      : f.level === "warn"
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-emerald-500/30 bg-emerald-500/5";
  const Icon = f.level === "error" ? AlertCircle : f.level === "warn" ? AlertTriangle : Info;
  const iconTone =
    f.level === "error" ? "text-destructive" : f.level === "warn" ? "text-amber-600" : "text-emerald-600";
  return (
    <div className={`border rounded-lg p-3 ${tone}`}>
      <div className="flex items-start gap-2">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconTone}`} />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground text-sm">{f.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
          {f.remediation && (
            <p className="text-xs text-foreground/80 mt-1.5">
              <span className="font-medium">Fix:</span> {f.remediation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
