import { Briefcase, Users, Network, Megaphone, BookOpen, LucideIcon } from "lucide-react";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";

const featureIcons: LucideIcon[] = [Users, Briefcase, Network, Megaphone, BookOpen];

const defaultFeatures = [
  {
    title: "Mentor-Mentee Programs",
    description: "Members in the early or mid level of their careers are paired with senior professionals for career guidance and support.",
  },
  {
    title: "Membership",
    description: "Open to Women Professionals who work in code and no-code roles such as Software Engineering, Product Management, UI/UX Design, and Business Analysis.",
  },
  {
    title: "Networking Opportunities",
    description: "Join a vibrant network of professionals and gain access to regular meetups, conferences, and workshops focused on professional development.",
  },
  {
    title: "Women Advocacy",
    description: "We promote the voices of women leaders in tech and advocate for innovation, reduced gender bias and barriers faced by women in the workplace.",
  },
  {
    title: "Access to Resources & Jobs",
    description: "Access materials and resources to deepen your learning and get connected to employers and job prospects in technology in Africa.",
  },
];

export function FLIPWPTASection() {
  const { data: c } = usePageContent("flip-wpta", {
    badge: "Community 1",
    headline_pre: "Women Professionals In Tech Africa",
    headline_accent: "(WPTA)",
    description:
      "Our initiative fosters a vibrant community that empowers women professionals in African tech, " +
      "bridging the gender gap, and propelling them towards leadership positions and career development.",
    image: "",
    features: defaultFeatures,
  });

  const features = c.features as typeof defaultFeatures;
  const image = c.image ? assetUrl(c.image) : womenTechLeaders;

  return (
    <section id="communities" className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start px-4 lg:px-0">
          {/* Header */}
          <div>
            <span className="section-badge mb-4 md:mb-6 bg-primary/10 text-primary">
              {c.badge}
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              {c.headline_pre}{" "}
              <span className="gradient-text">{c.headline_accent}</span>
            </h2>
            <p className="section-subtitle mb-6">
              {c.description}
            </p>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <img
                src={image}
                alt="Women professionals in tech Africa"
                className="w-full h-48 md:h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = womenTechLeaders;
                }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <div key={feature.title} className="card-modern p-4 md:p-6 flex gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
