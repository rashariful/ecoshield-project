
import express from "express";

import {
  PortfolioControllers,
} from "./Portfolio.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.array("images"),
PortfolioControllers.createPortfolio);


router.get("/", 
PortfolioControllers.getAllPortfolio);
router.get("/:slug", 
  PortfolioControllers.getSinglePortfolioBySlug);
  router.get("/:id", 
  PortfolioControllers.getSinglePortfolio);
router.patch("/:id", upload.array("images"),
PortfolioControllers.updatePortfolio);
router.delete("/:id", 
PortfolioControllers.deletePortfolio);

export const PortfolioRoutes = router;
