import { usePageContent } from "@/hooks/usePageContent";

const defaultStats = [
  { value: "57", label: "Women", sub: "Participated across FLIP fellowship and mentorship programmes during 2024–2026, supported by 57 scholarships." },
  { value: "3", label: "Workshops", sub: "Delivered on personal brand, tech women leadership and career progression." },
  { value: "108", label: "Recorded attendances", sub: "Across the three FLIP workshops. Attendances are not unique individuals." },
  { value: "93", label: "FLIP Conference 1.0", sub: "Women who attended the conference." },
  { value: "2 + 4", label: "Speakers and panellists", sub: "Contributors to FLIP Conference 1.0." },
  { value: "4", label: "Mentors", sub: "Supporting FLIP participants." },
  { value: "6", label: "African countries", sub: "Countries reached by FLIP, widening the Foundation's reach to 11 unique countries." },
  { value: "5", label: "Cohort 1 capstone projects", sub: "Completed as part of FLIP Fellowship 1.0." },
];

export function FLIPImpactSection() {
  const { data: c } = usePageContent("flip-impact", {
    badge: "FLIP Impact",
    headline_pre: "Participation, learning and",
    headline_accent: "community",
    description:
      "Each figure measures a different thing. Participants, attendances, sessions and projects are " +
      "counted separately and are not unique individuals.",
    stats: defaultStats,
  });

  const stats = c.stats as typeof defaultStats;

  return (
    <section className="py-16 md:py-24 bg-accent/5">
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
          {stats.map((stat) => (
            <div key={stat.label} className="card-modern p-5 md:p-6 text-center h-full">
              <div className="text-3xl md:text-4xl font-bold font-display text-accent mb-2">{stat.value}</div>
              <h3 className="font-display font-bold text-sm text-foreground mb-1">{stat.label}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
