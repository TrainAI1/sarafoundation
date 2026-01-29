import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, Heart, Lightbulb, Globe, Users, Award, 
  ArrowRight, Sparkles, Eye, Quote
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

const leadership = [
  { name: "Dr. Sarah Okafor", role: "Executive Director", bio: "Former tech executive with 15+ years of experience in African tech ecosystems." },
  { name: "Michael Adeyemi", role: "Director of Programs", bio: "Expert in tech education and youth development across Sub-Saharan Africa." },
  { name: "Fatima Hassan", role: "Director of Partnerships", bio: "Specializes in building strategic partnerships with universities and corporations." },
  { name: "James Mwangi", role: "Director of Operations", bio: "Operational excellence leader with experience scaling nonprofits across Africa." },
];

const advisors = [
  { name: "Prof. Ngozi Okonjo-Iweala", affiliation: "WTO", expertise: "Global Economics" },
  { name: "Iyinoluwa Aboyeji", affiliation: "Andela Co-founder", expertise: "Tech Entrepreneurship" },
  { name: "Dr. Rebecca Enonchong", affiliation: "AppsTech CEO", expertise: "Women in Tech" },
  { name: "Sim Shagaya", affiliation: "uLesson Founder", expertise: "EdTech Innovation" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent blur-[100px] md:blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent" />
              About Us
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Transforming Africa's Tech Landscape
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              Sara Foundation Africa is dedicated to empowering the next generation of 
              African tech leaders through education, mentorship, and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
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
            <div className="grid gap-6">
              <div className="card-modern p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To foster Diversity, Equity, and Inclusion in African tech by providing 
                      accessible education, mentorship, and opportunities for aspiring tech professionals and entrepreneurs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-modern p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      An Africa where every young person, regardless of gender, background, or location, 
                      has equal access to thrive in the global tech economy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">Our Values</span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-modern p-5 md:p-8 text-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-base md:text-lg mb-2 md:mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Award className="w-4 h-4" />
              Our Journey
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Milestones Along the Way
            </h2>
          </div>
          <div className="max-w-3xl mx-auto px-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-4 md:gap-6 mb-6 md:mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="card-modern p-4 md:p-6 flex-1">
                  <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-1 md:mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Users className="w-4 h-4" />
              Leadership
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Meet Our Team
            </h2>
            <p className="section-subtitle mx-auto">
              Dedicated leaders driving our mission to empower African tech talent.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
            {leadership.map((member) => (
              <div key={member.name} className="card-modern p-4 md:p-6 text-center group">
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-lg md:text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm md:text-lg text-foreground mb-0.5 md:mb-1">{member.name}</h3>
                <p className="text-primary text-xs md:text-sm font-medium mb-1 md:mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Board of Advisors */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2 md:mb-4">
              Board of Advisors
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Industry leaders guiding our strategic direction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="card-modern p-4 md:p-5 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-2 md:mb-3">
                  <span className="text-sm md:text-lg font-bold text-primary">
                    {advisor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground text-xs md:text-sm mb-0.5">{advisor.name}</h4>
                <p className="text-muted-foreground text-xs mb-1">{advisor.affiliation}</p>
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                  {advisor.expertise}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center px-4">
            <Quote className="w-12 h-12 md:w-16 md:h-16 mx-auto text-primary/20 mb-6 md:mb-8" />
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground font-display leading-relaxed mb-6 md:mb-8">
              "We believe that Africa's next generation of tech leaders are not just participants in the global tech economy – they are the ones who will shape its future."
            </blockquote>
            <p className="text-muted-foreground font-medium text-sm md:text-base">
              — Dr. Sarah Okafor, Executive Director
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Join Our Mission
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Be part of the movement transforming Africa's tech ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
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
