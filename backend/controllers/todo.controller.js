import Todo from '../models/todo.model.js';

export const getAllTodo = async (req, res) => {
  const todoList = await Todo.find({});
  if(!todoList) {
    console.log(`error in fetching data from database: ${err}`);
    return;
  }
  return res.render("todo", {
    title: "Todo App",
    todo_list: todoList,
  });
};

export const createTodo = (req, res) => {
  Todo.create(
    {
      descriptions: req.body.todoText,
      date: req.body.date,
      category: req.body.category,
    },
    (err, newTodoTask) => {
      if (err) {
        console.log(`error in creating new task ${err}`);
        return;
      }
      return res.redirect("back");
    }
  );
};

export const deleteTodo = (req, res) => {
  let id = req.query.id;
  Todo.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(`error in deleting from the database ${err}`);
      return;
    }

    return res.redirect("back");
  });
};
