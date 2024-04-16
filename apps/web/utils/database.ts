import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("already connected");
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI || "none";
    await mongoose.connect(MONGODB_URI, {
      dbName: "share_prompt",
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};
