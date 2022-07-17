// libarary import
const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost/todo_app_db");

// aquaring the connection
const db = mongoose.connection;

// error printing if any
db.on("error", console.error.bind(console, "connection error : "));

// db up and running
db.once("open", function () {
  console.log("Successfully connected to database");
});
