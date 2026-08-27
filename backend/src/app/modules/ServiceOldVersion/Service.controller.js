
import catchAsync from "../../utils/catchAsync.js";
import { 
  ServiceServices
 } from "./Service.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Service
const createService = catchAsync(async (req, res) => {
  const result = await 
  ServiceServices.createService(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

// Get all Service
const getAllService = catchAsync(async (req, res) => {
  const result = await 
  ServiceServices.getAllService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Service fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

const getServiceMenu = async (req, res) => {
  try {
    const serviceTree = await ServiceServices.getServiceMenu();
    res.status(200).json({
      success: true,
      message: "Service menu tree fetched successfully",
      data: serviceTree,
    });
  } catch (error) {
    console.error("Error fetching service tree:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service menu tree",
    });
  }
};
// Get single Service
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ServiceServices.getSingleService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Service fetched successfully",
    data: result,
  });
});

// Update Service
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ServiceServices.updateService(id,req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

// Delete Service
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ServiceServices.deleteService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceControllers ={
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  getServiceMenu

}
