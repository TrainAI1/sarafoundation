import { Lightbulb, Users, Heart, Target, TrendingUp } from "lucide-react";
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

const stats = [
  { value: "763+", label: "Students Trained", icon: TrendingUp },
  { value: "35+", label: "University Partners", icon: Users },
  { value: "5,250+", label: "Community Reach", icon: Heart },
  { value: "7", label: "African Countries", icon: Target },
];

export function MissionSection() {
  const { data: c } = usePageContent("home-mission", {
    badge: "Our Mission",
    headline: "Fostering Diversity, Equity & Inclusion in African Tech",
    description: "Sara Foundation Africa is dedicated to empowering young Africans to thrive in the global tech ecosystem. We believe that diversity drives innovation, and inclusion creates opportunities for all.",
    stat1_value: "763+", stat1_label: "Students Trained",
    stat2_value: "35+", stat2_label: "University Partners",
    stat3_value: "5,250+", stat3_label: "Community Reach",
    stat4_value: "7", stat4_label: "African Countries",
  });

  const stats = [
    { value: c.stat1_value, label: c.stat1_label, icon: TrendingUp },
    { value: c.stat2_value, label: c.stat2_label, icon: Users },
    { value: c.stat3_value, label: c.stat3_label, icon: Heart },
    { value: c.stat4_value, label: c.stat4_label, icon: Target },
  ];

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

        {/* Impact Stats */}
        <ScrollAnimation variant="scale-in" className="mt-12 md:mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-[hsl(240,80%,50%)] rounded-2xl md:rounded-[2rem]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-10 lg:p-14 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/10 mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-1 md:mb-2">{stat.value}</div>
                <div className="text-white/70 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
