import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  descriptions: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;