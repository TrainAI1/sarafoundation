import { AlertTriangle } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

export function CAPProblemsSection() {
  const { data: c } = usePageContent("cap-problems", {
    badge: "The Challenge",
    headline_main: "Africa Tech Learning is",
    headline_highlight: "Broken",
    description: "We see a critical gap in the African Education Sector and Tech Ecosystem. The current pipeline is broken.",
    problems: [
      { stat: "47%", title: "Limited ICT Programs", description: "African universities do not offer ICT-related programmes." },
      { stat: "70%", title: "Outdated Curriculums", description: "African universities offer IT programmes based on outdated curriculums." },
      { stat: "4%", title: "Low Tech Skills", description: "In Sub-Saharan Africa, only 4% of university graduates possess tech-related skills." },
    ],
    banner_text: "23 Million — the number of additional tech workers the continent needs by 2025",
  });

  const problems = c.problems as { stat: string; title: string; description: string }[];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-14 items-start px-4 lg:px-0">
          <ScrollAnimation variant="fade-up" className="lg:sticky lg:top-28">
          <span className="section-badge mb-4 md:mb-6">
            <AlertTriangle className="w-4 h-4" />
            {c.badge}
          </span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_main} <span className="gradient-text">{c.headline_highlight}</span>
          </h2>
          <p className="section-subtitle">
            {c.description}
          </p>
          <div className="mt-7 inline-flex bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold text-sm">
            {c.banner_text}
          </div>
          </ScrollAnimation>

          <StaggerContainer className="divide-y divide-border border-y border-border" staggerDelay={0.1}>
          {problems.map((problem) => (
            <StaggerItem key={problem.title} variant="fade-up">
            <div className="py-6 md:py-8 flex gap-5 md:gap-8 items-start">
              <div className="w-20 md:w-28 flex-shrink-0 text-3xl md:text-4xl font-bold font-display text-destructive tabular-nums leading-none">
                {problem.stat}
              </div>
              <div><h3 className="font-display font-bold text-lg text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {problem.description}
              </p></div>
            </div>
            </StaggerItem>
          ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
