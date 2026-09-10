import { useState } from "react";
import { ArrowUpRight, PlayCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import capStoryThumb from "@/assets/success-stories/success-story-cap.jpg";
import flipStoryThumb from "@/assets/success-stories/success-story-flip.jpg";
import ejpStoryThumb from "@/assets/success-stories/success-story-ejp.jpg";
import fisayoAdeyemiImg from "@/assets/team/fisayo-adeyemi.jpg";
import mercyMomahImg from "@/assets/team/mercy-momah.jpg";
import scintillaImg from "@/assets/partners/scintilla.jpg";
import graduatesCelebrationImg from "@/assets/graduates-celebration.jpg";
import techEntrepreneursImg from "@/assets/tech-entrepreneurs.jpg";
import capGraduatesJson from "@/assets/events/DSC_3409.jpg.asset.json";
import techConferenceImg from "@/assets/tech-conference.jpg";
import mentorshipSessionImg from "@/assets/mentorship-session.jpg";

type Story = {
  pathway: "CAP" | "FLIP" | "EJP";
  name: string;
  headline: string;
  summary: string;
  evidence: string;
  link?: string;
  linkLabel: string;
  pathwayHref: string;
  /** Admin-uploaded override; falls back to the built-in thumbnail below when empty. */
  image?: string;
};

// Local fallback thumbnails, keyed by pathway, used when a story has no
// admin-uploaded image of its own.
const fallbackThumbs: Record<Story["pathway"], string> = {
  CAP: capStoryThumb,
  FLIP: flipStoryThumb,
  EJP: ejpStoryThumb,
};

const defaultStories: Story[] = [
  {
    pathway: "CAP",
    name: "Akinlabi Isulameya",
    headline: "Building Campuslink with a project team",
    summary:
      "Akinlabi shares how hands-on teamwork while developing the Campuslink app shaped his product-management and technical learning at CAP Tech Hub.",
    evidence: "Learner project presented through CAP Tech Hub Cohort activity.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-captechhub-cohortspotlight-activity-7462891845514219520-L8D4",
    linkLabel: "Watch project story",
    pathwayHref: "/programs/cap",
    image: "",
  },
  {
    pathway: "FLIP",
    name: "Odugbayi Olamide",
    headline: "Applying business intelligence to banking operations",
    summary:
      "For her FLIP capstone work, Olamide developed a BI-powered reconciliation performance tracker, applying business intelligence to day-to-day banking operations.",
    evidence: "One of five FLIP Fellowship Cohort 1 capstone projects.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-capstoneproject-fintech-activity-7399130514781233152-qsfI",
    linkLabel: "Read capstone story",
    pathwayHref: "/programs/flip",
    image: "",
  },
  {
    pathway: "EJP",
    name: "Eniola",
    headline: "Work-readiness learning through EJP",
    summary:
      "Eniola talks about the Government Jobs Placement initiative under EJP and how the work-readiness learning helped her build key skills for the workplace.",
    evidence: "Participant account of work-readiness learning. SFA does not guarantee employment.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-governmentjobplacementprogram-activity-7480888457888817152-IPj_",
    linkLabel: "Watch participant story",
    pathwayHref: "/programs/gjp",
    image: "",
  },
  {
    pathway: "FLIP",
    name: "Fisayo Adeyemi — FLIP Workshop",
    headline: "Effective Communication & Personal Branding in Tech",
    summary:
      "Fisayo Adeyemi, Founder & Lead Coach at Rayne Consults and two-time IIBA Nigeria board member, led a live FLIP session on how effective communication and personal branding elevate influence, visibility and career success in tech.",
    evidence: "FLIP Women in Tech Workshop — LinkedIn Live, October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_flip-womenintech-sarafoundation-activity-7381988281527189506-W4cZ",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/flip",
    image: fisayoAdeyemiImg,
  },
  {
    pathway: "FLIP",
    name: "Mercy Momah — FLIP Workshop",
    headline: "Women in Tech Leadership: Challenges & Opportunities",
    summary:
      "Mercy Mosunmola Momah, a PMP-certified PMO Consultant with 20+ years across IT, telecoms, healthcare and banking, shared powerful insights on navigating leadership barriers and unlocking new opportunities for women in tech.",
    evidence: "FLIP Women in Tech Leadership Workshop — LinkedIn Live, 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_sarafoundation-womenintech-leadership-activity-7384999379415429120-cVtD",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/flip",
    image: mercyMomahImg,
  },
  {
    pathway: "CAP",
    name: "CAP Tech Hub — Talent Showcase",
    headline: "CAP cohort talent showcase: live project presentations",
    summary:
      "Project groups from CAP Tech Hub presented the creative and technical solutions developed across their 6-month learning journey — spanning front-end and back-end development, UI/UX, project management and business analysis.",
    evidence: "CAP Tech Hub Talent Presentation Showcase, October 2025 — LinkedIn Live.",
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-sarafoundation-scintillaafrica-activity-7388436773833678848-RaVv",
    linkLabel: "Watch the showcase",
    pathwayHref: "/programs/cap",
    image: scintillaImg,
  },
  {
    pathway: "FLIP",
    name: "FLIP Fellowship — Capstone & Graduation",
    headline: "FLIP Cohort 1 capstone presentations and graduation ceremony",
    summary:
      "FLIP Fellows celebrated the completion of their fellowship with capstone presentations addressing real-world challenges in tech, business and social impact — marking the graduation of the first cohort of women changemakers.",
    evidence: "FLIP Fellowship Cohort 1 Capstone Presentation & Graduation — LinkedIn Live, October 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_flipfellowship-womenintech-leadership-activity-7388585608623079424-zuPr",
    linkLabel: "Watch the graduation",
    pathwayHref: "/programs/flip",
    image: graduatesCelebrationImg,
  },
  {
    pathway: "CAP",
    name: "CAP Tech Hub Cohort 2 — Talent Showcase",
    headline: "Cohort 2 talent showcase: pitching real-world tech solutions",
    summary:
      "CAP Tech Hub's second talent showcase brought together cohort project teams to pitch, demonstrate and defend the web solutions and tech products they built from scratch — celebrating innovation, resilience and Africa's next generation of tech leaders.",
    evidence: "CAP Tech Hub Talent Presentation Showcase, May 2026 — LinkedIn Live.",
    link: "https://www.linkedin.com/posts/sara-foundation_captechhub-talentshowcase-techinnovation-activity-7463588941724536832-lYKz",
    linkLabel: "Watch the showcase",
    pathwayHref: "/programs/cap",
    image: techEntrepreneursImg,
  },
  {
    pathway: "CAP",
    name: "CAP Tech Hub Cohort 1 — Grand Finale",
    headline: "CAP Cohort 1 Grand Finale: Demo Day & Graduation",
    summary:
      "CAP Tech Hub Cohort 1's Grand Finale brought together final project demos, a panel with industry experts Imaobong Ofana and Victor Emmanuel, and a certificate ceremony — marking the beginning of new opportunities for the graduating cohort.",
    evidence: "CAP Tech Hub Cohort 1 Demo Session & Graduation — LinkedIn Live, April 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_cap-tech-hub-cohort-1-proudly-presents-the-activity-7451188125441228800-m91D",
    linkLabel: "Watch the demo day",
    pathwayHref: "/programs/cap",
    image: assetUrl(capGraduatesJson),
  },
  {
    pathway: "EJP",
    name: "Franklin Oladipo — EJP Career Session",
    headline: "Navigating career paths in 2026: a live conversation",
    summary:
      "Franklin Oladipo, Co-founder of Storipod, joined Sara Foundation for an honest conversation on what navigating a career in 2026 actually looks like — sharing practical insights for anyone trying to find direction, stay relevant and move forward with clarity.",
    evidence: "Sara Foundation EJP knowledge session — LinkedIn Live, April 2026.",
    link: "https://www.linkedin.com/posts/sara-foundation_navigating-career-paths-in-2026-live-session-activity-7442479667288358912-Vbe2",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/gjp",
    image: techConferenceImg,
  },
  {
    pathway: "EJP",
    name: "Harry Zahavi — EJP Career Session",
    headline: "Think like a pro: starting out, standing out and thriving in tech",
    summary:
      "Harry Zahavi — software developer, founder of rigitiX and CodeRigi, and leader of The Geniuses Catalyst Circle — shared his framework for breaking into tech, blending technical depth with visionary thinking to build a long-term career that stands out.",
    evidence: "Sara Foundation EJP knowledge session — LinkedIn Live, December 2025.",
    link: "https://www.linkedin.com/posts/sara-foundation_techcareer-sarafoundation-harryzahavi-activity-7401871800164417536-9_0v",
    linkLabel: "Watch the session",
    pathwayHref: "/programs/gjp",
    image: mentorshipSessionImg,
  },
];

// Stories beyond this count are hidden behind "Show more stories" so admins can
// add as many as they like from the admin section without the grid growing
// unbounded on the page.
const VISIBLE_STORIES = 3;

type SuccessStoriesSectionProps = {
  /** Anchor id so other pages can deep-link to this section (e.g. "/projects#journeys"). */
  id?: string;
  /** Show a secondary button pointing to this same section on the Our Impact page. Default true; pass false when this instance IS that page's copy, to avoid a self-referential link. */
  linkToImpact?: boolean;
};

export function SuccessStoriesSection({ id, linkToImpact = true }: SuccessStoriesSectionProps = {}) {
  const [expanded, setExpanded] = useState(false);
  const { data: c } = usePageContent("home-success-stories", {
    badge: "Featured Stories",
    headline_pre: "Real Learners.",
    headline_accent: "Real Journeys.",
    description:
      "Behind every number is a learner, mentor or community member moving forward. Explore the projects, learning experiences and personal journeys created through CAP, FLIP and EJP.",
    // Note: stories intentionally omitted from defaults — we always use
    // defaultStories as the canonical base so Supabase data can never
    // accidentally wipe them out and crash the page.
  });

  // Use admin-saved stories from Supabase if present, or fall back to defaultStories
  const stories: Story[] = (Array.isArray(c.stories) && c.stories.length > 0)
    ? (c.stories as Story[])
    : defaultStories;
  const visibleStories = expanded ? stories : stories.slice(0, VISIBLE_STORIES);
  const hasMoreStories = stories.length > VISIBLE_STORIES;

  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <ScrollAnimation variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-badge mb-4">{c.badge}</span>
            <h2 className="section-title text-foreground mb-4">
              {c.headline_pre} <span className="gradient-text">{c.headline_accent}</span>
            </h2>
            <p className="section-subtitle">
              {c.description}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-6">
          {visibleStories.map((s, idx) => (
            <div key={`${s.name}-${idx}`} className="h-full">
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                {/* Thumbnail — clicking opens the LinkedIn post */}
                {s.link ? (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.linkLabel} for ${s.name}`}
                    className="group relative aspect-video overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={s.image ? assetUrl(s.image) : fallbackThumbs[s.pathway]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = fallbackThumbs[s.pathway]; }}
                    />
                    <span className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" aria-hidden="true" />
                    <span className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <PlayCircle className="w-8 h-8 text-primary" aria-hidden="true" />
                    </span>
                  </a>
                ) : (
                  <div className="relative aspect-video overflow-hidden flex items-center justify-center">
                    <img
                      src={s.image ? assetUrl(s.image) : fallbackThumbs[s.pathway]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = fallbackThumbs[s.pathway]; }}
                    />
                    <span className="absolute inset-0 bg-black/20" aria-hidden="true" />
                    <span className="relative w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center">
                      <PlayCircle className="w-7 h-7 text-primary" aria-hidden="true" />
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <Link
                    to={s.pathwayHref}
                    className="inline-flex self-start items-center py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3 hover:underline"
                  >
                    {s.pathway} pathway
                  </Link>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{s.headline}</h3>
                  <p className="text-foreground/80 leading-relaxed mb-4 flex-1">{s.summary}</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground text-sm">{s.name}</div>
                    <p className="text-xs text-muted-foreground mt-1">{s.evidence}</p>
                    {s.link && (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-1.5 text-sm font-medium text-primary mt-2 hover:underline"
                      >
                        <PlayCircle className="w-4 h-4" aria-hidden="true" />
                        {s.linkLabel} for {s.name}
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          {hasMoreStories && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setExpanded((v) => !v)}
              className="group"
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-4 h-4" aria-hidden="true" /></>
              ) : (
                <>Show more stories <ChevronDown className="w-4 h-4" aria-hidden="true" /></>
              )}
            </Button>
          )}
          {linkToImpact && (
            <Button asChild variant="outline" size="lg">
              <Link to="/projects#journeys">See all journeys in Our Impact</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
