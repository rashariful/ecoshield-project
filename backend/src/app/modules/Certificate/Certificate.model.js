import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
const CertificateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String, // image URL / path
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },


    issuedDate: {
      type: Date,
    },
    validInfo: {
      type: String,
    },
   issuedBy: {
     type: String,
    },
    category: {
      type: String, // e.g. Web Development, AI, Security
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
export const Certificate = model("Certificate", CertificateSchema);
