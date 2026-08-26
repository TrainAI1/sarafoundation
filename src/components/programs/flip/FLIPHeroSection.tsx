import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";

const stats = [
  { value: "57", label: "Women across fellowship & mentorship" },
  { value: "93", label: "FLIP Conference 1.0 attendees" },
  { value: "108", label: "Recorded workshop attendances" },
  { value: "4", label: "FLIP mentors" },
];

export function FLIPHeroSection() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-accent relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={womenTechLeaders} 
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-accent" />
      </div>
      <div className="absolute inset-0 opacity-30">
      </div>
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="px-4 lg:px-0">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-4 mb-6">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              Female Learning &amp; Inclusion Pathway
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Creating More Inclusive Access to Digital Learning for Women
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
              FLIP creates targeted opportunities for women where barriers or underrepresentation in tech
              learning have been identified. Through mentoring, structured learning, practical projects,
              supportive communities and access support where available, participants build knowledge,
              confidence and participation. FLIP includes our six-week tailored programme for women
              interested in technology, alongside fellowship, mentorship, workshop and community activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/programs/flip/apply">
                  Apply to FLIP
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" asChild>
                <Link to="#initiatives">Explore Our Initiatives</Link>
              </Button>
            </div>
          </div>

          {/* Stats with Image */}
          <div className="relative mx-4 lg:mx-0">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-6">
              <img 
                src={womenTechLeaders} 
                alt="Women taking part in a FLIP learning and mentoring session"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="glass-card-dark p-6 md:p-8 rounded-2xl md:rounded-3xl">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 md:p-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-1 md:mb-2">{stat.value}</div>
                    <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
