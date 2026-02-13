import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heart, ArrowRight, Award, Users, TrendingUp,
  CheckCircle2, Sparkles, HelpCircle, ClipboardList, Star
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import scintillaImg from "@/assets/partners/scintilla.jpg";
import familyImg from "@/assets/partners/farmily.jpg";
import alxImg from "@/assets/partners/alx.png";
import kadarabriteImg from "@/assets/partners/kadarabrite.png";
import trainaiImg from "@/assets/partners/trainai.png";
import nanaadeImg from "@/assets/partners/nanaade.png";
import platformhubImg from "@/assets/partners/platformhub.png";

const currentSponsors = [
  { name: "Scintilla Innovations", image: scintillaImg, tier: "Strategic Partner" },
  { name: "Farmily", image: familyImg, tier: "Program Sponsor" },
  { name: "ALX", image: alxImg, tier: "Education Partner" },
  { name: "KàdàràBrite", image: kadarabriteImg, tier: "Innovation Partner" },
  { name: "Train AI", image: trainaiImg, tier: "EdTech Partner" },
  { name: "Nanaade", image: nanaadeImg, tier: "Creative Partner" },
  { name: "Platform Hub", image: platformhubImg, tier: "Community Partner" },
];

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

const sponsorshipTiers = [
  {
    name: "Platinum",
    amount: "$10,000+",
    perks: [
      "Logo on all event materials and website",
      "Speaking slot at annual summit",
      "Exclusive talent pipeline access",
      "Quarterly impact report with your branding",
      "5 scholarship naming rights",
      "VIP access to all Sara Foundation events",
    ],
    featured: true,
  },
  {
    name: "Gold",
    amount: "$5,000 – $9,999",
    perks: [
      "Logo on event materials and website",
      "Talent recruitment priority",
      "Bi-annual impact report",
      "2 scholarship naming rights",
      "Invitations to networking events",
    ],
    featured: false,
  },
  {
    name: "Silver",
    amount: "$1,000 – $4,999",
    perks: [
      "Logo on website",
      "Annual impact report",
      "Recognition at events",
      "Newsletter mentions",
    ],
    featured: false,
  },
];

const sponsorProcess = [
  { step: "01", title: "Choose Your Tier", description: "Select a sponsorship level that aligns with your budget and goals." },
  { step: "02", title: "Discuss Goals", description: "We meet to understand what you want to achieve through sponsorship." },
  { step: "03", title: "Agreement & Payment", description: "Formalize sponsorship with clear deliverables and timelines." },
  { step: "04", title: "Activation & Reporting", description: "We activate your sponsorship and provide regular impact reports." },
];

const faqs = [
  { q: "Can I sponsor a specific program?", a: "Yes! You can sponsor CAP, FLIP, or specific events like hackathons and workshops. We'll tailor the sponsorship to your preferences." },
  { q: "How will my sponsorship be recognized?", a: "Depending on your tier, recognition includes logo placement, social media mentions, event speaking slots, newsletter features, and impact reports with your branding." },
  { q: "Is my sponsorship tax-deductible?", a: "Sara Foundation Africa is a registered non-profit. We provide official receipts for tax purposes. Please consult your tax advisor for specific advice." },
  { q: "Can I sponsor individual students?", a: "Yes, we offer scholarship sponsorships where you can directly fund student training and development. You'll receive updates on the students you support." },
  { q: "What is the minimum sponsorship amount?", a: "While our structured tiers start at $1,000, we welcome contributions of any size and will work with you to create meaningful impact." },
];

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sponsor Us – Sara Foundation Africa</title>
        <meta name="description" content="Support Sara Foundation through sponsorship opportunities. Drive tech talent development and promote diversity across Africa's tech ecosystem." />
        <link rel="canonical" href="https://sarafoundation.lovable.app/partnership/sponsors" />
      </Helmet>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent blur-[100px] md:blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-4 md:mb-6">
              <Heart className="w-4 h-4 text-accent" />
              Sponsors
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Sponsor Our Mission
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
              We are a non-profit organization established to promote SDG 5 and SDG 8 in Africa 
              with a focus on technology and entrepreneurship. Our goal is to foster Diversity, 
              Equity and Inclusion in technology and accelerate tech opportunities in Africa 
              leveraging our initiatives: the Career Advancement Program (CAP) and Female 
              Leadership Initiative Program (FLIP).
            </p>
            <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8 max-w-3xl mx-auto">
              Through CAP, we establish tech hubs across African universities. Through FLIP, 
              we empower women tech professionals and tech founders for continued success in Africa.
            </p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/contact">
                Become a Sponsor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Current Sponsors - Scrollable */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Sparkles className="w-4 h-4" />
              Our Sponsors
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Organizations That <span className="gradient-text">Support Us</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <ScrollArea className="h-[380px] md:h-[440px] rounded-2xl border border-border bg-card p-4 md:p-6">
              <div className="space-y-3">
                {currentSponsors.map((sponsor) => (
                  <div key={sponsor.name} className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                      <img src={sponsor.image} alt={sponsor.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm md:text-base truncate">{sponsor.name}</p>
                      <p className="text-muted-foreground text-xs md:text-sm">{sponsor.tier}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <p className="text-center text-muted-foreground text-xs mt-3">Showing all {currentSponsors.length} sponsors and partners</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Sparkles className="w-4 h-4" />
              Benefits
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Why You Should <span className="gradient-text">Sponsor Us</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Your sponsorship creates lasting impact while providing valuable benefits for your organization.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {sponsorBenefits.map((benefit) => (
              <div key={benefit.number} className="card-modern overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className={`p-6 md:p-8 bg-gradient-to-br ${benefit.color} text-white flex flex-col justify-center`}>
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <span className="text-4xl md:text-5xl font-bold text-white/30">{benefit.number}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl mb-1 md:mb-2">{benefit.title}</h3>
                    <p className="text-white/70 text-sm md:text-base">{benefit.subtitle}</p>
                  </div>

                  <div className="lg:col-span-2 p-6 md:p-8 flex items-center">
                    <ul className="space-y-3 md:space-y-4 w-full">
                      {benefit.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 md:gap-4 text-foreground">
                          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm md:text-lg">{item}</span>
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
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Star className="w-4 h-4" />
              Sponsorship Tiers
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Choose Your <span className="gradient-text">Level of Impact</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {sponsorshipTiers.map((tier) => (
              <div key={tier.name} className={`card-modern overflow-hidden flex flex-col ${tier.featured ? "ring-2 ring-primary" : ""}`}>
                {tier.featured && (
                  <div className="bg-primary text-white text-center text-xs font-semibold py-1.5">
                    Most Popular
                  </div>
                )}
                <div className="p-6 md:p-8 flex-1">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-1">{tier.name}</h3>
                  <p className="text-primary font-bold text-lg mb-4">{tier.amount}</p>
                  <ul className="space-y-3">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 md:p-8 pt-0">
                  <Button variant={tier.featured ? "default" : "outline"} className="w-full group" asChild>
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

      {/* Process */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <ClipboardList className="w-4 h-4" />
              How It Works
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Sponsorship <span className="gradient-text">Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {sponsorProcess.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="card-modern p-5 md:p-6 text-center h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm md:text-lg mb-3 md:mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-sm md:text-lg text-foreground mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{item.description}</p>
                </div>
                {index < sponsorProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto px-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="card-modern border-none px-5 md:px-6">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Your sponsorship helps us empower the next generation of African tech talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/contact">
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroSecondary" size="lg" className="w-full sm:w-auto" asChild>
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
