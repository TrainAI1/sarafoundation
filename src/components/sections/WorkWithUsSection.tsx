import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function WorkWithUsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-white/20 blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 text-accent" />
            Work with Us
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            We are on a mission to empower the next generation of tech founders and professionals.
          </h2>
          
          <p className="text-xl text-white/70 mb-10">
            Join Us, Partner with Us, and Donate for Africa's Future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/donation">
                Donate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="lg" asChild>
              <Link to="/partnership">
                Partner with Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
