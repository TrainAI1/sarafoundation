import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";

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
    fetchSubmissions();
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  const unreadCount = submissions.filter(s => !s.is_read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
          Contact Submissions {unreadCount > 0 && <span className="text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full ml-2">{unreadCount} new</span>}
        </h1>
        <p className="text-muted-foreground text-sm">Messages received from the contact form.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <Mail className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No submissions yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {submissions.map(sub => (
              <button
                key={sub.id}
                onClick={() => { setSelected(sub); if (!sub.is_read) toggleRead(sub); }}
                className={`w-full text-left card-modern p-3 transition-colors ${selected?.id === sub.id ? 'ring-2 ring-primary' : ''} ${!sub.is_read ? 'border-l-4 border-l-primary' : ''}`}
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
            ))}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <div className="card-modern p-6">
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
