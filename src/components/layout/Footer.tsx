import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoWhite from "@/assets/logo-white.png";
import { usePageContent } from "@/hooks/usePageContent";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Our Programs", href: "/programs/cap" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const programLinks = [
  { title: "Career Advancement Program", href: "/programs/cap" },
  { title: "Female Leadership Initiative", href: "/programs/flip" },
  { title: "Donate", href: "/donation" },
];

const getSocialLinks = (s: Record<string, string>) => [
  { icon: Facebook, href: s.facebook || "#", label: "Facebook" },
  { icon: Twitter, href: s.twitter || "#", label: "Twitter" },
  { icon: Linkedin, href: s.linkedin || "#", label: "LinkedIn" },
  { icon: Instagram, href: s.instagram || "#", label: "Instagram" },
  { icon: Youtube, href: s.youtube || "#", label: "YouTube" },
];

export function Footer() {
  const [footerEmail, setFooterEmail] = useState("");
  const { toast } = useToast();

  const { data: settings } = usePageContent("site-settings", {
    email: "info@sarafoundationafrica.com",
    phone_uk: "+44 7435 126104",
    phone_ng: "+234 9076 664049",
    address_uk: "E14 8AT, London, UK",
    address_ng: "Bafaj Crescent, Awoyaya-Eputu, Ibeju Lekki, Lagos, Nigeria",
    facebook: "#", twitter: "#", linkedin: "#", instagram: "#", youtube: "#",
  });

  const handleFooterSubscribe = async () => {
    if (!footerEmail) return;
    await supabase.from("newsletter_subscribers").upsert({ email: footerEmail }, { onConflict: "email" });
    toast({ title: "Subscribed!", description: "You'll receive our latest updates." });
    setFooterEmail("");
  };

  return (
    <footer className="bg-foreground text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent blur-3xl" />
      </div>

      <div className="section-container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logoWhite} 
                alt="Sara Foundation Africa" 
                className="h-10 md:h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Empowering the next generation of African tech entrepreneurs through innovation, diversity, and inclusion.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <p className="font-semibold">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-primary"
                />
                <Button variant="accent" size="icon" className="rounded-xl flex-shrink-0" onClick={handleFooterSubscribe}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link 
                    to={link.href} 
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Our Programs</h4>
            <ul className="space-y-4">
              {programLinks.map((link) => (
                <li key={link.title}>
                  <Link 
                    to={link.href} 
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-white/60 text-sm pt-2">
                  <p>{settings.address_uk}</p>
                  <p>{settings.address_ng}</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a href={`mailto:${settings.email}`} className="text-white/60 hover:text-primary text-sm transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-white/60 text-sm">
                  <p>{settings.phone_uk} (UK)</p>
                  <p>{settings.phone_ng} (NG)</p>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <p className="font-semibold mb-4">Follow Us</p>
              <div className="flex gap-2">
                {getSocialLinks(settings).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Sara Foundation Africa. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
