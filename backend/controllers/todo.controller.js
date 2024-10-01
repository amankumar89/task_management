import Todo from "../models/todo.model.js";
import { getNextSequenceValue } from "../models/counter.model.js";

export const getAllTodo = async (req, res) => {
  try {
    const todoList = await Todo.find({}).sort({ createdAt: -1 });
    const tempList =
      todoList?.map((todo) => ({
        id: todo?.id,
        title: todo?.title,
        description: todo?.description,
        date: todo?.date,
        category: todo?.category,
        isCompleted: todo?.isCompleted,
        createdAt: todo?.createdAt,
      })) ?? [];
    return res.status(200).json({
      success: true,
      data: tempList,
    });
  } catch (error) {
    console.log(`error in fetching data from database: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      id: await getNextSequenceValue(),
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category,
      isCompleted: req.body.isCompleted,
    });
    return res.status(201).json({
      success: true,
      message: "Create todo successfully",
      data: {
        id: newTodo?.id,
        title: newTodo?.title,
        description: newTodo?.description,
        date: newTodo?.date,
        category: newTodo?.category,
        isCompleted: newTodo?.isCompleted,
        createdAt: newTodo?.createdAt,
      },
    });
  } catch (error) {
    console.log(`Error in creating new task: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Failed to create todo",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(`Error in deleting from the database: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Failed to delete todo",
    });
  }
};
