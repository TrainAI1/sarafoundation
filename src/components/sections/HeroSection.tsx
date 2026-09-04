import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { assetUrl } from "@/lib/assetUrl";
import eventGroupPhoto from "@/assets/events/DSC_3409.jpg.asset.json";
import eventStudentMic from "@/assets/events/DSC_3253.jpg.asset.json";
import eventSpeaker from "@/assets/events/DSC_3240.jpg.asset.json";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";
import capWomenGroup from "@/assets/cap-women-group.jpg";
import capWomanBraids from "@/assets/cap-woman-braids.jpg";
import youngDeveloper from "@/assets/young-developer.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import womanFounderPitch from "@/assets/woman-founder-pitch.jpg";

const defaults = {
  headline_1: "Expanding Access to Digital Learning.",
  headline_2: "Building Inclusive Communities.",
  headline_3: "Supporting Tech Innovation.",
  subheadline: "Sara Foundation Africa is an NGO widening access to digital inclusion, tech learning and innovation for young people, women and underserved communities in Africa.",
  cta_primary: "Donate",
  cta_secondary: "Explore Our Work",
  cta_tertiary: "Partner with Us",
  badge: "Education. Inclusion. Community Impact.",
  hero_image: "/hero-students.jpg",
};

type MarqueeCard = {
  src: string;
  name: string;
  role: string;
  tone: "light" | "dark" | "accent";
};

const defaultMarqueeCards: MarqueeCard[] = [
  { src: capHappyCoder, name: "CAP Tech Hub", role: "Practical learning session", tone: "light" },
  { src: "", name: "57", role: "Women across FLIP fellowship & mentorship", tone: "accent" },
  { src: assetUrl(eventGroupPhoto), name: "CAP Tech Hub", role: "Cohort group photo", tone: "dark" },
  { src: youngDeveloper, name: "CAP learner", role: "Learner-led project build", tone: "light" },
  { src: "", name: "11", role: "African countries reached", tone: "accent" },
  { src: techEntrepreneurs, name: "Demo Day", role: "CAP Cohort 1 project showcase", tone: "dark" },
  { src: assetUrl(eventStudentMic), name: "CAP learner", role: "Q&A during a live session", tone: "light" },
  { src: capWomenGroup, name: "FLIP community", role: "Peer learning and mentoring", tone: "dark" },
  { src: womanFounderPitch, name: "Talent Showcase", role: "Presenting learner projects", tone: "light" },
  { src: assetUrl(eventSpeaker), name: "Expert session", role: "Speaker at a CAP Tech Hub event", tone: "dark" },
  { src: "", name: "763", role: "CAP learners fully funded", tone: "accent" },
  { src: capWomanBraids, name: "FLIP workshop", role: "Inclusive learning activity", tone: "light" },
];



export function HeroSection() {
  const { data: c } = usePageContent("home-hero", defaults);

  const { data: dbMarqueeCards } = useQuery({
    queryKey: ["hero-marquee-cards"],
    queryFn: async () => {
      const { data } = await supabase.from("pages").select("content").eq("slug", "hero-marquee").maybeSingle();
      if (!data?.content) return null;
      const content = data.content as Record<string, unknown>;
      return content.items as MarqueeCard[] | undefined;
    },
  });

  const cardsToRender = dbMarqueeCards && dbMarqueeCards.length > 0 ? dbMarqueeCards : defaultMarqueeCards;
  const loop = [...cardsToRender, ...cardsToRender];

  return (
    <section className="relative overflow-hidden">
      {/* Plain page background */}
      <div className="absolute inset-0 bg-background" />


      <div className="section-container relative z-10 pt-24 md:pt-28 pb-8 md:pb-12 w-full">
        <div className="flex flex-col items-center text-center text-foreground space-y-4 md:space-y-5 max-w-3xl mx-auto px-2">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[26px] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            {c.headline_1 || "Breaking Barriers,"}{" "}
            <span className="italic gradient-text">{c.headline_2 || "Igniting Innovation,"}</span>{" "}
            {c.headline_3 || "Empowering Dreams."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[13px] leading-relaxed md:text-base text-muted-foreground max-w-xl px-2"
          >
            {c.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto pt-1"
          >
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <Link to="/donation">
                {c.cta_primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/our-work">{c.cta_secondary}</Link>
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/partnership">{c.cta_tertiary}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Marquee — full-bleed edge-to-edge scrolling cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative left-1/2 -ml-[50vw] mt-6 md:mt-10 w-screen max-w-none"
        >
          <div className="overflow-hidden w-full py-4 md:py-6">
            <div
              className="flex items-center gap-2.5 md:gap-4 w-max animate-scroll-left will-change-transform"
              style={{ animationDuration: "70s" }}
            >
              {loop.map((card, i) => {
                // Stagger: alternating heights and slight tilt
                const variant = i % 4;
                const heightClass =
                  variant === 0
                    ? "h-[150px] md:h-[220px]"
                    : variant === 1
                    ? "h-[120px] md:h-[170px]"
                    : variant === 2
                    ? "h-[165px] md:h-[240px]"
                    : "h-[135px] md:h-[190px]";
                const widthClass =
                  card.tone === "accent"
                    ? "w-[95px] md:w-[130px]"
                    : "w-[110px] md:w-[160px]";
                const tilt =
                  variant === 0
                    ? "rotate-[-1.5deg] md:rotate-[-3deg]"
                    : variant === 1
                    ? "rotate-[1deg] md:rotate-[2deg]"
                    : variant === 2
                    ? "rotate-[-0.5deg] md:rotate-[-1.5deg]"
                    : "rotate-[1.5deg] md:rotate-[3deg]";
                const offset =
                  variant % 2 === 0
                    ? "-translate-y-1 md:-translate-y-2"
                    : "translate-y-1.5 md:translate-y-3";
                return (
                  <div
                    key={`${card.name}-${i}`}
                    className={`relative shrink-0 ${widthClass} ${heightClass} ${tilt} ${offset} rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl ring-1 ring-white/10 ${
                      card.tone === "accent"
                        ? "bg-accent"
                        : card.tone === "dark"
                        ? "bg-[hsl(240,40%,15%)]"
                        : "bg-white"
                    }`}
                  >
                    {card.tone !== "accent" && (
                      <img
                        src={card.src}
                        alt={`Sara Foundation Africa programme activity — ${card.role}`}
                        loading={i < 4 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = capHappyCoder;
                        }}
                      />
                    )}
                    {card.tone === "accent" ? (
                      <div className="relative h-full flex flex-col justify-between p-2.5 md:p-3 text-white">
                        <div className="font-display text-xl md:text-3xl font-bold leading-none">
                          {card.name}
                        </div>
                        <div className="text-[9px] md:text-[10px] uppercase tracking-wider opacity-90 leading-tight">
                          {card.role}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-black/85 text-white">
                        <div className="font-semibold text-[11px] md:text-sm leading-tight">{card.name}</div>
                        <div className="text-[9px] md:text-[10px] text-white/80 leading-tight">{card.role}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
