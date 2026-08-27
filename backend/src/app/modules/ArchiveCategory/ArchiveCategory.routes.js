
import express from "express";

import {
  ArchiveCategoryControllers,
} from "./ArchiveCategory.controller.js";

const router = express.Router();

router.post("/", 
ArchiveCategoryControllers.createArchiveCategory);
router.get("/", 
ArchiveCategoryControllers.getAllArchiveCategory);
router.get("/:id", 
ArchiveCategoryControllers.getSingleArchiveCategory);
router.patch("/:id", 
ArchiveCategoryControllers.updateArchiveCategory);
router.delete("/:id", 
ArchiveCategoryControllers.deleteArchiveCategory);

export const ArchiveCategoryRoutes = router;
