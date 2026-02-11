import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { usePageContent } from "@/hooks/usePageContent";
import { supabase } from "@/integrations/supabase/client";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { data: c } = usePageContent("home-newsletter", {
    headline: "Subscribe to Our Newsletter",
    description: "Get the latest news, success stories, and opportunities delivered straight to your inbox. No spam, just valuable content.",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").upsert(
      { email },
      { onConflict: "email" }
    );

    if (error) {
      toast({ title: "Error", description: "Could not subscribe. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Successfully subscribed!", description: "You'll receive our latest updates and news." });
    }
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="section-container">
        <ScrollAnimation variant="scale-in">
          <div className="card-modern p-6 md:p-8 lg:p-12 xl:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Mail className="w-4 h-4" />
                Stay Updated
              </div>

              <h2 className="section-title text-foreground mb-4">
                {c.headline.includes("Newsletter") ? (
                  <>Subscribe to Our{" "}<span className="gradient-text">Newsletter</span></>
                ) : (
                  <span className="gradient-text">{c.headline}</span>
                )}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">{c.description}</p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-12 flex-1"
                  required
                />
                <Button type="submit" size="lg" className="glow-effect" disabled={isLoading}>
                  {isLoading ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
                  Subscribe
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-4">
                Join 5,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
