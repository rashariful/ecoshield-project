
import express from "express";

import {
  DirectorsControllers,
} from "./Directors.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
DirectorsControllers.createDirectors);
router.get("/", 
DirectorsControllers.getAllDirectors);
router.get("/:id", 
DirectorsControllers.getSingleDirectors);
router.patch("/:id", upload.single("thumbnail"),
DirectorsControllers.updateDirectors);
router.delete("/:id", 
DirectorsControllers.deleteDirectors);

export const DirectorsRoutes = router;
