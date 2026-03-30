import { Award, ExternalLink } from "lucide-react";

const partners = [
  {
    name: "Scintilla Africa",
    role: "Industry exposure & internship recruitment",
  },
  {
    name: "Farmily",
    role: "Internship & full-time job placements",
  },
  {
    name: "Train AI",
    role: "EdTech platform for student learning journeys",
  },
  {
    name: "Nanaade AI",
    role: "CV & recruitment preparation support",
  },
];

export function CAPRecognitionSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Recognition & Partners</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Trusted. Recognised. <span className="gradient-text">Growing.</span>
          </h2>
        </div>

        {/* Award */}
        <div className="max-w-2xl mx-auto mb-12 px-4">
          <div className="card-modern p-6 md:p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-foreground mb-1">
              🏆 Prestige Award Winner 2025/26
            </h3>
            <p className="text-primary font-medium text-sm mb-3">
              London & South East England — Leadership Development Category
            </p>
            <p className="text-muted-foreground text-sm italic max-w-lg mx-auto">
              "This recognition honours organisations making meaningful impact within their communities 
              and reinforces our position as a rising African nonprofit shaping the next generation of innovators."
            </p>
          </div>
        </div>

        {/* Partners */}
        <div className="px-4 lg:px-0">
          <h3 className="font-display font-bold text-lg text-foreground text-center mb-6">Strategic Partners</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {partners.map((partner) => (
              <div key={partner.name} className="card-modern p-5 md:p-6 text-center">
                <h4 className="font-display font-bold text-base text-foreground mb-2">{partner.name}</h4>
                <p className="text-muted-foreground text-xs">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto px-4">
          Sara Foundation is a London based Non-Profit Organization established by Africans to drive 
          technology focused impact in Africa, by fostering Diversity, Equity and Inclusion and developing 
          the next generation African tech founders and entrepreneurs.
        </p>
      </div>
    </section>
  );
}
