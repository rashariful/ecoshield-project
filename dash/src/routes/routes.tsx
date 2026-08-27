// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Page components
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import Settings from "@/pages/Settings";

import NotFound from "@/pages/NotFound";
import Login from "@/pages/Auth/Login"; // if you have
import Team from "@/pages/Team/Team";
import PartnerPage from "@/pages/Partner/PartnerPage";
import BannerPage from "@/pages/Banner/BannerPage";
import ServicePage from "@/pages/Service/ServicePage";
import PortfolioPage from "@/pages/Portfolio/PortfolioPage";
import TestimonialPage from "@/pages/Testimonial/TestimonialPage";
import ContactPage from "@/pages/Contact/ContactPage";
import QuotePage from "@/pages/Quote/QuotePage";
import FaqPage from "@/pages/Faq/FaqPage";
import Overview from "@/pages/Overview/Overview";
import DirectorPage from "@/pages/Director/DirectorPage";
import CategoryPage from "@/pages/Category/CategoryPage";
import VideoPage from "@/pages/Gallery/VideoPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import BlogPage from "@/pages/Blog/BlogPage";

import ServiceArea from "@/pages/ServiceArea/ServiceArea";
import CertificatePage from "@/pages/Certificate/CertificatePage";

const AppRoutes = () => (
  <Routes>
    {/* Public route */}
    <Route path="/login" element={<Login />} />

    {/* Protected dashboard layout */}
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="customers" element={<Customers />} />
      <Route path="banner" element={<BannerPage />} />
      <Route path="service" element={<ServicePage />} />
      <Route path="portfolio" element={<PortfolioPage />} />
      <Route path="category" element={<CategoryPage />} />
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="review" element={<TestimonialPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="quote" element={<QuotePage />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="overviews" element={<Overview />} />
      <Route path="directors" element={<DirectorPage />} />
      <Route path="area" element={<ServiceArea />} />
      <Route path="certificate" element={<CertificatePage />} />

      <Route path="settings" element={<Settings />} />

      <Route path="/">
        {/* <Route index  /> */}
        <Route path="team" element={<Team />} />
      </Route>
      <Route path="/">
        {/* <Route index  /> */}
        <Route path="partner" element={<PartnerPage />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
