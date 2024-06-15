import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
