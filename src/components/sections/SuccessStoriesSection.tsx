import { useState } from "react";
import { ArrowUpRight, PlayCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import capStoryThumb from "@/assets/success-stories/success-story-cap.jpg";
import flipStoryThumb from "@/assets/success-stories/success-story-flip.jpg";
import ejpStoryThumb from "@/assets/success-stories/success-story-ejp.jpg";

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
    stories: defaultStories,
  });

  const stories = c.stories as Story[];
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

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {visibleStories.map((s, idx) => (
            <StaggerItem key={`${s.name}-${idx}`} variant="fade-up">
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                {/* Video placeholder — a real still from the story so it reads as an actual clip, not a generic box. */}
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
            </StaggerItem>
          ))}
        </StaggerContainer>

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
