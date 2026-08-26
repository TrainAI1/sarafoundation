import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Building, Users, GraduationCap, ArrowRight, CheckCircle2, Handshake, Target, TrendingUp, Globe, Award } from "lucide-react";
import partnershipMeeting from "@/assets/partnership-meeting.jpg";
import techConferenceSpeaker from "@/assets/tech-conference-speaker.jpg";

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "School Community",
    description: "Partner with us to bring tech education and CAP Tech Clubs to your institution.",
    benefits: [
      "CAP Tech Club establishment",
      "Training for young people and adults",
      "Curriculum integration support",
      "Industry exposure for participants",
      "Faculty development workshops",
      "Access to Sara Foundation network",
    ],
    stats: { value: "35+", label: "Universities represented" },
    href: "/partnership/school-community",
    color: "bg-primary",
  },
  {
    icon: Building,
    title: "Organizations",
    description: "Organisational partnerships that widen access to digital education, inclusion and community learning.",
    benefits: [
      "Support for structured learning activity",
      "CSR impact reporting",
      "Brand visibility across Africa",
      "Co-branded programs",
      "Employee volunteer opportunities",
      "Volunteer and mentoring opportunities for your team",
    ],
    stats: { value: "11", label: "African countries reached" },
    href: "/partnership/organizations",
    color: "bg-accent",
  },
  {
    icon: Handshake,
    title: "Sponsors",
    description: "Support our mission through sponsorship and funding opportunities.",
    benefits: [
      "Direct impact on access to learning",
      "Recognition across platforms",
      "Event sponsorship options",
      "Scholarship naming rights",
      "Exclusive networking events",
      "Impact dashboard access",
    ],
    stats: { value: "1,600", label: "Scholarships provided" },
    href: "/partnership/sponsors",
    color: "bg-[hsl(160,84%,39%)]",
  },
];

const impactAreas = [
  { icon: Users, value: "763", label: "CAP learners" },
  { icon: Globe, value: "11", label: "African countries" },
  { icon: GraduationCap, value: "35+", label: "Universities represented" },
  { icon: Award, value: "1,600", label: "Scholarships provided" },
];

const process = [
  { step: "01", title: "Initial Contact", description: "Reach out to discuss partnership opportunities" },
  { step: "02", title: "Alignment Meeting", description: "We explore mutual goals and partnership models" },
  { step: "03", title: "Proposal & Agreement", description: "Formalize the partnership with clear objectives" },
  { step: "04", title: "Launch & Execute", description: "Begin implementation with dedicated support" },
];

export default function Partnership() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Partner with Us – Sara Foundation Africa</title>
        <meta name="description" content="Partner with Sara Foundation Africa to widen access to digital education, inclusion and community learning across Africa." />
        <link rel="canonical" href="https://sarafoundationafrica.com/partnership" />
        <meta property="og:title" content="Partner with Us – Sara Foundation Africa" />
        <meta property="og:description" content="Partner with Sara Foundation Africa to widen access to digital education, inclusion and community learning across Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/partnership" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Partner with Us – Sara Foundation Africa" />
        <meta name="twitter:description" content="Partner with Sara Foundation Africa to widen access to digital education, inclusion and community learning across Africa." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
      </Helmet>
      <Navbar />
      <main>
      {/* Hero with Image */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={partnershipMeeting} 
            alt="Partnership meeting"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-primary" />
        </div>
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="px-4 lg:px-0">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-4 mb-6">
                <Handshake className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                Partnership Opportunities
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Partner with Sara Foundation Africa
              </h1>
              <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
                We work with universities, community organisations, educators, funders, employers,
                technology organisations and other suitable partners where collaboration helps further our
                charitable purposes. Our trustees retain responsibility for programme decisions, beneficiary
                selection, partner due diligence and the use of charitable resources.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Become a Partner
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Impact Stats */}
            <div className="glass-card-dark p-6 md:p-8 rounded-2xl md:rounded-3xl mx-4 lg:mx-0">
              <h3 className="text-white font-semibold mb-4 md:mb-6 text-center text-sm md:text-base">Our Collective Impact</h3>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {impactAreas.map((stat) => (
                  <div key={stat.label} className="text-center p-2 md:p-4">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold font-display text-white mb-1">{stat.value}</div>
                    <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Target className="w-4 h-4" />
              Partnership Types
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Ways to{" "}
              <span className="gradient-text">Partner with Us</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Choose the partnership model that best fits your organization's objectives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 lg:px-0">
            {partnerTypes.map((type) => (
              <div key={type.title} className="card-modern overflow-hidden flex flex-col">
                {/* Header */}
                <div className={`p-6 ${type.color} text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <type.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl">{type.title}</h3>
                      <p className="text-white/80 text-sm">{type.stats.value} {type.stats.label}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">{type.description}</p>
                </div>

                {/* Benefits */}
                <div className="p-6 flex-1">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-primary rounded-full" />
                    Partnership Benefits
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {type.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to={type.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={techConferenceSpeaker} 
          alt="Tech conference speaker"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl md:text-3xl font-display font-bold text-center px-4">
            Together, we create lasting impact across Africa
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-6">
              <TrendingUp className="w-4 h-4" />
              Partnership Process
            </span>
            <h2 className="section-title text-foreground mb-6">
              How It Works
            </h2>
            <p className="section-subtitle mx-auto">
              Our streamlined process makes partnering with us simple and effective.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="card-modern p-5 md:p-6 text-center h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm md:text-lg mb-3 md:mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-sm md:text-lg text-foreground mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Let's Create Impact Together
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Ready to partner with us? Get in touch to explore collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Contact Our Partnership Team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="lg" asChild>
              <Link to="/contact">Request Partnership Deck</Link>
            </Button>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
