import { TrendingUp, Users, GraduationCap, HandCoins, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import impactLecture from "@/assets/impact-lecture.jpg";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";

export function ImpactSection() {
  const { data: c } = usePageContent("home-impact", {
    reach_value: "6,000+",
    reach_desc: "People reached through our channels, events and community activity. Reach is not the same as learners trained.",
    scholarships_value: "1,600",
    scholarships_desc: "Fully funded and subsidised places provided across our pathways.",
    learners_value: "763",
    learners_desc: "CAP learners who received fully funded access across Cohorts 1 and 2.",
    ai_value: "170",
    ai_desc: "AI training places delivered with partner organisations.",
  });

  const impactStats = [
    { icon: TrendingUp, value: c.reach_value, label: "Community Reach", description: c.reach_desc },
    { icon: HandCoins, value: c.scholarships_value, label: "Scholarships Provided", description: c.scholarships_desc },
    { icon: GraduationCap, value: c.learners_value, label: "CAP Learners", description: c.learners_desc },
    { icon: Sparkles, value: c.ai_value, label: "AI Training Places", description: c.ai_desc },
  ];

  return (
    <section className="py-16 md:py-24 bg-foreground relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-16">
          <ScrollAnimation variant="slide-left">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
                <TrendingUp className="w-4 h-4 text-accent" aria-hidden="true" />
                Our Impact at a Glance
              </span>
              <h2 className="section-title text-white mb-6">
                What access to learning{" "}
                <span className="text-accent">has made possible</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mx-auto lg:mx-0">
                Each figure below measures a different thing. People reached, scholarships provided,
                learners trained and training places are counted separately and are not unique individuals.
              </p>
              <div className="mt-8">
                <Button variant="accent" size="lg" className="group" asChild>
                  <Link to="/projects">
                    See Our Impact
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation variant="slide-right">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={impactLecture}
                alt="Participants at a Sara Foundation Africa knowledge session"
                className="w-full h-56 md:h-72 object-cover"
                loading="lazy"
              />
            </div>
          </ScrollAnimation>
        </div>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.08}>
          {impactStats.map((stat) => (
            <StaggerItem key={stat.label} variant="scale-in">
              <div className="glass-card-dark p-5 md:p-7 text-center h-full group hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-primary/30 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-display text-white mb-1">{stat.value}</div>
                <div className="text-white font-medium text-sm mb-2">{stat.label}</div>
                <p className="text-white/50 text-xs leading-relaxed">{stat.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
