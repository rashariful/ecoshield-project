
import catchAsync from "../../utils/catchAsync.js";
import { 
  PortfolioServices
 } from "./Portfolio.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Portfolio
const createPortfolio = catchAsync(async (req, res) => {
  const result = await 
  PortfolioServices.createPortfolio( req.files, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Portfolio created successfully",
    data: result,
  });
});

// Get all Portfolio
const getAllPortfolio = catchAsync(async (req, res) => {
  const result = await 
  PortfolioServices.getAllPortfolio(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Portfolio fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Portfolio
const getSinglePortfolio = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  PortfolioServices.getSinglePortfolio(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Portfolio fetched successfully",
    data: result,
  });
});
// Get single Portfolio By Slug
const getSinglePortfolioBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await PortfolioServices.getSinglePortfolioBySlug(slug);

  if (!result) {
    return sendResponse(res, {
      status: 404,
      success: false,
      message: "Portfolio not found",
    });
  }

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Single Portfolio fetched by slug successfully",
    data: result,
  });
});
// const getSinglePortfolioBySlug = catchAsync(async (req, res) => {
//   console.log(req.params.slug)
//   const { slug } = req.params;
//   const result = await 
//   PortfolioServices.getSinglePortfolioBySlug(slug);
//   sendResponse(res, {
//     status: 200,
//     success: true,
//     message: "Single  Portfolio fetched By Slug successfully",
//     data: result,
//   });
// });

// Update Portfolio
const updatePortfolio = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  PortfolioServices.updatePortfolio(id,req.files, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Portfolio updated successfully",
    data: result,
  });
});

// Delete Portfolio
const deletePortfolio = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  PortfolioServices.deletePortfolio(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Portfolio deleted successfully",
    data: result,
  });
});

export const PortfolioControllers ={
  createPortfolio,
  getAllPortfolio,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
  getSinglePortfolioBySlug

}
