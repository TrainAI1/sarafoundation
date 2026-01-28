import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ProgramCAP from "./pages/programs/CAP";
import ProgramFLIP from "./pages/programs/FLIP";
import Partnership from "./pages/Partnership";
import SchoolCommunity from "./pages/partnership/SchoolCommunity";
import Organizations from "./pages/partnership/Organizations";
import Sponsors from "./pages/partnership/Sponsors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/programs/cap" element={<ProgramCAP />} />
          <Route path="/programs/flip" element={<ProgramFLIP />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/partnership/school-community" element={<SchoolCommunity />} />
          <Route path="/partnership/organizations" element={<Organizations />} />
          <Route path="/partnership/sponsors" element={<Sponsors />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
