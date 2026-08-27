
import catchAsync from "../../utils/catchAsync.js";
import { 
  GalleriesServices
 } from "./Galleries.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Galleries
const createGalleries = catchAsync(async (req, res) => {
  const result = await 
  GalleriesServices.createGalleries(req.files, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Galleries created successfully",
    data: result,
  });
});

// Get all Galleries
const getAllGalleries = catchAsync(async (req, res) => {
  const result = await 
  GalleriesServices.getAllGalleries(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Galleries fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Galleries
const getSingleGalleries = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  GalleriesServices.getSingleGalleries(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Galleries fetched successfully",
    data: result,
  });
});

// Update Galleries
const updateGalleries = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  GalleriesServices.updateGalleries(id, req.files, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Galleries updated successfully",
    data: result,
  });
});

// Delete Galleries
const deleteGalleries = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  GalleriesServices.deleteGalleries(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Galleries deleted successfully",
    data: result,
  });
});

export const GalleriesControllers ={
  createGalleries,
  getAllGalleries,
  getSingleGalleries,
  updateGalleries,
  deleteGalleries

}
