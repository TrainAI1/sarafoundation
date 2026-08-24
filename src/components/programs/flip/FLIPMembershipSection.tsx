import { Briefcase, Rocket, Award } from "lucide-react";

const tiers = [
  {
    category: "Tech Starter Members",
    color: "from-[hsl(160,70%,40%)] to-[hsl(160,70%,30%)]",
    icon: Users,
    items: [
      "Members seeking to start a career in tech",
      "Founders with startups in ideation stage",
    ],
  },
  {
    category: "Professional Members",
    color: "from-primary to-[hsl(240,80%,50%)]",
    icon: Briefcase,
    items: [
      "Tier 1: Early stage careers (1-5 years experience)",
      "Tier 2: Mid stage careers (5-10 years experience)",
    ],
  },
  {
    category: "Entrepreneur Members",
    color: "from-accent to-[hsl(350,80%,55%)]",
    icon: Rocket,
    items: [
      "Tier 1: Pre-seed or seed stage startups (early-stage founders)",
      "Tier 2: Series A+ and growth phase (experienced founders)",
    ],
  },
  {
    category: "Honorary & Ally Members",
    color: "from-[hsl(45,90%,50%)] to-[hsl(45,90%,40%)]",
    icon: Award,
    items: [
      "Honorary: 10+ years experience or led major African startups",
      "Ally: Non-female members promoting women-based initiatives",
    ],
  },
];

export function FLIPMembershipSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Membership Structure</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Find Your <span className="gradient-text-accent">Membership Tier</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Insights on our membership status for FLIP members in our Women Professionals in Tech 
            and Women Founders in Tech communities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
          {tiers.map((tier) => (
            <div key={tier.category} className="card-modern overflow-hidden group">
              <div className={`p-5 md:p-6 bg-gradient-to-r ${tier.color} text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <tier.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-display font-bold text-sm md:text-base leading-tight">
                    {tier.category}
                  </h3>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <ul className="space-y-3">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      {item}
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
