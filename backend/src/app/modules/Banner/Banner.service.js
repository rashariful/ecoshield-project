import { Banner } from "./Banner.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Create Banner
const createBanner = async (file, payload) => {
  try {
    if (!payload.title) throw new Error("Title is required.");
    if (file?.buffer) {
      const imageName = `banner${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await Banner.create(payload);
    return result;
  } catch (error) {
    console.error("Failed to create banner:", error);
    throw new Error("Failed to create banner: " + error.message);
  }
};
// Get all Banner
const getAllBanner = async (query) => {
  const BannerSearchableFields = [];
  const resultQuery = new QueryBuilder(Banner.find(), query)
    .search(BannerSearchableFields)
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
// Get single Banner
const getSingleBanner = async (id) => {
  const result = await Banner.findById(id);
  return result;
};
// Update Banner
const updateBanner = async (id, file, payload) => {
  try {
    // যদি নতুন ফাইল থাকে, তাহলে Cloudinary তে আপলোড করো
    if (file?.buffer) {
      const imageName = `banner${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await Banner.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw new Error("Banner not found");
    }

    return result;
  } catch (error) {
    console.error("Failed to update banner:", error);
    throw new Error("Failed to update banner: " + error.message);
  }
};

// Delete Banner
const deleteBanner = async (id) => {
  const result = await Banner.findByIdAndDelete(id);
  return result;
};

export const BannerServices = {
  createBanner,
  getAllBanner,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
