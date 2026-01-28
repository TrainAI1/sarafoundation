import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, ArrowRight, BookOpen, Users, Eye, Lightbulb,
  CheckCircle2, Globe
} from "lucide-react";

const benefits = [
  {
    number: "01",
    icon: BookOpen,
    title: "Access to Resources",
    description: "Partnering with Sara Foundation Africa can provide universities with access to various resources such as research, reports, and data. These resources can help universities to stay up-to-date with the latest trends and developments in the tech industry in Africa.",
  },
  {
    number: "02",
    icon: Users,
    title: "Networking Opportunities",
    description: "Partnering with Sara Foundation Africa provides universities with the opportunity to connect with a network of tech professionals, entrepreneurs, and innovators across Africa, fostering collaboration and knowledge exchange.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Social Impact",
    description: "Partnering with Sara Foundation Africa provides universities with the opportunity to make a positive social impact. By supporting the organization's initiatives, universities can contribute to the growth of the tech industry in Africa and help to promote Diversity, Equity and Inclusion in technology.",
  },
  {
    number: "04",
    icon: Eye,
    title: "Institution Visibility",
    description: "Partnering with Sara Foundation Africa enhances your institution's visibility across the African tech ecosystem, positioning your university as a leader in tech education and innovation.",
  },
];

const partnerUniversities = [
  "University of Lagos",
  "University of Nairobi",
  "Ashesi University",
  "University of Cape Town",
  "Covenant University",
  "University of Ghana",
  "Makerere University",
  "University of Ibadan",
];

export default function SchoolCommunity() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4 text-accent" />
              School Community Partnership
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Partner with Sara Foundation Africa
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-3xl mx-auto">
              Partnering with Sara Foundation Africa can provide universities with access to talent pools, 
              networking opportunities, brand visibility, social impact, and valuable resources. We are 
              excited to work with universities to contribute to the growth of the tech industry in Africa 
              and promote Diversity, Equity and Inclusion in technology.
            </p>
            <p className="text-lg text-white/60 mb-8 max-w-3xl mx-auto">
              The Career Advancement Program (CAP) is an initiative of Sara Foundation Africa aimed at 
              establishing tech clubs across African universities and providing development opportunities 
              for the next generation of tech founders and tech professionals.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Register Your Institution
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Campus Presence */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <Globe className="w-4 h-4" />
              Our Campus Presence
            </span>
            <h2 className="section-title text-foreground mb-6">
              Universities We <span className="gradient-text">Partner With</span>
            </h2>
            <p className="section-subtitle mx-auto">
              We collaborate with leading institutions across Africa to bring tech education to students.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partnerUniversities.map((uni) => (
              <div key={uni} className="card-modern p-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm">{uni}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Benefits
            </span>
            <h2 className="section-title text-foreground mb-6">
              Why You Should <span className="gradient-text">Partner with Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.number} className="card-modern p-8 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {benefit.number}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-xl text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Bring Tech Education to Your Campus?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join our network of partner universities and help shape the future of African tech talent.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Register Your Institution
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
