import { ProductModel } from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.q) {
      const searchQuery = req.query.q;
      const searchRegex = new RegExp(searchQuery.split("").join(".*"), "i");
      const priceQuery = parseInt(searchQuery);

      query.$or = [
        { productName: searchRegex },
        { productCategory: searchRegex },
        { productDescription: searchRegex },
      ];
      if (!isNaN(priceQuery)) {
        query.$or.push({ productPrice: priceQuery });
      }
    }
    const products = await ProductModel.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const product = await ProductModel.findById(id);
    if (!product)
      return res.status(404).json({ message: `Product ID: '${id}' Not found` });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({ message: `Product ID: '${id}' Not found` });
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
