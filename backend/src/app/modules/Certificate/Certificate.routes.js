
import express from "express";

import {
  CertificateControllers,
} from "./Certificate.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
CertificateControllers.createCertificate);
router.get("/", 
CertificateControllers.getAllCertificate);
router.get("/:id", 
CertificateControllers.getSingleCertificate);
router.patch("/:id", upload.single("thumbnail"),
CertificateControllers.updateCertificate);
router.delete("/:id", 
CertificateControllers.deleteCertificate);

export const CertificateRoutes = router;
