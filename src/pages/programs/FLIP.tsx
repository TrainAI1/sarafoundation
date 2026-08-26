import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { FLIPHeroSection } from "@/components/programs/flip/FLIPHeroSection";
import { FLIPMissionVisionSection } from "@/components/programs/flip/FLIPMissionVisionSection";
import { FLIPInitiativesSection } from "@/components/programs/flip/FLIPInitiativesSection";
import { FLIPBenefitsSection } from "@/components/programs/flip/FLIPBenefitsSection";
import { FLIPImpactSection } from "@/components/programs/flip/FLIPImpactSection";
import { FLIPCapstoneShowcase } from "@/components/programs/flip/FLIPCapstoneShowcase";
import { FLIPGenderGapSection } from "@/components/programs/flip/FLIPGenderGapSection";
import { FLIPMembershipSection } from "@/components/programs/flip/FLIPMembershipSection";
import { FLIPCTASection } from "@/components/programs/flip/FLIPCTASection";

export default function ProgramFLIP() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FLIP: Female Learning &amp; Inclusion Pathway | Sara Foundation Africa</title>
        <meta name="description" content="FLIP creates inclusive access to digital learning for women through mentoring, structured learning, practical projects, supportive communities and access support." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/flip" />
        <meta property="og:title" content="FLIP: Female Learning &amp; Inclusion Pathway | Sara Foundation Africa" />
        <meta property="og:description" content="FLIP creates inclusive access to digital learning for women through mentoring, structured learning, practical projects, supportive communities and access support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarafoundationafrica.com/programs/flip" />
        <meta property="og:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FLIP: Female Learning &amp; Inclusion Pathway | Sara Foundation Africa" />
        <meta name="twitter:description" content="FLIP creates inclusive access to digital learning for women through mentoring, structured learning, practical projects, supportive communities and access support." />
        <meta name="twitter:image" content="https://sarafoundationafrica.com/hero-students.jpg" />
      </Helmet>
      <Navbar />
      <FLIPHeroSection />
      <FLIPMissionVisionSection />
      <FLIPInitiativesSection />
      <FLIPBenefitsSection />
      <FLIPImpactSection />
      <FLIPCapstoneShowcase />
      <FLIPGenderGapSection />
      <FLIPMembershipSection />
      <FLIPCTASection />
      <Footer />
    </div>
  );
}
