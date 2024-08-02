import express from "express";
import { getAllRoles, getRole, createRole, deleteRole } from "../controllers/RoleController.js";
const router = express.Router()

router.get("/", getAllRoles)
router.get("/:id", getRole)
router.post("/", createRole)
router.delete("/:id", deleteRole)

export default router