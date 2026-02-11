import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash2, Search, Image, Copy, ExternalLink } from "lucide-react";

interface FileItem {
  name: string;
  id: string;
  created_at: string;
  metadata: { size?: number; mimetype?: string } | null;
}

export default function AdminMedia() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("site-assets").list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) { toast.error(error.message); return; }
    
    // Also list nested folders
    const allFiles: FileItem[] = [];
    if (data) {
      for (const item of data) {
        if (!item.id) {
          // It's a folder — list contents
          const { data: folderData } = await supabase.storage.from("site-assets").list(item.name, { limit: 100 });
          if (folderData) {
            folderData.forEach(f => {
              if (f.id) allFiles.push({ ...f, name: `${item.name}/${f.name}` } as FileItem);
            });
          }
        } else {
          allFiles.push(item as FileItem);
        }
      }
    }
    setFiles(allFiles);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const getPublicUrl = (name: string) => {
    return supabase.storage.from("site-assets").getPublicUrl(name).data.publicUrl;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `uploads/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file);
    if (error) { toast.error(error.message); } else { toast.success("File uploaded!"); }
    setUploading(false);
    fetchFiles();
    e.target.value = "";
  };

  const deleteFile = async (name: string) => {
    const { error } = await supabase.storage.from("site-assets").remove([name]);
    if (error) { toast.error(error.message); } else { toast.success("File deleted"); }
    fetchFiles();
  };

  const copyUrl = (name: string) => {
    navigator.clipboard.writeText(getPublicUrl(name));
    toast.success("URL copied!");
  };

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name);

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground text-sm">{files.length} file{files.length !== 1 ? 's' : ''} in storage</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="pl-8 w-48 text-sm" />
          </div>
          <label>
            <Button variant="outline" size="sm" asChild disabled={uploading}>
              <span className="cursor-pointer">{uploading ? "Uploading..." : "Upload File"}</span>
            </Button>
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*,application/pdf" />
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card-modern p-8 text-center text-muted-foreground">
          <Image className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>{search ? "No files match your search." : "No files uploaded yet."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(file => (
            <div key={file.name} className="card-modern overflow-hidden group">
              <div className="aspect-square bg-secondary/50 flex items-center justify-center overflow-hidden">
                {isImage(file.name) ? (
                  <img src={getPublicUrl(file.name)} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <Image className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-foreground truncate" title={file.name}>{file.name.split("/").pop()}</p>
                <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyUrl(file.name)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                    <a href={getPublicUrl(file.name)} target="_blank" rel="noopener"><ExternalLink className="w-3 h-3" /></a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => deleteFile(file.name)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
