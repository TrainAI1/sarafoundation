import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { APP_UPDATE_EVENT } from "./config/app-version";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Donation from "./pages/Donation";
import ExternalCourse from "./pages/ExternalCourse";
import Auth from "./pages/Auth";
import ProgramCAP from "./pages/programs/CAP";
import ProgramFLIP from "./pages/programs/FLIP";
import FLIPApply from "./pages/programs/FLIPApply";
import FLIPPayment from "./pages/programs/FLIPPayment";
import FLIPSuccess from "./pages/programs/FLIPSuccess";
import CAPApply from "./pages/programs/CAPApply";
import CAPPayment from "./pages/programs/CAPPayment";
import CAPSuccess from "./pages/programs/CAPSuccess";
import Partnership from "./pages/Partnership";
import SchoolCommunity from "./pages/partnership/SchoolCommunity";
import Organizations from "./pages/partnership/Organizations";
import Sponsors from "./pages/partnership/Sponsors";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminPages from "./pages/admin/AdminPages";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminFAQ from "./pages/admin/AdminFAQ";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminFlipApplications from "./pages/admin/AdminFlipApplications";
import AdminCapApplications from "./pages/admin/AdminCapApplications";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingDonateButton } from "./components/FloatingDonateButton";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const showUpdatePrompt = () => {
      toast("New version available", {
        description: "Refresh to load the latest site updates.",
        action: {
          label: "Refresh",
          onClick: () => (window.location.reload as (forceReload?: boolean) => void)(true),
        },
        duration: Infinity,
      });
    };

    window.addEventListener(APP_UPDATE_EVENT, showUpdatePrompt);
    return () => window.removeEventListener(APP_UPDATE_EVENT, showUpdatePrompt);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SpaRedirectHandler />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/external-course" element={<ExternalCourse />} />
            <Route path="/external-course/:courseId" element={<ExternalCourse />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/programs/cap" element={<ProgramCAP />} />
            <Route path="/programs/cap/apply" element={<CAPApply />} />
            <Route path="/programs/cap/payment" element={<CAPPayment />} />
            <Route path="/programs/cap/success" element={<CAPSuccess />} />
            <Route path="/programs/flip" element={<ProgramFLIP />} />
            <Route path="/programs/flip/apply" element={<FLIPApply />} />
            <Route path="/programs/flip/payment" element={<FLIPPayment />} />
            <Route path="/programs/flip/success" element={<FLIPSuccess />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/partnership/school-community" element={<SchoolCommunity />} />
            <Route path="/partnership/organizations" element={<Organizations />} />
            <Route path="/partnership/sponsors" element={<Sponsors />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="blog" element={<AdminBlogList />} />
              <Route path="blog/:id" element={<AdminBlogEditor />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="flip-applications" element={<AdminFlipApplications />} />
              <Route path="cap-applications" element={<AdminCapApplications />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <FloatingDonateButton />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
  );
};

// Handles redirects from 404.html fallback
function SpaRedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect, { replace: true });
    }
  }, [navigate]);
  return null;
}

export default App;
