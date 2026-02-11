import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, Save, MessageSquare, Star, Loader2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  program: string;
  quote: string;
  rating: number;
  photo: string;
}

const defaultTestimonials: Testimonial[] = [
  { id: 1, name: "Taiwo", role: "Full-Stack Developer", program: "CAP Tech Hub FUOYE, Nigeria", quote: "My journey with CAP Tech Hub as a Full-Stack Developer has been incredibly transformative.", rating: 5, photo: "" },
  { id: 2, name: "Abubakar Samuel", role: "Engineering Student", program: "CAP Tech Hub Global, Togo", quote: "The CAP Tech Hub program has been an incredible journey for me.", rating: 5, photo: "" },
  { id: 3, name: "Olamide Fasoranti", role: "UI/UX Designer", program: "FLIP Fellow, Cohort 1", quote: "The FLIP Fellowship challenged me to think differently about problem-solving.", rating: 5, photo: "" },
  { id: 4, name: "Fathia", role: "200L Student, University of Ibadan", program: "CAP Tech Hub Cohort 2", quote: "Every expert session opened my eyes to something new.", rating: 5, photo: "" },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase.from("pages").select("*").eq("slug", "testimonials").single();
      if (data && typeof data.content === "object" && data.content !== null) {
        const content = data.content as { items?: Testimonial[] };
        if (content.items && content.items.length > 0) {
          setTestimonials(content.items);
        }
      }
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const addNew = () => {
    const newId = Math.max(...testimonials.map((t) => t.id), 0) + 1;
    const newTestimonial: Testimonial = { id: newId, name: "", role: "", program: "", quote: "", rating: 5, photo: "" };
    setTestimonials([...testimonials, newTestimonial]);
    setEditing(newId);
  };

  const updateField = (id: number, field: keyof Testimonial, value: string | number) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const remove = (id: number) => {
    if (!confirm("Remove this testimonial?")) return;
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial removed");
  };

  const save = async () => {
    setSaving(true);
    const content = JSON.parse(JSON.stringify({ items: testimonials }));
    const { data: existing } = await supabase.from("pages").select("id").eq("slug", "testimonials").single();

    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", "testimonials");
      if (error) { toast.error(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("pages").insert([{ slug: "testimonials", title: "Testimonials", content }]);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }

    toast.success("Testimonials saved!");
    setEditing(null);
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage success stories displayed on the website. Changes persist to the database.</p>
        </div>
        <Button size="sm" onClick={addNew}><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
      </div>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="card-modern overflow-hidden">
            <div className="p-3 md:p-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditing(editing === t.id ? null : t.id)}>
                <div className="flex items-center gap-2 mb-1">
                  {t.photo && <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover" />}
                  <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground text-sm truncate">{t.name || "New Testimonial"}</span>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{t.role} · {t.program}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">"{t.quote}"</p>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-destructive flex-shrink-0" onClick={() => remove(t.id)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            {editing === t.id && (
              <div className="p-3 md:p-4 border-t border-border space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input value={t.name} onChange={(e) => updateField(t.id, "name", e.target.value)} className="text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">Role</Label>
                    <Input value={t.role} onChange={(e) => updateField(t.id, "role", e.target.value)} className="text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Program</Label>
                  <Input value={t.program} onChange={(e) => updateField(t.id, "program", e.target.value)} className="text-sm" />
                </div>
                <div>
                  <Label className="text-xs">Quote</Label>
                  <Textarea value={t.quote} onChange={(e) => updateField(t.id, "quote", e.target.value)} rows={3} className="text-sm" />
                </div>
                <div>
                  <Label className="text-xs">Photo</Label>
                  <ImageUpload
                    value={t.photo}
                    onChange={(url) => updateField(t.id, "photo", url)}
                    folder="testimonials"
                    label="Upload Photo"
                    aspectRatio="square"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rating (1-5)</Label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} onClick={() => updateField(t.id, "rating", r)} className="p-1">
                        <Star className={`w-5 h-5 ${r <= t.rating ? "fill-accent text-accent" : "text-border"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : "Save All Testimonials"}
        </Button>
      </div>
    </div>
  );
}
