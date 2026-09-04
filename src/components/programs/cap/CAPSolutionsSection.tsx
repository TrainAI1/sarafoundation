import { CheckCircle2, Target, Eye, Heart } from "lucide-react";
import capWomanLaptop from "@/assets/cap-woman-laptop.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";

export function CAPSolutionsSection() {
  const { data: c } = usePageContent("cap-solutions", {
    badge: "About CAP",
    headline_main: "What is the",
    headline_highlight: "Community Access & Participation Pathway?",
    description: "CAP is a 6-week intensive, learner-led tech hub programme delivered with African universities built on practical learning.",
    image: "",
    features: [
      { text: "Structured Learn → Build → Launch curriculum" },
      { text: "3 specialist tracks: Code, No-Code, Tech-preneurship" },
      { text: "Industry-expert-led weekly sessions" },
      { text: "Real startup projects solving African problems" },
      { text: "Internship pathways on completion" },
      { text: "Part of a network across 35 universities in 8 African countries" },
    ],
    vision_text: "Empowering young people across Africa through technology to drive innovation, tech innovation and socio-economic development.",
    mission_text: "Provide a platform for young people across Africa to explore, learn and apply technology — fostering collaboration, skill and leadership.",
    values_text: "Innovation · Collaboration · Diversity, Equity & Inclusion · Do Well and Do Good",
  });

  const features = c.features as { text: string }[];
  const image = c.image ? assetUrl(c.image) : capWomanLaptop;

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

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center px-4 lg:px-0 mb-12">
          <div>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt="A CAP learner working on a laptop"
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          <div className="card-modern p-6 md:p-8 border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">Vision</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              {c.vision_text}
            </p>
          </div>
          <div className="card-modern p-6 md:p-8 border-l-4 border-l-accent">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-accent" />
              <h3 className="font-display font-bold text-lg text-foreground">Mission</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              {c.mission_text}
            </p>
          </div>
          <div className="card-modern p-6 md:p-8 border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="font-display font-bold text-lg text-foreground">Core Values</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              {c.values_text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
