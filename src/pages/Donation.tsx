import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DonationSection } from "@/components/sections/DonationSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Sparkles, Users, GraduationCap, Lightbulb, ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";
import graduatesCelebration from "@/assets/graduates-celebration.jpg";
import mentorshipSession from "@/assets/mentorship-session.jpg";
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
  { icon: Users, number: "500+", label: "Students Supported" },
  { icon: GraduationCap, number: "8", label: "Countries Reached" },
  { icon: Lightbulb, number: "50+", label: "Partner Institutions" },
];

const whereItGoes = [
  { title: "Student Scholarships", percentage: "40%", description: "Directly funding tuition, equipment, and learning resources for students in our programs." },
  { title: "Program Operations", percentage: "30%", description: "Running workshops, hackathons, mentorship sessions, and community events across Africa." },
  { title: "Technology & Infrastructure", percentage: "20%", description: "Building and maintaining tech hubs, online platforms, and digital learning tools." },
  { title: "Outreach & Growth", percentage: "10%", description: "Expanding to new countries, universities, and communities across the continent." },
];

const faqs = [
  { q: "Is my donation tax-deductible?", a: "Sara Foundation Africa is a registered non-profit organization. We provide official donation receipts. Please consult your local tax advisor for deductibility in your jurisdiction." },
  { q: "Can I donate in currencies other than USD?", a: "Yes! We accept donations in multiple currencies. Our payment partners handle currency conversion automatically." },
  { q: "Can I set up a recurring donation?", a: "Currently we accept one-time donations. Recurring donation options are coming soon. Contact us for monthly giving arrangements." },
  { q: "How will I know my donation made an impact?", a: "All donors receive an annual impact report showing exactly how funds were used. Major donors ($500+) receive quarterly updates." },
  { q: "Can I donate to a specific program?", a: "Yes, you can specify whether your donation goes to CAP (university programs) or FLIP (women's leadership). Contact us to earmark your donation." },
];

export default function Donation() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Donate – Support African Tech Talent | Sara Foundation</title>
        <meta name="description" content="Your donation supports scholarships, mentorship programs, and resources for young African tech entrepreneurs. Invest in Africa's tech future." />
        <link rel="canonical" href="https://sarafoundation.lovable.app/donation" />
      </Helmet>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent blur-[100px] md:blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-accent" />
              Support Our Mission
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Invest in Africa's Tech Future
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              Your donation directly supports scholarships, mentorship programs, and resources 
              for young African tech entrepreneurs. Together, we can break barriers and create opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-8 md:py-12 bg-background border-b">
        <div className="section-container">
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            {impactNumbers.map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-10 h-10 md:w-14 md:h-14 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-2 md:mb-3 shadow-lg">
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

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
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

      {/* Impact Stories */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <Sparkles className="w-4 h-4" />
              Impact Stories
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Your Donations Make a Difference
            </h2>
            <p className="section-subtitle mx-auto">
              Hear from the students and entrepreneurs whose lives have been transformed by your generosity.
            </p>
          </div>

          {/* Impact Images */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={graduatesCelebration} 
                alt="CAP program graduates celebrating their achievements"
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-4 bg-card">
                <p className="font-semibold text-foreground">CAP Graduates 2023</p>
                <p className="text-sm text-muted-foreground">Students celebrating their program completion</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={mentorshipSession} 
                alt="Mentorship session between advisor and student"
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-4 bg-card">
                <p className="font-semibold text-foreground">Mentorship in Action</p>
                <p className="text-sm text-muted-foreground">One-on-one guidance with industry professionals</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {impactStories.map((story, index) => (
              <div key={index} className="card-modern p-6 md:p-8">
                <div className="text-4xl md:text-5xl text-primary/20 font-serif mb-4">"</div>
                <p className="text-foreground text-base md:text-lg mb-6 leading-relaxed">
                  {story.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">{story.name}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">{story.role}</p>
                  </div>
                </div>
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
              Donation <span className="gradient-text">Questions</span>
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

      <Footer />
    </div>
  );
}
