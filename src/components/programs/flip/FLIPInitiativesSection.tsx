import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Presentation, Mic2, ArrowRight, Users } from "lucide-react";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import womenCoworking from "@/assets/women-coworking.jpg";
import capWomenGroup from "@/assets/cap-women-group.jpg";

const initiatives = [
  {
    icon: Award,
    name: "FLIP Fellowship",
    description:
      "A structured fellowship combining tailored learning, mentoring and a capstone project. Fellows work with mentors, practise new skills and complete a project that applies what they have learned.",
    evidence: "57 women across fellowship and mentorship activity · 5 Cohort 1 capstone projects",
    image: womenTechLeaders,
    imageAlt: "Women taking part in a FLIP fellowship learning session",
  },
  {
    icon: Presentation,
    name: "FLIP Workshops",
    description:
      "Practical sessions on personal brand, leadership and career progression, led by women working in technology and open to women at different stages of their learning.",
    evidence: "3 workshops · 108 recorded attendances",
    image: womenCoworking,
    imageAlt: "Participants at a FLIP workshop",
  },
  {
    icon: Mic2,
    name: "FLIP Conferences",
    description:
      "Community gatherings that bring participants, speakers and panellists together to share knowledge, widen networks and make women's participation in technology visible.",
    evidence: "FLIP Conference 1.0 · 93 women attended · 2 speakers and 4 panellists",
    image: capWomenGroup,
    imageAlt: "Attendees at FLIP Conference 1.0",
  },
];

export function FLIPInitiativesSection() {
  return (
    <section id="initiatives" className="py-16 md:py-24 bg-secondary/50 scroll-mt-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Our Initiatives</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Three ways to <span className="gradient-text-accent">take part in FLIP</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Take part in our initiatives and join our FLIP alumni network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {initiatives.map((initiative) => (
            <article key={initiative.name} className="card-modern overflow-hidden h-full flex flex-col">
              <img
                src={initiative.image}
                alt={initiative.imageAlt}
                loading="lazy"
                className="w-full h-44 md:h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent mb-4">
                  <initiative.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">{initiative.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {initiative.description}
                </p>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  {initiative.evidence}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Alumni network */}
        <div className="card-modern p-6 md:p-10 mt-8 md:mt-12 mx-4 lg:mx-0">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-white flex-shrink-0">
              <Users className="w-7 h-7" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Join our FLIP alumni network
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Women who have taken part in a FLIP initiative stay connected through our alumni network —
                continuing to learn from one another, mentor those coming behind them and share
                opportunities across the community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
              <Button variant="accent" className="group" asChild>
                <Link to="/programs/flip/apply">
                  Apply to FLIP
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/volunteer">Mentor with FLIP</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
