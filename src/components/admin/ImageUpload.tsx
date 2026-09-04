import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon, Loader2, Link2, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { assetUrl } from "@/lib/assetUrl";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  folder?: string;
  label?: string;
  helperText?: string;
  className?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export function ImageUpload({
  value,
  onChange,
  placeholder = "",
  folder = "general",
  label = "Upload Image",
  helperText,
  className = "",
  aspectRatio = "landscape",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : "aspect-video";

  // Effective display image: either custom uploaded/typed value, or site default placeholder
  const hasCustomValue = Boolean(value && value.trim() !== "");
  const hasPlaceholder = Boolean(placeholder && placeholder.trim() !== "");
  const displayImage = hasCustomValue
    ? assetUrl(value)
    : hasPlaceholder
    ? assetUrl(placeholder)
    : "";

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

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
      toast.success("Image URL applied!");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {displayImage ? (
        <div className={`group relative rounded-lg overflow-hidden border border-border bg-muted/30 ${aspectClass}`}>
          {uploading && (
            <div className="absolute inset-0 bg-foreground/50 flex flex-col items-center justify-center gap-2 z-20">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <span className="text-xs text-white font-medium">Uploading image...</span>
            </div>
          )}

          <img
            src={displayImage}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/hero-students.jpg";
            }}
          />

          {/* Badge indicating default vs custom */}
          <div className="absolute top-2 left-2 z-10">
            {hasCustomValue ? (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                <Check className="w-2.5 h-2.5" /> Custom Image
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/90 text-white shadow-sm backdrop-blur-sm">
                Default Site Photo
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 z-10">
            <p className="text-xs text-white/90 font-medium line-clamp-1 mb-2">
              {hasCustomValue ? "Custom image active" : "Using current site default photo"}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="h-7 text-xs bg-white text-black hover:bg-white/90 shadow-sm"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="w-3 h-3 mr-1" /> Replace Photo
              </Button>

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 text-xs bg-black/40 text-white border-white/20 hover:bg-black/60"
                onClick={() => setShowUrlInput(!showUrlInput)}
                disabled={uploading}
              >
                <Link2 className="w-3 h-3 mr-1" /> Paste URL
              </Button>

              {hasCustomValue && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="h-7 text-xs"
                  onClick={handleRemove}
                  disabled={uploading}
                  title="Revert to site default"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Revert
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty / Truly optional image (no default exists e.g. blue brand background) */
        <div
          className={`w-full ${aspectClass} rounded-lg border-2 border-dashed border-border hover:border-primary/60 bg-secondary/30 hover:bg-secondary/50 flex flex-col items-center justify-center p-4 text-center transition-colors relative group`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {helperText || "No image is currently active (uses default brand solid style)."}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload className="w-3 h-3 mr-1" /> Upload Image
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-muted-foreground"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                >
                  <Link2 className="w-3 h-3 mr-1" /> Paste URL
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Direct URL input accordion */}
      {showUrlInput && (
        <div className="flex items-center gap-2 p-2 bg-secondary/60 rounded-lg border border-border animate-in fade-in-50 duration-150">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image link (e.g. https://... or /image.jpg)"
            className="h-7 text-xs bg-background"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyUrl();
              }
            }}
          />
          <Button
            type="button"
            size="sm"
            className="h-7 text-xs px-2.5 flex-shrink-0"
            onClick={handleApplyUrl}
          >
            Apply
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-7 w-7 flex-shrink-0 text-muted-foreground"
            onClick={() => setShowUrlInput(false)}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {helperText && displayImage && (
        <p className="text-[11px] text-muted-foreground italic px-1">{helperText}</p>
      )}
    </div>
  );
}
