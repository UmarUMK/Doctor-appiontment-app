import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    console.log(`db is connected HOST:${db.connection.host}`);
    // console.log(process.env.ACCOUNT_SID);
  } catch (error) {
    console.log(error, "db not connected");
    throw error;
  }
};
