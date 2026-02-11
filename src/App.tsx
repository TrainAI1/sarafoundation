import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Donation from "./pages/Donation";
import ProgramCAP from "./pages/programs/CAP";
import ProgramFLIP from "./pages/programs/FLIP";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/programs/cap" element={<ProgramCAP />} />
            <Route path="/programs/flip" element={<ProgramFLIP />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/partnership/school-community" element={<SchoolCommunity />} />
            <Route path="/partnership/organizations" element={<Organizations />} />
            <Route path="/partnership/sponsors" element={<Sponsors />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="blog" element={<AdminBlogList />} />
              <Route path="blog/:id" element={<AdminBlogEditor />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
