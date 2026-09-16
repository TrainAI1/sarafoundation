import { GraduationCap, Crown, Network, Users, DollarSign, Megaphone, LucideIcon } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const benefitIcons: LucideIcon[] = [GraduationCap, Crown, Network, Users, DollarSign, Megaphone];

const defaultBenefits = [
  {
    title: "Skill Development and Capacity Building",
    description: "Access to training and resources to enhance your technical and business skills.",
  },
  {
    title: "Leadership Development and Empowerment",
    description: "Programs designed to prepare women for leadership roles in the tech industry.",
  },
  {
    title: "Networking and Community Access",
    description: "Connect with a vibrant network of women in tech and industry experts.",
  },
  {
    title: "Mentorship and Development Resources",
    description: "Pair with experienced mentors and access curated development materials.",
  },
  {
    title: "Access to Funding and Investment",
    description: "Support opportunities for women building tech innovations to connect with funders.",
  },
  {
    title: "Advocacy, Visibility and Policy Impact",
    description: "Amplify your voice and contribute to policy changes for women in tech.",
  },
];

export function FLIPBenefitsSection() {
  const { data: c } = usePageContent("flip-benefits", {
    badge: "Membership Benefits",
    headline_pre: "What You'll",
    headline_accent: "Gain",
    description:
      "We provide comprehensive support and access to benefits that empower women to succeed " +
      "in the tech industry, drive innovation, and contribute to economic and social progress across Africa.",
    benefits: defaultBenefits,
  });

  const benefits = c.benefits as typeof defaultBenefits;

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">
            {c.badge}
          </span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_pre} <span className="gradient-text-accent">{c.headline_accent}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {c.description}
          </p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0" staggerDelay={0.08}>
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            const featured = index === 0;
            return (
              <StaggerItem key={benefit.title} variant="fade-up" className={featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
              <div className={`card-modern p-5 md:p-6 group h-full flex flex-col ${featured ? "bg-accent border-accent justify-end min-h-64 md:p-8" : ""}`}>
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${featured ? "bg-accent-foreground/15 text-accent-foreground" : "bg-accent/10 text-accent"}`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className={`font-display font-bold mb-2 ${featured ? "text-2xl md:text-3xl text-accent-foreground" : "text-sm md:text-base text-foreground"}`}>
                  {benefit.title}
                </h3>
                <p className={`text-xs md:text-sm ${featured ? "text-accent-foreground/75 max-w-md" : "text-muted-foreground"}`}>
                  {benefit.description}
                </p>
              </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
