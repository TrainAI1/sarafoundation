import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Save, GripVertical, ChevronUp, ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminFAQ() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems((data as FAQItem[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = () => {
    const newItem: FAQItem = {
      id: crypto.randomUUID(),
      question: "",
      answer: "",
      sort_order: items.length,
      is_active: true,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof FAQItem, value: string | boolean) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = async (id: string) => {
    await supabase.from("faq_items").delete().eq("id", id);
    setItems(items.filter(item => item.id !== id));
    toast.success("FAQ item removed");
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newItems = [...items];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    newItems.forEach((item, i) => item.sort_order = i);
    setItems(newItems);
  };

  const saveAll = async () => {
    setSaving(true);
    for (const item of items) {
      if (!item.question || !item.answer) continue;
      const { error } = await supabase.from("faq_items").upsert({
        id: item.id,
        question: item.question,
        answer: item.answer,
        sort_order: item.sort_order,
        is_active: item.is_active,
      });
      if (error) { toast.error(error.message); setSaving(false); return; }
    }
    toast.success("FAQ items saved!");
    setSaving(false);
    fetchItems();
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">FAQ Manager</h1>
          <p className="text-muted-foreground text-sm">Add, edit, reorder, and remove FAQ items shown on the homepage.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-1" /> Add Question
          </Button>
          <Button size="sm" onClick={saveAll} disabled={saving}>
            <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <p>No FAQ items yet. Click "Add Question" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="card-modern p-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 pt-1">
                  <button onClick={() => moveItem(index, "up")} disabled={index === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <button onClick={() => moveItem(index, "down")} disabled={index === items.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 space-y-3">
                  <Input
                    value={item.question}
                    onChange={(e) => updateItem(item.id, "question", e.target.value)}
                    placeholder="Question..."
                    className="font-medium"
                  />
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                    placeholder="Answer..."
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
