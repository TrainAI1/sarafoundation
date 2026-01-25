import { GraduationCap, Users, ArrowRight, Rocket, BookOpen, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programs = [
  {
    id: "cap",
    icon: GraduationCap,
    title: "Career Advancement Program (CAP)",
    subtitle: "9-Month Rotational Program",
    description: "A comprehensive program implemented through CAP TECH CLUBS in African universities, nurturing young Africans to become tech professionals and founders.",
    phases: [
      { name: "Learn", icon: BookOpen, description: "Build foundational tech skills" },
      { name: "Build", icon: Rocket, description: "Create real-world projects" },
      { name: "Launch", icon: Zap, description: "Start your tech career" },
    ],
    gradient: "from-primary to-[hsl(240,80%,50%)]",
    href: "/programs/cap",
  },
  {
    id: "flip",
    icon: Users,
    title: "Female Leadership Initiative Program (FLIP)",
    subtitle: "Women-Focused Tech Community",
    description: "A membership-based program empowering women in tech to grow and succeed in Africa through mentorship, networking, and opportunities.",
    communities: [
      { name: "Women Professionals in Tech Africa (WPTA)", description: "Empowering women professionals, bridging the gender gap" },
      { name: "Women Founders in Tech Africa", description: "Supporting women-led startups and ventures" },
    ],
    gradient: "from-accent to-[hsl(350,80%,55%)]",
    href: "/programs/flip",
  },
];

export function ProgramsSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-6">
            <Star className="w-4 h-4" />
            Our Initiatives
          </span>
          <h2 className="section-title text-foreground mb-6 text-balance">
            Programs That{" "}
            <span className="gradient-text-accent">Transform Lives</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our flagship programs are designed to equip young Africans with the skills, 
            network, and resources they need to excel in the global tech industry.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="card-modern overflow-hidden group"
            >
              {/* Card Header */}
              <div className={`p-8 bg-gradient-to-r ${program.gradient} text-white relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10" />
                
                <div className="relative flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <program.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-white/80 text-sm font-medium">{program.subtitle}</span>
                    <h3 className="font-display font-bold text-xl md:text-2xl mt-1">
                      {program.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <p className="text-muted-foreground mb-8">
                  {program.description}
                </p>

                {/* Program Phases (CAP) */}
                {program.phases && (
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary rounded-full" />
                      Program Phases
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {program.phases.map((phase) => (
                        <div key={phase.name} className="text-center p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <phase.icon className="w-6 h-6" />
                          </div>
                          <div className="font-semibold text-sm text-foreground">{phase.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{phase.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Communities (FLIP) */}
                {program.communities && (
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-accent rounded-full" />
                      Our Communities
                    </h4>
                    <div className="space-y-3">
                      {program.communities.map((community) => (
                        <div key={community.name} className="p-4 bg-secondary/50 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                          <div className="font-medium text-sm text-foreground">{community.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{community.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  variant={program.id === 'cap' ? 'default' : 'accent'} 
                  className="w-full group/btn"
                  asChild
                >
                  <Link to={program.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
