
import catchAsync from "../../utils/catchAsync.js";
import { 
  OverviewServices
 } from "./Overview.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Overview
const createOverview = catchAsync(async (req, res) => {
  const result = await 
  OverviewServices.createOverview(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Overview created successfully",
    data: result,
  });
});

// Get all Overview
const getAllOverview = catchAsync(async (req, res) => {
  const result = await 
  OverviewServices.getAllOverview(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Overview fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Overview
const getSingleOverview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  OverviewServices.getSingleOverview(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Overview fetched successfully",
    data: result,
  });
});

// Update Overview
const updateOverview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  OverviewServices.updateOverview(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Overview updated successfully",
    data: result,
  });
});

// Delete Overview
const deleteOverview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  OverviewServices.deleteOverview(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Overview deleted successfully",
    data: result,
  });
});

export const OverviewControllers ={
  createOverview,
  getAllOverview,
  getSingleOverview,
  updateOverview,
  deleteOverview

}
