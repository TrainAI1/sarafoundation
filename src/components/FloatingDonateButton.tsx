import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, CreditCard, Wallet, ExternalLink, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

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

function DonateContent() {
  return (
    <>
      <div className="space-y-2.5">
        {donationMethods.map((method) => (
          <div
            key={method.title}
            className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${method.gradient} flex items-center justify-center flex-shrink-0`}>
                <method.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground leading-tight">{method.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{method.description}</p>
              </div>
            </div>
            {method.link ? (
              <Button variant="outline" size="sm" className="w-full sm:w-auto flex-shrink-0" asChild>
                <a href={method.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto flex-shrink-0"
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
          <div className="text-base sm:text-lg font-bold gradient-text">₦10k</div>
          <div className="text-[10px] text-muted-foreground">1 student</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="text-base sm:text-lg font-bold gradient-text-accent">$7</div>
          <div className="text-[10px] text-muted-foreground">Training</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="text-base sm:text-lg font-bold gradient-text">£5</div>
          <div className="text-[10px] text-muted-foreground">Tech access</div>
        </div>
      </div>
    </>
  );
}

export function FloatingDonateButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  if (location.pathname === "/donation") return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 sm:px-5 sm:py-3.5 text-white font-semibold shadow-2xl transition-transform hover:scale-110 active:scale-95 animate-float-bounce"
        aria-label="Donate"
      >
        <Heart className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Donate</span>
      </button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="px-4 pb-6 pt-2 max-h-[85vh]">
            <DrawerHeader className="px-0 pb-3">
              <DrawerTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-primary fill-primary/20" />
                Support Our Mission
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                Your donation empowers African tech talent through scholarships and mentorship.
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto">
              <DonateContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
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
            <DonateContent />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
