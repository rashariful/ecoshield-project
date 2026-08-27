import { Schema, model } from "mongoose";
import slugify from "slugify";

// Declare the Schema of the Mongo model
const PortfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    subTitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ArchiveCategory",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    clientName: {
      type: String,
      trim: true,
    },
   
    projectStatus: {
      type: String,
      enum: ["Completed", "Ongoing", "Upcoming"],
      default: "Ongoing",
    },
   
    images: [
      {
        type: String,
        required: true,
      },
    ],
     isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate unique slug before saving (only if not manually set)
PortfolioSchema.pre("save", async function (next) {
  try {
    // Skip if no title or slug already set
    if (!this.title || this.slug) return next();

    const baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // Ensure unique slug
    while (await this.constructor.exists({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
    next();
  } catch (err) {
    next(err);
  }
});

// Export the model
export const Portfolio = model("Portfolio", PortfolioSchema);
