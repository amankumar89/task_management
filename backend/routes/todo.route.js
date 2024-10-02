import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

// Route to create a new todo
router.post("/", createTodo);

// Route to get all todos with pagination
router.get("/", getAllTodo);

// Route to update a todo by ID
router.put("/:id", updateTodo);

// Route to delete a todo by ID
router.delete("/:id", deleteTodo);

export default router;
