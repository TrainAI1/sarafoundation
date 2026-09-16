import { Award, Handshake } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import scintillaImg from "@/assets/partners/scintilla.png";
import farmilyImg from "@/assets/partners/farmily.jpg";
import trainaiImg from "@/assets/partners/trainai.png";
import nanaadeImg from "@/assets/partners/nanaade.png";
import alxImg from "@/assets/partners/alx.png";
import kadarabriteImg from "@/assets/partners/kadarabrite.png";
import platformhubImg from "@/assets/partners/platformhub.png";

// Same logo set the homepage Strategic Partners row uses.
const logoFallbacks: Record<string, string> = {
  "Scintilla Innovations": scintillaImg,
  "Scintilla Africa": scintillaImg,
  "Scintilla": scintillaImg,
  "Farmily": farmilyImg,
  "Train AI": trainaiImg,
  "Nanaade AI": nanaadeImg,
  "Nanaade": nanaadeImg,
  "ALX": alxImg,
  "KàdàràBrite": kadarabriteImg,
  "Platform Hub": platformhubImg,
};

const findLogo = (name: string, dbLogos: Record<string, string>) => {
  const key = Object.keys(dbLogos).find((n) => n.toLowerCase().startsWith(name.toLowerCase().split(" ")[0]));
  return (key && dbLogos[key]) || logoFallbacks[name] || "";
};

export function CAPRecognitionSection() {
  const { data: c } = usePageContent("cap-recognition", {
    badge: "Recognition & Partners",
    headline_main: "Trusted. Recognised.",
    headline_highlight: "Growing.",
    award_title: "Prestige Award Winner 2025/26",
    award_category: "London & South East England — Leadership Development Category",
    award_quote: "This recognition honours organisations making meaningful impact within their communities and reinforces our position as a rising African nonprofit shaping the next generation of innovators.",
    partners_title: "Strategic Partners",
    partners: [
      { name: "Scintilla Africa", role: "Industry exposure and experiential learning opportunities" },
      { name: "Farmily", role: "Host organisation for continued learning journeys" },
      { name: "Train AI", role: "EdTech platform supporting learners' journeys" },
      { name: "Nanaade AI", role: "Work-readiness education support" },
    ],
    footer_text: "Sara Foundation is a London based Non-Profit Organization established by Africans to drive technology focused impact in Africa, by fostering Diversity, Equity and Inclusion and developing the next generation of African tech innovators.",
  });

  const partners = c.partners as { name: string; role: string }[];

  const { data: dbLogos = {} } = useQuery({
    queryKey: ["partners", "logos"],
    queryFn: async () => {
      const { data } = await supabase.from("partners").select("name, logo_url").eq("is_active", true);
      return Object.fromEntries((data || []).filter((p) => p.logo_url).map((p) => [p.name, p.logo_url as string]));
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_main} <span className="gradient-text">{c.headline_highlight}</span>
          </h2>
        </div>

        {/* Award */}
        <div className="max-w-2xl mx-auto mb-12 px-4">
          <div className="card-modern p-6 md:p-8 text-center bg-primary/5 border-primary/20">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-foreground mb-1">
              {c.award_title}
            </h3>
            <p className="text-primary font-medium text-sm mb-3">
              {c.award_category}
            </p>
            <p className="text-muted-foreground text-sm italic max-w-lg mx-auto">
              "{c.award_quote}"
            </p>
          </div>
        </div>

        {/* Partners */}
        <div className="px-4 lg:px-0">
          <h3 className="font-display font-bold text-lg text-foreground text-center mb-6">{c.partners_title}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {partners.map((partner) => {
              const logo = findLogo(partner.name, dbLogos);
              return (
                <div key={partner.name} className="card-modern p-5 md:p-6 text-center flex flex-col items-center">
                  <div className="w-full h-20 mb-4 flex items-center justify-center">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        className="max-h-20 max-w-[70%] object-contain"
                      />
                    ) : (
                      <Handshake className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-base text-foreground mb-2">{partner.name}</h4>
                  <p className="text-muted-foreground text-xs">{partner.role}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto px-4">
          {c.footer_text}
        </p>
      </div>
    </section>
  );
}
