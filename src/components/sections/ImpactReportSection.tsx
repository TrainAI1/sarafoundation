import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import capGraduates from "@/assets/cap-graduates-2025.jpg";

export function ImpactReportSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50 relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <ScrollAnimation variant="slide-left">
            <div>
              <span className="section-badge mb-4 md:mb-6">
                <FileText className="w-4 h-4" />
                2025 Impact Report
              </span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">
                Sara Foundation{" "}
                <span className="gradient-text">2025 Impact Report</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8">
                Our 2025 Impact Report showcases the incredible journey of Sara Foundation Africa — 
                from training 763+ students across 35+ universities in 8 African countries to launching 
                the FLIP Fellowship for women in tech. Discover how we're building the next generation 
                of African tech leaders.
              </p>


              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="default" size="lg" className="group" asChild>
                  <a href="https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                    Read Full Report
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>

          {/* Image */}
          <ScrollAnimation variant="slide-right">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={capGraduates}
                alt="Sara Foundation CAP Graduates 2025 celebration"
                className="w-full h-64 md:h-96 object-cover"
                loading="lazy"
              />
              <div className="bg-primary p-4 md:p-6 text-white text-center">
                <p className="font-display font-bold text-lg">CAP Graduates Class of 2025</p>
                <p className="text-white/70 text-sm">Celebrating our second cohort of tech leaders</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
