import { Schema, model } from "mongoose";
import slugify from "slugify";


const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
 orderNumber: {
  type: Number,
  default: 0,
}
,

    slug: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },


    shortDescription: {
      type: String,
      trim: true,
    },

    longDescription: {
      type: String,
      trim: true,
    },

    thumbnail: {
      type: String,
    },

    videoUrl: {
      type: String,
      trim: true,
    },

    // Parent service reference (if this is a sub-service)
    parentService: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },

    // Direct sub-services list (optional for nested access)
    // subServices: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Service",
    //   },
    // ],

    // Related FAQ section
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],


    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


//
// ✅ Auto-generate a unique slug from title before saving
//
ServiceSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  // Ensure slug uniqueness
  while (await this.constructor.exists({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});


export const Service = model("Service", ServiceSchema);
