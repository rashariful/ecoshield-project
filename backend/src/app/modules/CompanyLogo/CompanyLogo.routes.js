
import express from "express";

import {
  CompanyLogoControllers,
} from "./CompanyLogo.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail") ,
CompanyLogoControllers.createCompanyLogo);
router.get("/", 
CompanyLogoControllers.getAllCompanyLogo);
router.get("/:id", 
CompanyLogoControllers.getSingleCompanyLogo);
router.patch("/:id", upload.single("thumbnail") ,
CompanyLogoControllers.updateCompanyLogo);
router.delete("/:id", 
CompanyLogoControllers.deleteCompanyLogo);

export const CompanyLogoRoutes = router;
