import { Code, Layers, Rocket, Target } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const trackIcons = [Code, Layers, Rocket];
const trackColors = ["bg-primary", "bg-accent", "bg-[hsl(160,70%,40%)]"];

export function CAPTracksSection() {
  const { data: c } = usePageContent("cap-tracks", {
    badge: "Three Tracks",
    headline_main: "Choose Your Path.",
    headline_highlight: "Build Your Future.",
    description: "All tracks converge in the BUILD phase, collaborating as one project team to build a real product.",
    tracks: [
      {
        name: "Code Track",
        specializations_text: "Full-Stack Development\nFront-End Development\nBack-End Development",
        outcome: "Job-ready software developer with a real project portfolio",
      },
      {
        name: "No-Code Track",
        specializations_text: "Product Management\nProduct Marketing\nData Analysis\nUI/UX Design\nCybersecurity",
        outcome: "Industry-ready exposure with hands-on case studies and live projects",
      },
      {
        name: "Tech Innovation Track",
        specializations_text: "Innovators Program",
        outcome: "Develop your innovation while you learn, with mentor support",
      },
    ],
  });

  const tracks = c.tracks as { name: string; specializations_text: string; outcome: string }[];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-4 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_main} <span className="gradient-text">{c.headline_highlight}</span>
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-sm mb-10 md:mb-16 max-w-2xl mx-auto px-4">
          {c.description}
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {tracks.map((track, index) => {
            const Icon = trackIcons[index % trackIcons.length];
            const color = trackColors[index % trackColors.length];
            const specializations = track.specializations_text.split("\n").map((s) => s.trim()).filter(Boolean);
            return (
              <div key={track.name} className="card-modern overflow-hidden group">
                <div className={`p-6 md:p-8 ${color} text-white text-center`}>
                  <div className="w-14 h-14 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl">
                    {track.name}
                  </h3>
                </div>

                <div className="p-6 md:p-8">
                  <ul className="space-y-3 mb-6">
                    {specializations.map((spec) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
