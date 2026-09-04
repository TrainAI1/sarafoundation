import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Clock } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

export default function AnnualReports() {
  const { data: c } = usePageContent("annual-reports-page", {
    hero_badge: "Annual Reports",
    hero_headline_part1: "Transparency &",
    hero_headline_gradient: "accountability.",
    hero_description:
      "We publish annual impact reports covering programmes delivered, learners reached, financial stewardship, and outcomes across our partner universities and countries. Read or download our reports below.",
    reports: [
      {
        year: "2025",
        title: "Sara Foundation Africa — 2025 Impact Report",
        summary: "763 learners trained across 35 universities in 8 African countries, the launch of the FLIP Fellowship, our first CAP and FLIP conferences, and continued Education Journey Pathway activity.",
        href: "https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk",
        status: "available",
      },
      {
        year: "2024",
        title: "Sara Foundation Africa — 2024 Impact Report",
        summary: "Our first full year: the inaugural CAP cohort across founding partner universities, the start of our knowledge and expert sessions, and the establishment of our governance, leadership team and operating model.",
        href: "https://drive.google.com/file/d/1DjVw-vTf6ugcp75rFVCUCKM4zictzDKN/view?usp=drivesdk",
        status: "available",
      },
    ],
    closing_headline: "Questions about our reports?",
    closing_description:
      "Registered as Princess Sara Foundation in Nigeria (CAC charity number 7980056). Contact us for governance documents, audited financials, or partnership due-diligence packs.",
  });

  const reports = c.reports as { year: string; title: string; summary: string; href: string; status: string }[];

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
      <main id="main-content" className="pt-24 md:pt-32">
        <section className="section-container pb-12">
          <span className="section-badge mb-4"><FileText className="w-4 h-4" /> {c.hero_badge}</span>
          <h1 className="section-title text-foreground mb-4 max-w-3xl">
            {c.hero_headline_part1} <span className="gradient-text">{c.hero_headline_gradient}</span>
          </h1>
          <p className="section-subtitle max-w-3xl">
            {c.hero_description}
          </p>
        </section>

        <section className="section-container pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map(r => (
              <Card key={r.year} className="p-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display font-bold text-3xl gradient-text">{r.year}</span>
                  {(r.status as string) === "coming" && (
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground flex items-center gap-1 rounded">
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
          <Card className="p-8 text-center bg-primary/10 border-primary/20">
            <h2 className="font-display font-bold text-2xl mb-3">{c.closing_headline}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {c.closing_description}
            </p>
            <Button asChild><Link to="/contact">Contact us</Link></Button>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}