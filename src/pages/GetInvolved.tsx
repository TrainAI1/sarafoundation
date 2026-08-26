import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Handshake, Users, ArrowRight } from "lucide-react";
import mentorshipSession from "@/assets/mentorship-session.jpg";

const donationUses = [
  "Scholarships",
  "Bursaries",
  "Subsidised participation",
  "Educational resources",
  "Mentoring",
  "Community learning activities",
];

const partnerTypes = [
  "Universities",
  "Community organisations",
  "Educators",
  "Funders",
  "Employers",
  "Technology organisations",
  "Programme and delivery partners",
];

const routes = [
  {
    icon: Heart,
    title: "Donate",
    description:
      "Donations help reduce barriers to learning. Depending on programme needs and available funding, support can contribute to scholarships, bursaries, subsidised participation, educational resources, mentoring and community learning.",
    cta: "Donate Now",
    href: "/donation",
    variant: "default" as const,
  },
  {
    icon: Handshake,
    title: "Partner with Us",
    description:
      "We work with organisations where collaboration furthers our charitable purposes. Our trustees retain responsibility for programme decisions, beneficiary selection, partner due diligence and the use of charitable resources.",
    cta: "Partner with Us",
    href: "/partnership",
    variant: "outline" as const,
  },
  {
    icon: Users,
    title: "Volunteer / Mentor",
    description:
      "Join our community of 60+ volunteers, speakers, trainers, facilitators and mentors sharing knowledge with learners and women interested in technology.",
    cta: "Become a Volunteer",
    href: "/volunteer",
    variant: "outline" as const,
  },
];

const GetInvolved = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Get Involved | Donate, Volunteer &amp; Partner | SFA</title>
        <meta
          name="description"
          content="Support Sara Foundation Africa through funding, partnership, volunteering, mentoring or knowledge-sharing and help widen access to digital education and inclusion."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/get-involved" />
        <meta property="og:title" content="Get Involved | Donate, Volunteer &amp; Partner | SFA" />
        <meta
          property="og:description"
          content="Fund scholarships, partner with us, mentor a learner or volunteer your expertise."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/get-involved" />
      </Helmet>
      <Navbar />
      <main id="main-content">
        <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary">
          <div className="section-container max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
              Get Involved
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Help Widen Access to Learning
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              There are many ways to support Sara Foundation Africa through funding, partnership,
              volunteering, mentoring, knowledge-sharing or helping create inclusive learning opportunities.
            </p>
          </div>
        </section>

        {/* Routes */}
        <section className="py-16 md:py-24 bg-background">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {routes.map((route) => (
                <article key={route.title} className="card-modern p-6 md:p-8 h-full flex flex-col">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-5">
                    <route.icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <h2 className="font-display font-bold text-xl text-foreground mb-3">{route.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {route.description}
                  </p>
                  <Button variant={route.variant} className="w-full group" asChild>
                    <Link to={route.href}>
                      {route.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Public benefit statement */}
        <section className="py-14 md:py-20 bg-secondary/50">
          <div className="section-container max-w-4xl">
            <div className="card-modern p-6 md:p-10 text-center">
              <p className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug">
                Every donation helps us reduce barriers to education and participation so that financial
                circumstances do not prevent eligible adults from accessing learning opportunities.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">
                  What donations can support
                </h3>
                <ul className="space-y-2">
                  {donationUses.map((use) => (
                    <li key={use} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">Who we work with</h3>
                <ul className="space-y-2">
                  {partnerTypes.map((type) => (
                    <li key={type} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Image + closing */}
        <section className="py-16 md:py-24 bg-background">
          <div className="section-container grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mentorshipSession}
                alt="A mentor supporting a learner during a Sara Foundation Africa session"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="section-title text-foreground mb-4">Share what you know</h2>
              <p className="section-subtitle mb-6">
                Mentors, trainers, facilitators, speakers and expert session contributors make our learning
                pathways possible. If you can give a few hours, you can help someone keep learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link to="/volunteer">Become a Volunteer</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Talk to our team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;
