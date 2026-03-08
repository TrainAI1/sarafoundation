import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, Save, Handshake, GripVertical, ExternalLink, Eye, EyeOff } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  category: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast.error(error.message);
    } else {
      setPartners(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPartners(); }, []);

  const addPartner = async () => {
    const nextOrder = partners.length > 0 ? Math.max(...partners.map(p => p.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from("partners")
      .insert({ name: "New Partner", sort_order: nextOrder, category: "strategic" })
      .select()
      .single();
    if (error) { toast.error(error.message); return; }
    if (data) setPartners(prev => [...prev, data as Partner]);
  };

  const updatePartner = async (id: string, field: string, value: string | boolean | number) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const savePartner = async (partner: Partner) => {
    setSaving(true);
    const { error } = await supabase
      .from("partners")
      .update({
        name: partner.name,
        logo_url: partner.logo_url,
        website_url: partner.website_url,
        category: partner.category,
        sort_order: partner.sort_order,
        is_active: partner.is_active,
      })
      .eq("id", partner.id);
    if (error) toast.error(error.message);
    else toast.success(`${partner.name} saved!`);
    setSaving(false);
  };

  const removePartner = async (id: string) => {
    if (!confirm("Delete this partner permanently?")) return;
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setPartners(prev => prev.filter(p => p.id !== id));
    toast.success("Partner deleted");
  };

  const saveAll = async () => {
    setSaving(true);
    for (const partner of partners) {
      const { error } = await supabase
        .from("partners")
        .update({
          name: partner.name,
          logo_url: partner.logo_url,
          website_url: partner.website_url,
          category: partner.category,
          sort_order: partner.sort_order,
          is_active: partner.is_active,
        })
        .eq("id", partner.id);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }
    toast.success("All partners saved!");
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Strategic Partners</h1>
          <p className="text-sm text-muted-foreground">Manage partner logos shown on the homepage. Upload logos and set visibility.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={saveAll} disabled={saving}>
            <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save All"}
          </Button>
          <Button size="sm" onClick={addPartner}><Plus className="w-4 h-4 mr-2" /> Add Partner</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <div key={partner.id} className="card-modern p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">#{partner.sort_order}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7"
                  onClick={() => { updatePartner(partner.id, "is_active", !partner.is_active); }}
                  title={partner.is_active ? "Visible" : "Hidden"}
                >
                  {partner.is_active ? <Eye className="w-3.5 h-3.5 text-primary" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7 hover:text-destructive" onClick={() => removePartner(partner.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <ImageUpload
              value={partner.logo_url || ""}
              onChange={(url) => updatePartner(partner.id, "logo_url", url)}
              folder="partners"
              label="Upload Logo"
              aspectRatio="square"
            />

            <div>
              <Label className="text-xs">Partner Name</Label>
              <Input
                value={partner.name}
                onChange={(e) => updatePartner(partner.id, "name", e.target.value)}
                placeholder="Partner name..."
                className="text-sm"
              />
            </div>

            <div>
              <Label className="text-xs">Website URL</Label>
              <Input
                value={partner.website_url || ""}
                onChange={(e) => updatePartner(partner.id, "website_url", e.target.value)}
                placeholder="https://..."
                className="text-sm"
              />
            </div>

            <div>
              <Label className="text-xs">Sort Order</Label>
              <Input
                type="number"
                value={partner.sort_order}
                onChange={(e) => updatePartner(partner.id, "sort_order", parseInt(e.target.value) || 0)}
                className="text-sm w-20"
              />
            </div>

            <Button size="sm" variant="outline" className="w-full" onClick={() => savePartner(partner)} disabled={saving}>
              <Save className="w-3 h-3 mr-1" /> Save
            </Button>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 card-modern p-8 text-center">
            <Handshake className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No partners yet. Click "Add Partner" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
