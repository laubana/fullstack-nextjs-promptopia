import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  category: {
    type: String,
    required: [true, "Category is required."],
  },
});

export default mongoose.models["Prompt"] ||
  mongoose.model("Prompt", promptSchema);
