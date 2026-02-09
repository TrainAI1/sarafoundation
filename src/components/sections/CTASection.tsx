import { ArrowRight, Users, Building, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-white blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto px-4">
          <ScrollAnimation variant="scale-in">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm mb-6 md:mb-8">
              <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation variant="fade-up" delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 text-balance">
              Ready to Make a Difference?
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation variant="fade-up" delay={0.2}>
            <p className="text-base md:text-lg lg:text-xl text-white/70 mb-8 md:mb-12 max-w-2xl mx-auto">
              Whether you're a student looking to start your tech journey, an organization 
              seeking to partner, or a sponsor wanting to create impact — there's a place 
              for you at Sara Foundation Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/programs/cap">
                  <Users className="w-5 h-5" />
                  Join as a Student
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroSecondary" size="lg" className="group" asChild>
                <Link to="/contact">
                  <Building className="w-5 h-5" />
                  Become a Partner
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
