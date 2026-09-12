import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";
import { assetUrl } from "@/lib/assetUrl";
import { fallbackStoryThumbs, successStories, type SuccessStory } from "@/data/successStories";

// The homepage remains intentionally concise; Our Impact renders the full list.
const VISIBLE_STORIES = 3;

type SuccessStoriesSectionProps = {
  /** Anchor id so other pages can deep-link to this section (e.g. "/projects#journeys"). */
  id?: string;
  /** Show a secondary button pointing to this same section on the Our Impact page. Default true; pass false when this instance IS that page's copy, to avoid a self-referential link. */
  linkToImpact?: boolean;
  /** Display the complete verified collection instead of the three homepage features. */
  showAll?: boolean;
};

export function SuccessStoriesSection({ id, linkToImpact = true, showAll = false }: SuccessStoriesSectionProps = {}) {
  const { data: c } = usePageContent("home-success-stories", {
    badge: "Featured Stories",
    headline_pre: "Real Learners.",
    headline_accent: "Real Journeys.",
    description:
      "Behind every number is a learner, mentor or community member moving forward. Explore the projects, learning experiences and personal journeys created through CAP, FLIP and EJP.",
    // Stories are omitted here because the verified collection below is the fallback.
  });

  // Use admin-saved stories when present, or fall back to the verified collection.
  const stories: SuccessStory[] = (Array.isArray(c.stories) && c.stories.length > 0)
    ? (c.stories as SuccessStory[])
    : successStories;
  const visibleStories = showAll ? stories : stories.slice(0, VISIBLE_STORIES);

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

        <div
          className={
            showAll
              ? "flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-smooth"
              : "grid md:grid-cols-3 gap-6"
          }
        >
          {visibleStories.map((s, idx) => (
            <div
              key={`${s.name}-${idx}`}
              className={showAll ? "snap-start shrink-0 w-[85%] sm:w-[19rem] lg:w-[22rem]" : "h-full"}
            >
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
                      src={s.image ? assetUrl(s.image) : fallbackStoryThumbs[s.pathway]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = fallbackStoryThumbs[s.pathway]; }}
                    />
                    <span className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" aria-hidden="true" />
                    <span className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <PlayCircle className="w-8 h-8 text-primary" aria-hidden="true" />
                    </span>
                  </a>
                ) : (
                  <div className="relative aspect-video overflow-hidden flex items-center justify-center">
                    <img
                      src={s.image ? assetUrl(s.image) : fallbackStoryThumbs[s.pathway]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = fallbackStoryThumbs[s.pathway]; }}
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
                    {s.pathway === "Foundation" ? "Foundation update" : `${s.pathway} pathway`}
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

        {showAll && (
          <p className="text-xs text-muted-foreground mt-3">Swipe or scroll sideways to see all {visibleStories.length} stories.</p>
        )}

        <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          {linkToImpact && (
            <Button asChild variant="outline" size="lg">
              <Link to="/projects#journeys">See more stories</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
