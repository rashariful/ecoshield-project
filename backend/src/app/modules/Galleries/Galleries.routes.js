
import express from "express";

import {
  GalleriesControllers,
} from "./Galleries.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.array("images"),
GalleriesControllers.createGalleries);
router.get("/", 
GalleriesControllers.getAllGalleries);
router.get("/:id", 
GalleriesControllers.getSingleGalleries);
router.patch("/:id", upload.array("images"),
GalleriesControllers.updateGalleries);
router.delete("/:id", 
GalleriesControllers.deleteGalleries);

export const GalleriesRoutes = router;
