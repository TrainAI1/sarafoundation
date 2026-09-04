import { Users, Briefcase, Rocket, Award, LucideIcon } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const tierIcons: LucideIcon[] = [Users, Briefcase, Rocket, Award];
const tierColors = ["bg-[hsl(160,70%,40%)]", "bg-primary", "bg-accent", "bg-primary"];

const defaultTiers = [
  {
    category: "Tech Starter Members",
    item1: "Members seeking to start a career in tech",
    item2: "Founders with startups in ideation stage",
  },
  {
    category: "Professional Members",
    item1: "Tier 1: Early stage careers (1-5 years experience)",
    item2: "Tier 2: Mid stage careers (5-10 years experience)",
  },
  {
    category: "Entrepreneur Members",
    item1: "Tier 1: Pre-seed or seed stage startups (early-stage founders)",
    item2: "Tier 2: Series A+ and growth phase (experienced founders)",
  },
  {
    category: "Honorary & Ally Members",
    item1: "Honorary: 10+ years experience or led major African startups",
    item2: "Ally: Non-female members promoting women-based initiatives",
  },
];

export function FLIPMembershipSection() {
  const { data: c } = usePageContent("flip-membership", {
    badge: "Membership Structure",
    headline_pre: "Find Your",
    headline_accent: "Membership Tier",
    description:
      "Insights on our membership status for women taking part in FLIP learning, mentoring and " +
      "community activities.",
    tiers: defaultTiers,
  });

  const tiers = c.tiers as typeof defaultTiers;

  return (
    <section className="py-16 md:py-24 bg-background">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
          {tiers.map((tier, index) => {
            const Icon = tierIcons[index % tierIcons.length];
            const color = tierColors[index % tierColors.length];
            const items = [tier.item1, tier.item2].filter(Boolean);
            return (
              <div key={tier.category} className="card-modern overflow-hidden group">
                <div className={`p-5 md:p-6 ${color} text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="font-display font-bold text-sm md:text-base leading-tight">
                      {tier.category}
                    </h3>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
