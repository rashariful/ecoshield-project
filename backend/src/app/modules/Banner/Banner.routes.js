
import express from "express";

import {
  BannerControllers,
} from "./Banner.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
BannerControllers.createBanner);
router.get("/", 
BannerControllers.getAllBanner);
router.get("/:id", 
BannerControllers.getSingleBanner);
router.patch("/:id",  upload.single("thumbnail"),
BannerControllers.updateBanner);
router.delete("/:id", 
BannerControllers.deleteBanner);

export const BannerRoutes = router;
