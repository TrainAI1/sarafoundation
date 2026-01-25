import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building, Users, GraduationCap, ArrowRight, CheckCircle2,
  Handshake, Target, Sparkles
} from "lucide-react";

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
    ],
    href: "/partnership/school-community",
  },
  {
    icon: Building,
    title: "Organizations",
    description: "Corporate partnerships to drive tech talent development and CSR initiatives.",
    benefits: [
      "Access to trained talent pool",
      "CSR impact reporting",
      "Brand visibility",
      "Co-branded programs",
    ],
    href: "/partnership/organizations",
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
    ],
    href: "/partnership/sponsors",
  },
];

export default function Partnership() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
              <Handshake className="w-4 h-4 text-accent" />
              Partnership Opportunities
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Partner with Sara Foundation Africa
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Join us in our mission to empower the next generation of African tech talent. 
              Explore partnership opportunities that align with your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <Target className="w-4 h-4" />
              Partnership Types
            </span>
            <h2 className="section-title text-foreground mb-6">
              Ways to{" "}
              <span className="gradient-text">Partner with Us</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Choose the partnership model that best fits your organization's objectives.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypes.map((type) => (
              <div key={type.title} className="card-modern p-8 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 shadow-lg">
                  <type.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {type.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {type.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {type.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full group" asChild>
                  <Link to={type.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Create Impact Together
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Ready to partner with us? Get in touch to explore collaboration opportunities.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Contact Our Partnership Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
