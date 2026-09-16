import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import capClassroom from "@/assets/events/DSC_3133-3.jpg.asset.json";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import { assetUrl } from "@/lib/assetUrl";
import { usePageContent } from "@/hooks/usePageContent";

export function CAPHeroSection() {
  const { data: c } = usePageContent("programs-cap", {
    badge: "Community Access & Participation Pathway",
    hero_headline: "Expanding Access. Building Confidence. Supporting Participation.",
    hero_description: "CAP helps young people from underserved and underrepresented communities access structured digital education, mentoring and practical learning. Participants build knowledge, practise new skills, work on projects, connect with peers and contribute to community learning.",
    hero_image: "",
    cta_primary_text: "Apply to CAP",
    cta_secondary_text: "See our impact evidence",
    stats: [
      { value: "763", label: "CAP learners, fully funded" },
      { value: "35+", label: "Universities represented" },
      { value: "8", label: "African countries (CAP)" },
    ],
    stats_caption: "Figures cover CAP Cohorts 1 and 2 (2024–2025).",
  });

  const heroImage = c.hero_image ? assetUrl(c.hero_image) : assetUrl(capClassroom);

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="px-4 lg:px-0">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
              <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" aria-hidden="true" />
              {c.badge}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {c.hero_headline}
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
              {c.hero_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/programs/cap/apply">
                  {c.cta_primary_text}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" asChild>
                <Link to="/projects">{c.cta_secondary_text}</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-4 lg:mx-0">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src={heroImage}
                alt="CAP Tech Hub session in a university lecture hall with learners and a facilitator"
                className="w-full h-64 md:h-[25rem] object-cover"
                onError={(e) => {
                  e.currentTarget.src = studentsLabImg;
                }}
              />
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-primary/90 backdrop-blur-md p-4 md:p-5">
              <div className="grid grid-cols-3 gap-3 md:gap-5">
                {c.stats.map((stat: { value: string; label: string }) => (
                  <div key={stat.label} className="text-center border-r border-primary-foreground/20 last:border-r-0 px-1">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-primary-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/70 text-[10px] md:text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-primary-foreground/60 text-[10px] mt-3">
                {c.stats_caption}
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
