import express from 'express';
import path from 'path';
const app = express();
const port = 3000;

import { connectDB } from './config/mongoose.js';

import Todo from './models/todo.model.js';

console.log(path.resolve());

// setting up view engine
app.set("view engine", "ejs");
app.set('views', path.join(path.resolve(), "backend", 'views'));
// urlencoded for the post method
app.use(express.urlencoded({ extended: true }));
// for static files
app.use(express.static("backend/assets"));

app.get("/", async (req, res) => {
  const todoList = await Todo.find({});
  if(!todoList) {
    console.log(`error in fetching data from database: ${err}`);
    return;
  }
  return res.render("todo", {
    title: "Todo App",
    todo_list: todoList,
  });
});

// post method for adding todo tasks in database
app.post("/create", function (req, res) {
  Todo.create(
    {
      descriptions: req.body.todoText,
      date: req.body.date,
      category: req.body.category,
    },
    function (err, newTodoTask) {
      if (err) {
        console.log(`error in creating new task ${err}`);
        return;
      }
      return res.redirect("back");
    }
  );
});

// delete task by click on the delete btn
app.get("/delete-todo", function (req, res) {
  let id = req.query.id;
  Todo.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(`error in deleting from the database ${err}`);
      return;
    }

    return res.redirect("back");
  });
});

// listening to port if any error occured prints it
app.listen(port, function (err) {
  if (err) {
    console.log(`error in running server: ${err}`);
  }
  console.log(`server is running at: http://localhost:${port}`);
  connectDB();
});
