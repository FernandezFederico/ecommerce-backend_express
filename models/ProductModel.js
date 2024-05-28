import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  productCategory: {
    type: String,
    required: [true, "Product category is required"],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
  },
  productStock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Product stock cannot be negative"],
  },
  productImage: {
    type: String,
    required: [true, "Product image is required"],
  },
  productDescription: {
    type: String,
    required: [true, "Product description is required"],
  },

},
  {
    versionKey: false,
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Product", productSchema);
