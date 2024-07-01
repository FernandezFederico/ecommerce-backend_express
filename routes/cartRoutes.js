import express from "express";
import { getCart, createCart, updateCart, deleteCart, getCartByUserId } from "../controllers/CartController.js";
const router = express.Router()

router.get("/:id", getCart)
router.post("/", createCart)
router.put("/:id", updateCart)
router.delete("/:id", deleteCart)
router.get("/user/:userId", getCartByUserId)
export default router