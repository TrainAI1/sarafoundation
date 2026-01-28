import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, ArrowRight, Award, Users, TrendingUp,
  CheckCircle2, Sparkles
} from "lucide-react";

const sponsorBenefits = [
  {
    number: "01",
    icon: Award,
    title: "Enhanced Brand Reputation",
    subtitle: "Demonstrates Corporate Social Responsibility",
    benefits: [
      "Position your organization or higher institution by sponsoring students",
      "Be recognized as a supporter of women's empowerment and progress",
      "Showcase your commitment to diversity and inclusion in tech",
    ],
    color: "from-primary to-[hsl(240,80%,50%)]",
  },
  {
    number: "02",
    icon: Users,
    title: "Talent Acquisition and Development",
    subtitle: "Access to Skilled and Diverse Workforce",
    benefits: [
      "Position yourself as an attractive employer or investor for women and youth in tech",
      "Contribute to the development of a skilled tech workforce in Africa",
      "Collaborate and fund women-led startups on innovative projects",
      "Offer internships or mentorships to students",
    ],
    color: "from-[hsl(240,80%,50%)] to-primary",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Market Access and Business Growth",
    subtitle: "Expand Your Reach in Africa",
    benefits: [
      "Reach a new and growing market segment of women consumers and businesses",
      "Network with budding to influential individuals and organizations within the African tech ecosystem",
      "Gain valuable insights into the African tech landscape and consumer trends",
      "Identify new suppliers and partners within the FLIP network to diversify your supply chain",
      "Generate new business opportunities and increase your revenue by supporting women-led startups",
    ],
    color: "from-accent to-primary",
  },
];

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
              <Heart className="w-4 h-4 text-accent" />
              Sponsors
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Sponsor Our Mission
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-3xl mx-auto">
              We are a non-profit organization established to promote SDG 5 and SDG 8 in Africa 
              with a focus on technology and entrepreneurship. Our goal is to foster Diversity, 
              Equity and Inclusion in technology and accelerate tech opportunities in Africa 
              leveraging our initiatives: the Career Advancement Program (CAP) and Female 
              Leadership Initiative Program (FLIP).
            </p>
            <p className="text-lg text-white/60 mb-8 max-w-3xl mx-auto">
              Through CAP, we establish tech hubs across African universities. Through FLIP, 
              we empower women tech professionals and tech founders for continued success in Africa.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Become a Sponsor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <Sparkles className="w-4 h-4" />
              Benefits
            </span>
            <h2 className="section-title text-foreground mb-6">
              Why You Should <span className="gradient-text">Sponsor Us</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Your sponsorship creates lasting impact while providing valuable benefits for your organization.
            </p>
          </div>

          <div className="space-y-8">
            {sponsorBenefits.map((benefit) => (
              <div key={benefit.number} className="card-modern overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className={`p-8 bg-gradient-to-br ${benefit.color} text-white flex flex-col justify-center`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <benefit.icon className="w-7 h-7" />
                      </div>
                      <span className="text-5xl font-bold text-white/30">{benefit.number}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-2">{benefit.title}</h3>
                    <p className="text-white/70">{benefit.subtitle}</p>
                  </div>

                  <div className="lg:col-span-2 p-8 flex items-center">
                    <ul className="space-y-4 w-full">
                      {benefit.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-foreground">
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <Heart className="w-4 h-4" />
              Sponsorship Opportunities
            </span>
            <h2 className="section-title text-foreground mb-6">
              Ways to <span className="gradient-text">Support Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Event Sponsorship", description: "Sponsor our hackathons, workshops, and tech summits" },
              { title: "Scholarship Sponsorship", description: "Fund student scholarships and training programs" },
              { title: "Program Sponsorship", description: "Support CAP or FLIP initiatives directly" },
            ].map((tier) => (
              <div key={tier.title} className="card-modern p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{tier.title}</h3>
                <p className="text-muted-foreground text-sm">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Your sponsorship helps us empower the next generation of African tech talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="lg" asChild>
              <Link to="/donation">
                Donate Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
