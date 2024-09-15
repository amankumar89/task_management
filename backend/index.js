import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 50001;

import { connectDB } from './config/mongoose.js';

import todoRoutes from './routes/todo.route.js';

// setting up view engine
// app.set("view engine", "ejs");
// app.set('views', path.join(path.resolve(), "backend", 'views'));
// urlencoded for the post method
app.use(express.urlencoded({ extended: true }));
// for static files

app.use('/api/v1/todo', todoRoutes);

// listening to port if any error occured prints it
app.listen(PORT, function (err) {
  if (err) {
    console.log(`error in running server: ${err}`);
  }
  console.log(`server is running at: http://localhost:${PORT}`);
  connectDB();
});
