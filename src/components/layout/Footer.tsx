import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Youtube, Send, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoWhite from "@/assets/logo-white.png";
import { usePageContent } from "@/hooks/usePageContent";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const exploreLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Our Work", href: "/our-work" },
  { title: "Our Impact", href: "/projects" },
  { title: "News & Stories", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const getInvolvedLinks = [
  { title: "Donate", href: "/donation" },
  { title: "Partner with Us", href: "/partnership" },
  { title: "Volunteer / Mentor", href: "/volunteer" },
  { title: "CAP — Community Access & Participation Pathway", href: "/programs/cap" },
  { title: "FLIP — Female Learning & Inclusion Pathway", href: "/programs/flip" },
  { title: "EJP — Education Journey Pathway", href: "/programs/gjp" },
];

const trustLinks = [
  { title: "Transparency & Governance", href: "/transparency" },
  { title: "Annual Reports", href: "/annual-reports" },
  { title: "Safeguarding", href: "/transparency#safeguarding" },
  { title: "Privacy", href: "/privacy" },
  { title: "Cookies", href: "/privacy#cookies" },
  { title: "Accessibility", href: "/accessibility" },
  { title: "Terms", href: "/terms" },
];

const getSocialLinks = (s: Record<string, string>) => [
  { icon: Facebook, href: s.facebook || "#", label: "Facebook" },
  { icon: Twitter, href: s.twitter || "#", label: "Twitter" },
  { icon: Linkedin, href: s.linkedin || "#", label: "LinkedIn" },
  { icon: Instagram, href: s.instagram || "#", label: "Instagram" },
  { icon: Youtube, href: s.youtube || "#", label: "YouTube" },
  { icon: Music2, href: s.tiktok || "#", label: "TikTok" },
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
    facebook: "https://www.facebook.com/share/17jsnQdbnd/", twitter: "https://x.com/Sarafoundations", linkedin: "https://www.linkedin.com/company/sara-foundation/", instagram: "https://www.instagram.com/sarafoundation.africa", youtube: "https://youtube.com/@sara.foundation", tiktok: "https://www.tiktok.com/@sara.foundation",
  });

  const handleFooterSubscribe = async () => {
    if (!footerEmail) return;
    await supabase.from("newsletter_subscribers").upsert({ email: footerEmail }, { onConflict: "email" });
    supabase.functions.invoke("notify", { body: { type: "newsletter", data: { email: footerEmail } } }).catch(() => {});
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
              Empowering people through tech learning, inclusion and opportunity to build stronger communities.
            </p>
            <p className="text-white/70 text-sm mb-6 font-medium">
              Headquartered in London, United Kingdom.
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
                <Button variant="accent" size="icon" className="rounded-xl flex-shrink-0" onClick={handleFooterSubscribe} aria-label="Subscribe to newsletter">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-white/60 hover:text-primary transition-colors text-sm">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Get Involved</h4>
            <ul className="space-y-4">
              {getInvolvedLinks.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-white/60 hover:text-primary transition-colors text-sm">
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
                    target="_blank"
                    rel="noopener noreferrer"
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
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col gap-4">
          <nav aria-label="Transparency and policies">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              {trustLinks.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-white/60 hover:text-primary transition-colors text-sm">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed text-center md:text-left">
            Sara Foundation Africa is registered as <span className="text-white/80 font-medium">Princess Sara Foundation</span> in Nigeria with CAC charity number: <span className="text-white/80 font-medium">7980056</span>.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Sara Foundation Africa. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Education. Inclusion. Community Impact.
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
