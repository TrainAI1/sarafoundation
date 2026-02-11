import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Post deleted");
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ 
        published: !post.published, 
        published_at: !post.published ? new Date().toISOString() : null 
      })
      .eq("id", post.id);
    if (error) { toast.error(error.message); return; }
    toast.success(post.published ? "Unpublished" : "Published");
    fetchPosts();
  };

  if (loading) return <div className="animate-pulse text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Blog Posts</h1>
        <Link to="/admin/blog/new">
          <Button><Plus className="w-4 h-4 mr-2" /> New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <p className="text-muted-foreground mb-4">No blog posts yet.</p>
          <Link to="/admin/blog/new"><Button>Create Your First Post</Button></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="card-modern p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${post.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{post.category || "Uncategorized"} · {new Date(post.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(post)} title={post.published ? "Unpublish" : "Publish"}>
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Link to={`/admin/blog/${post.id}`}>
                  <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="hover:text-destructive">
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
