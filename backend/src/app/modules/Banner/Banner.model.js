import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const BannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],   // Array of strings
      validate: {
        validator: function(val) {
          return val.length <= 3; // allow 1, 2, or 3 keywords
        },
        message: '{PATH} can have at most 3 keywords',
      },
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Banner = model("Banner", BannerSchema);
