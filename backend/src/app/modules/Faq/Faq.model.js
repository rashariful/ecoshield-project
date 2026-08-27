
import {Schema, model} from "mongoose";

// Declare the Schema of the Mongo model
const FaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["General", "Service", "Pricing", "Support", "Policy"], // customize as needed
      default: "General",
    },
    // order: {
    //   type: Number,
    //   default: 0, // useful for sorting
    // },
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
export const Faq = model("Faq", FaqSchema);
