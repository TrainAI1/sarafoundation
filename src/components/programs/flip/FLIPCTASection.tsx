import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FLIPCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-accent via-accent/90 to-[hsl(350,80%,55%)]">
      <div className="section-container text-center px-4">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
          Register Today and Be Part of This Initiative
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          Connect with inspiring women who are shaping the future of tech in Africa. 
          Join our community of leaders, founders, and professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Button variant="hero" size="lg" className="group" asChild>
            <Link to="/programs/flip/apply">
              Become a Member
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="heroSecondary" size="lg" asChild>
            <Link to="/about">Learn About Sara Foundation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
