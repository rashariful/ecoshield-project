import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services/Services";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Portfolio from "@/pages/Portfolio/Portfolio";
import Review from "@/pages/Review/Review";
import Blog from "@/pages/Blog/Blog";

import Faq from "@/pages/Faq/Faq";
import ServiceArea from "@/pages/ServiceArea/ServiceArea";
import PortfolioDetailsPage from "@/pages/Portfolio/PortfolioDetails ";
import ServiceDetails from "@/pages/Services/ServiceDetails";
import AboutPage from "@/pages/about/page";
import BlogDetailsPage from "@/pages/Blog/BlogDetailsPage";
import Gallery from "@/pages/Gallery/Gallery";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetailsPage />} />
        <Route path="/service-area" element={<ServiceArea />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/review" element={<Review />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Routes without Navbar & Footer */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
