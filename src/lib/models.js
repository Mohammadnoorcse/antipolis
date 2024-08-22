import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
     image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    // image:{
    //     type:String
    // }
   
    

  },
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const Animal = mongoose.models?.Animal || mongoose.model("Animal", animalSchema);
export const Category = mongoose.models?.Category || mongoose.model("Category", categorySchema);