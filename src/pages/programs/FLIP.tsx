import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, Heart, Sparkles, ArrowRight, CheckCircle2,
  Network, Award, Briefcase, MessageSquare, Star
} from "lucide-react";

const communities = [
  {
    name: "Women Professionals in Tech Africa (WPTA)",
    description: "Fosters a vibrant community that empowers women professionals in African tech, bridging the gender gap, and propelling them towards leadership positions and career development.",
    icon: Briefcase,
    benefits: [
      "Mentorship from senior tech leaders",
      "Career development workshops",
      "Leadership training programs",
      "Networking events & conferences",
    ],
    color: "from-primary to-[hsl(240,80%,50%)]",
  },
  {
    name: "Women Founders in Tech Africa",
    description: "Supporting women-led startups and ventures with resources, mentorship, and funding opportunities to build successful tech companies.",
    icon: Sparkles,
    benefits: [
      "Startup mentorship & coaching",
      "Pitch competitions & funding access",
      "Founder networking circles",
      "Business development support",
    ],
    color: "from-accent to-[hsl(350,80%,55%)]",
  },
];

const pillars = [
  { icon: Heart, title: "Mentorship", description: "Connect with experienced women leaders who guide your journey" },
  { icon: Network, title: "Networking", description: "Build meaningful relationships with like-minded professionals" },
  { icon: Award, title: "Opportunities", description: "Access exclusive job openings, speaking gigs, and collaborations" },
];

const stats = [
  { value: "200+", label: "Women Members" },
  { value: "50+", label: "Mentors" },
  { value: "30+", label: "Partner Companies" },
  { value: "10+", label: "Countries" },
];

const testimonials = [
  { name: "Adaeze Nwankwo", role: "Software Engineer", quote: "FLIP connected me with mentors who helped me transition into tech leadership." },
  { name: "Fatou Diallo", role: "Startup Founder", quote: "The Women Founders community provided the support I needed to launch my company." },
];

export default function ProgramFLIP() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-accent via-accent/90 to-[hsl(350,80%,55%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Women-Focused Tech Community
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Female Leadership Initiative Program (FLIP)
              </h1>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                A membership-based program empowering women in tech to grow and succeed in Africa 
                through mentorship, networking, and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  Join FLIP
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="heroSecondary" size="lg">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card-dark p-8 rounded-3xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4">
                    <div className="text-4xl font-bold font-display text-white mb-2">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">Our Pillars</span>
            <h2 className="section-title text-foreground mb-6">
              Built on Three{" "}
              <span className="gradient-text-accent">Core Pillars</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card-modern p-8 text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <Star className="w-4 h-4" />
              Our Communities
            </span>
            <h2 className="section-title text-foreground mb-6">
              Two Niche Communities
            </h2>
            <p className="section-subtitle mx-auto">
              Choose the community that aligns with your career stage and goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {communities.map((community) => (
              <div key={community.name} className="card-modern overflow-hidden">
                <div className={`p-8 bg-gradient-to-r ${community.color} text-white`}>
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <community.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2">
                        {community.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {community.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-accent rounded-full" />
                    What You Get
                  </h4>
                  <ul className="space-y-3">
                    {community.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-badge mb-6">
              <MessageSquare className="w-4 h-4" />
              Member Stories
            </span>
            <h2 className="section-title text-foreground mb-6">
              Hear From Our Members
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card-modern p-8">
                <p className="text-foreground text-lg italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-accent via-accent/90 to-[hsl(350,80%,55%)]">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Community of Women Leaders
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Connect with inspiring women who are shaping the future of tech in Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Become a Member
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroSecondary" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
