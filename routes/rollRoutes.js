import express from "express";
import { getAllRolls, getRoll, createRoll, deleteRoll } from "../controllers/RollController.js";
const router = express.Router()

router.get("/", getAllRolls)
router.get("/:id", getRoll)
router.post("/", createRoll)
router.delete("/:id", deleteRoll)

export default router