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
      const imageName = `service${Date.now()}`;
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
   const ServiceSearchableFields = ["title", "category"]; // searchable fields
  
    const resultQuery = new QueryBuilder(
      Service.find(), // only these fields
      // Service.find({}, "title subTitle thumbnail shortDescription category createdAt slug isActive"), // only these fields
      query
    )

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
  const services = await Service.find(
    {
      parentService: parentId,
      isActive: true,
    },
    {
      title: 1,
      slug: 1,
      thumbnail: 1,
      parentService: 1,
      orderNumber: 1, // 🔥 MUST
    }
  )
    .lean()
    .sort({ orderNumber: 1, title: 1 }); // 🔥 MUST

  const results = await Promise.all(
    services.map(async (service) => {
      const children = await buildServiceTree(service._id);
      return {
        _id: service._id,
        title: service.title,
        slug: service.slug,
        thumbnail: service.thumbnail,
        orderNumber: service.orderNumber ?? 999,
        children,
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
// Update Service
const updateService = async (id, file, payload) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      throw new Error("Service not found");
    }

    // 🔹 FormData থেকে faqs parse করা (CREATE এর মতো)
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

      if (!Array.isArray(payload.faqs)) {
        throw new Error("faqs must be an array of objects");
      }
    }

    // 🔹 Image handling
    if (file?.buffer) {
      const imageName = `service${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    } else {
      // নতুন image না থাকলে পুরোনোটা রাখো
      payload.thumbnail = service.thumbnail;
    }

    // 🔹 Slug fallback (optional but safe)
    if (!payload.slug && payload.title) {
      payload.slug = payload.title.toLowerCase().replace(/\s+/g, "-");
    }

    // 🔹 Update service
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

// Get single Portfolio By Slug
const getSingleServiceBySlug = async (slug) => {
  const result = await Service.findOne({ slug });
  return result;
};

export const ServiceServices = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
  getServiceMenu,
  getSingleServiceBySlug,
};
