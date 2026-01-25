import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, Heart, Lightbulb, Globe, Users, Award, 
  CheckCircle2, ArrowRight, Sparkles 
} from "lucide-react";

const milestones = [
  { year: "2020", title: "Foundation Established", description: "Sara Foundation Africa was founded with a vision to transform tech in Africa" },
  { year: "2021", title: "First CAP Cohort", description: "Launched our Career Advancement Program in 5 Nigerian universities" },
  { year: "2022", title: "FLIP Launch", description: "Introduced the Female Leadership Initiative Program" },
  { year: "2023", title: "Pan-African Expansion", description: "Expanded to 10+ African countries with 50+ partner institutions" },
  { year: "2024", title: "500+ Alumni", description: "Celebrated our growing community of tech professionals and founders" },
];

const values = [
  { icon: Lightbulb, title: "Innovation First", description: "We believe in the power of technology to transform lives and communities across Africa." },
  { icon: Users, title: "Community Driven", description: "Our strength lies in the vibrant communities we build and nurture together." },
  { icon: Heart, title: "Inclusive by Design", description: "We ensure that everyone, regardless of background, has access to opportunities in tech." },
  { icon: Globe, title: "Pan-African Vision", description: "We're building bridges across the continent to create a unified tech ecosystem." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transforming Africa's Tech Landscape
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Sara Foundation Africa is dedicated to empowering the next generation of 
              African tech leaders through education, mentorship, and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-badge mb-6">Our Story</span>
              <h2 className="section-title text-foreground mb-6">
                Building Bridges to{" "}
                <span className="gradient-text">Tech Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Sara Foundation Africa was born from a simple yet powerful vision: to ensure that 
                  every young African with a passion for technology has the opportunity to turn their 
                  dreams into reality.
                </p>
                <p>
                  We recognized that while Africa has an abundance of talent and creativity, there 
                  was a gap in access to quality tech education, mentorship, and professional networks. 
                  We set out to bridge that gap.
                </p>
                <p>
                  Today, we operate across 10+ African countries, partnering with universities, 
                  organizations, and industry leaders to create pathways for young Africans to 
                  thrive in the global tech ecosystem.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">Our Vision</h3>
                  <p className="text-muted-foreground">
                    An Africa where every young person has equal access to thrive in the global tech economy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">Our Values</span>
            <h2 className="section-title text-foreground mb-6">
              What Drives Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-modern p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 shadow-lg">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <Award className="w-4 h-4" />
              Our Journey
            </span>
            <h2 className="section-title text-foreground mb-6">
              Milestones Along the Way
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="card-modern p-6 flex-1">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Be part of the movement transforming Africa's tech ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/programs/cap">
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
