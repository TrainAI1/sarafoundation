import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Users,
  Compass,
  Lightbulb,
  Share2,
  Info,
  BriefcaseBusiness,
} from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

import { assetUrl } from "@/lib/assetUrl";
import mentorshipSession from "@/assets/mentorship-session.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

// Icons are matched to the saved list by position and are not admin-editable.
const activityIcons = [Lightbulb, BookOpen, Users, Compass, Share2, BriefcaseBusiness];

const activitiesDefault = [
  { title: "Insight sessions", desc: "Sessions that help participants understand roles, sectors and how organisations work." },
  { title: "Work-readiness education", desc: "Learning that builds the practical knowledge and habits participants need in a workplace setting." },
  { title: "Mentoring", desc: "Guidance, feedback and reflection with experienced practitioners." },
  { title: "Educational exposure", desc: "Experiential opportunities that complement a participant's wider educational journey." },
  { title: "Knowledge sessions", desc: "Expert-led sessions that deepen understanding of technology and professional practice." },
  { title: "Referrals", desc: "Referrals to suitable external opportunities where these provide genuine further learning or experience." },
];

const evidenceDefault = [
  {
    value: "696",
    label: "Candidates prepared and referred",
    sub: "Sara Foundation Africa prepared and referred 696 qualified candidates into the Nigerian Jubilee Fellows Programme candidate pool for 12-month paid placements across public and private host organisations. Referral into a candidate pool is not a placement guaranteed by Sara Foundation Africa.",
  },
  {
    value: "705",
    label: "Referrals across historical activity",
    sub: "Total referrals for placement opportunities recorded across relevant historical activities and pathways. Referrals are not confirmed placements.",
  },
  {
    value: "23",
    label: "Knowledge sessions",
    sub: "Knowledge and insight sessions delivered to participants.",
  },
  {
    value: "170",
    label: "AI training places",
    sub: "Places delivered with partner organisations: 100 with Regamos Foundation and 70 through ALX Africa AI Essentials training.",
  },
];

