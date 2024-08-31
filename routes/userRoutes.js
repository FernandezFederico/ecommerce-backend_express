import express from "express";
import multer from "multer";
import path from "path";
import { getAllUsers, getUser, createUser, updateUser, deleteUser, loginUser, getUsersByRole, addUser } from "../controllers/UserController.js";

const router = express.Router()

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/users_images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadUsersImage = multer({ 
  storage: userStorage,
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

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/role/:userRole", getUsersByRole);
router.post("/", createUser);
router.post("/add", uploadUsersImage.single('userImage'), addUser);
router.put("/:id", uploadUsersImage.single('userImage'), updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router