import { UserModel } from "../models/UserModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    const { userRole } = req.params;
    const users = await UserModel.find({ userRole });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({ message: `User ID: '${id}' Not found` });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { newUser, userRole } = req.body;
    const user = new UserModel({ ...newUser, userRole });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const userData = req.body;
    if (req.file) {
      userData.userImage = `/uploads/users_images/${req.file.filename}`;
    }
    const user = await UserModel.create(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: `User ID: '${id}' Not found` });
    }

    if (req.file) {
      if (user.userImage) {
        const oldImagePath = path.join(__dirname, '../', user.userImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error al eliminar la imagen anterior:', err);
          } else {
            console.log('Imagen anterior eliminada:', oldImagePath);
          }
        });
      }

      updateData.userImage = `/uploads/users_images/${req.file.filename}`;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: `User ID: '${id}' Not found` });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: `User ID: '${id}' Not found` });
    }
    const imagePath = path.join(__dirname, '../', user.userImage);
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

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await UserModel.findOne({ userEmail, userPassword });
    if (!user)
      return res.status(404).json({ message: "Credenciales incorrectas" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
