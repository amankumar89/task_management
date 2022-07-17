const mongoose = require("mongoose");

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

const todoList = mongoose.model("todoList", todoSchema);

module.exports = todoList;
