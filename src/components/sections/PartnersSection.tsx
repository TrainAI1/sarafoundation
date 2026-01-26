import { Handshake } from "lucide-react";

const partners = [
  { name: "University of Lagos", type: "University" },
  { name: "University of Nairobi", type: "University" },
  { name: "Ashesi University", type: "University" },
  { name: "University of Cape Town", type: "University" },
  { name: "Flutterwave", type: "Corporate" },
  { name: "Andela", type: "Corporate" },
  { name: "Paystack", type: "Corporate" },
  { name: "Google for Startups", type: "Corporate" },
];

export function PartnersSection() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-6">
            <Handshake className="w-4 h-4" />
            Our Partners
          </span>
          <h2 className="section-title text-foreground mb-6">
            Trusted By Leading{" "}
            <span className="gradient-text">Institutions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We collaborate with top universities and organizations across Africa 
            to deliver impactful programs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="card-modern p-6 flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <span className="text-2xl font-bold text-primary">
                  {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{partner.name}</h3>
              <span className="text-xs text-muted-foreground">{partner.type}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            And many more across 12+ African countries
          </p>
        </div>
      </div>
    </section>
  );
}
