import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/40 blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-white/20 blur-[100px] animate-float-delayed" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="section-container relative z-10 pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-white space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 glass-card-dark rounded-full animate-fade-up">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white/90">Empowering African Tech Talent</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Breaking Barriers,
              <br />
              <span className="text-accent">Igniting Innovation,</span>
              <br />
              Empowering Dreams.
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              We're on a mission to empower the next generation of tech founders and 
              professionals in Africa through inclusive programs that foster innovation 
              and leadership.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
                <Link to="/programs/cap">
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/partnership">Partner with Us</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 md:pt-10 border-t border-white/10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[
                { value: "500+", label: "Students Trained" },
                { value: "50+", label: "Partner Schools" },
                { value: "8", label: "African Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display">{stat.value}</div>
                  <div className="text-white/60 text-xs sm:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Main image with overlay */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img 
                  src="/hero-students.jpg" 
                  alt="African students collaborating on technology projects"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
              </div>
              
              {/* Floating cards */}
              <div className="absolute top-8 -left-4 glass-card p-5 animate-float shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <span className="text-2xl">👩‍💻</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Women in Tech</div>
                    <div className="text-sm text-muted-foreground">200+ Leaders</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 -right-4 glass-card p-5 animate-float-delayed shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Graduates</div>
                    <div className="text-sm text-muted-foreground">500+ Alumni</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
