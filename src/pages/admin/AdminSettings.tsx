import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Save, Globe, Mail, Phone, Loader2 } from "lucide-react";

const defaultSettings: Record<string, string> = {
  siteName: "Sara Foundation Africa",
  siteDescription: "Empowering African youth and women with tech skills, mentorship, and career development.",
  contactEmail: "info@sarafoundationafrica.com",
  contactPhoneUK: "+44 7435 126104",
  contactPhoneNG: "+234 9076 664049",
  addressUK: "E14 8AT, London, United Kingdom",
  addressNG: "Bafaj Crescent, Awoyaya-Eputu, Ibeju Lekki, Lagos, Nigeria",
  socialLinkedin: "",
  socialTwitter: "",
  socialInstagram: "",
  socialFacebook: "",
  socialYoutube: "",
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Get the latest news, success stories, and opportunities delivered to your inbox.",
  footerText: "Empowering the next generation of African tech leaders.",
  logoLight: "",
  logoDark: "",
  favicon: "",
};

const settingsSections = [
  {
    title: "General",
    icon: Globe,
    fields: [
      { key: "siteName", label: "Site Name", type: "text" },
      { key: "siteDescription", label: "Site Description (SEO)", type: "textarea" },
      { key: "footerText", label: "Footer Text", type: "text" },
    ],
  },
  {
    title: "Branding",
    icon: Globe,
    fields: [
      { key: "logoLight", label: "Logo (Light Mode)", type: "image" },
      { key: "logoDark", label: "Logo (Dark Mode)", type: "image" },
      { key: "favicon", label: "Favicon", type: "image" },
    ],
  },
  {
    title: "Contact Information",
    icon: Phone,
    fields: [
      { key: "contactEmail", label: "Email", type: "text" },
      { key: "contactPhoneUK", label: "Phone (UK)", type: "text" },
      { key: "contactPhoneNG", label: "Phone (NG)", type: "text" },
      { key: "addressUK", label: "UK Address", type: "text" },
      { key: "addressNG", label: "Nigeria Address", type: "text" },
    ],
  },
  {
    title: "Social Media",
    icon: Mail,
    fields: [
      { key: "socialLinkedin", label: "LinkedIn URL", type: "text" },
      { key: "socialTwitter", label: "Twitter/X URL", type: "text" },
      { key: "socialInstagram", label: "Instagram URL", type: "text" },
      { key: "socialFacebook", label: "Facebook URL", type: "text" },
      { key: "socialYoutube", label: "YouTube URL", type: "text" },
    ],
  },
  {
    title: "Newsletter",
    icon: Mail,
    fields: [
      { key: "newsletterTitle", label: "Newsletter Title", type: "text" },
      { key: "newsletterDescription", label: "Newsletter Description", type: "textarea" },
    ],
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("pages").select("*").eq("slug", "site-settings").single();
      if (data && typeof data.content === "object" && data.content !== null) {
        setSettings({ ...defaultSettings, ...(data.content as Record<string, string>) });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const updateField = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    const content = JSON.parse(JSON.stringify(settings));
    const { data: existing } = await supabase.from("pages").select("id").eq("slug", "site-settings").single();

    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", "site-settings");
      if (error) { toast.error(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("pages").insert([{ slug: "site-settings", title: "Site Settings", content }]);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }

    toast.success("Site settings saved!");
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-sm text-muted-foreground">Configure global settings for your website. All changes persist to the database.</p>
      </div>

      <div className="space-y-4">
        {settingsSections.map((section) => (
          <div key={section.title} className="card-modern p-4 md:p-5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <section.icon className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">{section.title}</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : field.type === "image" ? "" : ""}>
                  <Label className="text-xs">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea value={settings[field.key] || ""} onChange={(e) => updateField(field.key, e.target.value)} rows={2} className="text-sm" />
                  ) : field.type === "image" ? (
                    <ImageUpload
                      value={settings[field.key] || ""}
                      onChange={(url) => updateField(field.key, url)}
                      folder="branding"
                      label={`Upload ${field.label}`}
                      aspectRatio="square"
                    />
                  ) : (
                    <Input value={settings[field.key] || ""} onChange={(e) => updateField(field.key, e.target.value)} className="text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
