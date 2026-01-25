import { GraduationCap, Users, ArrowRight, Rocket, BookOpen, Zap } from "lucide-react";
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
    color: "primary",
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
    color: "accent",
    href: "/programs/flip",
  },
];

export function ProgramsSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-semibold rounded-full text-sm mb-6">
            Our Initiatives
          </span>
          <h2 className="section-title text-foreground mb-6">
            Programs That Transform Lives
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
              className="card-elevated overflow-hidden"
            >
              {/* Card Header */}
              <div className={`p-6 md:p-8 ${program.color === 'primary' ? 'bg-primary' : 'bg-accent'} text-white`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <program.icon className="w-7 h-7" />
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
              <div className="p-6 md:p-8">
                <p className="text-muted-foreground mb-6">
                  {program.description}
                </p>

                {/* Program Phases (CAP) */}
                {program.phases && (
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-foreground">Program Phases</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {program.phases.map((phase, index) => (
                        <div key={phase.name} className="text-center">
                          <div className={`w-12 h-12 mx-auto rounded-xl ${program.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} flex items-center justify-center mb-2`}>
                            <phase.icon className="w-6 h-6" />
                          </div>
                          <div className="font-semibold text-sm text-foreground">{phase.name}</div>
                          <div className="text-xs text-muted-foreground">{phase.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Communities (FLIP) */}
                {program.communities && (
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-foreground">Our Communities</h4>
                    <div className="space-y-3">
                      {program.communities.map((community) => (
                        <div key={community.name} className="p-4 bg-secondary rounded-xl">
                          <div className="font-medium text-sm text-foreground">{community.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{community.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  variant={program.color === 'primary' ? 'default' : 'accent'} 
                  className="w-full group"
                  asChild
                >
                  <Link to={program.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
