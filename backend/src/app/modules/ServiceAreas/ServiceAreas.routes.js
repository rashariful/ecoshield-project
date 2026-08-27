
import express from "express";

import {
  ServiceAreasControllers,
} from "./ServiceAreas.controller.js";

const router = express.Router();

router.post("/", 
ServiceAreasControllers.createServiceAreas);
router.get("/", 
ServiceAreasControllers.getAllServiceAreas);
router.get("/:id", 
ServiceAreasControllers.getSingleServiceAreas);
router.patch("/:id", 
ServiceAreasControllers.updateServiceAreas);
router.delete("/:id", 
ServiceAreasControllers.deleteServiceAreas);

export const ServiceAreasRoutes = router;
