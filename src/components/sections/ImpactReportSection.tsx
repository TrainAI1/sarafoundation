import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import capGraduates from "@/assets/cap-graduates-2025.jpg";

const reports = [
  {
    year: "2025",
    title: "2025 Annual Impact Report",
    summary:
      "763 CAP learners given fully funded access across Cohorts 1 and 2, the launch of the FLIP Fellowship and our first FLIP and CAP conferences.",
    href: "https://drive.google.com/file/d/1Ex55tpVH_RPB0VJygsUyw9Hp74RyPKR_/view?usp=drivesdk",
  },
  {
    year: "2024",
    title: "2024 Annual Impact Report",
    summary:
      "Our first full year: the inaugural CAP cohort, the start of our knowledge and expert sessions, and the leadership, governance and operating model behind the work.",
    href: "https://drive.google.com/file/d/1DjVw-vTf6ugcp75rFVCUCKM4zictzDKN/view?usp=drivesdk",
  },
];

export function ImpactReportSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50 relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <ScrollAnimation variant="slide-left">
            <div>
              <span className="section-badge mb-4 md:mb-6">
                <FileText className="w-4 h-4" aria-hidden="true" />
                Annual Impact Reports
              </span>
              <h2 className="section-title text-foreground mb-4 md:mb-6">
                Read our <span className="gradient-text">impact reports</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8">
                Our annual reports set out what we delivered, who benefited and what we learned. Both the
                2024 and 2025 reports are available to read in full.
              </p>

              <ul className="space-y-4 mb-8">
                {reports.map((report) => (
                  <li key={report.year} className="card-modern p-5">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-bold text-white flex-shrink-0">
                        {report.year}
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-base text-foreground mb-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{report.summary}</p>
                        <a
                          href={report.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Read the {report.year} impact report
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Button variant="outline" size="lg" className="group" asChild>
                <Link to="/annual-reports">
                  All annual reports
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>

          {/* Image */}
          <ScrollAnimation variant="slide-right">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={capGraduates}
                alt="CAP learners celebrating the completion of the 2025 cohort"
                className="w-full h-64 md:h-96 object-cover"
                loading="lazy"
              />
              <div className="bg-primary p-4 md:p-6 text-white text-center">
                <p className="font-display font-bold text-lg">CAP learners, Class of 2025</p>
                <p className="text-white/70 text-sm">Celebrating our second cohort</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
