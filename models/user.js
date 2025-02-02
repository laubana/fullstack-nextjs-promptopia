import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already exsits"],
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.models["User"] || mongoose.model("User", userSchema);
