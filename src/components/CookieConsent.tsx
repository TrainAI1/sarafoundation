import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "sara-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 md:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground text-sm mb-1">Cookie Notice</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>
              <button onClick={handleDecline} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDecline} variant="outline" size="sm" className="flex-1 rounded-xl text-xs">
                Decline
              </Button>
              <Button onClick={handleAccept} size="sm" className="flex-1 rounded-xl text-xs glow-effect">
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
