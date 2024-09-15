import mongoose from "mongoose";
// uri
const uri = 'mongodb+srv://amankumaroo784:amank784@cluster0.3ba1r6o.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  // connect to the database
  await mongoose.connect(uri);
  
  // aquaring the connection
  const db = await mongoose.connection;
  
  // error printing if any
  db.on("error", console.error.bind(console, "connection error : "));
  
  // db up and running
  db.once("open", function () {
    console.log("connected to database");
  });
};