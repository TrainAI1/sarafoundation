import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Globe, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type App = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  payment_status: string;
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

export default function FLIPPayment() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const navigate = useNavigate();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!appId) {
      navigate("/programs/flip/apply", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("flip_applications")
        .select("id, email, first_name, last_name, payment_status, preferred_track")
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
    loadPaystackScript().catch(() => toast.error("Could not load payment script."));
  }, [appId, navigate]);

  const pay = async () => {
    if (!app) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("initialize-flip-payment", {
        body: { application_id: app.id, currency },
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
          const { data: vData, error: vErr } = await supabase.functions.invoke("verify-flip-payment", {
            body: { reference: ref },
          });
          if (vErr || !vData?.paid) {
            toast.error("Payment could not be verified. Please contact support.");
            setProcessing(false);
            return;
          }
          navigate(`/programs/flip/success?app=${app.id}`);
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
            </div>

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
                  <p className="font-display text-2xl font-bold text-foreground">₦1,000</p>
                  <p className="text-xs text-muted-foreground mt-1">Card, transfer, USSD</p>
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${currency === "USD" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground">Global (USD)</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">$1.00</p>
                  <p className="text-xs text-muted-foreground mt-1">International cards</p>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p>Payments are securely processed by Paystack. Your card details never touch our servers.</p>
            </div>

            <Button onClick={pay} disabled={processing} size="lg" className="w-full glow-effect rounded-xl">
              {processing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>Pay {currency === "NGN" ? "₦1,000" : "$1.00"} & Enroll</>
              )}
            </Button>

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