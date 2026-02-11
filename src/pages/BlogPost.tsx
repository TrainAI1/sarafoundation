import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 section-container text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 section-container text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {post.category && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
              {post.category}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author_name}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
          </div>

          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="w-full rounded-2xl mb-8 object-cover max-h-96" />
          )}

          <div className="prose prose-lg max-w-none text-foreground">
            {post.content.split("\n").map((para, i) => (
              <p key={i} className="mb-4 text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
