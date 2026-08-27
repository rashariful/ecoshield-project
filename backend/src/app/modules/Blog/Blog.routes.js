
import express from "express";

import {
  BlogControllers,
} from "./Blog.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";

const router = express.Router();

router.post("/", upload.single("thumbnail"),
BlogControllers.createBlog);
router.get("/", 
BlogControllers.getAllBlog);
router.get("/:slug", 
BlogControllers.getSingleBlogBySlug);
router.get("/:id", 
BlogControllers.getSingleBlog);
router.patch("/:id", upload.single("thumbnail"),
BlogControllers.updateBlog);
router.delete("/:id", 
BlogControllers.deleteBlog);

export const BlogRoutes = router;
