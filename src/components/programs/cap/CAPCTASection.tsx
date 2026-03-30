import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: GraduationCap,
    label: "Enrol Your Hub",
    sublabel: "School Associations",
    to: "/partnership/school-community",
  },
  {
    icon: Users,
    label: "Become a CAP Member",
    sublabel: "University Students",
    to: "/contact",
  },
  {
    icon: Mail,
    label: "Get in Touch",
    sublabel: "Individuals & Students",
    to: "/contact",
  },
];

export function CAPCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
      <div className="section-container text-center px-4">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
          Ready to Build Africa's Tech Future?
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
          Partner with CAP Tech Hub. Empower your students. Shape the continent.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-10">
          {actions.map((action) => (
            <Link 
              key={action.label} 
              to={action.to}
              className="glass-card-dark p-5 md:p-6 rounded-xl hover:bg-white/20 transition-colors group text-center"
            >
              <action.icon className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-display font-bold text-white text-sm md:text-base mb-1">{action.label}</h3>
              <p className="text-white/60 text-xs">{action.sublabel}</p>
            </Link>
          ))}
        </div>

        <div className="text-white/50 text-xs space-y-1">
          <p>📧 info@sarafoundationafrica.com &nbsp; 🌐 sarafoundationafrica.com</p>
          <p>📞 +44 7435 126104 (UK) | +234 9076 66404 (NG)</p>
        </div>
      </div>
    </section>
  );
}
