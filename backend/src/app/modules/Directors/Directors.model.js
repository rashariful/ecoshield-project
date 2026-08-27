import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const DirectorsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      // required: true,
    },
    experience: {
      type: String, // Example: "15+ years in interior design"
      // required: true,
    },
    bio: {
      type: String, // Full bio or mission statement
    },
    specialties: [
      {
        _id: false,
        specialty: {
          type: String,
          required: true,
        },
      },
    ],

    social: [
      {
        platform: { type: String, required: true }, // Example: "Facebook"
        link: { type: String, required: true }, // Example: "https://facebook.com/..."
        _id: false, // ❌ Disable _id inside array of strings
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Directors = model("Directors", DirectorsSchema);
