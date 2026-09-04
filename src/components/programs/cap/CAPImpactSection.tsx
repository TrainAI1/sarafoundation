import { usePageContent } from "@/hooks/usePageContent";

export function CAPImpactSection() {
  const { data: c } = usePageContent("cap-impact", {
    badge: "CAP Impact",
    headline_main: "Access provided.",
    headline_highlight: "Learning delivered.",
    description: "Each figure measures a different thing. Learners, sessions, attendances and projects are counted separately and are not unique individuals.",
    stats: [
      { value: "763", label: "CAP learners", sub: "Received fully funded access to practical digital learning across Cohorts 1 and 2." },
      { value: "35+", label: "Universities represented", sub: "Across the 8 African countries reached by CAP activity." },
      { value: "23", label: "CAP expert sessions", sub: "Delivered during 2024 and 2025." },
      { value: "100", label: "CAP Conference 1.0 attendees", sub: "People who attended in person." },
      { value: "2", label: "Talent Showcases", sub: "Learners presenting their project work." },
      { value: "1", label: "Demo Day", sub: "CAP Cohort 1 project presentations." },
      { value: "3", label: "Project mentors", sub: "Supporting active learner projects." },
      { value: "10", label: "Learner projects", sub: "Documented outputs of applied learning." },
    ],
  });

  const stats = c.stats as { value: string; label: string; sub: string }[];

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_main} <span className="gradient-text">{c.headline_highlight}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {c.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
          {stats.map((stat) => (
            <div key={stat.label} className="card-modern p-5 md:p-6 text-center h-full">
              <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-2">{stat.value}</div>
              <h3 className="font-display font-bold text-sm text-foreground mb-1">{stat.label}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
