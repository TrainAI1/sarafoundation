import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Calendar, Clock, User, Tag,
  Newspaper, Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const blogPosts = [
  {
    id: 1,
    title: "How CAP is Transforming Tech Education in African Universities",
    excerpt: "Discover how our Career Advancement Program is creating new pathways for students across the continent.",
    image: null,
    author: "Sarah Adekunle",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Programs",
  },
  {
    id: 2,
    title: "Women in Tech: Breaking Barriers in Nigeria's Startup Ecosystem",
    excerpt: "A deep dive into the challenges and triumphs of women entrepreneurs building tech companies in Nigeria.",
    image: null,
    author: "Fatima Hassan",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    category: "Women in Tech",
  },
  {
    id: 3,
    title: "5 Essential Skills Every Tech Professional Needs in 2025",
    excerpt: "From AI literacy to soft skills, here's what you need to stay competitive in the evolving tech landscape.",
    image: null,
    author: "Michael Obi",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    category: "Career",
  },
  {
    id: 4,
    title: "Partnership Spotlight: How Universities are Embracing Tech Innovation",
    excerpt: "Highlighting our partnership with leading African universities to create tech-focused curricula.",
    image: null,
    author: "Sarah Adekunle",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    category: "Partnership",
  },
  {
    id: 5,
    title: "From Student to Founder: Success Stories from Our Alumni",
    excerpt: "Inspiring journeys of CAP graduates who have launched successful tech startups.",
    image: null,
    author: "Michael Obi",
    date: "Nov 20, 2024",
    readTime: "8 min read",
    category: "Success Stories",
  },
  {
    id: 6,
    title: "The Future of Tech in Africa: Trends to Watch",
    excerpt: "Exploring the technologies and innovations shaping Africa's digital transformation.",
    image: null,
    author: "Fatima Hassan",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    category: "Industry",
  },
];

const categories = ["All", "Programs", "Women in Tech", "Career", "Partnership", "Success Stories", "Industry"];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4 text-accent" />
              Our Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stories, Insights & Updates
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Stay updated with the latest news, success stories, and insights from 
              the African tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24">
        <div className="section-container">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-12 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    category === "All" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card-modern overflow-hidden group">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-primary/30" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-foreground">{post.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
