
import catchAsync from "../../utils/catchAsync.js";
import { 
  CertificateServices
 } from "./Certificate.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Certificate
const createCertificate = catchAsync(async (req, res) => {
  const result = await 
  CertificateServices.createCertificate(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});

// Get all Certificate
const getAllCertificate = catchAsync(async (req, res) => {
  const result = await 
  CertificateServices.getAllCertificate(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Certificate fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Certificate
const getSingleCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  CertificateServices.getSingleCertificate(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Certificate fetched successfully",
    data: result,
  });
});

// Update Certificate
const updateCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  CertificateServices.updateCertificate(id, req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Certificate updated successfully",
    data: result,
  });
});

// Delete Certificate
const deleteCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  CertificateServices.deleteCertificate(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Certificate deleted successfully",
    data: result,
  });
});

export const CertificateControllers ={
  createCertificate,
  getAllCertificate,
  getSingleCertificate,
  updateCertificate,
  deleteCertificate

}
