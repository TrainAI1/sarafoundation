import { GraduationCap, Users, Gift, TrendingUp, Globe, Award } from "lucide-react";
import { Quote } from "lucide-react";
import capWomenGroup from "@/assets/cap-women-group.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";

const benefitIcons = [GraduationCap, Users, Gift, TrendingUp, Globe, Award];

export function CAPForSchoolsSection() {
  const { data: c } = usePageContent("cap-for-schools", {
    badge: "For School Associations",
    headline: "Partner with CAP to become a hub for Africa's next wave of tech innovators.",
    image: "",
    quote_text: "These weekly expert sessions have made my experience with CAP excellent so far.",
    quote_author: "— Ridwan, 300 level, University of Lagos CAP Tech Hub member (2024 Impact Report)",
    benefits: [
      {
        title: "Best Way to Learn and Practice Tech Skills",
        description: "Our program focus on practical exposure makes CAP Alumni stand out. This will position your institution as a leading centre of tech innovation and employability across Africa.",
      },
      {
        title: "Community Engagement & Retention",
        description: "CAP-run hubs create vibrant multi-university learning communities, allowing young people to connect with peers across 8 African countries and 35 different universities.",
      },
      {
        title: "Unlock Scholarships",
        description: "Partnering associations unlock scholarships and subsidised places, so their student members can take part in CAP at a reduced cost or none at all.",
      },
      {
        title: "Continued Learning Journeys",
        description: "CAP participants have gone on to internships, further learning and project work with organisations in our network.",
      },
      {
        title: "Pan-African Visibility",
        description: "Join a network of 35 universities across 8 African countries reached by CAP, within a foundation working across 11 countries.",
      },
      {
        title: "Award-Winning Programme",
        description: "Sara Foundation is a 2025/26 London & South East England Prestige Award winner in Leadership Development.",
      },
    ],
  });

  const benefits = c.benefits as { title: string; description: string }[];
  const image = c.image ? assetUrl(c.image) : capWomenGroup;

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 px-4 lg:px-0">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              {c.headline}
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                src={image}
                alt="Young people collaborating at a CAP Tech Hub"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="card-modern p-5 bg-primary/5 border-l-4 border-l-primary">
              <Quote className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm text-foreground italic mb-3">
                "{c.quote_text}"
              </p>
              <p className="text-xs text-muted-foreground font-semibold">
                {c.quote_author}
              </p>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index % benefitIcons.length];
              return (
                <div key={benefit.title} className="card-modern p-5 md:p-6 group hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
