const express = require("express");
const app = express();
const port = 3000;

const db = require("./config/mongoose");
const todo = require("./models/todo_task");

// const todoList = [
//   {
//     descriptions: "go to gym",
//     category: "Personal",
//     date: "10-03-2000",
//   },
//   {
//     descriptions: "Medicine Time",
//     category: "Health",
//     date: "12-05-2022",
//   },
//   {
//     descriptions: "Dinner",
//     category: "Home",
//     date: "21-05-2024",
//   },
// ];

// setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
// urlencoded for the post method
app.use(express.urlencoded({ extended: true }));
// for static files
app.use(express.static("assets"));

app.get("/", function (req, res) {
  todo.find({}, function (err, todoList) {
    if (err) {
      console.log(`Error in fetching data from database: ${err}`);
      return;
    }
    return res.render("todo", {
      title: "TODO App",
      todo_list: todoList,
    });
  });
});

// post method for adding todo tasks in database
app.post("/create", function (req, res) {
  todo.create(
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

      console.log(`************* ${newTodoTask}`);

      return res.redirect("back");
    }
  );
});

// delete task by click on the delete btn
app.get("/delete-todo", function (req, res) {
  let id = req.query.id;
  todo.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(`Error in deleting from the database ${err}`);
      return;
    }

    return res.redirect("back");
  });
  /*
  let description = req.query.description;
  console.log(description);
  let index = todoList.findIndex(
    (todoList) => todoList.descriptions == description
  );

  if (index != -1) {
    todoList.splice(index, 1);
  }
  return res.redirect("back");
  */
});

// listening to port if any error occured prints it
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
