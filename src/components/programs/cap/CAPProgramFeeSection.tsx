import { CheckCircle2 } from "lucide-react";

const included = [
  "3 Months Program + Alumni access",
  "Internship Prep Support",
  "Train AI access",
  "Nanaade AI access",
  "Other Strategic Partners access",
];

export function CAPProgramFeeSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">Program Fee</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            Sara Foundation covers <span className="gradient-text">92%</span> of the cost for you.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 lg:px-0 max-w-4xl mx-auto mb-10">
          {/* Program Cost */}
          <div className="card-modern p-6 md:p-8 text-center border-t-4 border-t-muted">
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-medium">Program Cost</p>
            <div className="text-3xl md:text-4xl font-bold font-display text-muted-foreground line-through mb-1">
              £500
            </div>
            <p className="text-muted-foreground text-sm">(₦1,000,000)</p>
          </div>

          {/* What You Pay */}
          <div className="card-modern p-6 md:p-8 text-center border-t-4 border-t-primary bg-primary/5">
            <p className="text-sm text-primary mb-2 uppercase tracking-wider font-medium">What You Pay</p>
            <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-1">
              £45
            </div>
            <p className="text-muted-foreground text-sm">(₦90,000)</p>
          </div>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-muted-foreground text-sm mb-4">
            To make our program even more accessible, we also accept three installmental monthly payments
          </p>
          <div className="inline-block card-modern p-4 md:p-6 bg-accent/10 border-accent/30">
            <p className="text-sm text-muted-foreground mb-1">OR</p>
            <div className="text-2xl md:text-3xl font-bold font-display text-accent">
              £15<span className="text-base font-normal text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground text-xs">(₦30,000/month)</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4">
          <h3 className="font-display font-bold text-lg text-foreground mb-4 text-center">Cost Breakdown</h3>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
