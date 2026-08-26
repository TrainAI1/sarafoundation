import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

type Story = {
  pathway: "CAP" | "FLIP" | "EJP";
  name: string;
  headline: string;
  summary: string;
  evidence: string;
  link?: string;
  linkLabel: string;
  pathwayHref: string;
};

const stories: Story[] = [
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
  },
];

export function SuccessStoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <ScrollAnimation variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-badge mb-4">Featured Stories</span>
            <h2 className="section-title text-foreground mb-4">
              Real Learners. <span className="gradient-text">Real Journeys.</span>
            </h2>
            <p className="section-subtitle">
              Behind every number is a learner, mentor or community member moving forward. Explore the
              projects, learning experiences and personal journeys created through CAP, FLIP and EJP.
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {stories.map((s) => (
            <StaggerItem key={s.name} variant="fade-up">
              <Card className="p-6 h-full flex flex-col hover:shadow-xl transition-shadow">
                <Link
                  to={s.pathwayHref}
                  className="inline-flex self-start items-center text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4 hover:underline"
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
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-3 hover:underline"
                    >
                      <PlayCircle className="w-4 h-4" aria-hidden="true" />
                      {s.linkLabel} for {s.name}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">Read more learner stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
