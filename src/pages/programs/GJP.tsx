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
import { assetUrl } from "@/lib/assetUrl";
import mentorshipSession from "@/assets/mentorship-session.jpg";

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
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-primary/5">
          <div className="section-container relative px-4">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-left">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
                  {c.hero_badge}
                </span>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-5">
                  {c.hero_headline_prefix} <span className="text-primary">{c.hero_headline_highlight}</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-0 mb-8">
                  {c.hero_description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-start">
                  <Button asChild size="lg" className="rounded-xl glow-effect">
                    <Link to="/programs/gjp/apply">
                      {c.apply_cta_label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl">
                    <Link to="/projects">{c.evidence_cta_label}</Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Already applied?{" "}
                  <Link to="/programs/gjp/status" className="text-primary hover:underline font-medium">
                    Check your application status
                  </Link>
                </p>
              </div>
              <div className="mx-4 lg:mx-0">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={heroImage}
                    alt="An EJP mentoring or knowledge session in progress"
                    className="w-full h-56 md:h-80 object-cover"
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
        <section className="py-14 md:py-20">
          <div className="section-container px-4 max-w-5xl">
            <div className="text-center mb-10 md:mb-14">
              <span className="section-badge mb-4">What EJP Includes</span>
              <h2 className="section-title text-foreground">Activities that extend learning</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {activities.map((activity) => (
                <div key={activity.title} className="card-modern p-6 h-full">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mb-4">
                    <activity.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display font-bold text-foreground mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{activity.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence with context */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="section-container px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="section-badge mb-4">Historical Activity, In Context</span>
              <h2 className="section-title text-foreground mb-4">What EJP activity has delivered</h2>
              <p className="section-subtitle mx-auto max-w-2xl">
                Every figure below is labelled with what it actually counts. Referrals, training places and
                sessions measure different things and are not unique individuals.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {evidence.map((item) => (
                <div key={item.label} className="card-modern p-6 h-full">
                  <div className="text-4xl font-bold font-display text-primary mb-2">{item.value}</div>
                  <h3 className="font-display font-bold text-foreground mb-2">{item.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Continued journeys */}
        <section className="py-14 md:py-20">
          <div className="section-container px-4 max-w-3xl text-center">
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
