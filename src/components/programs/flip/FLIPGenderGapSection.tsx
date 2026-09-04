import { Users, BookOpen, Heart, LucideIcon } from "lucide-react";
import womenCoworking from "@/assets/women-coworking.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";

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
  const image = c.image ? assetUrl(c.image) : womenCoworking;

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_pre} <span className="gradient-text-accent">{c.headline_accent}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {c.description}
          </p>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-16 px-4 lg:px-0">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt="African women collaborating in a co-working space"
              className="w-full h-48 md:h-72 object-cover"
              onError={(e) => {
                e.currentTarget.src = womenCoworking;
              }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {approaches.map((approach, index) => {
            const Icon = approachIcons[index % approachIcons.length];
            return (
              <div key={approach.title} className="card-modern p-6 md:p-8 text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-accent flex items-center justify-center mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-display text-accent/20 mb-2">
                  0{index + 1}
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-3">
                  {approach.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {approach.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
