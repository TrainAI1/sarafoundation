import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { markdownToHtml } from "@/lib/markdown";
import { BlogShareButtons } from "@/components/BlogShareButtons";
import { assetUrl } from "@/lib/assetUrl";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts">;

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);

      if (data) {
        const { data: others } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .neq("slug", data.slug)
          .order("published_at", { ascending: false })
          .limit(12);
        const list = others ?? [];
        const sameCategory = list.filter((p) => data.category && p.category === data.category);
        const rest = list.filter((p) => !sameCategory.includes(p));
        setRelated([...sameCategory, ...rest].slice(0, 3));
      } else {
        setRelated([]);
      }
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
      <Helmet>
        <title>{post.title} – Sara Foundation Africa</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://sarafoundationafrica.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sarafoundationafrica.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.cover_image || "https://sarafoundationafrica.com/hero-students.jpg"} />
        <meta property="og:site_name" content="Sara Foundation Africa" />
        <meta property="article:published_time" content={post.published_at || post.created_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        {post.category && <meta property="article:section" content={post.category} />}
        <meta property="article:author" content={post.author_name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={post.cover_image || "https://sarafoundationafrica.com/hero-students.jpg"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt || post.title,
          "image": post.cover_image || "https://sarafoundationafrica.com/hero-students.jpg",
          "author": { "@type": "Person", "name": post.author_name },
          "publisher": { "@type": "Organization", "name": "Sara Foundation Africa", "logo": { "@type": "ImageObject", "url": "https://sarafoundationafrica.com/favicon.png" } },
          "datePublished": post.published_at || post.created_at,
          "dateModified": post.updated_at,
          "inLanguage": "en",
          "articleSection": post.category || "News",
          "wordCount": post.content ? post.content.trim().split(/\s+/).length : undefined,
          "isPartOf": { "@type": "Blog", "name": "Sara Foundation Africa Blog", "@id": "https://sarafoundationafrica.com/blog" },
          "mainEntityOfPage": { "@type": "WebPage", "@id": `https://sarafoundationafrica.com/blog/${post.slug}` }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sarafoundationafrica.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://sarafoundationafrica.com/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://sarafoundationafrica.com/blog/${post.slug}` },
          ]
        })}</script>
      </Helmet>
      <Navbar />
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {post.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
              {post.category}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author_name}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
          </div>

          {post.cover_image && (
            <img
              src={assetUrl(post.cover_image)}
              alt={post.title}
              decoding="async"
              className="w-full rounded-2xl mb-8 object-cover max-h-96"
              onError={(e) => {
                e.currentTarget.src = studentsLabImg;
              }}
            />
          )}

          <div
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2 [&_strong]:font-bold [&_strong]:text-foreground [&_em]:italic [&_a]:text-primary [&_a]:underline [&_code]:bg-secondary [&_code]:px-1 [&_code]:rounded [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_li]:ml-4 [&_hr]:my-4 [&_hr]:border-border [&_img]:rounded-lg [&_img]:max-w-full"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />

          <div className="mt-10 pt-6 border-t border-border">
            <BlogShareButtons
              title={post.title}
              url={`https://sarafoundationafrica.com/blog/${post.slug}`}
            />
          </div>

          {related.length > 0 && (
            <section className="mt-14 pt-10 border-t border-border">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground">Read next</h2>
                <Link to="/blog" className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
                  All posts →
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.slug}`}
                    className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-shadow flex flex-col"
                  >
                    <img
                      src={r.cover_image ? assetUrl(r.cover_image) : studentsLabImg}
                      alt={r.title}
                      loading="lazy"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = studentsLabImg; }}
                    />
                    <div className="p-4 flex flex-col flex-1">
                      {r.category && (
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                          {r.category}
                        </span>
                      )}
                      <h3 className="font-display font-bold text-sm text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                      {r.excerpt && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{r.excerpt}</p>
                      )}
                      <span className="mt-3 text-xs font-medium text-muted-foreground">
                        {new Date(r.published_at || r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}
