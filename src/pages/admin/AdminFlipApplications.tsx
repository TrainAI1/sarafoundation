import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Eye, Trash2, Users, X } from "lucide-react";
import { format } from "date-fns";

interface FlipApp {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  state: string | null;
  phone: string;
  age_range: string;
  education: string;
  job_role: string | null;
  experience: string;
  commitment: boolean;
  interview_availability: string | null;
  preferred_track: string;
  payment_status: string;
  payment_currency: string | null;
  payment_amount: number | null;
  paystack_reference: string | null;
  created_at: string;
  paid_at: string | null;
}

const statusColors: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  failed: "bg-destructive/15 text-destructive",
};

export default function AdminFlipApplications() {
  const [rows, setRows] = useState<FlipApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "paid" | "pending" | "failed">("all");
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState<string>("all");
  const [selected, setSelected] = useState<FlipApp | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("flip_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as FlipApp[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter !== "all" && r.payment_status !== filter) return false;
      if (trackFilter !== "all" && r.preferred_track !== trackFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.email.toLowerCase().includes(q) ||
          r.first_name.toLowerCase().includes(q) ||
          r.last_name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rows, filter, search, trackFilter]);

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
  }), [rows]);

  const remove = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    await supabase.from("flip_applications").delete().eq("id", id);
    setSelected((s) => (s?.id === id ? null : s));
    toast.success("Application deleted");
    load();
  };

  const exportCsv = () => {
    const headers = [
      "Created", "Status", "Currency", "Amount", "First Name", "Last Name", "Email",
      "Phone", "Country", "State", "Age", "Education", "Job Role", "Experience",
      "Commitment", "Track", "Interview Availability", "Reference", "Paid At",
    ];
    const escape = (v: any) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      lines.push([
        r.created_at, r.payment_status, r.payment_currency, r.payment_amount,
        r.first_name, r.last_name, r.email, r.phone, r.country, r.state,
        r.age_range, r.education, r.job_role, r.experience,
        r.commitment ? "Yes" : "No", r.preferred_track, r.interview_availability,
        r.paystack_reference, r.paid_at,
      ].map(escape).join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flip-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" /> FLIP Applications
          </h1>
          <p className="text-muted-foreground text-sm">
            {stats.total} total · {stats.paid} paid · {stats.pending} pending payment
          </p>
        </div>
        <Button onClick={exportCsv} variant="outline" size="sm" disabled={filtered.length === 0}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input placeholder="Search name or email..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="rounded-xl max-w-xs" />
        <div className="flex gap-2 flex-wrap">
          {(["all", "paid", "pending", "failed"] as const).map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)} className="capitalize rounded-xl">
              {f}
            </Button>
          ))}
        </div>
      </div>

      {trackOptions.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4 items-center">
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
          <Users className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No applications match your filters.</p>
        </div>
      ) : (
        <div className="card-modern overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Applicant</th>
                  <th className="text-left px-4 py-3">Track</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Country</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{r.first_name} {r.last_name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {r.preferred_track}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-foreground">{r.country}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[r.payment_status] || "bg-secondary text-muted-foreground"}`}>
                        {r.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                      {format(new Date(r.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
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
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/40" onClick={() => setSelected(null)}>
          <div className="bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-card border-b border-border px-5 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">Application Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <Detail label="Name" value={`${selected.first_name} ${selected.last_name}`} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Country / State" value={`${selected.country}${selected.state ? `, ${selected.state}` : ""}`} />
              <Detail label="Age Range" value={selected.age_range} />
              <Detail label="Education" value={selected.education} />
              <Detail label="Job Role" value={selected.job_role || "—"} />
              <Detail label="Experience" value={selected.experience} />
              <Detail label="5hrs/week commit" value={selected.commitment ? "Yes" : "No"} />
              <Detail label="Interview availability" value={selected.interview_availability || "—"} />
              <Detail label="Preferred Track" value={selected.preferred_track} />
              <hr className="border-border" />
              <Detail label="Payment Status" value={selected.payment_status} />
              <Detail label="Amount" value={selected.payment_amount ? `${selected.payment_currency} ${(selected.payment_amount / 100).toFixed(2)}` : "—"} />
              <Detail label="Reference" value={selected.paystack_reference || "—"} />
              <Detail label="Submitted" value={format(new Date(selected.created_at), "PPpp")} />
              {selected.paid_at && <Detail label="Paid At" value={format(new Date(selected.paid_at), "PPpp")} />}
            </div>
          </div>
        </div>
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