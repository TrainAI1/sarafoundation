import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { DonationSection } from "@/components/sections/DonationSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Users, GraduationCap, Lightbulb, ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";
import graduatesCelebration from "@/assets/cap-graduates-2025.jpg";
import mentorshipSession from "@/assets/mentorship-session.jpg";
import { useFAQItems } from "@/hooks/useFAQItems";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const impactStories = [
  {
    quote: "The scholarship I received changed my life. I'm now a software engineer at a leading tech company.",
    name: "Adaeze O.",
    role: "CAP Alumni, Class of 2023",
  },
  {
    quote: "FLIP gave me the confidence and network to launch my own startup. I couldn't have done it without their support.",
    name: "Fatima H.",
    role: "FLIP Graduate, Founder",
  },
];

const impactNumbers = [
  { icon: Users, number: "763", label: "CAP learners fully funded" },
  { icon: Heart, number: "57", label: "Women supported through FLIP" },
  { icon: GraduationCap, number: "1,600", label: "Scholarships provided" },
  { icon: Lightbulb, number: "11", label: "African countries reached" },
];

const whereItGoes = [
  { title: "Technology & Infrastructure", percentage: "50%", description: "This covers course platforms, learning infrastructure and assessment management." },
  { title: "Programme Operations", percentage: "40%", description: "This covers cohort management, impact reporting and the Foundation's operations." },
  { title: "Growth & Outreach", percentage: "10%", description: "This covers publicity campaigns, promotion and online engagements." },
];

const donationFaqDefaults = [
  { question: "Is my donation tax-deductible?", answer: "Sara Foundation Africa is a registered non-profit organization. We provide official donation receipts. Please consult your local tax advisor for deductibility in your jurisdiction." },
  { question: "Can I donate in currencies other than USD?", answer: "Yes! We accept donations in multiple currencies. Our payment partners handle currency conversion automatically." },
  { question: "Can I set up a recurring donation?", answer: "Yes. You can donate weekly, monthly, or in any rhythm that works for you. £100 per month or £50 per week sponsors subsidised places, and smaller recurring gifts add up towards a full sponsorship." },
  { question: "How much does it cost to sponsor a learner?", answer: "£500 fully sponsors a beneficiary (or the equivalent in your currency). You can also give £100 per month or £50 per week towards subsidised places, or contribute smaller amounts alone or combined with other donors." },
  { question: "How will I know my donation made an impact?", answer: "All donors receive an annual impact report showing exactly how funds were used. Major donors (£500+) receive quarterly updates." },
  { question: "Can I donate to a specific program?", answer: "Yes, you can specify whether your donation goes to CAP (university programs) or FLIP (women's leadership). Contact us to earmark your donation." },
];

export default function Donation() {
  const { data: dbFaqs } = useFAQItems();
  const faqs = dbFaqs && dbFaqs.length > 0
    ? dbFaqs.filter(f => f.question.toLowerCase().includes("donat") || f.answer.toLowerCase().includes("donat"))
    : donationFaqDefaults;
  // If no donation-specific FAQs in DB, use defaults
  const displayFaqs = faqs.length > 0 ? faqs : donationFaqDefaults;
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Donate | Widen Access to Digital Education | Sara Foundation Africa</title>
        <meta name="description" content="Your donation helps fund scholarships, bursaries, subsidised places, educational resources and mentoring so financial circumstances do not prevent access to learning." />
        <link rel="canonical" href="https://sarafoundationafrica.com/donation" />
        <meta property="og:title" content="Donate | Widen Access to Digital Education | Sara Foundation Africa" />
        <meta property="og:description" content="Your donation helps fund scholarships, bursaries, subsidised places, educational resources and mentoring so financial circumstances do not prevent access to learning." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/donation" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Donate | Widen Access to Digital Education | Sara Foundation Africa" />
        <meta name="twitter:description" content="Your donation helps fund scholarships, bursaries, subsidised places, educational resources and mentoring so financial circumstances do not prevent access to learning." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": displayFaqs.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer },
          })),
        })}</script>
      </Helmet>
      <Navbar />
      <main>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-4 mb-6">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-accent" />
              Donate
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Help Widen Access to Learning
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              Donations help reduce barriers to learning. Depending on programme needs and available funding,
              your support can contribute to scholarships, bursaries, subsidised participation, educational
              resources, mentoring and community learning activities.
            </p>
            <p className="mt-6 rounded-2xl bg-white/10 p-5 text-white font-medium leading-relaxed">
              Every donation helps us reduce barriers to education and participation so that financial
              circumstances do not prevent eligible young people from accessing learning opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-8 md:py-12 bg-background border-b">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {impactNumbers.map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 mx-auto rounded-xl md:rounded-2xl bg-primary flex items-center justify-center mb-2 md:mb-3 shadow-lg">
                  <item.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div className="text-2xl md:text-4xl font-bold font-display gradient-text mb-1">{item.number}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Methods Section */}
      <DonationSection />

      {/* Where Your Money Goes */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Transparency
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Where Your <span className="gradient-text">Money Goes</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We believe in full transparency. Here's how your donations are allocated.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {whereItGoes.map((item) => (
              <div key={item.title} className="card-modern p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl md:text-3xl font-bold font-display gradient-text">{item.percentage}</div>
                  <h3 className="font-display font-bold text-base md:text-lg text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured learner stories, one per pathway */}
      <SuccessStoriesSection />

      {/* Impact Stories removed temporarily per request */}

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Donation <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto px-4">
            <Accordion type="single" collapsible className="space-y-3">
              {displayFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="card-modern border-none px-5 md:px-6">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="section-container text-center px-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Have Questions About Donating?
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Our team is here to help. Reach out to learn more about how your contribution makes an impact.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
