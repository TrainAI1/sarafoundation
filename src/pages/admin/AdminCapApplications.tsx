import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Eye, Trash2, GraduationCap, X, Mail } from "lucide-react";
import { format } from "date-fns";
import StatusPipeline, { statusBadge, type ApplicationStatus } from "@/components/admin/StatusPipeline";
import NotesPanel from "@/components/admin/NotesPanel";
import BulkActionsBar from "@/components/admin/BulkActionsBar";
import EmailDialog from "@/components/admin/EmailDialog";
import { useAuditLog } from "@/hooks/useAuditLog";

interface CapApp {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  university: string;
  year_of_study: string;
  preferred_track: string;
  specialization: string | null;
  motivation: string | null;
  referral_source: string | null;
  payment_plan: string;
  payment_currency: string | null;
  total_amount: number | null;
  paid_amount: number;
  installments_completed: number;
  payment_status: string;
  paystack_reference: string | null;
  created_at: string;
  paid_at: string | null;
  applicant_status: string | null;
}

const statusColors: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  failed: "bg-destructive/15 text-destructive",
};

export default function AdminCapApplications() {
  const [rows, setRows] = useState<CapApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "installments">("all");
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState<string>("all");
  const [cohortFilter, setCohortFilter] = useState<"all" | "cohort1" | "cohort3">("all");
  const [selected, setSelected] = useState<CapApp | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [emailDialog, setEmailDialog] = useState<{ recipients: string[]; mode: "single" | "bulk" } | null>(null);
  const { log } = useAuditLog();

  const load = async () => {
    const { data } = await supabase
      .from("cap_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as CapApp[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter === "paid" && r.payment_status !== "paid") return false;
      if (filter === "pending" && r.payment_status !== "pending") return false;
      if (filter === "installments" && (r.payment_plan !== "installments" || r.installments_completed === 0 || r.payment_status === "paid")) return false;
      if (trackFilter !== "all" && r.preferred_track !== trackFilter) return false;
      const isCohort1 = (r.preferred_track || "").toLowerCase() === "cohort 1";
      if (cohortFilter === "cohort1" && !isCohort1) return false;
      if (cohortFilter === "cohort3" && isCohort1) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.email.toLowerCase().includes(q) ||
          r.full_name.toLowerCase().includes(q) ||
          r.university.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rows, filter, search, trackFilter, cohortFilter]);

  const cohortCounts = useMemo(() => {
    const c1 = rows.filter((r) => (r.preferred_track || "").toLowerCase() === "cohort 1").length;
    return { cohort1: c1, cohort3: rows.length - c1 };
  }, [rows]);

  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    rows.forEach((r) => {
      const t = r.preferred_track || "Unspecified";
      counts[t] = (counts[t] || 0) + 1;
    });
    return counts;
  }, [rows]);

  const trackOptions = useMemo(() => Object.keys(trackCounts).sort(), [trackCounts]);

  const stats = useMemo(() => ({
    total: rows.length,
    paid: rows.filter((r) => r.payment_status === "paid").length,
    pending: rows.filter((r) => r.payment_status === "pending").length,
    inProgress: rows.filter((r) => r.installments_completed > 0 && r.installments_completed < 3 && r.payment_status !== "paid").length,
  }), [rows]);

  const remove = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    await supabase.from("cap_applications").delete().eq("id", id);
    setSelected((s) => (s?.id === id ? null : s));
    toast.success("Application deleted");
    log({ action: "cap.delete", entity: "cap", entity_id: id });
    load();
  };

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    const { error } = await supabase.from("cap_applications").update({ applicant_status: status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    log({ action: "cap.status", entity: "cap", entity_id: id, summary: `Status → ${status}`, metadata: { status } });
    toast.success(`Status updated to ${status}`);
    setSelected((s) => (s && s.id === id ? { ...s, applicant_status: status } : s));
    load();
  };

  const bulkStatus = async (status: string) => {
    const ids = Array.from(picked);
    if (!ids.length) return;
    const { error } = await supabase.from("cap_applications").update({ applicant_status: status }).in("id", ids);
    if (error) { toast.error(error.message); return; }
    log({ action: "cap.bulk.status", entity: "cap", summary: `${ids.length} → ${status}`, metadata: { count: ids.length, status } });
    toast.success(`Updated ${ids.length} application(s)`);
    setPicked(new Set());
    load();
  };

  const bulkDelete = async () => {
    const ids = Array.from(picked);
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} application(s)?`)) return;
    const { error } = await supabase.from("cap_applications").delete().in("id", ids);
    if (error) { toast.error(error.message); return; }
    log({ action: "cap.bulk.delete", entity: "cap", summary: `Deleted ${ids.length}`, metadata: { count: ids.length } });
    toast.success(`Deleted ${ids.length} application(s)`);
    setPicked(new Set());
    load();
  };

  const openEmail = (scope: "selected" | "filtered" | "single", single?: CapApp) => {
    let recipients: string[] = [];
    if (scope === "single" && single) recipients = [single.email];
    else if (scope === "selected") recipients = rows.filter((r) => picked.has(r.id)).map((r) => r.email);
    else recipients = filtered.map((r) => r.email);
    recipients = Array.from(new Set(recipients.filter(Boolean)));
    if (!recipients.length) { toast.error("No recipients to email."); return; }
    setEmailDialog({ recipients, mode: scope === "single" ? "single" : "bulk" });
  };

  const togglePick = (id: string) =>
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });

  const exportCsv = () => {
    const headers = [
      "Created", "Status", "Plan", "Currency", "Paid Amount", "Installments",
      "Full Name", "Email", "Phone", "Country", "University", "Year",
      "Track", "Specialization", "Motivation", "Referral", "Reference", "Paid At",
    ];
    const escape = (v: any) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      lines.push([
        r.created_at, r.payment_status, r.payment_plan, r.payment_currency,
        r.paid_amount, `${r.installments_completed}/3`,
        r.full_name, r.email, r.phone, r.country, r.university, r.year_of_study,
        r.preferred_track, r.specialization, r.motivation, r.referral_source,
        r.paystack_reference, r.paid_at,
      ].map(escape).join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cap-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatAmount = (amount: number | null, currency: string | null) => {
    if (!amount || !currency) return "—";
    const symbol = currency === "NGN" ? "₦" : "$";
    return `${symbol}${(amount / 100).toLocaleString()}`;
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> CAP Applications
          </h1>
          <p className="text-muted-foreground text-sm">
            {stats.total} total · {stats.paid} fully paid · {stats.inProgress} in installments · {stats.pending} pending
          </p>
        </div>
        <Button onClick={exportCsv} variant="outline" size="sm" disabled={filtered.length === 0}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input placeholder="Search name, email, or university..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="rounded-xl max-w-xs" />
        <div className="flex gap-2 flex-wrap">
          {(["all", "paid", "installments", "pending"] as const).map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)} className="capitalize rounded-xl">
              {f}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap sm:ml-auto">
          <Button onClick={() => openEmail("selected")} size="sm" variant="outline" disabled={picked.size === 0} className="rounded-xl">
            <Mail className="w-4 h-4" /> Email selected ({picked.size})
          </Button>
          <Button onClick={() => openEmail("filtered")} size="sm" variant="outline" disabled={filtered.length === 0} className="rounded-xl">
            <Mail className="w-4 h-4" /> Email all filtered
          </Button>
        </div>
      </div>

      {trackOptions.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4 items-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Cohort:</span>
          <Button size="sm" variant={cohortFilter === "all" ? "default" : "outline"}
            onClick={() => setCohortFilter("all")} className="rounded-xl">
            All ({rows.length})
          </Button>
          <Button size="sm" variant={cohortFilter === "cohort3" ? "default" : "outline"}
            onClick={() => setCohortFilter("cohort3")} className="rounded-xl">
            Cohort 3 ({cohortCounts.cohort3})
          </Button>
          <Button size="sm" variant={cohortFilter === "cohort1" ? "default" : "outline"}
            onClick={() => setCohortFilter("cohort1")} className="rounded-xl">
            Cohort 1 ({cohortCounts.cohort1})
          </Button>
          <span className="w-full sm:hidden" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Track:</span>
          <Button size="sm" variant={trackFilter === "all" ? "default" : "outline"}
            onClick={() => setTrackFilter("all")} className="rounded-xl">
            All ({rows.length})
          </Button>
          {trackOptions.map((t) => (
            <Button key={t} size="sm" variant={trackFilter === t ? "default" : "outline"}
              onClick={() => setTrackFilter(t)} className="rounded-xl">
              {t} ({trackCounts[t]})
            </Button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <GraduationCap className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No applications match your filters.</p>
        </div>
      ) : (
        <>
        <BulkActionsBar
          count={picked.size}
          onClear={() => setPicked(new Set())}
          onStatusChange={bulkStatus}
          onDelete={bulkDelete}
        />
        <div className="card-modern overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={filtered.length > 0 && filtered.every((r) => picked.has(r.id))}
                      onChange={(e) => setPicked(e.target.checked ? new Set(filtered.map((r) => r.id)) : new Set())}
                    />
                  </th>
                  <th className="text-left px-4 py-3">Applicant</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">University</th>
                  <th className="text-left px-4 py-3">Track</th>
                  <th className="text-left px-4 py-3">Plan / Paid</th>
                  <th className="text-left px-4 py-3">Payment</th>
                  <th className="text-left px-4 py-3">Pipeline</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={picked.has(r.id)} onChange={() => togglePick(r.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{r.full_name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-foreground">
                      <p>{r.university}</p>
                      <p className="text-xs text-muted-foreground">{r.year_of_study}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {r.preferred_track}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-foreground capitalize text-xs">{r.payment_plan}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatAmount(r.paid_amount, r.payment_currency)}
                        {r.payment_plan === "installments" && ` · ${r.installments_completed}/3`}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[r.payment_status] || "bg-secondary text-muted-foreground"}`}>
                        {r.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{statusBadge(r.applicant_status)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" onClick={() => openEmail("single", r)} title="Email applicant">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setSelected(r)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(r.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/40" onClick={() => setSelected(null)}>
          <div className="bg-card w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-card border-b border-border px-5 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">Application Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Pipeline status</p>
                <StatusPipeline
                  current={selected.applicant_status}
                  onChange={(s) => updateStatus(selected.id, s)}
                />
              </div>
              <hr className="border-border" />
              <Detail label="Name" value={selected.full_name} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Country" value={selected.country} />
              <Detail label="University" value={selected.university} />
              <Detail label="Year of Study" value={selected.year_of_study} />
              <Detail label="Track" value={selected.preferred_track} />
              <Detail label="Specialization" value={selected.specialization || "—"} />
              <Detail label="Motivation" value={selected.motivation || "—"} />
              <Detail label="Referral" value={selected.referral_source || "—"} />
              <hr className="border-border" />
              <Detail label="Payment Plan" value={selected.payment_plan} />
              <Detail label="Payment Status" value={selected.payment_status} />
              <Detail label="Currency" value={selected.payment_currency || "—"} />
              <Detail label="Paid Amount" value={formatAmount(selected.paid_amount, selected.payment_currency)} />
              <Detail label="Installments" value={`${selected.installments_completed} of 3`} />
              <Detail label="Reference" value={selected.paystack_reference || "—"} />
              <Detail label="Submitted" value={format(new Date(selected.created_at), "PPpp")} />
              {selected.paid_at && <Detail label="Fully Paid At" value={format(new Date(selected.paid_at), "PPpp")} />}
              <hr className="border-border" />
              <NotesPanel type="cap" id={selected.id} />
            </div>
            <div className="sticky bottom-0 bg-card border-t border-border px-5 py-3 flex justify-end">
              <Button size="sm" onClick={() => { openEmail("single", selected); setSelected(null); }} className="rounded-xl">
                <Mail className="w-4 h-4" /> Email this applicant
              </Button>
            </div>
          </div>
        </div>
      )}

      {emailDialog && (
        <EmailDialog
          recipients={emailDialog.recipients}
          mode={emailDialog.mode}
          defaultSubject="CAP — update from Sara Foundation"
          onClose={() => setEmailDialog(null)}
          onSent={({ recipients }) => log({ action: "cap.email", entity: "cap", summary: `Emailed ${recipients.length}`, metadata: { count: recipients.length } })}
        />
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="text-muted-foreground text-xs uppercase tracking-wider col-span-1">{label}</span>
      <span className="text-foreground col-span-2 break-words">{value}</span>
    </div>
  );
}