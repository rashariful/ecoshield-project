import { Service } from "./Service.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Create Service
const createService = async (file, payload) => {
  try {
    if (!payload.title) throw new Error("title is required.");

    // 🔹 FormData থেকে faqs parse করা
    if (payload.faqs) {
      if (typeof payload.faqs === "string") {
        try {
          payload.faqs = JSON.parse(payload.faqs);
        } catch (err) {
          throw new Error(
            "Invalid faqs format. Must be a valid JSON array of objects."
          );
        }
      }
      // নিশ্চিত হওয়া যায় যে faqs এখন array of objects
      if (!Array.isArray(payload.faqs)) {
        throw new Error("faqs must be an array of objects");
      }
    }

    // 🔹 Image handling
    if (file?.buffer) {
      const imageName = `innovation${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    // 🔹 Slug generate (optional, যদি schema required হয়)
    if (!payload.slug && payload.title) {
      payload.slug = payload.title.toLowerCase().replace(/\s+/g, "-");
    }

    // 🔹 Create service
    const newService = await Service.create(payload);
    return newService;
  } catch (error) {
    console.error("Failed to create contents:", error);
    throw new Error("Failed to create contents: " + error.message);
  }
};

// Get all Service
const getAllService = async (query) => {
  const ServiceSearchableFields = [];
  const resultQuery = new QueryBuilder(Service.find(), query)
    .search(ServiceSearchableFields)
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
// Get single Service
const getSingleService = async (id) => {
  const result = await Service.findById(id);
  return result;
};

const buildServiceTree = async (parentId = null) => {
  const services = await Service.find({
    parentService: parentId,
    isActive: true,
  })
    .lean()
    .sort({ title: 1 });

  const results = await Promise.all(
    services.map(async (service) => {
      const children = await buildServiceTree(service._id);
      return {
        ...service,
        children, // nested subservices
      };
    })
  );

  return results;
};

/**
 * Get all services as tree
 */
const getServiceMenu = async () => {
  return await buildServiceTree(null);
};
// Update Service
const updateService = async (id, file, payload) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }

    // যদি নতুন ফাইল থাকে, তাহলে ক্লাউডিনারিতে আপলোড করো
    if (file?.buffer) {
      const imageName = `service${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    } else {
      // thumbnail না থাকলে পুরোনোটা রাখো
      payload.thumbnail = service.thumbnail;
    }

    const result = await Service.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (error) {
    console.error("Failed to update service:", error);
    throw new Error("Failed to update service: " + error.message);
  }
};

// Delete Service
const deleteService = async (id) => {
  const result = await Service.findByIdAndDelete(id);
  return result;
};

export const ServiceServices = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  getServiceMenu,
};
