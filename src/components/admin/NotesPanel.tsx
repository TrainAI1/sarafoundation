import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuditLog } from "@/hooks/useAuditLog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  body: string;
  author_email: string | null;
  author_id: string | null;
  created_at: string;
}

type AppType = "cap" | "flip" | "gjp" | "contact";

export default function NotesPanel({ type, id }: { type: AppType; id: string }) {
  const { userId, email } = useAdmin();
  const { log } = useAuditLog();
  const [notes, setNotes] = useState<Note[]>([]);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("application_notes")
      .select("id, body, author_email, author_id, created_at")
      .eq("application_type", type)
      .eq("application_id", id)
      .order("created_at", { ascending: false });
    setNotes((data ?? []) as Note[]);
  };

  useEffect(() => { load(); }, [type, id]);

  const add = async () => {
    if (!body.trim() || !userId) return;
    setSaving(true);
    const { error } = await supabase.from("application_notes").insert({
      application_type: type,
      application_id: id,
      author_id: userId,
      author_email: email,
      body: body.trim(),
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    log({ action: "note.add", entity: type, entity_id: id, summary: body.trim().slice(0, 120) });
    setBody("");
    load();
  };

  const remove = async (noteId: string) => {
    const { error } = await supabase.from("application_notes").delete().eq("id", noteId);
    if (error) { toast.error(error.message); return; }
    log({ action: "note.delete", entity: type, entity_id: id });
    load();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <MessageSquare className="w-4 h-4 text-primary" /> Internal Notes
        <span className="text-xs text-muted-foreground font-normal">({notes.length})</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notes.length === 0 && <p className="text-xs text-muted-foreground italic">No notes yet.</p>}
        {notes.map((n) => (
          <div key={n.id} className="bg-secondary/50 rounded-lg p-3 text-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">{n.author_email ?? "Staff"}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{format(new Date(n.created_at), "MMM d, p")}</span>
                {n.author_id === userId && (
                  <button onClick={() => remove(n.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-foreground whitespace-pre-wrap">{n.body}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add an internal note..."
          rows={3}
          className="text-sm"
        />
        <Button size="sm" onClick={add} disabled={saving || !body.trim()}>
          {saving ? "Saving..." : "Add Note"}
        </Button>
      </div>
    </div>
  );
}