import { ArrowRight, Users, Building, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-white blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Whether you're a student looking to start your tech journey, an organization 
            seeking to partner, or a sponsor wanting to create impact — there's a place 
            for you at Sara Foundation Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
    </section>
  );
}
