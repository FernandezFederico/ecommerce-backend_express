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
  console.log(req.body, "req.body");
  try {
    const { userId, Product } = req.body;

    if (!userId || !Product || !Product._id) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    let cartItem = await CartModel.findOne({ 
      userId: userId, 
      'Product._id': Product._id 
    });

    if (cartItem) {
      console.log(`Cart item already exists for user ID: ${userId} and product ID: ${Product._id}`);
      console.log(`Current quantity: ${cartItem.Product.quantity}, Adding: ${Product.quantity}`);
      
      // Actualizar la cantidad
      cartItem.Product.quantity += Product.quantity;
      
      // Usar findOneAndUpdate para asegurar que la actualización se aplique correctamente
      const updatedCartItem = await CartModel.findOneAndUpdate(
        { userId: userId, 'Product._id': Product._id },
        { $set: { 'Product.quantity': cartItem.Product.quantity } },
        { new: true }
      );
      
      console.log(`Cart item quantity updated to: ${updatedCartItem.Product.quantity}`);
      res.status(200).json(updatedCartItem);
    } else {
      console.log(`Creating new cart item for user ID: ${userId} and product ID: ${Product._id}`);
      
      const newCartItem = new CartModel({
        userId,
        Product: {
          ...Product,
          quantity: Product.quantity || 1
        }
      });
      await newCartItem.save();
      
      console.log(`New cart item created with quantity: ${newCartItem.Product.quantity}`);
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error('Error in createCart:', error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
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