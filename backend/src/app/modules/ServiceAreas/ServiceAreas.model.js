import { Schema, model } from "mongoose";

const ServiceAreasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    priority: {
      type: Number,
      default: 0, // sorting (0 = normal)
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceAreas = model("ServiceAreas", ServiceAreasSchema);
