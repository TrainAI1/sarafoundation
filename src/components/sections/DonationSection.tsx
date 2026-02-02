import { Heart, CreditCard, Wallet, ExternalLink, Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const donationMethods = [
  {
    icon: CreditCard,
    title: "Bank Transfer (Naira)",
    provider: "MoniePoint",
    description: "Account Number: 9076 664049",
    action: "Copy Account",
    copyValue: "9076664049",
    gradient: "from-primary to-primary/60",
  },
  {
    icon: Wallet,
    title: "USDT",
    provider: "TRC20",
    description: "TMdq8t9WYCvgJA9aftXDzA3XUNX9V4MMG6",
    action: "Copy Address",
    copyValue: "TMdq8t9WYCvgJA9aftXDzA3XUNX9V4MMG6",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: Wallet,
    title: "Ethereum",
    provider: "BEP20",
    description: "0xe7dae2ef9740beacde6d9f584f67ecf2b8f396365",
    action: "Copy Address",
    copyValue: "0xe7dae2ef9740beacde6d9f584f67ecf2b8f396365",
    gradient: "from-primary/80 to-accent/80",
  },
  {
    icon: ExternalLink,
    title: "Crowdfunding",
    provider: "GoFundMe",
    description: "Support us through our GoFundMe campaign",
    action: "Donate on GoFundMe",
    link: "https://gofund.me/9559a00e",
    gradient: "from-[hsl(var(--success))] to-[hsl(var(--success))]/60",
  },
];

const handleCopy = (value: string, label: string) => {
  navigator.clipboard.writeText(value);
  toast.success(`${label} copied to clipboard!`);
};

export function DonationSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content */}
          <div className="px-4 lg:px-0">
            <span className="section-badge mb-4 md:mb-6">
              <Gift className="w-4 h-4" />
              Support Our Mission
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6 text-balance">
              Help Us Empower{" "}
              <span className="gradient-text">African Tech Talent</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
              Your donation directly supports scholarships, mentorship programs, 
              and resources for young African tech entrepreneurs. Together, we can 
              break barriers and create opportunities.
            </p>

            {/* Impact Cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
              <div className="card-modern p-4 md:p-6 group hover:border-primary/30 text-center">
                <div className="text-2xl md:text-4xl font-bold font-display gradient-text mb-1 md:mb-2">₦10k</div>
                <div className="text-xs md:text-sm text-muted-foreground">Sponsors one student</div>
              </div>
              <div className="card-modern p-4 md:p-6 group hover:border-accent/30 text-center">
                <div className="text-2xl md:text-4xl font-bold font-display gradient-text-accent mb-1 md:mb-2">$7</div>
                <div className="text-xs md:text-sm text-muted-foreground">One student's training</div>
              </div>
              <div className="card-modern p-4 md:p-6 group hover:border-primary/30 text-center">
                <div className="text-2xl md:text-4xl font-bold font-display gradient-text mb-1 md:mb-2">£5</div>
                <div className="text-xs md:text-sm text-muted-foreground">Tech skills access</div>
              </div>
            </div>

            <Button size="lg" className="glow-effect group w-full sm:w-auto" asChild>
              <Link to="/contact">
                <Heart className="w-5 h-5" />
                Donate Now
                <span className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            </Button>
          </div>

          {/* Donation Methods */}
          <div className="space-y-3 md:space-y-4 px-4 lg:px-0">
            {donationMethods.map((method, index) => (
              <div 
                key={method.title}
                className="card-modern p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <method.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground text-sm md:text-base">{method.title}</h4>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground font-medium">
                      {method.provider}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground break-all">{method.description}</p>
                </div>
                {method.link ? (
                  <Button variant="outline" size="sm" className="flex-shrink-0 w-full sm:w-auto" asChild>
                    <a href={method.link} target="_blank" rel="noopener noreferrer">
                      {method.action}
                    </a>
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-shrink-0 w-full sm:w-auto"
                    onClick={() => handleCopy(method.copyValue!, method.title)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    {method.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
