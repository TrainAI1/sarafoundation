import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Trash2, Download } from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });
    setSubscribers((data as Subscriber[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const toggleActive = async (sub: Subscriber) => {
    await supabase.from("newsletter_subscribers").update({ is_active: !sub.is_active }).eq("id", sub.id);
    fetchSubscribers();
    toast.success(sub.is_active ? "Subscriber deactivated" : "Subscriber reactivated");
  };

  const deleteSub = async (id: string) => {
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    toast.success("Subscriber removed");
    fetchSubscribers();
  };

  const exportCSV = () => {
    const active = subscribers.filter(s => s.is_active);
    const csv = "Email,Subscribed At\n" + active.map(s => `${s.email},${s.subscribed_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  const activeCount = subscribers.filter(s => s.is_active).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Newsletter Subscribers</h1>
          <p className="text-muted-foreground text-sm">{activeCount} active subscriber{activeCount !== 1 ? 's' : ''} · {subscribers.length} total</p>
        </div>
        {subscribers.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-1" /> Export CSV
          </Button>
        )}
      </div>

      {subscribers.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <Mail className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No subscribers yet.</p>
        </div>
      ) : (
        <div className="card-modern overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Subscribed</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => (
                <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="p-3 text-foreground">{sub.email}</td>
                  <td className="p-3 text-muted-foreground hidden sm:table-cell">{format(new Date(sub.subscribed_at), 'MMM d, yyyy')}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sub.is_active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {sub.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => toggleActive(sub)} className="text-xs">
                        {sub.is_active ? 'Deactivate' : 'Reactivate'}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => deleteSub(sub.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
