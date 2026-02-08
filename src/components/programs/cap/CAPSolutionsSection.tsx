import { Users, Rocket, Heart, CheckCircle2 } from "lucide-react";
import youngDeveloper from "@/assets/young-developer.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import communityWorkshop from "@/assets/community-workshop.jpg";

const solutions = [
  {
    icon: Users,
    title: "Tech Talent Development",
    description: "Africa needs millions of additional tech workers to meet its digital economy ambitions. With CAP Tech Hubs in 35+ universities across 7 countries, students are being equipped to bridge the gap.",
    highlights: ["Hands-on training", "Industry-ready skills", "Certified programs"],
    image: youngDeveloper,
  },
  {
    icon: Rocket,
    title: "Support for Early Founders",
    description: "Through our Build and Launch phases, students develop real MVPs like ArtifyPro and CampusLink. Partnerships with Scintilla and Farmily open doors to internships and full-time roles.",
    highlights: ["Founder mentorship", "Pitch preparation", "Funding access"],
    image: techEntrepreneurs,
  },
  {
    icon: Heart,
    title: "Inclusive Community",
    description: "Our program is gender neutral and fosters an inclusive environment where every student member can learn, grow, and contribute, ensuring diversity, equity, and inclusion.",
    highlights: ["Gender neutral", "Diverse community", "Equal opportunities"],
    image: communityWorkshop,
  },
];

export function CAPSolutionsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Our Solutions</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            How CAP Tech Hub <span className="gradient-text">Bridges the Gap</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {solutions.map((solution) => (
            <div key={solution.title} className="card-modern overflow-hidden group">
              <div className="h-40 md:h-48 overflow-hidden">
                <img 
                  src={solution.image} 
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 md:mb-5 shadow-lg -mt-12 relative z-10 border-4 border-card">
                  <solution.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-3">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 md:mb-5">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
