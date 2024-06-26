import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
    Product: {
      type: Object,
      required: [true, "Cart items are required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const CartModel = mongoose.model("Cart", cartSchema);
