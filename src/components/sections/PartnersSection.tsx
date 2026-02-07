import { Handshake } from "lucide-react";
import unilagLogo from "@/assets/logos/unilag.png";
import uonLogo from "@/assets/logos/uon.png";
import ashesiLogo from "@/assets/logos/ashesi.png";
import uctLogo from "@/assets/logos/uct.png";
import flutterwaveLogo from "@/assets/logos/flutterwave.png";
import andelaLogo from "@/assets/logos/andela.png";
import paystackLogo from "@/assets/logos/paystack.png";
import googleLogo from "@/assets/logos/google.png";

const partners = [
  { name: "University of Lagos", type: "University", logo: unilagLogo },
  { name: "University of Nairobi", type: "University", logo: uonLogo },
  { name: "Ashesi University", type: "University", logo: ashesiLogo },
  { name: "University of Cape Town", type: "University", logo: uctLogo },
  { name: "Flutterwave", type: "Corporate", logo: flutterwaveLogo },
  { name: "Andela", type: "Corporate", logo: andelaLogo },
  { name: "Paystack", type: "Corporate", logo: paystackLogo },
  { name: "Google for Startups", type: "Corporate", logo: googleLogo },
];

export function PartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="card-modern p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center mb-3 md:mb-4 overflow-hidden p-2">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-foreground text-xs md:text-sm mb-1">{partner.name}</h3>
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
