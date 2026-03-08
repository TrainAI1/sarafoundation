import { Handshake } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fallback images for seeded partners without uploaded logos
import scintillaImg from "@/assets/partners/scintilla.jpg";
import familyImg from "@/assets/partners/farmily.jpg";
import alxImg from "@/assets/partners/alx.png";
import kadarabriteImg from "@/assets/partners/kadarabrite.png";
import trainaiImg from "@/assets/partners/trainai.png";
import nanaadeImg from "@/assets/partners/nanaade.png";
import platformhubImg from "@/assets/partners/platformhub.png";

const fallbackImages: Record<string, string> = {
  "Scintilla Innovations": scintillaImg,
  "Farmily": familyImg,
  "ALX": alxImg,
  "KàdàràBrite": kadarabriteImg,
  "Train AI": trainaiImg,
  "Nanaade": nanaadeImg,
  "Platform Hub": platformhubImg,
};

export function StrategicPartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: partners = [] } = useQuery({
    queryKey: ["partners", "strategic"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .eq("category", "strategic")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 160;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  if (partners.length === 0) return null;

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
          {partners.map((partner) => {
            const imgSrc = partner.logo_url || fallbackImages[partner.name] || "";
            return (
              <div
                key={partner.id}
                className="flex-shrink-0 snap-center w-32 md:w-36 group/card"
              >
                <div className="aspect-square bg-background rounded-xl border border-border flex items-center justify-center p-4 hover:border-primary/30 hover:shadow-card transition-all duration-300">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={partner.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Handshake className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <p className="text-center mt-2 text-xs font-medium text-muted-foreground leading-tight">
                  {partner.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
