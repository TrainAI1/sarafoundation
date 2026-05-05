import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase, CheckCircle2, ArrowRight, Sparkles, AlertTriangle,
  Clock, Users, GraduationCap, BadgeCheck,
} from "lucide-react";

const steps = [
  { icon: GraduationCap, title: "Submit your application", desc: "Fill the short form — no payment required, it's completely free." },
  { icon: BadgeCheck, title: "Get shortlisted", desc: "Our team reviews and shortlists qualified graduates from our network." },
  { icon: Users, title: "1-week refresher training", desc: "Shortlisted applicants attend a free refresher to meet placement standards." },
  { icon: Briefcase, title: "Proceed to placement consideration", desc: "Strong candidates are referred for the 12-month paid placement (Q3 2026 start)." },
];

export default function ProgramGJP() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Govt Job Placement (GJP) – Sara Foundation Africa</title>
        <meta name="description" content="Exclusive 12-month government-backed job placement opportunity for NYSC graduates. Up to ₦150,000/month. Only 500 priority slots — apply through Sara Foundation." />
        <link rel="canonical" href="https://sarafoundationafrica.com/programs/gjp" />
        <meta property="og:title" content="GJP – Govt Job Placement for NYSC Graduates" />
        <meta property="og:description" content="500 priority slots for Nigerian NYSC graduates. Earn up to ₦150,000/month for 12 months. Training and referral are free." />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="section-container relative px-4 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Exclusive Opportunity · 500 Slots Only
          </span>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-5">
            Govt Job Placement <span className="gradient-text">(GJP)</span>
            <br className="hidden md:block" />
            <span className="text-2xl md:text-4xl block mt-2 text-muted-foreground font-semibold">
              for NYSC Graduates
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Sara Foundation has secured an exclusive partnership to connect qualified Nigerian graduates
            to <strong className="text-foreground">12-month government-backed placements</strong> across public and private firms,
            starting <strong className="text-foreground">Q3 2026</strong>. Successful candidates may earn up to
            <strong className="text-foreground"> ₦150,000 monthly</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-xl glow-effect">
              <Link to="/programs/gjp/apply">Apply Now <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            ⏳ First come, first serve. Slots are limited and filling fast.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Already applied? <Link to="/programs/gjp/status" className="text-primary hover:underline font-medium">Check your status →</Link>
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="section-container px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Who Can Apply</span>
            <h2 className="section-title text-foreground">Eligibility Requirements</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div className="card-modern p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Be a graduate</h3>
                <p className="text-sm text-muted-foreground">From any recognized Nigerian or international institution.</p>
              </div>
            </div>
            <div className="card-modern p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Completed NYSC</h3>
                <p className="text-sm text-muted-foreground">Must have served and discharged from National Youth Service Corps.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Apply */}
      <section className="py-14 md:py-20">
        <div className="section-container px-4 max-w-4xl text-center">
          <span className="section-badge mb-4">Why Apply Through Us</span>
          <h2 className="section-title text-foreground mb-6">
            <span className="gradient-text">500 Priority Slots</span> out of 30,000 graduates nationwide
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Sara Foundation has been allocated only <strong className="text-foreground">500 priority slots</strong> from
            the national pool of <strong className="text-foreground">30,000 graduates</strong>. Applying through us gives
            you a significantly stronger chance of selection — especially if you act early.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-14 md:py-20 bg-secondary/30">
        <div className="section-container px-4 max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <span className="section-badge mb-4">How It Works</span>
            <h2 className="section-title text-foreground">Your Pathway to Placement</h2>
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

      {/* Fee */}
      <section className="py-14 md:py-20">
        <div className="section-container px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Cost</span>
            <h2 className="section-title text-foreground">
              Application, training & referral are <span className="gradient-text">100% FREE</span>
            </h2>
          </div>
          <div className="card-modern p-8 text-center border-t-4 border-t-accent bg-accent/5 max-w-md mx-auto">
            <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">No Fees. No Charges.</p>
            <div className="text-4xl md:text-5xl font-bold font-display text-accent mb-2">FREE</div>
            <p className="text-sm text-muted-foreground">
              No application fee, no training fee, no referral fee. Just submit your form.
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">Important Disclaimer</p>
              <p className="text-muted-foreground">
                This opportunity is <strong>not 100% guaranteed</strong>, but it gives qualified graduates a
                strong pathway into a paid 1-year role. Final selection rests with the placement firms.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg" className="rounded-xl glow-effect">
              <Link to="/programs/gjp/apply">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" /> Slots fill on a first-come, first-serve basis
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}