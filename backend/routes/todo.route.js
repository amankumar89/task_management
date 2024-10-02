import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

// Route to create a new todo
router.post("/todo", createTodo);

// Route to get all todos with pagination
router.get("/todo", getAllTodo);

// Route to update a todo by ID
router.put("/todo/:id", updateTodo);

// Route to delete a todo by ID
router.delete("/todo/:id", deleteTodo);

export default router;
