import { Heart, CreditCard, Wallet, ExternalLink, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const donationMethods = [
  {
    icon: CreditCard,
    title: "Bank Transfer",
    provider: "MoniePoint",
    description: "Direct bank transfer to our MoniePoint account",
    action: "Get Account Details",
    gradient: "from-primary to-primary/60",
  },
  {
    icon: Wallet,
    title: "Cryptocurrency",
    provider: "ETH (BEP20)",
    description: "Donate using Ethereum on the BEP20 network",
    action: "Copy Wallet Address",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: ExternalLink,
    title: "Crowdfunding",
    provider: "GoFundMe",
    description: "Support us through our GoFundMe campaign",
    action: "Donate on GoFundMe",
    gradient: "from-success to-success/60",
  },
];

export function DonationSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="section-badge mb-6">
              <Gift className="w-4 h-4" />
              Support Our Mission
            </span>
            <h2 className="section-title text-foreground mb-6 text-balance">
              Help Us Empower{" "}
              <span className="gradient-text">African Tech Talent</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Your donation directly supports scholarships, mentorship programs, 
              and resources for young African tech entrepreneurs. Together, we can 
              break barriers and create opportunities.
            </p>

            {/* Impact Cards */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="card-modern p-6 group hover:border-primary/30">
                <div className="text-4xl font-bold font-display gradient-text mb-2">$50</div>
                <div className="text-sm text-muted-foreground">Sponsors a student for one month</div>
              </div>
              <div className="card-modern p-6 group hover:border-accent/30">
                <div className="text-4xl font-bold font-display gradient-text-accent mb-2">$500</div>
                <div className="text-sm text-muted-foreground">Funds a full scholarship</div>
              </div>
            </div>

            <Button size="lg" className="glow-effect group">
              <Heart className="w-5 h-5" />
              Donate Now
              <span className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
            </Button>
          </div>

          {/* Donation Methods */}
          <div className="space-y-4">
            {donationMethods.map((method, index) => (
              <div 
                key={method.title}
                className="card-modern p-6 flex items-center gap-5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{method.title}</h4>
                    <span className="text-xs px-2.5 py-1 bg-secondary rounded-full text-muted-foreground font-medium">
                      {method.provider}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
