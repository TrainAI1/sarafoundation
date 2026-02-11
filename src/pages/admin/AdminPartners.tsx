import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Trash2, Save, Handshake, GripVertical } from "lucide-react";

interface Partner {
  name: string;
  image: string;
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      const { data } = await supabase.from("pages").select("*").eq("slug", "strategic-partners").single();
      if (data && typeof data.content === "object" && data.content !== null) {
        const content = data.content as { partners?: Partner[] };
        setPartners(content.partners || []);
      }
      setLoading(false);
    };
    fetchPartners();
  }, []);

  const addPartner = () => {
    setPartners([...partners, { name: "", image: "" }]);
  };

  const updatePartner = (index: number, field: keyof Partner, value: string) => {
    setPartners(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const removePartner = (index: number) => {
    if (!confirm("Remove this partner?")) return;
    setPartners(prev => prev.filter((_, i) => i !== index));
  };

  const savePartners = async () => {
    setSaving(true);
    const content = JSON.parse(JSON.stringify({ partners: partners.map(p => ({ name: p.name, image: p.image })) }));
    
    const { data: existing } = await supabase.from("pages").select("id").eq("slug", "strategic-partners").single();
    
    if (existing) {
      const { error } = await supabase.from("pages").update({ content }).eq("slug", "strategic-partners");
      if (error) { toast.error(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("pages").insert([{ slug: "strategic-partners", title: "Strategic Partners", content }]);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }

    toast.success("Partners saved!");
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Strategic Partners</h1>
          <p className="text-sm text-muted-foreground">Manage partner logos shown on the homepage and partners page. Upload logos directly.</p>
        </div>
        <Button size="sm" onClick={addPartner}><Plus className="w-4 h-4 mr-2" /> Add Partner</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner, index) => (
          <div key={index} className="card-modern p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Partner {index + 1}</span>
              </div>
              <Button variant="ghost" size="icon" className="w-7 h-7 hover:text-destructive" onClick={() => removePartner(index)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <ImageUpload
              value={partner.image}
              onChange={(url) => updatePartner(index, "image", url)}
              folder="partners"
              label="Upload Logo"
              aspectRatio="square"
            />

            <div>
              <Label className="text-xs">Partner Name</Label>
              <Input
                value={partner.name}
                onChange={(e) => updatePartner(index, "name", e.target.value)}
                placeholder="Partner name..."
                className="text-sm"
              />
            </div>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 card-modern p-8 text-center">
            <Handshake className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No partners yet. Click "Add Partner" to get started.</p>
          </div>
        )}
      </div>

      {partners.length > 0 && (
        <div className="mt-6">
          <Button onClick={savePartners} disabled={saving}>
            <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Partners"}
          </Button>
        </div>
      )}
    </div>
  );
}
