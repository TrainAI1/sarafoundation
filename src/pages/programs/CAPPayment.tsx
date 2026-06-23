import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Globe, Loader2, ShieldCheck, Calendar, Wallet } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { resumePaystack } from "@/lib/paystack";

type App = {
  id: string;
  email: string;
  full_name: string;
  payment_status: string;
  payment_plan: string;
  payment_currency: string | null;
  paid_amount: number;
  installments_completed: number;
  preferred_track: string;
  partner_code: string | null;
  partner_code_id: string | null;
};

const PRICES = {
  full: { NGN: 90000, USD: 60, displayNGN: "₦90,000", displayUSD: "$60" },
  installments: { NGN: 30000, USD: 20, displayNGN: "₦30,000", displayUSD: "$20" },
  partner_split: { NGN: 30000, USD: 0, displayNGN: "₦30,000", displayUSD: "—" },
};

export default function CAPPayment() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const navigate = useNavigate();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [plan, setPlan] = useState<"full" | "installments" | "partner_split">("full");
  const [processing, setProcessing] = useState<null | "stripe" | "paystack">(null);

  useEffect(() => {
    if (!appId) {
      navigate("/programs/cap/apply", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("cap_applications")
        .select("id, email, full_name, payment_status, payment_plan, payment_currency, paid_amount, installments_completed, preferred_track, partner_code, partner_code_id")
        .eq("id", appId)
        .maybeSingle();
      if (error || !data) {
        toast.error("Application not found.");
        navigate("/programs/cap/apply", { replace: true });
        return;
      }
      if (data.payment_status === "paid") {
        navigate(`/programs/cap/success?app=${data.id}`, { replace: true });
        return;
      }
      setApp(data as App);
      // If they already started installments, lock the plan and currency
      if (data.installments_completed > 0) {
        setPlan("installments");
        if (data.payment_currency === "NGN" || data.payment_currency === "USD") {
          setCurrency(data.payment_currency);
        }
      }
      setLoading(false);
    })();
  }, [appId, navigate]);

  const lockedPlan = (app?.installments_completed ?? 0) > 0;
  const isPartner = !!app?.partner_code_id;
  const installmentsPaid = app?.installments_completed ?? 0;
  const installmentNumber = installmentsPaid + 1;

  const payStripe = async () => {
    if (!app) return;
    if (currency === "NGN") { toast.error("Use Paystack for Naira payments."); return; }
    if (plan === "partner_split") { toast.error("The split-payment option is only available in Naira via Paystack."); return; }
    setProcessing("stripe");
    try {
      const origin = window.location.origin;
      const amount = plan === "full" ? PRICES.full.USD : PRICES.installments.USD;
      const { data, error } = await supabase.functions.invoke("create-stripe-checkout", {
        body: {
          purpose: "cap",
          email: app.email,
          name: app.full_name,
          currency,
          amount,
          application_id: app.id,
          preferred_track: app.preferred_track,
          plan,
          success_url: `${origin}/programs/cap/success?app=${app.id}`,
          cancel_url: `${origin}/programs/cap/payment?app=${app.id}`,
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
      const { data, error } = await supabase.functions.invoke("initialize-cap-payment", {
        body: { application_id: app.id, currency: effectiveCurrency, plan },
      });
      if (error || !data?.access_code) {
        throw new Error(error?.message || data?.error || "Could not start Paystack");
      }
      resumePaystack(data.access_code, {
        onSuccess: async () => {
          try {
            await supabase.functions.invoke("verify-cap-payment", { body: { reference: data.reference } });
          } catch (e) { console.error("verify failed:", e); }
          window.location.href = `/programs/cap/success?app=${app.id}&reference=${encodeURIComponent(data.reference)}`;
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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentPrice = plan === "full"
    ? (currency === "NGN" ? PRICES.full.displayNGN : PRICES.full.displayUSD)
    : plan === "partner_split"
      ? "₦30,000 today + ₦60,000 commitment"
      : (currency === "NGN" ? PRICES.installments.displayNGN : PRICES.installments.displayUSD);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Complete Payment – CAP Tech Hub Cohort 3</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2">
              {lockedPlan ? `Pay Installment ${installmentNumber} of 3` : "Confirm Your Enrollment"}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {lockedPlan
                ? `Welcome back, ${app?.full_name?.split(" ")[0]}. Continue your installment plan.`
                : `One last step, ${app?.full_name?.split(" ")[0]}. Choose your plan and complete payment.`}
            </p>
          </div>

          <div className="card-modern p-5 md:p-8 space-y-6">
            <div className="rounded-xl bg-secondary/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Application Summary</p>
              <p className="font-semibold text-foreground">{app?.full_name}</p>
              <p className="text-sm text-muted-foreground">{app?.email}</p>
              <p className="text-sm text-muted-foreground">Track: <span className="text-foreground font-medium">{app?.preferred_track}</span></p>
              {lockedPlan && (
                <p className="text-sm text-primary font-medium mt-2">
                  Installments paid: {installmentsPaid} of 3
                </p>
              )}
            </div>

            {!lockedPlan && (
              <div>
                <p className="font-semibold text-foreground mb-3">
                  Select payment plan
                  {isPartner && (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium">
                      Partner code applied
                    </span>
                  )}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlan("full")}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${plan === "full" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Pay in Full</span>
                    </div>
                    <p className="font-display text-lg font-bold text-foreground">
                      {currency === "NGN" ? PRICES.full.displayNGN : PRICES.full.displayUSD}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">One-time payment</p>
                  </button>
                  {isPartner ? (
                    <button
                      onClick={() => setPlan("partner_split")}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${plan === "partner_split" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">₦30k + ₦60k Commitment</span>
                      </div>
                      <p className="font-display text-lg font-bold text-foreground">₦30,000 today</p>
                      <p className="text-xs text-muted-foreground mt-1">₦60,000 due as a tracked commitment</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPlan("installments")}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${plan === "installments" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">3 Installments</span>
                      </div>
                      <p className="font-display text-lg font-bold text-foreground">
                        {currency === "NGN" ? PRICES.installments.displayNGN : PRICES.installments.displayUSD}
                        <span className="text-xs font-normal text-muted-foreground"> /month</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Pay monthly for 3 months</p>
                    </button>
                  )}
                </div>
              </div>
            )}

            <div>
              <p className="font-semibold text-foreground mb-3">Select currency</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => !lockedPlan && setCurrency("NGN")}
                  disabled={lockedPlan && app?.payment_currency !== "NGN"}
                  className={`text-left p-4 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${currency === "NGN" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Nigeria (NGN)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Card, transfer, USSD</p>
                </button>
                <button
                  onClick={() => !lockedPlan && setCurrency("USD")}
                  disabled={lockedPlan && app?.payment_currency !== "USD"}
                  className={`text-left p-4 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${currency === "USD" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Global (USD)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">International cards</p>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p>Payments are securely processed by Stripe. Your card details never touch our servers.</p>
            </div>

            <div className="grid gap-2">
              <Button onClick={payPaystack} disabled={!!processing} size="lg" className="w-full glow-effect rounded-xl">
                {processing === "paystack" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Opening Paystack...</>
                ) : (
                  <>Pay {currentPrice} with Paystack
                    {plan === "installments" && !lockedPlan && " (1st installment)"}
                    {lockedPlan && ` · Installment ${installmentNumber} of 3`}
                  </>
                )}
              </Button>
              {currency === "USD" && (
                <Button onClick={payStripe} disabled={!!processing} size="lg" variant="outline" className="w-full rounded-xl">
                  {processing === "stripe" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Redirecting to Stripe...</>
                  ) : (
                    <>Pay {currentPrice} with Stripe</>
                  )}
                </Button>
              )}
            </div>

            {!lockedPlan && (
              <Button variant="ghost" asChild className="w-full">
                <Link to="/programs/cap/apply"><ArrowLeft className="w-4 h-4" /> Edit Application</Link>
              </Button>
            )}
          </div>

          {plan === "installments" && !lockedPlan && (
            <p className="text-xs text-center text-muted-foreground mt-4">
              You'll receive a payment link by email each month. Total: {currency === "NGN" ? "₦90,000" : "$60"} over 3 months.
            </p>
          )}
          {plan === "partner_split" && !lockedPlan && (
            <p className="text-xs text-center text-muted-foreground mt-4">
              You pay ₦30,000 now to confirm your spot. The remaining ₦60,000 is logged as a commitment and our team will follow up on the timeline.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}