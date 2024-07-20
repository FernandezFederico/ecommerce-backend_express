import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser, loginUser, getUsersByRole } from "../controllers/UserController.js";
const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getUser)
router.get("/role/:userRole", getUsersByRole )
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/login", loginUser);
export default router