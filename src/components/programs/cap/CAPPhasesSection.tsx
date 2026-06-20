import { BookOpen, Rocket, Zap, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const program = {
  label: "CAP Program",
  title: "6-Week Program for CAP",
  subtitle: "Career Advancement Program — learn, build, and launch.",
  totalDuration: "6 Weeks",
  phases: [
    {
      name: "Exclusive Learning",
      number: "01",
      icon: BookOpen,
      duration: "2 Weeks",
      description: "Immersive expert-led sessions across coding, no-code, product, cybersecurity, data, UI/UX and entrepreneurship.",
      outcomes: [
        "Industry-expert sessions",
        "AI-powered curriculum",
        "Practical frameworks",
        "Community & peer learning",
      ],
      color: "from-primary to-primary/80",
    },
    {
      name: "Build While Learning",
      number: "02",
      icon: Rocket,
      duration: "4 Weeks",
      description: "Apply skills in real time — students collaborate like a startup, solving real African problems through mentored sprints.",
      outcomes: [
        "Cross-track startup simulation",
        "Real-life project exposure",
        "Industry mentor oversight",
        "Portfolio-ready projects",
      ],
      color: "from-[hsl(240,80%,50%)] to-[hsl(240,80%,40%)]",
    },
    {
      name: "Launch",
      number: "03",
      icon: Zap,
      duration: "1 Week",
      description: "Internship placements for Code & No-Code students. Pre-seed funding pursuit for Tech-preneurs.",
      outcomes: [
        "Internship placement support",
        "Certificate of Completion & Alumni Access",
        "CAP Talent Showcase",
        "Full-time job opportunities",
      ],
      color: "from-accent to-accent/80",
    },
  ],
};

function PhaseBlock({ data }: { data: typeof program }) {
  return (
    <div className="mb-12 md:mb-16 last:mb-0">
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10 px-4">
        <span className="section-badge mb-3 md:mb-4">{data.label} · {data.totalDuration}</span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          {data.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">{data.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
        {data.phases.map((phase, index) => (
            <div key={phase.name} className="card-modern overflow-hidden group relative">
              <div className={`p-5 md:p-6 bg-gradient-to-r ${phase.color} text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <phase.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/70">{phase.number}</div>
                    <h3 className="font-display font-bold text-lg">{phase.name}</h3>
                  </div>
                  <div className="ml-auto inline-flex items-center gap-1 text-xs text-white/80">
                    <Clock className="w-3 h-3" />
                    {phase.duration}
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className="text-muted-foreground text-sm mb-4">
                  {phase.description}
                </p>
                <ul className="space-y-2">
                  {phase.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {index < data.phases.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-primary text-white items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export function CAPPhasesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Program Structure</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            One Path. <span className="gradient-text">Real Outcomes.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A full 6-week CAP experience — learn, build, and launch your tech career.
          </p>
        </div>

        <PhaseBlock data={program} />
      </div>
    </section>
  );
}
