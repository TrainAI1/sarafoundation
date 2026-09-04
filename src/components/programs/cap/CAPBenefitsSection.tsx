import { BookOpen, Users, Presentation, Trophy, Wrench, MessagesSquare, Share2, Sparkles, HeartHandshake } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const benefitIcons = [BookOpen, Users, Sparkles, Trophy, Wrench, MessagesSquare, Presentation, Share2, HeartHandshake];

export function CAPBenefitsSection() {
  const { data: c } = usePageContent("cap-benefits", {
    badge: "Benefits to Participants",
    headline: "What CAP provides",
    benefits: [
      { title: "Structured digital learning", description: "Sessions and resources that build digital literacy and practical skills." },
      { title: "Mentoring and guided project support", description: "Mentors supporting learners through project work and reflection." },
      { title: "Workshops and expert sessions", description: "Practitioners sharing knowledge and current practice with learners." },
      { title: "Demo days and talent showcases", description: "Opportunities to present learning to peers and invited guests." },
      { title: "Practical activities", description: "Applied exercises that turn taught content into working knowledge." },
      { title: "Peer learning", description: "Learning alongside others facing similar barriers and questions." },
      { title: "Presentations", description: "Practice explaining work clearly to an audience." },
      { title: "Knowledge-sharing", description: "Learners passing on what they know within the community." },
      { title: "Community participation", description: "Learner-led projects and contribution back to local communities." },
    ],
  });

  const benefits = c.benefits as { title: string; description: string }[];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">{c.headline}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 lg:px-0">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return (
              <div key={benefit.title} className="card-modern p-5 md:p-6 h-full">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display font-bold text-base text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
