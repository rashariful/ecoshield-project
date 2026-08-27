
import catchAsync from "../../utils/catchAsync.js";
import { 
  FaqServices
 } from "./Faq.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Faq
const createFaq = catchAsync(async (req, res) => {
  const result = await 
  FaqServices.createFaq(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Faq created successfully",
    data: result,
  });
});

// Get all Faq
const getAllFaq = catchAsync(async (req, res) => {
  const result = await 
  FaqServices.getAllFaq(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Faq fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Faq
const getSingleFaq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  FaqServices.getSingleFaq(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Faq fetched successfully",
    data: result,
  });
});

// Update Faq
const updateFaq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  FaqServices.updateFaq(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Faq updated successfully",
    data: result,
  });
});

// Delete Faq
const deleteFaq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  FaqServices.deleteFaq(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Faq deleted successfully",
    data: result,
  });
});

export const FaqControllers ={
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq

}
