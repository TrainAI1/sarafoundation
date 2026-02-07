import { GraduationCap } from "lucide-react";
import unilagLogo from "@/assets/logos/unilag.png";
import uonLogo from "@/assets/logos/uon.png";
import ashesiLogo from "@/assets/logos/ashesi.png";
import uctLogo from "@/assets/logos/uct.png";

const universities = [
  { name: "University of Lagos", country: "🇳🇬 Nigeria", logo: unilagLogo },
  { name: "University of Nairobi", country: "🇰🇪 Kenya", logo: uonLogo },
  { name: "Ashesi University", country: "🇬🇭 Ghana", logo: ashesiLogo },
  { name: "University of Cape Town", country: "🇿🇦 South Africa", logo: uctLogo },
];

export function PartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-6">
            <GraduationCap className="w-4 h-4" />
            Our University Partners
          </span>
          <h2 className="section-title text-foreground mb-6">
            Present in Leading{" "}
            <span className="gradient-text">African Universities</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We have established CAP Tech Hubs in top universities across Africa, 
            empowering students on campus.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {universities.map((uni) => (
            <div
              key={uni.name}
              className="card-modern p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center mb-3 md:mb-4 overflow-hidden p-2">
                <img 
                  src={uni.logo} 
                  alt={`${uni.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-foreground text-xs md:text-sm mb-1">{uni.name}</h3>
              <span className="text-xs text-muted-foreground">{uni.country}</span>
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
