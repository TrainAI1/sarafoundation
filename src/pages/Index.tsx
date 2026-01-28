import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SDGSection } from "@/components/sections/SDGSection";
import { WorkWithUsSection } from "@/components/sections/WorkWithUsSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { DonationSection } from "@/components/sections/DonationSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <SDGSection />
        <WorkWithUsSection />
        <MissionSection />
        <ProgramsSection />
        <ImpactSection />
        <DonationSection />
        <PartnersSection />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
