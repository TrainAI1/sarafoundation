import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, FileText, ChevronDown, ChevronUp, Globe, Layout, BarChart3, Info, Phone, Handshake } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Page = Tables<"pages">;

const defaultPages = [
  { slug: "home-hero", title: "Home – Hero Section", icon: Layout, fields: [
    { key: "headline", label: "Main Headline", type: "text", placeholder: "Breaking Barriers, Igniting Innovation..." },
    { key: "subheadline", label: "Subheadline", type: "textarea", placeholder: "We're on a mission to empower..." },
    { key: "cta_primary", label: "Primary CTA Text", type: "text", placeholder: "Join Our Mission" },
    { key: "cta_secondary", label: "Secondary CTA Text", type: "text", placeholder: "Partner with Us" },
    { key: "stat1_value", label: "Stat 1 Value", type: "text", placeholder: "763+" },
    { key: "stat1_label", label: "Stat 1 Label", type: "text", placeholder: "Students Trained" },
    { key: "stat2_value", label: "Stat 2 Value", type: "text", placeholder: "35+" },
    { key: "stat2_label", label: "Stat 2 Label", type: "text", placeholder: "Partner Universities" },
    { key: "stat3_value", label: "Stat 3 Value", type: "text", placeholder: "7" },
    { key: "stat3_label", label: "Stat 3 Label", type: "text", placeholder: "African Countries" },
  ]},
  { slug: "home-mission", title: "Home – Mission Section", icon: Globe, fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Mission" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Fostering Diversity, Equity & Inclusion..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "Sara Foundation Africa is dedicated to..." },
    { key: "stat1_value", label: "Stat 1 Value", type: "text", placeholder: "763+" },
    { key: "stat1_label", label: "Stat 1 Label", type: "text", placeholder: "Students Trained" },
    { key: "stat2_value", label: "Stat 2 Value", type: "text", placeholder: "35+" },
    { key: "stat2_label", label: "Stat 2 Label", type: "text", placeholder: "University Partners" },
    { key: "stat3_value", label: "Stat 3 Value", type: "text", placeholder: "5,250+" },
    { key: "stat3_label", label: "Stat 3 Label", type: "text", placeholder: "Community Reach" },
    { key: "stat4_value", label: "Stat 4 Value", type: "text", placeholder: "7" },
    { key: "stat4_label", label: "Stat 4 Label", type: "text", placeholder: "African Countries" },
  ]},
  { slug: "home-impact", title: "Home – Impact Stats", icon: BarChart3, fields: [
    { key: "students_value", label: "Students Trained", type: "text", placeholder: "763+" },
    { key: "students_desc", label: "Students Description", type: "text", placeholder: "Across 2 cohorts in CAP Tech Hub" },
    { key: "universities_value", label: "Universities", type: "text", placeholder: "35+" },
    { key: "universities_desc", label: "Universities Description", type: "text", placeholder: "Partner institutions across Africa" },
    { key: "countries_value", label: "Countries", type: "text", placeholder: "7" },
    { key: "countries_desc", label: "Countries Description", type: "text", placeholder: "Nigeria, Ghana, Kenya, Uganda & more" },
    { key: "fellows_value", label: "FLIP Fellows", type: "text", placeholder: "21" },
    { key: "fellows_desc", label: "Fellows Description", type: "text", placeholder: "Women empowered in Cohort 1" },
    { key: "partners_value", label: "Key Partners", type: "text", placeholder: "10+" },
    { key: "partners_desc", label: "Partners Description", type: "text", placeholder: "Scintilla, Farmily, Train AI & more" },
    { key: "community_value", label: "Community Reach", type: "text", placeholder: "5,250+" },
    { key: "community_desc", label: "Community Description", type: "text", placeholder: "People reached across Africa" },
  ]},
  { slug: "home-programs", title: "Home – Programs Section", icon: Layout, fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Programs" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Programs That Transform..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "From campus tech hubs to women's leadership..." },
    { key: "cap_title", label: "CAP Program Title", type: "text", placeholder: "Career Advancement Program" },
    { key: "cap_description", label: "CAP Description", type: "textarea", placeholder: "A 9-month rotational tech program..." },
    { key: "flip_title", label: "FLIP Program Title", type: "text", placeholder: "Female Leadership Initiative" },
    { key: "flip_description", label: "FLIP Description", type: "textarea", placeholder: "Empowering women in tech through..." },
  ]},
  { slug: "home-faq", title: "Home – FAQ Section", icon: Info, fields: [
    { key: "headline", label: "Section Headline", type: "text", placeholder: "Frequently Asked Questions" },
    { key: "description", label: "Section Description", type: "textarea", placeholder: "Have questions? We've got answers..." },
  ]},
  { slug: "home-cta", title: "Home – CTA Section", icon: Layout, fields: [
    { key: "headline", label: "CTA Headline", type: "text", placeholder: "Ready to Make a Difference?" },
    { key: "description", label: "CTA Description", type: "textarea", placeholder: "Whether you're a student looking to start..." },
    { key: "cta_primary", label: "Primary Button Text", type: "text", placeholder: "Join as a Student" },
    { key: "cta_secondary", label: "Secondary Button Text", type: "text", placeholder: "Become a Partner" },
  ]},
  { slug: "about-hero", title: "About – Hero Section", icon: Info, fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Transforming Africa's Tech Landscape" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Sara Foundation is a Non-Profit Organization..." },
  ]},
  { slug: "about-story", title: "About – Our Story", icon: Info, fields: [
    { key: "paragraph1", label: "Paragraph 1", type: "textarea", placeholder: "Sara Foundation Africa was born from..." },
    { key: "paragraph2", label: "Paragraph 2", type: "textarea", placeholder: "We promote Sustainable Development Goals..." },
    { key: "paragraph3", label: "Paragraph 3", type: "textarea", placeholder: "Today, we operate across 7 African countries..." },
    { key: "mission_text", label: "Mission Statement", type: "textarea", placeholder: "To foster Diversity, Equity, and Inclusion..." },
    { key: "vision_text", label: "Vision Statement", type: "textarea", placeholder: "An Africa where every young person..." },
  ]},
  { slug: "contact-info", title: "Contact – Info", icon: Phone, fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Get in Touch" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Have a question or want to partner with us?" },
    { key: "email", label: "Contact Email", type: "text", placeholder: "hello@sarafoundation.org" },
    { key: "phone", label: "Phone Number", type: "text", placeholder: "+234 xxx xxx xxxx" },
    { key: "address", label: "Address", type: "text", placeholder: "London, UK" },
  ]},
  { slug: "donation-page", title: "Donation Page", icon: Handshake, fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Support Our Mission" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Your contribution helps us..." },
    { key: "impact_text", label: "Impact Description", type: "textarea", placeholder: "Every donation creates real change..." },
  ]},
];

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchPages = async () => {
    const { data } = await supabase.from("pages").select("*");
    setPages(data || []);
    const vals: Record<string, Record<string, string>> = {};
    (data || []).forEach((p) => {
      vals[p.slug] = typeof p.content === "object" && p.content !== null ? (p.content as Record<string, string>) : {};
    });
    setEditValues(vals);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const savePage = async (slug: string, title: string) => {
    setSaving(slug);
    const content = editValues[slug] || {};
    const existing = pages.find((p) => p.slug === slug);

    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", slug);
      if (error) { toast.error(error.message); setSaving(null); return; }
    } else {
      const { error } = await supabase.from("pages").insert({ slug, title, content });
      if (error) { toast.error(error.message); setSaving(null); return; }
    }

    toast.success(`"${title}" saved!`);
    fetchPages();
    setSaving(null);
  };

  const updateField = (slug: string, key: string, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], [key]: value },
    }));
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Edit Pages</h1>
        <p className="text-muted-foreground text-sm">Manage content for every section of the website. Changes save to the database.</p>
      </div>

      <div className="space-y-2">
        {defaultPages.map((pageDef) => {
          const exists = pages.find((p) => p.slug === pageDef.slug);
          const isExpanded = expandedSlug === pageDef.slug;
          const Icon = pageDef.icon;

          return (
            <div key={pageDef.slug} className="card-modern overflow-hidden">
              <button
                onClick={() => setExpandedSlug(isExpanded ? null : pageDef.slug)}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-foreground text-sm">{pageDef.title}</span>
                    <span className="text-xs text-muted-foreground block">{pageDef.fields.length} fields</span>
                  </div>
                  {exists && <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full hidden sm:block">Configured</span>}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isExpanded && (
                <div className="p-3 md:p-4 pt-0 border-t border-border space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {pageDef.fields.map((field) => (
                      <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                        <Label className="text-xs font-medium">{field.label}</Label>
                        {field.type === "textarea" ? (
                          <Textarea
                            value={editValues[pageDef.slug]?.[field.key] || ""}
                            onChange={(e) => updateField(pageDef.slug, field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className="text-sm"
                          />
                        ) : (
                          <Input
                            value={editValues[pageDef.slug]?.[field.key] || ""}
                            onChange={(e) => updateField(pageDef.slug, field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => savePage(pageDef.slug, pageDef.title)}
                    size="sm"
                    disabled={saving === pageDef.slug}
                  >
                    <Save className="w-3 h-3 mr-2" />
                    {saving === pageDef.slug ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
