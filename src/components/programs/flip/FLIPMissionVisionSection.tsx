import { Target, Eye } from "lucide-react";

const countries = [
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Togo", flag: "🇹🇬" },
];

export function FLIPMissionVisionSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        {/* Countries */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-16 px-4">
          {countries.map((country) => (
            <span key={country.name} className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground">
              <span className="text-lg">{country.flag}</span>
              {country.name}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 lg:px-0">
          {/* Mission */}
          <div className="card-modern p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-5 md:mb-6 shadow-lg">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3 md:mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                FLIP's mission is to drive transformative change by building a vibrant, global community 
                that supports, mentors, and uplifts women, advocating for equitable opportunities and 
                inclusive practices within the tech industry.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="card-modern p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-5 md:mb-6 shadow-lg">
                <Eye className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3 md:mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                FLIP envisions a tech industry where women leaders are pivotal in driving innovation and 
                positive change. We strive to cultivate a diverse and inclusive digital future, where 
                gender equity is achieved and women of all backgrounds have the opportunity to thrive, lead, and inspire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
