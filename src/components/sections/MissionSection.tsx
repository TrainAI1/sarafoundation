import { Lightbulb, Users, Heart, Target } from "lucide-react";

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Fostering creative solutions and cutting-edge technology to address Africa's unique challenges.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Building strong partnerships across sectors to amplify our collective impact on the continent.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Heart,
    title: "DEI",
    description: "Championing Diversity, Equity, and Inclusion to ensure everyone has a seat at the table.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Target,
    title: "Do Well, Do Good",
    description: "Creating sustainable impact while driving excellence in everything we do.",
    color: "bg-primary/10 text-primary",
  },
];

export function MissionSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="section-container">
        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">
            Our Mission
          </span>
          <h2 className="section-title text-foreground mb-6">
            Fostering Diversity, Equity & Inclusion in African Tech
          </h2>
          <p className="section-subtitle mx-auto">
            Sara Foundation Africa is dedicated to empowering young Africans to thrive in 
            the global tech ecosystem. We believe that diversity drives innovation, and 
            inclusion creates opportunities for all.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {coreValues.map((value, index) => (
            <div 
              key={value.title}
              className="card-elevated p-6 md:p-8 text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Numbers */}
        <div className="mt-16 md:mt-24 bg-primary rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/70">Students Empowered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-white/70">University Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-white/70">Mentors & Coaches</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-white/70">African Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
