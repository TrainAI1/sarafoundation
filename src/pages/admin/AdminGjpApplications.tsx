import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Download, FileSpreadsheet, Eye, Trash2, Briefcase, X, Save, Mail, Code2, Filter, ChevronDown, ListChecks } from "lucide-react";
import { format } from "date-fns";
import * as XLSX from "xlsx";

const TECH_CAREER_PATHS = new Set<string>([
  "Software / Coding",
  "Product Management",
  "Product Marketing",
  "Product / Design",
  "Data / Analytics",
  "Cybersecurity",
  "Engineering (Tech)",
  "Tech Entrepreneurship",
  "Business Analysis",
]);
const isTechPath = (career_path: string | null | undefined) =>
  !!career_path && TECH_CAREER_PATHS.has(career_path);

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
  nysc_number: string | null;
  interested_in_tech: boolean;
  career_path: string;
  tech_skills_rating: string | null;
  current_status: string | null;
  state_of_residence: string | null;
  is_cap_flip_alumnus: boolean;
  cap_flip_cohort: string | null;
  referral_source: string | null;
  additional_info: string | null;
  created_at: string;
  applicant_status: string;
  status_notes: string | null;
  status_updated_at: string;
}

const applicantStatusOptions = [
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "training", label: "Training" },
  { value: "placed", label: "Placed" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

const applicantStatusColors: Record<string, string> = {
  submitted: "bg-secondary text-foreground",
  under_review: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  shortlisted: "bg-primary/15 text-primary",
  training: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  placed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  rejected: "bg-destructive/15 text-destructive",
  withdrawn: "bg-muted text-muted-foreground",
};

export default function AdminGjpApplications() {
  const [rows, setRows] = useState<GjpApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [techFilter, setTechFilter] = useState<"all" | "tech" | "non_tech">("all");
  const [careerFilter, setCareerFilter] = useState<string>("all");
  const [nyscFilter, setNyscFilter] = useState<"all" | "yes" | "no">("all");
  const [nyscYearFilter, setNyscYearFilter] = useState<Set<string>>(new Set());
  const [gradYearFilter, setGradYearFilter] = useState<Set<string>>(new Set());
  const [alumniFilter, setAlumniFilter] = useState<"all" | "yes" | "no">("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<GjpApp | null>(null);
  const [editStatus, setEditStatus] = useState<string>("submitted");
  const [editNotes, setEditNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [emailDialog, setEmailDialog] = useState<{ recipients: string[]; mode: "selected" | "filtered" | "single" } | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [bulkStatusOpen, setBulkStatusOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<string>("under_review");
  const [bulkNotes, setBulkNotes] = useState<string>("");
  const [bulkSaving, setBulkSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("gjp_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as unknown as GjpApp[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (selected) {
      setEditStatus(selected.applicant_status);
      setEditNotes(selected.status_notes || "");
    }
  }, [selected]);

  const careerPathOptions = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.career_path && set.add(r.career_path));
    return Array.from(set).sort();
  }, [rows]);

  const nyscYears = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.nysc_year && set.add(r.nysc_year));
    return Array.from(set).sort().reverse();
  }, [rows]);

  const gradYears = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.graduation_year && set.add(r.graduation_year));
    return Array.from(set).sort().reverse();
  }, [rows]);

  const states = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.state_of_residence && set.add(r.state_of_residence));
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (stageFilter !== "all" && r.applicant_status !== stageFilter) return false;
      const tech = isTechPath(r.career_path);
      if (techFilter === "tech" && !tech) return false;
      if (techFilter === "non_tech" && tech) return false;
      if (careerFilter !== "all" && r.career_path !== careerFilter) return false;
      if (nyscFilter === "yes" && !r.nysc_completed) return false;
      if (nyscFilter === "no" && r.nysc_completed) return false;
      if (nyscYearFilter.size > 0 && (!r.nysc_year || !nyscYearFilter.has(r.nysc_year))) return false;
      if (gradYearFilter.size > 0 && (!r.graduation_year || !gradYearFilter.has(r.graduation_year))) return false;
      if (alumniFilter === "yes" && !r.is_cap_flip_alumnus) return false;
      if (alumniFilter === "no" && r.is_cap_flip_alumnus) return false;
      if (stateFilter !== "all" && r.state_of_residence !== stateFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.email.toLowerCase().includes(q) ||
          r.full_name.toLowerCase().includes(q) ||
          (r.institution || "").toLowerCase().includes(q) ||
          r.career_path.toLowerCase().includes(q) ||
          (r.nysc_number || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rows, stageFilter, techFilter, careerFilter, nyscFilter, nyscYearFilter, gradYearFilter, alumniFilter, stateFilter, search]);

  const stats = useMemo(() => ({
    total: rows.length,
    tech: rows.filter((r) => isTechPath(r.career_path)).length,
    nyscDone: rows.filter((r) => r.nysc_completed).length,
  }), [rows]);

  const activeFilterCount =
    (stageFilter !== "all" ? 1 : 0) +
    (techFilter !== "all" ? 1 : 0) +
    (careerFilter !== "all" ? 1 : 0) +
    (nyscFilter !== "all" ? 1 : 0) +
    (nyscYearFilter.size > 0 ? 1 : 0) +
    (gradYearFilter.size > 0 ? 1 : 0) +
    (alumniFilter !== "all" ? 1 : 0) +
    (stateFilter !== "all" ? 1 : 0);

  const resetFilters = () => {
    setStageFilter("all"); setTechFilter("all"); setCareerFilter("all");
    setNyscFilter("all"); setNyscYearFilter(new Set()); setGradYearFilter(new Set());
    setAlumniFilter("all"); setStateFilter("all");
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllFiltered = () => {
    const allSelected = filtered.every((r) => selectedIds.has(r.id));
    setSelectedIds((s) => {
      const next = new Set(s);
      if (allSelected) filtered.forEach((r) => next.delete(r.id));
      else filtered.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const openEmail = (mode: "selected" | "filtered" | "single", single?: GjpApp) => {
    let recipients: string[] = [];
    if (mode === "single" && single) recipients = [single.email];
    else if (mode === "selected") {
      recipients = rows.filter((r) => selectedIds.has(r.id)).map((r) => r.email);
    } else {
      recipients = filtered.map((r) => r.email);
    }
    recipients = Array.from(new Set(recipients.filter(Boolean)));
    if (recipients.length === 0) {
      toast.error("No recipients to email.");
      return;
    }
    setEmailSubject("");
    setEmailBody("");
    setEmailDialog({ recipients, mode });
  };

  const sendEmail = async () => {
    if (!emailDialog) return;
    const { recipients, mode } = emailDialog;
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);
    let mailto: string;
    if (mode === "single") {
      mailto = `mailto:${recipients[0]}?subject=${subject}&body=${body}`;
    } else {
      mailto = `mailto:?bcc=${recipients.join(",")}&subject=${subject}&body=${body}`;
    }
    window.location.href = mailto;
    toast.success(`Opening your email client with ${recipients.length} recipient${recipients.length > 1 ? "s" : ""}.`);

    // Smart auto-promote: any recipient still in "submitted" moves to "under_review".
    const recipientSet = new Set(recipients.map((e) => e.toLowerCase()));
    const toPromote = rows.filter(
      (r) => r.email && recipientSet.has(r.email.toLowerCase()) && r.applicant_status === "submitted"
    );
    if (toPromote.length > 0) {
      const ids = toPromote.map((r) => r.id);
      const nowIso = new Date().toISOString();
      // Optimistic UI
      setRows((prev) =>
        prev.map((r) =>
          ids.includes(r.id)
            ? { ...r, applicant_status: "under_review", status_updated_at: nowIso }
            : r
        )
      );
      const { error } = await supabase
        .from("gjp_applications")
        .update({ applicant_status: "under_review", status_updated_at: nowIso })
        .in("id", ids);
      if (error) {
        console.error(error);
        toast.error("Emails opened, but couldn't auto-update statuses.");
        load();
      } else {
        toast.success(`Moved ${ids.length} applicant${ids.length > 1 ? "s" : ""} to Under Review.`);
      }
    }

    setEmailDialog(null);
  };

  const copyEmails = () => {
    if (!emailDialog) return;
    navigator.clipboard.writeText(emailDialog.recipients.join(", "));
    toast.success(`Copied ${emailDialog.recipients.length} email${emailDialog.recipients.length > 1 ? "s" : ""} to clipboard.`);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    await supabase.from("gjp_applications").delete().eq("id", id);
    setSelected((s) => (s?.id === id ? null : s));
    toast.success("Application deleted");
    load();
  };

  const saveStatus = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("gjp_applications")
      .update({ applicant_status: editStatus, status_notes: editNotes || null })
      .eq("id", selected.id);
    setSaving(false);
    if (error) {
      toast.error("Could not save status.");
      return;
    }
    toast.success("Status updated");
    setSelected({ ...selected, applicant_status: editStatus, status_notes: editNotes || null, status_updated_at: new Date().toISOString() });
    load();
  };

  const quickUpdateStatus = async (id: string, status: string) => {
    // Optimistic UI update
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, applicant_status: status, status_updated_at: new Date().toISOString() } : r)));
    const { error } = await supabase
      .from("gjp_applications")
      .update({ applicant_status: status })
      .eq("id", id);
    if (error) {
      toast.error("Could not update status — refreshing.");
      load();
      return;
    }
    toast.success(`Status → ${status.replace("_", " ")}`);
  };

  const applyBulkStatus = async () => {
    if (selectedIds.size === 0) return;
    setBulkSaving(true);
    const update: { applicant_status: string; status_notes?: string | null } = { applicant_status: bulkStatus };
    if (bulkNotes.trim()) update.status_notes = bulkNotes.trim();
    const { error } = await supabase
      .from("gjp_applications")
      .update(update)
      .in("id", Array.from(selectedIds));
    setBulkSaving(false);
    if (error) {
      toast.error("Could not update status.");
      return;
    }
    toast.success(`Updated ${selectedIds.size} applicant${selectedIds.size > 1 ? "s" : ""} to ${bulkStatus.replace("_", " ")}`);
    setBulkStatusOpen(false);
    setBulkNotes("");
    setSelectedIds(new Set());
    load();
  };

  const exportCsv = () => {
    const headers = [
      "Created", "Full Name", "Email", "WhatsApp",
      "State", "Graduated", "Institution", "Grad Year", "NYSC Completed", "NYSC Year", "NYSC Number",
      "Tech Interest", "Career Path", "Tech Skills & Rating", "Current Status", "CAP/FLIP Alumnus", "Cohort", "Referral",
      "Applicant Status", "Status Notes", "Status Updated", "Additional Info",
    ];
    const escape = (v: any) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const lines = [headers.join(",")];
    filtered.forEach((r) => {
      lines.push([
        r.created_at,
        r.full_name, r.email, r.whatsapp, r.state_of_residence,
        r.graduated, r.institution, r.graduation_year,
        r.nysc_completed, r.nysc_year, r.nysc_number,
        isTechPath(r.career_path) ? "Yes" : "No",
        r.career_path, r.tech_skills_rating, r.current_status,
        r.is_cap_flip_alumnus, r.cap_flip_cohort,
        r.referral_source,
        r.applicant_status, r.status_notes, r.status_updated_at, r.additional_info,
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

  const exportExcel = () => {
    const data = filtered.map((r) => ({
      "Submitted": format(new Date(r.created_at), "yyyy-MM-dd HH:mm"),
      "Full Name": r.full_name,
      "Email": r.email,
      "WhatsApp": r.whatsapp,
      "State": r.state_of_residence || "",
      "Graduated": r.graduated ? "Yes" : "No",
      "Institution": r.institution || "",
      "Graduation Year": r.graduation_year || "",
      "NYSC Completed": r.nysc_completed ? "Yes" : "No",
      "NYSC Year": r.nysc_year || "",
      "NYSC Call-Up Number": r.nysc_number || "",
      "Interested in Tech": isTechPath(r.career_path) ? "Yes" : "No",
      "Career Path": r.career_path,
      "Tech Skills & Rating": r.tech_skills_rating || "",
      "Current Status": r.current_status || "",
      "CAP/FLIP Alumnus": r.is_cap_flip_alumnus ? "Yes" : "No",
      "Cohort": r.cap_flip_cohort || "",
      "Referral Source": r.referral_source || "",
      "Additional Info": r.additional_info || "",
      "Applicant Stage": r.applicant_status,
      "Status Notes": r.status_notes || "",
      "Status Updated": r.status_updated_at ? format(new Date(r.status_updated_at), "yyyy-MM-dd HH:mm") : "",
      "Application ID": r.id.slice(0, 8),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const colWidths = Object.keys(data[0] || {}).map((key) => ({
      wch: Math.max(key.length, ...data.map((row: any) => String(row[key] ?? "").length)) + 2,
    }));
    ws["!cols"] = colWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GJP Applications");
    XLSX.writeFile(wb, `gjp-applications-${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success(`Exported ${data.length} applications to Excel`);
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
            {stats.total} total · {stats.tech} tech · {stats.total - stats.tech} non-tech · {stats.nyscDone} NYSC completed
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openEmail("selected")} size="sm" variant="outline" disabled={selectedIds.size === 0}>
            <Mail className="w-4 h-4" /> Email selected ({selectedIds.size})
          </Button>
          <Button
            onClick={() => { setBulkStatus("under_review"); setBulkNotes(""); setBulkStatusOpen(true); }}
            size="sm"
            variant="outline"
            disabled={selectedIds.size === 0}
          >
            <ListChecks className="w-4 h-4" /> Change status ({selectedIds.size})
          </Button>
          <Button onClick={() => openEmail("filtered")} size="sm" variant="outline" disabled={filtered.length === 0}>
            <Mail className="w-4 h-4" /> Email all filtered
          </Button>
          <Button onClick={exportExcel} size="sm" disabled={filtered.length === 0}>
            <FileSpreadsheet className="w-4 h-4" /> Export Excel
          </Button>
          <Button onClick={exportCsv} variant="outline" size="sm" disabled={filtered.length === 0}>
            <Download className="w-4 h-4" /> CSV
          </Button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search name, email, institution, career, NYSC number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl flex-1"
          />
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters((v) => !v)}
            className="rounded-xl"
          >
            <Filter className="w-4 h-4" />
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Button>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="rounded-xl">
              Reset
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="card-modern p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <Label className="text-xs">Stage</Label>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stages</SelectItem>
                  {applicantStatusOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Tech interest</Label>
              <Select value={techFilter} onValueChange={(v) => setTechFilter(v as typeof techFilter)}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All interests</SelectItem>
                  <SelectItem value="tech">Tech only</SelectItem>
                  <SelectItem value="non_tech">Non-tech only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Career path</Label>
              <Select value={careerFilter} onValueChange={setCareerFilter}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All career paths</SelectItem>
                  {careerPathOptions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">NYSC completed</Label>
              <Select value={nyscFilter} onValueChange={(v) => setNyscFilter(v as typeof nyscFilter)}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Completed</SelectItem>
                  <SelectItem value="no">Not completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">NYSC year</Label>
              <MultiYearPicker
                label="NYSC years"
                options={nyscYears}
                value={nyscYearFilter}
                onChange={setNyscYearFilter}
              />
            </div>
            <div>
              <Label className="text-xs">Graduation year</Label>
              <MultiYearPicker
                label="grad years"
                options={gradYears}
                value={gradYearFilter}
                onChange={setGradYearFilter}
              />
            </div>
            <div>
              <Label className="text-xs">CAP/FLIP alumni</Label>
              <Select value={alumniFilter} onValueChange={(v) => setAlumniFilter(v as typeof alumniFilter)}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Alumni only</SelectItem>
                  <SelectItem value="no">Non-alumni</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">State</Label>
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {rows.length}
        </p>
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
                  <th className="px-3 py-3 w-8">
                    <input
                      type="checkbox"
                      aria-label="Select all"
                      checked={filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id))}
                      onChange={toggleSelectAllFiltered}
                      className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                    />
                  </th>
                  <th className="text-left px-4 py-3">Applicant</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Institution</th>
                  <th className="text-left px-4 py-3">Career Path</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">NYSC</th>
                  <th className="text-left px-4 py-3">Stage</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${r.full_name}`}
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelect(r.id)}
                        className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                      />
                    </td>
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
                      <div className="flex flex-col gap-1">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary w-fit">
                          {r.career_path}
                        </span>
                        {isTechPath(r.career_path) ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            <Code2 className="w-3 h-3" /> Tech
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-medium">Non-tech</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-xs text-foreground">
                      {r.nysc_completed ? (
                        <>
                          <p>✓ {r.nysc_year || "Completed"}</p>
                          {r.nysc_number && <p className="text-[10px] text-muted-foreground font-mono">{r.nysc_number}</p>}
                        </>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={r.applicant_status}
                        onValueChange={(v) => quickUpdateStatus(r.id, v)}
                      >
                        <SelectTrigger
                          className={`h-7 px-2 py-1 rounded-full text-xs font-medium capitalize border-0 w-fit min-w-[110px] gap-1 focus:ring-1 focus:ring-ring focus:ring-offset-0 ${applicantStatusColors[r.applicant_status] || "bg-secondary text-muted-foreground"}`}
                          aria-label="Change status"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {applicantStatusOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
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
              <Detail label="NYSC Call-Up #" value={selected.nysc_number || "—"} />
              <hr className="border-border" />
              <Detail label="Career Path" value={selected.career_path} />
              <Detail label="Interested in Tech" value={isTechPath(selected.career_path) ? "Yes" : "No"} />
              <Detail label="Tech Skills & Rating" value={selected.tech_skills_rating || "—"} />
              <Detail label="Current Status" value={selected.current_status || "—"} />
              <Detail label="CAP/FLIP Alumnus" value={selected.is_cap_flip_alumnus ? "Yes" : "No"} />
              <Detail label="Cohort" value={selected.cap_flip_cohort || "—"} />
              <Detail label="Referral" value={selected.referral_source || "—"} />
              <Detail label="Additional" value={selected.additional_info || "—"} />
              <hr className="border-border" />
              <Detail label="Submitted" value={format(new Date(selected.created_at), "PPpp")} />
              <hr className="border-border" />
              <div className="space-y-3 rounded-xl bg-secondary/30 p-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Applicant Tracking</p>
                <div>
                  <Label htmlFor="stage" className="text-xs">Stage</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger id="stage" className="mt-1 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {applicantStatusOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-xs">Notes (visible to applicant on status page)</Label>
                  <Textarea id="notes" value={editNotes} onChange={(e) => setEditNotes(e.target.value)}
                    className="mt-1 rounded-xl min-h-[80px]" placeholder="e.g. Shortlisted — interview details coming soon." />
                </div>
                <Button onClick={saveStatus} disabled={saving} size="sm" className="rounded-xl w-full">
                  <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Status"}
                </Button>
                <p className="text-[10px] text-muted-foreground">
                  Last updated {format(new Date(selected.status_updated_at), "PPpp")}
                </p>
              </div>
              <Button
                onClick={() => { openEmail("single", selected); setSelected(null); }}
                variant="outline"
                size="sm"
                className="w-full rounded-xl"
              >
                <Mail className="w-4 h-4" /> Email this applicant
              </Button>
            </div>
          </div>
        </div>
      )}

      {emailDialog && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/40"
          onClick={() => setEmailDialog(null)}
        >
          <div
            className="bg-card w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-border px-5 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {emailDialog.mode === "single" ? "Email applicant" : `Email ${emailDialog.recipients.length} applicants`}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setEmailDialog(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground">
                {emailDialog.mode === "single" ? (
                  <p><strong>To:</strong> {emailDialog.recipients[0]}</p>
                ) : (
                  <>
                    <p className="font-semibold text-foreground mb-1">
                      {emailDialog.recipients.length} recipients (sent as BCC for privacy)
                    </p>
                    <p className="line-clamp-3 break-words">
                      {emailDialog.recipients.slice(0, 8).join(", ")}
                      {emailDialog.recipients.length > 8 && ` …and ${emailDialog.recipients.length - 8} more`}
                    </p>
                  </>
                )}
              </div>
              <div>
                <Label htmlFor="email-subject" className="text-xs">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="GJP — update from Sara Foundation"
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="email-body" className="text-xs">Message</Label>
                <Textarea
                  id="email-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Hi, we have an update on your GJP application..."
                  className="mt-1 rounded-xl min-h-[160px]"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                This will open your default email client (Gmail, Outlook, Apple Mail) with the message pre-filled. You can review before sending.
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between">
                <Button variant="outline" size="sm" onClick={copyEmails} className="rounded-xl">
                  Copy emails
                </Button>
                <Button onClick={sendEmail} size="sm" className="rounded-xl">
                  <Mail className="w-4 h-4" /> Open in email client
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bulkStatusOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/40"
          onClick={() => setBulkStatusOpen(false)}
        >
          <div
            className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-border px-5 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                <ListChecks className="w-4 h-4" /> Change status for {selectedIds.size} applicant{selectedIds.size > 1 ? "s" : ""}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setBulkStatusOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div>
                <Label className="text-xs">New stage</Label>
                <Select value={bulkStatus} onValueChange={setBulkStatus}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {applicantStatusOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Notes (optional — overwrites existing notes for all selected)</Label>
                <Textarea
                  value={bulkNotes}
                  onChange={(e) => setBulkNotes(e.target.value)}
                  placeholder="Leave blank to keep each applicant's current note."
                  className="mt-1 rounded-xl min-h-[80px]"
                />
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setBulkStatusOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={applyBulkStatus} disabled={bulkSaving} size="sm" className="rounded-xl">
                  <Save className="w-4 h-4" /> {bulkSaving ? "Updating..." : "Apply to all"}
                </Button>
              </div>
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

function MultiYearPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  const toggle = (y: string) => {
    const next = new Set(value);
    if (next.has(y)) next.delete(y);
    else next.add(y);
    onChange(next);
  };
  const summary =
    value.size === 0
      ? `All ${label}`
      : value.size <= 2
        ? Array.from(value).sort().reverse().join(", ")
        : `${value.size} ${label} selected`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="mt-1 w-full justify-between rounded-xl font-normal">
          <span className="truncate">{summary}</span>
          <ChevronDown className="w-4 h-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-2">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs text-muted-foreground">Select {label}</span>
          {value.size > 0 && (
            <button
              type="button"
              onClick={() => onChange(new Set())}
              className="text-xs text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <p className="text-xs text-muted-foreground px-2 py-3">No options yet</p>
          ) : (
            options.map((y) => (
              <label
                key={y}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary cursor-pointer text-sm"
              >
                <Checkbox checked={value.has(y)} onCheckedChange={() => toggle(y)} />
                <span>{y}</span>
              </label>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
