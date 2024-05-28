import mongoose from "mongoose";

const rollSchema = new mongoose.Schema({
  rollName: {
    type: String,
    required: [true, "Roll name is required"],
  }
},
{
  versionKey: false,
  timestamps: true,
});

export const RollModel = mongoose.model("Roll", rollSchema)