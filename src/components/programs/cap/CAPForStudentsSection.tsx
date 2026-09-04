import { Wrench, Users, Briefcase, Rocket, Globe, BookOpen, Quote } from "lucide-react";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";

const benefitIcons = [Wrench, Users, Briefcase, Rocket, Globe, BookOpen];

export function CAPForStudentsSection() {
  const { data: c } = usePageContent("cap-for-students", {
    badge: "For Young People",
    headline: "Everything you need to build practical tech skills and keep learning.",
    image: "",
    quote_text: "CAP has given me a solid foundation in both front-end and back-end development. I now feel more prepared, more skilled, and more confident.",
    quote_author: "— Taiwo, FUOYE, Nigeria",
    benefits: [
      {
        title: "Real-World Skills",
        description: "Coding, product management, UI/UX, business analysis grounded in hands-on practice.",
      },
      {
        title: "Industry Mentorship",
        description: "Weekly sessions with experienced practitioners who guide each participant's learning journey.",
      },
      {
        title: "Referrals to Further Learning & Experience",
        description: "Some CAP participants have continued their journeys through internships and roles with organisations in our network, such as Farmily and Scintilla Africa. Employment is not guaranteed.",
      },
      {
        title: "Build a Real Project",
        description: "Launch phase teams have built working projects such as ArtifyPro and Campuslink.",
      },
      {
        title: "Pan-African Network",
        description: "Join a community spanning 35 universities across the 8 African countries CAP reaches.",
      },
      {
        title: "Free Learning Resources",
        description: "Access course materials, certifications, and partner discounts from ALX Africa and more all inclusive.",
      },
    ],
  });

  const benefits = c.benefits as { title: string; description: string }[];
  const image = c.image ? assetUrl(c.image) : capHappyCoder;

  return (
    <section className="py-16 md:py-24 bg-background">
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
                alt="A CAP learner coding during a practical session"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="card-modern p-5 bg-primary/5 border-l-4 border-l-primary">
              <Quote className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm text-foreground italic mb-3">
                "{c.quote_text}"
              </p>
              <p className="text-xs text-muted-foreground font-semibold">{c.quote_author}</p>
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
