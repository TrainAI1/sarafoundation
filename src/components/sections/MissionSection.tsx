import { MonitorSmartphone, HeartHandshake, Users } from "lucide-react";
import adultLearnerImg from "@/assets/events/DSC_3143.jpg.asset.json";
import professionalLearningImg from "@/assets/events/DSC_3217.jpg.asset.json";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";

const focusAreas = [
  {
    icon: MonitorSmartphone,
    title: "Digital Education",
    description:
      "Structured learning that builds digital literacy, practical skills, understanding of emerging technologies and the confidence to keep learning.",
    accent: "bg-primary",
  },
  {
    icon: HeartHandshake,
    title: "Social Inclusion",
    description:
      "Inclusive access to mentoring, supportive networks, educational resources and development opportunities for people facing financial, social or structural barriers.",
    accent: "bg-accent",
  },
  {
    icon: Users,
    title: "Community Capacity Building",
    description:
      "Mentoring, volunteering, peer support, knowledge-sharing and opportunities for participants to contribute what they learn to their communities.",
    accent: "bg-success",
  },
];

export function MissionSection() {
  const { data: c } = usePageContent("home-mission", {
    badge: "Why We Exist",
    headline: "Access to digital education and lifelong learning is not equal",
    description:
      "Financial, social, educational and structural barriers can limit who gets to learn, participate and build confidence in an increasingly digital world. Sara Foundation Africa exists to reduce those barriers by expanding access to digital learning, creating inclusive opportunities and strengthening the communities around learners.",
  });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="section-container relative z-10">
        {/* Why we exist */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20 px-4 lg:px-0">
          <ScrollAnimation variant="slide-left">
            <div>
              <span className="section-badge mb-6">{c.badge}</span>
              <h2 className="section-title text-foreground mb-6 text-balance">
                Access to digital education and lifelong learning is{" "}
                <span className="gradient-text">not equal</span>
              </h2>
              <p className="section-subtitle">{c.description}</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation variant="slide-right">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={adultLearnerImg.url}
                alt="Adult learner working at a computer in an ICT training lab"
                className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
              <img
                src={professionalLearningImg.url}
                alt="Professionals collaborating with laptops at a technology learning session"
                className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-lg mt-6"
                loading="lazy"
              />
            </div>
          </ScrollAnimation>
        </div>

        {/* Three charitable focus areas */}
        <ScrollAnimation variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            <span className="section-badge mb-4">Our Three Focus Areas</span>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Education. Inclusion. Community Impact.
            </h3>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-4 md:gap-6">
          {focusAreas.map((area) => (
            <StaggerItem key={area.title}>
              <div className="card-modern p-6 md:p-8 h-full group">
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${area.accent} flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <area.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-display font-bold text-lg md:text-xl mb-3 text-foreground">
                  {area.title}
                </h4>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {area.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
