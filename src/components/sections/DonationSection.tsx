import { Heart, CreditCard, Wallet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const donationMethods = [
  {
    icon: CreditCard,
    title: "Bank Transfer",
    provider: "MoniePoint",
    description: "Direct bank transfer to our MoniePoint account",
    action: "Get Account Details",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wallet,
    title: "Cryptocurrency",
    provider: "ETH (BEP20)",
    description: "Donate using Ethereum on the BEP20 network",
    action: "Copy Wallet Address",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: ExternalLink,
    title: "Crowdfunding",
    provider: "GoFundMe",
    description: "Support us through our GoFundMe campaign",
    action: "Donate on GoFundMe",
    color: "bg-success/10 text-success",
  },
];

export function DonationSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-semibold rounded-full text-sm mb-6">
              Support Our Mission
            </span>
            <h2 className="section-title text-foreground mb-6">
              Help Us Empower African Tech Talent
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your donation directly supports scholarships, mentorship programs, 
              and resources for young African tech entrepreneurs. Together, we can 
              break barriers and create opportunities.
            </p>

            {/* Impact */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-card rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">$50</div>
                <div className="text-sm text-muted-foreground">Sponsors a student for one month</div>
              </div>
              <div className="p-4 bg-card rounded-xl">
                <div className="text-3xl font-bold text-accent mb-1">$500</div>
                <div className="text-sm text-muted-foreground">Funds a full scholarship</div>
              </div>
            </div>

            <Button size="lg" className="group">
              <Heart className="w-5 h-5" />
              Donate Now
            </Button>
          </div>

          {/* Donation Methods */}
          <div className="space-y-4">
            {donationMethods.map((method) => (
              <div 
                key={method.title}
                className="card-elevated p-6 flex items-center gap-4"
              >
                <div className={`w-14 h-14 rounded-xl ${method.color} flex items-center justify-center flex-shrink-0`}>
                  <method.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{method.title}</h4>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                      {method.provider}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <Button variant="outline" size="sm">
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
