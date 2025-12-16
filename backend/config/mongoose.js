import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log(uri);

  if (isConnected || !uri) return;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully");
    isConnected = true;
  } catch (error) {
    console.error("database connection error:", err?.message);
    process.exit(1);
  }
};
