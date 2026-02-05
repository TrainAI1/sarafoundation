import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";

const stats = [
  { value: "200+", label: "Women Members" },
  { value: "50+", label: "Mentors" },
  { value: "6", label: "Countries" },
  { value: "2", label: "Communities" },
];

export function FLIPHeroSection() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-accent via-accent/90 to-[hsl(350,80%,55%)] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={womenTechLeaders} 
          alt="Women tech leaders"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/90 to-[hsl(350,80%,55%)]" />
      </div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-primary blur-[100px] md:blur-[150px]" />
      </div>
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="px-4 lg:px-0">
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              Women-Focused Tech Community
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Female Leadership Initiative Program (FLIP)
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
              A membership-based program providing women-focused tech communities that aims to empower and 
              inspire women in tech to grow and succeed in Africa through mentorship, networking, and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/contact">
                  Join FLIP
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" asChild>
                <Link to="#communities">Explore Communities</Link>
              </Button>
            </div>
          </div>

          {/* Stats with Image */}
          <div className="relative mx-4 lg:mx-0">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-6">
              <img 
                src={womenTechLeaders} 
                alt="Women tech professionals in leadership meeting"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="glass-card-dark p-6 md:p-8 rounded-2xl md:rounded-3xl">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 md:p-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-1 md:mb-2">{stat.value}</div>
                    <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
