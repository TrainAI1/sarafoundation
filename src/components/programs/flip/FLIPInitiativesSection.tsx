import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Presentation, Mic2, ArrowRight, Users, LucideIcon } from "lucide-react";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import womenCoworking from "@/assets/women-coworking.jpg";
import capWomenGroup from "@/assets/cap-women-group.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";

const initiativeIcons: Record<string, LucideIcon> = {
  fellowship: Award,
  workshops: Presentation,
  conferences: Mic2,
};

const initiativeFallbackImages: Record<string, string> = {
  fellowship: womenTechLeaders,
  workshops: womenCoworking,
  conferences: capWomenGroup,
};

const defaultInitiatives = [
  {
    id: "fellowship",
    name: "FLIP Fellowship",
    description:
      "A structured fellowship combining tailored learning, mentoring and a capstone project. Fellows work with mentors, practise new skills and complete a project that applies what they have learned.",
    evidence: "57 women across fellowship and mentorship activity · 5 Cohort 1 capstone projects",
    image: "",
    imageAlt: "Women taking part in a FLIP fellowship learning session",
  },
  {
    id: "workshops",
    name: "FLIP Workshops",
    description:
      "Practical sessions on personal brand, leadership and career progression, led by women working in technology and open to women at different stages of their learning.",
    evidence: "3 workshops · 108 recorded attendances",
    image: "",
    imageAlt: "Participants at a FLIP workshop",
  },
  {
    id: "conferences",
    name: "FLIP Conferences",
    description:
      "Community gatherings that bring participants, speakers and panellists together to share knowledge, widen networks and make women's participation in technology visible.",
    evidence: "FLIP Conference 1.0 · 93 women attended · 2 speakers and 4 panellists",
    image: "",
    imageAlt: "Attendees at FLIP Conference 1.0",
  },
];

export function FLIPInitiativesSection() {
  const { data: c } = usePageContent("flip-initiatives", {
    badge: "Our Initiatives",
    headline_pre: "Three ways to",
    headline_accent: "take part in FLIP",
    description: "Take part in our initiatives and join our FLIP alumni network.",
    initiatives: defaultInitiatives,
    alumni_headline: "Join our FLIP alumni network",
    alumni_description:
      "Women who have taken part in a FLIP initiative stay connected through our alumni network — " +
      "continuing to learn from one another, mentor those coming behind them and share " +
      "opportunities across the community.",
    alumni_cta_primary: "Apply to FLIP",
    alumni_cta_secondary: "Mentor with FLIP",
  });

  const initiatives = c.initiatives as typeof defaultInitiatives;

  return (
    <section id="initiatives" className="py-16 md:py-24 bg-secondary/50 scroll-mt-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_pre} <span className="gradient-text-accent">{c.headline_accent}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {c.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {initiatives.map((initiative) => {
            const Icon = initiativeIcons[initiative.id] ?? Award;
            const image = initiative.image
              ? assetUrl(initiative.image)
              : initiativeFallbackImages[initiative.id] ?? womenTechLeaders;
            return (
              <article key={initiative.id ?? initiative.name} className="card-modern overflow-hidden h-full flex flex-col">
                <img
                  src={image}
                  alt={initiative.imageAlt}
                  loading="lazy"
                  className="w-full h-44 md:h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
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
            );
          })}
        </div>

        {/* Alumni network */}
        <div className="card-modern p-6 md:p-10 mt-8 md:mt-12 mx-4 lg:mx-0">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-white flex-shrink-0">
              <Users className="w-7 h-7" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                {c.alumni_headline}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {c.alumni_description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
              <Button variant="accent" className="group" asChild>
                <Link to="/programs/flip/apply">
                  {c.alumni_cta_primary}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/volunteer">{c.alumni_cta_secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
