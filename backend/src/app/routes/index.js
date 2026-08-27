import { Router } from "express";
import { AuthRoutes } from "../modules/user/user.routes.js";
import { SmsRoutes } from "../modules/sms/sms.routes.js";
import { ServiceRoutes } from "../modules/Service/Service.routes.js";
import { PortfolioRoutes } from "../modules/Portfolio/Portfolio.routes.js";
import { CompanyLogoRoutes } from "../modules/CompanyLogo/CompanyLogo.routes.js";
import { TeamRoutes } from "../modules/Team/Team.routes.js";
import { GalleriesRoutes } from "../modules/Galleries/Galleries.routes.js";
import { TestimonialRoutes } from "../modules/Testimonial/Testimonial.routes.js"
import { ContactRoutes } from "../modules/Contact/Contact.routes.js";
import { BannerRoutes } from "../modules/Banner/Banner.routes.js";
import { FaqRoutes } from "../modules/Faq/Faq.routes.js";
import { DirectorsRoutes } from "../modules/Directors/Directors.routes.js";
import { OverviewRoutes } from "../modules/Overview/Overview.routes.js";
import { ArchiveCategoryRoutes } from "../modules/ArchiveCategory/ArchiveCategory.routes.js";
import { BlogRoutes } from "../modules/Blog/Blog.routes.js";
import { ServiceAreasRoutes } from "../modules/ServiceAreas/ServiceAreas.routes.js";
import { CertificateRoutes } from "../modules/Certificate/Certificate.routes.js";
const router = Router();

const moduleRoutes = [
 
  {
    path: "/auth",
    route: AuthRoutes,
  },
 
  {
    path: "/banner",
    route: BannerRoutes
  },
  {
    path: "/services",
    route: ServiceRoutes
  },

  {
    path: "/portfolio",
    route: PortfolioRoutes
  },
  {
    path: "/category",
    route: ArchiveCategoryRoutes
  },
      {
    path: "/galleries",
    route: GalleriesRoutes
  },
  {
    path: "/logos",
    route: CompanyLogoRoutes
  },
  {
    path: "/blog",
    route: BlogRoutes
  },
  {
    path: "/teams",
    route: TeamRoutes
  },
  {
    path: "/directors",
    route: DirectorsRoutes
  },
  {
    path: "/overviews",
    route: OverviewRoutes
  },

  {
    path: "/testimonial",
    route: TestimonialRoutes
  },
  {
    path: "/faq",
    route: FaqRoutes
  },
  {
    path: "/contact",
    route: ContactRoutes
  },
  {
    path: "/Sms",
    route: SmsRoutes
  },
  {
    path: "/area",
    route: ServiceAreasRoutes
  },
  {
    path: "/certificate",
    route: CertificateRoutes
  },
 
];
moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
