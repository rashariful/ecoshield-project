
import catchAsync from "../../utils/catchAsync.js";
import { 
  BlogServices
 } from "./Blog.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Blog
const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog( req.file, req.body); // <-- ঠিক order
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

// Get all Blog
const getAllBlog = catchAsync(async (req, res) => {
  const result = await 
  BlogServices.getAllBlog(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Blog fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Blog
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  BlogServices.getSingleBlog(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Blog fetched successfully",
    data: result,
  });
});

// Update Blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  BlogServices.updateBlog(id,req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

// Delete Blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  BlogServices.deleteBlog(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

// Get single service By Slug
const getSingleBlogBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await BlogServices.getSingleBlogBySlug(slug);

  if (!result) {
    return sendResponse(res, {
      status: 404,
      success: false,
      message: "Blog not found",
    });
  }

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Single Blog fetched by slug successfully",
    data: result,
  });
});

export const BlogControllers ={
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getSingleBlogBySlug

}
