import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    descriptions: { type: String },
    date: { type: String, required: true },
    category: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
