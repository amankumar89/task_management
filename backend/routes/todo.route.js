import express from 'express';
import { createTodo, deleteTodo, getAllTodo } from '../controllers/todo.controller.js';

const router = express.Router();

// get method to fetch and return all todo list items
router.get("/", getAllTodo);

// post method for adding todo tasks in database
router.post("/create", createTodo);

// delete task by click on the delete btn
router.get("/delete-todo", deleteTodo);

export default router;