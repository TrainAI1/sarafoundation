import { usePageContent } from "@/hooks/usePageContent";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { assetUrl } from "@/lib/assetUrl";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

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
    image: "",
  });

  const stats = c.stats as { value: string; label: string; sub: string }[];
  const featuredImage = c.image ? assetUrl(c.image) : graduatesCelebration;

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-16 px-4 lg:px-0">
          <ScrollAnimation variant="slide-left">
            <div className="text-left">
              <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">
                {c.headline_main} <span className="gradient-text">{c.headline_highlight}</span>
              </h2>
              <p className="section-subtitle mx-0">
                {c.description}
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation variant="slide-right">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={featuredImage}
                alt="CAP learners celebrating their achievements at a graduation and awards ceremony"
                className="w-full h-56 md:h-72 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = graduatesCelebration;
                }}
              />
            </div>
          </ScrollAnimation>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0" staggerDelay={0.08}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label} variant="scale-in">
              <div className="card-modern p-5 md:p-6 text-center h-full">
                <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-2">{stat.value}</div>
                <h3 className="font-display font-bold text-sm text-foreground mb-1">{stat.label}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{stat.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
