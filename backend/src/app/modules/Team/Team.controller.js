
import catchAsync from "../../utils/catchAsync.js";
import { 
  TeamServices
 } from "./Team.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Team
const createTeam = catchAsync(async (req, res) => {
  const result = await 
  TeamServices.createTeam(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Team created successfully",
    data: result,
  });
});

// Get all Team
const getAllTeam = catchAsync(async (req, res) => {
  const result = await 
  TeamServices.getAllTeam(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Team fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Team
const getSingleTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  TeamServices.getSingleTeam(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Team fetched successfully",
    data: result,
  });
});

// Update Team
const updateTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  TeamServices.updateTeam(id,req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Team updated successfully",
    data: result,
  });
});

// Delete Team
const deleteTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  TeamServices.deleteTeam(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Team deleted successfully",
    data: result,
  });
});

export const TeamControllers ={
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam

}
