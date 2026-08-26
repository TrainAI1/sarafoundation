import { GraduationCap, Users, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const pathways = [
  {
    id: "cap",
    code: "CAP",
    icon: GraduationCap,
    title: "Community Access & Participation Pathway",
    description:
      "Expands access to practical tech education through CAP Tech Hubs, structured learning, mentoring, projects and community-based learning for young people from underserved communities.",
    image: studentsLabImg,
    imageAlt: "CAP learners taking part in a practical digital learning session",
    highlights: ["Structured digital learning", "Mentoring & guided projects", "Demo days & showcases"],
    accent: "bg-primary",
    cta: "Explore CAP",
    href: "/programs/cap",
    variant: "default" as const,
  },
  {
    id: "flip",
    code: "FLIP",
    icon: Users,
    title: "Female Learning & Inclusion Pathway",
    description:
      "Increases women's participation in tech learning through mentoring, inclusive opportunities, supportive communities and access to learning.",
    image: womenTechLeaders,
    imageAlt: "Women taking part in a FLIP learning and mentoring session",
    highlights: ["Fellowship & mentorship", "Workshops & conference", "Capstone learning projects"],
    accent: "bg-accent",
    cta: "Explore FLIP",
    href: "/programs/flip",
    variant: "accent" as const,
  },
  {
    id: "ejp",
    code: "EJP",
    icon: Compass,
    title: "Education Journey Pathway",
    description:
      "Supports continued learning through insight, work-readiness education, mentoring, experiential exposure and referrals that deepen participants' learning journeys.",
    image: graduatesCelebration,
    imageAlt: "Participants at a Sara Foundation Africa work-readiness learning session",
    highlights: ["Insight & knowledge sessions", "Work-readiness education", "Referrals to further learning"],
    accent: "bg-primary",
    cta: "Explore EJP",
    href: "/programs/gjp",
    variant: "default" as const,
  },
];

export function ProgramsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="section-container relative z-10">
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-6">Our Learning Pathways</span>
          <h2 className="section-title text-foreground mb-6 text-balance">
            Three routes into{" "}
            <span className="gradient-text-accent">learning and participation</span>
          </h2>
          <p className="section-subtitle mx-auto">
            CAP, FLIP and EJP turn our charitable purposes into structured learning pathways, each designed
            around the barriers the people we support actually face.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.15}>
          {pathways.map((pathway) => (
            <StaggerItem key={pathway.id} variant="scale-in">
              <div className="card-modern overflow-hidden group h-full flex flex-col">
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={pathway.image}
                    alt={pathway.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${pathway.accent} opacity-70`} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <pathway.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <span className="text-white/80 text-xs md:text-sm font-semibold uppercase tracking-[0.18em]">
                          {pathway.code}
                        </span>
                        <h3 className="font-display font-bold text-lg md:text-xl text-white mt-1">
                          {pathway.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-8 flex flex-col flex-1">
                  <p className="text-muted-foreground text-sm md:text-base mb-6">{pathway.description}</p>

                  <ul className="space-y-2 mb-6 md:mb-8">
                    {pathway.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button variant={pathway.variant} className="w-full group/btn mt-auto" asChild>
                    <Link to={pathway.href}>
                      {pathway.cta}
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
