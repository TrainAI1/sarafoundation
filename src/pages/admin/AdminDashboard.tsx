import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, PenTool, Eye, MessageSquare, Users, TrendingUp, ChevronRight, Handshake, Settings, Image } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;
type Page = Tables<"pages">;

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [configuredPages, setConfiguredPages] = useState<string[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: total },
        { count: pub },
        { data: recent },
        { data: pages },
      ] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
        supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("pages").select("slug"),
      ]);
      setBlogCount(total || 0);
      setPublishedCount(pub || 0);
      setRecentPosts(recent || []);
      setPagesCount((pages || []).length);
      setConfiguredPages((pages || []).map(p => p.slug));
    };
    fetchStats();
  }, []);

  const hasPartners = configuredPages.includes("strategic-partners");
  const hasTestimonials = configuredPages.includes("testimonials");
  const hasTeam = configuredPages.includes("team-members");
  const hasSettings = configuredPages.includes("site-settings");

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's an overview of your site content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="card-modern p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PenTool className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{blogCount}</p>
          <p className="text-xs text-muted-foreground">Total Posts</p>
        </div>
        <div className="card-modern p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-success" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{publishedCount}</p>
          <p className="text-xs text-muted-foreground">Published</p>
        </div>
        <div className="card-modern p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-accent" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{pagesCount}</p>
          <p className="text-xs text-muted-foreground">Pages Configured</p>
        </div>
        <div className="card-modern p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground">{blogCount - publishedCount}</p>
          <p className="text-xs text-muted-foreground">Drafts</p>
        </div>
      </div>

      {/* Configuration Status */}
      <div className="card-modern p-4 md:p-5 mb-6 md:mb-8">
        <h3 className="font-display font-bold text-foreground text-sm mb-4">Content Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Partners", configured: hasPartners, link: "/admin/partners", icon: Handshake },
            { label: "Testimonials", configured: hasTestimonials, link: "/admin/testimonials", icon: MessageSquare },
            { label: "Team", configured: hasTeam, link: "/admin/team", icon: Users },
            { label: "Settings", configured: hasSettings, link: "/admin/settings", icon: Settings },
          ].map((item) => (
            <Link key={item.label} to={item.link} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <item.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{item.label}</span>
              <span className={`ml-auto w-2 h-2 rounded-full ${item.configured ? "bg-success" : "bg-muted-foreground/30"}`} />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
        <Link to="/admin/blog/new" className="card-modern p-4 hover:border-primary/30 transition-colors text-center group">
          <PenTool className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-foreground">New Post</p>
        </Link>
        <Link to="/admin/pages" className="card-modern p-4 hover:border-primary/30 transition-colors text-center group">
          <FileText className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-foreground">Edit Pages</p>
        </Link>
        <Link to="/admin/partners" className="card-modern p-4 hover:border-primary/30 transition-colors text-center group">
          <Handshake className="w-6 h-6 text-success mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-foreground">Partners</p>
        </Link>
        <Link to="/admin/testimonials" className="card-modern p-4 hover:border-primary/30 transition-colors text-center group">
          <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-foreground">Testimonials</p>
        </Link>
        <Link to="/admin/team" className="card-modern p-4 hover:border-primary/30 transition-colors text-center group">
          <Users className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-foreground">Team</p>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="card-modern overflow-hidden">
        <div className="p-4 md:p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground">Recent Posts</h3>
          <Link to="/admin/blog" className="text-xs text-primary hover:underline">View All</Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No posts yet. Create your first post!</div>
        ) : (
          <div className="divide-y divide-border">
            {recentPosts.map((post) => (
              <Link key={post.id} to={`/admin/blog/${post.id}`} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${post.published ? "bg-success" : "bg-muted-foreground"}`} />
                    <span className="text-xs text-muted-foreground">{post.published ? "Published" : "Draft"}</span>
                    <span className="text-xs text-muted-foreground">· {new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
