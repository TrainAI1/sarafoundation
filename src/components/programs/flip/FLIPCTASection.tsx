import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";

export function FLIPCTASection() {
  const { data: c } = usePageContent("flip-cta", {
    headline: "Register Today and Be Part of This Initiative",
    description:
      "Connect with inspiring women who are shaping the future of tech in Africa. " +
      "Join our community of women learning, mentoring and building in tech.",
    cta_primary_label: "Become a Member",
    cta_secondary_label: "Learn About Sara Foundation",
  });

  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="section-container text-center px-4">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
          {c.headline}
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          {c.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Button variant="hero" size="lg" className="group" asChild>
            <Link to="/programs/flip/apply">
              {c.cta_primary_label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="heroSecondary" size="lg" asChild>
            <Link to="/about">{c.cta_secondary_label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
