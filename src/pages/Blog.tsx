import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, Calendar, Clock, User, Tag,
  Newspaper, Search, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import communityWorkshop from "@/assets/community-workshop.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import techConferenceSpeaker from "@/assets/tech-conference-speaker.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

// Fallback hardcoded posts
const fallbackPosts = [
  { id: "1", title: "How CAP is Transforming Tech Education in African Universities", excerpt: "Discover how our Career Advancement Program is creating new pathways for students across the continent.", image: communityWorkshop, author_name: "Sarah Adekunle", date: "Dec 15, 2024", category: "Programs", slug: "", isDb: false },
  { id: "2", title: "Women in Tech: Breaking Barriers in Nigeria's Startup Ecosystem", excerpt: "A deep dive into the challenges and triumphs of women entrepreneurs building tech companies in Nigeria.", image: womenTechLeaders, author_name: "Fatima Hassan", date: "Dec 10, 2024", category: "Women in Tech", slug: "", isDb: false },
  { id: "3", title: "5 Essential Skills Every Tech Professional Needs in 2025", excerpt: "From AI literacy to soft skills, here's what you need to stay competitive in the evolving tech landscape.", image: techEntrepreneurs, author_name: "Michael Obi", date: "Dec 5, 2024", category: "Career", slug: "", isDb: false },
  { id: "4", title: "Partnership Spotlight: How Universities are Embracing Tech Innovation", excerpt: "Highlighting our partnership with leading African universities to create tech-focused curricula.", image: techConferenceSpeaker, author_name: "Sarah Adekunle", date: "Nov 28, 2024", category: "Partnership", slug: "", isDb: false },
  { id: "5", title: "From Student to Founder: Success Stories from Our Alumni", excerpt: "Inspiring journeys of CAP graduates who have launched successful tech startups.", image: graduatesCelebration, author_name: "Michael Obi", date: "Nov 20, 2024", category: "Success Stories", slug: "", isDb: false },
];

const categories = ["All", "Programs", "Women in Tech", "Career", "Partnership", "Success Stories", "Industry"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbPosts, setDbPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false }).then(({ data }) => {
      if (data) setDbPosts(data);
    });
  }, []);

  // Merge DB posts with fallback
  const allPosts = [
    ...dbPosts.map((p) => ({
      id: p.id, title: p.title, excerpt: p.excerpt || "", image: p.cover_image || studentsLabImg,
      author_name: p.author_name, date: new Date(p.published_at || p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: p.category || "General", slug: p.slug, isDb: true,
    })),
    ...(dbPosts.length === 0 ? fallbackPosts : []),
  ];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog – Sara Foundation Africa</title>
        <meta name="description" content="Stories, insights and updates from Sara Foundation's work empowering African tech talent." />
      </Helmet>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={techConferenceSpeaker} alt="Tech conference" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Newspaper className="w-3 h-3 md:w-4 md:h-4 text-accent" />
              Our Blog
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Stories, Insights & Updates
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              Stay updated with the latest news, success stories, and insights from the African tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="section-container px-4 lg:px-0">
          <div className="flex flex-col gap-4 mb-8 md:mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-12 rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all ${
                    category === selectedCategory ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-card text-foreground hover:bg-secondary border border-border"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="card-modern overflow-hidden group">
                {post.isDb ? (
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden relative">
                      {post.image && typeof post.image === 'string' && post.image.startsWith('http') ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-primary/30" />
                        </div>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="aspect-video overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-4 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <span className="px-2 md:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{post.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.isDb ? <Link to={`/blog/${post.slug}`}>{post.title}</Link> : post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
                    <span className="text-xs md:text-sm text-foreground">{post.author_name}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Never Miss an Update</h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">Subscribe to our newsletter and get the latest articles delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="rounded-xl h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            <Button variant="hero" size="lg">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
