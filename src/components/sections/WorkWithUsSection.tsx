import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";

export function WorkWithUsSection() {
  const { data: c } = usePageContent("home-work-with-us", {
    badge: "Work with Us",
    headline: "Empowering people through tech learning, inclusion and opportunity to build stronger communities.",
    subheadline: "Join Us, Partner with Us, and Donate for Africa's Future.",
  });

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <ScrollAnimation variant="fade-up">
            <div className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
              {c.badge}
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant="fade-up" delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {c.headline}
            </h2>
          </ScrollAnimation>

          <ScrollAnimation variant="fade-up" delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-10">
              {c.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
                <Link to="/donation">
                  Donate
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/partnership">
                  Partner with Us
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
