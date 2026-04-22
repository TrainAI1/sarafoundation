import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Globe, Loader2, ShieldCheck, Calendar, Wallet } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
};

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).PaystackPop) return resolve();
    const existing = document.querySelector('script[src="https://js.paystack.co/v2/inline.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Paystack")));
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v2/inline.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Paystack"));
    document.body.appendChild(s);
  });
}

const PRICES = {
  full: { NGN: 90000, USD: 60, displayNGN: "₦90,000", displayUSD: "$60" },
  installments: { NGN: 30000, USD: 20, displayNGN: "₦30,000", displayUSD: "$20" },
};

export default function CAPPayment() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const navigate = useNavigate();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [plan, setPlan] = useState<"full" | "installments">("full");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!appId) {
      navigate("/programs/cap/apply", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("cap_applications")
        .select("id, email, full_name, payment_status, payment_plan, payment_currency, paid_amount, installments_completed, preferred_track")
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
    loadPaystackScript().catch(() => toast.error("Could not load payment script."));
  }, [appId, navigate]);

  const lockedPlan = (app?.installments_completed ?? 0) > 0;
  const installmentsPaid = app?.installments_completed ?? 0;
  const installmentNumber = installmentsPaid + 1;

  const pay = async () => {
    if (!app) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("initialize-cap-payment", {
        body: { application_id: app.id, currency, plan },
      });
      if (error || !data?.access_code) {
        throw new Error(error?.message || data?.error || "Payment init failed");
      }
      await loadPaystackScript();
      const PaystackPop = (window as any).PaystackPop;
      const popup = new PaystackPop();
      popup.resumeTransaction(data.access_code, {
        onSuccess: async (tx: { reference: string }) => {
          const ref = tx?.reference || data.reference;
          toast.message("Verifying payment...");
          const { data: vData, error: vErr } = await supabase.functions.invoke("verify-cap-payment", {
            body: { reference: ref },
          });
          if (vErr || !vData?.success) {
            toast.error("Payment could not be verified. Please contact support.");
            setProcessing(false);
            return;
          }
          if (vData.fully_paid) {
            navigate(`/programs/cap/success?app=${app.id}`);
          } else {
            toast.success(`Installment ${vData.installments_completed} of 3 received!`);
            // Re-fetch to update the UI
            const { data: refreshed } = await supabase
              .from("cap_applications")
              .select("id, email, full_name, payment_status, payment_plan, payment_currency, paid_amount, installments_completed, preferred_track")
              .eq("id", app.id)
              .maybeSingle();
            if (refreshed) setApp(refreshed as App);
            setProcessing(false);
          }
        },
        onCancel: () => {
          setProcessing(false);
          toast.message("Payment cancelled.");
        },
      });
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Could not start payment.");
      setProcessing(false);
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
                <p className="font-semibold text-foreground mb-3">Select payment plan</p>
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
              <p>Payments are securely processed by Paystack. Your card details never touch our servers.</p>
            </div>

            <Button onClick={pay} disabled={processing} size="lg" className="w-full glow-effect rounded-xl">
              {processing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>
                  Pay {currentPrice}
                  {plan === "installments" && !lockedPlan && " (1st installment)"}
                  {lockedPlan && ` · Installment ${installmentNumber} of 3`}
                </>
              )}
            </Button>

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
        </div>
      </main>
      <Footer />
    </div>
  );
}