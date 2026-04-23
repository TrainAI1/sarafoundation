import { ArrowRight, Route, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function OutcomeFocusedSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <div className="section-container relative z-10">
        <ScrollAnimation variant="fade-up" className="max-w-5xl mx-auto px-4">
          <div className="card-modern p-6 md:p-10 lg:p-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-center hover:translate-y-0">
            <div>
              <span className="section-badge mb-5">
                <Target className="w-4 h-4" />
                Goal-led pathways
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-5">
                Outcome Focused Learning
              </h2>
              <p className="section-subtitle max-w-2xl">
                Close the gap between learning to earning with an AI learning pathway tailored to your goal.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-secondary/50 p-5 md:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Route className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Personalized pathway</p>
                  <p className="text-sm text-muted-foreground">Built around your next career milestone.</p>
                </div>
              </div>
              <Button className="w-full group" asChild>
                <Link to="/auth?mode=signup">
                  <Sparkles className="w-4 h-4" />
                  Sign Up
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}