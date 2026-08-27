
import express from "express";

import {
  TestimonialControllers,
} from "./Testimonial.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
TestimonialControllers.createTestimonial);
router.get("/", 
TestimonialControllers.getAllTestimonial);
router.get("/:id", 
TestimonialControllers.getSingleTestimonial);
router.patch("/:id", upload.single("thumbnail"),
TestimonialControllers.updateTestimonial);
router.delete("/:id", 
TestimonialControllers.deleteTestimonial);

export const TestimonialRoutes = router;
