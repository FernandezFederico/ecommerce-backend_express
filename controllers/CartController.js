import { CartModel } from "../models/CartModel.js";

export const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findById(id);
    if (!cart)
      return res.status(404).json({ message: `Cart ID: '${id}' Not found` });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await CartModel.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findByIdAndDelete(id);
    if (!cart)
      return res.status(404).json({ message: `Cart ID: '${id}' Not found` });
    res.status(200).json("Cart deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartByUserId = async ( req , res ) => {
  try{
    const {userId} = req.params;
    const cartItems = await CartModel.find({ userId: userId })
    res.status(200).json(cartItems)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const deleteCartWithProductId = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await CartModel
    .findOneAndDelete({ 'Product._id': productId, userId: userId });

    if (!cart) {
      return res.status(404)
      .json({ message: `No cart item found for user ID: '${userId}' with product ID: '${productId}'` });
    }

    res.status(200).json("Cart product deleted successfully!");
  } catch (error) {
    res.status(500)
    .json({ message: error.message });
  }
};