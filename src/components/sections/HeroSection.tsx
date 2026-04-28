import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";
import capHappyCoder from "@/assets/cap-happy-coder.jpg";
import capWomanLaptop from "@/assets/cap-woman-laptop.jpg";
import capWomanSmiling from "@/assets/cap-woman-smiling.jpg";
import capWomanYellow from "@/assets/cap-woman-yellow.jpg";
import capWomenGroup from "@/assets/cap-women-group.jpg";
import capManStudying from "@/assets/cap-man-studying.jpg";
import capWomanBraids from "@/assets/cap-woman-braids.jpg";
import youngDeveloper from "@/assets/young-developer.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import techEntrepreneurs from "@/assets/tech-entrepreneurs.jpg";
import womanFounderPitch from "@/assets/woman-founder-pitch.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

const defaults = {
  headline_1: "Breaking Barriers,",
  headline_2: "Igniting Innovation,",
  headline_3: "Empowering Dreams.",
  subheadline: "We're on a mission to empower the next generation of tech founders and professionals in Africa through inclusive programs that foster innovation and leadership.",
  cta_primary: "Join Our Mission",
  cta_secondary: "Partner with Us",
  badge: "Empowering African Tech Talent",
  hero_image: "/hero-students.jpg",
};

type MarqueeCard = {
  src: string;
  name: string;
  role: string;
  tone: "light" | "dark" | "accent";
};

const marqueeCards: MarqueeCard[] = [
  { src: capHappyCoder, name: "Adaeze N.", role: "CAP Fellow, Nigeria", tone: "light" },
  { src: womenTechLeaders, name: "200+", role: "Women in Tech", tone: "accent" },
  { src: capWomanLaptop, name: "Fatima K.", role: "Frontend Track, Ghana", tone: "dark" },
  { src: youngDeveloper, name: "Samuel O.", role: "Backend Track, Kenya", tone: "light" },
  { src: capWomanYellow, name: "8", role: "Countries Reached", tone: "accent" },
  { src: techEntrepreneurs, name: "Founders Lab", role: "Cohort 3", tone: "dark" },
  { src: capWomanSmiling, name: "Chiamaka U.", role: "Product Track", tone: "light" },
  { src: capWomenGroup, name: "FLIP Circle", role: "Lagos Chapter", tone: "dark" },
  { src: womanFounderPitch, name: "Pitch Day", role: "Demo Showcase", tone: "light" },
  { src: capManStudying, name: "Daniel A.", role: "Data Track, Rwanda", tone: "dark" },
  { src: graduatesCelebration, name: "500+", role: "Alumni & Graduates", tone: "accent" },
  { src: capWomanBraids, name: "Aisha M.", role: "Design Track, Uganda", tone: "light" },
];

export function HeroSection() {
  const { data: c } = usePageContent("home-hero", defaults);
  const loop = [...marqueeCards, ...marqueeCards];

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/40 blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-white/20 blur-[100px] animate-float-delayed" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="section-container relative z-10 pt-20 md:pt-24 pb-6 md:pb-8 w-full flex-1 flex flex-col">
        <div className="flex flex-col items-center text-center text-white space-y-4 md:space-y-5 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1]"
          >
            {c.headline_1 || "Breaking Barriers,"}{" "}
            <span className="text-white/90 italic">{c.headline_2 || "Igniting Innovation,"}</span>{" "}
            {c.headline_3 || "Empowering Dreams."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm md:text-base text-white/70 max-w-xl"
          >
            {c.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
              <Link to="/programs/cap">
                {c.cta_primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/partnership">{c.cta_secondary}</Link>
            </Button>
          </motion.div>
        </div>

        {/* Marquee — Outlier-style staggered cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-6 md:mt-10 -mx-4 md:-mx-8 flex-1 flex items-end"
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 bg-gradient-to-r from-primary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 bg-gradient-to-l from-primary to-transparent" />

          <div className="overflow-hidden w-full py-6">
            <div
              className="flex items-center gap-3 md:gap-4 w-max animate-scroll-left will-change-transform"
              style={{ animationDuration: "70s" }}
            >
              {loop.map((card, i) => {
                // Stagger: alternating heights and slight tilt
                const variant = i % 4;
                const heightClass =
                  variant === 0
                    ? "h-[180px] md:h-[220px]"
                    : variant === 1
                    ? "h-[140px] md:h-[170px]"
                    : variant === 2
                    ? "h-[200px] md:h-[240px]"
                    : "h-[160px] md:h-[190px]";
                const widthClass =
                  card.tone === "accent"
                    ? "w-[110px] md:w-[130px]"
                    : "w-[130px] md:w-[160px]";
                const tilt =
                  variant === 0
                    ? "rotate-[-3deg]"
                    : variant === 1
                    ? "rotate-[2deg]"
                    : variant === 2
                    ? "rotate-[-1.5deg]"
                    : "rotate-[3deg]";
                const offset = variant % 2 === 0 ? "-translate-y-2" : "translate-y-3";
                return (
                  <div
                    key={`${card.name}-${i}`}
                    className={`relative shrink-0 ${widthClass} ${heightClass} ${tilt} ${offset} rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 ${
                      card.tone === "accent"
                        ? "bg-gradient-to-br from-accent to-[hsl(350,80%,55%)]"
                        : card.tone === "dark"
                        ? "bg-gradient-to-br from-[hsl(240,40%,15%)] to-[hsl(240,60%,25%)]"
                        : "bg-white"
                    }`}
                  >
                    {card.tone !== "accent" && (
                      <img
                        src={card.src}
                        alt={card.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    {card.tone === "accent" ? (
                      <div className="relative h-full flex flex-col justify-between p-3 text-white">
                        <div className="font-display text-2xl md:text-3xl font-bold leading-none">
                          {card.name}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider opacity-90 leading-tight">
                          {card.role}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                        <div className="font-semibold text-xs md:text-sm leading-tight">{card.name}</div>
                        <div className="text-[10px] text-white/80 leading-tight">{card.role}</div>
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