export default function ProgramGJP() {
  const { data: c } = usePageContent("programs-gjp", {
    hero_badge: "Education Journey Pathway",
    hero_headline_prefix: "Learning Beyond the",
    hero_headline_highlight: "Sessions",
    hero_description: "EJP supports continued learning through practical and experiential opportunities that complement participants' wider educational journeys.",
    hero_image: "",
    journeys_image: "",
    apply_cta_label: "Express interest",
    evidence_cta_label: "See our impact evidence",
    no_guarantee_text: "Sara Foundation Africa does not guarantee or promise employment through EJP. Where employment, internship or placement outcomes are mentioned, they are examples of participants' continued journeys following learning, or referrals to opportunities held by other organisations.",
    activities: activitiesDefault,
    evidence: evidenceDefault,
    continued_journeys_text: "Some participants have continued their journeys through internships and roles with organisations in our network, including Scintilla and Farmily. These outcomes are held by the host organisations and are recorded as examples of continued learning journeys, not as placements guaranteed by Sara Foundation Africa.",
  });

  const activities = (c.activities as typeof activitiesDefault).map((item, i) => ({
    ...item,
    icon: activityIcons[i] || activityIcons[activityIcons.length - 1],
  }));
  const evidence = c.evidence as typeof evidenceDefault;
  const heroImage = c.hero_image ? assetUrl(c.hero_image) : mentorshipSession;
  const journeysImage = c.journeys_image ? assetUrl(c.journeys_image) : graduatesCelebration;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>EJP: Education Journey Pathway | Sara Foundation Africa</title>
        <meta
          name="description"
          content="The Education Journey Pathway supports continued learning through insight sessions, work-readiness education, mentoring, educational exposure and referrals to further learning."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/gjp" />
        <meta property="og:title" content="EJP: Education Journey Pathway | Sara Foundation Africa" />
        <meta
          property="og:description"
          content="Learning beyond the sessions: insight, work-readiness education, mentoring, experiential exposure and referrals that deepen participants' learning journeys."
        />
      </Helmet>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary relative overflow-hidden">
          <div className="section-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="px-4 lg:px-0">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
                  <Compass className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" aria-hidden="true" />
                  {c.hero_badge}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {c.hero_headline_prefix} {c.hero_headline_highlight}
                </h1>
                <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
                  {c.hero_description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <Link to="/programs/gjp/apply">
                      {c.apply_cta_label}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="heroSecondary" size="lg" asChild>
                    <Link to="/projects">{c.evidence_cta_label}</Link>
                  </Button>
                </div>
                <p className="text-xs text-white/60 mt-4">
                  Already applied?{" "}
                  <Link to="/programs/gjp/status" className="text-white underline underline-offset-4 font-medium">
                    Check your application status
                  </Link>
                </p>
              </div>

              <div className="relative mx-4 lg:mx-0">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white">
                  <img
                    src={heroImage}
                    alt="An EJP mentoring or knowledge session in progress"
                    className="w-full max-h-64 md:max-h-80 object-contain"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = mentorshipSession;
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* No-guarantee statement */}
        <section className="py-8 md:py-10 bg-secondary/50 border-y border-border">
          <div className="section-container px-4 max-w-3xl">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              <p className="text-foreground font-medium leading-relaxed">
                {c.no_guarantee_text}
              </p>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-14 md:py-20 bg-secondary/40 relative overflow-hidden">
          <div className="section-container px-4 max-w-5xl relative z-10">
            <ScrollAnimation variant="fade-up" className="max-w-3xl mb-10 md:mb-14">
              <span className="section-badge mb-4">What EJP Includes</span>
              <h2 className="section-title text-foreground">Activities that extend learning</h2>
            </ScrollAnimation>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" staggerDelay={0.12}>
              {activities.map((activity, i) => {
                const feature = i === 0;
                return (
                  <StaggerItem
                    key={activity.title}
                    variant="fade-up"
                    className={feature ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
                  >
                    <div
                      className={`card-modern group h-full flex relative overflow-hidden ${
                        feature
                          ? "flex-col justify-between p-7 md:p-9 min-h-[20rem] bg-primary text-primary-foreground border-primary"
                          : "flex-col p-6"
                      }`}
                    >
                      {feature && (
                        <>
                          <img
                            src={activitiesFeatureImage}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/50" />
                        </>
                      )}
                      <div className="relative z-10 flex flex-col h-full">

                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span
                          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${
                            feature ? "bg-white/15 text-white" : "bg-primary/10 text-primary"
                          }`}
                        >
                          <activity.icon className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <span
                          className={`font-display text-sm font-bold tabular-nums ${
                            feature ? "text-white/50" : "text-muted-foreground/50"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className={feature ? "mt-auto" : ""}>
                        <h3
                          className={`font-display font-bold mb-2 ${
                            feature ? "text-2xl md:text-3xl text-white" : "text-foreground"
                          }`}
                        >
                          {activity.title}
                        </h3>
                        <p
                          className={`leading-relaxed ${
                            feature ? "text-base text-white/80 max-w-md" : "text-sm text-muted-foreground"
                          }`}
                        >
                          {activity.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Evidence with context */}
        <section className="py-14 md:py-20">
          <div className="section-container px-4 max-w-6xl">
            <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-14 items-start">
              <ScrollAnimation variant="fade-up" className="lg:sticky lg:top-28">
                <span className="section-badge mb-4">Historical Activity, In Context</span>
                <h2 className="section-title text-foreground mb-4">What EJP activity has delivered</h2>
                <p className="section-subtitle">
                  Every figure is labelled with what it actually counts. Referrals, training places and
                  sessions measure different things and are not unique individuals.
                </p>
              </ScrollAnimation>

              <StaggerContainer className="divide-y divide-border border-y border-border" staggerDelay={0.1}>
                {evidence.map((item, i) => (
                  <StaggerItem key={item.label} variant="fade-up">
                    <div className="group py-6 md:py-7 flex gap-5 md:gap-8">
                      <div className="flex-shrink-0 w-20 md:w-28">
                        <div className="font-display text-3xl md:text-4xl font-bold text-primary tabular-nums leading-none">
                          {item.value}
                        </div>
                        <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-foreground mb-1.5">{item.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.sub}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>



        {/* Continued journeys */}
        <section className="py-14 md:py-20">
          <div className="section-container px-4">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
              <div>
                <span className="section-badge mb-4">Continued Journeys</span>
                <h2 className="section-title text-foreground mb-5">
                  What participants have gone on to do
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-6">
                  {c.continued_journeys_text}
                </p>
                <p className="text-xs text-muted-foreground mb-8">
                  Verified continued-journey outcomes are documented in our annual impact reports and participant spotlights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="rounded-xl glow-effect">
                    <Link to="/blog">
                      Read learner stories <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl">
                    <Link to="/partnership">Partner with us</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl order-first lg:order-last">
                <img
                  src={journeysImage}
                  alt="Graduates celebrating after completing their learning journey"
                  className="w-full h-56 md:h-80 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = graduatesCelebration;
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
