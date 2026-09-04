import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, Save, Sparkles, Loader2, Edit, MoveUp, MoveDown, Layers } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assetUrl } from "@/lib/assetUrl";

import eventGroupPhoto from "@/assets/events/DSC_3409.jpg.asset.json";
import eventStudentMic from "@/assets/events/DSC_3253.jpg.asset.json";
import eventSpeaker from "@/assets/events/DSC_3240.jpg.asset.json";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";
import capWomenGroup from "@/assets/cap-women-group.jpg";
import capWomanBraids from "@/assets/cap-woman-braids.jpg";
import youngDeveloper from "@/assets/young-developer.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import womanFounderPitch from "@/assets/woman-founder-pitch.jpg";

export interface MarqueeCard {
  id: number;
  src: string;
  name: string;
  role: string;
  tone: "light" | "dark" | "accent";
}

export const defaultMarqueeCards: MarqueeCard[] = [
  { id: 1, src: capHappyCoder, name: "CAP Tech Hub", role: "Practical learning session", tone: "light" },
  { id: 2, src: "", name: "57", role: "Women across FLIP fellowship & mentorship", tone: "accent" },
  { id: 3, src: assetUrl(eventGroupPhoto), name: "CAP Tech Hub", role: "Cohort group photo", tone: "dark" },
  { id: 4, src: youngDeveloper, name: "CAP learner", role: "Learner-led project build", tone: "light" },
  { id: 5, src: "", name: "11", role: "African countries reached", tone: "accent" },
  { id: 6, src: techEntrepreneurs, name: "Demo Day", role: "CAP Cohort 1 project showcase", tone: "dark" },
  { id: 7, src: assetUrl(eventStudentMic), name: "CAP learner", role: "Q&A during a live session", tone: "light" },
  { id: 8, src: capWomenGroup, name: "FLIP community", role: "Peer learning and mentoring", tone: "dark" },
  { id: 9, src: womanFounderPitch, name: "Talent Showcase", role: "Presenting learner projects", tone: "light" },
  { id: 10, src: assetUrl(eventSpeaker), name: "Expert session", role: "Speaker at a CAP Tech Hub event", tone: "dark" },
  { id: 11, src: "", name: "763", role: "CAP learners fully funded", tone: "accent" },
  { id: 12, src: capWomanBraids, name: "FLIP workshop", role: "Inclusive learning activity", tone: "light" },
];

export default function AdminHeroCards() {
  const [cards, setCards] = useState<MarqueeCard[]>(defaultMarqueeCards);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase.from("pages").select("*").eq("slug", "hero-marquee").single();
      if (data && typeof data.content === "object" && data.content !== null) {
        const content = data.content as { items?: MarqueeCard[] };
        if (content.items && content.items.length > 0) {
          setCards(content.items);
        }
      }
      setLoading(false);
    };
    fetchCards();
  }, []);

  const addNew = () => {
    const newId = Math.max(...cards.map((c) => c.id || 0), 0) + 1;
    const newCard: MarqueeCard = {
      id: newId,
      src: "",
      name: "New Showcase",
      role: "Card description",
      tone: "light",
    };
    setCards([...cards, newCard]);
    setEditing(newId);
  };

  const updateField = (id: number, field: keyof MarqueeCard, value: any) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const remove = (id: number) => {
    if (!confirm("Remove this showcase card?")) return;
    setCards((prev) => prev.filter((c) => c.id !== id));
    toast.success("Card removed");
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    const newCards = [...cards];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCards.length) return;
    const temp = newCards[index];
    newCards[index] = newCards[targetIndex];
    newCards[targetIndex] = temp;
    setCards(newCards);
  };

  const saveAll = async () => {
    setSaving(true);
    const content = JSON.parse(JSON.stringify({ items: cards }));
    const { data: existing } = await supabase.from("pages").select("id").eq("slug", "hero-marquee").single();

    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", "hero-marquee");
      if (error) { toast.error(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("pages").insert([{ slug: "hero-marquee", title: "Hero Marquee Cards", content }]);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }

    toast.success("Hero Showcase Cards saved successfully!");
    setEditing(null);
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading cards...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Hero Showcase Cards</h1>
          <p className="text-sm text-muted-foreground">Edit the images, stat callouts, and text displayed on the homepage scrolling marquee.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={addNew}>
            <Plus className="w-4 h-4 mr-2" /> Add Card
          </Button>
          <Button size="sm" variant="default" onClick={saveAll} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : "Save All Cards"}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((card, idx) => (
          <div key={card.id || idx} className="card-modern overflow-hidden">
            <div className="p-3 md:p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer" onClick={() => setEditing(editing === card.id ? null : card.id)}>
                {card.tone === "accent" ? (
                  <div className="w-12 h-12 rounded-xl bg-accent text-white flex flex-col items-center justify-center font-bold text-xs flex-shrink-0">
                    <Sparkles className="w-4 h-4 mb-0.5" />
                    <span>Stat</span>
                  </div>
                ) : card.src ? (
                  <img src={card.src} alt={card.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-foreground text-sm truncate">{card.name || "Untitled"}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                      card.tone === "accent" ? "bg-accent/15 text-accent" : card.tone === "dark" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {card.tone}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{card.role || "No description"}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" className="w-7 h-7" disabled={idx === 0} onClick={() => moveCard(idx, "up")} title="Move Up">
                  <MoveUp className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7" disabled={idx === cards.length - 1} onClick={() => moveCard(idx, "down")} title="Move Down">
                  <MoveDown className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setEditing(editing === card.id ? null : card.id)} title="Edit Card">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-destructive" onClick={() => remove(card.id)} title="Delete Card">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {editing === card.id && (
              <div className="p-4 border-t border-border space-y-4 bg-secondary/20">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs font-medium">Title / Stat Value</Label>
                    <Input
                      value={card.name}
                      onChange={(e) => updateField(card.id, "name", e.target.value)}
                      placeholder="e.g. CAP learner or 11"
                      className="text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Card Style / Tone</Label>
                    <Select value={card.tone} onValueChange={(v) => updateField(card.id, "tone", v)}>
                      <SelectTrigger className="text-sm mt-1">
                        <SelectValue placeholder="Tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Image Card</SelectItem>
                        <SelectItem value="dark">Dark Image Card</SelectItem>
                        <SelectItem value="accent">Accent Stat Highlight Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium">Subtitle / Description</Label>
                  <Input
                    value={card.role}
                    onChange={(e) => updateField(card.id, "role", e.target.value)}
                    placeholder="e.g. Q&A during a live session or African countries reached"
                    className="text-sm mt-1"
                  />
                </div>

                {card.tone !== "accent" && (
                  <div>
                    <Label className="text-xs font-medium">Card Image</Label>
                    <ImageUpload
                      value={card.src}
                      onChange={(url) => updateField(card.id, "src", url)}
                      folder="hero-cards"
                      label="Upload Card Image"
                      aspectRatio="landscape"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={saveAll} disabled={saving} size="lg">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : "Save All Showcase Cards"}
        </Button>
      </div>
    </div>
  );
}
