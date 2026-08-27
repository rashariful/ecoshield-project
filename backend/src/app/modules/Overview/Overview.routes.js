
import express from "express";

import {
  OverviewControllers,
} from "./Overview.controller.js";

const router = express.Router();

router.post("/", 
OverviewControllers.createOverview);
router.get("/", 
OverviewControllers.getAllOverview);
router.get("/:id", 
OverviewControllers.getSingleOverview);
router.patch("/:id", 
OverviewControllers.updateOverview);
router.delete("/:id", 
OverviewControllers.deleteOverview);

export const OverviewRoutes = router;
