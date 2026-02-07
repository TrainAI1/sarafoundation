import { Users, BookOpen, Heart } from "lucide-react";
import womenCoworking from "@/assets/women-coworking.jpg";

const approaches = [
  {
    icon: Users,
    title: "Increase Representation",
    description: "FLIP Workshops and mentorship programs will inspire more women to pursue leadership roles and entrepreneurial ventures.",
  },
  {
    icon: BookOpen,
    title: "Improve Access to Resources",
    description: "FLIP's community and investor education sessions will make it easier for women to secure funding for their ideas and grow in their careers.",
  },
  {
    icon: Heart,
    title: "Empowerment Through Community",
    description: "FLIP's women founders and professionals network will provide the support system women need to overcome challenges and thrive.",
  },
];

export function FLIPGenderGapSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Our Approach</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            How FLIP Tackles the <span className="gradient-text-accent">Tech Gender Gap</span>
          </h2>
          <p className="section-subtitle mx-auto">
            The Female Leadership Initiative Program addresses identified gaps for women in African tech 
            through a multi-pronged approach leveraging the WPTA and WFTA initiatives.
          </p>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-16 px-4 lg:px-0">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={womenCoworking} 
              alt="African women collaborating in a co-working space"
              className="w-full h-48 md:h-72 object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
          {approaches.map((approach, index) => (
            <div key={approach.title} className="card-modern p-6 md:p-8 text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <approach.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
