import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Scale, Users, FileText, Globe2, BookOpenCheck } from "lucide-react";

const purposes = [
  {
    title: "Digital Education",
    description:
      "Advancing education by providing structured digital learning that builds digital literacy, practical skills, understanding of emerging technologies and confidence to continue learning.",
  },
  {
    title: "Social Inclusion",
    description:
      "Promoting inclusion by providing access to mentoring, supportive networks, educational resources and development opportunities for people facing financial, social or structural barriers.",
  },
  {
    title: "Community Capacity Building",
    description:
      "Strengthening communities through mentoring, volunteering, peer support, knowledge-sharing and opportunities for participants to contribute what they learn.",
  },
];

const policies = [
  "Safeguarding Policy",
  "Conflicts of Interest Policy",
  "Financial Controls / Anti-Fraud Policy",
  "Complaints Policy",
  "Privacy Policy",
  "Cookies Policy",
  "Accessibility Statement",
  "Volunteer Code of Conduct",
];

const internationalControls = [
  { title: "Due diligence", description: "Checks on delivery partners and organisations involved in overseas activity before funds or activities are approved." },
  { title: "Written agreements", description: "Documented terms setting out the purpose, use of funds, reporting and safeguarding expectations for each partner." },
  { title: "Monitoring", description: "Ongoing review of activity, spend and outcomes against the agreed charitable purpose." },
  { title: "Safeguarding", description: "Safeguarding expectations applied to all activity involving participants, volunteers and partners." },
  { title: "Financial controls", description: "Controls over the transfer, use and reconciliation of charitable funds used overseas." },
  { title: "Trustee oversight", description: "Trustees retain responsibility for approving, reviewing and, where needed, pausing overseas activity." },
];

const Placeholder = ({ label }: { label: string }) => (
  <span className="inline-block rounded-lg bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground border border-dashed border-border">
    {label}
  </span>
);

const Transparency = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Transparency &amp; Governance | Sara Foundation Africa</title>
        <meta
          name="description"
          content="How Sara Foundation Africa is governed: charitable purposes, trustees, policies, safeguarding, international delivery controls and annual reporting."
        />
        <link rel="canonical" href="https://sarafoundationafrica.com/transparency" />
      </Helmet>
      <Navbar />
      <main id="main-content">
        <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-primary">
          <div className="section-container">
            <div className="max-w-3xl px-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-6">
                Transparency &amp; Governance
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                How we are governed and held to account
              </h1>
              <p className="text-base md:text-xl text-white/70 leading-relaxed">
                We are committed to public benefit, responsible stewardship and evidence-led learning. Our
                trustees oversee programme design, partnerships, safeguarding, finance, risk and
                international delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Charity status */}
        <section className="py-16 md:py-20 bg-background">
          <div className="section-container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Charity status</h2>
            </div>
            <dl className="grid sm:grid-cols-2 gap-4">
              <div className="card-modern p-5">
                <dt className="text-sm font-semibold text-foreground mb-1">Nigeria registration</dt>
                <dd className="text-sm text-muted-foreground">
                  Registered as Princess Sara Foundation with CAC charity number 7980056.
                </dd>
              </div>
              <div className="card-modern p-5">
                <dt className="text-sm font-semibold text-foreground mb-1">UK legal form and status</dt>
                <dd className="text-sm text-muted-foreground">
                  <Placeholder label="[CONTENT REQUIRED: UK legal form and registration status]" />
                </dd>
              </div>
              <div className="card-modern p-5">
                <dt className="text-sm font-semibold text-foreground mb-1">Charity registration number</dt>
                <dd className="text-sm text-muted-foreground">
                  <Placeholder label="[CONTENT REQUIRED: Charity registration number]" />
                </dd>
              </div>
              <div className="card-modern p-5">
                <dt className="text-sm font-semibold text-foreground mb-1">Public register link</dt>
                <dd className="text-sm text-muted-foreground">
                  <Placeholder label="[CONTENT REQUIRED: Public register link]" />
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Charitable purposes */}
        <section className="py-16 md:py-20 bg-secondary/50">
          <div className="section-container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpenCheck className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Charitable purposes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {purposes.map((purpose) => (
                <div key={purpose.title} className="card-modern p-6 h-full">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{purpose.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{purpose.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trustees */}
        <section className="py-16 md:py-20 bg-background">
          <div className="section-container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Trustees</h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Trustees are responsible for the Foundation's charitable purposes, the protection of charitable
              resources, safeguarding, partner due diligence and beneficiary selection.
            </p>
            <div className="card-modern p-6">
              <Placeholder label="[CONTENT REQUIRED: Trustee names, roles, relevant experience and governance responsibilities]" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Our leadership team and advisers are listed on the{" "}
              <Link to="/about" className="text-primary hover:underline">
                About Us page
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Policies */}
        <section id="safeguarding" className="py-16 md:py-20 bg-secondary/50 scroll-mt-24">
          <div className="section-container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Policies and safeguarding
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Safeguarding applies to all learning activity, mentoring, volunteering and events. Published
              policy documents will be linked here as they are approved.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {policies.map((policy) => (
                <li key={policy} className="card-modern p-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">{policy}</span>
                  {policy === "Privacy Policy" ? (
                    <Link to="/privacy" className="text-sm text-primary hover:underline flex-shrink-0">
                      Read
                    </Link>
                  ) : policy === "Accessibility Statement" ? (
                    <Link to="/accessibility" className="text-sm text-primary hover:underline flex-shrink-0">
                      Read
                    </Link>
                  ) : (
                    <span className="text-xs text-muted-foreground flex-shrink-0">[CONTENT REQUIRED]</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* International delivery */}
        <section className="py-16 md:py-20 bg-background">
          <div className="section-container max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <Globe2 className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                International delivery
              </h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Much of our learning activity is delivered outside the United Kingdom. The following controls
              apply to overseas activity.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {internationalControls.map((control) => (
                <div key={control.title} className="card-modern p-5 h-full">
                  <h3 className="font-semibold text-foreground mb-2">{control.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{control.description}</p>
                </div>
              ))}
            </div>
            <div className="card-modern p-6 mt-6">
              <Placeholder label="[CONTENT REQUIRED: Description of Nigeria operating / delivery partner relationship]" />
            </div>
          </div>
        </section>

        {/* Annual reporting */}
        <section className="py-16 md:py-20 bg-secondary/50">
          <div className="section-container max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Annual reporting</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card-modern p-5">
                <h3 className="font-semibold text-foreground mb-2">Annual reports</h3>
                <Link to="/annual-reports" className="text-sm text-primary hover:underline">
                  View annual reports
                </Link>
              </div>
              <div className="card-modern p-5">
                <h3 className="font-semibold text-foreground mb-2">Accounts</h3>
                <Placeholder label="[CONTENT REQUIRED: Annual accounts]" />
              </div>
              <div className="card-modern p-5">
                <h3 className="font-semibold text-foreground mb-2">Impact reports</h3>
                <Link to="/projects" className="text-sm text-primary hover:underline">
                  See our impact evidence
                </Link>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Button asChild>
                <Link to="/contact">Contact us about governance</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Transparency;
