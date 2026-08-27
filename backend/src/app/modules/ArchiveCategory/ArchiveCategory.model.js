
import {Schema, model} from "mongoose";

// Declare the Schema of the Mongo model
const ArchiveCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const ArchiveCategory = model("ArchiveCategory", ArchiveCategorySchema);
