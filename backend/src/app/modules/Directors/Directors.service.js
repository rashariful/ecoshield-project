import { Directors } from "./Directors.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";


// Create Directors
const createDirectors = async (file, payload) => {
  try {
    if (!payload.name) throw new Error("Name is required.");
    if (file?.buffer) {
      const imageName = `innovation`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await Directors.create(payload);
    return result;
  } catch (error) {
    console.error("Failed to create Director:", error);
    throw new Error("Failed to create Director: " + error.message);
  }
};
// Get all Directors
const getAllDirectors = async (query) => {
  const DirectorsSearchableFields = [];
  const resultQuery = new QueryBuilder(Directors.find(), query)
    .search(DirectorsSearchableFields)
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
// Get single Directors
const getSingleDirectors = async (id) => {
  const result = await Directors.findById(id);
  return result;
};
// Update Directors
const updateDirectors = async (id, file, payload) => {
  try {
    // যদি নতুন ফাইল থাকে, তাহলে Cloudinary তে আপলোড করো
    if (file?.buffer) {
      const imageName = `innovation-${id}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await Directors.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw new Error("Director not found");
    }

    return result;
  } catch (error) {
    console.error("Failed to update Director:", error);
    throw new Error("Failed to update Director: " + error.message);
  }
};
// Delete Directors
const deleteDirectors = async (id) => {
  const result = await Directors.findByIdAndDelete(id);
  return result;
};

export const DirectorsServices = {
  createDirectors,
  getAllDirectors,
  getSingleDirectors,
  updateDirectors,
  deleteDirectors,
};
