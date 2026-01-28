import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoWhite from "@/assets/logo-white.png";

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
  { title: "Women in Tech Africa", href: "/programs/flip" },
  { title: "Women Founders Africa", href: "/programs/flip" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
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
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-primary"
                />
                <Button variant="accent" size="icon" className="rounded-xl flex-shrink-0">
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
                  <p>E14 8AT, London, UK</p>
                  <p>Bafaj Crescent, Awoyaya-Eputu, Ibeju Lekki, Lagos, Nigeria</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a href="mailto:info@sarafoundationafrica.com" className="text-white/60 hover:text-primary text-sm transition-colors">
                  info@sarafoundationafrica.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-white/60 text-sm">
                  <p>+44 7435 126104</p>
                  <p>+234 9076 66404</p>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <p className="font-semibold mb-4">Follow Us</p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
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
