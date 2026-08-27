
import {Schema, model} from "mongoose";

// Declare the Schema of the Mongo model
const ContactSchema = new Schema(
  {
   name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      
    },
 dateTime: {
  type: Date,
  default: Date.now,
},
    service: {
      type: String,
      required: false,
    },
  
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Contact = model("Contact", ContactSchema);
