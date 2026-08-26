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
  Sparkles,
} from "lucide-react";

const activities = [
  { icon: Lightbulb, title: "Insight sessions", desc: "Sessions that help participants understand roles, sectors and how organisations work." },
  { icon: BookOpen, title: "Work-readiness education", desc: "Learning that builds the practical knowledge and habits participants need in a workplace setting." },
  { icon: Users, title: "Mentoring", desc: "Guidance, feedback and reflection with experienced practitioners." },
  { icon: Compass, title: "Educational exposure", desc: "Experiential opportunities that complement a participant's wider educational journey." },
  { icon: Share2, title: "Knowledge sessions", desc: "Expert-led sessions that deepen understanding of technology and professional practice." },
  { icon: Sparkles, title: "Referrals", desc: "Referrals to suitable external opportunities where these provide genuine further learning or experience." },
];

const evidence = [
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
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>EJP — Education Journey Pathway | Sara Foundation Africa</title>
        <meta
          name="description"
          content="The Education Journey Pathway supports continued learning through insight sessions, work-readiness education, mentoring, educational exposure and referrals to further learning."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/gjp" />
        <meta property="og:title" content="EJP — Education Journey Pathway | Sara Foundation Africa" />
        <meta
          property="og:description"
          content="Learning beyond the sessions: insight, work-readiness education, mentoring, experiential exposure and referrals that deepen participants' learning journeys."
        />
      </Helmet>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="section-container relative px-4 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-5">
              Education Journey Pathway
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-5">
              Learning Beyond the <span className="gradient-text">Sessions</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              EJP supports continued learning through practical and experiential opportunities that
              complement participants' wider educational journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-xl glow-effect">
                <Link to="/programs/gjp/apply">
                  Express interest <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link to="/projects">See our impact evidence</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Already applied?{" "}
              <Link to="/programs/gjp/status" className="text-primary hover:underline font-medium">
                Check your application status
              </Link>
            </p>
          </div>
        </section>

        {/* No-guarantee statement */}
        <section className="py-8 md:py-10 bg-secondary/50 border-y border-border">
          <div className="section-container px-4 max-w-3xl">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              <p className="text-foreground font-medium leading-relaxed">
                Sara Foundation Africa does not guarantee or promise employment through EJP. Where employment,
                internship or placement outcomes are mentioned, they are examples of participants' continued
                journeys following learning, or referrals to opportunities held by other organisations.
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
              Some participants have continued their journeys through internships and roles with
              organisations in our network, including Scintilla and Farmily. These outcomes are held by the
              host organisations and are recorded as examples of continued learning journeys, not as
              placements guaranteed by Sara Foundation Africa.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] border border-dashed border-border">
                [DATA TO CONFIRM: verified continued-journey outcomes and participant consent]
              </span>
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
