import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const partnershipItems = [
  { title: "School Community", href: "/partnership/school-community", description: "Partner with educational institutions" },
  { title: "Organizations", href: "/partnership/organizations", description: "Corporate partnership opportunities" },
  { title: "Sponsors", href: "/partnership/sponsors", description: "Become a sponsor" },
];

const programItems = [
  { title: "Career Advancement Program", href: "/programs/cap", description: "9-month rotational tech program" },
  { title: "Female Leadership Initiative", href: "/programs/flip", description: "Empowering women in tech" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm" 
          : isHome 
            ? "bg-transparent" 
            : "bg-white/80 backdrop-blur-xl"
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary/80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">SF</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-bold text-lg ${scrolled || !isHome ? 'text-foreground' : 'text-white'}`}>
                Sara Foundation
              </span>
              <span className="text-primary font-display font-bold text-lg"> Africa</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className={`px-4 py-2 font-medium transition-colors ${
                      scrolled || !isHome ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent font-medium ${
                      scrolled || !isHome ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Partnership
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 bg-popover/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg">
                      {partnershipItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-secondary"
                            >
                              <div className="text-sm font-semibold leading-none text-foreground">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`bg-transparent font-medium ${
                      scrolled || !isHome ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 bg-popover/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg">
                      {programItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-secondary"
                            >
                              <div className="text-sm font-semibold leading-none text-foreground">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {['About', 'Contact', 'Blog'].map((item) => (
                  <NavigationMenuItem key={item}>
                    <Link 
                      to={`/${item.toLowerCase()}`} 
                      className={`px-4 py-2 font-medium transition-colors ${
                        scrolled || !isHome ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant={scrolled || !isHome ? "outline" : "outlineWhite"} size="sm">
              Partner with Us
            </Button>
            <Button size="sm" className="glow-effect">
              Donate Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${scrolled || !isHome ? 'text-foreground' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 bg-white/95 backdrop-blur-xl rounded-2xl mt-2 border border-border/50 shadow-lg animate-fade-in">
            <div className="flex flex-col gap-2 px-4">
              <Link to="/" className="nav-link-modern py-3 px-4 rounded-xl hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              
              <div className="py-2">
                <span className="px-4 font-semibold text-foreground text-sm">Partnership</span>
                <div className="mt-2 space-y-1">
                  {partnershipItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block py-2 px-4 ml-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <span className="px-4 font-semibold text-foreground text-sm">Programs</span>
                <div className="mt-2 space-y-1">
                  {programItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block py-2 px-4 ml-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {['About', 'Contact', 'Blog'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`} 
                  className="nav-link-modern py-3 px-4 rounded-xl hover:bg-secondary" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                <Button variant="outline" className="w-full">
                  Partner with Us
                </Button>
                <Button className="w-full glow-effect">
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
