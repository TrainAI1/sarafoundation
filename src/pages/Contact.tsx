import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { 
  Mail, MapPin, Phone, Send, MessageSquare, 
  Clock, Sparkles, CheckCircle2, Linkedin, Twitter, Instagram, HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import communityWorkshop from "@/assets/community-workshop.jpg";
import { supabase } from "@/integrations/supabase/client";
import { usePageContent } from "@/hooks/usePageContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const contactInfo = [
  { icon: Mail, title: "Email Us", value: "info@sarafoundationafrica.com", href: "mailto:info@sarafoundationafrica.com" },
  { icon: Phone, title: "Call Us (UK)", value: "+44 7435 126104", href: "tel:+447435126104" },
  { icon: Phone, title: "Call Us (NG)", value: "+234 9076 664049", href: "tel:+2349076664049" },
  { icon: Clock, title: "Office Hours", value: "Mon - Fri, 9am - 5pm", href: null },
];

const socialLinks = [
  { icon: Linkedin, name: "LinkedIn", href: "#" },
  { icon: Twitter, name: "Twitter", href: "#" },
  { icon: Instagram, name: "Instagram", href: "#" },
];

const topics = [
  "General Inquiry",
  "Program Application",
  "Partnership Opportunity",
  "Donation/Sponsorship",
  "Media/Press",
  "Other",
];

const faqs = [
  { q: "How quickly will I get a response?", a: "We aim to respond to all inquiries within 24–48 business hours. Urgent matters are prioritized." },
  { q: "Which office should I contact?", a: "You can reach either our London (UK) or Lagos (Nigeria) office. Both teams coordinate closely, so either office can assist you." },
  { q: "Can I schedule a meeting?", a: "Yes! Use the contact form and select your topic. Our team will reach out to schedule a meeting at a convenient time." },
  { q: "I'm interested in volunteering. How do I apply?", a: "Select 'General Inquiry' in the form and mention your interest in volunteering. We'll connect you with our volunteer coordination team." },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", topic: "General Inquiry", message: "" });
  const { toast } = useToast();

  const { data: contactContent } = usePageContent("contact-info", {
    email: "info@sarafoundationafrica.com",
    phone: "+44 7435 126104",
    address: "E14 8AT, London, UK",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      topic: formData.topic,
      message: formData.message,
    });
    
    setIsSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Could not send message. Please try again.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
    toast({ title: "Message sent successfully!", description: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us – Sara Foundation Africa</title>
        <meta name="description" content="Get in touch with Sara Foundation Africa. Reach out for program inquiries, partnership opportunities, or general questions." />
        <link rel="canonical" href="https://sarafoundation.lovable.app/contact" />
      </Helmet>
      <Navbar />
      
      {/* Hero with Image */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={communityWorkshop} 
            alt="Sara Foundation community"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(240,80%,50%)]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl px-4">
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 glass-card-dark rounded-full text-white/90 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-accent" />
              Get in Touch
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-base md:text-xl text-white/70 leading-relaxed">
              Have questions about our programs or want to partner with us? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="section-container px-4 lg:px-0">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
            {/* Contact Form */}
            <div>
              <div className="card-modern p-6 md:p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            First Name *
                          </label>
                          <Input placeholder="John" className="rounded-xl" required value={formData.firstName} onChange={(e) => setFormData(p => ({...p, firstName: e.target.value}))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Last Name *
                          </label>
                          <Input placeholder="Doe" className="rounded-xl" required value={formData.lastName} onChange={(e) => setFormData(p => ({...p, lastName: e.target.value}))} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input type="email" placeholder="john@example.com" className="rounded-xl" required value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Topic
                        </label>
                        <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" value={formData.topic} onChange={(e) => setFormData(p => ({...p, topic: e.target.value}))}>
                          {topics.map((topic) => (
                            <option key={topic} value={topic}>{topic}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea 
                          placeholder="Tell us more about your inquiry..." 
                          className="rounded-xl min-h-[120px] md:min-h-[150px]" 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData(p => ({...p, message: e.target.value}))}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full glow-effect"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Sparkles className="w-5 h-5 animate-pulse" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2">
                  Contact Information
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Reach out through any of these channels.
                </p>
              </div>

              <div className="grid gap-3 md:gap-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="card-modern p-4 md:p-6 flex items-center gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg flex-shrink-0">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm text-muted-foreground">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-foreground hover:text-primary transition-colors text-sm md:text-base break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground text-sm md:text-base">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="card-modern p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Image instead of map */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={communityWorkshop} 
                  alt="Sara Foundation community event"
                  className="w-full h-40 md:h-56 object-cover"
                />
                <div className="p-4 bg-card">
                  <p className="font-semibold text-foreground text-sm">Our Community</p>
                  <p className="text-xs text-muted-foreground">Connecting with students and professionals across Africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
            <span className="section-badge mb-4 md:mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Common <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto px-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="card-modern border-none px-5 md:px-6">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container px-4 lg:px-0">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="section-badge mb-4 md:mb-6">
              <MapPin className="w-4 h-4" />
              Our Offices
            </span>
            <h2 className="section-title text-foreground mb-4 md:mb-6">
              Find Us Across Africa
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            {[
              { city: "London", country: "United Kingdom", address: "E14 8AT, London" },
              { city: "Lagos", country: "Nigeria", address: "Bafaj Crescent, Awoyaya-Eputu, Ibeju Lekki" },
            ].map((office) => (
              <div key={office.city} className="card-modern p-5 md:p-6 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 md:mb-4">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-1">{office.city}</h3>
                <p className="text-primary text-xs md:text-sm font-medium mb-1 md:mb-2">{office.country}</p>
                <p className="text-muted-foreground text-xs md:text-sm">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
