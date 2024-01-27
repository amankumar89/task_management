// libarary import
const mongoose = require("mongoose");

// uri
const uri = 'mongodb+srv://amankumaroo784:amank784@cluster0.3ba1r6o.mongodb.net/?retryWrites=true&w=majority';


// connect to the database
mongoose.connect(uri);

// aquaring the connection
const db = mongoose.connection;

// error printing if any
db.on("error", console.error.bind(console, "connection error : "));

// db up and running
db.once("open", function () {
  console.log("Successfully connected to database");
});