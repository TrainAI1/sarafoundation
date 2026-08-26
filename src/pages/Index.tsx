import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SDGSection } from "@/components/sections/SDGSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ImpactReportSection } from "@/components/sections/ImpactReportSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { StrategicPartnersSection } from "@/components/sections/StrategicPartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CTASection } from "@/components/sections/CTASection";
import { Helmet } from "react-helmet-async";

const homeFaqs = [
  { q: "Who can take part in the Community Access & Participation Pathway (CAP)?", a: "CAP is open to young people aged 18 and above across Africa, particularly people from underserved or underrepresented communities. No prior coding experience is needed. Learners have joined from 35+ universities across the 8 African countries CAP reaches." },
  { q: "Is there a cost to take part?", a: "Where a programme has a participation fee, Sara Foundation Africa provides scholarships, bursaries, subsidised places or full fee waivers where funding allows. All 763 CAP learners across Cohorts 1 and 2 received fully funded access. Sponsored places are allocated on the basis of need and eligibility." },
  { q: "What is the time commitment for CAP?", a: "CAP is delivered through a Learn, Build and Launch structure with an 80/20 balance of practice to taught learning. Learners take part in expert sessions, guided project work and showcases, and typically dedicate 10 to 15 hours per week." },
  { q: "What is FLIP and who is it for?", a: "The Female Learning & Inclusion Pathway (FLIP) is our six-week tailored programme for women interested in technology, alongside fellowship, mentorship, workshop and community activities. It creates targeted opportunities where barriers or underrepresentation in tech learning have been identified." },
  { q: "What is EJP?", a: "The Education Journey Pathway (EJP) supports continued learning through insight sessions, work-readiness education, mentoring, educational exposure and referrals to suitable external opportunities. Sara Foundation Africa does not guarantee or promise employment through EJP." },
  { q: "How can organisations partner with Sara Foundation Africa?", a: "We work with universities, community organisations, educators, funders, employers and technology organisations where collaboration furthers our charitable purposes. Our trustees retain responsibility for programme decisions, beneficiary selection, partner due diligence and the use of charitable resources." },
  { q: "Where do you work?", a: "Together our pathways reach 11 unique African countries: CAP works across 8 countries with 35+ universities represented, and FLIP works across 6 countries." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Sara Foundation Africa | Digital Education &amp; Inclusion</title>
        <meta name="description" content="Sara Foundation Africa expands access to digital education and tech learning, promotes social inclusion and strengthens community capacity for young people, women and underserved communities in Africa." />
        <link rel="canonical" href="https://sarafoundationafrica.com/" />
        <meta property="og:title" content="Sara Foundation Africa | Digital Education &amp; Inclusion" />
        <meta property="og:description" content="Sara Foundation Africa expands access to digital education and tech learning, promotes social inclusion and strengthens community capacity for young people, women and underserved communities in Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sara Foundation Africa | Digital Education &amp; Inclusion" />
        <meta name="twitter:description" content="Sara Foundation Africa expands access to digital education and tech learning, promotes social inclusion and strengthens community capacity for young people, women and underserved communities in Africa." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "Sara Foundation Africa",
          "alternateName": "Sara Foundation",
          "description": "Sara Foundation Africa expands access to digital education and tech learning, promotes social inclusion and strengthens community capacity for young people, women and underserved communities in Africa.",
          "url": "https://sarafoundationafrica.com",
          "logo": "https://sarafoundationafrica.com/favicon.png",
          "foundingDate": "2023",
          "areaServed": "Africa",
          "sameAs": [
            "https://www.linkedin.com/company/sara-foundation/",
            "https://x.com/Sarafoundations",
            "https://www.instagram.com/sarafoundation.africa",
            "https://www.facebook.com/share/17jsnQdbnd/",
            "https://youtube.com/@sara.foundation",
            "https://www.tiktok.com/@sara.foundation"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "info@sarafoundationafrica.com",
            "contactType": "General Inquiry"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": homeFaqs.map(({ q, a }) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a },
          })),
        })}</script>
      </Helmet>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <MissionSection />
        <ProgramsSection />
        <ImpactSection />
        <SuccessStoriesSection />
        <ImpactReportSection />
        <SDGSection />
        <PartnersSection />
        <StrategicPartnersSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
