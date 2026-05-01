import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Eye, Trash2, Briefcase, X } from "lucide-react";
import { format } from "date-fns";

interface GjpApp {
  id: string;
  full_name: string;
  email: string;
  whatsapp: string;
  graduated: boolean;
  institution: string | null;
  graduation_year: string | null;
  nysc_completed: boolean;
  nysc_year: string | null;
  career_path: string;
  current_status: string | null;
  state_of_residence: string | null;
  is_cap_flip_alumnus: boolean;
  cap_flip_cohort: string | null;
  referral_source: string | null;
  additional_info: string | null;
  payment_status: string;
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

export default function AdminGjpApplications() {
  const [rows, setRows] = useState<GjpApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<GjpApp | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("gjp_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as GjpApp[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter !== "all" && r.payment_status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.email.toLowerCase().includes(q) ||
          r.full_name.toLowerCase().includes(q) ||
          (r.institution || "").toLowerCase().includes(q) ||
          r.career_path.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rows, filter, search]);

  const stats = useMemo(() => ({
    total: rows.length,
    paid: rows.filter((r) => r.payment_status === "paid").length,
    pending: rows.filter((r) => r.payment_status === "pending").length,
  }), [rows]);

  const remove = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    await supabase.from("gjp_applications").delete().eq("id", id);
    setSelected((s) => (s?.id === id ? null : s));
    toast.success("Application deleted");
    load();
  };

  const exportCsv = () => {
    const headers = [
      "Created", "Status", "Paid Amount", "Full Name", "Email", "WhatsApp",
      "State", "Graduated", "Institution", "Grad Year", "NYSC Completed", "NYSC Year",
      "Career Path", "Current Status", "CAP/FLIP Alumnus", "Cohort", "Referral",
      "Reference", "Paid At", "Additional Info",
    ];
    const escape = (v: any) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      lines.push([
        r.created_at, r.payment_status, r.payment_amount,
        r.full_name, r.email, r.whatsapp, r.state_of_residence,
        r.graduated, r.institution, r.graduation_year,
        r.nysc_completed, r.nysc_year,
        r.career_path, r.current_status,
        r.is_cap_flip_alumnus, r.cap_flip_cohort,
        r.referral_source, r.paystack_reference, r.paid_at, r.additional_info,
      ].map(escape).join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gjp-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatAmount = (amount: number | null) => {
    if (!amount) return "—";
    return `₦${(amount / 100).toLocaleString()}`;
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> GJP Applications
          </h1>
          <p className="text-muted-foreground text-sm">
            {stats.total} total · {stats.paid} paid · {stats.pending} pending
          </p>
        </div>
        <Button onClick={exportCsv} variant="outline" size="sm" disabled={filtered.length === 0}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input placeholder="Search name, email, institution, career..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="rounded-xl max-w-xs" />
        <div className="flex gap-2 flex-wrap">
          {(["all", "paid", "pending"] as const).map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)} className="capitalize rounded-xl">
              {f}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <Briefcase className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No applications match your filters.</p>
        </div>
      ) : (
        <div className="card-modern overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Applicant</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Institution</th>
                  <th className="text-left px-4 py-3">Career Path</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">NYSC</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{r.full_name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                      <p className="text-xs text-muted-foreground">{r.whatsapp}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-foreground">
                      <p>{r.institution || "—"}</p>
                      <p className="text-xs text-muted-foreground">{r.graduation_year}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {r.career_path}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-xs text-foreground">
                      {r.nysc_completed ? "✓ Completed" : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[r.payment_status] || "bg-secondary text-muted-foreground"}`}>
                        {r.payment_status}
                      </span>
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
              <Detail label="Name" value={selected.full_name} />
              <Detail label="Email" value={selected.email} />
              <Detail label="WhatsApp" value={selected.whatsapp} />
              <Detail label="State" value={selected.state_of_residence || "—"} />
              <hr className="border-border" />
              <Detail label="Graduated" value={selected.graduated ? "Yes" : "No"} />
              <Detail label="Institution" value={selected.institution || "—"} />
              <Detail label="Grad Year" value={selected.graduation_year || "—"} />
              <Detail label="NYSC Completed" value={selected.nysc_completed ? "Yes" : "No"} />
              <Detail label="NYSC Year" value={selected.nysc_year || "—"} />
              <hr className="border-border" />
              <Detail label="Career Path" value={selected.career_path} />
              <Detail label="Current Status" value={selected.current_status || "—"} />
              <Detail label="CAP/FLIP Alumnus" value={selected.is_cap_flip_alumnus ? "Yes" : "No"} />
              <Detail label="Cohort" value={selected.cap_flip_cohort || "—"} />
              <Detail label="Referral" value={selected.referral_source || "—"} />
              <Detail label="Additional" value={selected.additional_info || "—"} />
              <hr className="border-border" />
              <Detail label="Payment Status" value={selected.payment_status} />
              <Detail label="Paid Amount" value={formatAmount(selected.payment_amount)} />
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