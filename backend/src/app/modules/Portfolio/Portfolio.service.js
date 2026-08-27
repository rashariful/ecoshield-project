import { Portfolio } from "./Portfolio.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services

// Create Portfolio
const createPortfolio = async (files, payload) => {
  try {
    if (!payload.title) throw new Error("Title is required.");

    const imageUrls = [];

    if (Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        const imageName = `innovationPortfolio_${Date.now()}`;
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        imageUrls.push(secure_url);
      }
    }

    payload.images = imageUrls;

    const result = await Portfolio.create(payload);
    return result;
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    throw new Error("Failed to create portfolio: " + error.message);
  }
};

// Get all Portfolio
const getAllPortfolio = async (query) => {
  const PortfolioSearchableFields = ["flatSize", "clientName","title"];
  const resultQuery = new QueryBuilder(Portfolio.find().populate("category", "-_id name")

  
  , query)
    .search(PortfolioSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();

  return {
    data: result,
    meta,
  };
};
// Get single Portfolio
const getSinglePortfolio = async (id) => {
  const result = await Portfolio.findById(id);
  return result;
};
// Get single Portfolio By Slug
const getSinglePortfolioBySlug = async (slug) => {
  const result = await Portfolio.findOne({ slug }).populate("category", "-_id name");
  return result;
};
// Update Portfolio
const updatePortfolio = async (id, files, payload) => {
  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    let updatedImages = portfolio.images || [];

    // যদি নতুন ফাইল থাকে, তাহলে ক্লাউডিনারিতে আপলোড করো
    if (Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        const imageName = `innovationPortfolio_${Date.now()}`;
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        updatedImages.push(secure_url);
      }
    }

    payload.images = updatedImages;

    const result = await Portfolio.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (error) {
    console.error("Failed to update portfolio:", error);
    throw new Error("Failed to update portfolio: " + error.message);
  }
};

// Delete Portfolio
const deletePortfolio = async (id) => {
  const result = await Portfolio.findByIdAndDelete(id);
  return result;
};

export const PortfolioServices = {
  createPortfolio,
  getAllPortfolio,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
  getSinglePortfolioBySlug
};
