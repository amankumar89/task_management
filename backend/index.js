import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

import { connectDB } from "./config/mongoose.js";

import todoRoutes from "./routes/todo.route.js";

app.set("trust proxy", true);

// Enable CORS
app.use(cors());

app.use(express.static(path.join(path.resolve(), "frontend/dist")));

// urlencoded for the post method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/todo", todoRoutes);

if (process.env.NODE_ENV === "production") {
  const currPath = path.join(path.resolve(), "frontend/dist");
  app.use(express.static(currPath));
  app.get("*", (req, res) => {
    return res.sendFile(path.join(currPath, "index.html"));
  });
}

// listening to port if any error occured prints it
app.listen(PORT, function (err) {
  if (err) {
    console.log(`error in running server: ${err}`);
  }
  console.log(`server is running at: http://localhost:${PORT}`);
  connectDB();
});
