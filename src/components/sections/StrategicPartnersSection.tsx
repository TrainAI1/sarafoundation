import { Handshake } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const partners = [
  {
    name: "Scintilla Innovations",
    description: "Industry exposure, recruitment pathways & student assessments",
  },
  {
    name: "Farmily",
    description: "Internship placements for outstanding CAP students",
  },
  {
    name: "ALX",
    description: "Tech education and career development partnership",
  },
  {
    name: "KàdàràBrite",
    description: "Expanding access to orphans for tech training initiatives",
  },
  {
    name: "Train AI",
    description: "Centralising students in an edtech app for their tech journey",
  },
  {
    name: "Nanaade",
    description: "CV and recruitment preparation support for students",
  },
  {
    name: "Platform Hub",
    description: "Expanding women impact initiatives and reach",
  },
  {
    name: "10 Analytics",
    description: "Tech scholarships for students to develop analytics skills",
  },
];

export function StrategicPartnersSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="section-container">
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
          <span className="section-badge mb-4 md:mb-6">
            <Handshake className="w-4 h-4" />
            Strategic Partners
          </span>
          <h2 className="section-title text-foreground mb-4">
            Powered by <span className="gradient-text-accent">Key Partnerships</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our collaborators help us open doors to mentorship, internships, and real-world exposure for African tech talent.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 lg:px-0" staggerDelay={0.08}>
          {partners.map((partner) => (
            <StaggerItem key={partner.name} variant="scale-in">
              <div className="card-modern p-4 md:p-6 text-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Handshake className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base text-foreground mb-1 md:mb-2">
                  {partner.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed hidden sm:block">
                  {partner.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
