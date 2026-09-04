import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";

export function CAPProgramFeeSection() {
  const { data: c } = usePageContent("cap-program-fee", {
    badge: "Program Fee",
    headline_prefix: "Sara Foundation covers",
    headline_highlight: "92%",
    headline_suffix: "of the cost for you.",
    cost_amount: "£500",
    cost_local: "(₦1,000,000)",
    pay_amount: "£45",
    pay_local: "(₦90,000)",
    installment_note: "To make our program even more accessible, we also accept three installmental monthly payments",
    installment_amount: "£15",
    installment_period: "/month",
    installment_local: "(₦30,000/month)",
    breakdown_title: "Cost Breakdown",
    included: [
      { item: "3 Months Program + Alumni access" },
      { item: "Internship Prep Support" },
      { item: "Train AI access" },
      { item: "Nanaade AI access" },
      { item: "Other Strategic Partners access" },
    ],
    cta_text: "Apply for Cohort 3",
    global_note: "Global participants: pay $60 once or $20/month for 3 months",
  });

  const included = c.included as { item: string }[];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <span className="section-badge mb-4 md:mb-6">{c.badge}</span>
          <h2 className="section-title text-foreground mb-4 md:mb-6">
            {c.headline_prefix} <span className="gradient-text">{c.headline_highlight}</span> {c.headline_suffix}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 lg:px-0 max-w-4xl mx-auto mb-10">
          {/* Program Cost */}
          <div className="card-modern p-6 md:p-8 text-center border-t-4 border-t-primary">
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-medium">Program Cost</p>
            <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-1">
              {c.cost_amount}
            </div>
            <p className="text-muted-foreground text-sm">{c.cost_local}</p>
          </div>

          {/* What You Pay */}
          <div className="card-modern p-6 md:p-8 text-center border-t-4 border-t-primary bg-primary/5">
            <p className="text-sm text-primary mb-2 uppercase tracking-wider font-medium">What You Pay</p>
            <div className="text-3xl md:text-4xl font-bold font-display text-primary mb-1">
              {c.pay_amount}
            </div>
            <p className="text-muted-foreground text-sm">{c.pay_local}</p>
          </div>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-muted-foreground text-sm mb-4">
            {c.installment_note}
          </p>
          <div className="inline-block card-modern p-4 md:p-6 bg-accent/10 border-accent/30">
            <p className="text-sm text-muted-foreground mb-1">OR</p>
            <div className="text-2xl md:text-3xl font-bold font-display text-accent">
              {c.installment_amount}<span className="text-base font-normal text-muted-foreground">{c.installment_period}</span>
            </div>
            <p className="text-muted-foreground text-xs">{c.installment_local}</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4">
          <h3 className="font-display font-bold text-lg text-foreground mb-4 text-center">{c.breakdown_title}</h3>
          <ul className="space-y-3">
            {included.map((entry) => (
              <li key={entry.item} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                {entry.item}
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="rounded-xl glow-effect">
              <Link to="/programs/cap/apply">
                {c.cta_text} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              {c.global_note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
