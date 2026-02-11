import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building, ArrowRight, Briefcase, Landmark, Heart,
  CheckCircle2, Handshake
} from "lucide-react";

const partnerCategories = [
  {
    number: "01",
    icon: Briefcase,
    title: "Corporates",
    benefits: [
      "Enhanced Brand Reputation",
      "Talent Acquisition - Access to skilled and diverse workforce",
      "Gain valuable market insights into the African tech market and consumer behavior",
      "Promote CSR in an impact-driven way empowering women",
      "Inclusion and Innovation Boost by promoting gender-based initiatives to drive innovation and societal impact",
    ],
    color: "from-primary to-[hsl(240,80%,50%)]",
  },
  {
    number: "02",
    icon: Landmark,
    title: "Government",
    benefits: [
      "Access to data and insights to inform policymaking related to women in tech",
      "Skill Development for women",
      "Contribute to the development of the tech ecosystem and job creation to enhance economic growth",
      "Advance gender equality and women's empowerment goals and promote social impact",
    ],
    color: "from-[hsl(240,80%,50%)] to-primary",
  },
  {
    number: "03",
    icon: Heart,
    title: "Foundations",
    benefits: [
      "Provide Resources for widened impact",
      "Enhance organizational capabilities through partnerships and knowledge sharing",
      "Expand reach and influence through collaborations with FLIP",
      "Contribute to achieving shared goals of women's empowerment, gender equality and promote social impact",
    ],
    color: "from-accent to-primary",
  },
];

const currentPartners = [
  "Flutterwave",
  "Andela",
  "Paystack",
  "Microsoft",
  "AWS",
];

export default function Organizations() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent blur-[100px] md:blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-4 md:mb-6">
              <Building className="w-4 h-4 text-accent" />
              Partners & Collaborators
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Partner with Sara Foundation Africa
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
              We are a non-profit organization established to promote SDG 4, SDG 5 and SDG 8 in Africa 
              with a focus on technology and entrepreneurship. Our goal is to foster Diversity, Equity 
              and Inclusion in technology and accelerate tech opportunities in Africa leveraging our 
              initiatives: the Career Advancement Program (CAP) and Female Leadership Initiative Program (FLIP).
            </p>
            <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8 max-w-3xl mx-auto">
              Through CAP, we establish tech hubs across African universities. Through FLIP, we empower 
              women tech professionals and tech founders for continued success in Africa.
            </p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Handshake className="w-4 h-4" />
              Our Partners
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Organizations We <span className="gradient-text">Work With</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {currentPartners.map((partner) => (
              <div key={partner} className="card-modern p-3 md:p-4 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-2 md:mb-3">
                  <span className="text-sm md:text-lg font-bold text-primary">
                    {partner.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <p className="font-medium text-foreground text-xs md:text-sm">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Benefits
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Why You Should <span className="gradient-text">Partner with Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {partnerCategories.map((category) => (
              <div key={category.number} className="card-modern overflow-hidden flex flex-col">
                <div className={`p-5 md:p-6 bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <category.icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <span className="text-white/60 text-xs md:text-sm">{category.number}</span>
                      <h3 className="font-display font-bold text-lg md:text-xl">{category.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex-1">
                  <ul className="space-y-2 md:space-y-3">
                    {category.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 md:p-6 pt-0">
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/contact">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
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
            Ready to Make an Impact Together?
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Partner with us to drive tech talent development and promote diversity in Africa's tech ecosystem.
          </p>
          <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
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
