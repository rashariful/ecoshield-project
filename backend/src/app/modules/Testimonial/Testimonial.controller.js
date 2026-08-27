
import catchAsync from "../../utils/catchAsync.js";
import { 
  TestimonialServices
 } from "./Testimonial.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Testimonial
const createTestimonial = catchAsync(async (req, res) => {
  const result = await 
  TestimonialServices.createTestimonial(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Testimonial created successfully",
    data: result,
  });
});

// Get all Testimonial
const getAllTestimonial = catchAsync(async (req, res) => {
  const result = await 
  TestimonialServices.getAllTestimonial(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Testimonial fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Testimonial
const getSingleTestimonial = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  TestimonialServices.getSingleTestimonial(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Testimonial fetched successfully",
    data: result,
  });
});

// Update Testimonial
const updateTestimonial = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  TestimonialServices.updateTestimonial(id,req.file,  req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Testimonial updated successfully",
    data: result,
  });
});

// Delete Testimonial
const deleteTestimonial = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  TestimonialServices.deleteTestimonial(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Testimonial deleted successfully",
    data: result,
  });
});

export const TestimonialControllers ={
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial

}
