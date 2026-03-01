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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Sara Foundation – Empowering African Tech Talent</title>
        <meta name="description" content="Sara Foundation empowers African youth and women with tech skills, mentorship, and career development across 35+ universities in 8 countries." />
        <link rel="canonical" href="https://sarafoundation.lovable.app/" />
        <meta property="og:title" content="Sara Foundation – Empowering African Tech Talent" />
        <meta property="og:description" content="Sara Foundation empowers African youth and women with tech skills, mentorship, and career development across 35+ universities in 8 countries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundation.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NonProfit",
          "name": "Sara Foundation Africa",
          "description": "Non-profit empowering African youth and women through tech education and career development.",
          "url": "https://sarafoundation.lovable.app",
          "foundingDate": "2023",
          "areaServed": "Africa"
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
