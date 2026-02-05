import { Users, Lightbulb, TrendingUp, Award, MapPin } from "lucide-react";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";
import mentorshipSession from "@/assets/mentorship-session.jpg";

const benefits = [
  {
    icon: Users,
    title: "Build Connections",
    description: "Students across tracks are poised to build connections and collaborations.",
  },
  {
    icon: Lightbulb,
    title: "Hands-on Experience",
    description: "Gain exposure to the tech industry boosting preparedness for future STEM careers.",
  },
  {
    icon: TrendingUp,
    title: "Emerging Technologies",
    description: "CAP exposes students to cutting-edge trends, offering insights into emerging fields.",
  },
  {
    icon: Award,
    title: "Technical Skills",
    description: "Cultivate valuable skills including coding, product management essential for tech industry success.",
  },
];

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Zambia"];

export function CAPImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16 px-4 lg:px-0">
          <div>
            <span className="section-badge mb-4 md:mb-6">Our Impact</span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              What Students <span className="gradient-text-accent">Gain</span>
            </h2>
            <p className="section-subtitle mb-6">
              We have a vibrant presence in over 35 universities with 763 students across 
              the last 2 cohorts, continuously expanding into more institutions.
            </p>
            {/* Countries */}
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <span key={country} className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-xs md:text-sm text-foreground">
                  <MapPin className="w-3 h-3 text-primary" />
                  {country}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={graduatesCelebration} 
              alt="CAP graduates celebrating"
              className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-lg"
            />
            <img 
              src={mentorshipSession} 
              alt="Mentorship session"
              className="w-full h-40 md:h-56 object-cover rounded-2xl shadow-lg mt-6"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="card-modern p-5 md:p-6 text-center group">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold font-display text-primary mb-2">
                0{index + 1}
              </div>
              <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
