import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Clock } from "lucide-react";

const reports = [
  {
    year: "2025",
    title: "Sara Foundation Africa — 2025 Impact Report",
    summary: "763 students trained across 35 universities in 11 African countries, the launch of the FLIP Fellowship, expanded WPTA and WFTA communities, and our first Government Job Placement cohort.",
    href: "https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk",
    status: "available" as const,
  },
  {
    year: "2024",
    title: "Sara Foundation Africa — 2024 Impact Report",
    summary: "Inaugural CAP cohort across founding partner universities, formation of the WPTA community, and the establishment of our governance, leadership team and operating model.",
    href: "https://drive.google.com/file/d/1DjVw-vTf6ugcp75rFVCUCKM4zictzDKN/view?usp=drivesdk",
    status: "available" as const,
  },
];

export default function AnnualReports() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Annual Reports | Sara Foundation Africa</title>
        <meta name="description" content="Read Sara Foundation Africa's annual impact reports covering programs, reach, finances, partners and outcomes across our work in African tech education." />
        <link rel="canonical" href="https://sarafoundationafrica.com/annual-reports" />
        <meta property="og:title" content="Annual Reports | Sara Foundation Africa" />
        <meta property="og:description" content="Annual impact reports and accountability documents." />
        <meta property="og:url" content="https://sarafoundationafrica.com/annual-reports" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="section-container pb-12">
          <span className="section-badge mb-4"><FileText className="w-4 h-4" /> Annual Reports</span>
          <h1 className="section-title text-foreground mb-4 max-w-3xl">
            Transparency & <span className="gradient-text">accountability.</span>
          </h1>
          <p className="section-subtitle max-w-3xl">
            We publish annual impact reports covering programs delivered, students reached, financial stewardship, and
            outcomes across our partner universities and countries. Read or download our reports below.
          </p>
        </section>

        <section className="section-container pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map(r => (
              <Card key={r.year} className="p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display font-bold text-3xl gradient-text">{r.year}</span>
                  {(r.status as string) === "coming" && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Coming soon
                    </span>
                  )}
                </div>
                <h2 className="font-display font-bold text-lg mb-2">{r.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{r.summary}</p>
                {r.status === "available" ? (
                  <Button asChild>
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-1" /> Read Full Report
                    </a>
                  </Button>
                ) : (
                  <Button disabled variant="outline">Coming soon</Button>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="section-container pb-24">
          <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="font-display font-bold text-2xl mb-3">Questions about our reports?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Registered as Princess Sara Foundation in Nigeria (CAC charity number 7980056). Contact us for governance documents, audited financials, or partnership due-diligence packs.
            </p>
            <Button asChild><Link to="/contact">Contact us</Link></Button>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}