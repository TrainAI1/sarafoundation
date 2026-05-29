import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { payWithPaystack, genRef } from "@/lib/paystack";

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
  const [processing, setProcessing] = useState<null | "stripe" | "paystack">(null);

  const validate = () => {
    const amt = Number(amount);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email."); return null;
    }
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error("Please enter a donation amount."); return null;
    }
    return amt;
  };

  const payStripe = async () => {
    const amt = validate(); if (amt === null) return;
    if (currency === "NGN") {
      toast.error("Stripe does not support NGN. Please use Paystack for Naira."); return;
    }
    setProcessing("stripe");
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
      setProcessing(null);
    }
  };

  const payPaystack = async () => {
    const amt = validate(); if (amt === null) return;
    setProcessing("paystack");
    try {
      const minor = Math.round(amt * 100);
      payWithPaystack({
        email,
        amount: minor,
        currency,
        reference: genRef("don"),
        metadata: { purpose: "Sara Foundation Donation", donor_name: name || undefined },
        onSuccess: (txn) => {
          window.location.href = `/donation-success?reference=${encodeURIComponent(txn.reference)}`;
        },
        onCancel: () => { setProcessing(null); toast.message("Payment cancelled."); },
        onError: (e) => { console.error(e); setProcessing(null); toast.error("Payment failed."); },
      });
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Paystack failed to open.");
      setProcessing(null);
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

      <div className="grid gap-2">
        <Button onClick={payPaystack} disabled={!!processing} size="lg" className="w-full glow-effect">
          {processing === "paystack" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Opening Paystack...</>
          ) : (
            <><CreditCard className="w-4 h-4" /> Pay {SYMBOL[currency]}{Number(amount || 0).toLocaleString()} with Paystack</>
          )}
        </Button>
        {currency !== "NGN" && (
          <Button onClick={payStripe} disabled={!!processing} size="lg" variant="outline" className="w-full">
            {processing === "stripe" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...</>
            ) : (
              <><CreditCard className="w-4 h-4" /> Pay {SYMBOL[currency]}{Number(amount || 0).toLocaleString()} with Stripe</>
            )}
          </Button>
        )}
      </div>

      <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <p>Secured by Paystack & Stripe. We never see or store your card details. You'll receive an emailed receipt.</p>
      </div>
    </div>
  );
}