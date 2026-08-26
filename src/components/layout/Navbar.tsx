import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logoDark from "@/assets/logo-dark.png";

const ourWorkItems = [
  { title: "How We Work", href: "/our-work", description: "Our delivery model, from understanding need to measuring public benefit" },
  { title: "CAP: Community Access & Participation Pathway", href: "/programs/cap", description: "Structured digital education, mentoring and practical learning for underserved young people" },
  { title: "FLIP: Female Learning & Inclusion Pathway", href: "/programs/flip", description: "Inclusive access to tech learning, mentoring and community for women" },
  { title: "EJP: Education Journey Pathway", href: "/programs/gjp", description: "Continued learning through insight, work-readiness education and experience" },
];

const getInvolvedItems = [
  { title: "Ways to Support Us", href: "/get-involved", description: "All the ways you can help widen access to learning" },
  { title: "Donate", href: "/donation", description: "Fund scholarships, bursaries, resources and mentoring" },
  { title: "Partner with Us", href: "/partnership", description: "Collaborate with us to widen access to learning" },
  { title: "Volunteer / Mentor", href: "/volunteer", description: "Join 60+ mentors, trainers, speakers and facilitators" },
  { title: "Contact Us", href: "/contact", description: "Talk to the team about our work" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when tapping outside of it
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setMobileMenuOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : isHome
            ? "bg-background/40 backdrop-blur-md border-b border-border/30"
            : "bg-background/80 backdrop-blur-xl"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoDark}
              alt="Sara Foundation Africa — home"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className="px-4 py-2 font-medium transition-colors text-foreground/70 hover:text-foreground"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className="px-4 py-2 font-medium transition-colors text-foreground/70 hover:text-foreground"
                  >
                    About Us
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent font-medium text-foreground/70 hover:text-foreground"
                  >
                    Our Work
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-2 p-4 bg-popover/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg">
                      {ourWorkItems.map((item) => (
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
                  <Link
                    to="/projects"
                    className="px-4 py-2 font-medium transition-colors text-foreground/70 hover:text-foreground"
                  >
                    Our Impact
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent font-medium text-foreground/70 hover:text-foreground"
                  >
                    Get Involved
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 bg-popover/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg">
                      {getInvolvedItems.map((item) => (
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
                  <Link
                    to="/blog"
                    className="px-4 py-2 font-medium transition-colors text-foreground/70 hover:text-foreground"
                  >
                    News &amp; Stories
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/partnership">Partner with Us</Link>
            </Button>
            <Button size="sm" className="glow-effect" asChild>
              <Link to="/donation">Donate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={triggerRef}
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="lg:hidden py-4 bg-background/70 backdrop-blur-2xl rounded-2xl mt-2 mb-3 border border-border/50 shadow-xl animate-fade-in max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col gap-1 px-4 pb-2">
              <Link to="/" className="nav-link-modern py-3 px-4 rounded-xl hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              <Link to="/about" className="nav-link-modern py-3 px-4 rounded-xl hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>

              <div className="py-2">
                <span className="px-4 font-semibold text-foreground text-sm">Our Work</span>
                <div className="mt-2 space-y-1">
                  {ourWorkItems.map((item) => (
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

              <Link to="/projects" className="nav-link-modern py-3 px-4 rounded-xl hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                Our Impact
              </Link>

              <div className="py-2">
                <span className="px-4 font-semibold text-foreground text-sm">Get Involved</span>
                <div className="mt-2 space-y-1">
                  {getInvolvedItems.map((item) => (
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

              <Link to="/blog" className="nav-link-modern py-3 px-4 rounded-xl hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                News &amp; Stories
              </Link>

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/partnership" onClick={() => setMobileMenuOpen(false)}>Partner with Us</Link>
                </Button>
                <Button className="w-full glow-effect" asChild>
                  <Link to="/donation" onClick={() => setMobileMenuOpen(false)}>Donate</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
