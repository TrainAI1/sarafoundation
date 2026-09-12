import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Save, PlayCircle, Loader2, ArrowUp, ArrowDown, Info, GripVertical } from "lucide-react";
import { successStories, type StoryPathway } from "@/data/successStories";

interface Story {
  id: number;
  pathway: StoryPathway;
  name: string;
  headline: string;
  summary: string;
  evidence: string;
  link: string;
  linkLabel: string;
  pathwayHref: string;
  image: string;
}

const SLUG = "home-success-stories";
// Keep in sync with VISIBLE_STORIES in src/components/sections/SuccessStoriesSection.tsx
const VISIBLE_ON_PAGE = 3;

const defaultStories: Story[] = successStories.map((story, index) => ({
  ...story,
  id: index + 1,
  link: story.link || "",
  image: story.image || "",
}));

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>(defaultStories);
  // Everything else already saved on this page's content row (badge, headline,
  // description) — kept as-is so this editor never clobbers those fields.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restFields, setRestFields] = useState<Record<string, any>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase.from("pages").select("*").eq("slug", SLUG).maybeSingle();
        if (error) console.warn("Supabase fetch warning:", error.message);
        if (data && typeof data.content === "object" && data.content !== null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const content = data.content as Record<string, any>;
          const { stories: savedStories, ...rest } = content;
          setRestFields(rest);
          if (Array.isArray(savedStories) && savedStories.length > 0) {
            setStories(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              savedStories.map((s: any, i: number) => ({
                id: i + 1,
                pathway: s.pathway === "FLIP" || s.pathway === "EJP" || s.pathway === "Foundation" ? s.pathway : "CAP",
                name: s.name || "",
                headline: s.headline || "",
                summary: s.summary || "",
                evidence: s.evidence || "",
                link: s.link || "",
                linkLabel: s.linkLabel || "",
                pathwayHref: s.pathwayHref || "",
                image: s.image || "",
              }))
            );
          }
        }
      } catch (err) {
        console.warn("Failed to load stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const addNew = () => {
    const newId = Math.max(...stories.map((s) => s.id), 0) + 1;
    const newStory: Story = {
      id: newId,
      pathway: "CAP",
      name: "",
      headline: "",
      summary: "",
      evidence: "",
      link: "",
      linkLabel: "",
      pathwayHref: "",
      image: "",
    };
    setStories([...stories, newStory]);
    setEditing(newId);
  };

  const updateField = (id: number, field: keyof Story, value: string) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const remove = (id: number) => {
    if (!confirm("Remove this story? This can't be undone once you save.")) return;
    setStories((prev) => prev.filter((s) => s.id !== id));
    toast.success("Story removed — click \"Save All Stories\" to make it permanent");
  };

  const move = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stories.length) return;
    const next = [...stories];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setStories(next);
  };

  const dropAt = (targetId: number) => {
    if (draggedId === null || draggedId === targetId) {
      setDraggedId(null);
      return;
    }
    setStories((current) => {
      const from = current.findIndex((story) => story.id === draggedId);
      const to = current.findIndex((story) => story.id === targetId);
      if (from < 0 || to < 0) return current;
      const reordered = [...current];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);
      return reordered;
    });
    setDraggedId(null);
  };

  const save = async () => {
    const missingName = stories.find((s) => !s.name.trim());
    if (missingName) {
      toast.error("Every story needs a name before you can save.");
      return;
    }
    setSaving(true);
    try {
      const cleanStories = stories.map(({ id, ...rest }) => rest);
      const content = JSON.parse(JSON.stringify({ ...restFields, stories: cleanStories }));
      const { data: existing, error: findErr } = await supabase.from("pages").select("id").eq("slug", SLUG).maybeSingle();
      if (findErr) console.warn("Supabase query check warning:", findErr.message);

      if (existing) {
        const { error } = await supabase.from("pages").update({ content }).eq("slug", SLUG);
        if (error) { toast.error(`Error saving: ${error.message}`); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("pages").insert([{ slug: SLUG, title: "Featured Success Stories", content }]);
        if (error) { toast.error(`Error creating: ${error.message}`); setSaving(false); return; }
      }

      toast.success("Stories saved! Live on the Home page and the Our Impact page.");
      setEditing(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Failed to save stories");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Success Stories</h1>
          <p className="text-sm text-muted-foreground">
            Shown on the Home page and the Our Impact page under "Real Learners. Real Journeys."
          </p>
        </div>
        <Button size="sm" onClick={addNew}><Plus className="w-4 h-4 mr-2" /> Add Story</Button>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 md:p-4 mb-6 flex gap-3">
        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs md:text-sm text-muted-foreground">
          The first {VISIBLE_ON_PAGE} stories appear on the Home page. The full verified collection appears on
          Our Impact. Drag a story to any position, or use the arrows for precise ordering.
        </p>
      </div>

      <div className="space-y-3">
        {stories.map((s, index) => (
          <div
            key={s.id}
            draggable
            onDragStart={() => setDraggedId(s.id)}
            onDragEnd={() => setDraggedId(null)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => dropAt(s.id)}
            className={`card-modern overflow-hidden transition-opacity ${draggedId === s.id ? "opacity-50" : "opacity-100"}`}
          >
            <div className="p-3 md:p-4 flex items-start justify-between gap-3">
              <GripVertical className="w-5 h-5 mt-1 text-muted-foreground cursor-grab flex-shrink-0" aria-label="Drag to reorder" />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditing(editing === s.id ? null : s.id)}>
                <div className="flex items-center gap-2 mb-1">
                  {s.image && <img src={s.image} alt={s.name} className="w-10 h-8 rounded object-cover flex-shrink-0" />}
                  <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-primary px-1.5 py-0.5 rounded bg-primary/10">
                    {s.pathway}
                  </span>
                  <span className="font-medium text-foreground text-sm truncate">{s.name || "New Story"}</span>
                  {index >= VISIBLE_ON_PAGE && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
                      Our Impact only
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{s.headline}</p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Button variant="ghost" size="icon" className="w-8 h-8" disabled={index === 0} onClick={() => move(index, "up")}>
                  <ArrowUp className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" disabled={index === stories.length - 1} onClick={() => move(index, "down")}>
                  <ArrowDown className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-destructive" onClick={() => remove(s.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {editing === s.id && (
              <div className="p-3 md:p-4 border-t border-border space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs">Pathway</Label>
                    <Select value={s.pathway} onValueChange={(v) => updateField(s.id, "pathway", v)}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAP">CAP</SelectItem>
                        <SelectItem value="FLIP">FLIP</SelectItem>
                        <SelectItem value="EJP">EJP</SelectItem>
                        <SelectItem value="Foundation">Foundation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input value={s.name} onChange={(e) => updateField(s.id, "name", e.target.value)} className="text-sm" placeholder="Full name" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Headline</Label>
                  <Input value={s.headline} onChange={(e) => updateField(s.id, "headline", e.target.value)} className="text-sm" placeholder="Short, punchy headline for the card" />
                </div>
                <div>
                  <Label className="text-xs">Summary</Label>
                  <Textarea value={s.summary} onChange={(e) => updateField(s.id, "summary", e.target.value)} rows={3} className="text-sm" placeholder="A few sentences describing the story" />
                </div>
                <div>
                  <Label className="text-xs">Evidence line</Label>
                  <Input value={s.evidence} onChange={(e) => updateField(s.id, "evidence", e.target.value)} className="text-sm" placeholder="e.g. Learner project presented through CAP Tech Hub Cohort activity." />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs">Link URL (optional)</Label>
                    <Input value={s.link} onChange={(e) => updateField(s.id, "link", e.target.value)} className="text-sm" placeholder="https://..." />
                  </div>
                  <div>
                    <Label className="text-xs">Link label</Label>
                    <Input value={s.linkLabel} onChange={(e) => updateField(s.id, "linkLabel", e.target.value)} className="text-sm" placeholder="Watch project story" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Pathway page URL</Label>
                  <Input value={s.pathwayHref} onChange={(e) => updateField(s.id, "pathwayHref", e.target.value)} className="text-sm" placeholder="/programs/cap" />
                </div>
                <div>
                  <Label className="text-xs">Video thumbnail</Label>
                  <ImageUpload
                    value={s.image}
                    onChange={(url) => updateField(s.id, "image", url)}
                    folder="success-stories"
                    label="Upload Thumbnail"
                    aspectRatio="landscape"
                    helperText="Leave empty to use the built-in pathway thumbnail."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : "Save All Stories"}
        </Button>
      </div>
    </div>
  );
}
