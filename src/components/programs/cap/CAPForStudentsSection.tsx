import { Wrench, Users, Briefcase, Rocket, Globe, BookOpen, Quote } from "lucide-react";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";

const benefits = [
  {
    icon: Wrench,
    title: "Real-World Skills",
    description: "Coding, product management, UI/UX, business analysis grounded in hands-on practice.",
  },
  {
    icon: Users,
    title: "Industry Mentorship",
    description: "12 weekly sessions with seasoned tech professionals who guide your learning journey.",
  },
  {
    icon: Briefcase,
    title: "Internship & Job Placement",
    description: "CAP alumni have secured internships and full-time offers at companies like Farmily & Scintilla Africa.",
  },
  {
    icon: Rocket,
    title: "Build a Real Startup",
    description: "Launch phase teams have shipped real products like ArtifyPro and CampusLink.",
  },
  {
    icon: Globe,
    title: "Pan-African Network",
    description: "Join a community spanning 35+ universities and 8 countries across the African continent.",
  },
  {
    icon: BookOpen,
    title: "Free Learning Resources",
    description: "Access course materials, certifications, and partner discounts from ALX Africa and more all inclusive.",
  },
];

export function CAPForStudentsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 px-4 lg:px-0">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <span className="section-badge mb-4 md:mb-6">For Students</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              Everything you need to launch your tech career while still in university.
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img 
                src={capHappyCoder} 
                alt="Happy CAP student coding"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="card-modern p-5 bg-primary/5 border-l-4 border-l-primary">
              <Quote className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm text-foreground italic mb-3">
                "CAP has given me a solid foundation in both front-end and back-end development. 
                I now feel more prepared, more skilled, and more confident."
              </p>
              <p className="text-xs text-muted-foreground font-semibold">— Taiwo, FUOYE, Nigeria</p>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card-modern p-5 md:p-6 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
