import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  productCategory: {
    type: String,
    required: [true, "Category name is required"],
  },
},
  {
    versionKey: false,
    timestamps: true,
  });

export const CategoryModel = mongoose.model("Category", categorySchema);