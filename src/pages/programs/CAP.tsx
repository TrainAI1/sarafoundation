import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { CAPHeroSection } from "@/components/programs/cap/CAPHeroSection";
import { CAPProblemsSection } from "@/components/programs/cap/CAPProblemsSection";
import { CAPSolutionsSection } from "@/components/programs/cap/CAPSolutionsSection";
import { CAPMissionVisionSection } from "@/components/programs/cap/CAPMissionVisionSection";
import { CAPTracksSection } from "@/components/programs/cap/CAPTracksSection";
import { CAPPhasesSection } from "@/components/programs/cap/CAPPhasesSection";
import { CAPImpactSection } from "@/components/programs/cap/CAPImpactSection";
import { CAPCTASection } from "@/components/programs/cap/CAPCTASection";

export default function ProgramCAP() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CAP – Career Advancement Program | Sara Foundation Africa</title>
        <meta name="description" content="Join the Career Advancement Program (CAP) – a 9-month rotational tech program establishing tech hubs across 35+ African universities in 7 countries." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/cap" />
        <meta property="og:title" content="CAP – Career Advancement Program | Sara Foundation Africa" />
        <meta property="og:description" content="Join the Career Advancement Program (CAP) – a 9-month rotational tech program across 35+ African universities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/programs/cap" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CAP – Career Advancement Program | Sara Foundation Africa" />
        <meta name="twitter:description" content="Join the Career Advancement Program (CAP) – a 9-month rotational tech program across 35+ African universities." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
      </Helmet>
      <Navbar />
      <CAPHeroSection />
      <CAPProblemsSection />
      <CAPSolutionsSection />
      <CAPMissionVisionSection />
      <CAPTracksSection />
      <CAPPhasesSection />
      <CAPImpactSection />
      <CAPCTASection />
      <Footer />
    </div>
  );
}
