import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Globe, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { resumePaystack } from "@/lib/paystack";

type App = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  payment_status: string;
  preferred_track: string;
  partner_code: string | null;
  partner_code_id: string | null;
};

export default function FLIPPayment() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const navigate = useNavigate();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [plan, setPlan] = useState<"full" | "partner_split">("full");
  const [processing, setProcessing] = useState<null | "stripe" | "paystack">(null);

  useEffect(() => {
    if (!appId) {
      navigate("/programs/flip/apply", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("flip_applications")
        .select("id, email, first_name, last_name, payment_status, preferred_track, partner_code, partner_code_id")
        .eq("id", appId)
        .maybeSingle();
      if (error || !data) {
        toast.error("Application not found.");
        navigate("/programs/flip/apply", { replace: true });
        return;
      }
      if (data.payment_status === "paid") {
        navigate(`/programs/flip/success?app=${data.id}`, { replace: true });
        return;
      }
      setApp(data as App);
      setLoading(false);
    })();
  }, [appId, navigate]);

  const isPartner = !!app?.partner_code_id;

  const ngnAmount = isPartner
    ? (plan === "partner_split" ? 30000 : 90000)
    : 2000;
  const usdAmount = isPartner ? 60 : 1.30;
  const ngnDisplay = isPartner
    ? (plan === "partner_split" ? "₦30,000" : "₦90,000")
    : "₦2,000";
  const usdDisplay = isPartner ? "$60" : "$1.30";

  const payStripe = async () => {
    if (!app) return;
    if (currency === "NGN") {
      toast.error("Use Paystack for Naira payments.");
      return;
    }
    if (plan === "partner_split") {
      toast.error("The split-payment option is only available in Naira via Paystack.");
      return;
    }
    setProcessing("stripe");
    try {
      const origin = window.location.origin;
      const amount = usdAmount;
      const { data, error } = await supabase.functions.invoke("create-stripe-checkout", {
        body: {
          purpose: "flip",
          email: app.email,
          name: `${app.first_name} ${app.last_name}`,
          currency,
          amount,
          application_id: app.id,
          preferred_track: app.preferred_track,
          success_url: `${origin}/programs/flip/success?app=${app.id}`,
          cancel_url: `${origin}/programs/flip/payment?app=${app.id}`,
        },
      });
      if (error || !data?.url) {
        throw new Error(error?.message || data?.error || "Payment init failed");
      }
      window.location.href = data.url;
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Could not start payment.");
      setProcessing(null);
    }
  };

  const payPaystack = async () => {
    if (!app) return;
    setProcessing("paystack");
    try {
      const effectiveCurrency = plan === "partner_split" ? "NGN" : currency;
      const { data, error } = await supabase.functions.invoke("initialize-flip-payment", {
        body: { application_id: app.id, currency: effectiveCurrency, plan },
      });
      if (error || !data?.access_code) {
        throw new Error(error?.message || data?.error || "Could not start Paystack");
      }
      resumePaystack(data.access_code, {
        onSuccess: async () => {
          try {
            await supabase.functions.invoke("verify-flip-payment", { body: { reference: data.reference } });
          } catch (e) { console.error("verify failed:", e); }
          window.location.href = `/programs/flip/success?app=${app.id}&reference=${encodeURIComponent(data.reference)}`;
        },
        onCancel: () => { setProcessing(null); toast.message("Payment cancelled."); },
        onError: (e) => { console.error(e); setProcessing(null); toast.error("Payment failed."); },
      });
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Could not start Paystack.");
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Complete Payment – FLIP Fellowship</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2">
              Confirm Your Enrollment
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              One last step, {app?.first_name}. Choose your currency and complete payment.
            </p>
          </div>

          <div className="card-modern p-5 md:p-8 space-y-6">
            <div className="rounded-xl bg-secondary/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Application Summary</p>
              <p className="font-semibold text-foreground">{app?.first_name} {app?.last_name}</p>
              <p className="text-sm text-muted-foreground">{app?.email}</p>
              <p className="text-sm text-muted-foreground">Track: <span className="text-foreground font-medium">{app?.preferred_track}</span></p>
              {isPartner && (
                <p className="text-sm text-accent font-medium mt-2">
                  Partner code applied: <span className="font-mono">{app?.partner_code}</span>
                </p>
              )}
            </div>

            {isPartner && (
              <div>
                <p className="font-semibold text-foreground mb-3">Select payment plan</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlan("full")}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${plan === "full" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                  >
                    <div className="font-semibold text-foreground mb-1">Pay in Full</div>
                    <p className="font-display text-lg font-bold text-foreground">₦90,000</p>
                    <p className="text-xs text-muted-foreground mt-1">One-time payment</p>
                  </button>
                  <button
                    onClick={() => setPlan("partner_split")}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${plan === "partner_split" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                  >
                    <div className="font-semibold text-foreground mb-1">₦30k + ₦60k Commitment</div>
                    <p className="font-display text-lg font-bold text-foreground">₦30,000 today</p>
                    <p className="text-xs text-muted-foreground mt-1">₦60,000 logged as a tracked commitment</p>
                  </button>
                </div>
              </div>
            )}

            <div>
              <p className="font-semibold text-foreground mb-3">Select payment currency</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setCurrency("NGN")}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${currency === "NGN" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground">Nigeria (NGN)</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">{ngnDisplay}</p>
                  <p className="text-xs text-muted-foreground mt-1">Card, transfer, USSD</p>
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  disabled={plan === "partner_split"}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${currency === "USD" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground">Global (USD)</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">{usdDisplay}</p>
                  <p className="text-xs text-muted-foreground mt-1">International cards</p>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p>Payments are securely processed by Paystack and Stripe. Your card details never touch our servers.</p>
            </div>

            <div className="grid gap-2">
              <Button onClick={payPaystack} disabled={!!processing} size="lg" className="w-full glow-effect rounded-xl">
                {processing === "paystack" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Opening Paystack...</>
                ) : (
                  <>Pay {currency === "NGN" ? ngnDisplay : usdDisplay} with Paystack</>
                )}
              </Button>
              {currency === "USD" && plan !== "partner_split" && (
                <Button onClick={payStripe} disabled={!!processing} size="lg" variant="outline" className="w-full rounded-xl">
                  {processing === "stripe" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Redirecting to Stripe...</>
                  ) : (
                    <>Pay {usdDisplay} with Stripe</>
                  )}
                </Button>
              )}
            </div>

            {plan === "partner_split" && (
              <p className="text-xs text-center text-muted-foreground">
                You pay ₦30,000 now to confirm your spot. The remaining ₦60,000 is logged as a commitment and our team will follow up.
              </p>
            )}

            <Button variant="ghost" asChild className="w-full">
              <Link to="/programs/flip/apply"><ArrowLeft className="w-4 h-4" /> Edit Application</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}