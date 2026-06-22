import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { format } from "date-fns";
import BulkActionsBar from "@/components/admin/BulkActionsBar";
import NotesPanel from "@/components/admin/NotesPanel";
import { toCSV, downloadCSV } from "@/lib/csv";
import { useAuditLog } from "@/hooks/useAuditLog";

interface Submission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  topic: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContacts() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const { log } = useAuditLog();

  const fetchSubmissions = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions((data as Submission[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchSubmissions(); }, []);

  const toggleRead = async (sub: Submission) => {
    await supabase.from("contact_submissions").update({ is_read: !sub.is_read }).eq("id", sub.id);
    fetchSubmissions();
  };

  const deleteSub = async (id: string) => {
    await supabase.from("contact_submissions").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    toast.success("Submission deleted");
    log({ action: "contact.delete", entity: "contact", entity_id: id });
    fetchSubmissions();
  };

  const bulkDelete = async () => {
    const ids = Array.from(picked);
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} message(s)?`)) return;
    const { error } = await supabase.from("contact_submissions").delete().in("id", ids);
    if (error) { toast.error(error.message); return; }
    log({ action: "contact.bulk.delete", entity: "contact", summary: `Deleted ${ids.length} messages`, metadata: { count: ids.length } });
    toast.success(`Deleted ${ids.length} message(s)`);
    setPicked(new Set());
    if (selected && ids.includes(selected.id)) setSelected(null);
    fetchSubmissions();
  };

  const bulkMarkRead = async (read: boolean) => {
    const ids = Array.from(picked);
    if (!ids.length) return;
    await supabase.from("contact_submissions").update({ is_read: read }).in("id", ids);
    log({ action: read ? "contact.bulk.read" : "contact.bulk.unread", entity: "contact", summary: `${read ? "Read" : "Unread"}: ${ids.length}`, metadata: { count: ids.length } });
    setPicked(new Set());
    fetchSubmissions();
  };

  const exportCsv = () => {
    const rows = (picked.size ? submissions.filter((s) => picked.has(s.id)) : submissions).map((s) => ({
      received: s.created_at,
      first_name: s.first_name,
      last_name: s.last_name,
      email: s.email,
      topic: s.topic ?? "",
      message: s.message,
      read: s.is_read ? "yes" : "no",
    }));
    downloadCSV(`contacts-${format(new Date(), "yyyy-MM-dd")}.csv`, toCSV(rows));
    log({ action: "contact.export", entity: "contact", summary: `Exported ${rows.length} rows` });
  };

  const togglePick = (id: string) =>
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (filter === "unread" && s.is_read) return false;
      if (filter === "read" && !s.is_read) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.first_name.toLowerCase().includes(q) ||
          s.last_name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.topic ?? "").toLowerCase().includes(q) ||
          s.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [submissions, filter, search]);

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  const unreadCount = submissions.filter(s => !s.is_read).length;
  const allChecked = filtered.length > 0 && filtered.every((s) => picked.has(s.id));

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
          Contact Submissions {unreadCount > 0 && <span className="text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full ml-2">{unreadCount} new</span>}
        </h1>
        <p className="text-muted-foreground text-sm">Messages received from the contact form.</p>
      </div>

      <div className="card-modern p-3 mb-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search name, email, topic, message…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex bg-secondary rounded-lg p-0.5">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >{f}</button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv}>Export CSV</Button>
      </div>

      <BulkActionsBar
        count={picked.size}
        onClear={() => setPicked(new Set())}
        onExport={exportCsv}
        onDelete={bulkDelete}
      />

      {submissions.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <Mail className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No submissions yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            <label className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => {
                  if (e.target.checked) setPicked(new Set(filtered.map((s) => s.id)));
                  else setPicked(new Set());
                }}
              />
              Select all ({filtered.length})
              <button onClick={() => bulkMarkRead(true)} className="ml-auto text-primary hover:underline disabled:opacity-40" disabled={picked.size === 0}>
                Mark read
              </button>
              <button onClick={() => bulkMarkRead(false)} className="text-primary hover:underline disabled:opacity-40" disabled={picked.size === 0}>
                Mark unread
              </button>
            </label>
            {filtered.map(sub => (
              <div
                key={sub.id}
                className={`flex gap-2 items-start card-modern p-3 transition-colors ${selected?.id === sub.id ? 'ring-2 ring-primary' : ''} ${!sub.is_read ? 'border-l-4 border-l-primary' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={picked.has(sub.id)}
                  onChange={() => togglePick(sub.id)}
                  className="mt-1"
                />
                <button
                  onClick={() => { setSelected(sub); if (!sub.is_read) toggleRead(sub); }}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex justify-between items-start">
                    <p className={`text-sm ${!sub.is_read ? 'font-bold text-foreground' : 'text-foreground'}`}>
                      {sub.first_name} {sub.last_name}
                    </p>
                    <span className="text-xs text-muted-foreground">{format(new Date(sub.created_at), 'MMM d')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{sub.email}</p>
                  {sub.topic && <span className="text-xs bg-secondary text-muted-foreground px-1.5 py-0.5 rounded mt-1 inline-block">{sub.topic}</span>}
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sub.message}</p>
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <div className="card-modern p-6 space-y-6">
               <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{selected.first_name} {selected.last_name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-primary text-sm hover:underline">{selected.email}</a>
                    {selected.topic && <p className="text-xs text-muted-foreground mt-1">Topic: {selected.topic}</p>}
                    <p className="text-xs text-muted-foreground">{format(new Date(selected.created_at), 'PPpp')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => toggleRead(selected)}>
                      {selected.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteSub(selected.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-sm text-foreground whitespace-pre-wrap">
                  {selected.message}
                </div>
                <div className="mt-4">
                  <Button asChild size="sm">
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.topic || 'Your inquiry'}`}>
                      <Mail className="w-4 h-4 mr-1" /> Reply via Email
                    </a>
                  </Button>
                </div>
               </div>
               <div className="border-t border-border pt-4">
                 <NotesPanel type="contact" id={selected.id} />
               </div>
              </div>
            ) : (
              <div className="card-modern p-8 text-center text-muted-foreground">
                <p>Select a message to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
