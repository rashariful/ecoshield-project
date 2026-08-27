import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const OverviewSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      enum: ["home", "contact", "services"], // fixed pages
    },
    items: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
        icon: { type: String }, // optional
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Overview = model("Overview", OverviewSchema);
