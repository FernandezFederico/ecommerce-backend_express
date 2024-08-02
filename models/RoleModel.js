import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: [true, "Role name is required"],
  }
},
{
  versionKey: false,
  timestamps: true,
});

export const RoleModel = mongoose.model("Role", roleSchema)