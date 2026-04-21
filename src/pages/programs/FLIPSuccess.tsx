import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function FLIPSuccess() {
  const [params] = useSearchParams();
  const appId = params.get("app");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Welcome to FLIP! – Sara Foundation</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="card-modern p-6 md:p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-[hsl(350,80%,55%)] flex items-center justify-center mb-6 glow-effect">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" /> Enrollment Confirmed
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              You're officially enrolled!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Welcome to the FLIP Fellowship. We've received your payment and saved your application. 
              Our team will reach out within 48 hours with onboarding details and a link to join the community.
            </p>

            <div className="rounded-xl bg-secondary/40 p-5 text-left mb-8">
              <p className="font-semibold text-foreground mb-3">What happens next?</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="font-bold text-accent">1.</span> Confirmation email with your reference (check spam too).</li>
                <li className="flex gap-3"><span className="font-bold text-accent">2.</span> Onboarding pack and WhatsApp community invite within 48 hours.</li>
                <li className="flex gap-3"><span className="font-bold text-accent">3.</span> A short interview call to match you with the right mentor.</li>
              </ol>
              {appId && <p className="text-xs text-muted-foreground mt-3 font-mono">Ref: {appId.slice(0, 8)}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1 glow-effect rounded-xl">
                <Link to="/programs/flip">Back to FLIP <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 rounded-xl">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}