import { useState } from "react";
import { Link } from "react-router-dom";
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
import { cn } from "@/lib/utils";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">SF</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg text-foreground">Sara Foundation</span>
              <span className="text-primary font-display font-bold text-lg"> Africa</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="nav-link px-4 py-2">
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="nav-link bg-transparent">
                    Partnership
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-popover">
                      {partnershipItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10"
                            >
                              <div className="text-sm font-medium leading-none text-foreground">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                  <NavigationMenuTrigger className="nav-link bg-transparent">
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-popover">
                      {programItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10"
                            >
                              <div className="text-sm font-medium leading-none text-foreground">{item.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                  <Link to="/about" className="nav-link px-4 py-2">
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact" className="nav-link px-4 py-2">
                    Contact
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/blog" className="nav-link px-4 py-2">
                    Blog
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm">
              Partner with Us
            </Button>
            <Button size="sm">
              Donate Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              
              <div className="space-y-2">
                <span className="font-semibold text-foreground">Partnership</span>
                {partnershipItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block pl-4 py-1 text-muted-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-foreground">Programs</span>
                {programItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="block pl-4 py-1 text-muted-foreground hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <Link to="/about" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/blog" className="nav-link py-2" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  Partner with Us
                </Button>
                <Button className="w-full">
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
