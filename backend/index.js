import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/mongoose.js";

import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.set("trust proxy", true);

// Enable CORS
app.use(cors());

connectDB();

app.use(express.static(path.join(path.resolve(), "frontend/dist")));

// urlencoded for the post method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy & running...",
  });
});

app.use("/api/v1/todo", todoRoutes);

export default app;

if (process.env.NODE_ENV !== "production") {
  // const currPath = path.join(path.resolve(), "frontend/dist");
  // app.use(express.static(currPath));
  // app.get("*", (req, res) => {
  //   return res.sendFile(path.join(currPath, "index.html"));
  // });
  app.listen(PORT, function (err) {
    if (err) {
      console.log(`error in running server: ${err}`);
    }
    console.log(`server is running at: http://localhost:${PORT}`);
  });
}

// listening to port if any error occured prints it
