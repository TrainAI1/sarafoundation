import { TrendingUp, Users, Globe, Award, Building, GraduationCap } from "lucide-react";

const impactStats = [
  {
    icon: Users,
    value: "700+",
    label: "Lives Impacted",
    description: "Students and professionals empowered",
  },
  {
    icon: GraduationCap,
    value: "50+",
    label: "Universities",
    description: "Partner institutions across Africa",
  },
  {
    icon: Globe,
    value: "12+",
    label: "Countries",
    description: "Pan-African presence and growing",
  },
  {
    icon: Award,
    value: "85%",
    label: "Job Placement",
    description: "CAP graduates employed in tech",
  },
  {
    icon: Building,
    value: "100+",
    label: "Partner Companies",
    description: "Hiring our alumni and members",
  },
  {
    icon: TrendingUp,
    value: "$2M+",
    label: "Funding Raised",
    description: "By FLIP founder members",
  },
];

export function ImpactSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-foreground via-foreground/95 to-[hsl(240,20%,15%)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[200px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            Our Impact
          </span>
          <h2 className="section-title text-white mb-6">
            Making a Difference{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
              Across Africa
            </span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mx-auto">
            Since our founding, we've been committed to creating measurable impact 
            in African tech communities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card-dark p-6 text-center group hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold font-display text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white font-medium text-sm mb-1">{stat.label}</div>
              <div className="text-white/50 text-xs">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
