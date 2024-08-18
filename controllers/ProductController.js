import { ProductModel } from "../models/ProductModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const productData = req.body;
    if (req.file) {
      productData.productImage = `/uploads/${req.file.filename}`;
    }
    const product = await ProductModel.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: `Product ID: '${id}' Not found` });
    }

    if (req.file) {
      if (product.productImage) {
        const oldImagePath = path.join(__dirname, '../', product.productImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error al eliminar la imagen anterior:', err);
          } else {
            console.log('Imagen anterior eliminada:', oldImagePath);
          }
        });
      }

      updateData.productImage = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: `Product ID: '${id}' Not found` });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Product ID: '${id}' Not found` });
    }

    // Construir la ruta de la imagen asociada y eliminarla
    const imagePath = path.join(__dirname, '../', product.productImage);
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error al eliminar la imagen:', err);
        } else {
          console.log('Imagen eliminada:', imagePath);
        }
      });
    } else {
      console.log('El archivo no existe:', imagePath);
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};