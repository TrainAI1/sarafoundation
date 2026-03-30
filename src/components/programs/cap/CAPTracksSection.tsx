import { Code, Layers, Rocket, Target } from "lucide-react";

const tracks = [
  {
    name: "Code Track",
    icon: Code,
    color: "from-primary to-[hsl(240,80%,50%)]",
    specializations: [
      "Full-Stack Development",
      "Front-End Development",
      "Back-End Development",
    ],
    outcome: "Job-ready software developer with a real project portfolio",
  },
  {
    name: "No-Code Track",
    icon: Layers,
    color: "from-accent to-[hsl(350,80%,55%)]",
    specializations: [
      "Product Management",
      "Data Analysis",
      "UI/UX Design",
      "Cybersecurity",
    ],
    outcome: "Industry-ready exposure with hands-on case studies and live projects",
  },
  {
    name: "Tech-Preneur Track",
    icon: Rocket,
    color: "from-[hsl(160,70%,40%)] to-[hsl(160,70%,30%)]",
    specializations: [
      "Founders Program",
    ],
    outcome: "Work on your startup idea right from university",
  },
];

export function CAPTracksSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-4 px-4">
          <span className="section-badge mb-4 md:mb-6">Three Tracks</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Choose Your Path. <span className="gradient-text">Build Your Future.</span>
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-sm mb-10 md:mb-16 max-w-2xl mx-auto px-4">
          All tracks converge in the BUILD phase collaborating as a single startup team to ship a real product.
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {tracks.map((track) => (
            <div key={track.name} className="card-modern overflow-hidden group">
              <div className={`p-6 md:p-8 bg-gradient-to-r ${track.color} text-white text-center`}>
                <div className="w-14 h-14 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <track.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl">
                  {track.name}
                </h3>
              </div>

              <div className="p-6 md:p-8">
                <ul className="space-y-3 mb-6">
                  {track.specializations.map((spec) => (
                    <li key={spec} className="flex items-center gap-3 text-sm text-foreground px-3 py-2 bg-secondary/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 text-sm text-primary font-medium border-t border-border pt-4">
                  <Target className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {track.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
