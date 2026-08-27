
import {Schema, model} from "mongoose";

// Declare the Schema of the Mongo model
const TestimonialSchema = new Schema(
  {
   name:{
      type: String,
      require: true
    },
   designation:{
      type: String,
      require: false
    },
   review:{
      type: String,
      require: false
    },
   videoUrl:{
      type: String,
      require: false
    },
   thumbnail:{
      type: String,
      require: false
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
export const Testimonial = model("Testimonial", TestimonialSchema);
