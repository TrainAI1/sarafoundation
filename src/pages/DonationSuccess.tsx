import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function DonationSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState<"loading" | "paid" | "unpaid">("loading");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (!sessionId) { setState("unpaid"); return; }
    supabase.functions.invoke("verify-stripe-session", { body: { session_id: sessionId } })
      .then(({ data }) => {
        if (data?.paid) {
          setState("paid");
          if (data.amount && data.currency) {
            setAmount(`${data.currency} ${(data.amount / 100).toFixed(2)}`);
          }
        } else setState("unpaid");
      })
      .catch(() => setState("unpaid"));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Thank you for your donation – Sara Foundation</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="card-modern p-6 md:p-10 text-center">
            {state === "loading" ? (
              <><Loader2 className="w-10 h-10 mx-auto animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Confirming your donation...</p></>
            ) : state === "paid" ? (
              <>
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-[hsl(200,80%,55%)] flex items-center justify-center mb-6 glow-effect">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-semibold mb-4">
                  <Heart className="w-3 h-3" /> Donation Received
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Thank you for your generosity!
                </h1>
                <p className="text-muted-foreground text-base md:text-lg mb-2">
                  Your gift directly funds scholarships, mentorship, and tech training for African youth and women.
                </p>
                {amount && <p className="text-sm font-mono text-muted-foreground mb-6">Amount: {amount}</p>}
                <p className="text-sm text-muted-foreground mb-8">A receipt has been emailed to you by Stripe.</p>
                <Button asChild size="lg" className="glow-effect rounded-xl">
                  <Link to="/">Return Home</Link>
                </Button>
              </>
            ) : (
              <>
                <h1 className="font-display text-2xl font-bold text-foreground mb-3">Donation not confirmed</h1>
                <p className="text-muted-foreground mb-6">We couldn't verify your payment. If you were charged, please contact us.</p>
                <Button asChild variant="outline"><Link to="/donation">Try again</Link></Button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}