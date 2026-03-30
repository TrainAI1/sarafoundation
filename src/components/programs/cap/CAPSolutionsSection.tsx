import { CheckCircle2, Target, Eye, Heart } from "lucide-react";
import capWomanLaptop from "@/assets/cap-woman-laptop.jpg";

const features = [
  "Structured Learn → Build → Launch curriculum",
  "3 specialist tracks: Code, No-Code, Tech-preneurship",
  "Industry-expert-led weekly sessions",
  "Real startup projects solving African problems",
  "Internship pathways on completion",
  "Part of a network across 35+ universities, 8 countries",
];

export function CAPSolutionsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">About CAP</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            What is the <span className="gradient-text">Career Advancement Program?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            CAP is a 3-month intensive, student-led tech hub program embedded inside African universities
            built on practical learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center px-4 lg:px-0 mb-12">
          <div>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={capWomanLaptop} 
              alt="CAP student working on laptop"
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          <div className="card-modern p-6 md:p-8 border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">Vision</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering African students through technology to drive innovation,
              entrepreneurship and socio-economic development.
            </p>
          </div>
          <div className="card-modern p-6 md:p-8 border-l-4 border-l-accent">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-accent" />
              <h3 className="font-display font-bold text-lg text-foreground">Mission</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Provide a platform for African students to explore, learn and apply
              technology — fostering collaboration, skill and leadership.
            </p>
          </div>
          <div className="card-modern p-6 md:p-8 border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">Core Values</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Innovation · Collaboration · Diversity, Equity & Inclusion · Do Well and Do Good
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
