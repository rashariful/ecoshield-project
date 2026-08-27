
import express from "express";

import {
  TeamControllers,
} from "./Team.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
TeamControllers.createTeam);
router.get("/", 
TeamControllers.getAllTeam);
router.get("/:id", 
TeamControllers.updateTeam);
router.patch("/:id", upload.single("thumbnail"),
TeamControllers.updateTeam);
router.delete("/:id", 
TeamControllers.deleteTeam);

export const TeamRoutes = router;
