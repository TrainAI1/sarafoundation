import { useEffect, useState } from "react";
import { Heart, X, CreditCard, Wallet, ExternalLink, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PaystackDonate } from "@/components/PaystackDonate";

const SESSION_KEY = "sara_session_donation_shown";

const methods = [
  {
    icon: CreditCard,
    title: "Bank Transfer (Naira)",
    description: "MoniePoint · 9076 664049",
    copyValue: "9076664049",
    gradient: "from-primary to-primary/60",
  },
  {
    icon: Wallet,
    title: "USDT (TRC20)",
    description: "TMdq8t9WYCvgJA9aftXDzA3XUNX9V4MMG6",
    copyValue: "TMdq8t9WYCvgJA9aftXDzA3XUNX9V4MMG6",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: ExternalLink,
    title: "GoFundMe",
    description: "Support us through GoFundMe",
    link: "https://gofund.me/9559a00e",
    gradient: "from-emerald-500 to-emerald-400",
  },
];

export function SessionDonationPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg"
        >
          <DialogPrimitive.Close
            aria-label="Close donation popup"
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>

          <div className="pr-8">
            <DialogPrimitive.Title className="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
              <Heart className="h-5 w-5 text-primary fill-primary/20" />
              Support Our Mission
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1.5 text-sm text-muted-foreground">
              Your donation empowers African tech talent through scholarships and mentorship.
            </DialogPrimitive.Description>
          </div>

          <div className="space-y-2.5 max-h-[55vh] overflow-y-auto">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
              <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-primary" /> Donate instantly with card
              </p>
              <PaystackDonate compact />
            </div>

            {methods.map((m) => (
              <div
                key={m.title}
                className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.gradient} flex items-center justify-center flex-shrink-0`}>
                    <m.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground leading-tight">{m.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{m.description}</p>
                  </div>
                </div>
                {m.link ? (
                  <Button variant="outline" size="sm" className="w-full sm:w-auto flex-shrink-0" asChild>
                    <a href={m.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto flex-shrink-0"
                    onClick={() => copy(m.copyValue!, m.title)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={() => setOpen(false)}
          >
            No thanks, close
          </Button>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}