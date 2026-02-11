import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export function ImageUpload({ value, onChange, folder = "general", label = "Upload Image", className = "", aspectRatio = "landscape" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClass = aspectRatio === "square" ? "aspect-square" : aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-video";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("site-assets").upload(fileName, file);

    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(fileName);
    onChange(urlData.publicUrl);
    toast.success("Image uploaded!");
    setUploading(false);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={className}>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      
      {value ? (
        <div className={`relative rounded-lg overflow-hidden border border-border ${aspectClass}`}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/0 hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()} disabled={uploading}>
                <Upload className="w-3 h-3 mr-1" /> Replace
              </Button>
              <Button size="sm" variant="destructive" onClick={handleRemove}>
                <X className="w-3 h-3 mr-1" /> Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full ${aspectClass} rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-secondary/50 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
