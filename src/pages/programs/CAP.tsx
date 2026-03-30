import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { CAPHeroSection } from "@/components/programs/cap/CAPHeroSection";
import { CAPProblemsSection } from "@/components/programs/cap/CAPProblemsSection";
import { CAPSolutionsSection } from "@/components/programs/cap/CAPSolutionsSection";
import { CAPPhasesSection } from "@/components/programs/cap/CAPPhasesSection";
import { CAPTracksSection } from "@/components/programs/cap/CAPTracksSection";
import { CAPForStudentsSection } from "@/components/programs/cap/CAPForStudentsSection";
import { CAPForSchoolsSection } from "@/components/programs/cap/CAPForSchoolsSection";
import { CAPImpactSection } from "@/components/programs/cap/CAPImpactSection";
import { CAPProgramFeeSection } from "@/components/programs/cap/CAPProgramFeeSection";
import { CAPRecognitionSection } from "@/components/programs/cap/CAPRecognitionSection";
import { CAPCTASection } from "@/components/programs/cap/CAPCTASection";

export default function ProgramCAP() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CAP Tech Hub – Career Advancement Program | Sara Foundation Africa</title>
        <meta name="description" content="Join CAP Tech Hub – a 3-month intensive program equipping African university students with skills, projects, and confidence to launch real tech careers across 35+ universities in 8 countries." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/cap" />
        <meta property="og:title" content="CAP Tech Hub – Career Advancement Program | Sara Foundation Africa" />
        <meta property="og:description" content="A 3-month intensive program equipping African university students to launch real tech careers across 35+ universities in 8 countries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/programs/cap" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CAP Tech Hub – Career Advancement Program | Sara Foundation Africa" />
        <meta name="twitter:description" content="A 3-month intensive program equipping African university students to launch real tech careers across 35+ universities in 8 countries." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
      </Helmet>
      <Navbar />
      <CAPHeroSection />
      <CAPProblemsSection />
      <CAPSolutionsSection />
      <CAPPhasesSection />
      <CAPTracksSection />
      <CAPForStudentsSection />
      <CAPForSchoolsSection />
      <CAPImpactSection />
      <CAPProgramFeeSection />
      <CAPRecognitionSection />
      <CAPCTASection />
      <Footer />
    </div>
  );
}
