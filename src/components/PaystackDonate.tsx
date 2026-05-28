import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Currency = "USD" | "NGN" | "EUR" | "GBP";

const PRESETS: Record<Currency, number[]> = {
  USD: [10, 25, 50, 100],
  NGN: [5000, 10000, 25000, 50000],
  EUR: [10, 25, 50, 100],
  GBP: [10, 25, 50, 100],
};

const SYMBOL: Record<Currency, string> = { USD: "$", NGN: "₦", EUR: "€", GBP: "£" };

export function PaystackDonate({ compact = false }: { compact?: boolean }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<string>("25");
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
      const origin = window.location.origin;
      const { data, error } = await supabase.functions.invoke("create-stripe-checkout", {
        body: {
          purpose: "donation",
          email,
          name,
          currency,
          amount: amt,
          success_url: `${origin}/donation-success`,
          cancel_url: `${origin}${window.location.pathname}`,
        },
      });
      if (error || !data?.url) {
        throw new Error(error?.message || data?.error || "Could not start payment");
      }
      window.location.href = data.url;
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Could not start payment.");
      setProcessing(false);
    }
  };

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div className="grid grid-cols-4 gap-2">
        {(["USD", "NGN", "EUR", "GBP"] as Currency[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setCurrency(c); setAmount(String(PRESETS[c][1])); }}
            className={`p-2 rounded-lg border-2 text-xs font-semibold transition-all ${currency === c ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}
          >
            {SYMBOL[c]} {c}
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
          <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...</>
        ) : (
          <><CreditCard className="w-4 h-4" /> Donate {SYMBOL[currency]}{Number(amount || 0).toLocaleString()} with Card</>
        )}
      </Button>

      <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <p>Secured by Stripe. We never see or store your card details. You'll receive an emailed receipt.</p>
      </div>
    </div>
  );
}