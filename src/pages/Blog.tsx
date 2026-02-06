import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Calendar, Clock, User, Tag,
  Newspaper, Search, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import communityWorkshop from "@/assets/community-workshop.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import techConferenceSpeaker from "@/assets/tech-conference-speaker.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

const featuredPost = {
  id: 0,
  title: "2024 Year in Review: How We Impacted 500+ African Tech Talents",
  excerpt: "A comprehensive look at our achievements, partnerships, and the inspiring stories of transformation from across the continent this year.",
  image: studentsLabImg,
  author: "Dr. Sarah Okafor",
  date: "Dec 20, 2024",
  readTime: "10 min read",
  category: "Annual Report",
};

const blogPosts = [
  {
    id: 1,
    title: "How CAP is Transforming Tech Education in African Universities",
    excerpt: "Discover how our Career Advancement Program is creating new pathways for students across the continent.",
    image: communityWorkshop,
    author: "Sarah Adekunle",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Programs",
  },
  {
    id: 2,
    title: "Women in Tech: Breaking Barriers in Nigeria's Startup Ecosystem",
    excerpt: "A deep dive into the challenges and triumphs of women entrepreneurs building tech companies in Nigeria.",
    image: womenTechLeaders,
    author: "Fatima Hassan",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    category: "Women in Tech",
  },
  {
    id: 3,
    title: "5 Essential Skills Every Tech Professional Needs in 2025",
    excerpt: "From AI literacy to soft skills, here's what you need to stay competitive in the evolving tech landscape.",
    image: techEntrepreneurs,
    author: "Michael Obi",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    category: "Career",
  },
  {
    id: 4,
    title: "Partnership Spotlight: How Universities are Embracing Tech Innovation",
    excerpt: "Highlighting our partnership with leading African universities to create tech-focused curricula.",
    image: techConferenceSpeaker,
    author: "Sarah Adekunle",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    category: "Partnership",
  },
  {
    id: 5,
    title: "From Student to Founder: Success Stories from Our Alumni",
    excerpt: "Inspiring journeys of CAP graduates who have launched successful tech startups.",
    image: graduatesCelebration,
    author: "Michael Obi",
    date: "Nov 20, 2024",
    readTime: "8 min read",
    category: "Success Stories",
  },
  {
    id: 6,
    title: "The Future of Tech in Africa: Trends to Watch",
    excerpt: "Exploring the technologies and innovations shaping Africa's digital transformation.",
    image: studentsLabImg,
    author: "Fatima Hassan",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    category: "Industry",
  },
];

const categories = ["All", "Programs", "Women in Tech", "Career", "Partnership", "Success Stories", "Industry"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={techConferenceSpeaker} 
            alt="Tech conference"
            className="w-full h-full object-cover opacity-15"
          />
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
              Stay updated with the latest news, success stories, and insights from 
              the African tech ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-10 md:py-16 bg-background">
        <div className="section-container px-4 lg:px-0">
          <div className="card-modern overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-foreground mb-3 md:mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">{featuredPost.excerpt}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs md:text-sm font-bold">
                      {featuredPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium text-foreground">{featuredPost.author}</p>
                      <p className="text-xs text-muted-foreground">{featuredPost.date} · {featuredPost.readTime}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="group w-full sm:w-auto">
                    Read More
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="section-container px-4 lg:px-0">
          {/* Search & Filter */}
          <div className="flex flex-col gap-4 mb-8 md:mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-12 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all ${
                    category === selectedCategory 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "bg-card text-foreground hover:bg-secondary border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="card-modern overflow-hidden group">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <span className="px-2 md:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs md:text-sm text-foreground">{post.author}</span>
                    </div>
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

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-8 md:mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Never Miss an Update
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-xl h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button variant="hero" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
