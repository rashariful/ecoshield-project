
import catchAsync from "../../utils/catchAsync.js";
import { 
  ServiceAreasServices
 } from "./ServiceAreas.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create ServiceAreas
const createServiceAreas = catchAsync(async (req, res) => {
  const result = await 
  ServiceAreasServices.createServiceAreas(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "ServiceAreas created successfully",
    data: result,
  });
});

// Get all ServiceAreas
const getAllServiceAreas = catchAsync(async (req, res) => {
  const result = await 
  ServiceAreasServices.getAllServiceAreas(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All ServiceAreas fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single ServiceAreas
const getSingleServiceAreas = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ServiceAreasServices.getSingleServiceAreas(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "ServiceAreas fetched successfully",
    data: result,
  });
});

// Update ServiceAreas
const updateServiceAreas = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ServiceAreasServices.updateServiceAreas(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "ServiceAreas updated successfully",
    data: result,
  });
});

// Delete ServiceAreas
const deleteServiceAreas = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ServiceAreasServices.deleteServiceAreas(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "ServiceAreas deleted successfully",
    data: result,
  });
});

export const ServiceAreasControllers ={
  createServiceAreas,
  getAllServiceAreas,
  getSingleServiceAreas,
  updateServiceAreas,
  deleteServiceAreas

}
