import Todo from "../models/todo.model.js";

export const getAllTodo = async (req, res) => {
  try {
    const todoList = await Todo.find({});
    return res.status(200).json({
      success: true,
      data: todoList,
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
    const newTodoTask = await Todo.create({
      descriptions: req.body.todoText,
      date: req.body.date,
      category: req.body.category,
    });
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodoTask,
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
    const id = req.query.id;
    await Todo.findByIdAndDelete(id);
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

// export const createTodo = (req, res) => {
//   Todo.create(
//     {
//       descriptions: req.body.todoText,
//       date: req.body.date,
//       category: req.body.category,
//     },
//     (err, newTodoTask) => {
//       if (err) {
//         console.log(`error in creating new task ${err}`);
//         return;
//       }
//       return res.redirect("back");
//     }
//   );
// };

// export const deleteTodo = (req, res) => {
//   let id = req.query.id;
//   Todo.findByIdAndDelete(id, function (err) {
//     if (err) {
//       console.log(`error in deleting from the database ${err}`);
//       return;
//     }

//     return res.redirect("back");
//   });
// };
