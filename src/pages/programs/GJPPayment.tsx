import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type App = {
  id: string;
  email: string;
  full_name: string;
  payment_status: string;
  career_path: string;
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

export default function GJPPayment() {
  const [params] = useSearchParams();
  const appId = params.get("app");
  const navigate = useNavigate();
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!appId) {
      navigate("/programs/gjp/apply", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("gjp_applications")
        .select("id, email, full_name, payment_status, career_path")
        .eq("id", appId)
        .maybeSingle();
      if (error || !data) {
        toast.error("Application not found.");
        navigate("/programs/gjp/apply", { replace: true });
        return;
      }
      if (data.payment_status === "paid") {
        navigate(`/programs/gjp/success?app=${data.id}`, { replace: true });
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
      const { data, error } = await supabase.functions.invoke("initialize-gjp-payment", {
        body: { application_id: app.id },
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
          const { data: vData, error: vErr } = await supabase.functions.invoke("verify-gjp-payment", {
            body: { reference: ref },
          });
          if (vErr || !vData?.success) {
            toast.error("Payment could not be verified. Please contact support.");
            setProcessing(false);
            return;
          }
          navigate(`/programs/gjp/success?app=${app.id}`);
          // pass reference through so success page can display it
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Complete Payment – GJP | Sara Foundation</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16">
        <div className="section-container px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2">
              Pay the ₦2,000 Admin Fee
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              One last step, {app?.full_name?.split(" ")[0]}. This covers form processing & onboarding only.
            </p>
          </div>

          <div className="card-modern p-5 md:p-8 space-y-6">
            <div className="rounded-xl bg-secondary/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Application Summary</p>
              <p className="font-semibold text-foreground">{app?.full_name}</p>
              <p className="text-sm text-muted-foreground">{app?.email}</p>
              <p className="text-sm text-muted-foreground">Career path: <span className="text-foreground font-medium">{app?.career_path}</span></p>
            </div>

            <div className="rounded-xl border-2 border-primary bg-primary/5 p-5 text-center">
              <Wallet className="w-7 h-7 text-primary mx-auto mb-2" />
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Admin / Processing Fee</p>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">₦2,000</p>
              <p className="text-xs text-muted-foreground mt-2">
                Training and job referral remain <strong>completely free</strong>.
              </p>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p>Payments are securely processed by Paystack. Your card details never touch our servers.</p>
            </div>

            <Button onClick={pay} disabled={processing} size="lg" className="w-full glow-effect rounded-xl">
              {processing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>Pay ₦2,000 Now</>
              )}
            </Button>

            <Button variant="ghost" asChild className="w-full">
              <Link to="/programs/gjp/apply"><ArrowLeft className="w-4 h-4" /> Edit Application</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}