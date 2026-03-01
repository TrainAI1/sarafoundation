import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Save, ChevronDown, ChevronUp, Globe, Layout, BarChart3, Info, Phone, Handshake, Image, Users, MessageSquare, GraduationCap, Heart, Search, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Page = Tables<"pages">;

const defaultPages = [
  { slug: "home-hero", title: "Home – Hero Section", icon: Layout, previewPath: "/", fields: [
    { key: "headline", label: "Main Headline", type: "text", placeholder: "Breaking Barriers, Igniting Innovation..." },
    { key: "subheadline", label: "Subheadline", type: "textarea", placeholder: "We're on a mission to empower..." },
    { key: "cta_primary", label: "Primary CTA Text", type: "text", placeholder: "Join Our Mission" },
    { key: "cta_secondary", label: "Secondary CTA Text", type: "text", placeholder: "Partner with Us" },
    { key: "hero_image", label: "Hero Background Image", type: "image", placeholder: "" },
  ]},
  { slug: "home-mission", title: "Home – Mission Section", icon: Globe, previewPath: "/#mission", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Mission" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Fostering Diversity, Equity & Inclusion..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "Sara Foundation Africa is dedicated to..." },
    { key: "mission_image", label: "Mission Image", type: "image", placeholder: "" },
  ]},
  { slug: "home-impact", title: "Home – Impact Stats", icon: BarChart3, previewPath: "/#impact", fields: [
    { key: "students_value", label: "Students Trained", type: "text", placeholder: "763+" },
    { key: "students_desc", label: "Students Description", type: "text", placeholder: "Across 2 cohorts in CAP Tech Hub" },
    { key: "students_image", label: "Students Image", type: "image", placeholder: "" },
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
  { slug: "home-programs", title: "Home – Programs Section", icon: Layout, previewPath: "/#programs", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Programs" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Programs That Transform..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "From campus tech hubs to women's leadership..." },
    { key: "cap_title", label: "CAP Program Title", type: "text", placeholder: "Career Advancement Program" },
    { key: "cap_description", label: "CAP Description", type: "textarea", placeholder: "A 9-month rotational tech program..." },
    { key: "cap_image", label: "CAP Image", type: "image", placeholder: "" },
    { key: "flip_title", label: "FLIP Program Title", type: "text", placeholder: "Female Leadership Initiative" },
    { key: "flip_description", label: "FLIP Description", type: "textarea", placeholder: "Empowering women in tech through..." },
    { key: "flip_image", label: "FLIP Image", type: "image", placeholder: "" },
  ]},
  { slug: "home-testimonials", title: "Home – Testimonials", icon: MessageSquare, previewPath: "/#testimonials", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Success Stories" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Hear from Our Community" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Real stories from real people..." },
  ]},
  { slug: "home-faq", title: "Home – FAQ Section", icon: Info, previewPath: "/#faq", fields: [
    { key: "headline", label: "Section Headline", type: "text", placeholder: "Frequently Asked Questions" },
    { key: "description", label: "Section Description", type: "textarea", placeholder: "Have questions? We've got answers..." },
  ]},
  { slug: "home-cta", title: "Home – CTA Section", icon: Layout, previewPath: "/#cta", fields: [
    { key: "headline", label: "CTA Headline", type: "text", placeholder: "Ready to Make a Difference?" },
    { key: "description", label: "CTA Description", type: "textarea", placeholder: "Whether you're a student looking to start..." },
    { key: "cta_primary", label: "Primary Button Text", type: "text", placeholder: "Join as a Student" },
    { key: "cta_secondary", label: "Secondary Button Text", type: "text", placeholder: "Become a Partner" },
    { key: "bg_image", label: "Background Image", type: "image", placeholder: "" },
  ]},
  { slug: "home-newsletter", title: "Home – Newsletter", icon: MessageSquare, previewPath: "/#newsletter", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Stay Updated" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Subscribe to get the latest news..." },
  ]},
  { slug: "about-hero", title: "About – Hero Section", icon: Info, previewPath: "/about", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Transforming Africa's Tech Landscape" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Sara Foundation is a Non-Profit Organization..." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: "" },
  ]},
  { slug: "about-story", title: "About – Our Story", icon: Info, previewPath: "/about", fields: [
    { key: "paragraph1", label: "Paragraph 1", type: "textarea", placeholder: "Sara Foundation Africa was born from..." },
    { key: "paragraph2", label: "Paragraph 2", type: "textarea", placeholder: "We promote Sustainable Development Goals..." },
    { key: "paragraph3", label: "Paragraph 3", type: "textarea", placeholder: "Today, we operate across 7 African countries..." },
    { key: "mission_text", label: "Mission Statement", type: "textarea", placeholder: "To foster Diversity, Equity, and Inclusion..." },
    { key: "vision_text", label: "Vision Statement", type: "textarea", placeholder: "An Africa where every young person..." },
    { key: "story_image1", label: "Story Image 1", type: "image", placeholder: "" },
    { key: "story_image2", label: "Story Image 2", type: "image", placeholder: "" },
  ]},
  { slug: "about-team", title: "About – Team Section", icon: Users, previewPath: "/about", fields: [
    { key: "badge", label: "Section Badge", type: "text", placeholder: "Our Team" },
    { key: "headline", label: "Headline", type: "text", placeholder: "Meet the People Behind..." },
    { key: "description", label: "Description", type: "textarea", placeholder: "Our passionate team is dedicated..." },
  ]},
  { slug: "programs-cap", title: "Programs – CAP", icon: GraduationCap, previewPath: "/programs/cap", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Career Advancement Program" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "A 9-month rotational tech program..." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: "" },
    { key: "mission", label: "Mission", type: "textarea", placeholder: "To bridge the gap..." },
    { key: "vision", label: "Vision", type: "textarea", placeholder: "An Africa where every student..." },
  ]},
  { slug: "programs-flip", title: "Programs – FLIP", icon: Heart, previewPath: "/programs/flip", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Female Leadership Initiative" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "Empowering women in tech..." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: "" },
    { key: "mission", label: "Mission", type: "textarea", placeholder: "To empower women..." },
    { key: "vision", label: "Vision", type: "textarea", placeholder: "A world where women lead..." },
  ]},
  { slug: "contact-info", title: "Contact – Info", icon: Phone, previewPath: "/contact", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Get in Touch" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Have a question or want to partner with us?" },
    { key: "email", label: "Contact Email", type: "text", placeholder: "hello@sarafoundation.org" },
    { key: "phone", label: "Phone Number", type: "text", placeholder: "+234 xxx xxx xxxx" },
    { key: "address", label: "Address", type: "text", placeholder: "London, UK" },
  ]},
  { slug: "donation-page", title: "Donation Page", icon: Handshake, previewPath: "/donation", fields: [
    { key: "headline", label: "Headline", type: "text", placeholder: "Support Our Mission" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Your contribution helps us..." },
    { key: "impact_text", label: "Impact Description", type: "textarea", placeholder: "Every donation creates real change..." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: "" },
  ]},
  { slug: "partnership-page", title: "Partnership Page", icon: Handshake, previewPath: "/partnership", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text", placeholder: "Partner with Sara Foundation" },
    { key: "hero_description", label: "Hero Description", type: "textarea", placeholder: "Join us in transforming..." },
    { key: "hero_image", label: "Hero Image", type: "image", placeholder: "" },
  ]},
];

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredPages = defaultPages.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Edit Pages</h1>
          <p className="text-muted-foreground text-sm">Manage all content, images, and text on every page. Changes reflect live on the website.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Filter sections..." className="pl-9 text-sm" />
        </div>
      </div>

      <div className="space-y-2">
        {filteredPages.map((pageDef) => {
          const exists = pages.find((p) => p.slug === pageDef.slug);
          const isExpanded = expandedSlug === pageDef.slug;
          const Icon = pageDef.icon;
          const imageFields = pageDef.fields.filter(f => f.type === "image").length;

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
                    <span className="text-xs text-muted-foreground block">
                      {pageDef.fields.length} fields{imageFields > 0 && ` · ${imageFields} image${imageFields > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  {exists && <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full hidden sm:block">Configured</span>}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {isExpanded && (
                <div className="p-3 md:p-4 pt-0 border-t border-border space-y-4">
                  {/* Image fields */}
                  {pageDef.fields.filter(f => f.type === "image").length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Image className="w-3 h-3" /> Images
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {pageDef.fields.filter(f => f.type === "image").map((field) => (
                          <div key={field.key}>
                            <Label className="text-xs font-medium mb-1 block">{field.label}</Label>
                            <ImageUpload
                              value={editValues[pageDef.slug]?.[field.key] || ""}
                              onChange={(url) => updateField(pageDef.slug, field.key, url)}
                              folder={pageDef.slug}
                              label={`Upload ${field.label}`}
                              aspectRatio="landscape"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Text fields */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Content</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {pageDef.fields.filter(f => f.type !== "image").map((field) => (
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
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => savePage(pageDef.slug, pageDef.title)}
                      size="sm"
                      disabled={saving === pageDef.slug}
                    >
                      <Save className="w-3 h-3 mr-2" />
                      {saving === pageDef.slug ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={pageDef.previewPath} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" /> Preview on Site
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
