import { Testimonial } from "./Testimonial.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";

// Declare the Services

const createTestimonial = async (file, payload) => {
  try {
    if (!payload.name) throw new Error("Name is required.");
    if (file?.buffer) {
      const imageName = `testimonial${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    }

    const result = await Testimonial.create(payload);
    return result;
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    throw new Error("Failed to create testimonial: " + error.message);
  }
};
const getAllTestimonial = async (query) => {
  const TestimonialSearchableFields = [];
  const resultQuery = new QueryBuilder(Testimonial.find(), query)
    .search(TestimonialSearchableFields)
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
const getSingleTestimonial = async (id) => {
  const result = await Testimonial.findById(id);
  return result;
};
const updateTestimonial = async (id, file, payload) => {
  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }

    // নতুন ফাইল থাকলে ক্লাউডিনারিতে আপলোড করো
    if (file?.buffer) {
      const imageName = `testimonial${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer
      );
      payload.thumbnail = secure_url;
    } else {
      // নতুন ফাইল না থাকলে পুরনো thumbnail রাখো
      payload.thumbnail = testimonial.thumbnail;
    }

    const result = await Testimonial.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    return result;
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    throw new Error("Failed to update testimonial: " + error.message);
  }
};

const deleteTestimonial = async (id) => {
  const result = await Testimonial.findByIdAndDelete(id);
  return result;
};

export const TestimonialServices = {
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
