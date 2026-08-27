import { Blog } from "./Blog.model.js";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary.js";


// Create Blog
const createBlog = async (file, payload) => {
    console.log(payload)
  try {
    if (!payload.title) throw new Error("title is  required.");
    if (file?.buffer) {
      const imageName = `blog${Date.now()}`;

      const { secure_url } = await sendImageToCloudinary(
        imageName,
        file.buffer,
      );
      payload.thumbnail = secure_url;
    }

    const result = await Blog.create(payload);

    return result;
  } catch (error) {
    console.error("Failed to create blog:", error);
    throw new Error("Failed to create blog: " + error.message);
  }
};
// Get all Blog
// Optimized fetch: only required fields
const getAllBlog = async (query) => {
  const BlogSearchableFields = ["title", "category"]; // searchable fields

  const resultQuery = new QueryBuilder(
    Blog.find(), // only these fields
    // Blog.find({}, "title thumbnail shortDescrip category createdAt slug isActive"), // only these fields
    query
  )
    .search(BlogSearchableFields)
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
// const getAllBlog = async (query) => {
//   const BlogSearchableFields = [];
//   const resultQuery = new QueryBuilder(Blog.find(), query)
//     .search(BlogSearchableFields)
//     .filter()
//     .sort()
//     .fields()
//     .paginate()
//     .limit();
//   const result = await resultQuery.modelQuery;
//   const meta = await resultQuery.countTotal();

//   return {
//     data: result,
//     meta,
//   };
// };
// Get single Blog
const getSingleBlog = async (id) => {
  const result = await Blog.findById(id);
  return result;
};
// Update Blog
const updateBlog = async (id,file, payload) => {
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        throw new Error("blog member not found");
      }
  
      // যদি নতুন ফাইল থাকে, তাহলে ক্লাউডিনারিতে আপলোড করো
      if (file?.buffer) {
        const imageName = `blog${Date.now()}`;
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        payload.thumbnail = secure_url;
      } else {
        // নতুন thumbnail না থাকলে পুরোনোটা রেখে দাও
        payload.thumbnail = blog.thumbnail;
      }
  
      const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
  
      return result;
    } catch (error) {
      console.error("Failed to update blog:", error);
      throw new Error("Failed to update blog: " + error.message);
    }
};
// Delete Blog
const deleteBlog = async (id) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
// Get single Portfolio By Slug
const getSingleBlogBySlug = async (slug) => {
  const result = await Blog.findOne({ slug });
  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getSingleBlogBySlug
};
