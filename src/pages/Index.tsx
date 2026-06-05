import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SDGSection } from "@/components/sections/SDGSection";
import { WorkWithUsSection } from "@/components/sections/WorkWithUsSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ImpactReportSection } from "@/components/sections/ImpactReportSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { StrategicPartnersSection } from "@/components/sections/StrategicPartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CTASection } from "@/components/sections/CTASection";
import { Helmet } from "react-helmet-async";

const homeFaqs = [
  { q: "Who can apply for the Career Advancement Program (CAP)?", a: "CAP is open to university students across Africa who are passionate about technology. You don't need prior coding experience – just enthusiasm and commitment to learn. We currently have CAP Tech Hubs in 35+ universities across 7 countries." },
  { q: "How much does it cost to join the programs?", a: "Both CAP and FLIP are completely free for participants. We believe in removing barriers to tech education and career advancement." },
  { q: "What is the time commitment for CAP?", a: "CAP is a 9-month program divided into three phases: Learn (12 weekly expert sessions), Build (developing real MVPs), and Launch (showcasing projects to industry leaders). Participants typically dedicate 10-15 hours per week." },
  { q: "What is FLIP and who is it for?", a: "The Female Leadership Initiative Program (FLIP) is a membership-based program empowering women in tech through mentorship, networking, and opportunities. It includes the Women Professionals in Tech Africa (WPTA) and Women Founders in Tech Africa (WFTA) communities." },
  { q: "How can organizations partner with Sara Foundation Africa?", a: "We offer various partnership models including sponsorships, university collaborations, and corporate partnerships." },
  { q: "Do students get real-world opportunities?", a: "Yes! Through our partnerships, CAP students have secured internships, full-time job offers, and showcased projects at our Talent Showcase." },
  { q: "Which countries do you operate in?", a: "We currently operate across 7 African countries: Nigeria, Ghana, Kenya, South Africa, Uganda, Zambia, and Togo, with 35+ university partners." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Sara Foundation – Empowering African Tech Talent</title>
        <meta name="description" content="Sara Foundation empowers African youth and women with tech skills, mentorship, and career development across 35+ universities in 8 countries." />
        <link rel="canonical" href="https://sarafoundationafrica.com/" />
        <meta property="og:title" content="Sara Foundation – Empowering African Tech Talent" />
        <meta property="og:description" content="Sara Foundation empowers African youth and women with tech skills, mentorship, and career development across 35+ universities in 8 countries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sara Foundation – Empowering African Tech Talent" />
        <meta name="twitter:description" content="Sara Foundation empowers African youth and women with tech skills, mentorship, and career development across 35+ universities in 8 countries." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "Sara Foundation Africa",
          "alternateName": "Sara Foundation",
          "description": "Non-profit empowering African youth and women through tech education, mentorship, and career development across 35+ universities in 8 countries.",
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
      <main>
        <HeroSection />
        <SDGSection />
        <WorkWithUsSection />
        <MissionSection />
        <ProgramsSection />
        <ImpactSection />
        <ImpactReportSection />
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
