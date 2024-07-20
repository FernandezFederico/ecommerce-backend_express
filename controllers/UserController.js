import { UserModel } from "../models/UserModel.js";


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
    const {id} = await req.params;
    const user = await UserModel.findById(id);
    if(!user) return res.status(404).json({message: `User ID: '${id}' Not found`});
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

export const updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserModel.findByIdAndUpdate(
      {_id: id},
      req.body,
      {new: true})
      res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {id} = await req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if(!user) return res.status(404).json({message: `User ID: '${id}' Not found`});
    res.status(200).json('User deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await UserModel.findOne({ userEmail, userPassword });
    if (!user) return res.status(404).json({ message: 'Credenciales incorrectas' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};