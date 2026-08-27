import { Schema, model } from "mongoose";
import slugify from "slugify";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: String,
    shortDescrip: { type: String, trim: true, maxlength: 300 },
    thumbnail: String,
    category: { type: String, required: true },
    tags: [{ type: String, lowercase: true, trim: true }],
    publishedAt: Date,
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 🔹 Auto-generate unique slug before validation
BlogSchema.pre("validate", async function (next) {
  try {
    if (!this.title || this.slug) return next();

    const baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await this.constructor.exists({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
    next();
  } catch (err) {
    next(err);
  }
});

export const Blog = model("Blog", BlogSchema);
