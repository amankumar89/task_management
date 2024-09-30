import mongoose from "mongoose";
// uri

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.error("database connection error:", err);
    });
};
