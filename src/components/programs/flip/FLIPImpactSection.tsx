const stats = [
  { value: "57", label: "Women", sub: "Participated across FLIP fellowship and mentorship programmes during 2024–2026, supported by 57 scholarships." },
  { value: "3", label: "Workshops", sub: "Delivered on personal brand, tech women leadership and career progression." },
  { value: "108", label: "Recorded attendances", sub: "Across the three FLIP workshops. Attendances are not unique individuals." },
  { value: "93", label: "FLIP Conference 1.0", sub: "Women who attended the conference." },
  { value: "2 + 4", label: "Speakers and panellists", sub: "Contributors to FLIP Conference 1.0." },
  { value: "4", label: "Mentors", sub: "Supporting FLIP participants." },
  { value: "5", label: "Cohort 1 capstone projects", sub: "Completed as part of FLIP Fellowship 1.0." },
];

export function FLIPImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">FLIP Impact</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Participation, learning and <span className="gradient-text-accent">community</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Each figure measures a different thing. Participants, attendances, sessions and projects are
            counted separately and are not unique individuals.
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
