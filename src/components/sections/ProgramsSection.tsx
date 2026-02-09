import { GraduationCap, Users, ArrowRight, Rocket, BookOpen, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const programs = [
  {
    id: "cap",
    icon: GraduationCap,
    title: "Career Advancement Program (CAP)",
    subtitle: "9-Month Rotational Program",
    description: "A comprehensive program implemented through CAP TECH CLUBS in African universities, nurturing young Africans to become tech professionals and founders.",
    image: studentsLabImg,
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
    image: womenTechLeaders,
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
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="section-container relative z-10">
        {/* Header */}
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
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
        </ScrollAnimation>

        {/* Programs Grid */}
        <StaggerContainer className="grid lg:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.15}>
          {programs.map((program) => (
            <StaggerItem key={program.id} variant="scale-in">
              <div className="card-modern overflow-hidden group">
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-70`} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <program.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <span className="text-white/80 text-xs md:text-sm font-medium">{program.subtitle}</span>
                        <h3 className="font-display font-bold text-lg md:text-xl lg:text-2xl text-white mt-1">
                          {program.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-8">
                  <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
                    {program.description}
                  </p>

                  {program.phases && (
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                      <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base">
                        <span className="w-6 md:w-8 h-0.5 bg-primary rounded-full" />
                        Program Phases
                      </h4>
                      <div className="grid grid-cols-3 gap-2 md:gap-4">
                        {program.phases.map((phase) => (
                          <div key={phase.name} className="text-center p-2 md:p-4 rounded-xl md:rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
                            <div className="w-8 h-8 md:w-12 md:h-12 mx-auto rounded-lg md:rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2 md:mb-3">
                              <phase.icon className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <div className="font-semibold text-xs md:text-sm text-foreground">{phase.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 hidden sm:block">{phase.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {program.communities && (
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                      <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base">
                        <span className="w-6 md:w-8 h-0.5 bg-accent rounded-full" />
                        Our Communities
                      </h4>
                      <div className="space-y-2 md:space-y-3">
                        {program.communities.map((community) => (
                          <div key={community.name} className="p-3 md:p-4 bg-secondary/50 rounded-xl md:rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
                            <div className="font-medium text-xs md:text-sm text-foreground">{community.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 hidden sm:block">{community.description}</div>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
