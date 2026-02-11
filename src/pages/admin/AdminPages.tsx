import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Plus, FileText, ChevronDown, ChevronUp } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Page = Tables<"pages">;

const defaultPages = [
  { slug: "home-hero", title: "Home - Hero Section", fields: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "subheadline", label: "Subheadline", type: "textarea" },
    { key: "stat1_value", label: "Stat 1 Value", type: "text" },
    { key: "stat1_label", label: "Stat 1 Label", type: "text" },
    { key: "stat2_value", label: "Stat 2 Value", type: "text" },
    { key: "stat2_label", label: "Stat 2 Label", type: "text" },
    { key: "stat3_value", label: "Stat 3 Value", type: "text" },
    { key: "stat3_label", label: "Stat 3 Label", type: "text" },
  ]},
  { slug: "home-impact", title: "Home - Impact Stats", fields: [
    { key: "students", label: "Students Trained", type: "text" },
    { key: "universities", label: "Universities", type: "text" },
    { key: "countries", label: "Countries", type: "text" },
    { key: "community", label: "Community Reach", type: "text" },
  ]},
  { slug: "about-hero", title: "About - Hero Section", fields: [
    { key: "headline", label: "Headline", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ]},
];

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    const { data } = await supabase.from("pages").select("*");
    setPages(data || []);
    
    // Build edit values from existing data
    const vals: Record<string, Record<string, string>> = {};
    (data || []).forEach((p) => {
      vals[p.slug] = typeof p.content === 'object' && p.content !== null ? p.content as Record<string, string> : {};
    });
    setEditValues(vals);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const initPage = async (slug: string, title: string) => {
    const { error } = await supabase.from("pages").insert({ slug, title, content: {} });
    if (error && error.code !== "23505") { toast.error(error.message); return; }
    fetchPages();
    setExpandedSlug(slug);
  };

  const savePage = async (slug: string, title: string) => {
    const content = editValues[slug] || {};
    const existing = pages.find((p) => p.slug === slug);
    
    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", slug);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("pages").insert({ slug, title, content });
      if (error) { toast.error(error.message); return; }
    }
    
    toast.success("Saved!");
    fetchPages();
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
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Edit Pages</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Edit content for different sections of the website. Changes are saved to the database and can be loaded dynamically.
      </p>

      <div className="space-y-3">
        {defaultPages.map((pageDef) => {
          const exists = pages.find((p) => p.slug === pageDef.slug);
          const isExpanded = expandedSlug === pageDef.slug;

          return (
            <div key={pageDef.slug} className="card-modern overflow-hidden">
              <button
                onClick={() => {
                  if (!exists) initPage(pageDef.slug, pageDef.title);
                  else setExpandedSlug(isExpanded ? null : pageDef.slug);
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{pageDef.title}</span>
                  {!exists && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Not configured</span>}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 border-t border-border space-y-3">
                  {pageDef.fields.map((field) => (
                    <div key={field.key}>
                      <Label className="text-xs">{field.label}</Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          value={editValues[pageDef.slug]?.[field.key] || ""}
                          onChange={(e) => updateField(pageDef.slug, field.key, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          value={editValues[pageDef.slug]?.[field.key] || ""}
                          onChange={(e) => updateField(pageDef.slug, field.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  <Button onClick={() => savePage(pageDef.slug, pageDef.title)} size="sm">
                    <Save className="w-3 h-3 mr-2" /> Save Changes
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
