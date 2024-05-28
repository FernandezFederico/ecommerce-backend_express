import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  userLastName: {
    type: String,
    required: [true, "User last name is required"],
  },
  userEmail: {
    type: String,
    required: [true, "User email is required"],
  },
  userPassword: {
    type: String,
    required: [true, "User password is required"],
  },
  userRole: {
    type: String,
    required: [true, "User role is required"],
  },
},
  {
    versionKey: false,
    timestamps: true,
  });

export const UserModel = mongoose.model("User", userSchema);