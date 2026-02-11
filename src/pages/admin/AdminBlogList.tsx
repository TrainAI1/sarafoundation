import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Post deleted");
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase.from("blog_posts").update({
      published: !post.published,
      published_at: !post.published ? new Date().toISOString() : null,
    }).eq("id", post.id);
    if (error) { toast.error(error.message); return; }
    toast.success(post.published ? "Unpublished" : "Published");
    fetchPosts();
  };

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || (filterStatus === "published" ? p.published : !p.published);
    return matchSearch && matchStatus;
  });

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">{posts.length} posts total</p>
        </div>
        <Link to="/admin/blog/new">
          <Button size="sm"><Plus className="w-4 h-4 mr-2" /> New Post</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="pl-9 text-sm" />
        </div>
        <div className="flex gap-1">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterStatus === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <p className="text-muted-foreground mb-4">{posts.length === 0 ? "No blog posts yet." : "No matching posts."}</p>
          {posts.length === 0 && <Link to="/admin/blog/new"><Button size="sm">Create Your First Post</Button></Link>}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((post) => (
            <div key={post.id} className="card-modern p-3 md:p-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <Link to={`/admin/blog/${post.id}`} className="font-medium text-foreground text-sm hover:text-primary truncate">{post.title}</Link>
                  <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${post.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {post.category || "Uncategorized"} · {post.author_name} · {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => togglePublish(post)} title={post.published ? "Unpublish" : "Publish"}>
                  {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </Button>
                <Link to={`/admin/blog/${post.id}`}>
                  <Button variant="ghost" size="icon" className="w-8 h-8"><Edit className="w-3.5 h-3.5" /></Button>
                </Link>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-destructive" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
