import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, MapPin, Phone, Send, MessageSquare, 
  Clock, Sparkles 
} from "lucide-react";

const contactInfo = [
  { icon: Mail, title: "Email Us", value: "info@sarafoundation.africa", href: "mailto:info@sarafoundation.africa" },
  { icon: Phone, title: "Call Us", value: "+234 xxx xxx xxxx", href: "tel:+234xxxxxxxx" },
  { icon: MapPin, title: "Visit Us", value: "Lagos, Nigeria", href: "#" },
  { icon: Clock, title: "Office Hours", value: "Mon - Fri, 9am - 5pm WAT", href: null },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass-card-dark rounded-full text-white/90 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4 text-accent" />
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Have questions about our programs or want to partner with us? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="card-modern p-8 md:p-10">
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input placeholder="John" className="rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Doe" className="rounded-xl" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="john@example.com" className="rounded-xl" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input placeholder="How can we help?" className="rounded-xl" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..." 
                      className="rounded-xl min-h-[150px]" 
                    />
                  </div>

                  <Button size="lg" className="w-full glow-effect">
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Contact Information
                </h2>
                <p className="text-muted-foreground">
                  Reach out through any of these channels.
                </p>
              </div>

              <div className="grid gap-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="card-modern p-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="card-modern aspect-video flex items-center justify-center bg-secondary/50 overflow-hidden">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Map will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
