import { Lightbulb, Users, Heart, Target } from "lucide-react";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import communityWorkshopImg from "@/assets/community-workshop.jpg";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Fostering creative solutions and cutting-edge technology to address Africa's unique challenges.",
    gradient: "from-primary to-primary/60",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Building strong partnerships across sectors to amplify our collective impact on the continent.",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: Heart,
    title: "DEI",
    description: "Championing Diversity, Equity, and Inclusion to ensure everyone has a seat at the table.",
    gradient: "from-success to-success/60",
  },
  {
    icon: Target,
    title: "Do Well, Do Good",
    description: "Creating sustainable impact while driving excellence in everything we do.",
    gradient: "from-primary to-accent",
  },
];

export function MissionSection() {
  const { data: c } = usePageContent("home-mission", {
    badge: "Our Mission",
    headline: "Fostering Diversity, Equity & Inclusion in African Tech",
    description: "Sara Foundation Africa is dedicated to empowering young Africans to thrive in the global tech ecosystem. We believe that diversity drives innovation, and inclusion creates opportunities for all.",
  });
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      <div className="section-container relative z-10">
        {/* Mission Statement with Image */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20 px-4 lg:px-0">
          <ScrollAnimation variant="slide-left">
            <div>
              <span className="section-badge mb-6">{c.badge}</span>
              <h2 className="section-title text-foreground mb-6 text-balance">
                Fostering Diversity, Equity & Inclusion in{" "}
                <span className="gradient-text">African Tech</span>
              </h2>
              <p className="section-subtitle">{c.description}</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation variant="slide-right">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={studentsLabImg} 
                alt="Students working in a tech lab"
                className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-lg"
              />
              <img 
                src={communityWorkshopImg} 
                alt="Community workshop session"
                className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-lg mt-6"
              />
            </div>
          </ScrollAnimation>
        </div>

        {/* Core Values */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {coreValues.map((value) => (
            <StaggerItem key={value.title}>
              <div className="card-modern p-5 md:p-8 text-center group">
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <value.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl mb-2 md:mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
