import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Placements from "./pages/Placements";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import EnquiryPopup from "./components/EnquiryPopup";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import QuickAccessButtons from "./components/QuickAccessButtons";
import { useScrollEnquiry } from "./hooks/useScrollEnquiry";
import LandingPage from "./pages/Landing";
import Gallery from "./pages/Gallery";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/landing";

  const { showPopup, closePopup } = useScrollEnquiry({
    scrollThreshold: 1,
    delay: 0,
    showOnce: true
  });

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!hideNavbarFooter && <Navbar />}

      {/* ↓ pt-14 pushes all page content below the fixed 56px (h-14) navbar */}
      <main className={`flex-grow ${!hideNavbarFooter ? "pt-20" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/it" element={<Courses />} />
          <Route path="/courses/non-it" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}

      <EnquiryPopup isOpen={showPopup} onClose={closePopup} />
      <QuickAccessButtons />
      <ScrollToTopButton />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
