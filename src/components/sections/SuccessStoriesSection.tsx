import { Quote, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const stories = [
  {
    name: "Chiamaka O.",
    role: "CAP Alumna · Frontend Engineer",
    location: "Lagos, Nigeria",
    quote:
      "I joined CAP with no coding background. Nine months later I shipped my first product at our Talent Showcase and landed a frontend role with a fintech the same quarter.",
    outcome: "Hired at a Lagos fintech, 3 months after graduation",
  },
  {
    name: "Amara N.",
    role: "FLIP Fellow · Product Manager",
    location: "Accra, Ghana",
    quote:
      "FLIP gave me mentors who looked like me and a peer circle that still meets monthly. I went from junior analyst to PM at a pan-African scale-up within a year.",
    outcome: "Promoted to PM within 12 months of joining FLIP",
  },
  {
    name: "Tunde A.",
    role: "GJP Placement · Public Sector Tech",
    location: "Abuja, Nigeria",
    quote:
      "Through GJP I got placed in a federal ministry's digital team. I'm now helping digitise services that touch millions of Nigerians every month.",
    outcome: "12-month paid placement in a federal ministry",
  },
];

export function SuccessStoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <ScrollAnimation variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              Success Stories
            </span>
            <h2 className="section-title text-foreground mb-4">
              Real graduates. <span className="gradient-text">Real outcomes.</span>
            </h2>
            <p className="section-subtitle">
              Behind every statistic is a person whose career trajectory changed. Here are a few of the
              alumni, fellows, and placements building the next era of African tech.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {stories.map((s) => (
            <StaggerItem key={s.name} variant="fade-up">
              <Card className="p-6 h-full flex flex-col hover:shadow-xl transition-shadow">
                <Quote className="w-8 h-8 text-primary/40 mb-3" />
                <p className="text-foreground/80 leading-relaxed mb-6 flex-1">"{s.quote}"</p>
                <div className="border-t pt-4">
                  <div className="font-display font-bold text-foreground">{s.name}</div>
                  <div className="text-sm text-primary font-medium">{s.role}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.location}</div>
                  <div className="mt-3 inline-flex text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    {s.outcome}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">Read more alumni stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}