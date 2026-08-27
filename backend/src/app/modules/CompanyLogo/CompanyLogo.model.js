import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const CompanyLogoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
      isActive:{
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const CompanyLogo = model("CompanyLogo", CompanyLogoSchema);
