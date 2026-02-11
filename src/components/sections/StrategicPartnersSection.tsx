import { Handshake } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import scintillaImg from "@/assets/partners/scintilla.jpg";
import familyImg from "@/assets/partners/farmily.jpg";
import alxImg from "@/assets/partners/alx.jpg";
import kadarabriteImg from "@/assets/partners/kadarabrite.jpg";
import trainaiImg from "@/assets/partners/trainai.jpg";
import nanaadeImg from "@/assets/partners/nanaade.jpg";
import platformhubImg from "@/assets/partners/platformhub.jpg";
import analyticsImg from "@/assets/partners/10analytics.jpg";

const partners = [
  {
    name: "Scintilla Innovations",
    description: "Industry exposure, recruitment pathways & student assessments",
    image: scintillaImg,
  },
  {
    name: "Farmily",
    description: "Internship placements for outstanding CAP students",
    image: familyImg,
  },
  {
    name: "ALX",
    description: "Tech education and career development partnership",
    image: alxImg,
  },
  {
    name: "KàdàràBrite",
    description: "Expanding access to orphans for tech training initiatives",
    image: kadarabriteImg,
  },
  {
    name: "Train AI",
    description: "Centralising students in an edtech app for their tech journey",
    image: trainaiImg,
  },
  {
    name: "Nanaade",
    description: "CV and recruitment preparation support for students",
    image: nanaadeImg,
  },
  {
    name: "Platform Hub",
    description: "Expanding women impact initiatives and reach",
    image: platformhubImg,
  },
  {
    name: "10 Analytics",
    description: "Tech scholarships for students to develop analytics skills",
    image: analyticsImg,
  },
];

export function StrategicPartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="section-container">
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
          <span className="section-badge mb-4 md:mb-6">
            <Handshake className="w-4 h-4" />
            Strategic Partners
          </span>
          <h2 className="section-title text-foreground mb-4">
            Powered by <span className="gradient-text-accent">Key Partnerships</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our collaborators help us open doors to mentorship, internships, and real-world exposure for African tech talent.
          </p>
        </ScrollAnimation>
      </div>

      {/* Scrollable row */}
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/90 border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex-shrink-0 snap-center w-56 md:w-64 card-modern overflow-hidden group/card"
            >
              <div className="aspect-square bg-background flex items-center justify-center p-6 md:p-8">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-5 text-center border-t border-border">
                <h3 className="font-display font-bold text-sm md:text-base text-foreground mb-1">
                  {partner.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
