import mongoose from "mongoose";
// uri

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
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