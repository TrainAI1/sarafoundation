import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles, Search, Copy } from "lucide-react";
import { Button as _B } from "@/components/ui/button";
import { toast } from "sonner";

export default function GJPSuccess() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const shortId = appId ? appId.slice(0, 8) : null;
  const copyId = async () => {
    if (!shortId) return;
    await navigator.clipboard.writeText(shortId);
    toast.success("Application ID copied");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Application Received – GJP | Sara Foundation</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="card-modern p-6 md:p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-[hsl(240,80%,50%)] flex items-center justify-center mb-6 glow-effect">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" /> Application Received
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              You're on the GJP shortlist queue!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Your application has been received. Our team will review and contact
              shortlisted applicants via email and WhatsApp with next steps.
            </p>

            <div className="rounded-xl bg-secondary/40 p-5 text-left mb-8">
              <p className="font-semibold text-foreground mb-3">What happens next?</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="font-bold text-primary">1.</span> Confirmation email (check spam too).</li>
                <li className="flex gap-3"><span className="font-bold text-primary">2.</span> Shortlisting from the 500 priority slot pool.</li>
                <li className="flex gap-3"><span className="font-bold text-primary">3.</span> Free 1-week refresher training for shortlisted candidates.</li>
                <li className="flex gap-3"><span className="font-bold text-primary">4.</span> Referral for placement consideration (Q3 2026 start).</li>
              </ol>
              {shortId && (
                <div className="mt-4 rounded-lg bg-background border border-border p-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Your Application ID — save this to track status</p>
                    <p className="font-mono text-sm font-semibold text-foreground">{shortId}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={copyId} className="rounded-lg flex-shrink-0">
                    <Copy className="w-3 h-3" /> Copy
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1 glow-effect rounded-xl">
                <Link to="/programs/gjp/status">
                  <Search className="w-4 h-4" /> Track My Status
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 rounded-xl">
                <Link to="/programs/gjp">Back to GJP <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}