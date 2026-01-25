import { ArrowRight, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10">
            Whether you're a student looking to start your tech journey, an organization 
            seeking to partner, or a sponsor wanting to create impact — there's a place 
            for you at Sara Foundation Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              <Users className="w-5 h-5" />
              Join as a Student
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroSecondary" size="lg" className="group">
              <Building className="w-5 h-5" />
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
