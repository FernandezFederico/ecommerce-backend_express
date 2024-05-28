import { RollModel } from "../models/RollModel.js";


export const getAllRolls = async (req, res) => {
  try {
    const roll = await RollModel.find();
    res.status(200).json(roll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoll = async (req, res) => {
  try {
    const roll = await RollModel.create(req.body);
    res.status(201).json(roll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getRoll = async (req, res) => {
  try {
    const {id} = await req.params;
    const roll = await RollModel.findById(id);
    if(!roll) return res.status(404).json({message: `Roll ID: '${id}' Not found`});
    res.status(200).json(roll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoll = async (req, res) => {
  try {
    const {id} = await req.params;
    const roll = await RollModel.findByIdAndDelete(id);
    if(!roll) return res.status(404).json({message: `Roll ID: '${id}' Not found`});
    res.status(200).json('Roll deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};