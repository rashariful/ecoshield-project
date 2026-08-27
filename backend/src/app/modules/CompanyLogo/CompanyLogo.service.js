import { CompanyLogo } from "./CompanyLogo.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services

const createCompanyLogo = async (file, payload) => {
  try {
    if (!payload.title) throw new Error("Title is required.");
    if (file?.buffer) {
      const imageName = `logo${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await CompanyLogo.create(payload);
    return result;
  } catch (error) {
    console.error("Failed to create contents:", error);
    throw new Error("Failed to create contents: " + error.message);
  }
};
const getAllCompanyLogo = async (query) => {
  const CompanyLogoSearchableFields = [];
  const resultQuery = new QueryBuilder(CompanyLogo.find(), query)
    .search(CompanyLogoSearchableFields)
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
const getSingleCompanyLogo = async (id) => {
  const result = await CompanyLogo.findById(id);
  return result;
};


const updateCompanyLogo = async (id, file, payload) => {
  try {
    // যদি নতুন ফাইল থাকে, তাহলে Cloudinary তে আপলোড করো
    if (file?.buffer) {
      const imageName = `logo${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await CompanyLogo.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw new Error("Logo not found");
    }

    return result;
  } catch (error) {
    console.error("Failed to update logo:", error);
    throw new Error("Failed to update logo: " + error.message);
  }
};


const deleteCompanyLogo = async (id) => {
  const result = await CompanyLogo.findByIdAndDelete(id);
  return result;
};

export const CompanyLogoServices = {
  createCompanyLogo,
  getAllCompanyLogo,
  getSingleCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo,
};
