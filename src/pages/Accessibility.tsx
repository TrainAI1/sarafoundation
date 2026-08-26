import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const commitments = [
  "Clear headings, short paragraphs and plain language across the website.",
  "Descriptive links that make sense when read on their own.",
  "Meaningful alternative text for programme and learner images, with decorative images marked appropriately.",
  "Keyboard-accessible navigation, forms and donation journeys.",
  "Sufficient colour contrast, and no essential information communicated by graphics alone.",
  "Captions or transcripts for video content where these are available.",
  "Clear eligibility, dates, costs, free access and bursary availability on every programme page.",
];

const Accessibility = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Accessibility | Sara Foundation Africa</title>
        <meta
          name="description"
          content="Our accessibility commitments, known limitations and how to tell us about a barrier you have experienced on the Sara Foundation Africa website."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/accessibility" />
      </Helmet>
      <Navbar />
      <main id="main-content">
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-primary">
          <div className="section-container max-w-3xl px-4">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Accessibility
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              Many of the people we support reach us on a mobile device and on limited data. We want this
              website to work for them.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="section-container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our commitments
            </h2>
            <ul className="space-y-3">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">
              Conformance status
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground border border-dashed border-border">
                [CONTENT REQUIRED: Accessibility conformance statement and date of last review]
              </span>
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">
              Tell us about a barrier
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If something on this website is difficult to use, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>{" "}
              and tell us what you were trying to do. We will respond and, where we can, fix the problem or
              provide the information another way.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
