
import express from "express";

import {
  ServiceControllers,
} from "./Service.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
ServiceControllers.createService);
router.get("/", 
ServiceControllers.getAllService);
router.get("/menu", 
ServiceControllers.getServiceMenu);
router.get("/:id", 
ServiceControllers.getSingleService);
router.patch("/:id", upload.single("thumbnail"),
ServiceControllers.updateService);
router.delete("/:id", 
ServiceControllers.deleteService);

export const ServiceRoutes = router;
