import { BookOpen, Rocket, Zap, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const phaseIcons = [BookOpen, Rocket, Zap];
const phaseColors = ["bg-primary", "bg-[hsl(240,80%,50%)]", "bg-accent"];

type Phase = {
  name: string;
  number: string;
  duration: string;
  description: string;
  outcomes_text: string;
};

type Program = {
  label: string;
  title: string;
  subtitle: string;
  totalDuration: string;
  phases: Phase[];
};

function PhaseBlock({ data }: { data: Program }) {
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
        {data.phases.map((phase, index) => {
          const Icon = phaseIcons[index % phaseIcons.length];
          const color = phaseColors[index % phaseColors.length];
          const outcomes = phase.outcomes_text.split("\n").map((o) => o.trim()).filter(Boolean);
          return (
            <div key={phase.name} className="card-modern overflow-hidden group relative">
              <div className={`p-5 md:p-6 ${color} text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
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
                  {outcomes.map((outcome) => (
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
          );
        })}
      </div>
    </div>
  );
}

export function CAPPhasesSection() {
  const { data: c } = usePageContent("cap-phases", {
    badge: "Program Structure",
    headline_main: "Learn.",
    headline_highlight: "Build. Launch.",
    description: "A full 6-week CAP experience built on an 80/20 balance of practice to taught learning.",
    program_label: "CAP Program",
    program_title: "6-Week Program for CAP",
    program_subtitle: "Community Access & Participation Pathway — learn, build, and launch.",
    program_total_duration: "6 Weeks",
    phases: [
      {
        name: "Exclusive Learning",
        number: "01",
        duration: "2 Weeks",
        description: "Immersive expert-led sessions across coding, no-code, product management, product marketing, cybersecurity, data, UI/UX and tech innovation.",
        outcomes_text: "Industry-expert sessions\nAI-powered curriculum\nPractical frameworks\nCommunity & peer learning",
      },
      {
        name: "Build While Learning",
        number: "02",
        duration: "4 Weeks",
        description: "Apply skills in real time — participants collaborate as a team, working on real African problems through mentored sprints.",
        outcomes_text: "Cross-track startup simulation\nReal-life project exposure\nIndustry mentor oversight\nPortfolio-ready projects",
      },
      {
        name: "Launch",
        number: "03",
        duration: "1 Week",
        description: "Learners present their work, share what they built and are referred to suitable further learning or experience opportunities where these are available.",
        outcomes_text: "Referrals to further learning and experience opportunities\nCertificate of completion and alumni community access\nCAP Talent Showcase\nContinued mentoring and peer support",
      },
    ],
  });

  const program: Program = {
    label: c.program_label,
    title: c.program_title,
    subtitle: c.program_subtitle,
    totalDuration: c.program_total_duration,
    phases: c.phases,
  };

  return (
    <section className="py-16 md:py-24 bg-background">
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

        <PhaseBlock data={program} />
      </div>
    </section>
  );
}
