
import catchAsync from "../../utils/catchAsync.js";
import { 
  ArchiveCategoryServices
 } from "./ArchiveCategory.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create ArchiveCategory
const createArchiveCategory = catchAsync(async (req, res) => {
  const result = await 
  ArchiveCategoryServices.createArchiveCategory(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "ArchiveCategory created successfully",
    data: result,
  });
});

// Get all ArchiveCategory
const getAllArchiveCategory = catchAsync(async (req, res) => {
  const result = await 
  ArchiveCategoryServices.getAllArchiveCategory(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All ArchiveCategory fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single ArchiveCategory
const getSingleArchiveCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ArchiveCategoryServices.getSingleArchiveCategory(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "ArchiveCategory fetched successfully",
    data: result,
  });
});

// Update ArchiveCategory
const updateArchiveCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ArchiveCategoryServices.updateArchiveCategory(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "ArchiveCategory updated successfully",
    data: result,
  });
});

// Delete ArchiveCategory
const deleteArchiveCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ArchiveCategoryServices.deleteArchiveCategory(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "ArchiveCategory deleted successfully",
    data: result,
  });
});

export const ArchiveCategoryControllers ={
  createArchiveCategory,
  getAllArchiveCategory,
  getSingleArchiveCategory,
  updateArchiveCategory,
  deleteArchiveCategory

}
