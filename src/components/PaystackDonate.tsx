import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    s.onerror = () => reject(new Error("Failed to load Paystack")) as any;
    document.body.appendChild(s);
  });
}

type Currency = "NGN" | "USD";

const PRESETS: Record<Currency, number[]> = {
  NGN: [5000, 10000, 25000, 50000],
  USD: [10, 25, 50, 100],
};

const SYMBOL: Record<Currency, string> = { NGN: "₦", USD: "$" };

export function PaystackDonate({ compact = false }: { compact?: boolean }) {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [amount, setAmount] = useState<string>("10000");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const pay = async () => {
    const amt = Number(amount);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error("Please enter a donation amount.");
      return;
    }
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("initialize-donation", {
        body: { email, amount: amt, currency, name },
      });
      if (error || !data?.access_code) {
        throw new Error(error?.message || data?.error || "Could not start payment");
      }
      await loadPaystackScript();
      const PaystackPop = (window as any).PaystackPop;
      const popup = new PaystackPop();
      popup.resumeTransaction(data.access_code, {
        onSuccess: (tx: { reference: string }) => {
          setProcessing(false);
          toast.success("Thank you! Your donation was received.", {
            description: `Reference: ${tx?.reference || data.reference}`,
          });
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

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div className="grid grid-cols-2 gap-2">
        {(["NGN", "USD"] as Currency[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setCurrency(c); setAmount(String(PRESETS[c][1])); }}
            className={`p-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${currency === c ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}
          >
            {c === "NGN" ? "Nigeria (₦)" : "Global ($)"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {PRESETS[currency].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(String(v))}
            className={`p-2 rounded-lg border text-sm font-medium transition-all ${Number(amount) === v ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}
          >
            {SYMBOL[currency]}{v.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pd-amount" className="text-xs">Amount ({currency})</Label>
        <Input
          id="pd-amount"
          type="number"
          min="1"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className={compact ? "space-y-2" : "grid sm:grid-cols-2 gap-3"}>
        <div className="space-y-2">
          <Label htmlFor="pd-name" className="text-xs">Your name (optional)</Label>
          <Input id="pd-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pd-email" className="text-xs">Email *</Label>
          <Input id="pd-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
      </div>

      <Button onClick={pay} disabled={processing} size="lg" className="w-full glow-effect">
        {processing ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
        ) : (
          <><CreditCard className="w-4 h-4" /> Donate {SYMBOL[currency]}{Number(amount || 0).toLocaleString()} with Card</>
        )}
      </Button>

      <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <p>Secured by Paystack. We never see or store your card details. You'll receive an emailed receipt.</p>
      </div>
    </div>
  );
}