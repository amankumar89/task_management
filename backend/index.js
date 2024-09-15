import express from 'express';
import path from 'path';
const app = express();
const port = 3000;

import { connectDB } from './config/mongoose.js';

import todoRoutes from './routes/todo.route.js';

// setting up view engine
// app.set("view engine", "ejs");
// app.set('views', path.join(path.resolve(), "backend", 'views'));
// urlencoded for the post method
app.use(express.urlencoded({ extended: true }));
// for static files
app.use(express.static("backend/assets"));

app.use('/', todoRoutes);

// listening to port if any error occured prints it
app.listen(port, function (err) {
  if (err) {
    console.log(`error in running server: ${err}`);
  }
  console.log(`server is running at: http://localhost:${port}`);
  connectDB();
});
