import { GraduationCap, Users, Gift, TrendingUp, Globe, Award, Quote } from "lucide-react";
import capWomenGroup from "@/assets/cap-women-group.jpg";

const benefits = [
  {
    icon: GraduationCap,
    title: "Best Way to Learn and Practice Tech Skills",
    description: "Our program focus on practical exposure makes CAP Alumni stand out. This will position your institution as a leading centre of tech innovation and employability across Africa.",
  },
  {
    icon: Users,
    title: "Student Engagement & Retention",
    description: "CAP-run hubs create vibrant student multi-university communities, allowing students to connect with other students across 8 African countries and 35 different universities.",
  },
  {
    icon: Gift,
    title: "Earn by Referring",
    description: "CAP Tech Hubs although discounted by Sara Foundation offer referral tokens to university associations based on referral agreement.",
  },
  {
    icon: TrendingUp,
    title: "Proven Graduate Outcomes",
    description: "CAP students have secured internships, full-time jobs, and pre-seed startup traction — boosting your ranking.",
  },
  {
    icon: Globe,
    title: "Pan-African Visibility",
    description: "Join a network of 35+ universities across 8 African countries with growing global recognition.",
  },
  {
    icon: Award,
    title: "Award-Winning Programme",
    description: "Sara Foundation is a 2025/26 London & South East England Prestige Award winner in Leadership Development.",
  },
];

export function CAPForSchoolsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 px-4 lg:px-0">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <span className="section-badge mb-4 md:mb-6">For School Associations</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              Partner with CAP to become a hub for Africa's next wave of tech innovators.
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img 
                src={capWomenGroup} 
                alt="Students collaborating in CAP Hub"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="card-modern p-5 bg-primary/5 border-l-4 border-l-primary">
              <Quote className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm text-foreground italic mb-3">
                "CAP Tech Hub boosted my confidence to a very great height. 
                The self-explanatory course materials provide a lot of value."
              </p>
              <p className="text-xs text-muted-foreground font-semibold">— Student, UniAbuja CAP Hub</p>
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
