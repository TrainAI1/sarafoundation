import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, PenTool, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: total } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      const { count: pub } = await supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true);
      setBlogCount(total || 0);
      setPublishedCount(pub || 0);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card-modern p-6">
          <div className="flex items-center gap-3 mb-2">
            <PenTool className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Posts</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{blogCount}</p>
        </div>
        <div className="card-modern p-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Published</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{publishedCount}</p>
        </div>
        <div className="card-modern p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Drafts</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{blogCount - publishedCount}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/blog" className="card-modern p-6 hover:border-primary/30 transition-colors group">
          <PenTool className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display font-bold text-foreground mb-1">Manage Blog</h3>
          <p className="text-sm text-muted-foreground">Create, edit, and publish blog articles.</p>
        </Link>
        <Link to="/admin/pages" className="card-modern p-6 hover:border-primary/30 transition-colors group">
          <FileText className="w-8 h-8 text-accent mb-3" />
          <h3 className="font-display font-bold text-foreground mb-1">Edit Pages</h3>
          <p className="text-sm text-muted-foreground">Update content on any page of the website.</p>
        </Link>
      </div>
    </div>
  );
}
