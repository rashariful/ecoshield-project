
import catchAsync from "../../utils/catchAsync.js";
import { 
  DirectorsServices
 } from "./Directors.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Directors
const createDirectors = catchAsync(async (req, res) => {
  const result = await 
  DirectorsServices.createDirectors(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Directors created successfully",
    data: result,
  });
});

// Get all Directors
const getAllDirectors = catchAsync(async (req, res) => {
  const result = await 
  DirectorsServices.getAllDirectors(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Directors fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Directors
const getSingleDirectors = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  DirectorsServices.getSingleDirectors(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Directors fetched successfully",
    data: result,
  });
});

// Update Directors
const updateDirectors = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  DirectorsServices.updateDirectors(id, req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Directors updated successfully",
    data: result,
  });
});

// Delete Directors
const deleteDirectors = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  DirectorsServices.deleteDirectors(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Directors deleted successfully",
    data: result,
  });
});

export const DirectorsControllers ={
  createDirectors,
  getAllDirectors,
  getSingleDirectors,
  updateDirectors,
  deleteDirectors

}
