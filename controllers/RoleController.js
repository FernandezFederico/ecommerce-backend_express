import { RoleModel } from "../models/RoleModel.js";


export const getAllRoles = async (req, res) => {
  try {
    const role = await RoleModel.find();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await RoleModel.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getRole = async (req, res) => {
  try {
    const {id} = await req.params;
    const role = await RoleModel.findById(id);
    if(!role) return res.status(404).json({message: `Role ID: '${id}' Not found`});
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const {id} = await req.params;
    const role = await RoleModel.findByIdAndDelete(id);
    if(!role) return res.status(404).json({message: `Role ID: '${id}' Not found`});
    res.status(200).json('Role deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};