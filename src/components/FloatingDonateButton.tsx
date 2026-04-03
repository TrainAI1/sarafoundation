import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, X, CreditCard, Wallet, ExternalLink, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const donationMethods = [
  {
    icon: CreditCard,
    title: "Bank Transfer (Naira)",
    provider: "MoniePoint",
    description: "9076 664049",
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
    icon: Wallet,
    title: "Ethereum (BEP20)",
    description: "0xe7dae2ef9740beacde6d9f584f67ecf2b8f396365",
    copyValue: "0xe7dae2ef9740beacde6d9f584f67ecf2b8f396365",
    gradient: "from-primary/80 to-accent/80",
  },
  {
    icon: ExternalLink,
    title: "GoFundMe",
    description: "Support us through GoFundMe",
    link: "https://gofund.me/9559a00e",
    gradient: "from-emerald-500 to-emerald-400",
  },
];

const handleCopy = (value: string, label: string) => {
  navigator.clipboard.writeText(value);
  toast.success(`${label} copied to clipboard!`);
};

export function FloatingDonateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-white font-semibold shadow-2xl transition-transform hover:scale-110 active:scale-95 animate-float-bounce"
        aria-label="Donate"
      >
        <Heart className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Donate</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Heart className="w-5 h-5 text-primary fill-primary/20" />
              Support Our Mission
            </DialogTitle>
            <DialogDescription>
              Your donation empowers African tech talent through scholarships and mentorship.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {donationMethods.map((method) => (
              <div
                key={method.title}
                className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${method.gradient} flex items-center justify-center flex-shrink-0`}>
                  <method.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground">{method.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{method.description}</p>
                </div>
                {method.link ? (
                  <Button variant="outline" size="sm" asChild>
                    <a href={method.link} target="_blank" rel="noopener noreferrer">
                      Visit
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(method.copyValue!, method.title)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-lg font-bold gradient-text">₦10k</div>
              <div className="text-[10px] text-muted-foreground">1 student</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-lg font-bold gradient-text-accent">$7</div>
              <div className="text-[10px] text-muted-foreground">Training</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-lg font-bold gradient-text">£5</div>
              <div className="text-[10px] text-muted-foreground">Tech access</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
