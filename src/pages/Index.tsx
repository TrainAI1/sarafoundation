import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SDGSection } from "@/components/sections/SDGSection";
import { WorkWithUsSection } from "@/components/sections/WorkWithUsSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { OutcomeFocusedSection } from "@/components/sections/OutcomeFocusedSection";
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
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <SDGSection />
        <WorkWithUsSection />
        <MissionSection />
        <OutcomeFocusedSection />
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
