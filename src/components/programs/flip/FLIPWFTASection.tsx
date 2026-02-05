import { Users, Rocket, DollarSign, Eye } from "lucide-react";
import womanFounderPitch from "@/assets/woman-founder-pitch.jpg";

const features = [
  {
    icon: Users,
    title: "Membership",
    description: "Open to women entrepreneurs in the tech space across Africa. Membership is tiered based on business stage (early-stage and growth stage) for tailored support.",
  },
  {
    icon: DollarSign,
    title: "Capacity Building & Funding",
    description: "Facilitate connections with investors and provide support with pitch decks, business model development, and fundraising strategies.",
  },
  {
    icon: Eye,
    title: "Community Support & Visibility",
    description: "A platform for women founders to network with like-minded female entrepreneurs, potential partners, and industry experts, fostering collaboration.",
  },
  {
    icon: Rocket,
    title: "Events & Resources",
    description: "Organize events and share resources to help founders accelerate their tech startup to foster growth and access opportunities leveraging the program network.",
  },
];

export function FLIPWFTASection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start px-4 lg:px-0">
          {/* Features */}
          <div className="space-y-4 order-2 lg:order-1">
            {features.map((feature) => (
              <div key={feature.title} className="card-modern p-4 md:p-6 flex gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
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
            ))}
          </div>

          {/* Header */}
          <div className="order-1 lg:order-2">
            <span className="section-badge mb-4 md:mb-6 bg-accent/10 text-accent">
              Community 2
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Women Founders In Tech Africa{" "}
              <span className="gradient-text-accent">(WFTA)</span>
            </h2>
            <p className="section-subtitle mb-6">
              Our initiative plays a pivotal role in closing gender gaps and fostering a thriving ecosystem 
              of female entrepreneurs. By providing access to funding opportunities, mentorship, training, 
              networking, and advocacy, we empower women to lead successful tech startups.
            </p>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={womanFounderPitch} 
                alt="Woman founder pitching to investors"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
