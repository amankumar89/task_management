import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
} from "../controllers/todo.controller.js";
import { todosValidations, validate } from "../lib/validators.js";

const router = express.Router();

// get method to fetch and return all todo list items
router.get("/", getAllTodo);

// post method for adding todo tasks in database
router.post("/create", todosValidations(), validate, createTodo);

// delete task by click on the delete btn
router.delete("/delete-todo/:id", deleteTodo);

export default router;
