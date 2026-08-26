import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, GraduationCap, Users, Compass, Search, PenTool, Route, HeartHandshake, BarChart3 } from "lucide-react";
import studentsLabImg from "@/assets/students-tech-lab.jpg";
import womenTechLeaders from "@/assets/women-tech-leaders.jpg";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";

const deliveryModel = [
  { icon: Search, title: "Understand need", description: "Identify educational, inclusion and participation barriers through evidence, partner knowledge and participant feedback." },
  { icon: PenTool, title: "Design a charitable activity", description: "Link every activity to an approved purpose and an intended public benefit." },
  { icon: Route, title: "Deliver through pathways", description: "Use CAP, FLIP and EJP as structured routes for learning, inclusion and continued development." },
  { icon: HeartHandshake, title: "Support participation", description: "Use mentoring, resources, scholarships, bursaries, peer support and community activity to reduce barriers." },
  { icon: BarChart3, title: "Measure public benefit", description: "Review access, learning, inclusion and community evidence, then improve, pause or discontinue where needed." },
];

const pathways = [
  {
    code: "CAP",
    icon: GraduationCap,
    title: "Community Access & Participation Pathway",
    description:
      "Expands access to practical tech education through CAP Tech Hubs, structured learning, mentoring, projects and community-based learning for underserved adults.",
    image: studentsLabImg,
    imageAlt: "CAP learners working together during a practical learning session",
    href: "/programs/cap",
    cta: "Explore CAP",
  },
  {
    code: "FLIP",
    icon: Users,
    title: "Female Learning & Inclusion Pathway",
    description:
      "Increases women's participation in tech learning through mentoring, inclusive opportunities, supportive communities and access to learning.",
    image: womenTechLeaders,
    imageAlt: "Women participating in a FLIP learning and mentoring session",
    href: "/programs/flip",
    cta: "Explore FLIP",
  },
  {
    code: "EJP",
    icon: Compass,
    title: "Education Journey Pathway",
    description:
      "Supports continued learning through insight, work-readiness education, mentoring, experiential exposure and referrals that deepen participants' learning journeys.",
    image: graduatesCelebration,
    imageAlt: "Participants at a Sara Foundation Africa work-readiness session",
    href: "/programs/gjp",
    cta: "Explore EJP",
  },
];

const OurWork = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Our Work | Digital Education &amp; Community Learning | SFA</title>
        <meta
          name="description"
          content="How Sara Foundation Africa turns its charitable purposes into action through structured digital education, mentoring, practical learning and community participation."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/our-work" />
        <meta property="og:title" content="Our Work | Digital Education &amp; Community Learning | SFA" />
        <meta
          property="og:description"
          content="Structured learning pathways, mentoring, practical experience and community participation designed around the needs of the people we support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/our-work" />
      </Helmet>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary relative overflow-hidden">
          <div className="section-container relative z-10">
            <div className="max-w-3xl px-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
                Our Work
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                How We Turn Our Tech Learning, Inclusion and Community Purpose Into Action
              </h1>
              <p className="text-base md:text-xl text-white/70 leading-relaxed">
                We design structured learning and community activities around the needs of the people and
                communities we support. Our programmes combine education with mentoring, practical
                experiences, supportive networks and community participation.
              </p>
            </div>
          </div>
        </section>

        {/* Delivery model */}
        <section className="py-16 md:py-24 bg-background">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
              <span className="section-badge mb-4 md:mb-6">Our Delivery Model</span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">
                From understanding need to measuring public benefit
              </h2>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
              {deliveryModel.map((step, index) => (
                <li key={step.title} className="card-modern p-5 md:p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <step.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Access support */}
        <section className="py-12 md:py-16 bg-secondary/50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Access support
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Where a programme has a participation fee, Sara Foundation Africa provides scholarships,
                bursaries, subsidised places or full fee waivers where funding allows. Sponsored places are
                distributed on the basis of need and eligibility.
              </p>
            </div>
          </div>
        </section>

        {/* Pathways */}
        <section className="py-16 md:py-24 bg-background">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
              <span className="section-badge mb-4 md:mb-6">Our Learning Pathways</span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">CAP, FLIP and EJP</h2>
              <p className="section-subtitle mx-auto">
                Three connected routes into learning, inclusion and continued development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {pathways.map((pathway) => (
                <article key={pathway.code} className="card-modern overflow-hidden h-full flex flex-col">
                  <img
                    src={pathway.image}
                    alt={pathway.imageAlt}
                    loading="lazy"
                    className="w-full h-44 md:h-52 object-cover"
                  />
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                        <pathway.icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {pathway.code}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-3">{pathway.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pathway.description}</p>
                    <Button variant="outline" className="w-full mt-auto group" asChild>
                      <Link to={pathway.href}>
                        {pathway.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="section-container text-center max-w-3xl mx-auto px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Help widen access to learning
            </h2>
            <p className="text-white/70 mb-8">
              Give, partner, mentor or volunteer to help more people learn, participate and contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/donation">Donate</Link>
              </Button>
              <Button variant="heroSecondary" size="lg" asChild>
                <Link to="/projects">See Our Impact</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurWork;
