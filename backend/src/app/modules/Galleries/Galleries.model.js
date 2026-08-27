
import {Schema, model} from "mongoose";

// Declare the Schema of the Mongo model
const GalleriesSchema = new Schema(
  {
       title:{
      type: String,
      require: true
    },
       videoUrl:{
      type: String,
    
    },
     images: [
      {
        type: String,
      },
    ],

  },
  {
    timestamps: true,
  }
);

// Export the model
export const Galleries = model("Galleries", GalleriesSchema);
