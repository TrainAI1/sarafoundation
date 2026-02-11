import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Globe, Mail, Phone, MapPin, Palette, Image } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Sara Foundation Africa",
    siteDescription: "Empowering African youth and women with tech skills, mentorship, and career development.",
    contactEmail: "hello@sarafoundation.org",
    contactPhone: "+234 xxx xxx xxxx",
    address: "London, UK",
    socialLinkedin: "https://linkedin.com/company/sara-foundation-africa",
    socialTwitter: "https://twitter.com/sarafoundation",
    socialInstagram: "https://instagram.com/sarafoundation",
    socialFacebook: "https://facebook.com/sarafoundation",
    primaryColor: "#6366f1",
    newsletterTitle: "Subscribe to Our Newsletter",
    newsletterDescription: "Get the latest news, success stories, and opportunities delivered to your inbox.",
    footerText: "Empowering the next generation of African tech leaders.",
  });

  const updateField = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const save = () => {
    toast.success("Site settings saved! (Note: Currently stored locally. Database integration coming soon.)");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-sm text-muted-foreground">Configure global settings for your website.</p>
      </div>

      <div className="space-y-4">
        {/* General */}
        <div className="card-modern p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">General</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs">Site Name</Label>
              <Input value={settings.siteName} onChange={(e) => updateField("siteName", e.target.value)} className="text-sm" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Site Description (SEO)</Label>
              <Textarea value={settings.siteDescription} onChange={(e) => updateField("siteDescription", e.target.value)} rows={2} className="text-sm" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Footer Text</Label>
              <Input value={settings.footerText} onChange={(e) => updateField("footerText", e.target.value)} className="text-sm" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card-modern p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Contact Information</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Email</Label>
              <Input value={settings.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Phone</Label>
              <Input value={settings.contactPhone} onChange={(e) => updateField("contactPhone", e.target.value)} className="text-sm" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Address</Label>
              <Input value={settings.address} onChange={(e) => updateField("address", e.target.value)} className="text-sm" />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="card-modern p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Social Media</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">LinkedIn</Label>
              <Input value={settings.socialLinkedin} onChange={(e) => updateField("socialLinkedin", e.target.value)} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Twitter</Label>
              <Input value={settings.socialTwitter} onChange={(e) => updateField("socialTwitter", e.target.value)} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Instagram</Label>
              <Input value={settings.socialInstagram} onChange={(e) => updateField("socialInstagram", e.target.value)} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Facebook</Label>
              <Input value={settings.socialFacebook} onChange={(e) => updateField("socialFacebook", e.target.value)} className="text-sm" />
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="card-modern p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Newsletter Settings</h3>
          </div>
          <div className="grid gap-3">
            <div>
              <Label className="text-xs">Newsletter Title</Label>
              <Input value={settings.newsletterTitle} onChange={(e) => updateField("newsletterTitle", e.target.value)} className="text-sm" />
            </div>
            <div>
              <Label className="text-xs">Newsletter Description</Label>
              <Textarea value={settings.newsletterDescription} onChange={(e) => updateField("newsletterDescription", e.target.value)} rows={2} className="text-sm" />
            </div>
          </div>
        </div>

        <Button onClick={save}><Save className="w-4 h-4 mr-2" /> Save Settings</Button>
      </div>
    </div>
  );
}
