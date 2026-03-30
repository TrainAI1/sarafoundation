import { AlertTriangle } from "lucide-react";

const problems = [
  {
    stat: "47%",
    title: "Limited ICT Programs",
    description: "African universities do not offer ICT-related programmes.",
  },
  {
    stat: "70%",
    title: "Outdated Curriculums",
    description: "African universities offer IT programmes based on outdated curriculums.",
  },
  {
    stat: "4%",
    title: "Low Tech Skills",
    description: "In Sub-Saharan Africa, only 4% of university graduates possess tech-related skills.",
  },
];

export function CAPProblemsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Challenge
          </span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Africa Tech Learning is <span className="gradient-text">Broken</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We see a critical gap in the African Education Sector and Tech Ecosystem.
            The current pipeline is broken.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {problems.map((problem) => (
            <div key={problem.title} className="card-modern p-6 md:p-8 text-center group">
              <div className="text-4xl md:text-5xl font-bold font-display text-destructive mb-3 md:mb-4">
                {problem.stat}
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 md:mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 px-4">
          <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm md:text-base">
            23 Million — the number of additional tech workers the continent needs by 2025
          </div>
        </div>
      </div>
    </section>
  );
}
