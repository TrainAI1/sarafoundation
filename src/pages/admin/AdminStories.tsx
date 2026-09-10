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
import { Plus, Trash2, Save, PlayCircle, Loader2, ArrowUp, ArrowDown, Info } from "lucide-react";

interface Story {
  id: number;
  pathway: "CAP" | "FLIP" | "EJP";
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

const defaultStories: Story[] = [
  {
    id: 1,
    pathway: "CAP",
    name: "Akinlabi Isulameya",
    headline: "Building Campuslink with a project team",
    summary:
      "Akinlabi shares how hands-on teamwork while developing the Campuslink app shaped his product-management and technical learning at CAP Tech Hub.",
    evidence: "Learner project presented through CAP Tech Hub Cohort activity.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4",
    linkLabel: "Watch project story",
    pathwayHref: "/programs/cap",
    image: "",
  },
  {
    id: 2,
    pathway: "FLIP",
    name: "Odugbayi Olamide",
    headline: "Applying business intelligence to banking operations",
    summary:
      "For her FLIP capstone work, Olamide developed a BI-powered reconciliation performance tracker, applying business intelligence to day-to-day banking operations.",
    evidence: "One of five FLIP Fellowship Cohort 1 capstone projects.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI",
    linkLabel: "Read capstone story",
    pathwayHref: "/programs/flip",
    image: "",
  },
  {
    id: 3,
    pathway: "EJP",
    name: "Eniola",
    headline: "Work-readiness learning through EJP",
    summary:
      "Eniola talks about the Government Jobs Placement initiative under EJP and how the work-readiness learning helped her build key skills for the workplace.",
    evidence: "Participant account of work-readiness learning. SFA does not guarantee employment.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-governmentjobplacementprogram-activity-7480888457888817152-IPj_",
    linkLabel: "Watch participant story",
    pathwayHref: "/programs/gjp",
    image: "",
  },
  {
    id: 4,
    pathway: "FLIP",
    name: "Fisayo Adeyemi — FLIP Workshop",
    headline: "Effective Communication & Personal Branding in Tech",
    summary:
      "Fisayo Adeyemi, Founder & Lead Coach at Rayne Consults and two-time IIBA Nigeria board member, led a live FLIP session on how effective communication and personal branding elevate influence, visibility and career success in tech.",
    evidence: "FLIP Women in Tech Workshop — LinkedIn Live, October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_flip-womenintech-sarafoundation-activity-7381988281527189506-W4cZ",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/flip",
    image: "",
  },
  {
    id: 5,
    pathway: "FLIP",
    name: "Mercy Momah — FLIP Workshop",
    headline: "Women in Tech Leadership: Challenges & Opportunities",
    summary:
      "Mercy Mosunmola Momah, a PMP-certified PMO Consultant with 20+ years across IT, telecoms, healthcare and banking, shared powerful insights on navigating leadership barriers and unlocking new opportunities for women in tech.",
    evidence: "FLIP Women in Tech Leadership Workshop — LinkedIn Live, 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-womenintech-leadership-activity-7384999379415429120-cVtD",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/flip",
    image: "",
  },
  {
    id: 6,
    pathway: "CAP",
    name: "CAP Tech Hub — Talent Showcase",
    headline: "CAP cohort talent showcase: live project presentations",
    summary:
      "Project groups from CAP Tech Hub presented the creative and technical solutions developed across their 6-month learning journey — spanning front-end and back-end development, UI/UX, project management and business analysis.",
    evidence: "CAP Tech Hub Talent Presentation Showcase, October 2025 — LinkedIn Live.",
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-sarafoundation-scintillaafrica-activity-7388436773833678848-RaVv",
    linkLabel: "Watch the showcase",
    pathwayHref: "/programs/cap",
    image: "",
  },
  {
    id: 7,
    pathway: "FLIP",
    name: "FLIP Fellowship — Capstone & Graduation",
    headline: "FLIP Cohort 1 capstone presentations and graduation ceremony",
    summary:
      "FLIP Fellows celebrated the completion of their fellowship with capstone presentations addressing real-world challenges in tech, business and social impact — marking the graduation of the first cohort of women changemakers.",
    evidence: "FLIP Fellowship Cohort 1 Capstone Presentation & Graduation — LinkedIn Live, October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-womenintech-leadership-activity-7388585608623079424-zuPr",
    linkLabel: "Watch the graduation",
    pathwayHref: "/programs/flip",
    image: "",
  },
  {
    id: 8,
    pathway: "CAP",
    name: "CAP Tech Hub Cohort 2 — Talent Showcase",
    headline: "Cohort 2 talent showcase: pitching real-world tech solutions",
    summary:
      "CAP Tech Hub's second talent showcase brought together cohort project teams to pitch, demonstrate and defend the web solutions and tech products they built from scratch — celebrating innovation, resilience and Africa's next generation of tech leaders.",
    evidence: "CAP Tech Hub Talent Presentation Showcase, May 2026 — LinkedIn Live.",
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-talentshowcase-techinnovation-activity-7463588941724536832-lYKz",
    linkLabel: "Watch the showcase",
    pathwayHref: "/programs/cap",
    image: "",
  },
  {
    id: 9,
    pathway: "CAP",
    name: "CAP Tech Hub Cohort 1 — Grand Finale",
    headline: "CAP Cohort 1 Grand Finale: Demo Day & Graduation",
    summary:
      "CAP Tech Hub Cohort 1's Grand Finale brought together final project demos, a panel with industry experts Imaobong Ofana and Victor Emmanuel, and a certificate ceremony — marking the beginning of new opportunities for the graduating cohort.",
    evidence: "CAP Tech Hub Cohort 1 Demo Session & Graduation — LinkedIn Live, April 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_cap-tech-hub-cohort-1-proudly-presents-the-activity-7451188125441228800-m91D",
    linkLabel: "Watch the demo day",
    pathwayHref: "/programs/cap",
    image: "",
  },
  {
    id: 10,
    pathway: "EJP",
    name: "Franklin Oladipo — EJP Career Session",
    headline: "Navigating career paths in 2026: a live conversation",
    summary:
      "Franklin Oladipo, Co-founder of Storipod, joined Sara Foundation for an honest conversation on what navigating a career in 2026 actually looks like — sharing practical insights for anyone trying to find direction, stay relevant and move forward with clarity.",
    evidence: "Sara Foundation EJP knowledge session — LinkedIn Live, April 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_navigating-career-paths-in-2026-live-session-activity-7442479667288358912-Vbe2",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/gjp",
    image: "",
  },
  {
    id: 11,
    pathway: "EJP",
    name: "Harry Zahavi — EJP Career Session",
    headline: "Think like a pro: starting out, standing out and thriving in tech",
    summary:
      "Harry Zahavi — software developer, founder of rigitiX and CodeRigi, and leader of The Geniuses Catalyst Circle — shared his framework for breaking into tech, blending technical depth with visionary thinking to build a long-term career that stands out.",
    evidence: "Sara Foundation EJP knowledge session — LinkedIn Live, December 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_techcareer-sarafoundation-harryzahavi-activity-7401871800164417536-9_0v",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/gjp",
    image: "",
  },
];

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>(defaultStories);
  // Everything else already saved on this page's content row (badge, headline,
  // description) — kept as-is so this editor never clobbers those fields.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restFields, setRestFields] = useState<Record<string, any>>({});
  const [editing, setEditing] = useState<number | null>(null);
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
                pathway: s.pathway === "FLIP" || s.pathway === "EJP" ? s.pathway : "CAP",
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
          Only the first {VISIBLE_ON_PAGE} stories below show by default on each page. As soon as you add one
          more, visitors will see a "Show more stories" button that reveals the rest — no code changes needed.
          Use the up/down arrows to control which stories appear first.
        </p>
      </div>

      <div className="space-y-3">
        {stories.map((s, index) => (
          <div key={s.id} className="card-modern overflow-hidden">
            <div className="p-3 md:p-4 flex items-start justify-between gap-3">
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
                      Behind "Show more"
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
