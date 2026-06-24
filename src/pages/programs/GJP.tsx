import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase, ArrowRight, Sparkles, Users, GraduationCap, BadgeCheck,
  Building2, Globe, Handshake, Target, TrendingUp,
} from "lucide-react";

const steps = [
  { icon: GraduationCap, title: "Talent Identification", desc: "We source and engage qualified African tech professionals with relevant skills and career aspirations." },
  { icon: Target, title: "Employer Matching", desc: "We work closely with hiring partners to understand workforce needs, technical requirements, and organisational culture." },
  { icon: Handshake, title: "Placement Support", desc: "Our team facilitates introductions, interviews, assessments, and placement processes." },
  { icon: TrendingUp, title: "Career Success", desc: "We continue supporting talent and employers to ensure successful onboarding and long-term outcomes." },
];

export default function ProgramGJP() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Employment & Job Placement Pipeline (EJP) – Sara Foundation Africa</title>
        <meta name="description" content="EJP connects Africa's top tech talent with employers across the continent. 705+ professionals referred for placement through public and private sector partnerships." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/gjp" />
        <meta property="og:title" content="EJP – Employment & Job Placement Pipeline" />
        <meta property="og:description" content="Connecting Africa's top tech talent with employers. 705+ professionals referred for placement across Africa." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="section-container relative px-4 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" /> 705+ Professionals Referred Across Africa
          </span>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-5">
            Employment & Job Placement <span className="gradient-text">Pipeline (EJP)</span>
            <br className="hidden md:block" />
            <span className="text-2xl md:text-4xl block mt-2 text-muted-foreground font-semibold">
              Connecting Africa's Top Tech Talent with Employers
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            EJP is Sara Foundation Africa's workforce placement initiative, bridging the gap between
            <strong className="text-foreground"> skilled African tech talent</strong> and meaningful employment.
            Through strategic partnerships with private and public sector organisations, we help companies
            hire faster while creating pathways to <strong className="text-foreground">internships, graduate programmes and full-time roles</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-xl glow-effect">
              <Link to="/programs/gjp/apply">For Talent <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link to="/partnership/organizations">For Employers</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Already applied? <Link to="/programs/gjp/status" className="text-primary hover:underline font-medium">Check your status →</Link>
          </p>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="section-container px-4 max-w-3xl text-center">
          <span className="section-badge mb-4">The Challenge</span>
          <h2 className="section-title text-foreground mb-6">Closing Africa's Talent–Employment Gap</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Across Africa, organisations struggle to find job-ready technology talent, while thousands of
            skilled young professionals struggle to access quality employment opportunities.
            <strong className="text-foreground"> EJP was created to close this gap</strong> — preparing
            candidates for the workplace and facilitating successful placements into internships,
            graduate programmes, and full-time roles.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-14 md:py-20">
        <div className="section-container px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Our Impact</span>
            <h2 className="section-title text-foreground">By The Numbers</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Users, value: "705+", label: "Talent referrals facilitated" },
              { icon: Globe, value: "Multiple", label: "Countries across Africa's tech ecosystem" },
              { icon: Building2, value: "Public & Private", label: "Sector partnerships" },
            ].map((s) => (
              <div key={s.label} className="card-modern p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold font-display text-foreground mb-1">{s.value}</div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Partners */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="section-container px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Our Placement Partners</span>
            <h2 className="section-title text-foreground">Public & Private Sector Collaboration</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="card-modern p-6">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-foreground">Public Sector</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Government initiatives and youth employment & workforce development programmes.
                We have previously worked with the <strong className="text-foreground">Nigerian government</strong>.
              </p>
            </div>
            <div className="card-modern p-6">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-foreground">Private Sector</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Technology companies, startups and scale-ups, and corporate employers across Africa.
                We have previously hired for leading tech startups like <strong className="text-foreground">Farmily and Scintilla</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-14 md:py-20">
        <div className="section-container px-4 max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <span className="section-badge mb-4">How It Works</span>
            <h2 className="section-title text-foreground">How EJP Works</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="card-modern p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(240,80%,50%)] text-white flex items-center justify-center flex-shrink-0 font-display font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-display font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers / For Talent */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="section-container px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="card-modern p-7">
              <span className="section-badge mb-4">For Employers</span>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Access a Curated Talent Pipeline</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                <li>• Reduce hiring time and recruitment costs</li>
                <li>• Access qualified technology talent</li>
                <li>• Build diverse and inclusive teams</li>
                <li>• Strengthen youth employment outcomes</li>
                <li>• Scale hiring across African markets</li>
              </ul>
              <Button asChild className="rounded-xl">
                <Link to="/partnership/organizations">Partner with EJP <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="card-modern p-7">
              <span className="section-badge mb-4">For Talent</span>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">Unlock Career Opportunities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                <li>• Internship opportunities</li>
                <li>• Graduate programmes</li>
                <li>• Full-time employment roles</li>
                <li>• Industry connections</li>
                <li>• Career development pathways</li>
              </ul>
              <Button asChild className="rounded-xl glow-effect">
                <Link to="/programs/gjp/apply">Join the Pipeline <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why EJP Matters / CTA */}
      <section className="py-14 md:py-20">
        <div className="section-container px-4 max-w-3xl text-center">
          <span className="section-badge mb-4">Why EJP Matters</span>
          <h2 className="section-title text-foreground mb-5">An Employment Ecosystem for Africa's Future</h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            The future of Africa's digital economy depends on connecting skilled talent with opportunity.
            EJP is more than a placement programme — it's an ecosystem that helps employers find talent,
            supports economic growth, and creates sustainable career pathways for Africa's next generation
            of technology professionals.
          </p>
          <Button asChild size="lg" className="rounded-xl glow-effect">
            <Link to="/partnership/organizations">
              Become an EJP Hiring Partner <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}