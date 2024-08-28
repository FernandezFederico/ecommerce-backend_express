import express from "express";
import multer from "multer";
import path from "path";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js";

const router = express.Router()

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products_images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadProductImage = multer({ 
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
  }
});

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", uploadProductImage.single('productImage'), createProduct);
router.put("/:id", uploadProductImage.single('productImage'), updateProduct);
router.delete("/:id", deleteProduct);

export default router