import { Handshake } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import scintillaImg from "@/assets/partners/scintilla.png";
import familyImg from "@/assets/partners/farmily.jpg";
import alxImg from "@/assets/partners/alx.png";
import kadarabriteImg from "@/assets/partners/kadarabrite.png";
import trainaiImg from "@/assets/partners/trainai.jpg";
import nanaadeImg from "@/assets/partners/nanaade.png";
import platformhubImg from "@/assets/partners/platformhub.png";
import analyticsImg from "@/assets/partners/10analytics.jpg";

const partners = [
  { name: "Scintilla Innovations", image: scintillaImg },
  { name: "Farmily", image: familyImg },
  { name: "ALX", image: alxImg },
  { name: "KàdàràBrite", image: kadarabriteImg },
  { name: "Train AI", image: trainaiImg },
  { name: "Nanaade", image: nanaadeImg },
  { name: "Platform Hub", image: platformhubImg },
  { name: "10 Analytics", image: analyticsImg },
];

export function StrategicPartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 160;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10 md:py-16 bg-secondary/50">
      <div className="section-container">
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-6 md:mb-10 px-4">
          <span className="section-badge mb-3 md:mb-4">
            <Handshake className="w-4 h-4" />
            Strategic Partners
          </span>
          <h2 className="section-title text-foreground mb-3">
            Powered by <span className="gradient-text-accent">Key Partnerships</span>
          </h2>
        </ScrollAnimation>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/90 border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex-shrink-0 snap-center w-32 md:w-36 group/card"
            >
              <div className="aspect-square bg-background rounded-xl border border-border flex items-center justify-center p-4 hover:border-primary/30 hover:shadow-card transition-all duration-300">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center mt-2 text-xs font-medium text-muted-foreground leading-tight">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
