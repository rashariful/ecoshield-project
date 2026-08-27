
import {Schema, model} from "mongoose";

// Declare the Schema of the Mongo model
const TeamSchema = new Schema(
  {
       name:{
      type: String,
      require: true
    },
       designation:{
      type: String,
     
    },
     bio: {
      type: String, // Full bio or mission statement
    },
       email:{
      type: String,
     
    },
       phone:{
      type: String,
     
    },
       thumbnail:{
      type: String,
     
    },
     isActive:{
      type: Boolean,
      default: true
    },
    joinedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Team = model("Team", TeamSchema);
