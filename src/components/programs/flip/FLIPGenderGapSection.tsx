import { Users, BookOpen, Heart, LucideIcon } from "lucide-react";
import womenInTechWorkshop from "@/assets/success-stories/linkedin/linkedin-8.jpg.asset.json";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const approachIcons: LucideIcon[] = [Users, BookOpen, Heart];

const defaultApproaches = [
  {
    title: "Increase Representation",
    description: "FLIP workshops and mentoring inspire more women to pursue leadership roles and tech innovation.",
  },
  {
    title: "Improve Access to Resources",
    description: "FLIP's community and investor education sessions will make it easier for women to secure funding for their ideas and grow in their careers.",
  },
  {
    title: "Empowerment Through Community",
    description: "The FLIP community provides the support system women need to overcome barriers and keep progressing.",
  },
];

export function FLIPGenderGapSection() {
  const { data: c } = usePageContent("flip-gender-gap", {
    badge: "Our Approach",
    headline_pre: "How FLIP Tackles the",
    headline_accent: "Tech Gender Gap",
    description:
      "The Female Learning & Inclusion Pathway addresses identified gaps for women in African tech " +
      "through the FLIP Fellowship, FLIP Workshops and FLIP Conferences.",
    image: "",
    approaches: defaultApproaches,
  });

  const approaches = c.approaches as typeof defaultApproaches;
  const fallbackImage = assetUrl(womenInTechWorkshop);
  const image = c.image ? assetUrl(c.image) : fallbackImage;

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="section-container">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 md:gap-14 items-start px-4 lg:px-0">
          <ScrollAnimation variant="fade-up" className="lg:sticky lg:top-28">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_pre} <span className="gradient-text-accent">{c.headline_accent}</span>
          </h2>
          <p className="section-subtitle">
            {c.description}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg mt-7">
            <img
              src={image}
              alt="Sara Foundation Women in Tech workshop announcement"
              className="w-full h-48 md:h-64 object-cover"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>
          </ScrollAnimation>

        <StaggerContainer className="divide-y divide-border border-y border-border" staggerDelay={0.1}>
          {approaches.map((approach) => {
            const Icon = approachIcons[index % approachIcons.length];
            return (
              <StaggerItem key={approach.title} variant="fade-up">
              <div className="py-6 md:py-8 flex gap-5 md:gap-7 items-start group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-3">
                  {approach.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {approach.description}
                </p>
                </div>
              </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
