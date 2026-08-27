
import { Galleries } from "./Galleries.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services 

const createGalleries = async (files, payload) => {
try {
     if (!payload.title) throw new Error("Title is required.");

    const imageUrls = [];

    if (Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        const imageName = `innovationGallery_${Date.now()}`;
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        imageUrls.push(secure_url);
      }
    }

    payload.images = imageUrls;
        const result = await Galleries.create(payload);
        return result;
} catch (error) {
    console.error("Failed to create gallery:", error);
    throw new Error("Failed to create gallery: " + error.message);
}
}

const getAllGalleries = async (query) => {
    const GalleriesSearchableFields = [];
    const resultQuery = new QueryBuilder(Galleries.find(), query).search(GalleriesSearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingleGalleries = async (id) => {
    const result = await Galleries.findById(id);
    return result;
}


const updateGalleries = async (id, files, payload) => {
  try {
    const gallery = await Galleries.findById(id);
    if (!gallery) {
      throw new Error("Gallery not found");
    }

    let updatedImages = gallery.images || [];

    // যদি নতুন ফাইল থাকে, তাহলে ক্লাউডিনারিতে আপলোড করো
    if (Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        const imageName = `innovationGallery_${Date.now()}`;
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        updatedImages.push(secure_url);
      }
    }

    payload.images = updatedImages;

    const result = await Galleries.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (error) {
    console.error("Failed to update gallery:", error);
    throw new Error("Failed to update gallery: " + error.message);
  }
};


const deleteGalleries = async (id) => {
    const result = await Galleries.findByIdAndDelete(id);
    return result;
}

export const GalleriesServices = {
    createGalleries,
    getAllGalleries,
    getSingleGalleries,
    updateGalleries,
    deleteGalleries
}
