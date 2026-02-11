import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Building, Users, GraduationCap, ArrowRight, CheckCircle2,
  Handshake, Target, Sparkles, TrendingUp, Globe, Award
} from "lucide-react";
import partnershipMeeting from "@/assets/partnership-meeting.jpg";
import techConferenceSpeaker from "@/assets/tech-conference-speaker.jpg";

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "School Community",
    description: "Partner with us to bring tech education and CAP Tech Clubs to your institution.",
    benefits: [
      "CAP Tech Club establishment",
      "Student training programs",
      "Curriculum integration support",
      "Industry exposure for students",
      "Faculty development workshops",
      "Access to Sara Foundation network",
    ],
    stats: { value: "50+", label: "Partner Universities" },
    href: "/partnership/school-community",
    color: "from-primary to-[hsl(240,80%,50%)]",
  },
  {
    icon: Building,
    title: "Organizations",
    description: "Corporate partnerships to drive tech talent development and CSR initiatives.",
    benefits: [
      "Access to trained talent pool",
      "CSR impact reporting",
      "Brand visibility across Africa",
      "Co-branded programs",
      "Employee volunteer opportunities",
      "Talent pipeline development",
    ],
    stats: { value: "100+", label: "Corporate Partners" },
    href: "/partnership/organizations",
    color: "from-accent to-[hsl(350,80%,55%)]",
  },
  {
    icon: Handshake,
    title: "Sponsors",
    description: "Support our mission through sponsorship and funding opportunities.",
    benefits: [
      "Direct impact on African youth",
      "Recognition across platforms",
      "Event sponsorship options",
      "Scholarship naming rights",
      "Exclusive networking events",
      "Impact dashboard access",
    ],
    stats: { value: "$2M+", label: "Funds Raised" },
    href: "/partnership/sponsors",
    color: "from-[hsl(160,84%,39%)] to-primary",
  },
];

const impactAreas = [
  { icon: Users, value: "700+", label: "Lives Impacted" },
  { icon: Globe, value: "12+", label: "Countries" },
  { icon: GraduationCap, value: "50+", label: "Universities" },
  { icon: Award, value: "85%", label: "Job Placement" },
];

const testimonials = [
  {
    quote: "Partnering with Sara Foundation has allowed us to identify and recruit exceptional tech talent from across Africa.",
    author: "Ifeoma Nwosu",
    role: "HR Director, Tech Corp Africa",
    type: "Corporate Partner",
  },
  {
    quote: "The CAP Tech Club has transformed our students' career prospects. We've seen a 3x increase in tech internship placements.",
    author: "Prof. Emmanuel Osei",
    role: "Dean, University of Accra",
    type: "University Partner",
  },
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
        <meta name="description" content="Explore partnership opportunities with Sara Foundation Africa. Join corporates, governments, and foundations driving tech talent development across Africa." />
        <link rel="canonical" href="https://sarafoundation.lovable.app/partnership" />
      </Helmet>
      <Navbar />
      
      {/* Hero with Image */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={partnershipMeeting} 
            alt="Partnership meeting"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
        </div>
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="px-4 lg:px-0">
              <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
                <Handshake className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                Partnership Opportunities
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Partner with Sara Foundation Africa
              </h1>
              <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8">
                Join us in our mission to empower the next generation of African tech talent. 
                Explore partnership opportunities that align with your goals.
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
                <div className={`p-6 bg-gradient-to-r ${type.color} text-white`}>
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/40" />
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
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm md:text-lg mb-3 md:mb-4">
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

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-6">
              <Sparkles className="w-4 h-4" />
              Partner Testimonials
            </span>
            <h2 className="section-title text-foreground mb-6">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto px-4 lg:px-0">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="card-modern p-6 md:p-8">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                  {testimonial.type}
                </span>
                <p className="text-foreground text-base md:text-lg italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
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
              <a href="#" download>Download Partnership Deck</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
