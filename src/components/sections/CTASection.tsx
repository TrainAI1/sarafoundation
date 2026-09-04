import { ArrowRight, Heart, Building, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  headline: "Help widen access to digital education and tech inclusion",
  description: "Give, partner, mentor or volunteer to help more people learn, participate and contribute to their communities.",
  cta_primary: "Donate",
  cta_secondary: "Partner with Us",
  bg_image: "",
};

export function CTASection() {
  const { data: c } = usePageContent("home-cta", defaults);

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      {c.bg_image && (
        <div className="absolute inset-0 opacity-30">
          <img src={c.bg_image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto px-4">
          <ScrollAnimation variant="scale-in">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm mb-6 md:mb-8">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation variant="fade-up" delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 text-balance">
              {c.headline}
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation variant="fade-up" delay={0.2}>
            <p className="text-base md:text-lg lg:text-xl text-white/70 mb-8 md:mb-12 max-w-2xl mx-auto">
              {c.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/donation">
                  <Heart className="w-5 h-5" aria-hidden="true" />
                  {c.cta_primary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" className="group" asChild>
                <Link to="/partnership">
                  <Building className="w-5 h-5" aria-hidden="true" />
                  {c.cta_secondary}
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
