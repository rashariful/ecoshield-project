
import catchAsync from "../../utils/catchAsync.js";
import { 
  CompanyLogoServices
 } from "./CompanyLogo.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create CompanyLogo
const createCompanyLogo = catchAsync(async (req, res) => {
  console.log(req.file, req.body)
  const result = await 
  CompanyLogoServices.createCompanyLogo(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "CompanyLogo created successfully",
    data: result,
  });
});

// Get all CompanyLogo
const getAllCompanyLogo = catchAsync(async (req, res) => {
  const result = await 
  CompanyLogoServices.getAllCompanyLogo(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All CompanyLogo fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single CompanyLogo
const getSingleCompanyLogo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  CompanyLogoServices.getSingleCompanyLogo(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "CompanyLogo fetched successfully",
    data: result,
  });
});

// Update CompanyLogo
const updateCompanyLogo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  CompanyLogoServices.updateCompanyLogo(id,req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "CompanyLogo updated successfully",
    data: result,
  });
});

// Delete CompanyLogo
const deleteCompanyLogo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  CompanyLogoServices.deleteCompanyLogo(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "CompanyLogo deleted successfully",
    data: result,
  });
});

export const CompanyLogoControllers ={
  createCompanyLogo,
  getAllCompanyLogo,
  getSingleCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo

}
